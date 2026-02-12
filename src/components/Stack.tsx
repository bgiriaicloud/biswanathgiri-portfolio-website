import { portfolioData } from "@/data/portfolio";
import { Hammer, Monitor, Server, Workflow } from "lucide-react";

export default function Stack() {
    return (
        <section id="stack" className="py-32 bg-background relative overflow-hidden">
            <div className="container max-w-7xl mx-auto px-6 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-google-blue/20 bg-google-blue/5 text-google-blue text-xs font-bold uppercase tracking-widest mb-6">
                    Technology & Ecosystems
                </div>
                <h2 className="text-4xl md:text-7xl font-black tracking-tight mb-8 text-foreground uppercase">Architectural <span className="text-google-blue">Toolkit</span></h2>
                <p className="text-muted-foreground text-xl max-w-2xl mx-auto mb-20 leading-relaxed">
                    A curated selection of the industry-leading tools and platforms I use to build scalable, resilient AI infrastructure.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    {portfolioData.techStack.map((tech, idx) => {
                        const colors = [
                            "hover:text-google-blue hover:border-google-blue hover:bg-blue-50",
                            "hover:text-google-red hover:border-google-red hover:bg-red-50",
                            "hover:text-google-yellow hover:border-google-yellow hover:bg-amber-50",
                            "hover:text-google-green hover:border-google-green hover:bg-green-50"
                        ];
                        const hoverClass = colors[idx % colors.length];
                        return (
                            <span key={tech} className={`px-8 py-4 rounded-[1.5rem] bg-card border border-border text-foreground font-black tracking-widest uppercase text-sm ${hoverClass} transition-all duration-300 transform hover:-translate-y-2 cursor-default shadow-sm hover:shadow-xl hover:shadow-black/5`}>
                                {tech}
                            </span>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
