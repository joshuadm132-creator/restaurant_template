
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { restaurantConfig } from "@/config/restaurant";

export default function LuxuryGallery() {
  const { gallery } = restaurantConfig;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const images = gallery.images;

  // Each layout has its own grid proportions.
  const layoutStyles: Record<string, string> = {
    feature:
      "col-span-2 row-span-2 md:col-span-8 md:row-span-2",
    portrait:
      "col-span-1 row-span-2 md:col-span-4 md:row-span-2",
    landscape:
      "col-span-2 row-span-1 md:col-span-8 md:row-span-1",
    square:
      "col-span-1 row-span-1 md:col-span-4 md:row-span-1",
  };

  const showPrevious = () => {
    if (activeIndex === null) return;

    setActiveIndex(
      (activeIndex - 1 + images.length) % images.length
    );
  };

  const showNext = () => {
    if (activeIndex === null) return;

    setActiveIndex((activeIndex + 1) % images.length);
  };

  // Keyboard navigation and background scroll control.
  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? null
            : (current - 1 + images.length) % images.length
        );
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null
            ? null
            : (current + 1) % images.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, images.length]);

  return (
    <section
      id="gallery"
      className="bg-[var(--color-background)] px-6 py-28 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* Editorial heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-5 text-xs tracking-[0.3em] text-[var(--color-primary)]">
            {gallery.eyebrow}
          </p>

          <h2 className="mb-6 text-4xl leading-tight md:text-6xl">
            {gallery.title}
          </h2>

          <div className="mx-auto mb-6 h-px w-16 bg-[var(--color-primary)]" />

          <p className="text-sm leading-7 text-[var(--color-muted)] md:text-base">
            {gallery.description}
          </p>
        </div>

        {/* Editorial image grid */}
        <div className="grid auto-rows-[170px] grid-cols-2 gap-3 md:auto-rows-[230px] md:grid-cols-12 md:gap-5">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View image: ${image.alt}`}
              className={`group relative overflow-hidden bg-[var(--color-surface)] text-left ${
                layoutStyles[image.layout] ?? layoutStyles.square
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 60vw, 800px"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Subtle image overlay */}
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

              {image.caption && (
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-7">
                  <p className="text-xs tracking-[0.2em] text-white">
                    {image.caption}
                  </p>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {activeIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-5"
            onClick={() => setActiveIndex(null)}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close gallery"
              className="absolute right-7 top-5 text-4xl text-white"
            >
              ×
            </button>

            <button
              type="button"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              className="absolute left-3 z-10 px-3 py-4 text-3xl text-white md:left-8"
            >
              ‹
            </button>

            <div
              className="relative h-[70vh] w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />

              {images[activeIndex].caption && (
                <p className="absolute -bottom-9 w-full text-center text-sm tracking-widest text-white">
                  {images[activeIndex].caption}
                </p>
              )}
            </div>

            <button
              type="button"
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="absolute right-3 z-10 px-3 py-4 text-3xl text-white md:right-8"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
