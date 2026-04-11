import { defineConfig } from 'astro/config';

export default defineConfig({
  // TODO: Replace with your actual Cloudflare Pages domain before deploy
  site: 'https://example.pages.dev',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-dimmed',
      },
    },
  },
});
