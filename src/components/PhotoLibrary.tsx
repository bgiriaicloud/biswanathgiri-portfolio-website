"use client";

import { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";
import Image from "next/image";
import { MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Speaking", "Recognition", "Community", "Life", "Technical"];

export default function PhotoLibrary() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [activeCategory, setActiveCategory] = useState("All");

    const photos = activeCategory === "All"
        ? portfolioData.photos
        : portfolioData.photos.filter(p => p.category === activeCategory);

    // Reset index when category changes
    useEffect(() => {
        setCurrentIndex(0);
    }, [activeCategory]);

    const paginate = (newDirection: number) => {
        if (photos.length <= 1) return;
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => (prevIndex + newDirection + photos.length) % photos.length);
    };

    useEffect(() => {
        if (photos.length > 1) {
            const timer = setInterval(() => paginate(1), 5000);
            return () => clearInterval(timer);
        }
    }, [currentIndex, activeCategory]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95
        })
    };

    return (
        <section id="photos" className="py-32 bg-background relative overflow-hidden border-t border-border/50">
            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="max-w-2xl mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-google-red/20 bg-google-red/5 text-google-red text-xs font-bold uppercase tracking-widest mb-6">
                        Visual Journey
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-6">
                        Professional <span className="text-google-red">Albums</span>
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        A curated collection of my architectural talks, community leadership, and professional milestones.
                    </p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest border transition-all ${activeCategory === cat
                                ? "bg-google-red border-google-red text-white shadow-lg shadow-google-red/20"
                                : "bg-card border-border text-muted-foreground hover:border-google-red/50"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Featured Slider Area */}
                <div className="mb-32">
                    <div className="flex items-center gap-4 mb-8">
                        <h3 className="text-2xl font-black uppercase tracking-tighter text-foreground">Featured <span className="text-google-red">Highlights</span></h3>
                        <div className="h-px flex-1 bg-border/50" />
                    </div>

                    <div className="relative h-[400px] md:h-[650px] w-full flex items-center justify-center">
                        {photos.length > 0 ? (
                            <>
                                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                                    <motion.div
                                        key={`${activeCategory}-${currentIndex}`}
                                        custom={direction}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            x: { type: "spring", stiffness: 300, damping: 30 },
                                            opacity: { duration: 0.3 }
                                        }}
                                        className="absolute w-full h-full"
                                    >
                                        <div className="relative w-full h-full overflow-hidden rounded-[3.5rem] border border-border bg-card shadow-2xl group">
                                            <Image
                                                src={photos[currentIndex].url}
                                                alt={photos[currentIndex].caption}
                                                fill
                                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                                sizes="100vw"
                                                priority
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-80" />

                                            <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16 z-20">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <span className="px-4 py-1.5 rounded-full bg-google-red text-white text-[10px] font-black uppercase tracking-[0.2em]">
                                                        {photos[currentIndex].category}
                                                    </span>
                                                    <div className="h-px w-12 bg-white/20" />
                                                    <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{currentIndex + 1} / {photos.length}</span>
                                                </div>
                                                <h3 className="text-3xl md:text-6xl font-black text-white mb-6 leading-tight max-w-4xl">
                                                    {photos[currentIndex].caption}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-8 text-white/70 font-bold">
                                                    <div className="flex items-center gap-2.5">
                                                        <MapPin className="w-5 h-5 text-google-red" />
                                                        {photos[currentIndex].location}
                                                    </div>
                                                    <div className="flex items-center gap-2.5">
                                                        <Calendar className="w-5 h-5 text-google-red" />
                                                        {photos[currentIndex].date}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Slider Controls */}
                                {photos.length > 1 && (
                                    <div className="absolute inset-x-0 flex justify-between px-6 z-30 pointer-events-none">
                                        <button
                                            onClick={() => paginate(-1)}
                                            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-google-red hover:border-google-red transition-all pointer-events-auto active:scale-90 shadow-2xl"
                                        >
                                            <ChevronLeft className="w-8 h-8" />
                                        </button>
                                        <button
                                            onClick={() => paginate(1)}
                                            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-google-red hover:border-google-red transition-all pointer-events-auto active:scale-90 shadow-2xl"
                                        >
                                            <ChevronRight className="w-8 h-8" />
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center p-20 bg-muted/30 rounded-[3rem] border border-dashed border-border w-full">
                                <p className="text-muted-foreground font-bold">No photos found in this category.</p>
                            </div>
                        )}
                    </div>

                    {/* Progress Indicators for Slider */}
                    {photos.length > 1 && (
                        <div className="mt-16 flex flex-col items-center gap-6">
                            {photos.length <= 15 ? (
                                <div className="flex justify-center gap-3 flex-wrap">
                                    {photos.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setDirection(idx > currentIndex ? 1 : -1);
                                                setCurrentIndex(idx);
                                            }}
                                            className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex
                                                ? "w-16 bg-google-red shadow-[0_0_15px_rgba(234,67,53,0.4)]"
                                                : "w-3 bg-muted hover:bg-google-red/40"
                                                }`}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center gap-8">
                                    <div className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-4">
                                        <span className="text-google-red text-lg">{String(currentIndex + 1).padStart(2, '0')}</span>
                                        <div className="w-12 h-px bg-border" />
                                        <span>{String(photos.length).padStart(2, '0')}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-google-red"
                                                animate={{ width: `${((currentIndex + 1) / photos.length) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Album Grid Area */}
                <div>
                    <div className="flex items-center gap-4 mb-12">
                        <h3 className="text-2xl font-black uppercase tracking-tighter text-foreground">Archive <span className="text-google-red">Grid</span></h3>
                        <div className="h-px flex-1 bg-border/50" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {photos.map((photo, idx) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                key={photo.url}
                                transition={{ delay: (idx % 8) * 0.05 }}
                                className="group relative aspect-square rounded-3xl overflow-hidden border border-border bg-card hover:border-google-red/50 transition-all cursor-pointer shadow-sm hover:shadow-xl"
                                onClick={() => {
                                    setCurrentIndex(idx);
                                    window.scrollTo({ top: document.getElementById('photos')?.offsetTop, behavior: 'smooth' });
                                }}
                            >
                                <Image
                                    src={photo.url}
                                    alt={photo.caption}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                                <div className="absolute bottom-4 left-4 right-4 z-20 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <p className="text-google-red text-[10px] font-black uppercase tracking-widest mb-1">{photo.category}</p>
                                    <h4 className="text-white font-bold text-sm leading-tight line-clamp-2">{photo.caption}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-google-red/5 blur-[150px] -mr-64 -mt-64 rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-google-blue/5 blur-[120px] -ml-32 -mb-32 rounded-full pointer-events-none" />
        </section>
    );
}
