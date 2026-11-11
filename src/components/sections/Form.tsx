
"use client";

import type { FormEvent } from "react";
import { restaurantConfig } from "@/config/restaurant";

export default function ReservationForm() {
  const { contact } = restaurantConfig;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name");
    const email = formData.get("email");
    const telephone = formData.get("telephone");
    const date = formData.get("date");
    const time = formData.get("time");
    const guests = formData.get("guests");
    const message = formData.get("message");

    const whatsappNumber = contact.details.whatsapp.replace(/\D/g, "");

    if (!whatsappNumber) {
      alert("The restaurant's WhatsApp number has not been configured.");
      return;
    }

    const reservationMessage = `
Hello! I would like to request a reservation.

Name: ${name}
Email: ${email}
Telephone: ${telephone}
Date: ${date}
Time: ${time}
Number of guests: ${guests}

Additional requests:
${message || "None"}

Please let me know if this reservation is available.
    `.trim();

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(reservationMessage)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (

  <form onSubmit={handleSubmit} className="space-y-6">

    {/* Name */}
    <div className="space-y-2">
      <label
        htmlFor="name"
        className="block text-sm font-medium text-[var(--color-foreground)]"
      >
        Full Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Your name"
        required
        className="w-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3.5 text-sm text-[var(--color-foreground)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)]"
      />
    </div>

    {/* Email and Telephone */}
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[var(--color-foreground)]"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          className="w-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3.5 text-sm text-[var(--color-foreground)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)]"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="telephone"
          className="block text-sm font-medium text-[var(--color-foreground)]"
        >
          Telephone
        </label>
        <input
          id="telephone"
          name="telephone"
          type="tel"
          placeholder="Your phone number"
          required
          className="w-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3.5 text-sm text-[var(--color-foreground)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)]"
        />
      </div>
    </div>

    {/* Date and Time */}
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-2">
        <label
          htmlFor="date"
          className="block text-sm font-medium text-[var(--color-foreground)]"
        >
          Reservation Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          required
          className="w-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3.5 text-sm text-[var(--color-foreground)] outline-none transition-colors focus:border-[var(--color-primary)]"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="time"
          className="block text-sm font-medium text-[var(--color-foreground)]"
        >
          Reservation Time
        </label>
        <input
          id="time"
          name="time"
          type="time"
          required
          className="w-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3.5 text-sm text-[var(--color-foreground)] outline-none transition-colors focus:border-[var(--color-primary)]"
        />
      </div>
    </div>

    {/* Guests */}
    <div className="space-y-2">
      <label
        htmlFor="guests"
        className="block text-sm font-medium text-[var(--color-foreground)]"
      >
        Number of Guests
      </label>
      <select
        id="guests"
        name="guests"
        required
        defaultValue="2"
        className="w-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3.5 text-sm text-[var(--color-foreground)] outline-none transition-colors focus:border-[var(--color-primary)]"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
          <option key={number} value={number}>
            {number} {number === 1 ? "Guest" : "Guests"}
          </option>
        ))}
        <option value="11+">More than 10 guests</option>
      </select>
    </div>

    {/* Additional Requests */}
    <div className="space-y-2">
      <label
        htmlFor="message"
        className="block text-sm font-medium text-[var(--color-foreground)]"
      >
        Additional Requests
        <span className="ml-2 font-normal text-[var(--color-muted)]">
          (Optional)
        </span>
      </label>
      <textarea
        id="message"
        name="message"
        rows={4}
        placeholder="Any special requests or additional information?"
        className="w-full resize-y border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3.5 text-sm text-[var(--color-foreground)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)]"
      />
    </div>

    {/* Submit */}
    <button
      type="submit"
      className="w-full bg-[var(--color-primary)] px-6 py-4 text-sm font-semibold tracking-wide text-[var(--color-on-primary)] transition-colors hover:bg-[var(--color-primary-hover)]"
    >
      {restaurantConfig.contact.reservation.submitLabel}
    </button>

    <p className="text-xs leading-6 text-[var(--color-muted)]">
      Your request will open in WhatsApp. Your reservation is not confirmed
      until the restaurant responds.
    </p>
  </form>
);

}
