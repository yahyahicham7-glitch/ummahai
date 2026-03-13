import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, ChevronLeft, ChevronRight, Loader2, Languages, Highlighter, X } from 'lucide-react';
import { SEO } from '@/src/components/SEO';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

/* ─── Types ───────────────────────────────────────────────── */
interface Surah { number: number; name: string; englishName: string; englishNameTranslation: string; numberOfAyahs: number; revelationType: string; }
interface Ayah  { number: number; text: string; numberInSurah: number; juz: number; translation?: string; }

/* ─── API edition per language ────────────────────────────── */
const EDITIONS: Record<string, string> = { en: 'en.sahih', ar: 'ar.jalalayn', fr: 'fr.hamidullah', es: 'es.cortes' };

/* ─── UI copy per language ────────────────────────────────── */
const UI: Record<string, { title: string; subtitle: string; search: string; back: string; edition: string; ayahs: string; prev: string; next: string; highlight: string; clearHL: string; meccan: string; medinan: string; }> = {
  en: { title: 'The Holy Quran', subtitle: 'Sacred Revelations for Mankind', search: 'Search Surah by name or number…', back: 'Back to Surahs', edition: 'Translation', ayahs: 'Ayahs', prev: 'Previous Surah', next: 'Next Surah', highlight: 'Highlight', clearHL: 'Clear', meccan: 'Meccan', medinan: 'Medinan' },
  ar: { title: 'القرآن الكريم', subtitle: 'الوحي المقدس للبشرية', search: 'ابحث عن سورة بالاسم أو الرقم…', back: 'العودة إلى السور', edition: 'الترجمة', ayahs: 'آيات', prev: 'السورة السابقة', next: 'السورة التالية', highlight: 'تمييز', clearHL: 'مسح', meccan: 'مكية', medinan: 'مدنية' },
  fr: { title: 'Le Saint Coran', subtitle: 'Révélations Sacrées pour l\'Humanité', search: 'Rechercher une sourate par nom ou numéro…', back: 'Retour aux Sourates', edition: 'Traduction', ayahs: 'Versets', prev: 'Sourate Précédente', next: 'Sourate Suivante', highlight: 'Surligner', clearHL: 'Effacer', meccan: 'Mecquoise', medinan: 'Médinoise' },
  es: { title: 'El Santo Corán', subtitle: 'Revelaciones Sagradas para la Humanidad', search: 'Buscar Sura por nombre o número…', back: 'Volver a las Suras', edition: 'Traducción', ayahs: 'Aleyas', prev: 'Sura Anterior', next: 'Sura Siguiente', highlight: 'Subrayar', clearHL: 'Borrar', meccan: 'Mequeña', medinan: 'Medinense' },
};


