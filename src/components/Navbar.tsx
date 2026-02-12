import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="text-2xl font-black tracking-tight group">
                    BISWANATH <span className="text-primary group-hover:text-primary/80 transition-colors">GIRI (AI & Cloud) Expert</span>
                </Link>
                <div className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    <Link href="#about" className="hover:text-primary transition-colors">About</Link>
                    <Link href="#expertise" className="hover:text-primary transition-colors">Expertise</Link>
                    <Link href="#projects" className="hover:text-primary transition-colors">Projects</Link>
                    <Link href="#speaking" className="hover:text-primary transition-colors">Speaking</Link>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="lg" className="hidden sm:flex rounded-full border-primary/20 hover:bg-primary/5 text-primary font-bold px-6" asChild>
                        <Link href="#contact">GET IN TOUCH</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}

