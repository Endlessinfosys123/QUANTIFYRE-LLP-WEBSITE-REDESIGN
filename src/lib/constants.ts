export const COMPANY_DETAILS = {
  name: "QUANTIFYRE LLP",
  llpin: "ACG-0636",
  tagline: "The Future, Faster",
  email: "Info.endlessinfosys@gmail.com",
  phone: "+91 6356195625",
  phones: ["+91 6356195625", "+91 7778095625", "+91 7383095625"],
  address: "B-402, The Landmark, Opp. Kansar Hotel, Kudasan, Gandhinagar, Gujarat 382421",
  instagram: "https://instagram.com/quantifyre_llp_official",
  linkedin: "https://linkedin.com/in/tishypatelofficial",
  sisterBrand: {
    name: "ENDLESSINFOSYS",
    url: "https://endlessinfosys.com",
  },
};

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export const SERVICES = [
  {
    id: "ai-automation",
    title: "AI Automation & Solutions",
    icon: "Brain",
    description: "We design intelligent automation that eliminates manual work and scales your operations.",
    deliverables: [
      "Custom AI Agents",
      "Workflow Automation",
      "Predictive Analytics",
      "LLM Integration (GPT, Claude)",
    ],
    tech: ["Python", "OpenAI", "LangChain", "TensorFlow"],
  },
  {
    id: "software-engineering",
    title: "Custom Software Engineering",
    icon: "Code2",
    description: "Bespoke web apps, ERPs, CRMs, and platforms built for your exact business logic.",
    deliverables: [
      "Enterprise ERP Systems",
      "SaaS Platforms",
      "Cloud Infrastructure",
      "Legacy System Migration",
    ],
    tech: [".NET", "Node.js", "Django", "SQL Server"],
  },
  {
    id: "web-development",
    title: "Website Design & Development",
    icon: "Monitor",
    description: "High-performance, SEO-optimized websites built with Next.js for speed and conversion.",
    deliverables: [
      "Responsive Web Design",
      "Next.js Development",
      "E-commerce Solutions",
      "SEO & Performance Optimization",
    ],
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Strategy",
    icon: "BarChart3",
    description: "Data-driven campaigns, SEO, social media, and content that generates measurable ROI.",
    deliverables: [
      "Growth Strategy",
      "Content Marketing",
      "Search Engine Optimization",
      "Paid Ad Management",
    ],
    tech: ["Google Analytics", "SEMrush", "Meta Ads", "HubSpot"],
  },
  {
    id: "mobile-development",
    title: "Mobile App Development",
    icon: "Smartphone",
    description: "Cross-platform Flutter and React Native apps that work beautifully on every device.",
    deliverables: [
      "iOS & Android Apps",
      "Hybrid App Development",
      "App Store Optimization",
      "Offline-First Architecture",
    ],
    tech: ["Flutter", "React Native", "Swift", "Kotlin"],
  },
  {
    id: "uiux-design",
    title: "UI/UX Design",
    icon: "PenTool",
    description: "Research-driven design that converts — wireframes, prototypes, and pixel-perfect interfaces.",
    deliverables: [
      "User Research",
      "Wireframing & Prototyping",
      "Visual Identity Design",
      "Design Systems",
    ],
    tech: ["Figma", "Adobe XD", "Protopie", "Spline"],
  },
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Discovery & Strategy",
    description: "We understand your goals, audience, and technical requirements.",
    icon: "Search",
  },
  {
    step: 2,
    title: "UI/UX Design",
    description: "Wireframes and interactive prototypes — your feedback shapes every pixel.",
    icon: "Layers",
  },
  {
    step: 3,
    title: "Development",
    description: "Clean, scalable code using the best-fit tech stack for your project.",
    icon: "Cpu",
  },
  {
    step: 4,
    title: "Testing & QA",
    description: "Rigorous testing across devices, browsers, and performance benchmarks.",
    icon: "CheckCircle2",
  },
  {
    step: 5,
    title: "Launch",
    description: "Smooth deployment with zero-downtime and full post-launch monitoring.",
    icon: "Rocket",
  },
  {
    step: 6,
    title: "Support & Scale",
    description: "Ongoing maintenance, updates, and feature additions as you grow.",
    icon: "TrendingUp",
  },
];

export const TECH_STACK = {
  Frontend: ["React", "Next.js", "Vue", "Angular", "TypeScript", "TailwindCSS", "Framer Motion"],
  Backend: ["Node.js", "Python", "Django", ".NET", "PHP", "Laravel", "Spring Boot"],
  AI_ML: ["OpenAI API", "LangChain", "TensorFlow", "HuggingFace", "Pinecone", "Python"],
  Mobile: ["Flutter", "React Native", "Swift", "Kotlin"],
  Database: ["SQL Server", "PostgreSQL", "MySQL", "MongoDB", "Supabase", "Firebase"],
  Cloud: ["AWS", "Azure", "GCP", "Vercel", "Docker", "CI/CD"],
};

export const PROJECTS = [
  {
    id: 1,
    title: "School ERP System",
    industry: "Education",
    description: "Multi-school management platform with RBAC, ADO.NET, SQL Server TDE",
    tech: [".NET", "SQL Server", "React"],
    image: "https://placehold.co/600x400/6C3FEF/FFFFFF?text=School+ERP",
  },
  {
    id: 2,
    title: "QUANTIFYRE IRIS",
    industry: "Marketing",
    description: "AI agency management dashboard with campaign, lead, and budget tracking",
    tech: ["Next.js", "OpenAI", "Supabase"],
    image: "https://placehold.co/600x400/0EA5E9/FFFFFF?text=QUANTIFYRE+IRIS",
  },
  {
    id: 3,
    title: "Revive Motors",
    industry: "Automotive",
    description: "Django-based automotive management platform",
    tech: ["Django", "Python", "PostgreSQL"],
    image: "https://placehold.co/600x400/0A0A0F/FFFFFF?text=Revive+Motors",
  },
];

