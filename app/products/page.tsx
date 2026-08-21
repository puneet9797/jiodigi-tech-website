import type { Metadata } from 'next';
import Products from '@/components/sections/Products';

export const metadata: Metadata = {
  title: 'Our Products Suite — RSVP Technologies',
  description: 'Explore the complete RSVP product suite including RSVP ERP, CRM, Commerce, and AI. Production-ready software platforms used by 200+ companies.',
  keywords: 'enterprise software products, business software suite, ERP system, CRM system, AI automation tools',
};

export default function ProductsPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <Products />
    </div>
  );
}
