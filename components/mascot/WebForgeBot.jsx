"use client";

import { motion } from "framer-motion";

export default function WebForgeBot() {
  return (
    <motion.div
      animate={{
        y: [0, -6, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
         repeatType: "loop",
        ease: "easeInOut",
      }}
      className="fixed bottom-6 left-6 z-50"
    >
      <div className="px-3 py-1 rounded-2xl border border-cyan-400/20 bg-white/5 backdrop-blur-xl shadow-[0_0_35px_rgba(59,130,246,0.35)] hover:shadow-[0_0_55px_rgba(59,130,246,0.55)] transition-all duration-300 hover:scale-105 cursor-default">
         <h1 className="text-lg font-black tracking-widest bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent">
          PREM'S
        </h1>

      

      </div>
    </motion.div>
  );
}