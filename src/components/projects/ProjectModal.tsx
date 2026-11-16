"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Project } from "@/data/portfolioData";
import { X, ExternalLink, Github, CheckCircle, Layers, ShieldCheck } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#051F20]/90 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0B2B26] border border-[#235347] shadow-2xl text-[#DAF1DE] p-6 sm:p-8 md:p-10 animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#163832] border border-[#235347] text-[#DAF1DE] hover:bg-[#235347] transition-colors"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Metadata */}
        <div className="flex items-center gap-3 text-xs font-mono text-[#8EB69B] uppercase tracking-widest mb-3">
          <span className="text-[#DAF1DE]">{project.number}</span>
          <span>/</span>
          <span>{project.category}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif-editorial text-3xl sm:text-5xl text-[#DAF1DE] font-normal tracking-tight mb-2">
          {project.title}
        </h3>
        <p className="text-sm sm:text-base font-mono text-[#8EB69B] mb-6">
          {project.subtitle}
        </p>

        {/* Project Visual Presentation */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden mb-8 border border-[#235347] bg-[#051F20]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 900px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2B26] via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded text-xs font-mono bg-[#051F20]/80 border border-[#8EB69B]/30 backdrop-blur-md text-[#DAF1DE]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#8EB69B] mb-2 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>PROJECT OVERVIEW</span>
            </h4>
            <p className="text-base text-[#DAF1DE]/90 leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Key Concepts */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#8EB69B] mb-3 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>KEY ARCHITECTURE CONCEPTS</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyConcepts.map((concept, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#163832]/60 border border-[#235347] flex items-start gap-2.5"
                >
                  <CheckCircle className="w-4 h-4 text-[#8EB69B] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#DAF1DE] font-light">{concept}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Direction */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#8EB69B] mb-2">
              TECHNOLOGY STACK
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-md text-xs font-mono bg-[#051F20] text-[#DAF1DE] border border-[#235347]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Verified Action Links */}
          <div className="pt-6 border-t border-[#163832] flex flex-wrap items-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-mint px-6 py-3 rounded text-xs uppercase tracking-widest inline-flex items-center gap-2"
              >
                <span>OPEN LIVE PROJECT</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-sage px-6 py-3 rounded text-xs uppercase tracking-widest inline-flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>VIEW REPOSITORY</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
