
import Navbar from "@/components/layout/navbar";
import RusticHero from "@/components/home/hero/RusticHero";
import RusticAbout from "@/components/sections/RusticAbout";
import RusticMenu from "@/components/sections/RusticMenu";
import RusticFooter from "@/components/layout/footer/rusticFooter";
import RusticGallery from "@/components/sections/RusticGaller";
import ReservationForm from "@/components/sections/RusticContact";

export default function RusticPreview() {
  return (
    <main>
      <Navbar variant="rustic" />
      <RusticHero />
      <RusticGallery/>
      <RusticAbout />
      <RusticMenu />
      <ReservationForm/>
      <RusticFooter />
    </main>
  );
}
