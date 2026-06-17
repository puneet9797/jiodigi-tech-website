'use client';
import { useEffect, useRef, useState } from 'react';
import { Shield, Lock, UserCheck, RefreshCw, FileCheck, Eye, Cloud, Server } from 'lucide-react';

const securityFeatures = [
  {
    icon: <Shield size={24} />,
    title: 'SSL/TLS Encryption',
    desc: '256-bit encryption for all data in transit. Your data is always protected.',
    color: '#0ea5e9',
  },
  {
    icon: <Lock size={24} />,
    title: 'Data Encryption at Rest',
    desc: 'AES-256 encryption for all stored data. Zero-knowledge security architecture.',
    color: '#8b5cf6',
  },
  {
    icon: <UserCheck size={24} />,
    title: 'Role-Based Access Control',
    desc: 'Granular permissions — ensure users only access what they\'re authorized for.',
    color: '#10b981',
  },
  {
    icon: <RefreshCw size={24} />,
    title: 'Automated Backups',
    desc: 'Daily encrypted backups with point-in-time recovery. Never lose a byte.',
    color: '#f59e0b',
  },
  {
    icon: <FileCheck size={24} />,
    title: 'GDPR Compliance',
    desc: 'Full GDPR, data residency, and privacy regulation compliance built-in.',
    color: '#06b6d4',
  },
  {
    icon: <Eye size={24} />,
    title: 'Audit Logs',
    desc: 'Complete audit trail of every action. Full accountability and forensic capability.',
    color: '#e879f9',
  },
  {
    icon: <Cloud size={24} />,
    title: 'Cloud Security',
    desc: 'AWS Shield, WAF, and DDoS protection. Multi-region failover built-in.',
    color: '#0ea5e9',
  },
  {
    icon: <Server size={24} />,
    title: 'Penetration Testing',
    desc: 'Regular security audits and pen tests by certified security professionals.',
    color: '#8b5cf6',
  },
];

const certifications = [
  { name: 'ISO 27001', desc: 'Information Security' },
  { name: 'GDPR', desc: 'Data Protection' },
  { name: 'SOC 2', desc: 'Security & Availability' },
  { name: 'SSL Secure', desc: '256-bit Encryption' },
  { name: 'VAPT Certified', desc: 'Security Tested' },
  { name: '99.9% SLA', desc: 'Uptime Guarantee' },
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

export default function Security() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="security" className="section-padding" style={{ background: 'linear-gradient(180deg, #020818, #030d1a)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 30% 70%, rgba(139,92,246,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />

      <div className="container" ref={ref}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-badge">🔒 Security</div>
          <h2 className="section-title">
            Enterprise-Grade <span className="gradient-text">Security & Compliance</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            We take security as seriously as our clients do. Every product we build follows strict security standards and compliance requirements.
          </p>
        </div>

        {/* Certifications */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 64, flexWrap: 'wrap' }}>
          {certifications.map((cert, i) => (
            <div
              key={i}
              style={{
                padding: '16px 24px', textAlign: 'center',
                background: 'rgba(10,25,50,0.6)',
                border: '1px solid rgba(14,165,233,0.2)',
                borderRadius: 16, backdropFilter: 'blur(16px)',
                minWidth: 120,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease ${i * 0.08}s`,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 800, color: '#0ea5e9', marginBottom: 4 }}>{cert.name}</div>
              <div style={{ fontSize: 11, color: '#475569' }}>{cert.desc}</div>
            </div>
          ))}
        </div>

        {/* Security Features Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 64 }} className="security-grid">
          {securityFeatures.map((feature, i) => (
            <div
              key={i}
              className="service-card"
              style={{
                padding: '24px',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease ${0.3 + i * 0.08}s`,
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: `${feature.color}15`,
                border: `1px solid ${feature.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: feature.color, marginBottom: 16,
              }}>
                {feature.icon}
              </div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: '#f0f9ff', marginBottom: 8 }}>{feature.title}</h4>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Security Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(14,165,233,0.08), rgba(139,92,246,0.06))',
          border: '1px solid rgba(14,165,233,0.15)',
          borderRadius: 24, padding: '48px 56px',
          display: 'flex', alignItems: 'center', gap: 48,
          flexWrap: 'wrap',
          opacity: inView ? 1 : 0,
          transition: 'all 0.6s ease 1s',
        }}>
          {/* Shield Icon */}
          <div style={{
            width: 100, height: 100, flexShrink: 0,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(139,92,246,0.2))',
            border: '2px solid rgba(14,165,233,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'pulse-glow 3s ease-in-out infinite',
            boxShadow: '0 0 40px rgba(14,165,233,0.2)',
          }}>
            <Shield size={48} color="#0ea5e9" />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 26, fontWeight: 800, color: '#f0f9ff', marginBottom: 12 }}>
              Your Data is Our Highest Priority
            </h3>
            <p style={{ color: '#64748b', fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
              We implement defense-in-depth security strategies across every layer of our software stack. From secure development practices to runtime monitoring — security is never an afterthought.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="#contact" className="btn-primary" style={{ textDecoration: 'none' }}>
                <span>Request Security Audit</span>
              </a>
              <a href="#" className="btn-secondary" style={{ textDecoration: 'none' }}>
                <span>Download Security Whitepaper</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .security-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .security-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
