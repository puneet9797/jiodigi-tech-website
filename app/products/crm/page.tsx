import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'RSVPAI CRM — Customer Relationship & Lead Management Platform',
  description: 'Convert leads faster, retain customers longer, and build lasting relationships with RSVPAI CRM. Track sales pipelines, follow-ups, and email campaigns in one intelligent platform.',
  keywords: 'CRM software, lead management, sales pipeline tracking, follow up systems, customer database, email marketing automation, sales dashboards',
};

export default function CRMPage() {
  return (
    <div style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '24px', fontSize: '14px', color: '#64748b' }}>
          <Link href="/" style={{ color: '#8b5cf6', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link href="/products" style={{ color: '#8b5cf6', textDecoration: 'none' }}>Products</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: '#94a3b8' }}>RSVPAI CRM</span>
        </div>

        {/* Hero Section */}
        <div style={{
          background: 'rgba(10,25,50,0.4)',
          border: '1px solid rgba(139,92,246,0.15)',
          borderRadius: '24px',
          padding: '48px',
          backdropFilter: 'blur(20px)',
          marginBottom: '48px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '300px', height: '300px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <span style={{
            display: 'inline-flex', padding: '6px 16px',
            background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '100px', fontSize: '12px', fontWeight: 600,
            color: '#8b5cf6', marginBottom: '24px'
          }}>
            Sales Suite
          </span>

          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: '#f0f9ff', marginBottom: '16px', lineHeight: 1.2 }}>
            RSVPAI <span style={{ color: '#8b5cf6' }}>CRM</span>
          </h1>
          <p style={{ fontSize: '20px', color: '#94a3b8', marginBottom: '24px', fontWeight: 500 }}>
            Customer Relationship Management
          </p>
          <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.8, maxWidth: '800px', marginBottom: '32px' }}>
            RSVPAI CRM is designed to supercharge your sales force. From managing lead generation pipelines and assigning 
            follow-ups, to tracking client email histories and evaluating sales performance metrics, 
            RSVPAI CRM helps you scale conversion rates and build lifelong customer loyalty.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
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
            { label: 'Sales Growth', value: '200%', desc: 'Accelerate deal closing rates with structured pipelines' },
            { label: 'Lead Conversion', value: '65%', desc: 'Ensure no lead gets dropped through timely automatic alerts' },
            { label: 'Retention Rate', value: '95%', desc: 'Keep clients satisfied using proactive ticketing and customer analytics' }
          ].map((m, idx) => (
            <div key={idx} style={{
              background: 'rgba(2, 8, 24, 0.6)',
              border: '1px solid rgba(139,92,246,0.1)',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#8b5cf6', marginBottom: '8px' }}>{m.value}</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#f0f9ff', marginBottom: '8px' }}>{m.label}</div>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Modules Section */}
        <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#f0f9ff', marginBottom: '32px' }}>Included Modules</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '64px' }}>
          {[
            { title: 'Lead Tracking', desc: 'Capture leads from web forms, email, and social networks automatically.' },
            { title: 'Contact Directory', desc: 'Centralized view of customer contacts, interaction histories, notes, and purchases.' },
            { title: 'Interactive Pipelines', desc: 'Drag-and-drop Kanban pipelines to move sales opportunities from contact to closing.' },
            { title: 'Follow-ups & Reminders', desc: 'Automatic schedule reminders via email, SMS, or Slack integrations.' },
            { title: 'Performance Analytics', desc: 'Monitor top sales agents, monthly closures, and pipeline velocity charts.' },
            { title: 'Email & SMS Broadcast', desc: 'Run bulk email outreach campaigns and track click-through rates.' },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'rgba(10,25,50,0.2)',
              border: '1px solid rgba(139,92,246,0.1)',
              borderRadius: '16px',
              padding: '24px',
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#8b5cf6', marginBottom: '12px' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
