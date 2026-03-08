import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, BookOpen, MapPin, Calculator, MessageSquare, Globe, Sparkles, Newspaper } from 'lucide-react';
import { cn } from '@/src/utils/cn';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const navLinks = [
    { name: t('nav.home'), href: '/', icon: Moon },
    { name: t('nav.quran'), href: '/quran', icon: BookOpen },
    { name: t('nav.qibla'), href: '/qibla', icon: MapPin },
    { name: t('nav.zakat'), href: '/zakat', icon: Calculator },
    { name: t('nav.store'), href: '/store', icon: Sparkles },
    { name: t('nav.blog'), href: '/blog', icon: Newspaper },
    { name: t('nav.scholar'), href: '/scholar', icon: MessageSquare },
  ];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  const currentLang = i18n.resolvedLanguage || i18n.language;

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Top Bar - Language Switcher */}
      <div className="bg-glamour-blue-light/90 backdrop-blur-md border-b border-gold/10 py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-end items-center space-x-6">
          <div className="flex items-center space-x-4 text-[9px] font-black tracking-[0.2em] uppercase text-gold/40">
            <Globe className="w-3 h-3" />
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => changeLanguage(l.code)}
                className={cn(
                  "hover:text-gold transition-all duration-300",
                  currentLang.startsWith(l.code) ? "text-gold scale-110" : ""
                )}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-glamour-blue/90 backdrop-blur-xl border-b border-gold/20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2 group">
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 1, ease: "anticipate" }}
                  className="w-8 h-8 bg-gradient-to-br from-glamour-blue-light to-glamour-blue rounded-lg flex items-center justify-center border border-gold/30 shadow-[0_0_10px_rgba(212,175,55,0.2)]"
                >
                  <Moon className="text-gold w-4 h-4" />
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-base font-modern font-black text-cream tracking-tighter group-hover:text-gold transition-all duration-500 leading-none">UMMAH<span className="text-gold">AI</span></span>
                  <span className="text-[5px] font-black tracking-[0.4em] text-gold/40 uppercase mt-0.5">Global Spiritual Hub</span>
                </div>
              </Link>
            </div>

            {/* Linear Nav - Scrollable on mobile */}
            <div className="flex items-center overflow-x-auto no-scrollbar ml-4 space-x-4 md:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-[9px] font-black tracking-[0.1em] uppercase transition-all hover:text-gold flex items-center space-x-1.5 group relative py-2 whitespace-nowrap",
                    location.pathname === link.href ? "text-gold" : "text-cream/60",
                    link.href === '/scholar' && "text-gold border border-gold/30 px-3 py-1 rounded-full bg-gold/5 hover:bg-gold/10"
                  )}
                >
                  <link.icon className={cn("w-3 h-3 group-hover:scale-110 transition-transform", link.href === '/scholar' && "text-gold")} />
                  <span>{link.name}</span>
                  {location.pathname === link.href && link.href !== '/scholar' && (
                    <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 h-0.5 bg-gold w-full" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
