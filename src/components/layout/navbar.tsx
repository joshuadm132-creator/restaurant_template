
"use client";

import { useState } from "react";
import { restaurantConfig } from "@/config/restaurant";

type NavbarProps = {
  variant?: "rustic" | "luxury";
};

export default function Navbar({
  variant = "rustic",
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const { navigation, name } = restaurantConfig;

  const isLuxury = variant === "luxury";

  const containerStyle = isLuxury
    ? "absolute inset-x-0 top-0 z-50 border-b border-white/15 bg-black/20 text-white"
    : "relative z-50 border-b border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)]";

  const linkStyle = isLuxury
    ? "text-white/80 hover:text-[var(--color-primary)]"
    : "text-[var(--color-muted)] hover:text-[var(--color-primary)]";

  const buttonStyle = isLuxury
    ? "border border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-transparent hover:text-[var(--color-primary)]"
    : "bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary-hover)]";

  return (
    <header className={containerStyle}>
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-24 max-w-[1600px] items-center justify-between px-6 md:px-12 lg:px-20"
      >
        {/* Restaurant identity */}
        <a
          href="/"
          className="relative z-50 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight"
        >
          {name}
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navigation.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-[family-name:var(--font-body)] text-xs font-medium tracking-wide transition-colors ${linkStyle}`}
            >
              {link.label}
            </a>
          ))}

          <a
            href={navigation.button.href}
            className={`px-6 py-3 font-[family-name:var(--font-body)] text-xs font-semibold tracking-wide transition-colors ${buttonStyle}`}
          >
            {navigation.button.label}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-px w-6 transition-transform ${
              menuOpen ? "translate-y-[4px] rotate-45" : ""
            } ${isLuxury ? "bg-white" : "bg-[var(--color-foreground)]"}`}
          />

          <span
            className={`h-px w-6 transition-opacity ${
              menuOpen ? "opacity-0" : "opacity-100"
            } ${isLuxury ? "bg-white" : "bg-[var(--color-foreground)]"}`}
          />

          <span
            className={`h-px w-6 transition-transform ${
              menuOpen ? "-translate-y-[8px] -rotate-45" : ""
            } ${isLuxury ? "bg-white" : "bg-[var(--color-foreground)]"}`}
          />
        </button>
      </nav>

      {/* Mobile navigation */}
      <div
        id="mobile-navigation"
        className={`absolute inset-x-0 top-full overflow-hidden transition-all duration-300 lg:hidden ${
          menuOpen
            ? "visible max-h-[500px] opacity-100"
            : "invisible max-h-0 opacity-0"
        } ${
          isLuxury
            ? "border-t border-white/10 bg-[#171613]"
            : "border-t border-[var(--color-border)] bg-[var(--color-background)]"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-6">
          {navigation.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`py-3 font-[family-name:var(--font-body)] text-sm transition-colors ${linkStyle}`}
            >
              {link.label}
            </a>
          ))}

          <a
            href={navigation.button.href}
            onClick={() => setMenuOpen(false)}
            className={`mt-4 px-6 py-4 text-center font-[family-name:var(--font-body)] text-xs font-semibold ${buttonStyle}`}
          >
            {navigation.button.label}
          </a>
        </div>
      </div>
    </header>
  );
}
