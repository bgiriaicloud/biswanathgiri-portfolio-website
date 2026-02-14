'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import BubbleMenuExtension from '@tiptap/extension-bubble-menu';
import FloatingMenuExtension from '@tiptap/extension-floating-menu';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Youtube from '@tiptap/extension-youtube';
import { common, createLowlight } from 'lowlight';
import { useState, useCallback } from 'react';
import {
    Bold, Italic, List, ListOrdered, Code, Quote, Image as ImageIcon,
    Link as LinkIcon, Heading1, Heading2, Save, Send, Loader2, Undo, Redo, Upload,
    Plus, X, FileCode, Terminal, Youtube as YoutubeIcon
} from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import Placeholder from '@tiptap/extension-placeholder';

const lowlight = createLowlight(common);

interface BlogEditorProps {
    articleId?: string;
    initialContent?: any;
    onSave: (content: any, status: 'published' | 'draft') => Promise<void>;
    isSaving: boolean;
    onEditorReady?: (editor: any) => void;
}

export default function BlogEditor({ articleId, initialContent, onSave, isSaving, onEditorReady }: BlogEditorProps) {
    const [isPublishing, setIsPublishing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                codeBlock: false,
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-xl max-w-full h-auto my-8 shadow-sm',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline underline-offset-4 font-medium',
                },
            }),
            CodeBlockLowlight.configure({
                lowlight,
                HTMLAttributes: {
                    class: 'rounded-xl bg-neutral-900 text-neutral-100 p-6 font-mono text-sm my-10 overflow-x-auto shadow-2xl border border-white/5',
                },
            }),
            Youtube.configure({
                HTMLAttributes: {
                    class: 'rounded-xl overflow-hidden shadow-lg my-8 aspect-video w-full',
                },
                inline: false,
            }),
            Placeholder.configure({
                placeholder: 'Tell your story...',
                includeChildren: true,
            }),
        ],
        content: initialContent || '',
        onUpdate: ({ editor }) => {
            // Optional: sync state if needed
        },
        onCreate: ({ editor }) => {
            onEditorReady?.(editor);
        },
        editorProps: {
            attributes: {
                class: 'prose prose-lg md:prose-xl prose-neutral max-w-none focus:outline-none min-h-[700px] py-12 px-0 selection:bg-blue-100 selection:text-blue-900 tiptap',
            },
        },
    });

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !editor) return;

        setIsUploading(true);
        try {
            // 1. Upload to our proxy API
            const formData = new FormData();
            formData.append('file', file);
            formData.append('id', articleId || 'temp');

            const res = await fetch('/api/blogs/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Upload failed');
            }

            const { publicUrl } = await res.json();
            console.log('Upload successful:', publicUrl);

            // 3. Insert into editor
            if (editor) {
                editor.chain()
                    .focus()
                    .setImage({ src: publicUrl, alt: file.name })
                    .createParagraphNear()
                    .run();
                setShowFloatingActions(false);
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    };

    const addImage = useCallback(() => {
        const input = document.getElementById('image-upload-input');
        input?.click();
    }, []);

    const setLink = useCallback(() => {
        const previousUrl = editor?.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) return;
        if (url === '') {
            editor?.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const addYoutubeVideo = useCallback(() => {
        const url = window.prompt('Enter YouTube URL');

        if (url) {
            editor?.commands.setYoutubeVideo({
                src: url,
            });
            setShowFloatingActions(false);
        }
    }, [editor]);

    const [showFloatingActions, setShowFloatingActions] = useState(false);

    if (!editor) return null;

    return (
        <div className="w-full max-w-4xl mx-auto bg-transparent flex flex-col pt-4">
            {/* Medium-style Selection Menu */}
            {editor && (
                <BubbleMenu
                    editor={editor}
                    className="flex bg-neutral-900 rounded-lg shadow-xl overflow-hidden p-1 gap-0.5 border border-white/10 shrink-0"
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={cn("w-8 h-8 text-neutral-300 hover:text-white hover:bg-white/10", editor.isActive('bold') && 'text-white bg-white/10')}
                    >
                        <Bold className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={cn("w-8 h-8 text-neutral-300 hover:text-white hover:bg-white/10", editor.isActive('italic') && 'text-white bg-white/10')}
                    >
                        <Italic className="w-4 h-4" />
                    </Button>
                    <div className="w-[1px] h-4 bg-white/20 mx-1 self-center" />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={cn("w-8 h-8 text-neutral-300 hover:text-white hover:bg-white/10", editor.isActive('heading', { level: 1 }) && 'text-white bg-white/10')}
                    >
                        <Heading1 className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={cn("w-8 h-8 text-neutral-300 hover:text-white hover:bg-white/10", editor.isActive('heading', { level: 2 }) && 'text-white bg-white/10')}
                    >
                        <Heading2 className="w-4 h-4" />
                    </Button>
                    <div className="w-[1px] h-4 bg-white/20 mx-1 self-center" />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        className={cn("w-8 h-8 text-neutral-300 hover:text-white hover:bg-white/10", editor.isActive('code') && 'text-white bg-white/10')}
                    >
                        <Code className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={cn("w-8 h-8 text-neutral-300 hover:text-white hover:bg-white/10", editor.isActive('blockquote') && 'text-white bg-white/10')}
                    >
                        <Quote className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={setLink}
                        className={cn("w-8 h-8 text-neutral-300 hover:text-white hover:bg-white/10", editor.isActive('link') && 'text-white bg-white/10')}
                    >
                        <LinkIcon className="w-4 h-4" />
                    </Button>
                </BubbleMenu>
            )}

            {/* Medium-style Floating Menu for new lines */}
            {editor && (
                <FloatingMenu
                    editor={editor}
                    className="flex items-center gap-3 -ml-16 md:-ml-24"
                >
                    <div className="relative flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full p-1 border border-neutral-100 shadow-sm">
                        <button
                            type="button"
                            onClick={() => setShowFloatingActions(!showFloatingActions)}
                            className={cn(
                                "w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-400 hover:text-neutral-600 hover:border-neutral-600 transition-all duration-300 transform shadow-sm",
                                showFloatingActions && "rotate-45"
                            )}
                        >
                            <Plus className="w-6 h-6" />
                        </button>

                        <div className={cn(
                            "flex items-center gap-2 transition-all duration-300 transform origin-left",
                            showFloatingActions ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-95 -translate-x-4 pointer-events-none"
                        )}>
                            <button
                                type="button"
                                onClick={addImage}
                                disabled={isUploading}
                                title="Add an image"
                                className="w-10 h-10 rounded-full border border-google-green/20 bg-google-green/5 text-google-green flex items-center justify-center hover:bg-google-green hover:text-white transition-all p-2"
                            >
                                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                                title="Add a code block"
                                className="w-10 h-10 rounded-full border border-google-blue/20 bg-google-blue/5 text-google-blue flex items-center justify-center hover:bg-google-blue hover:text-white transition-all p-2"
                            >
                                <Terminal className="w-5 h-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleBulletList().run()}
                                title="Add a list"
                                className="w-10 h-10 rounded-full border border-google-yellow/20 bg-google-yellow/5 text-google-yellow flex items-center justify-center hover:bg-google-yellow hover:text-white transition-all p-2"
                            >
                                <List className="w-5 h-5" />
                            </button>
                            <button
                                type="button"
                                onClick={addYoutubeVideo}
                                title="Add a YouTube video"
                                className="w-10 h-10 rounded-full border border-red-100 bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all p-2"
                            >
                                <YoutubeIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </FloatingMenu>
            )}

            {/* Hidden Input for Image Upload */}
            <input
                type="file"
                id="image-upload-input"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
            />

            {/* Content Area - Clean Canvas like Medium */}
            <div
                className="flex-grow pt-10 pb-32 cursor-text"
                onClick={() => editor?.chain().focus().run()}
            >
                <EditorContent editor={editor} />
            </div>


            {/* Selection/Undo/Redo - Subtle Floating */}
            <div className="fixed bottom-8 right-8 flex gap-2 opacity-50 hover:opacity-100 transition-opacity">
                <Button variant="outline" size="icon" onClick={() => editor.chain().focus().undo().run()} className="w-10 h-10 rounded-full bg-white border-neutral-200 shadow-lg">
                    <Undo className="w-4 h-4 text-neutral-600" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => editor.chain().focus().redo().run()} className="w-10 h-10 rounded-full bg-white border-neutral-200 shadow-lg">
                    <Redo className="w-4 h-4 text-neutral-600" />
                </Button>
            </div>
        </div>
    );
}
