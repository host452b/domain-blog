import { defineConfig } from 'astro/config';

export default defineConfig({
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
