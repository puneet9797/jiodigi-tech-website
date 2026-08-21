import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'RSVP ERP — Complete Enterprise Resource Planning Software',
  description: 'An all-in-one ERP solution that manages every aspect of your business — from inventory and accounts to GST filing, production, and HRMS in one unified platform.',
  keywords: 'ERP software, enterprise resource planning, inventory tracking, HRMS system, production planning, accounting software, GST calculator',
};

export default function ERPPage() {
  return (
    <div style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '24px', fontSize: '14px', color: '#64748b' }}>
          <Link href="/" style={{ color: '#0ea5e9', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link href="/products" style={{ color: '#0ea5e9', textDecoration: 'none' }}>Products</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: '#94a3b8' }}>RSVP ERP</span>
        </div>

        {/* Hero Section */}
        <div style={{
          background: 'rgba(10,25,50,0.4)',
          border: '1px solid rgba(14,165,233,0.15)',
          borderRadius: '24px',
          padding: '48px',
          backdropFilter: 'blur(20px)',
          marginBottom: '48px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '300px', height: '300px',
            background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <span style={{
            display: 'inline-flex', padding: '6px 16px',
            background: 'rgba(14, 165, 233, 0.15)', border: '1px solid rgba(14, 165, 233, 0.3)',
            borderRadius: '100px', fontSize: '12px', fontWeight: 600,
            color: '#0ea5e9', marginBottom: '24px'
          }}>
            Enterprise Suite
          </span>

          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: '#f0f9ff', marginBottom: '16px', lineHeight: 1.2 }}>
            RSVP <span style={{ color: '#0ea5e9' }}>ERP</span>
          </h1>
          <p style={{ fontSize: '20px', color: '#94a3b8', marginBottom: '24px', fontWeight: 500 }}>
            Complete Enterprise Resource Planning
          </p>
          <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.8, maxWidth: '800px', marginBottom: '32px' }}>
            RSVP ERP is an all-in-one solution designed to manage every single operational aspect of your business. 
            By integrating inventory tracking, bookkeeping, production lifecycle management, HR & payroll, and sales pipelines, 
            RSVP ERP breaks down data silos to provide real-time decision visibility.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>
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
            { label: 'Efficiency Boost', value: '300%', desc: 'Streamline routine tasks with automation' },
            { label: 'Cost Reduction', value: '40%', desc: 'Reduce waste and excessive inventory overheads' },
            { label: 'Data Accuracy', value: '99.9%', desc: 'Unified ledger eliminates dual entry errors' }
          ].map((m, idx) => (
            <div key={idx} style={{
              background: 'rgba(2, 8, 24, 0.6)',
              border: '1px solid rgba(14,165,233,0.1)',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#0ea5e9', marginBottom: '8px' }}>{m.value}</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#f0f9ff', marginBottom: '8px' }}>{m.label}</div>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Modules Section */}
        <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#f0f9ff', marginBottom: '32px' }}>Included Modules</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '64px' }}>
          {[
            { title: 'Inventory Management', desc: 'Real-time multi-warehouse tracking, stock alerts, and barcode integrations.' },
            { title: 'Accounts & Finance', desc: 'Double-entry bookkeeping, automated general ledger, profit/loss statements, and balance sheets.' },
            { title: 'GST & Tax Compliance', desc: 'Seamless automated GST calculations, invoice generation, and ready-to-file tax reports.' },
            { title: 'HRMS & Payroll', desc: 'Attendance tracking, leave management, pay slip generation, and employee records.' },
            { title: 'Production Scheduling', desc: 'Bill of Materials (BOM) management, work order routing, and factory floor utilization tracking.' },
            { title: 'Reports & Analytics', desc: 'Drag-and-drop report builders with interactive charts and automated email exports.' },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'rgba(10,25,50,0.2)',
              border: '1px solid rgba(14,165,233,0.1)',
              borderRadius: '16px',
              padding: '24px',
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0ea5e9', marginBottom: '12px' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
