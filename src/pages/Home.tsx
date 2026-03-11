import React, { useEffect, useState, useRef } from 'react';
import { PrayerWidget } from '@/src/components/PrayerWidget';
import { SEO } from '@/src/components/SEO';
import { BookOpen, MapPin, ArrowRight, Search, ChevronRight, Shield, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { useTranslation } from 'react-i18next';

/* ── Per-language UI strings ───────────────────────────────
   Short enough to never overflow on any screen in any language
   ─────────────────────────────────────────────────────────── */
const COPY: Record<string, {
  h1: string; brand: string; sub: string;
  cta1: string; cta2: string;
  pSection: string; pSub: string;
  toolsH: string; learnH: string; whyH: string;
  quranCTA: string; blogCTA: string;
}> = {
  en: {
    h1:       'Prayer Times, Qibla & Quran',
    brand:    'Al Ummah AI · Free Islamic Platform',
    sub:      'GPS prayer times, Qibla compass, Quran, Zakat and more.',
    cta1:     'My Location',
    cta2:     'Search City',
    pSection: 'Prayer Times Near You',
    pSub:     'GPS-detected automatically. Search any city worldwide.',
    toolsH:   'Islamic Tools',
    learnH:   'Learn & Grow',
    whyH:     'Why Al Ummah AI?',
    quranCTA: 'Read Quran',
    blogCTA:  'Explore Blog',
  },
  fr: {
    h1:       'Horaires de prière, Qibla & Coran',
    brand:    'Al Ummah AI · Plateforme islamique gratuite',
    sub:      'Horaires GPS, boussole Qibla, Coran, Zakat et plus.',
    cta1:     'Ma position',
    cta2:     'Rechercher',
    pSection: 'Heures de prière',
    pSub:     'Détection GPS auto. Recherchez n\'importe quelle ville.',
    toolsH:   'Outils islamiques',
    learnH:   'Apprendre',
    whyH:     'Pourquoi Al Ummah AI ?',
    quranCTA: 'Lire le Coran',
    blogCTA:  'Explorer le blog',
  },
  es: {
    h1:       'Horarios de oración, Qibla y Corán',
    brand:    'Al Ummah AI · Plataforma islámica gratuita',
    sub:      'Horarios GPS, brújula Qibla, Corán, Zakat y más.',
    cta1:     'Mi ubicación',
    cta2:     'Buscar ciudad',
    pSection: 'Horarios de oración',
    pSub:     'GPS automático. Busca cualquier ciudad.',
    toolsH:   'Herramientas islámicas',
    learnH:   'Aprender',
    whyH:     '¿Por qué Al Ummah AI?',
    quranCTA: 'Leer el Corán',
    blogCTA:  'Ver el blog',
  },
  ar: {
    h1:       'أوقات الصلاة، القبلة والقرآن',
    brand:    'Al Ummah AI · منصة إسلامية مجانية',
    sub:      'أوقات صلاة بـ GPS، القبلة، القرآن، الزكاة والمزيد.',
    cta1:     'موقعي',
    cta2:     'ابحث',
    pSection: 'أوقات الصلاة',
    pSub:     'تحديد تلقائي بـ GPS. ابحث عن أي مدينة.',
    toolsH:   'الأدوات الإسلامية',
    learnH:   'تعلّم',
    whyH:     'لماذا Al Ummah AI؟',
    quranCTA: 'اقرأ القرآن',
    blogCTA:  'استكشف المدونة',
  },
};

const PHRASES = [
  { ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', en: 'In the name of Allah, the Most Gracious' },
  { ar: 'اللَّهُ أَكْبَرُ',                        en: 'Allah is the Greatest' },
  { ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',          en: 'Glory be to Allah and praise Him' },
  { ar: 'لَا إِلَٰهَ إِلَّا اللَّهُ',             en: 'There is no god but Allah' },
];

const TOOLS = [
  { e: '🕐', t: 'Prayer Times',     b: 'Live', d: 'Fajr, Dhuhr, Asr, Maghrib & Isha.', l: '/' },
  { e: '🧭', t: 'Qibla Finder',     b: 'GPS',  d: 'Real-time compass to the Kaaba.',   l: '/qibla' },
  { e: '📖', t: 'Quran',            b: 'Full', d: 'Complete Quran & translations.',      l: '/quran' },
  { e: '💛', t: 'Zakat Calculator', b: '2026', d: 'Calculate your Zakat obligation.',    l: '/zakat' },
];

const LEARN = [
  { e: '🌙', t: 'Ramadan 2026', h: '/ramadan',                     d: 'Full guide & timetable' },
  { e: '🤲', t: 'Daily Duas',   h: '/blog/morning-evening-adhkar', d: 'Morning & evening duas' },
  { e: '✍️', t: 'Blog',         h: '/blog',                        d: 'Islamic knowledge' },
  { e: '✨', t: 'Scholar AI',   h: '/scholar',                     d: 'Ask any question' },
];

const PILLS = [
  ['Ramadan 2026', '/blog/ramadan-2026-prayer-timetable'],
  ['Fajr Time',    '/blog/fajr-time-today'],
  ['Zakat 2026',   '/blog/calculate-zakat-2026'],
  ['How to Pray',  '/blog/how-to-pray-salah-beginners'],
  ['Surah Kahf',   '/blog/surah-al-kahf-friday'],
  ['Hajj 2026',    '/blog/hajj-packages-uk-2026'],
];

/* ── Helpers ─────────────────────────────────────────────── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const r = useRef<HTMLDivElement>(null);
  const v = useInView(r, { once: true, margin: '-40px' });
  return (
    <motion.div ref={r}
      initial={{ opacity: 0, y: 14 }}
      animate={v ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

const SBadge = ({ t }: { t: string }) => (
  <div style={{
    display: 'inline-block', padding: '3px 11px', marginBottom: 8,
    background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)',
    borderRadius: 99, fontFamily: "'DM Sans',sans-serif",
    fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.26em',
    textTransform: 'uppercase' as const, color: '#b8941e',
  }}>✦ {t}</div>
);

/* ── Main component ─────────────────────────────────────── */
export function Home() {
  const { i18n } = useTranslation();
  const lang     = i18n.language?.slice(0, 2) || 'en';
  const L        = COPY[lang] || COPY.en;
  const isRTL    = lang === 'ar';

  const [pi,   setPi]   = useState(0);
  const [vis,  setVis]  = useState(true);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const d = Math.ceil((new Date('2026-02-17').getTime() - Date.now()) / 86400000);
    setDays(d > 0 ? d : 0);
    const iv = setInterval(() => {
      setVis(false);
      setTimeout(() => { setPi(i => (i + 1) % PHRASES.length); setVis(true); }, 380);
    }, 4200);
    return () => clearInterval(iv);
  }, []);

  const P = PHRASES[pi];

  return (
    <div style={{ background: '#ffffff', color: '#0a2540', overflowX: 'hidden' }}>
      <SEO
        title="Al Ummah AI — Prayer Times, Qibla & Quran | Free Islamic Platform"
        description="Al Ummah AI: accurate GPS prayer times for Fajr, Dhuhr, Asr, Maghrib & Isha. Qibla finder, full Quran, Zakat calculator and Ramadan 2026 guide. Free for Muslims worldwide."
        keywords="al ummah ai, prayer times today, fajr time, qibla finder, quran, zakat 2026, ramadan 2026"
        canonical="https://www.alummahai.com"
      />

      {/* ══════════════════════════════════════════════ HERO
          Mobile-first: compact, clear hierarchy, no wasted space
      ══════════════════════════════════════════════════════════ */}
      <section
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          background: 'linear-gradient(165deg,#0a2540 0%,#0d2e4d 55%,#071a2e 100%)',
          /* Mobile: 85vh. Grows on desktop. */
          minHeight: '85vh',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          /* pt accounts for 56px nav. Extra pb for breathing room. */
          padding: '80px 20px 52px',
          position: 'relative', overflow: 'hidden', textAlign: 'center',
        }}>

        {/* Dot grid — subtle */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(212,175,55,0.08) 1px,transparent 1px)', backgroundSize: '34px 34px', pointerEvents: 'none' }} />
        {/* Center glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 'min(500px,80vw)', height: 'min(500px,80vw)', borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,175,55,0.055),transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 600 }}>

          {/* Rotating Arabic phrase — compact on mobile */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            style={{ marginBottom: 20, minHeight: 46 }}>
            <div style={{
              fontFamily: "'Amiri',serif",
              /* Mobile: ~1rem, desktop: ~1.8rem */
              fontSize: 'clamp(0.9rem,2.5vw,1.8rem)',
              color: '#D4AF37', direction: 'rtl',
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0)' : 'translateY(-5px)',
              transition: 'all 0.38s cubic-bezier(0.16,1,0.3,1)',
              textShadow: '0 0 24px rgba(212,175,55,0.18)',
            }}>{P.ar}</div>
            <div style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 'clamp(0.5rem,1.2vw,0.6rem)',
              color: 'rgba(212,175,55,0.4)', letterSpacing: '0.13em',
              marginTop: 3, fontStyle: 'italic',
              opacity: vis ? 1 : 0, transition: 'opacity 0.38s ease 0.1s',
            }}>{P.en}</div>
          </motion.div>

          {/* H1 — MOBILE FIRST SIZE */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Playfair Display',serif", fontWeight: 900,
              /* Mobile: 1.55rem max. Desktop: 2.6rem */
              fontSize: 'clamp(1.55rem,3.8vw,2.6rem)',
              color: '#ffffff', lineHeight: 1.15,
              letterSpacing: '-0.02em', marginBottom: 10,
            }}>
            {L.h1}
          </motion.h1>

          {/* Brand line — SEO + identity */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{
              fontFamily: "'DM Sans',sans-serif", fontWeight: 700,
              fontSize: 'clamp(0.6rem,1.3vw,0.7rem)',
              color: 'rgba(212,175,55,0.5)', letterSpacing: '0.18em',
              textTransform: 'uppercase', marginBottom: 16,
            }}>
            {L.brand}
          </motion.div>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
            style={{
              fontFamily: "'DM Sans',sans-serif", fontWeight: 300,
              fontSize: 'clamp(0.84rem,1.7vw,0.98rem)',
              color: 'rgba(255,255,255,0.44)',
              maxWidth: 360, margin: '0 auto', lineHeight: 1.8,
              marginBottom: 'clamp(20px,3.5vh,30px)',
            }}>
            {L.sub}
          </motion.p>

          {/* CTAs — always side by side. Compact on mobile. */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }}
            style={{ display: 'flex', gap: 9, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'clamp(22px,4vh,36px)' }}>

            <Link to="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#D4AF37', color: '#0a2540',
              /* Comfortable touch target without being huge */
              padding: '11px 18px',
              borderRadius: 10, fontFamily: "'DM Sans',sans-serif", fontWeight: 800,
              fontSize: 'clamp(0.7rem,1.5vw,0.78rem)',
              textTransform: 'uppercase', letterSpacing: '0.09em',
              textDecoration: 'none', whiteSpace: 'nowrap',
              boxShadow: '0 6px 24px rgba(212,175,55,0.32)', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(212,175,55,0.42)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(212,175,55,0.32)'; }}>
              <MapPin size={13} /> {L.cta1}
            </Link>

            <Link to="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)',
              color: '#ffffff', padding: '11px 18px',
              borderRadius: 10, fontFamily: "'DM Sans',sans-serif", fontWeight: 800,
              fontSize: 'clamp(0.7rem,1.5vw,0.78rem)',
              textTransform: 'uppercase', letterSpacing: '0.09em',
              textDecoration: 'none', whiteSpace: 'nowrap', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'; e.currentTarget.style.color = '#D4AF37'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)'; e.currentTarget.style.color = '#ffffff'; }}>
              <Search size={12} /> {L.cta2}
            </Link>
          </motion.div>

          {/* Stats — always 4 in a row, font scales down on tiny screens */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
              gap: 8,
              paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)',
            }}>
            {[['1.8B+','Muslims'],['150+','Cities'],['5','Languages'],['100%','Free']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(0.95rem,2.2vw,1.55rem)', color: '#D4AF37', lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 'clamp(0.42rem,0.9vw,0.54rem)', color: 'rgba(255,255,255,0.26)', textTransform: 'uppercase', letterSpacing: '0.14em', marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </motion.div>

          {/* Ramadan countdown */}
          {days > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} style={{ marginTop: 16 }}>
              <Link to="/ramadan" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 13px', borderRadius: 99,
                border: '1px solid rgba(212,175,55,0.22)', background: 'rgba(212,175,55,0.07)',
                color: '#D4AF37', fontFamily: "'DM Sans',sans-serif",
                fontSize: 'clamp(0.62rem,1.3vw,0.72rem)', fontWeight: 700, textDecoration: 'none',
              }}>
                🌙 {days} days until Ramadan 2026 →
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════ TRUST BAR */}
      <div style={{ background: '#f7f8fa', borderBottom: '1px solid rgba(10,37,64,0.07)', padding: '9px 20px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap', gap: 0, minWidth: 'max-content', margin: '0 auto' }}>
          {[['📍','GPS prayer times'],['🧭','Live Qibla'],['📖','Full Quran'],['🛡️','Scholar verified']].map(([ic, tx], i, a) => (
            <div key={String(tx)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '2px 16px', borderRight: i < a.length - 1 ? '1px solid rgba(10,37,64,0.07)' : 'none', whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: '0.78rem' }}>{ic}</span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 'clamp(0.6rem,1.3vw,0.7rem)', color: 'rgba(10,37,64,0.52)' }}>{tx}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════ PRAYER TIMES */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(40px,6vw,72px) 20px' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(22px,4vh,38px)' }}>
            <SBadge t="Live · GPS Accurate" />
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.35rem,3.8vw,2.4rem)', color: '#0a2540', marginBottom: 7, display: 'block' }}>
              {L.pSection}
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.48)', maxWidth: 280, margin: '0 auto', lineHeight: 1.8, fontSize: 'clamp(0.8rem,1.7vw,0.9rem)' }}>
              {L.pSub}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.07}><PrayerWidget /></Reveal>
      </section>

      {/* ════════════════════════════════════════ TOOLS */}
      <section style={{ background: 'linear-gradient(160deg,#0a2540 0%,#071a2e 100%)', padding: 'clamp(40px,6vw,72px) 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(22px,4vh,36px)' }}>
              <SBadge t="Sacred Tools" />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.35rem,3.8vw,2.4rem)', color: '#ffffff' }}>{L.toolsH}</h2>
            </div>
          </Reveal>

          {/* 2-col on mobile, 4-col on desktop */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 10 }}
            className="tools-grid">
            {TOOLS.map((tool, i) => (
              <Reveal key={tool.t} delay={i * 0.06}>
                <Link to={tool.l} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 'clamp(14px,2.5vw,20px) clamp(12px,2vw,16px)', height: '100%', position: 'relative', transition: 'all 0.26s cubic-bezier(0.16,1,0.3,1)' }}
                    onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(212,175,55,0.35)'; el.style.background = 'rgba(255,255,255,0.07)'; el.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.08)'; el.style.background = 'rgba(255,255,255,0.04)'; el.style.transform = 'translateY(0)'; }}>
                    <span style={{ position: 'absolute', top: 10, right: 10, fontSize: '0.46rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.13em', color: '#D4AF37', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.2)', padding: '2px 6px', borderRadius: 99, fontFamily: "'DM Sans',sans-serif" }}>{tool.b}</span>
                    <div style={{ fontSize: 'clamp(1.4rem,3.5vw,1.75rem)', marginBottom: 9 }}>{tool.e}</div>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 'clamp(0.86rem,2vw,1rem)', color: '#ffffff', marginBottom: 4 }}>{tool.t}</h3>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.36)', fontSize: 'clamp(0.7rem,1.5vw,0.78rem)', lineHeight: 1.6 }}>{tool.d}</p>
                    <div style={{ marginTop: 12, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.58rem', color: 'rgba(212,175,55,0.5)', textTransform: 'uppercase', letterSpacing: '0.13em', display: 'flex', alignItems: 'center', gap: 3 }}>Open <ChevronRight size={9} /></div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Secondary links — 2 per row on mobile */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 7 }}
            className="secondary-grid">
            {[{l:'Hajj Guide',to:'/hajj',e:'🕋'},{l:'Ramadan',to:'/ramadan',e:'🌙'},{l:'Scholar AI',to:'/scholar',e:'✨'},{l:'Store',to:'/store',e:'🛍️'}].map(x => (
              <Link key={x.l} to={x.to} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '10px 12px', textDecoration: 'none', fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 'clamp(0.72rem,1.5vw,0.8rem)', color: 'rgba(255,255,255,0.42)', transition: 'all 0.18s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.28)'; e.currentTarget.style.color = '#D4AF37'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.42)'; }}>
                <span style={{ fontSize: '0.95rem' }}>{x.e}</span>{x.l}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ LEARN */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(40px,6vw,72px) 20px' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'clamp(20px,4vh,32px)', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <SBadge t="Islamic Knowledge" />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.35rem,3.5vw,2.3rem)', color: '#0a2540', marginBottom: 4 }}>{L.learnH}</h2>
            </div>
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, border: '1px solid rgba(212,175,55,0.28)', color: '#b8941e', padding: '7px 13px', borderRadius: 99, textDecoration: 'none', fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'all 0.18s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              All Articles <ArrowRight size={11} />
            </Link>
          </div>
        </Reveal>

        {/* 2-col on mobile, 4-col on desktop */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 18 }}
          className="learn-grid">
          {LEARN.map((item, i) => (
            <Reveal key={item.t} delay={i * 0.06}>
              <Link to={item.h} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                <div style={{ background: '#ffffff', border: '1px solid rgba(10,37,64,0.09)', borderRadius: 13, padding: 'clamp(14px,2.5vw,18px) clamp(12px,2vw,15px)', height: '100%', transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)' }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(212,175,55,0.32)'; el.style.boxShadow = '0 6px 20px rgba(212,175,55,0.07)'; el.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(10,37,64,0.09)'; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)'; }}>
                  <div style={{ fontSize: 'clamp(1.3rem,3.5vw,1.65rem)', marginBottom: 8 }}>{item.e}</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 'clamp(0.84rem,2vw,0.95rem)', color: '#0a2540', marginBottom: 3 }}>{item.t}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.44)', fontSize: 'clamp(0.7rem,1.5vw,0.78rem)', lineHeight: 1.6 }}>{item.d}</p>
                  <div style={{ marginTop: 9, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.58rem', color: 'rgba(212,175,55,0.55)', textTransform: 'uppercase', letterSpacing: '0.13em' }}>Explore →</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Pills */}
        <Reveal delay={0.05}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
            {PILLS.map(([l, h]) => (
              <Link key={l} to={h} style={{ padding: '5px 12px', background: 'rgba(10,37,64,0.04)', border: '1px solid rgba(10,37,64,0.09)', borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 'clamp(0.64rem,1.4vw,0.7rem)', color: 'rgba(10,37,64,0.52)', textDecoration: 'none', transition: 'all 0.16s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)'; e.currentTarget.style.color = '#b8941e'; e.currentTarget.style.background = 'rgba(212,175,55,0.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,37,64,0.09)'; e.currentTarget.style.color = 'rgba(10,37,64,0.52)'; e.currentTarget.style.background = 'rgba(10,37,64,0.04)'; }}>
                {l}
              </Link>
            ))}
          </div>
        </Reveal>

        {/* Scholar AI banner */}
        <Reveal>
          <Link to="/scholar" style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{ background: 'linear-gradient(120deg,#0a2540,#0d2e4d)', borderRadius: 16, padding: 'clamp(18px,3.5vw,28px) 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.22s cubic-bezier(0.16,1,0.3,1)' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              <div>
                <div style={{ fontSize: 'clamp(1.3rem,3.5vw,1.7rem)', marginBottom: 6 }}>✨</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 'clamp(0.96rem,2.5vw,1.35rem)', color: '#ffffff', marginBottom: 4 }}>Ask Scholar AI</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.4)', fontSize: 'clamp(0.76rem,1.6vw,0.84rem)', maxWidth: 320, lineHeight: 1.75 }}>
                  Islamic questions answered from Quran and Sunnah.
                </p>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#D4AF37', color: '#0a2540', padding: '10px 18px', borderRadius: 9, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(0.68rem,1.5vw,0.74rem)', textTransform: 'uppercase', letterSpacing: '0.09em', whiteSpace: 'nowrap', flexShrink: 0 }}>
                Ask a Question <ArrowRight size={12} />
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* ════════════════════════════════════ WHY SECTION */}
      <section style={{ background: '#f7f8fa', borderTop: '1px solid rgba(10,37,64,0.06)', padding: 'clamp(40px,6vw,72px) 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(26px,4vh,40px)' }}>
              <SBadge t={L.whyH} />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.35rem,3.8vw,2.4rem)', color: '#0a2540', marginBottom: 8 }}>Built for the Global Ummah</h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.48)', maxWidth: 380, margin: '0 auto', lineHeight: 1.8, fontSize: 'clamp(0.82rem,1.7vw,0.92rem)' }}>
                Accurate technology. Verified Islamic knowledge. Completely free.
              </p>
            </div>
          </Reveal>

          {/* 2-col on mobile, 4-col on desktop */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}
            className="why-grid">
            {[
              { i: <Shield size={17} />, t: 'Scholar Verified', d: 'All content reviewed by qualified Islamic scholars.' },
              { i: <MapPin  size={17} />, t: 'GPS Precision',    d: 'Exact prayer times from your coordinates.' },
              { i: <Globe   size={17} />, t: '5 Languages',      d: 'EN, AR, FR, ES and Indonesian.' },
              { i: <Zap     size={17} />, t: 'Always Free',      d: '100% free, forever. No account needed.' },
            ].map(item => (
              <Reveal key={item.t}>
                <div style={{ background: '#ffffff', border: '1px solid rgba(10,37,64,0.08)', borderRadius: 13, padding: 'clamp(15px,2.5vw,20px) clamp(13px,2vw,17px)', transition: 'all 0.22s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; e.currentTarget.style.boxShadow = '0 5px 18px rgba(212,175,55,0.07)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,37,64,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ color: '#D4AF37', marginBottom: 9 }}>{item.i}</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 'clamp(0.86rem,2vw,0.96rem)', color: '#0a2540', marginBottom: 5 }}>{item.t}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: 'clamp(0.72rem,1.5vw,0.8rem)', color: 'rgba(10,37,64,0.5)', lineHeight: 1.7 }}>{item.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ FINAL CTA */}
      <section style={{ background: 'linear-gradient(160deg,#0a2540 0%,#071a2e 100%)', padding: 'clamp(44px,7vw,80px) 20px', textAlign: 'center' }}>
        <Reveal>
          <div style={{ maxWidth: 440, margin: '0 auto' }}>
            <div style={{ fontSize: 'clamp(1.8rem,4vw,2.2rem)', marginBottom: 12 }}>🌙</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.45rem,4.5vw,2.6rem)', color: '#ffffff', lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: 10 }}>
              Start your journey <span style={{ color: '#D4AF37' }}>today</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.42)', fontSize: 'clamp(0.84rem,1.8vw,0.96rem)', maxWidth: 300, margin: '0 auto 24px', lineHeight: 1.8 }}>
              Al Ummah AI — prayer times, Quran, Qibla, Zakat. Free forever.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/quran" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#D4AF37', color: '#0a2540', padding: '11px 20px', borderRadius: 9, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(0.7rem,1.5vw,0.76rem)', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', boxShadow: '0 5px 22px rgba(212,175,55,0.28)', transition: 'transform 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                <BookOpen size={13} /> {L.quranCTA}
              </Link>
              <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)', color: '#ffffff', padding: '11px 20px', borderRadius: 9, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(0.7rem,1.5vw,0.76rem)', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)'; e.currentTarget.style.color = '#D4AF37'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)'; e.currentTarget.style.color = '#ffffff'; }}>
                {L.blogCTA}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Desktop breakpoints for grids */}
      <style>{`
        @media (min-width: 640px) {
          .tools-grid    { grid-template-columns: repeat(4,1fr) !important; }
          .secondary-grid{ grid-template-columns: repeat(4,1fr) !important; }
          .learn-grid    { grid-template-columns: repeat(4,1fr) !important; }
          .why-grid      { grid-template-columns: repeat(4,1fr) !important; }
        }
      `}</style>
    </div>
  );
}
