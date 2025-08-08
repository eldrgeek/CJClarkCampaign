import { z, defineCollection } from 'astro:content';

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    heroTitle: z.string().optional(),
    heroSubtitle: z.string().optional(),
    primaryCta: z.string().optional(),
    secondaryCta: z.string().optional(),
    heroImage: z.string().optional(),
    ctaLabel: z.string().optional(), // for ES landing
    title: z.string().optional()
  })
});

const issues = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    priority: z.number().optional(),
    summary: z.string().optional()
  })
});

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().optional()
  })
});

export const collections = { pages, issues, news };
