-- QUANTIFYRE LLP — INQUIRIES ALIGNMENT
-- This script fixes the schema mismatch for the contact form.

DO $$ 
BEGIN 
    -- 1. Adding missing columns to [inquiries]
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inquiries' AND column_name='services') THEN
        ALTER TABLE public.inquiries ADD COLUMN services text[] DEFAULT '{}';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inquiries' AND column_name='status') THEN
        ALTER TABLE public.inquiries ADD COLUMN status text DEFAULT 'new';
    END IF;

    -- 2. Renaming service_type to legacy_service_type or keeping it for safety
    -- We'll keep it for now but the frontend will use 'services'.

    -- 3. Reload PostgREST schema cache
    NOTIFY pgrst, 'reload schema';

END $$;
