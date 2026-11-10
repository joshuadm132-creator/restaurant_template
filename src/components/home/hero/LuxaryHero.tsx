
// import Image from "next/image";
// import { restaurantConfig } from "@/config/restaurant";

// export default function LuxuryHero() {
//   const { hero } = restaurantConfig;

//   return (
//     <section className="relative overflow-hidden bg-[var(--color-background)] text-[var(--color-foreground)]">

//       <div className="mx-auto grid min-h-[760px] max-w-[1600px] grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]">

//         {/* LEFT: Editorial content */}
//         <div className="relative z-10 flex flex-col justify-center px-7 py-20 sm:px-12 lg:px-16 xl:px-24">

//           {/* Top editorial label */}
//           <div className="mb-12 flex items-center gap-4">
//             <span className="h-px w-10 bg-[var(--color-primary)]" />

//             <p className="font-[family-name:var(--font-body)] text-[10px] font-semibold uppercase tracking-[0.35em] text-[var(--color-primary)]">
//               {hero.eyebrow}
//             </p>
//           </div>

//           {/* Main heading */}
//           <h1 className="max-w-2xl font-[family-name:var(--font-display)] text-6xl font-medium leading-[0.98] tracking-[-0.04em] sm:text-7xl xl:text-8xl">
//             {hero.heading}
//           </h1>

//           {/* Supporting text */}
//           <div className="mt-10 flex max-w-lg gap-5">

//             <div className="mt-1 h-16 w-px shrink-0 bg-[var(--color-primary)]" />

//             <p className="font-[family-name:var(--font-body)] text-sm leading-8 text-[var(--color-muted)] sm:text-base">
//               {hero.description}
//             </p>

//           </div>

//           {/* Actions */}
//           <div className="mt-12 flex flex-wrap items-center gap-8">

//             <a
//               href={hero.primaryButton.href}
//               className="group flex items-center gap-5 border border-[var(--color-primary)] bg-[var(--color-primary)] px-7 py-4 font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-on-primary)] transition-colors hover:bg-transparent hover:text-[var(--color-primary)]"
//             >
//               {hero.primaryButton.label}

//               <span className="transition-transform group-hover:translate-x-1">
//                 →
//               </span>
//             </a>

//             <a
//               href={hero.secondaryButton.href}
//               className="group flex items-center gap-3 font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-foreground)] transition-colors hover:text-[var(--color-primary)]"
//             >
//               {hero.secondaryButton.label}

//               <span className="transition-transform group-hover:translate-x-1">
//                 →
//               </span>
//             </a>

//           </div>

//           {/* Bottom editorial detail */}
//           <div className="mt-20 flex items-center gap-4">
//             <span className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-primary)]">
//               01
//             </span>

//             <span className="h-px w-12 bg-[var(--color-border)]" />

//             <span className="font-[family-name:var(--font-body)] text-[9px] uppercase tracking-[0.3em] text-[var(--color-muted)]">
//               The dining experience
//             </span>
//           </div>

//         </div>

//         {/* RIGHT: Cinematic image */}
//         <div className="relative min-h-[540px] lg:min-h-[760px]">

//           {/* Main photograph */}
//           <div className="absolute inset-0 overflow-hidden lg:inset-y-8 lg:right-8 lg:left-0">

//             <Image
//               src={hero.images.luxury.src}
//               alt={hero.images.luxury.alt}
//               fill
//               priority
//               sizes="(max-width: 1024px) 100vw, 60vw"
//               className="object-cover"
//             />

//             {/* Subtle image treatment */}
//             <div className="absolute inset-0 bg-black/10" />

//           </div>

//           {/* Architectural frame */}
//           <div className="pointer-events-none absolute inset-5 z-10 border border-[var(--color-primary)]/50 lg:inset-y-14 lg:right-14 lg:left-6">

//             {/* Top-left corner detail */}
//             <span className="absolute -top-px -left-px h-12 w-12 border-t-2 border-l-2 border-[var(--color-primary)]" />

//             {/* Bottom-right corner detail */}
//             <span className="absolute -right-px -bottom-px h-12 w-12 border-r-2 border-b-2 border-[var(--color-primary)]" />

//           </div>

//           {/* Vertical editorial label */}
//           <div className="absolute top-1/2 right-3 z-20 hidden -translate-y-1/2 rotate-180 lg:block">
//             <span
//               className="font-[family-name:var(--font-body)] text-[9px] uppercase tracking-[0.35em] text-white/80"
//               style={{ writingMode: "vertical-rl" }}
//             >
//               An invitation to dine
//             </span>
//           </div>

//         </div>

//       </div>
//       {/* Bottom architectural line */}
//       <div className="absolute right-0 bottom-0 left-0 h-px bg-[var(--color-border)]" />
//     </section>
//   );
// }

import Image from "next/image";
import { restaurantConfig } from "@/config/restaurant";

export default function LuxuryHero() {
  const { hero } = restaurantConfig;

  return (
    <section className="relative flex min-h-[750px] items-center justify-center overflow-hidden bg-[var(--color-background)] text-[var(--color-foreground)]">

      <Image
        src={hero.images.luxury.src}
        alt={hero.images.luxury.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Image overlay */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">

        <p className="mb-8 font-[family-name:var(--font-body)] text-xs font-medium tracking-[0.4em] text-[var(--color-primary)]">
          {hero.eyebrow}
        </p>

        <h1 className="font-[family-name:var(--font-display)] text-5xl leading-tight tracking-wide sm:text-6xl md:text-7xl lg:text-8xl">
          {hero.heading}
        </h1>

        <p className="mx-auto mt-8 max-w-2xl font-[family-name:var(--font-body)] text-base leading-8 text-[var(--color-muted)] md:text-lg">
          {hero.description}
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">

          <a
            href={hero.primaryButton.href}
            className="border border-[var(--color-primary)] bg-[var(--color-primary)] px-8 py-4 font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-on-primary)] transition-colors hover:bg-transparent hover:text-[var(--color-primary)]"
          >
            {hero.primaryButton.label}
          </a>

          <a
            href={hero.secondaryButton.href}
            className="border border-[var(--color-border)] px-8 py-4 font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-foreground)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          >
            {hero.secondaryButton.label}
          </a>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full bg-[var(--color-border)]" />
    </section>
  );
}
