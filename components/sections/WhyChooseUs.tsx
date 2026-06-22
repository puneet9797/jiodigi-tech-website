'use client';
import { useEffect, useRef, useState } from 'react';

const trustStats = [
  { icon: '🏆', value: '10+', label: 'Projects Delivered' },
  { icon: '⭐', value: '4.9/5', label: 'Average Client Rating' },
  { icon: '🔄', value: '99%', label: 'Repeat Clients' },
  { icon: '🚀', value: '2x', label: 'Faster Than Average' },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function WhyChooseUs() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="why-us" className="section-padding" style={{ background: '#020818', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="container" ref={ref}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-badge">✅ Why Choose Us</div>
          <h2 className="section-title">
            The <span className="gradient-text">JioLite Info Tech</span> Advantage
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Not all software companies are equal. Here's why 200+ businesses trust JioLite Info Tech over the competition.
          </p>
        </div>

        {/* Trust Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 64 }} className="trust-grid">
          {trustStats.map((stat, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(10,25,50,0.6)',
                border: '1px solid rgba(14,165,233,0.15)',
                borderRadius: 20, padding: '28px 20px',
                textAlign: 'center',
                backdropFilter: 'blur(16px)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease ${i * 0.1}s`,
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>{stat.icon}</div>
              <div style={{
                fontSize: 28, fontWeight: 800, fontFamily: 'Space Grotesk',
                background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                marginBottom: 6,
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>


        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <p style={{ color: '#64748b', fontSize: 16, marginBottom: 24 }}>
            Still unsure? Talk to our experts — no obligation, completely free.
          </p>
          <a href="#contact" className="btn-primary" style={{ textDecoration: 'none', fontSize: 16, padding: '16px 40px' }}>
            <span>Book Free Consultation →</span>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .trust-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
