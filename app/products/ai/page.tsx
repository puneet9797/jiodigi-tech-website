import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Siddhivinayak AI — Intelligent Business Automation & Predictive Analytics',
  description: 'Automate business workflows, generate smart dashboards, deploy custom chatbots, and run predictive analytics with Siddhivinayak AI.',
  keywords: 'artificial intelligence, business automation, custom NLP chatbot, predictive analytics, computer vision, smart reporting, workflow automation',
};

export default function AIPage() {
  return (
    <div style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '24px', fontSize: '14px', color: '#64748b' }}>
          <Link href="/" style={{ color: '#06b6d4', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link href="/products" style={{ color: '#06b6d4', textDecoration: 'none' }}>Products</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: '#94a3b8' }}>Siddhivinayak AI</span>
        </div>

        {/* Hero Section */}
        <div style={{
          background: 'rgba(10,25,50,0.4)',
          border: '1px solid rgba(6,182,212,0.15)',
          borderRadius: '24px',
          padding: '48px',
          backdropFilter: 'blur(20px)',
          marginBottom: '48px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '300px', height: '300px',
            background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <span style={{
            display: 'inline-flex', padding: '6px 16px',
            background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.3)',
            borderRadius: '100px', fontSize: '12px', fontWeight: 600,
            color: '#06b6d4', marginBottom: '24px'
          }}>
            Cognitive Suite
          </span>

          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: '#f0f9ff', marginBottom: '16px', lineHeight: 1.2 }}>
            Siddhivinayak <span style={{ color: '#06b6d4' }}>AI</span>
          </h1>
          <p style={{ fontSize: '20px', color: '#94a3b8', marginBottom: '24px', fontWeight: 500 }}>
            AI-Powered Business Assistant
          </p>
          <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.8, maxWidth: '800px', marginBottom: '32px' }}>
            Siddhivinayak AI integrates state-of-the-art cognitive technologies into everyday business operations. 
            Automate customer support using natural language chatbots, analyze transaction data to forecast demand, 
            extract data from complex document layouts using vision parsers, and run custom background automation bots.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>
              <span>Schedule Live Demo</span>
            </Link>
            <Link href="/contact" className="btn-secondary" style={{ textDecoration: 'none' }}>
              <span>Request Custom Pricing</span>
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '64px' }}>
          {[
            { label: 'Work Automated', value: '80%', desc: 'Delegate repetitive data entry to intelligent background tasks' },
            { label: 'Productivity Up', value: '3x', desc: 'Accelerate internal response times using NLP search tools' },
            { label: 'Cost Saved', value: '50%', desc: 'Reduce customer support costs via active virtual assistance' }
          ].map((m, idx) => (
            <div key={idx} style={{
              background: 'rgba(2, 8, 24, 0.6)',
              border: '1px solid rgba(6,182,212,0.1)',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#06b6d4', marginBottom: '8px' }}>{m.value}</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#f0f9ff', marginBottom: '8px' }}>{m.label}</div>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Modules Section */}
        <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#f0f9ff', marginBottom: '32px' }}>Included Modules</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '64px' }}>
          {[
            { title: 'NLP Support Bots', desc: 'Virtual assistants ready to resolve user tickets, check order statuses, and handle basic follow-ups.' },
            { title: 'Predictive Modeler', desc: 'Predict product demand, sales projections, and customer churn probabilities based on past trends.' },
            { title: 'Workflow Automator', desc: 'Create logic rules: e.g. "If inventory drops below threshold, write Slack notice and draft purchase invoice".' },
            { title: 'Generative Reports', desc: 'Type queries in plain English to immediately construct tables, charts, or summaries.' },
            { title: 'OCR & Vision Parser', desc: 'Ingest vendor invoices, bills, or PDF layouts and convert them directly to database records.' },
            { title: 'Sentiment Tracking', desc: 'Scan product reviews, customer support emails, and social mentions to evaluate customer satisfaction.' },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'rgba(10,25,50,0.2)',
              border: '1px solid rgba(6,182,212,0.1)',
              borderRadius: '16px',
              padding: '24px',
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#06b6d4', marginBottom: '12px' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
