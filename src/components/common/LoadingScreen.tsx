"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast, elegant loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 10;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#051F20] text-[#DAF1DE] select-none"
        >
          {/* Ambient center emerald glow */}
          <div className="absolute w-[360px] h-[360px] rounded-full bg-[#235347]/20 blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* JJ Monogram / Name */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-8 h-8 rounded border border-[#8EB69B]/40 flex items-center justify-center text-xs font-serif text-[#DAF1DE] tracking-wider">
                JJ
              </span>
              <span className="font-serif-editorial text-xl sm:text-2xl tracking-[0.22em] text-[#DAF1DE] font-normal">
                JENIT JENSON
              </span>
            </motion.div>

            {/* Minimal Progress Line */}
            <div className="w-48 sm:w-64 h-[2px] bg-[#163832] rounded-full overflow-hidden relative mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-[#235347] via-[#8EB69B] to-[#DAF1DE] rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Counter & Label */}
            <div className="flex items-center justify-between w-48 sm:w-64 text-[10px] font-mono tracking-widest text-[#8EB69B]">
              <span>INITIALIZING</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
