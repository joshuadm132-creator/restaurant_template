import { restaurantConfig } from "@/config/restaurant";
import ReservationForm from "./Form";

export default function RusticContact() {
  const { contact } = restaurantConfig;

  return (
    <section
      id="contact"
      className="bg-[var(--color-background)] px-6 py-24 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-[var(--color-primary)]">
            {contact.eyebrow}
          </p>

          <h2 className="mb-5 text-5xl leading-tight text-[var(--color-foreground)] md:text-6xl">
            {contact.title}
          </h2>

          <p className="max-w-xl leading-8 text-[var(--color-muted)]">
            {contact.description}
          </p>
        </div>

        {/* Main content */}
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Restaurant information */}
          <div className="flex flex-col justify-between">
            <div className="space-y-10">
              <div>
                <h3 className="mb-3 font-semibold text-[var(--color-foreground)]">
                  Visit Us
                </h3>
                <p className="leading-7 text-[var(--color-muted)]">
                  {contact.details.address}
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-[var(--color-foreground)]">
                  Get in Touch
                </h3>

                <div className="space-y-2 text-[var(--color-muted)]">
                  <p>{contact.details.telephone}</p>
                  <p>{contact.details.email}</p>
                  <p>
                    {contact.details.whatsapp &&
                      `WhatsApp: ${contact.details.whatsapp}`}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-semibold text-[var(--color-foreground)]">
                  Opening Hours
                </h3>

                <div className="space-y-3">
                  {contact.openingHours.map((item) => (
                    <div
                      key={item.days}
                      className="flex justify-between gap-4 border-b border-[var(--color-border)] pb-3 text-sm"
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

            {contact.location.mapUrl && (
              <a
                href={contact.location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex w-fit items-center border-b border-[var(--color-primary)] pb-2 text-sm text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-hover)]"
              >
                {contact.location.directionsLabel}
                <span className="ml-3">↗</span>
              </a>
            )}
          </div>

          {/* Reservation form */}
        <div className="relative">
         <div className="absolute top-[2%] left-[4%] rounded-4xl shadow w-[100%] h-[100%] bg-[var(--color-primary)] z-0"/>
          <div className="relative bg-[var(--color-surface)] rounded-4xl p-6 md:p-10 lg:p-12 shadow-4xl z-20">
           <div className="mb-8" >
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[var(--color-primary)]">
                {contact.reservation.eyebrow}
              </p>

              <h3 className="mb-3 text-3xl text-[var(--color-foreground)] md:text-4xl">
                {contact.reservation.title}
              </h3>

              <p className="text-sm leading-7 text-[var(--color-muted)]">
                {contact.reservation.description}
              </p>
            </div>
            <ReservationForm />
            
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
