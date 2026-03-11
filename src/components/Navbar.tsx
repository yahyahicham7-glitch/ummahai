import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  X, Menu, Moon, Sun, Clock, Compass, BookOpen, Calculator,
  Star, PenLine, Sparkles, MapPin, ShoppingBag, Heart,
  Globe, Check, ChevronRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';

const MENU_ITEMS = [
  { label: 'Prayer Times', href: '/',        Icon: Clock,       desc: 'GPS-accurate · 5 daily prayers' },
  { label: 'Qibla Finder', href: '/qibla',   Icon: Compass,     desc: 'Real-time direction to Mecca'   },
  { label: 'Quran',        href: '/quran',   Icon: BookOpen,    desc: 'Full Quran with translations'   },
  { label: 'Zakat',        href: '/zakat',   Icon: Calculator,  desc: 'Calculator · 2026 Nisab rates'  },
  { label: 'Ramadan 2026', href: '/ramadan', Icon: Star,        desc: 'Complete guide & timetable'     },
  { label: 'Blog',         href: '/blog',    Icon: PenLine,     desc: 'Islamic articles & knowledge'   },
  { label: 'Scholar AI',   href: '/scholar', Icon: Sparkles,    desc: 'Ask any Islamic question'       },
  { label: 'Hajj Guide',   href: '/hajj',    Icon: MapPin,      desc: 'Pilgrimage essentials'          },
  { label: 'Store',        href: '/store',   Icon: ShoppingBag, desc: 'Premium Islamic products'       },
  { label: 'About',        href: '/about',   Icon: Heart,       desc: 'Our mission'                    },
];

const LANGS = [
  { code: 'en', native: 'English',  sub: 'English'   },
  { code: 'ar', native: 'العربية',  sub: 'Arabic'    },
  { code: 'fr', native: 'Français', sub: 'French'    },
  { code: 'es', native: 'Español',  sub: 'Spanish'   },
];

