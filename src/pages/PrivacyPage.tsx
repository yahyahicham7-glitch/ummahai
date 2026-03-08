import React from 'react';
import { SEO } from '@/src/components/SEO';

export function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 space-y-12 text-cream/80">
      <SEO title="Privacy Policy" description="Privacy Policy for Ummah AI platform. Learn how we collect, use, and protect your personal information in compliance with global standards." />
      
      <h1 className="text-5xl font-display font-black text-cream">Privacy Policy</h1>
      <p className="text-sm text-gold/60 uppercase tracking-widest font-black">Last Updated: March 2026</p>
      
      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-gold">1. Information We Collect</h2>
        <p>We collect information to provide better services to all our users. This includes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Location Information:</strong> We use your IP address and GPS data (with your permission) to provide accurate prayer times and Qibla direction.</li>
          <li><strong>Usage Data:</strong> We collect information about how you interact with our services via Google Analytics.</li>
          <li><strong>Device Information:</strong> We collect information about the device you use to access our services.</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-gold">2. How We Use Information</h2>
        <p>We use the information we collect to provide, maintain, protect and improve our services, and to develop new ones. We do not sell your personal information to third parties.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-gold">3. Cookies and Similar Technologies</h2>
        <p>We use cookies and similar technologies to provide and support our services. You can control cookies through your browser settings and other tools.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-gold">4. Advertising and Analytics</h2>
        <p>We use Google AdSense to serve ads on our site. Google uses cookies to serve ads based on your prior visits to our website or other websites on the Internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-gold underline">Ads Settings</a>.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-gold">5. Data Security</h2>
        <p>We work hard to protect Ummah AI and our users from unauthorized access to or unauthorized alteration, disclosure or destruction of information we hold.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-gold">6. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at support@ummah-ai.com.</p>
      </section>
    </div>
  );
}
