"use client";

import { motion } from "framer-motion";

export default function GDEBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-blue-200 bg-blue-50/50 backdrop-blur-sm mb-8 group hover:border-blue-400 transition-all cursor-default shadow-sm"
        >
            <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4] shadow-sm"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335] shadow-sm"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05] shadow-sm"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] shadow-sm"></span>
            </div>
            <span className="text-sm font-black tracking-widest uppercase text-blue-600">
                Google Developer Expert
            </span>
        </motion.div>
    );
}
