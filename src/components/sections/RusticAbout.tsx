
import Image from "next/image";
import { restaurantConfig } from "@/config/restaurant";

export default function RusticAbout() {
  const { about } = restaurantConfig;

  return (
    <section
      id="about"
      className="overflow-hidden bg-[var(--color-surface)] px-6 py-24 sm:px-10 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Restaurant photograph */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={about.image.src}
              alt={about.image.alt}
              fill
              unoptimized
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>

          {/* Decorative frame */}
          <div className="pointer-events-none absolute -bottom-[3%] -right-[3%] -z-0 h-2/3 w-2/3 border-b border-r border-[var(--color-accent)]" />

          <div className="absolute -left-[3%] top-[-2%] h-20 w-20 border-l border-t border-[var(--color-primary)]/50" />
        </div>

        {/* Story */}
        <div className="relative">
          <span className="mb-6 block text-xs font-semibold tracking-[0.3em] text-[var(--color-primary)]">
            {about.eyebrow}
          </span>

          <h2 className="max-w-xl font-[var(--font-display)] text-5xl leading-[1.1] sm:text-6xl lg:text-7xl">
            {about.title}
          </h2>

          <p className="mt-7 font-[var(--font-display)] text-2xl italic leading-relaxed text-[var(--color-primary)]">
            {about.subtitle}
          </p>

          <div className="my-8 h-px w-20 bg-[var(--color-accent)]" />

          <div className="max-w-xl space-y-5 text-sm leading-8 text-[var(--color-muted)]">
            {about.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Closing quote */}
          <blockquote className="mt-12 border-l-2 border-[var(--color-accent)] pl-6">
            <p className="font-[var(--font-display)] text-2xl italic leading-relaxed">
              “{about.quote.text}”
            </p>

            <cite className="mt-3 block text-[10px] not-italic uppercase tracking-[0.2em] text-[var(--color-muted)]">
              {about.quote.attribution}
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
