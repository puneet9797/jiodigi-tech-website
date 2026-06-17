'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';

const stats = [
  { value: 500, suffix: '+', label: 'Projects Delivered' },
  { value: 200, suffix: '+', label: 'Happy Clients' },
  { value: 99.9, suffix: '%', label: 'Uptime SLA' },
  { value: 10, suffix: '+', label: 'Years Experience' },
];

const floatingCards = [
  { label: 'ERP', icon: '⚡', color: '#0ea5e9', delay: 0 },
  { label: 'CRM', icon: '🎯', color: '#8b5cf6', delay: 1.5 },
  { label: 'E-Commerce', icon: '🛒', color: '#10b981', delay: 3 },
  { label: 'Mobile', icon: '📱', color: '#f59e0b', delay: 4.5 },
  { label: 'AI Solutions', icon: '🧠', color: '#06b6d4', delay: 6 },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current * 10) / 10);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref}>
      {value === 99.9 ? count.toFixed(1) : Math.round(count)}{suffix}
    </div>
  );
}

// Canvas Globe Component
function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const R = Math.min(cx, cy) - 20;

    function drawGlobe() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Outer glow
      const grd = ctx.createRadialGradient(cx, cy, R * 0.3, cx, cy, R * 1.2);
      grd.addColorStop(0, 'rgba(14,165,233,0.08)');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Latitude lines
      for (let lat = -80; lat <= 80; lat += 20) {
        const latRad = (lat * Math.PI) / 180;
        const r = R * Math.cos(latRad);
        const y = cy + R * Math.sin(latRad);
        ctx.beginPath();
        ctx.ellipse(cx, y, r, r * 0.25, 0, 0, 2 * Math.PI);
        ctx.strokeStyle = lat === 0 ? 'rgba(14,165,233,0.35)' : 'rgba(14,165,233,0.12)';
        ctx.lineWidth = lat === 0 ? 1.5 : 0.8;
        ctx.stroke();
      }

      // Longitude lines
      for (let lon = 0; lon < 180; lon += 20) {
        const lonRad = ((lon + angle) * Math.PI) / 180;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(lonRad);
        ctx.beginPath();
        ctx.ellipse(0, 0, R * 0.25, R, 0, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(14,165,233,0.1)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
      }

      // Outer ring
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(14,165,233,0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Glowing dots on surface
      const dotPositions = [
        [20, 40], [-30, 120], [50, -60], [-50, 200], [10, 290], [60, 160],
      ];
      dotPositions.forEach(([lat, lon]) => {
        const latRad = (lat * Math.PI) / 180;
        const lonRad = ((lon + angle * 1.5) * Math.PI) / 180;
        const x3d = R * Math.cos(latRad) * Math.cos(lonRad);
        const y3d = R * Math.sin(latRad);
        const z3d = R * Math.cos(latRad) * Math.sin(lonRad);

        if (z3d > 0) {
          const dotX = cx + x3d;
          const dotY = cy - y3d;
          const alpha = (z3d / R) * 0.8 + 0.2;
          ctx.beginPath();
          ctx.arc(dotX, dotY, 3, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(14,165,233,${alpha})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(dotX, dotY, 6, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(14,165,233,${alpha * 0.3})`;
          ctx.fill();
        }
      });

      // Orbiting ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((angle * Math.PI) / 180 * 0.5);
      ctx.beginPath();
      ctx.ellipse(0, 0, R * 1.25, R * 0.35, (30 * Math.PI) / 180, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(139,92,246,0.35)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 12]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Orbiting dot
      const oa = angle * Math.PI / 180 * 0.5;
      const ox = R * 1.25 * Math.cos(oa);
      const oy = R * 0.35 * Math.sin(oa);
      const rotOx = ox * Math.cos((30 * Math.PI) / 180) - oy * Math.sin((30 * Math.PI) / 180);
      const rotOy = ox * Math.sin((30 * Math.PI) / 180) + oy * Math.cos((30 * Math.PI) / 180);
      ctx.beginPath();
      ctx.arc(rotOx, rotOy, 5, 0, 2 * Math.PI);
      ctx.fillStyle = '#8b5cf6';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(rotOx, rotOy, 10, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(139,92,246,0.3)';
      ctx.fill();
      ctx.restore();

      angle += 0.3;
      animRef.current = requestAnimationFrame(drawGlobe);
    }

    drawGlobe();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      style={{ display: 'block', maxWidth: '100%', margin: '0 auto' }}
    />
  );
}

// Particle Background
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }[] = [];
    const colors = ['rgba(14,165,233,', 'rgba(139,92,246,', 'rgba(6,182,212,'];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
        ctx.fillStyle = p.color + p.opacity + ')';
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(14,165,233,${0.05 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animate();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #020818 0%, #030d1a 60%, #020818 100%)',
      }}
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Grid Background */}
      <div className="bg-grid" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Radial Glows */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 600,
        background: 'radial-gradient(ellipse at center, rgba(14,165,233,0.08) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '30%', right: '10%',
        width: 400, height: 400,
        background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.1) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      {/* Main Content */}
      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}
          className="hero-grid">
          
          {/* Left: Text Content */}
          <div style={{ maxWidth: 600 }}>
            {/* Badge */}
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 16px', borderRadius: 100,
                background: 'rgba(14,165,233,0.1)',
                border: '1px solid rgba(14,165,233,0.25)',
                fontSize: 12, fontWeight: 600,
                color: '#0ea5e9', letterSpacing: '0.08em',
                textTransform: 'uppercase', marginBottom: 24,
                animation: mounted ? 'slide-up 0.6s ease forwards' : 'none',
                opacity: mounted ? 1 : 0,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0ea5e9', animation: 'pulse-glow 2s infinite' }} />
              🚀 Trusted by 200+ Enterprises Worldwide
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: 24,
                color: '#f0f9ff',
                letterSpacing: '-0.03em',
                animation: mounted ? 'slide-up 0.6s 0.1s ease both' : 'none',
              }}
            >
              Transforming Businesses Through{' '}
              <span
                className="gradient-text"
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6, #06b6d4)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'gradient-shift 4s ease infinite',
                }}
              >
                Innovative Software Solutions
              </span>
            </h1>

            {/* Subheadline */}
            <p
              style={{
                fontSize: 18,
                color: '#94a3b8',
                lineHeight: 1.75,
                marginBottom: 40,
                animation: mounted ? 'slide-up 0.6s 0.2s ease both' : 'none',
              }}
            >
              We build{' '}
              <span style={{ color: '#0ea5e9', fontWeight: 600 }}>ERP Systems</span>,{' '}
              <span style={{ color: '#8b5cf6', fontWeight: 600 }}>CRM Platforms</span>,{' '}
              <span style={{ color: '#10b981', fontWeight: 600 }}>E-Commerce Solutions</span>,{' '}
              AI Automation, Mobile Apps, and Enterprise Software that help businesses{' '}
              <strong style={{ color: '#f0f9ff' }}>scale faster</strong>.
            </p>

            {/* CTA Buttons */}
            <div
              style={{
                display: 'flex', gap: 16, flexWrap: 'wrap',
                animation: mounted ? 'slide-up 0.6s 0.3s ease both' : 'none',
                marginBottom: 56,
              }}
            >
              <a href="#contact" className="btn-primary" style={{ textDecoration: 'none', fontSize: 15 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  Book Free Consultation <ArrowRight size={18} />
                </span>
              </a>
              <a href="#products" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 15 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Play size={16} fill="currentColor" /> View Portfolio
                </span>
              </a>
            </div>

            {/* Stats */}
            <div
              style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
                animation: mounted ? 'slide-up 0.6s 0.4s ease both' : 'none',
              }}
              className="stats-grid"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: 'center',
                    padding: '16px 8px',
                    background: 'rgba(14,165,233,0.05)',
                    border: '1px solid rgba(14,165,233,0.12)',
                    borderRadius: 16,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                      fontWeight: 800,
                      fontFamily: 'Space Grotesk',
                      background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      marginBottom: 4,
                    }}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 3D Globe */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Globe */}
            <div
              style={{
                position: 'relative',
                animation: 'float-slow 8s ease-in-out infinite',
              }}
            >
              <GlobeCanvas />

              {/* Center glow */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at center, rgba(14,165,233,0.12) 0%, transparent 60%)',
                pointerEvents: 'none',
              }} />
            </div>

            {/* Floating Service Cards */}
            {floatingCards.map((card, i) => {
              const positions = [
                { top: '5%', left: '-10%' },
                { top: '20%', right: '-15%' },
                { bottom: '30%', left: '-18%' },
                { bottom: '10%', right: '-10%' },
                { top: '50%', left: '-22%' },
              ];
              return (
                <div
                  key={card.label}
                  style={{
                    position: 'absolute',
                    ...positions[i],
                    background: 'rgba(10,25,50,0.7)',
                    backdropFilter: 'blur(16px)',
                    border: `1px solid ${card.color}30`,
                    borderRadius: 14,
                    padding: '12px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    animation: `float ${5 + i}s ease-in-out infinite`,
                    animationDelay: `${card.delay}s`,
                    boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${card.color}20`,
                    zIndex: 2,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ fontSize: 20 }}>{card.icon}</span>
                  <span style={{ color: '#f0f9ff', fontWeight: 600, fontSize: 13 }}>{card.label}</span>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: card.color, animation: 'pulse-glow 2s infinite' }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        animation: 'float 2s ease-in-out infinite', zIndex: 1,
      }}>
        <span style={{ color: '#475569', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll to explore</span>
        <ChevronDown size={20} color="#0ea5e9" />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > div:last-child {
            display: none;
          }
          .hero-grid > div:first-child {
            max-width: 100% !important;
          }
        }
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
