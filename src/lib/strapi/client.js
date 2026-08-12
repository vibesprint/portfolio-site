import { strapi } from "@strapi/client";

export const client = strapi({
  baseURL: import.meta.env.VITE_STRAPI_BASE_URL,
  auth: import.meta.env.VITE_STRAPI_API_TOKEN,
});
