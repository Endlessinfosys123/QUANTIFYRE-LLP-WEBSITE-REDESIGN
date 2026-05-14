-- QUANTIFYRE LLP — DATABASE ALIGNMENT & DE-DUPLICATION v2.3
-- This script fixes the MIN(uuid) issue and ensures all constraints exist.

DO $$ 
BEGIN 
    -- 1. Patch missing columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='detail_page_badge') THEN
        ALTER TABLE public.services ADD COLUMN detail_page_badge text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='testimonials' AND column_name='author_company') THEN
        ALTER TABLE public.testimonials ADD COLUMN author_company text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='blog_posts' AND column_name='is_published') THEN
        ALTER TABLE public.blog_posts ADD COLUMN is_published boolean DEFAULT false;
    END IF;

    -- 2. Robust De-duplication using ROW_NUMBER()
    -- This keeps the most recent record for each duplicate set

    -- nav_items
    DELETE FROM public.nav_items WHERE id IN (SELECT id FROM (SELECT id, ROW_NUMBER() OVER (PARTITION BY label ORDER BY updated_at DESC) as row_num FROM public.nav_items) t WHERE row_num > 1);
    
    -- process_steps
    DELETE FROM public.process_steps WHERE id IN (SELECT id FROM (SELECT id, ROW_NUMBER() OVER (PARTITION BY step_number ORDER BY updated_at DESC) as row_num FROM public.process_steps) t WHERE row_num > 1);
    
    -- faqs
    DELETE FROM public.faqs WHERE id IN (SELECT id FROM (SELECT id, ROW_NUMBER() OVER (PARTITION BY question ORDER BY updated_at DESC) as row_num FROM public.faqs) t WHERE row_num > 1);
    
    -- tech_stack
    DELETE FROM public.tech_stack WHERE id IN (SELECT id FROM (SELECT id, ROW_NUMBER() OVER (PARTITION BY name ORDER BY updated_at DESC) as row_num FROM public.tech_stack) t WHERE row_num > 1);
    
    -- cta_sections
    DELETE FROM public.cta_sections WHERE id IN (SELECT id FROM (SELECT id, ROW_NUMBER() OVER (PARTITION BY page ORDER BY updated_at DESC) as row_num FROM public.cta_sections) t WHERE row_num > 1);
    
    -- contact_form_fields
    DELETE FROM public.contact_form_fields WHERE id IN (SELECT id FROM (SELECT id, ROW_NUMBER() OVER (PARTITION BY field_key ORDER BY updated_at DESC) as row_num FROM public.contact_form_fields) t WHERE row_num > 1);
    
    -- about_stats
    DELETE FROM public.about_stats WHERE id IN (SELECT id FROM (SELECT id, ROW_NUMBER() OVER (PARTITION BY label ORDER BY updated_at DESC) as row_num FROM public.about_stats) t WHERE row_num > 1);
    
    -- why_choose_us
    DELETE FROM public.why_choose_us WHERE id IN (SELECT id FROM (SELECT id, ROW_NUMBER() OVER (PARTITION BY title ORDER BY updated_at DESC) as row_num FROM public.why_choose_us) t WHERE row_num > 1);
    
    -- sister_brand
    DELETE FROM public.sister_brand WHERE id IN (SELECT id FROM (SELECT id, ROW_NUMBER() OVER (PARTITION BY brand_name ORDER BY updated_at DESC) as row_num FROM public.sister_brand) t WHERE row_num > 1);


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
