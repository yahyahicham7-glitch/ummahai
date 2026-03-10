import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronDown, Sparkles, BookOpen, Compass, Calculator, Moon, MapPin, Search } from 'lucide-react';
import { SEO } from '../components/SEO';
import { PrayerWidget } from '../components/PrayerWidget';

// ─── DATA ─────────────────────────────────────────────────────────────────────
const VERSES = [
  { ar: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا', en: 'Allah does not burden a soul beyond that it can bear.', ref: 'Al-Baqarah 2:286' },
  { ar: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا', en: 'Indeed, with hardship comes ease.', ref: 'Ash-Sharh 94:6' },
  { ar: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ', en: 'When My servants ask about Me — I am near.', ref: 'Al-Baqarah 2:186' },
  { ar: 'فَاذْكُرُونِي أَذْكُرْكُمْ', en: 'Remember Me and I will remember you.', ref: 'Al-Baqarah 2:152' },
  { ar: 'وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ', en: 'He is with you wherever you are.', ref: 'Al-Hadid 57:4' },
];

const PRAYER_NAMES = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

const CITIES = [
  { name: 'Makkah', flag: '🇸🇦' }, { name: 'London', flag: '🇬🇧' },
  { name: 'Istanbul', flag: '🇹🇷' }, { name: 'Dubai', flag: '🇦🇪' },
  { name: 'Cairo', flag: '🇪🇬' }, { name: 'Jakarta', flag: '🇮🇩' },
  { name: 'Paris', flag: '🇫🇷' }, { name: 'New York', flag: '🇺🇸' },
  { name: 'Kuala Lumpur', flag: '🇲🇾' }, { name: 'Karachi', flag: '🇵🇰' },
  { name: 'Madrid', flag: '🇪🇸' }, { name: 'Lagos', flag: '🇳🇬' },
];

// ─── CANVAS ANIMATION ─────────────────────────────────────────────────────────
function IslamicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    };
    window.addEventListener('mousemove', onMouse);

    const drawStar = (x: number, y: number, r: number, rot: number, alpha: number, pulse: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      // Glow
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 2);
      g.addColorStop(0, `rgba(212,175,55,${alpha * 0.12 * pulse})`);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(0, 0, r * 2, 0, Math.PI * 2); ctx.fill();
      // Two squares
      ctx.strokeStyle = `rgba(212,175,55,${alpha})`;
      ctx.lineWidth = 0.6;
      for (let s = 0; s < 2; s++) {
        ctx.save(); ctx.rotate(s * Math.PI / 4);
        ctx.strokeRect(-r * .65, -r * .65, r * 1.3, r * 1.3);
        ctx.restore();
      }
      // 8-point star
      ctx.beginPath();
      for (let i = 0; i < 16; i++) {
        const a = (i * Math.PI) / 8 - Math.PI / 2;
        const rad = i % 2 === 0 ? r : r * 0.42;
        i === 0 ? ctx.moveTo(rad * Math.cos(a), rad * Math.sin(a)) : ctx.lineTo(rad * Math.cos(a), rad * Math.sin(a));
      }
      ctx.closePath(); ctx.lineWidth = 0.7; ctx.stroke();
      // Centre dot
      const jg = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 0.13);
      jg.addColorStop(0, `rgba(241,210,121,${alpha * pulse})`);
      jg.addColorStop(1, 'transparent');
      ctx.fillStyle = jg; ctx.beginPath(); ctx.arc(0, 0, r * 0.13, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    };

    let frame = 0;
    const render = () => {
      frame++;
      const t = frame * 0.002;
      const W = canvas.width, H = canvas.height;
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      ctx.clearRect(0, 0, W, H);

      // Mouse glow
      const bg = ctx.createRadialGradient(W * mx, H * my, 0, W * 0.5, H * 0.5, Math.max(W, H));
      bg.addColorStop(0, 'rgba(212,175,55,0.05)');
      bg.addColorStop(1, 'transparent');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      // Star grid
      const sp = 130, cols = Math.ceil(W / sp) + 2, rows = Math.ceil(H / sp) + 2;
      const gr = t * 0.065;
      for (let row = -1; row <= rows; row++) {
        for (let col = -1; col <= cols; col++) {
          const cx = col * sp + (row % 2 === 0 ? 0 : sp * 0.5);
          const cy = row * sp * 0.87;
          const dist = Math.sqrt(((cx / W) - 0.5) ** 2 + ((cy / H) - 0.5) ** 2);
          const pulse = 0.5 + 0.5 * Math.sin(t * 1.5 + col * 0.7 + row * 0.5);
          const alpha = (0.02 + 0.045 * (1 - Math.min(dist * 2, 1))) * (0.55 + 0.45 * pulse);
          drawStar(cx, cy, 24 + 6 * Math.sin(t + col + row), gr + col * 0.02 + row * 0.03, alpha, pulse);
        }
      }

      // Gold dust
      for (let i = 0; i < 35; i++) {
        const seed = i * 137.5;
        const px = ((seed * 13.7 + t * (7 + (i % 4) * 3)) % W + W) % W;
        const py = ((seed * 7.3 + t * (4 + (i % 3) * 2)) % H + H) % H;
        ctx.save();
        ctx.globalAlpha = 0.15 + 0.2 * Math.sin(t * 2 + i);
        ctx.fillStyle = '#D4AF37';
        ctx.beginPath(); ctx.arc(px, py, 0.7 + 0.8 * ((Math.sin(seed) + 1) / 2), 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(render);
    };
    render();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ mixBlendMode: 'screen' }} />;
}

