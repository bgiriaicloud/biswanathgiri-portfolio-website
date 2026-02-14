import { getAllArticles } from '@/lib/markdown';
import Link from 'next/link';
import { format } from 'date-fns';
import { Tag, Calendar, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ArticlesPage() {
    const articles = getAllArticles();

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
                                    <Link href={`/publication/articles/${article.slug}`} className="block group/link">
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
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
