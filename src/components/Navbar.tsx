import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, Youtube, Instagram, MessageCircle, BookOpen, ExternalLink } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export default function Navbar() {
    const { linkedin, github, twitter, youtube, instagram, whatsapp, medium, linktree } = portfolioData.personalInfo;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="text-2xl font-black tracking-tight group">
                    BISWANATH <span className="text-primary group-hover:text-primary/80 transition-colors">GIRI (AI & Cloud) Expert</span>
                </Link>

                <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-muted-foreground mr-4">
                    <Link href="#about" className="hover:text-primary transition-colors">About</Link>
                    <Link href="#expertise" className="hover:text-primary transition-colors">Expertise</Link>
                    <Link href="#projects" className="hover:text-primary transition-colors">Projects</Link>
                    <Link href="#speaking" className="hover:text-primary transition-colors">Speaking</Link>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden xl:flex items-center gap-3 border-r border-border/50 pr-4 mr-1">
                        <SocialIcon href={linkedin} icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" />
                        <SocialIcon href={twitter} icon={<Twitter className="w-4 h-4" />} label="X" />
                        <SocialIcon href={github} icon={<Github className="w-4 h-4" />} label="GitHub" />
                        <SocialIcon href={youtube} icon={<Youtube className="w-4 h-4" />} label="YouTube" />
                        <SocialIcon href={instagram} icon={<Instagram className="w-4 h-4" />} label="Instagram" />
                        <SocialIcon href={medium} icon={<BookOpen className="w-4 h-4" />} label="Medium" />
                        <SocialIcon href={linktree} icon={<ExternalLink className="w-4 h-4" />} label="Linktree" />
                    </div>

                    <Button variant="outline" size="lg" className="hidden sm:flex rounded-full border-primary/20 hover:bg-primary/5 text-primary font-bold px-6" asChild>
                        <Link href="#contact">GET IN TOUCH</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}

function SocialIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300"
            aria-label={label}
            title={label}
        >
            {icon}
        </a>
    );
}

