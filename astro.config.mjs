import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  server: { port: 4321 },
  vite: {
    define: {
      'process.env.BUILD_TIME': JSON.stringify(new Date().toISOString())
    }
  }
});
