-- PATCH FOR PAGE_SECTIONS TABLE
ALTER TABLE public.page_sections ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.page_sections ADD COLUMN IF NOT EXISTS subtitle TEXT;
ALTER TABLE public.page_sections ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.page_sections ADD COLUMN IF NOT EXISTS badge_text TEXT;
ALTER TABLE public.page_sections ADD COLUMN IF NOT EXISTS primary_cta_text TEXT;
ALTER TABLE public.page_sections ADD COLUMN IF NOT EXISTS primary_cta_link TEXT;
ALTER TABLE public.page_sections ADD COLUMN IF NOT EXISTS secondary_cta_text TEXT;
ALTER TABLE public.page_sections ADD COLUMN IF NOT EXISTS secondary_cta_link TEXT;
ALTER TABLE public.page_sections ADD COLUMN IF NOT EXISTS bg_image_url TEXT;
ALTER TABLE public.page_sections ADD COLUMN IF NOT EXISTS extra_data JSONB DEFAULT '{}';
ALTER TABLE public.page_sections ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT true;
ALTER TABLE public.page_sections ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();
