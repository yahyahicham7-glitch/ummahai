import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SEO } from '@/src/components/SEO';
import { MapPin, Search, Navigation, Loader2, AlertCircle, CheckCircle, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { searchCity, type CityInfo } from '@/src/services/prayerService';

/* ─── Math ────────────────────────────────────────────────── */
const KAABA = { lat: 21.4225, lng: 39.8262 };

function calcQibla(lat: number, lng: number): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const φ1 = toRad(lat), φ2 = toRad(KAABA.lat);
  const Δλ = toRad(KAABA.lng - lng);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

function calcDist(lat: number, lng: number): number {
  const R = 6371, toRad = (d: number) => (d * Math.PI) / 180;
  const Δφ = toRad(KAABA.lat - lat), Δλ = toRad(KAABA.lng - lng);
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(toRad(lat)) * Math.cos(toRad(KAABA.lat)) * Math.sin(Δλ / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function dirLabel(deg: number) {
  return ['N','NE','E','SE','S','SW','W','NW'][Math.round(deg / 45) % 8];
}

/* ─── Compass visual ──────────────────────────────────────── */
function CompassDial({ qibla, heading, live }: { qibla: number; heading: number | null; live: boolean }) {
  const needle = live && heading !== null ? qibla - heading : qibla;
  return (
    <div style={{ position: 'relative', width: 280, height: 280, margin: '0 auto' }}>
      {/* Glow */}
      <div style={{ position: 'absolute', inset: -24, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />
      {/* Outer ring */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid rgba(212,175,55,0.2)', background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.03) 0%, #0d1f35 100%)', boxShadow: '0 4px 40px rgba(10,37,64,0.25), inset 0 0 30px rgba(7,26,46,0.5)' }} />
      {/* Ticks */}
      {Array.from({ length: 72 }, (_, i) => (
        <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: 1.5, height: i % 9 === 0 ? 14 : i % 3 === 0 ? 8 : 4, background: i % 9 === 0 ? 'rgba(212,175,55,0.6)' : 'rgba(255,255,255,0.13)', transformOrigin: '50% 140px', transform: `translateX(-50%) rotate(${i * 5}deg) translateY(-140px)`, borderRadius: 1 }} />
      ))}
      {/* Cardinals */}
      {([['N',0,'#D4AF37'],['E',90,'rgba(255,255,255,0.4)'],['S',180,'rgba(255,255,255,0.4)'],['W',270,'rgba(255,255,255,0.4)']] as const).map(([d,a,c]) => (
        <div key={d} style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%,-50%) rotate(${a}deg) translateY(-116px)`, fontSize: '0.66rem', fontWeight: 900, color: c, letterSpacing: '0.08em', fontFamily: "'DM Sans',sans-serif" }}>{d}</div>
      ))}
      {/* Inner circle */}
      <div style={{ position: 'absolute', inset: 40, borderRadius: '50%', border: '1px solid rgba(212,175,55,0.08)', background: 'rgba(7,26,46,0.7)' }} />
      {/* Needle */}
      <motion.div animate={{ rotate: needle }} transition={{ type: 'spring', stiffness: 50, damping: 16 }}
        style={{ position: 'absolute', inset: 0, borderRadius: '50%' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 3, height: 88, marginLeft: -1.5, marginTop: -88, background: 'linear-gradient(to bottom, #F1D279, #D4AF37)', borderRadius: '3px 3px 0 0', boxShadow: '0 0 8px rgba(212,175,55,0.5)' }} />
        <div style={{ position: 'absolute', top: 'calc(50% - 100px)', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderBottom: '14px solid #D4AF37' }} />
        <div style={{ position: 'absolute', top: 'calc(50% - 118px)', left: '50%', transform: 'translateX(-50%)', fontSize: '0.95rem', lineHeight: 1 }}>🕋</div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 2, height: 58, marginLeft: -1, background: 'rgba(255,255,255,0.1)', borderRadius: '0 0 2px 2px' }} />
      </motion.div>
      {/* Center */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 12, height: 12, borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 10px rgba(212,175,55,0.7)', zIndex: 2 }} />
      {/* Live dot */}
      {live && <div style={{ position: 'absolute', top: 14, right: 14, width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.7)', animation: 'livepulse 2s ease infinite' }} />}
    </div>
  );
}

/* ─── MAIN ────────────────────────────────────────────────── */
type Mode = 'idle' | 'loading' | 'active' | 'error';

export function QiblaPage() {
  const [mode, setMode]       = useState<Mode>('idle');
  const [qibla, setQibla]     = useState(0);
  const [dist, setDist]       = useState(0);
  const [city, setCity]       = useState('');
  const [heading, setHeading] = useState<number | null>(null);
  const [live, setLive]       = useState(false);
  const [iosBtn, setIosBtn]   = useState(false);
  const [errorMsg, setError]  = useState('');
  const [query, setQuery]     = useState('');
  const [results, setResults] = useState<CityInfo[]>([]);
  const [searching, setSearching] = useState(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout>>();
  const compassRef  = useRef<((e: DeviceOrientationEvent) => void) | null>(null);

  /* ── Compass handler ── */
  const attachCompass = useCallback(() => {
    if (compassRef.current) return; // already attached
    const handler = (e: DeviceOrientationEvent) => {
      const h = (e as any).webkitCompassHeading ?? (e.alpha !== null ? (360 - e.alpha!) % 360 : null);
      if (h !== null && !isNaN(Number(h))) {
        setHeading(Number(h));
        setLive(true);
      }
    };
    compassRef.current = handler;
    window.addEventListener('deviceorientation', handler, true);
  }, []);

  /* ── iOS compass permission ── */
  const requestCompassIOS = useCallback(async () => {
    const DOE = DeviceOrientationEvent as any;
    if (typeof DOE.requestPermission === 'function') {
      try {
        const res = await DOE.requestPermission();
        if (res === 'granted') { attachCompass(); setIosBtn(false); }
      } catch { /* user denied */ }
    } else {
      attachCompass();
    }
  }, [attachCompass]);

  /* ── GPS ── */
  const requestGPS = useCallback(() => {
    setMode('loading');
    setResults([]); setQuery('');
    if (!navigator.geolocation) {
      setMode('error');
      setError('Geolocation not supported. Search your city below.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setQibla(calcQibla(lat, lng));
        setDist(calcDist(lat, lng));
        setCity('Your GPS Location');
        setMode('active');
        // Compass auto or iOS prompt
        const DOE = DeviceOrientationEvent as any;
        if (typeof DOE.requestPermission === 'function') {
          setIosBtn(true);
        } else {
          attachCompass();
        }
      },
      err => {
        setMode('error');
        setError(err.code === 1
          ? 'Location access denied. Search your city below.'
          : 'Could not get location. Search your city below.');
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 }
    );
  }, [attachCompass]);

  /* Auto-request GPS on mount */
  useEffect(() => {
    requestGPS();
    return () => {
      if (compassRef.current) window.removeEventListener('deviceorientation', compassRef.current);
    };
  }, [requestGPS]);

  /* ── City search ── */
  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(async () => {
      setSearching(true);
      try { setResults(await searchCity(query)); } catch { setResults([]); }
      setSearching(false);
    }, 380);
  }, [query]);

  const pickCity = (c: CityInfo) => {
    setQibla(calcQibla(c.latitude, c.longitude));
    setDist(calcDist(c.latitude, c.longitude));
    setCity(`${c.name}, ${c.country}`);
    setMode('active');
    setQuery(''); setResults([]);
  };

  return (
    <div style={{ background: '#ffffff', color: '#0a2540', minHeight: '100vh' }}>
      <SEO
        title="Qibla Direction Finder — Real-Time Compass to Mecca | Al Ummah AI"
        description="Find accurate Qibla direction from anywhere. GPS-based live compass pointing to the Holy Kaaba in Mecca. Works on all devices with manual city search fallback."
        keywords="qibla direction, find qibla, mecca direction, kaaba compass, qibla finder online"
        canonical="https://www.alummahai.com/qibla"
      />

      {/* Header */}
      <div style={{ background: 'linear-gradient(160deg,#0a2540 0%,#071a2e 100%)', padding: 'clamp(88px,12vh,120px) clamp(16px,5vw,48px) 56px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}>
          <div style={{ display: 'inline-block', padding: '4px 16px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 99, fontSize: '0.6rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16, fontFamily: "'DM Sans',sans-serif" }}>
            ✦ Real-Time GPS Compass
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(2.2rem,6vw,3.8rem)', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 12 }}>
            Qibla Finder
          </h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.5)', fontSize: '1rem', maxWidth: 380, margin: '0 auto' }}>
            Precise direction to the Holy Kaaba — GPS calculated from your exact location.
          </p>
        </motion.div>
      </div>

      <div style={{ maxWidth: 580, margin: '0 auto', padding: 'clamp(36px,5vw,64px) clamp(16px,5vw,32px) 80px' }}>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.6 }}
          style={{ marginBottom: 28, position: 'relative' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(10,37,64,0.3)', pointerEvents: 'none' }} />
              <input value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search city — Madrid, London, Dubai..."
                style={{ width: '100%', padding: '13px 14px 13px 40px', borderRadius: 12, border: '1px solid rgba(10,37,64,0.12)', fontFamily: "'DM Sans',sans-serif", fontSize: '0.9rem', color: '#0a2540', background: '#fff', outline: 'none', boxSizing: 'border-box', boxShadow: '0 2px 12px rgba(10,37,64,0.06)', transition: 'border-color 0.2s' }}
                onFocus={e => (e.target.style.borderColor = 'rgba(212,175,55,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(10,37,64,0.12)')} />
              {searching && <Loader2 size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#D4AF37', animation: 'spin 1s linear infinite' }} />}
            </div>
            <button onClick={requestGPS} title="Use my GPS"
              style={{ width: 46, height: 46, borderRadius: 12, border: '1px solid rgba(10,37,64,0.12)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a2540', flexShrink: 0, transition: 'all 0.2s', boxShadow: '0 2px 10px rgba(10,37,64,0.06)' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#D4AF37'; e.currentTarget.style.borderColor = '#D4AF37'; e.currentTarget.style.color = '#0a2540'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'rgba(10,37,64,0.12)'; e.currentTarget.style.color = '#0a2540'; }}>
              <MapPin size={17} />
            </button>
          </div>

          {/* Results dropdown */}
          <AnimatePresence>
            {results.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.15 }}
                style={{ position: 'absolute', top: '100%', left: 0, right: 56, zIndex: 50, marginTop: 6, background: '#fff', borderRadius: 14, border: '1px solid rgba(10,37,64,0.1)', boxShadow: '0 16px 50px rgba(10,37,64,0.12)', overflow: 'hidden' }}>
                {results.slice(0, 6).map((c, i) => (
                  <button key={i} onClick={() => pickCity(c)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '12px 16px', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', transition: 'background 0.12s', borderBottom: i < results.length - 1 ? '1px solid rgba(10,37,64,0.05)' : 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.07)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <MapPin size={13} style={{ color: '#D4AF37', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '0.87rem', color: '#0a2540' }}>{c.name}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', color: 'rgba(10,37,64,0.4)' }}>{c.country} · {c.latitude.toFixed(2)}°, {c.longitude.toFixed(2)}°</div>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Loading */}
        {mode === 'loading' && (
          <div style={{ textAlign: 'center', padding: '52px 0' }}>
            <Loader2 size={30} style={{ color: '#D4AF37', margin: '0 auto 12px', display: 'block', animation: 'spin 1s linear infinite' }} />
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: 'rgba(10,37,64,0.5)', fontSize: '0.9rem' }}>Detecting your location...</p>
          </div>
        )}

        {/* Error */}
        {mode === 'error' && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', gap: 11, padding: '14px 18px', background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.14)', borderRadius: 12, marginBottom: 24 }}>
            <AlertCircle size={16} style={{ color: '#ef4444', flexShrink: 0, marginTop: 1 }} />
            <div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.86rem', fontWeight: 700, color: '#991b1b', marginBottom: 2 }}>Location unavailable</p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.8rem', color: 'rgba(10,37,64,0.6)' }}>{errorMsg}</p>
            </div>
          </motion.div>
        )}

        {/* iOS compass prompt */}
        {iosBtn && !live && mode === 'active' && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, padding: '14px 18px', background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 12, marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <Compass size={16} style={{ color: '#D4AF37', flexShrink: 0 }} />
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', color: 'rgba(10,37,64,0.7)' }}>Enable live compass for real-time direction</p>
            </div>
            <button onClick={requestCompassIOS}
              style={{ background: '#D4AF37', color: '#0a2540', border: 'none', borderRadius: 8, padding: '8px 16px', fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', flexShrink: 0 }}>
              Enable Compass
            </button>
          </motion.div>
        )}

        {/* Active state */}
        {mode === 'active' && (
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}>

            {/* Location badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
              <CheckCircle size={14} style={{ color: '#22c55e' }} />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', fontWeight: 600, color: 'rgba(10,37,64,0.6)' }}>{city}</span>
              {live && (
                <span style={{ fontSize: '0.58rem', fontWeight: 800, background: 'rgba(34,197,94,0.1)', color: '#16a34a', border: '1px solid rgba(34,197,94,0.2)', padding: '2px 8px', borderRadius: 99, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'DM Sans',sans-serif" }}>● Live</span>
              )}
            </div>

            <CompassDial qibla={qibla} heading={heading} live={live} />

            {/* Degrees */}
            <div style={{ textAlign: 'center', marginTop: 28, marginBottom: 32 }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(2.8rem,8vw,4.5rem)', color: '#0a2540', lineHeight: 1, marginBottom: 5 }}>
                {Math.round(qibla)}°
              </div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', fontWeight: 700, color: 'rgba(10,37,64,0.4)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                {dirLabel(qibla)} · Toward Mecca
              </div>
            </div>

            {/* Info cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 24 }}>
              {[
                { label: 'Direction', value: `${Math.round(qibla)}°` },
                { label: 'Distance',  value: `${dist.toLocaleString()} km` },
                { label: 'City',      value: city.split(',')[0] },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: '#f7f8fa', border: '1px solid rgba(10,37,64,0.07)', borderRadius: 14, padding: '16px 10px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.57rem', fontWeight: 800, color: 'rgba(10,37,64,0.32)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 5 }}>{label}</div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: '0.94rem', color: '#0a2540' }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Tip */}
            {live ? (
              <div style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.14)', borderRadius: 12, padding: '13px 16px', display: 'flex', gap: 10 }}>
                <CheckCircle size={15} style={{ color: '#22c55e', flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', color: 'rgba(10,37,64,0.65)', lineHeight: 1.7 }}>
                  Live compass active. Hold your phone flat and face the direction the 🕋 arrow points.
                </p>
              </div>
            ) : (
              <div style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.16)', borderRadius: 12, padding: '13px 16px', display: 'flex', gap: 10 }}>
                <Navigation size={15} style={{ color: '#D4AF37', flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', color: 'rgba(10,37,64,0.65)', lineHeight: 1.7 }}>
                  Align the 🕋 arrow with <strong>{Math.round(qibla)}° {dirLabel(qibla)}</strong> on a physical compass. Keep away from metal objects.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Kaaba card */}
        <div style={{ marginTop: 44, padding: '26px 20px', background: 'linear-gradient(135deg,#0a2540 0%,#0d2e4d 100%)', borderRadius: 18, textAlign: 'center' }}>
          <div style={{ fontSize: '1.9rem', marginBottom: 10 }}>🕋</div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, color: '#ffffff', fontSize: '1.08rem', marginBottom: 5 }}>Al-Masjid Al-Haram, Makkah</h3>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>21.4225° N, 39.8262° E · Saudi Arabia</p>
        </div>
      </div>

      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes livepulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.5)} }
      `}</style>
    </div>
  );
}
