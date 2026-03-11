import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu, Moon, Sun, Globe, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';

const MENU = [
  { col: 'Worship', items: [
    { title: 'Prayer Times', to: '/',      emoji: '🕐', sub: 'GPS · Live' },
    { title: 'Qibla Finder', to: '/qibla', emoji: '🧭', sub: 'Mecca direction' },
    { title: 'Quran',        to: '/quran', emoji: '📖', sub: 'Read & translate' },
    { title: 'Zakat',        to: '/zakat', emoji: '💛', sub: '2026 Nisab' },
  ]},
  { col: 'Learn', items: [
    { title: 'Ramadan 2026', to: '/ramadan',                     emoji: '🌙', sub: 'Complete guide' },
    { title: 'Daily Duas',   to: '/blog/morning-evening-adhkar', emoji: '🤲', sub: 'Morning & evening' },
    { title: 'Blog',         to: '/blog',                        emoji: '✍️', sub: 'Articles & guides' },
    { title: 'Scholar AI',   to: '/scholar',                     emoji: '✨', sub: 'Ask anything' },
  ]},
  { col: 'More', items: [
    { title: 'Hajj Guide',    to: '/hajj',       emoji: '🕋', sub: 'Pilgrimage' },
    { title: 'Islamic Store', to: '/store',       emoji: '🛍️', sub: 'Products' },
    { title: 'Halal Finance', to: '/halal-money', emoji: '💰', sub: 'Investing' },
    { title: 'About',         to: '/about',       emoji: '💎', sub: 'Our mission' },
  ]},
];

const LANGS = [
  { code: 'en', flag: '🇬🇧', name: 'English',  label: 'EN' },
  { code: 'ar', flag: '🇸🇦', name: 'العربية',  label: 'ع'  },
  { code: 'fr', flag: '🇫🇷', name: 'Français', label: 'FR' },
  { code: 'es', flag: '🇪🇸', name: 'Español',  label: 'ES' },
];

const NAVY_PAGES = ['/','/qibla','/quran','/zakat','/hajj','/ramadan','/blog','/scholar','/store','/about','/halal-money'];

