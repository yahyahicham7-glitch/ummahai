import React, { useState, useEffect, useRef } from 'react';
import { SEO } from '@/src/components/SEO';
import { MapPin, Search, Loader2, AlertCircle, CheckCircle, Navigation } from 'lucide-react';
import { RelatedTools } from '@/src/components/RelatedTools';
import { motion, AnimatePresence } from 'motion/react';
import { searchCity, type CityInfo } from '@/src/services/prayerService';
import { useTranslation } from 'react-i18next';

/* ─── Math ──────────────────────────────────────────────── */
const KAABA = { lat: 21.4225, lng: 39.8262 };
const rad = (d: number) => d * Math.PI / 180;

function calcQibla(lat: number, lng: number) {
  const y = Math.sin(rad(KAABA.lng - lng)) * Math.cos(rad(KAABA.lat));
  const x = Math.cos(rad(lat)) * Math.sin(rad(KAABA.lat)) - Math.sin(rad(lat)) * Math.cos(rad(KAABA.lat)) * Math.cos(rad(KAABA.lng - lng));
  return ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360;
}
function calcDist(lat: number, lng: number) {
  const R = 6371;
  const a = Math.sin(rad((KAABA.lat - lat) / 2)) ** 2 + Math.cos(rad(lat)) * Math.cos(rad(KAABA.lat)) * Math.sin(rad((KAABA.lng - lng) / 2)) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}
const cardinal = (d: number, lang: string) => {
  const en = ['N','NE','E','SE','S','SW','W','NW'];
  const ar = ['ش','شش','ش','جشش','ج','جغ','غ','شغ'];
  const fr = ['N','NE','E','SE','S','SO','O','NO'];
  const es = ['N','NE','E','SE','S','SO','O','NO'];
  const map: Record<string, string[]> = { en, ar, fr, es };
  return (map[lang] || en)[Math.round(d / 45) % 8];
};

