-- QUANTIFYRE LLP — DATABASE ALIGNMENT & PATCH v2.2
-- This script cleans up duplicate data and ensures all missing columns and unique constraints exist.

DO $$ 
BEGIN 
    -- 1. Patch missing columns
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

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='testimonials' AND column_name='author_company') THEN
        ALTER TABLE public.testimonials ADD COLUMN author_company text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='blog_posts' AND column_name='is_published') THEN
        ALTER TABLE public.blog_posts ADD COLUMN is_published boolean DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='blog_posts' AND column_name='show_on_home') THEN
        ALTER TABLE public.blog_posts ADD COLUMN show_on_home boolean DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='blog_posts' AND column_name='read_time') THEN
        ALTER TABLE public.blog_posts ADD COLUMN read_time text;
    END IF;

    -- 2. Cleanup Duplicates before adding UNIQUE constraints
    
    -- nav_items
    DELETE FROM public.nav_items WHERE id NOT IN (SELECT MIN(id) FROM public.nav_items GROUP BY label);
    
    -- process_steps
    DELETE FROM public.process_steps WHERE id NOT IN (SELECT MIN(id) FROM public.process_steps GROUP BY step_number);
    
    -- faqs
    DELETE FROM public.faqs WHERE id NOT IN (SELECT MIN(id) FROM public.faqs GROUP BY question);
    
    -- tech_stack
    DELETE FROM public.tech_stack WHERE id NOT IN (SELECT MIN(id) FROM public.tech_stack GROUP BY name);
    
    -- cta_sections
    DELETE FROM public.cta_sections WHERE id NOT IN (SELECT MIN(id) FROM public.cta_sections GROUP BY page);
    
    -- contact_form_fields
    DELETE FROM public.contact_form_fields WHERE id NOT IN (SELECT MIN(id) FROM public.contact_form_fields GROUP BY field_key);
    
    -- about_stats
    DELETE FROM public.about_stats WHERE id NOT IN (SELECT MIN(id) FROM public.about_stats GROUP BY label);
    
    -- why_choose_us
    DELETE FROM public.why_choose_us WHERE id NOT IN (SELECT MIN(id) FROM public.why_choose_us GROUP BY title);
    
    -- sister_brand
    DELETE FROM public.sister_brand WHERE id NOT IN (SELECT MIN(id) FROM public.sister_brand GROUP BY brand_name);


    -- 3. Add UNIQUE Constraints
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'nav_items_label_key') THEN
        ALTER TABLE public.nav_items ADD CONSTRAINT nav_items_label_key UNIQUE (label);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'process_steps_step_number_key') THEN
        ALTER TABLE public.process_steps ADD CONSTRAINT process_steps_step_number_key UNIQUE (step_number);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'faqs_question_key') THEN
        ALTER TABLE public.faqs ADD CONSTRAINT faqs_question_key UNIQUE (question);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'tech_stack_name_key') THEN
        ALTER TABLE public.tech_stack ADD CONSTRAINT tech_stack_name_key UNIQUE (name);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'cta_sections_page_key') THEN
        ALTER TABLE public.cta_sections ADD CONSTRAINT cta_sections_page_key UNIQUE (page);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contact_form_fields_field_key_key') THEN
        ALTER TABLE public.contact_form_fields ADD CONSTRAINT contact_form_fields_field_key_key UNIQUE (field_key);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'about_stats_label_key') THEN
        ALTER TABLE public.about_stats ADD CONSTRAINT about_stats_label_key UNIQUE (label);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'why_choose_us_title_key') THEN
        ALTER TABLE public.why_choose_us ADD CONSTRAINT why_choose_us_title_key UNIQUE (title);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'sister_brand_brand_name_key') THEN
        ALTER TABLE public.sister_brand ADD CONSTRAINT sister_brand_brand_name_key UNIQUE (brand_name);
    END IF;

END $$;
