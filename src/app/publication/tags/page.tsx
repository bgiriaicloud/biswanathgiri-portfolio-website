import { getAllTags } from '@/lib/markdown';
import Link from 'next/link';
import { Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function TagsPage() {
    const tags = getAllTags();

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-bold mb-4">Browse by Tags</h1>
                <p className="text-neutral-400">Explore articles organized by topic.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tags.map(({ tag, count }) => (
                    <Link key={tag} href={`/publication/tags/${tag.toLowerCase()}`}>
                        <Card className="bg-neutral-900/30 border-neutral-800 hover:border-blue-500 transition-all group cursor-pointer">
                            <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                                <Tag className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                                <h3 className="font-bold text-lg group-hover:text-blue-400 transition-colors">{tag}</h3>
                                <p className="text-sm text-neutral-500">{count} {count === 1 ? 'article' : 'articles'}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
