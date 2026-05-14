-- QUANTIFYRE LLP — DEEP DATABASE ALIGNMENT v2.5
-- This script renames old columns and adds missing ones to match the v2.0 schema perfectly.

DO $$ 
BEGIN 
    -- 1. ALIGNING [services]
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='position') THEN
        ALTER TABLE public.services RENAME COLUMN position TO order_index;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='is_visible') THEN
        ALTER TABLE public.services RENAME COLUMN is_visible TO is_active;
    END IF;
    
    -- Adding missing services columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='slug') THEN
        ALTER TABLE public.services ADD COLUMN slug text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='tags') THEN
        ALTER TABLE public.services ADD COLUMN tags text[] DEFAULT '{}';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='detail_page_h1') THEN
        ALTER TABLE public.services ADD COLUMN detail_page_h1 text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='detail_page_subtext') THEN
        ALTER TABLE public.services ADD COLUMN detail_page_subtext text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='detail_page_stats') THEN
        ALTER TABLE public.services ADD COLUMN detail_page_stats jsonb;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='detail_page_capabilities') THEN
        ALTER TABLE public.services ADD COLUMN detail_page_capabilities jsonb;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='detail_page_deliverables') THEN
        ALTER TABLE public.services ADD COLUMN detail_page_deliverables text[];
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='detail_page_roadmap') THEN
        ALTER TABLE public.services ADD COLUMN detail_page_roadmap text[];
    END IF;

    -- 2. ALIGNING [testimonials]
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='testimonials' AND column_name='client_name') THEN
        ALTER TABLE public.testimonials RENAME COLUMN client_name TO author_name;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='testimonials' AND column_name='designation') THEN
        ALTER TABLE public.testimonials RENAME COLUMN designation TO author_role;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='testimonials' AND column_name='company') THEN
        -- Handle case where both company and author_company might exist
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='testimonials' AND column_name='author_company') THEN
            ALTER TABLE public.testimonials RENAME COLUMN company TO author_company;
        ELSE
            ALTER TABLE public.testimonials DROP COLUMN company;
        END IF;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='testimonials' AND column_name='is_visible') THEN
        ALTER TABLE public.testimonials RENAME COLUMN is_visible TO is_active;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='testimonials' AND column_name='position') THEN
        ALTER TABLE public.testimonials RENAME COLUMN position TO order_index;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='testimonials' AND column_name='avatar_initial') THEN
        ALTER TABLE public.testimonials ADD COLUMN avatar_initial text;
    END IF;

    -- 3. ALIGNING [blog_posts]
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='blog_posts' AND column_name='featured_image') THEN
        ALTER TABLE public.blog_posts RENAME COLUMN featured_image TO cover_image_url;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='blog_posts' AND column_name='read_time') THEN
        ALTER TABLE public.blog_posts ADD COLUMN read_time text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='blog_posts' AND column_name='show_on_home') THEN
        ALTER TABLE public.blog_posts ADD COLUMN show_on_home boolean DEFAULT false;
    END IF;

    -- 4. ENSURING UNIQUE CONSTRAINTS (Crucial for seeding)
    -- If 'slug' was added to services, we must ensure it is unique
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'services_slug_key') THEN
        ALTER TABLE public.services ADD CONSTRAINT services_slug_key UNIQUE (slug);
    END IF;
    
    -- Reload PostgREST schema cache
    NOTIFY pgrst, 'reload schema';

END $$;
