'use client';
import { useEffect, useRef, useState } from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';

const caseStudies = [
  {
    industry: 'Manufacturing',
    client: 'Apex Industries Ltd.',
    challenge: 'Manual inventory tracking causing 30% stock discrepancies and delayed production.',
    solution: 'Deployed JioLite ERP with real-time inventory sync, automated GST filing, and production scheduling.',
    technologies: ['JioLite ERP', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
    results: [
      { metric: 'Efficiency', value: '300%', direction: 'up', color: '#10b981' },
      { metric: 'Manual Work', value: '45%', direction: 'down', color: '#0ea5e9' },
      { metric: 'Reporting Speed', value: '90%', direction: 'up', color: '#8b5cf6' },
      { metric: 'Cost Savings', value: '₹24L/yr', direction: 'saved', color: '#f59e0b' },
    ],
    color: '#0ea5e9',
    emoji: '🏭',
  },
  {
    industry: 'E-Commerce Retail',
    client: 'ShopNow Pvt. Ltd.',
    challenge: 'Fragmented sales channels, no inventory visibility, and 40% cart abandonment rate.',
    solution: 'Built JioLite Commerce with multi-vendor marketplace, real-time inventory, and AI-driven recommendations.',
    technologies: ['JioLite Commerce', 'Next.js', 'Python', 'Redis', 'Stripe'],
    results: [
      { metric: 'Sales Growth', value: '200%', direction: 'up', color: '#10b981' },
      { metric: 'Cart Abandonment', value: '60%', direction: 'down', color: '#0ea5e9' },
      { metric: 'Order Processing', value: '5x', direction: 'faster', color: '#8b5cf6' },
      { metric: 'Revenue', value: '₹5Cr+', direction: 'generated', color: '#f59e0b' },
    ],
    color: '#10b981',
    emoji: '🛒',
  },
  {
    industry: 'Healthcare',
    client: 'MediCare Hospital Group',
    challenge: 'Patient data silos, billing errors, and lack of real-time department coordination.',
    solution: 'Custom Hospital Management System with EHR integration, automated billing, and AI triage assistant.',
    technologies: ['Custom ERP', 'React', 'FastAPI', 'PostgreSQL', 'OpenAI'],
    results: [
      { metric: 'Admin Time', value: '60%', direction: 'down', color: '#10b981' },
      { metric: 'Billing Accuracy', value: '99.8%', direction: 'achieved', color: '#0ea5e9' },
      { metric: 'Patient Satisfaction', value: '40%', direction: 'up', color: '#8b5cf6' },
      { metric: 'Cost Reduction', value: '₹18L/yr', direction: 'saved', color: '#f59e0b' },
    ],
    color: '#8b5cf6',
    emoji: '🏥',
  },
  {
    industry: 'Education',
    client: 'BrightFuture EduTech',
    challenge: 'No unified platform for 50,000 students, manual fee collection, and poor engagement tracking.',
    solution: 'Built AI-powered LMS with automated admissions, fee management, live classes, and analytics.',
    technologies: ['LMS Platform', 'Vue.js', 'Laravel', 'MySQL', 'LangChain'],
    results: [
      { metric: 'Student Enrollment', value: '120%', direction: 'up', color: '#10b981' },
      { metric: 'Fee Collection', value: '98%', direction: 'efficiency', color: '#0ea5e9' },
      { metric: 'Engagement Rate', value: '3x', direction: 'increase', color: '#8b5cf6' },
      { metric: 'Operational Cost', value: '35%', direction: 'down', color: '#f59e0b' },
    ],
    color: '#f59e0b',
    emoji: '🎓',
  },
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

export default function CaseStudies() {
  const { ref, inView } = useInView(0.05);

  return (
    <section id="case-studies" className="section-padding" style={{ background: '#020818', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.06) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      <div className="container" ref={ref}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-badge">📊 Case Studies</div>
          <h2 className="section-title">
            Real Results for <span className="gradient-text">Real Businesses</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Numbers don't lie. Here's what happened when leading businesses chose JioLite Info Tech.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {caseStudies.map((cs, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(10,25,50,0.5)',
                border: `1px solid ${cs.color}20`,
                borderRadius: 24, overflow: 'hidden',
                backdropFilter: 'blur(16px)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : (i % 2 === 0 ? 'translateX(-40px)' : 'translateX(40px)'),
                transition: `all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${i * 0.15}s`,
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }} className="case-grid">
                {/* Left Content */}
                <div style={{ padding: '40px', borderRight: `1px solid ${cs.color}15` }}>
                  {/* Industry Tag */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <span style={{ fontSize: 28 }}>{cs.emoji}</span>
                    <div>
                      <div style={{
                        fontSize: 11, fontWeight: 700, color: cs.color,
                        textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2,
                      }}>
                        {cs.industry}
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#f0f9ff' }}>{cs.client}</div>
                    </div>
                  </div>

                  {/* Challenge */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                      🔴 Challenge
                    </div>
                    <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>{cs.challenge}</p>
                  </div>

                  {/* Solution */}
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                      ✅ Solution
                    </div>
                    <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.7 }}>{cs.solution}</p>
                  </div>

                  {/* Technologies */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {cs.technologies.map(tech => (
                      <span key={tech} style={{
                        padding: '4px 12px',
                        background: `${cs.color}10`,
                        border: `1px solid ${cs.color}25`,
                        borderRadius: 100, fontSize: 12, color: '#94a3b8',
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Results */}
                <div style={{ padding: '40px', background: `${cs.color}04` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: cs.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 24 }}>
                    📈 Business Results
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
                    {cs.results.map((r, ri) => (
                      <div key={ri} style={{
                        background: 'rgba(10,25,50,0.6)',
                        border: `1px solid ${r.color}20`,
                        borderRadius: 16, padding: '20px',
                        textAlign: 'center',
                      }}>
                        <div style={{
                          fontSize: 28, fontWeight: 900, fontFamily: 'Space Grotesk',
                          color: r.color, marginBottom: 4,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                        }}>
                          {r.direction === 'down' && <span style={{ fontSize: 18 }}>↓</span>}
                          {r.direction === 'up' && <span style={{ fontSize: 18 }}>↑</span>}
                          {!['up', 'down'].includes(r.direction) && <TrendingUp size={20} />}
                          {r.value}
                        </div>
                        <div style={{ fontSize: 12, color: '#475569', fontWeight: 500 }}>
                          {r.metric} {r.direction !== 'up' && r.direction !== 'down' ? r.direction : (r.direction === 'up' ? 'improvement' : 'reduction')}
                        </div>
                      </div>
                    ))}
                  </div>

                  <a href="#contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    color: cs.color, fontSize: 14, fontWeight: 600,
                    textDecoration: 'none',
                    padding: '10px 20px',
                    background: `${cs.color}10`,
                    border: `1px solid ${cs.color}30`,
                    borderRadius: 10,
                    transition: 'all 0.3s ease',
                  }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = `${cs.color}20`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = `${cs.color}10`;
                    }}
                  >
                    View Full Case Study <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .case-grid { grid-template-columns: 1fr !important; }
          .case-grid > div:first-child { border-right: none !important; border-bottom: 1px solid rgba(14,165,233,0.1); }
        }
      `}</style>
    </section>
  );
}
