
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { restaurantConfig } from "@/config/restaurant";

type DishImage = {
  src: string;
  alt: string;
  label: string;
};

export default function LuxuryMenu() {
  const { menu } = restaurantConfig;
  const [activeImage, setActiveImage] = useState<DishImage | null>(null);

  // Close the image preview with Escape and prevent background scrolling.
  useEffect(() => {
    if (!activeImage) return;

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeImage]);

  return (
    <>
      <section
        id="menu"
        className="bg-[var(--color-background)] px-6 py-28 sm:px-10 lg:py-36"
      >
        <div className="mx-auto max-w-5xl">
          {/* Introduction */}
          <header className="mx-auto mb-24 max-w-2xl text-center">
            <span className="mb-7 block text-[10px] uppercase tracking-[0.4em] text-[var(--color-primary)]">
              {menu.eyebrow}
            </span>

            <h2 className="font-[var(--font-display)] text-5xl font-normal leading-tight sm:text-6xl lg:text-7xl">
              {menu.title}
            </h2>

            <div className="mx-auto my-8 flex max-w-xs items-center gap-4">
              <span className="h-px flex-1 bg-[var(--color-accent)]/50" />
              <span className="text-sm text-[var(--color-primary)]">✦</span>
              <span className="h-px flex-1 bg-[var(--color-accent)]/50" />
            </div>

            <p className="mx-auto max-w-lg text-sm leading-8 text-[var(--color-muted)]">
              {menu.description}
            </p>
          </header>

          {/* Menu categories */}
          <div className="mx-auto max-w-3xl">
            {menu.categories.map((category, index) => (
              <section
                key={category.id}
                className="mb-16 last:mb-0"
              >
                {/* Category heading */}
                <div className="mb-10 text-center">
                 
                  <h3 className="font-[var(--font-display)] text-3xl sm:text-4xl">
                    {category.name}
                  </h3>

                  <p className="mt-3 text-xs tracking-wide text-[var(--color-muted)]">
                    {category.description}
                  </p>
                </div>

                {/* Dishes */}
                <div className="space-y-9">
                  {category.items.map((item) => (
                    <article key={item.id}>
                      <div className="flex items-baseline gap-3">
                        <h4 className="font-[var(--font-display)] text-lg sm:text-xl">
                          {item.name}
                        </h4>

                        <span className="h-px flex-1 border-b border-dotted border-[var(--color-accent)]/40" />

                        <span className="shrink-0 text-sm tabular-nums text-[var(--color-primary)]">
                          {item.price}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                        <p className="max-w-xl text-xs leading-6 text-[var(--color-muted)]">
                          {item.description}
                        </p>

                        {item.image && (
                          <button
                            type="button"
                            onClick={() => setActiveImage(item.image)}
                            aria-label={`${item.image.label}: ${item.name}`}
                            className="shrink-0 border-b border-[var(--color-accent)]/60 pb-1 text-[10px] uppercase tracking-[0.15em] text-[var(--color-primary)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-foreground)]"
                          >
                            {item.image.label}
                          </button>
                        )}
                      </div>
                    </article>
                  ))}
                </div>

                {/* Category divider */}
                {index !== menu.categories.length - 1 && (
                  <div className="mx-auto mt-16 flex max-w-xs items-center gap-4">
                    <span className="h-px flex-1 bg-[var(--color-accent)]/30" />
                    <span className="text-[10px] text-[var(--color-accent)]">
                      ✦
                    </span>
                    <span className="h-px flex-1 bg-[var(--color-accent)]/30" />
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* Image lightbox */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-5 backdrop-blur-sm"
          onClick={() => setActiveImage(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Dish image preview"
            className="relative w-full max-w-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              aria-label="Close image preview"
              className="absolute -right-1 -top-12 flex h-9 w-9 items-center justify-center border border-white/30 text-white transition-colors hover:bg-white hover:text-black sm:-right-12 sm:top-0"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="m18 6-12 12M6 6l12 12" />
              </svg>
            </button>

            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              width={1200}
              height={900}
              unoptimized
              className="max-h-[80vh] w-full object-contain"
            />

            <p className="mt-5 text-center text-[10px] uppercase tracking-[0.2em] text-white/60">
              {activeImage.alt}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
