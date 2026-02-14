import { Storage } from '@google-cloud/storage';
import path from 'path';

if (!process.env.GOOGLE_CLOUD_PROJECT) {
    console.warn('WARNING: GOOGLE_CLOUD_PROJECT environment variable is not set. GCS operations may fail.');
}

const storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
});

const BUCKET_NAME = 'blogscontent';
const bucket = storage.bucket(BUCKET_NAME);

export type ArticleStatus = 'published' | 'draft';

export interface ArticleMetadata {
    id: string;
    title: string;
    excerpt: string;
    coverImage?: string;
    tags: string[];
    status: ArticleStatus;
    createdAt: string;
    updatedAt: string;
    slug: string;
}

export interface Article extends ArticleMetadata {
    content: any; // JSON object from TipTap
}

export async function saveArticle(article: Article) {
    const folder = article.status === 'published' ? 'articles' : 'drafts';
    const fileName = `${folder}/${article.id}.json`;
    const file = bucket.file(fileName);

    await file.save(JSON.stringify(article), {
        contentType: 'application/json',
    });

    // If publishing, we might want to delete the draft if it exists
    if (article.status === 'published') {
        const draftFile = bucket.file(`drafts/${article.id}.json`);
        const [exists] = await draftFile.exists();
        if (exists) {
            await draftFile.delete();
        }
    }

    return article;
}

export async function getArticle(id: string, status: ArticleStatus = 'published'): Promise<Article | null> {
    const folder = status === 'published' ? 'articles' : 'drafts';
    const file = bucket.file(`${folder}/${id}.json`);

    const [exists] = await file.exists();
    if (!exists) {
        // If not found in requested status, check the other one as fallback
        const fallbackFolder = status === 'published' ? 'drafts' : 'articles';
        const fallbackFile = bucket.file(`${fallbackFolder}/${id}.json`);
        const [fallbackExists] = await fallbackFile.exists();
        if (!fallbackExists) return null;

        const [content] = await fallbackFile.download();
        return JSON.parse(content.toString());
    }

    const [content] = await file.download();
    return JSON.parse(content.toString());
}

export async function listArticles(status: ArticleStatus = 'published'): Promise<ArticleMetadata[]> {
    const folder = status === 'published' ? 'articles' : 'drafts';
    const [files] = await bucket.getFiles({ prefix: `${folder}/` });

    const articles = await Promise.all(
        files
            .filter(file => file.name.endsWith('.json'))
            .map(async file => {
                const [content] = await file.download();
                const article: Article = JSON.parse(content.toString());
                const { content: _, ...metadata } = article;
                return metadata;
            })
    );

    return articles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function deleteArticle(id: string, status: ArticleStatus) {
    const folder = status === 'published' ? 'articles' : 'drafts';
    const file = bucket.file(`${folder}/${id}.json`);
    await file.delete().catch(() => { }); // Ignore error if not found
}

export async function uploadArticleMedia(destination: string, content: Buffer, contentType: string) {
    try {
        console.log(`GCS: Starting save to bucket ${BUCKET_NAME}, path: ${destination}`);
        const file = bucket.file(destination);
        await file.save(content, {
            contentType,
            resumable: false,
        });

        const encodedDest = destination.split('/').map(encodeURIComponent).join('/');
        const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${encodedDest}`;
        console.log(`GCS: Save successful. Public URL: ${publicUrl}`);
        return publicUrl;
    } catch (error: any) {
        console.error('GCS: Save failed. Error detail:', {
            message: error.message,
            code: error.code,
            errors: error.errors
        });
        throw new Error(`Cloud Storage Error: ${error.message}`);
    }
}

export async function getReadUrl(destination: string) {
    const file = bucket.file(destination);
    const [url] = await file.getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return url;
}