/* ─── Translation table ─────────────────────────────────── */
const UI: Record<string, any> = {
  en: {
    seoTitle: 'Qibla Direction Finder — GPS Compass to Mecca | Al Ummah AI',
    seoDesc: 'Find the exact Qibla direction from anywhere. Real-time GPS compass pointing to the Holy Kaaba in Mecca.',
    badge: '🧭 Real-Time GPS Compass',
    h1: 'Qibla Finder',
    sub: 'Precise direction to the Holy Kaaba from your location.',
    searchPlaceholder: 'Search city — Madrid, Dubai, London...',
    detecting: 'Detecting your location...',
    locationUnavailable: 'Location unavailable',
    enableCompass: '🧭 Enable live compass',
    enableBtn: 'Enable',
    locationBadge: (city: string) => city,
    cardLabels: ['Direction', 'Distance', 'Location'],
    towardMecca: 'Toward Mecca',
    liveCompassTip: 'Live compass active. Hold phone flat and face the direction the 🕋 arrow points.',
    staticTip: (deg: number, card: string) => `The Qibla direction from your location is ${deg}° ${card}.`,
    staticTipSub: (deg: number, card: string) => `📱 On mobile: enable the compass for live guidance.\n💻 On desktop: use a compass app or face ${deg}° ${card}.`,
    km: 'km',
    kaabaTitle: 'Al-Masjid Al-Haram, Makkah',
    kaabaCoords: '21.4225° N, 39.8262° E · Saudi Arabia',
    errorDenied: 'Location denied — search your city below.',
    errorFailed: 'Could not get location — search your city below.',
    errorNoGeo: 'Geolocation not supported — search your city below.',
    live: 'Live',
  },
  ar: {
    seoTitle: 'اتجاه القبلة — بوصلة GPS نحو مكة | Al Ummah AI',
    seoDesc: 'ابحث عن اتجاه القبلة الدقيق من أي مكان. بوصلة GPS في الوقت الفعلي تشير نحو الكعبة المشرفة في مكة.',
    badge: '🧭 بوصلة GPS آنية',
    h1: 'اتجاه القبلة',
    sub: 'الاتجاه الدقيق نحو الكعبة المشرفة من موقعك.',
    searchPlaceholder: 'ابحث عن مدينة — الرياض، دبي، القاهرة...',
    detecting: 'جاري تحديد موقعك...',
    locationUnavailable: 'الموقع غير متاح',
    enableCompass: '🧭 تفعيل البوصلة المباشرة',
    enableBtn: 'تفعيل',
    locationBadge: (city: string) => city,
    cardLabels: ['الاتجاه', 'المسافة', 'الموقع'],
    towardMecca: 'نحو مكة المكرمة',
    liveCompassTip: 'البوصلة المباشرة نشطة. امسك هاتفك بشكل مستوٍ واتجه نحو السهم 🕋.',
    staticTip: (deg: number, card: string) => `اتجاه القبلة من موقعك هو ${deg}° ${card}.`,
    staticTipSub: (deg: number, card: string) => `📱 على الهاتف: فعّل البوصلة للإرشاد المباشر.\n💻 على الكمبيوتر: استخدم تطبيق بوصلة أو اتجه ${deg}° ${card}.`,
    km: 'كم',
    kaabaTitle: 'المسجد الحرام، مكة المكرمة',
    kaabaCoords: '21.4225° ش، 39.8262° ش · المملكة العربية السعودية',
    errorDenied: 'تم رفض الموقع — ابحث عن مدينتك أدناه.',
    errorFailed: 'تعذر الحصول على الموقع — ابحث عن مدينتك أدناه.',
    errorNoGeo: 'تحديد الموقع غير مدعوم — ابحث عن مدينتك أدناه.',
    live: 'مباشر',
  },
  fr: {
    seoTitle: 'Direction Qibla — Boussole GPS vers La Mecque | Al Ummah AI',
    seoDesc: 'Trouvez la direction exacte de la Qibla depuis n\'importe où. Boussole GPS en temps réel pointant vers la Sainte Kaaba à La Mecque.',
    badge: '🧭 Boussole GPS en Temps Réel',
    h1: 'Qibla Finder',
    sub: 'Direction précise vers la Sainte Kaaba depuis votre position.',
    searchPlaceholder: 'Rechercher une ville — Paris, Dubaï, Londres...',
    detecting: 'Détection de votre position...',
    locationUnavailable: 'Position indisponible',
    enableCompass: '🧭 Activer la boussole en direct',
    enableBtn: 'Activer',
    locationBadge: (city: string) => city,
    cardLabels: ['Direction', 'Distance', 'Position'],
    towardMecca: 'Vers La Mecque',
    liveCompassTip: 'Boussole en direct active. Tenez le téléphone à plat et faites face à la flèche 🕋.',
    staticTip: (deg: number, card: string) => `La direction de la Qibla depuis votre position est ${deg}° ${card}.`,
    staticTipSub: (deg: number, card: string) => `📱 Sur mobile : activez la boussole pour un guidage en direct.\n💻 Sur ordinateur : utilisez une application boussole ou faites face à ${deg}° ${card}.`,
    km: 'km',
    kaabaTitle: 'Al-Masjid Al-Haram, La Mecque',
    kaabaCoords: '21.4225° N, 39.8262° E · Arabie Saoudite',
    errorDenied: 'Position refusée — recherchez votre ville ci-dessous.',
    errorFailed: 'Impossible d\'obtenir la position — recherchez votre ville ci-dessous.',
    errorNoGeo: 'Géolocalisation non supportée — recherchez votre ville ci-dessous.',
    live: 'En direct',
  },
  es: {
    seoTitle: 'Dirección Qibla — Brújula GPS hacia La Meca | Al Ummah AI',
    seoDesc: 'Encuentra la dirección exacta de la Qibla desde cualquier lugar. Brújula GPS en tiempo real apuntando hacia la Kaaba en La Meca.',
    badge: '🧭 Brújula GPS en Tiempo Real',
    h1: 'Qibla Finder',
    sub: 'Dirección precisa hacia la Kaaba desde tu ubicación.',
    searchPlaceholder: 'Buscar ciudad — Madrid, Dubai, Londres...',
    detecting: 'Detectando tu ubicación...',
    locationUnavailable: 'Ubicación no disponible',
    enableCompass: '🧭 Activar brújula en vivo',
    enableBtn: 'Activar',
    locationBadge: (city: string) => city,
    cardLabels: ['Dirección', 'Distancia', 'Ubicación'],
    towardMecca: 'Hacia La Meca',
    liveCompassTip: 'Brújula en vivo activa. Sostén el teléfono plano y mira hacia donde apunta la flecha 🕋.',
    staticTip: (deg: number, card: string) => `La dirección de la Qibla desde tu ubicación es ${deg}° ${card}.`,
    staticTipSub: (deg: number, card: string) => `📱 En móvil: activa la brújula para guía en tiempo real.\n💻 En ordenador: usa una app de brújula o mira hacia ${deg}° ${card}.`,
    km: 'km',
    kaabaTitle: 'Al-Masjid Al-Haram, La Meca',
    kaabaCoords: '21.4225° N, 39.8262° E · Arabia Saudita',
    errorDenied: 'Ubicación denegada — busca tu ciudad abajo.',
    errorFailed: 'No se pudo obtener la ubicación — busca tu ciudad abajo.',
    errorNoGeo: 'Geolocalización no soportada — busca tu ciudad abajo.',
    live: 'En vivo',
  },
};

