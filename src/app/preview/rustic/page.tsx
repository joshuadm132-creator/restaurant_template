
import Navbar from "@/components/layout/navbar";
import RusticHero from "@/components/home/hero/RusticHero";
import RusticAbout from "@/components/sections/RusticAbout";
import RusticMenu from "@/components/sections/RusticMenu";
import RusticFooter from "@/components/layout/footer/rusticFooter";

export default function RusticPreview() {
  return (
    <main>
      <Navbar variant="rustic" />
      <RusticHero />
      <RusticAbout />
      <RusticMenu />
      <RusticFooter />
    </main>
  );
}
