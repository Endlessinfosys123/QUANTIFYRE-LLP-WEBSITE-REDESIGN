-- QUANTIFYRE LLP — CONTENT COLUMN PATCH
-- Adds missing 'content' columns to dynamic tables.

DO $$ 
BEGIN 
    -- 1. Adding content to [services]
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='content') THEN
        ALTER TABLE public.services ADD COLUMN content text DEFAULT '';
    END IF;

    -- 2. Adding content to [portfolio_projects]
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='portfolio_projects' AND column_name='content') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN content text DEFAULT '';
    END IF;

    -- 3. Adding missing detail page columns to [services] if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='detail_page_h1') THEN
        ALTER TABLE public.services ADD COLUMN detail_page_h1 text;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='detail_page_subtext') THEN
        ALTER TABLE public.services ADD COLUMN detail_page_subtext text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='detail_page_badge') THEN
        ALTER TABLE public.services ADD COLUMN detail_page_badge text;
    END IF;

    -- 4. Reload cache
    NOTIFY pgrst, 'reload schema';

END $$;
