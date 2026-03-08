import React, { useState, useEffect } from 'react';
import { Compass, Navigation, Loader2, MapPin, Moon } from 'lucide-react';
import { SEO } from '@/src/components/SEO';
import { motion } from 'motion/react';

export function QiblaPage() {
  const [heading, setHeading] = useState<number | null>(null);
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const kaabaLat = 21.4225;
          const kaabaLng = 39.8262;
          
          const y = Math.sin(kaabaLng * Math.PI / 180 - longitude * Math.PI / 180);
          const x = Math.cos(latitude * Math.PI / 180) * Math.tan(kaabaLat * Math.PI / 180) - 
                    Math.sin(latitude * Math.PI / 180) * Math.cos(kaabaLng * Math.PI / 180 - longitude * Math.PI / 180);
          
          let qibla = Math.atan2(y, x) * 180 / Math.PI;
          setQiblaDirection(qibla);
          setLoading(false);
        },
        () => {
          setError("Location access denied. Please enable location to use the Qibla finder.");
          setLoading(false);
        }
      );
    }

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const webkitHeading = (event as any).webkitCompassHeading;
      if (webkitHeading) {
        setHeading(webkitHeading);
      } else if (event.alpha) {
        setHeading(360 - event.alpha);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-glamour-blue">
        <Loader2 className="w-12 h-12 text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-16">
      <SEO 
        title="Qibla Finder" 
        description="Find the accurate Qibla direction from anywhere in the world using your device's GPS and compass."
        keywords="qibla direction, find qibla, mecca direction, kaaba finder"
      />

      <div className="space-y-6">
        <h1 className="text-5xl md:text-7xl font-display font-black text-cream">Qibla Finder</h1>
        <p className="text-gold/60 text-sm font-bold uppercase tracking-[0.3em]">Precision Direction to the Holy Kaaba</p>
      </div>

      {error ? (
        <div className="glass-card p-12 text-gold font-bold uppercase tracking-widest border-red-500/20">
          {error}
        </div>
      ) : (
        <div className="relative flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-80 h-80 md:w-96 md:h-96 rounded-full border-4 border-gold/10 relative flex items-center justify-center shadow-[0_0_100px_rgba(212,175,55,0.1)] bg-glamour-blue-light/30 backdrop-blur-3xl"
          >
            {/* Compass Rose */}
            <div className="absolute inset-8 border border-gold/5 rounded-full"></div>
            <div className="absolute top-4 font-black text-gold/20 tracking-widest">N</div>
            <div className="absolute bottom-4 font-black text-gold/20 tracking-widest">S</div>
            <div className="absolute left-4 font-black text-gold/20 tracking-widest">W</div>
            <div className="absolute right-4 font-black text-gold/20 tracking-widest">E</div>

            {/* Qibla Needle */}
            <div 
              className="absolute w-1 h-full transition-transform duration-700 ease-out"
              style={{ transform: `rotate(${qiblaDirection || 0}deg)` }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-8 flex flex-col items-center">
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.5)] border-2 border-glamour-blue"
                >
                  <Moon className="w-5 h-5 text-glamour-blue" />
                </motion.div>
                <div className="w-1.5 h-40 bg-gradient-to-b from-gold to-transparent rounded-full"></div>
              </div>
            </div>

            {/* Device Heading Needle */}
            {heading !== null && (
              <div 
                className="absolute w-1 h-full transition-transform duration-100"
                style={{ transform: `rotate(${heading}deg)` }}
              >
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-1 h-24 bg-cream/10 rounded-full"></div>
              </div>
            )}

            <div className="z-10 bg-glamour-blue border-2 border-gold text-gold p-6 rounded-full shadow-2xl">
              <Compass className="w-16 h-16" />
            </div>
          </motion.div>

          <div className="mt-16 space-y-6">
            <div className="flex items-center justify-center space-x-4 text-cream">
              <MapPin className="w-6 h-6 text-gold" />
              <span className="text-2xl font-display font-black tracking-tight">Kaaba: {qiblaDirection?.toFixed(1)}°</span>
            </div>
            <p className="text-xs text-gold/40 font-bold uppercase tracking-[0.2em] max-w-md mx-auto leading-relaxed">
              For spiritual precision, ensure your device is flat and away from magnetic interference.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
        <InfoCard label="Distance" value="~4,500 km" />
        <InfoCard label="City" value="Makkah, KSA" />
        <InfoCard label="Coordinates" value="21.4° N, 39.8° E" />
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string, value: string }) {
  return (
    <div className="glass-card p-8 group hover:border-gold transition-all">
      <h3 className="text-gold font-black uppercase tracking-[0.3em] text-[10px] mb-4 opacity-60">{label}</h3>
      <p className="text-2xl font-display font-black text-cream group-hover:text-gold transition-colors">{value}</p>
    </div>
  );
}