/* ─── Surah name localization ─────────────────────────────── */
// French and Spanish surah names for common surahs
// Source: standard Islamic translation conventions
const SURAH_NAMES_FR: Record<number, string> = {
  1:'Al-Fatiha',2:'La Vache',3:"La Famille d'Imrân",4:'Les Femmes',5:'La Table Servie',
  6:"Les Troupeaux",7:"Les Limbes",8:'Le Butin',9:'Le Repentir',10:'Jonas',
  11:'Hûd',12:'Joseph',13:'Le Tonnerre',14:'Abraham',15:'Al-Hijr',
  16:'Les Abeilles',17:'Le Voyage Nocturne',18:'La Caverne',19:'Marie',20:'Tâ-Hâ',
  21:'Les Prophètes',22:'Le Pèlerinage',23:'Les Croyants',24:'La Lumière',25:'Le Critère',
  26:'Les Poètes',27:'La Fourmi',28:'Le Récit',29:'L\'Araignée',30:'Les Romains',
  31:'Luqmân',32:'La Prosternation',33:'Les Coalisés',34:'Saba\'',35:'Le Créateur',
  36:'Yâ-Sîn',37:'Les Rangées',38:'Sâd',39:'Les Groupes',40:'Le Pardonneur',
  41:'Les Versets Détaillés',42:'La Consultation',43:'L\'Ornement',44:'La Fumée',45:'L\'Agenouillée',
  46:'Les Dunes',47:'Muhammad',48:'La Victoire',49:'Les Appartements',50:'Qâf',
  51:'Les Éparpillants',52:'Le Mont',53:'L\'Étoile',54:'La Lune',55:'Le Bienfaiteur',
  56:'L\'Événement',57:'Le Fer',58:'La Disputante',59:'L\'Exode',60:'L\'Éprouvée',
  61:'Les Rangs',62:'Le Vendredi',63:'Les Hypocrites',64:'La Tricherie',65:'Le Divorce',
  66:'L\'Interdiction',67:'La Royauté',68:'La Plume',69:'La Réalité',70:'Les Voies d\'Ascension',
  71:'Noé',72:'Les Djinns',73:'L\'Enveloppé',74:'Le Revêtu',75:'La Résurrection',
  76:'L\'Homme',77:'Les Envoyés',78:'La Nouvelle',79:'Les Arracheurs',80:'Il a Froncé',
  81:'L\'Obscurcissement',82:'La Fracture',83:'Les Fraudeurs',84:'L\'Éclatement',85:'Les Constellations',
  86:'L\'Astre Nocturne',87:'Le Très-Haut',88:'L\'Enveloppant',89:'L\'Aurore',90:'La Cité',
  91:'Le Soleil',92:'La Nuit',93:'La Matinée',94:'L\'Expansion',95:'Le Figuier',
  96:'L\'Adhérence',97:'La Destinée',98:'La Preuve',99:'Le Tremblement',100:'Les Coureurs',
  101:'La Catastrophe',102:'L\'Accumulation',103:'L\'Époque',104:'Le Diffamateur',105:'L\'Éléphant',
  106:'Quraych',107:'L\'Aide',108:'L\'Abondance',109:'Les Mécréants',110:'Le Secours',
  111:'La Fibre',112:'Le Monothéisme Pur',113:'L\'Aube Naissante',114:'Les Hommes',
};

const SURAH_NAMES_ES: Record<number, string> = {
  1:'Al-Fatiha',2:'La Vaca',3:'La Familia de Imrán',4:'Las Mujeres',5:'La Mesa Servida',
  6:'Los Rebaños',7:'Los Limbos',8:'El Botín',9:'El Arrepentimiento',10:'Jonás',
  11:'Hud',12:'José',13:'El Trueno',14:'Abraham',15:'Al-Hijr',
  16:'Las Abejas',17:'El Viaje Nocturno',18:'La Caverna',19:'María',20:'Ta-Ha',
  21:'Los Profetas',22:'La Peregrinación',23:'Los Creyentes',24:'La Luz',25:'El Criterio',
  26:'Los Poetas',27:'La Hormiga',28:'El Relato',29:'La Araña',30:'Los Romanos',
  31:'Luqmán',32:'La Postración',33:'Los Coaligados',34:'Saba',35:'El Creador',
  36:'Ya-Sin',37:'Los Alineados',38:'Sad',39:'Los Grupos',40:'El Perdonador',
  41:'Los Versículos Detallados',42:'La Consulta',43:'El Ornamento',44:'El Humo',45:'La Arrodillada',
  46:'Las Dunas',47:'Muhammad',48:'La Victoria',49:'Las Habitaciones',50:'Qaf',
  51:'Los Vientos',52:'El Monte',53:'La Estrella',54:'La Luna',55:'El Misericordioso',
  56:'El Acontecimiento',57:'El Hierro',58:'La Discutidora',59:'El Destierro',60:'La Examinada',
  61:'Las Filas',62:'El Viernes',63:'Los Hipócritas',64:'El Engaño',65:'El Divorcio',
  66:'La Prohibición',67:'La Soberanía',68:'La Pluma',69:'La Verdad',70:'Las Vías de Ascenso',
  71:'Noé',72:'Los Genios',73:'El Envuelto',74:'El Encubierto',75:'La Resurrección',
  76:'El Hombre',77:'Los Enviados',78:'La Noticia',79:'Los Arrancadores',80:'Frunció el Ceño',
  81:'El Oscurecimiento',82:'La Fractura',83:'Los Defraudadores',84:'El Desgarro',85:'Las Constelaciones',
  86:'El Astro',87:'El Altísimo',88:'Lo Envolvente',89:'El Amanecer',90:'La Ciudad',
  91:'El Sol',92:'La Noche',93:'La Mañana',94:'La Expansión',95:'La Higuera',
  96:'El Coágulo',97:'El Destino',98:'La Prueba',99:'El Temblor',100:'Los Corredores',
  101:'La Calamidad',102:'La Rivalidad',103:'La Época',104:'El Difamador',105:'El Elefante',
  106:'Quraish',107:'La Ayuda Mutua',108:'La Abundancia',109:'Los Incrédulos',110:'El Auxilio',
  111:'La Fibra',112:'La Pureza',113:'El Amanecer',114:'Los Hombres',
};

