"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PROJECTS_DATA, Project, PERSONAL_INFO } from "@/data/portfolioData";
import { ProjectModal } from "./ProjectModal";
import { ArrowUpRight, Github, ExternalLink, ArrowRight } from "lucide-react";

export function ProjectsChapter() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="work"
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#051F20] text-[#DAF1DE] border-t border-[#163832]"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(35,83,71,0.25)_0%,transparent_70%)] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(22,56,50,0.3)_0%,transparent_70%)] blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-20 pb-6 border-b border-[#163832]">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-mono tracking-[0.24em] uppercase text-[#8EB69B] mb-2">
              <span className="text-[#DAF1DE]">03</span>
              <span>/</span>
              <span>CHAPTER THREE</span>
            </div>
            <h2 className="font-serif-editorial text-4xl sm:text-6xl text-[#DAF1DE] font-normal tracking-tight">
              {PERSONAL_INFO.projectsHeading}
            </h2>
            <p className="text-sm sm:text-base font-serif italic text-[#8EB69B] mt-2">
              {PERSONAL_INFO.projectsSubheading}
            </p>
          </div>

          <div className="text-xs font-mono text-[#8EB69B] tracking-widest uppercase">
            ENGINEERING · PROTOTYPES · PRODUCTION
          </div>
        </div>

        {/* Selected Works Gallery with Alternating Editorial Layouts */}
        <div className="space-y-24 sm:space-y-32">
          {PROJECTS_DATA.map((project, index) => {
            const isEven = index % 2 === 1;

            return (
              <div
                key={project.id}
                data-cursor-project="true"
                onClick={() => setSelectedProject(project)}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center group cursor-pointer ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual Preview Column (7 cols) */}
                <div
                  className={`relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden p-2.5 bg-gradient-to-b from-[#163832] to-[#0B2B26] border border-[#235347] transition-all duration-500 group-hover:border-[#8EB69B]/50 group-hover:shadow-2xl group-hover:shadow-[#235347]/30 ${
                    isEven ? "lg:col-span-7 lg:order-2" : "lg:col-span-7 lg:order-1"
                  }`}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0B2B26]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-center filter saturate-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 1024px) 100vw, 700px"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#051F20] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Top Floating Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase bg-[#051F20]/80 border border-[#8EB69B]/30 backdrop-blur-md text-[#DAF1DE]">
                        {project.number} · {project.category}
                      </span>
                    </div>

                    {/* Bottom Hover Pill */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider bg-[#DAF1DE] text-[#051F20] font-semibold flex items-center gap-1.5 shadow-lg">
                        <span>EXPLORE CASE</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Editorial Details Column (5 cols) */}
                <div
                  className={`flex flex-col space-y-5 ${
                    isEven ? "lg:col-span-5 lg:order-1" : "lg:col-span-5 lg:order-2"
                  }`}
                >
                  {/* Number & Category */}
                  <div className="flex items-center gap-3 text-xs font-mono text-[#8EB69B] uppercase tracking-widest">
                    <span className="text-[#DAF1DE] font-semibold">{project.number}</span>
                    <span>/</span>
                    <span>{project.category}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl text-[#DAF1DE] group-hover:text-white transition-colors duration-300 group-hover:translate-x-1">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[#8EB69B] mt-1 tracking-wider">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#DAF1DE]/80 leading-relaxed font-light">
                    {project.description}
                  </p>

                  {/* Key Concepts Preview */}
                  <div className="space-y-1.5 pt-1">
                    {project.keyConcepts.slice(0, 3).map((concept, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#8EB69B]/90 font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8EB69B]" />
                        <span>{concept}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded text-[11px] font-mono bg-[#163832]/60 border border-[#235347] text-[#DAF1DE]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 rounded text-[11px] font-mono bg-[#0B2B26] text-[#8EB69B]">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Direct Link Actions */}
                  <div className="pt-3 flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="text-xs font-mono uppercase tracking-widest text-[#DAF1DE] hover:text-white flex items-center gap-2 group-hover:underline underline-offset-4"
                    >
                      <span>VIEW DETAILS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-mono text-[#8EB69B] hover:text-[#DAF1DE] transition-colors p-1"
                        title="Live Application"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-mono text-[#8EB69B] hover:text-[#DAF1DE] transition-colors p-1"
                        title="Source Code Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expandable Gallery Footer Notice */}
        <div className="mt-24 p-8 rounded-xl bg-[#0B2B26]/80 border border-[#163832] text-center max-w-2xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#8EB69B] mb-1">
            CONTINUOUS EVOLUTION
          </p>
          <p className="text-sm text-[#DAF1DE]/90 font-light">
            Additional research projects, system prototypes and interactive experiments are continually added to GitHub.
          </p>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-xs font-mono tracking-widest text-[#DAF1DE] hover:text-white underline underline-offset-4"
          >
            <span>VISIT GITHUB PROFILE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
