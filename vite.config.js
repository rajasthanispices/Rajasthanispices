import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        products: resolve(__dirname, 'products.html'),
        privateLabel: resolve(__dirname, 'private-label.html'),
        export: resolve(__dirname, 'export.html'),
        quality: resolve(__dirname, 'quality.html'),
        contact: resolve(__dirname, 'contact.html')
      }
    }
  }
});
