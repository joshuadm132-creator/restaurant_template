
import { restaurantConfig } from "@/config/restaurant";
import ReservationForm from "./Form";

export default function LuxuryContact() {
  const { contact } = restaurantConfig;

  return (
    <section
      id="contact"
      className="bg-[var(--color-background)] px-6 py-28 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <p className="mb-5 text-xs tracking-[0.35em] text-[var(--color-primary)]">
            {contact.eyebrow}
          </p>

          <h2 className="mb-6 text-5xl leading-tight text-[var(--color-foreground)] md:text-7xl">
            {contact.title}
          </h2>

          <p className="mx-auto max-w-xl text-sm leading-8 text-[var(--color-muted)]">
            {contact.description}
          </p>
        </div>

        {/* Contact information */}
        <div className="mb-24 grid gap-12 border-y border-[var(--color-border)] py-12 md:grid-cols-3 md:gap-8">

          <div>
            <p className="mb-4 text-xs tracking-[0.25em] text-[var(--color-primary)]">
              VISIT
            </p>
            <p className="text-sm leading-7 text-[var(--color-muted)]">
              {contact.details.address}
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs tracking-[0.25em] text-[var(--color-primary)]">
              CONTACT
            </p>
            <div className="space-y-2 text-sm leading-7 text-[var(--color-muted)]">
              <p>{contact.details.telephone}</p>
              <p>{contact.details.email}</p>
              {contact.details.whatsapp && (
                <p>WhatsApp: {contact.details.whatsapp}</p>
              )}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs tracking-[0.25em] text-[var(--color-primary)]">
              OPENING HOURS
            </p>
            <div className="space-y-3">
              {contact.openingHours.map((item) => (
                <div
                  key={item.days}
                  className="flex flex-wrap justify-between gap-2 text-sm"
                >
                  <span className="text-[var(--color-muted)]">
                    {item.days}
                  </span>
                  <span className="text-[var(--color-foreground)]">
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Reservation */}
        <div className="mx-auto max-w-3xl">

          <div className="mb-10 text-center">
            <p className="mb-4 text-xs tracking-[0.3em] text-[var(--color-primary)]">
              {contact.reservation.eyebrow}
            </p>

            <h3 className="mb-4 text-4xl text-[var(--color-foreground)] md:text-5xl">
              {contact.reservation.title}
            </h3>

            <p className="text-sm leading-7 text-[var(--color-muted)]">
              {contact.reservation.description}
            </p>
          </div>

          <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-12">
            <ReservationForm />
          </div>

        </div>

        {/* Directions */}
        {contact.location.mapUrl && (
          <div className="mt-16 text-center">
            <a
              href={contact.location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-b border-[var(--color-primary)] pb-2 text-xs tracking-[0.2em] text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-hover)]"
            >
              {contact.location.directionsLabel} ↗
            </a>
          </div>
        )}

      </div>
    </section>
  );
}
