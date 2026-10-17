import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import App from "./App";

export { routes, getPageMeta, getHeadTags, SITE_URL } from "./seo/meta";

// Renders one route to HTML at build time, waiting for lazy-loaded pages.
export async function render(url) {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
  let html = "";
  for await (const chunk of prelude) html += chunk;
  return html;
}
