import { getAllArticles } from '@/lib/markdown';
import Link from 'next/link';
import { format } from 'date-fns';
import { TrendingUp, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FeaturedVideo from '@/components/FeaturedVideo';

export default function PublicationLanding() {
    const articles = getAllArticles();
    const featured = articles[0];
    const recent = articles.slice(1, 4);

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="grid md:grid-cols-2 gap-12 items-center py-8">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-sm font-semibold">
                        <Sparkles className="w-4 h-4" />
                        Welcome to the Publication
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none">
                        Exploring the <span className="text-blue-500">Agentic</span> Era.
                    </h1>
                    <p className="text-xl text-neutral-400 leading-relaxed max-w-lg">
                        A space dedicated to Agentic AI, Cloud Native architectures, and the future of full-stack development.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/publication/articles">
                            <Button size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8">
                                Explore Articles
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="relative aspect-square bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl border border-neutral-800 flex items-center justify-center overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                    <TrendingUp className="w-32 h-32 text-blue-500/40 group-hover:scale-110 transition-transform duration-700" />
                </div>
            </section>

            {/* Featured Video Section */}
            <FeaturedVideo />

            {/* Featured Section */}
            {featured && (
                <section className="space-y-8">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-500">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        Featured Story
                    </div>
                    <Link href={`/publication/articles/${featured.slug}`}>
                        <div className="group relative grid md:grid-cols-5 gap-8 bg-neutral-900/40 border border-neutral-800 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-colors">
                            <div className="md:col-span-3 p-8 md:p-12 space-y-6 flex flex-col justify-center">
                                <div className="flex items-center gap-4 text-sm text-neutral-500">
                                    <span>{featured.author}</span>
                                    <span>•</span>
                                    <span>{format(new Date(featured.createdAt), 'MMM d, yyyy')}</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold group-hover:text-blue-400 transition-colors">
                                    {featured.title}
                                </h2>
                                <p className="text-lg text-neutral-400 leading-relaxed">
                                    {featured.excerpt}
                                </p>
                                <div className="flex gap-2">
                                    {featured.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="text-sm text-blue-400">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="md:col-span-2 relative h-64 md:h-auto bg-neutral-800">
                                {featured.coverImage ? (
                                    <img src={featured.coverImage} className="w-full h-full object-cover" alt="" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-neutral-700">
                                        <Sparkles className="w-12 h-12" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            {/* Recent Grid */}
            {recent.length > 0 && (
                <section className="space-y-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-500">
                            <div className="w-2 h-2 bg-neutral-700 rounded-full" />
                            Latest Updates
                        </div>
                        <Link href="/publication/articles" className="text-blue-500 hover:text-blue-400 flex items-center gap-1 text-sm font-bold">
                            View all <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {recent.map(article => (
                            <Link key={article.id} href={`/publication/articles/${article.slug}`}>
                                <Card className="h-full bg-transparent border-neutral-800 hover:border-neutral-700 transition-all group">
                                    <CardContent className="p-0 flex flex-col h-full">
                                        <div className="p-6 space-y-4 flex-grow">
                                            <div className="text-xs text-neutral-500 flex items-center gap-2">
                                                <Clock className="w-3 h-3" />
                                                {format(new Date(article.createdAt), 'MMM d')}
                                            </div>
                                            <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors line-clamp-2">
                                                {article.title}
                                            </h3>
                                            <p className="text-neutral-400 text-sm line-clamp-3">
                                                {article.excerpt}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
