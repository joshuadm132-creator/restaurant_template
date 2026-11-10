
"use client";

import { useEffect, useState } from "react";
import { restaurantConfig } from "@/config/restaurant";

type DishImage = {
  src: string;
  alt: string;
  label: string;
};

export default function RusticMenu() {
  const { menu } = restaurantConfig;

  const [activeImage, setActiveImage] = useState<DishImage | null>(null);

  // Allow the lightbox to close with the Escape key.
  useEffect(() => {
    if (!activeImage) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  return (
    <>
      <section
        id="menu"
        className="bg-[var(--color-background)] px-6 py-24 sm:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          {/* Section introduction */}
          <div className="mb-16 max-w-2xl">
            <span className="mb-5 block text-xs font-semibold tracking-[0.25em] text-[var(--color-primary)]">
              {menu.eyebrow}
            </span>

            <h2 className="font-[var(--font-display)] text-5xl leading-tight sm:text-6xl lg:text-7xl">
              {menu.title}
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--color-muted)]">
              {menu.description}
            </p>

            <div className="mt-8 h-px w-24 bg-[var(--color-accent)]" />
          </div>

          {/* Menu categories */}
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-x-20">
            {menu.categories.map((category, index) => (
              <div key={category.id}>
                {/* Category heading */}
                <div className="mb-7 border-b border-[var(--color-border)] pb-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-[var(--font-display)] text-3xl sm:text-4xl">
                      {category.name}
                    </h3>

                  
                  </div>

                  <p className="mt-2 text-sm text-[var(--color-muted)]">
                    {category.description}
                  </p>
                </div>

                {/* Dishes */}
                <div className="space-y-7">
                  {category.items.map((item) => (
                    <article key={item.id}>
                      <div className="flex items-start justify-between gap-5">
                        <div className="min-w-0">
                          <h4 className="font-[var(--font-display)] text-xl sm:text-2xl">
                            {item.name}
                          </h4>

                          <p className="mt-2 max-w-md text-sm leading-6 text-[var(--color-muted)]">
                            {item.description}
                          </p>

                          {item.image && (
                            <button
                              type="button"
                              onClick={() => setActiveImage(item.image)}
                              className="mt-3 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-hover)]"
                              aria-label={`${item.image.label}: ${item.name}`}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                className="h-4 w-4"
                                aria-hidden="true"
                              >
                                <rect
                                  x="3"
                                  y="3"
                                  width="18"
                                  height="18"
                                  rx="2"
                                />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <path d="m21 15-5-5L5 21" />
                              </svg>

                              {item.image.label}
                            </button>
                          )}
                        </div>

                        <span className="shrink-0 pt-1 text-sm font-medium tabular-nums">
                          ${item.price}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dish image lightbox */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-5 backdrop-blur-sm"
          role="presentation"
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
              className="absolute -right-2 -top-12 flex h-9 w-9 items-center justify-center border border-white/30 text-white transition-colors hover:bg-white hover:text-black sm:-right-12 sm:top-0"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="m18 6-12 12M6 6l12 12" />
              </svg>
            </button>

            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-h-[80vh] w-full object-contain"
            />

            <p className="mt-4 text-center text-xs tracking-wide text-white/70">
              {activeImage.alt}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
