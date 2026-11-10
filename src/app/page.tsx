
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#171613] px-6 text-[#F4F0E8]">
      <section className="w-full max-w-xl text-center">

        <p className="mb-4 text-sm tracking-[0.2em] text-[#B8B1A4] uppercase">
          Restaurant Website
        </p>

        <h1 className="mb-4 text-4xl md:text-5xl">
          Choose your style
        </h1>

        <p className="mb-10 text-[#B8B1A4]">
          Explore our two restaurant website designs.
        </p>

        <div className="flex justify-center gap-3">
          <Link
            href="/preview/rustic"
            className="border border-[#A65D42] px-7 py-3 text-sm transition-colors hover:bg-[#A65D42] hover:text-white"
          >
            Rustic
          </Link>

          <Link
            href="/preview/luxury"
            className="border border-[#D2B887] px-7 py-3 text-sm text-[#D2B887] transition-colors hover:bg-[#D2B887] hover:text-[#171613]"
          >
            High End
          </Link>
        </div>

      </section>
    </main>
  );
}
