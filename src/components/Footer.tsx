import { portfolioData } from "@/data/portfolio";
import Link from "next/link";
import { Linkedin, Twitter, Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-16 bg-muted/30 border-t border-border/50">
            <div className="container max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-muted-foreground">
                    <span className="font-black text-foreground tracking-tight uppercase">
                        BISWANATH <span className="text-primary">GIRI</span>
                    </span>
                    <span className="hidden md:inline text-border">|</span>
                    <span className="font-bold">&copy; {new Date().getFullYear()} Google Developer Expert Portfolio</span>
                </div>

                <div className="flex gap-8">
                    <Link href={portfolioData.personalInfo.linkedin} target="_blank" className="text-muted-foreground hover:text-google-blue transition-all hover:-translate-y-1 transform duration-300">
                        <Linkedin className="w-6 h-6" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                    <div className="flex gap-1.5 items-center">
                        <span className="w-2 h-2 rounded-full bg-[#4285F4]"></span>
                        <span className="w-2 h-2 rounded-full bg-[#EA4335]"></span>
                        <span className="w-2 h-2 rounded-full bg-[#FBBC05]"></span>
                        <span className="w-2 h-2 rounded-full bg-[#34A853]"></span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
