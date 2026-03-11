import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '@/src/components/SEO';
import { Calendar, Clock, TrendingUp, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/* ── Translations ─────────────────────────────────────────── */
const T: Record<string, any> = {
  en: {
    badge: 'Ummah Insights',
    title: 'Islamic Blog',
    sub: 'Guides, wisdom and knowledge for the modern Muslim. Updated daily.',
    featured: 'Featured',
    trending: 'Trending Now',
    readArticle: 'Read Article',
    readFull: 'Read Full Article',
    hot: 'Hot',
    never: 'Never Miss an Article',
    neverSub: 'New guides on prayer, Quran, halal finance and Islamic lifestyle published weekly.',
    explore: 'Explore All Tools →',
    read: 'read',
    cats: { All:'All', Ramadan:'Ramadan', Prayer:'Prayer', Finance:'Finance', Quran:'Quran', Hajj:'Hajj', Lifestyle:'Lifestyle', History:'History' },
  },
  ar: {
    badge: 'رؤى الأمة',
    title: 'المدونة الإسلامية',
    sub: 'أدلة وحكمة ومعرفة للمسلم المعاصر. يُحدَّث يومياً.',
    featured: 'مميز',
    trending: 'الأكثر رواجاً',
    readArticle: 'اقرأ المقال',
    readFull: 'اقرأ المقال كاملاً',
    hot: 'رائج',
    never: 'لا تفوّت أي مقال',
    neverSub: 'أدلة جديدة عن الصلاة والقرآن والمال الحلال وأسلوب الحياة الإسلامي تُنشر أسبوعياً.',
    explore: 'استكشف جميع الأدوات ←',
    read: 'قراءة',
    cats: { All:'الكل', Ramadan:'رمضان', Prayer:'الصلاة', Finance:'المالية', Quran:'القرآن', Hajj:'الحج', Lifestyle:'أسلوب الحياة', History:'التاريخ' },
  },
  fr: {
    badge: 'Perspectives de l\'Oumma',
    title: 'Blog Islamique',
    sub: 'Guides, sagesse et connaissance pour le musulman moderne. Mis à jour quotidiennement.',
    featured: 'À la Une',
    trending: 'Tendance',
    readArticle: 'Lire l\'Article',
    readFull: 'Lire l\'Article Complet',
    hot: 'Populaire',
    never: 'Ne Manquez Aucun Article',
    neverSub: 'Nouveaux guides sur la prière, le Coran, la finance halal et le mode de vie islamique publiés chaque semaine.',
    explore: 'Explorer Tous les Outils →',
    read: 'lecture',
    cats: { All:'Tout', Ramadan:'Ramadan', Prayer:'Prière', Finance:'Finance', Quran:'Coran', Hajj:'Hajj', Lifestyle:'Mode de Vie', History:'Histoire' },
  },
  es: {
    badge: 'Perspectivas de la Ummah',
    title: 'Blog Islámico',
    sub: 'Guías, sabiduría y conocimiento para el musulmán moderno. Actualizado diariamente.',
    featured: 'Destacado',
    trending: 'Tendencia',
    readArticle: 'Leer Artículo',
    readFull: 'Leer Artículo Completo',
    hot: 'Popular',
    never: 'No Te Pierdas Ningún Artículo',
    neverSub: 'Nuevas guías sobre oración, Corán, finanzas halal y estilo de vida islámico publicadas semanalmente.',
    explore: 'Explorar Todas las Herramientas →',
    read: 'lectura',
    cats: { All:'Todo', Ramadan:'Ramadán', Prayer:'Oración', Finance:'Finanzas', Quran:'Corán', Hajj:'Hajj', Lifestyle:'Estilo de Vida', History:'Historia' },
  },
};

const NAVY  = '#0a2540';
const NAVY2 = '#0d2e4d';
const GOLD  = '#D4AF37';

/* ── Post data ────────────────────────────────────────────── */
interface Post {
  id: string; title: string; excerpt: string;
  date: string; image: string; category: string;
  readTime: string; featured?: boolean; trending?: boolean;
}

const POSTS: Post[] = [
  { id:'last-10-nights-ramadan', title:'The Last 10 Nights of Ramadan: Complete Guide to Laylatul Qadr', excerpt:'The most sacred nights in Islam. Learn how to find Laylatul Qadr, perform Itikaf, and maximize your worship during the final stretch of Ramadan 2026.', date:'Mar 9, 2026', image:'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&q=80', category:'Ramadan', readTime:'8 min', featured:true, trending:true },
  { id:'ramadan-2026-prayer-timetable', title:'Ramadan 2026 Prayer Timetable: Suhoor & Iftar Times by City', excerpt:'Accurate Suhoor and Iftar times for every city worldwide during Ramadan 2026. London, Paris, Dubai, New York and 50+ cities covered.', date:'Mar 8, 2026', image:'https://images.unsplash.com/photo-1542816052-e1b0b5c1c4b9?w=800&q=80', category:'Ramadan', readTime:'5 min', trending:true },
  { id:'fajr-time-today', title:'What Time is Fajr Today? Complete Guide to Dawn Prayer', excerpt:'How to find the exact Fajr time for your location, why Fajr is the most rewarded prayer, and tips for waking up consistently.', date:'Mar 7, 2026', image:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', category:'Prayer', readTime:'5 min', trending:true },
  { id:'calculate-zakat-2026', title:'How to Calculate Zakat 2026: Step-by-Step Guide', excerpt:'Everything about Nisab threshold, Zakat on gold, silver, cash, stocks and business inventory. Calculate your exact obligation for 2026.', date:'Mar 6, 2026', image:'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&q=80', category:'Finance', readTime:'6 min' },
  { id:'hajj-packages-uk-2026', title:'Hajj 2026 Complete Guide: Everything You Need to Know', excerpt:'Dates, rituals, costs and tips for Hajj 2026. From Ihram to Tawaf, Arafat to Muzdalifah — the complete pilgrim guide.', date:'Mar 5, 2026', image:'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80', category:'Hajj', readTime:'10 min' },
  { id:'best-halal-investment-apps-2026', title:'Best Halal Investment Apps 2026: Grow Your Wealth the Sharia Way', excerpt:'Top Sharia-compliant investment platforms compared: Wahed Invest, Zoya, Aghaz. Features, fees and halal portfolio performance.', date:'Mar 4, 2026', image:'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80', category:'Finance', readTime:'7 min' },
  { id:'surah-al-kahf-friday', title:'Why Muslims Read Surah Al-Kahf Every Friday: Full Guide', excerpt:'The Prophet recommended reading Surah Al-Kahf every Friday. Learn the 4 stories, their lessons, and its protection from Dajjal.', date:'Mar 3, 2026', image:'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80', category:'Quran', readTime:'6 min' },
  { id:'morning-evening-adhkar', title:'Morning & Evening Adhkar: The Complete Daily Dhikr Guide', excerpt:'Authentic Adhkar for morning and evening from Quran and Sunnah. Protect yourself and start every day with remembrance of Allah.', date:'Mar 2, 2026', image:'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800&q=80', category:'Lifestyle', readTime:'7 min' },
  { id:'islamic-history-golden-age', title:'The Islamic Golden Age: When Muslims Led the World in Science', excerpt:'From algebra to astronomy, medicine to philosophy — how Muslim scholars shaped the modern world between 800–1300 CE.', date:'Mar 1, 2026', image:'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80', category:'History', readTime:'9 min' },
  { id:'how-to-pray-salah-beginners', title:'How to Pray Salah: Complete Step-by-Step Guide for Beginners', excerpt:'Never prayed before? This guide walks you through every step of Islamic prayer with Arabic text, transliteration and meaning.', date:'Feb 28, 2026', image:'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80', category:'Prayer', readTime:'8 min' },
  { id:'quran-memorization-tips', title:'10 Proven Tips to Memorize the Quran Faster', excerpt:'Science-backed techniques combined with traditional Hifz methods. How top huffaz memorize Quran efficiently — even as an adult.', date:'Feb 27, 2026', image:'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&q=80', category:'Quran', readTime:'7 min' },
  { id:'halal-food-guide-europe', title:'Halal Food Guide for Muslims Living in Europe 2026', excerpt:'How to identify halal products, trusted certifications in UK, France, Spain and Germany, and apps that make halal shopping easier.', date:'Feb 26, 2026', image:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', category:'Lifestyle', readTime:'6 min' },
  { id:'zakat-al-fitr-2026', title:'Zakat al-Fitr 2026: Amount, Rules and When to Pay', excerpt:'How much is Zakat al-Fitr in 2026? Who must pay it, when is the deadline, and who are the eligible recipients according to Islam.', date:'Feb 25, 2026', image:'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80', category:'Finance', readTime:'5 min' },
  { id:'islamic-parenting-guide', title:'Raising Muslim Children in the West: A Practical Guide', excerpt:'How to nurture Islamic identity, values and practice in children growing up in non-Muslim majority countries.', date:'Feb 24, 2026', image:'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80', category:'Lifestyle', readTime:'8 min' },
  { id:'prophet-muhammad-life', title:'The Life of Prophet Muhammad ﷺ: A Complete Biography', excerpt:'From his birth in Mecca to the final sermon. The life, character and legacy of the Prophet — the most influential person in history.', date:'Feb 23, 2026', image:'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=80', category:'History', readTime:'12 min' },
];

/* ── Likes stored in memory ───────────────────────────────── */
function useLikes() {
  const [likes, setLikes] = useState<Record<string, number>>(() =>
    Object.fromEntries(POSTS.map(p => [p.id, Math.floor(Math.random() * 180) + 20]))
  );
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const toggle = (id: string) => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); setLikes(l => ({ ...l, [id]: l[id] - 1 })); }
      else               { next.add(id);    setLikes(l => ({ ...l, [id]: l[id] + 1 })); }
      return next;
    });
  };
  return { likes, liked, toggle };
}

