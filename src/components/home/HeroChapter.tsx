"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ArrowDown, ArrowUpRight, Sparkles, MapPin } from "lucide-react";

export function HeroChapter() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Refined parallax transformations
  const fgPortraitY = useTransform(scrollYProgress, [0, 1], [0, 75]);
  const bgPortraitY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const win = window as unknown as { lenis?: { scrollTo: (target: HTMLElement | string) => void } };
      if (win.lenis) {
        win.lenis.scrollTo(el);
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#051F20] text-[#DAF1DE]"
    >
      {/* 1. Atmospheric Emerald Lighting & Vignette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] sm:w-[950px] sm:h-[950px] bg-[radial-gradient(circle,rgba(35,83,71,0.35)_0%,rgba(11,43,38,0.25)_45%,transparent_75%)] blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-32 right-1/4 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(142,182,155,0.12)_0%,transparent_70%)] blur-[90px] pointer-events-none" />
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />

      {/* 2. Giant Low-Opacity Editorial Background Typography */}
      <motion.div
        style={{ y: bgTextY }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 overflow-hidden leading-none opacity-[0.045] font-serif-editorial text-[20vw] font-black tracking-tighter text-[#DAF1DE]"
        aria-hidden="true"
      >
        <span className="translate-y-[-10%]">JENIT</span>
        <span className="translate-y-[10%]">JENSON</span>
      </motion.div>

      {/* 3. Subtle Left Vertical Editorial Statement */}
      <div className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 items-center gap-3 select-none">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#8EB69B]/70 [writing-mode:vertical-lr] rotate-180">
          {PERSONAL_INFO.heroVerticalText}
        </span>
        <span className="w-[1px] h-16 bg-gradient-to-b from-[#8EB69B]/40 to-transparent" />
      </div>

      {/* 4. Main Hero Composition */}
      <motion.div
        style={{ y: contentY, opacity: opacityFade }}
        className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        {/* Left Column: Text, Identity, CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
          {/* Small Intro Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0B2B26] border border-[#235347] text-[#8EB69B] text-xs font-mono tracking-widest uppercase shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#8EB69B] animate-pulse" />
            <span>{PERSONAL_INFO.heroIntro}</span>
          </motion.div>

          {/* Central Hero Editorial Heading: "JENIT JENSON" (VANITY Didone Reference) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-1"
          >
            <h1 className="font-serif-editorial text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-normal tracking-tight text-[#DAF1DE] leading-[0.92] text-editorial-glow">
              JENIT
              <span className="block italic font-light text-mint-gradient">JENSON</span>
            </h1>
          </motion.div>

          {/* Supporting Heading & Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="space-y-3 max-w-xl"
          >
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#8EB69B]" />
              <h2 className="text-sm sm:text-base font-mono tracking-[0.22em] uppercase text-[#8EB69B] font-medium">
                {PERSONAL_INFO.role}
              </h2>
            </div>
            <p className="text-base sm:text-lg text-[#DAF1DE]/80 leading-relaxed font-light">
              {PERSONAL_INFO.heroStatement}
            </p>
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="pt-2 flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto"
          >
            <button
              onClick={() => scrollTo("work")}
              className="btn-mint px-7 py-3.5 rounded text-xs uppercase tracking-[0.16em] inline-flex items-center gap-2 group shadow-lg"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="btn-outline-sage px-7 py-3.5 rounded text-xs uppercase tracking-[0.16em] inline-flex items-center gap-2 group"
            >
              <span>LET&apos;S CONNECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>

          {/* Location & Coordinates Metadata */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="pt-4 flex items-center gap-4 text-xs font-mono text-[#8EB69B]/80 tracking-wider"
          >
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#DAF1DE]" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
            <span className="text-[#235347]">•</span>
            <span className="hidden sm:inline">{PERSONAL_INFO.coordinates}</span>
            <span className="text-[#235347] hidden sm:inline">•</span>
            <span className="text-[#DAF1DE]/70">{PERSONAL_INFO.college}</span>
          </motion.div>
        </div>

        {/* Right Column: Central Personal Portrait Composition (Using Reference 04) */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Background Aura Behind Portrait */}
          <div className="absolute w-[320px] h-[380px] sm:w-[420px] sm:h-[480px] rounded-full bg-[radial-gradient(circle,rgba(35,83,71,0.55)_0%,rgba(22,56,50,0.3)_60%,transparent_80%)] blur-[70px] pointer-events-none" />

          {/* Frame 1: Oversized Monochrome Backdrop Portrait Treatment */}
          <motion.div
            style={{ y: bgPortraitY }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.22, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute -top-10 -right-8 w-64 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden pointer-events-none filter grayscale contrast-125 mix-blend-screen opacity-20 border border-[#8EB69B]/20"
          >
            <Image
              src="/images/jenit-jenson-portrait.jpg"
              alt="Jenit Jenson Editorial Monochrome Background Treatment"
              fill
              className="object-cover object-top opacity-60"
              sizes="(max-width: 768px) 250px, 320px"
            />
          </motion.div>

          {/* Frame 2: Primary Natural Color Portrait Foreground */}
          <motion.div
            style={{ y: fgPortraitY }}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-[290px] h-[370px] sm:w-[350px] sm:h-[450px] rounded-2xl p-2.5 bg-gradient-to-b from-[#163832]/60 via-[#0B2B26]/80 to-[#051F20] border border-[#8EB69B]/25 shadow-2xl shadow-[#051F20] group"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0B2B26]">
              {/* Actual Personal Portrait with Natural Orange Shirt & Authentic Identity */}
              <Image
                src="/images/jenit-jenson-portrait.jpg"
                alt="Jenit Jenson — Full-Stack Developer Personal Portrait"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 300px, 400px"
              />

              {/* Atmospheric bottom gradient to smoothly blend with green palette */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#051F20] via-[#051F20]/60 to-transparent pointer-events-none" />

              {/* Refined corner accents */}
              <div className="absolute top-3 left-3 text-[9px] font-mono tracking-widest text-[#DAF1DE]/70 px-2 py-0.5 rounded bg-[#051F20]/70 border border-[#8EB69B]/30 backdrop-blur-sm">
                PORTRAIT · 2026
              </div>
              <div className="absolute bottom-3 right-3 text-[9px] font-mono tracking-widest text-[#8EB69B] px-2 py-0.5 rounded bg-[#051F20]/80 border border-[#235347] backdrop-blur-sm">
                JENIT JENSON
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 5. Bottom Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between pt-6 border-t border-[#163832]/60 text-xs font-mono text-[#8EB69B]/70">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8EB69B]" />
          <span>CHAPTER 01 / 05</span>
        </div>

        <button
          onClick={() => scrollTo("about")}
          className="flex items-center gap-2 hover:text-[#DAF1DE] transition-colors group cursor-pointer"
        >
          <span className="tracking-widest uppercase text-[11px]">SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
