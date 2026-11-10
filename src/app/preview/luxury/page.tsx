
import Navbar from "@/components/layout/navbar";
import LuxuryHero from "@/components/home/hero/LuxaryHero";
import LuxuryAbout from "@/components/sections/LuxuryAbout";
import LuxuryMenu from "@/components/sections/LuxuryMenu";
import LuxuryFooter from "@/components/layout/footer/luxuryFooter";

export default function LuxuryPreview() {
  return (
    <main>
      <Navbar variant="luxury" />
      <LuxuryHero />
      <LuxuryAbout />
      <LuxuryMenu />
      <LuxuryFooter />
    </main>
  );
}

