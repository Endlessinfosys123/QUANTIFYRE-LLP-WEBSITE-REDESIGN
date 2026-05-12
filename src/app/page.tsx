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
import { supabaseAdmin } from "@/lib/supabase-admin";

async function getPageData() {
  const { data: sections } = await supabaseAdmin.from("page_sections").select("*");
  const { data: services } = await supabaseAdmin.from("services").select("*").eq("is_active", true).order("order_index");
  const { data: testimonials } = await supabaseAdmin.from("testimonials").select("*").eq("is_approved", true).order("order_index");
  const { data: blogPosts } = await supabaseAdmin.from("blog_posts").select("*").eq("is_published", true).order("created_at", { ascending: false }).limit(3);
  const { data: faqs } = await supabaseAdmin.from("faqs").select("*").eq("is_active", true).order("order_index");
  const { data: stats } = await supabaseAdmin.from("stats").select("*").order("order_index");
  
  // Transform sections array to object for easy access
  const sectionMap = sections?.reduce((acc: any, section: any) => {
    acc[section.section_id] = section;
    return acc;
  }, {}) || {};

  return {
    hero: sectionMap.hero,
    whyUs: sectionMap.why_us,
    sisterBrand: sectionMap.sister_brand,
    cta: sectionMap.cta,
    services,
    testimonials,
    blogPosts,
    faqs,
    stats
  };
}

export default async function Home() {
  const data = await getPageData();

  return (
    <>
      <Hero data={data.hero} stats={data.stats} />
      <TechMarquee />
      <Services data={data.services} />
      <Process />
      <TechStack />
      <Portfolio />
      <WhyUs data={data.whyUs} />
      <Testimonials data={data.testimonials} />
      <Blog data={data.blogPosts} />
      <FAQ data={data.faqs} />
      <SisterBrand data={data.sisterBrand} />
      <CTA data={data.cta} />
    </>
  );
}