const DARK_PATHS = ['/', '/qibla', '/quran', '/zakat', '/hajj', '/ramadan', '/blog', '/scholar', '/store', '/about', '/halal-money'];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [dark,     setDark]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);   // ← real JS check, not CSS

  const { i18n } = useTranslation();
  const location = useLocation();
  const menuRef  = useRef<HTMLDivElement>(null);
  const langRef  = useRef<HTMLDivElement>(null);

  /* Detect mobile width with JS — no CSS dependency */
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

  useEffect(() => {
    document.body.style.backgroundColor = dark ? '#071a2e' : '#ffffff';
    document.body.style.color           = dark ? '#f0f4f8' : '#0a2540';
  }, [dark]);

  const pathBase    = '/' + location.pathname.split('/')[1];
  const hasDarkHero = DARK_PATHS.includes(location.pathname) || DARK_PATHS.includes(pathBase);
  const glass       = hasDarkHero && !scrolled;
  const curLang     = LANGS.find(l => i18n.language?.startsWith(l.code)) ?? LANGS[0];

  const textC   = glass ? '#ffffff' : '#0a2540';
  const borderC = glass ? 'rgba(255,255,255,0.18)' : 'rgba(10,37,64,0.11)';

  const iconBtn = (active = false): React.CSSProperties => ({
    width: 36, height: 36, borderRadius: 9, padding: 0, flexShrink: 0,
    border: `1px solid ${active ? (glass ? 'rgba(255,255,255,0.5)' : '#0a2540') : borderC}`,
    background: active ? (glass ? 'rgba(255,255,255,0.15)' : '#0a2540') : 'transparent',
    color: active ? '#ffffff' : textC,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'all 0.18s',
  });

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 400,
        height: isMobile ? 56 : 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '0 14px' : '0 clamp(20px,5vw,40px)',
        background: glass ? 'transparent' : 'rgba(255,255,255,0.97)',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'rgba(10,37,64,0.08)' : 'transparent'}`,
        transition: 'background 0.3s, border-color 0.3s',
      }}>

        {/* ── Logo ── */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div style={{
            width: isMobile ? 28 : 32, height: isMobile ? 28 : 32,
            borderRadius: 7, flexShrink: 0,
            background: glass ? 'rgba(212,175,55,0.15)' : '#0a2540',
            border: glass ? '1px solid rgba(212,175,55,0.3)' : 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s',
          }}>
            <span style={{ color: '#D4AF37', fontSize: isMobile ? '0.82rem' : '0.9rem', lineHeight: 1 }}>☽</span>
          </div>
          <span style={{
            fontFamily: "'Playfair Display',serif", fontWeight: 900,
            fontSize: isMobile ? '0.86rem' : '0.95rem',
            color: textC, letterSpacing: '-0.015em',
            whiteSpace: 'nowrap', transition: 'color 0.3s',
          }}>
            Al Ummah <span style={{ color: '#D4AF37' }}>AI</span>
          </span>
        </Link>

        {/* ── Right side ─────────────────────────────────────
            MOBILE:  [🌐 globe] [🌙 dark] [☰ menu]   — 3 items only
            DESKTOP: [🌐 globe] [🌙 dark] [Prayer Times CTA] [☰ menu]
        ───────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 6 : 8 }}>

          {/* Globe / Language */}
          <div ref={langRef} style={{ position: 'relative' }}>
            <button
              onClick={() => { setLangOpen(o => !o); setMenuOpen(false); }}
              aria-label="Select language"
              style={{
                ...iconBtn(langOpen),
                width: 'auto', padding: '0 10px', gap: 5,
                fontFamily: "'DM Sans',sans-serif",
                fontSize: '0.65rem', fontWeight: 800,
              }}>
              <Globe size={14} strokeWidth={1.8} />
              {/* On mobile just show globe icon, no code label */}
              {!isMobile && (
                <span style={{ letterSpacing: '0.04em' }}>
                  {curLang.code.toUpperCase()}
                </span>
              )}
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                    background: '#ffffff', borderRadius: 14,
                    border: '1px solid rgba(10,37,64,0.1)',
                    boxShadow: '0 16px 48px rgba(10,37,64,0.13)',
                    overflow: 'hidden', minWidth: 190, zIndex: 500,
                  }}>
                  <div style={{
                    padding: '10px 14px 8px',
                    borderBottom: '1px solid rgba(10,37,64,0.07)',
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontFamily: "'DM Sans',sans-serif", fontSize: '0.5rem',
                    fontWeight: 900, color: 'rgba(10,37,64,0.3)',
                    textTransform: 'uppercase', letterSpacing: '0.22em',
                  }}>
                    <Globe size={10} strokeWidth={2} /> Language
                  </div>
                  {LANGS.map(l => {
                    const active = i18n.language?.startsWith(l.code);
                    return (
                      <button key={l.code}
                        onClick={() => { i18n.changeLanguage(l.code); setLangOpen(false); }}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          width: '100%', padding: '10px 14px',
                          border: 'none', cursor: 'pointer', transition: 'background 0.13s',
                          background: active ? 'rgba(212,175,55,0.06)' : 'transparent',
                        }}
                        onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(10,37,64,0.03)'; }}
                        onMouseLeave={e => { if (!active) e.currentTarget.style.background = active ? 'rgba(212,175,55,0.06)' : 'transparent'; }}>
                        <div>
                          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', fontWeight: active ? 800 : 600, color: '#0a2540', lineHeight: 1.2 }}>
                            {l.native}
                          </div>
                          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.57rem', color: 'rgba(10,37,64,0.38)', marginTop: 1 }}>
                            {l.sub}
                          </div>
                        </div>
                        {active && <Check size={13} strokeWidth={2.5} style={{ color: '#D4AF37', flexShrink: 0 }} />}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark mode */}
          <button onClick={() => setDark(d => !d)} style={iconBtn()} aria-label="Dark mode">
            {dark ? <Sun size={14} strokeWidth={2} /> : <Moon size={14} strokeWidth={2} />}
          </button>

          {/* Prayer Times CTA — desktop ONLY, not rendered on mobile */}
          {!isMobile && (
            <Link to="/" style={{
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
          )}

          {/* Hamburger — always last, always visible */}
          <button
            onClick={() => { setMenuOpen(o => !o); setLangOpen(false); }}
            style={iconBtn(menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}>
            {menuOpen ? <X size={15} strokeWidth={2} /> : <Menu size={15} strokeWidth={2} />}
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════ MENU — vertical list */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ position: 'fixed', inset: 0, zIndex: 398, background: 'rgba(10,37,64,0.25)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMenuOpen(false)} />

            <motion.div ref={menuRef}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                top: isMobile ? 62 : 70,
                right: isMobile ? 10 : 'clamp(12px,5vw,40px)',
                left: isMobile ? 10 : 'auto',
                width: isMobile ? 'auto' : 380,
                zIndex: 399,
                background: '#ffffff',
                borderRadius: 18,
                border: '1px solid rgba(10,37,64,0.09)',
                boxShadow: '0 20px 64px rgba(10,37,64,0.14), 0 4px 16px rgba(10,37,64,0.06)',
                overflow: 'hidden',
              }}>

              {/* Vertical list */}
              <div style={{ padding: '8px' }}>
                {MENU_ITEMS.map((item, i) => (
                  <React.Fragment key={item.label}>
                    {/* Section dividers */}
                    {(i === 4 || i === 7) && (
                      <div style={{ margin: '4px 6px', borderTop: '1px solid rgba(10,37,64,0.06)' }} />
                    )}
                    <Link to={item.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 11,
                        padding: '8px 9px', borderRadius: 10,
                        textDecoration: 'none', transition: 'background 0.13s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(10,37,64,0.04)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                        background: 'rgba(10,37,64,0.05)',
                        border: '1px solid rgba(10,37,64,0.06)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <item.Icon size={15} strokeWidth={1.75} style={{ color: '#0a2540' }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.81rem', fontWeight: 700, color: '#0a2540', lineHeight: 1.25 }}>
                          {item.label}
                        </div>
                        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.61rem', color: 'rgba(10,37,64,0.4)', marginTop: 1 }}>
                          {item.desc}
                        </div>
                      </div>
                      <ChevronRight size={13} strokeWidth={2} style={{ color: 'rgba(10,37,64,0.2)', flexShrink: 0 }} />
                    </Link>
                  </React.Fragment>
                ))}
              </div>

              {/* Footer */}
              <div style={{
                padding: '10px 16px', background: '#f8f9fa',
                borderTop: '1px solid rgba(10,37,64,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
              }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.6rem', color: 'rgba(10,37,64,0.35)', fontWeight: 500 }}>
                  Free for 1.8 billion Muslims
                </span>
                <Link to="/" onClick={() => setMenuOpen(false)} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: '#0a2540', color: '#ffffff',
                  padding: '7px 13px', borderRadius: 8,
                  fontFamily: "'DM Sans',sans-serif", fontSize: '0.63rem', fontWeight: 800,
                  textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em',
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}>
                  <Clock size={11} strokeWidth={2} /> Prayer Times
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