// ─── HIJRI DATE ───────────────────────────────────────────────────────────────
function HijriDate() {
  const hijri = useMemo(() => {
    const now = new Date();
    const jd = Math.floor(now.getTime() / 86400000) + 2440588;
    const l = jd - 1948440 + 10632, n = Math.floor((l - 1) / 10631), l2 = l - 10631 * n + 354;
    const j = Math.floor((10985 - l2) / 5316) * Math.floor(50 * l2 / 17719) + Math.floor(l2 / 5670) * Math.floor(43 * l2 / 15238);
    const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor(17719 * j / 50) - Math.floor(j / 16) * Math.floor(15238 * j / 43) + 29;
    const month = Math.floor(24 * l3 / 709), day = l3 - Math.floor(709 * month / 24), year = 30 * n + j - 30;
    const months = ["Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani", "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhul Qi'dah", "Dhul Hijjah"];
    return { day, month: months[Math.max(0, month - 1)] || '', year };
  }, []);
  return (
    <div className="flex items-center justify-center space-x-3">
      <div className="h-px w-8 bg-gold/30" />
      <span className="text-[10px] font-black tracking-[0.35em] uppercase" style={{ color: '#D4AF37', opacity: 0.7 }}>
        {hijri.day} {hijri.month} {hijri.year} AH
      </span>
      <div className="h-px w-8 bg-gold/30" />
    </div>
  );
}

