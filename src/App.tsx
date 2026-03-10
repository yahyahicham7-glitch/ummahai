import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SEO } from '@/src/components/SEO';
import { MapPin, Search, Navigation, Loader2, AlertCircle, CheckCircle, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { searchCity, type CityInfo } from '@/src/services/prayerService';

/* ─── Mecca coords ──────────────────────────────────────── */
const KAABA = { lat: 21.4225, lng: 39.8262 };

function calcQibla(lat: number, lng: number): number {
  const φ1 = (lat * Math.PI) / 180;
  const φ2 = (KAABA.lat * Math.PI) / 180;
  const Δλ = ((KAABA.lng - lng) * Math.PI) / 180;
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

function calcDistance(lat: number, lng: number): number {
  const R = 6371;
  const φ1 = (lat * Math.PI) / 180;
  const φ2 = (KAABA.lat * Math.PI) / 180;
  const Δφ = ((KAABA.lat - lat) * Math.PI) / 180;
  const Δλ = ((KAABA.lng - lng) * Math.PI) / 180;
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function dirLabel(deg: number) {
  return ['N','NE','E','SE','S','SW','W','NW'][Math.round(deg / 45) % 8];
}

/* ─── Compass visual ─────────────────────────────────────── */
function CompassDial({ qibla, heading, live }: { qibla: number; heading: number | null; live: boolean }) {
  // When live compass: rotate the dial so the needle always points to qibla relative to north
  // When no compass: needle points to calculated bearing from north
  const needleAngle = live && heading !== null ? qibla - heading : qibla;

  return (
    <div style={{ position: 'relative', width: 300, height: 300, margin: '0 auto' }}>

      {/* Glow */}
      <div style={{ position: 'absolute', inset: -20, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />

      {/* Outer ring */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid rgba(212,175,55,0.18)', background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.03) 0%, rgba(7,26,46,0.85) 100%)', boxShadow: '0 0 60px rgba(10,37,64,0.3), inset 0 0 40px rgba(7,26,46,0.6)' }} />

      {/* Tick marks */}
      {Array.from({ length: 72 }, (_, i) => (
        <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: 1.5, height: i % 9 === 0 ? 16 : i % 3 === 0 ? 9 : 5, background: i % 9 === 0 ? 'rgba(212,175,55,0.55)' : 'rgba(255,255,255,0.12)', transformOrigin: '50% 150px', transform: `translateX(-50%) rotate(${i * 5}deg) translateY(-150px)`, borderRadius: 1 }} />
      ))}

      {/* Cardinal letters */}
      {[['N', 0, '#D4AF37'], ['E', 90, 'rgba(255,255,255,0.35)'], ['S', 180, 'rgba(255,255,255,0.35)'], ['W', 270, 'rgba(255,255,255,0.35)']].map(([d, a, c]) => (
        <div key={String(d)} style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%,-50%) rotate(${a}deg) translateY(-124px)`, fontSize: '0.68rem', fontWeight: 900, color: String(c), letterSpacing: '0.08em', fontFamily: "'DM Sans',sans-serif" }}>{d}</div>
      ))}

      {/* Inner circle */}
      <div style={{ position: 'absolute', inset: 44, borderRadius: '50%', border: '1px solid rgba(212,175,55,0.08)', background: 'rgba(7,26,46,0.7)' }} />

      {/* Rotating needle group */}
      <motion.div
        animate={{ rotate: needleAngle }}
        transition={{ type: 'spring', stiffness: 55, damping: 18 }}
        style={{ position: 'absolute', inset: 0, borderRadius: '50%' }}>
        {/* Needle shaft toward Mecca */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 3, height: 96, marginLeft: -1.5, marginTop: -96, background: 'linear-gradient(to bottom, #F1D279, #D4AF37)', borderRadius: '3px 3px 0 0', boxShadow: '0 0 8px rgba(212,175,55,0.5)' }} />
        {/* Arrowhead */}
        <div style={{ position: 'absolute', top: 'calc(50% - 108px)', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: '16px solid #D4AF37' }} />
        {/* Kaaba emoji */}
        <div style={{ position: 'absolute', top: 'calc(50% - 130px)', left: '50%', transform: 'translateX(-50%)', fontSize: '1rem', lineHeight: 1 }}>🕋</div>
        {/* Tail */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 2, height: 64, marginLeft: -1, background: 'rgba(255,255,255,0.1)', borderRadius: '0 0 2px 2px' }} />
      </motion.div>

      {/* Center dot */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 14, height: 14, borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 12px rgba(212,175,55,0.7)', zIndex: 2 }} />

      {/* Live dot */}
      {live && (
        <div style={{ position: 'absolute', top: 16, right: 16 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.7)', animation: 'livepulse 2s ease infinite' }} />
        </div>
      )}
    </div>
  );
}

/* ─── MAIN ───────────────────────────────────────────────── */
type Mode = 'idle' | 'loading' | 'gps' | 'manual' | 'error';

export function QiblaPage() {
  const [mode, setMode] = useState<Mode>('idle');
  const [qibla, setQibla] = useState(0);
  const [distance, setDistance] = useState(0);
  const [cityName, setCityName] = useState('');
  const [heading, setHeading] = useState<number | null>(null);
  const [liveCompass, setLiveCompass] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CityInfo[]>([]);
  const [searching, setSearching] = useState(false);
  const [iosPrompt, setIosPrompt] = useState(false);
  const searchRef = useRef<ReturnType<typeof setTimeout>>();

  /* ── Compass (device orientation) ── */
  const startCompass = useCallback(async () => {
    // iOS 13+ requires explicit permission
    const DOE = DeviceOrientationEvent as any;
    if (typeof DOE.requestPermission === 'function') {
      try {
        const perm = await DOE.requestPermission();
        if (perm !== 'granted') return;
      } catch { return; }
    }
    const handler = (e: DeviceOrientationEvent) => {
      const h = (e as any).webkitCompassHeading ?? (e.alpha !== null ? (360 - e.alpha!) % 360 : null);
      if (h !== null && !isNaN(h)) { setHeading(h); setLiveCompass(true); }
    };
    window.addEventListener('deviceorientation', handler, true);
    return () => window.removeEventListener('deviceorientation', handler);
  }, []);

  /* ── GPS ── */
  const requestGPS = useCallback(() => {
    setMode('loading');
    setResults([]);
    if (!navigator.geolocation) {
      setMode('error');
      setErrorMsg('Geolocation not supported. Search your city below.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setQibla(calcQibla(lat, lng));
        setDistance(calcDistance(lat, lng));
        setCityName('Your GPS Location');
        setMode('gps');
        // Try to start compass after GPS success
        const DOE = DeviceOrientationEvent as any;
        if (typeof DOE.requestPermission === 'function') {
          setIosPrompt(true); // show iOS permission button
        } else {
          startCompass();
        }
      },
      err => {
        setMode('error');
        setErrorMsg(
          err.code === 1
            ? 'Location access denied. Please search your city below.'
            : 'Could not get your location. Please search your city below.'
        );
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  }, [startCompass]);

  /* Auto-request on mount */
  useEffect(() => { requestGPS(); }, [requestGPS]);

  /* Non-iOS compass auto-start */
  useEffect(() => {
    const DOE = DeviceOrientationEvent as any;
    if (typeof DOE.requestPermission !== 'function') {
      const cleanup = startCompass();
      return () => { cleanup?.then(fn => fn?.()); };
    }
  }, [startCompass]);

  /* City search */
  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    clearTimeout(searchRef.current);
    searchRef.current = setTimeout(async () => {
      setSearching(true);
      try { setResults(await searchCity(query)); } catch { setResults([]); }
      setSearching(false);
    }, 380);
  }, [query]);

  const selectCity = (city: CityInfo) => {
    setQibla(calcQibla(city.latitude, city.longitude));
    setDistance(calcDistance(city.latitude, city.longitude));
    setCityName(`${city.name}, ${city.country}`);
    setMode('manual');
    setQuery('');
    setResults([]);
  };

  const isActive = mode === 'gps' || mode === 'manual';

  return (
    <div style={{ background: '#ffffff', color: '#0a2540', minHeight: '100vh' }}>
      <SEO
        title="Qibla Direction Finder — Real-Time Compass to Mecca | Al Ummah AI"
        description="Find accurate Qibla direction from anywhere. GPS-based compass pointing to the Holy Kaaba in Mecca. Works on all devices with manual city search fallback."
        keywords="qibla direction, find qibla, mecca direction, kaaba compass, qibla finder online"
        canonical="https://www.alummahai.com/qibla"
      />

      {/* ── Header ── */}
      <div style={{ background: 'linear-gradient(160deg,#0a2540 0%,#071a2e 100%)', padding: 'clamp(80px,12vh,120px) clamp(16px,5vw,48px) 60px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}>
          <div style={{ display: 'inline-block', padding: '4px 16px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 99, fontSize: '0.6rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16 }}>
            ✦ Real-Time GPS Compass
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(2.2rem,6vw,4rem)', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 12 }}>Qibla Finder</h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.5)', fontSize: '1rem', maxWidth: 400, margin: '0 auto' }}>
            Precise direction to the Holy Kaaba — from your exact location.
          </p>
        </motion.div>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(16px,5vw,32px) 80px' }}>

        {/* ── Search bar ── */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
          style={{ marginBottom: 36, position: 'relative' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(10,37,64,0.35)', pointerEvents: 'none' }} />
              <input value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search city — e.g. Madrid, London, Dubai..."
                style={{ width: '100%', padding: '13px 14px 13px 42px', borderRadius: 12, border: '1px solid rgba(10,37,64,0.12)', fontFamily: "'DM Sans',sans-serif", fontSize: '0.9rem', color: '#0a2540', background: '#fff', outline: 'none', boxSizing: 'border-box', boxShadow: '0 2px 12px rgba(10,37,64,0.06)', transition: 'border-color 0.2s' }}
                onFocus={e => (e.target.style.borderColor = 'rgba(212,175,55,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(10,37,64,0.12)')} />
              {searching && <Loader2 size={14} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#D4AF37', animation: 'spin 1s linear infinite' }} />}
            </div>
            <button onClick={requestGPS} title="Use GPS location"
              style={{ width: 46, height: 46, borderRadius: 12, border: '1px solid rgba(10,37,64,0.12)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a2540', flexShrink: 0, transition: 'all 0.2s', boxShadow: '0 2px 12px rgba(10,37,64,0.06)' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#D4AF37'; e.currentTarget.style.borderColor = '#D4AF37'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'rgba(10,37,64,0.12)'; }}>
              <MapPin size={18} />
            </button>
          </div>

          {/* Dropdown */}
          <AnimatePresence>
            {results.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.16 }}
                style={{ position: 'absolute', top: '100%', left: 0, right: 56, zIndex: 50, marginTop: 6, background: '#fff', borderRadius: 14, border: '1px solid rgba(10,37,64,0.1)', boxShadow: '0 16px 50px rgba(10,37,64,0.12)', overflow: 'hidden' }}>
                {results.slice(0, 6).map((city, i) => (
                  <button key={i} onClick={() => selectCity(city)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '12px 16px', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', transition: 'background 0.13s', borderBottom: i < results.length - 1 ? '1px solid rgba(10,37,64,0.05)' : 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.07)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <MapPin size={13} style={{ color: '#D4AF37', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '0.87rem', color: '#0a2540' }}>{city.name}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', color: 'rgba(10,37,64,0.4)' }}>{city.country} · {city.latitude.toFixed(2)}°, {city.longitude.toFixed(2)}°</div>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Loading ── */}
        {mode === 'loading' && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <Loader2 size={32} style={{ color: '#D4AF37', margin: '0 auto 12px', display: 'block', animation: 'spin 1s linear infinite' }} />
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: 'rgba(10,37,64,0.5)', fontSize: '0.9rem' }}>Detecting your location...</p>
          </div>
        )}

        {/* ── Error ── */}
        {mode === 'error' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', gap: 12, padding: '16px 20px', background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.14)', borderRadius: 12, marginBottom: 24 }}>
            <AlertCircle size={17} style={{ color: '#ef4444', flexShrink: 0, marginTop: 1 }} />
            <div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.86rem', fontWeight: 700, color: '#991b1b', marginBottom: 3 }}>Location unavailable</p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.8rem', color: 'rgba(10,37,64,0.6)' }}>{errorMsg}</p>
            </div>
          </motion.div>
        )}

        {/* ── iOS compass permission prompt ── */}
        {iosPrompt && !liveCompass && mode === 'gps' && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', gap: 12, padding: '16px 20px', background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 12, marginBottom: 24, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <Compass size={17} style={{ color: '#D4AF37', flexShrink: 0 }} />
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', color: 'rgba(10,37,64,0.7)' }}>Enable live compass for real-time Qibla</p>
            </div>
            <button
              onClick={async () => {
                await startCompass();
                setIosPrompt(false);
              }}
              style={{ background: '#D4AF37', color: '#0a2540', border: 'none', borderRadius: 8, padding: '8px 16px', fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>
              Enable Compass
            </button>
          </motion.div>
        )}

        {/* ── Compass + results ── */}
        {isActive && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.16,1,0.3,1] }}>

            {/* Location badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
              <CheckCircle size={14} style={{ color: '#22c55e' }} />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', fontWeight: 600, color: 'rgba(10,37,64,0.6)' }}>{cityName}</span>
              {liveCompass && mode === 'gps' && (
                <span style={{ fontSize: '0.6rem', fontWeight: 800, background: 'rgba(34,197,94,0.1)', color: '#16a34a', border: '1px solid rgba(34,197,94,0.2)', padding: '2px 8px', borderRadius: 99, textTransform: 'uppercase', letterSpacing: '0.1em' }}>● Live</span>
              )}
            </div>

            {/* Compass */}
            <CompassDial qibla={qibla} heading={heading} live={liveCompass && mode === 'gps'} />

            {/* Angle */}
            <div style={{ textAlign: 'center', marginTop: 28, marginBottom: 36 }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(3rem,8vw,5rem)', color: '#0a2540', lineHeight: 1, marginBottom: 6 }}>
                {Math.round(qibla)}°
              </div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', fontWeight: 700, color: 'rgba(10,37,64,0.4)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                {dirLabel(qibla)} · Toward Mecca
              </div>
            </div>

            {/* Info cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 28 }}>
              {[
                { label: 'Direction', value: `${Math.round(qibla)}°` },
                { label: 'Distance',  value: `${distance.toLocaleString()} km` },
                { label: 'City',      value: cityName.split(',')[0] },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: '#f7f8fa', border: '1px solid rgba(10,37,64,0.07)', borderRadius: 14, padding: '16px 12px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.58rem', fontWeight: 800, color: 'rgba(10,37,64,0.32)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 6 }}>{label}</div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: '0.96rem', color: '#0a2540' }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Instruction tip */}
            {liveCompass && mode === 'gps' ? (
              <div style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.14)', borderRadius: 12, padding: '14px 18px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <CheckCircle size={16} style={{ color: '#22c55e', flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', color: 'rgba(10,37,64,0.65)', lineHeight: 1.7 }}>
                  Live compass active. Hold your phone flat and face the direction the 🕋 arrow points — that is your Qibla.
                </p>
              </div>
            ) : (
              <div style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.16)', borderRadius: 12, padding: '14px 18px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Navigation size={16} style={{ color: '#D4AF37', flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', color: 'rgba(10,37,64,0.65)', lineHeight: 1.7 }}>
                  Hold your device flat and align the 🕋 arrow with <strong>{Math.round(qibla)}° {dirLabel(qibla)}</strong>. Keep away from metal objects for best accuracy.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* ── Kaaba info ── */}
        <div style={{ marginTop: 48, padding: '28px 24px', background: 'linear-gradient(135deg,#0a2540 0%,#0d2e4d 100%)', borderRadius: 20, textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: 10 }}>🕋</div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, color: '#ffffff', fontSize: '1.1rem', marginBottom: 6 }}>Al-Masjid Al-Haram, Makkah</h3>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.42)', fontSize: '0.82rem' }}>21.4225° N, 39.8262° E · Saudi Arabia</p>
        </div>
      </div>

      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes livepulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
      `}</style>
    </div>
  );
}
