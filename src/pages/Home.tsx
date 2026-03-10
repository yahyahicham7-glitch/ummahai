import React, { useEffect, useState, useRef } from 'react';
import { PrayerWidget } from '@/src/components/PrayerWidget';
import { SEO } from '@/src/components/SEO';
import { BookOpen, MapPin, Calculator, ArrowRight, Globe, Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';

/* ══════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════ */
const PHRASES = [
  { ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', en: 'In the name of Allah, the Most Gracious' },
  { ar: 'اللَّهُ أَكْبَرُ',                        en: 'Allah is the Greatest' },
  { ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',          en: 'Glory be to Allah and praise Him' },
  { ar: 'لَا إِلَٰهَ إِلَّا اللَّهُ',             en: 'There is no god but Allah' },
];

const CORE_TOOLS = [
  { emoji: '🕐', label: 'Prayer Times',     desc: 'GPS-accurate times for all 5 daily prayers — any city worldwide.',       link: '/',       badge: 'Live' },
  { emoji: '🧭', label: 'Qibla Finder',     desc: 'Real-time direction to Mecca calculated from your exact coordinates.',   link: '/qibla',  badge: 'GPS' },
  { emoji: '📖', label: 'Quran',            desc: 'Complete Quran with audio recitations, translations and verse search.',  link: '/quran',  badge: 'Audio' },
  { emoji: '💛', label: 'Zakat Calculator', desc: 'Accurate Zakat calculation based on current 2026 Nisab rates.',          link: '/zakat',  badge: '2026' },
];

const GUIDANCE_ITEMS = [
  { emoji: '🌙', label: 'Ramadan 2026',  href: '/ramadan',                          desc: 'Complete prayer timetable and spiritual guide' },
  { emoji: '🤲', label: 'Daily Duas',    href: '/blog/morning-evening-adhkar',      desc: 'Morning, evening and essential supplications' },
  { emoji: '✍️', label: 'Articles',      href: '/blog',                             desc: 'Islamic knowledge, history and practical guides' },
  { emoji: '✨', label: 'Scholar AI',    href: '/scholar',                          desc: 'Ask any Islamic question — Quran & Sunnah based' },
];

const SHOP_ITEMS = [
  { emoji: '🕌', label: 'Prayer Mats',        desc: 'Premium quality' },
  { emoji: '📿', label: 'Tasbih',             desc: 'Hand-crafted' },
  { emoji: '📖', label: 'Qurans',             desc: 'Various editions' },
  { emoji: '🌙', label: 'Ramadan Essentials', desc: 'Complete sets' },
];

const TOPIC_PILLS = [
  ['Ramadan 2026',    '/blog/ramadan-2026-prayer-timetable'],
  ['Fajr Time',       '/blog/fajr-time-today'],
  ['Zakat Guide',     '/blog/calculate-zakat-2026'],
  ['Hajj 2026',       '/blog/hajj-packages-uk-2026'],
  ['Surah Al-Kahf',   '/blog/surah-al-kahf-friday'],
  ['How to Pray',     '/blog/how-to-pray-salah-beginners'],
  ['Islamic History', '/blog/islamic-history-golden-age'],
  ['Halal Investing', '/blog/best-halal-investment-apps-2026'],
];

/* ══════════════════════════════════════════
   SMALL UTILITIES
══════════════════════════════════════════ */
function useCountdown(target: string) {
  const [days, setDays] = useState(0);
  useEffect(() => {
    const d = Math.ceil((new Date(target).getTime() - Date.now()) / 86_400_000);
    setDays(d > 0 ? d : 0);
  }, [target]);
  return days;
}

/* Fade-in on scroll */
function Reveal({ children, delay = 0, y = 20 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

/* Section label */
function SectionBadge({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div style={{
      display: 'inline-block',
      padding: '4px 14px',
      background: dark ? 'rgba(212,175,55,0.12)' : 'rgba(212,175,55,0.1)',
      border: `1px solid ${dark ? 'rgba(212,175,55,0.22)' : 'rgba(212,175,55,0.22)'}`,
      borderRadius: 99,
      fontSize: '0.6rem', fontWeight: 800,
      color: dark ? '#D4AF37' : '#b8941e',
      letterSpacing: '0.28em', textTransform: 'uppercase' as const,
      marginBottom: 14,
    }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export function Home() {
  const daysToRamadan = useCountdown('2026-02-17');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [phraseVisible, setPhraseVisible] = useState(true);

  /* Rotate phrases */
  useEffect(() => {
    const iv = setInterval(() => {
      setPhraseVisible(false);
      setTimeout(() => {
        setPhraseIdx(i => (i + 1) % PHRASES.length);
        setPhraseVisible(true);
      }, 380);
    }, 4200);
    return () => clearInterval(iv);
  }, []);

  const phrase = PHRASES[phraseIdx];

  /* Schema markup */
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Al Ummah AI',
    url: 'https://www.alummahai.com',
    description: 'Islamic platform for Prayer Times, Qibla, Quran and daily spiritual guidance.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.alummahai.com/quran?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div style={{ background: '#ffffff', color: '#0a2540', overflowX: 'hidden' }}>
      <SEO
        title="Prayer Times Near Me Today — Qibla, Quran & Daily Islamic Guidance"
        description="Accurate GPS prayer times for Fajr, Dhuhr, Asr, Maghrib & Isha. Real-time Qibla finder, full Quran with audio, Zakat calculator and Ramadan 2026 guide. Free for 1.8 billion Muslims."
        keywords="prayer times near me, fajr time today, qibla finder, quran audio, zakat calculator, ramadan 2026, islamic platform"
        canonical="https://www.alummahai.com"
        schema={schema}
      />

      {/* ╔══════════════════════════════════════
          HERO — La pieza más importante
      ══════════════════════════════════════╗ */}
      <section style={{
        background: 'linear-gradient(165deg, #0a2540 0%, #0d2e4d 55%, #071a2e 100%)',
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(100px,14vh,160px) clamp(16px,5vw,48px) clamp(60px,8vh,100px)',
        position: 'relative', overflow: 'hidden',
      }}>

        {/* Dot texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.1) 1px, transparent 1px)',
          backgroundSize: '36px 36px', opacity: 0.7,
        }} />

        {/* Center glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(800px, 90vw)', height: 'min(800px, 90vw)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Decorative ring */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(600px, 85vw)', height: 'min(600px, 85vw)',
          borderRadius: '50%', border: '1px solid rgba(212,175,55,0.06)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(900px, 95vw)', height: 'min(900px, 95vw)',
          borderRadius: '50%', border: '1px solid rgba(212,175,55,0.04)',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 760, textAlign: 'center', width: '100%' }}>

          {/* Arabic phrase — rotating */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.6 }}
            style={{ marginBottom: 32, minHeight: 68 }}>
            <div style={{
              fontFamily: "'Amiri', serif",
              fontSize: 'clamp(1.4rem, 4.5vw, 2.8rem)',
              color: '#D4AF37',
              direction: 'rtl',
              lineHeight: 1.3,
              opacity: phraseVisible ? 1 : 0,
              transform: phraseVisible ? 'translateY(0)' : 'translateY(-6px)',
              transition: 'all 0.38s cubic-bezier(0.16,1,0.3,1)',
              textShadow: '0 0 40px rgba(212,175,55,0.25)',
            }}>
              {phrase.ar}
            </div>
            <div style={{
              fontSize: '0.67rem', color: 'rgba(212,175,55,0.48)',
              letterSpacing: '2px', marginTop: 7, fontStyle: 'italic',
              opacity: phraseVisible ? 1 : 0,
              transition: 'opacity 0.38s ease 0.1s',
            }}>
              {phrase.en}
            </div>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 'clamp(2.2rem, 6.5vw, 5rem)',
              color: '#ffffff',
              lineHeight: 1.06,
              letterSpacing: '-0.025em',
              marginBottom: 20,
            }}>
            Prayer Times, Qibla,{' '}
            <span style={{ color: '#D4AF37', textShadow: '0 0 30px rgba(212,175,55,0.2)' }}>Quran</span>
            <br />and Daily Guidance
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
              color: 'rgba(255,255,255,0.5)',
              maxWidth: 500, margin: '0 auto 40px',
              lineHeight: 1.78,
            }}>
            The complete Islamic platform — accurate, intelligent and free for 1.8 billion Muslims worldwide.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.6 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 52 }}>
            <Link to="/"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                background: '#D4AF37', color: '#0a2540',
                padding: '14px 28px', borderRadius: 12,
                fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.12em',
                textDecoration: 'none',
                boxShadow: '0 8px 32px rgba(212,175,55,0.35)',
                transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(212,175,55,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(212,175,55,0.35)'; }}>
              <MapPin size={16} /> Use my location
            </Link>
            <Link to="/"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)',
                color: '#ffffff',
                padding: '14px 28px', borderRadius: 12,
                fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.12em',
                textDecoration: 'none',
                transition: 'all 0.22s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'; e.currentTarget.style.color = '#D4AF37'; e.currentTarget.style.background = 'rgba(212,175,55,0.07)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}>
              <Search size={15} /> Search city
            </Link>
          </motion.div>

          {/* Product preview pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
            {[
              { emoji: '🕐', label: 'Prayer Times', sub: 'Live · GPS' },
              { emoji: '🧭', label: 'Qibla',        sub: 'Real-time' },
              { emoji: '📖', label: 'Quran Audio',  sub: '114 Surahs' },
            ].map(item => (
              <div key={item.label} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12, padding: '10px 16px',
                backdropFilter: 'blur(10px)',
              }}>
                <span style={{ fontSize: '1.2rem' }}>{item.emoji}</span>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>{item.label}</div>
                  <div style={{ fontSize: '0.6rem', color: 'rgba(212,175,55,0.65)', fontWeight: 700, letterSpacing: '0.1em', marginTop: 1 }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            style={{
              display: 'flex', gap: 'clamp(20px,4vw,44px)', flexWrap: 'wrap', justifyContent: 'center',
              paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.07)',
            }}>
            {[['1.8B+', 'Muslims'], ['150+', 'Cities'], ['5', 'Languages'], ['100%', 'Free']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.5rem,3vw,1.9rem)', color: '#D4AF37', lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '0.62rem', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.18em', marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </motion.div>

          {/* Ramadan pill */}
          {daysToRamadan > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }} style={{ marginTop: 28 }}>
              <Link to="/ramadan" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '9px 20px', borderRadius: 99,
                border: '1px solid rgba(212,175,55,0.26)', background: 'rgba(212,175,55,0.08)',
                color: '#D4AF37', fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.14)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.08)')}>
                🌙 {daysToRamadan} days until Ramadan 2026
                <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.68rem' }}>Prepare →</span>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* ╔══════════════════════════════════════
          TRUST BAR
      ══════════════════════════════════════╗ */}
      <div style={{
        background: '#f7f8fa',
        borderBottom: '1px solid rgba(10,37,64,0.07)',
        padding: '15px clamp(16px,5vw,48px)',
        overflowX: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, flexWrap: 'wrap', maxWidth: 960, margin: '0 auto' }}>
          {[
            { icon: '📍', text: 'Accurate prayer times by GPS' },
            { icon: '🧭', text: 'Real-time Qibla direction' },
            { icon: '📖', text: 'Quran with audio & translations' },
            { icon: '🛡️', text: 'Verified by scholars' },
          ].map(({ icon, text }, i, arr) => (
            <div key={text} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: 'clamp(4px,1vw,6px) clamp(12px,2.5vw,24px)',
              borderRight: i < arr.length - 1 ? '1px solid rgba(10,37,64,0.08)' : 'none',
              whiteSpace: 'nowrap',
            }}>
              <span style={{ fontSize: '0.9rem' }}>{icon}</span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 'clamp(0.68rem,1.5vw,0.76rem)', color: 'rgba(10,37,64,0.55)' }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ╔══════════════════════════════════════
          PRAYER TIMES
      ══════════════════════════════════════╗ */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(60px,8vw,100px) clamp(16px,5vw,48px)' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionBadge>✦ Live · GPS Accurate</SectionBadge>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.9rem,4.5vw,3.2rem)', color: '#0a2540', marginBottom: 12, letterSpacing: '-0.015em' }}>
              Prayer Times Near You
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.5)', maxWidth: 420, margin: '0 auto', lineHeight: 1.78, fontSize: 'clamp(0.9rem,2vw,1rem)' }}>
              Auto-detected from your GPS location. Search any city worldwide.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <PrayerWidget />
        </Reveal>
      </section>

      {/* ╔══════════════════════════════════════
          FOUR CORE TOOLS
      ══════════════════════════════════════╗ */}
      <section style={{ background: 'linear-gradient(160deg, #0a2540 0%, #071a2e 100%)', padding: 'clamp(60px,8vw,100px) clamp(16px,5vw,48px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <SectionBadge dark>✦ Sacred Tools</SectionBadge>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.9rem,4.5vw,3.2rem)', color: '#ffffff', letterSpacing: '-0.015em' }}>
                Everything You Need
              </h2>
            </div>
          </Reveal>

          {/* 4 tool cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 16 }}>
            {CORE_TOOLS.map((tool, i) => (
              <Reveal key={tool.label} delay={i * 0.07}>
                <Link to={tool.link} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 18, padding: '28px 24px', height: '100%',
                    position: 'relative', overflow: 'hidden',
                    transition: 'all 0.28s cubic-bezier(0.16,1,0.3,1)',
                  }}
                    onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = 'rgba(212,175,55,0.35)'; t.style.background = 'rgba(255,255,255,0.07)'; t.style.transform = 'translateY(-4px)'; }}
                    onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = 'rgba(255,255,255,0.08)'; t.style.background = 'rgba(255,255,255,0.04)'; t.style.transform = 'translateY(0)'; }}>

                    {/* Badge */}
                    <span style={{ position: 'absolute', top: 18, right: 18, fontSize: '0.55rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#D4AF37', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.2)', padding: '3px 8px', borderRadius: 99 }}>
                      {tool.badge}
                    </span>

                    <div style={{ fontSize: '2.2rem', marginBottom: 18 }}>{tool.emoji}</div>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: '1.12rem', color: '#ffffff', marginBottom: 8 }}>{tool.label}</h3>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.4)', fontSize: '0.84rem', lineHeight: 1.65 }}>{tool.desc}</p>
                    <div style={{ marginTop: 22, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.68rem', color: 'rgba(212,175,55,0.55)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: 4 }}>
                      Open <ChevronRight size={11} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Secondary tools */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
            {[
              { label: 'Hajj Guide',    link: '/hajj',    emoji: '🕋' },
              { label: 'Ramadan',       link: '/ramadan', emoji: '🌙' },
              { label: 'Scholar AI',    link: '/scholar', emoji: '✨' },
              { label: 'Islamic Store', link: '/store',   emoji: '🛍️' },
            ].map(({ label, link, emoji }) => (
              <Link key={label} to={link} style={{
                display: 'flex', alignItems: 'center', gap: 9,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12, padding: '13px 16px', textDecoration: 'none',
                fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '0.82rem',
                color: 'rgba(255,255,255,0.48)', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.28)'; e.currentTarget.style.color = '#D4AF37'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.48)'; }}>
                <span style={{ fontSize: '1.1rem' }}>{emoji}</span> {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════
          LEARNING / DAILY GUIDANCE
      ══════════════════════════════════════╗ */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(60px,8vw,100px) clamp(16px,5vw,48px)' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <SectionBadge>✦ Islamic Knowledge</SectionBadge>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,3rem)', color: '#0a2540', marginBottom: 8, letterSpacing: '-0.015em' }}>
                Guides & Daily Guidance
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.5)', lineHeight: 1.75, maxWidth: 380, fontSize: 'clamp(0.88rem,2vw,0.97rem)' }}>
                Ramadan guides, daily duas, Islamic articles and AI-powered scholar.
              </p>
            </div>
            <Link to="/blog" style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              border: '1px solid rgba(212,175,55,0.35)', color: '#b8941e',
              padding: '9px 18px', borderRadius: 99, textDecoration: 'none',
              fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.72rem',
              textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'all 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              All Articles <ArrowRight size={13} />
            </Link>
          </div>
        </Reveal>

        {/* 4 guidance cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {GUIDANCE_ITEMS.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.07}>
              <Link to={item.href} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                <div style={{
                  background: '#ffffff', border: '1px solid rgba(10,37,64,0.09)',
                  borderRadius: 16, padding: '24px 22px', height: '100%',
                  transition: 'all 0.26s cubic-bezier(0.16,1,0.3,1)',
                }}
                  onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = 'rgba(212,175,55,0.38)'; t.style.boxShadow = '0 8px 32px rgba(212,175,55,0.09)'; t.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = 'rgba(10,37,64,0.09)'; t.style.boxShadow = 'none'; t.style.transform = 'translateY(0)'; }}>
                  <div style={{ fontSize: '2rem', marginBottom: 14 }}>{item.emoji}</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: '1.05rem', color: '#0a2540', marginBottom: 6 }}>{item.label}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.47)', fontSize: '0.84rem', lineHeight: 1.65 }}>{item.desc}</p>
                  <div style={{ marginTop: 18, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.68rem', color: 'rgba(212,175,55,0.65)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Explore →</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Topic pills */}
        <Reveal delay={0.1}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {TOPIC_PILLS.map(([label, link]) => (
              <Link key={label} to={link} style={{
                padding: '7px 14px', background: 'rgba(10,37,64,0.04)',
                border: '1px solid rgba(10,37,64,0.09)', borderRadius: 99,
                fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '0.76rem',
                color: 'rgba(10,37,64,0.55)', textDecoration: 'none', transition: 'all 0.18s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.38)'; e.currentTarget.style.color = '#b8941e'; e.currentTarget.style.background = 'rgba(212,175,55,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,37,64,0.09)'; e.currentTarget.style.color = 'rgba(10,37,64,0.55)'; e.currentTarget.style.background = 'rgba(10,37,64,0.04)'; }}>
                {label}
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ╔══════════════════════════════════════
          SCHOLAR AI BANNER
      ══════════════════════════════════════╗ */}
      <section style={{ padding: '0 clamp(16px,5vw,48px)', marginBottom: 'clamp(60px,8vw,100px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <Link to="/scholar" style={{ display: 'block', textDecoration: 'none' }}>
              <div style={{
                background: 'linear-gradient(120deg, #0a2540 0%, #0d2e4d 100%)',
                borderRadius: 20, padding: 'clamp(28px,4vw,44px) clamp(24px,4vw,44px)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: 24, border: '1px solid rgba(255,255,255,0.06)',
                transition: 'transform 0.24s cubic-bezier(0.16,1,0.3,1)',
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                <div>
                  <div style={{ fontSize: '2.2rem', marginBottom: 10 }}>✨</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 'clamp(1.2rem,3vw,1.6rem)', color: '#ffffff', marginBottom: 6 }}>
                    Ask Scholar AI
                  </h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.42)', fontSize: '0.92rem', maxWidth: 400, lineHeight: 1.75 }}>
                    Ask any Islamic question — answers grounded in Quran and Sunnah, in your language.
                  </p>
                </div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  background: '#D4AF37', color: '#0a2540',
                  padding: '13px 24px', borderRadius: 12,
                  fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.8rem',
                  textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap',
                  boxShadow: '0 6px 24px rgba(212,175,55,0.28)',
                }}>
                  Ask a Question <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ╔══════════════════════════════════════
          SHOP PREVIEW — Discrete
      ══════════════════════════════════════╗ */}
      <section style={{ background: '#f7f8fa', borderTop: '1px solid rgba(10,37,64,0.06)', borderBottom: '1px solid rgba(10,37,64,0.06)', padding: 'clamp(60px,8vw,100px) clamp(16px,5vw,48px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <SectionBadge>✦ Islamic Store</SectionBadge>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,3rem)', color: '#0a2540', marginBottom: 6, letterSpacing: '-0.015em' }}>
                  Islamic Essentials
                </h2>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.5)', fontSize: 'clamp(0.88rem,2vw,0.97rem)' }}>
                  Handpicked products for your spiritual life.
                </p>
              </div>
              <Link to="/store" style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: '#D4AF37', color: '#0a2540',
                padding: '10px 20px', borderRadius: 99,
                fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.72rem',
                textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em',
                boxShadow: '0 5px 20px rgba(212,175,55,0.2)', transition: 'transform 0.18s',
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                Visit Shop <ArrowRight size={13} />
              </Link>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            {SHOP_ITEMS.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.06}>
                <Link to="/store" style={{ display: 'block', textDecoration: 'none' }}>
                  <div style={{
                    background: '#ffffff', border: '1px solid rgba(10,37,64,0.08)',
                    borderRadius: 16, padding: '32px 18px', textAlign: 'center',
                    transition: 'all 0.26s cubic-bezier(0.16,1,0.3,1)',
                  }}
                    onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = 'rgba(212,175,55,0.38)'; t.style.boxShadow = '0 8px 28px rgba(212,175,55,0.09)'; t.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = 'rgba(10,37,64,0.08)'; t.style.boxShadow = 'none'; t.style.transform = 'translateY(0)'; }}>
                    <div style={{ fontSize: '2.6rem', marginBottom: 12 }}>{item.emoji}</div>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, color: '#0a2540', fontSize: '0.96rem', marginBottom: 4 }}>{item.label}</h3>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.38)', fontSize: '0.76rem' }}>{item.desc}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════
          WHY AL UMMAH AI
      ══════════════════════════════════════╗ */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(60px,8vw,100px) clamp(16px,5vw,48px)' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.9rem,4.5vw,3.2rem)', color: '#0a2540', marginBottom: 10, letterSpacing: '-0.015em' }}>
              Why Al Ummah AI?
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.5)', maxWidth: 400, margin: '0 auto', lineHeight: 1.78, fontSize: 'clamp(0.9rem,2vw,1rem)' }}>
              Tradition meets technology — built for the global Ummah.
            </p>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 36 }}>
          {[
            { icon: '🛡️', title: 'Scholar Verified', desc: 'All content reviewed by qualified Islamic scholars for accuracy and authenticity.' },
            { icon: '📍', title: 'GPS Precision',    desc: 'Prayer times calculated from your exact coordinates — never miss a prayer.' },
            { icon: '🌍', title: '5 Languages',      desc: 'English, Arabic, French, Spanish and Indonesian — for the global Ummah.' },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.4rem', marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, color: '#0a2540', fontSize: '1.15rem', marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.5)', lineHeight: 1.78, maxWidth: 260, margin: '0 auto', fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ╔══════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════╗ */}
      <section style={{ background: 'linear-gradient(160deg, #0a2540 0%, #071a2e 100%)', padding: 'clamp(60px,8vw,100px) clamp(16px,5vw,48px)', textAlign: 'center' }}>
        <Reveal>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <div style={{ fontSize: '3rem', marginBottom: 20 }}>🌙</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.8rem)', color: '#ffffff', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: 16 }}>
              Start your spiritual journey <span style={{ color: '#D4AF37' }}>today</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.44)', fontSize: 'clamp(0.96rem,2.2vw,1.08rem)', maxWidth: 420, margin: '0 auto 40px', lineHeight: 1.78 }}>
              Prayer times, Quran, Qibla, Zakat — everything you need, free forever.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/quran" style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                background: '#D4AF37', color: '#0a2540',
                padding: '14px 28px', borderRadius: 12,
                fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.82rem',
                textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none',
                boxShadow: '0 8px 28px rgba(212,175,55,0.3)', transition: 'all 0.22s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(212,175,55,0.38)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(212,175,55,0.3)'; }}>
                <BookOpen size={16} /> Read Quran
              </Link>
              <Link to="/blog" style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)',
                color: '#ffffff', padding: '14px 28px', borderRadius: 12,
                fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.82rem',
                textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none',
                transition: 'all 0.22s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.38)'; e.currentTarget.style.color = '#D4AF37'; }}
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
