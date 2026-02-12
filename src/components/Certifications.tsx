import { portfolioData } from "@/data/portfolio";
import { BadgeCheck, ShieldCheck, Trophy } from "lucide-react";

export default function Certifications() {
    return (
        <section id="certifications" className="py-32 bg-secondary/30 border-y border-border/50">
            <div className="container max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-google-green/20 bg-google-green/5 text-google-green text-xs font-bold uppercase tracking-widest mb-6">
                        Academic & Professional
                    </div>
                    <h2 className="text-[32px] md:text-[36px] font-black tracking-tight mb-4 uppercase text-foreground">Verified <span className="text-google-green">Credentials</span></h2>
                    <p className="text-muted-foreground text-[16px] md:text-[18px]">Top-tier certifications from Google Cloud and global technology leaders.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolioData.certifications.map((cert, index) => {
                        const Icon = cert.includes("Expert") || cert.includes("Architect") || cert.includes("Fellow") ? Trophy : BadgeCheck;
                        return (
                            <div key={index} className="flex items-center gap-4 bg-card px-6 py-6 rounded-[2rem] border border-border group hover:border-google-green/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-black/5">
                                <div className="p-4 rounded-2xl bg-google-green/10 text-google-green transition-all duration-300 flex-shrink-0 shadow-sm">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <span className="font-bold text-foreground transition-colors leading-tight text-[16px] md:text-[18px]">{cert}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
