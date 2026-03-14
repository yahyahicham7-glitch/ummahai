import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '@/src/components/SEO';
import { useTranslation } from 'react-i18next';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NAVY = '#0a2540';
const GOLD = '#D4AF37';

/* ── Mood database: Quran verse + Dua for each emotion ── */
const MOODS = [
  {
    id: 'anxious',
    emoji: '😟',
    label: { en: 'Anxious', ar: 'قلق', fr: 'Anxieux', es: 'Ansioso' },
    verse: {
      arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
      ref: 'Ar-Ra\'d 13:28',
      tr: {
        en: 'Verily, in the remembrance of Allah do hearts find rest.',
        ar: 'ألا بذكر الله تطمئن القلوب.',
        fr: 'C\'est par le rappel d\'Allah que les cœurs se tranquillisent.',
        es: 'En verdad, con el recuerdo de Allah los corazones encuentran sosiego.',
      },
    },
    dua: {
      arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ',
      transliteration: 'Allāhumma innī a\'ūdhu bika minal-hammi wal-ḥazan wal-\'ajzi wal-kasal',
      tr: {
        en: 'O Allah, I seek refuge in You from worry, grief, inability, and laziness.',
        ar: 'اللهم إني أعوذ بك من الهم والحزن والعجز والكسل.',
        fr: 'Ô Allah, je cherche refuge auprès de Toi contre le souci, la tristesse, l\'incapacité et la paresse.',
        es: 'Oh Allah, busco refugio en Ti de la preocupación, la tristeza, la incapacidad y la pereza.',
      },
      source: 'Bukhari 6369',
    },
  },
  {
    id: 'grateful',
    emoji: '🤲',
    label: { en: 'Grateful', ar: 'ممتن', fr: 'Reconnaissant', es: 'Agradecido' },
    verse: {
      arabic: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
      ref: 'Ibrahim 14:7',
      tr: {
        en: 'If you are grateful, I will surely increase you in favor.',
        ar: 'لئن شكرتم لأزيدنكم.',
        fr: 'Si vous êtes reconnaissants, très certainement Je vous donnerai davantage.',
        es: 'Si sois agradecidos, os daré aún más.',
      },
    },
    dua: {
      arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
      transliteration: 'Allāhumma a\'innī \'alā dhikrika wa shukrika wa ḥusni \'ibādatik',
      tr: {
        en: 'O Allah, help me in remembering You, being grateful to You, and worshipping You well.',
        ar: 'اللهم أعني على ذكرك وشكرك وحسن عبادتك.',
        fr: 'Ô Allah, aide-moi à me souvenir de Toi, à Te remercier et à bien T\'adorer.',
        es: 'Oh Allah, ayúdame a recordarte, agradecerte y adorarte bien.',
      },
      source: 'Abu Dawud 1522',
    },
  },
  {
    id: 'sad',
    emoji: '😢',
    label: { en: 'Sad', ar: 'حزين', fr: 'Triste', es: 'Triste' },
    verse: {
      arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا',
      ref: 'Ash-Sharh 94:5-6',
      tr: {
        en: 'For indeed, with hardship comes ease. Indeed, with hardship comes ease.',
        ar: 'فإن مع العسر يسراً. إن مع العسر يسراً.',
        fr: 'Car après la difficulté vient la facilité. Oui, après la difficulté vient la facilité.',
        es: 'Porque con la dificultad viene la facilidad. Con la dificultad viene la facilidad.',
      },
    },
    dua: {
      arabic: 'لَا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
      transliteration: 'Lā ilāha illā anta subḥānaka innī kuntu minaẓ-ẓālimīn',
      tr: {
        en: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
        ar: 'لا إله إلا أنت سبحانك إني كنت من الظالمين.',
        fr: 'Il n\'y a de divinité que Toi. Gloire à Toi. J\'ai été parmi les injustes.',
        es: 'No hay dios excepto Tú. Gloria a Ti. He sido de los injustos.',
      },
      source: 'Al-Anbiya 21:87',
    },
  },
  {
    id: 'hopeful',
    emoji: '🌅',
    label: { en: 'Hopeful', ar: 'متفائل', fr: 'Plein d\'espoir', es: 'Esperanzado' },
    verse: {
      arabic: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
      ref: 'At-Talaq 65:3',
      tr: {
        en: 'And whoever relies upon Allah — then He is sufficient for him.',
        ar: 'ومن يتوكل على الله فهو حسبه.',
        fr: 'Et quiconque s\'en remet à Allah, Il lui suffit.',
        es: 'Y quien se encomienda a Allah, Él le basta.',
      },
    },
    dua: {
      arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
      transliteration: 'Rabbanā ātinā fid-dunyā ḥasanah wa fil-ākhirati ḥasanah wa qinā \'adhāban-nār',
      tr: {
        en: 'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',
        ar: 'ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار.',
        fr: 'Notre Seigneur, accorde-nous le bien ici-bas et le bien dans l\'au-delà, et protège-nous du châtiment du Feu.',
        es: 'Señor nuestro, danos bien en este mundo y bien en el más allá, y protégenos del castigo del Fuego.',
      },
      source: 'Al-Baqarah 2:201',
    },
  },
  {
    id: 'lost',
    emoji: '🤔',
    label: { en: 'Lost', ar: 'حائر', fr: 'Perdu', es: 'Perdido' },
    verse: {
      arabic: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ',
      ref: 'At-Talaq 65:2-3',
      tr: {
        en: 'And whoever fears Allah — He will make for him a way out. And will provide for him from where he does not expect.',
        ar: 'ومن يتق الله يجعل له مخرجاً ويرزقه من حيث لا يحتسب.',
        fr: 'Et quiconque craint Allah, Il lui ménagera une issue. Et lui accordera Ses dons par des moyens insoupçonnés.',
        es: 'Y quien teme a Allah, Él le dará una salida. Y le proveerá de donde no espera.',
      },
    },
    dua: {
      arabic: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ',
      transliteration: 'Allāhumma innī astakhīruka bi\'ilmika wa astaqdiruka bi qudratika wa as\'aluka min faḍlikal-\'aẓīm',
      tr: {
        en: 'O Allah, I seek Your guidance through Your knowledge, and I seek ability through Your power, and I ask from Your immense favor.',
        ar: 'اللهم إني أستخيرك بعلمك وأستقدرك بقدرتك وأسألك من فضلك العظيم.',
        fr: 'Ô Allah, je Te demande de me guider par Ta science, de me donner la capacité par Ta puissance, et je Te demande de Ton immense faveur.',
        es: 'Oh Allah, te pido guía por Tu conocimiento, capacidad por Tu poder, y te pido de Tu inmenso favor.',
      },
      source: 'Bukhari 1162',
    },
  },
  {
    id: 'angry',
    emoji: '😤',
    label: { en: 'Angry', ar: 'غاضب', fr: 'En colère', es: 'Enfadado' },
    verse: {
      arabic: 'وَالْكَاظِمِينَ الْغَيْظَ وَالْعَافِينَ عَنِ النَّاسِ وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ',
      ref: 'Ali \'Imran 3:134',
      tr: {
        en: 'Those who restrain anger and pardon people — and Allah loves the doers of good.',
        ar: 'والكاظمين الغيظ والعافين عن الناس والله يحب المحسنين.',
        fr: 'Ceux qui dominent leur rage et pardonnent aux gens — et Allah aime les bienfaisants.',
        es: 'Los que contienen su ira y perdonan a la gente — y Allah ama a los que hacen el bien.',
      },
    },
    dua: {
      arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
      transliteration: 'A\'ūdhu billāhi minash-shayṭānir-rajīm',
      tr: {
        en: 'I seek refuge in Allah from the accursed Satan.',
        ar: 'أعوذ بالله من الشيطان الرجيم.',
        fr: 'Je cherche refuge auprès d\'Allah contre Satan le maudit.',
        es: 'Busco refugio en Allah del maldito Satanás.',
      },
      source: 'Bukhari 6115, Muslim 2610',
    },
  },
];

