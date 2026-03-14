import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '@/src/components/SEO';
import { useTranslation } from 'react-i18next';
import { BookOpen, Heart, Moon, Sun, Home, Car, Utensils, Shield, ChevronDown, Copy, Check } from 'lucide-react';
import { RelatedTools } from '@/src/components/RelatedTools';

const NAVY = '#0a2540';
const GOLD = '#D4AF37';

/* ── Full Duas database ─────────────────────────────────── */
const DUAS_DATA = [
  {
    id: 'morning-waking',
    category: 'morning',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Alhamdulillahil-ladhi ahyana ba\'da ma amatana wa-ilayhin-nushur',
    translations: {
      en: 'All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.',
      ar: 'الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور.',
      fr: 'Toute louange est pour Allah qui nous a redonné la vie après nous l\'avoir ôtée, et c\'est à Lui que sera la résurrection.',
      es: 'Toda alabanza es para Allah quien nos dio vida después de habérnosla quitado, y hacia Él es la resurrección.',
    },
    source: 'Bukhari 6312',
    names: { en: 'Upon waking up', ar: 'عند الاستيقاظ', fr: 'Au réveil', es: 'Al despertar' },
  },
  {
    id: 'morning-bismillah',
    category: 'morning',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Bismillahil-ladhi la yadurru ma\'a ismihi shay\'un fil-ardi wa la fis-sama\'i wa huwas-sami\'ul-\'alim',
    translations: {
      en: 'In the name of Allah with whose name nothing is harmed on earth or in the heavens, and He is the All-Hearing, the All-Knowing.',
      ar: 'بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم.',
      fr: 'Au nom d\'Allah, avec Whose nom rien ne peut causer de tort sur terre ni dans les cieux. Il est Celui qui entend et sait tout.',
      es: 'En el nombre de Allah con cuyo nombre nada puede dañar en la tierra ni en los cielos, y Él es el Omnisciente.',
    },
    source: 'Abu Dawud 5088',
    names: { en: 'Morning protection', ar: 'حصن الصباح', fr: 'Protection matinale', es: 'Protección matutina' },
  },
  {
    id: 'morning-ayatul-kursi',
    category: 'morning',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',
    transliteration: 'Allahu la ilaha illa huwal-hayyul-qayyum, la ta\'khudhuhu sinatun wa la nawm...',
    translations: {
      en: 'Allah — there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep...',
      ar: 'الله لا إله إلا هو الحي القيوم لا تأخذه سنة ولا نوم...',
      fr: 'Allah — il n\'y a de divinité que Lui, le Vivant, le Subsistant par Lui-même. Ni somnolence ni sommeil ne Le saisissent...',
      es: 'Allah — no hay deidad excepto Él, el Siempre Vivo, el Eterno Sustentador. Ni el sopor le vence ni el sueño...',
    },
    source: 'Quran 2:255 — Ayatul Kursi',
    names: { en: 'Ayatul Kursi', ar: 'آية الكرسي', fr: 'Ayat al-Kursi', es: 'Ayatul Kursi' },
  },
  {
    id: 'evening-protection',
    category: 'evening',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration: 'Amsayna wa amsal-mulku lillahi wal-hamdu lillahi wa la ilaha illallahu wahdahu la sharika lah',
    translations: {
      en: 'We have entered the evening and the dominion belongs to Allah. All praise is for Allah. There is no deity except Allah, alone without partner.',
      ar: 'أمسينا وأمسى الملك لله والحمد لله ولا إله إلا الله وحده لا شريك له.',
      fr: 'Nous voici au soir et le Royaume appartient à Allah. Toute louange est pour Allah. Il n\'y a de divinité qu\'Allah, seul sans associé.',
      es: 'Hemos entrado en la tarde y el dominio pertenece a Allah. Toda alabanza es para Allah. No hay deidad excepto Allah, solo sin asociado.',
    },
    source: 'Muslim 2723',
    names: { en: 'Evening opening', ar: 'دعاء المساء', fr: 'Ouverture du soir', es: 'Apertura de tarde' },
  },
  {
    id: 'evening-surah-ikhlas',
    category: 'evening',
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    transliteration: 'Qul huwa Allahu ahad. Allahus-samad. Lam yalid wa lam yulad. Wa lam yakun lahu kufuwan ahad.',
    translations: {
      en: 'Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born. Nor is there any equivalent to Him.',
      ar: 'قل هو الله أحد، الله الصمد، لم يلد ولم يولد، ولم يكن له كفواً أحد.',
      fr: 'Dis: Il est Allah, l\'Unique. Allah, le Seul à Qui tout être a besoin. Il n\'engendre pas et n\'a pas été engendré. Et nul n\'est égal à Lui.',
      es: 'Di: Él es Allah, el Único. Allah, el Eterno. No engendró ni fue engendrado. Ni hay ninguno comparable a Él.',
    },
    source: 'Quran 112 — Surah Al-Ikhlas',
    names: { en: 'Surah Al-Ikhlas', ar: 'سورة الإخلاص', fr: 'Sourate Al-Ikhlas', es: 'Sura Al-Ijlas' },
  },
  {
    id: 'sleep-dua',
    category: 'sleep',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismika Allahumma amutu wa ahya',
    translations: {
      en: 'In Your name, O Allah, I die and I live.',
      ar: 'باسمك اللهم أموت وأحيا.',
      fr: 'En Ton nom, ô Allah, je meurs et je vis.',
      es: 'En Tu nombre, oh Allah, muero y vivo.',
    },
    source: 'Bukhari 6312',
    names: { en: 'Before sleeping', ar: 'عند النوم', fr: 'Avant de dormir', es: 'Antes de dormir' },
  },
  {
    id: 'sleep-ayatul-kursi-night',
    category: 'sleep',
    arabic: 'سُبْحَانَ اللَّهِ — ٣٣× ، الْحَمْدُ لِلَّهِ — ٣٣× ، اللَّهُ أَكْبَرُ — ٣٤×',
    transliteration: 'SubhanAllah × 33, Alhamdulillah × 33, Allahu Akbar × 34',
    translations: {
      en: 'Glory be to Allah × 33, All praise to Allah × 33, Allah is the Greatest × 34. The Prophet ﷺ said this is better than having a servant.',
      ar: 'سبحان الله ٣٣ مرة، الحمد لله ٣٣ مرة، الله أكبر ٣٤ مرة. قال النبي ﷺ: هو خير لك من خادم.',
      fr: 'Gloire à Allah × 33, Louange à Allah × 33, Allah est le Plus Grand × 34. Le Prophète ﷺ a dit que c\'est mieux qu\'avoir un serviteur.',
      es: 'Gloria a Allah × 33, Alabanza a Allah × 33, Allah es el más Grande × 34. El Profeta ﷺ dijo que es mejor que tener un sirviente.',
    },
    source: 'Bukhari 3113',
    names: { en: 'Tasbeeh of Fatimah', ar: 'تسبيح فاطمة', fr: 'Tasbeeh de Fatima', es: 'Tasbeeh de Fátima' },
  },
  {
    id: 'food-before',
    category: 'food',
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillah',
    translations: {
      en: 'In the name of Allah. Said before eating — the Prophet ﷺ instructed: say Bismillah, eat with your right hand, and eat from what is in front of you.',
      ar: 'بسم الله. تُقال قبل الطعام — قال النبي ﷺ: سمّ الله وكل بيمينك وكل مما يليك.',
      fr: 'Au nom d\'Allah. À dire avant de manger — le Prophète ﷺ a dit: dis Bismillah, mange de ta main droite et mange de ce qui est devant toi.',
      es: 'En el nombre de Allah. Se dice antes de comer — el Profeta ﷺ instruyó: di Bismillah, come con tu mano derecha y come de lo que está frente a ti.',
    },
    source: 'Muslim 2022',
    names: { en: 'Before eating', ar: 'قبل الأكل', fr: 'Avant de manger', es: 'Antes de comer' },
  },
  {
    id: 'food-after',
    category: 'food',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    transliteration: 'Alhamdulillahil-ladhi at\'amana wa saqana wa ja\'alana muslimin',
    translations: {
      en: 'All praise is for Allah who fed us and gave us drink and made us Muslims.',
      ar: 'الحمد لله الذي أطعمنا وسقانا وجعلنا مسلمين.',
      fr: 'Toute louange est pour Allah qui nous a nourris et abreuvés et nous a faits musulmans.',
      es: 'Toda alabanza es para Allah quien nos alimentó y nos dio de beber y nos hizo musulmanes.',
    },
    source: 'Abu Dawud 3850',
    names: { en: 'After eating', ar: 'بعد الأكل', fr: 'Après avoir mangé', es: 'Después de comer' },
  },
  {
    id: 'travel-dua',
    category: 'travel',
    arabic: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى وَمِنَ الْعَمَلِ مَا تَرْضَى',
    transliteration: 'Allahumma inna nas\'aluka fi safarina hadhal-birra wat-taqwa wa minal-\'amali ma tarda',
    translations: {
      en: 'O Allah, we ask You on this journey for righteousness, piety and deeds that please You.',
      ar: 'اللهم إنا نسألك في سفرنا هذا البر والتقوى ومن العمل ما ترضى.',
      fr: 'Ô Allah, nous Te demandons lors de ce voyage la piété, la vertu et des actes qui Te plaisent.',
      es: 'Oh Allah, te pedimos en este viaje rectitud, piedad y obras que te complazcan.',
    },
    source: 'Muslim 1342',
    names: { en: 'Journey dua', ar: 'دعاء السفر', fr: 'Dou\'a du voyage', es: 'Dua del viaje' },
  },
  {
    id: 'entering-home',
    category: 'home',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ وَخَيْرَ الْمَخْرَجِ بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
    transliteration: 'Allahumma inni as\'aluka khayral-mawliji wa khayral-makhraji. Bismillahi walajna wa bismillahi kharajna wa \'alallahi rabbina tawakkalna',
    translations: {
      en: 'O Allah, I ask You for the best entry and the best exit. In the name of Allah we enter, in the name of Allah we leave, and in Allah our Lord we trust.',
      ar: 'اللهم إني أسألك خير المولج وخير المخرج، بسم الله ولجنا وبسم الله خرجنا وعلى الله ربنا توكلنا.',
      fr: 'Ô Allah, je Te demande la meilleure entrée et la meilleure sortie. Au nom d\'Allah nous entrons, au nom d\'Allah nous sortons, et en Allah nous faisons confiance.',
      es: 'Oh Allah, te pido la mejor entrada y la mejor salida. En el nombre de Allah entramos, en el nombre de Allah salimos, y en Allah nuestro Señor confiamos.',
    },
    source: 'Abu Dawud 5096',
    names: { en: 'Entering home', ar: 'دخول البيت', fr: 'En entrant chez soi', es: 'Al entrar en casa' },
  },
  {
    id: 'anxiety-dua',
    category: 'protection',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ',
    transliteration: 'Allahumma inni a\'udhu bika minal-hammi wal-hazan, wa a\'udhu bika minal-\'ajzi wal-kasal',
    translations: {
      en: 'O Allah, I seek refuge in You from anxiety and grief, and I seek refuge in You from incapacity and laziness.',
      ar: 'اللهم إني أعوذ بك من الهم والحزن وأعوذ بك من العجز والكسل.',
      fr: 'Ô Allah, je cherche refuge en Toi contre l\'anxiété et la tristesse, et je cherche refuge en Toi contre l\'incapacité et la paresse.',
      es: 'Oh Allah, me refugio en Ti de la ansiedad y la tristeza, y me refugio en Ti de la incapacidad y la pereza.',
    },
    source: 'Bukhari 6369',
    names: { en: 'For anxiety & grief', ar: 'للهم والحزن', fr: 'Pour l\'anxiété', es: 'Para la ansiedad' },
  },
  {
    id: 'forgiveness-dua',
    category: 'protection',
    arabic: 'رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    transliteration: 'Rabbana dhalamna anfusana wa in lam taghfir lana wa tarhamna lanakunanna minal-khasirin',
    translations: {
      en: 'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.',
      ar: 'ربنا ظلمنا أنفسنا وإن لم تغفر لنا وترحمنا لنكونن من الخاسرين.',
      fr: 'Notre Seigneur, nous nous sommes fait du tort, et si Tu ne nous pardonnes pas et ne nous fais pas miséricorde, nous serons certes parmi les perdants.',
      es: 'Señor nuestro, nos hemos agraviado a nosotros mismos, y si no nos perdonas y no te apiadas de nosotros, ciertamente estaremos entre los perdedores.',
    },
    source: 'Quran 7:23 — Dua of Adam & Hawa',
    names: { en: 'Dua for forgiveness', ar: 'دعاء الاستغفار', fr: 'Dou\'a pour le pardon', es: 'Dua del perdón' },
  },
  {
    id: 'istighfar',
    category: 'protection',
    arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullaha al-\'Adhim alladhi la ilaha illa huwal-hayyul-qayyumu wa atubu ilayh',
    translations: {
      en: 'I seek forgiveness from Allah the Magnificent, there is no deity except Him, the Ever-Living, the Eternal, and I repent to Him.',
      ar: 'أستغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه.',
      fr: 'Je demande pardon à Allah le Magnifique, il n\'y a de divinité que Lui, le Vivant, l\'Éternel, et je me repens à Lui.',
      es: 'Pido perdón a Allah el Magnífico, no hay deidad sino Él, el Siempre Vivo, el Eterno, y me arrepiento ante Él.',
    },
    source: 'Abu Dawud 1517 — Sayyidul Istighfar',
    names: { en: 'Sayyidul Istighfar', ar: 'سيد الاستغفار', fr: 'Sayyid al-Istighfar', es: 'Sayyidul Istighfar' },
  },
  {
    id: 'before-wudu',
    category: 'prayer',
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillah',
    translations: {
      en: 'In the name of Allah. Say before beginning Wudu (ablution). The Prophet ﷺ said: There is no Wudu for the one who does not mention Allah\'s name over it.',
      ar: 'بسم الله. تُقال قبل الوضوء. قال النبي ﷺ: لا وضوء لمن لم يذكر اسم الله عليه.',
      fr: 'Au nom d\'Allah. À dire avant l\'ablution (Wudu). Le Prophète ﷺ a dit: Il n\'y a pas de Wudu pour celui qui n\'y mentionne pas le nom d\'Allah.',
      es: 'En el nombre de Allah. Se dice antes del Wudu (ablución). El Profeta ﷺ dijo: No hay Wudu para el que no menciona el nombre de Allah.',
    },
    source: 'Abu Dawud 101',
    names: { en: 'Before Wudu', ar: 'قبل الوضوء', fr: 'Avant l\'ablution', es: 'Antes del Wudu' },
  },
  {
    id: 'after-wudu',
    category: 'prayer',
    arabic: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliteration: 'Ash-hadu alla ilaha illallahu wahdahu la sharika lah, wa ash-hadu anna Muhammadan \'abduhu wa rasuluh',
    translations: {
      en: 'I testify that there is no deity except Allah, alone without partner, and I testify that Muhammad is His servant and messenger.',
      ar: 'أشهد أن لا إله إلا الله وحده لا شريك له وأشهد أن محمداً عبده ورسوله.',
      fr: 'Je témoigne qu\'il n\'y a de divinité qu\'Allah, seul sans associé, et je témoigne que Muhammad est Son serviteur et messager.',
      es: 'Atestiguo que no hay deidad excepto Allah, solo sin asociado, y atestiguo que Muhammad es Su siervo y mensajero.',
    },
    source: 'Muslim 234',
    names: { en: 'After Wudu', ar: 'بعد الوضوء', fr: 'Après l\'ablution', es: 'Después del Wudu' },
  },
  {
    id: 'entering-mosque',
    category: 'prayer',
    arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    transliteration: 'Allahumma iftah li abwaba rahmatik',
    translations: {
      en: 'O Allah, open for me the gates of Your mercy.',
      ar: 'اللهم افتح لي أبواب رحمتك.',
      fr: 'Ô Allah, ouvre pour moi les portes de Ta miséricorde.',
      es: 'Oh Allah, ábrenos las puertas de Tu misericordia.',
    },
    source: 'Muslim 713',
    names: { en: 'Entering mosque', ar: 'دخول المسجد', fr: 'En entrant à la mosquée', es: 'Al entrar a la mezquita' },
  },
];

