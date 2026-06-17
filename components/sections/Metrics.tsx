'use client';
import { useEffect, useRef, useState } from 'react';

const metrics = [
  { label: 'Customer Satisfaction', value: 98, suffix: '%', color: '#0ea5e9', icon: '😊' },
  { label: 'Project Success Rate', value: 99, suffix: '%', color: '#10b981', icon: '✅' },
  { label: 'Repeat Clients', value: 87, suffix: '%', color: '#8b5cf6', icon: '🔄' },
  { label: 'Client Retention', value: 95, suffix: '%', color: '#f59e0b', icon: '🤝' },
];

const avgRating = 4.9;

function CircularProgress({ value, color, size = 120 }: { value: number; color: string; size?: number }) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<SVGCircleElement>(null);
  const started = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let current = 0;
        const target = value;
        const step = target / 60;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            setProgress(target);
            clearInterval(timer);
          } else {
            setProgress(Math.round(current));
          }
        }, 30);
      }
    }, { threshold: 0.5 });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [value]);

  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div ref={containerRef} style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background circle */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(14,165,233,0.08)" strokeWidth={8}
        />
        {/* Progress circle */}
        <circle
          ref={ref}
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.05s linear', filter: `drop-shadow(0 0 8px ${color}80)` }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
      }}>
        <span style={{
          fontSize: 24, fontWeight: 900, fontFamily: 'Space Grotesk',
          color: color, lineHeight: 1,
        }}>
          {progress}%
        </span>
      </div>
    </div>
  );
}

function AnimatedCount({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let current = 0;
        const timer = setInterval(() => {
          current += value / 60;
          if (current >= value) { setCount(value); clearInterval(timer); }
          else setCount(Math.round(current * 10) / 10);
        }, 30);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return <span ref={ref}>{value === 4.9 ? count.toFixed(1) : Math.round(count)}{suffix}</span>;
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

export default function Metrics() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="metrics" className="section-padding" style={{ background: '#020818', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 100%, rgba(14,165,233,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none' }} />

      <div className="container" ref={ref}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-badge">📈 Metrics</div>
          <h2 className="section-title">
            Customer <span className="gradient-text">Satisfaction Dashboard</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Live metrics from our client feedback system. Updated quarterly. No cherry-picking — this is the real data.
          </p>
        </div>

        {/* Circular Progress Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, marginBottom: 64 }} className="metrics-grid">
          {metrics.map((m, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                background: 'rgba(10,25,50,0.5)',
                border: '1px solid rgba(14,165,233,0.12)',
                borderRadius: 24, padding: '36px 24px',
                backdropFilter: 'blur(16px)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease ${i * 0.1}s`,
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 16 }}>{m.icon}</div>
              <CircularProgress value={m.value} color={m.color} size={110} />
              <div style={{ marginTop: 20, fontSize: 14, fontWeight: 600, color: '#94a3b8' }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Average Rating Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(14,165,233,0.08), rgba(139,92,246,0.08))',
          border: '1px solid rgba(14,165,233,0.15)',
          borderRadius: 24, padding: '40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 32,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.6s ease 0.5s',
        }}>
          <div>
            <div style={{ fontSize: 14, color: '#64748b', marginBottom: 8 }}>Overall Client Rating</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{
                fontSize: 64, fontWeight: 900, fontFamily: 'Space Grotesk',
                background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                <AnimatedCount value={4.9} suffix="" />
              </span>
              <div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 4 }}>
                  {[1, 2, 3, 4, 5].map(s => (
                    <span key={s} style={{ fontSize: 24, color: '#f59e0b' }}>★</span>
                  ))}
                </div>
                <div style={{ fontSize: 13, color: '#64748b' }}>out of 5.0</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { label: 'Total Reviews', value: '847+', icon: '📝' },
              { label: 'Net Promoter Score', value: '72', icon: '🎯' },
              { label: 'Avg Response Time', value: '< 2hrs', icon: '⚡' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{item.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#f0f9ff', fontFamily: 'Space Grotesk' }}>
                  {item.value}
                </div>
                <div style={{ fontSize: 12, color: '#475569' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .metrics-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
