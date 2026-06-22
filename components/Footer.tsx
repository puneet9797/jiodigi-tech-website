'use client';
import { Mail, Phone, MapPin, Link2, MessageCircle, ArrowRight } from 'lucide-react';

const footerLinks = {
  Services: ['ERP Development', 'CRM Development', 'E-Commerce', 'Mobile Apps', 'AI Solutions', 'Cloud & DevOps', 'Digital Marketing'],
  Products: ['JioLite ERP', 'JioLite CRM', 'JioLite Commerce', 'JioLite AI'],
  Company: ['About Us', 'Case Studies', 'Careers', 'Blog', 'Privacy Policy'],
  Support: ['Documentation', 'Help Center', 'Contact Us', 'Status Page'],
};

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(180deg, #020818, #030d1a)', borderTop: '1px solid rgba(14,165,233,0.1)', paddingTop: 80 }}>
      <div className="container">
        {/* Top Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }}
          className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
              <img
                src="/logo.png"
                alt="JioLite Info Tech Logo"
                style={{
                  height: 'clamp(80px, 8vw + 30px, 110px)',
                  width: 'auto',
                  filter: 'drop-shadow(0 0 15px rgba(14, 165, 233, 0.45))',
                  display: 'block',
                }}
              />
            </div>
            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.8, marginBottom: 24, maxWidth: 300 }}>
              Transforming businesses through innovative software solutions. Building the future, one line of code at a time.
            </p>
            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: <Mail size={14} />, text: 'jioliteproducts@gmail.com' },
                { icon: <Phone size={14} />, text: '+91 8299758889' },
                { icon: <MapPin size={14} />, text: '74/276, Halsey Road, Kanpur - 208001, U.P., India' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#64748b', fontSize: 14 }}>
                  <span style={{ color: '#0ea5e9' }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
            {/* Socials */}
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              {[
                { icon: <Link2 size={16} />, href: '#', label: 'LinkedIn' },
                { icon: <MessageCircle size={16} />, href: '#', label: 'WhatsApp' },
                { icon: <Mail size={16} />, href: '#', label: 'Email' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: 'rgba(14,165,233,0.1)',
                    border: '1px solid rgba(14,165,233,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0ea5e9',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(14,165,233,0.2)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px rgba(14,165,233,0.4)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(14,165,233,0.1)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 style={{ color: '#f0f9ff', fontWeight: 700, fontSize: 14, marginBottom: 20, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {category}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{ color: '#64748b', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s ease', display: 'flex', alignItems: 'center', gap: 6 }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#0ea5e9')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
                    >
                      <ArrowRight size={12} style={{ opacity: 0.5 }} />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          style={{
            background: 'rgba(14,165,233,0.05)',
            border: '1px solid rgba(14,165,233,0.15)',
            borderRadius: 20,
            padding: '32px 40px',
            marginBottom: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h4 style={{ color: '#f0f9ff', fontWeight: 700, fontSize: 20, marginBottom: 6 }}>
              Stay Updated with Latest Tech Insights
            </h4>
            <p style={{ color: '#64748b', fontSize: 14 }}>Join 5,000+ business leaders getting our weekly newsletter.</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-input"
              style={{ width: 280 }}
            />
            <button className="btn-primary">
              <span>Subscribe</span>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider-glow" style={{ marginBottom: 24 }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <p style={{ color: '#475569', fontSize: 13 }}>
            © {new Date().getFullYear()} JioLite Info Tech. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
              <a key={link} href="#" style={{ color: '#475569', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#0ea5e9')}
                onMouseLeave={e => (e.currentTarget.style.color = '#475569')}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
