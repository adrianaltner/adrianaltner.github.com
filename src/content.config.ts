import { glob } from 'astro/loaders';
import { defineCollection, reference, z } from 'astro:content';


const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
		// TODO: Add support for images and layout
		// image: z.string().optional(),
		// layout: z.string().optional(),
		tags: z.array(z.string()).default(["notags"]),
		category: reference('categories'),
		related: z.array(reference('blog')).optional(),
	}),
});

const categories = defineCollection({
	loader: glob({ base: './src/content/categories', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// TODO: Add support for images and layout
		// image: z.string().optional(),
		// layout: z.string().optional(),
	}),
});

const tags = defineCollection({
	loader: glob({ base: './src/content/tags', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// TODO: Add support for images and layout
		// image: z.string().optional(),
		// layout: z.string().optional(),
	}),
});

export const collections = { blog, categories, tags };
