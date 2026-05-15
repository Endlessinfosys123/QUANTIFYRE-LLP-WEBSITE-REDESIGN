-- QUANTIFYRE LLP V2 — COMPLETE SYSTEM SETUP
-- Run this once in your Supabase SQL Editor to ensure all tables and RLS are ready.

-- 1. TABLES SETUP (Ensure these exist)
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name text NOT NULL,
    email text NOT NULL,
    phone text,
    services_interested text[],
    project_details text,
    status text DEFAULT 'new',
    priority text DEFAULT 'normal',
    admin_notes text,
    ip_address text,
    user_agent text,
    submitted_at timestamptz DEFAULT now(),
    read_at timestamptz,
    replied_at timestamptz,
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.footer_links (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    column_name text NOT NULL,
    label text NOT NULL,
    href text NOT NULL,
    order_index integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.blog_page_config (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    hero_label text,
    hero_heading text,
    views_count text,
    engagement_stat text,
    cta_label text,
    updated_at timestamptz DEFAULT now()
);

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

-- 2. DATA MIGRATION (Move old inquiries if they exist)
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'inquiries') THEN
        INSERT INTO public.contact_inquiries (full_name, email, phone, services_interested, project_details, status, submitted_at)
        SELECT name, email, phone, services, message, status, created_at
        FROM public.inquiries
        ON CONFLICT DO NOTHING;
    END IF;
END $$;

-- 3. RLS SETUP
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_page_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_page_config ENABLE ROW LEVEL SECURITY;

-- 4. POLICIES
-- Contact Inquiries
DROP POLICY IF EXISTS "Anon insert inquiries" ON public.contact_inquiries;
CREATE POLICY "Anon insert inquiries" ON public.contact_inquiries FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access inquiries" ON public.contact_inquiries;
CREATE POLICY "Admin full access inquiries" ON public.contact_inquiries FOR ALL TO authenticated USING (true);

-- Footer Links
DROP POLICY IF EXISTS "Public read footer_links" ON public.footer_links;
CREATE POLICY "Public read footer_links" ON public.footer_links FOR SELECT TO anon, authenticated USING (true);

-- Page Configs
DROP POLICY IF EXISTS "Public read blog_config" ON public.blog_page_config;
CREATE POLICY "Public read blog_config" ON public.blog_page_config FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read portfolio_config" ON public.portfolio_page_config;
CREATE POLICY "Public read portfolio_config" ON public.portfolio_page_config FOR SELECT TO anon, authenticated USING (true);

-- 5. RELOAD
NOTIFY pgrst, 'reload schema';
