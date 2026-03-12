import React from 'react';
import { SEO } from '@/src/components/SEO';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Home, ShieldCheck, Calculator, ExternalLink, BookOpen, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NAVY = '#0a2540';
const GOLD = '#D4AF37';

const T: Record<string, any> = {
  en: {
    badge: 'Islamic Finance · Halal Wealth',
    title: 'Halal Money',
    quranVerse: '"Allah has permitted trade and has forbidden interest (Riba)." — Quran 2:275',
    sub: 'Grow your wealth the halal way. Sharia-compliant investing, Islamic mortgages, Sukuk and Zakat on investments — everything in one place.',
    ribaNoteH: 'What is Riba?',
    ribaNoteT: 'Riba (interest) is strictly forbidden in Islam. It covers all forms of guaranteed return regardless of outcome — conventional bank loans, credit cards, certain bonds. The alternative is profit-and-loss sharing (Mudarabah), leasing (Ijarah) and cost-plus financing (Murabahah).',
    investH: 'Halal Investing',
    investT: 'Sharia-compliant investing screens out haram sectors (alcohol, gambling, tobacco, weapons, pork, conventional banking) and avoids excessive leverage. Key platforms:',
    platforms: [
      { name:'Wahed Invest',  desc:'Global halal robo-advisor. Screened ETFs and sukuk portfolios. Available globally.',                          href:'https://wahedinvest.com',     tag:'Robo-advisor' },
      { name:'Zoya',          desc:'App to check if any US stock is halal. Scores companies on Sharia screening criteria.',                       href:'https://zoya.finance',        tag:'Stock screener' },
      { name:'Aghaz',         desc:'UK-focused halal investing. ISA-compatible. Ethically screened global portfolio.',                            href:'https://aghaz.co.uk',         tag:'UK · ISA' },
      { name:'Saturna Amana', desc:'US-based Islamic mutual funds since 1986. One of the oldest and most trusted halal funds.',                   href:'https://www.saturna.com',     tag:'Mutual funds' },
    ],
    mortgageH: 'Islamic Mortgages (UK)',
    mortgageT: 'Islamic mortgages (Home Purchase Plans / HPP) use Diminishing Musharakah or Ijarah — no interest, just co-ownership or leasing structures. Main UK providers:',
    banks: [
      { name:'Al Rayan Bank',    desc:'Largest Islamic bank in the UK. HPP, ISA and savings accounts — all Sharia-compliant.',  href:'https://www.alrayanbank.co.uk' },
      { name:'Gatehouse Bank',   desc:'UK HPP mortgages. Competitive rates. Fully FCA regulated and Sharia-certified.',          href:'https://www.gatehousebank.com' },
      { name:'StrideUp',         desc:'Modern Islamic mortgage provider. Digital-first. HPP for first-time buyers in the UK.',  href:'https://strideup.co' },
    ],
    sukukH: 'Sukuk Bonds',
    sukukT: 'Sukuk are Islamic bonds representing ownership in a real asset — not a debt obligation. They pay profit from the asset\'s performance, not interest. Available through Islamic investment platforms.',
    zakatH: 'Zakat on Investments',
    zakatItems: [
      { t:'Stocks (Trading Portfolio)', d:'If held for trading: Zakat on full market value. If held for dividends: Zakat on dividends received, not capital.' },
      { t:'Stocks (Long-term Hold)',    d:'Zakat on 25% of market value — representing liquid assets (cash, receivables) proportionally.' },
      { t:'Mutual Funds / ETFs',        d:'Check fund\'s liquid asset ratio. Most halal fund managers provide a Zakat purification ratio annually.' },
      { t:'Cryptocurrency',             d:'Scholars differ. Most contemporary fatwas say tradeable crypto is zakatable at market value if Nisab is reached.' },
    ],
    cryptoH: 'Is Crypto Halal?',
    cryptoT: 'Scholarly opinion is divided. The majority view treats Bitcoin and other major cryptocurrencies as permissible assets for trading (not currency speculation). Avoid: staking that earns guaranteed interest-like returns, DeFi lending, margin trading. Consult your local scholar.',
    zakatCta: 'Calculate Your Zakat',
    disclaimer: 'This content is for educational purposes only. It is not financial or Sharia legal advice. Please consult a qualified Islamic finance scholar and financial advisor for your specific situation.',
  },
  ar: {
    badge: 'التمويل الإسلامي · الثروة الحلال',
    title: 'المال الحلال',
    quranVerse: '«وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا» — القرآن الكريم 2:275',
    sub: 'نمّ ثروتك بالطريق الحلال. الاستثمار المتوافق مع الشريعة والرهن الإسلامي والصكوك وزكاة الاستثمارات — كل شيء في مكان واحد.',
    ribaNoteH: 'ما هو الربا؟',
    ribaNoteT: 'الربا محرم قطعاً في الإسلام. يشمل جميع أشكال العوائد المضمونة بغض النظر عن النتيجة — القروض البنكية التقليدية وبطاقات الائتمان وبعض السندات. البديل هو المضاربة والإجارة والمرابحة.',
    investH: 'الاستثمار الحلال',
    investT: 'يستبعد الاستثمار المتوافق مع الشريعة القطاعات المحرمة (الكحول، القمار، التبغ، الأسلحة، لحم الخنزير، البنوك التقليدية) ويتجنب الرافعة المالية المفرطة. المنصات الرئيسية:',
    platforms: [
      { name:'Wahed Invest',  desc:'مستشار روبوت حلال عالمي. صناديق استثمار وصكوك مفحوصة. متاح عالمياً.',            href:'https://wahedinvest.com',     tag:'روبو-أدفايزر' },
      { name:'Zoya',          desc:'تطبيق للتحقق من حلية أي سهم أمريكي. يقيّم الشركات وفق معايير الشريعة.',            href:'https://zoya.finance',        tag:'فاحص أسهم' },
      { name:'Aghaz',         desc:'استثمار حلال بتركيز بريطاني. متوافق مع حساب ISA. محفظة عالمية مفحوصة أخلاقياً.',  href:'https://aghaz.co.uk',         tag:'UK · ISA' },
      { name:'Saturna Amana', desc:'صناديق استثمار إسلامية أمريكية منذ 1986. من أقدم وأوثق الصناديق الحلال.',          href:'https://www.saturna.com',     tag:'صناديق استثمار' },
    ],
    mortgageH: 'الرهن الإسلامي (المملكة المتحدة)',
    mortgageT: 'تستخدم الرهون الإسلامية المشاركة المتناقصة أو الإجارة — لا فائدة، فقط هياكل المشاركة في الملكية. المزودون الرئيسيون في المملكة المتحدة:',
    banks: [
      { name:'Al Rayan Bank',    desc:'أكبر بنك إسلامي في المملكة المتحدة. تمويل منازل وحسابات توفير إسلامية.',          href:'https://www.alrayanbank.co.uk' },
      { name:'Gatehouse Bank',   desc:'رهون منازل إسلامية بالمملكة المتحدة. معدلات تنافسية. خاضع لرقابة FCA وشريعة.',   href:'https://www.gatehousebank.com' },
      { name:'StrideUp',         desc:'مزود رهن إسلامي رقمي حديث. لمشتري المنازل لأول مرة في المملكة المتحدة.',         href:'https://strideup.co' },
    ],
    sukukH: 'الصكوك',
    sukukT: 'الصكوك سندات إسلامية تمثل ملكية في أصل حقيقي — لا التزاماً بالدين. تدفع أرباحاً من أداء الأصل، ليس فائدة. متاحة عبر منصات الاستثمار الإسلامي.',
    zakatH: 'زكاة الاستثمارات',
    zakatItems: [
      { t:'الأسهم (محفظة تداول)',    d:'إذا كانت للتداول: الزكاة على القيمة السوقية الكاملة. إذا كانت للأرباح: الزكاة على الأرباح المستلمة.' },
      { t:'الأسهم (حيازة طويلة)',   d:'الزكاة على 25% من القيمة السوقية — تمثل الأصول السائلة (النقد، الذمم المدينة) بالتناسب.' },
      { t:'الصناديق / صناديق المؤشرات', d:'تحقق من نسبة الأصول السائلة للصندوق. معظم مديري الصناديق يقدمون نسبة تطهير الزكاة سنوياً.' },
      { t:'العملات المشفرة',          d:'العلماء مختلفون. معظم الفتاوى المعاصرة تقول إن العملات المشفرة القابلة للتداول تجب فيها الزكاة بالقيمة السوقية.' },
    ],
    cryptoH: 'هل العملات المشفرة حلال؟',
    cryptoT: 'الرأي العلمي منقسم. الموقف الغالب يعامل البيتكوين وكبار العملات المشفرة بوصفها أصولاً جائزة للتداول (لا للمضاربة). تجنب: التكديس بعوائد شبيهة بالفائدة، وإقراض التمويل اللامركزي، والتداول بالهامش. استشر عالمك المحلي.',
    zakatCta: 'احسب زكاتك',
    disclaimer: 'هذا المحتوى لأغراض تعليمية فقط. ليس استشارة مالية أو شرعية. يرجى استشارة عالم متخصص في التمويل الإسلامي ومستشار مالي لحالتك الخاصة.',
  },
  fr: {
    badge: 'Finance Islamique · Richesse Halal',
    title: 'Argent Halal',
    quranVerse: '"Allah a permis le commerce et a interdit l\'intérêt (Riba)." — Coran 2:275',
    sub: 'Faites fructifier votre patrimoine de manière halal. Investissement conforme à la charia, hypothèques islamiques, Sukuk et Zakat sur les investissements — tout en un seul endroit.',
    ribaNoteH: 'Qu\'est-ce que le Riba ?',
    ribaNoteT: 'Le Riba (intérêt) est strictement interdit en Islam. Il couvre toutes les formes de rendement garanti — prêts bancaires conventionnels, cartes de crédit, certaines obligations. L\'alternative : partage profits/pertes (Mudarabah), location (Ijarah) et financement coût-plus (Murabahah).',
    investH: 'Investissement Halal',
    investT: 'L\'investissement conforme à la charia exclut les secteurs haram (alcool, jeux, tabac, armes, porc, banques conventionnelles) et évite l\'effet de levier excessif. Principales plateformes :',
    platforms: [
      { name:'Wahed Invest',  desc:'Robo-advisor halal mondial. Portefeuilles ETF et Sukuk sélectionnés. Disponible mondialement.',  href:'https://wahedinvest.com',     tag:'Robo-advisor' },
      { name:'Zoya',          desc:'Application pour vérifier si une action américaine est halal. Note les entreprises.',             href:'https://zoya.finance',        tag:'Analyseur d\'actions' },
      { name:'Aghaz',         desc:'Investissement halal centré sur le Royaume-Uni. Compatible avec le compte ISA.',                 href:'https://aghaz.co.uk',         tag:'UK · ISA' },
      { name:'Saturna Amana', desc:'Fonds communs islamiques américains depuis 1986. L\'un des plus anciens fonds halal.',           href:'https://www.saturna.com',     tag:'Fonds communs' },
    ],
    mortgageH: 'Hypothèques Islamiques (UK)',
    mortgageT: 'Les hypothèques islamiques utilisent la Musharakah Dégressive ou l\'Ijarah — pas d\'intérêt, seulement des structures de copropriété ou de location. Principaux prestataires au Royaume-Uni :',
    banks: [
      { name:'Al Rayan Bank',    desc:'La plus grande banque islamique au Royaume-Uni. HPP et comptes d\'épargne conformes à la charia.',  href:'https://www.alrayanbank.co.uk' },
      { name:'Gatehouse Bank',   desc:'Hypothèques HPP au Royaume-Uni. Taux compétitifs. Entièrement réglementé FCA.',                    href:'https://www.gatehousebank.com' },
      { name:'StrideUp',         desc:'Prestataire d\'hypothèque islamique moderne et numérique. Pour primo-accédants au Royaume-Uni.',   href:'https://strideup.co' },
    ],
    sukukH: 'Obligations Sukuk',
    sukukT: 'Les Sukuk sont des obligations islamiques représentant la propriété d\'un actif réel — pas une dette. Ils versent des bénéfices sur les performances de l\'actif, pas des intérêts.',
    zakatH: 'Zakat sur les Investissements',
    zakatItems: [
      { t:'Actions (Portefeuille de Trading)', d:'Si détenues pour le trading : Zakat sur la valeur marchande totale. Si pour les dividendes : Zakat sur les dividendes reçus.' },
      { t:'Actions (Détention Long Terme)',    d:'Zakat sur 25% de la valeur marchande — représentant les actifs liquides (cash, créances) proportionnellement.' },
      { t:'Fonds Communs / ETF',               d:'Vérifiez le ratio d\'actifs liquides du fonds. La plupart des gestionnaires halal fournissent un ratio de purification annuellement.' },
      { t:'Cryptomonnaies',                    d:'Les savants sont divisés. La plupart des fatwas contemporaines considèrent les cryptos échangeables comme zakatable à la valeur marchande.' },
    ],
    cryptoH: 'La Crypto est-elle Halal ?',
    cryptoT: 'L\'opinion savante est divisée. La majorité traite Bitcoin et les principales cryptomonnaies comme des actifs permis pour le trading. Évitez : le staking générant des rendements de type intérêt, le prêt DeFi, le trading sur marge. Consultez votre savant local.',
    zakatCta: 'Calculer Votre Zakat',
    disclaimer: 'Ce contenu est à des fins éducatives uniquement. Ce n\'est pas un conseil financier ou légal islamique. Consultez un savant qualifié en finance islamique pour votre situation spécifique.',
  },
  es: {
    badge: 'Finanzas Islámicas · Riqueza Halal',
    title: 'Dinero Halal',
    quranVerse: '"Allah ha permitido el comercio y ha prohibido el interés (Riba)." — Corán 2:275',
    sub: 'Haz crecer tu riqueza de forma halal. Inversión conforme a la sharia, hipotecas islámicas, Sukuk y Zakat sobre inversiones — todo en un solo lugar.',
    ribaNoteH: '¿Qué es el Riba?',
    ribaNoteT: 'El Riba (interés) está estrictamente prohibido en el Islam. Cubre todas las formas de retorno garantizado — préstamos bancarios convencionales, tarjetas de crédito, ciertos bonos. La alternativa: reparto de ganancias/pérdidas (Mudarabah), arrendamiento (Ijarah) y financiación a precio de coste más margen (Murabahah).',
    investH: 'Inversión Halal',
    investT: 'La inversión conforme a la sharia excluye sectores haram (alcohol, juego, tabaco, armas, cerdo, banca convencional) y evita el apalancamiento excesivo. Plataformas principales:',
    platforms: [
      { name:'Wahed Invest',  desc:'Robo-asesor halal global. Carteras de ETFs y sukuk seleccionadas. Disponible globalmente.',   href:'https://wahedinvest.com',     tag:'Robo-asesor' },
      { name:'Zoya',          desc:'App para verificar si una acción americana es halal. Puntúa empresas con criterios sharia.',  href:'https://zoya.finance',        tag:'Analizador de acciones' },
      { name:'Aghaz',         desc:'Inversión halal centrada en el Reino Unido. Compatible con ISA.',                             href:'https://aghaz.co.uk',         tag:'UK · ISA' },
      { name:'Saturna Amana', desc:'Fondos de inversión islámicos estadounidenses desde 1986. Uno de los fondos halal más antiguos.',  href:'https://www.saturna.com', tag:'Fondos mutuos' },
    ],
    mortgageH: 'Hipotecas Islámicas (UK)',
    mortgageT: 'Las hipotecas islámicas usan Musharakah Decreciente o Ijarah — sin interés, solo estructuras de co-propiedad o arrendamiento. Principales proveedores en el Reino Unido:',
    banks: [
      { name:'Al Rayan Bank',    desc:'El banco islámico más grande del Reino Unido. HPP y cuentas de ahorro conformes a la sharia.',  href:'https://www.alrayanbank.co.uk' },
      { name:'Gatehouse Bank',   desc:'Hipotecas HPP en el Reino Unido. Tasas competitivas. Regulado por FCA y certificado sharia.',   href:'https://www.gatehousebank.com' },
      { name:'StrideUp',         desc:'Proveedor de hipotecas islámicas moderno y digital. Para compradores primerizos en el Reino Unido.',  href:'https://strideup.co' },
    ],
    sukukH: 'Bonos Sukuk',
    sukukT: 'Los Sukuk son bonos islámicos que representan la propiedad de un activo real — no una obligación de deuda. Pagan beneficios del rendimiento del activo, no intereses.',
    zakatH: 'Zakat sobre Inversiones',
    zakatItems: [
      { t:'Acciones (Cartera de Trading)',   d:'Si se mantienen para trading: Zakat sobre el valor total de mercado. Si para dividendos: Zakat sobre dividendos recibidos.' },
      { t:'Acciones (Tenencia a Largo Plazo)', d:'Zakat sobre el 25% del valor de mercado — representando activos líquidos (efectivo, cuentas por cobrar) proporcionalmente.' },
      { t:'Fondos Mutuos / ETFs',             d:'Verifica la proporción de activos líquidos del fondo. La mayoría de los gestores halal proporcionan una ratio de purificación anualmente.' },
      { t:'Criptomonedas',                    d:'Los estudiosos están divididos. La mayoría de las fatwas contemporáneas consideran las criptos negociables como sujetas a Zakat a valor de mercado.' },
    ],
    cryptoH: '¿Es el Cripto Halal?',
    cryptoT: 'La opinión académica está dividida. La mayoría trata Bitcoin y las principales criptomonedas como activos permisibles para trading. Evitar: staking que genera retornos tipo interés, préstamos DeFi, trading con margen. Consulta a tu estudioso local.',
    zakatCta: 'Calcular Tu Zakat',
    disclaimer: 'Este contenido es solo con fines educativos. No es asesoramiento financiero o legal islámico. Consulta a un experto en finanzas islámicas calificado para tu situación específica.',
  },
};

