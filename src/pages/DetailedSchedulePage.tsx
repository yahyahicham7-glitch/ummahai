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
    <div className="max-w-7xl mx-auto px-4 py-24">
      <SEO 
        title={`${t('prayer.title')} in ${location} Today`} 
        description={`Accurate daily prayer times for ${location}. Fajr, Dhuhr, Asr, Maghrib, and Isha times with spiritual guidance. Updated for ${format(new Date(), 'MMMM yyyy')}.`}
        keywords={`prayer times ${location}, salat schedule ${location}, islamic prayer ${location}, fajr time ${location}`}
        schema={prayerSchema}
      />

      <div className="space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-gold font-black tracking-[0.3em] uppercase text-[10px] hover:text-cream transition-all group"
          >
            <ChevronLeft className="w-5 h-5 mr-3 group-hover:-translate-x-2 transition-transform" /> {t('prayer.back')}
          </button>
          
          <div className="flex space-x-4">
            <button className="p-4 bg-white/5 rounded-2xl text-gold/40 hover:text-gold hover:bg-gold/10 transition-all border border-gold/10">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-4 bg-white/5 rounded-2xl text-gold/40 hover:text-gold hover:bg-gold/10 transition-all border border-gold/10">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <h1 className="text-7xl md:text-[12rem] font-display font-black text-cream tracking-tighter leading-none">{t('prayer.title')}</h1>
          <div className="flex flex-wrap justify-center items-center gap-8 text-[12px] text-gold/60 uppercase tracking-[0.4em] font-black">
            <span className="flex items-center bg-white/5 px-8 py-3 rounded-full border border-gold/10 backdrop-blur-md">
              <MapPin className="w-5 h-5 mr-4 text-gold" /> {location}
            </span>
            <span className="flex items-center bg-white/5 px-8 py-3 rounded-full border border-gold/10 backdrop-blur-md">
              <Calendar className="w-5 h-5 mr-4 text-gold" /> {format(new Date(), 'MMMM dd, yyyy')}
            </span>
          </div>
        </motion.div>

        <AdSense slot="7289012345" className="hidden md:flex" />

        {loading ? (
          <div className="flex justify-center py-32">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="w-24 h-24 text-gold/20" />
            </motion.div>
          </div>
        ) : times && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {Object.entries(times).filter(([name]) => !['Sunset', 'Imsak', 'Midnight', 'Firstthird', 'Lastthird'].includes(name)).map(([name, time], index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -15, borderColor: "rgba(212, 175, 55, 0.6)", backgroundColor: "rgba(212, 175, 55, 0.03)" }}
                className="glass-card p-16 md:p-20 space-y-12 hover:border-gold transition-all group relative overflow-hidden border-gold/10"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -mr-32 -mt-32 blur-[100px] group-hover:bg-gold/10 transition-all"></div>
                
                <div className="flex justify-between items-center relative z-10">
                  <span className="text-6xl filter drop-shadow-2xl">{prayerIcons[name as keyof typeof prayerIcons]}</span>
                  <button className="p-5 bg-white/5 rounded-2xl text-gold/20 hover:text-gold hover:bg-gold/10 transition-all border border-transparent hover:border-gold/20">
                    <Bell className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4 relative z-10">
                  <h3 className="text-gold/40 text-xs font-black uppercase tracking-[0.6em]">{name}</h3>
                  <p className="text-7xl md:text-9xl font-display font-black text-cream tracking-tighter leading-none">{time}</p>
                </div>

                <div className="pt-10 border-t border-gold/10 flex justify-between items-center relative z-10">
                  <span className="text-xs text-cream/30 font-black uppercase tracking-[0.3em]">{t('prayer.status')}</span>
                  <span className="text-xs text-gold font-black uppercase tracking-[0.3em] bg-gold/10 px-6 py-2 rounded-full border border-gold/20">{t('prayer.upcoming')}</span>
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
          className="glass-card p-16 md:p-24 text-center space-y-10 border-gold/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5"></div>
          <h2 className="text-4xl font-display font-black text-cream relative z-10">{t('prayer.preparation')}</h2>
          <p className="text-gold/60 max-w-2xl mx-auto font-light leading-relaxed relative z-10 text-lg italic">
            "{t('prayer.preparation_desc')}"
          </p>
          <div className="flex justify-center gap-8 relative z-10">
            <div className="text-center">
              <p className="text-3xl font-display font-black text-gold">5</p>
              <p className="text-[10px] text-cream/40 uppercase tracking-widest font-black">{t('prayer.daily_prayers')}</p>
            </div>
            <div className="w-px h-12 bg-gold/20"></div>
            <div className="text-center">
              <p className="text-3xl font-display font-black text-gold">100%</p>
              <p className="text-[10px] text-cream/40 uppercase tracking-widest font-black">{t('prayer.accuracy')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
