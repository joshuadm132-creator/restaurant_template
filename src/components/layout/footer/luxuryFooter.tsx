"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { restaurantConfig } from "@/config/restaurant";

export default function LuxuryFooter() {
  const { name, tagline } = restaurantConfig;
  const { footer } = restaurantConfig;
  const [year, setYear] = useState<number>(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  const contactItems = [
    { label: "Address", value: footer.contact.address },
    { label: "Telephone", value: footer.contact.telephone },
    { label: "Email", value: footer.contact.email },
  ].filter((item) => item.value);

  return (
    <footer className="bg-[var(--color-foreground)] text-[var(--color-background)]">
      {/* Restaurant identity */}
      <div className="mx-auto max-w-7xl px-6 pb-14 pt-24 text-center sm:px-10">
        <span className="mb-5 block text-xs uppercase tracking-[0.4em] text-[var(--color-accent)]">
          An invitation to dine
        </span>

        <h2 className="font-[var(--font-display)] text-5xl tracking-wide sm:text-7xl">
          {name}
        </h2>

        <p className="mt-5 text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">
          {tagline}
        </p>

        <div className="mx-auto mt-12 flex max-w-md items-center gap-5">
          <span className="h-px flex-1 bg-[var(--color-accent)]/40" />
          <span className="text-[var(--color-accent)]">✦</span>
          <span className="h-px flex-1 bg-[var(--color-accent)]/40" />
        </div>
      </div>

      {/* Information columns */}
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 sm:px-10 md:grid-cols-3">
        {/* Navigation */}
        <div className="text-center md:text-left">
          <h3 className="mb-7 text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
            Discover
          </h3>

          <ul className="space-y-4">
            {footer.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-background)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Opening hours */}
        <div className="text-center">
          <h3 className="mb-7 text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
            Opening Hours
          </h3>

          <ul className="space-y-4">
            {footer.openingHours.map((item) => (
              <li
                key={item.days}
                className="flex flex-col gap-1 text-sm sm:flex-row sm:justify-center sm:gap-3"
              >
                <span className="text-[var(--color-muted)]">{item.days}</span>
                <span>{item.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center md:text-right">
          <h3 className="mb-7 text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
            Find Us
          </h3>

          <div className="space-y-4 text-sm text-[var(--color-muted)]">
            {contactItems.map((item) => (
              <p key={item.label}>
                <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  {item.label}
                </span>
                {item.value}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Reservation invitation */}
      <div className="border-y border-[var(--color-accent)]/30 px-6 py-10 text-center">
        <p className="mb-5 font-[var(--font-display)] text-2xl sm:text-3xl">
          An evening worth remembering.
        </p>

        <Link
          href={footer.reservation.href}
          className="inline-flex border border-[var(--color-accent)] px-9 py-4 text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]"
        >
          {footer.reservation.label}
        </Link>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-8 text-center sm:px-10 md:flex-row md:text-left">
        <p className="text-xs text-[var(--color-muted)]">
          © {year} {name}. All rights reserved.
        </p>

        <div className="flex gap-7">
          {footer.social
            .filter((social) => social.href)
            .map((social) => (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-background)]"
              >
                {social.platform}
              </a>
            ))}
        </div>
      </div>
    </footer>
  );
}