const PAGE_UI: Record<string, any> = {
  en: { badge: 'Spiritual Guidance', title: 'How Are You', titleHL: 'Feeling?', sub: 'Select your state of heart — receive a verse from the Quran and a dua for comfort.', verseLabel: 'Quranic Verse', duaLabel: 'Recommended Dua', translitLabel: 'Transliteration', sourceLabel: 'Source', backHome: 'Back to Home', selectPrompt: 'Choose how you feel and let the Quran guide you.' },
  ar: { badge: 'إرشاد روحي', title: 'كيف', titleHL: 'حالك؟', sub: 'اختر حالة قلبك — واحصل على آية من القرآن ودعاء للراحة.', verseLabel: 'آية قرآنية', duaLabel: 'دعاء مقترح', translitLabel: 'النطق', sourceLabel: 'المصدر', backHome: 'العودة للرئيسية', selectPrompt: 'اختر شعورك ودع القرآن يرشدك.' },
  fr: { badge: 'Guidance Spirituelle', title: 'Comment Vous', titleHL: 'Sentez-vous ?', sub: 'Sélectionnez votre état de cœur — recevez un verset du Coran et une invocation.', verseLabel: 'Verset Coranique', duaLabel: 'Invocation Recommandée', translitLabel: 'Translittération', sourceLabel: 'Source', backHome: 'Retour à l\'accueil', selectPrompt: 'Choisissez votre émotion et laissez le Coran vous guider.' },
  es: { badge: 'Guía Espiritual', title: 'Cómo Te', titleHL: 'Sientes?', sub: 'Selecciona tu estado de corazón — recibe un versículo del Corán y una dua.', verseLabel: 'Versículo Coránico', duaLabel: 'Dua Recomendada', translitLabel: 'Transliteración', sourceLabel: 'Fuente', backHome: 'Volver al inicio', selectPrompt: 'Elige cómo te sientes y deja que el Corán te guíe.' },
};

