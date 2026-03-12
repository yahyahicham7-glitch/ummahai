import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  X, Menu, Clock, Compass, BookOpen,
  Star, PenLine, Sparkles, MapPin, ShoppingBag, Heart,
  Globe, Check, ChevronRight, Wallet
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';

export const DarkModeContext = React.createContext<{ dark: boolean; setDark: (v: boolean) => void }>({ dark: false, setDark: () => {} });

/* ─── Menu sections – translated via hook ───────────────── */
const MENU_T: Record<string, { s1: string; s2: string; s3: string;
  prayerTimes: string; qibla: string; quran: string; zakat: string; tasbih: string;
  ramadan: string; duas: string; blog: string; scholar: string;
  hajj: string; store: string; about: string; prayerCta: string; tagline: string; }> = {
  en: { s1:'Prayer & Worship', s2:'Learn & Grow', s3:'Explore', prayerTimes:'Prayer Times', qibla:'Qibla Finder', quran:'Quran', zakat:'Zakat', tasbih:'Tasbih Counter', ramadan:'Ramadan 2026', duas:'Daily Duas', blog:'Blog', scholar:'Scholar AI', hajj:'Hajj Guide', store:'Store', about:'About', prayerCta:'Prayer Times', tagline:'Free for 1.8 billion Muslims' },
  ar: { s1:'الصلاة والعبادة', s2:'التعلم والنمو', s3:'استكشف', prayerTimes:'أوقات الصلاة', qibla:'اتجاه القبلة', quran:'القرآن', zakat:'الزكاة', tasbih:'السبحة الرقمية', ramadan:'رمضان 2026', duas:'الأدعية اليومية', blog:'المدونة', scholar:'عالم الذكاء الاصطناعي', hajj:'دليل الحج', store:'المتجر', about:'من نحن', prayerCta:'أوقات الصلاة', tagline:'مجاناً لـ 1.8 مليار مسلم' },
  fr: { s1:'Prière & Adoration', s2:'Apprendre & Grandir', s3:'Explorer', prayerTimes:'Heures de Prière', qibla:'Direction Qibla', quran:'Coran', zakat:'Zakat', tasbih:'Compteur Tasbih', ramadan:'Ramadan 2026', duas:'Douaas Quotidiennes', blog:'Blog', scholar:'Scholar AI', hajj:'Guide Hajj', store:'Boutique', about:'À Propos', prayerCta:'Heures de Prière', tagline:'Gratuit pour 1,8 milliard de musulmans' },
  es: { s1:'Oración y Adoración', s2:'Aprender y Crecer', s3:'Explorar', prayerTimes:'Horarios de Oración', qibla:'Buscador de Qibla', quran:'Corán', zakat:'Zakat', tasbih:'Contador Tasbih', ramadan:'Ramadán 2026', duas:'Duas Diarias', blog:'Blog', scholar:'Scholar AI', hajj:'Guía Hajj', store:'Tienda', about:'Acerca de', prayerCta:'Horarios', tagline:'Gratis para 1800 millones de musulmanes' },
};

const LANGS = [
  { code: 'en', native: 'English',  sub: 'English'  },
  { code: 'ar', native: 'العربية',  sub: 'Arabic'   },
  { code: 'fr', native: 'Français', sub: 'French'   },
  { code: 'es', native: 'Español',  sub: 'Spanish'  },
];

