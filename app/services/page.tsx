import type { Metadata } from 'next';
import Services from '@/components/sections/Services';

export const metadata: Metadata = {
  title: 'Our Services — RSVPAI Info Tech',
  description: 'Explore our wide range of services including ERP development, CRM software, E-Commerce, custom Mobile Apps, AI Solutions, Cloud/DevOps, and Digital Marketing.',
  keywords: 'custom software services, ERP development, CRM development, AI solutions, web development services, mobile app development',
};

export default function ServicesPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <Services />
    </div>
  );
}
