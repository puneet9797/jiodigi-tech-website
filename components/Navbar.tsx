'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.4s ease',
        padding: scrolled ? '12px 0' : '20px 0',
        background: scrolled
          ? 'rgba(2, 8, 24, 0.9)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(14,165,233,0.1)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src="/logo.png"
            alt="JioLite Info Tech Logo"
            style={{
              height: scrolled ? 'clamp(54px, 5vw + 20px, 68px)' : 'clamp(76px, 7vw + 20px, 94px)',
              width: 'auto',
              filter: 'drop-shadow(0 0 12px rgba(14, 165, 233, 0.45)) drop-shadow(0 0 3px rgba(139, 92, 246, 0.35))',
              display: 'block',
              transition: 'all 0.4s ease',
            }}
          />
        </a>

        {/* Desktop Nav */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: 32, listStyle: 'none', padding: 0, margin: 0 }}
          className="hidden-mobile">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  color: '#94a3b8',
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 500,
                  transition: 'color 0.2s ease',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#0ea5e9')}
                onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="hidden-mobile">
          <a href="#contact" className="btn-primary" style={{ padding: '10px 24px', fontSize: 14, textDecoration: 'none' }}>
            <span>Book Consultation</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#f0f9ff',
            cursor: 'pointer',
            display: 'none',
          }}
          className="show-mobile"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(2, 8, 24, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(14,165,233,0.1)',
            padding: '24px',
          }}
        >
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: '#94a3b8',
                    textDecoration: 'none',
                    fontSize: 16,
                    fontWeight: 500,
                    display: 'block',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex' }}>
                <span>Book Consultation</span>
              </a>
            </li>
          </ul>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
