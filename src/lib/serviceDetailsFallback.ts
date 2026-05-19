/**
 * Detailed, professional service content for each service page.
 * Written like top Ahmedabad IT agencies (Bacancy, Space-O, WDI).
 */

export type ServiceDetail = {
  headline: string;
  subHeadline: string;
  overview: string;
  whatWeOffer: { title: string; desc: string }[];
  whyUs: { title: string; desc: string }[];
  processSteps: { step: string; title: string; desc: string }[];
  techStack: string[];
  features: string[];
  faq: { q: string; a: string }[];
};

const serviceRegistry: Record<string, ServiceDetail> = {

  "ai-automation": {
    headline: "AI That Works While You Sleep",
    subHeadline: "Custom AI Agents, LLM Integrations & Intelligent Workflow Automation",
    overview: "Manual processes are the biggest hidden cost in any business. Our AI Automation & Solutions service eliminates this cost permanently. We build custom AI agents powered by OpenAI GPT-4, Claude, and LangChain that automate everything from customer support and lead qualification to internal document processing and data extraction. Whether you need an intelligent chatbot that actually understands context, a predictive analytics engine that forecasts your sales pipeline, or a Robotic Process Automation (RPA) system that handles 500 invoices per hour — we engineer it from scratch around your exact business logic.",
    whatWeOffer: [
      { title: "Custom AI Agents & Chatbots", desc: "GPT-4 and Claude-powered conversational agents with memory, tool use, and business-specific training. Handles customer support, FAQs, lead capture, and escalation — 24/7 without human intervention." },
      { title: "Workflow & RPA Automation", desc: "End-to-end automation of repetitive back-office tasks like invoice processing, data entry, report generation, and email triage. Built using Python, Zapier, Make, and custom RPA frameworks." },
      { title: "Predictive Analytics & ML Models", desc: "Custom machine learning models trained on your business data to forecast demand, detect churn, score leads, and optimize pricing. Deployed as real-time APIs your team can query instantly." },
      { title: "Document Intelligence & OCR", desc: "Intelligent document processing using Vision AI — extract structured data from PDFs, invoices, contracts, and handwritten forms. Reduces manual data entry by up to 95%." },
      { title: "LLM Integration into Existing Apps", desc: "We embed AI capabilities directly into your existing software — CRM, ERP, or website. Add semantic search, AI-generated summaries, smart suggestions, and natural language queries to tools you already use." },
      { title: "AI-Powered Dashboards", desc: "Real-time intelligence dashboards that surface anomalies, trends, and recommendations automatically — no analyst required." },
    ],
    whyUs: [
      { title: "We Build, Not Just Prompt", desc: "We write production-grade Python and TypeScript code around LLMs — not just ChatGPT wrappers. Your AI system will be robust, testable, and maintainable." },
      { title: "Privacy-First Architecture", desc: "All sensitive data processing can be configured to run on-premise or with private cloud endpoints — your data never leaves your infrastructure." },
      { title: "Measurable ROI", desc: "Every automation we build comes with ROI projections. Our clients average 30+ hours saved per week and 60% reduction in operational overhead within 90 days." },
    ],
    processSteps: [
      { step: "01", title: "Automation Audit", desc: "We map your current workflows, identify the highest-ROI automation opportunities, and prioritize by effort vs impact." },
      { step: "02", title: "Prototype & Validate", desc: "We build a working prototype in 1-2 weeks, validate accuracy with your team, and iterate on edge cases." },
      { step: "03", title: "Full Integration", desc: "The validated AI system is integrated into your existing tools and infrastructure with proper authentication and audit trails." },
      { step: "04", title: "Monitor & Retrain", desc: "We set up performance monitoring and scheduled retraining pipelines to ensure accuracy improves over time." },
    ],
    techStack: ["Python", "OpenAI API", "LangChain", "LlamaIndex", "TensorFlow", "FastAPI", "PostgreSQL", "Pinecone", "Redis", "Docker"],
    features: ["GPT-4 / Claude LLM Integration", "Custom Chatbot Development", "Robotic Process Automation (RPA)", "Predictive Analytics Models", "Document OCR & Extraction", "AI-Powered Dashboards", "Multi-Agent Orchestration", "RAG (Retrieval-Augmented Generation)"],
    faq: [
      { q: "Do I need a large dataset to start with AI?", a: "Not always. For chatbots and document processing, we can start immediately. For custom ML models, we'll assess your existing data and recommend the minimum viable dataset." },
      { q: "How long does an AI automation project take?", a: "A basic chatbot or RPA workflow takes 2-4 weeks. A full predictive analytics system or multi-agent platform takes 8-16 weeks depending on complexity." },
      { q: "Will the AI integrate with our existing CRM / ERP?", a: "Yes. We have experience integrating with Salesforce, HubSpot, SAP, Zoho, and custom-built systems via REST APIs and webhooks." },
    ],
  },

  "software-engineering": {
    headline: "Software Built For Your Business Logic",
    subHeadline: "Custom ERP, SaaS Platforms, APIs & Enterprise Systems — Engineered to Scale",
    overview: "Off-the-shelf software forces you to change your business to fit the tool. We build the tool around you. Our Custom Software Engineering team designs and develops enterprise-grade applications — from multi-module ERP systems and SaaS platforms to microservices APIs and legacy system modernizations. Every line of code is written for maintainability, security, and performance. We act as your dedicated remote engineering department, from discovery to deployment to long-term support.",
    whatWeOffer: [
      { title: "Custom ERP Systems", desc: "Full-featured Enterprise Resource Planning systems covering HR, inventory, finance, procurement, and project management — built for your specific industry workflows, not generic templates." },
      { title: "SaaS Product Engineering", desc: "We build complete SaaS platforms from scratch — multi-tenant architecture, subscription billing, role-based access control, and white-labeling capabilities. Ideal for startups launching their first product." },
      { title: "REST & GraphQL API Development", desc: "Production-grade APIs built with Node.js, Django, or .NET — fully documented with Swagger, versioned, secured with OAuth2/JWT, and capable of handling millions of requests per day." },
      { title: "Cloud-Native Architecture", desc: "Microservices, Docker containers, and Kubernetes orchestration designed for AWS, Azure, or GCP. Auto-scaling, zero-downtime deployments, and disaster recovery built-in." },
      { title: "Legacy System Modernization", desc: "We migrate outdated monolithic systems to modern, modular architectures without disrupting your operations — phased migration with zero data loss." },
      { title: "Database Design & Optimization", desc: "Advanced schema design, query optimization, indexing strategies, and data warehousing for PostgreSQL, SQL Server, MySQL, and MongoDB." },
    ],
    whyUs: [
      { title: "We've Built ERPs Before", desc: "Our flagship project — a multi-school ERP with ADO.NET, SQL Server TDE encryption, and RBAC for 3,000+ users — is live and battle-tested." },
      { title: "Security-First Development", desc: "Every application we build passes OWASP Top 10 security checks. We implement encryption at rest, secure API gateways, and audit logging by default." },
      { title: "Full Documentation", desc: "Every project ships with technical documentation, API references, and a handover guide — so you're never locked into us." },
    ],
    processSteps: [
      { step: "01", title: "Requirement Engineering", desc: "Deep-dive discovery sessions to map business rules, user roles, data flows, and integration requirements into a formal specification document." },
      { step: "02", title: "Architecture Design", desc: "System architecture diagrams, database schema design, API contract definitions, and tech stack selection — approved before a single line of code is written." },
      { step: "03", title: "Agile Development", desc: "2-week sprint cycles with working demos after each sprint. You see progress and provide feedback continuously — no black-box development." },
      { step: "04", title: "QA, UAT & Go-Live", desc: "Automated testing, load testing, and user acceptance testing before deployment. Staged rollout to production with rollback capabilities." },
    ],
    techStack: [".NET / C#", "Node.js", "Django / Python", "PostgreSQL", "SQL Server", "React", "Docker", "Kubernetes", "AWS / Azure", "Redis"],
    features: ["Custom ERP Development", "SaaS Multi-Tenant Architecture", "REST & GraphQL APIs", "Role-Based Access Control", "Cloud-Native Microservices", "Database Design & Optimization", "Legacy System Migration", "CI/CD Pipeline Setup"],
    faq: [
      { q: "How is custom software priced?", a: "We offer fixed-price projects for well-defined scopes and time-and-material billing for evolving requirements. A detailed quote is provided after the discovery session." },
      { q: "Who owns the source code?", a: "You do. 100%. Upon final payment, all source code, documentation, and infrastructure configurations are transferred to you with no licensing fees." },
      { q: "Do you provide post-launch maintenance?", a: "Yes. All projects include 30 days of free support. We offer monthly retainer plans for ongoing maintenance, feature additions, and server management." },
    ],
  },

  "web-development": {
    headline: "Websites That Win Before They Load",
    subHeadline: "Next.js Web Applications, E-Commerce & SEO-Optimized Digital Experiences",
    overview: "Your website is your highest-leverage sales asset. It works 24/7, reaches every market, and forms the first impression for every potential client. We build high-performance web applications and corporate websites using Next.js 14, TypeScript, and modern headless CMS architectures. The result: pages that score 95+ on Google PageSpeed, rank on the first page of search results, and convert visitors into paying clients. We have redesigned websites that doubled traffic within 60 days.",
    whatWeOffer: [
      { title: "Corporate & Business Websites", desc: "Multi-page, SEO-optimized corporate websites with dynamic content management, contact forms with CRM integration, and analytics dashboards. Built to convert visitors to leads." },
      { title: "Next.js Web Applications", desc: "Complex web applications with real-time data, user authentication, dashboards, and interactive features — all with server-side rendering for SEO and performance." },
      { title: "E-Commerce Development", desc: "Custom e-commerce platforms with product catalogs, cart, Razorpay / Stripe / PayPal payment gateways, order management, and inventory sync. No Shopify limitations." },
      { title: "Headless CMS Integration", desc: "Empower your marketing team to update content without developers. We integrate Sanity, Contentful, or build custom admin panels — your content, your control." },
      { title: "SEO & Core Web Vitals", desc: "Technical SEO setup — sitemap, robots.txt, structured data (JSON-LD), canonical tags, image optimization, and Core Web Vitals optimization. We've achieved Page 1 rankings for competitive keywords." },
      { title: "Website Redesign & Audit", desc: "We audit your existing website, identify conversion bottlenecks, and rebuild it with modern architecture — retaining your SEO equity while dramatically improving UX and performance." },
    ],
    whyUs: [
      { title: "99+ PageSpeed Score", desc: "We obsess over performance. Every site we build targets a 95+ Google PageSpeed Insights score — because faster sites rank higher and convert better." },
      { title: "Mobile-First, Always", desc: "100% of our designs start on mobile. 70%+ of your visitors are on phones. We ensure pixel-perfect experiences on every screen size from 320px to 4K." },
      { title: "Conversion-Optimized Layouts", desc: "Our UI/UX decisions are backed by CRO principles — clear CTAs, trust signals, social proof placement, and friction reduction that measurably improves your lead generation." },
    ],
    processSteps: [
      { step: "01", title: "Discovery & Strategy", desc: "Competitor analysis, keyword research, site architecture planning, and conversion goal mapping before any design begins." },
      { step: "02", title: "UI/UX Design in Figma", desc: "Wireframes, desktop and mobile mockups, and interactive prototypes — reviewed and approved by you before development starts." },
      { step: "03", title: "Development & CMS Setup", desc: "Pixel-perfect frontend development, backend API integration, CMS configuration, and payment gateway setup." },
      { step: "04", title: "Launch & SEO Handover", desc: "Performance audit, Google Search Console setup, sitemap submission, and 30-day post-launch monitoring." },
    ],
    techStack: ["Next.js 14", "TypeScript", "TailwindCSS", "Framer Motion", "Supabase", "Sanity CMS", "Stripe / Razorpay", "Vercel", "Cloudflare", "Google Analytics 4"],
    features: ["Next.js 14 Server Components", "SEO & Core Web Vitals Optimization", "E-Commerce with Payment Gateway", "Headless CMS (Sanity/Contentful)", "Framer Motion Animations", "Google Analytics 4 Integration", "Responsive Mobile-First Design", "Custom Admin Dashboard"],
    faq: [
      { q: "How long does a website take to build?", a: "A standard corporate website takes 2–4 weeks. A complex web application with a custom CMS and e-commerce takes 6–12 weeks." },
      { q: "Will my website rank on Google?", a: "We implement full technical SEO from day one. Ranking is a process that takes 3–6 months, but we set you up with the correct foundation — sitemaps, structured data, page speed, and content strategy." },
      { q: "Do you redesign existing websites?", a: "Yes. We specialize in redesigns. We audit your current site, identify what to keep (especially good content and backlinks), and rebuild everything else for modern performance and UX." },
    ],
  },

  "digital-marketing": {
    headline: "Marketing That Generates Revenue, Not Just Clicks",
    subHeadline: "Data-Driven SEO, Paid Ads, Social Media & Content Strategy",
    overview: "Most digital marketing agencies sell you impressions and followers. We sell you revenue. Our Digital Marketing Strategy service is built entirely around measurable ROI — every campaign is tied to a business outcome: leads generated, cost per acquisition, or revenue attributed. We combine Search Engine Optimization, Google & Meta paid advertising, content marketing, and social media management into a unified growth strategy that compounds over time.",
    whatWeOffer: [
      { title: "Search Engine Optimization (SEO)", desc: "Full-service SEO covering technical audits, keyword strategy, on-page optimization, link building, and content creation. We've ranked clients on Page 1 for competitive industry keywords in 90 days." },
      { title: "Google Ads (PPC) Management", desc: "Performance Max, Search, Display, and Shopping campaigns managed with weekly optimization. Average ROAS of 3.5x–6x for our clients. Full transparency with real-time reporting dashboards." },
      { title: "Meta (Facebook & Instagram) Advertising", desc: "Audience research, creative strategy, ad copywriting, A/B testing, and funnel optimization across Meta platforms. Ideal for B2C brands and local service businesses." },
      { title: "Social Media Management", desc: "Monthly content calendars, graphic design, copywriting, and community management for Instagram, LinkedIn, and Facebook. Content that builds brand authority and drives organic reach." },
      { title: "Content Marketing & Blogging", desc: "SEO-optimized long-form blog content, case studies, whitepapers, and thought leadership articles that attract high-intent organic traffic and establish your expertise." },
      { title: "Analytics & Reporting", desc: "Monthly performance reports with GA4, Search Console, and ad platform data — clear attribution of which channels are driving revenue, and quarterly strategy reviews." },
    ],
    whyUs: [
      { title: "We're Performance-Driven", desc: "We don't celebrate vanity metrics. Our KPIs are leads, cost-per-lead, and revenue attributed. Every rupee spent has a return attached to it." },
      { title: "In-House Creative Team", desc: "We handle design, copy, video scripting, and strategy in-house — no outsourcing. Faster turnaround, consistent quality." },
      { title: "Transparent Reporting", desc: "You get access to a live dashboard showing exactly where your budget is going and what it's generating — updated in real-time, no hidden fees." },
    ],
    processSteps: [
      { step: "01", title: "Audit & Strategy", desc: "Full audit of your existing digital presence — website, social media, Google Business Profile, and competitor analysis. We build a 90-day growth roadmap." },
      { step: "02", title: "Campaign Setup", desc: "Pixel installation, conversion tracking, audience setup, ad creative production, and campaign launches — everything configured correctly from day one." },
      { step: "03", title: "Optimize & Scale", desc: "Weekly performance reviews, A/B testing of creatives and copy, bid strategy adjustments, and budget reallocation to top-performing campaigns." },
      { step: "04", title: "Report & Grow", desc: "Monthly strategy calls with detailed performance reports. We identify what's working and double down — compounding growth month over month." },
    ],
    techStack: ["Google Ads", "Meta Ads Manager", "Google Analytics 4", "Search Console", "SEMrush", "Ahrefs", "HubSpot", "Mailchimp", "Canva Pro", "Hootsuite"],
    features: ["Technical SEO Audit & Optimization", "Google Ads (PPC) Management", "Meta Facebook & Instagram Ads", "Social Media Content Management", "SEO-Optimized Blog Content", "Email Marketing Campaigns", "Conversion Rate Optimization (CRO)", "Monthly Performance Reports"],
    faq: [
      { q: "How long before I see results from SEO?", a: "SEO is a 3–6 month process to see significant ranking improvements. Paid ads (Google/Meta) generate leads from week one. We recommend running both simultaneously." },
      { q: "What is your minimum ad spend?", a: "We recommend a minimum of ₹15,000/month in ad spend for Google Ads and ₹10,000/month for Meta Ads to gather statistically significant data. Our management fee is separate." },
      { q: "Do you work with local businesses in Gujarat?", a: "Yes. We have strong experience with local SEO and geo-targeted campaigns for businesses in Ahmedabad, Gandhinagar, Surat, and across Gujarat." },
    ],
  },

  "mobile-development": {
    headline: "Apps Your Users Won't Delete",
    subHeadline: "Cross-Platform Flutter & React Native Apps for iOS and Android",
    overview: "A great mobile app is not just functional — it's addictive in the best possible way. Our Mobile App Development team builds iOS and Android applications using Flutter and React Native that look native, feel native, and perform natively. We've built everything from consumer apps with 10,000+ daily active users to enterprise mobile tools for field teams managing complex workflows offline. From App Store submission to push notification infrastructure, we handle the entire mobile ecosystem.",
    whatWeOffer: [
      { title: "Flutter App Development", desc: "Single codebase, two platforms (iOS + Android), native performance. Flutter gives us beautiful animations, custom UI components, and 60fps performance without compromising on quality." },
      { title: "React Native Development", desc: "For teams already using React on the web, React Native offers the fastest path to a high-quality mobile app with shared business logic and component libraries." },
      { title: "Offline-First Architecture", desc: "Apps that continue to function fully without internet — local SQLite database, background sync when connectivity returns. Critical for field teams and enterprise use cases." },
      { title: "Real-Time Features", desc: "Live chat, real-time notifications, WebSocket data feeds, and collaborative features powered by Firebase or Supabase Realtime." },
      { title: "App Store & Play Store Submission", desc: "We handle the complete submission process — certificates, provisioning profiles, app store listing optimization, screenshots, and review response. Your app goes live without you touching Xcode." },
      { title: "API Integration & Backend", desc: "Full backend API development (Node.js or Django) to power your app, with secure authentication, data sync, file uploads, and third-party service integrations." },
    ],
    whyUs: [
      { title: "One Codebase, Both Stores", desc: "With Flutter or React Native, we build once and deploy to both iOS and Android — saving you 40–60% vs. maintaining two separate native apps." },
      { title: "Enterprise Security", desc: "Biometric authentication, certificate pinning, secure local storage (Keychain/Keystore), and OWASP Mobile Top 10 compliance built into every app we ship." },
      { title: "Post-Launch App Growth", desc: "We provide App Store Optimization (ASO) guidance, crash analytics setup (Sentry/Firebase Crashlytics), and a roadmap for v2 features based on user behavior data." },
    ],
    processSteps: [
      { step: "01", title: "Feature Planning & UX", desc: "User journey mapping, information architecture, wireframing, and interactive prototype in Figma — reviewed before development." },
      { step: "02", title: "UI Development", desc: "Pixel-perfect Flutter or React Native implementation of approved designs with smooth animations and responsive layouts for every screen size." },
      { step: "03", title: "Backend & Integrations", desc: "API development, database setup, push notification service (FCM/APNs), payment gateway (Razorpay), and third-party SDK integrations." },
      { step: "04", title: "QA & App Store Launch", desc: "Device testing across 10+ real devices, performance profiling, app store submission, and go-live monitoring." },
    ],
    techStack: ["Flutter", "Dart", "React Native", "TypeScript", "Firebase", "Supabase", "SQLite", "Node.js", "Fastlane", "Sentry"],
    features: ["Flutter (iOS + Android) Development", "React Native Development", "Offline-First SQLite Architecture", "Real-Time Push Notifications", "Biometric Authentication", "Payment Gateway (Razorpay/Stripe)", "App Store & Play Store Submission", "App Store Optimization (ASO)"],
    faq: [
      { q: "Flutter vs React Native — which is better?", a: "Flutter gives better UI consistency and performance. React Native is better if your team uses JavaScript and you want to share code with a web app. We recommend Flutter for most greenfield projects." },
      { q: "How long does a mobile app take to build?", a: "An MVP with core features takes 8–14 weeks. A full-featured consumer app with backend takes 16–24 weeks. We provide a detailed estimate after requirement gathering." },
      { q: "Do you maintain apps after launch?", a: "Yes. We offer monthly maintenance retainers covering OS update compatibility, bug fixes, performance monitoring, and feature additions as your user base grows." },
    ],
  },

  "uiux-design": {
    headline: "Design That Sells Before You Speak",
    subHeadline: "User Research, Wireframing, Prototyping & Visual Identity Design",
    overview: "Good design is not decoration — it's a business system. Our UI/UX Design team creates digital experiences that guide users from confusion to conversion with zero friction. We follow a research-driven design process — understanding your users before touching a pixel. The result is interfaces that are not just beautiful, but strategically designed to achieve your business goals: more sign-ups, more purchases, more qualified leads. We design for products, platforms, mobile apps, and enterprise dashboards.",
    whatWeOffer: [
      { title: "User Research & Persona Development", desc: "Qualitative interviews, competitor analysis, heatmap reviews, and user journey mapping to understand exactly who your users are and what they need — before any design decision is made." },
      { title: "Wireframing & Information Architecture", desc: "Low-fidelity wireframes that define the structure of every screen, user flow between pages, and information hierarchy. Reviewed and iterated with you before high-fidelity design begins." },
      { title: "High-Fidelity UI Design", desc: "Pixel-perfect visual designs in Figma with proper design tokens, component libraries, dark/light mode variants, and responsive layouts for mobile, tablet, and desktop." },
      { title: "Interactive Prototyping", desc: "Clickable Figma prototypes that simulate the real product — shared for user testing and stakeholder sign-off without writing a single line of code." },
      { title: "Design System Creation", desc: "A scalable component library (colors, typography, spacing, components, icons) that ensures visual consistency across your entire product as it grows." },
      { title: "Brand Identity & Visual Design", desc: "Logo design, brand guidelines, color palette selection, typography systems, and marketing collateral that communicates your brand's personality consistently across every touchpoint." },
    ],
    whyUs: [
      { title: "Research Before Pixels", desc: "We never start designing before understanding the user. Our research phase prevents costly redesigns later and ensures the design solves a real problem, not just looks good." },
      { title: "Developer-Ready Handoff", desc: "Every design file includes inspect-ready specs, exported assets, and a component guide so developers can build pixel-perfectly without back-and-forth." },
      { title: "Conversion-Focused Design", desc: "Our design decisions are backed by UX principles and CRO data. We know where to place CTAs, how to reduce form friction, and what trust signals increase conversions." },
    ],
    processSteps: [
      { step: "01", title: "Research & Discovery", desc: "User interviews, competitor teardown, analytics review, and stakeholder workshops to build a clear design brief." },
      { step: "02", title: "Wireframes & User Flows", desc: "Low-fidelity wireframes for all key screens with annotated user flows — reviewed and iterated until the structure is approved." },
      { step: "03", title: "Visual Design & Prototyping", desc: "High-fidelity designs with full component library, interactive prototype, and accessibility review." },
      { step: "04", title: "Handoff & Support", desc: "Developer-ready Figma files with inspect specs, exported assets, and design system documentation. We support developers during implementation." },
    ],
    techStack: ["Figma", "FigJam", "Adobe XD", "Protopie", "Maze (User Testing)", "Zeplin", "Lottie", "Spline 3D", "Adobe Illustrator", "Notion"],
    features: ["User Research & Journey Mapping", "Wireframing & Information Architecture", "High-Fidelity UI Design (Figma)", "Interactive Prototype Development", "Design System & Component Library", "Brand Identity & Logo Design", "Accessibility (WCAG) Compliance", "Developer Handoff Specifications"],
    faq: [
      { q: "Can you design for both web and mobile simultaneously?", a: "Yes. We design responsive systems that cover desktop, tablet, and mobile from a single design process — using Figma's responsive constraints and auto-layout." },
      { q: "What if I want changes after designs are finalized?", a: "We include 2 rounds of revisions per design phase in our standard contract. Additional revisions are billed at our hourly rate. We document all approved decisions to minimize scope creep." },
      { q: "Do you also develop what you design?", a: "Yes. Our design and development teams work in the same studio — which means the final product is pixel-accurate to the designs. No translation loss between design and code." },
    ],
  },

};

export function getServiceDetail(slug: string): ServiceDetail {
  const s = (slug || "").toLowerCase();
  if (s.includes("ai") || s.includes("automat")) return serviceRegistry["ai-automation"];
  if (s.includes("software") || s.includes("engineerin") || s.includes("erp")) return serviceRegistry["software-engineering"];
  if (s.includes("web") || s.includes("ecommerce") || s.includes("site")) return serviceRegistry["web-development"];
  if (s.includes("digital") || s.includes("market") || s.includes("seo")) return serviceRegistry["digital-marketing"];
  if (s.includes("mobile") || s.includes("app")) return serviceRegistry["mobile-development"];
  if (s.includes("ui") || s.includes("ux") || s.includes("design")) return serviceRegistry["uiux-design"];
  return serviceRegistry["software-engineering"]; // safe fallback
}
