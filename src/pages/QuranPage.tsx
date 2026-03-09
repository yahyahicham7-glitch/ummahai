import React, { useState, useEffect } from 'react';
import { Search, Book, Play, Pause, ChevronLeft, ChevronRight, Loader2, Globe, Languages } from 'lucide-react';
import { cn } from '@/src/utils/cn';
import { SEO } from '@/src/components/SEO';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  translation?: string;
}

const translations: Record<string, string> = {
  en: 'en.sahih',
  ar: 'ar.jalalayn',
  fr: 'fr.hamidullah',
  es: 'es.cortes'
};

export function QuranPage() {
  const { i18n, t } = useTranslation();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentEdition, setCurrentEdition] = useState(translations[i18n.language] || 'en.sahih');

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then(res => res.json())
      .then(data => {
        setSurahs(data.data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedSurah) {
      loadSurah(selectedSurah);
    }
  }, [i18n.language]);

  const loadSurah = async (surah: Surah) => {
    setLoading(true);
    setSelectedSurah(surah);
    const edition = translations[i18n.language] || 'en.sahih';
    setCurrentEdition(edition);

    try {
      // Fetch Arabic text
      const arRes = await fetch(`https://api.alquran.cloud/v1/surah/${surah.number}`);
      const arData = await arRes.json();
      
      // Fetch Translation
      const trRes = await fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/${edition}`);
      const trData = await trRes.json();

      const combinedAyahs = arData.data.ayahs.map((ayah: any, index: number) => ({
        ...ayah,
        translation: trData.data.ayahs[index].text
      }));

      setAyahs(combinedAyahs);
    } catch (error) {
      console.error("Error loading Quran data:", error);
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };

  const filteredSurahs = React.useMemo(() => {
    return surahs.filter(s => 
      s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.number.toString().includes(searchQuery)
    );
  }, [surahs, searchQuery]);

  const quranSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": "The Holy Quran",
    "author": "Allah (SWT)",
    "about": "The central religious text of Islam, which Muslims believe to be a revelation from God.",
    "genre": "Religious Text"
  };

  if (loading && surahs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-glamour-blue">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-16 h-16 text-gold" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <SEO 
        title={selectedSurah ? `Surah ${selectedSurah.englishName}` : t('quran.title')} 
        description={selectedSurah ? `Read Surah ${selectedSurah.englishName} with translation and audio.` : t('quran.read_listen')}
        keywords={selectedSurah ? `surah ${selectedSurah.englishName}, quran ${selectedSurah.number}` : t('quran.online_translation')}
        schema={quranSchema}
      />

      <AnimatePresence mode="wait">
        {selectedSurah ? (
          <motion.div 
            key="surah-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-16"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <button 
                onClick={() => setSelectedSurah(null)}
                className="flex items-center text-gold font-black tracking-[0.3em] uppercase text-[10px] hover:text-cream transition-all group"
              >
                <ChevronLeft className="w-5 h-5 mr-3 group-hover:-translate-x-2 transition-transform" /> {t('quran.back_to_surahs')}
              </button>
              
              <div className="flex items-center space-x-4 bg-glamour-blue-light/50 px-6 py-3 rounded-2xl border border-gold/20">
                <Languages className="w-4 h-4 text-gold" />
                <span className="text-[10px] font-black uppercase tracking-widest text-cream/60">{t('quran.edition')}: {currentEdition}</span>
              </div>
            </div>

            <div className="text-center space-y-8 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl -z-10"></div>
              <h1 className="text-6xl md:text-9xl font-display font-black text-cream tracking-tighter">{selectedSurah.name}</h1>
              <p className="text-3xl font-display text-gold tracking-[0.2em]">{selectedSurah.englishName}</p>
              <div className="flex items-center justify-center space-x-8 text-[11px] text-gold/40 uppercase tracking-[0.4em] font-black">
                <span className="bg-white/5 px-6 py-2 rounded-full border border-gold/10">{selectedSurah.revelationType}</span>
                <span className="bg-white/5 px-6 py-2 rounded-full border border-gold/10">{selectedSurah.numberOfAyahs} {t('quran.ayahs')}</span>
              </div>
            </div>

            {selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
              <div className="glass-card p-16 md:p-24 text-center border-gold/30 shadow-[0_0_100px_rgba(212,175,55,0.1)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
                <p className="text-5xl md:text-8xl font-arabic text-gold leading-loose text-shadow-gold">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
              {ayahs.map((ayah) => (
                <motion.div 
                  key={ayah.number} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="glass-card p-10 md:p-16 space-y-12 hover:border-gold transition-all group relative border-gold/10 bg-glamour-blue-light/30"
                >
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-12 rounded-xl border border-gold/20 flex items-center justify-center text-xs font-black text-gold group-hover:bg-gold group-hover:text-glamour-blue transition-all shadow-xl">
                      {ayah.numberInSurah}
                    </div>
                    <div className="flex space-x-4">
                      <button className="p-3 bg-white/5 rounded-xl text-gold/40 hover:text-gold hover:bg-gold/10 transition-all border border-transparent hover:border-gold/20">
                        <Play className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-12">
                    <p className="text-4xl md:text-6xl font-arabic text-cream text-right leading-[2.5] dir-rtl tracking-wide font-medium">
                      {ayah.text}
                    </p>
                    <div className="pt-12 border-t border-gold/10">
                      <p className="text-xl md:text-2xl font-serif text-cream/70 leading-relaxed font-light italic text-left">
                        {ayah.translation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-8 pt-24 border-t border-gold/10">
              {selectedSurah.number > 1 ? (
                <button 
                  onClick={() => loadSurah(surahs[selectedSurah.number - 2])}
                  className="flex items-center text-gold font-black uppercase tracking-[0.3em] text-[10px] hover:text-cream transition-all group"
                >
                  <ChevronLeft className="w-6 h-6 mr-4 group-hover:-translate-x-2 transition-transform" /> {t('quran.previous_surah')}
                </button>
              ) : <div />}
              
              {selectedSurah.number < 114 && (
                <button 
                  onClick={() => loadSurah(surahs[selectedSurah.number])}
                  className="flex items-center text-gold font-black uppercase tracking-[0.3em] text-[10px] hover:text-cream transition-all group"
                >
                  {t('quran.next_surah')} <ChevronRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform" />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="surah-list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-20"
          >
            <div className="text-center space-y-8">
              <h1 className="text-6xl md:text-9xl font-display font-black text-cream tracking-tighter">{t('quran.title')}</h1>
              <p className="text-gold/60 text-sm font-black uppercase tracking-[0.5em]">{t('quran.subtitle')}</p>
            </div>

            <div className="max-w-4xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gold/20 rounded-[2rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              <input
                type="text"
                placeholder={t('quran.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-glamour-blue-light/50 backdrop-blur-2xl border border-gold/20 rounded-[2rem] py-8 px-20 text-2xl focus:outline-none focus:border-gold shadow-2xl transition-all placeholder:text-cream/10 relative z-10"
              />
              <Search className="absolute left-8 top-8 w-8 h-8 text-gold group-focus-within:scale-110 transition-transform z-10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredSurahs.map((surah) => (
                <motion.button
                  key={surah.number}
                  whileHover={{ y: -15, scale: 1.02 }}
                  onClick={() => loadSurah(surah)}
                  className="glass-card p-10 flex items-center space-x-10 hover:border-gold hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] transition-all text-left group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-gold/10 transition-all"></div>
                  <div className="w-16 h-16 bg-glamour-blue-light rounded-2xl flex items-center justify-center font-display font-black text-gold group-hover:bg-gold group-hover:text-glamour-blue transition-all border border-gold/20 shadow-xl relative z-10">
                    {surah.number}
                  </div>
                  <div className="flex-1 relative z-10">
                    <h3 className="text-2xl font-display font-black text-cream group-hover:text-gold transition-colors">{surah.englishName}</h3>
                    <p className="text-[10px] text-cream/40 uppercase tracking-[0.3em] font-black">{surah.englishNameTranslation}</p>
                  </div>
                  <div className="text-right relative z-10">
                    <p className="text-3xl font-arabic text-gold">{surah.name}</p>
                    <p className="text-[10px] text-gold/60 font-black uppercase tracking-tighter">{surah.numberOfAyahs} {t('quran.ayahs')}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
