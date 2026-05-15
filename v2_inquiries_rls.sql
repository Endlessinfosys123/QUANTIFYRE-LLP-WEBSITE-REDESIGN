-- QUANTIFYRE LLP — INQUIRIES RLS SETUP
-- This script enables public submissions for the contact form.

-- 1. Enable RLS
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing to be safe
DROP POLICY IF EXISTS "Allow public insertions" ON public.inquiries;
DROP POLICY IF EXISTS "Allow authenticated selection" ON public.inquiries;

-- 3. Create public insert policy
CREATE POLICY "Allow public insertions" 
ON public.inquiries 
FOR INSERT 
TO public 
WITH CHECK (true);

-- 4. Create admin select policy (authenticated users)
CREATE POLICY "Allow authenticated selection" 
ON public.inquiries 
FOR SELECT 
TO authenticated 
USING (true);

-- 5. Reload cache
NOTIFY pgrst, 'reload schema';
