import type { Metadata } from 'next';
import About from '@/components/sections/About';

export const metadata: Metadata = {
  title: 'About Us — RSVPAI Info Tech',
  description: 'Learn more about RSVPAI Info Tech. Our mission, vision, core values, culture, and outstanding track record of delivering 500+ successful software projects.',
  keywords: 'about RSVPAI Info Tech, software development team, core values, company mission, tech expertise',
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <About />
    </div>
  );
}
