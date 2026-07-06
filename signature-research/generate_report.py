#!/usr/bin/env python3
"""Generate signature-research/report.md from results/*.json + fields.yaml."""
import json
import glob
import os
import re

BASE = os.path.dirname(os.path.abspath(__file__))
RESULTS = os.path.join(BASE, "results")
FIELDS = os.path.join(BASE, "fields.yaml")
OUT = os.path.join(BASE, "report.md")

# Field -> category, and category order, mirrored from fields.yaml
CATEGORY_ORDER = ["concept", "execution", "fit", "synthesis"]
CATEGORY_TITLES = {
    "concept": "Concept",
    "execution": "Execution",
    "fit": "Fit",
    "synthesis": "Synthesis",
}
FIELD_CATEGORY = {
    "concept_summary": "concept",
    "brand_thesis_fit": "concept",
    "distinctiveness": "concept",
    "real_world_examples": "execution",
    "implementation_technique": "execution",
    "gsap_fit": "execution",
    "versatility": "fit",
    "editorial_restraint": "fit",
    "accessibility_reduced_motion": "fit",
    "performance_weight": "fit",
    "risk_flags": "synthesis",
    "recommendation": "synthesis",
}
FIELD_ORDER = list(FIELD_CATEGORY.keys())
FIELD_TITLES = {f: f.replace("_", " ").title() for f in FIELD_ORDER}

TOC_FIELDS = ["recommendation", "brand_thesis_fit", "versatility", "risk_flags"]


def slug(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def is_uncertain(val, key, uncertain_list):
    if key in uncertain_list:
        return True
    if val is None or val == "":
        return True
    if isinstance(val, str) and "[uncertain]" in val:
        return True
    return False


def fmt(val):
    if isinstance(val, list):
        return "\n".join(f"- {v}" for v in val)
    if isinstance(val, dict):
        return "; ".join(f"{k}: {v}" for k, v in val.items())
    return str(val)


def truncate(s, n=90):
    s = str(s).replace("\n", " ").strip()
    return s if len(s) <= n else s[: n - 1].rstrip() + "…"


def load():
    items = []
    for path in sorted(glob.glob(os.path.join(RESULTS, "*.json"))):
        with open(path) as f:
            items.append(json.load(f))
    return items


def main():
    items = load()
    # rank by score parsed from recommendation
    def score(it):
        m = re.search(r"([0-9](?:\.[0-9])?)\s*/\s*5", str(it.get("recommendation", "")))
        return float(m.group(1)) if m else 0.0
    items.sort(key=score, reverse=True)

    lines = []
    lines.append("# Signature Motif Research — Report\n")
    lines.append("Replacing the ECG-line idea with one ownable signature that encodes the "
                 "clinical + technical interleave. 9 motifs deep-researched. Ranked by score.\n")

    # TOC
    lines.append("## Ranking\n")
    lines.append("| # | Motif | Recommendation | Thesis fit | Versatility | Risk |")
    lines.append("|---|-------|----------------|-----------|-------------|------|")
    for i, it in enumerate(items, 1):
        name = it.get("name", "?")
        cells = []
        for tf in TOC_FIELDS:
            cells.append(truncate(it.get(tf, ""), 70))
        lines.append(f"| {i} | [{name}](#{slug(name)}) | " + " | ".join(cells) + " |")
    lines.append("")

    # Detail
    lines.append("## Details\n")
    for i, it in enumerate(items, 1):
        name = it.get("name", "?")
        unc = it.get("uncertain", []) or []
        lines.append(f"### {name}\n")
        cat = it.get("category", "")
        if cat:
            lines.append(f"*category: {cat}*\n")
        for category in CATEGORY_ORDER:
            fields_in = [f for f in FIELD_ORDER if FIELD_CATEGORY[f] == category]
            block = []
            for fld in fields_in:
                if fld not in it:
                    continue
                val = it[fld]
                if is_uncertain(val, fld, unc):
                    continue
                block.append(f"**{FIELD_TITLES[fld]}**\n\n{fmt(val)}\n")
            if block:
                lines.append(f"#### {CATEGORY_TITLES[category]}\n")
                lines.extend(block)
        lines.append("")

    with open(OUT, "w") as f:
        f.write("\n".join(lines))
    print(f"Wrote {OUT} ({len(items)} motifs)")


if __name__ == "__main__":
    main()
