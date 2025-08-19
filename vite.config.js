import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",   // 👈 important: relative paths for Live Server
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
