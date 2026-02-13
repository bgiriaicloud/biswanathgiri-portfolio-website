"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
    Github, Linkedin, Twitter, Youtube, Instagram,
    BookOpen, ExternalLink, Facebook, Send,
    MoreVertical, User, CheckCircle2, ChevronDown
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const {
        name, title, linkedin, github, twitter, youtube,
        instagram, whatsapp, medium, linktree, profileImage,
        handle, telegram, facebook, positioning
    } = portfolioData.personalInfo;

    // Handle clicking outside of the menu to close it
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

                <div className="flex items-center gap-3 relative" ref={menuRef}>
                    {/* Social Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-muted/50 hover:bg-muted border border-border/50 transition-all duration-300 group"
                    >
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors">
                            <Image
                                src={profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                                alt={name}
                                width={32}
                                height={32}
                                className="object-cover"
                            />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground">CONNECT</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute top-full right-0 mt-4 w-[350px] bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-border/50 overflow-hidden"
                            >
                                <div className="p-8 pb-4 text-center">
                                    <div className="relative w-24 h-24 mx-auto mb-4">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-blue-400 animate-spin-slow opacity-20" />
                                        <div className="relative w-full h-full rounded-full overflow-hidden p-1 bg-white">
                                            <Image
                                                src={profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                                                alt={name}
                                                fill
                                                className="object-cover rounded-full"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-black flex items-center justify-center gap-1.5">
                                        {handle} <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500/10" />
                                    </h3>
                                    <p className="text-[11px] font-bold text-muted-foreground uppercase leading-relaxed mt-2 tracking-wide px-4">
                                        Cloud & AI Architect | Empowering People in Cloud Computing, Google Cloud AI/ML, and Google Workspace
                                    </p>
                                </div>

                                <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto scrollbar-hide">
                                    <SocialLink
                                        href={linkedin}
                                        label="Linkedin"
                                        icon={<div className="bg-[#0077B5] p-2 rounded-xl text-white"><Linkedin className="w-5 h-5 fill-current" /></div>}
                                    />
                                    <SocialLink
                                        href={medium}
                                        label="Medium"
                                        icon={<div className="bg-black p-2 rounded-xl text-white"><BookOpen className="w-5 h-5" /></div>}
                                    />
                                    <SocialLink
                                        href={youtube}
                                        label="YouTube"
                                        icon={<div className="bg-[#FF0000] p-2 rounded-xl text-white"><Youtube className="w-5 h-5 fill-current" /></div>}
                                    />
                                    <SocialLink
                                        href={telegram}
                                        label="Telegram"
                                        icon={<div className="bg-[#26A5E4] p-2 rounded-xl text-white"><Send className="w-5 h-5" /></div>}
                                    />
                                    <SocialLink
                                        href={instagram}
                                        label="Instagram"
                                        icon={<div className="bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] p-2 rounded-xl text-white"><Instagram className="w-5 h-5" /></div>}
                                    />
                                    <SocialLink
                                        href={facebook}
                                        label="Facebook"
                                        icon={<div className="bg-[#1877F2] p-2 rounded-xl text-white"><Facebook className="w-5 h-5 fill-current" /></div>}
                                    />
                                    <SocialLink
                                        href={twitter}
                                        label="Twitter"
                                        icon={<div className="bg-[#1DA1F2] p-2 rounded-xl text-white"><Twitter className="w-5 h-5 fill-current" /></div>}
                                    />
                                    <SocialLink
                                        href={github}
                                        label="GitHub"
                                        icon={<div className="bg-[#181717] p-2 rounded-xl text-white"><Github className="w-5 h-5" /></div>}
                                    />
                                </div>

                                <div className="bg-muted/30 p-4 text-center border-t border-border/10">
                                    <Link href={linktree} target="_blank" className="text-[10px] font-black tracking-widest text-muted-foreground uppercase flex items-center justify-center gap-2 hover:text-primary transition-colors group/linktree">
                                        View Full Linktree <ExternalLink className="w-3 h-3 group-hover/linktree:translate-x-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Button variant="outline" size="lg" className="hidden sm:flex rounded-full border-primary/20 hover:bg-primary/5 text-primary font-bold px-6" asChild>
                        <Link href="#contact">GET IN TOUCH</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 pl-2 pr-4 rounded-[20px] bg-white border border-border/50 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 group"
        >
            <div className="flex items-center gap-4">
                {icon}
                <span className="font-bold text-foreground text-sm tracking-tight">{label}</span>
            </div>
            <MoreVertical className="w-4 h-4 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors" />
        </a>
    );
}
