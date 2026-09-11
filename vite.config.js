import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  // Base public path for GitHub Pages
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        acoustic: resolve(__dirname, 'projects/acoustic-peace-transfer.html'),
        fireSound: resolve(__dirname, 'projects/fire-sound-synthesis.html'),
        taichi: resolve(__dirname, 'projects/taichi-xylophone.html'),
        pathTracer: resolve(__dirname, 'projects/path-tracer.html'),
        voicesFloating: resolve(__dirname, 'projects/voices-floating-around-my-head.html'),
        memoryGrandmother: resolve(__dirname, 'projects/in-memory-of-my-grandmother.html'),
        beKindToYourself: resolve(__dirname, 'projects/be-kind-to-yourself.html'),
        clothPbd: resolve(__dirname, 'projects/cloth-pbd.html'),
        graphicsHeart: resolve(__dirname, 'projects/graphics-heart.html'),
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
