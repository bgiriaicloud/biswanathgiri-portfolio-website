'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Article } from '@/lib/gcs';
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Youtube from '@tiptap/extension-youtube';
import { common, createLowlight } from 'lowlight';
import { format } from 'date-fns';
import { Loader2, ArrowLeft, Calendar, Tag, User, Trash2 } from 'lucide-react';
import NextLink from 'next/link';
import { Button } from '@/components/ui/button';

const lowlight = createLowlight(common);

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [html, setHtml] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetch(`/api/blogs/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) throw new Error(data.error);
                setArticle(data);

                // Convert TipTap JSON to HTML
                const generatedHtml = generateHTML(data.content, [
                    StarterKit,
                    Image,
                    Link,
                    CodeBlockLowlight.configure({ lowlight }),
                    Youtube.configure({
                        autoplay: false,
                        HTMLAttributes: {
                            class: 'rounded-xl overflow-hidden shadow-lg my-8 aspect-video w-full',
                        },
                    }),
                ]);
                setHtml(generatedHtml);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this article?')) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/blogs/${id}?status=published`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Delete failed');
            router.push('/publication/articles');
        } catch (error) {
            console.error(error);
            alert('Failed to delete article');
        } finally {
            setIsDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold">Article not found</h1>
                <NextLink href="/publication/articles" className="text-blue-500 hover:underline mt-4 inline-block">
                    Back to articles
                </NextLink>
            </div>
        );
    }

    return (
        <article className="max-w-3xl mx-auto pb-20">
            <div className="flex justify-between items-center mb-8">
                <NextLink href="/publication/articles">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Articles
                    </Button>
                </NextLink>
                <div className="flex gap-2">
                    <NextLink href={`/publication/editor/${id}`}>
                        <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                            Edit Article
                        </Button>
                    </NextLink>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-neutral-400 hover:text-red-500 hover:bg-neutral-100"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </Button>
                </div>
            </div>

            <header className="mb-12 space-y-6 text-center">
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-500">
                    <span className="flex items-center gap-1 bg-neutral-100 px-3 py-1 rounded-full text-neutral-600">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(article.createdAt), 'MMMM d, yyyy')}
                    </span>
                    <span className="flex items-center gap-1 bg-neutral-100 px-3 py-1 rounded-full text-neutral-600">
                        <User className="w-4 h-4" />
                        Biswanath Giri
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
                className="prose prose-neutral prose-lg max-w-none prose-headings:font-bold prose-headings:text-neutral-900 prose-a:text-blue-600 prose-img:rounded-xl tiptap"
                dangerouslySetInnerHTML={{ __html: html }}
            />

            <footer className="mt-20 pt-10 border-t border-neutral-100">
                <div className="bg-neutral-50 rounded-2xl p-8 flex flex-col items-center text-center space-y-4 border border-neutral-100 shadow-sm">
                    <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                        BG
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-neutral-900">Written by Biswanath Giri</h3>
                        <p className="text-neutral-500 mt-1 max-w-sm">
                            Exploring the frontiers of Agentic AI, Cloud Architecture, and the future of technology.
                        </p>
                    </div>
                    <Button variant="outline" className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-50">
                        Follow
                    </Button>
                </div>
            </footer>
        </article>
    );
}
