'use client';

import { useEffect, useState } from 'react';
import { ArticleMetadata } from '@/lib/gcs';
import { Loader2, Tag as TagIcon, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function TagsPage() {
    const [tags, setTags] = useState<{ name: string; count: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/blogs?status=published')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const tagMap: Record<string, number> = {};
                    data.forEach(article => {
                        article.tags.forEach((tag: string) => {
                            tagMap[tag] = (tagMap[tag] || 0) + 1;
                        });
                    });
                    const tagList = Object.entries(tagMap).map(([name, count]) => ({ name, count }));
                    setTags(tagList.sort((a, b) => b.count - a.count));
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

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
                <h1 className="text-4xl font-bold mb-4">Explore by Tags</h1>
                <p className="text-neutral-500">Discover articles by technology and topic.</p>
            </div>

            <div className="flex flex-wrap gap-4">
                {tags.length === 0 ? (
                    <p className="text-neutral-500 italic">No tags found yet.</p>
                ) : (
                    tags.map(tag => (
                        <Link key={tag.name} href={`/publication/articles?tag=${tag.name}`}>
                            <div className="bg-white border border-neutral-100 px-6 py-4 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group cursor-pointer flex items-center justify-between min-w-[180px]">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-50 text-blue-600 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <TagIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-neutral-900">{tag.name}</h3>
                                        <p className="text-xs text-neutral-500 font-medium">{tag.count} articles</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-blue-500 transition-colors" />
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