export function HalalMoneyPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.slice(0,2) || 'en') as keyof typeof T;
  const L = T[lang] || T.en;
  const isRTL = lang === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background: NAVY, minHeight:'100vh', color:'#fff' }}>
      <SEO title={`${L.title} — Islamic Finance | Al Ummah AI`} description={L.sub} keywords="halal money, islamic finance, halal investment apps, islamic mortgage, sharia compliant investing, zakat on stocks, sukuk bonds" canonical="https://www.alummahai.com/halal-money" lang={lang} />

      {/* Hero */}
      <div style={{ background:'linear-gradient(160deg,#071a2e 0%,#0a2540 55%,#0d2e4d 100%)', borderBottom:'1px solid rgba(212,175,55,0.12)', padding:'clamp(80px,12vw,120px) 20px clamp(44px,6vw,60px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(212,175,55,0.06) 1px,transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none' }} />
        <div style={{ position:'relative', zIndex:1 }}>
          <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }}
            style={{ display:'inline-block', padding:'4px 14px', background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.22)', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.52rem', fontWeight:900, color:GOLD, textTransform:'uppercase', letterSpacing:'0.24em', marginBottom:16 }}>
            💰 {L.badge}
          </motion.div>
          <motion.h1 initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.08 }}
            style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(2.2rem,7vw,4.5rem)', color:'#fff', letterSpacing:'-0.03em', marginBottom:14, lineHeight:1 }}>{L.title}</motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.18 }}
            style={{ fontFamily:"'Amiri',serif", fontSize:'clamp(0.9rem,2vw,1.1rem)', color:GOLD, direction: isRTL ? 'rtl' : 'ltr', maxWidth:520, margin:'0 auto 10px', fontStyle:'italic', lineHeight:1.8 }}>{L.quranVerse}</motion.p>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.22 }}
            style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'clamp(0.82rem,1.6vw,0.94rem)', color:'rgba(255,255,255,0.38)', maxWidth:500, margin:'0 auto', lineHeight:1.9 }}>{L.sub}</motion.p>
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:'0 auto', padding:'clamp(32px,5vw,56px) 20px' }}>

        {/* Riba explainer */}
        <div style={{ background:'rgba(239,68,68,0.06)', border:'1px solid rgba(239,68,68,0.18)', borderRadius:16, padding:'18px 20px', display:'flex', gap:14, marginBottom:44 }}>
          <AlertCircle size={18} style={{ color:'#f87171', flexShrink:0, marginTop:2 }} />
          <div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.84rem', color:'#f87171', marginBottom:6 }}>{L.ribaNoteH}</div>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.76rem', color:'rgba(255,255,255,0.5)', lineHeight:1.8 }}>{L.ribaNoteT}</p>
          </div>
        </div>

        {/* Investing */}
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.3rem,3vw,1.9rem)', color:'#fff', marginBottom:8 }}>{L.investH}</h2>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.82rem', color:'rgba(255,255,255,0.4)', lineHeight:1.8, marginBottom:18 }}>{L.investT}</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:12, marginBottom:48 }}>
          {L.platforms.map(({ name, desc, href, tag }: any) => (
            <a key={name} href={href} target="_blank" rel="noopener noreferrer"
              style={{ textDecoration:'none', display:'flex', flexDirection:'column', gap:10, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'18px', transition:'all 0.2s' }}
              onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(212,175,55,0.35)'; el.style.background='rgba(212,175,55,0.04)'; }}
              onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(255,255,255,0.07)'; el.style.background='rgba(255,255,255,0.03)'; }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.9rem', color:'#fff' }}>{name}</span>
                <span style={{ padding:'2px 8px', background:'rgba(212,175,55,0.12)', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.5rem', fontWeight:900, color:GOLD, textTransform:'uppercase', letterSpacing:'0.12em' }}>{tag}</span>
              </div>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.72rem', color:'rgba(255,255,255,0.4)', lineHeight:1.75, flex:1 }}>{desc}</p>
              <div style={{ display:'flex', alignItems:'center', gap:5, fontFamily:"'DM Sans',sans-serif", fontSize:'0.6rem', fontWeight:700, color:GOLD }}>
                Visit <ExternalLink size={10} />
              </div>
            </a>
          ))}
        </div>

        {/* Mortgages */}
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.3rem,3vw,1.9rem)', color:'#fff', marginBottom:8 }}>{L.mortgageH}</h2>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.82rem', color:'rgba(255,255,255,0.4)', lineHeight:1.8, marginBottom:18 }}>{L.mortgageT}</p>
        <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:48 }}>
          {L.banks.map(({ name, desc, href }: any) => (
            <a key={name} href={href} target="_blank" rel="noopener noreferrer"
              style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:14, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'16px 20px', transition:'all 0.2s' }}
              onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(212,175,55,0.3)'; el.style.background='rgba(212,175,55,0.04)'; }}
              onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(255,255,255,0.07)'; el.style.background='rgba(255,255,255,0.03)'; }}>
              <Home size={16} style={{ color:GOLD, flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.86rem', color:'#fff', marginBottom:3 }}>{name}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.72rem', color:'rgba(255,255,255,0.38)', lineHeight:1.6 }}>{desc}</div>
              </div>
              <ExternalLink size={13} style={{ color:'rgba(212,175,55,0.4)', flexShrink:0 }} />
            </a>
          ))}
        </div>

        {/* Sukuk */}
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.3rem,3vw,1.9rem)', color:'#fff', marginBottom:8 }}>{L.sukukH}</h2>
        <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'18px 20px', marginBottom:48 }}>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.82rem', color:'rgba(255,255,255,0.45)', lineHeight:1.85 }}>{L.sukukT}</p>
        </div>

        {/* Zakat on investments */}
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.3rem,3vw,1.9rem)', color:'#fff', marginBottom:16 }}>{L.zakatH}</h2>
        <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:24 }}>
          {L.zakatItems.map(({ t, d }: any) => (
            <div key={t} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'16px 20px', display:'flex', gap:14 }}>
              <Calculator size={15} style={{ color:GOLD, flexShrink:0, marginTop:2 }} />
              <div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.84rem', color:'#fff', marginBottom:4 }}>{t}</div>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.74rem', color:'rgba(255,255,255,0.4)', lineHeight:1.75 }}>{d}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <Link to="/zakat" style={{ display:'inline-flex', alignItems:'center', gap:7, background:GOLD, color:NAVY, padding:'11px 24px', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.72rem', textDecoration:'none', textTransform:'uppercase', letterSpacing:'0.1em', boxShadow:'0 4px 18px rgba(212,175,55,0.28)' }}>
            {L.zakatCta} →
          </Link>
        </div>

        {/* Crypto */}
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.3rem,3vw,1.9rem)', color:'#fff', marginBottom:8 }}>{L.cryptoH}</h2>
        <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'18px 20px', marginBottom:40 }}>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.82rem', color:'rgba(255,255,255,0.45)', lineHeight:1.85 }}>{L.cryptoT}</p>
        </div>

        {/* Disclaimer */}
        <div style={{ background:'rgba(212,175,55,0.05)', border:'1px solid rgba(212,175,55,0.14)', borderRadius:12, padding:'14px 18px' }}>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.68rem', color:'rgba(255,255,255,0.28)', lineHeight:1.8, fontStyle:'italic' }}>{L.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}