// ─── PRAYER COUNTDOWN ─────────────────────────────────────────────────────────
function PrayerCountdown() {
  const [timeStr, setTimeStr] = useState('--:--:--');
  const [prayerName, setPrayerName] = useState('Next Prayer');

  useEffect(() => {
    const tick = () => {
      try {
        const data = JSON.parse(localStorage.getItem('prayerTimes') || '{}');
        const timings = data?.data?.timings;
        if (!timings) return;
        const now = new Date();
        const nowMins = now.getHours() * 60 + now.getMinutes();
        let nextName = 'Fajr', nextMins = 24 * 60;
        PRAYER_NAMES.forEach(p => {
          const t = timings[p]; if (!t) return;
          const [h, m] = t.split(':').map(Number);
          const total = h * 60 + m;
          if (total > nowMins && total < nextMins) { nextMins = total; nextName = p; }
        });
        if (nextMins === 24 * 60) {
          const f = timings['Fajr'];
          if (f) { const [h, m] = f.split(':').map(Number); nextMins = h * 60 + m + 24 * 60; nextName = 'Fajr'; }
        }
        const diff = nextMins * 60 - (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());
        if (diff < 0) return;
        const h = Math.floor(diff / 3600), min = Math.floor((diff % 3600) / 60), sec = diff % 60;
        setTimeStr(`${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`);
        setPrayerName(nextName);
      } catch { }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-center space-y-2">
      <p style={{ color: '#D4AF37', opacity: 0.6, fontSize: '9px', fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase' }}>
        Time Until {prayerName}
      </p>
      <div className="flex items-center justify-center space-x-1">
        {timeStr.split('').map((d, i) =>
          d === ':' ? (
            <span key={i} style={{ color: '#D4AF37', opacity: 0.4, fontSize: '1.75rem', fontWeight: 900 }} className="animate-pulse mx-0.5">:</span>
          ) : (
            <motion.span key={`${i}-${d}`} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: 'rgba(13,31,60,0.8)', border: '1px solid rgba(212,175,55,0.12)', borderRadius: '8px', width: '2.5rem', height: '3rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 900, color: '#FAF8F3' }}>
              {d}
            </motion.span>
          )
        )}
      </div>
    </div>
  );
}

// ─── TRUST BAR ────────────────────────────────────────────────────────────────
function TrustBar() {
  const items = [
    '✦ GPS Accurate Prayer Times',
    '✦ 6M+ Cities Worldwide',
    '✦ Free Forever',
    '✦ No Account Needed',
    '✦ 190+ Countries',
    '✦ Quran in 15 Languages',
  ];
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y py-3" style={{ borderColor: 'rgba(212,175,55,0.12)', background: 'rgba(13,31,60,0.5)' }}>
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #060f1e, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #060f1e, transparent)' }} />
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="mx-8 text-[10px] font-black tracking-widest uppercase" style={{ color: '#D4AF37', opacity: 0.55 }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── VERSE CAROUSEL ───────────────────────────────────────────────────────────
function VerseCarousel() {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => { const id = setInterval(() => setIdx(i => (i + 1) % VERSES.length), 9000); return () => clearInterval(id); }, []);

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.035) 0%, transparent 70%)' }} />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }} className="max-w-3xl mx-auto text-center">
        <p className="text-[9px] font-black tracking-[0.5em] uppercase mb-10" style={{ color: '#D4AF37', opacity: 0.45 }}>Verse of the Day</p>
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }} transition={{ duration: 0.75 }} className="space-y-5">
            <p className="font-arabic text-3xl md:text-4xl leading-loose" style={{ color: '#D4AF37', textShadow: '0 0 40px rgba(212,175,55,0.25)' }} dir="rtl">{VERSES[idx].ar}</p>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.35))' }} />
              <span style={{ color: '#D4AF37', opacity: 0.35 }}>✦</span>
              <div className="w-12 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.35))' }} />
            </div>
            <p className="font-serif italic text-lg leading-relaxed" style={{ color: '#FAF8F3', opacity: 0.65 }}>"{VERSES[idx].en}"</p>
            <p className="text-[9px] font-black tracking-widest uppercase" style={{ color: '#D4AF37', opacity: 0.38 }}>{VERSES[idx].ref}</p>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center space-x-2 mt-8">
          {VERSES.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{ borderRadius: '9999px', transition: 'all 0.3s', width: i === idx ? '1.5rem' : '0.4rem', height: '0.4rem', background: i === idx ? '#D4AF37' : 'rgba(255,255,255,0.15)' }} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── 4 CORE TOOLS ─────────────────────────────────────────────────────────────
