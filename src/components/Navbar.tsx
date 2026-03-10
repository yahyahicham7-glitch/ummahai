import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu, Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';

const MENU_GROUPS = [
  {
    group: 'Worship',
    items: [
      { label: 'Prayer Times', href: '/',       emoji: '🕐', desc: 'GPS-accurate daily prayers' },
      { label: 'Qibla Finder', href: '/qibla',  emoji: '🧭', desc: 'Direction to Mecca' },
      { label: 'Quran',        href: '/quran',  emoji: '📖', desc: 'Read & listen with audio' },
      { label: 'Zakat',        href: '/zakat',  emoji: '💛', desc: 'Calculate your obligation' },
    ],
  },
  {
    group: 'Learn',
    items: [
      { label: 'Ramadan',    href: '/ramadan', emoji: '🌙', desc: 'Complete 2026 guide' },
      { label: 'Duas',       href: '/blog/morning-evening-adhkar', emoji: '🤲', desc: 'Daily supplications' },
      { label: 'Articles',   href: '/blog',    emoji: '✍️', desc: 'Islamic guides & knowledge' },
      { label: 'Scholar AI', href: '/scholar', emoji: '✨', desc: 'Ask any Islamic question' },
    ],
  },
  {
    group: 'Explore',
    items: [
      { label: 'Hajj Guide',    href: '/hajj',   emoji: '🕋', desc: 'Pilgrimage essentials' },
      { label: 'Islamic Store', href: '/store',  emoji: '🛍️', desc: 'Premium Islamic products' },
      { label: 'About Us',      href: '/about',  emoji: '💎', desc: 'Our mission' },
      { label: 'Contact',       href: 'mailto:contact@alummahai.com', emoji: '✉️', desc: 'Get in touch' },
    ],
  },
];

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'ع' },
  { code: 'fr', label: 'FR' },
  { code: 'es', label: 'ES' },
];

