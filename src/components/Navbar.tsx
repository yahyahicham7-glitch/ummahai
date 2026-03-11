import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu, Moon, Sun, Clock, Compass, BookOpen, Calculator, Star, Hand, PenLine, Sparkles, MapPin, ShoppingBag, Heart, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';

/* ─── Icons for menu items (no emojis) ───────────────────── */
const GROUPS = [
  {
    group: 'Worship',
    items: [
      { label: 'Prayer Times', href: '/',       Icon: Clock,      desc: 'GPS-accurate daily prayers' },
      { label: 'Qibla Finder', href: '/qibla',  Icon: Compass,    desc: 'Direction to Mecca' },
      { label: 'Quran',        href: '/quran',  Icon: BookOpen,   desc: 'Read & listen with audio' },
      { label: 'Zakat',        href: '/zakat',  Icon: Calculator, desc: 'Calculate your obligation' },
    ],
  },
  {
    group: 'Learn',
    items: [
      { label: 'Ramadan',    href: '/ramadan',                     Icon: Star,     desc: 'Complete 2026 guide' },
      { label: 'Daily Duas', href: '/blog/morning-evening-adhkar', Icon: Hand,     desc: 'Morning & evening supplications' },
      { label: 'Articles',   href: '/blog',                        Icon: PenLine,  desc: 'Islamic guides & knowledge' },
      { label: 'Scholar AI', href: '/scholar',                     Icon: Sparkles, desc: 'Ask any Islamic question' },
    ],
  },
  {
    group: 'Explore',
    items: [
      { label: 'Hajj Guide',    href: '/hajj',                       Icon: MapPin,      desc: 'Pilgrimage essentials' },
      { label: 'Islamic Store', href: '/store',                      Icon: ShoppingBag, desc: 'Premium Islamic products' },
      { label: 'About',         href: '/about',                      Icon: Heart,       desc: 'Our mission' },
      { label: 'Contact',       href: 'mailto:contact@alummahai.com', Icon: Mail,        desc: 'Get in touch' },
    ],
  },
];

/* Language options — no flags, clean text only */
const LANGS = [
  { code: 'en', label: 'EN', name: 'English'  },
  { code: 'ar', label: 'ع',  name: 'العربية'  },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'es', label: 'ES', name: 'Español'  },
];

const DARK_PATHS = ['/', '/qibla', '/quran', '/zakat', '/hajj', '/ramadan', '/blog', '/scholar', '/store', '/about', '/halal-money'];

