'use client';
import { useEffect, useRef, useState } from 'react';
import { Send, Phone, Mail, MapPin, MessageCircle, Link2, Calendar, FileText } from 'lucide-react';

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

export default function Contact() {
  const { ref, inView } = useInView(0.1);
  const [formState, setFormState] = useState({
    name: '', company: '', email: '', phone: '', requirements: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formState.name.trim()) {
      tempErrors.name = 'Name is required';
    } else if (formState.name.trim().length < 2) {
      tempErrors.name = 'Name must be at least 2 characters';
    }

    if (!formState.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!formState.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else {
      const cleanPhone = formState.phone.replace(/[\s()-]/g, '');
      if (!/^\+?\d{10,15}$/.test(cleanPhone)) {
        tempErrors.phone = 'Please enter a valid 10-15 digit phone number';
      }
    }

    if (!formState.requirements.trim()) {
      tempErrors.requirements = 'Requirements details are required';
    } else if (formState.requirements.trim().length < 10) {
      tempErrors.requirements = 'Please describe your project in at least 10 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate API request delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const contactDetails = [
    { icon: <Phone size={18} />, label: 'Phone', value: '+91 9369032501', href: 'tel:+918299758889', color: '#0ea5e9' },
    { icon: <Mail size={18} />, label: 'Email', value: 'jioliteproducts@gmail.com', href: 'mailto:hello@jiodigi.tech', color: '#8b5cf6' },
    { icon: <MessageCircle size={18} />, label: 'WhatsApp', value: '+91 8299758889', href: 'https://wa.me/918299758889', color: '#25d366' },
    // { icon: <Link2 size={18} />, label: 'LinkedIn', value: '/company/jiodigi-tech', href: '#', color: '#0a66c2' },
    { icon: <MapPin size={18} />, label: 'Office', value: '74/276, Halsey Road, Kanpur - 208001, U.P., India', href: '#', color: '#f59e0b' },
  ];

  return (
    <section id="contact" className="section-padding" style={{ background: 'linear-gradient(180deg, #020818, #030d1a)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 80% 20%, rgba(14,165,233,0.07) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none' }} />

      <div className="container" ref={ref}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-badge">📬 Contact</div>
          <h2 className="section-title">
            Let's Build Something <span className="gradient-text">Extraordinary</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Tell us about your project. Our team will get back to you within 2 business hours with a tailored proposal.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'start' }} className="contact-layout">
          {/* Left: Contact Info */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(-40px)',
            transition: 'all 0.8s ease',
          }}>
            <h3 style={{ fontSize: 26, fontWeight: 800, color: '#f0f9ff', marginBottom: 12 }}>
              Talk to Our Experts
            </h3>
            <p style={{ color: '#64748b', fontSize: 15, lineHeight: 1.75, marginBottom: 40 }}>
              Whether you need a quick consultation or want to discuss a full enterprise solution — we're here, ready to help.
            </p>

            {/* Contact Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
              {contactDetails.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '16px 20px',
                    background: 'rgba(10,25,50,0.5)',
                    border: '1px solid rgba(14,165,233,0.12)',
                    borderRadius: 14, textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${item.color}40`;
                    (e.currentTarget as HTMLElement).style.background = `${item.color}08`;
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(6px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(14,165,233,0.12)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(10,25,50,0.5)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{
                    width: 44, height: 44,
                    borderRadius: 12,
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}30`,
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color, flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#475569', marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#f0f9ff' }}>{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Response time */}
            <div style={{
              padding: '20px 24px',
              background: 'linear-gradient(135deg, rgba(14,165,233,0.08), rgba(139,92,246,0.08))',
              border: '1px solid rgba(14,165,233,0.15)',
              borderRadius: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', animation: 'pulse-glow 2s infinite' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#10b981' }}>We're Online Now</span>
              </div>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Average response time: <strong style={{ color: '#f0f9ff' }}>under 2 hours</strong>. We respond to all inquiries within 1 business day.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(40px)',
            transition: 'all 0.8s ease 0.2s',
          }}>
            {submitted ? (
              <div style={{
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.3)',
                borderRadius: 24, padding: '60px 40px',
                textAlign: 'center',
                boxShadow: '0 20px 40px rgba(16,185,129,0.05)',
                backdropFilter: 'blur(20px)',
              }}>
                <div style={{ fontSize: 60, marginBottom: 20 }}>🎉</div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: '#f0f9ff', marginBottom: 12 }}>
                  Message Sent Successfully!
                </h3>
                <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.7, margin: 0 }}>
                  Thank you! Our technology experts are reviewing your details. We will contact you within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{
                background: 'rgba(10,25,50,0.5)',
                border: '1px solid rgba(14,165,233,0.15)',
                borderRadius: 24, padding: '48px 40px',
                backdropFilter: 'blur(20px)',
              }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#f0f9ff', marginBottom: 32 }}>
                  Send Us a Message
                </h3>

                {/* Name + Company */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                  {[
                    { key: 'name', label: 'Your Name *', placeholder: 'John Smith', type: 'text' },
                    { key: 'company', label: 'Company Name', placeholder: 'Acme Corp (Optional)', type: 'text' },
                  ].map(field => (
                    <div key={field.key}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#64748b', marginBottom: 8 }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="form-input"
                        style={{
                          borderColor: errors[field.key] ? '#f87171' : (focused === field.key ? 'rgba(14, 165, 233, 0.6)' : 'rgba(14, 165, 233, 0.15)'),
                        }}
                        value={formState[field.key as keyof typeof formState]}
                        onChange={e => {
                          setFormState(prev => ({ ...prev, [field.key]: e.target.value }));
                          if (errors[field.key]) {
                            setErrors(prev => {
                              const copy = { ...prev };
                              delete copy[field.key];
                              return copy;
                            });
                          }
                        }}
                        onFocus={() => setFocused(field.key)}
                        onBlur={() => setFocused(null)}
                      />
                      {errors[field.key] && (
                        <div style={{ color: '#f87171', fontSize: 11, marginTop: 4 }}>{errors[field.key]}</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Email + Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                  {[
                    { key: 'email', label: 'Email Address *', placeholder: 'john@company.com', type: 'email' },
                    { key: 'phone', label: 'Phone Number *', placeholder: '+91 98765 43210', type: 'tel' },
                  ].map(field => (
                    <div key={field.key}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#64748b', marginBottom: 8 }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="form-input"
                        style={{
                          borderColor: errors[field.key] ? '#f87171' : (focused === field.key ? 'rgba(14, 165, 233, 0.6)' : 'rgba(14, 165, 233, 0.15)'),
                        }}
                        value={formState[field.key as keyof typeof formState]}
                        onChange={e => {
                          setFormState(prev => ({ ...prev, [field.key]: e.target.value }));
                          if (errors[field.key]) {
                            setErrors(prev => {
                              const copy = { ...prev };
                              delete copy[field.key];
                              return copy;
                            });
                          }
                        }}
                        onFocus={() => setFocused(field.key)}
                        onBlur={() => setFocused(null)}
                      />
                      {errors[field.key] && (
                        <div style={{ color: '#f87171', fontSize: 11, marginTop: 4 }}>{errors[field.key]}</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Requirements */}
                <div style={{ marginBottom: 32 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#64748b', marginBottom: 8 }}>
                    Project Requirements *
                  </label>
                  <textarea
                    placeholder="Tell us about your project, goals, timeline, and budget..."
                    rows={5}
                    className="form-input"
                    style={{
                      resize: 'vertical', minHeight: 120,
                      borderColor: errors.requirements ? '#f87171' : (focused === 'requirements' ? 'rgba(14, 165, 233, 0.6)' : 'rgba(14, 165, 233, 0.15)'),
                    }}
                    value={formState.requirements}
                    onChange={e => {
                      setFormState(prev => ({ ...prev, requirements: e.target.value }));
                      if (errors.requirements) {
                        setErrors(prev => {
                          const copy = { ...prev };
                          delete copy.requirements;
                          return copy;
                        });
                      }
                    }}
                    onFocus={() => setFocused('requirements')}
                    onBlur={() => setFocused(null)}
                  />
                  {errors.requirements && (
                    <div style={{ color: '#f87171', fontSize: 11, marginTop: 4 }}>{errors.requirements}</div>
                  )}
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                    style={{ flex: 1, minWidth: 160, justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                      {loading ? (
                        <>
                          <div style={{
                            width: 16, height: 16,
                            borderRadius: '50%',
                            border: '2px solid rgba(255,255,255,0.3)',
                            borderTopColor: '#fff',
                            animation: 'spin 0.8s linear infinite',
                          }} />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} /> Send Message
                        </>
                      )}
                    </span>
                  </button>
                  <a href="#" className="btn-secondary" style={{ flex: 1, minWidth: 160, textDecoration: 'none', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Calendar size={16} /> Schedule Demo
                  </a>
                </div>

                <p style={{ fontSize: 12, color: '#334155', marginTop: 16, textAlign: 'center' }}>
                  🔒 Your information is 100% secure and will never be shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-layout { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .contact-layout form > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
