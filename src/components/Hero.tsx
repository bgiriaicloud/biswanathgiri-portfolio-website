"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Linkedin, Terminal } from "lucide-react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";

import GDEBadge from "./GDEBadge";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
            {/* Background Grid Pattern - Very subtle light version */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#dadce0_1px,transparent_1px),linear-gradient(to_bottom,#dadce0_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-20" />

            {/* Subtle Ambient Glow - Light Blue focus */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none opacity-40" />

            <div className="container relative z-10 px-6 flex flex-col items-center text-center max-w-5xl mx-auto">

                {/* GDE Badge */}
                <GDEBadge />

                {/* Name - Cleaner Dark Typography */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-[48px] md:text-[56px] font-black tracking-tight text-foreground mb-6 leading-[1.1]"
                >
                    Biswanath <span className="text-primary">Giri</span>
                </motion.h1>

                {/* Professional Title/Tagline - Google Blue focus */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-2 mb-8"
                >
                    {["Cloud Architect", "GenAI Expert", "Agentic AI Specialist"].map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 text-[12px] font-bold border border-border bg-secondary/30 rounded-full text-secondary-foreground whitespace-nowrap uppercase tracking-widest">
                            {tag}
                        </span>
                    ))}
                </motion.div>

                {/* Positioning - Dark text on light BG */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-[18px] md:text-[20px] text-muted-foreground max-w-2xl mb-12 leading-[1.6]"
                >
                    {portfolioData.personalInfo.positioning}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-5 w-full justify-center items-center"
                >
                    <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-full bg-primary hover:bg-primary/90 text-white transition-all shadow-lg shadow-primary/20" asChild>
                        <Link href="#expertise">
                            Explore Expertise
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold rounded-full border-border hover:bg-muted text-foreground transition-all" asChild>
                        <Link href={portfolioData.personalInfo.linkedin} target="_blank">
                            LinkedIn Pro
                            <Linkedin className="ml-2 h-5 w-5 text-primary" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}


