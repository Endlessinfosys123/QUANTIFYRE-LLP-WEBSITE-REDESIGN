-- QUANTIFYRE LLP — ULTIMATE CMS DATABASE SCHEMA v2.0
-- This script creates 22 tables to control 100% of the website content.

-- ============================================
-- TABLE 1: site_config
-- ============================================
CREATE TABLE IF NOT EXISTS public.site_config (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  key text UNIQUE NOT NULL,
  value text,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 2: nav_items
-- ============================================
CREATE TABLE IF NOT EXISTS public.nav_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  label text UNIQUE NOT NULL,
  href text NOT NULL,
  order_index int DEFAULT 0,
  is_cta boolean DEFAULT false,
  is_active boolean DEFAULT true,
  open_new_tab boolean DEFAULT false,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 3: footer_links
-- ============================================
CREATE TABLE IF NOT EXISTS public.footer_links (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  column_name text NOT NULL, -- 'company' | 'services' | 'contact'
  label text NOT NULL,
  href text,
  order_index int DEFAULT 0,
  is_active boolean DEFAULT true
);

-- ============================================
-- TABLE 4: hero_sections
-- ============================================
CREATE TABLE IF NOT EXISTS public.hero_sections (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  page text UNIQUE NOT NULL, -- 'home' | 'about' | 'services' | 'portfolio' | 'blog' | 'contact'
  badge_text text,
  badge_icon text,
  heading_line1 text,
  heading_highlight text,
  heading_line2 text,
  subtext text,
  cta1_label text,
  cta1_link text,
  cta1_icon text,
  cta2_label text,
  cta2_link text,
  cta2_icon text,
  extra_json jsonb, -- for page-specific extra fields (stats, status badges, etc.)
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 5: services
-- ============================================
CREATE TABLE IF NOT EXISTS public.services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  icon text,
  tags text[] DEFAULT '{}',
  detail_page_badge text,
  detail_page_h1 text,
  detail_page_subtext text,
  detail_page_stats jsonb, -- array of {value, label, icon}
  detail_page_capabilities jsonb, -- array of {title, description}
  detail_page_deliverables text[],
  detail_page_roadmap text[],
  order_index int DEFAULT 0,
  show_on_home boolean DEFAULT true,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 6: process_steps
-- ============================================
CREATE TABLE IF NOT EXISTS public.process_steps (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  step_number int UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  icon text,
  order_index int DEFAULT 0,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 7: tech_stack
-- ============================================
CREATE TABLE IF NOT EXISTS public.tech_stack (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text UNIQUE NOT NULL,
  category text NOT NULL, -- 'Frontend'|'Backend'|'AI_ML'|'Mobile'|'Database'|'Cloud'
  logo_url text,
  show_in_ticker boolean DEFAULT true,
  order_index int DEFAULT 0,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 8: portfolio_projects
-- ============================================
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE,
  category text,
  description text,
  image_url text,
  tags text[] DEFAULT '{}',
  live_url text,
  case_study_url text,
  is_featured boolean DEFAULT false,
  show_on_home boolean DEFAULT true,
  order_index int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 9: testimonials
-- ============================================
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  quote text NOT NULL,
  author_name text NOT NULL,
  author_role text,
  author_company text,
  avatar_url text,
  avatar_initial text,
  rating int DEFAULT 5,
  order_index int DEFAULT 0,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 10: blog_posts
-- ============================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text, -- Markdown or rich text
  category text,
  cover_image_url text,
  author text DEFAULT 'QUANTIFYRE Team',
  read_time text,
  published_at timestamptz,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT false,
  show_on_home boolean DEFAULT false,
  meta_title text,
  meta_description text,
  views_count int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 11: faqs
-- ============================================
CREATE TABLE IF NOT EXISTS public.faqs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  question text UNIQUE NOT NULL,
  answer text NOT NULL,
  order_index int DEFAULT 0,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 12: why_choose_us
-- ============================================
CREATE TABLE IF NOT EXISTS public.why_choose_us (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  icon text,
  title text UNIQUE NOT NULL,
  description text,
  order_index int DEFAULT 0,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 13: about_stats
-- ============================================
CREATE TABLE IF NOT EXISTS public.about_stats (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  value text NOT NULL,
  label text UNIQUE NOT NULL,
  suffix text,
  icon text,
  order_index int DEFAULT 0,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 14: about_mission_vision
-- ============================================
CREATE TABLE IF NOT EXISTS public.about_mission_vision (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type text UNIQUE NOT NULL, -- 'mission' | 'vision'
  icon text,
  label text,
  heading text,
  body text,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 15: cta_sections
-- ============================================
CREATE TABLE IF NOT EXISTS public.cta_sections (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  page text UNIQUE NOT NULL, -- 'global' | 'home' | 'about' | etc.
  section_label text,
  heading text,
  subtext text,
  btn1_label text,
  btn1_link text,
  btn1_icon text,
  btn2_label text,
  btn2_link text,
  btn2_icon text,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 16: sister_brand
-- ============================================
CREATE TABLE IF NOT EXISTS public.sister_brand (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  section_label text,
  heading text,
  brand_name text UNIQUE,
  description text,
  cta_label text,
  cta_link text,
  logo_url text,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 17: contact_form_config
-- ============================================
CREATE TABLE IF NOT EXISTS public.contact_form_config (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  form_heading text,
  submit_btn_label text,
  submit_btn_icon text,
  trust_text text,
  success_message text,
  notification_email text,
  send_auto_reply boolean DEFAULT true,
  auto_reply_subject text,
  auto_reply_body text,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 18: contact_form_fields
-- ============================================
CREATE TABLE IF NOT EXISTS public.contact_form_fields (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  field_key text UNIQUE NOT NULL,
  label text NOT NULL,
  placeholder text,
  field_type text NOT NULL, -- 'text'|'email'|'phone'|'textarea'|'checkbox_group'|'select'
  icon text,
  is_required boolean DEFAULT false,
  options jsonb, -- for checkbox_group/select: [{label, value}]
  max_length int,
  order_index int DEFAULT 0,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 19: contact_inquiries (INBOX)
-- ============================================
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  services_interested text[],
  project_details text,
  status text DEFAULT 'new', -- 'new' | 'read' | 'replied' | 'archived' | 'spam'
  priority text DEFAULT 'normal', -- 'high' | 'normal' | 'low'
  admin_notes text,
  ip_address text,
  user_agent text,
  submitted_at timestamptz DEFAULT now(),
  read_at timestamptz,
  replied_at timestamptz,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 20: blog_page_config
-- ============================================
CREATE TABLE IF NOT EXISTS public.blog_page_config (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  hero_label text,
  hero_heading text,
  views_count text,
  engagement_stat text,
  cta_label text,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 21: portfolio_page_config
-- ============================================
CREATE TABLE IF NOT EXISTS public.portfolio_page_config (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  hero_heading text,
  hero_subheading text,
  section_heading text,
  section_label text,
  cta_label text,
  cta_link text,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 22: admin_activity_log
-- ============================================
CREATE TABLE IF NOT EXISTS public.admin_activity_log (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  action text NOT NULL,
  section text,
  details text,
  performed_at timestamptz DEFAULT now()
);

-- ============================================
-- RLS POLICIES
-- ============================================

-- Function to check if user is admin (using Supabase Auth metadata or specific role)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN (auth.jwt() ->> 'role' = 'service_role' OR (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on all tables
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nav_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tech_stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.why_choose_us ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_mission_vision ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cta_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sister_brand ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_form_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_form_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_page_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_page_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_log ENABLE ROW LEVEL SECURITY;

-- Public read access for most tables
DROP POLICY IF EXISTS "Public read site_config" ON public.site_config;
CREATE POLICY "Public read site_config" ON public.site_config FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read nav_items" ON public.nav_items;
CREATE POLICY "Public read nav_items" ON public.nav_items FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read footer_links" ON public.footer_links;
CREATE POLICY "Public read footer_links" ON public.footer_links FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read hero_sections" ON public.hero_sections;
CREATE POLICY "Public read hero_sections" ON public.hero_sections FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read services" ON public.services;
CREATE POLICY "Public read services" ON public.services FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read process_steps" ON public.process_steps;
CREATE POLICY "Public read process_steps" ON public.process_steps FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read tech_stack" ON public.tech_stack;
CREATE POLICY "Public read tech_stack" ON public.tech_stack FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read portfolio_projects" ON public.portfolio_projects;
CREATE POLICY "Public read portfolio_projects" ON public.portfolio_projects FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read testimonials" ON public.testimonials;
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read blog_posts" ON public.blog_posts;
CREATE POLICY "Public read blog_posts" ON public.blog_posts FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read faqs" ON public.faqs;
CREATE POLICY "Public read faqs" ON public.faqs FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read why_choose_us" ON public.why_choose_us;
CREATE POLICY "Public read why_choose_us" ON public.why_choose_us FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read about_stats" ON public.about_stats;
CREATE POLICY "Public read about_stats" ON public.about_stats FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read about_mission_vision" ON public.about_mission_vision;
CREATE POLICY "Public read about_mission_vision" ON public.about_mission_vision FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read cta_sections" ON public.cta_sections;
CREATE POLICY "Public read cta_sections" ON public.cta_sections FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read sister_brand" ON public.sister_brand;
CREATE POLICY "Public read sister_brand" ON public.sister_brand FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read contact_form_config" ON public.contact_form_config;
CREATE POLICY "Public read contact_form_config" ON public.contact_form_config FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read contact_form_fields" ON public.contact_form_fields;
CREATE POLICY "Public read contact_form_fields" ON public.contact_form_fields FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read blog_page_config" ON public.blog_page_config;
CREATE POLICY "Public read blog_page_config" ON public.blog_page_config FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read portfolio_page_config" ON public.portfolio_page_config;
CREATE POLICY "Public read portfolio_page_config" ON public.portfolio_page_config FOR SELECT TO anon, authenticated USING (true);

-- Contact Inquiries: Anon can insert, Admin can do all
DROP POLICY IF EXISTS "Anon insert inquiries" ON public.contact_inquiries;
CREATE POLICY "Anon insert inquiries" ON public.contact_inquiries FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access inquiries" ON public.contact_inquiries;
CREATE POLICY "Admin full access inquiries" ON public.contact_inquiries FOR ALL TO authenticated USING (true);

-- Admin full access for all tables
DROP POLICY IF EXISTS "Admin full access site_config" ON public.site_config;
CREATE POLICY "Admin full access site_config" ON public.site_config FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin full access nav_items" ON public.nav_items;
CREATE POLICY "Admin full access nav_items" ON public.nav_items FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin full access footer_links" ON public.footer_links;
CREATE POLICY "Admin full access footer_links" ON public.footer_links FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin full access hero_sections" ON public.hero_sections;
CREATE POLICY "Admin full access hero_sections" ON public.hero_sections FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin full access services" ON public.services;
CREATE POLICY "Admin full access services" ON public.services FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin full access process_steps" ON public.process_steps;
CREATE POLICY "Admin full access process_steps" ON public.process_steps FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin full access tech_stack" ON public.tech_stack;
CREATE POLICY "Admin full access tech_stack" ON public.tech_stack FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin full access portfolio_projects" ON public.portfolio_projects;
CREATE POLICY "Admin full access portfolio_projects" ON public.portfolio_projects FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin full access testimonials" ON public.testimonials;
CREATE POLICY "Admin full access testimonials" ON public.testimonials FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin full access blog_posts" ON public.blog_posts;
CREATE POLICY "Admin full access blog_posts" ON public.blog_posts FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin full access faqs" ON public.faqs;
CREATE POLICY "Admin full access faqs" ON public.faqs FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin full access why_choose_us" ON public.why_choose_us;
CREATE POLICY "Admin full access why_choose_us" ON public.why_choose_us FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin full access about_stats" ON public.about_stats;
CREATE POLICY "Admin full access about_stats" ON public.about_stats FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin full access about_mission_vision" ON public.about_mission_vision;
CREATE POLICY "Admin full access about_mission_vision" ON public.about_mission_vision FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin full access cta_sections" ON public.cta_sections;
CREATE POLICY "Admin full access cta_sections" ON public.cta_sections FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin full access sister_brand" ON public.sister_brand;
CREATE POLICY "Admin full access sister_brand" ON public.sister_brand FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin full access contact_form_config" ON public.contact_form_config;
CREATE POLICY "Admin full access contact_form_config" ON public.contact_form_config FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin full access contact_form_fields" ON public.contact_form_fields;
CREATE POLICY "Admin full access contact_form_fields" ON public.contact_form_fields FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin full access blog_page_config" ON public.blog_page_config;
CREATE POLICY "Admin full access blog_page_config" ON public.blog_page_config FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin full access portfolio_page_config" ON public.portfolio_page_config;
CREATE POLICY "Admin full access portfolio_page_config" ON public.portfolio_page_config FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin full access admin_activity_log" ON public.admin_activity_log;
CREATE POLICY "Admin full access admin_activity_log" ON public.admin_activity_log FOR ALL TO authenticated USING (true);

-- ============================================
-- REALTIME
-- ============================================
-- Using SET TABLE to replace the entire list and ensure idempotency
ALTER PUBLICATION supabase_realtime SET TABLE 
  public.site_config,
  public.nav_items,
  public.hero_sections,
  public.services,
  public.portfolio_projects,
  public.blog_posts,
  public.contact_inquiries;
