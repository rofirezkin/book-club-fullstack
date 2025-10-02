import { defineConfig } from "vite";
import path from "node:path";

// ESM-compatible __dirname replacement
const __dirname = path.dirname(new URL(import.meta.url).pathname);
import react from "@vitejs/plugin-react";

// Vite configuration for the React frontend.  The React plugin enables
// automatic JSX transformation and Fast Refresh during development.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
  preview: {
    port: 4173,
  },
});
