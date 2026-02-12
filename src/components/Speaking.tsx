"use client";

import { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";
import { Mic, Users, ChevronLeft, ChevronRight, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Speaking() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const talks = portfolioData.speaking;

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => (prevIndex + newDirection + talks.length) % talks.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            paginate(1);
        }, 6000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 500 : -500,
            opacity: 0
        })
    };

    return (
        <section id="speaking" className="py-32 bg-background relative overflow-hidden">
            <div className="container max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-google-yellow/20 bg-google-yellow/5 text-google-yellow text-xs font-bold uppercase tracking-widest mb-6">
                        Public Advocacy
                    </div>
                    <h2 className="text-[32px] md:text-[36px] font-black tracking-tight mb-6 text-foreground">Thought <span className="text-google-yellow">Leadership</span></h2>
                    <p className="text-muted-foreground text-[16px] md:text-[18px]">
                        Sharing insights on the future of Cloud and AI across global stages.
                    </p>
                </div>

                <div className="relative flex items-center justify-center min-h-[400px]">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="absolute w-full max-w-4xl"
                        >
                            <div className="group relative overflow-hidden rounded-[3rem] bg-card border border-border p-8 md:p-12 shadow-2xl transition-all duration-500 hover:border-google-yellow/30">
                                {talks[currentIndex].image && (
                                    <div className="absolute inset-0 z-0">
                                        <img src={talks[currentIndex].image} alt="" className="w-full h-full object-cover opacity-10 blur-[2px] scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-br from-card via-card/95 to-transparent" />
                                    </div>
                                )}

                                <div className="relative z-10">
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="p-5 rounded-3xl bg-google-yellow/10 text-google-yellow shadow-inner">
                                            <Mic className="w-8 h-8" />
                                        </div>
                                        <div className="px-4 py-1 rounded-full border border-google-yellow/20 bg-google-yellow/5 text-google-yellow text-[10px] font-black uppercase tracking-widest">
                                            {talks[currentIndex].type}
                                        </div>
                                    </div>

                                    <h3 className="text-[28px] md:text-[42px] font-black text-foreground mb-6 leading-tight group-hover:text-google-yellow transition-colors">
                                        {talks[currentIndex].title}
                                    </h3>

                                    <div className="flex flex-wrap items-center gap-6 text-[16px] md:text-[18px] text-muted-foreground font-bold mb-10">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-5 h-5 text-google-yellow" />
                                            <span>{talks[currentIndex].event}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-8 border-t border-border/50">
                                        <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-google-yellow text-white font-black uppercase tracking-widest text-xs hover:shadow-lg hover:shadow-google-yellow/20 transition-all active:scale-95">
                                            <Video className="w-4 h-4" />
                                            Watch Session
                                        </button>
                                        <div className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                                            Session {currentIndex + 1} / {talks.length}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between z-20 pointer-events-none -mx-4 md:-mx-12">
                        <button
                            onClick={() => paginate(-1)}
                            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-border text-foreground flex items-center justify-center hover:bg-google-yellow hover:text-white hover:border-google-yellow transition-all pointer-events-auto shadow-xl group/btn active:scale-90"
                        >
                            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 transition-transform group-hover/btn:-translate-x-1" />
                        </button>
                        <button
                            onClick={() => paginate(1)}
                            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-border text-foreground flex items-center justify-center hover:bg-google-yellow hover:text-white hover:border-google-yellow transition-all pointer-events-auto shadow-xl group/btn active:scale-90"
                        >
                            <ChevronRight className="w-8 h-8 md:w-10 md:h-10 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                    </div>
                </div>

                {/* Dots Navigation */}
                <div className="mt-16 flex justify-center gap-2">
                    {talks.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setDirection(idx > currentIndex ? 1 : -1);
                                setCurrentIndex(idx);
                            }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-10 bg-google-yellow" : "w-2 bg-muted hover:bg-google-yellow/40"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-google-yellow/5 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
}
