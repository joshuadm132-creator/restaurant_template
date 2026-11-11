
import Navbar from "@/components/layout/navbar";
import LuxuryHero from "@/components/home/hero/LuxaryHero";
import LuxuryAbout from "@/components/sections/LuxuryAbout";
import LuxuryMenu from "@/components/sections/LuxuryMenu";
import LuxuryFooter from "@/components/layout/footer/luxuryFooter";
import LuxuryGallery from "@/components/sections/LuxuryGaller";
import ReservationForm from "@/components/sections/LuxuryContact";

export default function LuxuryPreview() {
  return (
    <main>
      <Navbar variant="luxury" />
      <LuxuryHero />
      <LuxuryAbout />
      <LuxuryMenu />
      <LuxuryGallery/>
      <ReservationForm/>
      <LuxuryFooter />
    </main>
  );
}

