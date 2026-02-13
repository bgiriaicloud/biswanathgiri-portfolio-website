import { motion } from "framer-motion";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";

export default function GDEBadge() {
    const { profileImage, name } = portfolioData.personalInfo;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex flex-col items-center justify-center gap-12 w-full max-w-[1212px] h-[550px] rounded-[100px] border border-blue-200 bg-blue-50/30 backdrop-blur-md mb-20 group hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-500 cursor-default shadow-2xl"
        >
            {/* Profile Image Section */}
            <div className="relative">
                <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-80 h-80 rounded-full p-3 bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#FBBC05] shadow-2xl"
                >
                    <div className="relative w-full h-full rounded-full overflow-hidden border-[6px] border-white bg-white">
                        <Image
                            src={profileImage || "https://storage.googleapis.com/biswanath-portfolio/05C87DBC-78DF-400C-8FF7-0CA027795D26.jpeg"}
                            alt={name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 320px, 400px"
                            priority
                        />
                    </div>
                </motion.div>
                <div className="absolute -bottom-4 right-4 w-16 h-16 bg-blue-500 rounded-full border-[6px] border-white flex items-center justify-center shadow-xl z-10">
                    <div className="w-5 h-5 bg-white rounded-full animate-pulse" />
                </div>
            </div>

            <div className="flex gap-8">
                {[
                    { color: "#4285F4", delay: 0 },
                    { color: "#EA4335", delay: 0.2 },
                    { color: "#FBBC05", delay: 0.4 },
                    { color: "#34A853", delay: 0.6 }
                ].map((dot, idx) => (
                    <motion.span
                        key={idx}
                        className="w-6 h-6 rounded-full shadow-lg border-2 border-white/20"
                        style={{ backgroundColor: dot.color }}
                        animate={{
                            y: [0, -20, 0],
                            scale: [1, 1.4, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: dot.delay
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
}
