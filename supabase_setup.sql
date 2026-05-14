-- ============================================
-- QUANTIFYRE LLP — ULTIMATE CMS DATABASE SCHEMA
-- Website: quantifyrellp.space
-- Stack: Next.js 14 + Supabase + Vercel
-- ============================================

-- Enable pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================
-- TABLE 1: site_config
-- ============================================
CREATE TABLE IF NOT EXISTS site_config (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  key text UNIQUE NOT NULL,
  value text,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 2: nav_items
-- ============================================
CREATE TABLE IF NOT EXISTS nav_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  label text NOT NULL,
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
CREATE TABLE IF NOT EXISTS footer_links (
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
CREATE TABLE IF NOT EXISTS hero_sections (
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
  extra_json jsonb DEFAULT '{}', -- for page-specific extra fields (stats, status badges, etc.)
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 5: services
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  icon text,
  tags text[] DEFAULT '{}',
  detail_page_badge text,
  detail_page_h1 text,
  detail_page_subtext text,
  detail_page_stats jsonb DEFAULT '[]', -- array of {value, label, icon}
  detail_page_capabilities jsonb DEFAULT '[]', -- array of {title, description}
  detail_page_deliverables text[] DEFAULT '{}',
  detail_page_roadmap text[] DEFAULT '{}',
  order_index int DEFAULT 0,
  show_on_home boolean DEFAULT true,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 6: process_steps
-- ============================================
CREATE TABLE IF NOT EXISTS process_steps (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  step_number int NOT NULL,
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
CREATE TABLE IF NOT EXISTS tech_stack (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
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
CREATE TABLE IF NOT EXISTS portfolio_projects (
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
CREATE TABLE IF NOT EXISTS testimonials (
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
CREATE TABLE IF NOT EXISTS blog_posts (
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
CREATE TABLE IF NOT EXISTS faqs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  question text NOT NULL,
  answer text NOT NULL,
  order_index int DEFAULT 0,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 12: why_choose_us
-- ============================================
CREATE TABLE IF NOT EXISTS why_choose_us (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  icon text,
  title text NOT NULL,
  description text,
  order_index int DEFAULT 0,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 13: about_stats
-- ============================================
CREATE TABLE IF NOT EXISTS about_stats (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  value text NOT NULL,
  label text NOT NULL,
  suffix text,
  icon text,
  order_index int DEFAULT 0,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 14: about_mission_vision
-- ============================================
CREATE TABLE IF NOT EXISTS about_mission_vision (
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
CREATE TABLE IF NOT EXISTS cta_sections (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  page text NOT NULL, -- 'global' | 'home' | 'about' | etc.
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
CREATE TABLE IF NOT EXISTS sister_brand (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  section_label text,
  heading text,
  brand_name text,
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
CREATE TABLE IF NOT EXISTS contact_form_config (
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
CREATE TABLE IF NOT EXISTS contact_form_fields (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  field_key text NOT NULL,
  label text NOT NULL,
  placeholder text,
  field_type text NOT NULL, -- 'text'|'email'|'phone'|'textarea'|'checkbox_group'|'select'
  icon text,
  is_required boolean DEFAULT false,
  options jsonb DEFAULT '[]', -- for checkbox_group/select: [{label, value}]
  max_length int,
  order_index int DEFAULT 0,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TABLE 19: contact_inquiries (INBOX)
-- ============================================
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  services_interested text[] DEFAULT '{}',
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
CREATE TABLE IF NOT EXISTS blog_page_config (
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
CREATE TABLE IF NOT EXISTS portfolio_page_config (
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
CREATE TABLE IF NOT EXISTS admin_activity_log (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  action text NOT NULL,
  section text,
  details text,
  performed_at timestamptz DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY (Enable on all tables)
-- ============================================

-- Function to enable RLS on all tables in public schema
DO $$ 
DECLARE 
  r RECORD;
BEGIN
  FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
    EXECUTE 'ALTER TABLE public.' || quote_ident(r.tablename) || ' ENABLE ROW LEVEL SECURITY;';
  END LOOP;
END $$;

-- Policies for public access (Read-only)
DO $$ 
DECLARE 
  r RECORD;
BEGIN
  FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename != 'contact_inquiries' AND tablename != 'admin_activity_log') LOOP
    EXECUTE 'CREATE POLICY "Allow public read-only access" ON public.' || quote_ident(r.tablename) || ' FOR SELECT USING (true);';
  END LOOP;
END $$;

-- Policies for admin access (Full access)
DO $$ 
DECLARE 
  r RECORD;
BEGIN
  FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
    EXECUTE 'CREATE POLICY "Allow admin full access" ON public.' || quote_ident(r.tablename) || ' FOR ALL TO authenticated USING (true);';
  END LOOP;
END $$;

-- Specific policy for contact_inquiries (Public insert)
CREATE POLICY "Allow public insert for inquiries" ON public.contact_inquiries FOR INSERT WITH CHECK (true);
