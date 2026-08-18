import Hero from '@/components/sections/Hero';
import TrustBadges from '@/components/sections/TrustBadges';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import TechStack from '@/components/sections/TechStack';
import Testimonials from '@/components/sections/Testimonials';
import Metrics from '@/components/sections/Metrics';
import Security from '@/components/sections/Security';

export default function Home() {
  return (
    <div>
      <Hero />
      <TrustBadges />
      <WhyChooseUs />
      <TechStack />
      <Metrics />
      <Security />
      <Testimonials />
    </div>
  );
}

