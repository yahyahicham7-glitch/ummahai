import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu, Moon, Sun, Globe, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';

const MENU = [
  { col: 'Worship', items: [
    { title: 'Prayer Times', to: '/',      emoji: '🕐', sub: 'GPS · Live' },
    { title: 'Qibla Finder', to: '/qibla', emoji: '🧭', sub: 'Direction to Mecca' },
    { title: 'Quran',        to: '/quran', emoji: '📖', sub: 'Read & translate' },
    { title: 'Zakat',        to: '/zakat', emoji: '💛', sub: '2026 Nisab' },
  ]},
  { col: 'Learn', items: [
    { title: 'Ramadan 2026', to: '/ramadan',                     emoji: '🌙', sub: 'Complete guide' },
    { title: 'Daily Duas',   to: '/blog/morning-evening-adhkar', emoji: '🤲', sub: 'Morning & evening' },
    { title: 'Blog',         to: '/blog',                        emoji: '✍️', sub: 'Articles & guides' },
    { title: 'Scholar AI',   to: '/scholar',                     emoji: '✨', sub: 'Ask any question' },
  ]},
  { col: 'More', items: [
    { title: 'Hajj Guide',    to: '/hajj',         emoji: '🕋', sub: 'Pilgrimage' },
    { title: 'Islamic Store', to: '/store',         emoji: '🛍️', sub: 'Products' },
    { title: 'Halal Finance', to: '/halal-money',   emoji: '💰', sub: 'Investing' },
    { title: 'About',         to: '/about',         emoji: '💎', sub: 'Our mission' },
  ]},
];

const LANGS = [
  { code: 'en', label: 'EN', name: 'English',   flag: '🇬🇧' },
  { code: 'ar', label: 'ع',  name: 'العربية',   flag: '🇸🇦' },
  { code: 'fr', label: 'FR', name: 'Français',  flag: '🇫🇷' },
  { code: 'es', label: 'ES', name: 'Español',   flag: '🇪🇸' },
];

const DARK_ROUTES = ['/','/qibla','/quran','/zakat','/hajj','/ramadan','/blog','/scholar','/store','/about','/halal-money'];

