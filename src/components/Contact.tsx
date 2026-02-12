import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export default function Contact() {
    return (
        <section id="contact" className="py-32 bg-secondary/20 text-foreground text-center relative overflow-hidden border-t border-border/50">
            <div className="container max-w-4xl mx-auto px-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-google-red/20 bg-google-red/5 text-google-red text-xs font-bold uppercase tracking-widest mb-8">
                    Collaboration & Advisory
                </div>
                <h2 className="text-4xl md:text-7xl font-black tracking-tight mb-8 text-foreground leading-[1.1]">
                    Ready to scale your <span className="text-google-blue">architecture?</span>
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-2xl mx-auto font-normal leading-relaxed">
                    Whether it's designing a sovereign Agentic AI platform, optimizing multi-cloud costs, or mentoring your engineering leaders.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
                    <Button size="lg" className="h-16 px-12 text-lg font-black rounded-full bg-google-blue hover:bg-blue-600 text-white shadow-xl shadow-blue-500/10 transition-all transform hover:-translate-y-1 uppercase tracking-widest" asChild>
                        <Link href={`mailto:${portfolioData.personalInfo.email}`}>
                            <Mail className="mr-3 h-6 w-6" />
                            Email Expert
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-black rounded-full border-border hover:bg-white text-foreground transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-widest" asChild>
                        <Link href={portfolioData.personalInfo.linkedin} target="_blank">
                            LinkedIn
                            <ArrowRight className="ml-3 h-6 w-6 text-google-green" />
                        </Link>
                    </Button>
                </div>

                <div className="mt-20 flex justify-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-google-blue"></span>
                    <span className="w-3 h-3 rounded-full bg-google-red"></span>
                    <span className="w-3 h-3 rounded-full bg-google-yellow"></span>
                    <span className="w-3 h-3 rounded-full bg-google-green"></span>
                </div>
            </div>
        </section>
    )
}
