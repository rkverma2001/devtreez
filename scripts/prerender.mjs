// Writes a static HTML file per route (with its own <head> tags) plus sitemap.xml
// and robots.txt, so crawlers and link previews see real content.
// Runs after `vite build` and `vite build --ssr` (see the "build" script).
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");

const { render, routes, getPageMeta, getHeadTags, SITE_URL } = await import(
  pathToFileURL(join(ssrDir, "entry-server.js")).href
);

const template = await readFile(join(dist, "index.html"), "utf8");

const escape = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function headFor(meta) {
  const tags = getHeadTags(meta).map(({ tag, attrs }) => {
    const a = Object.entries(attrs).map(([k, v]) => `${k}="${escape(v)}"`).join(" ");
    return `<${tag} ${a} />`;
  });
  const ld = meta.jsonLd
    ? `<script type="application/ld+json" id="ld-json">${JSON.stringify(meta.jsonLd).replace(/</g, "\\u003c")}</script>`
    : "";
  return [`<title>${escape(meta.title)}</title>`, ...tags, ld].join("\n    ");
}

function page(meta, appHtml) {
  const html = template
    .replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/, headFor(meta))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  if (html === template) throw new Error("Template markers not found in dist/index.html");
  return html;
}

// "/" -> index.html, "/services" -> services.html, "/projects/x" -> projects/x.html (served via cleanUrls)
const fileFor = (route) => join(dist, route === "/" ? "index.html" : `${route.slice(1)}.html`);

for (const route of routes) {
  const file = fileFor(route);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page(getPageMeta(route), await render(route)));
  console.log(`  prerendered ${route}`);
}

// Real 404 page (Firebase serves dist/404.html with a 404 status).
await writeFile(join(dist, "404.html"), page(getPageMeta("/404"), await render("/404")));
console.log("  prerendered 404.html");

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((r) => {
    const priority = r === "/" ? "1.0" : r.split("/").length > 2 ? "0.7" : "0.8";
    return `  <url><loc>${SITE_URL}${r}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`;
  })
  .join("\n")}
</urlset>
`;
await writeFile(join(dist, "sitemap.xml"), sitemap);
await writeFile(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`  wrote sitemap.xml (${routes.length} URLs) and robots.txt`);

await rm(ssrDir, { recursive: true, force: true });
