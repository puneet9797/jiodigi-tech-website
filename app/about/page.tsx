import type { Metadata } from 'next';
import About from '@/components/sections/About';

export const metadata: Metadata = {
  title: 'About Us — RSVP Technologies',
  description: 'Learn more about RSVP Technologies. Our mission, vision, core values, culture, and outstanding track record of delivering 500+ successful software projects.',
  keywords: 'about RSVP, software development team, core values, company mission, tech expertise',
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <About />
    </div>
  );
}
