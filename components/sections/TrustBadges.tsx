'use client';
import { ShieldCheck, Zap, Coins, Globe } from 'lucide-react';

const badges = [
  {
    icon: <ShieldCheck size={32} />,
    title: 'Expert Team',
    desc: 'Seasoned developers and architects directly executing your files and compliance pipelines.',
    color: '#0ea5e9',
  },
  {
    icon: <Zap size={32} />,
    title: 'Fast Execution',
    desc: 'Guaranteed rapid processing of requests and accelerated product deployments.',
    color: '#8b5cf6',
  },
  {
    icon: <Coins size={32} />,
    title: 'Transparent Pricing',
    desc: 'Honest billing model with flat monthly rates and absolutely zero hidden fees.',
    color: '#10b981',
  },
  {
    icon: <Globe size={32} />,
    title: 'SLA Guarantee',
    desc: '99.9% uptime SLA for all cloud platforms, backed by active failover architectures.',
    color: '#f59e0b',
  },
];

export default function TrustBadges() {
  return (
    <section 
      style={{ 
        background: 'var(--color-bg-secondary)', 
        borderTop: '1px solid var(--glass-border)',
        borderBottom: '1px solid var(--glass-border)',
        padding: '60px 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(14,165,233,0.03) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} 
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
          {badges.map((b, i) => (
            <div 
              key={i}
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--glass-border)',
                borderRadius: '20px',
                padding: '32px 24px',
                textAlign: 'center',
                backdropFilter: 'var(--glass-blur)',
                transition: 'all 0.3s ease',
                boxShadow: 'var(--shadow-card)',
              }}
              className="glass-hover"
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = `${b.color}50`;
                e.currentTarget.style.boxShadow = `0 10px 30px ${b.color}15`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.boxShadow = 'var(--shadow-card)';
              }}
            >
              <div 
                style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '16px', 
                  background: `${b.color}15`, 
                  color: b.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  border: `1px solid ${b.color}30`
                }}
              >
                {b.icon}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '12px' }}>
                {b.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
