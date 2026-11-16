"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { Interactive3DCanvas } from "@/components/effects/Interactive3DCanvas";
import { Scroll3DZoomSection } from "@/components/common/Scroll3DZoomSection";
import { HeroChapter } from "@/components/home/HeroChapter";
import { AboutChapter } from "@/components/about/AboutChapter";
import { ProjectsChapter } from "@/components/projects/ProjectsChapter";
import { ExpertiseChapter } from "@/components/expertise/ExpertiseChapter";
import { ContactChapter } from "@/components/contact/ContactChapter";

export default function PortfolioPage() {
  const [initialLoading, setInitialLoading] = useState(true);

  return (
    <>
      {/* 1. Initial Refined Editorial Loading Screen */}
      {initialLoading && <LoadingScreen onComplete={() => setInitialLoading(false)} />}

      {/* 2. Interactive 3D Background Sculpture */}
      <Interactive3DCanvas />

      {/* 3. Global Fixed Navigation */}
      <Navbar />

      {/* 4. Five Immersive Chapters with Continuous 3D Zoom Scroll */}
      <main className="relative z-10 w-full min-h-screen bg-transparent text-[#DAF1DE]">
        {/* Chapter 1: HOME — Cinematic Introduction */}
        <Scroll3DZoomSection id="hero-zoom-wrapper" intensity={0.06}>
          <HeroChapter />
        </Scroll3DZoomSection>

        {/* Chapter 2: ABOUT — The Person Behind the Pixels */}
        <Scroll3DZoomSection id="about-zoom-wrapper" intensity={0.08}>
          <AboutChapter />
        </Scroll3DZoomSection>

        {/* Chapter 3: WORK — Selected Projects */}
        <Scroll3DZoomSection id="work-zoom-wrapper" intensity={0.08}>
          <ProjectsChapter />
        </Scroll3DZoomSection>

        {/* Chapter 4: EXPERTISE — Tools of the Craft */}
        <Scroll3DZoomSection id="expertise-zoom-wrapper" intensity={0.08}>
          <ExpertiseChapter />
        </Scroll3DZoomSection>

        {/* Chapter 5: CONTACT — Let's Build Something Meaningful */}
        <Scroll3DZoomSection id="contact-zoom-wrapper" intensity={0.07}>
          <ContactChapter />
        </Scroll3DZoomSection>
      </main>
    </>
  );
}
