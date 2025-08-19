import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/task_manager/",   // 👈 important for GitHub Pages
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        entryFileNames: `bundle.js`,
        assetFileNames: `bundle.[ext]`,
      },
    },
  },
});
