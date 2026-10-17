import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getHeadTags, getPageMeta } from "./meta";

// Keeps <head> in sync on client-side navigation. The pre-rendered HTML already
// contains the same tags for the first load (see scripts/prerender.mjs).
export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getPageMeta(pathname);
    document.title = meta.title;

    for (const { tag, key, attrs } of getHeadTags(meta)) {
      let el = document.head.querySelector(`${tag}[${key}="${attrs[key]}"]`);
      if (!el) {
        el = document.createElement(tag);
        document.head.appendChild(el);
      }
      for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, value);
    }
    if (meta.noindex) document.head.querySelector('link[rel="canonical"]')?.remove();

    let ld = document.getElementById("ld-json");
    if (meta.jsonLd) {
      if (!ld) {
        ld = document.createElement("script");
        ld.type = "application/ld+json";
        ld.id = "ld-json";
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify(meta.jsonLd);
    } else {
      ld?.remove();
    }
  }, [pathname]);

  return null;
}
