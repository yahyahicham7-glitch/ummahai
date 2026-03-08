import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, MapPin, Clock, ChevronRight, Loader2, Bell } from 'lucide-react';
import { getPrayerTimes, searchCity, getCityFromCoords, type PrayerTimes, type CityInfo } from '@/src/services/prayerService';
import { cn } from '@/src/utils/cn';
import { format, parse } from 'date-fns';
import { motion } from 'motion/react';

export function PrayerWidget() {
  const { t } = useTranslation();
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [city, setCity] = useState<string>('Detecting...');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CityInfo[]>([]);
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string } | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      const today = format(new Date(), 'yyyy-MM-dd');
      const cached = localStorage.getItem(`prayer_widget_${today}`);
      
      if (cached) {
        const { times: cachedTimes, city: cachedCity } = JSON.parse(cached);
        setTimes(cachedTimes);
        setCity(cachedCity);
        setLoading(false);
        return;
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const [prayerData, cityName] = await Promise.all([
              getPrayerTimes(latitude, longitude),
              getCityFromCoords(latitude, longitude)
            ]);
            setTimes(prayerData);
            setCity(cityName);
            setLoading(false);
            localStorage.setItem(`prayer_widget_${today}`, JSON.stringify({ times: prayerData, city: cityName }));
          },
          async () => {
            const prayerData = await getPrayerTimes(51.5074, -0.1278);
            setTimes(prayerData);
            setCity('London');
            setLoading(false);
          }
        );
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!times) return;

    const calculateNextPrayer = () => {
      const now = new Date();
      const prayers = Object.entries(times).filter(([name]) => 
        ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].includes(name)
      );

      for (const [name, time] of prayers) {
        const prayerTime = parse(time, 'HH:mm', now);
        if (prayerTime > now) {
          setNextPrayer({ name, time });
          return;
        }
      }
      setNextPrayer({ name: 'Fajr', time: times.Fajr });
    };

    calculateNextPrayer();
    const interval = setInterval(calculateNextPrayer, 60000);
    return () => clearInterval(interval);
  }, [times]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    const results = await searchCity(searchQuery);
    setSearchResults(results);
  };

  const selectCity = async (selectedCity: CityInfo) => {
    setLoading(true);
    const prayerData = await getPrayerTimes(selectedCity.latitude, selectedCity.longitude);
    setTimes(prayerData);
    setCity(selectedCity.name);
    setSearchResults([]);
    setSearchQuery('');
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="glass-card p-12 flex flex-col items-center justify-center min-h-[500px]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-gold mb-6" />
        </motion.div>
        <p className="text-gold font-display font-bold tracking-widest uppercase animate-pulse">{t('prayer.calculating')}</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="glass-card overflow-hidden border-gold/30 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
    >
      <div className="bg-gradient-to-br from-glamour-blue-light to-glamour-blue p-8 text-cream relative">
        <div className="absolute top-0 right-0 p-4">
          <Bell className="w-5 h-5 text-gold/30" />
        </div>
        
        <div className="flex flex-col space-y-6 mb-8">
          <div className="flex items-center space-x-3 text-gold">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-black tracking-[0.2em] uppercase">{city}</span>
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-4xl font-display font-black tracking-tight mb-1">{t('prayer.title')}</h2>
              <p className="text-gold/60 text-xs font-bold uppercase tracking-widest">{format(new Date(), 'EEEE, MMMM do')}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gold font-black uppercase tracking-widest mb-1">{t('prayer.up_next')}</p>
              <p className="text-3xl font-display font-black text-gold-light">{nextPrayer?.name}</p>
              <p className="text-sm font-mono text-cream/80">{nextPrayer?.time}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSearch} className="relative group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('prayer.search_placeholder')}
            className="w-full bg-glamour-blue/50 border border-gold/20 rounded-2xl py-4 px-12 text-sm focus:outline-none focus:border-gold transition-all placeholder:text-cream/20"
          />
          <Search className="absolute left-4 top-4 w-5 h-5 text-gold/50 group-focus-within:text-gold transition-colors" />
        </form>

        {searchResults.length > 0 && (
          <div className="absolute z-20 mt-2 w-[calc(100%-4rem)] bg-glamour-blue-light border border-gold/30 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
            {searchResults.map((r) => (
              <button
                key={`${r.latitude}-${r.longitude}`}
                onClick={() => selectCity(r)}
                className="w-full text-left px-6 py-4 hover:bg-gold/10 transition-colors border-b border-gold/10 last:border-0 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-black text-cream">{r.name}</p>
                  <p className="text-[10px] text-gold/60 uppercase font-bold">{r.country}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gold/30" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-8 space-y-3 bg-glamour-blue/20">
        {times && Object.entries(times).map(([name, time], index) => {
          if (!['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].includes(name)) return null;
          const isActive = nextPrayer?.name === name;
          
          return (
            <motion.div 
              key={name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 5, backgroundColor: "rgba(212, 175, 55, 0.05)" }}
              className={cn(
                "flex justify-between items-center p-5 rounded-2xl transition-all border",
                isActive 
                  ? "bg-gold/10 border-gold shadow-[0_0_20px_rgba(212, 175, 55, 0.1)]" 
                  : "border-gold/5 hover:border-gold/20 bg-white/5"
              )}
            >
              <div className="flex items-center space-x-5">
                <div className={cn(
                  "w-3 h-3 rounded-full shadow-lg",
                  isActive ? "bg-gold shadow-gold/50 animate-pulse" : "bg-cream/10"
                )} />
                <span className={cn(
                  "font-display text-xl tracking-wide",
                  isActive ? "text-gold font-black" : "text-cream/80"
                )}>{name}</span>
              </div>
              <div className="text-right">
                <span className={cn(
                  "font-mono text-xl",
                  isActive ? "text-gold-light font-black" : "text-cream/40"
                )}>{time}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="p-6 bg-glamour-blue-light/50 border-t border-gold/10 text-center">
        <Link 
          to={`/prayer-times/${city.toLowerCase().replace(/\s+/g, '-')}`} 
          className="text-[10px] font-black text-gold hover:text-gold-light transition-all tracking-[0.3em] uppercase flex items-center justify-center group"
        >
          {t('prayer.detailed')} <ChevronRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
