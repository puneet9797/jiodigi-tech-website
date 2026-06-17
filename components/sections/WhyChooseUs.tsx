'use client';
import { useEffect, useRef, useState } from 'react';
import { Check, X } from 'lucide-react';

const features = [
  { label: 'Expert Developers', us: true, others: false },
  { label: 'Enterprise Architecture', us: true, others: false },
  { label: 'Secure Coding Standards', us: true, others: 'Partial' },
  { label: 'Dedicated Support Team', us: true, others: false },
  { label: 'Scalable Solutions', us: true, others: 'Partial' },
  { label: 'Fast Delivery (Agile)', us: true, others: false },
  { label: 'Affordable Pricing', us: true, others: false },
  { label: 'Modern Technologies', us: true, others: 'Partial' },
  { label: 'Post-Launch Support', us: true, others: false },
  { label: 'Free Consultation', us: true, others: false },
  { label: 'Source Code Ownership', us: true, others: false },
  { label: 'NDA & Data Protection', us: true, others: 'Partial' },
];

const trustStats = [
  { icon: '🏆', value: '500+', label: 'Projects Delivered' },
  { icon: '⭐', value: '4.9/5', label: 'Average Client Rating' },
  { icon: '🔄', value: '87%', label: 'Repeat Clients' },
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
            The <span className="gradient-text">jiodigi Tech</span> Advantage
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Not all software companies are equal. Here's why 200+ businesses trust jiodigi Tech over the competition.
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

        {/* Comparison Table */}
        <div style={{
          background: 'rgba(10,25,50,0.5)',
          border: '1px solid rgba(14,165,233,0.15)',
          borderRadius: 24, overflow: 'hidden',
          backdropFilter: 'blur(16px)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s ease 0.4s',
        }}>
          {/* Table Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            background: 'rgba(10,25,50,0.8)',
            borderBottom: '1px solid rgba(14,165,233,0.1)',
            padding: '0',
          }}>
            <div style={{ padding: '20px 28px', fontWeight: 700, fontSize: 14, color: '#94a3b8' }}>Feature</div>
            <div style={{
              padding: '20px 28px', textAlign: 'center',
              background: 'rgba(14,165,233,0.08)',
              borderLeft: '1px solid rgba(14,165,233,0.15)',
              borderRight: '1px solid rgba(14,165,233,0.15)',
            }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#0ea5e9', marginBottom: 2 }}>JioDigi</div>
              <div style={{ fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tech</div>
            </div>
            <div style={{ padding: '20px 28px', textAlign: 'center' }}>
              <div style={{ fontWeight: 600, fontSize: 16, color: '#475569' }}>Others</div>
              <div style={{ fontSize: 11, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Typical Vendors</div>
            </div>
          </div>

          {/* Rows */}
          {features.map((feature, i) => (
            <div
              key={i}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                borderBottom: i < features.length - 1 ? '1px solid rgba(14,165,233,0.06)' : 'none',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(14,165,233,0.03)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ padding: '16px 28px', fontSize: 14, color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                {feature.label}
              </div>
              <div style={{
                padding: '16px 28px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(14,165,233,0.04)',
                borderLeft: '1px solid rgba(14,165,233,0.08)',
                borderRight: '1px solid rgba(14,165,233,0.08)',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 10px rgba(16,185,129,0.4)',
                }}>
                  <Check size={14} color="white" strokeWidth={3} />
                </div>
              </div>
              <div style={{ padding: '16px 28px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {feature.others === true ? (
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Check size={14} color="white" strokeWidth={3} />
                  </div>
                ) : feature.others === false ? (
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <X size={14} color="#ef4444" strokeWidth={3} />
                  </div>
                ) : (
                  <span style={{
                    fontSize: 12, fontWeight: 600, color: '#f59e0b',
                    background: 'rgba(245,158,11,0.1)',
                    border: '1px solid rgba(245,158,11,0.2)',
                    borderRadius: 100, padding: '3px 10px',
                  }}>
                    {feature.others}
                  </span>
                )}
              </div>
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
