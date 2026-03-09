import React, { useEffect, useRef, useState } from 'react';
import { PrayerWidget } from '@/src/components/PrayerWidget';
import { ScholarAI } from '@/src/components/ScholarAI';
import { SEO } from '@/src/components/SEO';
import { Moon, BookOpen, MapPin, Calculator, ArrowRight, Star, Heart, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useTranslation } from 'react-i18next';

const STARS = Array.from({ length: 130 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.4,
  delay: Math.random() * 7,
  duration: Math.random() * 4 + 2,
  gold: Math.random() > 0.82,
}));

const SHOOTING = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  top: 8 + Math.random() * 35,
  delay: i * 5 + Math.random() * 4,
  duration: 1.2 + Math.random() * 1,
}));

const ARABIC_PHRASES = [
  { ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", tr: "En el nombre de Allah, el Compasivo" },
  { ar: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", tr: "Gloria a Allah y alabado sea Él" },
  { ar: "اللَّهُ أَكْبَرُ", tr: "Allah is the Greatest · Allah est le Plus Grand" },
  { ar: "لَا إِلَٰهَ إِلَّا اللَّهُ", tr: "There is no god but Allah · لا إله إلا الله" },
];

export function Home() {
  const { t } = useTranslation();
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [phraseVisible, setPhraseVisible] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setPhraseVisible(false);
      setTimeout(() => {
        setPhraseIdx(p => (p + 1) % ARABIC_PHRASES.length);
        setPhraseVisible(true);
      }, 500);
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  const phrase = ARABIC_PHRASES[phraseIdx];

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ummah AI",
    "url": "https://ummah.ai",
    "description": t('home.hero_subtitle'),
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ummah.ai/quran?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Ummah AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ummah AI is a comprehensive Islamic platform providing accurate prayer times, Quran reading, Qibla direction, Zakat calculation, and AI-powered scholarly guidance."
        }
      },
      {
        "@type": "Question",
        "name": "Are the prayer times accurate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we use high-precision astronomical calculations and your GPS location to provide the most accurate prayer times for your specific city."
        }
      }
    ]
  };

  return (
    <div className="space-y-24 pb-24">
      <SEO 
        title={t('nav.home')} 
        description={t('home.hero_subtitle')}
        schema={[homeSchema, faqSchema]}
      />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-glamour-blue pt-20">
        {/* Animated stars */}
        {STARS.map(star => (
          <span key={star.id} style={{
            position: 'absolute', left: `${star.x}%`, top: `${star.y}%`,
            width: `${star.size}px`, height: `${star.size}px`,
            borderRadius: '50%',
            background: star.gold ? '#D4AF37' : '#fff',
            boxShadow: star.gold ? `0 0 ${star.size * 3}px rgba(212,175,55,0.7)` : 'none',
            opacity: 0,
            animation: `umma-twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Shooting stars */}
        {SHOOTING.map(s => (
          <div key={s.id} style={{
            position: 'absolute', top: `${s.top}%`, left: '-5%',
            width: '100px', height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(255,255,200,0.9), transparent)',
            animation: `umma-shoot ${s.duration}s linear ${s.delay}s infinite`,
            opacity: 0, pointerEvents: 'none',
          }} />
        ))}

        {/* Aurora glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 35% at 15% 85%, rgba(0,60,30,0.15) 0%, transparent 60%), radial-gradient(ellipse 50% 25% at 85% 15%, rgba(10,30,80,0.15) 0%, transparent 60%)',
        }} />

        {/* Pulse rings */}
        {[0, 1.8, 3.6].map((delay, i) => (
          <div key={i} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: `${280 + i * 90}px`, height: `${280 + i * 90}px`,
            marginLeft: `-${140 + i * 45}px`, marginTop: `-${140 + i * 45}px`,
            borderRadius: '50%',
            border: '1px solid rgba(212,175,55,0.12)',
            animation: `umma-pulse 5s ease-out ${delay}s infinite`,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Rotating geometric ring */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          marginLeft: '-260px', marginTop: '-260px',
          width: '520px', height: '520px',
          animation: 'umma-rotate 50s linear infinite',
          opacity: 0.06, pointerEvents: 'none',
        }}>
          <svg viewBox="0 0 520 520" width="520" height="520">
            {Array.from({ length: 12 }, (_, i) => (
              <g key={i} transform={`rotate(${i * 30} 260 260)`}>
                <line x1="260" y1="8" x2="260" y2="75" stroke="#D4AF37" strokeWidth="1" />
                <circle cx="260" cy="8" r="2.5" fill="#D4AF37" />
              </g>
            ))}
            <circle cx="260" cy="260" r="245" stroke="#D4AF37" strokeWidth="0.5" fill="none" strokeDasharray="5 10" />
          </svg>
        </div>

        {/* Existing content — untouched */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block"
          >
            <div className="bg-gold/10 border border-gold/30 px-6 py-2 rounded-full text-[10px] font-black tracking-[0.4em] text-gold uppercase mb-4">
              {t('home.hero_badge')}
            </div>
          </motion.div>

          {/* Rotating Arabic phrase */}
          <div style={{ minHeight: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              fontFamily: "'Amiri', serif",
              fontSize: 'clamp(1.6rem, 5vw, 3.2rem)',
              color: '#F1D279',
              direction: 'rtl',
              textShadow: '0 0 30px rgba(212,175,55,0.5)',
              opacity: phraseVisible ? 1 : 0,
              transform: phraseVisible ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.97)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              lineHeight: 1.3,
            }}>
              {phrase.ar}
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: 'rgba(212,175,55,0.55)',
              letterSpacing: '1.5px',
              marginTop: '6px',
              fontStyle: 'italic',
              opacity: phraseVisible ? 1 : 0,
              transition: 'opacity 0.5s ease 0.1s',
            }}>
              {phrase.tr}
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-cream leading-[1.1] tracking-tighter"
          >
            {t('home.hero_title').split(' ').map((word, i) =>
              word.toLowerCase() === 'spiritual' || word.toLowerCase() === 'روحية' || word.toLowerCase() === 'spirituel' || word.toLowerCase() === 'espiritual' ?
              <span key={i} className="text-gold text-shadow-gold"> {word} </span> : ` ${word} `
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-cream/60 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {t('home.hero_subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6"
          >
            <Link to="/quran" className="w-full md:w-auto bg-gradient-to-r from-gold to-gold-light text-glamour-blue px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)] flex items-center justify-center">
              {t('home.read_quran')} <ArrowRight className="ml-3 w-4 h-4" />
            </Link>
            <Link to="/scholar" className="w-full md:w-auto bg-white/5 backdrop-blur-sm border border-gold/30 text-gold px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-gold/10 transition-all flex items-center justify-center">
              {t('home.scholar_ai')}
            </Link>
          </motion.div>
        </div>

        {/* CSS keyframes injected once */}
        <style>{`
          @keyframes umma-twinkle {
            0%,100% { opacity:0; transform:scale(0.6); }
            45%,55% { opacity:1; transform:scale(1.15); }
          }
          @keyframes umma-shoot {
            0%   { left:-5%; opacity:0; }
            5%   { opacity:1; }
            80%  { opacity:0.8; }
            100% { left:110%; opacity:0; }
          }
          @keyframes umma-pulse {
            0%   { transform:scale(0.85); opacity:0.25; }
            100% { transform:scale(1.5);  opacity:0; }
          }
          @keyframes umma-rotate {
            from { transform:rotate(0deg); }
            to   { transform:rotate(360deg); }
          }
        `}</style>
      </section>

      {/* Core Features Grid */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <PrayerWidget />
        </div>
        <div className="lg:col-span-2 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard 
              icon={BookOpen}
              title={t('features.quran_title')}
              description={t('features.quran_desc')}
              link="/quran"
            />
            <FeatureCard 
              icon={MapPin}
              title={t('features.qibla_title')}
              description={t('features.qibla_desc')}
              link="/qibla"
            />
            <FeatureCard 
              icon={Calculator}
              title={t('features.zakat_title')}
              description={t('features.zakat_desc')}
              link="/zakat"
            />
            <FeatureCard 
              icon={Heart}
              title={t('features.duas_title')}
              description={t('features.duas_desc')}
              link="/duas"
            />
          </div>
          <ScholarAI />
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-glamour-blue-light py-24 border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-black text-cream">{t('home.why_title')}</h2>
            <p className="text-gold/60 text-[10px] font-black uppercase tracking-[0.3em]">{t('home.why_subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <TrustItem 
              icon={ShieldCheck}
              title={t('home.trust_1_title')}
              description={t('home.trust_1_desc')}
            />
            <TrustItem 
              icon={Star}
              title={t('home.trust_2_title')}
              description={t('home.trust_2_desc')}
            />
            <TrustItem 
              icon={Moon}
              title={t('home.trust_3_title')}
              description={t('home.trust_3_desc')}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-glamour-blue-light rounded-[3rem] p-12 md:p-20 text-center space-y-10 border border-gold/20 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full -mr-48 -mt-48 blur-3xl group-hover:bg-gold/10 transition-all duration-1000"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full -ml-48 -mb-48 blur-3xl group-hover:bg-gold/10 transition-all duration-1000"></div>
          
          <h2 className="text-4xl md:text-6xl font-display font-black text-cream leading-tight">{t('home.cta_title')}</h2>
          <p className="text-cream/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            {t('home.cta_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
            <button className="w-full sm:w-auto bg-gold text-glamour-blue px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gold-light hover:scale-105 transition-all shadow-xl">
              App Store
            </button>
            <button className="w-full sm:w-auto bg-white/5 border border-gold/30 text-gold px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gold/10 hover:scale-105 transition-all">
              Google Play
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, link }: { icon: any, title: string, description: string, link: string }) {
  return (
    <Link to={link} className="glass-card p-8 hover:border-gold transition-all group">
      <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-glamour-blue transition-all border border-gold/20">
        <Icon className="w-7 h-7 text-gold" />
      </div>
      <h3 className="text-xl font-display font-black text-cream mb-3 group-hover:text-gold transition-colors">{title}</h3>
      <p className="text-sm text-cream/60 leading-relaxed font-light">{description}</p>
    </Link>
  );
}

function TrustItem({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="text-center space-y-6 group">
      <div className="w-20 h-20 bg-gold/5 rounded-full flex items-center justify-center mx-auto border border-gold/10 group-hover:border-gold transition-all duration-500">
        <Icon className="w-10 h-10 text-gold" />
      </div>
      <h3 className="text-2xl font-display font-black text-cream group-hover:text-gold transition-colors">{title}</h3>
      <p className="text-sm text-cream/60 leading-relaxed font-light max-w-xs mx-auto">{description}</p>
    </div>
  );
}
