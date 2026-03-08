import React, { useState } from 'react';
import { Calculator, Info, ArrowRight, DollarSign, Coins } from 'lucide-react';
import { SEO } from '@/src/components/SEO';
import { motion } from 'motion/react';
import { cn } from '@/src/utils/cn';

export function ZakatPage() {
  const [wealth, setWealth] = useState({
    cash: 0,
    gold: 0,
    silver: 0,
    investments: 0,
    business: 0,
    debts: 0
  });

  const totalWealth = wealth.cash + wealth.gold + wealth.silver + wealth.investments + wealth.business - wealth.debts;
  const zakatDue = totalWealth > 0 ? totalWealth * 0.025 : 0;
  const nisab = 6000; // Example Nisab in USD

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <SEO 
        title="Zakat Calculator" 
        description="Calculate your Zakat accurately based on current gold, silver, and currency rates. Fulfill your third pillar of Islam with ease."
        keywords="zakat calculator, calculate zakat, islamic charity, nisab threshold"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-display font-black text-cream">Zakat Calculator</h1>
            <p className="text-gold/60 text-xs font-bold uppercase tracking-[0.3em]">Purify Your Wealth, Empower the Ummah</p>
            <p className="text-cream/60 text-base leading-relaxed font-light">
              Fulfill your sacred obligation with precision. Our calculator helps you determine your Zakat based on authentic scholarly guidelines.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 bg-glamour-blue-light/50 text-cream space-y-6 border-gold/30"
          >
            <div className="flex items-center space-x-3 text-gold">
              <Info className="w-6 h-6" />
              <h3 className="text-xl font-display font-black">Nisab Threshold</h3>
            </div>
            <p className="text-xs font-light leading-relaxed text-cream/70">
              Zakat is only due if your net wealth exceeds the Nisab threshold for a full lunar year. The current estimated Nisab is <span className="text-gold font-black tracking-widest">${nisab}</span> (based on 87.48g of gold).
            </p>
            <div className="pt-4 border-t border-gold/10 flex justify-between items-center">
              <span className="text-[8px] uppercase tracking-[0.3em] font-black text-gold/40">Current Status</span>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full border",
                totalWealth >= nisab ? "text-emerald-400 border-emerald-400/30 bg-emerald-400/5" : "text-gold border-gold/30 bg-gold/5"
              )}>
                {totalWealth >= nisab ? "Zakat is Due" : "Below Nisab"}
              </span>
            </div>
          </motion.div>

          <div className="space-y-8">
            <h3 className="text-2xl font-display font-black text-cream">The Impact of Giving</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 glass-card border-gold/10 hover:border-gold transition-all">
                <h4 className="font-black text-gold uppercase tracking-widest text-[10px] mb-3">Spiritual Purification</h4>
                <p className="text-xs text-cream/60 leading-relaxed">"Take from their wealth a charity by which you purify them and cause them increase." (Quran 9:103)</p>
              </div>
              <div className="p-6 glass-card border-gold/10 hover:border-gold transition-all">
                <h4 className="font-black text-gold uppercase tracking-widest text-[10px] mb-3">Social Solidarity</h4>
                <p className="text-xs text-cream/60 leading-relaxed">Zakat bridges the gap between the rich and poor, fostering a compassionate and balanced society.</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-12 space-y-8 sticky top-32 border-gold/30 shadow-[0_0_40px_rgba(212,175,55,0.05)]"
        >
          <div className="space-y-6">
            <InputField 
              label="Cash & Bank Balances" 
              value={wealth.cash} 
              onChange={(v) => setWealth({...wealth, cash: v})} 
              icon={DollarSign}
            />
            <InputField 
              label="Gold & Silver (Market Value)" 
              value={wealth.gold} 
              onChange={(v) => setWealth({...wealth, gold: v})} 
              icon={Coins}
            />
            <InputField 
              label="Investments & Stocks" 
              value={wealth.investments} 
              onChange={(v) => setWealth({...wealth, investments: v})} 
              icon={Calculator}
            />
            <InputField 
              label="Business Assets" 
              value={wealth.business} 
              onChange={(v) => setWealth({...wealth, business: v})} 
              icon={Calculator}
            />
            <InputField 
              label="Liabilities & Debts" 
              value={wealth.debts} 
              onChange={(v) => setWealth({...wealth, debts: v})} 
              icon={Calculator}
              isNegative
            />
          </div>

          <div className="pt-8 border-t border-gold/20 space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-cream/40 text-[9px] font-black uppercase tracking-[0.2em]">Total Net Wealth</span>
              <span className="text-2xl font-display font-black text-cream">${totalWealth.toLocaleString()}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center p-6 bg-gradient-to-br from-gold to-gold-light rounded-2xl text-glamour-blue shadow-xl gap-4">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-0.5 opacity-60">Zakat Due (2.5%)</p>
                <p className="text-4xl font-display font-black">${zakatDue.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, icon: Icon, isNegative }: { label: string, value: number, onChange: (v: number) => void, icon: any, isNegative?: boolean }) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-black text-gold/60 uppercase tracking-[0.2em]">{label}</label>
      <div className="relative group">
        <input 
          type="number" 
          value={value || ''} 
          onChange={(e) => onChange(Number(e.target.value))}
          placeholder="0.00"
          className="w-full bg-glamour-blue/30 border border-gold/10 rounded-xl py-3 px-12 text-lg focus:outline-none focus:border-gold transition-all text-cream placeholder:text-cream/10"
        />
        <Icon className="absolute left-4 top-3.5 w-5 h-5 text-gold/40 group-focus-within:text-gold transition-colors" />
        {isNegative && <span className="absolute right-4 top-3.5 text-red-400 font-black">-</span>}
      </div>
    </div>
  );
}
