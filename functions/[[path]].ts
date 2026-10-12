// Cloudflare Pages Function entry for TanStack Start SSR
// Routes all non-static requests through the generated server.js
import serverHandler from "../dist/server/server.js";

export const onRequest: PagesFunction = async (context) => {
  return await serverHandler.fetch(context.request, context.env, context);
};
