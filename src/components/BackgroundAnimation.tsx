"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  fadeDir: number;
}

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
  opacity: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const isDark = () => document.documentElement.classList.contains("dark");

    // More particles, bigger sizes
    const createParticles = (count: number): Particle[] => {
      const arr: Particle[] = [];
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          fadeDir: Math.random() > 0.5 ? 1 : -1,
        });
      }
      return arr;
    };

    // Bigger, more visible orbs
    const createOrbs = (count: number): Orb[] => {
      const arr: Orb[] = [];
      const hues = [42, 45, 38, 48]; // gold tones for both modes
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 300 + 150,
          hue: hues[i % hues.length],
          opacity: Math.random() * 0.12 + 0.08,
          pulseSpeed: Math.random() * 0.01 + 0.005,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
      return arr;
    };

    const particles = createParticles(60);
    const orbs = createOrbs(7);

    const draw = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dark = isDark();

      // Draw orbs with pulsing
      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;

        // Pulse the opacity
        const pulse = Math.sin(time * orb.pulseSpeed + orb.pulsePhase) * 0.04;
        const currentOpacity = orb.opacity + pulse;

        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.radius
        );

        if (dark) {
          gradient.addColorStop(0, `hsla(${orb.hue}, 85%, 55%, ${currentOpacity})`);
          gradient.addColorStop(0.5, `hsla(${orb.hue}, 80%, 50%, ${currentOpacity * 0.4})`);
          gradient.addColorStop(1, `hsla(${orb.hue}, 80%, 50%, 0)`);
        } else {
          gradient.addColorStop(0, `hsla(${orb.hue}, 95%, 60%, ${currentOpacity * 0.7})`);
          gradient.addColorStop(0.5, `hsla(${orb.hue}, 90%, 55%, ${currentOpacity * 0.3})`);
          gradient.addColorStop(1, `hsla(${orb.hue}, 90%, 55%, 0)`);
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(
          orb.x - orb.radius,
          orb.y - orb.radius,
          orb.radius * 2,
          orb.radius * 2
        );
      }

      // Draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        p.opacity += p.fadeDir * 0.005;
        if (p.opacity > 0.8) p.fadeDir = -1;
        if (p.opacity < 0.1) p.fadeDir = 1;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Glow effect
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        if (dark) {
          glow.addColorStop(0, `rgba(231, 178, 33, ${p.opacity})`);
          glow.addColorStop(0.5, `rgba(231, 178, 33, ${p.opacity * 0.3})`);
          glow.addColorStop(1, `rgba(231, 178, 33, 0)`);
        } else {
          glow.addColorStop(0, `rgba(231, 178, 33, ${p.opacity * 0.8})`);
          glow.addColorStop(0.5, `rgba(231, 178, 33, ${p.opacity * 0.2})`);
          glow.addColorStop(1, `rgba(231, 178, 33, 0)`);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(231, 178, 33, ${p.opacity})`
          : `rgba(231, 178, 33, ${p.opacity * 0.9})`;
        ctx.fill();
      }

      // Connection lines — thicker, more visible, longer range
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = dark
              ? `rgba(231, 178, 33, ${alpha})`
              : `rgba(231, 178, 33, ${alpha * 0.6})`;
            ctx.lineWidth = dark ? 0.8 : 0.6;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