export function MoodPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.slice(0, 2) || 'en') as string;
  const L = PAGE_UI[lang] || PAGE_UI.en;
  const isRTL = lang === 'ar';
  const [selected, setSelected] = useState<string | null>(null);
  const mood = MOODS.find(m => m.id === selected);

  return (
    <>
      <SEO
        title="How Are You Feeling? — Quranic Guidance for Every Emotion | Al Ummah AI"
        description="Select your emotional state and receive a relevant verse from the Holy Quran and a dua for comfort. Anxious, grateful, sad, hopeful, lost or angry — find peace in Allah's words."
        path="/mood"
      />

      <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background: '#060f1e', minHeight: '100vh' }}>
        {/* Hero */}
        <div style={{ background: 'linear-gradient(160deg,#071a2e 0%,#060f1e 60%)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: 'clamp(90px,12vw,120px) 20px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(212,175,55,0.04) 1px,transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.18)', borderRadius: 99, padding: '5px 14px', marginBottom: 20 }}>
              <Heart size={11} style={{ color: GOLD }} />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.6rem', fontWeight: 800, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.18em' }}>{L.badge}</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.2rem)', color: '#fff', lineHeight: 1.1, marginBottom: 12 }}>
              {L.title} <span style={{ color: GOLD }}>{L.titleHL}</span>
            </h1>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>{L.sub}</p>
          </div>
        </div>

        {/* Mood cards */}
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 40 }}>
            {MOODS.map(m => (
              <motion.button key={m.id} whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
                onClick={() => setSelected(m.id)}
                style={{
                  background: selected === m.id ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${selected === m.id ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 16, padding: '18px 22px', cursor: 'pointer', textAlign: 'center',
                  minWidth: 100, flex: '1 1 100px', maxWidth: 130, transition: 'all 0.2s',
                }}>
                <div style={{ fontSize: '2rem', marginBottom: 6 }}>{m.emoji}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', fontWeight: 700, color: selected === m.id ? GOLD : 'rgba(255,255,255,0.55)' }}>
                  {m.label[lang as keyof typeof m.label] || m.label.en}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Result */}
          <AnimatePresence mode="wait">
            {mood ? (
              <motion.div key={mood.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                style={{ background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(16px)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: 24, padding: 'clamp(24px,4vw,40px)', overflow: 'hidden' }}>

                {/* Verse */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.55rem', fontWeight: 900, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: 14 }}>{L.verseLabel}</div>
                  <div style={{ fontFamily: "'Amiri',serif", fontSize: 'clamp(1.4rem,3.5vw,1.9rem)', direction: 'rtl', textAlign: 'right', color: '#fff', lineHeight: 2.2, padding: '20px 24px', background: 'rgba(212,175,55,0.05)', borderRadius: 14, borderRight: `3px solid ${GOLD}`, marginBottom: 10 }}>
                    {mood.verse.arabic}
                  </div>
                  <div style={{ textAlign: 'right', fontFamily: "'DM Sans',sans-serif", fontSize: '0.68rem', color: 'rgba(212,175,55,0.45)', marginBottom: 14 }}>— {mood.verse.ref}</div>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.85, fontStyle: 'italic' }}>
                    {mood.verse.tr[lang as keyof typeof mood.verse.tr] || mood.verse.tr.en}
                  </p>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.2),transparent)', margin: '8px 0 28px' }} />

                {/* Dua */}
                <div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.55rem', fontWeight: 900, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: 14 }}>{L.duaLabel}</div>
                  <div style={{ padding: '20px 24px', background: 'rgba(6,78,59,0.15)', borderRadius: 14, borderLeft: '3px solid #10B981', marginBottom: 12 }}>
                    <div style={{ fontFamily: "'Amiri',serif", fontSize: 'clamp(1.2rem,3vw,1.5rem)', direction: 'rtl', textAlign: 'right', color: '#fff', lineHeight: 2.1, marginBottom: 10 }}>
                      {mood.dua.arabic}
                    </div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', marginBottom: 8 }}>
                      {mood.dua.transliteration}
                    </div>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.92rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>
                      {mood.dua.tr[lang as keyof typeof mood.dua.tr] || mood.dua.tr.en}
                    </p>
                  </div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)' }}>
                    {L.sourceLabel}: {mood.dua.source}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ textAlign: 'center', padding: '48px 20px', color: 'rgba(255,255,255,0.2)', fontFamily: "'DM Sans',sans-serif", fontSize: '0.9rem' }}>
                {L.selectPrompt}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back link */}
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'DM Sans',sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>
              <ArrowLeft size={13} /> {L.backHome}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
