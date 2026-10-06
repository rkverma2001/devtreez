import {
  Brain,
  Sparkles,
  Globe,
  Smartphone,
  Cloud,
  BarChart3,
  Bot,
  Car,
  ScanLine,
  ShoppingBag,
  Receipt,
  GraduationCap,
  HeartPulse,
  Landmark,
  Truck,
  Factory,
  Building2,
  Search,
  PenTool,
  Code2,
  Rocket,
  MessageSquareText,
  Network,
  Server,
  Activity,
  Laptop,
  Coffee,
  Plane,
  Heart,
  TrendingUp,
} from "lucide-react";

export const navItems = [
  { label: "Home", to: "/" },
  { label: "Solutions", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Technologies", to: "/technologies" },
  { label: "Industries", to: "/industries" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

// TODO: replace with real company numbers before going live.
export const stats = [
  { value: 50, suffix: "+", label: "Projects delivered" },
  { value: 15, suffix: "+", label: "Industries served" },
  { value: 98, suffix: "%", label: "Client retention" },
  { value: 24, suffix: "/7", label: "Support & monitoring" },
];

export const services = [
  {
    slug: "ai-machine-learning",
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Predictive models and intelligent automation trained on your data.",
    points: ["Custom ML models", "Computer vision", "Forecasting & analytics"],
    details:
      "From demand forecasting to defect detection, we design, train and deploy machine-learning models that plug straight into your operations, with monitoring so they stay accurate as your data changes.",
    deliverables: ["Data audit & feasibility study", "Model training & evaluation", "MLOps pipelines", "Model monitoring dashboards"],
    tech: ["Python", "PyTorch", "TensorFlow", "scikit-learn", "MLflow"],
    demo: "neural-net",
  },
  {
    slug: "generative-ai",
    icon: Sparkles,
    title: "Generative AI & Agents",
    description: "LLM copilots, chatbots and AI agents that work alongside your team.",
    points: ["RAG knowledge assistants", "Workflow agents", "LLM integration"],
    details:
      "We build assistants grounded in your own documents and systems: support copilots, internal knowledge search and agents that complete multi-step tasks, with guardrails, evaluation and human review built in.",
    deliverables: ["Use-case discovery workshop", "RAG & agent architecture", "Prompt & evaluation suites", "Secure deployment"],
    tech: ["OpenAI", "Claude", "LangChain", "Vector DBs", "FastAPI"],
    demo: "sentiment",
  },
  {
    slug: "website-development",
    icon: Globe,
    title: "Website Development",
    description: "Your brand, beautifully built online: fast, secure and SEO-ready.",
    points: ["Corporate & e-commerce", "Headless CMS", "Performance tuning"],
    details:
      "High-performance marketing sites, portals and online stores with motion-rich design, editor-friendly CMS and Core Web Vitals tuned from day one.",
    deliverables: ["UX & visual design", "Responsive development", "CMS integration", "SEO & analytics setup"],
    tech: ["React", "Next.js", "Tailwind CSS", "Headless CMS", "Vercel"],
    demo: null,
  },
  {
    slug: "application-development",
    icon: Smartphone,
    title: "Application Development",
    description: "Apps that bring your vision to every screen, iOS, Android and web.",
    points: ["Native & cross-platform", "SaaS products", "UI/UX design"],
    details:
      "Product teams that take you from MVP to scale: cross-platform mobile apps, SaaS platforms and internal tools with clean architecture and automated testing.",
    deliverables: ["Product strategy & MVP scope", "Mobile & web apps", "APIs & integrations", "App store launch"],
    tech: ["Flutter", "React Native", "Node.js", "Firebase", "PostgreSQL"],
    demo: null,
  },
  {
    slug: "cloud-devops",
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Scalable cloud architecture with automated delivery pipelines.",
    points: ["AWS · Azure · GCP", "CI/CD automation", "Kubernetes"],
    details:
      "Cloud-native infrastructure that scales automatically with demand and keeps costs in check, with infrastructure-as-code, CI/CD and observability.",
    deliverables: ["Cloud architecture design", "Migration & modernisation", "CI/CD pipelines", "Cost optimisation"],
    tech: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Terraform"],
    demo: "autoscaling",
  },
  {
    slug: "data-analytics",
    icon: BarChart3,
    title: "Data & Analytics",
    description: "Turn raw data into dashboards and decisions your teams trust.",
    points: ["Data pipelines", "BI dashboards", "Real-time insights"],
    details:
      "Modern data stacks that unify your sources, real-time dashboards for every team and anomaly detection that flags problems before your customers notice.",
    deliverables: ["Data warehouse design", "ETL / streaming pipelines", "BI dashboards", "Anomaly alerting"],
    tech: ["BigQuery", "Snowflake", "dbt", "Kafka", "Power BI"],
    demo: "live-analytics",
  },
];

// TODO: these are sample showcase projects. Replace with real case studies before going live.
export const projects = [
  {
    slug: "ai-support-copilot",
    icon: Bot,
    category: "Generative AI",
    title: "AI Support Copilot",
    description: "An LLM-powered helpdesk assistant that drafts replies, summarises tickets and routes them to the right team.",
    tags: ["LLM", "RAG", "React", "Node.js"],
    gradient: "from-emerald-500/40 via-teal-500/20 to-cyan-500/40",
    challenge: "Support agents spent most of their day answering repetitive questions and manually triaging tickets across teams.",
    solution: "A copilot grounded in the help-centre and order systems that detects intent and sentiment, drafts a reply and routes each ticket automatically.",
    features: ["Intent & sentiment detection", "Grounded reply drafting", "Automatic routing & priority", "Agent-in-the-loop approval"],
    demo: "support-copilot",
  },
  {
    slug: "connected-fleet-dashboard",
    icon: Car,
    category: "Automotive IoT",
    title: "Connected Fleet Dashboard",
    description: "Real-time telematics for vehicle fleets: live tracking, fuel analytics and predictive maintenance alerts.",
    tags: ["IoT", "Maps", "WebSockets", "AWS"],
    gradient: "from-lime-400/40 via-emerald-500/20 to-teal-600/40",
    challenge: "Fleet managers had no live view of vehicles and discovered maintenance issues only after breakdowns.",
    solution: "Vehicles stream telemetry to a cloud pipeline that powers a live map, fuel analytics and predictive maintenance alerts.",
    features: ["Live vehicle tracking", "Speed & fuel telemetry", "Predictive maintenance alerts", "Route efficiency insights"],
    demo: "fleet",
  },
  {
    slug: "diagnostic-imaging-assistant",
    icon: ScanLine,
    category: "Healthcare AI",
    title: "Diagnostic Imaging Assistant",
    description: "A computer-vision model that flags anomalies in X-rays so radiologists can prioritise urgent cases.",
    tags: ["Computer Vision", "Python", "FastAPI"],
    gradient: "from-cyan-400/40 via-sky-500/20 to-emerald-500/40",
    challenge: "Growing scan volumes meant urgent cases could wait in the same queue as routine ones.",
    solution: "A vision model pre-reads each scan, highlights regions of interest with confidence scores and re-orders the worklist by urgency.",
    features: ["Region-of-interest detection", "Confidence scoring", "Urgency-based worklist", "Radiologist always decides"],
    demo: "imaging",
  },
  {
    slug: "personalised-commerce-platform",
    icon: ShoppingBag,
    category: "E-commerce",
    title: "Personalised Commerce Platform",
    description: "A headless storefront with an AI recommendation engine that tailors every shopper's experience.",
    tags: ["Next.js", "Recommendations", "Stripe"],
    gradient: "from-emerald-400/40 via-lime-400/20 to-yellow-400/30",
    challenge: "Every shopper saw the same catalogue, regardless of what they had browsed or bought.",
    solution: "A recommendation engine learns from each session in real time and re-ranks products on a fast headless storefront.",
    features: ["Real-time behaviour tracking", "Personalised ranking", "Explainable recommendations", "Headless checkout"],
    demo: "commerce",
  },
  {
    slug: "invoice-automation-suite",
    icon: Receipt,
    category: "Fintech",
    title: "Invoice Automation Suite",
    description: "Document AI that reads invoices, extracts line items and reconciles them against payments automatically.",
    tags: ["Document AI", "OCR", "PostgreSQL"],
    gradient: "from-teal-400/40 via-cyan-500/20 to-indigo-500/30",
    challenge: "Finance teams keyed invoice data by hand and chased mismatches between invoices and payments.",
    solution: "Document AI extracts every field and line item, then reconciles totals against payment records and flags exceptions.",
    features: ["Field & line-item extraction", "Confidence-scored output", "Automatic reconciliation", "Exception flagging"],
    demo: "invoice",
  },
  {
    slug: "adaptive-learning-app",
    icon: GraduationCap,
    category: "EdTech",
    title: "Adaptive Learning App",
    description: "Web and mobile learning platform with an AI tutor that adapts lessons to each student's pace.",
    tags: ["Flutter", "AI Tutor", "Firebase"],
    gradient: "from-green-400/40 via-emerald-500/20 to-cyan-400/40",
    challenge: "One-size-fits-all lessons left some students bored and others behind.",
    solution: "An adaptive engine adjusts difficulty after every answer while an AI tutor gives hints instead of answers.",
    features: ["Difficulty that adapts per answer", "AI tutor hints", "Mastery tracking", "Web & mobile"],
    demo: "learning",
  },
];

export const techDemos = [
  {
    key: "sentiment",
    icon: MessageSquareText,
    title: "Sentiment Analysis",
    category: "Natural Language Processing",
    description: "Type any customer message and watch an NLP model score its tone word by word.",
  },
  {
    key: "neural-net",
    icon: Network,
    title: "Neural Network Visualiser",
    category: "Machine Learning",
    description: "Adjust customer signals and see how a neural network turns them into a churn prediction.",
  },
  {
    key: "autoscaling",
    icon: Server,
    title: "Cloud Auto-Scaling",
    category: "Cloud & DevOps",
    description: "Push traffic up and down and watch the cluster add and remove servers to hold latency steady.",
  },
  {
    key: "live-analytics",
    icon: Activity,
    title: "Real-Time Anomaly Detection",
    category: "Data & Analytics",
    description: "A live metrics stream with statistical anomaly detection flagging unusual spikes as they happen.",
  },
];

export const industries = [
  {
    icon: Car,
    name: "Automotive",
    description: "Connected vehicles, telematics and predictive maintenance.",
    useCases: ["Fleet tracking", "Predictive maintenance", "Dealer & service apps"],
    projectSlug: "connected-fleet-dashboard",
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    description: "Clinical AI, patient apps and secure health data platforms.",
    useCases: ["Imaging AI", "Telehealth apps", "Patient portals"],
    projectSlug: "diagnostic-imaging-assistant",
  },
  {
    icon: Landmark,
    name: "Banking & Fintech",
    description: "Automation, fraud detection and digital banking experiences.",
    useCases: ["Document AI", "Fraud detection", "Digital onboarding"],
    projectSlug: "invoice-automation-suite",
  },
  {
    icon: ShoppingBag,
    name: "Retail & E-commerce",
    description: "Personalised storefronts and demand-aware operations.",
    useCases: ["Recommendations", "Headless commerce", "Demand forecasting"],
    projectSlug: "personalised-commerce-platform",
  },
  {
    icon: GraduationCap,
    name: "Education",
    description: "Adaptive learning platforms and AI tutors.",
    useCases: ["Adaptive learning", "LMS platforms", "AI tutors"],
    projectSlug: "adaptive-learning-app",
  },
  {
    icon: Truck,
    name: "Logistics",
    description: "Route optimisation, tracking and warehouse intelligence.",
    useCases: ["Route optimisation", "Shipment tracking", "Warehouse analytics"],
    projectSlug: "connected-fleet-dashboard",
  },
  {
    icon: Factory,
    name: "Manufacturing",
    description: "Computer vision for quality and IoT for uptime.",
    useCases: ["Defect detection", "IoT monitoring", "Production analytics"],
    projectSlug: null,
  },
  {
    icon: Building2,
    name: "Real Estate",
    description: "Property platforms, virtual tours and lead intelligence.",
    useCases: ["Listing platforms", "Lead scoring", "Virtual tours"],
    projectSlug: null,
  },
];

export const processSteps = [
  {
    icon: Search,
    title: "Discover",
    description: "We dig into your goals, users and data to find where technology creates the most value.",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Architecture, UX and prototypes, validated with you before a line of production code.",
  },
  {
    icon: Code2,
    title: "Build",
    description: "Agile sprints with weekly demos, automated testing and full transparency.",
  },
  {
    icon: Rocket,
    title: "Launch & Scale",
    description: "Cloud deployment, monitoring and continuous improvement as your business grows.",
  },
];

export const techStack = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "TensorFlow",
  "PyTorch",
  "OpenAI",
  "LangChain",
  "AWS",
  "Azure",
  "Google Cloud",
  "Docker",
  "Kubernetes",
  "Flutter",
  "Firebase",
  "PostgreSQL",
  "MongoDB",
];

export const techCategories = [
  { title: "AI & Machine Learning", items: ["PyTorch", "TensorFlow", "scikit-learn", "OpenAI", "Claude", "LangChain", "Hugging Face"] },
  { title: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"] },
  { title: "Backend", items: ["Node.js", "Python", "FastAPI", "Go", "GraphQL"] },
  { title: "Mobile", items: ["Flutter", "React Native", "Swift", "Kotlin"] },
  { title: "Cloud & DevOps", items: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform"] },
  { title: "Data", items: ["PostgreSQL", "MongoDB", "BigQuery", "Kafka", "Snowflake", "Firebase"] },
];

export const values = [
  { icon: Sparkles, title: "Curiosity", text: "We stay on the frontier of AI so our clients don't have to." },
  { icon: Heart, title: "Ownership", text: "We treat every product as if it were our own company on the line." },
  { icon: TrendingUp, title: "Impact", text: "We measure success by the outcomes we create, not the hours we log." },
];

export const perks = [
  { icon: Laptop, title: "Remote-friendly", text: "Work from where you do your best work." },
  { icon: Brain, title: "Learning budget", text: "Courses, certifications and conferences." },
  { icon: Coffee, title: "Flexible hours", text: "Deep work over clock-watching." },
  { icon: Plane, title: "Team retreats", text: "Time together to build, plan and celebrate." },
];

// TODO: replace with real open positions (or remove the list) before going live.
export const openRoles = [
  { title: "AI / ML Engineer", team: "AI Lab", type: "Full-time", location: "Remote / India" },
  { title: "Full Stack Developer (React + Node)", team: "Product Engineering", type: "Full-time", location: "Remote / India" },
  { title: "Flutter Developer", team: "Mobile", type: "Full-time", location: "Remote / India" },
  { title: "UI/UX Designer", team: "Design", type: "Full-time", location: "Remote / India" },
  { title: "DevOps Engineer", team: "Cloud", type: "Contract", location: "Remote" },
];
