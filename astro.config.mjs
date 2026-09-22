import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

const SITE = 'https://ggasg.github.io';

// Anything pointing off the site opens in a new tab, so a reader following a
// reference mid-article does not lose their place. Internal links and the
// in-page anchors are left alone. Applies to posts; the handful of outbound
// links written directly in .astro pages carry the same two attributes.
//
// Links to my own GitHub repos also get a GoatCounter click event, named
// after the repo path, so the dashboard shows how many readers go on to
// the companion code. GithubFile.astro does the same for its header link.
const GITHUB_PREFIX = 'https://github.com/ggasg/';

function externalLinksInNewTab() {
  const isExternal = (href) =>
    typeof href === 'string' && /^https?:\/\//i.test(href) && !href.startsWith(SITE);

  const walk = (node) => {
    if (node.tagName === 'a' && isExternal(node.properties?.href)) {
      const href = node.properties.href;
      node.properties.target = '_blank';
      node.properties.rel = ['noopener', 'noreferrer'];
      if (href.startsWith(GITHUB_PREFIX)) {
        node.properties.dataGoatcounterClick = 'github/' + href.slice(GITHUB_PREFIX.length);
      }
    }
    for (const child of node.children ?? []) walk(child);
  };

  return (tree) => walk(tree);
}

// User page repo (ggasg.github.io) serves from the domain root.
// Update `site` if/when a custom domain is attached (see CNAME file).
export default defineConfig({
  site: 'https://ggasg.github.io',
  integrations: [sitemap(), mdx()],
  markdown: {
    rehypePlugins: [externalLinksInNewTab],
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
