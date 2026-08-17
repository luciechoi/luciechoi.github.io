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
        portfolio: resolve(__dirname, 'projects/interactive-portfolio.html'),
        generative: resolve(__dirname, 'projects/generative-systems.html'),
        visualizer: resolve(__dirname, 'projects/data-visualizer.html'),
        fluidSim: resolve(__dirname, 'projects/fluid-simulation.html'),
        pathTracer: resolve(__dirname, 'projects/path-tracer.html'),
        terrain: resolve(__dirname, 'projects/procedural-terrain.html'),
        clouds: resolve(__dirname, 'projects/volumetric-clouds.html'),
        characterRig: resolve(__dirname, 'projects/character-rigging.html'),
        artAndTech: resolve(__dirname, 'writing/art-and-technology.html'),
        spatialInterfaces: resolve(__dirname, 'writing/spatial-interfaces.html'),
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
