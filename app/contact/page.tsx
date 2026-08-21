import type { Metadata } from 'next';
import Contact from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'Contact Us — RSVP Technologies',
  description: 'Get in touch with RSVP Technologies. Request a demo, book a consultation, or talk to our technical team about your software development needs.',
  keywords: 'contact software company, hire developers, book consultation, get software demo',
};

export default function ContactPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <Contact />
    </div>
  );
}