const DARK_PATHS = ['/', '/quran', '/zakat', '/hajj', '/ramadan', '/blog', '/scholar', '/store', '/about', '/halal-money', '/duas', '/tasbih'];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 640 : false);

  const { i18n } = useTranslation();
  const location = useLocation();
  const menuRef  = useRef<HTMLDivElement>(null);
  const langRef  = useRef<HTMLDivElement>(null);

  const lang = (i18n.language?.slice(0, 2) || 'en') as string;
  const L = MENU_T[lang] || MENU_T.en;
  const isRTL = lang === 'ar';

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => { setMenuOpen(false); setLangOpen(false); }, [location]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
      if (langOpen && langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [menuOpen, langOpen]);

  const pathBase    = '/' + location.pathname.split('/')[1];
  const hasDarkHero = DARK_PATHS.includes(location.pathname) || DARK_PATHS.includes(pathBase);
  const glass       = hasDarkHero && !scrolled;

  const textC   = glass ? '#ffffff' : '#0a2540';
  const borderC = glass ? 'rgba(255,255,255,0.18)' : 'rgba(10,37,64,0.11)';
  const navBg   = glass ? 'transparent' : 'rgba(255,255,255,0.97)';

  const curLang = LANGS.find(l => i18n.language?.startsWith(l.code)) ?? LANGS[0];

  const iconBtn = (active = false): React.CSSProperties => ({
    width: 36, height: 36, borderRadius: 9, padding: 0, flexShrink: 0,
    border: `1px solid ${active ? (glass ? 'rgba(255,255,255,0.5)' : '#D4AF37') : borderC}`,
    background: active ? (glass ? 'rgba(255,255,255,0.15)' : 'rgba(212,175,55,0.15)') : 'transparent',
    color: active ? (glass ? '#ffffff' : '#D4AF37') : textC,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'all 0.18s',
  });

  const sections = [
    { title: L.s1, items: [
      { label: L.prayerTimes, href: '/prayer-times', Icon: Clock },
      { label: L.qibla,       href: '/qibla',        Icon: Compass },
      { label: L.quran,       href: '/quran',         Icon: BookOpen },
      { label: L.zakat,       href: '/zakat',         Icon: Wallet },
      { label: L.tasbih,      href: '/tasbih',        Icon: Star },
    ]},
    { title: L.s2, items: [
      { label: L.ramadan, href: '/ramadan', Icon: Star },
      { label: L.duas,    href: '/duas',    Icon: BookOpen },
      { label: L.blog,    href: '/blog',    Icon: PenLine },
      { label: L.scholar, href: '/scholar', Icon: Sparkles },
    ]},
    { title: L.s3, items: [
      { label: L.hajj,  href: '/hajj',  Icon: MapPin },
      { label: L.store, href: '/store', Icon: ShoppingBag },
      { label: L.about, href: '/about', Icon: Heart },
    ]},
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 400,
        height: isMobile ? 56 : 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '0 14px' : '0 clamp(20px,5vw,40px)',
        direction: isRTL ? 'rtl' : 'ltr',
        background: navBg,
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'rgba(10,37,64,0.08)' : 'transparent'}`,
        transition: 'background 0.3s, border-color 0.3s',
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {/* SVG logo mark */}
          <svg width={isMobile ? 26 : 30} height={isMobile ? 26 : 30} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="9" fill={glass ? 'rgba(212,175,55,0.15)' : '#0a2540'} />
            {/* crescent */}
            <path d="M27 20a10 10 0 1 1-10.6-9.97A7.5 7.5 0 0 0 27 20z" fill="#D4AF37" opacity="0.95"/>
            {/* star dot */}
            <circle cx="26" cy="14" r="2" fill="#D4AF37"/>
          </svg>
          <span style={{
            fontFamily: "'Playfair Display',serif", fontWeight: 900,
            fontSize: isMobile ? '0.86rem' : '0.95rem',
            color: textC, letterSpacing: '-0.015em', whiteSpace: 'nowrap', transition: 'color 0.3s',
          }}>
            Al Ummah <span style={{ color: '#D4AF37' }}>AI</span>
          </span>
        </Link>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 6 : 8 }}>

          {/* Language picker */}
          <div ref={langRef} style={{ position: 'relative' }}>
            <button
              onClick={() => { setLangOpen(o => !o); setMenuOpen(false); }}
              aria-label="Language"
              style={{ ...iconBtn(langOpen), width: 'auto', padding: '0 10px', gap: 5, fontFamily: "'DM Sans',sans-serif", fontSize: '0.65rem', fontWeight: 800 }}>
              <Globe size={14} strokeWidth={1.8} />
              {!isMobile && <span>{curLang.code.toUpperCase()}</span>}
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: isRTL ? 'auto' : 0, left: isRTL ? 0 : 'auto',
                    background: '#ffffff', borderRadius: 14,
                    border: '1px solid rgba(10,37,64,0.1)',
                    boxShadow: '0 16px 48px rgba(10,37,64,0.13)',
                    overflow: 'hidden', minWidth: 190, zIndex: 500,
                  }}>
                  <div style={{ padding: '10px 14px 8px', borderBottom: '1px solid rgba(10,37,64,0.07)', display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'DM Sans',sans-serif", fontSize: '0.5rem', fontWeight: 900, color: 'rgba(10,37,64,0.3)', textTransform: 'uppercase', letterSpacing: '0.22em' }}>
                    <Globe size={10} strokeWidth={2} /> Language
                  </div>
                  {LANGS.map(l => {
                    const active = i18n.language?.startsWith(l.code);
                    return (
                      <button key={l.code}
                        onClick={() => { i18n.changeLanguage(l.code); setLangOpen(false); }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '10px 14px', border: 'none', cursor: 'pointer', transition: 'background 0.13s', background: active ? 'rgba(212,175,55,0.06)' : 'transparent', direction: l.code === 'ar' ? 'rtl' : 'ltr' }}
                        onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(10,37,64,0.03)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = active ? 'rgba(212,175,55,0.06)' : 'transparent'; }}>
                        <div>
                          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', fontWeight: active ? 800 : 600, color: '#0a2540' }}>{l.native}</div>
                          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.57rem', color: 'rgba(10,37,64,0.38)', marginTop: 1 }}>{l.sub}</div>
                        </div>
                        {active && <Check size={13} strokeWidth={2.5} style={{ color: '#D4AF37', flexShrink: 0 }} />}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Prayer Times CTA — desktop only */}
          {!isMobile && (
            <Link to="/prayer-times" style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#D4AF37', color: '#0a2540',
              padding: '7px 14px', borderRadius: 8,
              fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.68rem',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
              boxShadow: '0 3px 12px rgba(212,175,55,0.3)', transition: 'transform 0.18s',
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              <Clock size={13} strokeWidth={2} /> {L.prayerCta}
            </Link>
          )}

          {/* Hamburger */}
          <button
            onClick={() => { setMenuOpen(o => !o); setLangOpen(false); }}
            style={iconBtn(menuOpen)}
            aria-label="Menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={15} strokeWidth={2} /> : <Menu size={15} strokeWidth={2} />}
          </button>
        </div>
      </nav>

      {/* Dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ position: 'fixed', inset: 0, zIndex: 398, background: 'rgba(10,37,64,0.35)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMenuOpen(false)} />

            <motion.div ref={menuRef}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                top: isMobile ? 62 : 70,
                right: isRTL ? 'auto' : (isMobile ? 10 : 'clamp(12px,5vw,40px)'),
                left:  isRTL ? (isMobile ? 10 : 'clamp(12px,5vw,40px)') : (isMobile ? 10 : 'auto'),
                width: isMobile ? 'auto' : 320,
                zIndex: 399,
                background: 'linear-gradient(160deg,#0d2a45,#0a2540)',
                borderRadius: 18,
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 24px 72px rgba(0,0,0,0.35)',
                overflow: 'hidden',
                direction: isRTL ? 'rtl' : 'ltr',
              }}>

              <div style={{ padding: '10px 10px 6px' }}>
                {sections.map((section, si) => (
                  <div key={section.title}>
                    <div style={{ padding: '8px 10px 5px', marginTop: si > 0 ? 4 : 0 }}>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.5rem', fontWeight: 900, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.24em' }}>
                        {section.title}
                      </span>
                    </div>
                    {section.items.map(item => (
                      <Link key={item.label} to={item.href}
                        onClick={() => setMenuOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '8px 10px', borderRadius: 10, textDecoration: 'none', transition: 'background 0.13s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <item.Icon size={14} strokeWidth={1.75} style={{ color: '#D4AF37' }} />
                        </div>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>
                          {item.label}
                        </span>
                        <ChevronRight size={12} strokeWidth={2} style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0, marginLeft: isRTL ? 0 : 'auto', marginRight: isRTL ? 'auto' : 0, transform: isRTL ? 'rotate(180deg)' : 'none' }} />
                      </Link>
                    ))}
                    {si < sections.length - 1 && (
                      <div style={{ margin: '6px 10px', borderTop: '1px solid rgba(255,255,255,0.06)' }} />
                    )}
                  </div>
                ))}
              </div>

              <div style={{ padding: '10px 16px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', fontWeight: 500 }}>
                  {L.tagline}
                </span>
                <Link to="/prayer-times" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#D4AF37', color: '#0a2540', padding: '7px 13px', borderRadius: 8, fontFamily: "'DM Sans',sans-serif", fontSize: '0.63rem', fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  <Clock size={11} strokeWidth={2} /> {L.prayerCta}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