function getSurahName(surah: Surah, lang: string): string {
  if (lang === 'ar') return surah.name;
  if (lang === 'fr') return SURAH_NAMES_FR[surah.number] || surah.englishName;
  if (lang === 'es') return SURAH_NAMES_ES[surah.number] || surah.englishName;
  return surah.englishName; // English default
}

function getSurahMeaning(surah: Surah, lang: string): string {
  // englishNameTranslation is always in English from the API
  // For other languages, the meaning is embedded in the translated name for most surahs
  return surah.englishNameTranslation;
}

const NAVY = '#0a2540';
const NAVY2 = '#071a2e';
const GOLD = '#D4AF37';

/* ─── Component ───────────────────────────────────────────── */
export function QuranPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.slice(0, 2) || 'en';
  const L = UI[lang] || UI.en;
  const isRTL = lang === 'ar';

  const [surahs,       setSurahs]       = useState<Surah[]>([]);
  const [selected,     setSelected]     = useState<Surah | null>(null);
  const [ayahs,        setAyahs]        = useState<Ayah[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [loadingAyahs, setLoadingAyahs] = useState(false);
  const [search,       setSearch]       = useState('');
  const [highlighted,  setHighlighted]  = useState<Set<number>>(new Set());
  const [hlMode,       setHlMode]       = useState(false);
  const readerRef = useRef<HTMLDivElement>(null);

  /* Load surah list */
  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then(r => r.json())
      .then(d => { setSurahs(d.data); setLoading(false); });
  }, []);

  /* Reload translation when language changes */
  useEffect(() => { if (selected) loadSurah(selected); }, [lang]);

  const loadSurah = useCallback(async (surah: Surah) => {
    setLoadingAyahs(true);
    setSelected(surah);
    setHighlighted(new Set());
    const edition = EDITIONS[lang] || EDITIONS.en;
    try {
      const [arRes, trRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${surah.number}`),
        fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/${edition}`),
      ]);
      const [arData, trData] = await Promise.all([arRes.json(), trRes.json()]);
      setAyahs(arData.data.ayahs.map((a: Ayah, i: number) => ({
        ...a, translation: trData.data.ayahs[i]?.text,
      })));
    } catch (e) { console.error(e); }
    finally { setLoadingAyahs(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  }, [lang]);

  const toggleHL = (n: number) => {
    if (!hlMode) return;
    setHighlighted(prev => {
      const next = new Set(prev);
      next.has(n) ? next.delete(n) : next.add(n);
      return next;
    });
  };

  const filtered = React.useMemo(() =>
    surahs.filter(s =>
      s.englishName.toLowerCase().includes(search.toLowerCase()) ||
      s.name.includes(search) ||
      s.number.toString().includes(search)
    ), [surahs, search]);

  const quranSchema = { '@context': 'https://schema.org', '@type': 'Book', name: 'The Holy Quran', genre: 'Religious Text' };

  /* ── Loading screen ── */
  if (loading) return (
    <div style={{ background: NAVY, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 size={40} style={{ color: GOLD, animation: 'spin 1.2s linear infinite' }} />
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background: NAVY, minHeight: '100vh', color: '#ffffff' }}>
      <SEO
        title={selected ? `Surah ${selected.englishName} — ${L.title}` : `${L.title} | Al Ummah AI`}
        description={selected ? `Read Surah ${selected.englishName} in Arabic with ${L.edition} and highlighting.` : L.subtitle}
        keywords="quran online, read quran, surah, quran translation, holy quran"
        schema={quranSchema}
        canonical="https://www.alummahai.com/quran"
        lang={lang}
      />

      {/* ══════════════════════ HERO — Quran photo */}
      {!selected && (
        <div style={{ position: 'relative', minHeight: 'clamp(280px,40vh,420px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1600&q=80&auto=format&fit=crop"
            alt="Holy Quran"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(10,37,64,0.5) 0%,rgba(10,37,64,0.3) 30%,rgba(10,37,64,0.95) 100%)' }} />
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            style={{ position: 'relative', zIndex: 1, width: '100%', textAlign: 'center', padding: 'clamp(80px,12vw,120px) 20px clamp(36px,5vw,56px)' }}>
            <div style={{ display: 'inline-block', padding: '4px 16px', background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontSize: '0.55rem', fontWeight: 900, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.28em', marginBottom: 18, backdropFilter: 'blur(8px)' }}>
              ✦ {L.subtitle}
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(2.2rem,7vw,5rem)', color: '#ffffff', letterSpacing: '-0.02em', textShadow: '0 2px 24px rgba(0,0,0,0.4)', marginBottom: 8 }}>
              {L.title}
            </h1>
            <p style={{ fontFamily: "'Amiri',serif", fontSize: 'clamp(1rem,3vw,1.6rem)', color: 'rgba(212,175,55,0.8)', marginTop: 10, textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </motion.div>
        </div>
      )}

      <div style={{ maxWidth: selected ? 820 : 1200, margin: '0 auto', padding: 'clamp(28px,5vw,56px) 20px 80px' }}>

        <AnimatePresence mode="wait">

          {/* ══════════════════════ SURAH LIST */}
          {!selected && (
            <motion.div key="list" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>

              {/* Search */}
              <div style={{ position: 'relative', marginBottom: 36 }}>
                <Search size={18} style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: 'rgba(212,175,55,0.5)', pointerEvents: 'none' }} />
                <input
                  value={search} onChange={e => setSearch(e.target.value)}
                  placeholder={L.search}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.2)',
                    borderRadius: 14, padding: '14px 18px 14px 50px',
                    fontFamily: "'DM Sans',sans-serif", fontSize: '0.9rem',
                    color: '#ffffff', outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(212,175,55,0.5)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(212,175,55,0.2)')}
                />
              </div>

              {/* Grid of surahs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 12 }}>
                {filtered.map(surah => (
                  <motion.button key={surah.number}
                    whileHover={{ y: -3 }}
                    onClick={() => loadSurah(surah)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 14, padding: '14px 16px', cursor: 'pointer',
                      textAlign: isRTL ? 'right' : 'left', transition: 'all 0.18s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)'; e.currentTarget.style.background = 'rgba(212,175,55,0.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}>

                    {/* Number badge */}
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'DM Sans',sans-serif", fontWeight: 900, fontSize: '0.75rem', color: GOLD }}>
                      {surah.number}
                    </div>

                    {/* Name */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '0.88rem', color: '#ffffff', marginBottom: 2 }}>{getSurahName(surah, lang)}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.58rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{surah.englishNameTranslation} · {surah.numberOfAyahs} {L.ayahs}</div>
                    </div>

                    {/* Arabic name */}
                    <div style={{ fontFamily: "'Amiri',serif", fontSize: '1.05rem', color: GOLD, flexShrink: 0 }}>{surah.name}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ══════════════════════ READER — libro */}
          {selected && (
            <motion.div key="reader" ref={readerRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

              {/* ── Top bar ── */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
                <button onClick={() => setSelected(null)}
                  style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'transparent', border: '1px solid rgba(212,175,55,0.25)', borderRadius: 8, padding: '7px 13px', color: GOLD, fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <ChevronLeft size={14} /> {L.back}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {/* Edition badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 12px' }}>
                    <Languages size={13} style={{ color: 'rgba(212,175,55,0.6)' }} />
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.62rem', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{L.edition}: {EDITIONS[lang] || EDITIONS.en}</span>
                  </div>

                  {/* Highlight toggle */}
                  <button
                    onClick={() => setHlMode(h => !h)}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, background: hlMode ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.05)', border: `1px solid ${hlMode ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 8, padding: '6px 12px', color: hlMode ? GOLD : 'rgba(255,255,255,0.45)', fontFamily: "'DM Sans',sans-serif", fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.15s' }}>
                    <Highlighter size={13} /> {hlMode ? L.clearHL : L.highlight}
                  </button>

                  {highlighted.size > 0 && (
                    <button onClick={() => setHighlighted(new Set())}
                      style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', fontFamily: "'DM Sans',sans-serif", fontSize: '0.62rem', cursor: 'pointer', padding: '6px 8px' }}>
                      <X size={11} /> {highlighted.size}
                    </button>
                  )}
                </div>
              </div>

              {/* ── Surah title ── */}
              <div style={{ textAlign: 'center', marginBottom: 40, padding: '32px 20px', background: 'linear-gradient(135deg,rgba(212,175,55,0.07),rgba(212,175,55,0.03))', border: '1px solid rgba(212,175,55,0.15)', borderRadius: 20 }}>
                <h1 style={{ fontFamily: "'Amiri',serif", fontSize: 'clamp(2rem,6vw,3.5rem)', color: GOLD, marginBottom: 10, lineHeight: 1.2 }}>{selected.name}</h1>
                <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 'clamp(1rem,3vw,1.5rem)', color: '#ffffff', marginBottom: 12 }}>{getSurahName(selected, lang)}</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', marginBottom: 12 }}>{selected.englishNameTranslation}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
                  {[selected.revelationType === 'Meccan' ? L.meccan : L.medinan, `${selected.numberOfAyahs} ${L.ayahs}`, `Surah ${selected.number}`].map(tag => (
                    <span key={tag} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.58rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(212,175,55,0.55)', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: 99, padding: '3px 10px' }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* ── Bismillah ── */}
              {selected.number !== 1 && selected.number !== 9 && (
                <div style={{ textAlign: 'center', marginBottom: 36, padding: '24px 20px', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
                  <p style={{ fontFamily: "'Amiri',serif", fontSize: 'clamp(1.4rem,4vw,2.2rem)', color: GOLD, lineHeight: 2, direction: 'rtl' }}>
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                </div>
              )}

              {/* ── Ayahs — libro style ── */}
              {loadingAyahs ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
                  <Loader2 size={32} style={{ color: GOLD, animation: 'spin 1.2s linear infinite' }} />
                  <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {ayahs.map(ayah => {
                    const isHL = highlighted.has(ayah.numberInSurah);
                    return (
                      <motion.div key={ayah.number}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        onClick={() => toggleHL(ayah.numberInSurah)}
                        style={{
                          background: isHL ? 'rgba(212,175,55,0.1)' : 'transparent',
                          border: isHL ? '1px solid rgba(212,175,55,0.28)' : '1px solid transparent',
                          borderRadius: 14,
                          padding: 'clamp(18px,3vw,28px) clamp(16px,3vw,28px)',
                          cursor: hlMode ? 'pointer' : 'default',
                          transition: 'all 0.18s',
                          position: 'relative',
                        }}
                        onMouseEnter={e => { if (hlMode) e.currentTarget.style.background = isHL ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.03)'; }}
                        onMouseLeave={e => { if (!isHL) e.currentTarget.style.background = 'transparent'; }}>

                        {/* Ayah number pill */}
                        <div style={{ display: 'flex', justifyContent: isRTL ? 'flex-start' : 'flex-end', marginBottom: 14 }}>
                          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.6rem', fontWeight: 900, color: isHL ? GOLD : 'rgba(212,175,55,0.45)', background: isHL ? 'rgba(212,175,55,0.15)' : 'rgba(212,175,55,0.07)', border: `1px solid ${isHL ? 'rgba(212,175,55,0.35)' : 'rgba(212,175,55,0.12)'}`, borderRadius: 99, padding: '3px 10px', transition: 'all 0.18s' }}>
                            {ayah.numberInSurah}
                          </span>
                        </div>

                        {/* Arabic text — right aligned, large, beautiful */}
                        <p style={{
                          fontFamily: "'Amiri',serif",
                          fontSize: 'clamp(1.3rem,3.5vw,2rem)',
                          color: '#ffffff', lineHeight: 2.2,
                          direction: 'rtl', textAlign: 'right',
                          marginBottom: 20,
                          paddingBottom: 20,
                          borderBottom: '1px solid rgba(212,175,55,0.08)',
                        }}>
                          {ayah.text}
                        </p>

                        {/* Translation — below, in reading language */}
                        {ayah.translation && (
                          <p style={{
                            fontFamily: lang === 'ar' ? "'Amiri',serif" : "'DM Sans',sans-serif",
                            fontSize: 'clamp(0.82rem,1.8vw,0.96rem)',
                            fontWeight: 300,
                            color: 'rgba(255,255,255,0.52)',
                            lineHeight: 1.9,
                            direction: isRTL ? 'rtl' : 'ltr',
                            textAlign: isRTL ? 'right' : 'left',
                            fontStyle: lang !== 'ar' ? 'italic' : 'normal',
                          }}>
                            {ayah.translation}
                          </p>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* ── Prev / Next ── */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 48, paddingTop: 28, borderTop: '1px solid rgba(212,175,55,0.12)', flexWrap: 'wrap', gap: 12 }}>
                {selected.number > 1 ? (
                  <button onClick={() => loadSurah(surahs[selected.number - 2])}
                    style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9, padding: '9px 16px', color: 'rgba(255,255,255,0.6)', fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}>
                    <ChevronLeft size={14} /> {L.prev}
                  </button>
                ) : <div />}
                {selected.number < 114 && (
                  <button onClick={() => loadSurah(surahs[selected.number])}
                    style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', borderRadius: 9, padding: '9px 16px', color: GOLD, fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.18)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.1)')}>
                    {L.next} <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Highlight tip */}
        {selected && hlMode && (
          <div style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', background: 'rgba(10,37,64,0.95)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 99, padding: '9px 20px', fontFamily: "'DM Sans',sans-serif", fontSize: '0.65rem', fontWeight: 700, color: GOLD, backdropFilter: 'blur(12px)', zIndex: 100, whiteSpace: 'nowrap', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
            <Highlighter size={12} style={{ display: 'inline', marginRight: 6 }} />
            {lang === 'ar' ? 'انقر على أي آية لتمييزها' : lang === 'fr' ? 'Cliquez sur un verset pour le surligner' : lang === 'es' ? 'Haz clic en un versículo para subrayarlo' : 'Click any verse to highlight it'}
          </div>
        )}
      </div>
    </div>
  );
}
