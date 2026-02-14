import { NextRequest, NextResponse } from 'next/server';
import { listArticles, saveArticle, Article, ArticleStatus } from '@/lib/gcs';
import { nanoid } from 'nanoid';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const status = (searchParams.get('status') as ArticleStatus) || 'published';

    try {
        const articles = await listArticles(status);
        return NextResponse.json(articles);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, content, excerpt, coverImage, tags, status, slug } = body;

        const article: Article = {
            id: body.id || nanoid(),
            title,
            content,
            excerpt,
            coverImage,
            tags: tags || [],
            status: status || 'draft',
            slug: slug || title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            createdAt: body.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const saved = await saveArticle(article);
        return NextResponse.json(saved);
    } catch (error: any) {
        console.error('BLOGS_POST_ERROR:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
