import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  MapPin, Search, Moon, BookOpen, Compass, Calculator,
  Star, MessageSquare, ShoppingBag, ArrowRight, ChevronDown, Sparkles,
} from 'lucide-react';
import { SEO } from '../components/SEO';

/* ─── CONSTANTS ─────────────────────────────────────────────────────────────── */
const C = {
  navy: '#0a2540',
  navyDark: '#060f1e',
  navyMid: '#0d1f3c',
  gold: '#D4AF37',
  goldLight: '#F1D279',
  white: '#ffffff',
  whiteA55: 'rgba(255,255,255,0.55)',
  whiteA38: 'rgba(255,255,255,0.38)',
  whiteA15: 'rgba(255,255,255,0.15)',
  whiteA07: 'rgba(255,255,255,0.07)',
  goldA20: 'rgba(212,175,55,0.20)',
  goldA12: 'rgba(212,175,55,0.12)',
  goldA08: 'rgba(212,175,55,0.08)',
  cardBg: 'rgba(255,255,255,0.04)',
  cardBorder: 'rgba(255,255,255,0.08)',
  cardHoverBg: 'rgba(212,175,55,0.06)',
  cardHoverBorder: 'rgba(212,175,55,0.22)',
};

const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;
const PRAYER_EMOJI: Record<string, string> = {
  Fajr: '🌙', Dhuhr: '☀️', Asr: '🌤', Maghrib: '🌅', Isha: '🌃',
};

const VERSES = [
  { ar: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا', en: 'Indeed, with hardship comes ease.', ref: 'Ash-Sharh 94:6' },
  { ar: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ', en: 'When My servants ask about Me — I am near.', ref: 'Al-Baqarah 2:186' },
  { ar: 'فَاذْكُرُونِي أَذْكُرْكُمْ', en: 'Remember Me and I will remember you.', ref: 'Al-Baqarah 2:152' },
  { ar: 'وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ', en: 'He is with you wherever you are.', ref: 'Al-Hadid 57:4' },
];

/* ─── CANVAS BACKGROUND ──────────────────────────────────────────────────────
   Elegant Islamic geometry — decorative, NOT distracting
   ─────────────────────────────────────────────────────────────────────────── */
function IslamicCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ctx = el.getContext('2d')!;

    const resize = () => { el.width = window.innerWidth; el.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / el.width, y: e.clientY / el.height };
    };
    window.addEventListener('mousemove', onMouse);

    const drawStar8 = (x: number, y: number, r: number, rot: number, a: number) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha = a;
      ctx.strokeStyle = C.gold; ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let i = 0; i < 16; i++) {
        const angle = (i * Math.PI) / 8;
        const radius = i % 2 === 0 ? r : r * 0.42;
        const px = radius * Math.cos(angle), py = radius * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath(); ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, r * 0.3, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    };

    let frame = 0;
    const render = () => {
      frame++;
      const t = frame * 0.0015;
      const W = el.width, H = el.height;
      ctx.clearRect(0, 0, W, H);

      // Subtle mouse-reactive radial glow
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const grd = ctx.createRadialGradient(W * mx, H * my, 0, W * mx, H * my, W * 0.6);
      grd.addColorStop(0, 'rgba(212,175,55,0.035)'); grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);

      // Star grid — very subtle
      const sp = 145, cols = Math.ceil(W / sp) + 2, rows = Math.ceil(H / sp) + 2;
      for (let row = -1; row <= rows; row++) {
        for (let col = -1; col <= cols; col++) {
          const cx = col * sp + (row % 2 === 0 ? 0 : sp * 0.5);
          const cy = row * sp * 0.866;
          const dist = Math.sqrt(((cx / W) - 0.5) ** 2 + ((cy / H) - 0.5) ** 2);
          const pulse = 0.45 + 0.55 * Math.sin(t * 1.1 + col * 0.55 + row * 0.4);
          const alpha = (0.01 + 0.022 * (1 - Math.min(dist * 1.7, 1))) * pulse;
          drawStar8(cx, cy, 18 + 3 * Math.sin(t * 0.4 + col + row), t * 0.05 + col * 0.01, alpha);
        }
      }

      // Floating dust — very minimal
      for (let i = 0; i < 20; i++) {
        const s = i * 137.5;
        const px = ((s * 13.7 + t * (4 + (i % 4) * 2)) % W + W) % W;
        const py = ((s * 7.3 + t * (3 + (i % 3) * 1.5)) % H + H) % H;
        ctx.save(); ctx.globalAlpha = 0.06 + 0.1 * Math.sin(t * 1.8 + i);
        ctx.fillStyle = C.gold; ctx.beginPath();
        ctx.arc(px, py, 0.5 + 0.5 * ((Math.sin(s) + 1) / 2), 0, Math.PI * 2); ctx.fill();
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

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen', opacity: 0.85 }}
    />
  );
}

