import { NextRequest, NextResponse } from 'next/server';
import { getArticle, deleteArticle, ArticleStatus } from '@/lib/gcs';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const status = (searchParams.get('status') as ArticleStatus) || 'published';

    try {
        const article = await getArticle(id, status);
        if (!article) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }
        return NextResponse.json(article);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const status = (searchParams.get('status') as ArticleStatus) || 'published';

    try {
        await deleteArticle(id, status);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