const CAT_KEYS = ['All','Ramadan','Prayer','Finance','Quran','Hajj','Lifestyle','History'];

/* ── Card ─────────────────────────────────────────────────── */
function PostCard({ post, L, likes, liked, onLike }: { post: Post; L: any; likes: number; liked: boolean; onLike: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.article layout initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, scale:0.96 }}
      style={{ background: hov ? 'rgba(255,255,255,0.065)' : 'rgba(255,255,255,0.04)', border: `1px solid ${hov ? 'rgba(212,175,55,0.35)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 18, overflow:'hidden', display:'flex', flexDirection:'column', transition:'all 0.22s', cursor:'default' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>

      {/* Image */}
      <Link to={`/blog/${post.id}`} style={{ display:'block', position:'relative', height: 200, overflow:'hidden', flexShrink:0 }}>
        <img src={post.image} alt={post.title} style={{ width:'100%', height:'100%', objectFit:'cover', transform: hov ? 'scale(1.06)' : 'scale(1)', transition:'transform 0.6s ease' }} loading="lazy" />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(10,37,64,0.75) 0%, transparent 60%)' }} />
        {/* Badges */}
        <div style={{ position:'absolute', top:12, left:12, display:'flex', gap:6 }}>
          <span style={{ padding:'3px 10px', background:'rgba(10,37,64,0.8)', backdropFilter:'blur(8px)', border:'1px solid rgba(212,175,55,0.3)', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.5rem', fontWeight:900, color:GOLD, textTransform:'uppercase', letterSpacing:'0.18em' }}>
            {post.category}
          </span>
          {post.trending && (
            <span style={{ padding:'3px 10px', background:GOLD, borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.5rem', fontWeight:900, color:NAVY, textTransform:'uppercase', letterSpacing:'0.18em', display:'flex', alignItems:'center', gap:4 }}>
              <TrendingUp size={9} /> {L.hot}
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div style={{ padding:'18px 20px', display:'flex', flexDirection:'column', flex:1, gap:10 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, fontFamily:"'DM Sans',sans-serif", fontSize:'0.55rem', fontWeight:700, color:'rgba(212,175,55,0.45)', textTransform:'uppercase', letterSpacing:'0.15em' }}>
          <span style={{ display:'flex', alignItems:'center', gap:4 }}><Calendar size={9} />{post.date}</span>
          <span style={{ display:'flex', alignItems:'center', gap:4 }}><Clock size={9} />{post.readTime} {L.read}</span>
        </div>

        <Link to={`/blog/${post.id}`} style={{ textDecoration:'none' }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:'0.95rem', color: hov ? GOLD : '#ffffff', lineHeight:1.35, transition:'color 0.2s', marginBottom:6 }}>
            {post.title}
          </h2>
        </Link>

        <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.74rem', color:'rgba(255,255,255,0.38)', lineHeight:1.75, flex:1 }}>
          {post.excerpt}
        </p>

        {/* Footer: read + like */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:12, borderTop:'1px solid rgba(255,255,255,0.06)', marginTop:4 }}>
          <Link to={`/blog/${post.id}`} style={{ display:'flex', alignItems:'center', gap:5, fontFamily:"'DM Sans',sans-serif", fontSize:'0.6rem', fontWeight:800, color:GOLD, textTransform:'uppercase', letterSpacing:'0.12em', textDecoration:'none' }}>
            {L.readArticle} <ArrowRight size={11} />
          </Link>
          <button onClick={e => { e.stopPropagation(); onLike(); }}
            style={{ display:'flex', alignItems:'center', gap:5, background:'transparent', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'0.68rem', fontWeight:700, color: liked ? '#f87171' : 'rgba(255,255,255,0.28)', transition:'color 0.18s', padding:0 }}>
            <Heart size={13} fill={liked ? '#f87171' : 'none'} stroke={liked ? '#f87171' : 'rgba(255,255,255,0.28)'} strokeWidth={2} />
            {likes}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Main ─────────────────────────────────────────────────── */
export function BlogPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.slice(0,2) || 'en') as keyof typeof T;
  const L = T[lang] || T.en;
  const isRTL = lang === 'ar';

  const [activeCat, setActiveCat] = useState('All');
  const { likes, liked, toggle } = useLikes();

  const featured = POSTS[0];
  const trending  = POSTS.filter(p => p.trending).slice(0, 3);
  const filtered  = activeCat === 'All' ? POSTS : POSTS.filter(p => p.category === activeCat);
  const grid      = filtered.filter(p => !p.featured || activeCat !== 'All');

  // Sort grid by likes (trending effect)
  const sorted = [...grid].sort((a, b) => (likes[b.id] || 0) - (likes[a.id] || 0));

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background: NAVY, minHeight:'100vh', color:'#ffffff' }}>
      <SEO
        title="Islamic Blog — Guides, Knowledge & Inspiration"
        description="Expert guides on Ramadan 2026, Fajr prayer, Zakat calculation, Hajj, Quran and Islamic lifestyle. Updated daily."
        keywords="ramadan 2026, laylatul qadr, fajr time, calculate zakat, hajj 2026, islamic blog"
        canonical="https://www.alummahai.com/blog"
        lang={lang}
      />

      {/* ── Hero ── */}
      <div style={{ background:`linear-gradient(160deg,#071a2e 0%,${NAVY} 55%,${NAVY2} 100%)`, borderBottom:'1px solid rgba(212,175,55,0.12)', padding:'clamp(80px,12vw,120px) 20px clamp(44px,6vw,60px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(212,175,55,0.05) 1px,transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none' }} />
        <div style={{ position:'relative', zIndex:1 }}>
          <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
            style={{ display:'inline-block', padding:'4px 14px', background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.22)', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.52rem', fontWeight:900, color:GOLD, textTransform:'uppercase', letterSpacing:'0.28em', marginBottom:16 }}>
            ✦ {L.badge}
          </motion.div>
          <motion.h1 initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.08 }}
            style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(2.2rem,7vw,5rem)', color:'#ffffff', letterSpacing:'-0.03em', marginBottom:14, lineHeight:1 }}>
            {L.title}
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.18 }}
            style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'clamp(0.88rem,1.8vw,1rem)', color:'rgba(255,255,255,0.4)', maxWidth:440, margin:'0 auto', lineHeight:1.85 }}>
            {L.sub}
          </motion.p>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'clamp(32px,5vw,60px) 20px' }}>

        {/* ── Featured ── */}
        {activeCat === 'All' && (
          <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} style={{ marginBottom:48 }}>
            <Link to={`/blog/${featured.id}`} style={{ textDecoration:'none', display:'block' }}>
              <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(212,175,55,0.2)', borderRadius:20, overflow:'hidden', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', transition:'border-color 0.22s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor='rgba(212,175,55,0.5)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor='rgba(212,175,55,0.2)')}>
                <div style={{ position:'relative', minHeight:260, overflow:'hidden' }}>
                  <img src={featured.image} alt={featured.title} style={{ width:'100%', height:'100%', objectFit:'cover', position:'absolute', inset:0, transition:'transform 0.6s' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(10,37,64,0.5),transparent)' }} />
                  <div style={{ position:'absolute', top:16, left:16, display:'flex', gap:8 }}>
                    <span style={{ padding:'4px 12px', background:GOLD, borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.52rem', fontWeight:900, color:NAVY, textTransform:'uppercase', letterSpacing:'0.18em' }}>{L.featured}</span>
                    <span style={{ padding:'4px 12px', background:'rgba(10,37,64,0.8)', border:'1px solid rgba(212,175,55,0.3)', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.52rem', fontWeight:900, color:GOLD, textTransform:'uppercase', letterSpacing:'0.18em' }}>{featured.category}</span>
                  </div>
                </div>
                <div style={{ padding:'clamp(20px,3vw,40px)', display:'flex', flexDirection:'column', justifyContent:'center', gap:14 }}>
                  <div style={{ display:'flex', gap:14, fontFamily:"'DM Sans',sans-serif", fontSize:'0.55rem', fontWeight:700, color:'rgba(212,175,55,0.45)', textTransform:'uppercase', letterSpacing:'0.14em' }}>
                    <span style={{ display:'flex', alignItems:'center', gap:4 }}><Calendar size={10} />{featured.date}</span>
                    <span style={{ display:'flex', alignItems:'center', gap:4 }}><Clock size={10} />{featured.readTime} {L.read}</span>
                  </div>
                  <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.2rem,2.8vw,1.8rem)', color:'#ffffff', lineHeight:1.28 }}>{featured.title}</h2>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.86rem', color:'rgba(255,255,255,0.42)', lineHeight:1.75 }}>{featured.excerpt}</p>
                  <div style={{ display:'flex', alignItems:'center', gap:8, paddingTop:14, borderTop:'1px solid rgba(212,175,55,0.12)', fontFamily:"'DM Sans',sans-serif", fontSize:'0.6rem', fontWeight:800, color:GOLD, textTransform:'uppercase', letterSpacing:'0.16em' }}>
                    {L.readFull} <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* ── Trending bar ── */}
        {activeCat === 'All' && (
          <div style={{ marginBottom:48 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
              <TrendingUp size={15} style={{ color:GOLD }} />
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.58rem', fontWeight:900, color:GOLD, textTransform:'uppercase', letterSpacing:'0.24em' }}>{L.trending}</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {trending.map((post, i) => (
                <Link key={post.id} to={`/blog/${post.id}`} style={{ textDecoration:'none' }}>
                  <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'14px 18px', display:'flex', alignItems:'center', gap:16, transition:'all 0.18s' }}
                    onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(212,175,55,0.32)'; el.style.background='rgba(212,175,55,0.04)'; }}
                    onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(255,255,255,0.07)'; el.style.background='rgba(255,255,255,0.03)'; }}>
                    <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'1.5rem', color:'rgba(212,175,55,0.18)', minWidth:32, textAlign:'center' }}>{String(i+1).padStart(2,'0')}</span>
                    <img src={post.image} alt={post.title} style={{ width:56, height:56, objectFit:'cover', borderRadius:10, flexShrink:0 }} loading="lazy" />
                    <div style={{ flex:1, minWidth:0 }}>
                      <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.5rem', fontWeight:900, color:'rgba(212,175,55,0.5)', textTransform:'uppercase', letterSpacing:'0.18em' }}>{post.category}</span>
                      <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:'0.9rem', color:'#ffffff', lineHeight:1.32, marginTop:3 }}>{post.title}</h3>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:5, fontFamily:"'DM Sans',sans-serif", fontSize:'0.62rem', color:'rgba(255,255,255,0.22)', flexShrink:0 }}>
                      <Clock size={10} />{post.readTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Category filter ── */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:32 }}>
          {CAT_KEYS.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              style={{ padding:'7px 16px', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.6rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.14em', cursor:'pointer', transition:'all 0.16s', border:'none', background: activeCat===cat ? GOLD : 'rgba(212,175,55,0.09)', color: activeCat===cat ? NAVY : GOLD, boxShadow: activeCat===cat ? '0 4px 14px rgba(212,175,55,0.3)' : 'none' }}>
              {L.cats[cat] || cat}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20, marginBottom:60 }}>
          <AnimatePresence mode="popLayout">
            {sorted.map(post => (
              <PostCard key={post.id} post={post} L={L}
                likes={likes[post.id]} liked={liked.has(post.id)} onLike={() => toggle(post.id)} />
            ))}
          </AnimatePresence>
        </div>

        {/* ── CTA ── */}
        <div style={{ background:'linear-gradient(120deg,rgba(212,175,55,0.08),rgba(212,175,55,0.03))', border:'1px solid rgba(212,175,55,0.18)', borderRadius:20, padding:'clamp(28px,4vw,48px)', textAlign:'center' }}>
          <div style={{ fontSize:'2rem', marginBottom:14 }}>📖</div>
          <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.3rem,3vw,1.8rem)', color:'#ffffff', marginBottom:10 }}>{L.never}</h3>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, color:'rgba(255,255,255,0.38)', maxWidth:400, margin:'0 auto 22px', lineHeight:1.8, fontSize:'0.86rem' }}>{L.neverSub}</p>
          <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:8, background:GOLD, color:NAVY, padding:'12px 26px', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.72rem', textDecoration:'none', textTransform:'uppercase', letterSpacing:'0.1em', boxShadow:'0 4px 18px rgba(212,175,55,0.3)', transition:'transform 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.transform='scale(1.04)')}
            onMouseLeave={e => (e.currentTarget.style.transform='scale(1)')}>
            {L.explore}
          </Link>
        </div>
      </div>
    </div>
  );
}
