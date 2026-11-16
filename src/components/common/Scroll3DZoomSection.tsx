"use client";

import React, { useRef, useEffect } from "react";

interface Scroll3DZoomProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  id?: string;
}

export function Scroll3DZoomSection({
  children,
  className = "",
  intensity = 0.08,
  id,
}: Scroll3DZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateTransform = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Skip offscreen sections completely to save GPU & CPU cycles
      if (rect.bottom < -150 || rect.top > viewportHeight + 150) {
        return;
      }

      // Distance of section center from viewport center
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distFromCenter = sectionCenter - viewportCenter;
      const maxDist = (viewportHeight + rect.height) / 2;

      // Focus factor: 1 when perfectly centered, 0 when far above/below
      const absNorm = Math.min(1, Math.abs(distFromCenter) / maxDist);
      const focus = Math.max(0, 1 - absNorm);

      // 1. Cinematic 3D Zoom (scales from 0.94 up to 1.02)
      const currentScale = (0.94 + focus * intensity * 1.0).toFixed(4);

      // 2. 3D Z-translation (up to 45px forward in 3D perspective)
      const currentZ = (focus * 45).toFixed(1);

      // 3. Subtle 3D tilt based on scroll direction relative to center
      const tiltDir = distFromCenter > 0 ? -1 : 1;
      const currentRotateX = ((1 - focus) * tiltDir * 1.8).toFixed(2);

      // Direct hardware-accelerated style mutation
      el.style.transform = `perspective(1200px) translate3d(0, 0, ${currentZ}px) scale(${currentScale}) rotateX(${currentRotateX}deg)`;
      el.style.opacity = `${(0.85 + focus * 0.15).toFixed(3)}`;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updateTransform();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransform();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [intensity]);

  return (
    <div
      id={id}
      ref={containerRef}
      className={`relative will-change-transform ${className}`}
      style={{
        perspective: "1200px",
        transform: "perspective(1200px) translate3d(0, 0, 0) scale(0.94) rotateX(0deg)",
        transformOrigin: "center center",
        transition: "transform 0.22s cubic-bezier(0.2, 0.9, 0.4, 1), opacity 0.22s ease-out",
        backfaceVisibility: "hidden",
      }}
    >
      {children}
    </div>
  );
}
