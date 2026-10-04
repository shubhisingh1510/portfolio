import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // relative asset paths, so the built site works from any folder or sub-path
  base: "./",
  plugins: [react(), tailwindcss()],
});
