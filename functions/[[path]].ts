// Cloudflare Pages Function entry for TanStack Start SSR
import serverHandler from "../dist/server/server.js";

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);

  // Allow Cloudflare Pages to serve static files from dist/client
  if (
    url.pathname.startsWith("/assets/") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".ico") ||
    url.pathname.endsWith(".txt")
  ) {
    return await context.next();
  }

  return await serverHandler.fetch(context.request, context.env, context);
};

