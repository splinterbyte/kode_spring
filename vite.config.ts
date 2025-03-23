import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path"; // Import path module

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/kode_spring/",
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
