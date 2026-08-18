import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Background3D from '@/components/Background3D';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Siddhivinayak Associate — Innovative Software Solutions",
  description: "Siddhivinayak Associate builds ERP Systems, CRM Platforms, E-Commerce Solutions, AI Automation, Mobile Apps, and Enterprise Software. Transforming businesses through innovative technology solutions.",
  keywords: "ERP software, CRM development, e-commerce solutions, mobile app development, AI automation, enterprise software, custom software development",
  authors: [{ name: "Siddhivinayak Associate" }],
  openGraph: {
    title: "Siddhivinayak Associate — Innovative Software Solutions",
    description: "Transforming Businesses Through Innovative Software Solutions. 500+ Projects, 200+ Happy Clients, 99.9% Uptime.",
    url: "https://siddhivinayakassociate.com",
    siteName: "Siddhivinayak Associate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siddhivinayak Associate — Innovative Software Solutions",
    description: "Transforming Businesses Through Innovative Software Solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <div style={{ position: 'relative' }}>
          {/* Fixed 3D canvas — renders behind everything */}
          <Background3D />

          {/* All page content sits above the 3D background */}
          <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}

