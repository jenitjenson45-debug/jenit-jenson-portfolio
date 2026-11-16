"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function Interactive3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check device capability
    const isMobile = window.innerWidth < 768;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0x0b2b26, 1.2);
    scene.add(ambientLight);

    // Key Light - Pale Mint highlight reflection
    const keyLight = new THREE.DirectionalLight(0xdaf1de, 2.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Fill Light - Emerald glow
    const fillLight = new THREE.PointLight(0x235347, 3.5, 20);
    fillLight.position.set(-4, -3, 3);
    scene.add(fillLight);

    // Rim Light - Sage reflection from below
    const rimLight = new THREE.PointLight(0x8eb69b, 2.0, 15);
    rimLight.position.set(0, -4, -2);
    scene.add(rimLight);

    // 5. Organic Sculptural Form (Metallic Torus Knot with custom physical finish)
    const geometry = new THREE.TorusKnotGeometry(
      isMobile ? 1.6 : 2.1,
      isMobile ? 0.42 : 0.48,
      140,
      32,
      2,
      3
    );

    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x0b2b26),
      emissive: new THREE.Color(0x051f20),
      emissiveIntensity: 0.25,
      roughness: 0.28,
      metalness: 0.88,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
    });

    const sculpture = new THREE.Mesh(geometry, material);
    sculpture.position.set(0, -0.2, -0.5);
    scene.add(sculpture);

    // 6. Subtle floating particles in Sage & Mint
    const particleCount = isMobile ? 40 : 90;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 14;
      positions[i + 1] = (Math.random() - 0.5) * 14;
      positions[i + 2] = (Math.random() - 0.5) * 8 - 1;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x8eb69b,
      size: 0.045,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Interaction state variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetX = (e.clientX - halfW) / halfW;
      targetY = (e.clientY - halfH) / halfH;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth lerp for mouse and scroll
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;
      scrollY += (targetScrollY - scrollY) * 0.05;

      // Sculptural continuous gentle motion + cursor reactivity
      sculpture.rotation.x += delta * 0.12 + mouseY * 0.01;
      sculpture.rotation.y += delta * 0.18 + mouseX * 0.015;
      sculpture.rotation.z += delta * 0.08;

      // Depth responds subtly to scroll
      const scrollFactor = scrollY * 0.0006;
      sculpture.position.z = -0.5 - Math.sin(scrollFactor) * 1.2;
      sculpture.position.y = -0.2 - (scrollY * 0.0004);

      // Subtle particle float
      particles.rotation.y = clock.getElapsedTime() * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
