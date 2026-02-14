import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export interface ArticleMetadata {
    id: string;
    title: string;
    excerpt: string;
    coverImage?: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    slug: string;
    author: string;
}

export interface Article extends ArticleMetadata {
    content: string;
}

export function getAllArticleSlugs(): string[] {
    if (!fs.existsSync(articlesDirectory)) {
        return [];
    }
    const fileNames = fs.readdirSync(articlesDirectory);
    return fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => fileName.replace(/\.md$/, ''));
}

export function getArticleBySlug(slug: string): Article | null {
    try {
        const fullPath = path.join(articlesDirectory, `${slug}.md`);
        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Process markdown to HTML
        const processedContent = remark()
            .use(gfm)
            .use(html, { sanitize: false })
            .processSync(content);

        const contentHtml = processedContent.toString();

        return {
            id: slug,
            slug,
            title: data.title || 'Untitled',
            excerpt: data.excerpt || '',
            coverImage: data.coverImage,
            tags: data.tags || [],
            createdAt: data.createdAt || new Date().toISOString(),
            updatedAt: data.updatedAt || new Date().toISOString(),
            author: data.author || 'Biswanath Giri',
            content: contentHtml,
        };
    } catch (error) {
        console.error(`Error reading article ${slug}:`, error);
        return null;
    }
}

export function getAllArticles(): ArticleMetadata[] {
    const slugs = getAllArticleSlugs();
    const articles = slugs
        .map(slug => {
            const article = getArticleBySlug(slug);
            if (!article) return null;
            const { content, ...metadata } = article;
            return metadata;
        })
        .filter((article): article is ArticleMetadata => article !== null)
        .sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

    return articles;
}

export function getArticlesByTag(tag: string): ArticleMetadata[] {
    const allArticles = getAllArticles();
    return allArticles.filter(article =>
        article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
}

export function getAllTags(): { tag: string; count: number }[] {
    const allArticles = getAllArticles();
    const tagMap = new Map<string, number>();

    allArticles.forEach(article => {
        article.tags.forEach(tag => {
            tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
        });
    });

    return Array.from(tagMap.entries())
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count);
}
