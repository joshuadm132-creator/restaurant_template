
import Image from "next/image";
import { restaurantConfig } from "@/config/restaurant";

export default function LuxuryAbout() {
  const { about } = restaurantConfig;

  return (
    <section
      id="about"
      className="bg-[var(--color-background)] px-6 py-28 sm:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">

        {/* Editorial heading */}
        <header className="mb-16 text-center">
          <span className="mb-7 block text-[10px] uppercase tracking-[0.4em] text-[var(--color-primary)]">
            {about.eyebrow}
          </span>

          <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-5xl font-normal leading-tight sm:text-6xl lg:text-7xl">
            {about.title}
          </h2>

          <div className="mx-auto mt-8 h-px w-20 bg-[var(--color-accent)]" />
        </header>

        {/* Main editorial composition */}
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">

          {/* Photography */}
          <div className="relative">
            <div className="relative aspect-[5/4] overflow-hidden">
              <Image
                src={about.image.src}
                alt={about.image.alt}
                fill
                unoptimized
                sizes="(max-width: 1024px) 90vw, 60vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-4 -right-4 -z-0 h-1/2 w-1/2 border-b border-r border-[var(--color-accent)]/60" />
          </div>

          {/* Story */}
          <div className="lg:py-10">
            <p className="mb-9 font-[var(--font-display)] text-2xl italic leading-relaxed text-[var(--color-primary)] sm:text-3xl">
              {about.subtitle}
            </p>

            <div className="space-y-6 text-sm leading-8 text-[var(--color-muted)]">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Closing quotation */}
        <div className="mx-auto mt-28 max-w-3xl border-y border-[var(--color-accent)]/40 py-12 text-center sm:py-16">
          <span className="mb-5 block text-2xl text-[var(--color-accent)]">
            “
          </span>

          <blockquote>
            <p className="font-[var(--font-display)] text-3xl leading-relaxed sm:text-4xl lg:text-5xl">
              {about.quote.text}
            </p>

            <cite className="mt-7 block text-[10px] not-italic uppercase tracking-[0.3em] text-[var(--color-muted)]">
              {about.quote.attribution}
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
