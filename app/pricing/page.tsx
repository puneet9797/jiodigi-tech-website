import type { Metadata } from 'next';
import Pricing from '@/components/sections/Pricing';

export const metadata: Metadata = {
  title: 'Pricing Plans — RSVPAI Info Tech',
  description: 'Flexible and transparent pricing plans for RSVPAI ERP, CRM, Commerce, and AI Solutions. Find the perfect fit for your enterprise needs.',
  keywords: 'software pricing, ERP price, CRM system cost, custom software rates, enterprise pricing',
};

export default function PricingPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <Pricing />
    </div>
  );
}
