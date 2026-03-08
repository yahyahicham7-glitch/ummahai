import React from 'react';
import { SEO } from '@/src/components/SEO';

export function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 space-y-12 text-cream/80">
      <SEO title="Terms of Service" description="Terms of Service for Ummah AI platform. Read our rules and guidelines for using the platform." />
      
      <h1 className="text-5xl font-display font-black text-cream">Terms of Service</h1>
      <p className="text-sm text-gold/60 uppercase tracking-widest font-black">Last Updated: March 2026</p>
      
      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-gold">1. Acceptance of Terms</h2>
        <p>By accessing or using Ummah AI, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-gold">2. Use of Services</h2>
        <p>You agree to use Ummah AI only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-gold">3. Intellectual Property</h2>
        <p>The content, layout, design, data, databases and graphics on this website are protected by intellectual property laws. You may not reproduce, download, transmit or retransmit any part of this website without our prior written consent.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-gold">4. Limitation of Liability</h2>
        <p>Ummah AI will not be liable for any damages of any kind arising from the use of this site, including, but not limited to direct, indirect, incidental, punitive, and consequential damages.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-gold">5. Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Your continued use of the site after any such changes constitutes your acceptance of the new Terms of Service.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-gold">6. Governing Law</h2>
        <p>These terms are governed by and construed in accordance with the laws of the jurisdiction in which we operate.</p>
      </section>
    </div>
  );
}
