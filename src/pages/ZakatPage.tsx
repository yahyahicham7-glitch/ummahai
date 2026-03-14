import React, { useState, useEffect } from 'react';
import { Calculator, Info, DollarSign, Coins, TrendingDown, RefreshCw } from 'lucide-react';
import { SEO } from '@/src/components/SEO';
import { RelatedTools } from '@/src/components/RelatedTools';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

const NAVY  = '#0a2540';
const NAVY2 = '#0d2e4d';
const GOLD  = '#D4AF37';

/* ── Translations ─────────────────────────────────────────── */
const T = {
  en: {
    title: 'Zakat Calculator', sub: 'Purify Your Wealth · 2.5% Obligation',
    desc: 'Fulfill your sacred obligation with precision. Calculate Zakat based on authentic scholarly guidelines.',
    nisabTitle: 'Nisab Threshold 2026',
    nisabDesc: 'Zakat is only due if your net wealth exceeds the Nisab threshold for a full lunar year. Current Nisab ≈',
    nisabBased: 'Based on 87.48g of gold',
    due: 'Zakat is Due', below: 'Below Nisab',
    total: 'Total Net Wealth', zakatDue: 'Zakat Due (2.5%)',
    cash: 'Cash & Bank Balances', gold: 'Gold & Silver (Market Value)',
    invest: 'Investments & Stocks', biz: 'Business Assets', debts: 'Liabilities & Debts',
    purif: 'Spiritual Purification', purifQ: '"Take from their wealth a charity by which you purify them and cause them increase." (Quran 9:103)',
    social: 'Social Solidarity', socialD: 'Zakat bridges the gap between rich and poor, fostering a compassionate and balanced society.',
    impact: 'The Impact of Giving',
  },
  ar: {
    title: 'حاسبة الزكاة', sub: 'طهّر مالك · الواجب 2.5٪',
    desc: 'أدّ فريضتك بدقة. احسب زكاتك وفق الإرشادات الفقهية الأصيلة.',
    nisabTitle: 'نصاب الزكاة 2026',
    nisabDesc: 'لا تجب الزكاة إلا إذا بلغ صافي الثروة النصاب لمدة حول قمري كامل. النصاب الحالي تقريبًا',
    nisabBased: 'على أساس 87.48 غرام من الذهب',
    due: 'الزكاة واجبة', below: 'دون النصاب',
    total: 'إجمالي الثروة الصافية', zakatDue: 'الزكاة الواجبة (2.5٪)',
    cash: 'النقد والأرصدة البنكية', gold: 'الذهب والفضة (القيمة السوقية)',
    invest: 'الاستثمارات والأسهم', biz: 'أصول الأعمال', debts: 'الخصوم والديون',
    purif: 'التزكية الروحية', purifQ: '«خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا» (التوبة:103)',
    social: 'التضامن الاجتماعي', socialD: 'تجسر الزكاة الهوة بين الغني والفقير وتبني مجتمعاً عادلاً ومتراحماً.',
    impact: 'أثر العطاء',
  },
  fr: {
    title: 'Calculateur de Zakat', sub: 'Purifiez Votre Richesse · Obligation 2,5%',
    desc: 'Remplissez votre obligation sacrée avec précision. Calculez votre Zakat selon les directives islamiques authentiques.',
    nisabTitle: 'Seuil Nisab 2026',
    nisabDesc: 'La Zakat n\'est due que si votre patrimoine net dépasse le Nisab pendant une année lunaire complète. Nisab actuel ≈',
    nisabBased: 'Basé sur 87,48g d\'or',
    due: 'Zakat due', below: 'Sous le Nisab',
    total: 'Patrimoine Net Total', zakatDue: 'Zakat Due (2,5%)',
    cash: 'Liquidités & Comptes', gold: 'Or & Argent (Valeur marchande)',
    invest: 'Investissements & Actions', biz: 'Actifs commerciaux', debts: 'Dettes & Passifs',
    purif: 'Purification Spirituelle', purifQ: '«Prélève de leurs biens une aumône par laquelle tu les purifies.» (Coran 9:103)',
    social: 'Solidarité Sociale', socialD: 'La Zakat comble le fossé entre riches et pauvres, favorisant une société juste et compatissante.',
    impact: 'L\'Impact du Don',
  },
  es: {
    title: 'Calculadora de Zakat', sub: 'Purifica tu Riqueza · Obligación del 2,5%',
    desc: 'Cumple tu obligación sagrada con precisión. Calcula tu Zakat según las directrices islámicas auténticas.',
    nisabTitle: 'Umbral Nisab 2026',
    nisabDesc: 'El Zakat solo es obligatorio si tu patrimonio neto supera el Nisab durante un año lunar completo. Nisab actual ≈',
    nisabBased: 'Basado en 87,48g de oro',
    due: 'Zakat obligatorio', below: 'Por debajo del Nisab',
    total: 'Patrimonio Neto Total', zakatDue: 'Zakat Debido (2,5%)',
    cash: 'Efectivo y Cuentas', gold: 'Oro y Plata (Valor de mercado)',
    invest: 'Inversiones y Acciones', biz: 'Activos Comerciales', debts: 'Deudas y Pasivos',
    purif: 'Purificación Espiritual', purifQ: '«Toma de sus bienes una limosna con la que los purifiques.» (Corán 9:103)',
    social: 'Solidaridad Social', socialD: 'El Zakat reduce la brecha entre ricos y pobres, fomentando una sociedad justa y compasiva.',
    impact: 'El Impacto de Dar',
  },
};

