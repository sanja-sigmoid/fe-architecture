// vite.admin.config.ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  root: "src/apps/org",
  publicDir: "../../../public",
  build: {
    outDir: "../../../dist/org",
    emptyOutDir: true
  }
});
