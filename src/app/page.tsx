import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { TechStack } from "@/components/sections/TechStack";
import { Portfolio } from "@/components/sections/Portfolio";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { Blog } from "@/components/sections/Blog";
import { FAQ } from "@/components/sections/FAQ";
import { SisterBrand } from "@/components/sections/SisterBrand";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <Services />
      <Process />
      <TechStack />
      <Portfolio />
      <WhyUs />
      <Testimonials />
      <Blog />
      <FAQ />
      <SisterBrand />
      <CTA />
    </>
  );
}
