import React from 'react';
import { motion } from 'motion/react';
import { SEO } from '@/src/components/SEO';
import { Moon, Star, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RamadanPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Ramadan 2026",
    "startDate": "2026-02-17",
    "endDate": "2026-03-18",
    "description": "Ramadan 2026 guide with prayer times, Suhoor and Iftar schedules, Laylatul Qadr and more.",
    "organizer": { "@type": "Organization", "name": "Al Ummah AI", "url": "https://www.alummahai.com" }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 space-y-20">
      <SEO
        title="Ramadan 2026 Guide — Suhoor, Iftar & Prayer Times"
        description="Complete Ramadan 2026 guide. Get accurate Suhoor and Iftar times for your city, Laylatul Qadr guide, fasting tips and more. Free for all Muslims."
        keywords="ramadan 2026, ramadan prayer times, suhoor time, iftar time, laylatul qadr 2026, ramadan fasting guide"
        canonical="https://www.alummahai.com/ramadan"
        schema={schema}
      />

      <div className="text-center space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="inline-block px-6 py-2 bg-gold/10 border border-gold/20 rounded-full text-gold text-[10px] font-black uppercase tracking-[0.5em]">
          🌙 Holy Month
        </motion.div>
        <h1 className="text-6xl md:text-9xl font-display font-black text-cream tracking-tighter">Ramadan 2026</h1>
        <p className="text-gold/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Ramadan 2026 begins around <span className="text-gold font-bold">February 17, 2026</span>. Prepare your spiritual journey with accurate prayer times, Suhoor & Iftar schedules, and our complete guide to the blessed month.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: Moon, title: 'Start Date', value: '~Feb 17, 2026', sub: 'Subject to moon sighting' },
          { icon: Star, title: 'Laylatul Qadr', value: '27th Night', sub: '~Mar 14, 2026' },
          { icon: Clock, title: 'Duration', value: '29–30 Days', sub: 'Full lunar month' },
          { icon: Heart, title: 'Eid al-Fitr', value: '~Mar 18, 2026', sub: 'End of Ramadan' },
        ].map((item, i) => (
          <div key={i} className="glass-card p-8 text-center hover:border-gold transition-all">
            <item.icon className="w-10 h-10 text-gold mx-auto mb-4" />
            <div className="text-xs text-gold/50 font-black uppercase tracking-widest mb-2">{item.title}</div>
            <div className="text-2xl font-display font-black text-cream">{item.value}</div>
            <div className="text-xs text-cream/40 mt-1">{item.sub}</div>
          </div>
        ))}
      </div>

      <div className="glass-card p-12 text-center space-y-6">
        <h2 className="text-4xl font-display font-black text-cream">Get Your Local Suhoor & Iftar Times</h2>
        <p className="text-cream/60 max-w-xl mx-auto font-light">Enter your city to get accurate Suhoor and Iftar times for every day of Ramadan 2026.</p>
        <Link to="/" className="inline-flex items-center bg-gold text-glamour-blue px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
          🌙 Get Prayer Times
        </Link>
      </div>

      <div className="space-y-6">
        <h2 className="text-4xl font-display font-black text-cream text-center">Ramadan Tips & Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'The Last 10 Nights of Ramadan', desc: 'Complete guide to Laylatul Qadr, Itikaf and maximizing the blessed nights.', slug: 'last-10-nights-ramadan' },
            { title: 'How to Make the Most of Ramadan', desc: 'Practical spiritual tips to transform this Ramadan into your best one yet.', slug: 'ramadan-tips' },
            { title: 'Zakat al-Fitr 2026 Guide', desc: 'Learn how much Zakat al-Fitr to pay, when and to whom in 2026.', slug: 'zakat-al-fitr-2026' },
          ].map((item, i) => (
            <Link key={i} to={`/blog/${item.slug}`} className="glass-card p-8 hover:border-gold transition-all group">
              <h3 className="text-xl font-display font-black text-cream group-hover:text-gold transition-colors mb-3">{item.title}</h3>
              <p className="text-cream/50 font-light text-sm">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
