import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
      // Optional companion repo for the article's code + tests.
      repo: z.string().url().optional(),
      // Path under public/ to the card social networks show when the post
      // is shared, 1200x627. Without one the post shares as a bare text
      // card, so it is worth setting on anything meant to circulate.
      ogImage: z.string().startsWith('/').optional(),
      heroImage: image().optional(),
    }),
});

export const collections = { blog };
