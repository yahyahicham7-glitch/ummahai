import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '@/src/components/SEO';
import { RotateCcw, Plus, Minus, Check } from 'lucide-react';
import { RelatedTools } from '@/src/components/RelatedTools';
import { useTranslation } from 'react-i18next';

const NAVY = '#060f1e';
const GOLD = '#D4AF37';
const GOLD2 = '#F1D279';

const UI: Record<string, any> = {
  en: {
    badge: 'Digital Tasbih Online',
    title: 'Tasbih Counter',
    subtitle: 'Track your dhikr with precision. SubhanAllah, Alhamdulillah, Allahu Akbar — 33 times each.',
    seoDesc: 'Free online Tasbih counter. Digital tasbeeh for dhikr — SubhanAllah, Alhamdulillah, Allahu Akbar. Track your remembrance of Allah easily.',
    tap: 'Tap to count',
    reset: 'Reset',
    target: 'Target',
    reached: 'Target reached!',
    total: 'Total',
    round: 'Round',
    haptic: 'Vibration',
    sound: 'Sound',
    presets: [
      { label: 'SubhanAllah', arabic: 'سُبْحَانَ اللهِ', n: 33 },
      { label: 'Alhamdulillah', arabic: 'الْحَمْدُ لِلّهِ', n: 33 },
      { label: 'Allahu Akbar', arabic: 'اللهُ أَكْبَرُ', n: 33 },
      { label: 'La ilaha illallah', arabic: 'لَا إِلَهَ إِلَّا اللهُ', n: 100 },
      { label: 'Astaghfirullah', arabic: 'أَسْتَغْفِرُ اللهَ', n: 100 },
      { label: 'Free count', arabic: '∞', n: 0 },
    ],
    info: 'The Prophet ﷺ said: "Two phrases are light on the tongue, heavy in the scales, beloved to the Most Merciful: SubhanAllahi wa bihamdih, SubhanAllahil-Azeem." (Bukhari)',
  },
  ar: {
    badge: 'السبحة الرقمية',
    title: 'عداد التسبيح',
    subtitle: 'تتبع ذكرك بدقة. سبحان الله، الحمد لله، الله أكبر — ثلاثاً وثلاثين مرة لكل منهما.',
    seoDesc: 'عداد تسبيح إلكتروني مجاني. سبحة رقمية للذكر — سبحان الله والحمد لله والله أكبر.',
    tap: 'اضغط للعد',
    reset: 'إعادة',
    target: 'الهدف',
    reached: 'تم الوصول للهدف!',
    total: 'المجموع',
    round: 'الجولة',
    haptic: 'الاهتزاز',
    sound: 'الصوت',
    presets: [
      { label: 'سبحان الله', arabic: 'سُبْحَانَ اللهِ', n: 33 },
      { label: 'الحمد لله', arabic: 'الْحَمْدُ لِلّهِ', n: 33 },
      { label: 'الله أكبر', arabic: 'اللهُ أَكْبَرُ', n: 33 },
      { label: 'لا إله إلا الله', arabic: 'لَا إِلَهَ إِلَّا اللهُ', n: 100 },
      { label: 'أستغفر الله', arabic: 'أَسْتَغْفِرُ اللهَ', n: 100 },
      { label: 'عد حر', arabic: '∞', n: 0 },
    ],
    info: 'قال النبي ﷺ: "كلمتان خفيفتان على اللسان، ثقيلتان في الميزان، حبيبتان إلى الرحمن: سبحان الله وبحمده، سبحان الله العظيم." (البخاري)',
  },
  fr: {
    badge: 'Tasbih Numérique en ligne',
    title: 'Compteur Tasbih',
    subtitle: 'Suivez votre dhikr avec précision. SubhanAllah, Alhamdulillah, Allahu Akbar — 33 fois chacun.',
    seoDesc: 'Compteur Tasbih en ligne gratuit. Tasbeeh numérique pour le dhikr — SubhanAllah, Alhamdulillah, Allahu Akbar.',
    tap: 'Appuyez pour compter',
    reset: 'Réinitialiser',
    target: 'Objectif',
    reached: 'Objectif atteint !',
    total: 'Total',
    round: 'Tour',
    haptic: 'Vibration',
    sound: 'Son',
    presets: [
      { label: 'SubhanAllah', arabic: 'سُبْحَانَ اللهِ', n: 33 },
      { label: 'Alhamdulillah', arabic: 'الْحَمْدُ لِلّهِ', n: 33 },
      { label: 'Allahu Akbar', arabic: 'اللهُ أَكْبَرُ', n: 33 },
      { label: 'La ilaha illallah', arabic: 'لَا إِلَهَ إِلَّا اللهُ', n: 100 },
      { label: 'Astaghfirullah', arabic: 'أَسْتَغْفِرُ اللهَ', n: 100 },
      { label: 'Compte libre', arabic: '∞', n: 0 },
    ],
    info: 'Le Prophète ﷺ a dit : « Deux phrases légères sur la langue, lourdes dans la balance, aimées du Très Miséricordieux : SubhanAllahi wa bihamdih, SubhanAllahil-Azeem. » (Boukhari)',
  },
  es: {
    badge: 'Tasbih Digital Online',
    title: 'Contador Tasbih',
    subtitle: 'Registra tu dhikr con precisión. SubhanAllah, Alhamdulillah, Allahu Akbar — 33 veces cada uno.',
    seoDesc: 'Contador Tasbih online gratuito. Tasbeeh digital para el dhikr — SubhanAllah, Alhamdulillah, Allahu Akbar.',
    tap: 'Toca para contar',
    reset: 'Reiniciar',
    target: 'Objetivo',
    reached: '¡Objetivo alcanzado!',
    total: 'Total',
    round: 'Ronda',
    haptic: 'Vibración',
    sound: 'Sonido',
    presets: [
      { label: 'SubhanAllah', arabic: 'سُبْحَانَ اللهِ', n: 33 },
      { label: 'Alhamdulillah', arabic: 'الْحَمْدُ لِلّهِ', n: 33 },
      { label: 'Allahu Akbar', arabic: 'اللهُ أَكْبَرُ', n: 33 },
      { label: 'La ilaha illallah', arabic: 'لَا إِلَهَ إِلَّا اللهُ', n: 100 },
      { label: 'Astaghfirullah', arabic: 'أَسْتَغْفِرُ اللهَ', n: 100 },
      { label: 'Cuenta libre', arabic: '∞', n: 0 },
    ],
    info: 'El Profeta ﷺ dijo: "Dos frases ligeras en la lengua, pesadas en la balanza, amadas por el Misericordioso: SubhanAllahi wa bihamdih, SubhanAllahil-Azeem." (Bujari)',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Tasbih Counter Online',
  description: 'Free digital tasbih counter for dhikr — SubhanAllah, Alhamdulillah, Allahu Akbar.',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export function TasbihPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.slice(0, 2) || 'en';
  const L = UI[lang] || UI.en;
  const isRTL = lang === 'ar';

  const [presetIdx, setPresetIdx] = useState(0);
  const [count, setCount]         = useState(0);
  const [total, setTotal]         = useState(0);
  const [round, setRound]         = useState(1);
  const [flash, setFlash]         = useState(false);
  const [done,  setDone]          = useState(false);
  const [haptic, setHaptic]       = useState(true);
  const [pressed, setPressed]     = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const preset = L.presets[presetIdx];
  const target = preset.n;

  const vibrate = useCallback(() => {
    if (!haptic) return;
    try { navigator.vibrate?.(18); } catch {}
  }, [haptic]);

  const tap = useCallback(() => {
    vibrate();
    setPressed(true);
    setFlash(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setFlash(false), 280);
    setTimeout(() => setPressed(false), 100);

    setCount(c => {
      const next = c + 1;
      setTotal(t => t + 1);
      if (target > 0 && next >= target) {
        setDone(true);
        try { navigator.vibrate?.([40, 80, 40]); } catch {}
        setTimeout(() => { setDone(false); setCount(0); setRound(r => r + 1); }, 1400);
        return 0;
      }
      return next;
    });
  }, [vibrate, target]);

  const reset = useCallback(() => {
    setCount(0); setTotal(0); setRound(1); setDone(false);
  }, []);

  const selectPreset = (i: number) => { setPresetIdx(i); setCount(0); setTotal(0); setRound(1); setDone(false); };

  // Progress arc
  const pct = target > 0 ? Math.min(count / target, 1) : 0;
  const R = 110, C = 2 * Math.PI * R;
  const dash = C * pct;

  return (
    <div style={{ minHeight: '100vh', background: NAVY, color: '#fff', direction: isRTL ? 'rtl' : 'ltr' }}>
      <SEO
        title="Tasbih Counter Online — Digital Tasbeeh for Dhikr | Al Ummah AI"
        description={L.seoDesc}
        keywords="tasbih online, tasbih counter, digital tasbih, tasbeeh counter, dhikr counter, subhanallah counter, online tasbeeh"
        canonical="https://www.alummahai.com/tasbih"
        schema={schema}
      />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#0a2540 0%,#060f1e 100%)', padding: 'clamp(80px,11vh,110px) clamp(16px,5vw,40px) 40px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.22)', borderRadius: 99, fontSize: '0.55rem', fontWeight: 800, color: GOLD, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 14, fontFamily: "'DM Sans',sans-serif" }}>
            📿 {L.badge}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(2rem,5.5vw,3.2rem)', color: '#fff', marginBottom: 10, letterSpacing: '-0.022em' }}>
            {L.title}
          </h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(0.85rem,2vw,1rem)', maxWidth: 480, margin: '0 auto' }}>
            {L.subtitle}
          </p>
        </motion.div>
      </div>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '0 clamp(14px,4vw,24px) 80px' }}>

        {/* Preset pills */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', padding: '28px 0 20px' }}>
          {L.presets.map((p: any, i: number) => (
            <button key={i} onClick={() => selectPreset(i)}
              style={{
                padding: '8px 16px', borderRadius: 99, border: `1px solid ${i === presetIdx ? GOLD : 'rgba(255,255,255,0.1)'}`,
                background: i === presetIdx ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.04)',
                color: i === presetIdx ? GOLD : 'rgba(255,255,255,0.55)',
                fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '0.75rem',
                cursor: 'pointer', transition: 'all 0.18s',
              }}>
              {p.label}
            </button>
          ))}
        </motion.div>

        {/* Main counter */}
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.5 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

          {/* SVG ring + tap button */}
          <div style={{ position: 'relative', width: 280, height: 280 }}>
            {/* Background ring glow */}
            <div style={{ position: 'absolute', inset: 20, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* Progress SVG */}
            <svg width="280" height="280" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
              <circle cx="140" cy="140" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <motion.circle
                cx="140" cy="140" r={R} fill="none"
                stroke="url(#goldGrad)" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${C}`}
                animate={{ strokeDasharray: `${dash} ${C}` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              />
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#F1D279" />
                </linearGradient>
              </defs>
            </svg>

            {/* Tap button */}
            <motion.button
              onClick={tap}
              animate={{ scale: pressed ? 0.94 : 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              whileHover={{ scale: 1.03 }}
              style={{
                position: 'absolute', inset: 28,
                borderRadius: '50%',
                background: flash
                  ? 'radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(6,15,30,0.95) 70%)'
                  : 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(6,15,30,0.97) 70%)',
                border: `2px solid ${flash ? 'rgba(212,175,55,0.5)' : 'rgba(212,175,55,0.18)'}`,
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 4, outline: 'none',
                boxShadow: flash ? '0 0 40px rgba(212,175,55,0.25), inset 0 0 30px rgba(212,175,55,0.05)' : '0 8px 32px rgba(0,0,0,0.4)',
                transition: 'background 0.18s, border-color 0.18s, box-shadow 0.18s',
                userSelect: 'none', WebkitTapHighlightColor: 'transparent',
              }}>

              {/* Arabic dhikr text */}
              <div style={{ fontFamily: "'Amiri',serif", fontSize: 'clamp(0.9rem,4vw,1.1rem)', color: GOLD, direction: 'rtl', lineHeight: 1.4, textAlign: 'center', padding: '0 12px' }}>
                {preset.arabic !== '∞' ? preset.arabic : '∞'}
              </div>

              {/* Counter number */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={count}
                  initial={{ opacity: 0, y: -12, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.8 }}
                  transition={{ duration: 0.18 }}
                  style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(2.8rem,10vw,3.8rem)', color: '#fff', lineHeight: 1 }}>
                  {count}
                </motion.div>
              </AnimatePresence>

              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.58rem', fontWeight: 800, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.22em', marginTop: 2 }}>
                {L.tap}
              </div>
            </motion.button>

            {/* Done overlay */}
            <AnimatePresence>
              {done && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  style={{ position: 'absolute', inset: 28, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', border: '2px solid rgba(34,197,94,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <Check size={32} style={{ color: '#22c55e' }} />
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', fontWeight: 800, color: '#22c55e', textAlign: 'center', padding: '0 10px' }}>{L.reached}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, width: '100%', marginTop: 20 }}>
            {[
              { label: L.target,  value: target > 0 ? target : '∞' },
              { label: L.total,   value: total },
              { label: L.round,   value: round },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '13px 10px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.52rem', fontWeight: 800, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 5 }}>{label}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: '1.4rem', color: GOLD }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 10, marginTop: 16, width: '100%' }}>
            <button onClick={() => setCount(c => Math.max(0, c - 1))}
              style={{ flex: 1, padding: '11px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}>
              <Minus size={16} />
            </button>
            <button onClick={reset}
              style={{ flex: 2, padding: '11px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: '0.73rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.09)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
              <RotateCcw size={13} /> {L.reset}
            </button>
            <button onClick={() => tap()}
              style={{ flex: 1, padding: '11px', borderRadius: 12, border: '1px solid rgba(212,175,55,0.3)', background: 'rgba(212,175,55,0.1)', color: GOLD, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.18)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(212,175,55,0.1)'}>
              <Plus size={16} />
            </button>
          </div>

          {/* Haptic toggle */}
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <button onClick={() => setHaptic(h => !h)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 99, border: `1px solid ${haptic ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.08)'}`, background: haptic ? 'rgba(212,175,55,0.08)' : 'rgba(255,255,255,0.03)', cursor: 'pointer', transition: 'all 0.18s' }}>
              <span style={{ fontSize: '0.85rem' }}>📳</span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', fontWeight: 700, color: haptic ? GOLD : 'rgba(255,255,255,0.35)' }}>{L.haptic} {haptic ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </motion.div>

        {/* Hadith card */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          style={{ marginTop: 44, background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: 16, padding: '20px 22px' }}>
          <div style={{ fontFamily: "'Amiri',serif", fontSize: '1rem', color: GOLD, direction: 'rtl', textAlign: 'center', marginBottom: 10, lineHeight: 1.6 }}>
            سُبْحَانَ اللهِ وَبِحَمْدِهِ، سُبْحَانَ اللهِ الْعَظِيمِ
          </div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, textAlign: isRTL ? 'right' : 'center' }}>
            {L.info}
          </p>
        </motion.div>

        {/* SEO text block */}
        <div style={{ marginTop: 40, padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: '1.1rem', color: '#fff', marginBottom: 10 }}>
            {lang === 'en' ? 'Free Online Tasbih Counter' : lang === 'ar' ? 'سبحة رقمية مجانية' : lang === 'fr' ? 'Compteur Tasbih Gratuit' : 'Contador Tasbih Gratuito'}
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.8 }}>
            {lang === 'en' ? 'Use this digital tasbih (tasbeeh) counter to track your daily dhikr. Count SubhanAllah (Glory be to Allah), Alhamdulillah (Praise be to Allah), and Allahu Akbar (Allah is the Greatest) — the three phrases traditionally recited 33 times after each prayer.' :
             lang === 'ar' ? 'استخدم هذا العداد الرقمي لتتبع ذكرك اليومي. عدّ سبحان الله والحمد لله والله أكبر — الأذكار الثلاثة التي تُقال ثلاثاً وثلاثين مرة بعد كل صلاة.' :
             lang === 'fr' ? 'Utilisez ce compteur tasbih numérique pour suivre votre dhikr quotidien. Comptez SubhanAllah, Alhamdulillah et Allahu Akbar — les trois phrases récitées traditionnellement 33 fois après chaque prière.' :
             'Usa este contador de tasbih digital para registrar tu dhikr diario. Cuenta SubhanAllah, Alhamdulillah y Allahu Akbar — las tres frases que se recitan 33 veces después de cada oración.'}
          </p>
        </div>
      </div>
    

      {/* Related Tools — Interlinking */}
      <RelatedTools exclude={["tasbih"]} max={6} />

    </div>
  );
}
