import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  server: {
    port: 3000,
    open: false,
  },
  plugins: [
    {
      name: 'clean-url-rewrites',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url.split('?')[0];
          if (url === '/habit-partner' || url === '/habit-partner/' || url === '/habit-partner/home') {
            req.url = '/habit-partner/home/index.html';
          } else if (url === '/habit-partner/policy' || url === '/habit-partner/privacy' || url === '/habit-partner-privacy') {
            req.url = '/habit-partner/policy/index.html';
          } else if (url === '/habit-partner/terms' || url === '/habit-partner-terms') {
            req.url = '/habit-partner/terms/index.html';
          } else if (url === '/flyer-eats') {
            req.url = '/flyer-eats.html';
          } else if (url === '/privacy') {
            req.url = '/habit-partner/policy/index.html';
          } else if (url === '/terms') {
            req.url = '/habit-partner/terms/index.html';
          }
          next();
        });
      }
    }
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        flyerEats: resolve(__dirname, 'flyer-eats.html'),
        habitPartner: resolve(__dirname, 'habit-partner.html'),
        habitPartnerHome: resolve(__dirname, 'habit-partner/home/index.html'),
        habitPartnerPolicy: resolve(__dirname, 'habit-partner/policy/index.html'),
        habitPartnerTerms: resolve(__dirname, 'habit-partner/terms/index.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
        habitPartnerPrivacyFile: resolve(__dirname, 'habit-partner-privacy.html'),
        habitPartnerTermsFile: resolve(__dirname, 'habit-partner-terms.html'),
      },
    },
  },
});
