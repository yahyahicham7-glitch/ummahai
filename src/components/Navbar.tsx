import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu, Moon, Sun, Globe } from 'lucide-react';
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
      { label: 'Ramadan',    href: '/ramadan',  emoji: '🌙', desc: 'Complete 2026 guide' },
      { label: 'Duas',       href: '/blog/morning-evening-adhkar', emoji: '🤲', desc: 'Daily supplications' },
      { label: 'Articles',   href: '/blog',     emoji: '✍️', desc: 'Islamic guides & knowledge' },
      { label: 'Scholar AI', href: '/scholar',  emoji: '✨', desc: 'Ask any Islamic question' },
    ],
  },
  {
    group: 'Explore',
    items: [
      { label: 'Hajj Guide',   href: '/hajj',   emoji: '🕋', desc: 'Pilgrimage essentials' },
      { label: 'Islamic Store',href: '/store',  emoji: '🛍️', desc: 'Premium Islamic products' },
      { label: 'About Us',     href: '/about',  emoji: '💎', desc: 'Our mission' },
      { label: 'Contact',      href: 'mailto:contact@alummahai.com', emoji: '✉️', desc: 'Get in touch' },
    ],
  },
];

const LANGS = [{ code: 'en', label: 'EN' }, { code: 'ar', label: 'AR' }, { code: 'fr', label: 'FR' }, { code: 'es', label: 'ES' }];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { i18n } = useTranslation();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMenuOpen(false); setLangOpen(false); }, [location]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (!menuOpen && !langOpen) return;
    const fn = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) { setMenuOpen(false); setLangOpen(false); }
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [menuOpen, langOpen]);

  useEffect(() => {
    document.body.style.backgroundColor = dark ? '#071a2e' : '#ffffff';
    document.body.style.color = dark ? '#f0f4f8' : '#0a2540';
  }, [dark]);

  const iBtn = (active = false): React.CSSProperties => ({
    width: 36, height: 36, borderRadius: 9,
    border: `1px solid ${active ? '#0a2540' : 'rgba(10,37,64,0.12)'}`,
    background: active ? '#0a2540' : 'transparent',
    color: active ? '#ffffff' : '#0a2540',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0, padding: 0,
  });

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(16px,4vw,40px)',
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(10,37,64,0.08)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: '#0a2540', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: '#D4AF37', fontSize: '1.05rem' }}>☽</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: '0.98rem', color: '#0a2540', letterSpacing: '-0.015em', lineHeight: 1.1 }}>
              Al Ummah <span style={{ color: '#D4AF37' }}>AI</span>
            </div>
            <div style={{ fontSize: '0.49rem', fontWeight: 700, color: 'rgba(10,37,64,0.32)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              Islamic Platform
            </div>
          </div>
        </Link>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

          {/* CTA — hidden on mobile */}
          <Link to="/" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: '#D4AF37', color: '#0a2540',
            padding: '8px 16px', borderRadius: 8,
            fontSize: '0.7rem', fontWeight: 800,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            textDecoration: 'none', whiteSpace: 'nowrap',
            boxShadow: '0 3px 12px rgba(212,175,55,0.22)',
            transition: 'transform 0.18s',
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
            🕐 <span style={{ display: 'none' }}>Prayer Times</span>
            <span>Prayer Times</span>
          </Link>

          {/* Lang */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setLangOpen(o => !o)} style={iBtn(langOpen)} aria-label="Language">
              <Globe size={14} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div initial={{ opacity: 0, y: 4, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 4, scale: 0.96 }} transition={{ duration: 0.16, ease: [0.16,1,0.3,1] }}
                  style={{ position: 'absolute', top: 42, right: 0, background: '#fff', borderRadius: 12, border: '1px solid rgba(10,37,64,0.1)', boxShadow: '0 12px 40px rgba(10,37,64,0.12)', padding: 6, minWidth: 72, zIndex: 301 }}>
                  {LANGS.map(l => (
                    <button key={l.code} onClick={() => { i18n.changeLanguage(l.code); setLangOpen(false); }}
                      style={{ display: 'block', width: '100%', padding: '7px 12px', borderRadius: 7, border: 'none', background: i18n.language.startsWith(l.code) ? 'rgba(212,175,55,0.1)' : 'transparent', color: i18n.language.startsWith(l.code) ? '#b8941e' : '#0a2540', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer', textAlign: 'left', transition: 'background 0.12s' }}
                      onMouseEnter={e => { if (!i18n.language.startsWith(l.code)) e.currentTarget.style.background = 'rgba(10,37,64,0.05)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = i18n.language.startsWith(l.code) ? 'rgba(212,175,55,0.1)' : 'transparent'; }}>
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark mode */}
          <button onClick={() => setDark(d => !d)} style={iBtn()} aria-label="Dark mode">
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Menu */}
          <button onClick={() => setMenuOpen(o => !o)} style={iBtn(menuOpen)} aria-label="Open menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </nav>

      {/* ── Mega menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
              style={{ position: 'fixed', inset: 0, zIndex: 198, background: 'rgba(10,37,64,0.22)', backdropFilter: 'blur(3px)' }}
              onClick={() => setMenuOpen(false)} />

            <motion.div ref={menuRef}
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16,1,0.3,1] }}
              style={{ position: 'fixed', top: 72, right: 'clamp(12px,4vw,40px)', zIndex: 199, background: '#ffffff', borderRadius: 20, border: '1px solid rgba(10,37,64,0.08)', boxShadow: '0 24px 80px rgba(10,37,64,0.16)', padding: 20, width: 'min(540px,calc(100vw - 24px))' }}>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4 }}>
                {MENU_GROUPS.map(section => (
                  <div key={section.group}>
                    <div style={{ fontSize: '0.57rem', fontWeight: 800, color: 'rgba(10,37,64,0.28)', textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: 8, paddingLeft: 8 }}>
                      {section.group}
                    </div>
                    {section.items.map(item => (
                      <Link key={item.label} to={item.href}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: 9, padding: '8px 10px', borderRadius: 10, textDecoration: 'none', transition: 'background 0.14s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.07)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        <span style={{ fontSize: '1rem', marginTop: 1, flexShrink: 0 }}>{item.emoji}</span>
                        <div>
                          <div style={{ fontSize: '0.81rem', fontWeight: 700, color: '#0a2540', lineHeight: 1.25 }}>{item.label}</div>
                          <div style={{ fontSize: '0.62rem', color: 'rgba(10,37,64,0.4)', marginTop: 1 }}>{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              {/* Bottom */}
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(10,37,64,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.67rem', color: 'rgba(10,37,64,0.3)', fontWeight: 500 }}>Free for 1.8 billion Muslims</span>
                <Link to="/" onClick={() => setMenuOpen(false)} style={{ background: '#0a2540', color: '#ffffff', padding: '7px 14px', borderRadius: 8, fontSize: '0.67rem', fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
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