const CATEGORIES = [
  { id: 'all',        Icon: BookOpen,  en:'All Duas',      ar:'جميع الأدعية', fr:'Toutes',      es:'Todos' },
  { id: 'morning',   Icon: Sun,       en:'Morning',        ar:'الصباح',       fr:'Matin',       es:'Mañana' },
  { id: 'evening',   Icon: Moon,      en:'Evening',        ar:'المساء',       fr:'Soir',        es:'Soir' },
  { id: 'sleep',     Icon: Moon,      en:'Sleep',          ar:'النوم',        fr:'Sommeil',     es:'Sueño' },
  { id: 'prayer',    Icon: BookOpen,  en:'Prayer',         ar:'الصلاة',       fr:'Prière',      es:'Oración' },
  { id: 'food',      Icon: Utensils,  en:'Food',           ar:'الطعام',       fr:'Nourriture',  es:'Comida' },
  { id: 'travel',    Icon: Car,       en:'Travel',         ar:'السفر',        fr:'Voyage',      es:'Viaje' },
  { id: 'home',      Icon: Home,      en:'Home',           ar:'البيت',        fr:'Maison',      es:'Hogar' },
  { id: 'protection',Icon: Shield,    en:'Protection',     ar:'الحماية',      fr:'Protection',  es:'Protección' },
];

