import React, { useEffect, useState } from 'react';
import { PrayerWidget } from '@/src/components/PrayerWidget';
import { SEO } from '@/src/components/SEO';
import { BookOpen, MapPin, Calculator, ArrowRight, ShieldCheck, Zap, Globe, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

const PHRASES = [
  { ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', en: 'In the name of Allah, the Most Gracious' },
  { ar: 'اللَّهُ أَكْبَرُ', en: 'Allah is the Greatest' },
  { ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', en: 'Glory be to Allah and praise Him' },
  { ar: 'لَا إِلَٰهَ إِلَّا اللَّهُ', en: 'There is no god but Allah' },
];

const POSTS = [
  { id: 'last-10-nights-ramadan', title: 'The Last 10 Nights of Ramadan', cat: 'Ramadan', img: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=600&q=80' },
  { id: 'fajr-time-today', title: 'What Time is Fajr Today?', cat: 'Prayer', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
  { id: 'calculate-zakat-2026', title: 'How to Calculate Zakat 2026', cat: 'Finance', img: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=600&q=80' },
];

const SHOP = [
  { label: 'Prayer Mats', emoji: '🕌' },
  { label: 'Tasbih', emoji: '📿' },
  { label: 'Qurans', emoji: '📖' },
  { label: 'Ramadan Essentials', emoji: '🌙' },
];

function useCountdown(target: string) {
  const [days, setDays] = useState(0);
  useEffect(() => {
    const d = Math.ceil((new Date(target).getTime() - Date.now()) / 86400000);
    setDays(d > 0 ? d : 0);
  }, [target]);
  return days;
}

export function Home() {
  const { t } = useTranslation();
  const daysToRamadan = useCountdown('2026-02-17');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setPhraseIdx(i => (i + 1) % PHRASES.length); setVisible(true); }, 400);
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ background: '#fff', color: '#0a2540' }}>
      <SEO
        title="Prayer Times Near Me Today — Fajr, Dhuhr, Asr, Maghrib, Isha | Al Ummah AI"
        description="Accurate GPS prayer times for all 5 daily prayers. Real-time Qibla finder, Quran with audio, Zakat calculator and Islamic guides. Free for 1.8 billion Muslims."
        keywords="prayer times near me, fajr time today, qibla direction, quran audio, zakat calculator, ramadan 2026"
        canonical="https://www.alummahai.com"
      />

      {/* ── 1. HERO (dark navy bg) ─────────────────────────── */}
      <section style={{ background: '#0a2540', minHeight: '88vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 20px 60px', position: 'relative', overflow: 'hidden' }}>

        {/* Subtle grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px)', backgroundSize: '64px 64px', pointerEvents: 'none' }} />
        {/* Gold glow */}
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, textAlign: 'center' }}>

          {/* Arabic phrase */}
          <div style={{ marginBottom: 28, minHeight: 64 }}>
            <div style={{ fontFamily: "'Amiri', serif", fontSize: 'clamp(1.4rem,4vw,2.4rem)', color: '#D4AF37', direction: 'rtl', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-8px)', transition: 'all 0.4s ease', textShadow: '0 0 30px rgba(212,175,55,0.4)' }}>
              {PHRASES[phraseIdx].ar}
            </div>
            <div style={{ fontSize: '0.68rem', color: 'rgba(212,175,55,0.55)', letterSpacing: '2px', marginTop: 6, fontStyle: 'italic', opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease 0.1s' }}>
              {PHRASES[phraseIdx].en}
            </div>
          </div>

          {/* H1 */}
          <h1 style={{ fontSize: 'clamp(2.2rem,6vw,4.5rem)', fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#ffffff', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: 20 }}>
            Prayer Times, Qibla,{' '}
            <span style={{ color: '#D4AF37' }}>Quran</span>{' '}
            and Daily Guidance
          </h1>

          <p style={{ fontSize: 'clamp(1rem,2.5vw,1.2rem)', color: 'rgba(255,255,255,0.55)', fontWeight: 300, maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.7 }}>
            The complete Islamic platform — accurate, fast and free for 1.8 billion Muslims worldwide.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#D4AF37', color: '#0a2540', padding: '14px 30px', borderRadius: 14, fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', boxShadow: '0 8px 30px rgba(212,175,55,0.35)', transition: 'transform 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
              <MapPin size={16} /> Use My Location
            </Link>
            <Link to="/quran" style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', padding: '14px 30px', borderRadius: 14, fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'; e.currentTarget.style.color = '#D4AF37'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#ffffff'; }}>
              <BookOpen size={16} /> Read Quran
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center', paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {[['1.8B+','Muslims'],['150+','Cities'],['5','Languages'],['100%','Free']].map(([n,l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.6rem', fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#D4AF37' }}>{n}</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Ramadan pill */}
          {daysToRamadan > 0 && (
            <div style={{ marginTop: 32 }}>
              <Link to="/ramadan" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 22px', borderRadius: 99, border: '1px solid rgba(212,175,55,0.3)', background: 'rgba(212,175,55,0.08)', color: '#D4AF37', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none' }}>
                🌙 <span>{daysToRamadan} days until Ramadan 2026</span> <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>→</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── 2. TRUST BAR (light) ──────────────────────────── */}
      <div style={{ background: '#f7f8fa', borderTop: '1px solid rgba(10,37,64,0.07)', borderBottom: '1px solid rgba(10,37,64,0.07)', padding: '14px 20px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap', maxWidth: 900, margin: '0 auto' }}>
          {[
            '✦ Accurate prayer times by GPS location',
            '✦ Real-time Qibla direction',
            '✦ Quran with audio & translations',
            '✦ Verified by scholars',
            '✦ Clean & distraction-free',
          ].map(t => (
            <span key={t} style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(10,37,64,0.5)', letterSpacing: '0.08em', whiteSpace: 'nowrap', padding: '0 16px' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── 3. PRAYER TIMES ──────────────────────────────── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-block', padding: '4px 16px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', borderRadius: 99, fontSize: '0.65rem', fontWeight: 800, color: '#b8941e', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 14 }}>
            ✦ Live · GPS Accurate
          </div>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#0a2540', marginBottom: 10 }}>
            Prayer Times Near You
          </h2>
          <p style={{ color: 'rgba(10,37,64,0.5)', fontWeight: 300, maxWidth: 480, margin: '0 auto' }}>
            Auto-detected from your GPS. Search any city worldwide.
          </p>
        </div>
        <PrayerWidget />
      </section>

      {/* ── 4. FOUR CORE TOOLS (dark navy) ───────────────── */}
      <section style={{ background: '#0a2540', padding: '80px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ display: 'inline-block', padding: '4px 16px', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)', borderRadius: 99, fontSize: '0.65rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 14 }}>
              ✦ Sacred Tools
            </div>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#ffffff' }}>
              Everything You Need
            </h2>
          </div>

          {/* 4 main tools */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 20 }}>
            {[
              { emoji: '🕐', label: 'Prayer Times', desc: 'GPS-accurate times for all 5 daily prayers', link: '/' },
              { emoji: '🧭', label: 'Qibla Finder', desc: 'Real-time direction to Mecca', link: '/qibla' },
              { emoji: '📖', label: 'Quran Audio', desc: 'Full Quran with audio & translations', link: '/quran' },
              { emoji: '💛', label: 'Zakat Calculator', desc: 'Accurate calculation — 2026 Nisab rates', link: '/zakat' },
            ].map(({ emoji, label, desc, link }) => (
              <Link key={label} to={link} style={{ display: 'block', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '28px 24px', textDecoration: 'none', transition: 'all 0.25s', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}>
                <div style={{ fontSize: '2.2rem', marginBottom: 16 }}>{emoji}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: '#ffffff', fontSize: '1.15rem', marginBottom: 8 }}>{label}</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.6 }}>{desc}</p>
                <div style={{ marginTop: 18, color: 'rgba(212,175,55,0.6)', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Open →</div>
              </Link>
            ))}
          </div>

          {/* Secondary links */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
            {[
              { label: 'Hajj Guide', link: '/hajj', emoji: '🕋' },
              { label: 'Ramadan 2026', link: '/ramadan', emoji: '🌙' },
              { label: 'Scholar AI', link: '/scholar', emoji: '✨' },
              { label: 'Islamic Store', link: '/store', emoji: '🛍️' },
            ].map(({ label, link, emoji }) => (
              <Link key={label} to={link} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '14px 18px', textDecoration: 'none', color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', fontWeight: 700, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; e.currentTarget.style.color = '#D4AF37'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}>
                <span>{emoji}</span> {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. SEO CONTENT — ARTICLES ────────────────────── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-block', padding: '4px 16px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', borderRadius: 99, fontSize: '0.65rem', fontWeight: 800, color: '#b8941e', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 12 }}>✦ Islamic Knowledge</div>
            <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#0a2540', marginBottom: 6 }}>Guides & Articles</h2>
            <p style={{ color: 'rgba(10,37,64,0.5)', fontWeight: 300 }}>Ramadan guides, prayer times by city, duas and Islamic articles.</p>
          </div>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(212,175,55,0.35)', color: '#b8941e', padding: '10px 20px', borderRadius: 99, fontSize: '0.75rem', fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            All Articles <ArrowRight size={14} />
          </Link>
        </div>

        {/* 3 article cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 32 }}>
          {POSTS.map(post => (
            <Link key={post.id} to={`/blog/${post.id}`} style={{ display: 'block', background: '#ffffff', border: '1px solid rgba(10,37,64,0.08)', borderRadius: 20, overflow: 'hidden', textDecoration: 'none', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(212,175,55,0.1)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,37,64,0.08)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ height: 190, overflow: 'hidden', position: 'relative' }}>
                <img src={post.img} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,37,64,0.5), transparent)' }} />
                <span style={{ position: 'absolute', top: 14, left: 14, background: '#D4AF37', color: '#0a2540', fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', padding: '4px 10px', borderRadius: 99 }}>{post.cat}</span>
              </div>
              <div style={{ padding: '20px 22px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: '#0a2540', fontSize: '1rem', lineHeight: 1.45, marginBottom: 14 }}>{post.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(10,37,64,0.06)', paddingTop: 12 }}>
                  <span style={{ fontSize: '0.65rem', color: 'rgba(10,37,64,0.3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Al Ummah AI</span>
                  <span style={{ color: '#D4AF37', fontSize: '0.75rem', fontWeight: 800 }}>Read →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Topic pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {[['Ramadan 2026','/blog/ramadan-2026-prayer-timetable'],['Fajr Time','/blog/fajr-time-today'],['Zakat Guide','/blog/calculate-zakat-2026'],['Hajj 2026','/blog/hajj-packages-uk-2026'],['Surah Al-Kahf','/blog/surah-al-kahf-friday'],['How to Pray','/blog/how-to-pray-salah-beginners'],['Islamic History','/blog/islamic-history-golden-age'],['Halal Investing','/blog/best-halal-investment-apps-2026']].map(([label, link]) => (
            <Link key={label} to={link} style={{ padding: '7px 16px', background: 'rgba(10,37,64,0.04)', border: '1px solid rgba(10,37,64,0.1)', borderRadius: 99, fontSize: '0.75rem', fontWeight: 700, color: 'rgba(10,37,64,0.55)', textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'; e.currentTarget.style.color = '#b8941e'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,37,64,0.1)'; e.currentTarget.style.color = 'rgba(10,37,64,0.55)'; }}>
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── 6. SHOP PREVIEW (light bg, no prices) ────────── */}
      <section style={{ background: '#f7f8fa', borderTop: '1px solid rgba(10,37,64,0.06)', borderBottom: '1px solid rgba(10,37,64,0.06)', padding: '80px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'inline-block', padding: '4px 16px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', borderRadius: 99, fontSize: '0.65rem', fontWeight: 800, color: '#b8941e', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 12 }}>✦ Islamic Store</div>
              <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#0a2540', marginBottom: 6 }}>Premium Islamic Products</h2>
              <p style={{ color: 'rgba(10,37,64,0.5)', fontWeight: 300 }}>Handpicked essentials for your spiritual life.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18, marginBottom: 36 }}>
            {SHOP.map(({ label, emoji }) => (
              <div key={label} style={{ background: '#ffffff', border: '1px solid rgba(10,37,64,0.08)', borderRadius: 20, padding: '36px 20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(212,175,55,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,37,64,0.08)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ fontSize: '2.8rem', marginBottom: 14 }}>{emoji}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: '#0a2540', fontSize: '1rem' }}>{label}</h3>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/store" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#D4AF37', color: '#0a2540', padding: '14px 34px', borderRadius: 14, fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', boxShadow: '0 8px 30px rgba(212,175,55,0.25)', transition: 'transform 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
              Browse Islamic Store <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. WHY SECTION ───────────────────────────────── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#0a2540', marginBottom: 10 }}>Why Al Ummah AI?</h2>
          <p style={{ color: 'rgba(10,37,64,0.5)', fontWeight: 300 }}>Tradition meets technology — for the global Ummah.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 36 }}>
          {[
            { icon: '🛡️', title: 'Scholar Verified', desc: 'All content reviewed by qualified Islamic scholars for accuracy and authenticity.' },
            { icon: '📍', title: 'GPS Precision', desc: 'Prayer times calculated from your exact coordinates — never miss a prayer.' },
            { icon: '🌍', title: '5 Languages', desc: 'Full support for English, Arabic, French, Spanish and Indonesian.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>{icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: '#0a2540', fontSize: '1.2rem', marginBottom: 10 }}>{title}</h3>
              <p style={{ color: 'rgba(10,37,64,0.5)', fontWeight: 300, lineHeight: 1.7, maxWidth: 260, margin: '0 auto' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. FINAL CTA (dark navy) ─────────────────────── */}
      <section style={{ background: '#0a2540', padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 660, margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: 20 }}>🌙</div>
          <h2 style={{ fontSize: 'clamp(2rem,4.5vw,3.5rem)', fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#ffffff', lineHeight: 1.1, marginBottom: 16 }}>
            Start your spiritual journey <span style={{ color: '#D4AF37' }}>today</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.05rem', fontWeight: 300, maxWidth: 460, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Prayer times, Quran, Qibla, Zakat — everything you need, free forever.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/quran" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#D4AF37', color: '#0a2540', padding: '15px 32px', borderRadius: 14, fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', boxShadow: '0 8px 30px rgba(212,175,55,0.3)' }}>
              Read Quran Now <ArrowRight size={15} />
            </Link>
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', padding: '15px 32px', borderRadius: 14, fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none' }}>
              Explore Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
