import React, { useEffect, useState } from 'react';
import { PrayerWidget } from '@/src/components/PrayerWidget';
import { SEO } from '@/src/components/SEO';
import {
  BookOpen, MapPin, Calculator, ArrowRight,
  ShieldCheck, Zap, Globe, ChevronRight, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

/* ─── Ramadan Countdown ─────────────────────────────────── */
function useCountdown(target: string) {
  const [days, setDays] = useState(0);
  useEffect(() => {
    const d = Math.ceil((new Date(target).getTime() - Date.now()) / 86400000);
    setDays(d > 0 ? d : 0);
  }, [target]);
  return days;
}

/* ─── Rotating Arabic phrases ───────────────────────────── */
const PHRASES = [
  { ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', en: 'In the name of Allah, the Most Gracious' },
  { ar: 'اللَّهُ أَكْبَرُ', en: 'Allah is the Greatest' },
  { ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', en: 'Glory be to Allah and praise Him' },
  { ar: 'لَا إِلَٰهَ إِلَّا اللَّهُ', en: 'There is no god but Allah' },
];

const RECENT_POSTS = [
  { id: 'last-10-nights-ramadan', title: 'The Last 10 Nights of Ramadan', cat: 'Ramadan', img: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=600&q=80' },
  { id: 'fajr-time-today', title: 'What Time is Fajr Today?', cat: 'Prayer', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
  { id: 'calculate-zakat-2026', title: 'How to Calculate Zakat 2026', cat: 'Finance', img: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=600&q=80' },
];

const SHOP_ITEMS = [
  { label: 'Prayer Mats', emoji: '🕌', desc: 'Premium quality' },
  { label: 'Tasbih', emoji: '📿', desc: 'Hand-crafted' },
  { label: 'Qurans', emoji: '📖', desc: 'Various editions' },
  { label: 'Ramadan Essentials', emoji: '🌙', desc: 'Full sets' },
];

/* ─── MAIN COMPONENT ────────────────────────────────────── */
export function Home() {
  const { t } = useTranslation();
  const daysToRamadan = useCountdown('2026-02-17');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setPhraseIdx(i => (i + 1) % PHRASES.length); setVisible(true); }, 400);
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  const phrase = PHRASES[phraseIdx];

  return (
    <div className="bg-white text-ink">
      <SEO
        title="Prayer Times, Qibla, Quran & Daily Islamic Guidance | Al Ummah AI"
        description="Accurate GPS prayer times for Fajr, Dhuhr, Asr, Maghrib & Isha. Real-time Qibla finder, Quran with audio, Zakat calculator and Islamic guides. Free for 1.8 billion Muslims."
        keywords="prayer times near me, fajr time today, qibla direction, quran audio, zakat calculator, ramadan 2026, islamic guidance"
        canonical="https://www.alummahai.com"
      />

      {/* ══════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative bg-navy min-h-[92vh] flex flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16">

        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        {/* Glow blobs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gold/5 blur-[80px] pointer-events-none" />

        {/* Rotating phrase */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-8">
          <div style={{
            fontFamily: "'Amiri', serif",
            fontSize: 'clamp(1.4rem, 4vw, 2.6rem)',
            color: '#D4AF37',
            direction: 'rtl',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(-8px)',
            transition: 'all 0.4s ease',
            textShadow: '0 0 40px rgba(212,175,55,0.3)',
          }}>{phrase.ar}</div>
          <div style={{
            fontSize: '0.7rem', color: 'rgba(212,175,55,0.5)',
            letterSpacing: '2px', marginTop: '6px', fontStyle: 'italic',
            opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease 0.1s',
          }}>{phrase.en}</div>
        </motion.div>

        {/* H1 */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[1.05] tracking-tight">
            Prayer Times, Qibla,{' '}
            <span className="text-gold">Quran</span> and Daily Guidance
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
            The complete Islamic platform — accurate, fast, and free for 1.8 billion Muslims worldwide.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link to="/" className="flex items-center justify-center gap-3 bg-gold text-navy px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gold-light hover:scale-105 transition-all shadow-[0_8px_30px_rgba(212,175,55,0.35)]">
            <MapPin className="w-4 h-4" /> Use My Location
          </Link>
          <Link to="/quran" className="flex items-center justify-center gap-3 bg-white/8 border border-white/15 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:border-gold/40 hover:text-gold transition-all">
            <BookOpen className="w-4 h-4" /> Read Quran
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
          className="flex flex-wrap justify-center gap-10 mt-14 pt-10 border-t border-white/8 w-full max-w-2xl">
          {[['1.8B+', 'Muslims'], ['150+', 'Cities'], ['5', 'Languages'], ['100%', 'Free']].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="text-2xl font-display font-black text-gold">{n}</div>
              <div className="text-[10px] text-white/30 font-black uppercase tracking-widest mt-1">{l}</div>
            </div>
          ))}
        </motion.div>

        {/* Ramadan countdown */}
        {daysToRamadan > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="mt-10 px-6 py-3 rounded-full border border-gold/30 bg-gold/8 flex items-center gap-3">
            <span className="text-lg">🌙</span>
            <span className="text-sm text-gold font-black">{daysToRamadan} days until Ramadan 2026</span>
            <Link to="/ramadan" className="text-[10px] text-white/40 uppercase tracking-widest hover:text-gold transition-colors">Guide →</Link>
          </motion.div>
        )}
      </section>

      {/* ══════════════════════════════════════════════════════
          2. TRUST BAR
      ══════════════════════════════════════════════════════ */}
      <section className="bg-offwhite border-y border-navy/8 py-5 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-6 min-w-max mx-auto">
          {[
            { icon: <MapPin className="w-4 h-4" />, text: 'Accurate prayer times by GPS' },
            { icon: <Globe className="w-4 h-4" />, text: 'Real-time Qibla direction' },
            { icon: <BookOpen className="w-4 h-4" />, text: 'Quran with audio & translations' },
            { icon: <ShieldCheck className="w-4 h-4" />, text: 'Verified by scholars' },
            { icon: <Zap className="w-4 h-4" />, text: 'Fast · Clean · Ad-free tools' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-xs font-bold text-navy/60 whitespace-nowrap px-4">
              <span className="text-gold">{icon}</span> {text}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. PRAYER TIMES — FULL WIDTH
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-block px-4 py-1 bg-gold/10 border border-gold/25 rounded-full text-gold text-[10px] font-black uppercase tracking-[0.4em]">
            ✦ Live · GPS Accurate
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-navy">Prayer Times Near You</h2>
          <p className="text-navy/50 font-light max-w-xl mx-auto">Automatically detected from your location. Or search any city in the world.</p>
        </div>
        <PrayerWidget />
      </section>

      {/* ══════════════════════════════════════════════════════
          4. FOUR CORE TOOLS
      ══════════════════════════════════════════════════════ */}
      <section className="bg-navy py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <div className="inline-block px-4 py-1 bg-gold/15 border border-gold/25 rounded-full text-gold text-[10px] font-black uppercase tracking-[0.4em]">
              ✦ Sacred Tools
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white">Everything You Need</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MapPin, label: 'Prayer Times', desc: 'GPS-accurate times for all 5 daily prayers, any city', link: '/', emoji: '🕐' },
              { icon: Globe, label: 'Qibla Finder', desc: 'Real-time direction to Mecca from your exact location', link: '/qibla', emoji: '🧭' },
              { icon: BookOpen, label: 'Quran Audio', desc: 'Full Quran with translations, audio recitations & search', link: '/quran', emoji: '📖' },
              { icon: Calculator, label: 'Zakat Calculator', desc: 'Accurate Zakat calculation based on 2026 Nisab rates', link: '/zakat', emoji: '💛' },
            ].map(({ icon: Icon, label, desc, link, emoji }) => (
              <Link key={label} to={link}
                className="group relative bg-white/5 border border-white/8 rounded-3xl p-8 hover:border-gold/40 hover:bg-white/8 transition-all duration-300 overflow-hidden">
                <div className="absolute top-4 right-4 text-3xl opacity-15 group-hover:opacity-30 transition-opacity">{emoji}</div>
                <div className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold/25 flex items-center justify-center mb-6 group-hover:bg-gold group-hover:border-gold transition-all">
                  <Icon className="w-5 h-5 text-gold group-hover:text-navy transition-colors" />
                </div>
                <h3 className="text-xl font-display font-black text-white mb-2 group-hover:text-gold transition-colors">{label}</h3>
                <p className="text-white/40 text-sm font-light leading-relaxed">{desc}</p>
                <div className="flex items-center gap-1 mt-6 text-gold/50 text-xs font-black uppercase tracking-widest group-hover:text-gold group-hover:gap-2 transition-all">
                  Open <ChevronRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>

          {/* Secondary tools */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: 'Hajj Guide', link: '/hajj', emoji: '🕋' },
              { label: 'Ramadan 2026', link: '/ramadan', emoji: '🌙' },
              { label: 'Scholar AI', link: '/scholar', emoji: '🤖' },
              { label: 'Islamic Store', link: '/store', emoji: '🛍️' },
            ].map(({ label, link, emoji }) => (
              <Link key={label} to={link}
                className="flex items-center gap-3 bg-white/4 border border-white/8 rounded-2xl px-5 py-4 hover:border-gold/30 hover:bg-white/6 transition-all group">
                <span className="text-xl">{emoji}</span>
                <span className="text-sm font-black text-white/60 group-hover:text-gold transition-colors uppercase tracking-wide">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. SEO CONTENT — BLOG ARTICLES
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-2">
            <div className="inline-block px-4 py-1 bg-gold/10 border border-gold/25 rounded-full text-gold text-[10px] font-black uppercase tracking-[0.4em]">
              ✦ Islamic Knowledge
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-navy">Guides & Articles</h2>
            <p className="text-navy/50 font-light">Ramadan guides, prayer times by city, duas and Islamic articles.</p>
          </div>
          <Link to="/blog" className="hidden md:flex items-center gap-2 text-gold text-xs font-black uppercase tracking-widest border border-gold/30 px-5 py-3 rounded-full hover:bg-gold/10 transition-all">
            All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RECENT_POSTS.map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link to={`/blog/${post.id}`}
                className="group block bg-white border border-navy/8 rounded-3xl overflow-hidden hover:border-gold/40 hover:shadow-[0_8px_40px_rgba(212,175,55,0.12)] transition-all duration-300">
                <div className="h-52 overflow-hidden relative">
                  <img src={post.img} alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                  <span className="absolute top-4 left-4 bg-gold text-navy text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    {post.cat}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-display font-black text-navy group-hover:text-gold transition-colors leading-tight">{post.title}</h3>
                  <div className="flex items-center justify-between pt-2 border-t border-navy/6">
                    <span className="text-xs text-navy/30 font-bold uppercase tracking-widest">Al Ummah AI</span>
                    <span className="text-gold text-xs font-black flex items-center gap-1">Read <ChevronRight className="w-3 h-3" /></span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Topic pills */}
        <div className="flex flex-wrap gap-3 mt-10">
          {[['Ramadan 2026', '/blog/ramadan-2026-prayer-timetable'],['Fajr Time', '/blog/fajr-time-today'],['Zakat Guide', '/blog/calculate-zakat-2026'],['Hajj 2026', '/blog/hajj-packages-uk-2026'],['Surah Al-Kahf', '/blog/surah-al-kahf-friday'],['How to Pray', '/blog/how-to-pray-salah-beginners'],['Islamic History', '/blog/islamic-history-golden-age'],['Halal Investing', '/blog/best-halal-investment-apps-2026']].map(([label, link]) => (
            <Link key={label} to={link}
              className="px-4 py-2 bg-navy/4 border border-navy/10 rounded-full text-xs font-black text-navy/60 hover:border-gold/40 hover:text-gold transition-all">
              {label}
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/blog" className="inline-flex items-center gap-2 bg-navy text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-navy-light transition-all">
            View All 15 Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. SHOP PREVIEW — NO PRICES
      ══════════════════════════════════════════════════════ */}
      <section className="bg-offwhite border-y border-navy/8 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-2">
              <div className="inline-block px-4 py-1 bg-gold/10 border border-gold/25 rounded-full text-gold text-[10px] font-black uppercase tracking-[0.4em]">
                ✦ Islamic Store
              </div>
              <h2 className="text-4xl font-display font-black text-navy">Premium Islamic Products</h2>
              <p className="text-navy/50 font-light">Handpicked essentials for your spiritual life.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {SHOP_ITEMS.map(({ label, emoji, desc }) => (
              <div key={label} className="bg-white border border-navy/8 rounded-3xl p-8 text-center hover:border-gold/40 hover:shadow-[0_8px_30px_rgba(212,175,55,0.1)] transition-all group cursor-pointer">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{emoji}</div>
                <h3 className="font-display font-black text-navy text-lg group-hover:text-gold transition-colors">{label}</h3>
                <p className="text-navy/40 text-xs mt-1 font-light">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/store"
              className="inline-flex items-center gap-3 bg-gold text-navy px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gold-light hover:scale-105 transition-all shadow-[0_8px_30px_rgba(212,175,55,0.25)]">
              Browse Islamic Store <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. TRUST SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-14 space-y-3">
          <h2 className="text-4xl md:text-5xl font-display font-black text-navy">Why Al Ummah AI?</h2>
          <p className="text-navy/50 font-light max-w-xl mx-auto">Combining centuries of tradition with modern technology.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: ShieldCheck, title: 'Scholar Verified', desc: 'All content and tools are reviewed by qualified Islamic scholars to ensure accuracy and authenticity.' },
            { icon: Zap, title: 'GPS Precision', desc: 'Prayer times calculated using your exact coordinates for maximum accuracy — never miss a prayer.' },
            { icon: Globe, title: '5 Languages', desc: 'Full support for English, Arabic, French, Spanish and Indonesian — for the global Ummah.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center space-y-5 group">
              <div className="w-16 h-16 bg-gold/8 rounded-2xl flex items-center justify-center mx-auto border border-gold/15 group-hover:bg-gold group-hover:border-gold transition-all">
                <Icon className="w-8 h-8 text-gold group-hover:text-navy transition-colors" />
              </div>
              <h3 className="text-2xl font-display font-black text-navy">{title}</h3>
              <p className="text-navy/50 font-light leading-relaxed max-w-xs mx-auto">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. FINAL CTA
      ══════════════════════════════════════════════════════ */}
      <section className="bg-navy py-24 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="text-5xl">🌙</div>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white leading-tight">
            Start your spiritual journey <span className="text-gold">today</span>
          </h2>
          <p className="text-white/50 text-lg font-light max-w-xl mx-auto">
            Prayer times, Quran, Qibla, Zakat — everything you need, free forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/quran"
              className="flex items-center justify-center gap-2 bg-gold text-navy px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gold-light hover:scale-105 transition-all shadow-[0_8px_30px_rgba(212,175,55,0.3)]">
              Read Quran Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/blog"
              className="flex items-center justify-center gap-2 bg-white/6 border border-white/15 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:border-gold/40 hover:text-gold transition-all">
              Explore Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
