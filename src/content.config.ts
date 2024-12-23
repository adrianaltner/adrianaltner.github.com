import { glob } from 'astro/loaders';
import { defineCollection, reference, z } from 'astro:content';

const baseSchema = z.object({
	title: z.string().max(60),
});

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/[^_]*.{md,mdx}' }),
	schema: ({ image }) => baseSchema.extend({
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
		tags: z.array(z.string()).default(["notags"]),
		category: reference('categories'),
		related: z.array(reference('blog')).optional(),
	}),
});

const categories = defineCollection({
	loader: glob({ base: './src/content/categories', pattern: '**/[^_]*.{md,mdx}' }),
	schema: ({ image }) => baseSchema.extend({
		description: z.string(),
		image: image().optional(),
	}),
});

const tags = defineCollection({
	loader: glob({ base: './src/content/tags', pattern: '**/[^_]*.{md,mdx}' }),
	schema: ({ image }) => baseSchema.extend({
		description: z.string(),
		image: image().optional(),
	}),
});

export const collections = { blog, categories, tags };
