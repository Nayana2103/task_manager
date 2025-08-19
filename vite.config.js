import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./", // for relative paths (important for GitHub Pages or file hosting)
  plugins: [react(), tailwindcss()],
});
