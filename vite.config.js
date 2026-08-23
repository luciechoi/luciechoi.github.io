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
        visualizer: resolve(__dirname, 'projects/data-visualizer.html'),
        pathTracer: resolve(__dirname, 'projects/path-tracer.html'),
        terrain: resolve(__dirname, 'projects/procedural-terrain.html'),
        clouds: resolve(__dirname, 'projects/volumetric-clouds.html'),
        voicesFloating: resolve(__dirname, 'projects/voices-floating-around-my-head.html'),
        memoryGrandmother: resolve(__dirname, 'projects/in-memory-of-my-grandmother.html'),
        beKindToYourself: resolve(__dirname, 'projects/be-kind-to-yourself.html'),
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
