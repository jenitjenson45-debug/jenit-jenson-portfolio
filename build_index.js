const fs = require('fs');
const path = require('path');

// Load base64 portrait and logo data
const portraitData = JSON.parse(fs.readFileSync('public/images/portrait_data.json', 'utf8'));
const heroImgUri = portraitData.heroDataUri;
const aboutImgUri = portraitData.aboutDataUri;
const logoImgUri = portraitData.logoDataUri;
const logoPngUri = portraitData.logoPngUri;
const instagramQrUri = portraitData.instagramQrUri;

console.log('Hero URI length:', heroImgUri.length);
console.log('About URI length:', aboutImgUri.length);
console.log('Logo URI length:', logoImgUri.length);
console.log('Instagram QR URI length:', instagramQrUri ? instagramQrUri.length : 0);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Jenit Jenson — UI Designer</title>
  <meta name="description" content="Portfolio of Jenit Jenson, a UI Designer and B.Tech Computer Science Engineering student from Kerala, India crafting thoughtful digital experiences through clean engineering and creative design.">
  <meta name="keywords" content="Jenit Jenson, UI Designer, UI/UX Designer, Kerala, Jyothi Engineering College, Portfolio, Design Systems">
  <meta name="author" content="Jenit Jenson">

  <!-- Open Graph / Social Meta -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Jenit Jenson — UI Designer">
  <meta property="og:description" content="Portfolio of Jenit Jenson, a UI Designer and B.Tech Computer Science Engineering student from Kerala, India.">
  <meta property="og:site_name" content="Jenit Jenson Portfolio">

  <!-- Custom Circular Brand Logo Favicon -->
  <link rel="icon" type="image/png" href="${logoPngUri}">
  <link rel="apple-touch-icon" href="${logoPngUri}">

  <!-- Google Fonts: Bodoni Moda, DM Sans, JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet">

  <!-- Pinned CDN Libraries -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

  <style>
    /* ==========================================================================
       1. COLOR SYSTEM & MODERN NEOMORPHIC CSS VARIABLES
       ========================================================================== */
    :root {
      /* Six Core Palette Colors */
      --c1: #051F20; /* deepest navy green, main bg */
      --c2: #0B2B26; /* dark forest */
      --c3: #163832; /* secondary surfaces */
      --c4: #235347; /* emerald accents */
      --c5: #8EB69B; /* sage: labels, highlights */
      --c6: #DAF1DE; /* pale mint: text, primary buttons */

      /* Neomorphic 3D Surfaces & Dual Shadows */
      --surf: linear-gradient(145deg, #1a403a, #0B2B26);
      --surf-hover: linear-gradient(145deg, #235347, #0e352f);
      --out: 8px 8px 22px rgba(2, 12, 12, 0.72), -6px -6px 18px rgba(35, 83, 71, 0.28);
      --outs: 4px 4px 12px rgba(2, 12, 12, 0.65), -3px -3px 10px rgba(35, 83, 71, 0.24);
      --in: inset 4px 4px 10px rgba(2, 12, 12, 0.75), inset -3px -3px 8px rgba(35, 83, 71, 0.26);
      --glow: 0 0 28px rgba(142, 182, 155, 0.22);

      --font-serif: 'Bodoni Moda', Georgia, serif;
      --font-sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;

      --ease-luxury: cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* ==========================================================================
       2. RESET & BASE STYLES
       ========================================================================== */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      background-color: var(--c1);
      color: var(--c6);
      font-family: var(--font-sans);
      font-size: 16px;
      line-height: 1.6;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
    }

    body {
      background-color: var(--c1);
      color: var(--c6);
      min-height: 100vh;
      overflow-x: hidden;
      position: relative;
    }

    ::selection {
      background: var(--c4);
      color: var(--c6);
    }

    :focus-visible {
      outline: 2px solid var(--c5);
      outline-offset: 4px;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    button {
      background: none;
      border: none;
      font: inherit;
      color: inherit;
      cursor: pointer;
    }

    img, svg {
      display: block;
      max-width: 100%;
    }

    .font-serif { font-family: var(--font-serif); }
    .font-sans { font-family: var(--font-sans); }
    .font-mono { font-family: var(--font-mono); }

    /* ==========================================================================
       3. FINE GRAIN OVERLAY & 3D WEBGL CANVAS
       ========================================================================== */
    .grain-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 9990;
      opacity: 0.07;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    #webgl-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 1;
      opacity: 0.88;
      transition: opacity 0.5s ease;
    }

    /* ==========================================================================
       4. SCROLL PROGRESS & NEOMORPHIC LOADER
       ========================================================================== */
    .scroll-progress-line {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--c5);
      transform-origin: 0% 50%;
      transform: scaleX(0);
      z-index: 9999;
    }

    .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: var(--c1);
      z-index: 10000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: transform 0.9s cubic-bezier(0.77, 0, 0.175, 1);
    }

    .loader-overlay.is-loaded {
      transform: translateY(-100%);
      pointer-events: none;
    }

    .loader-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.2rem;
      text-align: center;
    }

    .loader-logo-wrap {
      width: 76px;
      height: 76px;
      border-radius: 50%;
      background: var(--surf);
      box-shadow: var(--out);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      animation: loaderLogoPulse 2.2s ease-in-out infinite alternate;
    }

    .loader-logo-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }

    @keyframes loaderLogoPulse {
      0% { transform: scale(0.96); box-shadow: var(--out); }
      100% { transform: scale(1.05); box-shadow: var(--out), var(--glow); }
    }

    .loader-monogram {
      font-size: clamp(1.4rem, 3.5vw, 2.1rem);
      letter-spacing: 0.12em;
      color: var(--c6);
    }

    .loader-track {
      width: 260px;
      height: 8px;
      border-radius: 12px;
      background-color: #051F20;
      box-shadow: var(--in);
      position: relative;
      overflow: hidden;
      padding: 1px;
    }

    .loader-fill {
      height: 100%;
      width: 0%;
      border-radius: 12px;
      background: linear-gradient(90deg, var(--c5), var(--c6));
      box-shadow: var(--glow);
      transition: width 0.1s linear;
    }

    .loader-pct {
      font-size: 0.85rem;
      letter-spacing: 0.22em;
      color: var(--c5);
    }

    /* ==========================================================================
       5. CUSTOM CURSOR
       ========================================================================== */
    #custom-cursor {
      position: fixed;
      top: 0;
      left: 0;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1.5px solid var(--c6);
      pointer-events: none;
      z-index: 10005;
      transform: translate(-50%, -50%);
      transition: width 0.28s var(--ease-luxury),
                  height 0.28s var(--ease-luxury),
                  background-color 0.28s ease,
                  border-color 0.28s ease,
                  color 0.28s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--c1);
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.1em;
      user-select: none;
    }

    #custom-cursor.hover {
      width: 56px;
      height: 56px;
      border-color: var(--c5);
      background-color: rgba(218, 241, 222, 0.06);
    }

    #custom-cursor.view-hover {
      width: 84px;
      height: 84px;
      background-color: var(--c6);
      border-color: var(--c6);
      color: var(--c1);
    }

    @media (pointer: coarse), (hover: none) {
      #custom-cursor {
        display: none !important;
      }
    }

    /* ==========================================================================
       6. MODERN NEOMORPHIC BUTTONS (16px radius, no borders)
       ========================================================================== */
    .btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.65rem;
      background: linear-gradient(145deg, #eafaed, #b9d7c1);
      color: var(--c1);
      padding: 0.95rem 2rem;
      font-family: var(--font-sans);
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      border-radius: 16px;
      border: none;
      box-shadow: var(--out), var(--glow);
      cursor: pointer;
      text-decoration: none;
      transition: transform 0.25s var(--ease-luxury), box-shadow 0.25s ease;
    }

    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 10px 10px 28px rgba(2, 12, 12, 0.82), -8px -8px 22px rgba(35, 83, 71, 0.35), 0 0 34px rgba(142, 182, 155, 0.35);
    }

    .btn-primary:active {
      transform: translateY(1px);
      box-shadow: var(--in);
    }

    .btn-primary svg {
      transition: transform 0.25s ease;
    }

    .btn-primary:hover svg {
      transform: translateX(4px);
    }

    .btn-secondary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.65rem;
      background: var(--surf);
      color: var(--c6);
      padding: 0.95rem 2rem;
      font-family: var(--font-sans);
      font-size: 0.78rem;
      font-weight: 500;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      border-radius: 16px;
      border: none;
      box-shadow: var(--out);
      cursor: pointer;
      text-decoration: none;
      transition: transform 0.25s var(--ease-luxury), box-shadow 0.25s ease, background 0.25s ease;
    }

    .btn-secondary:hover {
      transform: translateY(-3px);
      background: var(--surf-hover);
      box-shadow: 10px 10px 26px rgba(2, 12, 12, 0.8), -8px -8px 20px rgba(35, 83, 71, 0.32);
    }

    .btn-secondary:active {
      transform: translateY(1px);
      box-shadow: var(--in);
    }

    .btn-secondary svg {
      transition: transform 0.25s ease;
    }

    .btn-secondary:hover svg {
      transform: translate(2px, -2px);
    }

    /* ==========================================================================
       7. NAVIGATION HEADER (Two Groups Only)
       ========================================================================== */
    .site-nav {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 80px;
      z-index: 1000;
      display: flex;
      align-items: center;
      background: rgba(5, 31, 32, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }

    .nav-container {
      max-width: 1320px;
      width: 100%;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .nav-monogram {
      display: flex;
      align-items: center;
      text-decoration: none;
    }

    .monogram-circle {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: var(--surf);
      box-shadow: var(--outs);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 7px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      overflow: hidden;
    }

    .nav-logo-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }

    .nav-monogram:hover .monogram-circle {
      transform: scale(1.08);
      box-shadow: var(--out), var(--glow);
    }

    .nav-links-bar {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      background: var(--surf);
      box-shadow: var(--outs);
      padding: 0.45rem 0.6rem;
      border-radius: 18px;
    }

    .nav-link {
      font-family: var(--font-sans);
      font-size: 0.75rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(218, 241, 222, 0.78);
      padding: 0.45rem 1.1rem;
      border-radius: 14px;
      transition: color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
      text-decoration: none;
    }

    .nav-link:hover {
      color: var(--c6);
    }

    .nav-link.active {
      color: var(--c5);
      box-shadow: var(--in);
      background-color: rgba(5, 31, 32, 0.5);
    }

    .nav-menu-toggle {
      display: none;
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      color: var(--c6);
      padding: 0.6rem 1.1rem;
      background: var(--surf);
      box-shadow: var(--outs);
      border-radius: 16px;
    }

    .mobile-drawer {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: var(--c1);
      z-index: 10001;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 2.5rem 2rem;
      transform: translateY(-100%);
      transition: transform 0.6s var(--ease-luxury);
    }

    .mobile-drawer.open {
      transform: translateY(0);
    }

    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--c3);
    }

    .drawer-brand-group {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .drawer-logo-img {
      width: 28px;
      height: 28px;
      object-fit: contain;
    }

    .drawer-title {
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      color: var(--c5);
    }

    .drawer-close-btn {
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      color: var(--c6);
      padding: 0.5rem 1rem;
      background: var(--surf);
      box-shadow: var(--outs);
      border-radius: 14px;
    }

    .drawer-links {
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      margin: auto 0;
    }

    .drawer-link {
      font-size: clamp(2rem, 7vw, 3.2rem);
      color: var(--c6);
      font-family: var(--font-serif);
      transition: color 0.3s ease, transform 0.3s ease;
    }

    .drawer-link:hover {
      color: var(--c5);
      transform: translateX(10px);
    }

    .drawer-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.75rem;
      color: var(--c5);
      letter-spacing: 0.15em;
      padding-top: 1.5rem;
      border-top: 1px solid var(--c3);
    }

    /* ==========================================================================
       8. CHAPTER LAYOUT SYSTEM & 3D ZOOM PERSPECTIVE
       ========================================================================== */
    main#main-content {
      position: relative;
      z-index: 10;
      perspective: 1400px;
      perspective-origin: center center;
      transform-style: preserve-3d;
    }

    .chapter-wrap {
      min-height: 100vh;
      position: relative;
      transform-style: preserve-3d;
      will-change: transform, opacity;
    }

    .chapter-inner {
      width: 100%;
      min-height: 100vh;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      transform-style: preserve-3d;
      will-change: transform, opacity;
    }

    .section-container {
      max-width: 1320px;
      width: 100%;
      margin: 0 auto;
      padding: 7rem 2rem 5rem;
      position: relative;
      z-index: 10;
    }

    .section-header-editorial {
      margin-bottom: 4.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--c3);
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .section-mono-tag {
      font-size: 0.75rem;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: var(--c5);
    }

    .section-title-large {
      font-size: clamp(2.5rem, 6vw, 4.8rem);
      line-height: 1.05;
      font-weight: 400;
      color: var(--c6);
      letter-spacing: -0.02em;
    }

    .section-subheading {
      font-size: clamp(1rem, 1.8vw, 1.35rem);
      font-style: italic;
      color: var(--c5);
      font-weight: 400;
    }

    /* ==========================================================================
       9. CHAPTER 1: HOME (HERO) — NAME NEVER TOUCHES PHOTO
       ========================================================================== */
    #home.chapter-wrap {
      height: 100vh;
      min-height: 620px;
      background: transparent;
      overflow: hidden;
    }

    .hero-stage {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hero-emerald-glow {
      position: absolute;
      top: 52%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: clamp(480px, 60vw, 920px);
      height: clamp(480px, 60vw, 920px);
      border-radius: 50%;
      background: radial-gradient(circle, rgba(35, 83, 71, 0.75) 0%, rgba(11, 43, 38, 0.45) 45%, transparent 72%);
      pointer-events: none;
      z-index: 2;
      filter: blur(80px);
    }

    .hero-bg-words {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      z-index: 3;
      user-select: none;
      line-height: 0.85;
      opacity: 0.035;
      font-family: var(--font-serif);
      font-size: clamp(9rem, 30vw, 28rem);
      font-weight: 700;
      color: var(--c6);
      letter-spacing: -0.04em;
    }

    .hero-bg-line2 {
      margin-left: 8vw;
    }

    .hero-name-wrap {
      position: absolute;
      top: 12vh;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      text-align: center;
      z-index: 7;
      pointer-events: none;
      padding: 0 1rem;
    }

    .hero-name-title {
      font-family: var(--font-serif);
      font-size: min(9.6vw, 15vh);
      line-height: 0.95;
      font-weight: 400;
      color: var(--c6);
      letter-spacing: -0.02em;
      white-space: nowrap;
      text-transform: uppercase;
      margin: 0 auto;
    }

    .char-reveal {
      display: inline-block;
      overflow: hidden;
      vertical-align: bottom;
    }

    .char-inner {
      display: inline-block;
      transform: translateY(115%);
      will-change: transform;
    }

    .hero-portrait-mono {
      position: absolute;
      bottom: 0;
      right: 14vw;
      height: 72vh;
      max-height: 820px;
      pointer-events: none;
      z-index: 4;
      opacity: 0.20;
      mix-blend-mode: screen;
      filter: grayscale(100%) contrast(150%);
      will-change: transform, opacity;
    }

    .hero-portrait-mono img {
      height: 100%;
      width: auto;
      object-fit: contain;
      object-position: bottom right;
    }

    .hero-portrait-foreground {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 68vh;
      max-height: 780px;
      z-index: 5;
      pointer-events: none;
      filter: drop-shadow(0 20px 45px rgba(2, 12, 12, 0.95));
      clip-path: inset(100% 0 0 0);
      will-change: transform, clip-path;
    }

    .hero-portrait-foreground img {
      height: 100%;
      width: auto;
      object-fit: contain;
      object-position: bottom center;
    }

    .hero-bottom-left {
      position: absolute;
      bottom: 2.8rem;
      left: 3rem;
      z-index: 10;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    .hero-intro-mono {
      font-size: 0.75rem;
      letter-spacing: 0.22em;
      color: var(--c5);
      text-transform: uppercase;
    }

    .hero-loc-mono {
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      color: rgba(218, 241, 222, 0.7);
      text-transform: uppercase;
    }

    .hero-role-serif {
      font-family: var(--font-serif);
      font-size: 1.35rem;
      font-style: italic;
      color: var(--c6);
      letter-spacing: 0.02em;
    }

    .hero-bottom-right {
      position: absolute;
      bottom: 2.8rem;
      right: 3rem;
      max-width: 440px;
      z-index: 10;
      display: flex;
      flex-direction: column;
      gap: 1.3rem;
      text-align: left;
    }

    .hero-statement-text {
      font-size: 0.95rem;
      line-height: 1.6;
      color: rgba(218, 241, 222, 0.85);
      font-weight: 300;
    }

    .hero-actions {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      flex-wrap: wrap;
    }

    .hero-vertical-edge-text {
      position: absolute;
      right: 2rem;
      top: 50%;
      transform: translateY(-50%) rotate(90deg);
      transform-origin: center center;
      z-index: 10;
      font-size: 0.68rem;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: rgba(142, 182, 155, 0.65);
      white-space: nowrap;
      pointer-events: none;
    }

    .hero-scroll-indicator {
      position: absolute;
      bottom: 1.8rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      opacity: 0.85;
      transition: opacity 0.3s ease;
    }

    .hero-scroll-indicator:hover {
      opacity: 1;
    }

    .scroll-line-loop {
      width: 1px;
      height: 38px;
      background: var(--c3);
      position: relative;
      overflow: hidden;
    }

    .scroll-line-bar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 50%;
      background: var(--c5);
      animation: scrollLineDrop 2s infinite ease-in-out;
    }

    @keyframes scrollLineDrop {
      0% { transform: translateY(-100%); }
      50% { transform: translateY(100%); }
      100% { transform: translateY(200%); }
    }

    /* ==========================================================================
       10. CHAPTER 2: ABOUT — PORTRAIT OVERLAPPING GLASS LIQUID BOX
       ========================================================================== */
    #about.chapter-wrap {
      background: linear-gradient(180deg, rgba(11, 43, 38, 0.72) 0%, rgba(22, 56, 50, 0.65) 100%);
      border-top: 1px solid var(--c3);
    }

    .about-grid {
      display: grid;
      grid-template-columns: 5.2fr 6.8fr;
      gap: 5rem;
      align-items: center;
    }

    .about-visual-col {
      position: relative;
      perspective: 1000px;
      display: flex;
      justify-content: center;
    }

    .about-composition-wrap {
      position: relative;
      max-width: 440px;
      width: 100%;
      height: 530px;
      transform-style: preserve-3d;
    }

    /* Glass Liquid Box: sits from bottom: 0 to height: 400px */
    .glass-liquid-box {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 400px;
      border-radius: 34px;
      background: linear-gradient(145deg, rgba(35, 83, 71, 0.5) 0%, rgba(11, 43, 38, 0.75) 45%, rgba(5, 31, 32, 0.94) 100%);
      backdrop-filter: blur(28px) saturate(180%);
      -webkit-backdrop-filter: blur(28px) saturate(180%);
      border: 1.5px solid rgba(142, 182, 155, 0.32);
      border-top: 2.5px solid rgba(218, 241, 222, 0.65);
      border-left: 1.5px solid rgba(218, 241, 222, 0.45);
      box-shadow: 18px 24px 45px rgba(2, 12, 12, 0.88),
                  -10px -10px 28px rgba(35, 83, 71, 0.35),
                  0 0 42px rgba(35, 83, 71, 0.38);
      overflow: hidden;
      z-index: 2;
      transform: translateZ(10px);
    }

    .glass-liquid-glow {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 280px;
      height: 280px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(142, 182, 155, 0.32) 0%, rgba(35, 83, 71, 0.5) 45%, transparent 75%);
      filter: blur(36px);
      pointer-events: none;
    }

    .glass-liquid-reflection {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 48%;
      background: linear-gradient(180deg, rgba(218, 241, 222, 0.22) 0%, rgba(218, 241, 222, 0.05) 50%, transparent 100%);
      border-radius: 34px 34px 0 0;
      pointer-events: none;
    }

    .glass-liquid-footer {
      position: absolute;
      bottom: 1.4rem;
      left: 1.8rem;
      right: 1.8rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.72rem;
      letter-spacing: 0.22em;
      color: var(--c5);
      opacity: 0.9;
      border-top: 1px solid rgba(142, 182, 155, 0.22);
      padding-top: 0.8rem;
      z-index: 5;
    }

    /* Portrait Cutout Overlapping the Glass Liquid Box in Front */
    .about-portrait-overlap {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) translateZ(45px);
      width: 100%;
      height: 520px; /* Rises 120px above the 400px glass box */
      z-index: 10;
      pointer-events: none;
      filter: drop-shadow(0 22px 35px rgba(2, 12, 12, 0.96)) drop-shadow(0 8px 16px rgba(5, 31, 32, 0.88));
      -webkit-mask-image: linear-gradient(to bottom, black 88%, transparent 100%);
      mask-image: linear-gradient(to bottom, black 88%, transparent 100%);
      transition: transform 0.6s var(--ease-luxury);
    }

    .about-portrait-overlap img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: bottom center;
      display: block;
    }
      object-position: bottom center;
    }

    .about-text-col {
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
    }

    .about-lead-copy {
      font-size: clamp(1.15rem, 1.8vw, 1.45rem);
      line-height: 1.55;
      font-weight: 300;
      color: var(--c6);
    }

    .about-body-copy {
      font-size: 0.98rem;
      line-height: 1.7;
      color: rgba(218, 241, 222, 0.82);
      font-weight: 300;
    }

    .about-education-card {
      background: var(--surf);
      box-shadow: var(--out);
      border-radius: 22px;
      padding: 1.8rem 2.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      margin-top: 0.6rem;
    }

    .edu-label-mono {
      font-size: 0.72rem;
      letter-spacing: 0.22em;
      color: var(--c5);
      text-transform: uppercase;
    }

    .edu-title {
      font-family: var(--font-serif);
      font-size: 1.28rem;
      color: var(--c6);
      font-weight: 500;
    }

    .edu-meta {
      font-size: 0.85rem;
      letter-spacing: 0.08em;
      color: var(--c5);
    }

    .about-quote-box {
      margin-top: 0.6rem;
      padding: 1.2rem 1.6rem;
      background: rgba(11, 43, 38, 0.45);
      border-left: 2px solid var(--c5);
      border-radius: 4px;
    }

    .about-quote-text {
      font-family: var(--font-serif);
      font-style: italic;
      font-size: 1.2rem;
      color: var(--c5);
      line-height: 1.4;
    }

    /* ==========================================================================
       11. CHAPTER 3: WORK (Neomorphic 30px Frames & Inset Chips)
       ========================================================================== */
    #work.chapter-wrap {
      background: linear-gradient(180deg, rgba(5, 31, 32, 0.78) 0%, rgba(11, 43, 38, 0.68) 100%);
      border-top: 1px solid var(--c3);
    }

    .projects-list {
      display: flex;
      flex-direction: column;
      gap: 8rem;
    }

    .project-card {
      display: grid;
      grid-template-columns: 7fr 5fr;
      gap: 4.5rem;
      align-items: center;
      perspective: 1200px;
      transform-style: preserve-3d;
    }

    .project-card.is-reversed {
      grid-template-columns: 5fr 7fr;
    }

    .project-card.is-reversed .project-preview-wrap {
      order: 2;
    }

    .project-card.is-reversed .project-content-col {
      order: 1;
    }

    .project-preview-wrap {
      position: relative;
      width: 100%;
      border-radius: 30px;
      overflow: hidden;
      background: var(--surf);
      box-shadow: var(--out);
      cursor: pointer;
      display: block;
      transition: transform 0.6s var(--ease-luxury), box-shadow 0.4s ease;
      clip-path: inset(0 100% 0 0);
      transform-style: preserve-3d;
    }

    .aspect-16-10 {
      aspect-ratio: 16 / 10;
    }

    .aspect-1-1 {
      aspect-ratio: 1 / 1;
      max-height: 540px;
    }

    .project-index-badge {
      position: absolute;
      top: 1.2rem;
      left: 1.2rem;
      z-index: 10;
      font-size: 0.72rem;
      letter-spacing: 0.2em;
      color: var(--c5);
      background: rgba(5, 31, 32, 0.75);
      box-shadow: var(--outs);
      padding: 0.3rem 0.7rem;
      border-radius: 12px;
      backdrop-filter: blur(8px);
    }

    .project-preview-svg {
      width: 100%;
      height: 100%;
      display: block;
      transition: transform 0.7s var(--ease-luxury);
    }

    .project-preview-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, rgba(142, 182, 155, 0.2) 0%, rgba(35, 83, 71, 0.45) 100%);
      mix-blend-mode: soft-light;
      opacity: 0;
      transition: opacity 0.5s ease;
      pointer-events: none;
    }

    .project-preview-wrap:hover {
      box-shadow: 12px 12px 32px rgba(2, 12, 12, 0.85), -8px -8px 24px rgba(35, 83, 71, 0.35), var(--glow);
      transform: translateZ(28px);
    }

    .project-preview-wrap:hover .project-preview-svg {
      transform: scale(1.07);
    }

    .project-preview-wrap:hover .project-preview-overlay {
      opacity: 1;
    }

    /* ==========================================================================
       PROJECT FRAMES: SKEUOMORPHIC, NEUMORPHIC & GLASSMORPHIC BOUNDARIES
       ========================================================================== */
    /* 1. SKEUOMORPHIC PROJECT FRAME (ROYAL FOODS) */
    .frame-skeuomorphic {
      background: linear-gradient(155deg, #18423b 0%, #0c2b26 45%, #061e1b 100%) !important;
      border: 2px solid rgba(35, 83, 71, 0.75) !important;
      border-radius: 26px !important;
      box-shadow: 
        0 1px 0 rgba(218, 241, 222, 0.3) inset,
        0 -2px 0 rgba(0, 0, 0, 0.9) inset,
        0 20px 45px rgba(2, 12, 12, 0.9),
        0 35px 70px rgba(0, 0, 0, 0.75) !important;
      padding: 1.3rem !important;
      box-sizing: border-box !important;
      position: relative !important;
    }

    .frame-screw {
      position: absolute;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #8EB69B 0%, #235347 45%, #0B2B26 85%, #051F20 100%);
      box-shadow: 
        0 2px 4px rgba(0, 0, 0, 0.75),
        inset 0 1px 1.5px rgba(218, 241, 222, 0.5);
      z-index: 12;
    }

    .frame-screw::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 7px;
      height: 1.5px;
      background: #041412;
      box-shadow: 0 1px 0 rgba(218, 241, 222, 0.25);
      transform: translate(-50%, -50%) rotate(42deg);
    }
    .frame-screw::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1.5px;
      height: 7px;
      background: #041412;
      box-shadow: 1px 0 0 rgba(218, 241, 222, 0.25);
      transform: translate(-50%, -50%) rotate(42deg);
    }

    .frame-screw.screw-tl { top: 12px; left: 12px; }
    .frame-screw.screw-tr { top: 12px; right: 12px; }
    .frame-screw.screw-bl { bottom: 12px; left: 12px; }
    .frame-screw.screw-br { bottom: 12px; right: 12px; }

    .frame-inner-well {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: inset 0 8px 22px rgba(0, 0, 0, 0.92);
      border: 1px solid rgba(11, 43, 38, 0.85);
    }

    .frame-glare {
      position: absolute;
      inset: -50%;
      background: linear-gradient(135deg, rgba(218, 241, 222, 0.22) 0%, rgba(142, 182, 155, 0.05) 35%, transparent 55%);
      pointer-events: none;
      opacity: 0.55;
    }

    /* 2. NEUMORPHIC PROJECT FRAME (ZAFFRAN) */
    .frame-neumorphic {
      background: var(--surf) !important;
      border: none !important;
      border-radius: 34px !important;
      box-shadow: 
        18px 18px 40px rgba(2, 12, 12, 0.85),
        -12px -12px 32px rgba(35, 83, 71, 0.32),
        inset 1px 1px 1px rgba(218, 241, 222, 0.08) !important;
      padding: 1.35rem !important;
      box-sizing: border-box !important;
      position: relative !important;
    }

    .neu-frame-inner-well {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 22px;
      overflow: hidden;
      box-shadow: 
        inset 8px 8px 20px rgba(2, 12, 12, 0.88),
        inset -8px -8px 20px rgba(35, 83, 71, 0.28);
    }

    /* 3. GLASSMORPHIC PROJECT FRAME (AEGIS PLATFORM) */
    .frame-glassmorphic {
      background: linear-gradient(135deg, rgba(22, 56, 50, 0.45) 0%, rgba(11, 43, 38, 0.25) 100%) !important;
      backdrop-filter: blur(24px) saturate(160%) !important;
      -webkit-backdrop-filter: blur(24px) saturate(160%) !important;
      border: 1.5px solid rgba(218, 241, 222, 0.32) !important;
      border-radius: 28px !important;
      box-shadow: 
        0 24px 50px rgba(2, 12, 12, 0.75),
        inset 0 1.5px 2px rgba(218, 241, 222, 0.4),
        0 0 32px rgba(142, 182, 155, 0.18) !important;
      padding: 1.2rem !important;
      box-sizing: border-box !important;
      position: relative !important;
      overflow: hidden !important;
    }

    .glass-frame-inner {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 18px;
      overflow: hidden;
      border: 1px solid rgba(218, 241, 222, 0.14);
    }

    .glass-specular-streak {
      position: absolute;
      top: 0;
      left: -60%;
      width: 50%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(218, 241, 222, 0.18), transparent);
      transform: skewX(-25deg);
      pointer-events: none;
      animation: glass-streak 6s infinite ease-in-out;
    }

    @keyframes glass-streak {
      0%, 100% { left: -60%; opacity: 0; }
      20% { opacity: 0.8; }
      50% { left: 140%; opacity: 0; }
    }

    /* 4. TACTICAL SKEUOMORPHIC HUD FRAME (RESQLINK) */
    .frame-tactical {
      background: linear-gradient(165deg, #071f1c 0%, #0e2e28 50%, #08211d 100%) !important;
      border: 2px solid rgba(35, 83, 71, 0.85) !important;
      border-radius: 24px !important;
      box-shadow: 
        0 1px 0 rgba(218, 241, 222, 0.25) inset,
        0 -2px 0 rgba(0, 0, 0, 0.9) inset,
        0 22px 48px rgba(2, 12, 12, 0.9) !important;
      padding: 2.4rem 1.2rem 1.2rem !important;
      box-sizing: border-box !important;
      position: relative !important;
    }

    .frame-bracket {
      position: absolute;
      width: 18px;
      height: 18px;
      border-color: #8EB69B;
      border-style: solid;
      pointer-events: none;
      z-index: 12;
      opacity: 0.85;
    }
    .bracket-tl { top: 8px; left: 8px; border-width: 2.5px 0 0 2.5px; border-top-left-radius: 4px; }
    .bracket-tr { top: 8px; right: 8px; border-width: 2.5px 2.5px 0 0; border-top-right-radius: 4px; }
    .bracket-bl { bottom: 8px; left: 8px; border-width: 0 0 2.5px 2.5px; border-bottom-left-radius: 4px; }
    .bracket-br { bottom: 8px; right: 8px; border-width: 0 2.5px 2.5px 0; border-bottom-right-radius: 4px; }

    .tactical-header-bezel {
      position: absolute;
      top: 8px;
      left: 36px;
      right: 36px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.62rem;
      letter-spacing: 0.2em;
      color: var(--c5);
      text-transform: uppercase;
      z-index: 11;
    }

    .tactical-led {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--c6);
      box-shadow: 0 0 8px var(--c6), 0 0 14px var(--c5);
      animation: neu-pulse 1.8s infinite ease-in-out;
    }

    .tactical-screen-well {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: inset 0 10px 24px rgba(0, 0, 0, 0.95);
      border: 1px solid rgba(35, 83, 71, 0.6);
    }

    /* Style Tag Badges on Frames */
    .frame-style-badge {
      position: absolute;
      top: 1.1rem;
      right: 1.3rem;
      z-index: 11;
      font-size: 0.62rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--c6);
      background: rgba(5, 31, 32, 0.85);
      padding: 0.3rem 0.65rem;
      border-radius: 10px;
      border: 1px solid rgba(142, 182, 155, 0.35);
      backdrop-filter: blur(8px);
    }

    .project-content-col {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      transform-style: preserve-3d;
    }

    .project-category-mono {
      font-size: 0.72rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--c5);
    }

    .project-title-link {
      display: inline-flex;
      align-items: center;
      gap: 0.8rem;
      color: var(--c6);
      text-decoration: none;
    }

    .project-title {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 3.5vw, 3.2rem);
      font-weight: 400;
      line-height: 1.1;
      letter-spacing: -0.01em;
      transition: transform 0.35s var(--ease-luxury), color 0.3s ease;
    }

    .project-arrow-icon {
      width: 22px;
      height: 22px;
      opacity: 0;
      transform: translate(-8px, 8px);
      transition: opacity 0.35s ease, transform 0.35s var(--ease-luxury);
      color: var(--c5);
    }

    .project-card:hover .project-title {
      transform: translateX(10px);
      color: #ffffff;
    }

    .project-card:hover .project-arrow-icon {
      opacity: 1;
      transform: translate(0, 0);
    }

    .project-desc {
      font-size: 0.95rem;
      line-height: 1.65;
      color: rgba(218, 241, 222, 0.82);
      font-weight: 300;
    }

    .project-concepts {
      font-size: 0.78rem;
      letter-spacing: 0.08em;
      color: var(--c5);
      line-height: 1.6;
      padding: 0.6rem 0;
      border-top: 1px dashed var(--c3);
      border-bottom: 1px dashed var(--c3);
    }

    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
    }

    .tech-tag-chip {
      font-size: 0.7rem;
      letter-spacing: 0.12em;
      color: var(--c6);
      background-color: #062222;
      box-shadow: var(--in);
      padding: 0.35rem 0.8rem;
      border-radius: 12px;
    }

    .project-links {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      padding-top: 0.5rem;
    }

    .project-link-item {
      font-size: 0.75rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--c5);
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      transition: color 0.25s ease;
    }

    .project-link-item:hover {
      color: var(--c6);
    }

    .projects-footer-row {
      margin-top: 5rem;
      padding-top: 2rem;
      border-top: 1px solid var(--c3);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1.5rem;
    }

    .more-way-text {
      font-size: 0.85rem;
      letter-spacing: 0.16em;
      color: var(--c5);
      text-transform: uppercase;
    }

    .github-all-link {
      font-size: 0.8rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--c6);
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.2rem;
      background: var(--surf);
      box-shadow: var(--outs);
      border-radius: 16px;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }

    .github-all-link:hover {
      transform: translateY(-2px);
      box-shadow: var(--out);
    }

    /* ==========================================================================
       12. CHAPTER 4: EXPERTISE (Four 30px Neomorphic Cards, Middle-Aligned Tools)
       ========================================================================== */
    #expertise.chapter-wrap {
      background: linear-gradient(180deg, rgba(5, 31, 32, 0.78) 0%, rgba(11, 43, 38, 0.82) 100%);
      border-top: 1px solid var(--c3);
    }

    .expertise-cards {
      display: flex;
      flex-direction: column;
      gap: 2.4rem;
    }

    /* Neomorphic Category Cards (30px radius, raised) with harmonious middle-aligned layout */
    .expertise-card {
      background: var(--surf);
      box-shadow: var(--out);
      border-radius: 30px;
      padding: 2.4rem 3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 1.5rem;
    }

    .expertise-category-label {
      font-size: 0.85rem;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: var(--c5);
      font-weight: 500;
      text-align: center;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 1.2rem;
      padding-bottom: 0.6rem;
      border-bottom: 1px solid rgba(142, 182, 155, 0.18);
      width: 100%;
      max-width: 460px;
    }

    /* Subgrid for Programming and Development tools side-by-side */
    .expertise-cards-subgrid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.2rem;
      width: 100%;
    }

    /* Middle-aligned tools container */
    .expertise-tiles-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1.1rem 1.3rem;
      align-items: center;
      justify-content: center; /* Symmetrically middle aligned */
      width: 100%;
    }

    /* Tool Tile: Perfectly middle-aligned text horizontally and vertically */
    .tool-tile {
      background: var(--surf);
      box-shadow: var(--outs);
      border-radius: 18px;
      padding: 0.9rem 2rem;
      min-width: 135px;
      font-family: var(--font-serif);
      font-size: 1.18rem;
      color: var(--c6);
      cursor: pointer;
      user-select: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      line-height: 1.2;
      vertical-align: middle;
      border: none;
      outline: none;
      transition: transform 0.25s var(--ease-luxury), box-shadow 0.25s ease, color 0.25s ease;
    }

    .tool-tile:hover, .tool-tile:focus {
      box-shadow: var(--in), var(--glow);
      color: var(--c5);
      transform: translateY(-2px);
    }

    .tool-tile:active {
      transform: scale(0.96);
      box-shadow: var(--in);
    }



    /* Centered Inset Telemetry Note */
    .expertise-live-note {
      margin-top: 2.8rem;
      min-height: 3.2rem;
      padding: 1.1rem 2rem;
      background-color: #051F20;
      box-shadow: var(--in);
      border-radius: 18px;
      font-size: 0.9rem;
      letter-spacing: 0.08em;
      color: var(--c6);
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .expertise-footer-meta {
      margin-top: 3.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }

    .expertise-level-mono {
      font-size: 0.75rem;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: var(--c5);
    }

    .expertise-closing-serif {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 5vw, 4.2rem);
      color: var(--c6);
      font-weight: 400;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    /* ==========================================================================
       13. CHAPTER 5: CONTACT & FOOTER (Inset Email Plate, Raised Buttons)
       ========================================================================== */
    #contact.chapter-wrap {
      background: radial-gradient(circle at 50% 40%, rgba(35, 83, 71, 0.45) 0%, rgba(5, 31, 32, 0.82) 75%);
      border-top: 1px solid var(--c3);
      text-align: center;
    }

    .contact-container {
      max-width: 960px;
      margin: 0 auto;
      padding: 8rem 2rem 5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2.2rem;
      position: relative;
      z-index: 10;
    }

    .contact-mono-tag {
      font-size: 0.75rem;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: var(--c5);
    }

    .contact-hero-serif {
      font-family: var(--font-serif);
      font-size: clamp(2.6rem, 6.5vw, 5.2rem);
      line-height: 1.05;
      font-weight: 400;
      color: var(--c6);
      letter-spacing: -0.02em;
    }

    .contact-sub-serif {
      font-family: var(--font-serif);
      font-style: italic;
      font-size: clamp(1.2rem, 2.2vw, 1.8rem);
      color: var(--c5);
      font-weight: 300;
    }

    .contact-email-plate {
      background-color: #051F20;
      box-shadow: var(--in);
      padding: 1rem 2.2rem;
      border-radius: 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: box-shadow 0.3s ease;
    }

    .contact-email-plate:hover {
      box-shadow: var(--in), var(--glow);
    }

    .contact-email-link {
      font-family: var(--font-serif);
      font-size: clamp(1.2rem, 2.6vw, 2.1rem);
      color: var(--c6);
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .contact-email-link:hover {
      color: var(--c5);
    }

    .contact-social-buttons {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-top: 0.5rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .social-btn {
      font-size: 0.8rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--c6);
      background: var(--surf);
      box-shadow: var(--outs);
      padding: 0.85rem 1.8rem;
      border-radius: 16px;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: transform 0.25s var(--ease-luxury), box-shadow 0.25s ease;
      text-decoration: none;
    }

    .social-btn:hover {
      transform: translateY(-2px);
      box-shadow: var(--out);
      color: var(--c5);
    }

    /* ==========================================================================
       DIRECT CONNECT DUAL SHOWCASE (SKEUOMORPHIC & NEUMORPHIC CARDS IN ONE LINE)
       ========================================================================== */
    .direct-connect-grid {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: stretch;
      gap: 2rem;
      width: 100%;
      max-width: 960px;
      margin-top: 3.5rem;
      position: relative;
      flex-wrap: nowrap;
      box-sizing: border-box;
    }

    /* SKEUOMORPHIC CARD WRAPPER */
    .skeuo-card-wrap {
      flex: 1 1 0;
      width: 50%;
      max-width: 440px;
      min-width: 0;
      display: flex;
      flex-direction: column;
      perspective: 1200px;
      position: relative;
    }

    /* NEUMORPHIC CARD WRAPPER */
    .neu-card-wrap {
      flex: 1 1 0;
      width: 50%;
      max-width: 440px;
      min-width: 0;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    @media (max-width: 760px) {
      .direct-connect-grid {
        flex-direction: column;
        align-items: center;
        gap: 2.5rem;
      }
      .skeuo-card-wrap,
      .neu-card-wrap {
        width: 100%;
        max-width: 380px;
      }
    }

    /* ==========================================================================
       NEUMORPHIC UI: WHATSAPP DIRECT LINE & COMMUNICATION HUB
       ========================================================================== */
    .neu-card-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      position: relative;
    }

    .neu-pass {
      position: relative;
      width: 100%;
      max-width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-radius: 28px;
      background: var(--surf);
      padding: 2.2rem 1.8rem 2rem;
      box-sizing: border-box;
      /* Soft-3D dual ambient neumorphic shadows */
      box-shadow: 
        14px 14px 32px rgba(2, 12, 12, 0.8),
        -10px -10px 28px rgba(35, 83, 71, 0.32),
        inset 1px 1px 1px rgba(218, 241, 222, 0.08);
      border: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: transform 0.3s var(--ease-luxury), box-shadow 0.3s ease;
      overflow: hidden;
    }

    .neu-pass:hover {
      transform: translateY(-4px);
      box-shadow: 
        18px 18px 40px rgba(2, 12, 12, 0.85),
        -12px -12px 34px rgba(35, 83, 71, 0.38),
        0 0 32px rgba(142, 182, 155, 0.15);
    }

    /* Soft Neumorphic Inset Badge Header */
    .neu-badge-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 1.4rem;
      padding: 0 0.3rem;
    }

    .neu-badge-title-group {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .neu-stamped-title {
      font-size: 0.68rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--c6);
    }

    .neu-stamped-sub {
      font-size: 0.6rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--c5);
      opacity: 0.85;
    }

    /* Neumorphic Soft Inset Status Pill */
    .neu-status-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.35rem 0.75rem;
      border-radius: 20px;
      background: var(--surf);
      box-shadow: var(--in);
    }

    .neu-status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--c5);
      box-shadow: 0 0 10px var(--c5), 0 0 18px rgba(142, 182, 155, 0.6);
      animation: neu-pulse 2.2s infinite ease-in-out;
    }

    @keyframes neu-pulse {
      0%, 100% { opacity: 0.8; transform: scale(0.95); }
      50% { opacity: 1; transform: scale(1.1); box-shadow: 0 0 14px var(--c6), 0 0 24px rgba(218, 241, 222, 0.8); }
    }

    .neu-status-text {
      font-size: 0.58rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--c6);
    }

    /* Neumorphic Inset Well for QR Code */
    .neu-qr-well {
      position: relative;
      width: 100%;
      background: var(--surf);
      border-radius: 22px;
      padding: 1.25rem;
      box-sizing: border-box;
      box-shadow: 
        inset 8px 8px 18px rgba(2, 12, 12, 0.85),
        inset -8px -8px 18px rgba(35, 83, 71, 0.3);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.3rem;
    }

    .neu-qr-card-surface {
      width: 100%;
      max-width: 220px;
      border-radius: 16px;
      background: #ffffff;
      padding: 0.85rem;
      box-sizing: border-box;
      box-shadow: 0 10px 24px rgba(2, 12, 12, 0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    .neu-qr-canvas-holder {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .neu-qr-canvas-holder canvas,
    .neu-qr-canvas-holder img {
      display: block;
      width: 100% !important;
      height: auto !important;
      max-width: 190px;
      border-radius: 8px;
    }

    /* Center WhatsApp Emblem Overlay on QR */
    .neu-qr-center-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 38px;
      height: 38px;
      background: #235347;
      border: 3px solid #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
      color: #DAF1DE;
      z-index: 2;
    }

    /* Neumorphic Soft Inset Phone Plate */
    .neu-phone-plate {
      width: 100%;
      border-radius: 16px;
      background: var(--surf);
      box-shadow: var(--in);
      padding: 0.85rem 1rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      margin-bottom: 1.25rem;
    }

    .neu-phone-number {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--c6);
      text-decoration: none;
      transition: color 0.25s ease;
    }

    .neu-phone-number:hover {
      color: var(--c5);
    }

    .neu-phone-sub {
      font-size: 0.62rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--c5);
      opacity: 0.85;
    }

    /* Neumorphic Primary Mint Button */
    .neu-action-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.65rem;
      width: 100%;
      padding: 0.95rem 1.4rem;
      border-radius: 16px;
      background: linear-gradient(145deg, #eafaed, #b9d7c1);
      color: #051F20;
      font-family: 'DM Sans', sans-serif;
      font-weight: 700;
      font-size: 0.88rem;
      letter-spacing: 0.06em;
      text-decoration: none;
      box-shadow: 
        8px 8px 18px rgba(2, 12, 12, 0.6),
        -5px -5px 14px rgba(35, 83, 71, 0.35),
        var(--glow);
      transform: translateY(0);
      transition: transform 0.25s var(--ease-luxury), box-shadow 0.25s ease;
      cursor: pointer;
    }

    .neu-action-btn:hover {
      transform: translateY(-3px);
      box-shadow: 
        12px 12px 24px rgba(2, 12, 12, 0.7),
        -6px -6px 18px rgba(35, 83, 71, 0.42),
        0 0 32px rgba(142, 182, 155, 0.35);
    }

    .neu-action-btn:active {
      transform: translateY(1px);
      box-shadow: 
        inset 4px 4px 8px rgba(2, 12, 12, 0.6),
        inset -4px -4px 8px rgba(255, 255, 255, 0.45);
    }

    .neu-action-btn svg {
      transition: transform 0.25s ease;
    }

    .neu-action-btn:hover svg {
      transform: scale(1.1);
    }

    .skeuo-pass {
      position: relative;
      width: 100%;
      max-width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-radius: 26px;
      background: linear-gradient(155deg, #18423b 0%, #0c2b26 40%, #061e1b 100%);
      padding: 2.2rem 1.8rem 2rem;
      box-sizing: border-box;
      box-shadow: 
        0 1px 0 rgba(218, 241, 222, 0.28) inset,
        0 -2px 0 rgba(0, 0, 0, 0.85) inset,
        1px 0 0 rgba(218, 241, 222, 0.12) inset,
        -1px 0 0 rgba(0, 0, 0, 0.6) inset,
        0 25px 50px -12px rgba(2, 12, 12, 0.9),
        0 45px 85px -20px rgba(0, 0, 0, 0.75);
      border: 1px solid rgba(35, 83, 71, 0.45);
      transform-style: preserve-3d;
      transition: box-shadow 0.3s ease;
      will-change: transform;
      user-select: none;
      overflow: hidden;
    }

    /* Metallic Brushed Surface Micro-Texture */
    .skeuo-pass::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 26px;
      background: repeating-linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.012) 0px,
        rgba(255, 255, 255, 0.012) 1px,
        transparent 1px,
        transparent 3px
      );
      pointer-events: none;
      opacity: 0.65;
    }

    /* 4 Corner Fastening Screws */
    .skeuo-screw {
      position: absolute;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #8EB69B 0%, #235347 45%, #0B2B26 85%, #051F20 100%);
      box-shadow: 
        0 2px 4px rgba(0, 0, 0, 0.75),
        inset 0 1px 1.5px rgba(218, 241, 222, 0.5),
        inset 0 -1px 1.5px rgba(0, 0, 0, 0.8);
      z-index: 5;
    }

    /* Screws driver cross slot */
    .skeuo-screw::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 8px;
      height: 1.5px;
      background: #041412;
      box-shadow: 0 1px 0 rgba(218, 241, 222, 0.25);
      transform: translate(-50%, -50%) rotate(38deg);
      border-radius: 1px;
    }
    .skeuo-screw::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1.5px;
      height: 8px;
      background: #041412;
      box-shadow: 1px 0 0 rgba(218, 241, 222, 0.25);
      transform: translate(-50%, -50%) rotate(38deg);
      border-radius: 1px;
    }

    .skeuo-screw.screw-tl { top: 14px; left: 14px; }
    .skeuo-screw.screw-tr { top: 14px; right: 14px; }
    .skeuo-screw.screw-bl { bottom: 14px; left: 14px; }
    .skeuo-screw.screw-br { bottom: 14px; right: 14px; }

    /* Top Punched Lanyard Slot */
    .skeuo-lanyard-slot {
      width: 62px;
      height: 12px;
      margin: 0 auto 1.4rem;
      border-radius: 6px;
      background: #031210;
      border: 1px solid rgba(22, 56, 50, 0.8);
      box-shadow: 
        inset 0 3px 5px rgba(0, 0, 0, 0.95),
        inset 0 1px 2px #000,
        0 1px 0 rgba(218, 241, 222, 0.25);
      position: relative;
    }

    /* Header Bar: Hardware LED & Stamped Title */
    .skeuo-badge-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.2rem;
      padding: 0 0.4rem;
    }

    .skeuo-badge-title-group {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .skeuo-stamped-title {
      font-size: 0.68rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      font-weight: 700;
      color: #0b2622;
      text-shadow: 0 1px 1px rgba(218, 241, 222, 0.24), 0 -1px 1px rgba(0, 0, 0, 0.8);
    }

    .skeuo-stamped-sub {
      font-size: 0.6rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--c5);
      opacity: 0.85;
    }

    /* Optical Glass Hardware LED */
    .skeuo-led-socket {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #081d1a;
      border: 1px solid rgba(35, 83, 71, 0.8);
      box-shadow: 
        inset 0 2px 4px rgba(0, 0, 0, 0.95),
        0 1px 0 rgba(218, 241, 222, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .skeuo-led-diode {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #DAF1DE 0%, #8EB69B 40%, #235347 85%);
      box-shadow: 
        0 0 8px #8EB69B,
        0 0 16px rgba(142, 182, 155, 0.7);
      animation: skeuo-diode-pulse 2.2s infinite ease-in-out;
    }

    @keyframes skeuo-diode-pulse {
      0%, 100% {
        opacity: 0.85;
        box-shadow: 0 0 6px #8EB69B, 0 0 14px rgba(142, 182, 155, 0.5);
      }
      50% {
        opacity: 1;
        box-shadow: 0 0 12px #DAF1DE, 0 0 22px rgba(218, 241, 222, 0.85);
      }
    }

    /* Recessed Chamber (Debossed QR Well) */
    .skeuo-qr-well {
      position: relative;
      background: linear-gradient(165deg, #051a17 0%, #092420 50%, #0f302b 100%);
      border-radius: 18px;
      padding: 1.25rem;
      box-shadow: 
        inset 0 8px 18px rgba(0, 0, 0, 0.92),
        inset 0 2px 6px rgba(0, 0, 0, 0.85),
        inset 0 -2px 3px rgba(218, 241, 222, 0.12),
        0 1px 0 rgba(218, 241, 222, 0.18);
      border: 1px solid rgba(8, 25, 23, 0.9);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Authentic Instagram & WhatsApp QR Card Surfaces */
    .skeuo-qr-card-img {
      display: block;
      width: 100%;
      max-width: 230px;
      border-radius: 14px;
      box-shadow: 
        0 12px 28px rgba(0, 0, 0, 0.7),
        0 3px 8px rgba(0, 0, 0, 0.5);
      transform: translateZ(20px);
      transition: transform 0.3s ease;
      background: #ffffff;
    }

    .skeuo-qr-card-surface {
      display: block;
      width: 100%;
      max-width: 230px;
      border-radius: 14px;
      background: #ffffff;
      padding: 0.85rem;
      box-sizing: border-box;
      box-shadow: 
        0 12px 28px rgba(0, 0, 0, 0.7),
        0 3px 8px rgba(0, 0, 0, 0.5);
      transform: translateZ(20px);
      transition: transform 0.3s ease;
      position: relative;
    }

    .skeuo-qr-canvas-holder {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .skeuo-qr-canvas-holder canvas,
    .skeuo-qr-canvas-holder img {
      display: block;
      width: 100% !important;
      height: auto !important;
      max-width: 190px;
      border-radius: 8px;
    }

    .skeuo-qr-center-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 38px;
      height: 38px;
      background: #235347;
      border: 3px solid #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
      color: #DAF1DE;
      z-index: 2;
    }

    /* Specular Acrylic Glare Reflection Sweep */
    .skeuo-glare {
      position: absolute;
      inset: -50%;
      background: linear-gradient(
        135deg,
        rgba(218, 241, 222, 0.26) 0%,
        rgba(142, 182, 155, 0.08) 35%,
        transparent 55%
      );
      pointer-events: none;
      transform: translate(-10%, -10%);
      opacity: 0.55;
      transition: opacity 0.3s ease;
    }

    /* Badge Handle & Details */
    .skeuo-pass-body {
      margin-top: 1.25rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.9rem;
      width: 100%;
    }

    .skeuo-handle-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .skeuo-handle-text {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--c6);
      letter-spacing: 0.04em;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
    }

    .skeuo-scan-hint {
      font-size: 0.68rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--c5);
      opacity: 0.9;
    }

    /* Tactile Mechanical Push Button */
    .skeuo-mech-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.65rem;
      width: 100%;
      padding: 0.95rem 1.4rem;
      border-radius: 14px;
      background: linear-gradient(180deg, #e4f7e8 0%, #b8dcbf 60%, #8eb69b 100%);
      color: #051F20;
      font-family: 'DM Sans', sans-serif;
      font-weight: 700;
      font-size: 0.88rem;
      letter-spacing: 0.06em;
      text-decoration: none;
      box-shadow: 
        0 1px 0 #ffffff inset,
        0 -1px 0 #7ca388 inset,
        0 5px 0 #1b453d,
        0 7px 2px rgba(0, 0, 0, 0.35),
        0 14px 22px rgba(0, 0, 0, 0.55);
      transform: translateY(0);
      transition: transform 0.1s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.1s cubic-bezier(0.2, 0.8, 0.2, 1);
      cursor: pointer;
    }

    .skeuo-mech-btn:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 1px 0 #ffffff inset,
        0 -1px 0 #7ca388 inset,
        0 7px 0 #1b453d,
        0 9px 3px rgba(0, 0, 0, 0.35),
        0 18px 26px rgba(0, 0, 0, 0.6);
    }

    .skeuo-mech-btn:active {
      transform: translateY(4px);
      box-shadow: 
        0 1px 0 #ffffff inset,
        0 -1px 0 #7ca388 inset,
        0 1px 0 #1b453d,
        0 2px 2px rgba(0, 0, 0, 0.4),
        0 5px 8px rgba(0, 0, 0, 0.45);
    }

    .skeuo-mech-btn svg {
      transition: transform 0.25s ease;
    }

    .skeuo-mech-btn:hover svg {
      transform: scale(1.1);
    }

    /* Site Footer */
    .site-footer {
      width: 100%;
      border-top: 1px solid var(--c3);
      padding: 3.5rem 2rem;
      margin-top: 5rem;
      background-color: var(--c1);
    }

    .footer-container {
      max-width: 1320px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1.5rem;
    }

    .footer-left {
      display: flex;
      align-items: center;
      gap: 1.1rem;
      text-align: left;
    }

    .footer-logo-wrap {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--surf);
      box-shadow: var(--outs);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      flex-shrink: 0;
    }

    .footer-logo-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }

    .footer-text-group {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .footer-name-serif {
      font-family: var(--font-serif);
      font-size: 1.25rem;
      color: var(--c6);
      font-weight: 500;
    }

    .footer-role-mono {
      font-size: 0.72rem;
      letter-spacing: 0.2em;
      color: var(--c5);
      text-transform: uppercase;
    }

    .footer-center-tagline {
      font-size: 0.8rem;
      letter-spacing: 0.14em;
      color: rgba(218, 241, 222, 0.6);
      text-transform: uppercase;
    }

    .footer-back-to-top {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: var(--surf);
      box-shadow: var(--outs);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--c6);
      transition: transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
    }

    .footer-back-to-top:hover {
      transform: translateY(-3px);
      box-shadow: var(--out), var(--glow);
      color: var(--c5);
    }

    /* ==========================================================================
       14. RESPONSIVE BREAKPOINTS (≤900px and ≤760px)
       ========================================================================== */
    @media (max-width: 900px) {
      .nav-links-bar {
        display: none;
      }
      .nav-menu-toggle {
        display: block;
      }

      .about-grid {
        grid-template-columns: 1fr;
        gap: 3.5rem;
      }

      .project-card, .project-card.is-reversed {
        grid-template-columns: 1fr;
        gap: 2.4rem;
      }

      .project-card.is-reversed .project-preview-wrap {
        order: 1;
      }

      .project-card.is-reversed .project-content-col {
        order: 2;
      }

      .expertise-card {
        padding: 2rem 1.6rem;
        gap: 1.2rem;
        text-align: center;
      }

      .expertise-cards-subgrid {
        grid-template-columns: 1fr;
        gap: 1.8rem;
      }

      .expertise-category-label {
        text-align: center;
        max-width: 100%;
      }

      .tool-tile {
        min-width: 110px;
        padding: 0.8rem 1.4rem;
        font-size: 1.05rem;
      }

      .hero-name-wrap {
        top: 13vh;
      }

      .hero-name-title {
        font-size: 22vw;
        line-height: 0.88;
        white-space: normal;
      }

      .hero-name-line {
        display: block;
      }

      .hero-portrait-foreground {
        height: 54vh;
      }

      .hero-portrait-mono {
        display: none;
      }

      .hero-bottom-left, .hero-vertical-edge-text {
        display: none !important;
      }

      .hero-bottom-right {
        left: 1.5rem;
        right: 1.5rem;
        bottom: 2rem;
        max-width: 100%;
      }

      .footer-container {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    @media (max-width: 760px) {
      #webgl-canvas {
        display: none !important;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
      #webgl-canvas {
        display: none !important;
      }
    }
  </style>
</head>
<body>

  <!-- Fine SVG feTurbulence Grain Overlay -->
  <div class="grain-overlay" aria-hidden="true"></div>

  <!-- Interactive 3D Three.js Canvas -->
  <canvas id="webgl-canvas" aria-hidden="true"></canvas>

  <!-- Scroll Progress Indicator -->
  <div id="scroll-progress" class="scroll-progress-line" aria-hidden="true"></div>

  <!-- Custom Cursor -->
  <div id="custom-cursor" aria-hidden="true"></div>

  <!-- Neomorphic Loader Overlay -->
  <div id="loader" class="loader-overlay" aria-hidden="true">
    <div class="loader-content">
      <div class="loader-logo-wrap">
        <img src="${logoImgUri}" alt="Jenit Jenson Logo" class="loader-logo-img" />
      </div>
      <div class="loader-monogram font-serif">Jenit Jenson</div>
      <div class="loader-track">
        <div id="loader-bar" class="loader-fill"></div>
      </div>
      <div id="loader-pct" class="loader-pct font-mono">0%</div>
    </div>
  </div>

  <!-- Fixed Top Navigation Bar (Two Groups Only) -->
  <header id="site-header" class="site-nav">
    <div class="nav-container">
      <!-- Group 1: Circular Raised Logo Monogram -->
      <a href="#home" class="nav-monogram" aria-label="Jenit Jenson — Home">
        <span class="monogram-circle">
          <img src="${logoImgUri}" alt="Jenit Jenson Logo" class="nav-logo-img" />
        </span>
      </a>

      <!-- Group 2: Raised Rounded Bar (18px radius) with Links -->
      <nav class="nav-links-bar" aria-label="Main Navigation">
        <a href="#home" class="nav-link active" data-nav="home">Home</a>
        <a href="#about" class="nav-link" data-nav="about">About</a>
        <a href="#work" class="nav-link" data-nav="work">Work</a>
        <a href="#expertise" class="nav-link" data-nav="expertise">Expertise</a>
        <a href="#contact" class="nav-link" data-nav="contact">Contact</a>
      </nav>

      <button id="menu-btn" class="nav-menu-toggle font-mono" aria-expanded="false" aria-label="Open Navigation Menu">
        MENU
      </button>
    </div>
  </header>

  <!-- Mobile Navigation Drawer -->
  <div id="mobile-drawer" class="mobile-drawer" aria-hidden="true">
    <div class="drawer-header">
      <div class="drawer-brand-group">
        <img src="${logoImgUri}" alt="Jenit Jenson Logo" class="drawer-logo-img" />
        <span class="drawer-title font-mono">NAVIGATION</span>
      </div>
      <button id="drawer-close" class="drawer-close-btn font-mono" aria-label="Close Navigation Menu">CLOSE</button>
    </div>
    <div class="drawer-links">
      <a href="#home" class="drawer-link font-serif">01 Home</a>
      <a href="#about" class="drawer-link font-serif">02 About</a>
      <a href="#work" class="drawer-link font-serif">03 Work</a>
      <a href="#expertise" class="drawer-link font-serif">04 Expertise</a>
      <a href="#contact" class="drawer-link font-serif">05 Contact</a>
    </div>
    <div class="drawer-footer font-mono">
      <span>KERALA, INDIA</span>
      <span>UI DESIGNER</span>
    </div>
  </div>

  <!-- Main Five Chapters Wrapped for 3D Zoom -->
  <main id="main-content">

    <!-- ====================================================================
         CHAPTER 1: HOME (HERO) — Name entirely above the portrait
         ==================================================================== -->
    <section id="home" class="chapter-wrap" aria-label="Home Chapter">
      <div class="chapter-inner">
        <div class="hero-stage">
          <!-- Radial Emerald Glow Behind Portrait -->
          <div class="hero-emerald-glow" aria-hidden="true"></div>

          <!-- Giant Background Typography: JENIT / JENSON -->
          <div class="hero-bg-words" aria-hidden="true">
            <span class="hero-bg-line1">JENIT</span>
            <span class="hero-bg-line2">JENSON</span>
          </div>

          <!-- Name Heading: Placed at top: 12vh entirely above the portrait -->
          <div class="hero-name-wrap" id="hero-name-container">
            <h1 class="hero-name-title font-serif" id="hero-name-heading">
              <!-- Rendered per-character by JS -->
            </h1>
          </div>

          <!-- Monochromatic Cutout Behind (72vh tall, bottom-aligned, offset right, 20% opacity) -->
          <div class="hero-portrait-mono" aria-hidden="true">
            <img src="${heroImgUri}" alt="" />
          </div>

          <!-- Natural-Color Cutout Foreground (68vh tall, bottom-centered) -->
          <div class="hero-portrait-foreground" id="hero-portrait-fg">
            <img src="${heroImgUri}" alt="Jenit Jenson — UI Designer Portrait" />
          </div>

          <!-- Left Info: Intro line, Kerala, UI Designer -->
          <div class="hero-bottom-left" id="hero-bl">
            <span class="hero-intro-mono font-mono">Hello, I'm Jenit Jenson.</span>
            <span class="hero-loc-mono font-mono">Kerala, India</span>
            <span class="hero-role-serif font-serif">UI Designer</span>
          </div>

          <!-- Right Info: Statement & Action Buttons -->
          <div class="hero-bottom-right" id="hero-br">
            <p class="hero-statement-text font-sans">
              I build thoughtful digital experiences through clean engineering, creative design and modern web technologies.
            </p>
            <div class="hero-actions">
              <a href="#work" class="btn-primary">
                <span>Explore my work</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#contact" class="btn-secondary">
                <span>Let's connect</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
              </a>
            </div>
          </div>

          <!-- Vertical Edge Text -->
          <div class="hero-vertical-edge-text font-mono" id="hero-vertical-text" aria-hidden="true">
            Designing · Developing · Creating
          </div>

          <!-- Bottom-Center Scroll Indicator -->
          <div class="hero-scroll-indicator" id="hero-scroll-hint" onclick="lenisScrollTo('#about')" role="button" aria-label="Scroll to About section">
            <div class="scroll-line-loop">
              <div class="scroll-line-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ====================================================================
         CHAPTER 2: ABOUT — Portrait Overlapping Glass Liquid Box
         ==================================================================== -->
    <section id="about" class="chapter-wrap" aria-label="About Chapter">
      <div class="chapter-inner">
        <div class="section-container">
          <div class="section-header-editorial">
            <span class="section-mono-tag font-mono">About</span>
            <h2 class="section-title-large font-serif">The person behind the pixels.</h2>
          </div>

          <div class="about-grid">
            <!-- Left: Portrait overlapping the glass liquid box -->
            <div class="about-visual-col" id="about-visual-col">
              <div class="about-composition-wrap" id="about-card-3d">
                <!-- Liquid Glass Box Behind -->
                <div class="glass-liquid-box" id="about-liquid-glass">
                  <div class="glass-liquid-reflection"></div>
                  <div class="glass-liquid-glow"></div>
                  <div class="glass-liquid-footer font-mono">
                    <span>KERALA · IN</span>
                    <span>CSE · 3RD YEAR</span>
                  </div>
                </div>

                <!-- Portrait Cutout Image Overlapping the Glass Liquid Box in Front -->
                <div class="about-portrait-overlap" id="about-portrait-overlap">
                  <img src="${aboutImgUri}" alt="Jenit Jenson — Face and upper body portrait crop overlapping glass box" />
                </div>
              </div>
            </div>

            <!-- Right: Copy, Raised Education Card & Quote -->
            <div class="about-text-col">
              <p class="about-lead-copy font-sans">
                Hi, I'm Jenit Jenson, a B.Tech Computer Science Engineering student at Jyothi Engineering College and an aspiring UI Designer.
              </p>
              <p class="about-body-copy font-sans">
                I enjoy transforming ideas into meaningful digital experiences, combining thoughtful UI/UX design with modern web technologies.
              </p>
              <p class="about-body-copy font-sans">
                My interests include full-stack development, interactive interfaces, creative web experiences and building practical technology solutions.
              </p>

              <!-- Education as a raised neomorphic card (22px radius) -->
              <div class="about-education-card">
                <span class="edu-label-mono font-mono">Education</span>
                <div class="edu-title font-serif">B.Tech — Computer Science Engineering</div>
                <div class="edu-meta font-mono">Jyothi Engineering College · Currently in 3rd year</div>
              </div>

              <!-- Italic Sage Quote -->
              <div class="about-quote-box">
                <p class="about-quote-text font-serif">
                  &ldquo;Good design attracts. Great engineering makes it work.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ====================================================================
         CHAPTER 3: WORK (Rendered from JS Array P, Neomorphic 30px Frames)
         ==================================================================== -->
    <section id="work" class="chapter-wrap" aria-label="Selected Works Chapter">
      <div class="chapter-inner">
        <div class="section-container">
          <div class="section-header-editorial">
            <span class="section-mono-tag font-mono">Selected Works</span>
            <h2 class="section-title-large font-serif">Selected works.</h2>
            <p class="section-subheading font-serif">Some ideas deserve to become more than just ideas.</p>
          </div>

          <!-- Dynamic Projects Container Rendered from JS Array P -->
          <div class="projects-list" id="projects-container">
            <!-- Rendered by JavaScript below -->
          </div>

          <!-- Footer Row -->
          <div class="projects-footer-row">
            <span class="more-way-text font-mono">More projects are on the way</span>
            <a href="https://github.com/jenitjenson45-debug" target="_blank" rel="noopener" class="github-all-link font-mono">
              <span>See all repositories on GitHub</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ====================================================================
         CHAPTER 4: EXPERTISE (Middle-Aligned Neomorphic Tools)
         ==================================================================== -->
    <section id="expertise" class="chapter-wrap" aria-label="Expertise Chapter">
      <div class="chapter-inner">
        <div class="section-container">
          <div class="section-header-editorial">
            <span class="section-mono-tag font-mono">Expertise</span>
            <h2 class="section-title-large font-serif">Tools of the craft.</h2>
            <p class="section-subheading font-serif">Technology is the medium. Building meaningful experiences is the goal.</p>
          </div>

          <!-- Four Neomorphic Category Cards with Middle-Aligned Tool Tiles -->
          <div class="expertise-cards">
            <!-- Card 1: Graphic & UI design -->
            <div class="expertise-card">
              <span class="expertise-category-label font-mono">Graphic & UI design</span>
              <div class="expertise-tiles-grid">
                <button class="tool-tile" data-desc="Interface design, prototyping and design systems.">Figma</button>
                <button class="tool-tile" data-desc="Image editing and visual composition.">Photoshop</button>
                <button class="tool-tile" data-desc="Vector graphics, icons and logos.">Illustrator</button>
                <button class="tool-tile" data-desc="Quick graphics and social visuals.">Canva</button>
                <button class="tool-tile" data-desc="Visual website design and interactive prototypes.">Framer</button>
              </div>
            </div>

            <!-- Card 2: Frontend development -->
            <div class="expertise-card">
              <span class="expertise-category-label font-mono">Frontend development</span>
              <div class="expertise-tiles-grid">
                <button class="tool-tile" data-desc="Semantic document architecture, accessibility standards and modern markup patterns.">HTML</button>
                <button class="tool-tile" data-desc="Responsive systems, fluid typography, Flexbox, Grid and keyframe motion.">CSS</button>
                <button class="tool-tile" data-desc="Modern ES6+ syntax, asynchronous event loop, promises and DOM manipulation.">JavaScript</button>
                <button class="tool-tile" data-desc="Component architecture, custom reactive hooks and functional state orchestration.">React.js</button>
                <button class="tool-tile" data-desc="App Router, server and client components, optimized rendering and edge performance.">Next.js</button>
                <button class="tool-tile" data-desc="Static typing, type safety contracts, generic patterns and code predictability.">TypeScript</button>
              </div>
            </div>

            <!-- Side-by-side subgrid on desktop for Programming & Development tools -->
            <div class="expertise-cards-subgrid">
              <!-- Card 3: Programming -->
              <div class="expertise-card">
                <span class="expertise-category-label font-mono">Programming</span>
                <div class="expertise-tiles-grid">
                  <button class="tool-tile" data-desc="Core computer science fundamentals, memory management, pointers, and data structures.">C</button>
                </div>
              </div>

              <!-- Card 4: Development tools -->
              <div class="expertise-card">
                <span class="expertise-category-label font-mono">Development tools</span>
                <div class="expertise-tiles-grid">
                  <button class="tool-tile" data-desc="Version control for tracking changes.">Git</button>
                  <button class="tool-tile" data-desc="Remote repository collaboration, code reviews and open-source contributions.">GitHub</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Centered Inset Telemetry Note -->
          <div id="expertise-note" class="expertise-live-note font-mono" aria-live="polite">
            Hover or focus on any tool to inspect details.
          </div>

          <!-- Closing Statement -->
          <div class="expertise-footer-meta">
            <span class="expertise-level-mono font-mono">Current level — intermediate</span>
            <div class="expertise-closing-serif font-serif" id="expertise-closing-text">
              Always learning. Always building.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ====================================================================
         CHAPTER 5: CONTACT & FOOTER (No availability statement)
         ==================================================================== -->
    <section id="contact" class="chapter-wrap" aria-label="Contact Chapter">
      <div class="chapter-inner">
        <div class="contact-container">
          <span class="contact-mono-tag font-mono">Contact</span>
          <h2 class="contact-hero-serif font-serif">Let's build something meaningful.</h2>
          <p class="contact-sub-serif font-serif">Have an idea? Let's make it real.</p>

          <a href="mailto:jenitson46@gmail.com?subject=Hello%20Jenit" class="btn-primary" style="margin-top: 0.8rem;">
            <span>Start a conversation</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>

          <!-- Email as a serif link inside an inset rounded plate -->
          <div class="contact-email-plate">
            <a href="mailto:jenitson46@gmail.com" class="contact-email-link font-serif">
              jenitson46@gmail.com
            </a>
          </div>

          <!-- Raised Buttons for GitHub, LinkedIn and Instagram -->
          <div class="contact-social-buttons">
            <a href="https://github.com/jenitjenson45-debug" target="_blank" rel="noopener" class="social-btn font-mono">
              <span>GitHub</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/jenit-jenson-116a2b387" target="_blank" rel="noopener" class="social-btn font-mono">
              <span>LinkedIn</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </a>
            <a href="https://www.instagram.com/_jenit.__?cplk=MXJxdG5idWpzZ296bg==" target="_blank" rel="noopener" class="social-btn font-mono">
              <span>Instagram</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </a>
            <a href="https://wa.me/919072105574" target="_blank" rel="noopener" class="social-btn font-mono">
              <span>WhatsApp</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </a>
          </div>

          <!-- Direct Connect Dual Showcase: Skeuomorphic Instagram & Skeuomorphic WhatsApp -->
          <div class="direct-connect-grid">
            <!-- 1. Skeuomorphism UI: Authentic VIP Access Pass & Instagram QR Chamber -->
            <div class="skeuo-card-wrap">
              <div id="skeuo-instagram-pass" class="skeuo-pass">
                <!-- Metallic Corner Screws -->
                <span class="skeuo-screw screw-tl" aria-hidden="true"></span>
                <span class="skeuo-screw screw-tr" aria-hidden="true"></span>
                <span class="skeuo-screw screw-bl" aria-hidden="true"></span>
                <span class="skeuo-screw screw-br" aria-hidden="true"></span>

                <!-- Lanyard Punch Slot -->
                <div class="skeuo-lanyard-slot" aria-hidden="true"></div>

                <!-- Header with Hardware LED and Debossed Badge ID -->
                <div class="skeuo-badge-header">
                  <div class="skeuo-badge-title-group">
                    <span class="skeuo-stamped-title font-mono">CREATIVE PASS // VERIFIED</span>
                    <span class="skeuo-stamped-sub font-mono">INSTAGRAM IDENTITY</span>
                  </div>
                  <div class="skeuo-led-socket" title="Hardware status: Online">
                    <span class="skeuo-led-diode"></span>
                  </div>
                </div>

                <!-- Deep Recessed Well with Authentic Instagram QR Card -->
                <div class="skeuo-qr-well">
                  <img src="${instagramQrUri}" alt="Jenit Jenson Instagram QR Code @_jenit.__" class="skeuo-qr-card-img" />
                  <div class="skeuo-glare" id="skeuo-glare" aria-hidden="true"></div>
                </div>

                <!-- Pass Body & Mechanical Switch Button -->
                <div class="skeuo-pass-body">
                  <div class="skeuo-handle-wrap">
                    <span class="skeuo-handle-text font-serif">@_jenit.__</span>
                    <span class="skeuo-scan-hint font-mono">SCAN CODE OR PRESS BELOW</span>
                  </div>

                  <a href="https://www.instagram.com/_jenit.__?cplk=MXJxdG5idWpzZ296bg==" target="_blank" rel="noopener" class="skeuo-mech-btn font-mono" id="skeuo-ig-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span>CONNECT ON INSTAGRAM</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- 2. Skeuomorphism UI: Authentic VIP Access Pass & WhatsApp Direct Line -->
            <div class="skeuo-card-wrap">
              <div id="skeuo-whatsapp-pass" class="skeuo-pass">
                <!-- Metallic Corner Screws -->
                <span class="skeuo-screw screw-tl" aria-hidden="true"></span>
                <span class="skeuo-screw screw-tr" aria-hidden="true"></span>
                <span class="skeuo-screw screw-bl" aria-hidden="true"></span>
                <span class="skeuo-screw screw-br" aria-hidden="true"></span>

                <!-- Lanyard Punch Slot -->
                <div class="skeuo-lanyard-slot" aria-hidden="true"></div>

                <!-- Header with Hardware LED and Debossed Badge ID -->
                <div class="skeuo-badge-header">
                  <div class="skeuo-badge-title-group">
                    <span class="skeuo-stamped-title font-mono">DIRECT COMM // ENCRYPTED</span>
                    <span class="skeuo-stamped-sub font-mono">WHATSAPP IDENTITY</span>
                  </div>
                  <div class="skeuo-led-socket" title="Hardware status: Online">
                    <span class="skeuo-led-diode"></span>
                  </div>
                </div>

                <!-- Deep Recessed Well with Authentic WhatsApp QR Card -->
                <div class="skeuo-qr-well">
                  <div class="skeuo-qr-card-surface">
                    <div id="skeuo-whatsapp-qrcode" class="skeuo-qr-canvas-holder">
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https%3A%2F%2Fwa.me%2F919072105574&color=051f20&bgcolor=ffffff" alt="WhatsApp QR Code 9072105574" class="skeuo-qr-img-fallback" id="skeuo-qr-fallback-img" />
                    </div>
                    <!-- Center WhatsApp Phone Emblem -->
                    <div class="skeuo-qr-center-icon" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="skeuo-glare" id="skeuo-wa-glare" aria-hidden="true"></div>
                </div>

                <!-- Pass Body & Mechanical Switch Button -->
                <div class="skeuo-pass-body">
                  <div class="skeuo-handle-wrap">
                    <span class="skeuo-handle-text font-serif">+91 90721 05574</span>
                    <span class="skeuo-scan-hint font-mono">SCAN CODE OR PRESS BELOW</span>
                  </div>

                  <a href="https://wa.me/919072105574" target="_blank" rel="noopener" class="skeuo-mech-btn font-mono" id="skeuo-wa-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>CHAT ON WHATSAPP</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Site Footer with Circular Raised Back-to-Top Button -->
        <footer class="site-footer">
          <div class="footer-container">
            <div class="footer-left">
              <div class="footer-logo-wrap">
                <img src="${logoImgUri}" alt="Jenit Jenson Logo" class="footer-logo-img" />
              </div>
              <div class="footer-text-group">
                <span class="footer-name-serif font-serif">Jenit Jenson</span>
                <span class="footer-role-mono font-mono">UI Designer</span>
              </div>
            </div>

            <div class="footer-center-tagline font-mono">
              Designed with intention. Built with purpose.
            </div>

            <button class="footer-back-to-top" onclick="lenisScrollTo('#home')" aria-label="Scroll back to top">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            </button>
          </div>
        </footer>
      </div>
    </section>

  </main>

  <!-- ==========================================================================
       JAVASCRIPT IMPLEMENTATION
       ========================================================================== -->
  <script>
    /* ==========================================================================
       1. DATA DEFINITION (JS ARRAY P IN EXACT REQUESTED ORDER)
       ========================================================================== */
    const P = [
      {
        t: "Royal Foods",
        c: "Featured project",
        d: "Project description coming soon.",
        k: null,
        s: [],
        live: null,
        gh: null,
        aspect: "16:10",
        v: function() {
          return \`
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="rfGlow" cx="50%" cy="50%" r="55%">
                  <stop offset="0%" stop-color="#235347" stop-opacity="0.9" />
                  <stop offset="65%" stop-color="#0B2B26" stop-opacity="0.75" />
                  <stop offset="100%" stop-color="#051F20" stop-opacity="0.95" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#rfGlow)" />
              <circle cx="200" cy="150" r="115" fill="none" stroke="#163832" stroke-width="1.5" />
              <circle cx="200" cy="150" r="95" fill="none" stroke="#235347" stroke-width="2" stroke-dasharray="3 7" />
              <circle cx="200" cy="150" r="75" fill="none" stroke="#8EB69B" stroke-width="1.2" opacity="0.6" />
              <circle cx="200" cy="150" r="58" fill="#0B2B26" stroke="#DAF1DE" stroke-width="1.8" />
              <path d="M 175 162 L 175 142 L 186 150 L 200 132 L 214 150 L 225 142 L 225 162 Z" fill="#235347" stroke="#DAF1DE" stroke-width="1.8" stroke-linejoin="round" />
              <circle cx="175" cy="140" r="2.5" fill="#DAF1DE" />
              <circle cx="200" cy="130" r="3" fill="#DAF1DE" />
              <circle cx="225" cy="140" r="2.5" fill="#DAF1DE" />
              <g stroke="#8EB69B" stroke-width="1" opacity="0.5">
                <line x1="200" y1="30" x2="200" y2="40" />
                <line x1="200" y1="260" x2="200" y2="270" />
                <line x1="85" y1="150" x2="95" y2="150" />
                <line x1="305" y1="150" x2="315" y2="150" />
                <line x1="118" y1="68" x2="125" y2="75" />
                <line x1="282" y1="68" x2="275" y2="75" />
                <line x1="118" y1="232" x2="125" y2="225" />
                <line x1="282" y1="232" x2="275" y2="225" />
              </g>
              <text x="200" y="235" text-anchor="middle" fill="#8EB69B" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="2">ROYAL FOODS · GASTRONOMY</text>
            </svg>
          \`;
        }
      },
      {
        t: "Zaffran",
        c: "Featured project",
        d: "Project description coming soon.",
        k: null,
        s: [],
        live: null,
        gh: null,
        aspect: "1:1",
        v: function() {
          return \`
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="zfGlow" cx="50%" cy="50%" r="55%">
                  <stop offset="0%" stop-color="#235347" stop-opacity="0.9" />
                  <stop offset="65%" stop-color="#0B2B26" stop-opacity="0.75" />
                  <stop offset="100%" stop-color="#051F20" stop-opacity="0.95" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#zfGlow)" />
              <g transform="translate(200, 150)">
                <circle cx="0" cy="0" r="95" fill="none" stroke="#163832" stroke-width="1.2" stroke-dasharray="4 6" />
                <g stroke="#DAF1DE" stroke-width="1.5" fill="#163832" fill-opacity="0.6">
                  <path d="M 0 0 C -25 -40 -20 -80 0 -95 C 20 -80 25 -40 0 0" />
                  <path d="M 0 0 C -25 -40 -20 -80 0 -95 C 20 -80 25 -40 0 0" transform="rotate(60)" />
                  <path d="M 0 0 C -25 -40 -20 -80 0 -95 C 20 -80 25 -40 0 0" transform="rotate(120)" />
                  <path d="M 0 0 C -25 -40 -20 -80 0 -95 C 20 -80 25 -40 0 0" transform="rotate(180)" />
                  <path d="M 0 0 C -25 -40 -20 -80 0 -95 C 20 -80 25 -40 0 0" transform="rotate(240)" />
                  <path d="M 0 0 C -25 -40 -20 -80 0 -95 C 20 -80 25 -40 0 0" transform="rotate(300)" />
                </g>
                <g stroke="#DAF1DE" stroke-width="2.2" stroke-linecap="round" fill="none">
                  <path d="M 0 0 Q -15 -25 -32 -48" />
                  <path d="M 0 0 Q 0 -30 2 -54" />
                  <path d="M 0 0 Q 18 -25 34 -46" />
                </g>
                <circle cx="-32" cy="-48" r="3" fill="#8EB69B" />
                <circle cx="2" cy="-54" r="3" fill="#8EB69B" />
                <circle cx="34" cy="-46" r="3" fill="#8EB69B" />
                <circle cx="0" cy="0" r="5" fill="#DAF1DE" />
              </g>
              <text x="200" y="270" text-anchor="middle" fill="#8EB69B" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="2">ZAFFRAN · BOTANICAL ESSENCE</text>
            </svg>
          \`;
        }
      },
      {
        t: "Aegis Platform",
        c: "Featured project",
        d: "Project description coming soon.",
        k: null,
        s: [],
        live: null,
        gh: null,
        aspect: "16:10",
        v: function() {
          return \`
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="agGlow" cx="50%" cy="50%" r="55%">
                  <stop offset="0%" stop-color="#235347" stop-opacity="0.9" />
                  <stop offset="65%" stop-color="#0B2B26" stop-opacity="0.75" />
                  <stop offset="100%" stop-color="#051F20" stop-opacity="0.95" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#agGlow)" />
              <g stroke="#163832" stroke-width="1" stroke-dasharray="3 6" opacity="0.45">
                <line x1="50" y1="0" x2="50" y2="300" />
                <line x1="125" y1="0" x2="125" y2="300" />
                <line x1="200" y1="0" x2="200" y2="300" />
                <line x1="275" y1="0" x2="275" y2="300" />
                <line x1="350" y1="0" x2="350" y2="300" />
                <line x1="0" y1="75" x2="400" y2="75" />
                <line x1="0" y1="150" x2="400" y2="150" />
                <line x1="0" y1="225" x2="400" y2="225" />
              </g>
              <path d="M 200 45 L 290 85 L 290 165 C 290 215 200 255 200 255 C 200 255 110 215 110 165 L 110 85 Z" fill="none" stroke="#163832" stroke-width="2" />
              <path d="M 200 65 L 270 98 L 270 160 C 270 200 200 232 200 232 C 200 232 130 200 130 160 L 130 98 Z" fill="#0B2B26" stroke="#235347" stroke-width="2" />
              <path d="M 200 85 L 250 110 L 250 155 C 250 185 200 210 200 210 C 200 210 150 185 150 155 L 150 110 Z" fill="#163832" stroke="#DAF1DE" stroke-width="2" />
              <circle cx="200" cy="140" r="10" fill="#DAF1DE" />
              <polygon points="196,145 204,145 206,168 194,168" fill="#DAF1DE" />
              <text x="200" y="275" text-anchor="middle" fill="#8EB69B" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="2">AEGIS CYBERNETIC DEFENSE</text>
            </svg>
          \`;
        }
      },
      {
        t: "ResQLink",
        c: "Disaster management platform",
        d: "A disaster alert and emergency response platform designed to help residents receive location-relevant warnings and improve coordination during emergencies.",
        k: "Location-based alerts · Resident notifications · Admin monitoring · Emergency SOS · Rescue coordination",
        s: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Prisma"],
        live: "https://resqlink-citizen-portal.vercel.app/",
        gh: "https://github.com/jenitjenson45-debug/_Resqlink-",
        aspect: "1:1",
        v: function() {
          return \`
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="rqGlow" cx="50%" cy="50%" r="55%">
                  <stop offset="0%" stop-color="#235347" stop-opacity="0.9" />
                  <stop offset="65%" stop-color="#0B2B26" stop-opacity="0.75" />
                  <stop offset="100%" stop-color="#051F20" stop-opacity="0.95" />
                </radialGradient>
                <linearGradient id="rqSweep" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#DAF1DE" stop-opacity="0.8" />
                  <stop offset="100%" stop-color="#8EB69B" stop-opacity="0" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#rqGlow)" />
              <line x1="200" y1="20" x2="200" y2="280" stroke="#163832" stroke-width="1.2" stroke-dasharray="3 3" />
              <line x1="60" y1="150" x2="340" y2="150" stroke="#163832" stroke-width="1.2" stroke-dasharray="3 3" />
              <circle cx="200" cy="150" r="35" fill="none" stroke="#235347" stroke-width="1.5" />
              <circle cx="200" cy="150" r="70" fill="none" stroke="#235347" stroke-width="1.5" />
              <circle cx="200" cy="150" r="105" fill="none" stroke="#8EB69B" stroke-width="1.2" stroke-dasharray="5 5" opacity="0.65" />
              <circle cx="200" cy="150" r="130" fill="none" stroke="#163832" stroke-width="1.5" opacity="0.4" />
              <g transform="translate(200, 150)">
                <polygon points="0,0 80,-80 110,-40" fill="url(#rqSweep)" opacity="0.35" />
                <line x1="0" y1="0" x2="80" y2="-80" stroke="#DAF1DE" stroke-width="1.5" />
                <animateTransform attributeName="transform" type="rotate" from="0 200 150" to="360 200 150" dur="8s" repeatCount="indefinite" />
              </g>
              <circle cx="200" cy="150" r="9" fill="#235347" />
              <circle cx="200" cy="150" r="4.5" fill="#DAF1DE" />
              <circle cx="200" cy="150" r="18" fill="none" stroke="#DAF1DE" stroke-width="1.2" opacity="0.7">
                <animate attributeName="r" values="4.5;32" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <circle cx="250" cy="105" r="3.5" fill="#8EB69B" />
              <circle cx="150" cy="195" r="3" fill="#DAF1DE" />
              <text x="200" y="275" text-anchor="middle" fill="#8EB69B" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="2">RESQLINK TELEMETRY // 10.786°N</text>
            </svg>
          \`;
        }
      }
    ];

    /* ==========================================================================
       2. RENDER SELECTED WORKS GALLERY FROM ARRAY P
       ========================================================================== */
    function renderProjects() {
      const container = document.getElementById('projects-container');
      if (!container) return;

      container.innerHTML = P.map((p, idx) => {
        const isReversed = idx % 2 === 1;
        const targetUrl = p.live || p.gh || null;
        const aspectClass = p.aspect === "1:1" ? "aspect-1-1" : "aspect-16-10";
        const indexStr = (idx + 1).toString().padStart(2, '0');

        let linksHtml = '';
        if (p.live) {
          linksHtml += \`
            <a href="\${p.live}" target="_blank" rel="noopener" class="project-link-item font-mono" aria-label="Visit \${p.t} live demo">
              <span>Live Site</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
            </a>
          \`;
        }
        if (p.gh) {
          linksHtml += \`
            <a href="\${p.gh}" target="_blank" rel="noopener" class="project-link-item font-mono" aria-label="View \${p.t} on GitHub">
              <span>GitHub</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
          \`;
        }
        if (!p.live && !p.gh) {
          linksHtml = \`<span class="font-mono text-xs" style="color: var(--c5); opacity: 0.85;">Details coming soon</span>\`;
        }

        const tagsHtml = (p.s && p.s.length > 0)
          ? p.s.map(t => \`<span class="tech-tag-chip font-mono">\${t}</span>\`).join('')
          : '';

        let previewContent = '';
        if (p.uiStyle === 'skeuomorphic') {
          previewContent = \`
            <div class="project-preview-wrap \${aspectClass} frame-skeuomorphic" data-project-link="\${targetUrl || ''}">
              <span class="project-index-badge font-mono">\${indexStr}</span>
              <span class="frame-screw screw-tl" aria-hidden="true"></span>
              <span class="frame-screw screw-tr" aria-hidden="true"></span>
              <span class="frame-screw screw-bl" aria-hidden="true"></span>
              <span class="frame-screw screw-br" aria-hidden="true"></span>
              <span class="frame-style-badge font-mono">SKEUOMORPHIC</span>
              <div class="frame-inner-well">
                <div class="project-preview-svg">
                  \${p.v()}
                </div>
                <div class="frame-glare" aria-hidden="true"></div>
                <div class="project-preview-overlay"></div>
              </div>
            </div>
          \`;
        } else if (p.uiStyle === 'neumorphic') {
          previewContent = \`
            <div class="project-preview-wrap \${aspectClass} frame-neumorphic" data-project-link="\${targetUrl || ''}">
              <span class="project-index-badge font-mono">\${indexStr}</span>
              <span class="frame-style-badge font-mono">NEUMORPHIC</span>
              <div class="neu-frame-inner-well">
                <div class="project-preview-svg">
                  \${p.v()}
                </div>
                <div class="project-preview-overlay"></div>
              </div>
            </div>
          \`;
        } else if (p.uiStyle === 'glassmorphic') {
          previewContent = \`
            <div class="project-preview-wrap \${aspectClass} frame-glassmorphic" data-project-link="\${targetUrl || ''}">
              <span class="project-index-badge font-mono">\${indexStr}</span>
              <span class="frame-style-badge font-mono">GLASSMORPHIC</span>
              <div class="glass-frame-inner">
                <div class="project-preview-svg">
                  \${p.v()}
                </div>
                <div class="glass-specular-streak" aria-hidden="true"></div>
                <div class="project-preview-overlay"></div>
              </div>
            </div>
          \`;
        } else {
          // Tactical Skeuomorphic HUD frame
          previewContent = \`
            <div class="project-preview-wrap \${aspectClass} frame-tactical" data-project-link="\${targetUrl || ''}">
              <span class="project-index-badge font-mono">\${indexStr}</span>
              <span class="frame-bracket bracket-tl" aria-hidden="true"></span>
              <span class="frame-bracket bracket-tr" aria-hidden="true"></span>
              <span class="frame-bracket bracket-bl" aria-hidden="true"></span>
              <span class="frame-bracket bracket-br" aria-hidden="true"></span>
              <div class="tactical-header-bezel font-mono">
                <span class="tactical-led" aria-hidden="true"></span>
                <span>SKEUOMORPHIC HUD</span>
              </div>
              <div class="tactical-screen-well">
                <div class="project-preview-svg">
                  \${p.v()}
                </div>
                <div class="project-preview-overlay"></div>
              </div>
            </div>
          \`;
        }
        return \`
          <article class="project-card \${isReversed ? 'is-reversed' : ''}" data-project-id="\${p.t}">
            \${targetUrl ? \`<a href="\${targetUrl}" target="_blank" rel="noopener" style="display:contents;" aria-label="Open \${p.t}">\${previewContent}</a>\` : previewContent}
            
            <div class="project-content-col">
              <span class="project-category-mono font-mono">\${p.c}</span>
              
              \${targetUrl ? \`
                <a href="\${targetUrl}" target="_blank" rel="noopener" class="project-title-link">
                  <h3 class="project-title font-serif">\${p.t}</h3>
                  <svg class="project-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
                </a>
              \` : \`
                <div class="project-title-link">
                  <h3 class="project-title font-serif">\${p.t}</h3>
                </div>
              \`}

              <p class="project-desc font-sans">\${p.d}</p>
              
              \${p.k ? \`<div class="project-concepts font-mono">\${p.k}</div>\` : ''}

              \${tagsHtml ? \`<div class="project-tags">\${tagsHtml}</div>\` : ''}

              <div class="project-links">\${linksHtml}</div>
            </div>
          </article>
        \`;
      }).join('');
    }

    /* ==========================================================================
       3. SMOOTH SCROLL (LENIS) SETUP WITH SYNCHRONIZED SCROLLTRIGGER
       ========================================================================== */
    let lenis = null;
    function initLenis() {
      try {
        if (typeof Lenis !== 'undefined') {
          lenis = new Lenis({
            duration: 1.25,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            lerp: 0.09,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2
          });

          if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
              lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
          } else {
            function raf(time) {
              lenis.raf(time);
              requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
          }
        }
      } catch (err) {
        console.warn('Lenis initialization skipped:', err);
      }
    }

    function lenisScrollTo(target) {
      if (lenis) {
        lenis.scrollTo(target, { offset: 0, duration: 1.25 });
      } else {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }

    /* ==========================================================================
       4. CUSTOM CURSOR
       ========================================================================== */
    function initCursor() {
      const cursor = document.getElementById('custom-cursor');
      if (!cursor || window.matchMedia('(pointer: coarse)').matches) return;

      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let cursorX = mouseX;
      let cursorY = mouseY;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      function renderCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(renderCursor);
      }
      requestAnimationFrame(renderCursor);

      const interactiveSelector = 'a, button, .tool-tile, .nav-link, .drawer-link';
      document.querySelectorAll(interactiveSelector).forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
      });

      document.querySelectorAll('.project-preview-wrap').forEach(el => {
        if (el.getAttribute('data-project-link')) {
          el.addEventListener('mouseenter', () => {
            cursor.classList.add('view-hover');
            cursor.textContent = 'VIEW';
          });
          el.addEventListener('mouseleave', () => {
            cursor.classList.remove('view-hover');
            cursor.textContent = '';
          });
        }
      });
    }

    /* ==========================================================================
       5. 3D BACKGROUND (THREE.JS SCENE WITH FULL-SITE SCROLL TRIGGERING)
       ========================================================================== */
    let threeKnotGroup = null;
    let threeKnot = null;
    let threeOuterHalo = null;
    let threeParticles = null;
    let threeVortexParticles = null;
    let threePointLight1 = null;
    let threePointLight2 = null;
    let threePointLight3 = null;

    function initThreeScene() {
      const canvas = document.getElementById('webgl-canvas');
      if (!canvas) return;

      if (window.innerWidth <= 760 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        canvas.remove();
        return;
      }

      try {
        if (typeof THREE === 'undefined') {
          canvas.remove();
          return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 0, 7.5);

        const renderer = new THREE.WebGLRenderer({
          canvas: canvas,
          alpha: true,
          antialias: true,
          powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

        // Soft ambient illumination
        const ambientLight = new THREE.AmbientLight(0x8EB69B, 0.45);
        scene.add(ambientLight);

        // Three dynamic colored point lights orbiting the sculpture
        threePointLight1 = new THREE.PointLight(0xDAF1DE, 2.8, 30); // Mint specular key light
        scene.add(threePointLight1);

        threePointLight2 = new THREE.PointLight(0x8EB69B, 2.2, 26); // Sage fill light
        scene.add(threePointLight2);

        threePointLight3 = new THREE.PointLight(0x235347, 3.5, 24); // Emerald rim light
        scene.add(threePointLight3);

        // --- 1. PROCEDURAL SOFT GLOW PARTICLE TEXTURE ---
        function createParticleGlowTexture() {
          const size = 64;
          const c = document.createElement('canvas');
          c.width = size;
          c.height = size;
          const ctx = c.getContext('2d');
          const grad = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
          grad.addColorStop(0, 'rgba(218, 241, 222, 1)');       // Pure pale mint core
          grad.addColorStop(0.25, 'rgba(142, 182, 155, 0.85)'); // Radiant sage glow
          grad.addColorStop(0.55, 'rgba(35, 83, 71, 0.4)');     // Deep emerald rim
          grad.addColorStop(1, 'rgba(5, 31, 32, 0)');           // Transparent decay
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, size, size);
          const tex = new THREE.CanvasTexture(c);
          tex.needsUpdate = true;
          return tex;
        }
        const glowTexture = createParticleGlowTexture();

        // --- 2. 3D SCULPTURE HIERARCHY ---
        threeKnotGroup = new THREE.Group();
        threeKnotGroup.position.set(1.4, -0.1, -0.6);
        scene.add(threeKnotGroup);

        // High-density Torus Knot
        const geometry = new THREE.TorusKnotGeometry(1.65, 0.48, 260, 36, 2, 3);
        
        // Premium liquid-metal physical material with deep clearcoat lacquer
        const material = new THREE.MeshPhysicalMaterial({
          color: 0x163832,
          emissive: 0x051F20,
          emissiveIntensity: 0.35,
          metalness: 0.88,
          roughness: 0.18,
          clearcoat: 1.0,
          clearcoatRoughness: 0.12,
          reflectivity: 0.95
        });

        threeKnot = new THREE.Mesh(geometry, material);
        threeKnotGroup.add(threeKnot);

        // Delicate outer wireframe halo
        const haloGeo = new THREE.TorusKnotGeometry(1.68, 0.50, 96, 16, 2, 3);
        const haloMat = new THREE.MeshBasicMaterial({
          color: 0x8EB69B,
          wireframe: true,
          transparent: true,
          opacity: 0.08
        });
        threeOuterHalo = new THREE.Mesh(haloGeo, haloMat);
        threeKnot.add(threeOuterHalo);

        // --- 3. CELESTIAL STARDUST VORTEX RIBBON (360 particles) ---
        const vortexCount = 360;
        const vortexGeo = new THREE.BufferGeometry();
        const vortexPositions = new Float32Array(vortexCount * 3);

        for (let i = 0; i < vortexCount; i++) {
          const i3 = i * 3;
          const u = i / vortexCount;
          const angle = u * Math.PI * 8; // 4 full orbits
          const radius = 2.1 + Math.sin(u * Math.PI * 3) * 0.7;
          const height = (u - 0.5) * 4.8;

          vortexPositions[i3] = Math.cos(angle) * radius;
          vortexPositions[i3 + 1] = height;
          vortexPositions[i3 + 2] = Math.sin(angle) * radius;
        }

        vortexGeo.setAttribute('position', new THREE.BufferAttribute(vortexPositions, 3));
        const vortexMat = new THREE.PointsMaterial({
          map: glowTexture,
          size: 0.13,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        threeVortexParticles = new THREE.Points(vortexGeo, vortexMat);
        threeKnot.add(threeVortexParticles);

        // --- 4. AMBIENT LIVING 3D PARTICLE FIELD (800 particles) ---
        const particleCount = 800;
        const particleGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const origPositions = new Float32Array(particleCount * 3);
        const waveParams = new Float32Array(particleCount * 3); // speed, amp, phase

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const x = (Math.random() - 0.5) * 24;
          const y = (Math.random() - 0.5) * 20;
          const z = (Math.random() - 0.5) * 16 - 1.5;

          positions[i3] = x;
          positions[i3 + 1] = y;
          positions[i3 + 2] = z;

          origPositions[i3] = x;
          origPositions[i3 + 1] = y;
          origPositions[i3 + 2] = z;

          waveParams[i3] = 0.4 + Math.random() * 0.9;       // speed
          waveParams[i3 + 1] = 0.18 + Math.random() * 0.35; // amplitude
          waveParams[i3 + 2] = Math.random() * Math.PI * 2; // phase
        }

        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particleMat = new THREE.PointsMaterial({
          map: glowTexture,
          size: 0.15,
          transparent: true,
          opacity: 0.65,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        threeParticles = new THREE.Points(particleGeo, particleMat);
        scene.add(threeParticles);

        // --- 5. SMOOTH INTERPOLATION & MOTION SYSTEM ---
        let targetMouseX = 0;
        let targetMouseY = 0;
        let mouseX = 0;
        let mouseY = 0;

        window.addEventListener('mousemove', (e) => {
          targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
          targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        let lastScroll = 0;
        let scrollVelocity = 0;
        const clock = new THREE.Clock();

        function animate() {
          requestAnimationFrame(animate);

          const time = clock.getElapsedTime();

          // Smooth exponential mouse damping
          mouseX += (targetMouseX - mouseX) * 0.04;
          mouseY += (targetMouseY - mouseY) * 0.04;

          // Smooth scroll velocity tracking
          const currentScroll = lenis ? lenis.scroll : window.scrollY;
          const scrollDelta = currentScroll - lastScroll;
          lastScroll = currentScroll;
          scrollVelocity += (scrollDelta - scrollVelocity) * 0.08;

          // --- A. SILKY SMOOTH KNOT ROTATION & BREATHING ---
          threeKnot.rotation.x = time * 0.16 + mouseY * 0.35;
          threeKnot.rotation.y = time * 0.24 + mouseX * 0.45;
          threeKnot.rotation.z = time * 0.07 + Math.sin(time * 0.3) * 0.12;

          // Zero-gravity organic floating
          threeKnot.position.y = Math.sin(time * 0.8) * 0.16;
          threeKnot.position.x = Math.cos(time * 0.6) * 0.10;

          // Counter-rotating wireframe halo
          threeOuterHalo.rotation.y = -time * 0.12;
          threeOuterHalo.rotation.z = time * 0.08;

          // Spiraling stardust ribbon
          threeVortexParticles.rotation.y = time * 0.35;
          threeVortexParticles.rotation.x = Math.sin(time * 0.25) * 0.18;

          // --- B. DYNAMIC ORBITING LIGHTS (SPECULAR GLEAMS) ---
          threePointLight1.position.x = Math.sin(time * 0.7) * 5.0 + threeKnotGroup.position.x;
          threePointLight1.position.y = Math.cos(time * 0.6) * 4.5 + threeKnotGroup.position.y;
          threePointLight1.position.z = Math.sin(time * 0.5) * 3.0 + 3.8;

          threePointLight2.position.x = Math.cos(time * 0.8) * 5.5 + threeKnotGroup.position.x;
          threePointLight2.position.y = Math.sin(time * 0.9) * 4.0 + threeKnotGroup.position.y;
          threePointLight2.position.z = Math.cos(time * 0.4) * 2.8 + 3.2;

          threePointLight3.position.x = -Math.sin(time * 0.5) * 4.5;
          threePointLight3.position.y = -Math.cos(time * 0.7) * 4.5;
          threePointLight3.position.z = 2.2;

          // --- C. AMBIENT PARTICLES 3D UNDULATION & MOUSE INTERACTION ---
          const posAttr = particleGeo.attributes.position;
          const posArr = posAttr.array;

          for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const spd = waveParams[i3];
            const amp = waveParams[i3 + 1];
            const phs = waveParams[i3 + 2];

            // Harmonic 3D wave floating
            posArr[i3] = origPositions[i3] + Math.sin(time * spd * 0.6 + phs) * amp;
            posArr[i3 + 1] = origPositions[i3 + 1] + Math.cos(time * spd * 0.8 + phs) * (amp * 1.2);
            posArr[i3 + 2] = origPositions[i3 + 2] + Math.sin(time * spd * 0.4 + phs) * amp - scrollVelocity * 0.012;

            // Interactive mouse soft dispersion
            const dx = posArr[i3] - (mouseX * 7.5);
            const dy = posArr[i3 + 1] - (mouseY * 5.5);
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 3.8 && dist > 0.01) {
              const force = (3.8 - dist) * 0.032;
              posArr[i3] += (dx / dist) * force;
              posArr[i3 + 1] += (dy / dist) * force;
            }
          }
          posAttr.needsUpdate = true;

          // Slow cosmic field rotation
          threeParticles.rotation.y = time * 0.012 + mouseX * 0.04;
          threeParticles.rotation.x = Math.sin(time * 0.008) * 0.03 + mouseY * 0.03;

          renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
          if (window.innerWidth <= 760) {
            canvas.style.display = 'none';
            return;
          } else {
            canvas.style.display = 'block';
          }
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        });

      } catch (err) {
        console.warn('Three.js failed to initialize, removing canvas:', err);
        if (canvas) canvas.remove();
      }
    }

    /* ==========================================================================
       6. HERO TITLE PER-CHARACTER REVEAL & INTRO TIMELINE
       ========================================================================== */
    function buildHeroTitleCharacters() {
      const heading = document.getElementById('hero-name-heading');
      if (!heading) return;

      const isMobile = window.innerWidth <= 900;
      if (isMobile) {
        heading.innerHTML = \`
          <span class="hero-name-line">\${"JENIT".split('').map(ch => \`<span class="char-reveal"><span class="char-inner">\${ch}</span></span>\`).join('')}</span>
          <span class="hero-name-line">\${"JENSON".split('').map(ch => \`<span class="char-reveal"><span class="char-inner">\${ch}</span></span>\`).join('')}</span>
        \`;
      } else {
        heading.innerHTML = "JENIT JENSON".split('').map(ch => {
          if (ch === ' ') return '<span class="char-reveal">&nbsp;</span>';
          return \`<span class="char-reveal"><span class="char-inner">\${ch}</span></span>\`;
        }).join('');
      }
    }

    function runIntroTimeline() {
      const loader = document.getElementById('loader');
      const bar = document.getElementById('loader-bar');
      const pct = document.getElementById('loader-pct');

      let progress = 0;
      const startTime = performance.now();
      const loaderDuration = 1200;

      function stepLoader(currentTime) {
        const elapsed = currentTime - startTime;
        progress = Math.min(100, Math.round((elapsed / loaderDuration) * 100));
        if (bar) bar.style.width = progress + '%';
        if (pct) pct.textContent = progress + '%';

        if (progress < 100) {
          requestAnimationFrame(stepLoader);
        } else {
          setTimeout(() => {
            if (loader) loader.classList.add('is-loaded');
            playHeroAnimations();
          }, 150);
        }
      }
      requestAnimationFrame(stepLoader);
    }

    function playHeroAnimations() {
      if (typeof gsap === 'undefined') {
        const fg = document.getElementById('hero-portrait-fg');
        if (fg) fg.style.clipPath = 'inset(0% 0 0 0)';
        document.querySelectorAll('.char-inner').forEach(c => c.style.transform = 'translateY(0%)');
        return;
      }

      const tl = gsap.timeline();

      tl.to('.char-inner', {
        y: '0%',
        duration: 1.1,
        stagger: 0.04,
        ease: 'power4.out'
      }, "+=0.1");

      tl.to('#hero-portrait-fg', {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.3,
        ease: 'power3.inOut'
      }, "-=0.8");

      tl.fromTo('.hero-portrait-mono', 
        { opacity: 0, scale: 0.95 },
        { opacity: 0.20, scale: 1, duration: 1.2, ease: 'power2.out' },
        "-=0.9"
      );

      tl.from(['#hero-bl', '#hero-br', '#hero-vertical-text', '#hero-scroll-hint'], {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: "transform,opacity"
      }, "-=0.6");
    }

    /* ==========================================================================
       7. SCROLL SYSTEM: 3D ZOOM, PARALLAX, HERO NAME SAFETY FADE
       ========================================================================== */
    function initScrollSystem() {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

      gsap.registerPlugin(ScrollTrigger);

      // 1. Scroll-progress line at top (scaleX scrubbed 0 to 1)
      gsap.to('#scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3
        }
      });

      // 2. Continuous 3D Three.js Knot Choreography Across ALL 5 Chapters
      if (threeKnotGroup) {
        const knotTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2
          }
        });

        // Hero -> About (knot drifts to the left to let About copy shine)
        knotTimeline.to(threeKnotGroup.position, {
          x: -1.8, y: 0.2, z: 0.5, ease: 'power1.inOut'
        }, 0.15);
        knotTimeline.to(threeKnotGroup.scale, {
          x: 0.88, y: 0.88, z: 0.88, ease: 'power1.inOut'
        }, 0.15);

        // About -> Work (knot glides to the right of project cards)
        knotTimeline.to(threeKnotGroup.position, {
          x: 1.8, y: -0.3, z: 0.8, ease: 'power1.inOut'
        }, 0.45);
        knotTimeline.to(threeKnotGroup.scale, {
          x: 0.95, y: 0.95, z: 0.95, ease: 'power1.inOut'
        }, 0.45);

        // Work -> Expertise (knot settles deeper into center background)
        knotTimeline.to(threeKnotGroup.position, {
          x: 0, y: 0, z: -0.2, ease: 'power1.inOut'
        }, 0.75);
        knotTimeline.to(threeKnotGroup.scale, {
          x: 0.78, y: 0.78, z: 0.78, ease: 'power1.inOut'
        }, 0.75);

        // Expertise -> Contact (knot rises to center the closing call-to-action)
        knotTimeline.to(threeKnotGroup.position, {
          x: 0, y: 0.6, z: 0.4, ease: 'power1.inOut'
        }, 0.95);
        knotTimeline.to(threeKnotGroup.scale, {
          x: 0.72, y: 0.72, z: 0.72, ease: 'power1.inOut'
        }, 0.95);

        if (threeParticles) {
          knotTimeline.to(threeParticles.rotation, {
            y: Math.PI * 0.4, ease: 'none'
          }, 0);
        }
      }

      // 3. 3D Zoom between chapters (Perspective 1400px on main#main-content)
      const chapterInners = gsap.utils.toArray('.chapter-inner');
      chapterInners.forEach((chapter, i) => {
        const parentSection = chapter.closest('.chapter-wrap');

        if (i > 0) {
          gsap.fromTo(chapter, 
            { scale: 0.86, opacity: 0, z: -260 },
            {
              scale: 1,
              opacity: 1,
              z: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: parentSection,
                start: 'top 100%',
                end: 'top 25%',
                scrub: 0.8
              }
            }
          );
        }

        if (i < chapterInners.length - 1) {
          gsap.to(chapter, {
            scale: 1.12,
            opacity: 0,
            z: 180,
            ease: 'power2.in',
            scrollTrigger: {
              trigger: parentSection,
              start: 'bottom 60%',
              end: 'bottom 0%',
              scrub: 0.8
            }
          });
        }
      });

      // 4. Hero Parallax System (scrubbed)
      const heroTrigger = {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5
      };

      gsap.to('#hero-portrait-fg', {
        yPercent: 6,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: heroTrigger
      });

      gsap.to('.hero-portrait-mono', {
        y: -120,
        x: 60,
        ease: 'none',
        scrollTrigger: heroTrigger
      });

      gsap.to('.hero-bg-line1', {
        x: -90,
        ease: 'none',
        scrollTrigger: heroTrigger
      });
      gsap.to('.hero-bg-line2', {
        x: 90,
        ease: 'none',
        scrollTrigger: heroTrigger
      });

      gsap.to('#hero-name-container', {
        yPercent: -40,
        opacity: 0,
        ease: 'power1.in',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'top -45%',
          scrub: 0.4
        }
      });

      gsap.to(['#hero-bl', '#hero-br'], {
        y: -70,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'top -55%',
          scrub: 0.5
        }
      });

      gsap.to(['#hero-scroll-hint', '#hero-vertical-text'], {
        opacity: 0,
        y: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'top -20%',
          scrub: 0.3
        }
      });

      // 5. Section titles word-by-word mask reveal
      document.querySelectorAll('.section-title-large').forEach(title => {
        const words = title.innerText.trim().split(' ');
        title.innerHTML = words.map(w => \`<span style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="word-inner" style="display:inline-block;transform:translateY(110%);">\${w}&nbsp;</span></span>\`).join('');

        gsap.to(title.querySelectorAll('.word-inner'), {
          y: '0%',
          duration: 1.0,
          stagger: 0.06,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%'
          }
        });
      });

      // 6. Mono labels slide in from the left
      document.querySelectorAll('.section-mono-tag').forEach(tag => {
        gsap.from(tag, {
          x: -40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tag,
            start: 'top 88%'
          }
        });
      });

      // 7. Paragraphs, education card, category cards, more projects row & contact elements fade and rise 50px
      const riseElements = document.querySelectorAll('.about-lead-copy, .about-body-copy, .about-education-card, .about-quote-box, .expertise-card, .projects-footer-row, .contact-hero-serif, .contact-sub-serif, .contact-email-plate, .contact-social-buttons, .skeuo-card-wrap');
      riseElements.forEach(el => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: el,
            start: 'top 88%'
          }
        });
      });

      // 8. About chapter specifics: glass liquid box wipe, portrait cutout overlap reveal & 3D tilt
      gsap.from('#about-liquid-glass', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#about-liquid-glass',
          start: 'top 82%'
        }
      });

      gsap.from('#about-portrait-overlap', {
        y: 45,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        clearProps: "opacity",
        scrollTrigger: {
          trigger: '#about-visual-col',
          start: 'top 82%'
        }
      });

      gsap.fromTo('#about-card-3d', 
        { rotateY: -10, rotateX: 6, z: -40 },
        {
          rotateY: 8,
          rotateX: -4,
          z: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: '#about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        }
      );

      // 9. Work: 3D perspective tilt on each project card as it enters/exits
      document.querySelectorAll('.project-card').forEach((card, idx) => {
        const preview = card.querySelector('.project-preview-wrap');
        const content = card.querySelector('.project-content-col');
        const isReversed = card.classList.contains('is-reversed');

        if (preview) {
          gsap.to(preview, {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.6,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: preview,
              start: 'top 80%'
            }
          });

          gsap.fromTo(card,
            {
              rotateX: 8,
              rotateY: isReversed ? -6 : 6,
              z: -50,
              y: 70
            },
            {
              rotateX: -6,
              rotateY: isReversed ? 6 : -6,
              z: 20,
              y: -50,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2
              }
            }
          );
        }

        if (content) {
          gsap.from(content.children, {
            x: isReversed ? -40 : 40,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: card,
              start: 'top 78%'
            }
          });
        }
      });

      // 10. Expertise: tool tiles rise in with stagger 0.08, closing line slides in from left
      document.querySelectorAll('.expertise-card').forEach(card => {
        const tiles = card.querySelectorAll('.tool-tile');
        gsap.from(tiles, {
          y: 35,
          opacity: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 82%'
          }
        });
      });

      gsap.from('#expertise-closing-text', {
        x: -80,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#expertise-closing-text',
          start: 'top 90%',
          end: 'top 50%',
          scrub: 0.8
        }
      });

      // 11. Active Navigation Link updates per chapter
      const sections = ['home', 'about', 'work', 'expertise', 'contact'];
      sections.forEach(id => {
        ScrollTrigger.create({
          trigger: '#' + id,
          start: 'top 40%',
          end: 'bottom 40%',
          onEnter: () => setActiveNav(id),
          onEnterBack: () => setActiveNav(id)
        });
      });

      ScrollTrigger.refresh();
    }

    function setActiveNav(id) {
      document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('data-nav') === id) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    /* ==========================================================================
       8. EXPERTISE INTERACTIVE DESCRIPTIONS
       ========================================================================== */
    function initExpertiseInteractivity() {
      const noteBox = document.getElementById('expertise-note');
      if (!noteBox) return;

      document.querySelectorAll('.tool-tile').forEach(item => {
        const desc = item.getAttribute('data-desc');
        const name = item.textContent.trim();

        const showDesc = () => {
          noteBox.innerHTML = \`<strong style="color:var(--c5);">\${name}:</strong> \${desc}\`;
        };

        const resetDesc = () => {
          noteBox.innerHTML = \`Hover or focus on any tool to inspect details.\`;
        };

        item.addEventListener('mouseenter', showDesc);
        item.addEventListener('focus', showDesc);
        item.addEventListener('mouseleave', resetDesc);
        item.addEventListener('blur', resetDesc);

        item.addEventListener('click', showDesc);
      });
    }

    /* ==========================================================================
       9. MOBILE DRAWER NAVIGATION
       ========================================================================== */
    function initMobileDrawer() {
      const menuBtn = document.getElementById('menu-btn');
      const closeBtn = document.getElementById('drawer-close');
      const drawer = document.getElementById('mobile-drawer');

      if (!menuBtn || !drawer) return;

      menuBtn.addEventListener('click', () => {
        drawer.classList.add('open');
        menuBtn.setAttribute('aria-expanded', 'true');
        drawer.setAttribute('aria-hidden', 'false');
      });

      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          drawer.classList.remove('open');
          menuBtn.setAttribute('aria-expanded', 'false');
          drawer.setAttribute('aria-hidden', 'true');
        });
      }

      document.querySelectorAll('.drawer-link').forEach(link => {
        link.addEventListener('click', () => {
          drawer.classList.remove('open');
          menuBtn.setAttribute('aria-expanded', 'false');
          drawer.setAttribute('aria-hidden', 'true');
        });
      });
    }

    /* ==========================================================================
       SKEUOMORPHIC VIP ACCESS CARDS 3D SPRING TILT & SPECULAR GLARE
       ========================================================================== */
    function initSkeuoCards() {
      const cardConfigs = [
        { cardId: 'skeuo-instagram-pass', glareId: 'skeuo-glare' },
        { cardId: 'skeuo-whatsapp-pass', glareId: 'skeuo-wa-glare' }
      ];

      cardConfigs.forEach(({ cardId, glareId }) => {
        const card = document.getElementById(cardId);
        const glare = document.getElementById(glareId);
        if (!card) return;

        let bounds = card.getBoundingClientRect();
        let targetRotX = 0;
        let targetRotY = 0;
        let currentRotX = 0;
        let currentRotY = 0;
        let isHovered = false;
        let animFrame = null;

        function updateBounds() {
          bounds = card.getBoundingClientRect();
        }

        window.addEventListener('resize', updateBounds, { passive: true });
        window.addEventListener('scroll', updateBounds, { passive: true });

        card.addEventListener('mousemove', (e) => {
          if (!bounds.width || !bounds.height) updateBounds();
          const mouseX = e.clientX - bounds.left;
          const mouseY = e.clientY - bounds.top;

          const normX = (mouseX / bounds.width) * 2 - 1;
          const normY = (mouseY / bounds.height) * 2 - 1;

          targetRotX = -normY * 13;
          targetRotY = normX * 13;

          if (glare) {
            const glareX = (mouseX / bounds.width) * 100 - 50;
            const glareY = (mouseY / bounds.height) * 100 - 50;
            glare.style.transform = 'translate(' + glareX + '%, ' + glareY + '%)';
            glare.style.opacity = '0.75';
          }
        }, { passive: true });

        card.addEventListener('mouseenter', () => {
          isHovered = true;
          updateBounds();
          if (!animFrame) animLoop();
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
          isHovered = false;
          targetRotX = 0;
          targetRotY = 0;
          if (glare) {
            glare.style.opacity = '0.4';
          }
        }, { passive: true });

        function animLoop() {
          currentRotX += (targetRotX - currentRotX) * 0.12;
          currentRotY += (targetRotY - currentRotY) * 0.12;

          const tiltShadowX = -currentRotY * 1.5;
          const tiltShadowY = Math.max(15, 25 + currentRotX * 1.5);

          card.style.transform = 'perspective(1000px) rotateX(' + currentRotX.toFixed(2) + 'deg) rotateY(' + currentRotY.toFixed(2) + 'deg) scale3d(' + (isHovered ? 1.02 : 1) + ', ' + (isHovered ? 1.02 : 1) + ', 1)';
          card.style.boxShadow = 
            '0 1px 0 rgba(218, 241, 222, 0.28) inset, ' +
            '0 -2px 0 rgba(0, 0, 0, 0.85) inset, ' +
            '1px 0 0 rgba(218, 241, 222, 0.12) inset, ' +
            '-1px 0 0 rgba(0, 0, 0, 0.6) inset, ' +
            tiltShadowX.toFixed(1) + 'px ' + tiltShadowY.toFixed(1) + 'px 50px -10px rgba(2, 12, 12, 0.9), ' +
            '0 45px 85px -20px rgba(0, 0, 0, 0.75)';

          if (isHovered || Math.abs(currentRotX) > 0.05 || Math.abs(currentRotY) > 0.05) {
            animFrame = requestAnimationFrame(animLoop);
          } else {
            animFrame = null;
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
          }
        }
      });
    }

    /* ==========================================================================
       NEUMORPHIC WHATSAPP QR INITIALIZATION
       ========================================================================== */
    function initSkeuoWhatsAppQr() {
      const container = document.getElementById('skeuo-whatsapp-qrcode');
      if (!container) return;
      if (typeof QRCode !== 'undefined') {
        const fallback = document.getElementById('skeuo-qr-fallback-img');
        if (fallback) fallback.remove();

        new QRCode(container, {
          text: "https://wa.me/919072105574",
          width: 200,
          height: 200,
          colorDark: "#051F20",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
        });
      }
    }

    /* ==========================================================================
       10. APPLICATION INITIALIZATION
       ========================================================================== */
    window.addEventListener('DOMContentLoaded', () => {
      buildHeroTitleCharacters();
      renderProjects();
      initLenis();
      initCursor();
      initExpertiseInteractivity();
      initMobileDrawer();
      initThreeScene();
      runIntroTimeline();
      initSkeuoCards();
      initSkeuoWhatsAppQr();
    });

    window.addEventListener('load', () => {
      initScrollSystem();
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    });

    window.addEventListener('resize', () => {
      buildHeroTitleCharacters();
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    });
  </script>
</body>
</html>
`;

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully regenerated index.html with middle-aligned tools and overlapping liquid glass! File size:', fs.statSync('index.html').size);
