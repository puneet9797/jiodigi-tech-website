import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JioLite Info Tech — Innovative Software Solutions",
  description: "JioLite Info Tech builds ERP Systems, CRM Platforms, E-Commerce Solutions, AI Automation, Mobile Apps, and Enterprise Software. Transforming businesses through innovative technology solutions.",
  keywords: "ERP software, CRM development, e-commerce solutions, mobile app development, AI automation, enterprise software, custom software development",
  authors: [{ name: "JioLite Info Tech" }],
  openGraph: {
    title: "JioLite Info Tech — Innovative Software Solutions",
    description: "Transforming Businesses Through Innovative Software Solutions. 500+ Projects, 200+ Happy Clients, 99.9% Uptime.",
    url: "https://jiolite.tech",
    siteName: "JioLite Info Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JioLite Info Tech — Innovative Software Solutions",
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
      <body className="antialiased" style={{ background: '#020818' }}>
        {children}
      </body>
    </html>
  );
}
