import { readdir, readFile, rename } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const blogDir = join(__dirname, '..', 'src', 'content', 'blog');

// Function to extract title from frontmatter
function getTitleFromContent(content) {
    const titleMatch = content.match(/title:\s*['"](.+?)['"]/);
    return titleMatch ? titleMatch[1] : null;
}

// Function to convert title to filename
function titleToFilename(title) {
    return title.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        + '.mdx';
}

try {
    const files = await readdir(blogDir);

    for (const file of files) {
        if (file.endsWith('.mdx') || file.endsWith('.md')) {
            const filePath = join(blogDir, file);
            
            try {
                const content = await readFile(filePath, 'utf8');
                const title = getTitleFromContent(content);

                if (!title) {
                    console.warn(`No title found in ${file}`);
                    continue;
                }

                const newFileName = titleToFilename(title);
                const newPath = join(blogDir, newFileName);

                if (filePath !== newPath) {
                    await rename(filePath, newPath);
                    console.log(`Renamed: ${file} → ${newFileName}`);
                }
            } catch (err) {
                console.error(`Error processing ${file}:`, err);
            }
        }
    }
} catch (err) {
    console.error('Error reading directory:', err);
}
