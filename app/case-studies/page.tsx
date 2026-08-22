import type { Metadata } from 'next';
import CaseStudies from '@/components/sections/CaseStudies';

export const metadata: Metadata = {
  title: 'Case Studies — RSVPAI Info Tech',
  description: 'See how RSVPAI Info Tech has helped businesses scale, reduce costs, and automate processes with our tailored ERP, CRM, and E-commerce products.',
  keywords: 'case studies, client success, software implementation results, ERP success stories',
};

export default function CaseStudiesPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <CaseStudies />
    </div>
  );
}
