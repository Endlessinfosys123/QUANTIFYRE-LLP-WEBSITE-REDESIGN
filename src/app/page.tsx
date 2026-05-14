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
import { 
  getHeroSection, getServices, getPortfolio, 
  getBlogPosts, getFAQs, getTestimonials, 
  getStats, getCTASection, getSisterBrand 
} from "@/lib/supabase/data";

export default async function Home() {
  const [
    hero, 
    services, 
    portfolio, 
    blogPosts, 
    faqs, 
    testimonials, 
    stats, 
    cta, 
    sisterBrand
  ] = await Promise.all([
    getHeroSection('home'),
    getServices(),
    getPortfolio(),
    getBlogPosts(3),
    getFAQs(),
    getTestimonials(),
    getStats(),
    getCTASection('global'),
    getSisterBrand()
  ]);

  return (
    <>
      <Hero data={hero} stats={stats} />
      <TechMarquee />
      <Services data={services} />
      <Process />
      <TechStack />
      <Portfolio data={portfolio} />
      <WhyUs stats={stats} />
      <Testimonials data={testimonials} />
      <Blog data={blogPosts} />
      <FAQ data={faqs} />
      <SisterBrand data={sisterBrand} />
      <CTA data={cta} />
    </>
  );
}
