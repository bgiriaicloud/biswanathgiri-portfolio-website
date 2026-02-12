import { portfolioData } from "@/data/portfolio";
import Link from "next/link";
import {
    Linkedin,
    Twitter,
    Github,
    Youtube,
    Instagram,
    MessageCircle,
    Link as LinkIcon,
    BookOpen
} from "lucide-react";

export default function Footer() {
    const socialLinks = [
        { href: portfolioData.personalInfo.linkedin, icon: Linkedin, color: "hover:text-[#0A66C2]", label: "LinkedIn" },
        { href: portfolioData.personalInfo.medium, icon: BookOpen, color: "hover:text-foreground", label: "Medium" },
        { href: portfolioData.personalInfo.twitter, icon: Twitter, color: "hover:text-[#1DA1F2]", label: "X" },
        { href: portfolioData.personalInfo.whatsapp, icon: MessageCircle, color: "hover:text-[#25D366]", label: "WhatsApp" },
        { href: portfolioData.personalInfo.github, icon: Github, color: "hover:text-foreground", label: "GitHub" },
        { href: portfolioData.personalInfo.youtube, icon: Youtube, color: "hover:text-[#FF0000]", label: "YouTube" },
        { href: portfolioData.personalInfo.instagram, icon: Instagram, color: "hover:text-[#E4405F]", label: "Instagram" },
        { href: portfolioData.personalInfo.linktree, icon: LinkIcon, color: "hover:text-[#43E55E]", label: "Linktree" },
    ];

    return (
        <footer className="py-20 bg-muted/30 border-t border-border/50">
            <div className="container max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <span className="text-2xl font-black text-foreground tracking-tighter uppercase">
                            BISWANATH <span className="text-primary">GIRI</span>
                        </span>
                        <p className="text-sm font-bold text-muted-foreground tracking-widest uppercase">
                            Google Developer Expert & Cloud & AI Architect
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                        {socialLinks.map((social) => (
                            <Link
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                className={`text-muted-foreground ${social.color} transition-all duration-300 transform hover:-translate-y-1`}
                                title={social.label}
                            >
                                <social.icon className="w-6 h-6" />
                                <span className="sr-only">{social.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[12px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                        &copy; {new Date().getFullYear()} Biswanath Giri. All Rights Reserved.
                    </p>
                    <div className="flex gap-2">
                        <span className="w-2 h-2 rounded-full bg-google-blue"></span>
                        <span className="w-2 h-2 rounded-full bg-google-red"></span>
                        <span className="w-2 h-2 rounded-full bg-google-yellow"></span>
                        <span className="w-2 h-2 rounded-full bg-google-green"></span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