/* ─── HIJRI DATE ─────────────────────────────────────────────────────────────── */
function HijriDate() {
  const h = useMemo(() => {
    const now = new Date();
    const jd = Math.floor(now.getTime() / 86400000) + 2440588;
    const l = jd - 1948440 + 10632, n = Math.floor((l - 1) / 10631);
    const l2 = l - 10631 * n + 354;
    const j = Math.floor((10985 - l2) / 5316) * Math.floor(50 * l2 / 17719) + Math.floor(l2 / 5670) * Math.floor(43 * l2 / 15238);
    const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor(17719 * j / 50) - Math.floor(j / 16) * Math.floor(15238 * j / 43) + 29;
    const month = Math.floor(24 * l3 / 709), day = l3 - Math.floor(709 * month / 24), year = 30 * n + j - 30;
    const months = ['Muharram', 'Safar', "Rabi' al-Awwal", "Rabi' al-Thani", 'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', "Sha'ban", 'Ramadan', 'Shawwal', "Dhul Qi'dah", 'Dhul Hijjah'];
    return { day, month: months[Math.max(0, month - 1)] || '', year };
  }, []);
  return (
    <span
      className="inline-flex items-center px-3 py-1.5 rounded-full text-[9px] font-black tracking-[0.3em] uppercase"
      style={{ background: C.goldA08, border: `1px solid ${C.goldA20}`, color: C.gold, opacity: 0.85 }}
    >
      {h.day} {h.month} {h.year} AH
    </span>
  );
}

