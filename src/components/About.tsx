import { portfolioData } from "@/data/portfolio";

export default function About() {
    return (
        <section id="about" className="py-32 relative overflow-hidden bg-background">
            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
                            Industry Leadership
                        </div>
                        <h2 className="text-[32px] md:text-[36px] font-black tracking-tight mb-8 text-foreground leading-tight">
                            Architecting the <span className="text-primary underline decoration-primary/30 underline-offset-8">Future of AI</span>
                        </h2>

                        <div className="space-y-8 text-muted-foreground leading-[1.7]">
                            <p className="text-foreground font-medium text-[22px] md:text-[24px] leading-[1.5]">
                                {portfolioData.personalInfo.about}
                            </p>
                            <div className="grid md:grid-cols-2 gap-8 text-[16px] md:text-[18px]">
                                <p>
                                    As a <strong className="text-foreground font-bold">Google Developer Expert</strong>, I serve as a bridge between the core product teams at Google and the developer ecosystem. My focus is on the practical application of GenAI and Multi-Cloud Architecture.
                                </p>
                                <p>
                                    With 16+ years in the industry, I've moved from managing complex server environments to architecting autonomous agentic systems. I specialize in turning complex architectural theory into operational reality.
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 flex flex-wrap gap-4">
                            {[
                                { name: "Mentorship", color: "text-blue-600 border-blue-200 bg-blue-50" },
                                { name: "Technical Writing", color: "text-red-600 border-red-200 bg-red-50" },
                                { name: "Public Speaking", color: "text-amber-600 border-amber-200 bg-amber-50" },
                                { name: "Open Source", color: "text-green-600 border-green-200 bg-green-50" }
                            ].map((item) => (
                                <div key={item.name} className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl border ${item.color}`}>
                                    <div className="w-2 h-2 rounded-full bg-current" />
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                        <div className="p-8 rounded-[2rem] bg-muted/50 border border-border hover:border-blue-300 transition-all group">
                            <div className="text-5xl font-black text-blue-600 mb-3">16+</div>
                            <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">Years in Enterprise IT</div>
                        </div>
                        <div className="p-8 rounded-[2rem] bg-muted/50 border border-border hover:border-red-300 transition-all group">
                            <div className="text-5xl font-black text-red-600 mb-3">57+</div>
                            <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">Keynote & Talks</div>
                        </div>
                        <div className="p-8 rounded-[2rem] bg-muted/50 border border-border hover:border-green-300 transition-all group">
                            <div className="text-5xl font-black text-green-600 mb-3">5k+</div>
                            <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">Developers Mentored</div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
