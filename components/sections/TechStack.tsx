'use client';
import { useEffect, useRef, useState } from 'react';

const techCategories = [
  {
    category: 'Frontend',
    color: '#0ea5e9',
    techs: [
      { name: 'Next.js', icon: '▲', desc: 'React framework for production' },
      { name: 'React', icon: '⚛', desc: 'UI component library' },
      { name: 'Vue.js', icon: '🟢', desc: 'Progressive JavaScript framework' },
      { name: 'TypeScript', icon: 'TS', desc: 'Typed JavaScript' },
    ],
  },
  {
    category: 'Backend',
    color: '#8b5cf6',
    techs: [
      { name: 'Node.js', icon: '⬡', desc: 'JavaScript runtime' },
      { name: 'Laravel', icon: '🔴', desc: 'PHP web framework' },
      { name: 'Python', icon: '🐍', desc: 'Versatile programming language' },
      { name: 'FastAPI', icon: '⚡', desc: 'Modern Python API framework' },
    ],
  },
  {
    category: 'Database',
    color: '#10b981',
    techs: [
      { name: 'PostgreSQL', icon: '🐘', desc: 'Advanced open source database' },
      { name: 'MySQL', icon: '🐬', desc: 'World\'s most popular DB' },
      { name: 'MongoDB', icon: '🍃', desc: 'NoSQL document database' },
      { name: 'Redis', icon: '⚡', desc: 'In-memory data store' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    color: '#f59e0b',
    techs: [
      { name: 'AWS', icon: '☁', desc: 'Amazon Web Services' },
      { name: 'Docker', icon: '🐳', desc: 'Container platform' },
      { name: 'Kubernetes', icon: '⎈', desc: 'Container orchestration' },
      { name: 'CI/CD', icon: '🔄', desc: 'Automated deployment pipeline' },
    ],
  },
  {
    category: 'AI & ML',
    color: '#06b6d4',
    techs: [
      { name: 'OpenAI', icon: '🧠', desc: 'GPT & AI APIs' },
      { name: 'LangChain', icon: '🔗', desc: 'LLM application framework' },
      { name: 'TensorFlow', icon: '🤖', desc: 'ML framework by Google' },
      { name: 'Vector DBs', icon: '📊', desc: 'AI-powered vector search' },
    ],
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

function TechBadge({ tech, color, delay, inView }: { tech: { name: string; icon: string; desc: string }; color: string; delay: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 20px',
        background: hovered ? `${color}12` : 'rgba(10,25,50,0.6)',
        border: `1px solid ${hovered ? color + '40' : 'rgba(14,165,233,0.12)'}`,
        borderRadius: 16, cursor: 'default',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        transform: inView
          ? (hovered ? 'translateY(-4px)' : 'translateY(0)')
          : 'translateY(20px)',
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${delay}s` : '0s',
        boxShadow: hovered ? `0 8px 30px ${color}20` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: 38, height: 38,
        borderRadius: 10,
        background: hovered ? `${color}20` : 'rgba(14,165,233,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, fontWeight: 700,
        color: hovered ? color : '#64748b',
        border: `1px solid ${hovered ? color + '30' : 'rgba(14,165,233,0.1)'}`,
        transition: 'all 0.3s ease',
        flexShrink: 0,
      }}>
        {tech.icon}
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: hovered ? '#f0f9ff' : '#94a3b8', transition: 'color 0.3s' }}>
          {tech.name}
        </div>
        {hovered && (
          <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>{tech.desc}</div>
        )}
      </div>
    </div>
  );
}

export default function TechStack() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="tech-stack" className="section-padding" style={{ background: 'linear-gradient(180deg, #020818, #030d1a)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 70% 30%, rgba(14,165,233,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none' }} />

      <div className="container" ref={ref}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-badge">⚙️ Tech Stack</div>
          <h2 className="section-title">
            Built with <span className="gradient-text">Modern Technologies</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            We use the latest, most reliable technologies — battle-tested in production at scale, chosen for performance, security, and developer experience.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {techCategories.map((cat, ci) => (
            <div key={ci}>
              {/* Category Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{
                  width: 4, height: 28, borderRadius: 2,
                  background: cat.color,
                  boxShadow: `0 0 10px ${cat.color}80`,
                }} />
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f0f9ff' }}>{cat.category}</h3>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${cat.color}30, transparent)` }} />
              </div>

              {/* Tech Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }} className="tech-grid">
                {cat.techs.map((tech, ti) => (
                  <TechBadge
                    key={ti}
                    tech={tech}
                    color={cat.color}
                    delay={ci * 0.1 + ti * 0.08}
                    inView={inView}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom quote */}
        <div style={{
          marginTop: 72, textAlign: 'center',
          padding: '40px',
          background: 'linear-gradient(135deg, rgba(14,165,233,0.06), rgba(139,92,246,0.06))',
          border: '1px solid rgba(14,165,233,0.12)',
          borderRadius: 24,
        }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#f0f9ff', marginBottom: 12 }}>
            "We never compromise on technology choices"
          </div>
          <p style={{ color: '#64748b', fontSize: 15, maxWidth: 500, margin: '0 auto' }}>
            Every stack decision is backed by performance benchmarks, security audits, and long-term maintainability — not just trends.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .tech-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .tech-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
