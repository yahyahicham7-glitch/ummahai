import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SEO } from '@/src/components/SEO';
import { Clock, Calendar, MapPin, ChevronLeft, Download, Share2, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { AdSense } from '@/src/components/AdSense';

interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export function DetailedSchedulePage() {
  const { t } = useTranslation();
  const { city: cityParam } = useParams();
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [location, setLocation] = useState<string>(cityParam ? cityParam.charAt(0).toUpperCase() + cityParam.slice(1) : t('prayer.detecting'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimes = async () => {
      const today = format(new Date(), 'yyyy-MM-dd');
      const cacheKey = cityParam ? `prayer_times_${cityParam}_${today}` : `prayer_times_local_${today}`;
      const cachedData = localStorage.getItem(cacheKey);
      
      if (cachedData) {
        const { times: cachedTimes, location: cachedLoc } = JSON.parse(cachedData);
        setTimes(cachedTimes);
        setLocation(cachedLoc);
        setLoading(false);
        return;
      }

      try {
        let lat, lon;

        if (cityParam) {
          // Geocode city name
          const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${cityParam}&limit=1`);
          const geoData = await geoRes.json();
          if (geoData.length > 0) {
            lat = geoData[0].lat;
            lon = geoData[0].lon;
            setLocation(geoData[0].display_name.split(',')[0]);
          }
        }

        if (!lat || !lon) {
          const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
          });
          lat = pos.coords.latitude;
          lon = pos.coords.longitude;
        }
        
        // Parallel fetch for speed
        const [locRes, prayerRes] = await Promise.all([
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`),
          fetch(`https://api.aladhan.com/v1/timings/${Math.floor(Date.now() / 1000)}?latitude=${lat}&longitude=${lon}&method=2`)
        ]);

        const locData = await locRes.json();
        const prayerData = await prayerRes.json();
        
        const newLoc = cityParam ? location : `${locData.city}, ${locData.countryName}`;
        const newTimes = prayerData.data.timings;

        setTimes(newTimes);
        setLocation(newLoc);
        
        // Cache for today
        localStorage.setItem(cacheKey, JSON.stringify({
          times: newTimes,
          location: newLoc
        }));
      } catch (error) {
        console.error("Error fetching prayer times:", error);
        setLocation(t('prayer.access_denied'));
      } finally {
        setLoading(false);
      }
    };

    fetchTimes();
  }, [t, cityParam]);

  const prayerIcons = {
    Fajr: '🌅',
    Sunrise: '☀️',
    Dhuhr: '🌞',
    Asr: '🕒',
    Maghrib: '🌇',
    Isha: '🌙'
  };

  // Schema for prayer times
  const prayerSchema = times ? {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": `Prayer Times in ${location}`,
    "startDate": format(new Date(), 'yyyy-MM-dd'),
    "location": {
      "@type": "Place",
      "name": location,
      "address": location
    },
    "description": `Daily Islamic prayer times for ${location}: Fajr, Dhuhr, Asr, Maghrib, Isha.`
  } : undefined;

  return (
    <div style={{ background: '#060f1e', color: '#fff', minHeight: '100vh' }}>
      <SEO 
        title={`${t('prayer.title')} in ${location} Today`} 
        description={`Accurate daily prayer times for ${location}. Fajr, Dhuhr, Asr, Maghrib, and Isha times. Updated for ${format(new Date(), 'MMMM yyyy')}.`}
        keywords={`prayer times ${location}, salat schedule ${location}, islamic prayer ${location}, fajr time ${location}`}
        schema={prayerSchema}
      />

      <div style={{ maxWidth: 960, margin: '0 auto', padding: 'clamp(80px,10vh,100px) clamp(16px,5vw,32px) 60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
          <button 
            onClick={() => window.history.back()}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#D4AF37', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontWeight: 900, fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}
          >
            <ChevronLeft style={{ width: 16, height: 16 }} /> {t('prayer.back')}
          </button>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(212,175,55,0.1)', color: 'rgba(212,175,55,0.5)', cursor: 'pointer' }}>
              <Download style={{ width: 16, height: 16 }} />
            </button>
            <button style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(212,175,55,0.1)', color: 'rgba(212,175,55,0.5)', cursor: 'pointer' }}>
              <Share2 style={{ width: 16, height: 16 }} />
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(3rem,10vw,7rem)', color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 20 }}>{t('prayer.title')}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', padding: '8px 20px', borderRadius: 99, border: '1px solid rgba(212,175,55,0.1)', fontSize: '0.7rem', color: 'rgba(212,175,55,0.7)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3em' }}>
              <MapPin style={{ width: 14, height: 14, color: '#D4AF37' }} /> {location}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', padding: '8px 20px', borderRadius: 99, border: '1px solid rgba(212,175,55,0.1)', fontSize: '0.7rem', color: 'rgba(212,175,55,0.7)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3em' }}>
              <Calendar style={{ width: 14, height: 14, color: '#D4AF37' }} /> {format(new Date(), 'MMMM dd, yyyy')}
            </span>
          </div>
        </motion.div>

        <AdSense slot="7289012345" className="hidden md:flex" />

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
              <Clock style={{ width: 56, height: 56, color: 'rgba(212,175,55,0.25)' }} />
            </motion.div>
          </div>
        ) : times && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {Object.entries(times).filter(([name]) => !['Sunset', 'Imsak', 'Midnight', 'Firstthird', 'Lastthird'].includes(name)).map(([name, time], index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, borderColor: 'rgba(212,175,55,0.4)' }}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.1)', borderRadius: 20, padding: 'clamp(20px,4vw,32px)', position: 'relative', overflow: 'hidden', transition: 'border-color 0.2s' }}
              >
                <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: 'rgba(212,175,55,0.04)', borderRadius: '50%', transform: 'translate(30%, -30%)', pointerEvents: 'none' }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, position: 'relative' }}>
                  <span style={{ fontSize: '2rem' }}>{prayerIcons[name as keyof typeof prayerIcons]}</span>
                  <button style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: 10, border: '1px solid rgba(212,175,55,0.1)', color: 'rgba(212,175,55,0.3)', cursor: 'pointer' }}>
                    <Bell style={{ width: 16, height: 16 }} />
                  </button>
                </div>

                <div style={{ position: 'relative' }}>
                  <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 900, fontSize: '0.6rem', color: 'rgba(212,175,55,0.5)', textTransform: 'uppercase', letterSpacing: '0.5em', marginBottom: 8 }}>{name}</h3>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(2.5rem,7vw,4rem)', color: '#ffffff', lineHeight: 1, letterSpacing: '-0.025em' }}>{time as string}</p>
                </div>

                <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(212,175,55,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.55rem', color: 'rgba(255,255,255,0.25)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.25em' }}>{t('prayer.status')}</span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.55rem', color: '#D4AF37', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.25em', background: 'rgba(212,175,55,0.1)', padding: '4px 12px', borderRadius: 99, border: '1px solid rgba(212,175,55,0.15)' }}>{t('prayer.upcoming')}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AdSense slot="3002501234" className="md:hidden" />

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: 48, background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: 20, padding: 'clamp(24px,5vw,40px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(212,175,55,0.04) 0%, transparent 50%, rgba(212,175,55,0.04) 100%)', pointerEvents: 'none' }} />
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: '1.6rem', color: '#ffffff', position: 'relative', marginBottom: 12 }}>{t('prayer.preparation')}</h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: 'rgba(212,175,55,0.55)', maxWidth: 520, margin: '0 auto 24px', fontWeight: 300, lineHeight: 1.8, fontStyle: 'italic', position: 'relative' }}>
            "{t('prayer.preparation_desc')}"
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, position: 'relative' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: '1.8rem', color: '#D4AF37' }}>5</p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 800 }}>{t('prayer.daily_prayers')}</p>
            </div>
            <div style={{ width: 1, background: 'rgba(212,175,55,0.15)' }} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: '1.8rem', color: '#D4AF37' }}>100%</p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 800 }}>{t('prayer.accuracy')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
