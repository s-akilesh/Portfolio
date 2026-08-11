import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        flyerEats: resolve(__dirname, 'flyer-eats.html'),
        habitPartner: resolve(__dirname, 'habit-partner.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
        habitPartnerPrivacy: resolve(__dirname, 'habit-partner-privacy.html'),
        habitPartnerTerms: resolve(__dirname, 'habit-partner-terms.html'),
      },
    },
  },
});
