import React from 'react';
import { SEO } from '@/src/components/SEO';
import { motion } from 'motion/react';
import { TrendingUp, Home, ShieldCheck, Calculator, ArrowRight, ExternalLink } from 'lucide-react';
import { AdSense } from '@/src/components/AdSense';

export function HalalMoneyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 space-y-24">
      <SEO 
        title="Halal Money — Islamic Finance, Investments & Mortgages | Ummah AI"
        description="Grow your wealth the halal way. Comparison of Islamic mortgages, halal investment apps like Wahed, Sukuk bonds guide, and Zakat on investments."
        keywords="halal money, islamic finance, halal investment apps, islamic mortgage uk, sharia compliant investing, zakat on stocks"
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-display font-black text-cream tracking-tighter">Halal Money</h1>
        <p className="text-gold/60 text-lg max-w-2xl mx-auto font-light leading-relaxed italic">
          "Allah has permitted trade and has forbidden interest (Riba)." — Quran 2:275
        </p>
      </motion.div>

      <AdSense slot="1234567890" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Wahed Invest Section */}
        <motion.div 
          whileHover={{ y: -10 }}
          className="glass-card p-12 space-y-8 border-gold/20"
        >
          <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center border border-gold/30">
            <TrendingUp className="w-8 h-8 text-gold" />
          </div>
          <h2 className="text-3xl font-display font-black text-cream">Halal Investing</h2>
          <p className="text-cream/60 leading-relaxed">
            Start your investment journey with Sharia-compliant portfolios. Wahed Invest is a leading platform that screens stocks for halal compliance.
          </p>
          <div className="bg-white/5 p-6 rounded-2xl border border-gold/10">
            <p className="text-xs text-gold font-black uppercase tracking-widest mb-4">Affiliate Partner</p>
            <a 
              href="https://wahedinvest.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between group"
            >
              <span className="text-cream font-bold">Open Wahed Account</span>
              <ExternalLink className="w-5 h-5 text-gold group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Islamic Mortgage Section */}
        <motion.div 
          whileHover={{ y: -10 }}
          className="glass-card p-12 space-y-8 border-gold/20"
        >
          <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center border border-gold/30">
            <Home className="w-8 h-8 text-gold" />
          </div>
          <h2 className="text-3xl font-display font-black text-cream">Islamic Mortgages</h2>
          <p className="text-cream/60 leading-relaxed">
            Compare HPP (Home Purchase Plans) from top UK providers like Gatehouse Bank and Al Rayan. No interest, just partnership.
          </p>
          <ul className="space-y-4">
            {['Gatehouse Bank', 'Al Rayan Bank', 'StrideUp'].map((bank) => (
              <li key={bank} className="flex items-center text-cream/80 text-sm">
                <ShieldCheck className="w-4 h-4 text-gold mr-3" /> {bank} Comparison
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-8 border-gold/10">
          <h3 className="text-xl font-display font-black text-gold mb-4">Sukuk Bonds</h3>
          <p className="text-sm text-cream/60 leading-relaxed">
            A guide to Islamic bonds (Sukuk) which represent ownership in a tangible asset rather than a debt obligation.
          </p>
        </div>
        <div className="glass-card p-8 border-gold/10">
          <h3 className="text-xl font-display font-black text-gold mb-4">Zakat on Stocks</h3>
          <p className="text-sm text-cream/60 leading-relaxed">
            Learn how to calculate Zakat on your investment portfolio, including the 25% rule for long-term investments.
          </p>
        </div>
        <div className="glass-card p-8 border-gold/10">
          <h3 className="text-xl font-display font-black text-gold mb-4">Crypto Halal?</h3>
          <p className="text-sm text-cream/60 leading-relaxed">
            Understanding the scholarly consensus on Bitcoin and Ethereum from an Islamic finance perspective.
          </p>
        </div>
      </div>

      <AdSense slot="0987654321" />
    </div>
  );
}
