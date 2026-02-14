'use client';

import Link from 'next/link';

export default function PublicationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white text-neutral-900 selection:bg-blue-100">
            <nav className="border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-8">
                            <Link href="/publication" className="text-xl font-bold tracking-tight hover:text-blue-600 transition-colors">
                                Publication
                            </Link>
                            <div className="hidden md:flex gap-6 text-sm font-medium text-neutral-500">
                                <Link href="/publication/articles" className="hover:text-black transition-colors">Articles</Link>
                                <Link href="/publication/tags" className="hover:text-black transition-colors">Tags</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
