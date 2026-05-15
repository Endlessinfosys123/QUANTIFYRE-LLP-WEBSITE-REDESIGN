-- QUANTIFYRE LLP — SERVICES CONTENT ENHANCEMENT (Mixed Types Version)
-- This script populates missing detail page content for all services with correct casting.

UPDATE public.services
SET 
    detail_page_h1 = 'Software at Speed.',
    detail_page_subtext = 'We engineer custom software solutions that solve complex business problems. Scalable, secure, and built for the modern cloud.',
    detail_page_badge = 'Custom Engineering',
    tags = ARRAY['Node.js', 'React', 'Go', 'AWS', 'Kubernetes'],
    detail_page_capabilities = '["Microservices Architecture", "Cloud-Native Development", "Legacy System Modernization", "API Design & Integration"]'::jsonb,
    detail_page_deliverables = ARRAY['Source Code Repository', 'Architecture Documentation', 'Deployment Automation Scripts', 'Maintenance Manual'],
    detail_page_roadmap = ARRAY['Discovery & Discovery', 'Architectural Design', 'Iterative Development', 'Rigorous QA', 'Continuous Deployment']
WHERE slug = 'software-engineering';

UPDATE public.services
SET 
    detail_page_h1 = 'Data-Driven Growth.',
    detail_page_subtext = 'Transform your digital presence into a revenue engine. We combine creative strategy with technical execution to dominate your market.',
    detail_page_badge = 'Marketing Tech',
    tags = ARRAY['SEO', 'SEM', 'Analytics', 'Conversion Optimization'],
    detail_page_capabilities = '["Search Engine Dominance", "Precision Ad Targeting", "Content Strategy", "Social Media Engineering"]'::jsonb,
    detail_page_deliverables = ARRAY['Growth Strategy Blueprint', 'Performance Analytics Dashboard', 'Content Asset Library', 'Campaign Reports'],
    detail_page_roadmap = ARRAY['Market Research', 'Strategy Formulation', 'Campaign Launch', 'Optimization Loop', 'Scaling Phase']
WHERE slug = 'digital-marketing';

UPDATE public.services
SET 
    detail_page_h1 = 'Mobile First.',
    detail_page_subtext = 'Native-level performance for iOS and Android. We build mobile experiences that users love and businesses depend on.',
    detail_page_badge = 'Mobile Engineering',
    tags = ARRAY['React Native', 'Flutter', 'Swift', 'Kotlin'],
    detail_page_capabilities = '["Cross-Platform Development", "Native iOS/Android Apps", "Mobile UI/UX Design", "App Store Optimization"]'::jsonb,
    detail_page_deliverables = ARRAY['App Store Build', 'UI Design Assets', 'Backend API Documentation', 'User Analytics Integration'],
    detail_page_roadmap = ARRAY['Product Design', 'Prototype Development', 'Core Feature Build', 'App Store Submission', 'Post-Launch Support']
WHERE slug = 'mobile-development';

UPDATE public.services
SET 
    detail_page_h1 = 'Design That Works.',
    detail_page_subtext = 'User experience is the bridge between your technology and your users. We design interfaces that are as functional as they are beautiful.',
    detail_page_badge = 'Creative Design',
    tags = ARRAY['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    detail_page_capabilities = '["User Journey Mapping", "High-Fidelity Wireframing", "Interactive Prototyping", "Design System Architecture"]'::jsonb,
    detail_page_deliverables = ARRAY['Design System Library', 'Interactive Prototypes', 'User Research Report', 'Production-Ready Assets'],
    detail_page_roadmap = ARRAY['User Research', 'Wireframe Sprints', 'Visual Design', 'Interaction Design', 'Dev Handover']
WHERE slug = 'uiux-design';

-- Reload cache
NOTIFY pgrst, 'reload schema';
