import Navbar from '@/components/Navbar';
import Background3D from '@/components/Background3D';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Products from '@/components/sections/Products';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import TechStack from '@/components/sections/TechStack';
import CaseStudies from '@/components/sections/CaseStudies';
import Testimonials from '@/components/sections/Testimonials';
import Metrics from '@/components/sections/Metrics';
import Security from '@/components/sections/Security';
import Pricing from '@/components/sections/Pricing';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div style={{ position: 'relative' }}>
      {/* Fixed 3D canvas — renders behind everything */}
      <Background3D />

      {/* All page content sits above the 3D background */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Products />
          <WhyChooseUs />
          <TechStack />
          <CaseStudies />
          <Testimonials />
          <Metrics />
          <Security />
          <Pricing />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
