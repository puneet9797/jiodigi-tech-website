import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'RSVPAI Commerce — Modern E-Commerce Platform',
  description: 'Launch, manage, and scale your online store with a powerful, secure, and modern e-commerce platform built for high-performance businesses.',
  keywords: 'ecommerce platform, online storefront, cart software, checkout system, payment gateway integration, shipping tracker, vendor marketplace',
};

export default function CommercePage() {
  return (
    <div style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '24px', fontSize: '14px', color: '#64748b' }}>
          <Link href="/" style={{ color: '#10b981', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link href="/products" style={{ color: '#10b981', textDecoration: 'none' }}>Products</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: '#94a3b8' }}>RSVPAI Commerce</span>
        </div>

        {/* Hero Section */}
        <div style={{
          background: 'rgba(10,25,50,0.4)',
          border: '1px solid rgba(16,185,129,0.15)',
          borderRadius: '24px',
          padding: '48px',
          backdropFilter: 'blur(20px)',
          marginBottom: '48px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '300px', height: '300px',
            background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <span style={{
            display: 'inline-flex', padding: '6px 16px',
            background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '100px', fontSize: '12px', fontWeight: 600,
            color: '#10b981', marginBottom: '24px'
          }}>
            Storefront Suite
          </span>

          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: '#f0f9ff', marginBottom: '16px', lineHeight: 1.2 }}>
            RSVPAI <span style={{ color: '#10b981' }}>Commerce</span>
          </h1>
          <p style={{ fontSize: '20px', color: '#94a3b8', marginBottom: '24px', fontWeight: 500 }}>
            Modern E-Commerce Platform
          </p>
          <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.8, maxWidth: '800px', marginBottom: '32px' }}>
            RSVPAI Commerce provides everything required to run high-volume, multi-channel e-commerce systems. 
            Featuring lightning-fast storefront loading, advanced SEO parameters, secure checkouts, vendor marketplace support, 
            and deep inventory synchronizations, it allows businesses to deliver an unmatched digital shopping experience.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #10b981, #059669)' }}>
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
            { label: 'Revenue Growth', value: '200%', desc: 'Drive conversion rates using simplified checkout flows' },
            { label: 'Conversion Rate', value: '4.8%', desc: 'Industry-leading performance speeds boost customer action' },
            { label: 'Avg Order Value', value: '↑35%', desc: 'Increase order values with intelligent cross-sell recommendation engines' }
          ].map((m, idx) => (
            <div key={idx} style={{
              background: 'rgba(2, 8, 24, 0.6)',
              border: '1px solid rgba(16,185,129,0.1)',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#10b981', marginBottom: '8px' }}>{m.value}</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#f0f9ff', marginBottom: '8px' }}>{m.label}</div>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Modules Section */}
        <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#f0f9ff', marginBottom: '32px' }}>Included Modules</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '64px' }}>
          {[
            { title: 'Product Catalog', desc: 'Manage unlimited products, variants, media galleries, custom tags, and categorizations.' },
            { title: 'Orders & Fulfillment', desc: 'Track new orders, automated invoice generation, packaging Slips, and fulfillment statuses.' },
            { title: 'Payment Gateways', desc: 'Supports Stripe, PayPal, Razorpay, UPI, credit cards, and cash-on-delivery out of the box.' },
            { title: 'Customer Portals', desc: 'Give buyers a personal dashboard to view past orders, track shipments, and request returns.' },
            { title: 'Multi-Vendor Support', desc: 'Allows multiple third-party vendors to list products, manage orders, and calculate commissions.' },
            { title: 'Shipping Operations', desc: 'Integrate automatically with popular delivery partners for real-time tracking.' },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'rgba(10,25,50,0.2)',
              border: '1px solid rgba(16,185,129,0.1)',
              borderRadius: '16px',
              padding: '24px',
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#10b981', marginBottom: '12px' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
