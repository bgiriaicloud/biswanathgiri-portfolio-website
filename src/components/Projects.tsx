"use client";

import { portfolioData } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const googleAccentColors = [
    "text-blue-600 border-blue-100 bg-blue-50/50",
    "text-red-600 border-red-100 bg-red-50/50",
    "text-amber-600 border-amber-100 bg-amber-50/50",
    "text-green-600 border-green-100 bg-green-50/50",
];

export default function Projects() {
    return (
        <section id="projects" className="py-32 bg-background relative overflow-hidden">
            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-google-red/20 bg-google-red/5 text-google-red text-xs font-bold uppercase tracking-widest mb-6">
                            Clinical Execution
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8 text-foreground">
                            Engineering <span className="text-primary">Impact</span>
                        </h2>
                        <p className="text-muted-foreground text-xl leading-relaxed">
                            Delivering robust, scalable solutions for enterprise challenges. From autonomous agent swarms to global landing zones.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                    {portfolioData.projects.map((project, idx) => {
                        const accentColor = googleAccentColors[idx % googleAccentColors.length];
                        return (
                            <div
                                key={idx}
                                className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-border bg-card p-10 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-2"
                            >
                                <div>
                                    <div className="mb-10 flex flex-wrap gap-3">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-4 py-1.5 text-xs font-bold tracking-wider rounded-full bg-muted text-muted-foreground border border-border group-hover:border-primary/30 transition-colors uppercase">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="text-3xl font-black mb-6 text-foreground group-hover:text-primary transition-colors duration-300">
                                        {project.title}
                                    </h3>

                                    <p className="text-muted-foreground leading-relaxed text-lg font-normal mb-8">
                                        {project.description}
                                    </p>
                                </div>

                                <div className={`mt-auto pt-8 border-t border-border/50 flex justify-between items-center transition-all ${accentColor} rounded-b-[2.5rem] -mx-10 -mb-10 px-10 pb-10 pt-8 mt-4`}>
                                    <span className="text-sm font-black uppercase tracking-widest">Case Study & Architecture</span>
                                    <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500">
                                        <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
