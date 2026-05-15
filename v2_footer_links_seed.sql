-- QUANTIFYRE LLP — FOOTER LINKS SEEDING
-- This script populates the footer with standard navigation links.

DELETE FROM public.footer_links;

INSERT INTO public.footer_links (label, href, column_name, order_index) VALUES
-- Company Column
('About Us', '/about', 'company', 1),
('Our Portfolio', '/portfolio', 'company', 2),
('Blog Insights', '/blog', 'company', 3),
('Careers', '/contact', 'company', 4),

-- Capabilities Column
('AI Automation', '/services/ai-automation', 'services', 1),
('Software Engineering', '/services/software-engineering', 'services', 2),
('Web Development', '/services/web-development', 'services', 3),
('Digital Marketing', '/services/digital-marketing', 'services', 4),

-- Legal Column (Optional if we use hardcoded or dynamic)
('Privacy Policy', '/privacy', 'legal', 1),
('Terms of Service', '/terms', 'legal', 2);

-- Reload cache
NOTIFY pgrst, 'reload schema';
