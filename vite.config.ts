import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    inspectAttr(),
    react(),
    // Compress blog and site images at build time (originals in the repo stay untouched)
    ViteImageOptimizer({
      test: /\.(jpe?g|png|webp|avif|gif|tiff)$/i,
      png: { quality: 80 },
      jpeg: { quality: 78, mozjpeg: true },
      jpg: { quality: 78, mozjpeg: true },
      webp: { quality: 80 },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
