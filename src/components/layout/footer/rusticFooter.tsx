
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { restaurantConfig } from "@/config/restaurant";

export default function LuxuryFooter() {
  const { name } = restaurantConfig;
  const { footer } = restaurantConfig;
  const [year, setYear] = useState<number>(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <footer
      id="contact"
      className="overflow-hidden bg-[var(--color-foreground)] text-[var(--color-background)]"
    >
      {/* Closing invitation */}
      <div className="relative border-b border-[var(--color-background)]/15">

        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-20 md:grid-cols-[1fr_auto] md:px-12 lg:px-20 lg:py-28">

          <div className="relative z-10 max-w-3xl">
            <p className="mb-6 font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-primary)]">
              Until we meet again
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-5xl leading-[1.05] md:text-6xl lg:text-7xl">
              {footer.closingMessage}
            </h2>

            <p className="mt-6 max-w-lg font-[family-name:var(--font-body)] text-sm leading-7 text-[var(--color-background)]/65 md:text-base">
              {footer.description}
            </p>
          </div>

          <div className="relative z-10">
            <a
              href={footer.reservation.href}
              className="inline-flex items-center gap-6 bg-[var(--color-primary)] px-7 py-5 font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-on-primary)] transition-colors hover:bg-[var(--color-primary-hover)]"
            >
              {footer.reservation.label}
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Decorative botanical illustration */}
          <svg
            viewBox="0 0 240 240"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -bottom-14 h-64 w-64 text-[var(--color-accent)] opacity-20 md:right-24 md:h-80 md:w-80"
          >
            <path
              d="M120 240 C120 190 113 130 120 35"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            <path
              d="M120 180 C75 176 43 148 38 112 C77 113 110 137 120 180Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            <path
              d="M120 180 C165 176 197 148 202 112 C163 113 130 137 120 180Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            <path
              d="M120 135 C80 126 62 99 66 69 C99 79 117 104 120 135Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            <path
              d="M120 135 C160 126 178 99 174 69 C141 79 123 104 120 135Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            <path
              d="M120 88 C92 76 85 52 97 27 C119 43 126 65 120 88Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            <path
              d="M120 88 C148 76 155 52 143 27 C121 43 114 65 120 88Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>

        </div>
      </div>

      {/* Main footer information */}
      <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-16 md:grid-cols-2 md:px-12 lg:grid-cols-[1.3fr_0.8fr_1fr_1.1fr] lg:gap-12 lg:px-20 lg:py-20">

        {/* Restaurant identity */}
        <div>
          <a
            href="/"
            className="font-[family-name:var(--font-display)] text-4xl font-semibold"
          >
            {name}
          </a>

          <p className="mt-5 max-w-xs font-[family-name:var(--font-body)] text-sm leading-7 text-[var(--color-background)]/60">
            {footer.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-5">
            {footer.social
              .filter((item) => item.href)
              .map((item) => (
                <a
                  key={item.platform}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-body)] text-xs text-[var(--color-background)]/70 transition-colors hover:text-[var(--color-primary)]"
                >
                  {item.platform}
                </a>
              ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="mb-6 font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Explore
          </h3>

          <ul className="space-y-4">
            {footer.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-[family-name:var(--font-body)] text-sm text-[var(--color-background)]/70 transition-colors hover:text-[var(--color-primary)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Opening hours */}
        <div>
          <h3 className="mb-6 font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Opening Hours
          </h3>

          <ul className="space-y-5">
            {footer.openingHours.map((item) => (
              <li key={item.days}>
                <p className="font-[family-name:var(--font-body)] text-xs text-[var(--color-background)]/50">
                  {item.days}
                </p>

                <p className="mt-1 font-[family-name:var(--font-display)] text-lg">
                  {item.hours}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact information */}
        <div>
          <h3 className="mb-6 font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Find Us
          </h3>

          <div className="space-y-5 font-[family-name:var(--font-body)] text-sm text-[var(--color-background)]/70">

            {footer.contact.address && (
              <p className="leading-7">
                {footer.contact.address}
              </p>
            )}

            {footer.contact.telephone && (
              <a
                href={`tel:${footer.contact.telephone}`}
                className="block transition-colors hover:text-[var(--color-primary)]"
              >
                {footer.contact.telephone}
              </a>
            )}

            {footer.contact.email && (
              <a
                href={`mailto:${footer.contact.email}`}
                className="block transition-colors hover:text-[var(--color-primary)]"
              >
                {footer.contact.email}
              </a>
            )}

          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-[var(--color-background)]/15">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 px-6 py-7 md:flex-row md:items-center md:px-12 lg:px-20">

          <p className="font-[family-name:var(--font-body)] text-xs text-[var(--color-background)]/50">
            © {year} {name}. All rights reserved.
          </p>

          <p className="font-[family-name:var(--font-display)] text-lg italic text-[var(--color-background)]/60">
            Made for good company.
          </p>

        </div>
      </div>

    </footer>
  );
}
