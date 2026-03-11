import React, { useEffect, useState, useRef } from 'react';
import { PrayerWidget } from '@/src/components/PrayerWidget';
import { SEO } from '@/src/components/SEO';
import { BookOpen, MapPin, ArrowRight, Search, ChevronRight, Shield, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';

/* ── Data ─────────────────────────────────────────────────── */
const PHRASES = [
  { ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', en: 'In the name of Allah, the Most Gracious' },
  { ar: 'اللَّهُ أَكْبَرُ',                        en: 'Allah is the Greatest' },
  { ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',          en: 'Glory be to Allah and praise Him' },
  { ar: 'لَا إِلَٰهَ إِلَّا اللَّهُ',             en: 'There is no god but Allah' },
];

const CORE_TOOLS = [
  {
    emoji: '🕐', label: 'Prayer Times', badge: 'Live',
    desc: 'GPS-accurate Fajr, Dhuhr, Asr, Maghrib & Isha for any city worldwide.',
    link: '/',
  },
  {
    emoji: '🧭', label: 'Qibla Finder', badge: 'GPS',
    desc: 'Real-time compass direction toward the Holy Kaaba in Mecca.',
    link: '/qibla',
  },
  {
    emoji: '📖', label: 'Quran', badge: 'Audio',
    desc: 'Complete Quran with audio recitations, translations and verse search.',
    link: '/quran',
  },
  {
    emoji: '💛', label: 'Zakat Calculator', badge: '2026',
    desc: 'Calculate your annual Zakat obligation based on 2026 Nisab rates.',
    link: '/zakat',
  },
];

const GUIDANCE = [
  { emoji: '🌙', label: 'Ramadan 2026',  href: '/ramadan',                     desc: 'Full prayer timetable & spiritual guide for Ramadan' },
  { emoji: '🤲', label: 'Daily Duas',    href: '/blog/morning-evening-adhkar', desc: 'Morning, evening and essential Islamic supplications' },
  { emoji: '✍️', label: 'Articles',      href: '/blog',                        desc: 'Islamic knowledge, history and practical life guides' },
  { emoji: '✨', label: 'Scholar AI',    href: '/scholar',                     desc: 'Ask any Islamic question — answered from Quran & Sunnah' },
];

const SHOP = [
  { emoji: '🕌', label: 'Prayer Mats',        desc: 'Premium quality' },
  { emoji: '📿', label: 'Tasbih',             desc: 'Hand-crafted' },
  { emoji: '📖', label: 'Qurans',             desc: 'Various editions' },
  { emoji: '🌙', label: 'Ramadan Essentials', desc: 'Complete sets' },
];

const PILLS = [
  ['Ramadan 2026',    '/blog/ramadan-2026-prayer-timetable'],
  ['Fajr Time Today', '/blog/fajr-time-today'],
  ['Zakat 2026',      '/blog/calculate-zakat-2026'],
  ['Hajj Packages',   '/blog/hajj-packages-uk-2026'],
  ['Surah Al-Kahf',   '/blog/surah-al-kahf-friday'],
  ['How to Pray',     '/blog/how-to-pray-salah-beginners'],
  ['Islamic History', '/blog/islamic-history-golden-age'],
  ['Halal Investing', '/blog/best-halal-investment-apps-2026'],
];

const WHY = [
  { icon: <Shield size={20} />, title: 'Scholar Verified',  desc: 'All content reviewed by qualified Islamic scholars for accuracy and authenticity.' },
  { icon: <MapPin  size={20} />, title: 'GPS Precision',    desc: 'Prayer times calculated from your exact GPS coordinates — never miss a prayer.' },
  { icon: <Globe   size={20} />, title: '5 Languages',      desc: 'English, Arabic, French, Spanish and Indonesian — for the global Ummah.' },
  { icon: <Zap     size={20} />, title: 'Always Free',      desc: 'Every tool on Al Ummah AI is 100% free, forever. No subscription, no login.' },
];

/* ── Utils ─────────────────────────────────────────────────── */
function useCountdown(target: string) {
  const [days, setDays] = useState(0);
  useEffect(() => {
    const d = Math.ceil((new Date(target).getTime() - Date.now()) / 86400000);
    setDays(d > 0 ? d : 0);
  }, [target]);
  return days;
}

function Reveal({ children, delay = 0, y = 22 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

/* ── Reusable section badge ───────────────────────────────── */
function SBadge({ t, dark = false }: { t: string; dark?: boolean }) {
  return (
    <span style={{
      display: 'inline-block', padding: '4px 14px', marginBottom: 14,
      background: dark ? 'rgba(212,175,55,0.12)' : 'rgba(212,175,55,0.09)',
      border: `1px solid ${dark ? 'rgba(212,175,55,0.24)' : 'rgba(212,175,55,0.22)'}`,
      borderRadius: 99, fontFamily: "'DM Sans',sans-serif",
      fontSize: '0.59rem', fontWeight: 800, letterSpacing: '0.28em',
      textTransform: 'uppercase' as const,
      color: dark ? '#D4AF37' : '#b8941e',
    }}>{t}</span>
  );
}

/* ── MAIN ─────────────────────────────────────────────────── */
export function Home() {
  const daysToRamadan = useCountdown('2026-02-17');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [phraseVis, setPhraseVis] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setPhraseVis(false);
      setTimeout(() => { setPhraseIdx(i => (i + 1) % PHRASES.length); setPhraseVis(true); }, 380);
    }, 4200);
    return () => clearInterval(iv);
  }, []);

  const phrase = PHRASES[phraseIdx];

  /* Schema.org */
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Al Ummah AI',
    url: 'https://www.alummahai.com',
    description: 'Free Islamic platform for accurate prayer times, Qibla direction, Quran audio, Zakat calculator and daily Islamic guidance.',
    potentialAction: { '@type': 'SearchAction', target: 'https://www.alummahai.com/quran?q={q}', 'query-input': 'required name=q' },
  };

  /* Shared section padding */
  const sp = { padding: 'clamp(60px,8vw,96px) clamp(16px,5vw,48px)' };

  return (
    <div style={{ background: '#ffffff', color: '#0a2540', overflowX: 'hidden' }}>
      <SEO
        title="Prayer Times Near Me Today — Free Islamic Tools | Al Ummah AI"
        description="Accurate GPS prayer times for Fajr, Dhuhr, Asr, Maghrib & Isha. Real-time Qibla finder, full Quran with audio, Zakat calculator and Ramadan 2026 guide. Free for 1.8 billion Muslims."
        keywords="prayer times near me, fajr time today, qibla finder, quran with audio, zakat calculator 2026, ramadan 2026, islamic platform free"
        canonical="https://www.alummahai.com"
        schema={schema}
      />

      {/* ════════════════════════════
          HERO
      ════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(165deg,#0a2540 0%,#0d2e4d 52%,#071a2e 100%)',
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(100px,13vh,150px) clamp(16px,5vw,48px) clamp(64px,9vh,100px)',
        position: 'relative', overflow: 'hidden',
      }}>

        {/* Grid dots */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.1) 1px, transparent 1px)', backgroundSize: '38px 38px', opacity: 0.55, pointerEvents: 'none' }} />
        {/* Center glow — breathing animation */}
        <motion.div animate={{ opacity: [0.6, 1, 0.6], scale: [0.97, 1.02, 0.97] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: '48%', left: '50%', transform: 'translate(-50%,-50%)', width: 'min(700px,88vw)', height: 'min(700px,88vw)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        {/* Rings */}
        {[520, 760].map(s => (
          <div key={s} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: `min(${s}px,85vw)`, height: `min(${s}px,85vw)`, borderRadius: '50%', border: '1px solid rgba(212,175,55,0.05)', pointerEvents: 'none' }} />
        ))}
        {/* City dots */}
        {[
          { n: 'London',  t: '22%', l: '44%' },
          { n: 'Riyadh',  t: '36%', l: '57%' },
          { n: 'Jakarta', t: '52%', l: '77%' },
          { n: 'Madrid',  t: '26%', l: '41%' },
          { n: 'Dubai',   t: '37%', l: '60%' },
        ].map(c => (
          <div key={c.n} style={{ position: 'absolute', top: c.t, left: c.l, pointerEvents: 'none', zIndex: 0 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(212,175,55,0.3)', boxShadow: '0 0 7px rgba(212,175,55,0.22)' }} />
            <div style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', fontSize: '0.47rem', fontFamily: "'DM Sans',sans-serif", fontWeight: 700, color: 'rgba(212,175,55,0.28)', whiteSpace: 'nowrap', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{c.n}</div>
          </div>
        ))}

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 740, textAlign: 'center', width: '100%' }}>

          {/* Rotating Arabic phrase */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            style={{ marginBottom: 30, minHeight: 64 }}>
            <div style={{ fontFamily: "'Amiri',serif", fontSize: 'clamp(1.35rem,4.2vw,2.6rem)', color: '#D4AF37', direction: 'rtl', lineHeight: 1.3, opacity: phraseVis ? 1 : 0, transform: phraseVis ? 'translateY(0)' : 'translateY(-6px)', transition: 'all 0.38s cubic-bezier(0.16,1,0.3,1)', textShadow: '0 0 36px rgba(212,175,55,0.2)' }}>
              {phrase.ar}
            </div>
            <div style={{ fontSize: '0.66rem', color: 'rgba(212,175,55,0.44)', letterSpacing: '2px', marginTop: 6, fontStyle: 'italic', opacity: phraseVis ? 1 : 0, transition: 'opacity 0.38s ease 0.1s', fontFamily: "'DM Sans',sans-serif" }}>
              {phrase.en}
            </div>
          </motion.div>

          {/* H1 — SEO optimized */}
          <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, duration: 0.72, ease: [0.16,1,0.3,1] }}
            style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(2.1rem,6.5vw,4.6rem)', color: '#ffffff', lineHeight: 1.06, letterSpacing: '-0.025em', marginBottom: 18 }}>
            Free Islamic Tools —{' '}
            <span style={{ color: '#D4AF37', textShadow: '0 0 26px rgba(212,175,55,0.22)' }}>Prayer Times,</span>
            {' '}Qibla & Quran
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: 'clamp(0.98rem,2.2vw,1.16rem)', color: 'rgba(255,255,255,0.5)', maxWidth: 480, margin: '0 auto 38px', lineHeight: 1.8 }}>
            The complete Islamic platform — accurate, intelligent and free for 1.8 billion Muslims worldwide.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 44 }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#D4AF37', color: '#0a2540', padding: '14px 28px', borderRadius: 12, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', boxShadow: '0 8px 28px rgba(212,175,55,0.34)', transition: 'all 0.22s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(212,175,55,0.42)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(212,175,55,0.34)'; }}>
              <MapPin size={16} /> Use my location
            </Link>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: '#ffffff', padding: '14px 28px', borderRadius: 12, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', transition: 'all 0.22s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'; e.currentTarget.style.color = '#D4AF37'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#ffffff'; }}>
              <Search size={15} /> Search city
            </Link>
          </motion.div>

          {/* Product preview */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 }}
            style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 44 }}>
            {[
              { emoji: '🕐', label: 'Prayer Times', sub: 'Live · GPS' },
              { emoji: '🧭', label: 'Qibla',        sub: 'Real-time' },
              { emoji: '📖', label: 'Quran Audio',  sub: '114 Surahs' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 11, padding: '10px 15px', backdropFilter: 'blur(10px)' }}>
                <span style={{ fontSize: '1.15rem' }}>{item.emoji}</span>
                <div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.79rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>{item.label}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.58rem', color: 'rgba(212,175,55,0.65)', fontWeight: 700, letterSpacing: '0.1em', marginTop: 1 }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.68 }}
            style={{ display: 'flex', gap: 'clamp(18px,4vw,44px)', flexWrap: 'wrap', justifyContent: 'center', paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {[['1.8B+','Muslims'],['150+','Cities'],['5','Languages'],['100%','Free']].map(([n,l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.45rem,3vw,1.85rem)', color: '#D4AF37', lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '0.6rem', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.18em', marginTop: 5 }}>{l}</div>
              </div>
            ))}
          </motion.div>

          {/* Ramadan pill — in progress or countdown */}
          {(() => {
            const now = Date.now();
            const start = new Date('2026-02-17').getTime();
            const end   = new Date('2026-03-19').getTime();
            const inRamadan = now >= start && now < end;
            const daysLeft  = Math.max(Math.ceil((end - now) / 86400000), 0);
            if (!inRamadan && daysToRamadan === 0) return null;
            return (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.82 }} style={{ marginTop: 26 }}>
                <Link to="/ramadan" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '8px 18px', borderRadius: 99, border: `1px solid ${inRamadan ? 'rgba(34,197,94,0.35)' : 'rgba(212,175,55,0.24)'}`, background: inRamadan ? 'rgba(34,197,94,0.08)' : 'rgba(212,175,55,0.08)', color: inRamadan ? '#22c55e' : '#D4AF37', fontFamily: "'DM Sans',sans-serif", fontSize: '0.77rem', fontWeight: 700, textDecoration: 'none', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = inRamadan ? 'rgba(34,197,94,0.14)' : 'rgba(212,175,55,0.14)')}
                  onMouseLeave={e => (e.currentTarget.style.background = inRamadan ? 'rgba(34,197,94,0.08)' : 'rgba(212,175,55,0.08)')}>
                  {inRamadan ? (
                    <>
                      <motion.span animate={{ scale:[1,1.5,1], opacity:[0.5,1,0.5] }} transition={{ duration: 1.6, repeat: Infinity }} style={{ width:7, height:7, borderRadius:'50%', background:'#22c55e', display:'inline-block', boxShadow:'0 0 8px rgba(34,197,94,0.6)' }} />
                      🌙 Ramadan 2026 — {daysLeft} days remaining →
                    </>
                  ) : (
                    <>🌙 {daysToRamadan} days until Ramadan 2026 →</>
                  )}
                </Link>
              </motion.div>
            );
          })()}
        </div>
      </section>

      {/* ════════════════════════════
          TRUST BAR
      ════════════════════════════ */}
      <div style={{ background: '#f7f8fa', borderBottom: '1px solid rgba(10,37,64,0.07)', padding: '13px clamp(16px,5vw,48px)', overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', maxWidth: 920, margin: '0 auto' }}>
          {[
            { icon: '📍', text: 'GPS-accurate prayer times' },
            { icon: '🧭', text: 'Real-time Qibla direction' },
            { icon: '📖', text: 'Quran with audio' },
            { icon: '🛡️', text: 'Scholar verified' },
          ].map(({ icon, text }, i, arr) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '4px clamp(10px,2.5vw,22px)', borderRight: i < arr.length - 1 ? '1px solid rgba(10,37,64,0.07)' : 'none', whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: '0.86rem' }}>{icon}</span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 'clamp(0.69rem,1.5vw,0.76rem)', color: 'rgba(10,37,64,0.56)' }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════
          PRAYER TIMES
      ════════════════════════════ */}
      <section style={{ maxWidth: 1100, margin: '0 auto', ...sp }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <SBadge t="✦ Live · GPS Accurate" />
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.85rem,4.5vw,3.1rem)', color: '#0a2540', marginBottom: 11, letterSpacing: '-0.015em', display: 'block' }}>
              Prayer Times Near You
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.5)', maxWidth: 380, margin: '0 auto', lineHeight: 1.8, fontSize: 'clamp(0.88rem,2vw,0.98rem)' }}>
              Auto-detected from your GPS. Search any city worldwide.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08}><PrayerWidget /></Reveal>
      </section>

      {/* ════════════════════════════
          FOUR CORE TOOLS
      ════════════════════════════ */}
      <section style={{ background: 'linear-gradient(160deg,#0a2540 0%,#071a2e 100%)', ...sp }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 50 }}>
              <SBadge t="✦ Sacred Tools" dark />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.85rem,4.5vw,3.1rem)', color: '#ffffff', letterSpacing: '-0.015em', display: 'block' }}>
                Everything You Need
              </h2>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(215px,1fr))', gap: 14, marginBottom: 12 }}>
            {CORE_TOOLS.map((tool, i) => (
              <Reveal key={tool.label} delay={i * 0.07}>
                <Link to={tool.link} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '24px 20px', height: '100%', position: 'relative', transition: 'all 0.28s cubic-bezier(0.16,1,0.3,1)' }}
                    onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = 'rgba(212,175,55,0.35)'; t.style.background = 'rgba(255,255,255,0.07)'; t.style.transform = 'translateY(-4px)'; }}
                    onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = 'rgba(255,255,255,0.08)'; t.style.background = 'rgba(255,255,255,0.04)'; t.style.transform = 'translateY(0)'; }}>
                    <span style={{ position: 'absolute', top: 15, right: 15, fontSize: '0.52rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#D4AF37', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.2)', padding: '2px 7px', borderRadius: 99, fontFamily: "'DM Sans',sans-serif" }}>{tool.badge}</span>
                    <div style={{ fontSize: '2rem', marginBottom: 14 }}>{tool.emoji}</div>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: '1.08rem', color: '#ffffff', marginBottom: 7 }}>{tool.label}</h3>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', lineHeight: 1.65 }}>{tool.desc}</p>
                    <div style={{ marginTop: 18, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.66rem', color: 'rgba(212,175,55,0.55)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: 3 }}>
                      Open <ChevronRight size={10} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Secondary row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 9 }}>
            {[{ l:'Hajj Guide',link:'/hajj',e:'🕋' },{ l:'Ramadan',link:'/ramadan',e:'🌙' },{ l:'Scholar AI',link:'/scholar',e:'✨' },{ l:'Store',link:'/store',e:'🛍️' }].map(({ l, link, e }) => (
              <Link key={l} to={link} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 11, padding: '12px 14px', textDecoration: 'none', fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '0.81rem', color: 'rgba(255,255,255,0.46)', transition: 'all 0.2s' }}
                onMouseEnter={e2 => { e2.currentTarget.style.borderColor = 'rgba(212,175,55,0.28)'; e2.currentTarget.style.color = '#D4AF37'; }}
                onMouseLeave={e2 => { e2.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e2.currentTarget.style.color = 'rgba(255,255,255,0.46)'; }}>
                <span style={{ fontSize: '1.05rem' }}>{e}</span> {l}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          SEO CONTENT — 500+ words
      ════════════════════════════ */}
      <section style={{ background: '#f7f8fa', borderTop: '1px solid rgba(10,37,64,0.06)', ...sp }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 56, alignItems: 'start' }}>

              {/* Left: what we offer */}
              <div>
                <SBadge t="✦ What We Offer" />
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.7rem,3.5vw,2.6rem)', color: '#0a2540', marginBottom: 18, letterSpacing: '-0.015em', lineHeight: 1.15 }}>
                  Your Complete Islamic Companion
                </h2>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.6)', lineHeight: 1.85, fontSize: '0.97rem', marginBottom: 20 }}>
                  Al Ummah AI brings together the essential Islamic tools every Muslim needs in their daily life — all in one clean, fast and free platform available in 5 languages.
                </p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.6)', lineHeight: 1.85, fontSize: '0.97rem', marginBottom: 20 }}>
                  Our <strong style={{ fontWeight: 700, color: '#0a2540' }}>prayer times</strong> use your exact GPS coordinates to calculate accurate Fajr, Dhuhr, Asr, Maghrib and Isha times for any city worldwide. No approximations — real calculation from your position.
                </p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.6)', lineHeight: 1.85, fontSize: '0.97rem', marginBottom: 24 }}>
                  The <strong style={{ fontWeight: 700, color: '#0a2540' }}>Qibla Finder</strong> uses your device compass and GPS to point precisely toward the Holy Kaaba in Mecca. The <strong style={{ fontWeight: 700, color: '#0a2540' }}>Quran</strong> is available with full audio recitations, multiple translations and verse-by-verse search. Our <strong style={{ fontWeight: 700, color: '#0a2540' }}>Zakat Calculator</strong> uses the latest 2026 Nisab thresholds to help you calculate your annual obligation correctly.
                </p>

                {/* Benefit list */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    'GPS prayer times for 150+ countries and any city worldwide',
                    'Real-time Qibla compass with live device orientation',
                    'Full Quran in Arabic with audio recitations and translations',
                    'Zakat calculator updated for 2026 gold & silver Nisab rates',
                    'Complete Ramadan 2026 guide with prayer timetable',
                    'Daily duas for morning, evening and all occasions',
                    'Islamic articles, history and practical life guides',
                    'Scholar AI — ask any Islamic question in your language',
                  ].map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <span style={{ color: '#D4AF37', fontSize: '0.8rem', marginTop: 2, flexShrink: 0 }}>✦</span>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.88rem', color: 'rgba(10,37,64,0.65)', lineHeight: 1.6 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: why section */}
              <div>
                <SBadge t="✦ Why Al Ummah AI" />
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.7rem,3.5vw,2.6rem)', color: '#0a2540', marginBottom: 18, letterSpacing: '-0.015em', lineHeight: 1.15 }}>
                  Built for the Global Ummah
                </h2>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.6)', lineHeight: 1.85, fontSize: '0.97rem', marginBottom: 28 }}>
                  Unlike generic prayer apps, Al Ummah AI is designed as a full spiritual platform — combining modern technology with verified Islamic knowledge to serve Muslims in every corner of the world.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
                  {WHY.map((item, i) => (
                    <Reveal key={item.title} delay={i * 0.07}>
                      <div style={{ background: '#ffffff', border: '1px solid rgba(10,37,64,0.08)', borderRadius: 14, padding: '18px 16px', transition: 'all 0.24s cubic-bezier(0.16,1,0.3,1)' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(212,175,55,0.08)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,37,64,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}>
                        <div style={{ color: '#D4AF37', marginBottom: 10 }}>{item.icon}</div>
                        <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: '0.95rem', color: '#0a2540', marginBottom: 6 }}>{item.title}</h3>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.78rem', color: 'rgba(10,37,64,0.5)', lineHeight: 1.65 }}>{item.desc}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <div style={{ marginTop: 28, padding: '20px 22px', background: 'linear-gradient(120deg,#0a2540 0%,#0d2e4d 100%)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: '1rem', color: '#ffffff', marginBottom: 4 }}>Start using Al Ummah AI now</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.78rem', color: 'rgba(255,255,255,0.42)' }}>Free forever · No signup required</div>
                  </div>
                  <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#D4AF37', color: '#0a2540', padding: '10px 18px', borderRadius: 9, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.72rem', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    Get Started <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════
          GUIDANCE
      ════════════════════════════ */}
      <section style={{ maxWidth: 1100, margin: '0 auto', ...sp }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <SBadge t="✦ Daily Guidance" />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.75rem,4vw,2.9rem)', color: '#0a2540', marginBottom: 7, letterSpacing: '-0.015em', display: 'block' }}>
                Learn & Grow Daily
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.5)', lineHeight: 1.78, maxWidth: 360, fontSize: 'clamp(0.87rem,2vw,0.96rem)' }}>
                Ramadan guides, daily duas, Islamic articles and AI-powered scholar.
              </p>
            </div>
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid rgba(212,175,55,0.32)', color: '#b8941e', padding: '9px 18px', borderRadius: 99, textDecoration: 'none', fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.71rem', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.07)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              All Articles <ArrowRight size={12} />
            </Link>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(215px,1fr))', gap: 13, marginBottom: 26 }}>
          {GUIDANCE.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.07}>
              <Link to={item.href} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                <div style={{ background: '#ffffff', border: '1px solid rgba(10,37,64,0.09)', borderRadius: 16, padding: '22px 18px', height: '100%', transition: 'all 0.26s cubic-bezier(0.16,1,0.3,1)' }}
                  onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = 'rgba(212,175,55,0.35)'; t.style.boxShadow = '0 7px 28px rgba(212,175,55,0.08)'; t.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = 'rgba(10,37,64,0.09)'; t.style.boxShadow = 'none'; t.style.transform = 'translateY(0)'; }}>
                  <div style={{ fontSize: '1.85rem', marginBottom: 12 }}>{item.emoji}</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: '1rem', color: '#0a2540', marginBottom: 5 }}>{item.label}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.46)', fontSize: '0.82rem', lineHeight: 1.65 }}>{item.desc}</p>
                  <div style={{ marginTop: 15, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.65rem', color: 'rgba(212,175,55,0.6)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Explore →</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Topic pills */}
        <Reveal delay={0.1}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 30 }}>
            {PILLS.map(([label, link]) => (
              <Link key={label} to={link} style={{ padding: '7px 14px', background: 'rgba(10,37,64,0.04)', border: '1px solid rgba(10,37,64,0.09)', borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '0.75rem', color: 'rgba(10,37,64,0.56)', textDecoration: 'none', transition: 'all 0.18s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.36)'; e.currentTarget.style.color = '#b8941e'; e.currentTarget.style.background = 'rgba(212,175,55,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,37,64,0.09)'; e.currentTarget.style.color = 'rgba(10,37,64,0.56)'; e.currentTarget.style.background = 'rgba(10,37,64,0.04)'; }}>
                {label}
              </Link>
            ))}
          </div>
        </Reveal>

        {/* Scholar AI banner */}
        <Reveal>
          <Link to="/scholar" style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{ background: 'linear-gradient(120deg,#0a2540 0%,#0d2e4d 100%)', borderRadius: 18, padding: 'clamp(24px,3.5vw,36px) clamp(20px,3.5vw,36px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.24s cubic-bezier(0.16,1,0.3,1)' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              <div>
                <div style={{ fontSize: '1.9rem', marginBottom: 9 }}>✨</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 'clamp(1.15rem,3vw,1.55rem)', color: '#ffffff', marginBottom: 5 }}>Ask Scholar AI</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.42)', fontSize: '0.88rem', maxWidth: 370, lineHeight: 1.78 }}>
                  Ask any Islamic question — answers grounded in Quran and Sunnah, in your language.
                </p>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#D4AF37', color: '#0a2540', padding: '12px 22px', borderRadius: 11, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap', boxShadow: '0 5px 20px rgba(212,175,55,0.26)', flexShrink: 0 }}>
                Ask a Question <ArrowRight size={13} />
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* ════════════════════════════
          SHOP PREVIEW
      ════════════════════════════ */}
      <section style={{ background: '#f7f8fa', borderTop: '1px solid rgba(10,37,64,0.06)', ...sp }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 38, flexWrap: 'wrap', gap: 14 }}>
              <div>
                <SBadge t="✦ Islamic Store" />
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.75rem,4vw,2.9rem)', color: '#0a2540', marginBottom: 5, letterSpacing: '-0.015em', display: 'block' }}>
                  Islamic Essentials
                </h2>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.5)', fontSize: 'clamp(0.87rem,2vw,0.96rem)' }}>
                  Handpicked products for your spiritual life.
                </p>
              </div>
              <Link to="/store" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#D4AF37', color: '#0a2540', padding: '10px 20px', borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.71rem', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em', boxShadow: '0 4px 16px rgba(212,175,55,0.2)', transition: 'transform 0.18s', whiteSpace: 'nowrap', flexShrink: 0 }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                Visit Shop <ArrowRight size={12} />
              </Link>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(195px,1fr))', gap: 13 }}>
            {SHOP.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.06}>
                <Link to="/store" style={{ display: 'block', textDecoration: 'none' }}>
                  <div style={{ background: '#ffffff', border: '1px solid rgba(10,37,64,0.08)', borderRadius: 15, padding: '28px 16px', textAlign: 'center', transition: 'all 0.26s cubic-bezier(0.16,1,0.3,1)' }}
                    onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = 'rgba(212,175,55,0.35)'; t.style.boxShadow = '0 7px 24px rgba(212,175,55,0.08)'; t.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = 'rgba(10,37,64,0.08)'; t.style.boxShadow = 'none'; t.style.transform = 'translateY(0)'; }}>
                    <div style={{ fontSize: '2.4rem', marginBottom: 11 }}>{item.emoji}</div>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, color: '#0a2540', fontSize: '0.93rem', marginBottom: 4 }}>{item.label}</h3>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.36)', fontSize: '0.74rem' }}>{item.desc}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          FINAL CTA
      ════════════════════════════ */}
      <section style={{ background: 'linear-gradient(160deg,#0a2540 0%,#071a2e 100%)', ...sp, textAlign: 'center' }}>
        <Reveal>
          <div style={{ maxWidth: 580, margin: '0 auto' }}>
            <div style={{ fontSize: '2.8rem', marginBottom: 18 }}>🌙</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.9rem,5vw,3.6rem)', color: '#ffffff', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: 14 }}>
              Start your spiritual journey <span style={{ color: '#D4AF37' }}>today</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.44)', fontSize: 'clamp(0.94rem,2.2vw,1.06rem)', maxWidth: 400, margin: '0 auto 36px', lineHeight: 1.8 }}>
              Prayer times, Quran, Qibla, Zakat — everything you need, free forever.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/quran" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#D4AF37', color: '#0a2540', padding: '13px 26px', borderRadius: 11, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', boxShadow: '0 7px 26px rgba(212,175,55,0.3)', transition: 'all 0.22s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 11px 32px rgba(212,175,55,0.38)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 7px 26px rgba(212,175,55,0.3)'; }}>
                <BookOpen size={15} /> Read Quran
              </Link>
              <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)', color: '#ffffff', padding: '13px 26px', borderRadius: 11, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', transition: 'all 0.22s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)'; e.currentTarget.style.color = '#D4AF37'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)'; e.currentTarget.style.color = '#ffffff'; }}>
                Explore Articles
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
