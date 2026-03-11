import React, { useEffect, useState, useRef } from 'react';
import { PrayerWidget } from '@/src/components/PrayerWidget';
import { SEO } from '@/src/components/SEO';
import { BookOpen, MapPin, ArrowRight, Search, ChevronRight, Shield, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { useTranslation } from 'react-i18next';

/* ──────────────────────────────────────────────────────────
   Per-language UI copy
   Rules for copy:
   - CTA labels: max 14 chars (must fit 2 side-by-side on 320px)
   - H1: max 44 chars (must fit on 2 lines at 1.55rem on 320px)
   - sub: max 80 chars (3 lines max at 0.84rem)
────────────────────────────────────────────────────────── */
const COPY: Record<string, {
  h1: string; sub: string;
  cta1: string; cta2: string;
  seoTitle: string; seoDesc: string;
  prayerH: string; prayerSub: string;
  toolsH: string; learnH: string; whyH: string;
  quranCta: string; blogCta: string;
}> = {
  en: {
    h1:       'Prayer Times, Qibla & Quran',
    sub:      'GPS prayer times, Qibla, Quran, Zakat and more — free.',
    cta1:     'My Location', cta2: 'Search City',
    seoTitle: 'Al Ummah AI — Prayer Times, Qibla & Quran | Free Islamic Platform',
    seoDesc:  'Al Ummah AI: accurate GPS prayer times for Fajr, Dhuhr, Asr, Maghrib & Isha. Qibla finder, Quran, Zakat 2026, Ramadan guide and Scholar AI. Free for 1.8 billion Muslims.',
    prayerH:  'Prayer Times Near You',
    prayerSub:'Auto-detected by GPS. Search any city worldwide.',
    toolsH:   'Islamic Tools',
    learnH:   'Learn & Grow',
    whyH:     'Why Al Ummah AI?',
    quranCta: 'Read Quran', blogCta: 'Explore Blog',
  },
  fr: {
    h1:       'Prière, Qibla & Coran',
    sub:      'Horaires GPS, Qibla, Coran et Zakat — gratuit.',
    cta1:     'Ma position', cta2: 'Rechercher',
    seoTitle: 'Al Ummah AI — Horaires de Prière, Qibla & Coran | Plateforme Islamique Gratuite',
    seoDesc:  'Al Ummah AI : horaires GPS pour Fajr, Dhuhr, Asr, Maghrib et Isha. Boussole Qibla, Coran complet, Zakat 2026 et Scholar AI. Gratuit pour 1,8 milliard de musulmans.',
    prayerH:  'Heures de prière',
    prayerSub:'Détecté automatiquement. Cherchez n\'importe quelle ville.',
    toolsH:   'Outils islamiques',
    learnH:   'Apprendre',
    whyH:     'Pourquoi Al Ummah AI ?',
    quranCta: 'Lire le Coran', blogCta: 'Le blog',
  },
  es: {
    h1:       'Oración, Qibla y Corán',
    sub:      'Horarios GPS, Qibla, Corán y Zakat — gratuito.',
    cta1:     'Mi ubicación', cta2: 'Buscar ciudad',
    seoTitle: 'Al Ummah AI — Horarios de Oración, Qibla y Corán | Plataforma Islámica Gratuita',
    seoDesc:  'Al Ummah AI: horarios GPS para Fajr, Dhuhr, Asr, Maghrib e Isha. Brújula Qibla, Corán completo, Zakat 2026 y Scholar AI. Gratis para 1800 millones de musulmanes.',
    prayerH:  'Horarios de oración',
    prayerSub:'Detección GPS automática. Busca cualquier ciudad.',
    toolsH:   'Herramientas islámicas',
    learnH:   'Aprender',
    whyH:     '¿Por qué Al Ummah AI?',
    quranCta: 'Leer Corán', blogCta: 'Ver blog',
  },
  ar: {
    h1:       'الصلاة والقبلة والقرآن',
    sub:      'أوقات الصلاة بـGPS والقبلة والقرآن والزكاة — مجاناً.',
    cta1:     'موقعي', cta2: 'ابحث',
    seoTitle: 'Al Ummah AI — أوقات الصلاة والقبلة والقرآن | منصة إسلامية مجانية',
    seoDesc:  'Al Ummah AI: أوقات صلاة دقيقة بـGPS للفجر والظهر والعصر والمغرب والعشاء. اتجاه القبلة، القرآن الكامل، حاسبة الزكاة 2026 والعالم AI. مجاني لـ1.8 مليار مسلم.',
    prayerH:  'أوقات الصلاة',
    prayerSub:'تحديد تلقائي بـ GPS. ابحث عن أي مدينة.',
    toolsH:   'الأدوات الإسلامية',
    learnH:   'تعلّم',
    whyH:     'لماذا Al Ummah AI؟',
    quranCta: 'القرآن', blogCta: 'المدونة',
  },
};

const PHRASES = [
  { ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', en: 'In the name of Allah, the Most Gracious' },
  { ar: 'اللَّهُ أَكْبَرُ',                        en: 'Allah is the Greatest' },
  { ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',          en: 'Glory be to Allah and praise Him' },
  { ar: 'لَا إِلَٰهَ إِلَّا اللَّهُ',             en: 'There is no god but Allah' },
];

const TOOLS = [
  { e:'🕐', t:'Prayer Times',  b:'Live', d:'Fajr, Dhuhr, Asr, Maghrib & Isha.', l:'/'       },
  { e:'🧭', t:'Qibla Finder',  b:'GPS',  d:'Compass toward the Kaaba.',           l:'/qibla'  },
  { e:'📖', t:'Quran',         b:'Full', d:'Complete Quran & translations.',       l:'/quran'  },
  { e:'💛', t:'Zakat',         b:'2026', d:'Calculator — 2026 Nisab rates.',       l:'/zakat'  },
];

const LEARN = [
  { e:'🌙', t:'Ramadan 2026', h:'/ramadan',                     d:'Full guide & timetable' },
  { e:'🤲', t:'Daily Duas',   h:'/blog/morning-evening-adhkar', d:'Morning & evening duas' },
  { e:'✍️', t:'Blog',         h:'/blog',                        d:'Islamic knowledge' },
  { e:'✨', t:'Scholar AI',   h:'/scholar',                     d:'Ask any question' },
];

const PILLS = [
  ['Ramadan 2026', '/blog/ramadan-2026-prayer-timetable'],
  ['Fajr Time',    '/blog/fajr-time-today'],
  ['Zakat 2026',   '/blog/calculate-zakat-2026'],
  ['How to Pray',  '/blog/how-to-pray-salah-beginners'],
  ['Surah Kahf',   '/blog/surah-al-kahf-friday'],
  ['Hajj 2026',    '/blog/hajj-packages-uk-2026'],
];

/* ── Reveal animation ──────────────────────────────────── */
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

/* ── Small badge ───────────────────────────────────────── */
const SBadge = ({ t }: { t: string }) => (
  <div style={{
    display: 'inline-block', padding: '3px 11px', marginBottom: 8,
    background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)',
    borderRadius: 99, fontFamily: "'DM Sans',sans-serif",
    fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.26em',
    textTransform: 'uppercase' as const, color: '#b8941e',
  }}>✦ {t}</div>
);

/* ── Main ──────────────────────────────────────────────── */
export function Home() {
  const { i18n } = useTranslation();
  const lang  = i18n.language?.slice(0, 2) || 'en';
  const L     = COPY[lang] || COPY.en;
  const isRTL = lang === 'ar';

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
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{ background: '#ffffff', color: '#0a2540', overflowX: 'hidden' }}>

      <SEO
        title={L.seoTitle}
        description={L.seoDesc}
        keywords="al ummah ai, prayer times today, fajr time, qibla finder, quran, zakat 2026, ramadan 2026"
        canonical="https://www.alummahai.com"
        lang={lang}
      />

      {/* ════════════════════════════════════════════ HERO
          Mobile-first design:
          • pt = 56px (nav) + 24px breathing = 80px
          • No giant min-height — content-driven
          • Compact on small screens, taller on large ones
      ════════════════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(165deg,#0a2540 0%,#0d2e4d 55%,#071a2e 100%)',
        minHeight: '88vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '80px 20px 52px',
        position: 'relative', overflow: 'hidden', textAlign: 'center',
      }}>
        {/* Subtle dot grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(212,175,55,0.08) 1px,transparent 1px)', backgroundSize: '34px 34px', pointerEvents: 'none' }} />
        {/* Center glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 'min(480px,78vw)', height: 'min(480px,78vw)', borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,175,55,0.055),transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 580 }}>

          {/* ── Arabic phrase ── */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 }}
            style={{ marginBottom: 18, minHeight: 44 }}>
            <div style={{
              fontFamily: "'Amiri',serif",
              /*
               * RESPONSIVE: 0.9rem on 320px → 1.8rem on 768px+
               * FR/ES labels under the phrase never overflow
               */
              fontSize: 'clamp(0.88rem,2.4vw,1.75rem)',
              color: '#D4AF37', direction: 'rtl',
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0)' : 'translateY(-4px)',
              transition: 'all 0.38s cubic-bezier(0.16,1,0.3,1)',
              textShadow: '0 0 22px rgba(212,175,55,0.18)',
            }}>{P.ar}</div>
            <div style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 'clamp(0.48rem,1.1vw,0.58rem)',
              color: 'rgba(212,175,55,0.4)', letterSpacing: '0.12em',
              marginTop: 3, fontStyle: 'italic',
              opacity: vis ? 1 : 0, transition: 'opacity 0.38s ease 0.1s',
              /* Ensure long English phrases don't push layout */
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              maxWidth: '90%', margin: '3px auto 0',
            }}>{P.en}</div>
          </motion.div>

          {/* ── H1 ── */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.11, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Playfair Display',serif", fontWeight: 900,
              /*
               * KEY SIZES:
               * 320px → 1.5rem  (AR ~1.4rem because it's shorter)
               * 480px → 1.8rem
               * 768px → 2.4rem
               * The clamp handles ALL languages safely
               */
              fontSize: 'clamp(1.45rem,3.6vw,2.5rem)',
              color: '#ffffff', lineHeight: 1.18,
              letterSpacing: '-0.02em', marginBottom: 9,
            }}>
            {L.h1}
          </motion.h1>

          {/* Brand identity line — SEO signal */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.19 }}
            style={{
              fontFamily: "'DM Sans',sans-serif", fontWeight: 700,
              fontSize: 'clamp(0.56rem,1.2vw,0.66rem)',
              color: 'rgba(212,175,55,0.48)', letterSpacing: '0.2em',
              textTransform: 'uppercase', marginBottom: 14,
            }}>
            Al Ummah AI &mdash; {lang === 'ar' ? 'منصة إسلامية مجانية' : lang === 'fr' ? 'Plateforme islamique gratuite' : lang === 'es' ? 'Plataforma islámica gratuita' : 'Free Islamic Platform'}
          </motion.div>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.26 }}
            style={{
              fontFamily: "'DM Sans',sans-serif", fontWeight: 300,
              fontSize: 'clamp(0.82rem,1.6vw,0.96rem)',
              color: 'rgba(255,255,255,0.44)',
              maxWidth: 340, margin: '0 auto',
              lineHeight: 1.82, marginBottom: 'clamp(20px,3.5vh,28px)',
            }}>
            {L.sub}
          </motion.p>

          {/* ── CTAs ── Always side by side, compact padding ── */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.33 }}
            style={{
              display: 'flex', gap: 9, justifyContent: 'center',
              flexWrap: 'wrap',  /* fallback for extreme cases */
              marginBottom: 'clamp(20px,3.5vh,30px)',
            }}>
            <Link to="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#D4AF37', color: '#0a2540',
              /*
               * PADDING: vertical comfortable touch target (44px min),
               * horizontal compact enough for FR ("Ma position") on 320px
               */
              padding: '11px 16px',
              borderRadius: 10, fontFamily: "'DM Sans',sans-serif", fontWeight: 800,
              /* Font scales: 0.7rem on 320px, 0.78rem on 480px+ */
              fontSize: 'clamp(0.7rem,1.5vw,0.78rem)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              textDecoration: 'none', whiteSpace: 'nowrap',
              boxShadow: '0 6px 22px rgba(212,175,55,0.32)', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(212,175,55,0.42)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(212,175,55,0.32)'; }}>
              <MapPin size={12} /> {L.cta1}
            </Link>

            <Link to="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)',
              color: '#ffffff', padding: '11px 16px',
              borderRadius: 10, fontFamily: "'DM Sans',sans-serif", fontWeight: 800,
              fontSize: 'clamp(0.7rem,1.5vw,0.78rem)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              textDecoration: 'none', whiteSpace: 'nowrap', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'; e.currentTarget.style.color = '#D4AF37'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)'; e.currentTarget.style.color = '#ffffff'; }}>
              <Search size={11} /> {L.cta2}
            </Link>
          </motion.div>

          {/* ── Stats strip — 4 in a row, font scales ── */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.48 }}
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
              gap: 8,
              paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.07)',
            }}>
            {[['1.8B+','Muslims'],['150+','Cities'],['5','Languages'],['100%','Free']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(0.9rem,2vw,1.5rem)', color: '#D4AF37', lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 'clamp(0.4rem,0.85vw,0.52rem)', color: 'rgba(255,255,255,0.26)', textTransform: 'uppercase', letterSpacing: '0.13em', marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </motion.div>

          {/* Ramadan countdown */}
          {days > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.62 }} style={{ marginTop: 14 }}>
              <Link to="/ramadan" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 13px', borderRadius: 99,
                border: '1px solid rgba(212,175,55,0.22)', background: 'rgba(212,175,55,0.07)',
                color: '#D4AF37', fontFamily: "'DM Sans',sans-serif",
                fontSize: 'clamp(0.6rem,1.2vw,0.7rem)', fontWeight: 700, textDecoration: 'none',
              }}>
                🌙 {days} days until Ramadan 2026 →
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════ TRUST BAR */}
      <div style={{
        background: '#f7f8fa', borderBottom: '1px solid rgba(10,37,64,0.07)',
        padding: '9px 20px', overflowX: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap', gap: 0, minWidth: 'max-content', margin: '0 auto' }}>
          {[['📍','GPS prayer times'],['🧭','Live Qibla'],['📖','Full Quran'],['🛡️','Scholar verified']].map(([ic, tx], i, a) => (
            <div key={String(tx)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '2px 14px', borderRight: i < a.length - 1 ? '1px solid rgba(10,37,64,0.07)' : 'none', whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: '0.78rem' }}>{ic}</span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 'clamp(0.58rem,1.3vw,0.68rem)', color: 'rgba(10,37,64,0.52)' }}>{tx}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════ PRAYER TIMES */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(40px,6vw,72px) 20px' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(22px,4vh,36px)' }}>
            <SBadge t="Live · GPS Accurate" />
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.3rem,3.5vw,2.3rem)', color: '#0a2540', marginBottom: 7 }}>
              {L.prayerH}
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.48)', maxWidth: 270, margin: '0 auto', lineHeight: 1.8, fontSize: 'clamp(0.8rem,1.6vw,0.9rem)' }}>
              {L.prayerSub}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.07}><PrayerWidget /></Reveal>
      </section>

      {/* ════════════════════════════════════════ TOOLS */}
      <section style={{ background: 'linear-gradient(160deg,#0a2540 0%,#071a2e 100%)', padding: 'clamp(40px,6vw,72px) 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(20px,4vh,34px)' }}>
              <SBadge t="Sacred Tools" />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.3rem,3.5vw,2.3rem)', color: '#ffffff' }}>{L.toolsH}</h2>
            </div>
          </Reveal>

          {/* 2-col mobile → 4-col desktop */}
          <div className="home__tools-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 10 }}>
            {TOOLS.map((tool, i) => (
              <Reveal key={tool.t} delay={i * 0.06}>
                <Link to={tool.l} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 'clamp(14px,2.5vw,20px) clamp(12px,2vw,16px)', height: '100%', position: 'relative', transition: 'all 0.26s cubic-bezier(0.16,1,0.3,1)' }}
                    onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(212,175,55,0.35)'; el.style.background = 'rgba(255,255,255,0.07)'; el.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.08)'; el.style.background = 'rgba(255,255,255,0.04)'; el.style.transform = 'translateY(0)'; }}>
                    <span style={{ position: 'absolute', top: 10, right: 10, fontSize: '0.46rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#D4AF37', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.2)', padding: '2px 6px', borderRadius: 99, fontFamily: "'DM Sans',sans-serif" }}>{tool.b}</span>
                    <div style={{ fontSize: 'clamp(1.4rem,3.5vw,1.75rem)', marginBottom: 9 }}>{tool.e}</div>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 'clamp(0.85rem,2vw,1rem)', color: '#ffffff', marginBottom: 4 }}>{tool.t}</h3>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.36)', fontSize: 'clamp(0.7rem,1.5vw,0.78rem)', lineHeight: 1.6 }}>{tool.d}</p>
                    <div style={{ marginTop: 12, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.57rem', color: 'rgba(212,175,55,0.5)', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: 3 }}>Open <ChevronRight size={9} /></div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="home__secondary-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 7 }}>
            {[{l:'Hajj Guide',to:'/hajj',e:'🕋'},{l:'Ramadan',to:'/ramadan',e:'🌙'},{l:'Scholar AI',to:'/scholar',e:'✨'},{l:'Store',to:'/store',e:'🛍️'}].map(x => (
              <Link key={x.l} to={x.to} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '10px 12px', textDecoration: 'none', fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 'clamp(0.7rem,1.5vw,0.78rem)', color: 'rgba(255,255,255,0.42)', transition: 'all 0.18s' }}
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
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'clamp(20px,4vh,30px)', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <SBadge t="Islamic Knowledge" />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.3rem,3.5vw,2.3rem)', color: '#0a2540', marginBottom: 4 }}>{L.learnH}</h2>
            </div>
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, border: '1px solid rgba(212,175,55,0.28)', color: '#b8941e', padding: '7px 13px', borderRadius: 99, textDecoration: 'none', fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.67rem', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'all 0.18s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              All Articles <ArrowRight size={11} />
            </Link>
          </div>
        </Reveal>

        <div className="home__learn-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 18 }}>
          {LEARN.map((item, i) => (
            <Reveal key={item.t} delay={i * 0.06}>
              <Link to={item.h} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                <div style={{ background: '#ffffff', border: '1px solid rgba(10,37,64,0.09)', borderRadius: 13, padding: 'clamp(14px,2.5vw,18px) clamp(12px,2vw,15px)', height: '100%', transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)' }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(212,175,55,0.32)'; el.style.boxShadow = '0 6px 20px rgba(212,175,55,0.07)'; el.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(10,37,64,0.09)'; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)'; }}>
                  <div style={{ fontSize: 'clamp(1.3rem,3.5vw,1.65rem)', marginBottom: 8 }}>{item.e}</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 'clamp(0.83rem,2vw,0.95rem)', color: '#0a2540', marginBottom: 3 }}>{item.t}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.44)', fontSize: 'clamp(0.7rem,1.5vw,0.78rem)', lineHeight: 1.6 }}>{item.d}</p>
                  <div style={{ marginTop: 9, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.57rem', color: 'rgba(212,175,55,0.55)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Explore →</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Pills */}
        <Reveal delay={0.04}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
            {PILLS.map(([l, h]) => (
              <Link key={l} to={h} style={{ padding: '5px 11px', background: 'rgba(10,37,64,0.04)', border: '1px solid rgba(10,37,64,0.09)', borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 'clamp(0.62rem,1.3vw,0.7rem)', color: 'rgba(10,37,64,0.52)', textDecoration: 'none', transition: 'all 0.16s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)'; e.currentTarget.style.color = '#b8941e'; e.currentTarget.style.background = 'rgba(212,175,55,0.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,37,64,0.09)'; e.currentTarget.style.color = 'rgba(10,37,64,0.52)'; e.currentTarget.style.background = 'rgba(10,37,64,0.04)'; }}>
                {l}
              </Link>
            ))}
          </div>
        </Reveal>

        {/* Scholar AI */}
        <Reveal>
          <Link to="/scholar" style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{ background: 'linear-gradient(120deg,#0a2540,#0d2e4d)', borderRadius: 16, padding: 'clamp(18px,3.5vw,28px) 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.22s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              <div>
                <div style={{ fontSize: 'clamp(1.3rem,3.5vw,1.7rem)', marginBottom: 6 }}>✨</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 'clamp(0.96rem,2.5vw,1.35rem)', color: '#ffffff', marginBottom: 4 }}>Ask Scholar AI</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.4)', fontSize: 'clamp(0.76rem,1.6vw,0.84rem)', maxWidth: 300, lineHeight: 1.75 }}>Islamic questions answered from Quran and Sunnah.</p>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#D4AF37', color: '#0a2540', padding: '10px 16px', borderRadius: 9, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(0.66rem,1.5vw,0.73rem)', textTransform: 'uppercase', letterSpacing: '0.09em', whiteSpace: 'nowrap', flexShrink: 0 }}>
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
            <div style={{ textAlign: 'center', marginBottom: 'clamp(24px,4vh,38px)' }}>
              <SBadge t={L.whyH} />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.3rem,3.5vw,2.3rem)', color: '#0a2540', marginBottom: 8 }}>Built for the Global Ummah</h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.48)', maxWidth: 340, margin: '0 auto', lineHeight: 1.8, fontSize: 'clamp(0.8rem,1.6vw,0.9rem)' }}>
                Accurate technology + verified Islamic knowledge. Free forever.
              </p>
            </div>
          </Reveal>

          <div className="home__why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
            {[
              { i: <Shield size={17} />, t: 'Scholar Verified', d: 'All content reviewed by qualified Islamic scholars.' },
              { i: <MapPin  size={17} />, t: 'GPS Precision',   d: 'Exact prayer times from your coordinates.' },
              { i: <Globe   size={17} />, t: '5 Languages',     d: 'EN, AR, FR, ES and Indonesian.' },
              { i: <Zap     size={17} />, t: 'Always Free',     d: '100% free, forever. No account needed.' },
            ].map(item => (
              <Reveal key={item.t}>
                <div style={{ background: '#ffffff', border: '1px solid rgba(10,37,64,0.08)', borderRadius: 13, padding: 'clamp(15px,2.5vw,20px) clamp(13px,2vw,17px)', transition: 'all 0.22s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; e.currentTarget.style.boxShadow = '0 5px 18px rgba(212,175,55,0.07)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,37,64,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ color: '#D4AF37', marginBottom: 9 }}>{item.i}</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 'clamp(0.84rem,1.8vw,0.95rem)', color: '#0a2540', marginBottom: 5 }}>{item.t}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: 'clamp(0.7rem,1.5vw,0.78rem)', color: 'rgba(10,37,64,0.5)', lineHeight: 1.7 }}>{item.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ FINAL CTA */}
      <section style={{ background: 'linear-gradient(160deg,#0a2540 0%,#071a2e 100%)', padding: 'clamp(44px,7vw,80px) 20px', textAlign: 'center' }}>
        <Reveal>
          <div style={{ maxWidth: 420, margin: '0 auto' }}>
            <div style={{ fontSize: 'clamp(1.8rem,4vw,2.2rem)', marginBottom: 12 }}>🌙</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.4rem,4vw,2.5rem)', color: '#ffffff', lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: 10 }}>
              Start your journey <span style={{ color: '#D4AF37' }}>today</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.42)', fontSize: 'clamp(0.82rem,1.7vw,0.95rem)', maxWidth: 290, margin: '0 auto 24px', lineHeight: 1.8 }}>
              Al Ummah AI — prayer times, Quran, Qibla, Zakat. Free forever.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/quran" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#D4AF37', color: '#0a2540', padding: '11px 18px', borderRadius: 9, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(0.68rem,1.5vw,0.75rem)', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', boxShadow: '0 5px 22px rgba(212,175,55,0.28)', transition: 'transform 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                <BookOpen size={13} /> {L.quranCta}
              </Link>
              <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)', color: '#ffffff', padding: '11px 18px', borderRadius: 9, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(0.68rem,1.5vw,0.75rem)', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)'; e.currentTarget.style.color = '#D4AF37'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)'; e.currentTarget.style.color = '#ffffff'; }}>
                {L.blogCta}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Desktop breakpoints for all grids ── */}
      <style>{`
        @media (min-width: 640px) {
          .home__tools-grid,
          .home__secondary-grid,
          .home__learn-grid,
          .home__why-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
