import { CircularGallery, type GalleryItem } from "@/components/photography/circular-gallery";

// Placeholder frames — the sole image asset is reused with per-frame filters so
// the carousel reads as distinct photos. Real photography drops straight in.
const FRAMES: GalleryItem[] = [
  { src: "/hero-portrait.jpg", caption: "FRAME 01", filter: "grayscale(1) contrast(1.1)" },
  { src: "/hero-portrait.jpg", caption: "FRAME 02", filter: "sepia(0.5) contrast(1.05)" },
  { src: "/hero-portrait.jpg", caption: "FRAME 03", filter: "grayscale(0.4) brightness(0.95)" },
  { src: "/hero-portrait.jpg", caption: "FRAME 04", filter: "contrast(1.15) saturate(1.1)" },
  { src: "/hero-portrait.jpg", caption: "FRAME 05", filter: "grayscale(1) brightness(1.05)" },
  { src: "/hero-portrait.jpg", caption: "FRAME 06", filter: "hue-rotate(-15deg) contrast(1.05)" },
  { src: "/hero-portrait.jpg", caption: "FRAME 07", filter: "grayscale(0.7) contrast(1.2)" },
];

export default function GalleryLab() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-hero-bg text-hero-fg">
      <div className="mb-2 text-center">
        <p className="font-mono text-hero-muted text-small tracking-widest">PHOTOGRAPHY</p>
        <h1 className="mt-2 font-serif text-hero">I also shoot.</h1>
      </div>
      <CircularGallery items={FRAMES} />
      <p className="mt-2 font-mono text-hero-muted text-small">drag / scroll to spin</p>
    </main>
  );
}
