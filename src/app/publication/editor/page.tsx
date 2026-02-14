'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogEditor from '@/components/BlogEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // I'll need to create this or use a plain input
import { Loader2, ArrowLeft, Tag } from 'lucide-react';
import Link from 'next/link';
import { nanoid } from 'nanoid';

export default function NewArticlePage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [tags, setTags] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [articleId] = useState(() => nanoid());
    const [editorInstance, setEditorInstance] = useState<any>(null);

    const handleSave = async (content: any, status: 'published' | 'draft') => {
        if (!title) {
            alert('Please enter a title');
            return;
        }

        const finalContent = content || editorInstance?.getJSON();
        if (!finalContent) return;

        setIsSaving(true);
        try {
            const response = await fetch('/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: articleId,
                    title,
                    content: finalContent,
                    excerpt,
                    tags: [], // Tags are now optional/handled separately
                    status,
                }),
            });

            if (!response.ok) throw new Error('Failed to save');

            const saved = await response.json();
            router.push(status === 'published' ? `/publication/articles/${saved.id}` : '/publication/drafts');
        } catch (error) {
            console.error(error);
            alert('Error saving article');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Medium-style Top Header */}
            <header className="fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md z-50 border-b border-neutral-100 px-4">
                <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/publication">
                            <span className="text-xl font-bold tracking-tighter">BG.</span>
                        </Link>
                        <span className="text-xs text-neutral-400 font-medium border-l border-neutral-200 pl-3 hidden sm:block">
                            Draft in Biswanath Giri
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-neutral-500 font-medium text-xs hover:bg-neutral-50 px-3"
                            onClick={() => handleSave(null, 'draft')}
                            disabled={isSaving}
                        >
                            {isSaving ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
                            Save Draft
                        </Button>
                        <Button
                            className="bg-google-green hover:bg-green-600 text-white rounded-full px-4 h-7 text-xs font-bold shadow-sm transition-all"
                            disabled={isSaving}
                            onClick={() => handleSave(null, 'published')}
                        >
                            Publish
                        </Button>
                    </div>
                </div>
            </header>

            <main className="pt-24 pb-20 max-w-3xl mx-auto px-6">
                <div className="space-y-4">
                    <textarea
                        placeholder="Title"
                        className="w-full bg-transparent text-4xl md:text-5xl font-bold border-none focus:ring-0 placeholder:text-neutral-200 outline-none block resize-none py-0 leading-tight"
                        rows={1}
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                        }}
                    />

                    <textarea
                        placeholder="Subtitle or short description..."
                        className="w-full bg-transparent text-xl text-neutral-400 border-none focus:ring-0 placeholder:text-neutral-200 outline-none resize-none block py-0 leading-relaxed"
                        rows={1}
                        value={excerpt}
                        onChange={(e) => {
                            setExcerpt(e.target.value);
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                        }}
                    />
                </div>

                <div className="mt-4">
                    <BlogEditor
                        articleId={articleId}
                        onSave={handleSave}
                        isSaving={isSaving}
                        onEditorReady={setEditorInstance}
                    />
                </div>
            </main>
        </div>
    );
}
