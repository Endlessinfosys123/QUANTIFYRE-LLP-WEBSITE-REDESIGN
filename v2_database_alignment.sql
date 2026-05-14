-- QUANTIFYRE LLP — DATABASE ALIGNMENT & PATCH v2.1
-- This script ensures all missing columns and unique constraints exist for the Seed Manager.

DO $$ 
BEGIN 
    -- 1. Patch [services] table
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='services' AND column_name='detail_page_badge') THEN
        ALTER TABLE public.services ADD COLUMN detail_page_badge text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='services' AND column_name='detail_page_h1') THEN
        ALTER TABLE public.services ADD COLUMN detail_page_h1 text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='services' AND column_name='detail_page_subtext') THEN
        ALTER TABLE public.services ADD COLUMN detail_page_subtext text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='services' AND column_name='detail_page_stats') THEN
        ALTER TABLE public.services ADD COLUMN detail_page_stats jsonb;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='services' AND column_name='detail_page_capabilities') THEN
        ALTER TABLE public.services ADD COLUMN detail_page_capabilities jsonb;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='services' AND column_name='detail_page_deliverables') THEN
        ALTER TABLE public.services ADD COLUMN detail_page_deliverables text[];
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='services' AND column_name='detail_page_roadmap') THEN
        ALTER TABLE public.services ADD COLUMN detail_page_roadmap text[];
    END IF;

    -- 2. Patch [testimonials] table
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='testimonials' AND column_name='author_company') THEN
        ALTER TABLE public.testimonials ADD COLUMN author_company text;
    END IF;

    -- 3. Patch [blog_posts] table
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='blog_posts' AND column_name='is_published') THEN
        ALTER TABLE public.blog_posts ADD COLUMN is_published boolean DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='blog_posts' AND column_name='show_on_home') THEN
        ALTER TABLE public.blog_posts ADD COLUMN show_on_home boolean DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='blog_posts' AND column_name='read_time') THEN
        ALTER TABLE public.blog_posts ADD COLUMN read_time text;
    END IF;

    -- 4. Add UNIQUE Constraints for Seeding (Idempotency)
    
    -- nav_items
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'nav_items_label_key') THEN
        ALTER TABLE public.nav_items ADD CONSTRAINT nav_items_label_key UNIQUE (label);
    END IF;

    -- process_steps
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'process_steps_step_number_key') THEN
        ALTER TABLE public.process_steps ADD CONSTRAINT process_steps_step_number_key UNIQUE (step_number);
    END IF;

    -- faqs
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'faqs_question_key') THEN
        ALTER TABLE public.faqs ADD CONSTRAINT faqs_question_key UNIQUE (question);
    END IF;

    -- tech_stack
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'tech_stack_name_key') THEN
        ALTER TABLE public.tech_stack ADD CONSTRAINT tech_stack_name_key UNIQUE (name);
    END IF;

    -- cta_sections
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'cta_sections_page_key') THEN
        ALTER TABLE public.cta_sections ADD CONSTRAINT cta_sections_page_key UNIQUE (page);
    END IF;

    -- contact_form_fields
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contact_form_fields_field_key_key') THEN
        ALTER TABLE public.contact_form_fields ADD CONSTRAINT contact_form_fields_field_key_key UNIQUE (field_key);
    END IF;

    -- about_stats
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'about_stats_label_key') THEN
        ALTER TABLE public.about_stats ADD CONSTRAINT about_stats_label_key UNIQUE (label);
    END IF;

    -- why_choose_us
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'why_choose_us_title_key') THEN
        ALTER TABLE public.why_choose_us ADD CONSTRAINT why_choose_us_title_key UNIQUE (title);
    END IF;

    -- sister_brand
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'sister_brand_brand_name_key') THEN
        ALTER TABLE public.sister_brand ADD CONSTRAINT sister_brand_brand_name_key UNIQUE (brand_name);
    END IF;

END $$;