const UI: Record<string, any> = {
  en: { badge:'Daily Duas · Authentic Supplications', title:'Daily Duas', sub:'Authentic supplications from Quran and Sunnah for every moment of your day — morning, evening, food, sleep and more.', copy:'Copied!', source:'Source', trans:'Translation' },
  ar: { badge:'أدعية يومية · أدعية أصيلة', title:'الأدعية اليومية', sub:'أدعية أصيلة من القرآن والسنة لكل لحظة في يومك — الصباح والمساء والطعام والنوم والمزيد.', copy:'تم النسخ!', source:'المصدر', trans:'الترجمة' },
  fr: { badge:'Douas Quotidiennes · Supplications Authentiques', title:'Douas Quotidiennes', sub:'Supplications authentiques du Coran et de la Sunna pour chaque moment de votre journée — matin, soir, repas, sommeil et plus.', copy:'Copié!', source:'Source', trans:'Traduction' },
  es: { badge:'Duas Diarias · Súplicas Auténticas', title:'Duas Diarias', sub:'Súplicas auténticas del Corán y la Sunnah para cada momento de tu día — mañana, tarde, comida, sueño y más.', copy:'¡Copiado!', source:'Fuente', trans:'Traducción' },
};

/* ── Dua Card ────────────────────────────────────────────── */
function DuaCard({ dua, lang, uiL }: { dua: typeof DUAS_DATA[0]; lang: string; uiL: any }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const name = dua.names[lang as keyof typeof dua.names] || dua.names.en;
  const trans = dua.translations[lang as keyof typeof dua.translations] || dua.translations.en;

  const copy = () => {
    navigator.clipboard.writeText(dua.arabic).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <motion.div layout initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
      style={{ background:'rgba(255,255,255,0.04)', border:`1px solid ${open ? 'rgba(212,175,55,0.35)' : 'rgba(255,255,255,0.08)'}`, borderRadius:16, overflow:'hidden', transition:'border-color 0.2s' }}>
      <button onClick={() => setOpen(o => !o)} style={{ width:'100%', padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:14, background:'transparent', border:'none', cursor:'pointer', textAlign:'left' }}>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.82rem', fontWeight:800, color:'#ffffff', marginBottom:4 }}>{name}</div>
          <div style={{ fontFamily:"'Amiri',serif", fontSize:'1.05rem', color:GOLD, direction:'rtl', lineHeight:1.5, textAlign:'right' }}>{dua.arabic.slice(0,60)}{dua.arabic.length > 60 ? '...' : ''}</div>
        </div>
        <ChevronDown size={16} style={{ color:'rgba(255,255,255,0.3)', flexShrink:0, transform: open ? 'rotate(180deg)' : 'none', transition:'transform 0.2s' }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.22 }}
            style={{ overflow:'hidden', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ padding:'18px 20px', display:'flex', flexDirection:'column', gap:14 }}>
              {/* Full Arabic */}
              <div style={{ fontFamily:"'Amiri',serif", fontSize:'1.2rem', color:GOLD, direction:'rtl', textAlign:'right', lineHeight:1.9, background:'rgba(212,175,55,0.05)', borderRadius:10, padding:'14px 16px', border:'1px solid rgba(212,175,55,0.12)' }}>
                {dua.arabic}
              </div>
              {/* Transliteration */}
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.76rem', color:'rgba(255,255,255,0.45)', fontStyle:'italic', lineHeight:1.7 }}>
                {dua.transliteration}
              </div>
              {/* Translation */}
              <div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.52rem', fontWeight:900, color:'rgba(212,175,55,0.5)', textTransform:'uppercase', letterSpacing:'0.18em', marginBottom:6 }}>{uiL.trans}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.82rem', color:'rgba(255,255,255,0.65)', lineHeight:1.75 }}>{trans}</div>
              </div>
              {/* Source + copy */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:10, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.6rem', color:'rgba(212,175,55,0.45)', fontStyle:'italic' }}>{uiL.source}: {dua.source}</span>
                <button onClick={copy} style={{ display:'flex', alignItems:'center', gap:5, background: copied ? 'rgba(34,197,94,0.12)' : 'rgba(212,175,55,0.1)', border:`1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(212,175,55,0.2)'}`, borderRadius:8, padding:'5px 12px', cursor:'pointer', transition:'all 0.18s', fontFamily:"'DM Sans',sans-serif", fontSize:'0.6rem', fontWeight:700, color: copied ? '#22c55e' : GOLD }}>
                  {copied ? <Check size={11} /> : <Copy size={11} />}
                  {copied ? uiL.copy : 'Copy'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Main ────────────────────────────────────────────────── */
export function DailyDuasPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.slice(0,2) || 'en') as string;
  const L = UI[lang] || UI.en;
  const isRTL = lang === 'ar';
  const [activeCat, setActiveCat] = useState('all');

  const filtered = activeCat === 'all' ? DUAS_DATA : DUAS_DATA.filter(d => d.category === activeCat);
  const catName = (cat: typeof CATEGORIES[0]) => cat[lang as keyof typeof cat] as string || cat.en;

  const schema = { '@context':'https://schema.org', '@type':'Article', name:L.title, description:L.sub };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background:NAVY, minHeight:'100vh', color:'#fff' }}>
      <SEO title={L.title} description={L.sub} keywords="daily duas, islamic dua, morning dua, evening dua, dua before sleeping, islamic supplications" canonical="https://www.alummahai.com/duas" schema={schema} lang={lang} />

      {/* Hero */}
      <div style={{ background:'linear-gradient(160deg,#071a2e 0%,#0a2540 55%,#0d2e4d 100%)', borderBottom:'1px solid rgba(212,175,55,0.12)', padding:'clamp(80px,12vw,120px) 20px clamp(44px,6vw,60px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(212,175,55,0.06) 1px,transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none' }} />
        <div style={{ position:'relative', zIndex:1 }}>
          <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }}
            style={{ display:'inline-block', padding:'4px 14px', background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.22)', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.52rem', fontWeight:900, color:GOLD, textTransform:'uppercase', letterSpacing:'0.24em', marginBottom:16 }}>
            🤲 {L.badge}
          </motion.div>
          <motion.h1 initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.08 }}
            style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(2.2rem,7vw,5rem)', color:'#fff', letterSpacing:'-0.03em', marginBottom:14, lineHeight:1 }}>
            {L.title}
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.18 }}
            style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'clamp(0.88rem,1.8vw,1rem)', color:'rgba(255,255,255,0.4)', maxWidth:480, margin:'0 auto', lineHeight:1.85 }}>
            {L.sub}
          </motion.p>
        </div>
      </div>

      <div style={{ maxWidth:900, margin:'0 auto', padding:'clamp(32px,5vw,56px) 20px' }}>

        {/* Category filter */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:32 }}>
          {CATEGORIES.map(cat => {
            const active = activeCat === cat.id;
            return (
              <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{ display:'flex', alignItems:'center', gap:5, padding:'7px 14px', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.6rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.12em', cursor:'pointer', border:'none', transition:'all 0.16s', background: active ? GOLD : 'rgba(212,175,55,0.09)', color: active ? NAVY : GOLD, boxShadow: active ? '0 4px 14px rgba(212,175,55,0.3)' : 'none' }}>
                <cat.Icon size={11} strokeWidth={2} />
                {catName(cat)}
              </button>
            );
          })}
        </div>

        {/* Duas list */}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <AnimatePresence mode="popLayout">
            {filtered.map(dua => (
              <DuaCard key={dua.id} dua={dua} lang={lang} uiL={L} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    

      {/* Related Tools — Interlinking */}
      <RelatedTools exclude={["duas"]} max={6} />

    </div>
  );
}
