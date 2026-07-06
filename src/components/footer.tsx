export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-border">
      <div className="mx-auto flex max-w-wide flex-col gap-6 px-6 py-section-sm sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-h3">Madhavi</p>
          <p className="mt-2 text-small text-muted-foreground">
            Clinical AI Engineer · MBBS + IIT Madras Data Science
          </p>
        </div>
        <p className="text-small text-muted-foreground">Currently building clinical AI systems.</p>
      </div>
    </footer>
  );
}
