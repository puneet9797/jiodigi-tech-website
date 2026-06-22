'use client';
import { useEffect, useRef, useState } from 'react';

const products = [
  {
    id: 'erp',
    name: 'JioLite ERP',
    tagline: 'Complete Enterprise Resource Planning',
    description: 'An all-in-one ERP solution that manages every aspect of your business — from inventory to payroll, all in one unified platform.',
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
    modules: ['Inventory', 'Accounts', 'GST', 'HRMS', 'Production', 'Reports', 'Purchase', 'Sales'],
    metrics: [{ label: 'Efficiency Boost', value: '300%' }, { label: 'Cost Reduction', value: '40%' }, { label: 'Data Accuracy', value: '99.9%' }],
    preview: [
      { type: 'header', content: 'Dashboard Overview' },
      { type: 'stats', items: [{ label: 'Revenue', val: '₹48.2L', up: true }, { label: 'Orders', val: '1,284', up: true }, { label: 'Stock Items', val: '3,492', up: false }, { label: 'Pending', val: '23', up: false }] },
      { type: 'chart', label: 'Monthly Revenue' },
      { type: 'table', label: 'Recent Transactions', rows: ['INV-001', 'INV-002', 'INV-003'] },
    ],
  },
  {
    id: 'crm',
    name: 'JioLite CRM',
    tagline: 'Customer Relationship Management',
    description: 'Convert leads faster, retain customers longer, and build lasting relationships with our intelligent CRM platform.',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    modules: ['Leads', 'Customers', 'Sales', 'Follow-ups', 'Reports', 'Tasks', 'Emails', 'Pipeline'],
    metrics: [{ label: 'Sales Growth', value: '200%' }, { label: 'Lead Conversion', value: '65%' }, { label: 'Retention Rate', value: '95%' }],
    preview: [
      { type: 'header', content: 'Sales Pipeline' },
      { type: 'pipeline', stages: ['New (24)', 'Qualified (18)', 'Proposal (12)', 'Won (8)'] },
      { type: 'stats', items: [{ label: 'Total Leads', val: '284', up: true }, { label: 'This Month', val: '62', up: true }, { label: 'Follow-ups', val: '45', up: false }, { label: 'Closed', val: '31', up: true }] },
    ],
  },
  {
    id: 'commerce',
    name: 'JioLite Commerce',
    tagline: 'Modern E-Commerce Platform',
    description: 'Launch, manage, and scale your online store with a powerful e-commerce platform built for modern businesses.',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    modules: ['Products', 'Orders', 'Payments', 'Customers', 'Analytics', 'Vendors', 'Shipping', 'Reviews'],
    metrics: [{ label: 'Revenue Growth', value: '200%' }, { label: 'Conversion Rate', value: '4.8%' }, { label: 'Avg Order Value', value: '↑35%' }],
    preview: [
      { type: 'header', content: 'Store Analytics' },
      { type: 'stats', items: [{ label: 'Today Sales', val: '₹2.4L', up: true }, { label: 'Orders', val: '148', up: true }, { label: 'Products', val: '2,841', up: false }, { label: 'Visitors', val: '12,400', up: true }] },
      { type: 'chart', label: 'Sales by Category' },
    ],
  },
  {
    id: 'ai',
    name: 'JioLite AI',
    tagline: 'AI-Powered Business Assistant',
    description: 'Harness the power of artificial intelligence to automate workflows, gain predictive insights, and make smarter decisions.',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    modules: ['Chatbot', 'Analytics', 'Workflow', 'Smart Reports', 'Automation', 'Predictions', 'NLP', 'Vision'],
    metrics: [{ label: 'Work Automated', value: '80%' }, { label: 'Productivity Up', value: '3x' }, { label: 'Cost Saved', value: '50%' }],
    preview: [
      { type: 'header', content: 'AI Command Center' },
      { type: 'ai-chat', messages: ['How can I help you today?', 'Analyze Q3 sales trends', 'Revenue up 28% vs Q2. Top product: ERP Suite.'] },
      { type: 'stats', items: [{ label: 'Tasks Done', val: '8,429', up: true }, { label: 'Time Saved', val: '340h', up: true }, { label: 'Accuracy', val: '97.2%', up: true }, { label: 'Active Bots', val: '12', up: false }] },
    ],
  },
];