export function Navbar() {
  const loc      = useLocation();
  const { i18n } = useTranslation();
  const menuRef  = useRef<HTMLDivElement>(null);
  const langRef  = useRef<HTMLDivElement>(null);

  const [open,     setOpen]     = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark,     setDark]     = useState(false);

  const base   = '/' + loc.pathname.split('/')[1];
  const isNavy = DARK_ROUTES.includes(loc.pathname) || DARK_ROUTES.includes(base);
  const glass  = isNavy && !scrolled;

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

  const C = {
    bg:    glass ? 'transparent'           : 'rgba(255,255,255,0.97)',
    blur:  glass ? 'none'                  : 'blur(20px) saturate(180%)',
    bdr:   glass ? 'rgba(255,255,255,0.1)' : 'rgba(10,37,64,0.08)',
    text:  glass ? '#ffffff'               : '#0a2540',
    sub:   glass ? 'rgba(255,255,255,0.4)' : 'rgba(10,37,64,0.4)',
    ibdr:  glass ? 'rgba(255,255,255,0.2)' : 'rgba(10,37,64,0.12)',
    logoBg: glass ? 'rgba(212,175,55,0.15)' : '#0a2540',
    logoBr: glass ? '1px solid rgba(212,175,55,0.35)' : 'none',
  };

  const currentLang = LANGS.find(l => i18n.language.startsWith(l.code)) || LANGS[0];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 400, height: 62,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(14px,5vw,40px)',
        background: C.bg, backdropFilter: C.blur, WebkitBackdropFilter: C.blur,
        borderBottom: `1px solid ${C.bdr}`,
        transition: 'background 0.28s ease, border-color 0.28s ease',
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: C.logoBg, border: C.logoBr, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.28s' }}>
            <span style={{ color: '#D4AF37', fontSize: '0.9rem' }}>☽</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: '0.92rem', color: C.text, letterSpacing: '-0.01em', lineHeight: 1.15, transition: 'color 0.28s' }}>
              Al Ummah <span style={{ color: '#D4AF37' }}>AI</span>
            </div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.44rem', fontWeight: 800, color: C.sub, letterSpacing: '0.24em', textTransform: 'uppercase', transition: 'color 0.28s' }}>
              Islamic Platform
            </div>
          </div>
        </Link>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>

          {/* 🌐 Language globe dropdown */}
          <div ref={langRef} style={{ position: 'relative' }}>
            <button
              onClick={() => { setLangOpen(o => !o); setOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: 5, height: 32, padding: '0 10px', borderRadius: 7, border: `1px solid ${C.ibdr}`, background: langOpen ? (glass ? 'rgba(255,255,255,0.15)' : '#0a2540') : 'transparent', color: langOpen ? '#ffffff' : C.text, cursor: 'pointer', transition: 'all 0.18s', fontFamily: "'DM Sans',sans-serif", fontSize: '0.68rem', fontWeight: 700 }}
              aria-label="Select language">
              <Globe size={13} />
              <span>{currentLang.flag} {currentLang.label}</span>
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: '#ffffff', borderRadius: 14, border: '1px solid rgba(10,37,64,0.1)', boxShadow: '0 16px 48px rgba(10,37,64,0.15)', overflow: 'hidden', minWidth: 160, zIndex: 500 }}>
                  {LANGS.map(l => {
                    const active = i18n.language.startsWith(l.code);
                    return (
                      <button key={l.code}
                        onClick={() => { i18n.changeLanguage(l.code); setLangOpen(false); }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '11px 14px', border: 'none', background: active ? 'rgba(212,175,55,0.07)' : 'transparent', cursor: 'pointer', transition: 'background 0.12s' }}
                        onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(10,37,64,0.04)'; }}
                        onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: '1rem' }}>{l.flag}</span>
                          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.84rem', fontWeight: 600, color: '#0a2540' }}>{l.name}</span>
                        </div>
                        {active && <Check size={13} style={{ color: '#D4AF37', flexShrink: 0 }} />}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark mode */}
          <button onClick={() => setDark(d => !d)}
            style={{ width: 32, height: 32, borderRadius: 7, border: `1px solid ${C.ibdr}`, background: 'transparent', color: C.text, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.18s', padding: 0, flexShrink: 0 }}>
            {dark ? <Sun size={13} /> : <Moon size={13} />}
          </button>

          {/* CTA */}
          <Link to="/"
            style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#D4AF37', color: '#0a2540', padding: '6px 13px', borderRadius: 7, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.67rem', textTransform: 'uppercase', letterSpacing: '0.09em', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0, boxShadow: '0 2px 12px rgba(212,175,55,0.35)', transition: 'transform 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
            🕐 Prayer Times
          </Link>

          {/* Hamburger */}
          <button onClick={() => { setOpen(o => !o); setLangOpen(false); }}
            style={{ width: 32, height: 32, borderRadius: 7, border: `1px solid ${open ? (glass ? 'rgba(255,255,255,0.45)' : '#0a2540') : C.ibdr}`, background: open ? (glass ? 'rgba(255,255,255,0.18)' : '#0a2540') : 'transparent', color: open ? '#ffffff' : C.text, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.18s', padding: 0, flexShrink: 0 }}>
            {open ? <X size={13} /> : <Menu size={13} />}
          </button>
        </div>
      </nav>

      {/* Mega menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
              style={{ position: 'fixed', inset: 0, zIndex: 398, background: 'rgba(10,37,64,0.3)', backdropFilter: 'blur(4px)' }}
              onClick={() => setOpen(false)} />

            <motion.div ref={menuRef}
              initial={{ opacity: 0, y: -8, scale: 0.975 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              exit={{ opacity: 0,   y: -8, scale: 0.975 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'fixed', top: 70, right: 'clamp(12px,5vw,40px)', zIndex: 399, width: 'min(560px,calc(100vw - 24px))', background: '#ffffff', borderRadius: 18, border: '1px solid rgba(10,37,64,0.1)', boxShadow: '0 20px 60px rgba(10,37,64,0.15)', overflow: 'hidden' }}>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
                {MENU.map((col, ci) => (
                  <div key={col.col} style={{ padding: '18px 14px 14px', borderRight: ci < 2 ? '1px solid rgba(10,37,64,0.06)' : 'none' }}>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.52rem', fontWeight: 800, color: 'rgba(10,37,64,0.28)', textTransform: 'uppercase', letterSpacing: '0.24em', marginBottom: 8, paddingBottom: 7, borderBottom: '1px solid rgba(10,37,64,0.06)' }}>
                      {col.col}
                    </div>
                    {col.items.map(item => (
                      <Link key={item.title} to={item.to}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px', borderRadius: 8, textDecoration: 'none', transition: 'background 0.12s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.08)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        <span style={{ fontSize: '1.05rem', flexShrink: 0, lineHeight: 1 }}>{item.emoji}</span>
                        <div>
                          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.79rem', fontWeight: 700, color: '#0a2540', lineHeight: 1.2 }}>{item.title}</div>
                          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.6rem', color: 'rgba(10,37,64,0.42)', marginTop: 1 }}>{item.sub}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              <div style={{ padding: '11px 18px', background: '#f7f8fa', borderTop: '1px solid rgba(10,37,64,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.64rem', color: 'rgba(10,37,64,0.38)' }}>🌍 Free for 1.8 billion Muslims</span>
                <Link to="/" onClick={() => setOpen(false)} style={{ background: '#0a2540', color: '#ffffff', padding: '6px 13px', borderRadius: 6, fontFamily: "'DM Sans',sans-serif", fontSize: '0.64rem', fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  🕐 Prayer Times
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
