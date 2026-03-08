import React from 'react';
import { SEO } from '@/src/components/SEO';
import { Heart, Shield, Globe } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 space-y-24">
      <SEO title="About Us" description="Learn more about Ummah AI, our mission, and our commitment to the global Muslim community." />
      
      <div className="text-center space-y-8 max-w-3xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-display font-black text-cream">Our Mission</h1>
        <p className="text-xl text-cream/60 leading-relaxed font-light">
          Ummah AI is dedicated to empowering the global Muslim community through innovative technology, providing accurate spiritual tools and authentic knowledge.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="glass-card p-12 text-center space-y-6 border-gold/20">
          <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto text-gold">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-display font-black text-cream">Community First</h3>
          <p className="text-cream/60 text-sm leading-relaxed">Built by the Ummah, for the Ummah. Every feature is designed with the user's spiritual journey in mind.</p>
        </div>

        <div className="glass-card p-12 text-center space-y-6 border-gold/20">
          <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto text-gold">
            <Shield className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-display font-black text-cream">Authentic Knowledge</h3>
          <p className="text-cream/60 text-sm leading-relaxed">We prioritize accuracy and authenticity in all our Islamic content, sourcing from recognized scholarly works.</p>
        </div>

        <div className="glass-card p-12 text-center space-y-6 border-gold/20">
          <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto text-gold">
            <Globe className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-display font-black text-cream">Global Reach</h3>
          <p className="text-cream/60 text-sm leading-relaxed">Supporting multiple languages and global locations to ensure every Muslim has access to essential tools.</p>
        </div>
      </div>
    </div>
  );
}
