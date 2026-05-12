const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually extract constants from constants.ts (to avoid complex imports)
// In a real scenario, we'd use a better way, but here we can just hardcode the seed data 
// based on our analysis of constants.ts.

const COMPANY_DETAILS = {
  name: "QUANTIFYRE LLP",
  tagline: "The Future, Faster",
  email: "contact.quantifyrellp@gmail.com",
  phone: "+91 7383095625",
  address: "B-402, The Landmark, Opp. Kansar Hotel, Kudasan, Gandhinagar, Gujarat 382421",
};

const SERVICES = [
  { id: "ai-automation", title: "AI Automation & Solutions", icon: "Brain", description: "We design intelligent automation that eliminates manual work and scales your operations." },
  { id: "software-engineering", title: "Custom Software Engineering", icon: "Code2", description: "Bespoke web apps, ERPs, CRMs, and platforms built for your exact business logic." },
  { id: "web-development", title: "Website Design & Development", icon: "Monitor", description: "High-performance, SEO-optimized websites built with Next.js for speed and conversion." },
  { id: "digital-marketing", title: "Digital Marketing Strategy", icon: "BarChart3", description: "Data-driven campaigns, SEO, social media, and content that generates measurable ROI." },
  { id: "mobile-development", title: "Mobile App Development", icon: "Smartphone", description: "Cross-platform Flutter and React Native apps that work beautifully on every device." },
  { id: "uiux-design", title: "UI/UX Design", icon: "PenTool", description: "Research-driven design that converts — wireframes, prototypes, and pixel-perfect interfaces." },
];

const PROJECTS = [
  { id: "school-erp", title: "School ERP System", category: "Education", description: "Multi-school management platform with RBAC, ADO.NET, SQL Server TDE", live_url: "#" },
  { id: "quantifyre-iris", title: "QUANTIFYRE IRIS", category: "Marketing", description: "AI agency management dashboard with campaign, lead, and budget tracking", live_url: "#" },
  { id: "revive-motors", title: "Revive Motors", category: "Automotive", description: "Django-based automotive management platform", live_url: "#" },
];

const TESTIMONIALS = [
  { client_name: "Rajesh M.", client_role: "Director", content: "QUANTIFYRE transformed our operations with a custom ERP that actually works. Delivered on time, zero bugs." },
  { client_name: "Priya S.", client_role: "Founder", content: "Their AI automation saved us 30+ hours per week. Genuinely impressed by the depth of their technical knowledge." },
  { client_name: "Harshil C.", client_role: "CEO", content: "Professional, responsive, and brilliant designers. Our website traffic doubled in 2 months." },
];

const FAQS = [
  { question: "What services does QUANTIFYRE offer?", answer: "We offer AI automation, custom software engineering, website design and development, etc." },
  { question: "How long does a typical project take?", answer: "Timelines vary by project scope. A website takes 2–4 weeks, a web application takes 6–12 weeks." },
];

const STATS = [
  { label: "Projects Delivered", value: "50+" },
  { label: "Happy Clients", value: "30+" },
  { label: "Experts On-board", value: "15+" },
];

// Load env
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim().replace(/^["']|["']$/g, '');
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function seed() {
  console.log('Seeding QUANTIFYRE LLP Data...');

  // 1. Site Settings
  await supabase.from('site_settings').upsert({
    id: 'global',
    site_name: COMPANY_DETAILS.name,
    site_tagline: COMPANY_DETAILS.tagline,
    contact_email: COMPANY_DETAILS.email,
    contact_phone: COMPANY_DETAILS.phone,
    office_address: COMPANY_DETAILS.address
  });

  // 2. Page Sections (Hero)
  await supabase.from('page_sections').upsert({
    section_id: 'hero',
    title: 'Build High-Performance Software.',
    subtitle: 'We are a technology agency building scalable web applications, enterprise ERPs, and AI-driven automation systems.',
    badge_text: 'Enterprise IT Engineering',
    primary_cta_text: 'Start a Project',
    primary_cta_link: '/contact'
  }, { onConflict: 'section_id' });

  // 3. Services
  for (const s of SERVICES) {
    await supabase.from('services').upsert({
      slug: s.id,
      title: s.title,
      icon_name: s.icon,
      short_description: s.description,
      is_active: true
    }, { onConflict: 'slug' });
  }

  // 4. Projects
  for (const p of PROJECTS) {
    await supabase.from('projects').upsert({
      slug: p.id,
      title: p.title,
      category: p.category,
      description: p.description,
      live_url: p.live_url
    }, { onConflict: 'slug' });
  }

  // 5. Testimonials
  for (const t of TESTIMONIALS) {
    await supabase.from('testimonials').insert(t);
  }

  // 6. FAQs
  for (const f of FAQS) {
    await supabase.from('faqs').insert(f);
  }

  // 7. Stats
  for (const st of STATS) {
    await supabase.from('stats').insert(st);
  }

  console.log('✅ Seeding Completed Successfully!');
}

seed().catch(err => console.error('❌ Seeding Failed:', err));
