import { Youtube } from 'lucide-react';

export default function FeaturedVideo() {
    return (
        <section className="py-20 bg-background overflow-hidden">
            <div className="container max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
                    <Youtube className="w-4 h-4 text-red-500" />
                    Featured Workshop
                </div>
                <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-border shadow-2xl bg-neutral-900 group">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/DDshF7HjKEw"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
