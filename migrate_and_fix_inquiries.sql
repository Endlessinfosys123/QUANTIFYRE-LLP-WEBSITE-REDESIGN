-- QUANTIFYRE LLP — DATA MIGRATION & RLS ALIGNMENT
-- Run this in your Supabase SQL Editor to sync live data and fix CMS visibility.

-- 1. MIGRATE DATA from OLD to NEW table
INSERT INTO public.contact_inquiries (
    full_name, 
    email, 
    phone, 
    services_interested, 
    project_details, 
    status, 
    submitted_at
)
SELECT 
    name, 
    email, 
    phone, 
    services, 
    message, 
    status, 
    created_at
FROM public.inquiries
ON CONFLICT DO NOTHING;

-- 2. ENABLE RLS on NEW TABLE
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- 3. DROP OLD POLICIES (to be safe)
DROP POLICY IF EXISTS "Anon insert inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Admin full access inquiries" ON public.contact_inquiries;

-- 4. CREATE NEW POLICIES
-- Allow anyone to submit the form
CREATE POLICY "Anon insert inquiries" 
ON public.contact_inquiries 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Allow authenticated admins to see and manage everything
CREATE POLICY "Admin full access inquiries" 
ON public.contact_inquiries 
FOR ALL 
TO authenticated 
USING (true);

-- 5. REFRESH CACHE
NOTIFY pgrst, 'reload schema';

SELECT 'Migration Complete' as status;
