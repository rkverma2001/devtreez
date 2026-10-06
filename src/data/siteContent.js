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
} from "lucide-react";

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Solutions", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Industries", href: "#industries" },
  { label: "Contact", href: "#contact" },
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
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Predictive models and intelligent automation trained on your data.",
    points: ["Custom ML models", "Computer vision", "Forecasting & analytics"],
  },
  {
    icon: Sparkles,
    title: "Generative AI & Agents",
    description: "LLM copilots, chatbots and AI agents that work alongside your team.",
    points: ["RAG knowledge assistants", "Workflow agents", "LLM integration"],
  },
  {
    icon: Globe,
    title: "Website Development",
    description: "Your brand, beautifully built online: fast, secure and SEO-ready.",
    points: ["Corporate & e-commerce", "Headless CMS", "Performance tuning"],
  },
  {
    icon: Smartphone,
    title: "Application Development",
    description: "Apps that bring your vision to every screen, iOS, Android and web.",
    points: ["Native & cross-platform", "SaaS products", "UI/UX design"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Scalable cloud architecture with automated delivery pipelines.",
    points: ["AWS · Azure · GCP", "CI/CD automation", "Kubernetes"],
  },
  {
    icon: BarChart3,
    title: "Data & Analytics",
    description: "Turn raw data into dashboards and decisions your teams trust.",
    points: ["Data pipelines", "BI dashboards", "Real-time insights"],
  },
];

// TODO: these are sample showcase projects. Replace with real case studies before going live.
export const projects = [
  {
    icon: Bot,
    category: "Generative AI",
    title: "AI Support Copilot",
    description: "An LLM-powered helpdesk assistant that drafts replies, summarises tickets and routes them to the right team.",
    tags: ["LLM", "RAG", "React", "Node.js"],
    gradient: "from-emerald-500/40 via-teal-500/20 to-cyan-500/40",
  },
  {
    icon: Car,
    category: "Automotive IoT",
    title: "Connected Fleet Dashboard",
    description: "Real-time telematics for vehicle fleets: live tracking, fuel analytics and predictive maintenance alerts.",
    tags: ["IoT", "Maps", "WebSockets", "AWS"],
    gradient: "from-lime-400/40 via-emerald-500/20 to-teal-600/40",
  },
  {
    icon: ScanLine,
    category: "Healthcare AI",
    title: "Diagnostic Imaging Assistant",
    description: "A computer-vision model that flags anomalies in X-rays so radiologists can prioritise urgent cases.",
    tags: ["Computer Vision", "Python", "FastAPI"],
    gradient: "from-cyan-400/40 via-sky-500/20 to-emerald-500/40",
  },
  {
    icon: ShoppingBag,
    category: "E-commerce",
    title: "Personalised Commerce Platform",
    description: "A headless storefront with an AI recommendation engine that tailors every shopper's experience.",
    tags: ["Next.js", "Recommendations", "Stripe"],
    gradient: "from-emerald-400/40 via-lime-400/20 to-yellow-400/30",
  },
  {
    icon: Receipt,
    category: "Fintech",
    title: "Invoice Automation Suite",
    description: "Document AI that reads invoices, extracts line items and reconciles them against payments automatically.",
    tags: ["Document AI", "OCR", "PostgreSQL"],
    gradient: "from-teal-400/40 via-cyan-500/20 to-indigo-500/30",
  },
  {
    icon: GraduationCap,
    category: "EdTech",
    title: "Adaptive Learning App",
    description: "Web and mobile learning platform with an AI tutor that adapts lessons to each student's pace.",
    tags: ["Flutter", "AI Tutor", "Firebase"],
    gradient: "from-green-400/40 via-emerald-500/20 to-cyan-400/40",
  },
];

export const industries = [
  { icon: Car, name: "Automotive" },
  { icon: HeartPulse, name: "Healthcare" },
  { icon: Landmark, name: "Banking & Fintech" },
  { icon: ShoppingBag, name: "Retail & E-commerce" },
  { icon: GraduationCap, name: "Education" },
  { icon: Truck, name: "Logistics" },
  { icon: Factory, name: "Manufacturing" },
  { icon: Building2, name: "Real Estate" },
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
