import React, { useState } from 'react';
import { SEO } from '@/src/components/SEO';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ShoppingBag, Star, Heart, ExternalLink, Tag, Shield, Truck, ArrowRight } from 'lucide-react';

const NAVY = '#0a2540';
const NAVY2 = '#0d2e4d';
const GOLD = '#D4AF37';

const T: Record<string, any> = {
  en: {
    badge: 'Islamic Store · Curated Products',
    title: 'Islamic Store',
    sub: 'Curated halal products for the modern Muslim — prayer essentials, Quran, home décor and more. All items are affiliate links to trusted retailers.',
    comingH: 'Coming Soon — Direct Shop',
    comingSub: 'We\'re building a curated Islamic store. For now, these are affiliate links to the best products from trusted retailers. You pay nothing extra.',
    cats: { all:'All', prayer:'Prayer', books:'Books', fragrance:'Fragrance', home:'Home', wellness:'Wellness' },
    catAll: 'All',
    viewBtn: 'View Product',
    affiliateNote: '* Affiliate links. Purchasing through them supports Al Ummah AI at no extra cost to you.',
    whyH: 'Why Shop Halal?',
    why: [
      { Icon: Shield,   t: 'Verified Halal',      d: 'Every product is screened for halal compliance. No interest-based transactions.' },
      { Icon: Star,     t: 'Quality Curated',     d: 'Hand-picked by our team from trusted Islamic suppliers and retailers worldwide.' },
      { Icon: Truck,    t: 'Global Shipping',     d: 'Our partner retailers ship worldwide. Most offer free delivery above a threshold.' },
      { Icon: Heart,    t: 'Support the Ummah',   d: 'Part of affiliate revenue goes back into maintaining Al Ummah AI free for all.' },
    ],
    digitalH: 'Free Digital Resources',
    digitalSub: 'Download these free Islamic resources — no signup required.',
    digital: [
      { e:'🕌', t:'Ramadan 2026 Planner', d:'A printable day-by-day Ramadan schedule with Suhoor/Iftar times template.', tag:'PDF · Free' },
      { e:'🤲', t:'Daily Duas Booklet',   d:'50 authentic duas from Quran & Sunnah — printable pocket size.', tag:'PDF · Free' },
      { e:'📿', t:'Salah Guide',          d:'Step-by-step Salah guide with Arabic, transliteration and meaning.', tag:'PDF · Free' },
    ],
    soonTag: 'Coming soon',
    ctaH: 'Suggest a Product',
    ctaSub: 'Know a great halal product we should feature? Let us know.',
    ctaEmail: 'support@alummahai.com',
  },
  ar: {
    badge: 'المتجر الإسلامي · منتجات منتقاة',
    title: 'المتجر الإسلامي',
    sub: 'منتجات حلال منتقاة للمسلم المعاصر — مستلزمات الصلاة والقرآن والديكور المنزلي وأكثر. جميع العناصر روابط تابعة لتجار موثوقين.',
    comingH: 'قريباً — متجر مباشر',
    comingSub: 'نبني متجراً إسلامياً منتقى. في الوقت الحالي، هذه روابط تابعة لأفضل المنتجات من تجار موثوقين. لا تدفع أي شيء إضافي.',
    cats: { all:'الكل', prayer:'الصلاة', books:'الكتب', fragrance:'العطور', home:'المنزل', wellness:'العافية' },
    catAll: 'الكل',
    viewBtn: 'عرض المنتج',
    affiliateNote: '* روابط تابعة. الشراء من خلالها يدعم الأمة AI دون أي تكلفة إضافية عليك.',
    whyH: 'لماذا التسوق الحلال؟',
    why: [
      { Icon: Shield,   t: 'حلال موثق',           d: 'كل منتج يخضع للتدقيق للتأكد من مطابقته للحلال. لا معاملات ربوية.' },
      { Icon: Star,     t: 'جودة منتقاة',          d: 'اختيار يدوي من فريقنا من موردين وتجار إسلاميين موثوقين حول العالم.' },
      { Icon: Truck,    t: 'شحن عالمي',            d: 'يشحن شركاؤنا التجاريون في جميع أنحاء العالم. معظمهم يقدمون توصيلاً مجانياً فوق حد معين.' },
      { Icon: Heart,    t: 'دعم الأمة',            d: 'جزء من عائدات العمولة يعود لصيانة الأمة AI مجانياً للجميع.' },
    ],
    digitalH: 'موارد رقمية مجانية',
    digitalSub: 'حمّل هذه الموارد الإسلامية المجانية — لا يلزم التسجيل.',
    digital: [
      { e:'🕌', t:'مخطط رمضان 2026', d:'جدول رمضاني يومي قابل للطباعة مع قالب لأوقات السحور والإفطار.', tag:'PDF · مجاني' },
      { e:'🤲', t:'كتيب الأدعية اليومية', d:'50 دعاء أصيل من القرآن والسنة — بحجم جيب قابل للطباعة.', tag:'PDF · مجاني' },
      { e:'📿', t:'دليل الصلاة', d:'دليل الصلاة خطوة بخطوة بالعربية والتحريف والمعنى.', tag:'PDF · مجاني' },
    ],
    soonTag: 'قريباً',
    ctaH: 'اقترح منتجاً',
    ctaSub: 'هل تعرف منتجاً حلالاً رائعاً يجب أن نعرضه؟ أخبرنا.',
    ctaEmail: 'support@alummahai.com',
  },
  fr: {
    badge: 'Boutique Islamique · Produits Sélectionnés',
    title: 'Boutique Islamique',
    sub: 'Produits halal sélectionnés pour le musulman moderne — essentiels de prière, Coran, décoration et plus. Tous les articles sont des liens d\'affiliation vers des détaillants de confiance.',
    comingH: 'Bientôt — Boutique Directe',
    comingSub: 'Nous construisons une boutique islamique sélectionnée. Pour l\'instant, ce sont des liens d\'affiliation vers les meilleurs produits de détaillants de confiance. Vous ne payez rien de plus.',
    cats: { all:'Tout', prayer:'Prière', books:'Livres', fragrance:'Parfum', home:'Maison', wellness:'Bien-être' },
    catAll: 'Tout',
    viewBtn: 'Voir le Produit',
    affiliateNote: '* Liens d\'affiliation. Acheter via ces liens soutient Al Ummah AI sans frais supplémentaires pour vous.',
    whyH: 'Pourquoi Acheter Halal ?',
    why: [
      { Icon: Shield,   t: 'Halal Vérifié',        d: 'Chaque produit est vérifié pour sa conformité halal. Pas de transactions basées sur les intérêts.' },
      { Icon: Star,     t: 'Qualité Sélectionnée', d: 'Choix manuel par notre équipe auprès de fournisseurs islamiques de confiance.' },
      { Icon: Truck,    t: 'Livraison Mondiale',   d: 'Nos détaillants partenaires livrent dans le monde entier. La plupart offrent la livraison gratuite.' },
      { Icon: Heart,    t: 'Soutenir l\'Oumma',   d: 'Une partie des revenus d\'affiliation est réinvestie dans Al Ummah AI gratuit pour tous.' },
    ],
    digitalH: 'Ressources Numériques Gratuites',
    digitalSub: 'Téléchargez ces ressources islamiques gratuites — aucune inscription requise.',
    digital: [
      { e:'🕌', t:'Planificateur Ramadan 2026', d:'Un programme Ramadan imprimable jour par jour avec modèle d\'horaires Suhoor/Iftar.', tag:'PDF · Gratuit' },
      { e:'🤲', t:'Livret de Douas Quotidiennes', d:'50 douas authentiques du Coran et de la Sunna — format poche imprimable.', tag:'PDF · Gratuit' },
      { e:'📿', t:'Guide de la Salah', d:'Guide étape par étape de la Salah avec arabe, translittération et signification.', tag:'PDF · Gratuit' },
    ],
    soonTag: 'Bientôt',
    ctaH: 'Suggérer un Produit',
    ctaSub: 'Connaissez-vous un excellent produit halal que nous devrions présenter ? Dites-le nous.',
    ctaEmail: 'support@alummahai.com',
  },
  es: {
    badge: 'Tienda Islámica · Productos Seleccionados',
    title: 'Tienda Islámica',
    sub: 'Productos halal seleccionados para el musulmán moderno — artículos de oración, Corán, decoración del hogar y más. Todos los artículos son enlaces de afiliados a minoristas de confianza.',
    comingH: 'Próximamente — Tienda Directa',
    comingSub: 'Estamos construyendo una tienda islámica seleccionada. Por ahora, estos son enlaces de afiliados a los mejores productos de minoristas de confianza. No pagas nada extra.',
    cats: { all:'Todo', prayer:'Oración', books:'Libros', fragrance:'Fragancia', home:'Hogar', wellness:'Bienestar' },
    catAll: 'Todo',
    viewBtn: 'Ver Producto',
    affiliateNote: '* Enlaces de afiliados. Comprar a través de ellos apoya a Al Ummah AI sin costo adicional para ti.',
    whyH: '¿Por Qué Comprar Halal?',
    why: [
      { Icon: Shield,   t: 'Halal Verificado',     d: 'Cada producto está verificado para su conformidad halal. Sin transacciones basadas en intereses.' },
      { Icon: Star,     t: 'Calidad Seleccionada', d: 'Selección manual de nuestro equipo de proveedores islámicos de confianza en todo el mundo.' },
      { Icon: Truck,    t: 'Envío Mundial',         d: 'Nuestros minoristas asociados envían a todo el mundo. La mayoría ofrece envío gratuito.' },
      { Icon: Heart,    t: 'Apoyar la Ummah',      d: 'Parte de los ingresos de afiliados se reinvierte en mantener Al Ummah AI gratuito para todos.' },
    ],
    digitalH: 'Recursos Digitales Gratuitos',
    digitalSub: 'Descarga estos recursos islámicos gratuitos — sin registro necesario.',
    digital: [
      { e:'🕌', t:'Planificador de Ramadán 2026', d:'Un programa de Ramadán imprimible día a día con plantilla de horarios de Suhoor/Iftar.', tag:'PDF · Gratis' },
      { e:'🤲', t:'Folleto de Duas Diarias', d:'50 duas auténticas del Corán y la Sunnah — tamaño de bolsillo imprimible.', tag:'PDF · Gratis' },
      { e:'📿', t:'Guía de Salah', d:'Guía paso a paso de Salah con árabe, transliteración y significado.', tag:'PDF · Gratis' },
    ],
    soonTag: 'Próximamente',
    ctaH: 'Sugiere un Producto',
    ctaSub: '¿Conoces un gran producto halal que deberíamos presentar? Dinos.',
    ctaEmail: 'support@alummahai.com',
  },
};

