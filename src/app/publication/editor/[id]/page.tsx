'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import BlogEditor from '@/components/BlogEditor';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Tag, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [tags, setTags] = useState('');
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editorInstance, setEditorInstance] = useState<any>(null);
    const [currentStatus, setCurrentStatus] = useState<any>('draft');

    useEffect(() => {
        // Check both drafts and articles
        fetch(`/api/blogs/${id}?status=draft`)
            .then(res => res.json())
            .then(data => {
                if (data.error) throw new Error(data.error);
                setTitle(data.title);
                setExcerpt(data.excerpt || '');
                setTags(data.tags?.join(', ') || '');
                setContent(data.content);
                setCurrentStatus(data.status || 'draft');
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleSave = async (newContent: any, status: 'published' | 'draft') => {
        if (!title) {
            alert('Please enter a title');
            return;
        }

        const finalContent = newContent || editorInstance?.getJSON();
        if (!finalContent) return;

        setIsSaving(true);
        try {
            const response = await fetch('/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id, // Keep same ID
                    title,
                    content: finalContent,
                    excerpt,
                    tags: [], // Tags now optional
                    status,
                }),
            });

            if (!response.ok) throw new Error('Failed to save');

            router.push(status === 'published' ? `/publication/articles/${id}` : '/publication/drafts');
        } catch (error) {
            console.error(error);
            alert('Error saving article');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
            return;
        }

        setIsDeleting(true);
        try {
            const response = await fetch(`/api/blogs/${id}?status=${currentStatus}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete');

            router.push('/publication');
        } catch (error) {
            console.error(error);
            alert('Error deleting article');
        } finally {
            setIsDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

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
                            Editing Draft
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-neutral-400 hover:text-red-600 hover:bg-red-50"
                            onClick={handleDelete}
                            disabled={isSaving || isDeleting}
                            title="Delete Article"
                        >
                            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </Button>
                        <div className="w-[1px] h-4 bg-neutral-200 mx-1" />
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-neutral-500 font-medium text-xs hover:bg-neutral-50 px-3"
                            onClick={() => handleSave(null, 'draft')}
                            disabled={isSaving || isDeleting}
                        >
                            {isSaving ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
                            Save Draft
                        </Button>
                        <Button
                            className="bg-google-green hover:bg-green-600 text-white rounded-full px-4 h-7 text-xs font-bold shadow-sm transition-all"
                            disabled={isSaving || isDeleting}
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
                    {content && (
                        <BlogEditor
                            articleId={id}
                            initialContent={content}
                            onSave={handleSave}
                            isSaving={isSaving}
                            onEditorReady={setEditorInstance}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
