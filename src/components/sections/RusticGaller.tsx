
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { restaurantConfig } from "@/config/restaurant";

export default function RusticGallery() {
  const { gallery } = restaurantConfig;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const images = gallery.images;

  const closeGallery = () => setActiveIndex(null);

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

  // Allow visitors to navigate and close using their keyboard.
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  return (
    <section
      id="gallery"
      className="bg-[var(--color-background)] px-6 py-24 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* Gallery heading */}
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm tracking-[0.2em] text-[var(--color-primary)]">
            {gallery.eyebrow}
          </p>

          <h2 className="mb-4 text-4xl md:text-5xl">
            {gallery.title}
          </h2>

          <p className="text-[var(--color-muted)]">
            {gallery.description}
          </p>
        </div>

        {/* Image layout */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {images.map((image, index) => {
            const layoutClasses = [
              "col-span-2 row-span-2 aspect-[4/5] md:aspect-auto",
              "col-span-2 aspect-[16/9]",
              "aspect-square",
              "aspect-square",
              "col-span-2 aspect-[16/9]",
              "col-span-2 aspect-[16/9]",
            ];

            return (
              <button
                key={image.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View image: ${image.alt}`}
                className={`group relative overflow-hidden text-left ${layoutClasses[index % layoutClasses.length]}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Image caption */}
                {image.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-12 text-white">
                    <p className="text-sm tracking-wide">
                      {image.caption}
                    </p>
                  </div>
                )}

                {/* Hover indicator */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/15">
                  <span className="translate-y-2 text-sm tracking-widest text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    VIEW IMAGE
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-5"
          onClick={closeGallery}
        >
          <button
            type="button"
            onClick={closeGallery}
            aria-label="Close gallery"
            className="absolute right-6 top-5 z-10 text-4xl text-white"
          >
            ×
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label="Previous image"
            className="absolute left-3 z-10 px-3 py-4 text-3xl text-white md:left-8"
          >
            ‹
          </button>

          <div
            className="relative h-[75vh] w-full max-w-5xl"
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
              <p className="absolute -bottom-9 left-0 w-full text-center text-sm text-white">
                {images[activeIndex].caption}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
            className="absolute right-3 z-10 px-3 py-4 text-3xl text-white md:right-8"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