export function ZakatPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.slice(0, 2) || 'en') as keyof typeof T;
  const L = T[lang] || T.en;
  const isRTL = lang === 'ar';

  const [wealth, setWealth] = useState({ cash: 0, gold: 0, investments: 0, business: 0, debts: 0 });
  const [goldPrice, setGoldPrice] = useState<number|null>(null);
  const [goldLoading, setGoldLoading] = useState(true);
  const total    = wealth.cash + wealth.gold + wealth.investments + wealth.business - wealth.debts;
  const NISAB_GRAMS = 87.48;
  const NISAB    = goldPrice ? Math.round(goldPrice * NISAB_GRAMS) : 6000;
  const zakatDue = Math.max(total, 0) * 0.025;

  // Fetch live gold price
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('https://api.metalpriceapi.com/v1/latest?api_key=demo&base=USD&currencies=XAU');
        const j = await r.json();
        if (j?.rates?.XAU) { setGoldPrice(Math.round(1 / j.rates.XAU)); }
      } catch {
        // Fallback: try alternative free API
        try {
          const r2 = await fetch('https://api.gold-api.com/price/XAU');
          const j2 = await r2.json();
          if (j2?.price) { setGoldPrice(Math.round(j2.price)); }
        } catch {
          // Use fallback estimate
          setGoldPrice(null);
        }
      }
      setGoldLoading(false);
    })();
  }, []);

  const zakatSchema = [
    {
      '@context': 'https://schema.org', '@type': 'FinancialService',
      name: 'Al Ummah AI Zakat Calculator',
      description: 'Free Islamic Zakat calculator with live gold prices and Nisab threshold. Calculate your annual Zakat obligation.',
      url: 'https://www.alummahai.com/zakat',
      provider: { '@type': 'Organization', name: 'Al Ummah AI', url: 'https://www.alummahai.com' },
      areaServed: 'Worldwide',
      serviceType: 'Zakat Calculation',
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is Nisab for Zakat in 2026?', acceptedAnswer: { '@type': 'Answer', text: `Nisab is the minimum wealth threshold for Zakat. It equals 87.48 grams of gold or 612.36 grams of silver. At current gold prices, Nisab is approximately $${NISAB.toLocaleString()} USD.` }},
        { '@type': 'Question', name: 'How much is Zakat?', acceptedAnswer: { '@type': 'Answer', text: 'Zakat is 2.5% of your total eligible wealth that has been held for one full lunar year above the Nisab threshold.' }},
        { '@type': 'Question', name: 'What wealth is Zakatable?', acceptedAnswer: { '@type': 'Answer', text: 'Zakatable wealth includes: cash savings, gold and silver, investments and stocks, business inventory, and debts owed to you. Personal items like your home, car, and clothing are exempt.' }},
      ]
    }
  ];

  const inp = (key: keyof typeof wealth) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setWealth(w => ({ ...w, [key]: Number(e.target.value) || 0 }));

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background: NAVY, minHeight: '100vh', color: '#ffffff' }}>
      <SEO title={L.title} description={L.desc} keywords="zakat calculator, nisab 2026, islamic charity" schema={zakatSchema} canonical="https://www.alummahai.com/zakat" lang={lang} />

      {/* ── Hero ── */}
      <div style={{
        background: `linear-gradient(160deg, ${NAVY} 0%, ${NAVY2} 100%)`,
        borderBottom: '1px solid rgba(212,175,55,0.15)',
        padding: 'clamp(80px,12vw,120px) 20px clamp(40px,6vw,60px)',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(212,175,55,0.06) 1px,transparent 1px)', backgroundSize: '30px 30px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontSize: '0.52rem', fontWeight: 900, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.24em', marginBottom: 16 }}>
            ✦ {L.sub}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(2rem,6vw,4rem)', color: '#ffffff', marginBottom: 14, letterSpacing: '-0.02em' }}>
            {L.title}
          </h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem,1.8vw,1rem)', color: 'rgba(255,255,255,0.45)', maxWidth: 440, margin: '0 auto', lineHeight: 1.8 }}>
            {L.desc}
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(32px,5vw,60px) 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 28, alignItems: 'start' }}>

        {/* Left — Nisab info + impact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Nisab card */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 18, padding: 'clamp(18px,3vw,28px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <Info size={18} style={{ color: GOLD, flexShrink: 0 }} />
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: '1.1rem', color: '#ffffff' }}>{L.nisabTitle}</h3>
            </div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.84rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: 14 }}>
              {L.nisabDesc} <span style={{ color: GOLD, fontWeight: 800 }}>${NISAB.toLocaleString()}</span>
              {goldPrice && <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.6rem', color: '#22c55e', marginLeft: 8 }}>● Live</span>}
              {goldLoading && <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', marginLeft: 8 }}>Loading...</span>}
            </p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.62rem', color: 'rgba(212,175,55,0.5)', fontStyle: 'italic' }}>
              {L.nisabBased} {goldPrice ? ` · Gold: $${goldPrice}/oz` : ' · Estimated'}
            </p>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(212,175,55,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.52rem', fontWeight: 900, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Status</span>
              <span style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: '0.62rem', fontWeight: 800,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                padding: '4px 12px', borderRadius: 99,
                background: total >= NISAB ? 'rgba(34,197,94,0.1)' : 'rgba(212,175,55,0.08)',
                border: `1px solid ${total >= NISAB ? 'rgba(34,197,94,0.3)' : 'rgba(212,175,55,0.2)'}`,
                color: total >= NISAB ? '#22c55e' : GOLD,
              }}>
                {total >= NISAB ? L.due : L.below}
              </span>
            </div>
          </motion.div>

          {/* Impact */}
          <div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: '1.2rem', color: '#ffffff', marginBottom: 14 }}>{L.impact}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[{ t: L.purif, d: L.purifQ }, { t: L.social, d: L.socialD }].map(item => (
                <div key={item.t} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '16px 18px', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}>
                  <h4 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.6rem', fontWeight: 900, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 8 }}>{item.t}</h4>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Calculator */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 20, padding: 'clamp(20px,4vw,36px)', position: 'sticky', top: 80 }}>

          <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: '1.15rem', color: '#ffffff', marginBottom: 24 }}>Calculate</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
            {[
              { label: L.cash,   key: 'cash' as const,        Icon: DollarSign },
              { label: L.gold,   key: 'gold' as const,        Icon: Coins      },
              { label: L.invest, key: 'investments' as const, Icon: Calculator },
              { label: L.biz,    key: 'business' as const,    Icon: Calculator },
              { label: L.debts,  key: 'debts' as const,       Icon: TrendingDown, neg: true },
            ].map(({ label, key, Icon, neg }) => (
              <div key={key}>
                <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.58rem', fontWeight: 900, color: 'rgba(212,175,55,0.6)', textTransform: 'uppercase', letterSpacing: '0.18em', display: 'block', marginBottom: 6 }}>
                  {label}
                </label>
                <div style={{ position: 'relative' }}>
                  <Icon size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: neg ? 'rgba(248,113,113,0.6)' : 'rgba(212,175,55,0.5)', pointerEvents: 'none' }} />
                  <input
                    type="number" value={wealth[key] || ''} onChange={inp(key)} placeholder="0.00"
                    style={{
                      width: '100%', background: 'rgba(10,37,64,0.5)', border: '1px solid rgba(212,175,55,0.15)',
                      borderRadius: 12, padding: '12px 14px 12px 42px',
                      fontFamily: "'DM Sans',sans-serif", fontSize: '1rem', color: '#ffffff',
                      outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(212,175,55,0.5)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(212,175,55,0.15)')}
                  />
                  {neg && <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#f87171', fontWeight: 900, fontSize: '1rem' }}>−</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Results */}
          <div style={{ borderTop: '1px solid rgba(212,175,55,0.15)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.62rem', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{L.total}</span>
              <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: '1.5rem', color: '#ffffff' }}>
                ${Math.max(total, 0).toLocaleString()}
              </span>
            </div>
            <div style={{ background: `linear-gradient(120deg,${GOLD},#F1D279)`, borderRadius: 16, padding: '20px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.55rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(10,37,64,0.55)', marginBottom: 4 }}>{L.zakatDue}</p>
                <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.6rem,4vw,2.2rem)', color: NAVY }}>
                  ${zakatDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div style={{ fontSize: '2rem' }}>💛</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Tools — Interlinking */}
      <RelatedTools exclude={['zakat']} max={6} />
    </div>
  );
}
