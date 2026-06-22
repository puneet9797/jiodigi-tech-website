'use client';
import { useEffect, useRef, useState } from 'react';
import { Target, Eye, Heart, Lightbulb, Users, Award } from 'lucide-react';

const pillars = [
  {
    icon: <Eye size={24} />,
    title: 'Our Vision',
    text: 'To be the most trusted technology partner for businesses worldwide, enabling every organization to harness the full power of software and AI.',
    color: '#0ea5e9',
  },
  {
    icon: <Target size={24} />,
    title: 'Our Mission',
    text: 'To build scalable, secure, and intelligent software that solves real business problems — faster, smarter, and more affordably than anyone else.',
    color: '#8b5cf6',
  },
  {
    icon: <Heart size={24} />,
    title: 'Core Values',
    text: 'Innovation. Integrity. Excellence. Client-first mindset. Continuous improvement. We build relationships, not just software.',
    color: '#10b981',
  },
  {
    icon: <Lightbulb size={24} />,
    title: 'Innovation First',
    text: 'We challenge conventions. Every project is an opportunity to push boundaries, adopt cutting-edge technologies, and redefine what\'s possible.',
    color: '#f59e0b',
  },
  {
    icon: <Users size={24} />,
    title: 'Company Culture',
    text: 'Collaborative, inclusive, and driven by curiosity. Our team of 50+ engineers thrives on challenging problems and continuous learning.',
    color: '#06b6d4',
  },
  {
    icon: <Award size={24} />,
    title: 'Track Record',
    text: '10+ years, 500+ projects, 200+ happy clients, 0 project failures. Our quality speaks louder than any marketing claim.',
    color: '#f59e0b',
  },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function About() {
  const { ref: sectionRef, inView } = useInView(0.1);

  return (
    <section id="about" className="section-padding" style={{ background: 'linear-gradient(180deg, #020818, #030d1a, #020818)', position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(ellipse at 20% 50%, rgba(14,165,233,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />

      <div className="container" ref={sectionRef}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="section-badge">🏢 About Us</div>
          <h2 className="section-title">
            Built for the{' '}
            <span className="gradient-text">Businesses of Tomorrow</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            We help startups, SMEs, enterprises, educational institutions, healthcare organizations, and retail businesses{' '}
            <strong style={{ color: '#f0f9ff' }}>digitize their operations</strong> through modern technology.
          </p>
        </div>


        {/* Pillars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="pillars-grid">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="service-card"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.6s ease ${0.9 + i * 0.1}s`,
              }}
            >
              {/* Icon */}
              <div style={{
                width: 52, height: 52,
                borderRadius: 14,
                background: `${p.color}18`,
                border: `1px solid ${p.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: p.color,
                marginBottom: 18,
              }}>
                {p.icon}
              </div>
              <h4 style={{ fontSize: 17, fontWeight: 700, color: '#f0f9ff', marginBottom: 10 }}>{p.title}</h4>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>{p.text}</p>
            </div>
          ))}
        </div>

        {/* Trust Banner */}
        <div style={{
          marginTop: 80,
          padding: '48px 40px',
          background: 'linear-gradient(135deg, rgba(14,165,233,0.08), rgba(139,92,246,0.08))',
          border: '1px solid rgba(14,165,233,0.15)',
          borderRadius: 24,
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: 28, fontWeight: 800, color: '#f0f9ff', marginBottom: 16 }}>
            Trusted Across Industries
          </h3>
          <p style={{ color: '#64748b', fontSize: 16, marginBottom: 32, maxWidth: 600, margin: '0 auto 32px' }}>
            From healthcare to retail, manufacturing to education — we've built solutions that work at every scale.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {['Healthcare', 'Education', 'Manufacturing', 'Retail', 'Finance', 'Logistics', 'Real Estate', 'Hospitality'].map(ind => (
              <span key={ind} className="tech-badge">{ind}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pillars-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