export const TESTIMONIALS = [
  {
    quote: "QUANTIFYRE transformed our operations with a custom ERP that actually works. Delivered on time, zero bugs.",
    author: "Rajesh M.",
    role: "Director",
    company: "Education Sector",
    rating: 5,
  },
  {
    quote: "Their AI automation saved us 30+ hours per week. Genuinely impressed by the depth of their technical knowledge.",
    author: "Priya S.",
    role: "Founder",
    company: "HealthTech Startup",
    rating: 5,
  },
  {
    quote: "Professional, responsive, and brilliant designers. Our website traffic doubled in 2 months.",
    author: "Harshil C.",
    role: "CEO",
    company: "Luxelivein Furnishings",
    rating: 5,
  },
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: "How AI Automation is Transforming Indian SMBs in 2025",
    category: "AI Automation",
    date: "May 10, 2025",
    readTime: "5 min read",
    excerpt: "Discover how intelligent agents are helping small businesses compete with giants.",
    image: "https://placehold.co/600x400/6C3FEF/FFFFFF?text=AI+Automation",
  },
  {
    id: 2,
    title: "Why Your Next Website Should Be Built With Next.js 14",
    category: "Web Development",
    date: "May 08, 2025",
    readTime: "4 min read",
    excerpt: "Speed, SEO, and developer experience — why Next.js is the industry standard.",
    image: "https://placehold.co/600x400/0EA5E9/FFFFFF?text=Next.js+14",
  },
  {
    id: 3,
    title: "The Enterprise Admin Panel Architecture Every SaaS Needs",
    category: "Software Engineering",
    date: "May 05, 2025",
    readTime: "6 min read",
    excerpt: "Best practices for building scalable and secure administrative interfaces.",
    image: "https://placehold.co/600x400/0A0A0F/FFFFFF?text=SaaS+Architecture",
  },
];

export const FAQS = [
  {
    question: "What services does QUANTIFYRE offer?",
    answer: "We offer AI automation, custom software engineering, website design and development, mobile app development, UI/UX design, digital marketing strategy, and enterprise ERP solutions.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Timelines vary by project scope. A website takes 2–4 weeks, a web application takes 6–12 weeks, and enterprise software takes 3–6 months. We provide a detailed timeline after discovery.",
  },
  {
    question: "Do you serve international clients?",
    answer: "Yes. We actively serve clients in India, Dubai, UK, Canada, and Australia. We work across time zones with async and scheduled communication.",
  },
  {
    question: "What is your pricing model?",
    answer: "We offer fixed-price projects, milestone-based billing, and monthly retainer models. All pricing is transparent — no hidden fees.",
  },
  {
    question: "Do you provide post-launch support?",
    answer: "Yes. All projects include 30 days of free post-launch support. Extended maintenance packages are available.",
  },
  {
    question: "What makes QUANTIFYRE different from other agencies?",
    answer: "We are AI-first by design. Every solution we build incorporates intelligent automation. We are also a registered LLP (LLPIN: ACG-0636), ensuring legal accountability.",
  },
  {
    question: "Can you redesign an existing website?",
    answer: "Absolutely. We specialize in redesigns — we audit your existing site, identify conversion gaps, and rebuild it with modern architecture.",
  },
  {
    question: "How do I start a project?",
    answer: "Click 'Get Free Consultation' anywhere on the website. We'll schedule a 30-minute discovery call, understand your requirements, and send a detailed proposal within 48 hours.",
  },
];

export const STATS = [
  { label: "Projects Delivered", value: 12, suffix: "+" },
  { label: "Happy Clients", value: 8, suffix: "+" },
  { label: "Industries Served", value: 2, suffix: "+" },
  { label: "Year of Innovation", value: 1, suffix: "" },
];

export const INTERNATIONAL_FLAGS = [
  { country: "UAE", flag: "🇦🇪" },
  { country: "UK", flag: "🇬🇧" },
  { country: "Australia", flag: "🇦🇺" },
  { country: "Canada", flag: "🇨🇦" },
  { country: "USA", flag: "🇺🇸" },
];

export const TECH_MARQUEE = [
  "Next.js", "React", "Python", "AI/ML", "Node.js", "Flutter", "SQL Server", "Azure", "AWS", "Figma", "TailwindCSS", "Django", ".NET", "TypeScript"
];

export const WHY_CHOOSE_US = [
  {
    title: "AI-First Approach",
    description: "Every solution we build has AI at its core — automation, intelligence, and speed.",
    icon: "Zap",
  },
  {
    title: "Enterprise-Grade Quality",
    description: "We build like a large agency but move like a startup — best of both worlds.",
    icon: "ShieldCheck",
  },
  {
    title: "On-Time Delivery",
    description: "Strict timelines, transparent communication, zero surprise delays.",
    icon: "Clock",
  },
  {
    title: "Full-Cycle Team",
    description: "Design → Development → Testing → Launch → Support — one team, one invoice.",
    icon: "Users",
  },
  {
    title: "International Experience",
    description: "Serving clients across India, Dubai, UK, Canada, and Australia.",
    icon: "Globe",
  },
  {
    title: "Registered LLP",
    description: "QUANTIFYRE LLP (LLPIN: ACG-0636) — fully registered, legally compliant.",
    icon: "FileText",
  },
];
