"use client";

import React, { useState } from "react";
import { SKILLS_CATEGORIES, PERSONAL_INFO } from "@/data/portfolioData";
import { Code2, Terminal, GitBranch, Cpu, Sparkles, Check, ArrowRight } from "lucide-react";

export function ExpertiseChapter() {
  const [activeSkill, setActiveSkill] = useState<{
    name: string;
    description: string;
  } | null>(null);

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Code2 className="w-4 h-4 text-[#8EB69B]" />;
      case 1:
        return <Cpu className="w-4 h-4 text-[#8EB69B]" />;
      case 2:
        return <GitBranch className="w-4 h-4 text-[#8EB69B]" />;
      default:
        return <Terminal className="w-4 h-4 text-[#8EB69B]" />;
    }
  };

  return (
    <section
      id="expertise"
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#0B2B26] text-[#DAF1DE] border-t border-[#163832]"
    >
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(35,83,71,0.3)_0%,transparent_70%)] blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-20 pb-6 border-b border-[#163832]">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-mono tracking-[0.24em] uppercase text-[#8EB69B] mb-2">
              <span className="text-[#DAF1DE]">04</span>
              <span>/</span>
              <span>CHAPTER FOUR</span>
            </div>
            <h2 className="font-serif-editorial text-4xl sm:text-6xl text-[#DAF1DE] font-normal tracking-tight">
              {PERSONAL_INFO.skillsHeading}
            </h2>
            <p className="text-sm sm:text-base font-serif italic text-[#8EB69B] mt-2">
              {PERSONAL_INFO.skillsSubheading}
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#051F20] border border-[#235347] text-[11px] font-mono text-[#8EB69B] tracking-wider uppercase">
            <span>OVERALL PROFICIENCY:</span>
            <span className="text-[#DAF1DE] font-semibold">{PERSONAL_INFO.proficiencyLevel}</span>
          </div>
        </div>

        {/* 3-Category Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Skills Columns (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {SKILLS_CATEGORIES.map((cat, catIdx) => (
              <div
                key={cat.categoryTitle}
                className="p-6 sm:p-8 rounded-2xl bg-[#051F20]/60 border border-[#163832] transition-colors hover:border-[#235347]"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#163832]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-[#163832] border border-[#235347]">
                      {getCategoryIcon(catIdx)}
                    </div>
                    <div>
                      <h3 className="font-serif-editorial text-lg sm:text-xl text-[#DAF1DE] tracking-wide">
                        {cat.categoryTitle}
                      </h3>
                      <span className="text-[10px] font-mono text-[#8EB69B] tracking-widest uppercase">
                        {cat.categoryTag}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#8EB69B]/60">
                    {cat.skills.length} TECHNOLOGIES
                  </span>
                </div>

                {/* Skills Interactive Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {cat.skills.map((skill) => {
                    const isHovered = activeSkill?.name === skill.name;

                    return (
                      <div
                        key={skill.name}
                        onMouseEnter={() =>
                          setActiveSkill({
                            name: skill.name,
                            description: skill.description,
                          })
                        }
                        className={`p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                          isHovered
                            ? "bg-[#163832] border border-[#8EB69B]/60 shadow-lg shadow-[#235347]/30 transform -translate-y-0.5"
                            : "bg-[#0B2B26]/80 border border-[#163832] hover:border-[#235347]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className={`font-mono text-sm sm:text-base font-medium tracking-wide transition-colors ${
                              isHovered ? "text-white font-bold" : "text-[#DAF1DE]"
                            }`}
                          >
                            {skill.name}
                          </span>
                          <span
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${
                              isHovered ? "bg-[#DAF1DE]" : "bg-[#8EB69B]/50"
                            }`}
                          />
                        </div>

                        <p className="text-[11px] text-[#8EB69B] font-light line-clamp-2">
                          {skill.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Inspection & Philosophy Panel (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Live Inspector Box */}
            <div className="p-6 rounded-2xl bg-[#051F20] border border-[#235347] shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#8EB69B] mb-4 pb-3 border-b border-[#163832]">
                <Sparkles className="w-3.5 h-3.5 text-[#DAF1DE]" />
                <span>INSPECTOR FOCUS</span>
              </div>

              {activeSkill ? (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif-editorial text-2xl text-[#DAF1DE]">
                      {activeSkill.name}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#163832] text-[#8EB69B] border border-[#235347]">
                      INTERMEDIATE
                    </span>
                  </div>
                  <p className="text-sm text-[#DAF1DE]/90 font-light leading-relaxed">
                    {activeSkill.description}
                  </p>
                  <div className="pt-2 text-[10px] font-mono text-[#8EB69B] flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#DAF1DE]" />
                    <span>Applied in practical projects & continuous learning</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 py-4 text-center">
                  <p className="text-sm font-mono text-[#8EB69B]">
                    Hover over any technology
                  </p>
                  <p className="text-xs text-[#8EB69B]/60 font-light">
                    to view practical architectural context and hands-on usage details.
                  </p>
                </div>
              )}
            </div>

            {/* Philosophy Card: "ALWAYS LEARNING. ALWAYS BUILDING." */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#163832] to-[#0B2B26] border border-[#8EB69B]/20 relative overflow-hidden">
              <div className="text-xs font-mono tracking-widest uppercase text-[#8EB69B] mb-2">
                MINDSET
              </div>
              <blockquote className="font-serif-editorial text-2xl sm:text-3xl text-[#DAF1DE] font-normal leading-tight">
                &ldquo;{PERSONAL_INFO.skillsStatement}&rdquo;
              </blockquote>
              <p className="text-xs text-[#8EB69B] mt-3 font-light leading-relaxed">
                Focusing on honest technical mastery, pragmatic software architecture, clean syntax, and user-centered design.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