export function Navbar() {
  const loc      = useLocation();
  const { i18n } = useTranslation();
  const menuRef  = useRef<HTMLDivElement>(null);
  const langRef  = useRef<HTMLDivElement>(null);

  const [open,     setOpen]     = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark,     setDark]     = useState(false);

  const base     = '/' + loc.pathname.split('/')[1];
  const isNavy   = NAVY_PAGES.includes(loc.pathname) || NAVY_PAGES.includes(base);
  const glass    = isNavy && !scrolled;
  const curLang  = LANGS.find(l => i18n.language.startsWith(l.code)) ?? LANGS[0];

  useEffect(() => { setOpen(false); setLangOpen(false); }, [loc.pathname]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 6);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setScrolled(window.scrollY > 6); }, [loc.pathname]);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (open     && menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
      if (langOpen && langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [open, langOpen]);

  useEffect(() => {
    document.body.style.background = dark ? '#071a2e' : '#ffffff';
    document.body.style.color      = dark ? '#f0f4f8' : '#0a2540';
  }, [dark]);

  /* ── Color tokens ────────────────────────────────────── */
  const C = {
    bg:     glass ? 'transparent'            : 'rgba(255,255,255,0.97)',
    blur:   glass ? 'none'                   : 'blur(20px) saturate(180%)',
    bdr:    glass ? 'rgba(255,255,255,0.1)'  : 'rgba(10,37,64,0.08)',
    text:   glass ? '#ffffff'                : '#0a2540',
    ibdr:   glass ? 'rgba(255,255,255,0.2)'  : 'rgba(10,37,64,0.12)',
    logoBg: glass ? 'rgba(212,175,55,0.15)'  : '#0a2540',
    logoBr: glass ? '1px solid rgba(212,175,55,0.35)' : 'none',
  };

  const iconBtn = (active = false): React.CSSProperties => ({
    width: 34, height: 34, borderRadius: 8, padding: 0, flexShrink: 0,
    border: `1px solid ${active ? (glass ? 'rgba(255,255,255,0.5)' : '#0a2540') : C.ibdr}`,
    background: active ? (glass ? 'rgba(255,255,255,0.18)' : '#0a2540') : 'transparent',
    color: active ? '#ffffff' : C.text,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'all 0.18s',
  });

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 400,
        height: 56,   /* single fixed height — clean on all screens */
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px',
        background: C.bg,
        backdropFilter: C.blur, WebkitBackdropFilter: C.blur,
        borderBottom: `1px solid ${C.bdr}`,
        transition: 'background 0.28s ease, border-color 0.28s ease',
      }}>

        {/* ── Logo ─────────────────────────────────── */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6, flexShrink: 0,
            background: C.logoBg, border: C.logoBr,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.28s',
          }}>
            <span style={{ color: '#D4AF37', fontSize: '0.82rem' }}>☽</span>
          </div>
          <div style={{ lineHeight: 1 }}>
            <div style={{
              fontFamily: "'Playfair Display',serif", fontWeight: 900,
              fontSize: '0.88rem', color: C.text,
              letterSpacing: '-0.01em', whiteSpace: 'nowrap',
              transition: 'color 0.28s',
            }}>
              Al Ummah <span style={{ color: '#D4AF37' }}>AI</span>
            </div>
          </div>
        </Link>

        {/* ── Right: ONLY 3 controls on mobile ─────── */}
        {/* Desktop gets Prayer Times CTA too via media query */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>

          {/* Language selector */}
          <div ref={langRef} style={{ position: 'relative' }}>
            <button
              onClick={() => { setLangOpen(o => !o); setOpen(false); }}
              aria-label="Language"
              style={{ ...iconBtn(langOpen), width: 'auto', padding: '0 9px', gap: 4, fontFamily: "'DM Sans',sans-serif", fontSize: '0.66rem', fontWeight: 700 }}>
              <Globe size={12} strokeWidth={2.2} />
              <span style={{ fontSize: '0.88rem' }}>{curLang.flag}</span>
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                    background: '#ffffff', borderRadius: 14,
                    border: '1px solid rgba(10,37,64,0.1)',
                    boxShadow: '0 16px 48px rgba(10,37,64,0.15)',
                    overflow: 'hidden', minWidth: 158, zIndex: 500,
                  }}>
                  {LANGS.map(l => {
                    const active = i18n.language.startsWith(l.code);
                    return (
                      <button key={l.code}
                        onClick={() => { i18n.changeLanguage(l.code); setLangOpen(false); }}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          width: '100%', padding: '11px 14px', border: 'none',
                          background: active ? 'rgba(212,175,55,0.07)' : 'transparent',
                          cursor: 'pointer', transition: 'background 0.12s',
                        }}
                        onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(10,37,64,0.04)'; }}
                        onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: '1rem' }}>{l.flag}</span>
                          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.84rem', fontWeight: 600, color: '#0a2540' }}>{l.name}</span>
                        </div>
                        {active && <Check size={13} style={{ color: '#D4AF37' }} />}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark mode */}
          <button onClick={() => setDark(d => !d)} style={iconBtn()} aria-label="Dark mode">
            {dark ? <Sun size={13} strokeWidth={2.2} /> : <Moon size={13} strokeWidth={2.2} />}
          </button>

          {/* Prayer Times CTA — desktop only, injected via CSS */}
          <Link to="/" className="nav-cta" style={{
            display: 'none',   /* hidden by default (mobile) */
            alignItems: 'center', gap: 5,
            background: '#D4AF37', color: '#0a2540',
            padding: '7px 13px', borderRadius: 7,
            fontFamily: "'DM Sans',sans-serif", fontWeight: 800,
            fontSize: '0.67rem', textTransform: 'uppercase', letterSpacing: '0.09em',
            textDecoration: 'none', whiteSpace: 'nowrap',
            boxShadow: '0 2px 10px rgba(212,175,55,0.3)', transition: 'transform 0.15s',
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
            🕐 Prayer Times
          </Link>

          {/* Hamburger — always visible, always last */}
          <button
            onClick={() => { setOpen(o => !o); setLangOpen(false); }}
            style={iconBtn(open)}
            aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X size={14} strokeWidth={2.2} /> : <Menu size={14} strokeWidth={2.2} />}
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════ MENU PANEL */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ position: 'fixed', inset: 0, zIndex: 398, background: 'rgba(10,37,64,0.3)', backdropFilter: 'blur(4px)' }}
              onClick={() => setOpen(false)} />

            <motion.div ref={menuRef}
              initial={{ opacity: 0, y: -8, scale: 0.975 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.975 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                top: 62,
                right: 10, left: 10,
                zIndex: 399,
                maxWidth: 560, marginLeft: 'auto',
                background: '#ffffff',
                borderRadius: 16,
                border: '1px solid rgba(10,37,64,0.1)',
                boxShadow: '0 20px 60px rgba(10,37,64,0.16)',
                overflow: 'hidden',
              }}>

              {/* Menu columns — 1 col on small mobile, 3 col on desktop */}
              <div className="menu-grid">
                {MENU.map((col, ci) => (
                  <div key={col.col} className={`menu-col ${ci < 2 ? 'menu-col-border' : ''}`}>
                    <div style={{
                      fontFamily: "'DM Sans',sans-serif", fontSize: '0.52rem', fontWeight: 800,
                      color: 'rgba(10,37,64,0.3)', textTransform: 'uppercase', letterSpacing: '0.22em',
                      marginBottom: 6, paddingBottom: 6, borderBottom: '1px solid rgba(10,37,64,0.06)',
                    }}>
                      {col.col}
                    </div>
                    <div className="menu-items">
                      {col.items.map(item => (
                        <Link key={item.title} to={item.to}
                          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px', borderRadius: 8, textDecoration: 'none', transition: 'background 0.12s' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.08)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                          <span style={{ fontSize: '1rem', flexShrink: 0 }}>{item.emoji}</span>
                          <div>
                            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.79rem', fontWeight: 700, color: '#0a2540', lineHeight: 1.2 }}>{item.title}</div>
                            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.59rem', color: 'rgba(10,37,64,0.42)', marginTop: 1 }}>{item.sub}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div style={{
                padding: '10px 16px', background: '#f7f8fa',
                borderTop: '1px solid rgba(10,37,64,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
              }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.62rem', color: 'rgba(10,37,64,0.36)', fontWeight: 500 }}>
                  🌍 Free for 1.8B Muslims
                </span>
                <Link to="/" onClick={() => setOpen(false)} style={{
                  background: '#0a2540', color: '#ffffff',
                  padding: '6px 13px', borderRadius: 6,
                  fontFamily: "'DM Sans',sans-serif", fontSize: '0.63rem', fontWeight: 800,
                  textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.07em',
                }}>
                  🕐 Prayer Times
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        /* Desktop: show Prayer Times CTA, larger nav padding */
        @media (min-width: 640px) {
          nav { height: 62px !important; padding: 0 clamp(20px,5vw,40px) !important; }
          .nav-cta { display: flex !important; }
        }

        /* Menu: stacked on mobile, 3-col on desktop */
        .menu-grid {
          display: flex;
          flex-direction: column;
        }
        @media (min-width: 480px) {
          .menu-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
          }
          .menu-col-border {
            border-right: 1px solid rgba(10,37,64,0.06);
          }
        }

        /* Menu col padding */
        .menu-col {
          padding: 14px 13px 12px;
          border-bottom: 1px solid rgba(10,37,64,0.06);
        }
        @media (min-width: 480px) {
          .menu-col { border-bottom: none; }
        }

        /* Menu items: 2-col grid on small mobile for faster scanning */
        .menu-items {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
        }
        @media (min-width: 480px) {
          .menu-items { display: flex; flex-direction: column; gap: 0; }
        }
      `}</style>
    </>
  );
}
