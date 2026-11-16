"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { GraduationCap, MapPin, Sparkles, BookOpen, Compass } from "lucide-react";

export function AboutChapter() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imgParallaxY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#0B2B26] text-[#DAF1DE] flex flex-col justify-center border-t border-[#163832]"
    >
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/3 -left-32 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(35,83,71,0.3)_0%,transparent_70%)] blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Editorial Chapter Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 pb-6 border-b border-[#163832]">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-mono tracking-[0.24em] uppercase text-[#8EB69B] mb-2">
              <span className="text-[#DAF1DE]">02</span>
              <span>/</span>
              <span>CHAPTER TWO</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-5xl lg:text-6xl text-[#DAF1DE] font-normal tracking-tight">
              {PERSONAL_INFO.aboutHeading}
            </h2>
          </div>

          <div className="text-xs font-mono text-[#8EB69B] tracking-widest uppercase">
            ABOUT · BACKGROUND · PHILOSOPHY
          </div>
        </div>

        {/* Asymmetrical Two-Column Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Column 1: Portrait Detail Crop & Typographic Accents (5 cols) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              style={{ y: imgParallaxY }}
              className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-2xl p-3 bg-gradient-to-b from-[#163832] to-[#051F20] border border-[#235347] shadow-2xl overflow-hidden group"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#051F20]">
                {/* Authentic Portrait Crop */}
                <Image
                  src="/images/jenit-jenson-portrait.jpg"
                  alt="Jenit Jenson Close Detail Portrait"
                  fill
                  className="object-cover object-top filter saturate-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 90vw, 450px"
                />

                {/* Editorial Vignette & Watermark */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#051F20] via-transparent to-transparent opacity-80 pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#DAF1DE]/90">
                  <span className="px-2 py-1 rounded bg-[#051F20]/80 border border-[#8EB69B]/30 backdrop-blur-md">
                    KERALA, IN
                  </span>
                  <span className="px-2 py-1 rounded bg-[#051F20]/80 border border-[#8EB69B]/30 backdrop-blur-md">
                    3RD YEAR B.TECH
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Decorative Typographic Quote Under Image */}
            <div className="mt-6 text-center lg:text-left">
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#8EB69B]/70 uppercase">
                &ldquo;Engineering with intention, designed for people.&rdquo;
              </span>
            </div>
          </div>

          {/* Column 2: Narrative, Education & Philosophy (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            {/* Lead Narrative */}
            <div className="space-y-4">
              <p className="text-xl sm:text-2xl font-serif text-[#DAF1DE] leading-relaxed font-light">
                {PERSONAL_INFO.aboutParagraphs[0]}
              </p>
              <p className="text-base sm:text-lg text-[#8EB69B] leading-relaxed font-light">
                {PERSONAL_INFO.aboutParagraphs[1]}
              </p>
              <p className="text-base text-[#DAF1DE]/80 leading-relaxed font-light">
                {PERSONAL_INFO.aboutParagraphs[2]}
              </p>
            </div>

            {/* Editorial Philosophy Statement Banner */}
            <div className="p-6 rounded-xl bg-[#163832]/60 border border-[#235347] relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#8EB69B]/5 blur-2xl pointer-events-none" />
              <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#8EB69B] uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#DAF1DE]" />
                <span>CORE CREATIVE PHILOSOPHY</span>
              </div>
              <blockquote className="font-serif-editorial text-xl sm:text-2xl text-[#DAF1DE] font-normal tracking-wide">
                &ldquo;{PERSONAL_INFO.philosophy}&rdquo;
              </blockquote>
            </div>

            {/* Education & Academic Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-xl bg-[#051F20]/60 border border-[#163832] flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#163832] text-[#DAF1DE] border border-[#235347]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#8EB69B] tracking-wider uppercase block">
                    DEGREE PROGRAM
                  </span>
                  <h4 className="text-sm font-semibold text-[#DAF1DE]">
                    {PERSONAL_INFO.education}
                  </h4>
                  <p className="text-xs text-[#8EB69B] mt-0.5">
                    {PERSONAL_INFO.college}
                  </p>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-mono bg-[#235347]/50 text-[#DAF1DE] border border-[#8EB69B]/30">
                    {PERSONAL_INFO.currentYear}
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#051F20]/60 border border-[#163832] flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#163832] text-[#DAF1DE] border border-[#235347]">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#8EB69B] tracking-wider uppercase block">
                    FOCUS DOMAINS
                  </span>
                  <h4 className="text-sm font-semibold text-[#DAF1DE]">
                    Full-Stack & Interactive UI
                  </h4>
                  <p className="text-xs text-[#8EB69B] mt-0.5">
                    Next.js, TypeScript, React, Systems
                  </p>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-mono bg-[#235347]/50 text-[#DAF1DE] border border-[#8EB69B]/30">
                    KERALA, INDIA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