/* ─── Component ───────────────────────────────────────────── */
export function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [dark,     setDark]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { i18n }   = useTranslation();
  const location   = useLocation();
  const panelRef   = useRef<HTMLDivElement>(null);

  useEffect(() => { setOpen(false); }, [location]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (!open) return;
    const fn = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [open]);

  useEffect(() => {
    document.body.style.backgroundColor = dark ? '#071a2e' : '#ffffff';
    document.body.style.color           = dark ? '#f0f4f8' : '#0a2540';
  }, [dark]);

  const pathBase    = '/' + location.pathname.split('/')[1];
  const hasDarkHero = DARK_PATHS.includes(location.pathname) || DARK_PATHS.includes(pathBase);
  const glass       = hasDarkHero && !scrolled;

  const curLang = LANGS.find(l => i18n.language?.startsWith(l.code)) ?? LANGS[0];

  /* Color tokens */
  const textC   = glass ? '#ffffff' : '#0a2540';
  const borderC = glass ? 'rgba(255,255,255,0.15)' : 'rgba(10,37,64,0.1)';
  const activeBorder = glass ? 'rgba(255,255,255,0.5)' : '#0a2540';

  const iconBtn = (active = false): React.CSSProperties => ({
    width: 36, height: 36, borderRadius: 9,
    border: `1px solid ${active ? activeBorder : borderC}`,
    background: active
      ? (glass ? 'rgba(255,255,255,0.15)' : '#0a2540')
      : 'transparent',
    color: active ? '#ffffff' : textC,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'all 0.18s', padding: 0, flexShrink: 0,
  });

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 400,
        background: glass ? 'transparent' : 'rgba(255,255,255,0.97)',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'rgba(10,37,64,0.08)' : 'transparent'}`,
        transition: 'background 0.3s, border-color 0.3s',
      }}>

        {/*
         * INNER ROW — explicit height so nothing collapses on mobile.
         * Mobile: 56px, Desktop (≥640px): 64px via CSS at bottom.
         */}
        <div style={{
          height: 56,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 16px',
        }} className="nav-inner">

          {/* ── Logo ── */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 7,
              background: glass ? 'rgba(212,175,55,0.15)' : '#0a2540',
              border: glass ? '1px solid rgba(212,175,55,0.3)' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s', flexShrink: 0,
            }}>
              <span style={{ color: '#D4AF37', fontSize: '0.9rem', lineHeight: 1 }}>☽</span>
            </div>
            <span style={{
              fontFamily: "'Playfair Display',serif", fontWeight: 900,
              fontSize: '0.92rem', color: textC,
              letterSpacing: '-0.015em', whiteSpace: 'nowrap',
              transition: 'color 0.3s',
            }}>
              Al Ummah <span style={{ color: '#D4AF37' }}>AI</span>
            </span>
          </Link>

          {/* ── Right controls ──────────────────────────────────────
              Mobile  (< 640px):  [lang-pill] [dark] [hamburger]
              Desktop (≥ 640px):  [lang-pill] [dark] [CTA] [hamburger]

              The hamburger is ALWAYS the last item and ALWAYS visible.
              On mobile we hide the CTA via .nav-cta { display:none }
           ─────────────────────────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>

            {/* Language pill — text only, no flags, no dropdown */}
            <div style={{
              display: 'flex', gap: 1,
              background: glass ? 'rgba(255,255,255,0.08)' : 'rgba(10,37,64,0.05)',
              border: `1px solid ${borderC}`,
              borderRadius: 9, padding: '3px',
            }}>
              {LANGS.map(l => {
                const active = i18n.language?.startsWith(l.code);
                return (
                  <button key={l.code}
                    onClick={() => i18n.changeLanguage(l.code)}
                    title={l.name}
                    style={{
                      padding: '3px 7px', borderRadius: 6, border: 'none',
                      cursor: 'pointer', transition: 'all 0.15s',
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: '0.66rem', fontWeight: 800,
                      background: active
                        ? (glass ? '#D4AF37' : '#0a2540')
                        : 'transparent',
                      color: active
                        ? (glass ? '#0a2540' : '#ffffff')
                        : (glass ? 'rgba(255,255,255,0.45)' : 'rgba(10,37,64,0.38)'),
                    }}>
                    {l.label}
                  </button>
                );
              })}
            </div>

            {/* Dark mode */}
            <button onClick={() => setDark(d => !d)} style={iconBtn()} aria-label="Dark mode">
              {dark ? <Sun size={14} strokeWidth={2} /> : <Moon size={14} strokeWidth={2} />}
            </button>

            {/* CTA — desktop only */}
            <Link to="/" className="nav-cta" style={{
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
              <Clock size={13} strokeWidth={2} /> Prayer Times
            </Link>

            {/* Hamburger — ALWAYS visible, ALWAYS last */}
            <button
              onClick={() => setOpen(o => !o)}
              style={iconBtn(open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}>
              {open
                ? <X    size={15} strokeWidth={2} />
                : <Menu size={15} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════ MENU PANEL */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ position: 'fixed', inset: 0, zIndex: 398, background: 'rgba(10,37,64,0.28)', backdropFilter: 'blur(4px)' }}
              onClick={() => setOpen(false)} />

            {/* Panel */}
            <motion.div ref={panelRef}
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                top: 62,
                right: 12, left: 12,
                zIndex: 399,
                maxWidth: 580,
                marginLeft: 'auto',
                background: '#ffffff',
                borderRadius: 18,
                border: '1px solid rgba(10,37,64,0.09)',
                boxShadow: '0 24px 80px rgba(10,37,64,0.15), 0 4px 16px rgba(10,37,64,0.07)',
                overflow: 'hidden',
              }}>

              {/* 3-col grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 0,
              }}>
                {GROUPS.map((section, si) => (
                  <div key={section.group} style={{
                    padding: '18px 14px 14px',
                    borderRight: si < 2 ? '1px solid rgba(10,37,64,0.06)' : 'none',
                  }}>
                    {/* Group label */}
                    <div style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: '0.5rem', fontWeight: 900,
                      color: 'rgba(10,37,64,0.28)',
                      textTransform: 'uppercase', letterSpacing: '0.25em',
                      marginBottom: 8, paddingBottom: 8,
                      borderBottom: '1px solid rgba(10,37,64,0.06)',
                    }}>
                      {section.group}
                    </div>

                    {/* Items */}
                    {section.items.map(item => (
                      <Link key={item.label} to={item.href}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '8px 8px', borderRadius: 9,
                          textDecoration: 'none', transition: 'background 0.13s',
                          marginBottom: 1,
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(10,37,64,0.04)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>

                        {/* Icon circle */}
                        <div style={{
                          width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                          background: 'rgba(10,37,64,0.05)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'background 0.13s',
                        }}>
                          <item.Icon size={14} strokeWidth={1.8} style={{ color: '#0a2540' }} />
                        </div>

                        <div style={{ minWidth: 0 }}>
                          <div style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: '0.79rem', fontWeight: 700,
                            color: '#0a2540', lineHeight: 1.25,
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                          }}>
                            {item.label}
                          </div>
                          <div style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: '0.59rem', color: 'rgba(10,37,64,0.4)',
                            marginTop: 1, lineHeight: 1.35,
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                          }}>
                            {item.desc}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div style={{
                padding: '11px 18px',
                background: '#f8f9fa',
                borderTop: '1px solid rgba(10,37,64,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
              }}>
                <span style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: '0.62rem', color: 'rgba(10,37,64,0.35)', fontWeight: 500,
                }}>
                  Free for 1.8 billion Muslims worldwide
                </span>
                <Link to="/" onClick={() => setOpen(false)} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: '#0a2540', color: '#ffffff',
                  padding: '7px 14px', borderRadius: 8,
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: '0.64rem', fontWeight: 800,
                  textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em',
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}>
                  <Clock size={12} strokeWidth={2} /> Prayer Times
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Responsive CSS ── */}
      <style>{`
        /* Desktop: taller nav, wider padding, show CTA */
        @media (min-width: 640px) {
          .nav-inner {
            height: 64px !important;
            padding-left:  clamp(20px, 5vw, 40px) !important;
            padding-right: clamp(20px, 5vw, 40px) !important;
          }
          .nav-cta { display: flex !important; }
        }

        /* Mobile: hide CTA */
        @media (max-width: 639px) {
          .nav-cta { display: none !important; }
        }

        /* Mobile menu: stack columns */
        @media (max-width: 479px) {
          .menu-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
