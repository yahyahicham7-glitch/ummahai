import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ChevronRight, Loader2 } from 'lucide-react';
import { getPrayerTimes, searchCity, getCityFromCoords, type PrayerTimes, type CityInfo } from '@/src/services/prayerService';
import { format, parse } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';

const PRAYERS = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;
const ICONS: Record<string, string> = { Fajr:'🌅', Sunrise:'☀️', Dhuhr:'🌤', Asr:'🌇', Maghrib:'🌆', Isha:'🌙' };

export function PrayerWidget() {
  const [times,   setTimes]   = useState<PrayerTimes | null>(null);
  const [city,    setCity]    = useState('Detecting...');
  const [loading, setLoading] = useState(true);
  const [query,   setQuery]   = useState('');
  const [results, setResults] = useState<CityInfo[]>([]);
  const [next,    setNext]    = useState<{ name: string; time: string } | null>(null);
  const [busy,    setBusy]    = useState(false);
  const stRef = useRef<ReturnType<typeof setTimeout>>();

  async function loadCity(lat: number, lng: number, fallback?: string) {
    const [t, c] = await Promise.all([
      getPrayerTimes(lat, lng),
      fallback ? Promise.resolve(fallback) : getCityFromCoords(lat, lng),
    ]);
    setTimes(t); setCity(c); setLoading(false);
    try { localStorage.setItem(`pw_${format(new Date(),'yyyy-MM-dd')}`, JSON.stringify({ t, c })); } catch {}
  }

  useEffect(() => {
    // Check if we have cached data for today
    const key = `pw_${format(new Date(),'yyyy-MM-dd')}`;
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const { t, c } = JSON.parse(raw);
        setTimes(t); setCity(c); setLoading(false); return;
      }
    } catch {}
    // No cache: show search UI instead of auto-requesting location
    setLoading(false);
  }, []);

  // Called when user explicitly clicks "Use my location"
  function requestGPS() {
    setLoading(true);
    if (!navigator.geolocation) { loadCity(51.5074, -0.1278, 'London'); return; }
    navigator.geolocation.getCurrentPosition(
      p => loadCity(p.coords.latitude, p.coords.longitude),
      () => loadCity(51.5074, -0.1278, 'London'),
      { timeout: 8000 }
    );
  }

  useEffect(() => {
    if (!times) return;
    const calc = () => {
      const now = new Date();
      const active = ['Fajr','Dhuhr','Asr','Maghrib','Isha'];
      for (const [n, t] of Object.entries(times)) {
        if (!active.includes(n)) continue;
        if (parse(String(t), 'HH:mm', now) > now) { setNext({ name: n, time: String(t) }); return; }
      }
      setNext({ name: 'Fajr', time: String(times.Fajr) });
    };
    calc();
    const iv = setInterval(calc, 60000);
    return () => clearInterval(iv);
  }, [times]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    clearTimeout(stRef.current);
    stRef.current = setTimeout(async () => {
      setBusy(true);
      try { setResults(await searchCity(query)); } catch { setResults([]); }
      setBusy(false);
    }, 350);
  }, [query]);

  const pickCity = async (c: CityInfo) => {
    setLoading(true);
    const t = await getPrayerTimes(c.latitude, c.longitude);
    setTimes(t); setCity(c.name); setLoading(false);
    setQuery(''); setResults([]);
  };

  if (loading) return (
    <div style={{ background: 'linear-gradient(135deg,#0a2540,#0d3060)', borderRadius: 20, padding: '60px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 320 }}>
      <Loader2 size={30} style={{ color: '#D4AF37', marginBottom: 14, animation: 'spin 1s linear infinite' }} />
      <p style={{ fontFamily: "'DM Sans',sans-serif", color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Calculating prayer times...</p>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  // Show search/GPS prompt when no times loaded yet
  if (!times) return (
    <div style={{ background: 'linear-gradient(135deg,#0a2540,#0d3060)', borderRadius: 20, padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, minHeight: 280 }}>
      <div style={{ fontSize: '2.2rem' }}>🕌</div>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: '1.2rem', color: '#fff', marginBottom: 6 }}>Prayer Times</h3>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 260 }}>
          Enter your city or share your location for accurate prayer times.
        </p>
      </div>
      {/* GPS button — user must click, no auto-prompt */}
      <button onClick={requestGPS}
        style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#D4AF37', color: '#0a2540', border: 'none', borderRadius: 99, padding: '11px 22px', fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', boxShadow: '0 4px 16px rgba(212,175,55,0.35)', transition: 'transform 0.15s' }}
        onMouseEnter={e => (e.currentTarget.style.transform='scale(1.03)')}
        onMouseLeave={e => (e.currentTarget.style.transform='scale(1)')}>
        <MapPin size={14} /> Use my location
      </button>
      {/* Search box */}
      <div style={{ width: '100%', maxWidth: 320, position: 'relative' }}>
        <Search size={13} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
        <input value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Or search your city..."
          style={{ width: '100%', padding: '10px 12px 10px 34px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', fontFamily: "'DM Sans',sans-serif", fontSize: '0.85rem', color: '#fff', background: 'rgba(255,255,255,0.08)', outline: 'none', boxSizing: 'border-box' }}
          onFocus={e => (e.target.style.borderColor='rgba(212,175,55,0.5)')}
          onBlur={e =>  (e.target.style.borderColor='rgba(255,255,255,0.15)')} />
        {busy && <Loader2 size={12} style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)', color: '#D4AF37', animation: 'spin 1s linear infinite' }} />}
        {results.length > 0 && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50, marginTop: 5, background: '#fff', borderRadius: 10, border: '1px solid rgba(10,37,64,0.1)', boxShadow: '0 14px 40px rgba(10,37,64,0.18)', overflow: 'hidden' }}>
            {results.slice(0,5).map((r,i) => (
              <button key={i} onClick={() => pickCity(r)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '10px 14px', border: 'none', background: 'transparent', cursor: 'pointer', borderBottom: i<results.length-1 ? '1px solid rgba(10,37,64,0.06)' : 'none', transition: 'background 0.12s' }}
                onMouseEnter={e=>(e.currentTarget.style.background='rgba(212,175,55,0.07)')}
                onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '0.86rem', color: '#0a2540' }}>{r.name}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.68rem', color: 'rgba(10,37,64,0.45)' }}>{r.country}</div>
                </div>
                <ChevronRight size={13} style={{ color: 'rgba(10,37,64,0.3)' }} />
              </button>
            ))}
          </div>
        )}
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
      style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 24px 64px rgba(10,37,64,0.2)', border: '1px solid rgba(10,37,64,0.08)' }}>

      {/* Header — dark navy */}
      <div style={{ background: 'linear-gradient(135deg,#0a2540 0%,#0d3060 100%)', padding: '26px 26px 20px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18, flexWrap: 'wrap', gap: 10 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
              <MapPin size={12} style={{ color: '#D4AF37' }} />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', fontWeight: 800, color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '0.16em' }}>{city}</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.4rem,3.5vw,1.85rem)', color: '#ffffff', lineHeight: 1.1 }}>Prayer Times</h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{format(new Date(), 'EEEE, MMMM do yyyy')}</p>
          </div>
          {next && (
            <div style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.22)', borderRadius: 12, padding: '10px 14px', textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.55rem', fontWeight: 800, color: 'rgba(212,175,55,0.65)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 3 }}>Up Next</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: '1.1rem', color: '#D4AF37', lineHeight: 1 }}>{next.name}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{next.time}</div>
            </div>
          )}
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={13} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.28)', pointerEvents: 'none' }} />
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search city..."
            style={{ width: '100%', padding: '10px 12px 10px 34px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', fontFamily: "'DM Sans',sans-serif", fontSize: '0.85rem', color: '#ffffff', background: 'rgba(255,255,255,0.07)', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
            onFocus={e => (e.target.style.borderColor = 'rgba(212,175,55,0.5)')}
            onBlur={e =>  (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
          {busy && <Loader2 size={12} style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)', color: '#D4AF37', animation: 'spin 1s linear infinite' }} />}
        </div>

        <AnimatePresence>
          {results.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.13 }}
              style={{ position: 'absolute', left: 26, right: 26, zIndex: 50, marginTop: 5, background: '#ffffff', borderRadius: 12, border: '1px solid rgba(10,37,64,0.1)', boxShadow: '0 14px 40px rgba(10,37,64,0.18)', overflow: 'hidden' }}>
              {results.slice(0, 5).map((r, i) => (
                <button key={i} onClick={() => pickCity(r)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '10px 14px', border: 'none', background: 'transparent', cursor: 'pointer', borderBottom: i < results.length - 1 ? '1px solid rgba(10,37,64,0.06)' : 'none', transition: 'background 0.12s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.07)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '0.86rem', color: '#0a2540' }}>{r.name}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.68rem', color: 'rgba(10,37,64,0.45)' }}>{r.country}</div>
                  </div>
                  <ChevronRight size={13} style={{ color: 'rgba(10,37,64,0.3)' }} />
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Prayer rows — darker blue */}
      <div style={{ background: '#0a2540', padding: '14px 18px' }}>
        {times && PRAYERS.map((name, i) => {
          const time = (times as any)[name];
          if (!time) return null;
          const isNext = next?.name === name;
          return (
            <motion.div key={name}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 14px', borderRadius: 11, marginBottom: 5, background: isNext ? 'rgba(212,175,55,0.11)' : 'rgba(255,255,255,0.035)', border: `1px solid ${isNext ? 'rgba(212,175,55,0.32)' : 'rgba(255,255,255,0.06)'}`, transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: isNext ? '#D4AF37' : 'rgba(255,255,255,0.12)', boxShadow: isNext ? '0 0 8px rgba(212,175,55,0.6)' : 'none', flexShrink: 0 }} />
                <span style={{ fontSize: '1rem', lineHeight: 1 }}>{ICONS[name]}</span>
                <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: isNext ? 900 : 700, fontSize: '0.98rem', color: isNext ? '#D4AF37' : 'rgba(255,255,255,0.72)' }}>{name}</span>
                {isNext && <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.54rem', fontWeight: 800, background: 'rgba(212,175,55,0.14)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.28)', padding: '2px 7px', borderRadius: 99, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Now</span>}
              </div>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: isNext ? 800 : 400, fontSize: '1rem', color: isNext ? '#F1D279' : 'rgba(255,255,255,0.45)', fontVariantNumeric: 'tabular-nums' }}>{time}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ background: '#071a2e', padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'center' }}>
        <Link to={`/prayer-times/${city.toLowerCase().replace(/\s+/g,'-')}`}
          style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'DM Sans',sans-serif", fontSize: '0.68rem', fontWeight: 800, color: '#D4AF37', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
          Full schedule <ChevronRight size={11} />
        </Link>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </motion.div>
  );
}