function CoreTools() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const tools = [
    { icon: Moon, title: 'Prayer Times', desc: 'GPS-accurate Fajr, Dhuhr, Asr, Maghrib & Isha for your exact city.', link: '/', badge: 'Most Used' },
    { icon: Compass, title: 'Qibla Finder', desc: 'Find the exact direction of Mecca from anywhere on Earth.', link: '/qibla', badge: '' },
    { icon: BookOpen, title: 'Holy Quran', desc: 'Read the complete Quran with translations and audio recitations.', link: '/quran', badge: '15 Languages' },
    { icon: Calculator, title: 'Zakat Calculator', desc: 'Calculate your annual Zakat obligation accurately for 2026.', link: '/zakat', badge: '2026' },
  ];
  return (
    <section ref={ref} className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-12">
        <p className="text-[9px] font-black tracking-[0.5em] uppercase mb-3" style={{ color: '#D4AF37', opacity: 0.45 }}>Core Islamic Tools</p>
        <h2 className="font-display text-3xl md:text-4xl" style={{ color: '#FAF8F3' }}>
          Everything You Need,<br /><span className="animate-shimmer">Always Free</span>
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool, i) => (
          <motion.div key={tool.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: i * 0.08 }}>
            <Link to={tool.link} className="group block h-full p-6 rounded-2xl transition-all duration-300 hover:scale-[1.03]"
              style={{ background: 'linear-gradient(135deg, rgba(13,31,60,0.8), rgba(6,15,30,0.6))', border: '1px solid rgba(212,175,55,0.14)', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.38)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.14)')}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.22)' }}>
                  <tool.icon className="w-5 h-5" style={{ color: '#D4AF37' }} />
                </div>
                {tool.badge && (
                  <span className="text-[8px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full" style={{ background: 'rgba(212,175,55,0.1)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.2)' }}>
                    {tool.badge}
                  </span>
                )}
              </div>
              <h3 className="font-display text-sm mb-2 group-hover:text-gold transition-colors" style={{ color: '#FAF8F3' }}>{tool.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#FAF8F3', opacity: 0.45 }}>{tool.desc}</p>
              <div className="mt-4 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[9px] font-black tracking-widest uppercase" style={{ color: '#D4AF37' }}>Open</span>
                <ArrowRight className="w-3 h-3" style={{ color: '#D4AF37' }} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── SEO CONTENT SECTION ──────────────────────────────────────────────────────
function SEOSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const articles = [
    { emoji: '🌙', title: 'Laylat al-Qadr 2026 Guide', desc: 'Signs, prayers and how to maximize the last 10 nights of Ramadan.', link: '/blog/laylat-al-qadr-guide', tag: 'Ramadan' },
    { emoji: '🌅', title: 'Never Miss Fajr Again', desc: 'Proven strategies to wake up for Fajr prayer every single day.', link: '/blog/never-miss-fajr-prayer', tag: 'Prayer' },
    { emoji: '💰', title: 'Zakat Calculator 2026', desc: 'Step-by-step guide with current nisab values and gold rates.', link: '/blog/zakat-calculator-guide-2026', tag: 'Finance' },
    { emoji: '🕋', title: "Hajj 2026 Pilgrim's Guide", desc: 'Complete guide: visa, rituals day by day, packing list.', link: '/blog/hajj-2026-complete-guide', tag: 'Hajj' },
    { emoji: '📈', title: 'Best Halal Investments 2026', desc: 'Wahed Invest, Islamic ETFs, sukuk — explained simply.', link: '/blog/halal-investments-2026', tag: 'Finance' },
    { emoji: '🧭', title: 'Find Qibla from Anywhere', desc: 'Multiple methods: compass, apps, sun position and more.', link: '/blog/find-qibla-direction', tag: 'Prayer' },
  ];
  return (
    <section ref={ref} className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[9px] font-black tracking-[0.5em] uppercase mb-2" style={{ color: '#D4AF37', opacity: 0.45 }}>Islamic Knowledge</p>
          <h2 className="font-display text-3xl" style={{ color: '#FAF8F3' }}>Guides & Articles</h2>
        </div>
        <Link to="/blog" className="flex items-center space-x-1 text-[10px] font-black tracking-widest uppercase transition-colors" style={{ color: '#D4AF37', opacity: 0.6 }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')} onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}>
          <span>View All</span><ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((a, i) => (
          <motion.div key={a.link} initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: i * 0.07 }}>
            <Link to={a.link} className="group block h-full p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, rgba(13,31,60,0.7), rgba(6,15,30,0.5))', border: '1px solid rgba(212,175,55,0.1)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.1)')}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{a.emoji}</span>
                <span className="text-[8px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full" style={{ background: 'rgba(212,175,55,0.08)', color: '#D4AF37', opacity: 0.75, border: '1px solid rgba(212,175,55,0.15)' }}>{a.tag}</span>
              </div>
              <h3 className="font-display text-sm mb-2 leading-snug group-hover:text-gold transition-colors" style={{ color: '#FAF8F3' }}>{a.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#FAF8F3', opacity: 0.42 }}>{a.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Prayer times by city — SEO grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }} className="mt-14 p-8 rounded-2xl" style={{ background: 'rgba(13,31,60,0.5)', border: '1px solid rgba(212,175,55,0.1)' }}>
        <h3 className="font-display text-lg mb-6 text-center" style={{ color: '#FAF8F3' }}>Prayer Times by City</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {CITIES.map(c => (
            <div key={c.name} className="text-center p-3 rounded-xl transition-colors" style={{ background: 'rgba(6,15,30,0.5)', border: '1px solid rgba(212,175,55,0.08)', cursor: 'default' }}>
              <span className="text-xl">{c.flag}</span>
              <p className="text-[9px] font-black mt-1 leading-tight" style={{ color: '#FAF8F3', opacity: 0.45 }}>{c.name}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── SHOP PREVIEW ─────────────────────────────────────────────────────────────
function ShopPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const products = [
    { emoji: '🕌', name: 'Prayer Mats', desc: 'Premium quality, authentic designs' },
    { emoji: '📿', name: 'Tasbih', desc: 'Traditional dhikr beads' },
    { emoji: '📖', name: 'Qurans', desc: 'Beautiful editions with translation' },
    { emoji: '🌙', name: 'Ramadan Essentials', desc: 'Everything for a blessed Ramadan' },
  ];
  return (
    <section ref={ref} className="py-16 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
        className="rounded-3xl p-10 md:p-14" style={{ background: 'linear-gradient(135deg, rgba(13,31,60,0.8), rgba(6,15,30,0.9))', border: '1px solid rgba(212,175,55,0.14)' }}>
        <div className="text-center mb-10">
          <p className="text-[9px] font-black tracking-[0.5em] uppercase mb-2" style={{ color: '#D4AF37', opacity: 0.45 }}>Halal Products</p>
          <h2 className="font-display text-3xl" style={{ color: '#FAF8F3' }}>Islamic Store</h2>
          <p className="text-sm mt-2" style={{ color: '#FAF8F3', opacity: 0.45 }}>Curated halal products for your spiritual journey</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {products.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: i * 0.07 }}
              className="text-center p-5 rounded-2xl" style={{ background: 'rgba(6,15,30,0.6)', border: '1px solid rgba(212,175,55,0.1)' }}>
              <span className="text-3xl">{p.emoji}</span>
              <p className="font-display text-xs mt-3 mb-1" style={{ color: '#FAF8F3' }}>{p.name}</p>
              <p className="text-[9px]" style={{ color: '#FAF8F3', opacity: 0.4 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/store" className="inline-flex items-center space-x-2 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all hover:scale-105"
            style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37' }}>
            <span>Visit Shop</span><ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

// ─── TASBEEH ──────────────────────────────────────────────────────────────────
function DigitalTasbeeh() {
  const [count, setCount] = useState(() => { try { return parseInt(localStorage.getItem('tasbeeh_count') || '0'); } catch { return 0; } });
  const [celebrating, setCelebrating] = useState(false);
  const [milestone, setMilestone] = useState('');
  const [ripples, setRipples] = useState<number[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const MS: Record<number, string> = { 33: 'سُبْحَانَ اللَّهِ', 66: 'الْحَمْدُ لِلَّهِ', 99: 'اللَّهُ أَكْبَرُ' };

  const tap = useCallback(() => {
    const n = (count + 1) % 100;
    setCount(n);
    try { localStorage.setItem('tasbeeh_count', String(n)); } catch { }
    if (MS[n]) { setCelebrating(true); setMilestone(MS[n]); setTimeout(() => setCelebrating(false), 1200); }
    setRipples(r => [...r, Date.now()]);
    setTimeout(() => setRipples(r => r.slice(1)), 700);
    if (navigator.vibrate) navigator.vibrate(40);
  }, [count]);

  const R = 52, C = 2 * Math.PI * R, dash = C * (count / 99);
  const col = count < 33 ? '#D4AF37' : count < 66 ? '#F1D279' : '#fff7ae';

  return (
    <section ref={ref} className="py-20 px-4">
      <div className="max-w-xs mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <p className="text-[9px] font-black tracking-[0.5em] uppercase mb-2" style={{ color: '#D4AF37', opacity: 0.45 }}>Digital</p>
          <h2 className="font-display text-3xl mb-10" style={{ color: '#FAF8F3' }}>Tasbeeh Counter</h2>
          <div className="relative inline-flex items-center justify-center mb-8" onClick={tap}>
            <svg width="160" height="160" className="absolute" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="80" cy="80" r={R} fill="none" stroke="rgba(212,175,55,0.08)" strokeWidth="3" />
              <circle cx="80" cy="80" r={R} fill="none" stroke={col} strokeWidth="3" strokeDasharray={`${dash} ${C}`} strokeLinecap="round"
                style={{ transition: 'stroke-dasharray .3s ease, stroke .5s ease', filter: `drop-shadow(0 0 8px ${col}80)` }} />
            </svg>
            {ripples.map(r => (
              <motion.div key={r} className="absolute rounded-full" style={{ border: '1px solid rgba(212,175,55,0.35)' }}
                initial={{ width: 80, height: 80, opacity: 0.6 }} animate={{ width: 210, height: 210, opacity: 0 }} transition={{ duration: 0.7 }} />
            ))}
            <motion.button whileTap={{ scale: 0.92 }} className="relative w-36 h-36 rounded-full cursor-pointer select-none"
              style={{ background: 'radial-gradient(circle at 35% 35%, rgba(212,175,55,0.2), rgba(6,15,30,0.92))', border: '1px solid rgba(212,175,55,0.2)', boxShadow: celebrating ? '0 0 60px rgba(212,175,55,0.6)' : '0 0 25px rgba(212,175,55,0.08)' }}>
              <AnimatePresence mode="wait">
                {celebrating ? (
                  <motion.div key="ms" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.5, opacity: 0 }} className="absolute inset-0 flex items-center justify-center">
                    <span className="font-arabic text-base text-center px-2" style={{ color: '#D4AF37' }}>{milestone}</span>
                  </motion.div>
                ) : (
                  <motion.div key="ct" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.2, opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black tabular-nums" style={{ color: '#FAF8F3' }}>{count}</span>
                    <span className="text-[8px] font-black tracking-widest uppercase mt-1" style={{ color: '#D4AF37', opacity: 0.45 }}>Tap</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
          <div className="flex justify-center space-x-8 mb-5">
            {[33, 66, 99].map(m => (
              <div key={m} className={`text-center transition-all duration-500 ${count >= m ? 'opacity-100' : 'opacity-25'}`}>
                <div className="w-2 h-2 rounded-full mx-auto mb-1" style={{ background: count >= m ? '#D4AF37' : 'rgba(255,255,255,0.2)', boxShadow: count >= m ? '0 0 8px rgba(212,175,55,0.8)' : 'none' }} />
                <span className="text-[8px] font-black" style={{ color: '#D4AF37' }}>{m}</span>
              </div>
            ))}
          </div>
          <button onClick={() => { setCount(0); try { localStorage.setItem('tasbeeh_count', '0'); } catch { } }}
            className="text-[9px] font-black tracking-widest uppercase transition-colors" style={{ color: 'rgba(212,175,55,0.35)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(212,175,55,0.7)')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(212,175,55,0.35)')}>
            ↺ Reset
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let s = 0; const inc = target / (2000 / 16);
    const id = setInterval(() => { s = Math.min(s + inc, target); setVal(Math.floor(s)); if (s >= target) clearInterval(id); }, 16);
    return () => clearInterval(id);
  }, [isInView, target]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const stats = [{ n: 1800000000, s: '+', l: 'Muslims Worldwide' }, { n: 6000000, s: '+', l: 'Cities Covered' }, { n: 114, s: '', l: 'Quran Surahs' }, { n: 5, s: '', l: 'Daily Prayers' }];
  return (
    <section ref={ref} className="py-14 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.l} initial={{ opacity: 0, scale: 0.85 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.55, delay: i * 0.09 }}
            className="text-center p-6 rounded-2xl" style={{ background: 'rgba(13,31,60,0.6)', border: '1px solid rgba(212,175,55,0.1)' }}>
            <p className="font-display text-2xl md:text-3xl animate-shimmer"><AnimatedNumber target={s.n} suffix={s.s} /></p>
            <p className="text-[9px] font-black tracking-widest uppercase mt-2" style={{ color: '#FAF8F3', opacity: 0.38 }}>{s.l}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <section ref={ref} className="max-w-4xl mx-auto px-4 pb-16">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
        className="relative rounded-[2.5rem] p-12 md:p-16 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(13,31,60,0.95), rgba(6,15,30,0.98))', border: '1px solid rgba(212,175,55,0.15)' }}>
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full -translate-x-1/2 -translate-y-1/2 animate-aurora animate-morph" style={{ background: 'rgba(212,175,55,0.05)' }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full translate-x-1/2 translate-y-1/2 animate-aurora animate-morph" style={{ background: 'rgba(212,175,55,0.05)', animationDelay: '-12s' }} />
        <div className="relative z-10 space-y-5">
          <p className="text-[9px] font-black tracking-[0.6em] uppercase" style={{ color: '#D4AF37', opacity: 0.4 }}>1.8 Billion Muslims</p>
          <h2 className="font-display font-black leading-tight" style={{ fontSize: 'clamp(1.8rem,5vw,3.5rem)', color: '#FAF8F3' }}>
            Start Your Spiritual<br /><span className="animate-shimmer">Journey Today</span>
          </h2>
          <p className="text-base max-w-md mx-auto" style={{ color: '#FAF8F3', opacity: 0.38 }}>Free forever. No account needed. 190+ countries.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
            <Link to="/ramadan" className="group relative inline-flex items-center space-x-2 px-9 py-4 rounded-full font-black uppercase tracking-widest text-xs overflow-hidden hover:scale-105 transition-all"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F1D279)', color: '#060f1e', boxShadow: '0 0 35px rgba(212,175,55,0.3)' }}>
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" style={{ background: 'rgba(255,255,255,0.2)' }} />
              <span className="relative flex items-center space-x-2"><span>🌙</span><span>Ramadan Guide</span><ArrowRight className="w-4 h-4" /></span>
            </Link>
            <Link to="/blog" className="inline-flex items-center px-9 py-4 rounded-full font-black uppercase tracking-widest text-xs transition-all hover:scale-105"
              style={{ border: '1px solid rgba(212,175,55,0.25)', color: '#D4AF37' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              Islamic Articles
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── MAIN HOME ────────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  const schema = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Ummah AI', url: 'https://www.alummahai.com', description: 'Accurate Islamic prayer times, Quran, Qibla, Zakat calculator and Scholar AI for 1.8 billion Muslims.', applicationCategory: 'LifestyleApplication', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } };
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'How do I find prayer times near me?', acceptedAnswer: { '@type': 'Answer', text: 'Ummah AI uses your GPS to automatically show Fajr, Dhuhr, Asr, Maghrib and Isha prayer times for your exact location.' } },
      { '@type': 'Question', name: 'Are the prayer times accurate?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — high-precision astronomical calculations via Aladhan API, accurate to the minute for 6M+ cities.' } },
      { '@type': 'Question', name: 'Is Ummah AI free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free. Prayer times, Quran, Qibla, Zakat and Scholar AI are all free forever.' } },
      { '@type': 'Question', name: 'How do I find the Qibla direction?', acceptedAnswer: { '@type': 'Answer', text: 'Our Qibla page uses your GPS compass to show the exact direction of Mecca from your location.' } },
    ]
  };

  return (
    <div style={{ paddingBottom: '6rem' }}>
      <SEO
        title="Prayer Times Near Me Today — Fajr, Dhuhr, Asr, Maghrib, Isha | Ummah AI"
        description="Accurate Islamic prayer times for your exact location. Auto GPS detection. Quran, Qibla compass, Zakat calculator, Ramadan 2026 guide and Scholar AI. Free for 1.8 billion Muslims."
        keywords="prayer times near me, prayer times today, fajr time today, islamic prayer times, salah times, namaz time, أوقات الصلاة, horario de oracion, waktu sholat, ramadan 2026"
        canonical="https://www.alummahai.com/"
        schema={[schema, faqSchema]}
      />

      {/* ══ 1. HERO ══ */}
      <motion.section ref={heroRef} style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style2={{ background: '#060f1e' }}>
        <IslamicCanvas />
        {/* Depth layers */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(212,175,55,0.05), transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(6,15,30,0.88))' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #060f1e)' }} />

        <div className="relative z-10 flex flex-col items-center text-center px-4 space-y-7 pt-4">
          {/* Hijri */}
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <HijriDate />
          </motion.div>

          {/* Brand */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.1 }}>
            <h1 className="font-display font-black leading-none tracking-tight" style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)', color: '#FAF8F3', textShadow: '0 0 80px rgba(212,175,55,0.1)' }}>
              UMMAH <span className="animate-shimmer">AI</span>
            </h1>
            <p className="text-[10px] font-black tracking-[0.55em] uppercase mt-3" style={{ color: '#FAF8F3', opacity: 0.38 }}>
              Global Islamic Platform · Prayer Times · Quran · Qibla · Zakat
            </p>
          </motion.div>

          {/* Countdown card */}
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.35, type: 'spring', damping: 16 }}
            className="relative px-10 py-7 rounded-3xl backdrop-blur-md"
            style={{ background: 'rgba(6,15,30,0.55)', border: '1px solid rgba(212,175,55,0.14)', boxShadow: '0 0 50px rgba(212,175,55,0.04), inset 0 1px 0 rgba(212,175,55,0.08)' }}>
            {/* Corner ornaments */}
            {([[-1, -1, 'rotate-0'], [-1, 1, 'rotate-90'], [1, 1, 'rotate-180'], [1, -1, '-rotate-90']] as [number, number, string][]).map(([sx, sy, rot], i) => (
              <svg key={i} className={`absolute ${rot}`} style={{ opacity: 0.25, top: sx === -1 ? 4 : 'auto', bottom: sx === 1 ? 4 : 'auto', left: sy === -1 ? 4 : 'auto', right: sy === 1 ? 4 : 'auto' }} width="18" height="18" viewBox="0 0 18 18">
                <path d="M2 2 L2 7 M2 2 L7 2" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
                <circle cx="2" cy="2" r="1.5" fill="#D4AF37" />
              </svg>
            ))}
            <PrayerCountdown />
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
            className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <Link to="/quran" className="group relative inline-flex items-center space-x-2 px-7 py-3.5 rounded-full font-black text-xs uppercase tracking-widest overflow-hidden hover:scale-105 transition-all"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F1D279)', color: '#060f1e', boxShadow: '0 0 28px rgba(212,175,55,0.28)' }}>
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" style={{ background: 'rgba(255,255,255,0.2)' }} />
              <span className="relative flex items-center space-x-2"><BookOpen className="w-3.5 h-3.5" /><span>Read Quran</span></span>
            </Link>
            <Link to="/scholar" className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full font-black text-xs uppercase tracking-widest transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}>
              <Sparkles className="w-3.5 h-3.5" /><span>Ask Scholar AI</span>
            </Link>
          </motion.div>

          {/* Badge */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="animate-float-badge text-[9px] font-black tracking-widest uppercase px-5 py-2 rounded-full"
            style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.12)', color: '#D4AF37', opacity: 0.5 }}>
            ✦ 190+ Countries · GPS Accurate · No Signup ✦
          </motion.p>
        </div>

        {/* Scroll arrow */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.25))' }} />
          <ChevronDown className="w-4 h-4" style={{ color: 'rgba(212,175,55,0.22)' }} />
        </motion.div>
      </motion.section>

      {/* ══ 2. TRUST BAR ══ */}
      <TrustBar />

      {/* ══ 3. PRAYER WIDGET ══ */}
      <section className="max-w-2xl mx-auto px-4 py-16">
        <PrayerWidget />
      </section>

      {/* ══ 4. VERSE ══ */}
      <VerseCarousel />

      {/* ══ 5. CORE TOOLS ══ */}
      <CoreTools />

      {/* ══ 6. ARTICLES & SEO ══ */}
      <SEOSection />

      {/* ══ 7. SHOP (discreto) ══ */}
      <ShopPreview />

      {/* ══ 8. TASBEEH ══ */}
      <div id="tasbeeh"><DigitalTasbeeh /></div>

      {/* ══ 9. STATS ══ */}
      <StatsBar />

      {/* ══ 10. CTA FINAL ══ */}
      <FinalCTA />
    </div>
  );
}