/* ─── Compass Dial ───────────────────────────────────────── */
function Dial({ qibla, heading, live }: { qibla: number; heading: number | null; live: string }) {
  const rotation = heading !== null ? qibla - heading : qibla;
  return (
    <div style={{ position: 'relative', width: 260, height: 260, margin: '0 auto' }}>
      <div style={{ position: 'absolute', inset: -18, borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,175,55,0.09) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%,rgba(255,255,255,0.03),#0b1f35)', border: '2px solid rgba(212,175,55,0.18)', boxShadow: '0 4px 40px rgba(10,37,64,0.3),inset 0 0 30px rgba(5,15,28,0.5)' }} />
      {/* Tick marks */}
      {Array.from({ length: 72 }, (_, i) => (
        <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: 1.5, height: i % 9 === 0 ? 12 : i % 3 === 0 ? 6 : 3, background: i % 9 === 0 ? 'rgba(212,175,55,0.6)' : 'rgba(255,255,255,0.12)', transformOrigin: '50% 130px', transform: `translateX(-50%) rotate(${i * 5}deg) translateY(-130px)`, borderRadius: 1 }} />
      ))}
      {/* Cardinals */}
      {[['N',0,'#D4AF37'],['E',90,'rgba(255,255,255,0.3)'],['S',180,'rgba(255,255,255,0.3)'],['W',270,'rgba(255,255,255,0.3)']].map(([l,a,c])=>(
        <div key={String(l)} style={{ position:'absolute', top:'50%', left:'50%', transform:`translate(-50%,-50%) rotate(${a}deg) translateY(-108px)`, fontSize:'0.6rem', fontWeight:900, color:String(c), fontFamily:"'DM Sans',sans-serif" }}>{l}</div>
      ))}
      {/* Inner circle */}
      <div style={{ position: 'absolute', inset: 38, borderRadius: '50%', background: 'rgba(5,15,28,0.7)', border: '1px solid rgba(212,175,55,0.07)' }} />
      {/* Rotating needle */}
      <motion.div animate={{ rotate: rotation }} transition={{ type: 'spring', stiffness: 38, damping: 13 }}
        style={{ position: 'absolute', inset: 0 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 3, height: 82, marginLeft: -1.5, marginTop: -82, background: 'linear-gradient(to bottom,#F1D279,#D4AF37)', borderRadius: '3px 3px 0 0', boxShadow: '0 0 8px rgba(212,175,55,0.5)' }} />
        <div style={{ position: 'absolute', top: 'calc(50% - 94px)', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderBottom: '13px solid #D4AF37' }} />
        <div style={{ position: 'absolute', top: 'calc(50% - 114px)', left: '50%', transform: 'translateX(-50%)', fontSize: '0.9rem' }}>🕋</div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 2, height: 54, marginLeft: -1, background: 'rgba(255,255,255,0.1)', borderRadius: '0 0 2px 2px' }} />
      </motion.div>
      {/* Center dot */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 11, height: 11, borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 10px rgba(212,175,55,0.7)', zIndex: 2 }} />
      {/* Live badge */}
      {heading !== null && (
        <div style={{ position: 'absolute', top: 12, right: 14, display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.7)', animation: 'lp 2s ease infinite' }} />
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize: '0.52rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{live}</span>
        </div>
      )}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export function QiblaPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.slice(0, 2) || 'en') as string;
  const L = UI[lang] || UI.en;
  const isRTL = lang === 'ar';

  const [status,  setStatus]  = useState<'loading'|'ok'|'error'>('loading');
  const [qibla,   setQibla]   = useState(0);
  const [dist,    setDist]    = useState(0);
  const [city,    setCity]    = useState('');
  const [heading, setHeading] = useState<number | null>(null);
  const [errMsg,  setErrMsg]  = useState('');
  const [query,   setQuery]   = useState('');
  const [results, setResults] = useState<CityInfo[]>([]);
  const [busy,    setBusy]    = useState(false);
  const [iosBtn,  setIosBtn]  = useState(false);
  const orientRef = useRef<((e: DeviceOrientationEvent) => void) | null>(null);
  const searchT   = useRef<ReturnType<typeof setTimeout>>();

  function startCompass() {
    if (orientRef.current) return;
    const h = (e: DeviceOrientationEvent) => {
      const v = (e as any).webkitCompassHeading ?? (e.alpha !== null ? (360 - e.alpha!) % 360 : null);
      if (v !== null && !isNaN(Number(v))) setHeading(Number(v));
    };
    orientRef.current = h;
    window.addEventListener('deviceorientation', h, true);
  }

  async function askIOS() {
    const DOE = DeviceOrientationEvent as any;
    try { if ((await DOE.requestPermission()) === 'granted') { startCompass(); setIosBtn(false); } } catch {}
  }

  function doGPS() {
    setStatus('loading');
    if (!navigator.geolocation) { setStatus('error'); setErrMsg(L.errorNoGeo); return; }
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: la, longitude: lo } = pos.coords;
        setQibla(calcQibla(la, lo)); setDist(calcDist(la, lo)); setCity('GPS'); setStatus('ok');
        const DOE = DeviceOrientationEvent as any;
        if (typeof DOE.requestPermission === 'function') setIosBtn(true); else startCompass();
      },
      err => { setStatus('error'); setErrMsg(err.code === 1 ? L.errorDenied : L.errorFailed); },
      { enableHighAccuracy: true, timeout: 12000 }
    );
  }

  useEffect(() => {
    doGPS();
    const DOE = DeviceOrientationEvent as any;
    if (typeof DOE.requestPermission !== 'function') startCompass();
    return () => { if (orientRef.current) window.removeEventListener('deviceorientation', orientRef.current); };
  }, []);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    clearTimeout(searchT.current);
    searchT.current = setTimeout(async () => {
      setBusy(true);
      try { setResults(await searchCity(query)); } catch { setResults([]); }
      setBusy(false);
    }, 350);
  }, [query]);

  const pick = (c: CityInfo) => {
    setQibla(calcQibla(c.latitude, c.longitude)); setDist(calcDist(c.latitude, c.longitude));
    setCity(`${c.name}, ${c.country}`); setStatus('ok'); setQuery(''); setResults([]);
  };

  const card = cardinal(qibla, lang);
  const cardValues = [
    `${Math.round(qibla)}°`,
    `${dist.toLocaleString()} ${L.km}`,
    city.split(',')[0],
  ];

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background: '#ffffff', color: '#0a2540', minHeight: '100vh' }}>
      <SEO
        title={L.seoTitle}
        description={L.seoDesc}
        keywords="qibla direction, find qibla, mecca direction, kaaba compass, direction mecque, dirección meca, اتجاه القبلة"
        canonical="https://www.alummahai.com/qibla"
      />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#0a2540 0%,#071a2e 100%)', padding: 'clamp(88px,12vh,116px) clamp(16px,5vw,48px) 48px', textAlign: 'center' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
          <div style={{ display:'inline-block', padding:'4px 14px', background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.22)', borderRadius:99, fontSize:'0.56rem', fontWeight:800, color:'#D4AF37', letterSpacing:'0.3em', textTransform:'uppercase', marginBottom:14, fontFamily:"'DM Sans',sans-serif" }}>{L.badge}</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(2rem,6vw,3.5rem)', color:'#ffffff', marginBottom:10, letterSpacing:'-0.022em' }}>{L.h1}</h1>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, color:'rgba(255,255,255,0.45)', fontSize:'0.97rem', maxWidth:320, margin:'0 auto' }}>{L.sub}</p>
        </motion.div>
      </div>

      <div style={{ maxWidth:520, margin:'0 auto', padding:'clamp(32px,5vw,56px) clamp(16px,5vw,28px) 80px' }}>

        {/* Search */}
        <div style={{ position:'relative', marginBottom:24 }}>
          <div style={{ display:'flex', gap:8 }}>
            <div style={{ flex:1, position:'relative' }}>
              <Search size={13} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'rgba(10,37,64,0.3)', pointerEvents:'none' }} />
              <input value={query} onChange={e => setQuery(e.target.value)}
                placeholder={L.searchPlaceholder}
                dir={isRTL ? 'rtl' : 'ltr'}
                style={{ width:'100%', padding:'11px 12px 11px 34px', borderRadius:10, border:'1px solid rgba(10,37,64,0.12)', fontFamily:"'DM Sans',sans-serif", fontSize:'0.86rem', color:'#0a2540', background:'#fff', outline:'none', boxSizing:'border-box', boxShadow:'0 2px 10px rgba(10,37,64,0.04)', transition:'border-color 0.2s' }}
                onFocus={e=>(e.target.style.borderColor='rgba(212,175,55,0.5)')}
                onBlur={e=>(e.target.style.borderColor='rgba(10,37,64,0.12)')} />
              {busy && <Loader2 size={12} style={{ position:'absolute', right:11, top:'50%', transform:'translateY(-50%)', color:'#D4AF37', animation:'spin 1s linear infinite' }} />}
            </div>
            <button onClick={doGPS} title="GPS"
              style={{ width:42, height:42, borderRadius:10, border:'1px solid rgba(10,37,64,0.12)', background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#0a2540', flexShrink:0, transition:'all 0.18s' }}
              onMouseEnter={e=>{e.currentTarget.style.background='#D4AF37';e.currentTarget.style.borderColor='#D4AF37';}}
              onMouseLeave={e=>{e.currentTarget.style.background='#fff';e.currentTarget.style.borderColor='rgba(10,37,64,0.12)';}}>
              <MapPin size={15}/>
            </button>
          </div>

          <AnimatePresence>
            {results.length > 0 && (
              <motion.div initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.13}}
                style={{ position:'absolute', top:'100%', left:0, right:50, zIndex:50, marginTop:5, background:'#fff', borderRadius:12, border:'1px solid rgba(10,37,64,0.1)', boxShadow:'0 14px 40px rgba(10,37,64,0.1)', overflow:'hidden' }}>
                {results.slice(0,6).map((c,i)=>(
                  <button key={i} onClick={()=>pick(c)}
                    style={{ display:'flex', alignItems:'center', gap:9, width:'100%', padding:'10px 14px', border:'none', background:'transparent', cursor:'pointer', textAlign:'left', borderBottom:i<results.length-1?'1px solid rgba(10,37,64,0.05)':'none', transition:'background 0.12s' }}
                    onMouseEnter={e=>(e.currentTarget.style.background='rgba(212,175,55,0.07)')}
                    onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
                    <MapPin size={11} style={{color:'#D4AF37',flexShrink:0}}/>
                    <div>
                      <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:'0.85rem',color:'#0a2540'}}>{c.name}</div>
                      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:'0.68rem',color:'rgba(10,37,64,0.42)'}}>{c.country} · {c.latitude.toFixed(2)}°, {c.longitude.toFixed(2)}°</div>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Loading */}
        {status === 'loading' && (
          <div style={{textAlign:'center',padding:'52px 0'}}>
            <Loader2 size={26} style={{color:'#D4AF37',margin:'0 auto 12px',display:'block',animation:'spin 1s linear infinite'}}/>
            <p style={{fontFamily:"'DM Sans',sans-serif",color:'rgba(10,37,64,0.45)',fontSize:'0.86rem'}}>{L.detecting}</p>
          </div>
        )}

        {/* Error */}
        {status === 'error' && (
          <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
            style={{display:'flex',gap:10,padding:'13px 15px',background:'rgba(220,38,38,0.05)',border:'1px solid rgba(220,38,38,0.14)',borderRadius:11,marginBottom:20}}>
            <AlertCircle size={15} style={{color:'#ef4444',flexShrink:0,marginTop:1}}/>
            <div>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:'0.82rem',color:'#991b1b',marginBottom:3}}>{L.locationUnavailable}</p>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:'0.78rem',color:'rgba(10,37,64,0.55)'}}>{errMsg}</p>
            </div>
          </motion.div>
        )}

        {/* iOS compass button */}
        {iosBtn && heading === null && status === 'ok' && (
          <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}
            style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:10,padding:'12px 15px',background:'rgba(212,175,55,0.05)',border:'1px solid rgba(212,175,55,0.2)',borderRadius:11,marginBottom:20,flexWrap:'wrap'}}>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:'0.8rem',color:'rgba(10,37,64,0.65)'}}>{L.enableCompass}</span>
            <button onClick={askIOS} style={{background:'#D4AF37',color:'#0a2540',border:'none',borderRadius:7,padding:'7px 14px',fontFamily:"'DM Sans',sans-serif",fontWeight:800,fontSize:'0.7rem',textTransform:'uppercase',letterSpacing:'0.09em',cursor:'pointer'}}>{L.enableBtn}</button>
          </motion.div>
        )}

        {/* Active compass */}
        {status === 'ok' && (
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.55,ease:[0.16,1,0.3,1]}}>
            {/* Location badge */}
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:7,marginBottom:22}}>
              <CheckCircle size={13} style={{color:'#22c55e'}}/>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:'0.78rem',fontWeight:600,color:'rgba(10,37,64,0.52)'}}>{L.locationBadge(city)}</span>
              {heading !== null && <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:'0.55rem',fontWeight:800,background:'rgba(34,197,94,0.1)',color:'#16a34a',border:'1px solid rgba(34,197,94,0.2)',padding:'2px 7px',borderRadius:99,textTransform:'uppercase',letterSpacing:'0.1em'}}>● {L.live}</span>}
            </div>

            <Dial qibla={qibla} heading={heading} live={L.live} />

            {/* Degrees */}
            <div style={{textAlign:'center',marginTop:22,marginBottom:24}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:'clamp(2.8rem,8vw,4rem)',color:'#0a2540',lineHeight:1}}>{Math.round(qibla)}°</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:'0.72rem',fontWeight:700,color:'rgba(10,37,64,0.38)',textTransform:'uppercase',letterSpacing:'0.2em',marginTop:5}}>{card} · {L.towardMecca}</div>
            </div>

            {/* Cards */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:20}}>
              {L.cardLabels.map((label: string, i: number)=>(
                <div key={label} style={{background:'#f7f8fa',border:'1px solid rgba(10,37,64,0.07)',borderRadius:11,padding:'13px 10px',textAlign:'center'}}>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:'0.54rem',fontWeight:800,color:'rgba(10,37,64,0.3)',textTransform:'uppercase',letterSpacing:'0.18em',marginBottom:5}}>{label}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontWeight:800,fontSize:'0.92rem',color:'#0a2540'}}>{cardValues[i]}</div>
                </div>
              ))}
            </div>

            {/* Tip */}
            {heading !== null ? (
              <div style={{background:'rgba(34,197,94,0.05)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:11,padding:'12px 14px',display:'flex',gap:9}}>
                <CheckCircle size={13} style={{color:'#22c55e',flexShrink:0,marginTop:2}}/>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:'0.8rem',color:'rgba(10,37,64,0.62)',lineHeight:1.7}}>{L.liveCompassTip}</p>
              </div>
            ) : (
              <div style={{background:'rgba(212,175,55,0.05)',border:'1px solid rgba(212,175,55,0.16)',borderRadius:11,padding:'12px 14px',display:'flex',gap:9}}>
                <Navigation size={13} style={{color:'#D4AF37',flexShrink:0,marginTop:2}}/>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:'0.8rem',color:'rgba(10,37,64,0.62)',lineHeight:1.7}}>
                  {L.staticTip(Math.round(qibla), card)}<br/>
                  <span style={{fontSize:'0.75rem',opacity:0.7,whiteSpace:'pre-line'}}>{L.staticTipSub(Math.round(qibla), card)}</span>
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Kaaba info */}
        <div style={{marginTop:40,padding:'22px 18px',background:'linear-gradient(135deg,#0a2540,#0d2e4d)',borderRadius:16,textAlign:'center'}}>
          <div style={{fontSize:'1.7rem',marginBottom:8}}>🕋</div>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontWeight:800,color:'#ffffff',fontSize:'1rem',marginBottom:4}}>{L.kaabaTitle}</h3>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontWeight:300,color:'rgba(255,255,255,0.35)',fontSize:'0.76rem'}}>{L.kaabaCoords}</p>
        </div>
      </div>

      <style>{`
        @keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes lp   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.5)} }
      `}</style>
    

      {/* Related Tools — Interlinking */}
      <RelatedTools exclude={["qibla"]} max={6} light={true} />

    </div>
  );
}
