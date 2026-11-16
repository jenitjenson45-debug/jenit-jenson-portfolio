# ✦ JENIT JENSON — UI Designer Portfolio
### High-Contrast Editorial Luxury, Soft Neomorphism & Tactile Skeuomorphism
**Kerala, India**

* 🌐 **Live GitHub Pages**: [https://jenitjenson45-debug.github.io/jenit-jenson-portfolio/](https://jenitjenson45-debug.github.io/jenit-jenson-portfolio/)
* 🌐 **Live Vercel Production**: [https://jenit-jenson-portfolio-beryl.vercel.app](https://jenit-jenson-portfolio-beryl.vercel.app)
* 🐙 **GitHub Repository**: [https://github.com/jenitjenson45-debug/jenit-jenson-portfolio](https://github.com/jenitjenson45-debug/jenit-jenson-portfolio)

A production-grade, single-file luxury portfolio website designed for **Jenit Jenson (UI Designer)**. Self-contained inside [`index.html`](file:///d:/PORTFOLIO/index.html), combining editorial typography, 3D Three.js scene physics, and curated UI design showcases spanning **Skeuomorphism**, **Neomorphism**, and **Glassmorphism**.

---

## 🎨 Design Philosophy & Color System

Strict 6-color palette (no purple, blue, pink, or neon):
- `--c1` **#051F20** (Deepest Navy Green — Primary Background)
- `--c2` **#0B2B26** (Dark Forest Green)
- `--c3` **#163832`** (Secondary Surfaces & Hairlines)
- `--c4` **#235347** (Emerald Accents)
- `--c5` **#8EB69B** (Sage — Labels & Ambient Glow)
- `--c6` **#DAF1DE** (Pale Mint — Primary Text & Action Buttons)

Typography:
- **Bodoni Moda**: High-contrast Didone serif for name, titles, quotes, and project headings.
- **DM Sans**: Clean sans-serif for body copy, buttons, and navigation.
- **JetBrains Mono**: Technical monospace for tags, coordinates, and micro-copy.

---

## 🌟 Key Architectural & UI Features

### 1. 3D Background & Particle Cosmos (Three.js r128)
- Real-time 3D physical Torus Knot geometry with MeshPhysicalMaterial clearcoat lacquer and transmission.
- Full-site scroll synchronisation via Lenis smooth scroll and GSAP ScrollTrigger.
- Dual particle fields: 800 ambient stardust motes + 360-particle orbiting vortex ribbon reacting to mouse hover and scroll velocity.

### 2. Chapter 1: Home (Cinematic Hero)
- Oversized high-contrast typography ("JENIT JENSON") positioned above the portrait.
- Transparent cutout of Jenit Jenson with natural orange shirt, glasses, and beard intact.
- Dual portrait composition: monochromatic background cutout with ambient emerald back-glow + full-color foreground cutout.

### 3. Chapter 2: About (Liquid Glass Container)
- Curated upper-body portrait crop overlapping a 3D translucent liquid glass container.
- High-contrast editorial copy, education card, and luxury philosophy quote.

### 4. Chapter 3: Selected Works (Defined Boundaries Showcase)
Each project image preview is framed within a distinct, defined UI design language:
- **Project 01 (Royal Foods)**: *Skeuomorphic Luxury Hardware Frame* — Heavy metallic beveled chassis, 4 corner Phillips screws with cross-slots, debossed inner well, and acrylic glare sweep.
- **Project 02 (Zaffran)**: *Neumorphic Soft-3D Frame* — Smooth continuous curved boundary (34px radius), dual ambient light/dark shadows, and concave inner well.
- **Project 03 (Aegis Platform)**: *Glassmorphic Smoked Frosted Glass Frame* — Refractive 1.5px glass border, 24px backdrop blur, smoky tint, and animated specular light streak.
- **Project 04 (ResQLink)**: *Tactical Skeuomorphic HUD Frame* — Industrial casing with corner bracket plates, blinking telemetry LED, and recessed radar display well.

### 5. Chapter 4: Expertise (Middle-Aligned Neumorphic Grid)
- Soft raised neumorphic cards with centered, middle-aligned tool text and soft inset hover transitions.
- Interactive category filtering (All, Design & Prototyping, Frontend & 3D, Production & Systems).

### 6. Chapter 5: Direct Connect Dual Showcase (Instagram & WhatsApp)
- **Single Horizontal Line Alignment**: Both cards sit side-by-side with matched heights on desktop.
- **Instagram VIP Access Pass**: Skeuomorphic plate with 4 metallic screws, punched lanyard slot, hardware optical status LED, debossed QR chamber, acrylic glare, and tactile mechanical button.
- **WhatsApp Direct Line Pass**: Twin Skeuomorphic credential featuring scannable QR code, stamped phone plate (`+91 90721 05574`), and mechanical microswitch button.
- **Interactive 3D Spring Tilt**: Both cards dynamically track cursor movement with smooth 3D perspective spring physics and moving glare reflections.

---

## 📂 Project Structure

```text
PORTFOLIO/
├── index.html              # The complete, self-contained single-file portfolio
├── build_index.js          # Generator script to build/compile index.html
├── serve.js                # Local HTTP preview server (http://localhost:3000/)
├── public/
│   └── images/
│       ├── portrait_data.json      # Base64 data URIs for all embedded assets
│       ├── jenit-cutout.webp       # Transparent hero portrait cutout
│       ├── jenit-about-crop.webp   # Face/upper body crop for About
│       ├── jenit-logo.webp         # Isolated circular brand logo
│       ├── instagram-qr.webp       # Authentic Instagram QR card
│       └── whatsapp-qr.svg         # Scannable WhatsApp QR
├── verify_dual_skeuo.js    # Automated test verifying dual Skeuomorphic passes
├── verify_neomorphic.js    # Automated test verifying global design criteria
└── README.md               # Documentation
```

---

## 🚀 Development & Preview

### Local Preview Server
To run the local preview server on port 3000:
```bash
node serve.js
```
Open [http://localhost:3000/](http://localhost:3000/) in your browser.

### Rebuilding index.html
To re-compile the single self-contained `index.html`:
```bash
node build_index.js
```

### Running Automated Verification
```bash
node verify_dual_skeuo.js
node verify_neomorphic.js
```
