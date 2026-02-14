'use client';

import { useEffect, useState } from 'react';
import { ArticleMetadata } from '@/lib/gcs';
import Link from 'next/link';
import { format } from 'date-fns';
import { Loader2, Tag, Calendar, Edit3, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function DraftsPage() {
    const [drafts, setDrafts] = useState<ArticleMetadata[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDrafts = () => {
        fetch('/api/blogs?status=draft')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setDrafts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchDrafts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this draft?')) return;

        try {
            const res = await fetch(`/api/blogs/${id}?status=draft`, { method: 'DELETE' });
            if (res.ok) {
                setDrafts(drafts.filter(d => d.id !== id));
            }
        } catch (err) {
            alert('Failed to delete draft');
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
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold mb-4">Your Drafts</h1>
                    <p className="text-neutral-400">Unfinished thoughts and works in progress.</p>
                </div>
                <Link href="/publication/editor">
                    <Button className="bg-white text-black hover:bg-neutral-200">
                        <Edit3 className="w-4 h-4 mr-2" />
                        New Draft
                    </Button>
                </Link>
            </div>

            <div className="grid gap-6">
                {drafts.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-neutral-800 rounded-xl">
                        <p className="text-neutral-500">No drafts found.</p>
                    </div>
                ) : (
                    drafts.map(draft => (
                        <Card key={draft.id} className="bg-neutral-900/30 border-neutral-800 hover:border-neutral-700 transition-all max-w-4xl">
                            <CardContent className="p-6 flex justify-between items-center">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-xs text-neutral-500">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            Updated {format(new Date(draft.updatedAt), 'MMM d, h:mm a')}
                                        </span>
                                        <span className="bg-neutral-800 px-2 py-0.5 rounded uppercase font-bold tracking-wider text-[10px]">
                                            Draft
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold">{draft.title || 'Untitled Draft'}</h3>
                                    <p className="text-neutral-500 text-sm line-clamp-1">{draft.excerpt || 'No excerpt yet...'}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link href={`/publication/editor/${draft.id}`}>
                                        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10">
                                            <Edit3 className="w-4 h-4 mr-2" />
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                        onClick={() => handleDelete(draft.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
