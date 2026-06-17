'use client';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Sharma',
    role: 'CEO, Apex Industries Ltd.',
    rating: 5,
    text: 'jiodigi Tech transformed our entire business process. Their ERP system saved hundreds of hours every month and gave us real-time visibility we never had before. Exceptional team, exceptional results.',
    industry: 'Manufacturing',
    emoji: '👨‍💼',
    outcome: '300% efficiency increase',
    color: '#0ea5e9',
  },
  {
    name: 'Priya Mehta',
    role: 'Founder, ShopNow Retail',
    rating: 5,
    text: 'Their team delivered beyond our expectations. The e-commerce platform they built is scalable, fast, and our sales doubled in just 3 months. Professional, responsive, and technically brilliant.',
    industry: 'E-Commerce',
    emoji: '👩‍💼',
    outcome: '200% sales growth',
    color: '#10b981',
  },
  {
    name: 'Dr. Amit Verma',
    role: 'Director, MediCare Hospital Group',
    rating: 5,
    text: 'Outstanding support and technical expertise. The hospital management system they built handles 500+ patients daily with zero downtime. Highly recommended for any healthcare organization.',
    industry: 'Healthcare',
    emoji: '👨‍⚕️',
    outcome: '60% admin time saved',
    color: '#8b5cf6',
  },
  {
    name: 'Sunita Agarwal',
    role: 'Head of Operations, BrightFuture EduTech',
    rating: 5,
    text: 'We went from paper-based admissions to a fully digital platform in 90 days. jiodigi Tech understood our complex requirements and delivered a system that 50,000+ students use daily. Incredible work.',
    industry: 'Education',
    emoji: '👩‍🏫',
    outcome: '120% enrollment growth',
    color: '#f59e0b',
  },
  {
    name: 'Vikram Nair',
    role: 'CTO, LogisticsPro India',
    rating: 5,
    text: 'We evaluated 8 vendors before choosing jiodigi Tech. Best decision we made. Their technical depth, communication, and commitment to deadlines is unmatched in the industry.',
    industry: 'Logistics',
    emoji: '🚚',
    outcome: '45% cost reduction',
    color: '#06b6d4',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#f59e0b', fontSize: 18 }}>★</span>
      ))}
    </div>
  );
}

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

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { ref, inView } = useInView(0.1);

  const goTo = (index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(index);
      setAnimating(false);
    }, 200);
  };

  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((active + 1) % testimonials.length);

  // Auto-advance
  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => next(), 5000);
    return () => clearInterval(timer);
  }, [active, inView]);

  const current = testimonials[active];

  return (
    <section id="testimonials" className="section-padding" style={{ background: 'linear-gradient(180deg, #020818, #030d1a)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" ref={ref}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-badge">⭐ Testimonials</div>
          <h2 className="section-title">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Don't take our word for it. Hear directly from the businesses that trust us to power their operations.
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div
            style={{
              background: 'rgba(10,25,50,0.6)',
              border: `1px solid ${current.color}25`,
              borderRadius: 28, padding: '56px 64px',
              backdropFilter: 'blur(20px)',
              position: 'relative',
              opacity: animating ? 0 : (inView ? 1 : 0),
              transform: animating ? 'scale(0.98)' : (inView ? 'scale(1)' : 'scale(0.95)'),
              transition: 'all 0.3s ease',
              boxShadow: `0 40px 80px rgba(0,0,0,0.3), 0 0 40px ${current.color}10`,
            }}
            className="testimonial-card"
          >
            {/* Quote Icon */}
            <div style={{
              position: 'absolute', top: 32, left: 48,
              width: 44, height: 44,
              background: `${current.color}20`,
              border: `1px solid ${current.color}30`,
              borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Quote size={20} color={current.color} />
            </div>

            {/* Outcome Badge */}
            <div style={{
              position: 'absolute', top: 32, right: 48,
              padding: '6px 16px',
              background: `${current.color}15`,
              border: `1px solid ${current.color}30`,
              borderRadius: 100, fontSize: 13, fontWeight: 700,
              color: current.color,
            }}>
              ✦ {current.outcome}
            </div>

            {/* Stars */}
            <div style={{ marginBottom: 24, marginTop: 24 }}>
              <Stars count={current.rating} />
            </div>

            {/* Quote Text */}
            <blockquote style={{
              fontSize: 20, color: '#f0f9ff', lineHeight: 1.75,
              fontStyle: 'italic', marginBottom: 40,
              fontWeight: 400,
            }}>
              "{current.text}"
            </blockquote>

            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 56, height: 56,
                borderRadius: '50%',
                background: `${current.color}20`,
                border: `2px solid ${current.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28,
              }}>
                {current.emoji}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17, color: '#f0f9ff' }}>{current.name}</div>
                <div style={{ fontSize: 14, color: '#64748b' }}>{current.role}</div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <span style={{
                  padding: '4px 12px',
                  background: `${current.color}10`,
                  border: `1px solid ${current.color}25`,
                  borderRadius: 100, fontSize: 12,
                  color: current.color, fontWeight: 600,
                }}>
                  {current.industry}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 40 }}>
            <button
              onClick={prev}
              style={{
                width: 44, height: 44,
                borderRadius: '50%',
                background: 'rgba(14,165,233,0.1)',
                border: '1px solid rgba(14,165,233,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#0ea5e9', cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(14,165,233,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(14,165,233,0.1)')}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: 8 }}>
              {testimonials.map((t, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    width: active === i ? 32 : 8, height: 8,
                    borderRadius: 4,
                    background: active === i ? t.color : 'rgba(14,165,233,0.2)',
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              style={{
                width: 44, height: 44,
                borderRadius: '50%',
                background: 'rgba(14,165,233,0.1)',
                border: '1px solid rgba(14,165,233,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#0ea5e9', cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(14,165,233,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(14,165,233,0.1)')}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Small preview cards */}
          <div style={{ display: 'flex', gap: 16, marginTop: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
            {testimonials.map((t, i) => (
              <div
                key={i}
                onClick={() => goTo(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 16px',
                  background: active === i ? `${t.color}15` : 'rgba(10,25,50,0.5)',
                  border: `1px solid ${active === i ? t.color + '40' : 'rgba(14,165,233,0.12)'}`,
                  borderRadius: 100,
                  cursor: 'pointer', transition: 'all 0.3s ease',
                }}
              >
                <span style={{ fontSize: 18 }}>{t.emoji}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: active === i ? t.color : '#475569' }}>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .testimonial-card { padding: 32px 24px !important; }
        }
      `}</style>
    </section>
  );
}
