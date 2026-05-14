-- QUANTIFYRE LLP — DATABASE ALIGNMENT v2.7
-- This script aligns the portfolio_projects table with the Admin UI and Frontend requirements.

DO $$ 
BEGIN 
    -- 1. ALIGNING [portfolio_projects]
    -- Renaming existing columns to match Frontend expectations
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='portfolio_projects' AND column_name='tags') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='portfolio_projects' AND column_name='technologies') THEN
            ALTER TABLE public.portfolio_projects RENAME COLUMN tags TO technologies;
        ELSE
            ALTER TABLE public.portfolio_projects DROP COLUMN tags;
        END IF;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='portfolio_projects' AND column_name='live_url') THEN
        ALTER TABLE public.portfolio_projects RENAME COLUMN live_url TO project_link;
    END IF;

    -- Adding missing portfolio columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='portfolio_projects' AND column_name='client_name') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN client_name text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='portfolio_projects' AND column_name='project_year') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN project_year text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='portfolio_projects' AND column_name='thumbnail_url') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN thumbnail_url text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='portfolio_projects' AND column_name='full_image_url') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN full_image_url text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='portfolio_projects' AND column_name='extra_json') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN extra_json jsonb DEFAULT '{}';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='portfolio_projects' AND column_name='technologies') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN technologies text[] DEFAULT '{}';
    END IF;

    -- Reload PostgREST schema cache
    NOTIFY pgrst, 'reload schema';

END $$;
