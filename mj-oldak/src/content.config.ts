import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const TAGS = [
  'automatyzacja',
  'biuro-rachunkowe',
  'ai-act',
  'case-study',
  'koszty',
  'demo',
  'compliance',
  'n8n-claude',
  'vat-pit',
  'tutorial',
] as const;

export const CATEGORIES = ['edukacja', 'case-study', 'demo'] as const;

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string().min(10).max(120),
    slug: z.string().optional(),
    excerpt: z.string().min(40).max(280),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default('Marcin Ołdak'),
    category: z.enum(CATEGORIES),
    tags: z.array(z.enum(TAGS)).min(1).max(5),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    readingTime: z.number().int().positive().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    metaTitle: z.string().max(70).optional(),
    metaDescription: z.string().min(120).max(160).optional(),
    keywords: z.array(z.string()).max(10).optional(),
    linkedinUrl: z.string().url().optional(),
  }),
});

export const collections = { articles };
