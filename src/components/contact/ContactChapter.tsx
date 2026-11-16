"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Mail, Github, Linkedin, Copy, Check, ArrowUpRight, ArrowUp, Send } from "lucide-react";

export function ContactChapter() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    const win = window as unknown as { lenis?: { scrollTo: (target: number) => void } };
    if (win.lenis) {
      win.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full pt-28 pb-16 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#051F20] text-[#DAF1DE] flex flex-col justify-between border-t border-[#163832]"
    >
      {/* Subtle emerald atmospheric background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(35,83,71,0.35)_0%,rgba(11,43,38,0.2)_50%,transparent_75%)] blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto">
        {/* Editorial Section Header */}
        <div className="mb-14 pb-6 border-b border-[#163832]">
          <div className="flex items-center gap-2.5 text-xs font-mono tracking-[0.24em] uppercase text-[#8EB69B] mb-2">
            <span className="text-[#DAF1DE]">05</span>
            <span>/</span>
            <span>CHAPTER FIVE</span>
          </div>
          <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#DAF1DE] font-normal tracking-tight">
            {PERSONAL_INFO.contactHeading}
          </h2>
        </div>

        {/* Big Editorial Statement: "HAVE AN IDEA? LET'S MAKE IT REAL." */}
        <div className="max-w-4xl space-y-6 mb-16">
          <h3 className="font-serif-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#DAF1DE] leading-[0.95] tracking-tight">
            HAVE AN IDEA?{" "}
            <span className="italic block sm:inline text-mint-gradient">
              LET&apos;S MAKE IT REAL.
            </span>
          </h3>

          <p className="text-base sm:text-xl text-[#8EB69B] font-light max-w-2xl leading-relaxed">
            Whether you are looking to build a high-performance web application, discuss emergency response tech, or collaborate on creative projects — I am just one message away.
          </p>

          {/* Availability Statement */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#0B2B26] border border-[#235347]">
            <span className="w-2 h-2 rounded-full bg-[#8EB69B] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#DAF1DE]">
              {PERSONAL_INFO.availabilityStatement}
            </span>
          </div>
        </div>

        {/* Action Hub & Contact Channels */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch pt-6 border-t border-[#163832]">
          {/* Primary Mailto Action (6 cols) */}
          <div className="md:col-span-6 p-8 rounded-2xl bg-[#0B2B26]/80 border border-[#235347] flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] font-mono text-[#8EB69B] uppercase tracking-widest block mb-1">
                DIRECT INBOX
              </span>
              <h4 className="font-serif-editorial text-2xl sm:text-3xl text-[#DAF1DE]">
                Start a Conversation
              </h4>
              <p className="text-xs text-[#8EB69B] font-light mt-1">
                Click below to compose an email directly or copy the address to your clipboard.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="btn-mint flex-1 py-3.5 px-6 rounded text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-3.5 h-3.5" />
                <span>WRITE AN EMAIL</span>
              </a>

              <button
                onClick={copyEmail}
                className="btn-outline-sage py-3.5 px-5 rounded text-xs font-mono tracking-wider flex items-center justify-center gap-2"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#DAF1DE]" />
                    <span>COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-xs font-mono text-[#8EB69B]/80 flex items-center gap-2 pt-2 border-t border-[#163832]">
              <Mail className="w-3.5 h-3.5 text-[#DAF1DE]" />
              <span className="select-all text-[#DAF1DE]">{PERSONAL_INFO.email}</span>
            </div>
          </div>

          {/* Social Profiles & Repositories (6 cols) */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* GitHub Card */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-[#0B2B26]/80 border border-[#163832] hover:border-[#8EB69B]/50 hover:bg-[#163832]/50 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <Github className="w-6 h-6 text-[#DAF1DE]" />
                <ArrowUpRight className="w-4 h-4 text-[#8EB69B] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div className="mt-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8EB69B] block">
                  SOURCE CODE
                </span>
                <span className="font-serif-editorial text-xl text-[#DAF1DE]">
                  GitHub Profile
                </span>
                <p className="text-[11px] text-[#8EB69B]/80 mt-1 font-mono">
                  @jenitjenson45-debug
                </p>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-[#0B2B26]/80 border border-[#163832] hover:border-[#8EB69B]/50 hover:bg-[#163832]/50 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <Linkedin className="w-6 h-6 text-[#DAF1DE]" />
                <ArrowUpRight className="w-4 h-4 text-[#8EB69B] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div className="mt-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8EB69B] block">
                  NETWORK
                </span>
                <span className="font-serif-editorial text-xl text-[#DAF1DE]">
                  LinkedIn Profile
                </span>
                <p className="text-[11px] text-[#8EB69B]/80 mt-1 font-mono">
                  /in/jenit-jenson-116a2b387
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Production Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full pt-16 mt-16 border-t border-[#163832] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-[#8EB69B]">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
          <span className="font-serif-editorial text-base text-[#DAF1DE] tracking-widest">
            {PERSONAL_INFO.name}
          </span>
          <span className="hidden sm:inline text-[#235347]">|</span>
          <span className="uppercase tracking-wider">{PERSONAL_INFO.role}</span>
          <span className="hidden sm:inline text-[#235347]">|</span>
          <span className="italic font-serif text-[#DAF1DE]/70">
            &ldquo;{PERSONAL_INFO.footerTagline}&rdquo;
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span>© {PERSONAL_INFO.copyrightYear}</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0B2B26] border border-[#235347] text-[#DAF1DE] hover:bg-[#163832] transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </section>
  );
}
