import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '@/src/components/SEO';
import { useTranslation } from 'react-i18next';
import { MapPin, Search, Clock, Calendar, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RelatedTools } from '@/src/components/RelatedTools';
import { format } from 'date-fns';

const NAVY  = '#0a2540';
const NAVY2 = '#0d2e4d';
const GOLD  = '#D4AF37';

const UI: Record<string, any> = {
  en: {
    badge: 'Real-time Prayer Times · Powered by Aladhan API',
    title: 'Prayer Times',
    sub: 'Accurate Fajr, Dhuhr, Asr, Maghrib and Isha times for any city worldwide — calculated from your exact GPS coordinates.',
    searchPlaceholder: 'Search any city worldwide...',
    useLocation: 'Use my location',
    detecting: 'Detecting location...',
    today: 'Today',
    method: 'Calculation method',
    methods: { '2':'ISNA (North America)', '3':'MWL (Muslim World League)', '4':'Umm al-Qura (Makkah)', '5':'Egyptian General Authority', '8':'Gulf Region', '12':'Karachi (Hanafi)', '14':'Qatar', '15':'Singapore', '21':'Dubai (UAE)', '99':'Custom' },
    prayers: { Fajr:'Fajr · Dawn', Sunrise:'Sunrise', Dhuhr:'Dhuhr · Midday', Asr:'Asr · Afternoon', Maghrib:'Maghrib · Sunset', Isha:'Isha · Night' },
    prayerEmoji: { Fajr:'🌅', Sunrise:'🌄', Dhuhr:'☀️', Asr:'🕒', Maghrib:'🌇', Isha:'🌙' },
    islamicDate: 'Islamic Date',
    gregorianDate: 'Gregorian Date',
    nextPrayer: 'Next prayer',
    cityNotFound: 'City not found. Please try another name.',
    errorLocation: 'Could not get location. Please search your city.',
    popularCities: 'Popular cities',
    ctaQibla: 'Qibla Direction',
    ctaDuas: 'Daily Duas',
    ctaRamadan: 'Ramadan Guide',
    infoH: 'About Prayer Times',
    infoT: 'Prayer times are calculated using astronomical formulas based on your precise geographic coordinates. The calculation method may vary by country and madhab. The Aladhan API provides times used by Islamic institutions worldwide.',
    status: 'Status',
    upcoming: 'Upcoming',
    passed: 'Passed',
    current: 'Current',
    upcoming2: "قادمة",
        searchBtn: 'بحث',
  },
  ar: {
    badge: 'أوقات الصلاة الآنية · بإمداد من واجهة Aladhan',
    title: 'أوقات الصلاة',
    sub: 'أوقات فجر ودهر وعصر ومغرب وعشاء دقيقة لأي مدينة في العالم — محسوبة من إحداثياتك الجغرافية الدقيقة.',
    searchPlaceholder: 'ابحث عن أي مدينة في العالم...',
    useLocation: 'استخدم موقعي',
    detecting: 'جاري تحديد الموقع...',
    today: 'اليوم',
    method: 'طريقة الحساب',
    methods: { '2':'ISNA (أمريكا الشمالية)', '3':'رابطة العالم الإسلامي', '4':'أم القرى (مكة)', '5':'الهيئة المصرية العامة', '8':'منطقة الخليج', '12':'كراتشي (حنفي)', '14':'قطر', '15':'سنغافورة', '21':'دبي (الإمارات)', '99':'مخصص' },
    prayers: { Fajr:'الفجر', Sunrise:'الشروق', Dhuhr:'الظهر', Asr:'العصر', Maghrib:'المغرب', Isha:'العشاء' },
    prayerEmoji: { Fajr:'🌅', Sunrise:'🌄', Dhuhr:'☀️', Asr:'🕒', Maghrib:'🌇', Isha:'🌙' },
    islamicDate: 'التاريخ الإسلامي',
    gregorianDate: 'التاريخ الميلادي',
    nextPrayer: 'الصلاة القادمة',
    cityNotFound: 'لم يتم العثور على المدينة. يرجى تجربة اسم آخر.',
    errorLocation: 'تعذر الحصول على الموقع. يرجى البحث عن مدينتك.',
    popularCities: 'مدن شائعة',
    ctaQibla: 'اتجاه القبلة',
    ctaDuas: 'الأدعية اليومية',
    ctaRamadan: 'دليل رمضان',
    infoH: 'حول أوقات الصلاة',
    infoT: 'تُحسب أوقات الصلاة بصيغ فلكية بناءً على إحداثياتك الجغرافية الدقيقة. قد تختلف طريقة الحساب حسب البلد والمذهب. توفر واجهة Aladhan أوقاتاً تستخدمها المؤسسات الإسلامية حول العالم.',
    status: 'الحالة',
    upcoming: 'قادمة',
    passed: 'مضت',
    current: 'الحالية',
    upcoming2: 'قادمة',
  },
  fr: {
    badge: 'Horaires de Prière en Temps Réel · Alimenté par l\'API Aladhan',
    title: 'Horaires de Prière',
    sub: 'Horaires précis de Fajr, Dhuhr, Asr, Maghrib et Isha pour n\'importe quelle ville dans le monde — calculés à partir de vos coordonnées GPS exactes.',
    searchPlaceholder: 'Rechercher une ville dans le monde...',
    useLocation: 'Utiliser ma position',
    detecting: 'Détection de la position...',
    today: 'Aujourd\'hui',
    method: 'Méthode de calcul',
    methods: { '2':'ISNA (Amérique du Nord)', '3':'MWL (Ligue Musulmane Mondiale)', '4':'Umm al-Qura (La Mecque)', '5':'Autorité Générale Égyptienne', '8':'Région du Golfe', '12':'Karachi (Hanafi)', '14':'Qatar', '15':'Singapour', '21':'Dubaï (EAU)', '99':'Personnalisé' },
    prayers: { Fajr:'Fajr · Aube', Sunrise:'Lever du Soleil', Dhuhr:'Dhuhr · Midi', Asr:'Asr · Après-midi', Maghrib:'Maghrib · Coucher', Isha:'Isha · Nuit' },
    prayerEmoji: { Fajr:'🌅', Sunrise:'🌄', Dhuhr:'☀️', Asr:'🕒', Maghrib:'🌇', Isha:'🌙' },
    islamicDate: 'Date Islamique',
    gregorianDate: 'Date Grégorienne',
    nextPrayer: 'Prochaine prière',
    cityNotFound: 'Ville introuvable. Essayez un autre nom.',
    errorLocation: 'Impossible d\'obtenir la position. Veuillez rechercher votre ville.',
    popularCities: 'Villes populaires',
    ctaQibla: 'Direction Qibla',
    ctaDuas: 'Douas Quotidiennes',
    ctaRamadan: 'Guide Ramadan',
    infoH: 'À Propos des Horaires de Prière',
    infoT: 'Les horaires de prière sont calculés à l\'aide de formules astronomiques basées sur vos coordonnées géographiques précises. La méthode de calcul peut varier selon le pays et le madhab.',
    status: 'Statut',
    upcoming: 'À venir',
    passed: 'Passée',
    current: 'Actuelle',
    upcoming2: 'Prochaine',
  },
  es: {
    badge: 'Horarios de Oración en Tiempo Real · Impulsado por la API Aladhan',
    title: 'Horarios de Oración',
    sub: 'Horarios precisos de Fajr, Dhuhr, Asr, Maghrib e Isha para cualquier ciudad del mundo — calculados desde tus coordenadas GPS exactas.',
    searchPlaceholder: 'Buscar cualquier ciudad del mundo...',
    useLocation: 'Usar mi ubicación',
    detecting: 'Detectando ubicación...',
    today: 'Hoy',
    method: 'Método de cálculo',
    methods: { '2':'ISNA (América del Norte)', '3':'MWL (Liga Mundial Musulmana)', '4':'Umm al-Qura (La Meca)', '5':'Autoridad General Egipcia', '8':'Región del Golfo', '12':'Karachi (Hanafi)', '14':'Qatar', '15':'Singapur', '21':'Dubai (EAU)', '99':'Personalizado' },
    prayers: { Fajr:'Fajr · Amanecer', Sunrise:'Amanecer', Dhuhr:'Dhuhr · Mediodía', Asr:'Asr · Tarde', Maghrib:'Maghrib · Atardecer', Isha:'Isha · Noche' },
    prayerEmoji: { Fajr:'🌅', Sunrise:'🌄', Dhuhr:'☀️', Asr:'🕒', Maghrib:'🌇', Isha:'🌙' },
    islamicDate: 'Fecha Islámica',
    gregorianDate: 'Fecha Gregoriana',
    nextPrayer: 'Próxima oración',
    cityNotFound: 'Ciudad no encontrada. Prueba con otro nombre.',
    errorLocation: 'No se pudo obtener la ubicación. Por favor busca tu ciudad.',
    popularCities: 'Ciudades populares',
    ctaQibla: 'Dirección Qibla',
    ctaDuas: 'Duas Diarias',
    ctaRamadan: 'Guía de Ramadán',
    infoH: 'Acerca de los Horarios de Oración',
    infoT: 'Los horarios de oración se calculan usando fórmulas astronómicas basadas en tus coordenadas geográficas precisas. El método de cálculo puede variar según el país y el madhab.',
    status: 'Estado',
    upcoming: 'Próxima',
    passed: 'Pasada',
    current: 'Actual',
    upcoming2: 'Próxima',
        searchBtn: 'Buscar',
  },
};

