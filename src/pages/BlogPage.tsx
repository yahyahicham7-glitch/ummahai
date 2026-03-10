import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '@/src/components/SEO';
import { Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Post {
  id: string; title: string; excerpt: string;
  date: string; image: string; category: string;
  readTime: string; featured?: boolean; trending?: boolean;
}

const CATS = ['All','Ramadan','Prayer','Finance','Quran','Hajj','Lifestyle','History'];

const POSTS: Post[] = [
  { id:'last-10-nights-ramadan',       title:'The Last 10 Nights of Ramadan: Complete Guide to Laylatul Qadr',         excerpt:'The most sacred nights in Islam. Learn how to find Laylatul Qadr, perform Itikaf, and maximize your worship.', date:'2026-03-09', image:'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&q=80', category:'Ramadan',   readTime:'8 min', featured:true, trending:true },
  { id:'ramadan-2026-prayer-timetable', title:'Ramadan 2026 Prayer Timetable: Suhoor & Iftar Times by City',           excerpt:'Accurate Suhoor and Iftar times for every city worldwide. London, Paris, Dubai, New York covered.',                date:'2026-03-08', image:'https://images.unsplash.com/photo-1542816052-e1b0b5c1c4b9?w=800&q=80', category:'Ramadan',   readTime:'5 min', trending:true },
  { id:'fajr-time-today',               title:'What Time is Fajr Today? Complete Guide to Dawn Prayer',                 excerpt:'How to find the exact Fajr time for your location and tips for waking up consistently.',                            date:'2026-03-07', image:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', category:'Prayer',    readTime:'5 min', trending:true },
  { id:'calculate-zakat-2026',          title:'How to Calculate Zakat 2026: Step-by-Step Guide',                       excerpt:'Nisab threshold, Zakat on gold, silver, cash, stocks. Your exact obligation for 2026.',                           date:'2026-03-06', image:'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&q=80', category:'Finance',   readTime:'6 min' },
  { id:'hajj-packages-uk-2026',         title:'Hajj 2026 Complete Guide: Everything You Need to Know',                 excerpt:'Dates, rituals, costs and tips for Hajj 2026. From Ihram to Tawaf.',                                               date:'2026-03-05', image:'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80', category:'Hajj',      readTime:'10 min' },
  { id:'best-halal-investment-apps-2026',title:'Best Halal Investment Apps 2026: Grow Wealth the Sharia Way',          excerpt:'Top Sharia-compliant platforms: Wahed, Zoya, Aghaz. Compare features and returns.',                                date:'2026-03-04', image:'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80', category:'Finance',   readTime:'7 min' },
  { id:'surah-al-kahf-friday',          title:'Why Muslims Read Surah Al-Kahf Every Friday: Full Guide',               excerpt:'The Prophet recommended Surah Al-Kahf every Friday. The 4 stories and their lessons.',                             date:'2026-03-03', image:'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80', category:'Quran',     readTime:'6 min' },
  { id:'morning-evening-adhkar',        title:'Morning & Evening Adhkar: The Complete Daily Dhikr Guide',              excerpt:'Authentic Adhkar for morning and evening from Quran and Sunnah.',                                                  date:'2026-03-02', image:'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800&q=80', category:'Lifestyle', readTime:'7 min' },
  { id:'islamic-history-golden-age',    title:'The Islamic Golden Age: When Muslims Led the World in Science',         excerpt:'From algebra to astronomy — how Muslim scholars shaped the modern world between 800–1300 CE.',                    date:'2026-03-01', image:'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80', category:'History',   readTime:'9 min' },
  { id:'how-to-pray-salah-beginners',   title:'How to Pray Salah: Complete Step-by-Step Guide for Beginners',         excerpt:'Every step of Islamic prayer with Arabic text, transliteration and meaning.',                                       date:'2026-02-28', image:'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80', category:'Prayer',    readTime:'8 min' },
  { id:'quran-memorization-tips',       title:'10 Proven Tips to Memorize the Quran Faster',                          excerpt:'Science-backed + traditional Hifz methods. How top huffaz memorize efficiently.',                                  date:'2026-02-27', image:'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&q=80', category:'Quran',     readTime:'7 min' },
  { id:'halal-food-guide-europe',       title:'Halal Food Guide for Muslims Living in Europe 2026',                   excerpt:'Trusted certifications in UK, France, Spain and Germany. Apps for halal shopping.',                               date:'2026-02-26', image:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', category:'Lifestyle', readTime:'6 min' },
  { id:'zakat-al-fitr-2026',            title:'Zakat al-Fitr 2026: Amount, Rules and When to Pay',                    excerpt:'How much is Zakat al-Fitr in 2026? Who must pay it and the deadline.',                                            date:'2026-02-25', image:'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80', category:'Finance',   readTime:'5 min' },
  { id:'islamic-parenting-guide',       title:'Raising Muslim Children in the West: A Practical Guide',               excerpt:'Nurturing Islamic identity and values in children growing up in non-Muslim countries.',                            date:'2026-02-24', image:'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80', category:'Lifestyle', readTime:'8 min' },
  { id:'prophet-muhammad-life',         title:'The Life of Prophet Muhammad: A Complete Biography',                   excerpt:'From Mecca to the final sermon. The life and legacy of the Prophet ﷺ.',                                          date:'2026-02-23', image:'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=80', category:'History',   readTime:'12 min' },
];

const S = {
  // colours — all explicit, no inheritance
  bg:    '#ffffff',
  navy:  '#0a2540',
  gold:  '#D4AF37',
  muted: 'rgba(10,37,64,0.5)',
  light: '#f7f8fa',
  bdr:   'rgba(10,37,64,0.08)',
};

export function BlogPage() {
  const [cat, setCat] = useState('All');

  const featured = POSTS.find(p => p.featured)!;
  const trending  = POSTS.filter(p => p.trending).slice(0, 3);
  const grid      = (cat === 'All' ? POSTS : POSTS.filter(p => p.category === cat)).filter(p => !p.featured);

  return (
    <div style={{ background: S.bg, color: S.navy, minHeight: '100vh' }}>
      <SEO
        title="Islamic Blog — Guides, Prayer & Quran Knowledge"
        description="Expert guides on Ramadan 2026, Fajr prayer times, Zakat calculation, Hajj, Quran, halal finance and Islamic lifestyle."
        keywords="ramadan 2026, fajr time, zakat calculator, hajj 2026, surah al kahf, halal investment, islamic lifestyle"
        canonical="https://www.alummahai.com/blog"
      />

      {/* ── Hero ── */}
      <div style={{ background: 'linear-gradient(160deg,#0a2540 0%,#071a2e 100%)', padding: 'clamp(88px,12vh,120px) clamp(16px,5vw,48px) clamp(52px,7vw,72px)', textAlign: 'center' }}>
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
          <div style={{ display:'inline-block', padding:'4px 14px', background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.22)', borderRadius:99, fontSize:'0.56rem', fontWeight:800, color:'#D4AF37', letterSpacing:'0.3em', textTransform:'uppercase', marginBottom:14, fontFamily:"'DM Sans',sans-serif" }}>✦ Ummah Insights</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(2rem,6vw,3.8rem)', color:'#ffffff', marginBottom:12, letterSpacing:'-0.025em' }}>Islamic Blog</h1>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, color:'rgba(255,255,255,0.45)', fontSize:'1rem', maxWidth:380, margin:'0 auto' }}>Guides, wisdom and knowledge for the modern Muslim.</p>
        </motion.div>
      </div>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'clamp(40px,6vw,72px) clamp(16px,5vw,40px)' }}>

        {/* ── Featured ── */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }} style={{ marginBottom:48 }}>
          <Link to={`/blog/${featured.id}`} style={{ textDecoration:'none', display:'block' }}>
            <div style={{ borderRadius:18, overflow:'hidden', border:`1px solid ${S.bdr}`, display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', transition:'box-shadow 0.24s' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow='0 10px 40px rgba(10,37,64,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow='none')}>
              <div style={{ position:'relative', minHeight:240, overflow:'hidden' }}>
                <img src={featured.image} alt={featured.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.7s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform='scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform='scale(1)')} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(10,37,64,0.5),transparent)' }} />
                <div style={{ position:'absolute', top:16, left:16, display:'flex', gap:7 }}>
                  <span style={{ background:'#D4AF37', color:'#0a2540', padding:'3px 10px', borderRadius:99, fontSize:'0.56rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.14em', fontFamily:"'DM Sans',sans-serif" }}>Featured</span>
                  <span style={{ background:'rgba(10,37,64,0.75)', color:'#D4AF37', border:'1px solid rgba(212,175,55,0.3)', padding:'3px 10px', borderRadius:99, fontSize:'0.56rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.14em', fontFamily:"'DM Sans',sans-serif" }}>{featured.category}</span>
                </div>
              </div>
              <div style={{ padding:'clamp(24px,4vw,44px)', display:'flex', flexDirection:'column', justifyContent:'center', gap:12, background:'#ffffff' }}>
                <div style={{ display:'flex', gap:14, fontFamily:"'DM Sans',sans-serif", fontSize:'0.68rem', fontWeight:700, color:'rgba(10,37,64,0.4)', textTransform:'uppercase', letterSpacing:'0.1em' }}>
                  <span style={{ display:'flex', alignItems:'center', gap:4 }}><Calendar size={11}/>{featured.date}</span>
                  <span style={{ display:'flex', alignItems:'center', gap:4 }}><Clock size={11}/>{featured.readTime}</span>
                </div>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.2rem,3vw,1.75rem)', color:'#0a2540', lineHeight:1.25 }}>{featured.title}</h2>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, color:'rgba(10,37,64,0.55)', fontSize:'0.9rem', lineHeight:1.75 }}>{featured.excerpt}</p>
                <div style={{ display:'flex', alignItems:'center', gap:6, paddingTop:14, borderTop:'1px solid rgba(10,37,64,0.07)', fontFamily:"'DM Sans',sans-serif", fontSize:'0.68rem', fontWeight:800, color:'#b8941e', textTransform:'uppercase', letterSpacing:'0.14em' }}>
                  Read Article <ArrowRight size={12}/>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ── Trending ── */}
        <div style={{ marginBottom:52 }}>
          <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:18 }}>
            <TrendingUp size={14} style={{ color:'#D4AF37' }} />
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.62rem', fontWeight:800, color:'#D4AF37', textTransform:'uppercase', letterSpacing:'0.22em' }}>Trending Now</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:12 }}>
            {trending.map((p, i) => (
              <Link key={p.id} to={`/blog/${p.id}`} style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:13, padding:'14px 16px', borderRadius:13, border:`1px solid ${S.bdr}`, background:'#ffffff', transition:'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(212,175,55,0.35)'; e.currentTarget.style.boxShadow='0 4px 18px rgba(212,175,55,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=S.bdr; e.currentTarget.style.boxShadow='none'; }}>
                <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'1.4rem', color:'rgba(212,175,55,0.22)', width:32, flexShrink:0 }}>{String(i+1).padStart(2,'0')}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.58rem', fontWeight:800, color:'rgba(10,37,64,0.38)', textTransform:'uppercase', letterSpacing:'0.14em' }}>{p.category}</span>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:'0.9rem', color:'#0a2540', lineHeight:1.3, marginTop:3, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' as any }}>{p.title}</div>
                </div>
                <img src={p.image} alt={p.title} style={{ width:56, height:56, objectFit:'cover', borderRadius:9, flexShrink:0 }} />
              </Link>
            ))}
          </div>
        </div>

        {/* ── Category filter ── */}
        <div style={{ display:'flex', gap:7, flexWrap:'wrap', marginBottom:32 }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              style={{ padding:'6px 15px', borderRadius:99, border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'0.7rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.12em', transition:'all 0.16s', background:cat===c ? '#0a2540' : S.light, color:cat===c ? '#ffffff' : 'rgba(10,37,64,0.55)' }}>
              {c}
            </button>
          ))}
        </div>

        {/* ── Articles grid ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:20 }}>
          <AnimatePresence mode="popLayout">
            {grid.map((p, i) => (
              <motion.article key={p.id} layout
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, scale:0.96 }}
                transition={{ delay:i*0.04 }}
                style={{ borderRadius:16, border:`1px solid ${S.bdr}`, overflow:'hidden', background:'#ffffff', display:'flex', flexDirection:'column', transition:'all 0.22s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(212,175,55,0.3)'; (e.currentTarget as HTMLElement).style.boxShadow='0 8px 28px rgba(10,37,64,0.08)'; (e.currentTarget as HTMLElement).style.transform='translateY(-3px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor=S.bdr; (e.currentTarget as HTMLElement).style.boxShadow='none'; (e.currentTarget as HTMLElement).style.transform='translateY(0)'; }}>
                <div style={{ position:'relative', height:190, overflow:'hidden' }}>
                  <img src={p.image} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(10,37,64,0.45),transparent)' }} />
                  <span style={{ position:'absolute', bottom:12, left:12, background:'rgba(10,37,64,0.82)', color:'#D4AF37', border:'1px solid rgba(212,175,55,0.25)', padding:'3px 9px', borderRadius:99, fontSize:'0.55rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.12em', fontFamily:"'DM Sans',sans-serif" }}>{p.category}</span>
                  {p.trending && <span style={{ position:'absolute', top:12, right:12, background:'#D4AF37', color:'#0a2540', padding:'3px 8px', borderRadius:99, fontSize:'0.52rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:"'DM Sans',sans-serif", display:'flex', alignItems:'center', gap:3 }}><TrendingUp size={9}/> Hot</span>}
                </div>
                <div style={{ padding:'18px 18px 20px', flex:1, display:'flex', flexDirection:'column', gap:10 }}>
                  <div style={{ display:'flex', gap:12, fontFamily:"'DM Sans',sans-serif", fontSize:'0.64rem', fontWeight:600, color:'rgba(10,37,64,0.38)', textTransform:'uppercase', letterSpacing:'0.1em' }}>
                    <span style={{ display:'flex', alignItems:'center', gap:3 }}><Calendar size={10}/>{p.date}</span>
                    <span style={{ display:'flex', alignItems:'center', gap:3 }}><Clock size={10}/>{p.readTime}</span>
                  </div>
                  <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:'1rem', color:'#0a2540', lineHeight:1.3, flex:1 }}>{p.title}</h2>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, color:'rgba(10,37,64,0.5)', fontSize:'0.82rem', lineHeight:1.7, display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical' as any, overflow:'hidden' }}>{p.excerpt}</p>
                  <Link to={`/blog/${p.id}`} style={{ display:'inline-flex', alignItems:'center', gap:5, fontFamily:"'DM Sans',sans-serif", fontSize:'0.68rem', fontWeight:800, color:'#b8941e', textDecoration:'none', textTransform:'uppercase', letterSpacing:'0.12em', paddingTop:10, borderTop:'1px solid rgba(10,37,64,0.06)', marginTop:'auto' }}>
                    Read Article <ArrowRight size={11}/>
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop:56, background:'linear-gradient(135deg,#0a2540,#0d2e4d)', borderRadius:18, padding:'clamp(28px,4vw,48px)', textAlign:'center' }}>
          <div style={{ fontSize:'2rem', marginBottom:12 }}>📖</div>
          <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.4rem,3.5vw,2rem)', color:'#ffffff', marginBottom:8 }}>Never Miss an Article</h3>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, color:'rgba(255,255,255,0.42)', marginBottom:22, maxWidth:360, margin:'0 auto 22px' }}>New guides on prayer, Quran, halal finance and Islamic lifestyle weekly.</p>
          <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:7, background:'#D4AF37', color:'#0a2540', padding:'11px 22px', borderRadius:9, fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.76rem', textTransform:'uppercase', letterSpacing:'0.1em', textDecoration:'none' }}>
            Explore All Tools →
          </Link>
        </div>
      </div>
    </div>
  );
}