export function Navbar() {
  const [open, setOpen]       = useState(false);
  const [dark, setDark]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { i18n }              = useTranslation();
  const location              = useLocation();
  const panelRef              = useRef<HTMLDivElement>(null);

  useEffect(() => { setOpen(false); }, [location]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
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

  /* Determine if navbar is over dark hero */
  const isOnHero = !scrolled;

  const navBg = scrolled
    ? 'rgba(255,255,255,0.97)'
    : 'transparent';

  const textColor = isOnHero ? '#ffffff' : '#0a2540';
  const borderColor = scrolled ? 'rgba(10,37,64,0.08)' : 'transparent';

  const iconStyle = (active = false): React.CSSProperties => ({
    width: 34, height: 34, borderRadius: 8,
    border: `1px solid ${isOnHero
      ? (active ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)')
      : (active ? '#0a2540' : 'rgba(10,37,64,0.12)')}`,
    background: active ? (isOnHero ? 'rgba(255,255,255,0.15)' : '#0a2540') : 'transparent',
    color: active ? (isOnHero ? '#ffffff' : '#ffffff') : textColor,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'all 0.2s', padding: 0, flexShrink: 0,
  });

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(16px,5vw,40px)',
        background: navBg,
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: `1px solid ${borderColor}`,
        transition: 'all 0.3s ease',
      }}>

        {/* ── Logo ── */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 7, background: isOnHero ? 'rgba(212,175,55,0.15)' : '#0a2540', border: isOnHero ? '1px solid rgba(212,175,55,0.3)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s' }}>
            <span style={{ color: '#D4AF37', fontSize: '1rem', lineHeight: 1 }}>☽</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: '0.95rem', color: textColor, letterSpacing: '-0.015em', lineHeight: 1.1, transition: 'color 0.3s' }}>
              Al Ummah <span style={{ color: '#D4AF37' }}>AI</span>
            </div>
            <div style={{ fontSize: '0.48rem', fontWeight: 700, color: isOnHero ? 'rgba(255,255,255,0.35)' : 'rgba(10,37,64,0.32)', letterSpacing: '0.22em', textTransform: 'uppercase', transition: 'color 0.3s' }}>
              Islamic Platform
            </div>
          </div>
        </Link>

        {/* ── Right controls ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>

          {/* Language tabs — always visible */}
          <div style={{ display: 'flex', gap: 2, background: isOnHero ? 'rgba(255,255,255,0.08)' : 'rgba(10,37,64,0.05)', borderRadius: 8, padding: 3, border: `1px solid ${isOnHero ? 'rgba(255,255,255,0.1)' : 'rgba(10,37,64,0.08)'}` }}>
            {LANGS.map(l => {
              const active = i18n.language.startsWith(l.code);
              return (
                <button key={l.code} onClick={() => i18n.changeLanguage(l.code)}
                  style={{ padding: '4px 9px', borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.04em', transition: 'all 0.15s', background: active ? (isOnHero ? '#D4AF37' : '#0a2540') : 'transparent', color: active ? (isOnHero ? '#0a2540' : '#ffffff') : (isOnHero ? 'rgba(255,255,255,0.55)' : 'rgba(10,37,64,0.45)') }}>
                  {l.label}
                </button>
              );
            })}
          </div>

          {/* Dark mode */}
          <button onClick={() => setDark(d => !d)} style={iconStyle()} aria-label="Dark mode" title="Toggle dark mode">
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* CTA */}
          <Link to="/" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: '#D4AF37', color: '#0a2540',
            padding: '7px 14px', borderRadius: 8,
            fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.7rem',
            textTransform: 'uppercase', letterSpacing: '0.1em',
            textDecoration: 'none', whiteSpace: 'nowrap',
            boxShadow: '0 3px 12px rgba(212,175,55,0.3)',
            transition: 'transform 0.18s',
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
            🕐 <span>Prayer Times</span>
          </Link>

          {/* Menu button */}
          <button onClick={() => setOpen(o => !o)} style={iconStyle(open)} aria-label="Menu" aria-expanded={open}>
            {open ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </nav>

      {/* ── Mega menu ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
              style={{ position: 'fixed', inset: 0, zIndex: 198, background: 'rgba(10,37,64,0.2)', backdropFilter: 'blur(3px)' }}
              onClick={() => setOpen(false)} />

            <motion.div ref={panelRef}
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16,1,0.3,1] }}
              style={{ position: 'fixed', top: 72, right: 'clamp(12px,5vw,40px)', zIndex: 199, background: '#ffffff', borderRadius: 20, border: '1px solid rgba(10,37,64,0.08)', boxShadow: '0 24px 80px rgba(10,37,64,0.16)', padding: 20, width: 'min(540px,calc(100vw - 24px))' }}>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4 }}>
                {MENU_GROUPS.map(section => (
                  <div key={section.group}>
                    <div style={{ fontSize: '0.56rem', fontWeight: 800, color: 'rgba(10,37,64,0.27)', textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: 8, paddingLeft: 8 }}>
                      {section.group}
                    </div>
                    {section.items.map(item => (
                      <Link key={item.label} to={item.href}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: 9, padding: '8px 10px', borderRadius: 10, textDecoration: 'none', transition: 'background 0.13s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.07)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        <span style={{ fontSize: '1rem', marginTop: 1, flexShrink: 0 }}>{item.emoji}</span>
                        <div>
                          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.8rem', fontWeight: 700, color: '#0a2540', lineHeight: 1.25 }}>{item.label}</div>
                          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.61rem', color: 'rgba(10,37,64,0.38)', marginTop: 1 }}>{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(10,37,64,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.66rem', color: 'rgba(10,37,64,0.3)', fontWeight: 500 }}>Free for 1.8 billion Muslims</span>
                <Link to="/" onClick={() => setOpen(false)}
                  style={{ background: '#0a2540', color: '#ffffff', padding: '7px 14px', borderRadius: 8, fontFamily: "'DM Sans',sans-serif", fontSize: '0.67rem', fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
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
