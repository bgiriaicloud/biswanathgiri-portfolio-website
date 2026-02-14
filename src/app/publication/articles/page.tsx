'use client';

import { useEffect, useState } from 'react';
import { ArticleMetadata } from '@/lib/gcs';
import Link from 'next/link';
import { format } from 'date-fns';
import { Loader2, Tag, Calendar, ChevronRight, Trash2, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ArticlesPage() {
    const [articles, setArticles] = useState<ArticleMetadata[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchArticles = () => {
        fetch('/api/blogs?status=published')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setArticles(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this article?')) return;

        try {
            const res = await fetch(`/api/blogs/${id}?status=published`, { method: 'DELETE' });
            if (res.ok) {
                setArticles(articles.filter(a => a.id !== id));
            }
        } catch (err) {
            alert('Failed to delete article');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-bold mb-4">Latest Articles</h1>
                <p className="text-neutral-400">Insights on AI, Cloud, and Agentic Systems.</p>
            </div>

            <div className="grid gap-8">
                {articles.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-neutral-800 rounded-xl">
                        <p className="text-neutral-500">No articles published yet.</p>
                        <Link href="/publication/editor" className="text-blue-500 hover:underline mt-2 inline-block">
                            Start writing your first piece
                        </Link>
                    </div>
                ) : (
                    articles.map(article => (
                        <Card key={article.id} className="bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 transition-all group overflow-hidden">
                            <CardContent className="p-0 flex flex-col md:flex-row relative">
                                {article.coverImage && (
                                    <div className="md:w-64 h-48 bg-neutral-800 overflow-hidden">
                                        <img
                                            src={article.coverImage}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}
                                <div className="p-6 flex-grow flex flex-col justify-between">
                                    <Link href={`/publication/articles/${article.id}`} className="block group/link">
                                        <div>
                                            <div className="flex items-center gap-4 text-xs text-neutral-500 mb-3">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {format(new Date(article.createdAt), 'MMM d, yyyy')}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    {article.tags.map(tag => (
                                                        <span key={tag} className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                            <Tag className="w-2 h-2" />
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <h2 className="text-2xl font-bold mb-2 group-hover/link:text-blue-400 transition-colors">
                                                {article.title}
                                            </h2>
                                            <p className="text-neutral-400 line-clamp-2 text-sm leading-relaxed">
                                                {article.excerpt}
                                            </p>
                                        </div>
                                        <div className="mt-4 flex items-center text-sm font-semibold text-blue-500">
                                            Read more <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>

                                    {/* Actions */}
                                    <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/publication/editor/${article.id}`}>
                                            <Button variant="outline" size="icon" className="bg-neutral-900 border-neutral-700 w-8 h-8 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white">
                                                <Edit3 className="w-3.5 h-3.5" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={(e) => handleDelete(article.id, e)}
                                            className="bg-neutral-900 border-neutral-700 w-8 h-8 rounded-full hover:bg-red-950/30 hover:border-red-500/50 text-neutral-400 hover:text-red-500"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