const PRODUCTS = [
  { id:1, nameKey:'Premium Velvet Prayer Mat',   price:45, rating:5, image:'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?w=800&q=80', category:'prayer',    link:'https://www.amazon.com/s?k=premium+velvet+prayer+mat' },
  { id:2, nameKey:'Al-Quran Arabic + Translation', price:29, rating:5, image:'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&q=80', category:'books',     link:'https://www.amazon.com/s?k=quran+arabic+english' },
  { id:3, nameKey:'Natural Oud Perfume Oil',      price:55, rating:5, image:'https://images.unsplash.com/photo-1592914610354-fd354ea45e48?w=800&q=80', category:'fragrance',  link:'https://www.amazon.com/s?k=oud+perfume+oil+halal' },
  { id:4, nameKey:'Islamic Geometric Wall Art',   price:79, rating:4, image:'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80', category:'home',       link:'https://www.amazon.com/s?k=islamic+geometric+wall+art' },
  { id:5, nameKey:'Digital Tasbih Counter',       price:14, rating:4, image:'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800&q=80', category:'prayer',    link:'https://www.amazon.com/s?k=digital+tasbih+counter' },
  { id:6, nameKey:'Handcrafted Miswak Set',        price:12, rating:5, image:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', category:'wellness',   link:'https://www.amazon.com/s?k=miswak+set' },
];

const CAT_KEYS = ['all','prayer','books','fragrance','home','wellness'];

export function StorePage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.slice(0,2) || 'en') as keyof typeof T;
  const L = T[lang] || T.en;
  const isRTL = lang === 'ar';
  const [activeCat, setActiveCat] = useState('all');
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  const filtered = activeCat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCat);

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background: NAVY, minHeight:'100vh', color:'#fff' }}>
      <SEO title={`${L.title} — Al Ummah AI`} description={L.sub} keywords="islamic store, prayer mat, halal products, quran shop, oud perfume, islamic gifts" canonical="https://www.alummahai.com/store" lang={lang} />

      {/* Hero */}
      <div style={{ background:`linear-gradient(160deg,#071a2e 0%,${NAVY} 55%,${NAVY2} 100%)`, borderBottom:'1px solid rgba(212,175,55,0.12)', padding:'clamp(80px,12vw,120px) 20px clamp(44px,6vw,60px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(212,175,55,0.06) 1px,transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none' }} />
        <div style={{ position:'relative', zIndex:1 }}>
          <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }}
            style={{ display:'inline-block', padding:'4px 14px', background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.22)', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.52rem', fontWeight:900, color:GOLD, textTransform:'uppercase', letterSpacing:'0.24em', marginBottom:16 }}>
            🛍️ {L.badge}
          </motion.div>
          <motion.h1 initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.08 }}
            style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(2.2rem,7vw,5rem)', color:'#fff', letterSpacing:'-0.03em', marginBottom:14, lineHeight:1 }}>{L.title}</motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.18 }}
            style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'clamp(0.86rem,1.8vw,1rem)', color:'rgba(255,255,255,0.4)', maxWidth:480, margin:'0 auto', lineHeight:1.85 }}>{L.sub}</motion.p>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'clamp(32px,5vw,56px) 20px' }}>

        {/* Coming soon banner */}
        <div style={{ background:'rgba(212,175,55,0.07)', border:'1px solid rgba(212,175,55,0.2)', borderRadius:14, padding:'14px 20px', display:'flex', alignItems:'center', gap:12, marginBottom:32, flexWrap:'wrap' }}>
          <Tag size={15} style={{ color:GOLD, flexShrink:0 }} />
          <div>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.82rem', color:GOLD }}>{L.comingH} — </span>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.78rem', color:'rgba(255,255,255,0.5)' }}>{L.comingSub}</span>
          </div>
        </div>

        {/* Category filter */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:28 }}>
          {CAT_KEYS.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              style={{ padding:'7px 16px', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.6rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.14em', cursor:'pointer', border:'none', transition:'all 0.16s', background: activeCat===cat ? GOLD : 'rgba(212,175,55,0.09)', color: activeCat===cat ? NAVY : GOLD, boxShadow: activeCat===cat ? '0 4px 14px rgba(212,175,55,0.3)' : 'none' }}>
              {(L.cats as any)[cat] || cat}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:18, marginBottom:52 }}>
          {filtered.map(p => (
            <motion.div key={p.id} initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} layout
              style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:18, overflow:'hidden', display:'flex', flexDirection:'column', transition:'all 0.22s' }}
              whileHover={{ y:-4, borderColor:'rgba(212,175,55,0.35)' }}>
              <div style={{ position:'relative', height:200, overflow:'hidden' }}>
                <img src={p.image} alt={p.nameKey} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s' }} loading="lazy"
                  onMouseEnter={e => (e.currentTarget.style.transform='scale(1.06)')}
                  onMouseLeave={e => (e.currentTarget.style.transform='scale(1)')} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(10,37,64,0.6),transparent)' }} />
                <button onClick={() => setWishlist(prev => { const n=new Set(prev); n.has(p.id)?n.delete(p.id):n.add(p.id); return n; })}
                  style={{ position:'absolute', top:12, right:12, width:34, height:34, borderRadius:'50%', background:'rgba(10,37,64,0.8)', border:'1px solid rgba(212,175,55,0.3)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', transition:'all 0.18s', backdropFilter:'blur(8px)' }}>
                  <Heart size={14} fill={wishlist.has(p.id) ? '#f87171' : 'none'} stroke={wishlist.has(p.id) ? '#f87171' : GOLD} />
                </button>
                <div style={{ position:'absolute', bottom:10, left:12, display:'flex', gap:3 }}>
                  {[...Array(p.rating)].map((_,i) => <Star key={i} size={9} fill={GOLD} stroke="none" />)}
                </div>
              </div>
              <div style={{ padding:'16px 18px', flex:1, display:'flex', flexDirection:'column', gap:10 }}>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:'0.95rem', color:'#fff', lineHeight:1.35 }}>{p.nameKey}</h3>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'1.15rem', color:GOLD }}>
                  ${p.price.toFixed(2)}
                </div>
                <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:7, background:GOLD, color:NAVY, padding:'10px', borderRadius:10, fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.66rem', textDecoration:'none', textTransform:'uppercase', letterSpacing:'0.1em', marginTop:'auto', transition:'opacity 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity='0.88')}
                  onMouseLeave={e => (e.currentTarget.style.opacity='1')}>
                  {L.viewBtn} <ExternalLink size={11} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Halal */}
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.3rem,3vw,1.9rem)', color:'#fff', marginBottom:16 }}>{L.whyH}</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))', gap:12, marginBottom:52 }}>
          {L.why.map(({ Icon, t, d }: any) => (
            <div key={t} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'18px', display:'flex', gap:13 }}>
              <div style={{ width:34, height:34, borderRadius:10, background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.18)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Icon size={15} style={{ color:GOLD }} />
              </div>
              <div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.82rem', color:'#fff', marginBottom:4 }}>{t}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.7rem', color:'rgba(255,255,255,0.38)', lineHeight:1.7 }}>{d}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Free digital */}
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.3rem,3vw,1.9rem)', color:'#fff', marginBottom:8 }}>{L.digitalH}</h2>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.82rem', color:'rgba(255,255,255,0.38)', marginBottom:18, lineHeight:1.7 }}>{L.digitalSub}</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:12, marginBottom:52 }}>
          {L.digital.map(({ e, t, d, tag }: any) => (
            <div key={t} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'18px 18px', display:'flex', gap:14, alignItems:'flex-start', transition:'all 0.2s' }}
              onMouseEnter={el => { const c=el.currentTarget as HTMLElement; c.style.borderColor='rgba(212,175,55,0.28)'; c.style.background='rgba(212,175,55,0.04)'; }}
              onMouseLeave={el => { const c=el.currentTarget as HTMLElement; c.style.borderColor='rgba(255,255,255,0.07)'; c.style.background='rgba(255,255,255,0.03)'; }}>
              <span style={{ fontSize:'1.6rem', flexShrink:0 }}>{e}</span>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5, flexWrap:'wrap' }}>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.84rem', color:'#fff' }}>{t}</span>
                  <span style={{ padding:'2px 8px', background:'rgba(212,175,55,0.15)', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.5rem', fontWeight:900, color:GOLD, textTransform:'uppercase', letterSpacing:'0.12em' }}>{tag}</span>
                </div>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.7rem', color:'rgba(255,255,255,0.38)', lineHeight:1.7 }}>{d}</p>
                <div style={{ marginTop:10 }}>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:'0.6rem', color:'rgba(212,175,55,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>{L.soonTag} ↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Affiliate note */}
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.68rem', color:'rgba(255,255,255,0.22)', lineHeight:1.7, marginBottom:44, fontStyle:'italic' }}>{L.affiliateNote}</p>

        {/* CTA */}
        <div style={{ background:'linear-gradient(120deg,rgba(212,175,55,0.08),rgba(212,175,55,0.03))', border:'1px solid rgba(212,175,55,0.18)', borderRadius:20, padding:'clamp(24px,4vw,40px)', textAlign:'center' }}>
          <div style={{ fontSize:'2rem', marginBottom:12 }}>📬</div>
          <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.2rem,3vw,1.7rem)', color:'#fff', marginBottom:8 }}>{L.ctaH}</h3>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, color:'rgba(255,255,255,0.38)', maxWidth:360, margin:'0 auto 16px', lineHeight:1.8, fontSize:'0.84rem' }}>{L.ctaSub}</p>
          <a href={`mailto:${L.ctaEmail}`} style={{ display:'inline-flex', alignItems:'center', gap:7, fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.82rem', color:GOLD, textDecoration:'underline', textUnderlineOffset:4 }}>
            {L.ctaEmail} <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