const POPULAR_CITIES = [
  'Makkah','Madinah','Cairo','Istanbul','London','Dubai','Karachi','Jakarta','Lagos',
  'Paris','Berlin','New York','Kuala Lumpur','Casablanca','Riyadh','Tehran','Baghdad',
  'Dhaka','Lahore','Nairobi','Manchester','Birmingham','Amsterdam','Brussels','Madrid',
  'Toronto','Sydney','Melbourne','Singapore','Doha','Abu Dhabi','Amman','Beirut','Tunis',
];

const PRAYERS_ORDER = ['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha'];

function timeToMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function getCurrentPrayerStatus(times: Record<string, string>): Record<string, string> {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const result: Record<string, string> = {};
  PRAYERS_ORDER.forEach((p, i) => {
    if (!times[p]) return;
    const pMin = timeToMinutes(times[p]);
    const nextPMin = i < PRAYERS_ORDER.length - 1 ? timeToMinutes(times[PRAYERS_ORDER[i+1]] || '23:59') : 24 * 60;
    if (nowMin >= pMin && nowMin < nextPMin) result[p] = 'current';
    else if (nowMin < pMin) result[p] = 'upcoming';
    else result[p] = 'passed';
  });
  return result;
}

export function PrayerTimesPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.slice(0, 2) || 'en') as string;
  const L = UI[lang] || UI.en;
  const isRTL = lang === 'ar';
  const { city: cityParam } = useParams<{ city?: string }>();
  const navigate = useNavigate();

  const [times, setTimes] = useState<Record<string, string> | null>(null);
  const [islamicDate, setIslamicDate] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQ, setSearchQ] = useState('');
  const [method, setMethod] = useState('3');
  const [showMethodMenu, setShowMethodMenu] = useState(false);
  const [statuses, setStatuses] = useState<Record<string, string>>({});

  const fetchByCoords = useCallback(async (lat: number, lon: number, cityName?: string) => {
    setLoading(true); setError('');
    try {
      const ts = Math.floor(Date.now() / 1000);
      const [prayerRes, locRes] = await Promise.all([
        fetch(`https://api.aladhan.com/v1/timings/${ts}?latitude=${lat}&longitude=${lon}&method=${method}`),
        cityName ? Promise.resolve(null) : fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`),
      ]);
      const prayerData = await prayerRes.json();
      if (prayerData.code !== 200) throw new Error('API error');
      const t = prayerData.data.timings;
      const d = prayerData.data.date;
      const filtered: Record<string, string> = {};
      PRAYERS_ORDER.forEach(p => { if (t[p]) filtered[p] = t[p].replace(' (EST)', '').replace(' (CST)', '').split(' ')[0]; });
      setTimes(filtered);
      setStatuses(getCurrentPrayerStatus(filtered));
      setIslamicDate(`${d.hijri.day} ${d.hijri.month.en} ${d.hijri.year} AH`);
      if (cityName) { setLocation(cityName); }
      else if (locRes) {
        const locData = await locRes.json();
        setLocation(`${locData.city || locData.locality || 'Your location'}, ${locData.countryName}`);
      }
    } catch { setError(L.errorLocation); }
    finally { setLoading(false); }
  }, [method, L]);

  const fetchByCity = useCallback(async (city: string) => {
    setLoading(true); setError('');
    try {
      const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`);
      const geoData = await geoRes.json();
      if (!geoData.length) { setError(L.cityNotFound); setLoading(false); return; }
      const { lat, lon, display_name } = geoData[0];
      const cityName = display_name.split(',')[0];
      await fetchByCoords(parseFloat(lat), parseFloat(lon), cityName);
    } catch { setError(L.cityNotFound); setLoading(false); }
  }, [fetchByCoords, L]);

  const geoLocate = useCallback(() => {
    setLoading(true); setError(''); setLocation(L.detecting);
    navigator.geolocation.getCurrentPosition(
      async p => {
        const { latitude, longitude } = p.coords;
        // Auto-detect best calculation method for user's country
        try {
          const geoRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const geoData = await geoRes.json();
          const countryCode = geoData.countryCode || '';
          const autoMethod = getMethodForCountry(countryCode);
          setMethod(autoMethod);
        } catch { /* keep current method on error */ }
        fetchByCoords(latitude, longitude);
      },
      () => { setError(L.errorLocation); setLoading(false); }
    );
  }, [fetchByCoords, L]);

  // Load on mount: cityParam or geolocation
  useEffect(() => {
    if (cityParam) fetchByCity(decodeURIComponent(cityParam));
    else geoLocate();
  }, [cityParam]);

  // Refresh statuses every minute
  useEffect(() => {
    if (!times) return;
    const id = setInterval(() => setStatuses(getCurrentPrayerStatus(times)), 60000);
    return () => clearInterval(id);
  }, [times]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQ.trim()) return;
    navigate(`/prayer-times/${encodeURIComponent(searchQ.trim().toLowerCase())}`);
    setSearchQ('');
  };

  const schema = {
    '@context': 'https://schema.org', '@type': 'Event',
    name: `Prayer Times in ${location}`,
    startDate: format(new Date(), 'yyyy-MM-dd'),
    location: { '@type': 'Place', name: location },
    description: `Daily Islamic prayer times for ${location}: Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha.`,
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background: NAVY, minHeight: '100vh', color: '#fff' }}>
      <SEO
        title={location ? `Prayer Times in ${location} Today — Fajr, Dhuhr, Asr, Maghrib, Isha` : 'Prayer Times Near Me Today — Accurate Islamic Prayer Schedule'}
        description={`Accurate prayer times for ${location || 'your city'}. Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha times updated daily. ${format(new Date(), 'MMMM yyyy')}.`}
        keywords={`prayer times ${location}, salah times, fajr time ${location}, islamic prayer schedule, namaz times ${location}`}
        canonical={`https://www.alummahai.com/prayer-times${cityParam ? `/${cityParam}` : ''}`}
        schema={schema}
        lang={lang}
      />

      {/* Hero */}
      <div style={{ background: `linear-gradient(160deg,#071a2e 0%,${NAVY} 55%,${NAVY2} 100%)`, borderBottom: '1px solid rgba(212,175,55,0.12)', padding: 'clamp(80px,12vw,110px) 20px 32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(212,175,55,0.06) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'inline-block', padding: '4px 14px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.22)', borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontSize: '0.5rem', fontWeight: 900, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.24em', marginBottom: 14 }}>
            🕌 {L.badge}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}
            style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(2rem,7vw,4.5rem)', color: '#fff', letterSpacing: '-0.03em', marginBottom: 10, lineHeight: 1 }}>
            {L.title}
          </motion.h1>

          {/* Location pill */}
          {location && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginBottom: 8 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>
                <MapPin size={12} style={{ color: GOLD }} /> {location}
              </div>
              {islamicDate && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.18)', borderRadius: 99, fontFamily: "'Amiri',serif", fontSize: '0.78rem', color: GOLD }}>
                  {islamicDate}
                </div>
              )}
            </motion.div>
          )}

          {/* Date */}
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.62rem', fontWeight: 700, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 22 }}>
            <Calendar size={10} style={{ display: 'inline', marginRight: 5 }} />
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, maxWidth: 520, margin: '0 auto 12px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 12, padding: '10px 14px' }}>
              <Search size={15} style={{ color: GOLD, flexShrink: 0 }} />
              <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder={L.searchPlaceholder}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontFamily: "'DM Sans',sans-serif", fontSize: '0.86rem', color: '#fff', fontWeight: 300 }} />
            </div>
            <button type="submit" style={{ padding: '10px 18px', background: GOLD, border: 'none', borderRadius: 12, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.7rem', color: NAVY, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
              {L.searchBtn || '→'}
            </button>
          </form>

          {/* GPS button */}
          <button onClick={geoLocate} disabled={loading}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 18px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontSize: '0.66rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(212,175,55,0.4)'; el.style.color=GOLD; }}
            onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(255,255,255,0.12)'; el.style.color='rgba(255,255,255,0.6)'; }}>
            <MapPin size={12} /> {L.useLocation}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(24px,4vw,44px) 20px' }}>

        {/* Method selector */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.62rem', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.18em' }}>
            {L.today} — {format(new Date(), 'MMMM d, yyyy')}
          </div>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowMethodMenu(o => !o)}
              style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontFamily: "'DM Sans',sans-serif", fontSize: '0.64rem', fontWeight: 700, color: 'rgba(255,255,255,0.55)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              <Clock size={12} style={{ color: GOLD }} />
              {(L.methods as any)[method]}
              <ChevronDown size={12} style={{ transform: showMethodMenu ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </button>
            <AnimatePresence>
              {showMethodMenu && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  style={{ position: 'absolute', top: '110%', right: 0, background: '#071a2e', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 12, overflow: 'hidden', zIndex: 50, minWidth: 240, boxShadow: '0 12px 36px rgba(0,0,0,0.5)' }}>
                  {Object.entries(L.methods).map(([k, v]) => (
                    <button key={k} onClick={() => { setMethod(k); setShowMethodMenu(false); }}
                      style={{ width: '100%', padding: '10px 16px', background: method === k ? 'rgba(212,175,55,0.1)' : 'transparent', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: '0.72rem', fontWeight: method === k ? 800 : 400, color: method === k ? GOLD : 'rgba(255,255,255,0.55)', textAlign: 'left', transition: 'all 0.12s' }}
                      onMouseEnter={e => { if (method !== k) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                      onMouseLeave={e => { if (method !== k) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                      {v as string}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-block', marginBottom: 16 }}>
              <Clock size={44} style={{ color: 'rgba(212,175,55,0.3)' }} />
            </motion.div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{L.detecting}</div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 14, padding: '16px 20px', color: '#f87171', fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', marginBottom: 24, textAlign: 'center' }}>
            {error}
          </div>
        )}

        {/* Prayer times grid */}
        {times && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(clamp(160px,28vw,280px),1fr))', gap: 14, marginBottom: 44 }}>
            {PRAYERS_ORDER.filter(p => times[p]).map((p, i) => {
              const status = statuses[p] || 'upcoming';
              const isCurrent = status === 'current';
              const isPassed = status === 'passed';
              return (
                <motion.div key={p} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  style={{ background: isCurrent ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${isCurrent ? 'rgba(212,175,55,0.45)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 18, padding: 'clamp(16px,2.5vw,24px)', textAlign: 'center', position: 'relative', opacity: isPassed ? 0.5 : 1, transition: 'all 0.2s', boxShadow: isCurrent ? '0 0 30px rgba(212,175,55,0.12)' : 'none' }}>
                  {isCurrent && (
                    <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <motion.div animate={{ scale: [1,1.4,1], opacity: [1,0.4,1] }} transition={{ duration: 1.6, repeat: Infinity }}
                        style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.8)' }} />
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.46rem', fontWeight: 900, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.16em' }}>{L.current}</span>
                    </div>
                  )}
                  <div style={{ fontSize: 'clamp(1.4rem,4vw,2rem)', marginBottom: 8 }}>
                    {(L.prayerEmoji as any)[p] || '🕌'}
                  </div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.52rem', fontWeight: 900, color: isCurrent ? GOLD : 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 6 }}>
                    {(L.prayers as any)[p] || p}
                  </div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.5rem,5vw,2.8rem)', color: isCurrent ? GOLD : '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {times[p]}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Popular cities */}
        <div style={{ marginBottom: 44 }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.58rem', fontWeight: 900, color: 'rgba(212,175,55,0.5)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 12 }}>
            {L.popularCities}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {POPULAR_CITIES.map(city => (
              <Link key={city} to={`/prayer-times/${city.toLowerCase().replace(/\s+/g,'-')}`}
                style={{ textDecoration: 'none', padding: '5px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontSize: '0.64rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', transition: 'all 0.15s' }}
                onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(212,175,55,0.35)'; el.style.color=GOLD; el.style.background='rgba(212,175,55,0.07)'; }}
                onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(255,255,255,0.08)'; el.style.color='rgba(255,255,255,0.5)'; el.style.background='rgba(255,255,255,0.03)'; }}>
                {city}
              </Link>
            ))}
          </div>
        </div>

        {/* Info + CTA row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 32 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '20px' }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.6rem', fontWeight: 900, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 8 }}>{L.infoH}</div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.76rem', color: 'rgba(255,255,255,0.42)', lineHeight: 1.8 }}>{L.infoT}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { href: '/qibla',   e: '🧭', t: L.ctaQibla    },
              { href: '/duas',    e: '🤲', t: L.ctaDuas      },
              { href: '/ramadan', e: '☪️', t: L.ctaRamadan   },
            ].map(({ href, e, t }) => (
              <Link key={href} to={href} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', fontWeight: 700, color: '#fff', transition: 'all 0.15s' }}
                onMouseEnter={el => { const c=el.currentTarget as HTMLElement; c.style.borderColor='rgba(212,175,55,0.35)'; c.style.color=GOLD; c.style.background='rgba(212,175,55,0.05)'; }}
                onMouseLeave={el => { const c=el.currentTarget as HTMLElement; c.style.borderColor='rgba(255,255,255,0.07)'; c.style.color='#fff'; c.style.background='rgba(255,255,255,0.03)'; }}>
                <span style={{ fontSize: '1rem' }}>{e}</span> {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    

      {/* Related Tools — Interlinking */}
      <RelatedTools exclude={["prayer"]} max={6} light={true} />

    </div>
  );
}
