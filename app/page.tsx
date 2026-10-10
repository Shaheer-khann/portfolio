import { About } from "@/components/sections/About";
import { AlsoBuilt } from "@/components/sections/AlsoBuilt";
import { Areas } from "@/components/sections/Areas";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Papers } from "@/components/sections/Papers";
import { Thesis } from "@/components/sections/Thesis";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Thesis />
      <Areas />
      <Papers />
      <AlsoBuilt />
      <About />
      <Contact />
    </>
  );
}
