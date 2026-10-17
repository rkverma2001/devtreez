import { faqs, projects, services } from "../data/siteContent";

export const SITE_URL = "https://www.devtreez.com";
export const SITE_NAME = "devtreez";
const OG_IMAGE = `${SITE_URL}/images/og-image.png`;

const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/icon-512.png`,
  description: "AI-first technology company building AI solutions, websites, mobile apps and cloud platforms.",
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const breadcrumbs = (items) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: `${SITE_URL}${path}`,
  })),
});

const pages = {
  "/": {
    title: "devtreez | AI, Web, App & Cloud Development Company",
    description:
      "devtreez builds AI solutions, generative AI agents, websites, mobile apps and cloud platforms that help businesses grow. Explore live demos of our work.",
  },
  "/services": {
    title: "AI, Web, App & Cloud Development Services | devtreez",
    description:
      "AI & machine learning, generative AI agents, website and app development, cloud & DevOps, and data analytics services from one end-to-end team.",
    crumbs: [["Solutions", "/services"]],
    schema: [
      {
        "@type": "ItemList",
        name: "devtreez services",
        itemListElement: services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: s.title,
            description: s.details,
            url: `${SITE_URL}/services#${s.slug}`,
            provider: { "@id": `${SITE_URL}/#organization` },
          },
        })),
      },
    ],
  },
  "/projects": {
    title: "Projects & Live Demos: AI, IoT, Fintech & More | devtreez",
    description:
      "Explore devtreez projects across generative AI, automotive IoT, healthcare AI, e-commerce, fintech and edtech. Every project has an interactive demo.",
    crumbs: [["Projects", "/projects"]],
  },
  "/technologies": {
    title: "Technology Lab: Live AI, ML, Cloud & Data Demos | devtreez",
    description:
      "Try live in-browser demos of sentiment analysis, neural networks, cloud auto-scaling and real-time anomaly detection, plus the tech stack we master.",
    crumbs: [["Technologies", "/technologies"]],
  },
  "/industries": {
    title: "AI & Software Solutions by Industry | devtreez",
    description:
      "AI and software built for automotive, healthcare, banking & fintech, retail, education, logistics, manufacturing and real estate.",
    crumbs: [["Industries", "/industries"]],
  },
  "/about": {
    title: "About devtreez: AI-First Technology Company",
    description:
      "Meet devtreez, an AI-first technology company. Our mission, vision, values and the proven process we use to turn ideas into products that scale.",
    crumbs: [["About", "/about"]],
  },
  "/careers": {
    title: "Careers at devtreez: AI, Engineering & Design Jobs",
    description:
      "Join devtreez and build AI products used around the world. Remote-friendly roles in AI/ML, full stack, mobile, design and DevOps.",
    crumbs: [["Careers", "/careers"]],
  },
  "/contact": {
    title: "Contact devtreez: Start Your AI or Software Project",
    description:
      "Tell us about your idea. Get a reply within one business day, a free discovery call and a clear proposal for your AI, web, app or cloud project.",
    crumbs: [["Contact", "/contact"]],
    schema: [
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  },
  "/book-meeting": {
    title: "Book a Free Discovery Call | devtreez",
    description:
      "Pick a time for a free 30-minute discovery call with devtreez to talk through your AI, web, app or cloud project.",
    crumbs: [["Book a Meeting", "/book-meeting"]],
  },
  "/privacy": { title: "Privacy Policy | devtreez", description: "How devtreez collects, uses and protects your personal information." },
  "/terms": { title: "Terms of Service | devtreez", description: "The terms that apply when you use the devtreez website." },
  "/cookies": { title: "Cookie Policy | devtreez", description: "How the devtreez website uses cookies and how you can manage them." },
};

for (const p of projects) {
  pages[`/projects/${p.slug}`] = {
    title: `${p.title}: ${p.category} Project & Live Demo | devtreez`,
    description: `${p.description} Try the interactive demo.`,
    crumbs: [
      ["Projects", "/projects"],
      [p.title, `/projects/${p.slug}`],
    ],
  };
}

const notFound = {
  title: "Page Not Found | devtreez",
  description: "The page you're looking for doesn't exist.",
  noindex: true,
};

/** Every indexable route, used for pre-rendering and the sitemap. */
export const routes = Object.keys(pages);

export function getPageMeta(pathname) {
  const path = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";
  const page = pages[path];
  if (!page) return { ...notFound, path, url: `${SITE_URL}${path}`, jsonLd: null };

  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const graph = [organization, website, ...(page.schema ?? [])];
  if (page.crumbs) graph.push(breadcrumbs([["Home", "/"], ...page.crumbs]));

  return {
    ...page,
    path,
    url,
    jsonLd: { "@context": "https://schema.org", "@graph": graph },
  };
}

/** Head tags for a page, as plain objects so both the browser and the pre-renderer can use them. */
export function getHeadTags(meta) {
  return [
    { tag: "meta", key: "name", attrs: { name: "description", content: meta.description } },
    { tag: "meta", key: "name", attrs: { name: "robots", content: meta.noindex ? "noindex, follow" : "index, follow, max-image-preview:large" } },
    ...(meta.noindex ? [] : [{ tag: "link", key: "rel", attrs: { rel: "canonical", href: meta.url } }]),
    { tag: "meta", key: "property", attrs: { property: "og:type", content: "website" } },
    { tag: "meta", key: "property", attrs: { property: "og:site_name", content: SITE_NAME } },
    { tag: "meta", key: "property", attrs: { property: "og:title", content: meta.title } },
    { tag: "meta", key: "property", attrs: { property: "og:description", content: meta.description } },
    { tag: "meta", key: "property", attrs: { property: "og:url", content: meta.url } },
    { tag: "meta", key: "property", attrs: { property: "og:image", content: OG_IMAGE } },
    { tag: "meta", key: "property", attrs: { property: "og:image:width", content: "1200" } },
    { tag: "meta", key: "property", attrs: { property: "og:image:height", content: "630" } },
    { tag: "meta", key: "property", attrs: { property: "og:image:alt", content: "devtreez: AI, Apps & Cloud Solutions That Scale" } },
    { tag: "meta", key: "name", attrs: { name: "twitter:card", content: "summary_large_image" } },
    { tag: "meta", key: "name", attrs: { name: "twitter:title", content: meta.title } },
    { tag: "meta", key: "name", attrs: { name: "twitter:description", content: meta.description } },
    { tag: "meta", key: "name", attrs: { name: "twitter:image", content: OG_IMAGE } },
  ];
}
