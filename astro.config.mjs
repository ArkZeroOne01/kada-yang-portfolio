// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

const isDevelopment =
  /** @type {any} */ (globalThis).process?.argv?.includes("dev") ?? false;

// https://astro.build/config
export default defineConfig({
  site: "https://kadayang.com",
  output: "static",
  integrations: [
    react(),
    markdoc(),
    ...(isDevelopment ? [keystatic()] : []),
  ],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["@keystatic/core", "@keystatic/astro"],
    },
  },
});
