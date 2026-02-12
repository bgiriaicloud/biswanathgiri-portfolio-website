"use client";

import { portfolioData } from "@/data/portfolio";
import { Brain, Cloud, Cpu, Database, Layers, Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, any> = {
    Brain, Cloud, Cpu, Database, Layers, Shield
};

const googleColors = [
    "text-blue-600 bg-blue-50 border-blue-100",
    "text-red-600 bg-red-50 border-red-100",
    "text-amber-600 bg-amber-50 border-amber-100",
    "text-green-600 bg-green-50 border-green-100",
];

const hoverGoogleColors = [
    "hover:border-blue-300",
    "hover:border-red-300",
    "hover:border-amber-300",
    "hover:border-green-300",
];

const accentGoogleColors = [
    "text-blue-600",
    "text-red-600",
    "text-amber-600",
    "text-green-600",
];

export default function Expertise() {
    return (
        <section id="expertise" className="py-32 bg-background relative overflow-hidden">
            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                            Architectural Proficiency
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                            Technical <span className="text-primary">Mastery</span>
                        </h2>
                        <p className="text-muted-foreground text-xl leading-relaxed">
                            Deep specialization across the Google Cloud ecosystem, GenAI infrastructure, and autonomous Agentic AI.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolioData.expertise.map((item, index) => {
                        const Icon = iconMap[item.icon] || Cloud;
                        const colorIdx = index % googleColors.length;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.5 }}
                                viewport={{ once: true }}
                                className={`group p-8 rounded-[2rem] bg-card border border-border ${hoverGoogleColors[colorIdx]} transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 flex flex-col items-start`}
                            >
                                <div className={`mb-8 p-4 rounded-2xl ${googleColors[colorIdx]} transition-all duration-500`}>
                                    <Icon className="w-8 h-8" />
                                </div>

                                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                                    {item.description}
                                </p>

                                <div className="mt-auto pt-6 border-t border-border/50 w-full flex items-center justify-between text-sm font-bold text-muted-foreground group-hover:text-foreground">
                                    <span className={accentGoogleColors[colorIdx]}>Expert Level</span>
                                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-sm">
                                        <ArrowRight className="w-5 h-5 group-hover:text-white" />
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}


