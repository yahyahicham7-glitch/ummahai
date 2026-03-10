import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Menu, Moon, BookOpen, Compass, Calculator, Star, MessageSquare, ShoppingBag, Info, FileText, Sparkles } from 'lucide-react';

const GROUPS = [
  {
    label: 'Worship',
    items: [
      { name: 'Prayer Times', href: '/', icon: Moon, desc: 'GPS-accurate Fajr to Isha' },
      { name: 'Qibla Finder', href: '/qibla', icon: Compass, desc: 'Direction toward Mecca' },
      { name: 'Holy Quran', href: '/quran', icon: BookOpen, desc: '15 translations + audio' },
      { name: 'Zakat Calculator', href: '/zakat', icon: Calculator, desc: 'Annual obligation 2026' },
    ],
  },
  {
    label: 'Learn',
    items: [
      { name: 'Ramadan 2026', href: '/ramadan', icon: Star, desc: 'Complete Ramadan guide' },
      { name: 'Islamic Articles', href: '/blog', icon: FileText, desc: 'Guides & knowledge' },
      { name: 'Scholar AI', href: '/scholar', icon: MessageSquare, desc: 'Ask Islamic questions' },
      { name: 'Halal Finance', href: '/halal-money', icon: Sparkles, desc: 'Islamic investing' },
    ],
  },
  {
    label: 'Explore',
    items: [
      { name: 'Islamic Store', href: '/store', icon: ShoppingBag, desc: 'Halal products' },
      { name: 'About', href: '/about', icon: Info, desc: 'Our mission' },
    ],
  },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Scroll detection
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* ── HEADER BAR ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          background: scrolled ? 'rgba(6,15,30,0.94)' : 'rgba(6,15,30,0.2)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(212,175,55,0.1)' : '1px solid transparent',
        }}
      >
        <div className="max-w-6xl mx-auto px-5 h-[60px] flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
              style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)' }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1L7.8 4.7L11.7 4.7L8.7 7.1L9.9 10.8L6.5 8.8L3.1 10.8L4.3 7.1L1.3 4.7L5.2 4.7Z"
                  stroke="#D4AF37" strokeWidth="0.9" fill="none" />
              </svg>
            </div>
            <span className="font-black text-[13px] tracking-tight" style={{ color: '#ffffff' }}>
              Al Ummah <span style={{ color: '#D4AF37' }}>AI</span>
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center space-x-2.5">
            {/* CTA — desktop only */}
            <Link to="/"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-200 hover:scale-[1.03]"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F1D279)', color: '#060f1e' }}>
              Prayer Times
            </Link>

            {/* Menu toggle */}
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{
                background: open ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.055)',
                border: '1px solid rgba(212,175,55,0.18)',
              }}>
              {open
                ? <X style={{ width: '0.9rem', height: '0.9rem', color: '#D4AF37' }} />
                : <Menu style={{ width: '0.9rem', height: '0.9rem', color: 'rgba(255,255,255,0.7)' }} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── FULLSCREEN MENU OVERLAY ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(6,15,30,0.96)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)' }}
              onClick={() => setOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              key="menu"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.28, type: 'spring', damping: 22 }}
              className="fixed top-0 right-0 bottom-0 z-50 overflow-y-auto"
              style={{
                width: 'min(100vw, 420px)',
                background: 'rgba(6,15,30,0.98)',
                borderLeft: '1px solid rgba(212,175,55,0.1)',
                boxShadow: '-20px 0 60px rgba(0,0,0,0.5)',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Top gold line */}
              <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.35), transparent)' }} />

              {/* Header */}
              <div className="px-8 pt-6 pb-2 flex items-center justify-between">
                <span className="font-black text-[13px]" style={{ color: '#ffffff' }}>
                  Al Ummah <span style={{ color: '#D4AF37' }}>AI</span>
                </span>
                <button onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)' }}>
                  <X style={{ width: '0.8rem', height: '0.8rem', color: '#D4AF37' }} />
                </button>
              </div>

              {/* Groups */}
              <div className="px-6 pt-6 pb-10 space-y-8">
                {GROUPS.map((group, gi) => (
                  <motion.div
                    key={group.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: gi * 0.07 }}
                  >
                    <p className="text-[8.5px] font-black tracking-[0.45em] uppercase px-2 mb-3"
                      style={{ color: 'rgba(212,175,55,0.5)' }}>
                      {group.label}
                    </p>
                    <div className="space-y-0.5">
                      {group.items.map((item, ii) => (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: gi * 0.07 + ii * 0.04 }}
                        >
                          <Link
                            to={item.href}
                            className="flex items-center space-x-3.5 px-4 py-3 rounded-xl transition-all duration-150"
                            style={{ border: '1px solid transparent' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.055)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.14)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
                          >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.14)' }}>
                              <item.icon style={{ width: '0.85rem', height: '0.85rem', color: '#D4AF37' }} />
                            </div>
                            <div>
                              <p className="text-[13px] font-black" style={{ color: '#ffffff' }}>{item.name}</p>
                              <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{item.desc}</p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {/* Footer links */}
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}
                  className="pt-4 flex flex-wrap gap-x-5 gap-y-2"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.055)' }}>
                  {[{ name: 'Privacy', href: '/privacy' }, { name: 'Terms', href: '/terms' }, { name: 'Contact', href: '/about' }].map(l => (
                    <Link key={l.href} to={l.href}
                      className="text-[9px] font-black tracking-widest uppercase transition-colors"
                      style={{ color: 'rgba(255,255,255,0.2)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}>
                      {l.name}
                    </Link>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
