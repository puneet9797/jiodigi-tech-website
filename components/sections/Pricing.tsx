'use client';
import { useEffect, useRef, useState } from 'react';
import { Check, Star } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '₹49,999',
    period: 'one-time',
    tagline: 'Perfect for startups and small businesses',
    color: '#0ea5e9',
    popular: false,
    features: [
      'Up to 5 user accounts',
      'Basic ERP or CRM module',
      'Mobile responsive design',
      'Standard integrations',
      '3 months free support',
      'Basic analytics dashboard',
      'Email support',
      'Documentation included',
    ],
    notIncluded: ['AI features', 'Custom integrations', 'Dedicated account manager'],
  },
  {
    name: 'Business',
    price: '₹1,49,999',
    period: 'one-time',
    tagline: 'For growing businesses scaling fast',
    color: '#0ea5e9',
    popular: true,
    features: [
      'Up to 50 user accounts',
      'Full ERP + CRM + Commerce',
      'Mobile app (iOS & Android)',
      'Custom integrations',
      '12 months free support',
      'Advanced analytics & reports',
      'Priority support (< 4hr)',
      'AI chatbot integration',
      'API access',
      'Custom branding',
    ],
    notIncluded: ['Dedicated DevOps', 'On-premise deployment'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'Contact us',
    tagline: 'For enterprises with complex requirements',
    color: '#8b5cf6',
    popular: false,
    features: [
      'Unlimited user accounts',
      'Complete custom development',
      'All modules + AI suite',
      'Mobile apps (all platforms)',
      'Dedicated DevOps engineer',
      '24/7 premium support',
      'On-premise or hybrid deploy',
      'Custom SLA agreement',
      'Security audit included',
      'Staff training sessions',
      'Source code ownership',
      'Dedicated account manager',
    ],
    notIncluded: [],
  },
];

const comparisonFeatures = [
  { label: 'User Accounts', values: ['5 Users', '50 Users', 'Unlimited'] },
  { label: 'ERP Modules', values: ['Basic', 'Full Suite', 'Custom'] },
  { label: 'Mobile App', values: ['❌', '✅', '✅'] },
  { label: 'AI Features', values: ['❌', 'Basic', 'Advanced'] },
  { label: 'Support Duration', values: ['3 Months', '12 Months', 'Lifetime'] },
  { label: 'Support Response', values: ['Email', '< 4 Hours', '< 1 Hour'] },
  { label: 'Custom Integrations', values: ['❌', '✅', '✅'] },
  { label: 'Source Code Ownership', values: ['❌', '✅', '✅'] },
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

export default function Pricing() {
  const { ref, inView } = useInView(0.1);
  const [showComparison, setShowComparison] = useState(false);

  return (
    <section id="pricing" className="section-padding" style={{ background: '#020818', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(14,165,233,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="container" ref={ref}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-badge">💰 Pricing</div>
          <h2 className="section-title">
            Transparent <span className="gradient-text">Pricing Plans</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            No hidden fees. No surprises. Get enterprise-grade software at a price that makes business sense.
          </p>
        </div>

        {/* Pricing Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 48 }} className="pricing-grid">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView
                  ? (plan.popular ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)')
                  : 'translateY(40px)',
                transition: `all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${i * 0.15}s`,
                position: 'relative',
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                  padding: '6px 24px', borderRadius: 100,
                  fontSize: 12, fontWeight: 700, color: 'white',
                  display: 'flex', alignItems: 'center', gap: 6,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 20px rgba(14,165,233,0.5)',
                }}>
                  <Star size={12} fill="white" /> Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#f0f9ff', marginBottom: 6 }}>{plan.name}</h3>
                <p style={{ fontSize: 13, color: '#475569', marginBottom: 20 }}>{plan.tagline}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                  <span style={{
                    fontSize: plan.price === 'Custom' ? 36 : 42,
                    fontWeight: 900, fontFamily: 'Space Grotesk',
                    color: plan.popular ? '#0ea5e9' : '#f0f9ff',
                    lineHeight: 1,
                  }}>
                    {plan.price}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: '#475569' }}>{plan.period}</div>
              </div>

              {/* Divider */}
              <div className="divider-glow" style={{ marginBottom: 24 }} />

              {/* Features */}
              <div style={{ marginBottom: 32, flex: 1 }}>
                {plan.features.map((f, fi) => (
                  <div key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: plan.popular ? '#0ea5e9' : 'rgba(16,185,129,0.2)',
                      border: `1px solid ${plan.popular ? '#0ea5e9' : '#10b981'}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: 1,
                    }}>
                      <Check size={11} color={plan.popular ? 'white' : '#10b981'} strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
                {plan.notIncluded.map((f, fi) => (
                  <div key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12, opacity: 0.4 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(100,116,139,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <span style={{ color: '#64748b', fontSize: 12 }}>—</span>
                    </div>
                    <span style={{ fontSize: 14, color: '#475569', textDecoration: 'line-through' }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className={plan.popular ? 'btn-primary' : 'btn-secondary'}
                style={{ textDecoration: 'none', display: 'block', textAlign: 'center', width: '100%' }}
              >
                <span>{plan.price === 'Custom' ? 'Contact Us' : 'Get Started'}</span>
              </a>
            </div>
          ))}
        </div>

        {/* Toggle Comparison */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="btn-secondary"
          >
            {showComparison ? 'Hide' : 'Show'} Full Feature Comparison
          </button>
        </div>

        {/* Comparison Table */}
        {showComparison && (
          <div style={{
            background: 'rgba(10,25,50,0.5)',
            border: '1px solid rgba(14,165,233,0.15)',
            borderRadius: 20, overflow: 'hidden',
            backdropFilter: 'blur(16px)',
          }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: 'rgba(10,25,50,0.8)', borderBottom: '1px solid rgba(14,165,233,0.1)' }}>
              <div style={{ padding: '16px 24px', fontSize: 13, fontWeight: 700, color: '#64748b' }}>Feature</div>
              {plans.map(p => (
                <div key={p.name} style={{ padding: '16px 24px', textAlign: 'center', fontSize: 14, fontWeight: 700, color: p.popular ? '#0ea5e9' : '#f0f9ff' }}>{p.name}</div>
              ))}
            </div>
            {comparisonFeatures.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', borderBottom: i < comparisonFeatures.length - 1 ? '1px solid rgba(14,165,233,0.06)' : 'none' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(14,165,233,0.03)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <div style={{ padding: '14px 24px', fontSize: 14, color: '#94a3b8' }}>{row.label}</div>
                {row.values.map((v, vi) => (
                  <div key={vi} style={{ padding: '14px 24px', textAlign: 'center', fontSize: 13, color: v === '❌' ? '#ef4444' : v === '✅' ? '#10b981' : '#f0f9ff', fontWeight: 600 }}>{v}</div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Bottom note */}
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <p style={{ color: '#475569', fontSize: 14 }}>
            💡 All prices are one-time development costs. Hosting & maintenance quoted separately. Volume discounts available.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pricing-grid { grid-template-columns: 1fr !important; max-width: 480px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}
