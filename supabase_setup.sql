-- ADVANCED CMS SCHEMA FOR QUANTIFYRE LLP
-- This script sets up a highly granular database structure to control every aspect of the website.

-- 1. GLOBAL SETTINGS & SEO
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'global',
    site_name TEXT DEFAULT 'QUANTIFYRE LLP',
    site_tagline TEXT DEFAULT 'The Future, Faster',
    logo_dark_url TEXT,
    logo_light_url TEXT,
    favicon_url TEXT,
    primary_color TEXT DEFAULT '#6C3FEF',
    secondary_color TEXT DEFAULT '#4ADE80',
    contact_email TEXT DEFAULT 'info@quantifyre.com',
    contact_phone TEXT,
    office_address TEXT,
    social_links JSONB DEFAULT '{"instagram": "", "linkedin": "", "twitter": "", "github": ""}',
    meta_title_suffix TEXT DEFAULT '| QUANTIFYRE LLP',
    meta_description TEXT,
    meta_keywords TEXT,
    og_image_url TEXT,
    scripts_header TEXT, -- For GTM/Analytics
    scripts_footer TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. DYNAMIC PAGE SECTIONS
-- This table allows editing Hero, WhyUs, SisterBrand, CTA, etc.
CREATE TABLE IF NOT EXISTS public.page_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_name TEXT DEFAULT 'home',
    section_id TEXT UNIQUE NOT NULL, -- 'hero', 'why_us', 'cta', etc.
    title TEXT,
    subtitle TEXT,
    description TEXT,
    badge_text TEXT,
    primary_cta_text TEXT,
    primary_cta_link TEXT,
    secondary_cta_text TEXT,
    secondary_cta_link TEXT,
    bg_image_url TEXT,
    extra_data JSONB DEFAULT '{}', -- For section-specific small fields
    is_visible BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. SERVICES
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon_name TEXT, -- Lucide icon name
    short_description TEXT,
    long_description TEXT,
    features JSONB DEFAULT '[]', -- List of bullet points
    process JSONB DEFAULT '[]', -- Step by step process for this service
    meta_title TEXT,
    meta_description TEXT,
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. PORTFOLIO / PROJECTS
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT,
    client_name TEXT,
    thumbnail_url TEXT,
    gallery_urls JSONB DEFAULT '[]',
    description TEXT,
    challenge TEXT,
    solution TEXT,
    result TEXT,
    tech_stack JSONB DEFAULT '[]',
    live_url TEXT,
    order_index INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. TESTIMONIALS
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    client_role TEXT,
    client_company TEXT,
    avatar_url TEXT,
    content TEXT NOT NULL,
    rating INT DEFAULT 5,
    order_index INT DEFAULT 0,
    is_approved BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. BLOG SYSTEM
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content_html TEXT, -- Rich text content
    featured_image TEXT,
    category TEXT,
    author_name TEXT DEFAULT 'Admin',
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    meta_title TEXT,
    meta_description TEXT,
    tags JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. FAQ
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. STATS (Counters)
CREATE TABLE IF NOT EXISTS public.stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    value TEXT NOT NULL, -- e.g. '50+', '99%'
    icon_name TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. NAVIGATION
CREATE TABLE IF NOT EXISTS public.nav_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    href TEXT NOT NULL,
    parent_id UUID REFERENCES public.nav_links(id) ON DELETE CASCADE,
    order_index INT DEFAULT 0,
    is_footer BOOLEAN DEFAULT false,
    is_header BOOLEAN DEFAULT true
);

-- 10. MEDIA ASSETS (For tracking uploaded files)
CREATE TABLE IF NOT EXISTS public.media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url TEXT NOT NULL,
    filename TEXT NOT NULL,
    original_name TEXT,
    file_type TEXT,
    file_size INT,
    uploaded_by TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 11. INQUIRIES (From Contact Form)
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service_type TEXT,
    message TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- SET UP REALTIME FOR ALL TABLES
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.page_sections;
ALTER PUBLICATION supabase_realtime ADD TABLE public.services;
ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiries;

-- INITIAL SEED FOR GLOBAL SETTINGS
INSERT INTO public.site_settings (id, site_name) 
VALUES ('global', 'QUANTIFYRE LLP')
ON CONFLICT (id) DO NOTHING;
