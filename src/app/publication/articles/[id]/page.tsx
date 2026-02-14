import { getAllArticleSlugs, getArticleBySlug } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const dynamicParams = false;

export function generateStaticParams() {
    const slugs = getAllArticleSlugs();
    return slugs.map((slug) => ({
        id: slug,
    }));
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const article = getArticleBySlug(id);

    if (!article) {
        notFound();
    }

    return (
        <article className="max-w-3xl mx-auto pb-20">
            <div className="flex justify-between items-center mb-8">
                <Link href="/publication/articles">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Articles
                    </Button>
                </Link>
            </div>

            <header className="mb-12 space-y-6 text-center">
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-500">
                    <span className="flex items-center gap-1 bg-neutral-100 px-3 py-1 rounded-full text-neutral-600">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(article.createdAt), 'MMMM d, yyyy')}
                    </span>
                    <span className="flex items-center gap-1 bg-neutral-100 px-3 py-1 rounded-full text-neutral-600">
                        <User className="w-4 h-4" />
                        {article.author}
                    </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-neutral-900">
                    {article.title}
                </h1>

                <div className="flex flex-wrap justify-center gap-2">
                    {article.tags.map(tag => (
                        <span key={tag} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 border border-blue-100">
                            <Tag className="w-3 h-3" />
                            {tag}
                        </span>
                    ))}
                </div>

                {article.coverImage && (
                    <div className="mt-8 rounded-2xl overflow-hidden border border-neutral-100 shadow-xl aspect-video">
                        <img
                            src={article.coverImage}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </header>

            <div
                className="prose prose-neutral prose-lg max-w-none prose-headings:font-bold prose-headings:text-neutral-900 prose-a:text-blue-600 prose-img:rounded-xl prose-pre:bg-neutral-900 prose-pre:text-neutral-100"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <footer className="mt-20 pt-10 border-t border-neutral-100">
                <div className="bg-neutral-50 rounded-2xl p-8 flex flex-col items-center text-center space-y-4 border border-neutral-100 shadow-sm">
                    <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                        BG
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-neutral-900">Written by {article.author}</h3>
                        <p className="text-neutral-500 mt-1 max-w-sm">
                            Exploring the frontiers of Agentic AI, Cloud Architecture, and the future of technology.
                        </p>
                    </div>
                </div>
            </footer>
        </article>
    );
}
