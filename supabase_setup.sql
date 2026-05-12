-- SQL Script to set up the Admin CMS Tables for QUANTIFYRE LLP
-- Run this in your Supabase SQL Editor

-- 1. Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create site_settings table (for global theme/logo/etc)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY, -- e.g., 'global'
    site_name TEXT,
    logo_url TEXT,
    primary_color TEXT,
    secondary_color TEXT,
    font_family TEXT,
    footer_text TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create services table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon_name TEXT,
    content JSONB, -- For detailed rich text
    order_index INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT, -- Markdown or HTML
    featured_image TEXT,
    author_id UUID REFERENCES public.admin_users(id),
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Create projects table (Portfolio)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    category TEXT,
    image_url TEXT,
    project_url TEXT,
    order_index INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    client_role TEXT,
    client_company TEXT,
    content TEXT NOT NULL,
    avatar_url TEXT,
    rating INT DEFAULT 5,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Create faqs table
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Create nav_links table
CREATE TABLE IF NOT EXISTS public.nav_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    href TEXT NOT NULL,
    parent_id UUID REFERENCES public.nav_links(id),
    order_index INT DEFAULT 0,
    is_external BOOLEAN DEFAULT false
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
-- For now, allow reading users if authenticated (to login)
CREATE POLICY "Allow public read for auth" ON public.admin_users FOR SELECT USING (true);

-- Create a dummy admin user if needed (optional)
-- email: admin@quantifyre.com
-- password: password123 (hashed)
-- INSERT INTO public.admin_users (email, password_hash, name, role) 
-- VALUES ('admin@quantifyre.com', '$2a$12$Zp.8Q/8jH9W8Q8P8Q8P8Q.o8Q8P8Q8P8Q8P8Q8P8Q8P8Q8P8Q8P8Q', 'Super Admin', 'admin');
