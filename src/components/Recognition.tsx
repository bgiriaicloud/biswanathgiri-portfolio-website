"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Award, Star, Trophy, ShieldCheck, Medal, Globe, Laptop, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const recognitions = [
    {
        title: "Architecture Advocacy at Microsoft",
        description: "Recognized for driving architectural innovation and strategic cloud advocacy within the Microsoft ecosystem.",
        image: "https://storage.googleapis.com/biswanath-portfolio/IMG_9123.jpeg",
        tag: "Industry Spotlight"
    },
    {
        title: "Google Cloud Community Leader",
        description: "Honored for leadership in the Cloud Community Days and technical contributions to the GCP ecosystem.",
        image: "https://storage.googleapis.com/biswanath-portfolio/IMG_9703.jpeg",
        tag: "GDE Recognition"
    },
    {
        title: "Technical Excellence Keynote",
        description: "Driving complex technical workshops and architecture reviews for global developer communities.",
        image: "https://storage.googleapis.com/biswanath-portfolio/IMG_9699.jpeg",
        tag: "Community Impact"
    },
    {
        title: "Google AI Safety Research",
        description: "Contributing to the discussion on safe and secure AI deployments within the Google Cloud ecosystem.",
        image: "https://storage.googleapis.com/biswanath-portfolio/safegoogle.jpg",
        tag: "Security Focus"
    }
];

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
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">Global <span className="text-google-blue">Industry</span> Recognition</h2>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                            Collaborating with world-leading technology partners like Microsoft and Google to architect the next generation of Cloud and AI platforms.
                        </p>

                        <div className="flex gap-4 mb-10">
                            <div className="flex flex-col">
                                <span className="text-3xl font-black text-foreground">10+</span>
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Product Accolades</span>
                            </div>
                            <div className="w-px h-12 bg-border mx-4" />
                            <div className="flex flex-col">
                                <span className="text-3xl font-black text-foreground">GDE</span>
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Expert Status</span>
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
                                        <div className="text-white/60 text-xs font-black uppercase tracking-[0.2em] mb-2">
                                            {recognitions[currentIndex].tag}
                                        </div>
                                        <h3 className="text-white text-2xl md:text-3xl font-black leading-tight">
                                            {recognitions[currentIndex].title}
                                        </h3>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12 bg-muted/30 border-y border-border/50 relative group">
                <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background via-background/20 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background via-background/20 to-transparent z-10 pointer-events-none" />

                <div className="flex w-fit pointer-events-none overflow-hidden">
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
                        {/* Duplicate for infinite scroll */}
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

                <style>{`
                    @keyframes scroll-right {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-scroll-right {
                        animation: scroll-right 60s linear infinite;
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
            <span className="text-sm font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">{text}</span>
        </div>
    );
}
