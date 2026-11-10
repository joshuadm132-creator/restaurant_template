import Image from "next/image";
import { restaurantConfig } from "@/config/restaurant";

export default function RusticHero() {
  const { hero } = restaurantConfig;

  // The vase silhouette is defined in SVG coordinates from 0 to 1.

  const wavePath = `
  M 0.5 0.02

  C 0.62 0.02 0.63 0.10 0.72 0.10
  C 0.82 0.10 0.83 0.02 0.91 0.08
  C 1.00 0.14 0.91 0.23 0.94 0.32
  C 0.97 0.42 1.00 0.45 0.94 0.53
  C 0.88 0.62 0.97 0.68 0.93 0.77
  C 0.89 0.86 0.95 0.94 0.84 0.96
  C 0.73 0.98 0.68 0.91 0.59 0.96
  C 0.50 1.01 0.43 0.96 0.34 0.96
  C 0.25 0.96 0.19 0.99 0.12 0.94
  C 0.03 0.88 0.11 0.80 0.07 0.71
  C 0.03 0.62 0.10 0.57 0.06 0.49
  C 0.02 0.41 0.06 0.34 0.06 0.26
  C 0.06 0.17 0.00 0.12 0.09 0.07
  C 0.18 0.02 0.25 0.10 0.34 0.08
  C 0.42 0.06 0.40 0.02 0.5 0.02
  Z
`;

  return (
    <section className="overflow-hidden bg-[var(--color-background)] text-[var(--color-foreground)]">
      <div className="mx-auto grid min-h-[680px] max-w-[1440px] grid-cols-1 items-center gap-16 px-6 py-20 md:grid-cols-2 md:px-12 lg:px-20">
        {/* Hero content */}
        <div className="absolute top-[39%] left-[5%] z-0 h-[75%] w-67 border-0 border-yellow-900 bg-[var(--color-accent)]" />
        
        <div className="relative z-10 max-w-xl">
          <p className="mb-6 font-[family-name:var(--font-body)] text-xs font-semibold tracking-[0.25em] text-[var(--color-primary)]">
            {hero.eyebrow}
          </p>

          <h1 className="font-[family-name:var(--font-display)] text-5xl leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            {hero.heading}
          </h1>
  
          <p className="mt-7 max-w-md font-[family-name:var(--font-body)] text-base leading-8 text-[var(--color-muted)] md:text-lg">
            {hero.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a
              href={hero.primaryButton.href}
              className="bg-[var(--color-primary)] px-7 py-4 font-[family-name:var(--font-body)] text-sm font-medium text-[var(--color-on-primary)] transition-colors hover:bg-[var(--color-primary-hover)]"
            >
              {hero.primaryButton.label}
            </a>

            <a
              href={hero.secondaryButton.href}
              className="border-b border-[var(--color-border)] pb-1 font-[family-name:var(--font-body)] text-sm font-medium text-[var(--color-foreground)] transition-colors hover:text-[var(--color-primary)]"
            >
              {hero.secondaryButton.label}
            </a>
          </div>
        </div>

        {/* Vase-shaped photograph */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px]">
          {/* Decorative background shape */}
          <div className="absolute top-[10%] left-[-20%] border-10 rounded-full  z-0 h-46 w-46 bg-[var(--color-accent)]" />
          {/* SVG clip path and image */}
          <svg className="absolute h-0 w-0" aria-hidden="true">
            <defs>
              <clipPath id="vase-clip" clipPathUnits="objectBoundingBox">
                <path d={wavePath} />
              </clipPath>
            </defs>
          </svg>

          <div
            className="absolute inset-0 z-10"
            style={{ clipPath: "url(#vase-clip)" }}
          >
            <Image
              src={hero.images.rustic.src}
              alt={hero.images.rustic.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Decorative vase outline */}
          <svg
            viewBox="0 0 1 1"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <path
              d={wavePath}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="0.006"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