/* ─── PRAYER WIDGET (hero right panel) ───────────────────────────────────────── */
function PrayerPanel() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState('');
  const [prayers, setPrayers] = useState<{ name: string; time: string; isNext: boolean }[]>([]);
  const [countdown, setCountdown] = useState('');
  const [nextName, setNextName] = useState('');

  // Load from cache
  useEffect(() => {
    const loadCache = () => {
      try {
        const raw = localStorage.getItem('prayerTimes');
        if (!raw) return;
        const data = JSON.parse(raw);
        const timings = data?.data?.timings;
        const meta = data?.data?.meta;
        if (!timings) return;
        const loc = meta?.timezone?.split('/').pop()?.replace(/_/g, ' ') || '';
        setCity(loc);
        const now = new Date();
        const nowM = now.getHours() * 60 + now.getMinutes();
        let nextM = 24 * 60, nextN = 'Fajr';
        PRAYERS.forEach(p => {
          const t = timings[p]; if (!t) return;
          const [h, m] = t.split(':').map(Number); const total = h * 60 + m;
          if (total > nowM && total < nextM) { nextM = total; nextN = p; }
        });
        setNextName(nextN);
        setPrayers(PRAYERS.map(p => ({ name: p, time: (timings[p] || '--:--').slice(0, 5), isNext: p === nextN })));
      } catch { /* noop */ }
    };
    loadCache();
    const id = setInterval(loadCache, 30000);
    return () => clearInterval(id);
  }, []);

  // Countdown
  useEffect(() => {
    const tick = () => {
      try {
        const raw = localStorage.getItem('prayerTimes');
        if (!raw) return;
        const timings = JSON.parse(raw)?.data?.timings;
        if (!timings) return;
        const now = new Date();
        const nowS = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        let nextS = 24 * 3600;
        PRAYERS.forEach(p => {
          const t = timings[p]; if (!t) return;
          const [h, m] = t.split(':').map(Number); const s = h * 3600 + m * 60;
          if (s > nowS && s < nextS) nextS = s;
        });
        if (nextS === 24 * 3600) {
          const f = timings['Fajr'];
          if (f) { const [h, m] = f.split(':').map(Number); nextS = h * 3600 + m * 60 + 24 * 3600; }
        }
        const diff = Math.max(0, nextS - nowS);
        const h = Math.floor(diff / 3600), min = Math.floor((diff % 3600) / 60), sec = diff % 60;
        setCountdown(`${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`);
      } catch { /* noop */ }
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);

  const fetchGPS = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const pos = await new Promise<GeolocationPosition>((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, { timeout: 9000 })
      );
      const { latitude: lat, longitude: lon } = pos.coords;
      const d = new Date();
      const r = await fetch(
        `https://api.aladhan.com/v1/timings/${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}?latitude=${lat}&longitude=${lon}&method=2`
      );
      const data = await r.json();
      if (data.code !== 200) throw new Error();
      localStorage.setItem('prayerTimes', JSON.stringify(data));
      // reload
      const timings = data.data.timings;
      const meta = data.data.meta;
      const loc = meta?.timezone?.split('/').pop()?.replace(/_/g, ' ') || 'Your Location';
      setCity(loc);
      const now = new Date();
      const nowM = now.getHours() * 60 + now.getMinutes();
      let nextM = 24 * 60, nextN = 'Fajr';
      PRAYERS.forEach(p => {
        const t = timings[p]; if (!t) return;
        const [h, m] = t.split(':').map(Number); const total = h * 60 + m;
        if (total > nowM && total < nextM) { nextM = total; nextN = p; }
      });
      setNextName(nextN);
      setPrayers(PRAYERS.map(p => ({ name: p, time: (timings[p] || '--:--').slice(0, 5), isNext: p === nextN })));
    } catch {
      setError('Location access denied. Search your city below.');
    } finally { setLoading(false); }
  }, []);

  const fetchCity = useCallback(async (q = searchInput) => {
    if (!q.trim()) return;
    setLoading(true); setError('');
    try {
      const d = new Date();
      const r = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(q.trim())}&country=&method=2&date=${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
      );
      const data = await r.json();
      if (data.code !== 200) throw new Error();
      localStorage.setItem('prayerTimes', JSON.stringify(data));
      const timings = data.data.timings;
      setCity(q.trim());
      const now = new Date();
      const nowM = now.getHours() * 60 + now.getMinutes();
      let nextM = 24 * 60, nextN = 'Fajr';
      PRAYERS.forEach(p => {
        const t = timings[p]; if (!t) return;
        const [h, m] = t.split(':').map(Number); const total = h * 60 + m;
        if (total > nowM && total < nextM) { nextM = total; nextN = p; }
      });
      setNextName(nextN);
      setPrayers(PRAYERS.map(p => ({ name: p, time: (timings[p] || '--:--').slice(0, 5), isNext: p === nextN })));
    } catch {
      setError('City not found. Try "London", "Dubai" or "Cairo".');
    } finally { setLoading(false); }
  }, [searchInput]);

  const hasTimes = prayers.length > 0;

  return (
    <div
      className="rounded-2xl p-6 relative overflow-hidden"
      style={{
        background: 'rgba(10,37,64,0.75)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(212,175,55,0.18)',
        boxShadow: '0 8px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(212,175,55,0.09)',
      }}
    >
      {/* Corner accents */}
      {[['top-3 left-3', 'M2 8 L2 2 L8 2'], ['top-3 right-3 rotate-90', 'M2 8 L2 2 L8 2'],
        ['bottom-3 right-3 rotate-180', 'M2 8 L2 2 L8 2'], ['bottom-3 left-3 -rotate-90', 'M2 8 L2 2 L8 2']].map(([cls, d], i) => (
        <svg key={i} className={`absolute ${cls}`} width="10" height="10" viewBox="0 0 10 10" style={{ opacity: 0.3 }}>
          <path d={d} stroke={C.gold} strokeWidth="1.2" fill="none" />
        </svg>
      ))}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1.5">
          <MapPin style={{ width: '0.75rem', height: '0.75rem', color: C.gold }} />
          <span className="text-[11px] font-black" style={{ color: C.whiteA55 }}>
            {city || 'Prayer Times'}
          </span>
        </div>
        {countdown && nextName && (
          <div className="text-right">
            <div className="text-[8px] font-black uppercase tracking-wider" style={{ color: C.gold, opacity: 0.55 }}>
              Until {nextName}
            </div>
            <div className="text-sm font-black tabular-nums" style={{ color: C.white }}>{countdown}</div>
          </div>
        )}
      </div>

      {/* Prayer times OR empty state */}
      {hasTimes ? (
        <div className="grid grid-cols-5 gap-1.5 mb-5">
          {prayers.map(p => (
            <div key={p.name} className="text-center py-2.5 px-1 rounded-xl transition-all duration-200"
              style={{
                background: p.isNext ? 'rgba(212,175,55,0.13)' : C.cardBg,
                border: `1px solid ${p.isNext ? 'rgba(212,175,55,0.38)' : C.cardBorder}`,
              }}>
              <div className="text-sm mb-0.5">{PRAYER_EMOJI[p.name]}</div>
              <div className="text-[7.5px] font-black uppercase tracking-wide" style={{ color: p.isNext ? C.gold : C.whiteA38 }}>
                {p.name}
              </div>
              <div className="text-[10px] font-black tabular-nums mt-0.5" style={{ color: p.isNext ? C.white : C.whiteA55 }}>
                {p.time}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-5">
          <p className="text-xs text-center mb-4" style={{ color: C.whiteA38 }}>Get accurate prayer times for your city</p>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-2">
        <button
          onClick={fetchGPS}
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all duration-200 hover:scale-[1.01]"
          style={{
            background: loading ? C.goldA12 : `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
            color: loading ? C.gold : C.navyDark,
            opacity: loading ? 0.7 : 1,
            border: loading ? `1px solid ${C.goldA20}` : 'none',
          }}
        >
          <MapPin style={{ width: '0.8rem', height: '0.8rem' }} />
          <span>{loading ? 'Detecting…' : 'Use My Location'}</span>
        </button>
        <div className="flex space-x-2">
          <input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchCity()}
            placeholder="Search city (e.g. London)"
            className="flex-1 px-3 py-2.5 rounded-xl text-xs font-medium outline-none transition-all"
            style={{
              background: C.cardBg, border: `1px solid ${C.cardBorder}`,
              color: C.white,
            }}
            onFocus={e => { e.currentTarget.style.borderColor = C.goldA20; }}
            onBlur={e => { e.currentTarget.style.borderColor = C.cardBorder; }}
          />
          <button
            onClick={() => fetchCity()}
            disabled={loading}
            className="px-3.5 rounded-xl transition-all hover:scale-105"
            style={{ background: C.cardBg, border: `1px solid rgba(212,175,55,0.22)` }}
          >
            <Search style={{ width: '0.9rem', height: '0.9rem', color: C.gold }} />
          </button>
        </div>
        {error && (
          <p className="text-[10px] text-center py-1" style={{ color: '#ff6b6b' }}>{error}</p>
        )}
      </div>

      {/* Quick tool links */}
      <div className="grid grid-cols-3 gap-1.5 mt-4">
        {[
          { icon: Compass, label: 'Qibla', href: '/qibla' },
          { icon: BookOpen, label: 'Quran', href: '/quran' },
          { icon: Calculator, label: 'Zakat', href: '/zakat' },
        ].map(item => (
          <Link key={item.href} to={item.href}
            className="flex flex-col items-center py-2.5 rounded-xl font-black text-[9px] uppercase tracking-wide transition-all duration-200 hover:scale-[1.03]"
            style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, color: C.whiteA38 }}
            onMouseEnter={e => { e.currentTarget.style.background = C.cardHoverBg; e.currentTarget.style.color = C.gold; e.currentTarget.style.borderColor = C.cardHoverBorder; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.cardBg; e.currentTarget.style.color = C.whiteA38; e.currentTarget.style.borderColor = C.cardBorder; }}
          >
            <item.icon style={{ width: '0.85rem', height: '0.85rem', marginBottom: '0.25rem' }} />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─── SECTION HEADER ─────────────────────────────────────────────────────────── */
function SectionHeader({ sup, title, accent }: { sup: string; title: string; accent: string }) {
  return (
    <div className="mb-12">
      <p className="text-[9px] font-black tracking-[0.45em] uppercase mb-3" style={{ color: C.gold, opacity: 0.55 }}>{sup}</p>
      <h2 className="text-3xl md:text-4xl font-black leading-tight" style={{ color: C.white, letterSpacing: '-0.02em' }}>
        {title}<br />
        <span style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {accent}
        </span>
      </h2>
    </div>
  );
}

/* ─── CARD ───────────────────────────────────────────────────────────────────── */
function Card({ to, icon: Icon, title, desc, tag, delay = 0, isInView }: {
  to: string; icon: React.ElementType; title: string; desc: string; tag?: string; delay?: number; isInView: boolean;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }}>
      <Link
        to={to}
        className="group flex flex-col h-full p-6 rounded-2xl transition-all duration-250"
        style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}` }}
        onMouseEnter={e => { e.currentTarget.style.background = C.cardHoverBg; e.currentTarget.style.borderColor = C.cardHoverBorder; e.currentTarget.style.transform = 'translateY(-3px)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = C.cardBg; e.currentTarget.style.borderColor = C.cardBorder; e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        <div className="flex items-start justify-between mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: C.goldA08, border: `1px solid ${C.goldA20}` }}>
            <Icon style={{ width: '1rem', height: '1rem', color: C.gold }} />
          </div>
          {tag && (
            <span className="text-[7.5px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full ml-2 flex-shrink-0"
              style={{ background: C.goldA08, color: C.gold, opacity: 0.75, border: `1px solid ${C.goldA12}` }}>
              {tag}
            </span>
          )}
        </div>
        <h3 className="font-black text-sm mb-2 leading-snug" style={{ color: C.white }}>{title}</h3>
        <p className="text-xs leading-relaxed flex-grow" style={{ color: C.whiteA38 }}>{desc}</p>
        <div className="mt-4 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-[8px] font-black tracking-widest uppercase" style={{ color: C.gold }}>Open</span>
          <ArrowRight style={{ width: '0.7rem', height: '0.7rem', color: C.gold }} />
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── TRUST BAR ──────────────────────────────────────────────────────────────── */
function TrustBar() {
  const items = [
    'Accurate prayer times by location',
    'Real-time Qibla direction',
    'Quran with audio & translations',
    'Clean Islamic experience',
    'Always free · No account needed',
    '190+ countries · 6M+ cities',
  ];
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-3.5" style={{ background: 'rgba(255,255,255,0.018)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: `linear-gradient(to right, ${C.navyDark}, transparent)` }} />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: `linear-gradient(to left, ${C.navyDark}, transparent)` }} />
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="mx-12 flex items-center space-x-2 text-[9.5px] font-black tracking-widest uppercase"
            style={{ color: 'rgba(255,255,255,0.3)' }}>
            <span style={{ color: C.gold, opacity: 0.45 }}>✦</span>
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── CORE TOOLS ─────────────────────────────────────────────────────────────── */
function CoreTools() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const tools = [
    { icon: Moon, title: 'Prayer Times', desc: 'GPS-precise Fajr, Dhuhr, Asr, Maghrib & Isha for your exact city — accurate to the minute.', href: '/', tag: 'Most Used' },
    { icon: Compass, title: 'Qibla Finder', desc: 'Real-time compass pointing to the Kaaba from anywhere on Earth. Works offline too.', href: '/qibla' },
    { icon: BookOpen, title: 'Holy Quran', desc: 'Complete Quran with 15 translations, transliteration and audio recitation.', href: '/quran', tag: '15 Languages' },
    { icon: Calculator, title: 'Zakat Calculator', desc: 'Calculate your exact annual Zakat obligation for 2026 in under 2 minutes.', href: '/zakat', tag: '2026' },
  ];
  return (
    <section ref={ref} className="py-24 px-5 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <SectionHeader sup="Core Tools" title="Everything a Muslim needs." accent="Always free." />
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((t, i) => <Card key={t.href} to={t.href} icon={t.icon} title={t.title} desc={t.desc} tag={t.tag} delay={i * 0.07} isInView={isInView} />)}
      </div>
    </section>
  );
}

/* ─── DAILY VERSE ─────────────────────────────────────────────────────────────── */
function DailyVerse() {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => { const id = setInterval(() => setIdx(i => (i + 1) % VERSES.length), 9000); return () => clearInterval(id); }, []);
  return (
    <section ref={ref} className="px-5 max-w-6xl mx-auto pb-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
        className="rounded-3xl p-10 md:p-14 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(13,31,60,0.9) 0%, rgba(6,15,30,0.95) 100%)', border: `1px solid ${C.goldA20}` }}>
        <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none opacity-50"
          style={{ background: `radial-gradient(circle at 80% 20%, rgba(212,175,55,0.06), transparent 65%)` }} />
        <div className="relative text-center max-w-2xl mx-auto">
          <p className="text-[8.5px] font-black tracking-[0.5em] uppercase mb-8" style={{ color: C.gold, opacity: 0.45 }}>Daily Verse</p>
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }} transition={{ duration: 0.6 }} className="space-y-5">
              <p className="text-2xl md:text-3xl leading-loose" style={{ fontFamily: 'Amiri, serif', color: C.gold, direction: 'rtl', textShadow: '0 0 30px rgba(212,175,55,0.2)' }}>
                {VERSES[idx].ar}
              </p>
              <p className="text-base md:text-lg italic leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif', color: 'rgba(255,255,255,0.62)' }}>
                "{VERSES[idx].en}"
              </p>
              <p className="text-[8.5px] font-black tracking-widest uppercase" style={{ color: C.gold, opacity: 0.38 }}>{VERSES[idx].ref}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center space-x-1.5 mt-8">
            {VERSES.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                style={{ width: i === idx ? '1.5rem' : '0.35rem', height: '0.35rem', borderRadius: '9999px', background: i === idx ? C.gold : 'rgba(255,255,255,0.15)', transition: 'all 0.3s' }} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── DAILY GUIDANCE ─────────────────────────────────────────────────────────── */
function DailyGuidance() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const items = [
    { icon: Star, title: 'Ramadan 2026', desc: 'Suhoor & Iftar times, duas, and a complete guide for the last 10 nights.', href: '/ramadan', tag: 'Guide' },
    { icon: BookOpen, title: 'Islamic Articles', desc: 'In-depth guides on prayer, finance, Hajj, spirituality and more.', href: '/blog', tag: 'Knowledge' },
    { icon: MessageSquare, title: 'Scholar AI', desc: 'Ask any Islamic question. Answers grounded in Quran & authentic Hadith.', href: '/scholar', tag: 'AI' },
    { icon: Sparkles, title: 'Halal Finance', desc: 'Wahed Invest, Islamic ETFs, halal banking and Zakat made simple.', href: '/halal-money', tag: 'Finance' },
  ];
  return (
    <section ref={ref} className="py-20 px-5 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <SectionHeader sup="Daily Guidance" title="Grow in knowledge" accent="and faith." />
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((t, i) => <Card key={t.href} to={t.href} icon={t.icon} title={t.title} desc={t.desc} tag={t.tag} delay={i * 0.07} isInView={isInView} />)}
      </div>
    </section>
  );
}

/* ─── SHOP (discrete) ────────────────────────────────────────────────────────── */
function IslamicStore() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const products = [
    { emoji: '🕌', name: 'Prayer Mats' }, { emoji: '📿', name: 'Tasbih' },
    { emoji: '📖', name: 'Qurans' }, { emoji: '🌙', name: 'Ramadan Essentials' },
  ];
  return (
    <section ref={ref} className="py-12 px-5 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
        className="rounded-3xl px-8 md:px-12 py-10 relative overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${C.cardBorder}` }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xs">
            <p className="text-[9px] font-black tracking-[0.45em] uppercase mb-2" style={{ color: C.gold, opacity: 0.5 }}>Islamic Essentials</p>
            <h2 className="text-2xl font-black mb-2" style={{ color: C.white }}>Islamic Store</h2>
            <p className="text-sm" style={{ color: C.whiteA38 }}>Curated halal products for your spiritual journey.</p>
          </div>
          <div className="flex items-center space-x-3">
            {products.map(p => (
              <div key={p.name} className="text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-1.5"
                  style={{ background: C.goldA08, border: `1px solid ${C.goldA12}` }}>
                  {p.emoji}
                </div>
                <p className="text-[8px] font-black" style={{ color: C.whiteA38 }}>{p.name}</p>
              </div>
            ))}
          </div>
          <Link to="/store"
            className="flex-shrink-0 inline-flex items-center space-x-2 px-6 py-3 rounded-full font-black text-[11px] uppercase tracking-widest transition-all hover:scale-[1.03]"
            style={{ border: `1px solid ${C.goldA20}`, color: C.gold }}
            onMouseEnter={e => { e.currentTarget.style.background = C.goldA08; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
            <ShoppingBag style={{ width: '0.85rem', height: '0.85rem' }} />
            <span>Visit Shop</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── TASBEEH ─────────────────────────────────────────────────────────────────── */
function Tasbeeh() {
  const [count, setCount] = useState(() => { try { return parseInt(localStorage.getItem('tasbeeh_count') || '0'); } catch { return 0; } });
  const [flash, setFlash] = useState(false);
  const [msText, setMsText] = useState('');
  const [ripples, setRipples] = useState<number[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const MS: Record<number, string> = { 33: 'سُبْحَانَ اللَّهِ', 66: 'الْحَمْدُ لِلَّهِ', 99: 'اللَّهُ أَكْبَرُ' };

  const tap = useCallback(() => {
    const n = (count + 1) % 100;
    setCount(n); try { localStorage.setItem('tasbeeh_count', String(n)); } catch { /* noop */ }
    if (MS[n]) { setFlash(true); setMsText(MS[n]); setTimeout(() => setFlash(false), 900); }
    setRipples(r => [...r, Date.now()]); setTimeout(() => setRipples(r => r.slice(1)), 650);
    if (navigator.vibrate) navigator.vibrate(35);
  }, [count]);

  const radius = 48, circ = 2 * Math.PI * radius, dashVal = circ * (count / 99);
  const ringColor = count < 33 ? C.gold : count < 66 ? C.goldLight : '#fff7ae';

  return (
    <section ref={ref} className="py-20 px-5">
      <div className="max-w-xs mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="text-[9px] font-black tracking-[0.45em] uppercase mb-2" style={{ color: C.gold, opacity: 0.5 }}>Digital</p>
          <h2 className="text-2xl font-black mb-8" style={{ color: C.white }}>Tasbeeh Counter</h2>
          <div className="relative inline-flex items-center justify-center" onClick={tap}>
            <svg width="150" height="150" className="absolute" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="75" cy="75" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
              <circle cx="75" cy="75" r={radius} fill="none" stroke={ringColor} strokeWidth="3"
                strokeDasharray={`${dashVal} ${circ}`} strokeLinecap="round"
                style={{ transition: 'stroke-dasharray .25s ease, stroke .4s ease', filter: `drop-shadow(0 0 6px ${ringColor}65)` }} />
            </svg>
            {ripples.map(r => (
              <motion.div key={r} className="absolute rounded-full pointer-events-none"
                style={{ border: `1px solid ${ringColor}45` }}
                initial={{ width: 75, height: 75, opacity: 0.5 }} animate={{ width: 195, height: 195, opacity: 0 }} transition={{ duration: 0.65 }} />
            ))}
            <motion.button
              whileTap={{ scale: 0.92 }}
              className="relative w-32 h-32 rounded-full cursor-pointer select-none"
              style={{
                background: `radial-gradient(circle at 35% 35%, rgba(212,175,55,0.18), rgba(10,37,64,0.96))`,
                border: `1px solid ${C.goldA20}`,
                boxShadow: flash ? `0 0 50px rgba(212,175,55,0.55)` : `0 0 20px rgba(212,175,55,0.07)`,
                transition: 'box-shadow .3s',
              }}>
              <AnimatePresence mode="wait">
                {flash ? (
                  <motion.div key="f" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.4, opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-2">
                    <span style={{ fontFamily: 'Amiri, serif', color: C.gold, fontSize: '0.85rem', textAlign: 'center', lineHeight: 1.4 }}>{msText}</span>
                  </motion.div>
                ) : (
                  <motion.div key="c" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.1, opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black tabular-nums" style={{ color: C.white }}>{count}</span>
                    <span className="text-[7.5px] font-black tracking-widest uppercase mt-0.5" style={{ color: C.gold, opacity: 0.45 }}>tap</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
          <div className="flex justify-center space-x-8 mt-6 mb-5">
            {[33, 66, 99].map(m => (
              <div key={m} className="text-center transition-all duration-300" style={{ opacity: count >= m ? 1 : 0.22 }}>
                <div className="w-1.5 h-1.5 rounded-full mx-auto mb-1"
                  style={{ background: count >= m ? ringColor : 'rgba(255,255,255,0.18)', boxShadow: count >= m ? `0 0 6px ${ringColor}85` : 'none' }} />
                <span className="text-[8px] font-black" style={{ color: C.gold }}>{m}</span>
              </div>
            ))}
          </div>
          <button onClick={() => { setCount(0); try { localStorage.setItem('tasbeeh_count', '0'); } catch { /* noop */ } }}
            className="text-[9px] font-black tracking-widest uppercase transition-colors"
            style={{ color: 'rgba(255,255,255,0.18)' }}
            onMouseEnter={e => (e.currentTarget.style.color = `${C.gold}99`)}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.18)')}>
            ↺ Reset
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CITY SEO GRID ──────────────────────────────────────────────────────────── */
function CityGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const cities = [
    ['🇸🇦', 'Makkah'], ['🇬🇧', 'London'], ['🇹🇷', 'Istanbul'], ['🇦🇪', 'Dubai'],
    ['🇪🇬', 'Cairo'], ['🇮🇩', 'Jakarta'], ['🇫🇷', 'Paris'], ['🇺🇸', 'New York'],
    ['🇲🇾', 'Kuala Lumpur'], ['🇵🇰', 'Karachi'], ['🇪🇸', 'Madrid'], ['🇳🇬', 'Lagos'],
  ];
  return (
    <section ref={ref} className="pb-16 px-5 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <h2 className="text-xl font-black mb-6 text-center" style={{ color: C.white }}>Prayer Times by City</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
          {cities.map(([flag, name]) => (
            <div key={name} className="flex flex-col items-center p-3 rounded-xl"
              style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}` }}>
              <span className="text-xl">{flag}</span>
              <span className="text-[8.5px] font-black mt-1.5 text-center leading-tight" style={{ color: C.whiteA38 }}>{name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─── SEO TEXT BLOCK ─────────────────────────────────────────────────────────── */
function SEOText() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <section ref={ref} className="pb-16 px-5 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
        className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.018)', border: `1px solid ${C.cardBorder}` }}>
        <h2 className="text-xl font-black mb-4" style={{ color: C.white }}>Accurate Prayer Times Worldwide</h2>
        <p className="text-sm leading-relaxed mb-3" style={{ color: C.whiteA38 }}>
          Al Ummah AI provides precise <strong style={{ color: C.whiteA55 }}>prayer times near me today</strong> for over 6 million cities worldwide, using high-precision astronomical calculations and your GPS location. Whether you need <strong style={{ color: C.whiteA55 }}>Fajr time</strong>, <strong style={{ color: C.whiteA55 }}>Dhuhr time</strong>, <strong style={{ color: C.whiteA55 }}>Asr time</strong>, <strong style={{ color: C.whiteA55 }}>Maghrib time</strong>, or <strong style={{ color: C.whiteA55 }}>Isha time</strong>, we deliver times accurate to the minute.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: C.whiteA38 }}>
          Beyond prayer times, Al Ummah AI is your complete Islamic companion — read the <strong style={{ color: C.whiteA55 }}>Holy Quran online</strong>, find the <strong style={{ color: C.whiteA55 }}>Qibla direction</strong>, calculate your <strong style={{ color: C.whiteA55 }}>Zakat 2026</strong>, follow our <strong style={{ color: C.whiteA55 }}>Ramadan 2026 guide</strong>, and ask our <strong style={{ color: C.whiteA55 }}>Scholar AI</strong> — all completely free.
        </p>
      </motion.div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────────────────── */
function Footer() {
  const cols = [
    { label: 'Platform', links: [{ name: 'Prayer Times', href: '/' }, { name: 'Qibla Finder', href: '/qibla' }, { name: 'Holy Quran', href: '/quran' }, { name: 'Zakat', href: '/zakat' }] },
    { label: 'Learn', links: [{ name: 'Ramadan 2026', href: '/ramadan' }, { name: 'Articles', href: '/blog' }, { name: 'Scholar AI', href: '/scholar' }, { name: 'Halal Finance', href: '/halal-money' }] },
    { label: 'Company', links: [{ name: 'About', href: '/about' }, { name: 'Shop', href: '/store' }, { name: 'Privacy', href: '/privacy' }, { name: 'Terms', href: '/terms' }] },
  ];
  return (
    <footer className="border-t px-5 py-14" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(6,15,30,0.6)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
          <div className="max-w-xs">
            <div className="flex items-center space-x-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: C.goldA12, border: `1px solid ${C.goldA20}` }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 1L7.8 4.7L11.7 4.7L8.7 7.1L9.9 10.8L6.5 8.8L3.1 10.8L4.3 7.1L1.3 4.7L5.2 4.7Z" stroke={C.gold} strokeWidth="0.9" fill="none" />
                </svg>
              </div>
              <span className="font-black text-sm" style={{ color: C.white }}>Al Ummah <span style={{ color: C.gold }}>AI</span></span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.28)' }}>
              A global Islamic platform for Prayer Times, Qibla, Quran and daily guidance. Free for 1.8 billion Muslims.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-14 gap-y-2">
            {cols.map(col => (
              <div key={col.label}>
                <p className="text-[8px] font-black tracking-widest uppercase mb-3" style={{ color: C.gold, opacity: 0.45 }}>{col.label}</p>
                <div className="space-y-2">
                  {col.links.map(l => (
                    <Link key={l.href} to={l.href} className="block text-xs transition-colors duration-150"
                      style={{ color: 'rgba(255,255,255,0.3)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}>
                      {l.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.055)' }}>
          <p className="text-[8.5px] font-black tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.16)' }}>
            © 2026 Al Ummah AI · All rights reserved
          </p>
          <div className="flex items-center space-x-4">
            {[{ name: 'Sitemap', href: '/sitemap.xml' }, { name: 'Privacy', href: '/privacy' }, { name: 'Terms', href: '/terms' }].map(l => (
              <Link key={l.href} to={l.href} className="text-[8.5px] font-black tracking-widest uppercase transition-colors"
                style={{ color: 'rgba(255,255,255,0.16)' }}
                onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.16)')}>
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── SCHEMA ──────────────────────────────────────────────────────────────────── */
const APP_SCHEMA = {
  '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Al Ummah AI',
  url: 'https://www.alummahai.com', applicationCategory: 'LifestyleApplication', operatingSystem: 'All',
  description: 'Al Ummah AI is a global Islamic platform providing accurate prayer times by location, Qibla finder, Holy Quran in 15 languages, Zakat calculator and daily Islamic guidance.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};
const FAQ_SCHEMA = {
  '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
    { '@type': 'Question', name: 'How do I find prayer times near me?', acceptedAnswer: { '@type': 'Answer', text: 'Al Ummah AI uses your GPS to show precise Fajr, Dhuhr, Asr, Maghrib and Isha prayer times for your exact location.' } },
    { '@type': 'Question', name: 'Is Al Ummah AI free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free. Prayer times, Quran, Qibla, Zakat calculator and Scholar AI are all free forever with no account needed.' } },
    { '@type': 'Question', name: 'How accurate are the prayer times?', acceptedAnswer: { '@type': 'Answer', text: 'We use high-precision astronomical calculations via the Aladhan API, accurate to the minute for 6 million+ cities worldwide.' } },
  ],
};

/* ─── MAIN HOME EXPORT ───────────────────────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <div style={{ background: C.navyDark, minHeight: '100vh', color: C.white }}>
      <SEO
        title="Al Ummah AI — Prayer Times Near Me, Qibla, Quran & Islamic Platform"
        description="Accurate prayer times by GPS for your city. Qibla finder, Holy Quran in 15 languages, Zakat calculator 2026, Ramadan guide and Scholar AI. Free for 1.8 billion Muslims worldwide."
        keywords="prayer times near me, prayer times today, fajr time, islamic prayer times, salah times, namaz time, qibla direction, quran online, zakat calculator 2026, ramadan 2026, أوقات الصلاة, waktu sholat, horario oracion"
        canonical="https://www.alummahai.com/"
        schema={[APP_SCHEMA, FAQ_SCHEMA]}
      />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      >
        {/* Background */}
        <IslamicCanvas />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 75% 65% at 50% 38%, rgba(212,175,55,0.04), transparent)` }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 100% 100% at 50% 50%, transparent 38%, rgba(6,15,30,0.72))` }} />
        <div className="absolute bottom-0 left-0 right-0 h-52 pointer-events-none" style={{ background: `linear-gradient(to bottom, transparent, ${C.navyDark})` }} />

        <motion.div style={{ y: heroY }} className="relative z-10 max-w-6xl mx-auto px-5 w-full pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center min-h-[calc(100vh-5rem)] py-20">

            {/* ── LEFT ── */}
            <div className="space-y-7 order-2 lg:order-1">
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <HijriDate />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08 }}>
                <h1 className="font-black leading-[1.07] tracking-tight mb-4"
                  style={{ fontSize: 'clamp(2.5rem, 5.8vw, 4.4rem)', color: C.white }}>
                  Your Islamic<br />platform for<br />
                  <span style={{
                    background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldLight} 55%, ${C.gold} 100%)`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    backgroundSize: '200% 100%',
                  }}>
                    prayer & guidance.
                  </span>
                </h1>
                <p className="text-base md:text-lg leading-relaxed max-w-md font-normal" style={{ color: C.whiteA55 }}>
                  Accurate prayer times, Qibla direction, Quran and daily Islamic guidance — free for 1.8 billion Muslims worldwide.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-3">
                <Link to="/quran"
                  className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-200 hover:scale-[1.03] hover:-translate-y-0.5"
                  style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, color: C.navyDark, boxShadow: '0 0 28px rgba(212,175,55,0.28)' }}>
                  <BookOpen style={{ width: '0.85rem', height: '0.85rem' }} />
                  <span>Read Quran</span>
                </Link>
                <Link to="/scholar"
                  className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-200 hover:scale-[1.03] hover:-translate-y-0.5"
                  style={{ border: `1px solid ${C.goldA20}`, color: C.gold, background: 'transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.goldA08; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                  <MessageSquare style={{ width: '0.85rem', height: '0.85rem' }} />
                  <span>Ask Scholar AI</span>
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                className="flex flex-wrap gap-2">
                {['GPS Accurate', 'Free Forever', '190+ Countries', 'No Account'].map(tag => (
                  <span key={tag} className="text-[8.5px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full"
                    style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, color: C.whiteA38 }}>
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT — Product panel ── */}
            <motion.div
              initial={{ opacity: 0, x: 24, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.9, delay: 0.18, type: 'spring', damping: 18 }}
              className="order-1 lg:order-2 w-full"
            >
              <PrayerPanel />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1.5"
          animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}>
          <div className="w-px h-6" style={{ background: `linear-gradient(to bottom, transparent, ${C.goldA20})` }} />
          <ChevronDown style={{ color: 'rgba(212,175,55,0.2)', width: '1.1rem', height: '1.1rem' }} />
        </motion.div>
      </motion.section>

      {/* ── Trust bar ── */}
      <TrustBar />

      {/* ── Core tools ── */}
      <CoreTools />

      {/* ── Daily verse ── */}
      <DailyVerse />

      {/* ── Daily guidance ── */}
      <DailyGuidance />

      {/* ── Shop (discrete) ── */}
      <IslamicStore />

      {/* ── Tasbeeh ── */}
      <Tasbeeh />

      {/* ── SEO city grid ── */}
      <CityGrid />

      {/* ── SEO text ── */}
      <SEOText />

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
