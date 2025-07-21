import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path";
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css:{
    postcss:{
      plugins:[autoprefixer()]
    }
  },
    build: {
    outDir: path.resolve(__dirname, '../backend/src/frontend'), // ⬅️ adjust as needed
    emptyOutDir: true,
  },
})
