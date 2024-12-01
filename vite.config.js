import { defineConfig } from 'vite'

export default defineConfig({
  base: '/secret-santa-app/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: true,
  }
})