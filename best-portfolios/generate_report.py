#!/usr/bin/env python3
"""Generate report.md from best-portfolios/results/*.json + fields.yaml.
Flat JSON per item; fields.yaml nests field defs under `categories:`.
Skips values containing [uncertain] and fields listed in each item's `uncertain` array.
"""
import json
import re
from pathlib import Path

BASE = Path(__file__).resolve().parent
RESULTS = BASE / "results"
FIELDS_YAML = BASE / "fields.yaml"
OUT = BASE / "report.md"

# --- minimal fields.yaml parse (avoid PyYAML dep) -> ordered [(category, [field,...])]
def parse_fields(path):
    cats, cur, in_cats = [], None, False
    for raw in path.read_text().splitlines():
        if raw.strip().startswith("#") or not raw.strip():
            continue
        if re.match(r"^categories:\s*$", raw):
            in_cats = True
            continue
        if not in_cats:
            continue
        m_cat = re.match(r"^  (\w[\w ]*):\s*$", raw)      # 2-space category key
        m_fld = re.match(r"^\s*-\s*name:\s*(\w+)", raw)     # "- name: field"
        if m_cat:
            cur = m_cat.group(1)
            cats.append((cur, []))
        elif m_fld and cats:
            cats[-1][1].append(m_fld.group(1))
    # drop reserved non-category tail keys if any slipped in
    return [(c, f) for c, f in cats if f]

CATEGORY_TITLES = {
    "identity_and_hero": "Identity & Hero",
    "typography_and_layout": "Typography & Layout",
    "motion": "Motion",
    "content_presentation": "Content Presentation",
    "navigation_and_conversion": "Navigation & Conversion",
    "engineering": "Engineering",
    "synthesis": "Synthesis",
}
FIELD_TITLES = {
    "hero": "Hero", "wordmark_identity": "Wordmark / Identity",
    "signature_detail": "Signature Detail", "typography": "Typography",
    "whitespace_layout": "Whitespace & Layout",
    "color_accent_discipline": "Color / Accent Discipline",
    "light_dark_tone": "Light / Dark & Tone", "motion": "Motion",
    "reduced_motion_a11y": "Reduced-Motion & A11y",
    "project_presentation": "Project Presentation",
    "research_artifact_presentation": "Research-Artifact Presentation",
    "writing_blog_integration": "Writing / Blog Integration",
    "photography_imagery": "Photography / Imagery",
    "navigation": "Navigation", "trust_credibility": "Trust / Credibility",
    "contact_conversion": "Contact / Conversion",
    "performance_weight": "Performance / Weight", "takeaway": "Takeaway",
}

def slug(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")

def display_name(fname):
    # human title from filename
    return fname.replace("_", " ")

def is_uncertain(val, fname_field, uncertain_list):
    if fname_field in uncertain_list:
        return True
    if val is None or (isinstance(val, str) and not val.strip()):
        return True
    if isinstance(val, str) and "[uncertain]" in val:
        return True
    return False

def main():
    cats = parse_fields(FIELDS_YAML)
    files = sorted(RESULTS.glob("*.json"))
    items = []
    for fp in files:
        data = json.loads(fp.read_text())
        items.append((display_name(fp.stem), data))

    lines = []
    lines.append("# Best Portfolios — Deep Research Reference")
    lines.append("")
    lines.append(f"_Auto-generated from {len(items)} researched items. "
                 "Uncertain/unverified fields are omitted. "
                 "For the synthesized build guidance see **BRIEF.md**._")
    lines.append("")
    lines.append("## Contents")
    lines.append("")
    for i, (name, _) in enumerate(items, 1):
        lines.append(f"{i}. [{name}](#{slug(name)})")
    lines.append("")
    lines.append("---")
    lines.append("")

    for name, data in items:
        uncertain = data.get("uncertain", []) or []
        lines.append(f"## {name}")
        lines.append("")
        for cat_key, fields in cats:
            cat_title = CATEGORY_TITLES.get(cat_key, cat_key)
            block = []
            for field in fields:
                val = data.get(field)
                if is_uncertain(val, field, uncertain):
                    continue
                ftitle = FIELD_TITLES.get(field, field)
                block.append(f"- **{ftitle}:** {val}")
            if block:
                lines.append(f"### {cat_title}")
                lines.extend(block)
                lines.append("")
        lines.append("---")
        lines.append("")

    OUT.write_text("\n".join(lines))
    print(f"Wrote {OUT} ({len(items)} items, {OUT.stat().st_size} bytes)")

if __name__ == "__main__":
    main()
