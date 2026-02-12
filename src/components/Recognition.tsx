"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Award, Star, Trophy, ShieldCheck, Medal, Globe, Laptop, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

const recognitions = portfolioData.photos
    .filter(photo => photo.category === "Recognition")
    .map(photo => ({
        title: photo.caption,
        description: photo.location + " - " + photo.date,
        image: photo.url,
        tag: photo.category
    }));

export default function Recognition() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => setCurrentIndex((prev: number) => (prev + 1) % recognitions.length);
    const prevSlide = () => setCurrentIndex((prev: number) => (prev - 1 + recognitions.length) % recognitions.length);

    useEffect(() => {
        const timer = setInterval(nextSlide, 7000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    return (
        <section id="recognition" className="py-24 bg-background overflow-hidden border-t border-border/50">
            <div className="container max-w-7xl mx-auto px-6 mb-20">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="flex-1 order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-google-blue/20 bg-google-blue/5 text-google-blue text-xs font-bold uppercase tracking-widest mb-6">
                            Industry Impact
                        </div>
                        <h2 className="text-[32px] md:text-[36px] font-black tracking-tight mb-8">Global <span className="text-google-blue">Industry</span> Recognition</h2>
                        <p className="text-muted-foreground text-[16px] md:text-[18px] leading-[1.7] mb-8">
                            Collaborating with world-leading technology partners like Microsoft and Google to architect the next generation of Cloud and AI platforms.
                        </p>

                        <div className="flex gap-4 mb-10">
                            <div className="flex flex-col">
                                <span className="text-[28px] md:text-[32px] font-black text-foreground">10+</span>
                                <span className="text-[12px] md:text-[14px] font-bold text-muted-foreground uppercase tracking-wider">Product Accolades</span>
                            </div>
                            <div className="w-px h-12 bg-border mx-4" />
                            <div className="flex flex-col">
                                <span className="text-[28px] md:text-[32px] font-black text-foreground">GDE</span>
                                <span className="text-[12px] md:text-[14px] font-bold text-muted-foreground uppercase tracking-wider">Expert Status</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-google-blue hover:text-white transition-all shadow-sm">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-google-blue hover:text-white transition-all shadow-sm">
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <div className="w-full lg:w-5/12 order-1 lg:order-2">
                        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-border shadow-2xl group bg-card">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={recognitions[currentIndex].image}
                                        alt={recognitions[currentIndex].title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                                    <div className="absolute bottom-10 left-10 right-10">
                                        <div className="text-white/60 text-[12px] md:text-[14px] font-black uppercase tracking-[0.2em] mb-2">
                                            {recognitions[currentIndex].tag}
                                        </div>
                                        <h3 className="text-white text-[22px] md:text-[24px] font-black leading-tight">
                                            {recognitions[currentIndex].title}
                                        </h3>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12 bg-muted/30 border-y border-border/50 relative group overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background via-background/20 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background via-background/20 to-transparent z-10 pointer-events-none" />

                <div className="flex flex-col gap-10">
                    <div className="flex w-fit pointer-events-none">
                        <div className="flex shrink-0 gap-10 px-5 items-center animate-scroll-right group-hover:[animation-play-state:paused] pointer-events-auto">
                            <div className="flex gap-10">
                                <HighlightItem icon={<Award className="w-5 h-5" />} text="Microsoft Architecture Recognition" color="text-blue-600" />
                                <HighlightItem icon={<Star className="w-5 h-5" />} text="Google Cloud Developer Expert" color="text-blue-600" />
                                <HighlightItem icon={<Award className="w-5 h-5" />} text="Google AI Expert Recognition" color="text-red-600" />
                                <HighlightItem icon={<Trophy className="w-5 h-5" />} text="Cloud Hero Awards" color="text-amber-600" />
                                <HighlightItem icon={<ShieldCheck className="w-5 h-5" />} text="Google Cloud Champion Innovator" color="text-green-600" />
                                <HighlightItem icon={<Medal className="w-5 h-5" />} text="Multi-cloud Certifications" color="text-blue-600" />
                                <HighlightItem icon={<Globe className="w-5 h-5" />} text="Public Speaker Recognitions" color="text-red-600" />
                                <HighlightItem icon={<Laptop className="w-5 h-5" />} text="Enterprise Architecture Achievements" color="text-amber-600" />
                            </div>
                            <div className="flex gap-10">
                                <HighlightItem icon={<Award className="w-5 h-5" />} text="Microsoft Architecture Recognition" color="text-blue-600" />
                                <HighlightItem icon={<Star className="w-5 h-5" />} text="Google Cloud Developer Expert" color="text-blue-600" />
                                <HighlightItem icon={<Award className="w-5 h-5" />} text="Google AI Expert Recognition" color="text-red-600" />
                                <HighlightItem icon={<Trophy className="w-5 h-5" />} text="Cloud Hero Awards" color="text-amber-600" />
                                <HighlightItem icon={<ShieldCheck className="w-5 h-5" />} text="Google Cloud Champion Innovator" color="text-green-600" />
                                <HighlightItem icon={<Medal className="w-5 h-5" />} text="Multi-cloud Certifications" color="text-blue-600" />
                                <HighlightItem icon={<Globe className="w-5 h-5" />} text="Public Speaker Recognitions" color="text-red-600" />
                                <HighlightItem icon={<Laptop className="w-5 h-5" />} text="Enterprise Architecture Achievements" color="text-amber-600" />
                            </div>
                        </div>
                    </div>

                    <div className="flex w-fit pointer-events-none">
                        <div className="flex shrink-0 gap-10 px-5 items-center animate-scroll-left group-hover:[animation-play-state:paused] pointer-events-auto">
                            <div className="flex gap-10">
                                {recognitions.map((item, idx) => (
                                    <div key={idx} className="relative w-64 h-40 rounded-3xl overflow-hidden border border-border shadow-md shrink-0">
                                        <Image src={item.image} alt={item.title} fill className="object-cover" sizes="256px" />
                                        <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                                            <p className="text-white text-[10px] font-black uppercase tracking-widest line-clamp-1">{item.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-10">
                                {recognitions.map((item, idx) => (
                                    <div key={`dup-${idx}`} className="relative w-64 h-40 rounded-3xl overflow-hidden border border-border shadow-md shrink-0">
                                        <Image src={item.image} alt={item.title} fill className="object-cover" sizes="256px" />
                                        <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                                            <p className="text-white text-[10px] font-black uppercase tracking-widest line-clamp-1">{item.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
                    @keyframes scroll-right {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    @keyframes scroll-left {
                        0% { transform: translateX(-50%); }
                        100% { transform: translateX(0); }
                    }
                    .animate-scroll-right {
                        animation: scroll-right 40s linear infinite;
                    }
                    .animate-scroll-left {
                        animation: scroll-left 40s linear infinite;
                    }
                `}</style>
            </div>
        </section>
    );
}

function HighlightItem({ icon, text, color }: { icon: React.ReactNode, text: string, color: string }) {
    return (
        <div className="flex items-center gap-4 bg-card px-8 py-4 rounded-[2rem] border border-border shadow-sm hover:border-google-blue/40 transition-all cursor-default">
            <div className={`p-2.5 rounded-xl ${color} bg-current/5`}>
                {icon}
            </div>
            <span className="text-[12px] md:text-[14px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">{text}</span>
        </div>
    );
}