function DashboardPreview({ product }: { product: typeof products[0] }) {
  const [activeModIndex, setActiveModIndex] = useState(0);

  // Reset module selection when product tab changes
  useEffect(() => {
    setActiveModIndex(0);
  }, [product.id]);

  const activeModuleName = product.modules[activeModIndex] || product.modules[0];

  // Deterministic mock stats based on active module to look rich and realistic
  const getStatsForModule = (modName: string) => {
    const hash = modName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const n1 = (hash % 70) + 15;
    const v1 = n1.toFixed(1);
    const v2 = ((hash * 3) % 1500) + 150;
    const v3 = ((hash * 7) % 4000) + 500;
    const v4 = (hash % 35) + 5;

    if (product.id === 'erp') {
      return [
        { label: 'Activity Value', val: `₹${v1}L`, up: hash % 2 === 0 },
        { label: 'Processed', val: `${v2}`, up: hash % 3 === 0 },
        { label: 'Active Items', val: `${v3}`, up: hash % 2 !== 0 },
        { label: 'Queue/Errors', val: `${v4}`, up: hash % 4 === 0 },
      ];
    } else if (product.id === 'crm') {
      return [
        { label: 'Leads Contacted', val: `${v2}`, up: hash % 2 === 0 },
        { label: 'Pipeline Leads', val: `${v4}`, up: hash % 3 === 0 },
        { label: 'Expected Revenue', val: `₹${v1}L`, up: hash % 2 !== 0 },
        { label: 'Conversion Rate', val: `${(n1 / 2.5).toFixed(1)}%`, up: hash % 4 === 0 },
      ];
    } else if (product.id === 'commerce') {
      return [
        { label: 'Gross Volume', val: `₹${v1}L`, up: hash % 2 === 0 },
        { label: 'Total Orders', val: `${v2}`, up: hash % 3 === 0 },
        { label: 'Store Visitors', val: `${v3 * 3}`, up: hash % 2 !== 0 },
        { label: 'Conversion Rate', val: `${(1.5 + (hash % 40) / 10).toFixed(2)}%`, up: hash % 4 === 0 },
      ];
    } else {
      return [
        { label: 'AI Inferences', val: `${v3 * 4}`, up: true },
        { label: 'SLA Time Saved', val: `${v2}h`, up: true },
        { label: 'Model Accuracy', val: `${(92 + (hash % 75) / 10).toFixed(1)}%`, up: true },
        { label: 'Active Agents', val: `${v4}`, up: hash % 2 === 0 },
      ];
    }
  };

  const getChartHeights = (modName: string) => {
    const hash = modName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return Array.from({ length: 10 }, (_, i) => 30 + ((hash * (i + 3)) % 65));
  };

  const getModuleMetrics = (modName: string) => {
    const hash = modName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return [
      { label: 'Module Efficiency', value: `${((hash % 100) + 180)}%` },
      { label: 'Load Time', value: `${(0.08 + (hash % 7) / 100).toFixed(3)}s` },
      { label: 'Process SLA', value: `${(99.1 + (hash % 9) / 10).toFixed(1)}%` },
    ];
  };

  const stats = getStatsForModule(activeModuleName);
  const chartHeights = getChartHeights(activeModuleName);
  const metrics = getModuleMetrics(activeModuleName);

  return (
    <div style={{
      background: 'rgba(5, 15, 35, 0.95)',
      borderRadius: 16,
      overflow: 'hidden',
      border: `1px solid ${product.color}30`,
      boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 40px ${product.color}15`,
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Window Chrome */}
      <div style={{
        padding: '12px 16px',
        background: 'rgba(10,25,50,0.9)',
        borderBottom: `1px solid ${product.color}20`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57', '#ffbd2e', '#28ca41'].map(c => (
            <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{
          flex: 1, textAlign: 'center',
          background: 'rgba(14,165,233,0.08)',
          borderRadius: 6, padding: '4px 16px',
          fontSize: 11, color: '#475569', margin: '0 16px',
        }}>
          app.jiolite.tech/{product.id}/{activeModuleName.toLowerCase()}
        </div>
      </div>

      {/* Sidebar + Content Layout */}
      <div style={{ display: 'flex', minHeight: 380 }}>
        {/* Sidebar */}
        <div style={{
          width: 160, background: 'rgba(3,13,26,0.8)',
          borderRight: `1px solid ${product.color}15`,
          padding: '16px 12px',
        }}>
          <div style={{
            fontSize: 12, fontWeight: 700, color: product.color,
            marginBottom: 16, padding: '0 8px',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            {product.name}
          </div>
          {product.modules.map((mod, i) => (
            <div
              key={i}
              onClick={() => setActiveModIndex(i)}
              style={{
                padding: '8px 10px', borderRadius: 8, marginBottom: 4,
                background: activeModIndex === i ? `${product.color}20` : 'transparent',
                border: activeModIndex === i ? `1px solid ${product.color}30` : '1px solid transparent',
                fontSize: 12, color: activeModIndex === i ? product.color : '#475569',
                cursor: 'pointer', fontWeight: activeModIndex === i ? 600 : 400,
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: activeModIndex === i ? product.color : '#334155',
                transition: 'all 0.2s ease',
              }} />
              {mod}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px', overflow: 'hidden' }}>
          {/* Title */}
          <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: '#f0f9ff', margin: 0 }}>
              {activeModuleName} Dashboard Overview
            </h4>
            <div style={{
              padding: '4px 12px', borderRadius: 100, fontSize: 10,
              background: `${product.color}20`, color: product.color, fontWeight: 600,
            }}>● Live</div>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
            {stats.map((item, i) => (
              <div key={i} style={{
                background: 'rgba(14,165,233,0.05)',
                border: '1px solid rgba(14,165,233,0.1)',
                borderRadius: 10, padding: '10px 12px',
              }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#f0f9ff', marginBottom: 2 }}>{item.val}</div>
                <div style={{ fontSize: 10, color: '#475569' }}>{item.label}</div>
                <div style={{ fontSize: 10, color: item.up ? '#10b981' : '#f59e0b', marginTop: 2 }}>
                  {item.up ? '↑' : '→'} {item.up ? 'Trending up' : 'Stable'}
                </div>
              </div>
            ))}
          </div>

          {/* Chart Placeholder */}
          <div style={{
            background: 'rgba(14,165,233,0.03)',
            border: '1px solid rgba(14,165,233,0.08)',
            borderRadius: 12, padding: '20px',
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 11, color: '#475569', marginBottom: 14 }}>
              {product.id === 'ai' ? 'AI Agent Performance Activity' : product.id === 'crm' ? 'Pipeline Analytics - ' + activeModuleName : 'Module Analytics - ' + activeModuleName}
            </div>
            {/* Simulated bar chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 70 }}>
              {chartHeights.map((h, i) => (
                <div key={i} style={{
                  flex: 1, height: `${h}%`,
                  background: `linear-gradient(180deg, ${product.color}, ${product.color}50)`,
                  borderRadius: '4px 4px 0 0',
                  opacity: 0.8,
                  minWidth: 8,
                  transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map(m => (
                <span key={m} style={{ fontSize: 9, color: '#334155' }}>{m}</span>
              ))}
            </div>
          </div>

          {/* Metrics Row */}
          <div style={{ display: 'flex', gap: 10 }}>
            {metrics.map((m, i) => (
              <div key={i} style={{
                flex: 1,
                padding: '10px', borderRadius: 10,
                background: `${product.color}08`,
                border: `1px solid ${product.color}20`,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: product.color }}>{m.value}</div>
                <div style={{ fontSize: 9, color: '#475569', marginTop: 2 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
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

export default function Products() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView(0.1);

  return (
    <section id="products" className="section-padding" style={{ background: 'linear-gradient(180deg, #020818, #030d1a)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 100%, rgba(14,165,233,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />

      <div className="container" ref={ref}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-badge">🚀 Products</div>
          <h2 className="section-title">
            Our <span className="gradient-text">Product Suite</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Production-ready software platforms used by 200+ companies. Built with enterprise architecture, designed for usability.
          </p>
        </div>

        {/* Product Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 48, flexWrap: 'wrap' }}>
          {products.map((p, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                padding: '10px 24px',
                borderRadius: 100,
                border: active === i ? `1px solid ${p.color}60` : '1px solid rgba(14,165,233,0.15)',
                background: active === i ? `${p.color}15` : 'rgba(10,25,50,0.5)',
                color: active === i ? p.color : '#64748b',
                fontWeight: active === i ? 700 : 500,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
              }}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Product Content */}
        {products.map((product, i) => (
          <div
            key={i}
            style={{
              display: active === i ? 'grid' : 'none',
              gridTemplateColumns: '1fr 1.6fr', gap: 64, alignItems: 'start',
              opacity: inView ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
            className="product-layout"
          >
            {/* Left: Info */}
            <div>
              <div style={{
                display: 'inline-flex', padding: '6px 16px',
                background: `${product.color}15`, border: `1px solid ${product.color}30`,
                borderRadius: 100, fontSize: 12, fontWeight: 600,
                color: product.color, marginBottom: 20,
              }}>
                {product.name}
              </div>
              <h3 style={{ fontSize: 30, fontWeight: 800, color: '#f0f9ff', marginBottom: 16, lineHeight: 1.2 }}>
                {product.tagline}
              </h3>
              <p style={{ color: '#64748b', fontSize: 16, lineHeight: 1.75, marginBottom: 32 }}>
                {product.description}
              </p>

              {/* Module tags */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                  Included Modules
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {product.modules.map(m => (
                    <span key={m} style={{
                      padding: '6px 14px',
                      background: `${product.color}10`,
                      border: `1px solid ${product.color}25`,
                      borderRadius: 100, fontSize: 13,
                      color: '#94a3b8', fontWeight: 500,
                    }}>{m}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <a href="#contact" className="btn-primary" style={{ textDecoration: 'none', background: product.gradient }}>
                  <span>Get Demo</span>
                </a>
                <a href="#contact" className="btn-secondary" style={{ textDecoration: 'none' }}>
                  <span>Learn More</span>
                </a>
              </div>
            </div>

            {/* Right: Dashboard Preview */}
            <div style={{
              transform: inView ? 'perspective(1200px) rotateY(-5deg) rotateX(2deg)' : 'perspective(1200px) rotateY(-10deg) rotateX(5deg)',
              transition: 'transform 0.8s ease',
            }}>
              <DashboardPreview product={product} />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .product-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
