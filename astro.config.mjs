import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// User page repo (ggasg.github.io) serves from the domain root.
// Update `site` if/when a custom domain is attached (see CNAME file).
export default defineConfig({
  site: 'https://ggasg.github.io',
  integrations: [sitemap(), mdx()],
  markdown: {
    shikiConfig: {
      // Code blocks follow the system theme too, same as the rest of the page.
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
});
