"use client";

import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "HOME", href: "#home" },
    { label: "ABOUT", href: "#about" },
    { label: "WORK", href: "#work" },
    { label: "EXPERTISE", href: "#expertise" },
    { label: "CONTACT", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Detect active section
      const sections = ["home", "about", "work", "expertise", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      const win = window as unknown as { lenis?: { scrollTo: (target: HTMLElement | string) => void } };
      if (win.lenis) {
        win.lenis.scrollTo(targetEl);
      } else {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#051F20]/80 backdrop-blur-md border-b border-[#8EB69B]/15 py-3.5 shadow-lg shadow-[#051F20]/40"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Left: JJ Monogram & Name */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="group flex items-center gap-3 select-none"
        >
          <div className="w-9 h-9 rounded-md border border-[#8EB69B]/40 bg-[#0B2B26]/80 flex items-center justify-center text-xs font-serif tracking-widest text-[#DAF1DE] group-hover:border-[#DAF1DE] transition-colors">
            JJ
          </div>
          <div className="flex flex-col">
            <span className="font-serif-editorial text-sm sm:text-base tracking-[0.16em] text-[#DAF1DE] group-hover:text-white transition-colors">
              JENIT JENSON
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#8EB69B] uppercase">
              Full-Stack Developer
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative text-xs tracking-[0.2em] transition-colors py-1 ${
                  isActive ? "text-[#DAF1DE] font-semibold" : "text-[#8EB69B] hover:text-[#DAF1DE]"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-[#8EB69B] to-[#DAF1DE]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Availability Indicator & Contact CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B2B26] border border-[#235347]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8EB69B] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8EB69B]" />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#DAF1DE]">
              Available for work
            </span>
          </div>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="btn-mint px-4 py-1.5 rounded text-xs inline-flex items-center gap-1.5"
          >
            <span>TALK</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-md border border-[#8EB69B]/30 text-[#DAF1DE] bg-[#0B2B26]/80"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#051F20]/95 backdrop-blur-xl border-b border-[#8EB69B]/20 px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-5">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-sm tracking-[0.22em] flex items-center justify-between py-2 border-b border-[#163832] ${
                    isActive ? "text-[#DAF1DE] font-semibold" : "text-[#8EB69B]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#DAF1DE]" />}
                </a>
              );
            })}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8EB69B]">
              <span className="w-2 h-2 rounded-full bg-[#8EB69B] animate-pulse" />
              <span>KERALA, INDIA · OPEN TO PROJECTS</span>
            </div>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="btn-mint text-center py-3 rounded text-xs"
            >
              LET&apos;S CONNECT
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
