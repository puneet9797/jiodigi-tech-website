'use client';
import { useEffect, useRef, useState } from 'react';
import { Database, Users, ShoppingCart, Smartphone, Brain, Cloud, Megaphone, CheckCircle, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: <Database size={28} />,
    title: 'ERP Software Development',
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
    description: 'End-to-end enterprise resource planning solutions built for your industry.',
    features: [
      'Inventory Management', 'Stock Management', 'GST Management',
      'Purchase & Sales', 'Accounting', 'HR & Payroll',
      'Production Management', 'Reporting Dashboard',
    ],
    benefits: ['Reduce operational costs by 40%', 'Automate manual work', 'Improve business efficiency'],
    badge: 'Most Popular',
  },
  {
    icon: <Users size={28} />,
    title: 'CRM Development',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    description: 'Intelligent CRM to supercharge your sales pipeline and customer retention.',
    features: [
      'Lead Management', 'Customer Tracking', 'Sales Pipeline',
      'Task Management', 'Communication Logs', 'Follow-up Automation',
    ],
    benefits: ['Increase sales conversion by 65%', 'Improve customer retention', 'Automate follow-ups'],
    badge: null,
  },
  {
    icon: <ShoppingCart size={28} />,
    title: 'E-Commerce Development',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    description: 'Scalable online stores and multi-vendor marketplaces built for growth.',
    features: [
      'Multi-Vendor Marketplace', 'Payment Gateway Integration',
      'Product Management', 'Order Tracking',
      'Inventory Synchronization', 'Customer Dashboard',
    ],
    benefits: ['Boost online sales by 200%', 'Scale globally', 'Reduce cart abandonment'],
    badge: null,
  },
  {
    icon: <Smartphone size={28} />,
    title: 'Mobile App Development',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    description: 'Cross-platform mobile apps with native performance and stunning UX.',
    features: [
      'Android Apps', 'iOS Apps', 'Flutter Apps', 'React Native Apps',
      'Real-time Notifications', 'GPS Tracking', 'Payment Integration',
    ],
    benefits: ['Reach 3B+ mobile users', 'Native-like performance', 'Cross-platform savings'],
    badge: null,
  },
  {
    icon: <Brain size={28} />,
    title: 'AI & Automation Solutions',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    description: 'Harness artificial intelligence to automate workflows and gain deep insights.',
    features: [
      'AI Chatbots', 'Business Automation', 'Predictive Analytics',
      'AI Agents', 'Workflow Automation',
    ],
    benefits: ['Reduce manpower costs by 50%', 'Increase productivity 3x', '24/7 intelligent operations'],
    badge: '🔥 Hot',
  },
  {
    icon: <Cloud size={28} />,
    title: 'Cloud & DevOps Solutions',
    color: '#e879f9',
    gradient: 'linear-gradient(135deg, #e879f9, #c026d3)',
    description: 'Robust cloud infrastructure for high performance, security, and scalability.',
    features: [
      'AWS Deployment', 'VPS Management', 'CI/CD Pipelines',
      'Auto Scaling', 'Backup Systems', 'Security Monitoring',
    ],
    benefits: ['99.9% uptime guarantee', 'High performance infrastructure', 'Secure & compliant'],
    badge: null,
  },
  {
    icon: <Megaphone size={28} />,
    title: 'Digital Marketing',
    color: '#38bdf8',
    gradient: 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
    description: 'Data-driven marketing campaigns to increase brand visibility and drive sales.',
    features: [
      'Search Engine Optimization (SEO)', 'Pay-Per-Click Advertising (PPC)',
      'Social Media Management (SMM)', 'Content Marketing',
      'Email Marketing Automation', 'Web Analytics & Reports',
    ],
    benefits: ['Increase organic traffic by 150%', 'Maximize ROI on ad spend', 'Strengthen online brand presence'],
    badge: 'New',
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

function ServiceCard({ service, index, inView }: { service: typeof services[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="service-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) rotateX(0)' : 'translateY(50px) rotateX(10deg)',
        transition: `all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`,
        position: 'relative',
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badge */}
      {service.badge && (
        <div style={{
          position: 'absolute', top: 20, right: 20,
          background: `${service.color}20`, border: `1px solid ${service.color}40`,
          borderRadius: 100, padding: '3px 10px',
          fontSize: 11, fontWeight: 700, color: service.color,
        }}>
          {service.badge}
        </div>
      )}

      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: service.gradient,
        borderRadius: '20px 20px 0 0',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }} />

      {/* Icon */}
      <div style={{
        width: 60, height: 60,
        borderRadius: 16,
        background: hovered ? service.gradient : `${service.color}15`,
        border: `1px solid ${service.color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hovered ? 'white' : service.color,
        marginBottom: 20,
        transition: 'all 0.4s ease',
        boxShadow: hovered ? `0 8px 30px ${service.color}40` : 'none',
      }}>
        {service.icon}
      </div>

      <h3 style={{ fontSize: 19, fontWeight: 700, color: '#f0f9ff', marginBottom: 10 }}>
        {service.title}
      </h3>
      <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, marginBottom: 20 }}>
        {service.description}
      </p>

      {/* Features */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: service.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
          Key Modules
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {service.features.map(f => (
            <span key={f} style={{
              padding: '4px 10px',
              background: `${service.color}10`,
              border: `1px solid ${service.color}20`,
              borderRadius: 100,
              fontSize: 12, color: '#94a3b8',
            }}>
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div style={{ marginBottom: 24 }}>
        {service.benefits.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <CheckCircle size={14} color={service.color} />
            <span style={{ fontSize: 13, color: '#94a3b8' }}>{b}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#contact"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          color: service.color, fontSize: 14, fontWeight: 600,
          textDecoration: 'none',
          transition: 'gap 0.2s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.gap = '10px')}
        onMouseLeave={e => (e.currentTarget.style.gap = '6px')}
      >
        Get Started <ArrowRight size={16} />
      </a>
    </div>
  );
}

export default function Services() {
  const { ref, inView } = useInView(0.05);

  return (
    <section id="services" className="section-padding" style={{ background: '#020818', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="container" ref={ref}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-badge">⚡ Services</div>
          <h2 className="section-title">
            Everything You Need to{' '}
            <span className="gradient-text">Scale Your Business</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            From custom ERP systems to AI-powered automation — we deliver full-stack enterprise solutions that drive measurable business growth.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="services-grid">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
