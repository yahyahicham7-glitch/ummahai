import React, { useEffect, useState, useRef } from 'react';
import { PrayerWidget } from '@/src/components/PrayerWidget';
import { SEO } from '@/src/components/SEO';
import { BookOpen, MapPin, ArrowRight, Search, ChevronRight, Shield, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';

const PHRASES = [
  { ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', en: 'In the name of Allah, the Most Gracious' },
  { ar: 'اللَّهُ أَكْبَرُ', en: 'Allah is the Greatest' },
  { ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', en: 'Glory be to Allah and praise Him' },
  { ar: 'لَا إِلَٰهَ إِلَّا اللَّهُ', en: 'There is no god but Allah' },
];

const TOOLS = [
  { e:'🕐', t:'Prayer Times',     b:'Live', d:'GPS-accurate Fajr, Dhuhr, Asr, Maghrib & Isha.',    l:'/' },
  { e:'🧭', t:'Qibla Finder',     b:'GPS',  d:'Real-time compass direction toward the Holy Kaaba.', l:'/qibla' },
  { e:'📖', t:'Quran',            b:'Full', d:'Complete Quran with translations & verse search.',    l:'/quran' },
  { e:'💛', t:'Zakat Calculator', b:'2026', d:'Calculate your Zakat — 2026 Nisab rates.',            l:'/zakat' },
];

const LEARN = [
  { e:'🌙', t:'Ramadan 2026', h:'/ramadan',                     d:'Full timetable & spiritual guide' },
  { e:'🤲', t:'Daily Duas',   h:'/blog/morning-evening-adhkar', d:'Morning, evening & essential duas' },
  { e:'✍️', t:'Blog',         h:'/blog',                        d:'Islamic knowledge & life guides' },
  { e:'✨', t:'Scholar AI',   h:'/scholar',                     d:'Ask any Islamic question — free' },
];

const PILLS = [
  ['Ramadan 2026', '/blog/ramadan-2026-prayer-timetable'],
  ['Fajr Time',    '/blog/fajr-time-today'],
  ['Zakat 2026',   '/blog/calculate-zakat-2026'],
  ['How to Pray',  '/blog/how-to-pray-salah-beginners'],
  ['Surah Kahf',   '/blog/surah-al-kahf-friday'],
  ['Hajj 2026',    '/blog/hajj-packages-uk-2026'],
  ['Golden Age',   '/blog/islamic-history-golden-age'],
  ['Halal Invest', '/blog/best-halal-investment-apps-2026'],
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const r = useRef<HTMLDivElement>(null);
  const v = useInView(r, { once: true, margin: '-40px' });
  return (
    <motion.div ref={r} initial={{ opacity: 0, y: 18 }} animate={v ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

const Badge = ({ t }: { t: string }) => (
  <span style={{ display:'inline-block', padding:'3px 12px', marginBottom:10, background:'rgba(212,175,55,0.08)', border:'1px solid rgba(212,175,55,0.2)', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.57rem', fontWeight:800, letterSpacing:'0.28em', textTransform:'uppercase', color:'#b8941e' }}>{t}</span>
);

export function Home() {
  const [pi, setPi] = useState(0);
  const [vis, setVis] = useState(true);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const d = Math.ceil((new Date('2026-02-17').getTime() - Date.now()) / 86400000);
    setDays(d > 0 ? d : 0);
    const iv = setInterval(() => {
      setVis(false);
      setTimeout(() => { setPi(i => (i + 1) % PHRASES.length); setVis(true); }, 380);
    }, 4200);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ background: '#ffffff', color: '#0a2540', overflowX: 'hidden' }}>
      <SEO
        title="Prayer Times Near Me Today — Free Islamic Tools | Al Ummah AI"
        description="Accurate GPS prayer times for Fajr, Dhuhr, Asr, Maghrib & Isha. Qibla finder, Quran, Zakat calculator and Ramadan 2026 guide. Free for 1.8 billion Muslims."
        keywords="prayer times near me, fajr time today, qibla finder, quran, zakat calculator 2026, ramadan 2026"
        canonical="https://www.alummahai.com"
      />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{ background:'linear-gradient(165deg,#0a2540 0%,#0d2e4d 52%,#071a2e 100%)', minHeight:'88vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'clamp(90px,12vh,130px) clamp(16px,5vw,48px) clamp(60px,8vh,88px)', position:'relative', overflow:'hidden', textAlign:'center' }}>
        {/* Dot bg */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(212,175,55,0.09) 1px,transparent 1px)', backgroundSize:'36px 36px', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'min(600px,85vw)', height:'min(600px,85vw)', borderRadius:'50%', background:'radial-gradient(circle,rgba(212,175,55,0.06) 0%,transparent 65%)', pointerEvents:'none' }} />

        <div style={{ position:'relative', zIndex:1, maxWidth:660, width:'100%' }}>
          {/* Arabic phrase */}
          <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.05 }} style={{ marginBottom:24, minHeight:54 }}>
            <div style={{ fontFamily:"'Amiri',serif", fontSize:'clamp(1.1rem,3.5vw,2rem)', color:'#D4AF37', direction:'rtl', opacity:vis?1:0, transform:vis?'translateY(0)':'translateY(-5px)', transition:'all 0.38s cubic-bezier(0.16,1,0.3,1)', textShadow:'0 0 28px rgba(212,175,55,0.18)' }}>{PHRASES[pi].ar}</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.62rem', color:'rgba(212,175,55,0.4)', letterSpacing:'0.15em', marginTop:5, fontStyle:'italic', opacity:vis?1:0, transition:'opacity 0.38s ease 0.1s' }}>{PHRASES[pi].en}</div>
          </motion.div>

          {/* H1 — not too big */}
          <motion.h1 initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.14, duration:0.7, ease:[0.16,1,0.3,1] }}
            style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.85rem,4.5vw,3rem)', color:'#ffffff', lineHeight:1.15, letterSpacing:'-0.02em', marginBottom:14 }}>
            Prayer Times, <span style={{ color:'#D4AF37' }}>Qibla</span> &amp; Quran
            <br /><span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'clamp(0.9rem,2vw,1.1rem)', color:'rgba(255,255,255,0.38)', letterSpacing:'0', fontStyle:'normal' }}>Free Islamic Platform for 1.8 Billion Muslims</span>
          </motion.h1>

          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
            style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'clamp(0.9rem,1.8vw,1rem)', color:'rgba(255,255,255,0.45)', maxWidth:400, margin:'0 auto 30px', lineHeight:1.8 }}>
            GPS prayer times, Qibla compass, Quran, Zakat &amp; more — all free, in 5 languages.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.38 }}
            style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center', marginBottom:36 }}>
            <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:7, background:'#D4AF37', color:'#0a2540', padding:'12px 22px', borderRadius:10, fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.1em', textDecoration:'none', boxShadow:'0 6px 24px rgba(212,175,55,0.32)', transition:'all 0.2s' }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 10px 30px rgba(212,175,55,0.4)';}}
              onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 6px 24px rgba(212,175,55,0.32)';}}>
              <MapPin size={14}/> Use My Location
            </Link>
            <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.15)', color:'#ffffff', padding:'12px 22px', borderRadius:10, fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.1em', textDecoration:'none', transition:'all 0.2s' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(212,175,55,0.4)';e.currentTarget.style.color='#D4AF37';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.15)';e.currentTarget.style.color='#ffffff';}}>
              <Search size={13}/> Search City
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.55 }}
            style={{ display:'flex', gap:'clamp(14px,4vw,36px)', flexWrap:'wrap', justifyContent:'center', paddingTop:24, borderTop:'1px solid rgba(255,255,255,0.07)' }}>
            {[['1.8B+','Muslims'],['150+','Cities'],['5','Languages'],['100%','Free']].map(([n,l])=>(
              <div key={l} style={{ textAlign:'center' }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.3rem,2.8vw,1.65rem)', color:'#D4AF37', lineHeight:1 }}>{n}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:'0.56rem', color:'rgba(255,255,255,0.27)', textTransform:'uppercase', letterSpacing:'0.18em', marginTop:4 }}>{l}</div>
              </div>
            ))}
          </motion.div>

          {days > 0 && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.72 }} style={{ marginTop:20 }}>
              <Link to="/ramadan" style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'6px 15px', borderRadius:99, border:'1px solid rgba(212,175,55,0.22)', background:'rgba(212,175,55,0.07)', color:'#D4AF37', fontFamily:"'DM Sans',sans-serif", fontSize:'0.74rem', fontWeight:700, textDecoration:'none' }}>
                🌙 {days} days until Ramadan 2026 →
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══ TRUST BAR ══════════════════════════════════════ */}
      <div style={{ background:'#f7f8fa', borderBottom:'1px solid rgba(10,37,64,0.07)', padding:'11px clamp(16px,5vw,48px)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', flexWrap:'wrap', maxWidth:900, margin:'0 auto' }}>
          {[['📍','GPS prayer times'],['🧭','Real-time Qibla'],['📖','Full Quran'],['🛡️','Scholar verified']].map(([ic,tx],i,a)=>(
            <div key={String(tx)} style={{ display:'flex', alignItems:'center', gap:6, padding:'3px clamp(10px,2.5vw,22px)', borderRight:i<a.length-1?'1px solid rgba(10,37,64,0.07)':'none', whiteSpace:'nowrap' }}>
              <span style={{ fontSize:'0.82rem' }}>{ic}</span>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:'clamp(0.66rem,1.5vw,0.74rem)', color:'rgba(10,37,64,0.52)' }}>{tx}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══ PRAYER TIMES ═══════════════════════════════════ */}
      <section style={{ maxWidth:1100, margin:'0 auto', padding:'clamp(52px,7vw,84px) clamp(16px,5vw,48px)' }}>
        <Reveal>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <Badge t="✦ Live · GPS Accurate" />
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.65rem,4vw,2.6rem)', color:'#0a2540', marginBottom:9 }}>Prayer Times Near You</h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, color:'rgba(10,37,64,0.48)', maxWidth:320, margin:'0 auto', lineHeight:1.8, fontSize:'0.94rem' }}>Auto-detected from your GPS. Search any city worldwide.</p>
          </div>
        </Reveal>
        <Reveal delay={0.07}><PrayerWidget /></Reveal>
      </section>

      {/* ══ TOOLS ══════════════════════════════════════════ */}
      <section style={{ background:'linear-gradient(160deg,#0a2540 0%,#071a2e 100%)', padding:'clamp(52px,7vw,84px) clamp(16px,5vw,48px)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <Reveal>
            <div style={{ textAlign:'center', marginBottom:40 }}>
              <Badge t="✦ Sacred Tools" />
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.65rem,4vw,2.6rem)', color:'#ffffff' }}>Everything You Need</h2>
            </div>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))', gap:12, marginBottom:10 }}>
            {TOOLS.map((t,i)=>(
              <Reveal key={t.t} delay={i*0.07}>
                <Link to={t.l} style={{ display:'block', textDecoration:'none', height:'100%' }}>
                  <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:'22px 18px', height:'100%', position:'relative', transition:'all 0.26s cubic-bezier(0.16,1,0.3,1)' }}
                    onMouseEnter={e=>{const el=e.currentTarget;el.style.borderColor='rgba(212,175,55,0.35)';el.style.background='rgba(255,255,255,0.07)';el.style.transform='translateY(-4px)';}}
                    onMouseLeave={e=>{const el=e.currentTarget;el.style.borderColor='rgba(255,255,255,0.08)';el.style.background='rgba(255,255,255,0.04)';el.style.transform='translateY(0)';}}>
                    <span style={{ position:'absolute', top:13, right:13, fontSize:'0.5rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.14em', color:'#D4AF37', background:'rgba(212,175,55,0.12)', border:'1px solid rgba(212,175,55,0.2)', padding:'2px 7px', borderRadius:99, fontFamily:"'DM Sans',sans-serif" }}>{t.b}</span>
                    <div style={{ fontSize:'1.85rem', marginBottom:11 }}>{t.e}</div>
                    <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:'1.02rem', color:'#ffffff', marginBottom:5 }}>{t.t}</h3>
                    <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, color:'rgba(255,255,255,0.38)', fontSize:'0.8rem', lineHeight:1.65 }}>{t.d}</p>
                    <div style={{ marginTop:15, fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.62rem', color:'rgba(212,175,55,0.5)', textTransform:'uppercase', letterSpacing:'0.14em', display:'flex', alignItems:'center', gap:3 }}>Open <ChevronRight size={10}/></div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:7 }}>
            {[{l:'Hajj Guide',to:'/hajj',e:'🕋'},{l:'Ramadan',to:'/ramadan',e:'🌙'},{l:'Scholar AI',to:'/scholar',e:'✨'},{l:'Store',to:'/store',e:'🛍️'}].map(x=>(
              <Link key={x.l} to={x.to} style={{ display:'flex', alignItems:'center', gap:7, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:10, padding:'10px 12px', textDecoration:'none', fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:'0.78rem', color:'rgba(255,255,255,0.42)', transition:'all 0.18s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(212,175,55,0.28)';e.currentTarget.style.color='#D4AF37';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.07)';e.currentTarget.style.color='rgba(255,255,255,0.42)';}}>
                <span style={{ fontSize:'0.95rem' }}>{x.e}</span>{x.l}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LEARN ══════════════════════════════════════════ */}
      <section style={{ maxWidth:1100, margin:'0 auto', padding:'clamp(52px,7vw,84px) clamp(16px,5vw,48px)' }}>
        <Reveal>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:36, flexWrap:'wrap', gap:12 }}>
            <div>
              <Badge t="✦ Islamic Knowledge" />
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.6rem,3.5vw,2.5rem)', color:'#0a2540', marginBottom:5 }}>Learn &amp; Grow Daily</h2>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, color:'rgba(10,37,64,0.48)', fontSize:'0.93rem' }}>Guides, duas, articles and Scholar AI.</p>
            </div>
            <Link to="/blog" style={{ display:'inline-flex', alignItems:'center', gap:5, border:'1px solid rgba(212,175,55,0.28)', color:'#b8941e', padding:'7px 15px', borderRadius:99, textDecoration:'none', fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.68rem', textTransform:'uppercase', letterSpacing:'0.1em', transition:'all 0.18s', whiteSpace:'nowrap' }}
              onMouseEnter={e=>(e.currentTarget.style.background='rgba(212,175,55,0.06)')}
              onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
              All Articles <ArrowRight size={11}/>
            </Link>
          </div>
        </Reveal>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))', gap:12, marginBottom:22 }}>
          {LEARN.map((item,i)=>(
            <Reveal key={item.t} delay={i*0.07}>
              <Link to={item.h} style={{ display:'block', textDecoration:'none', height:'100%' }}>
                <div style={{ background:'#ffffff', border:'1px solid rgba(10,37,64,0.09)', borderRadius:14, padding:'20px 17px', height:'100%', transition:'all 0.24s cubic-bezier(0.16,1,0.3,1)' }}
                  onMouseEnter={e=>{const el=e.currentTarget;el.style.borderColor='rgba(212,175,55,0.32)';el.style.boxShadow='0 6px 22px rgba(212,175,55,0.07)';el.style.transform='translateY(-3px)';}}
                  onMouseLeave={e=>{const el=e.currentTarget;el.style.borderColor='rgba(10,37,64,0.09)';el.style.boxShadow='none';el.style.transform='translateY(0)';}}>
                  <div style={{ fontSize:'1.7rem', marginBottom:10 }}>{item.e}</div>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:'0.96rem', color:'#0a2540', marginBottom:4 }}>{item.t}</h3>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, color:'rgba(10,37,64,0.44)', fontSize:'0.8rem', lineHeight:1.65 }}>{item.d}</p>
                  <div style={{ marginTop:12, fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.61rem', color:'rgba(212,175,55,0.55)', textTransform:'uppercase', letterSpacing:'0.14em' }}>Explore →</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.06}>
          <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:26 }}>
            {PILLS.map(([l,h])=>(
              <Link key={l} to={h} style={{ padding:'5px 13px', background:'rgba(10,37,64,0.04)', border:'1px solid rgba(10,37,64,0.09)', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:'0.72rem', color:'rgba(10,37,64,0.52)', textDecoration:'none', transition:'all 0.16s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(212,175,55,0.35)';e.currentTarget.style.color='#b8941e';e.currentTarget.style.background='rgba(212,175,55,0.04)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(10,37,64,0.09)';e.currentTarget.style.color='rgba(10,37,64,0.52)';e.currentTarget.style.background='rgba(10,37,64,0.04)';}}>
                {l}
              </Link>
            ))}
          </div>
        </Reveal>

        {/* Scholar AI banner */}
        <Reveal>
          <Link to="/scholar" style={{ display:'block', textDecoration:'none' }}>
            <div style={{ background:'linear-gradient(120deg,#0a2540 0%,#0d2e4d 100%)', borderRadius:16, padding:'clamp(20px,3.5vw,32px)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16, border:'1px solid rgba(255,255,255,0.05)', transition:'transform 0.22s cubic-bezier(0.16,1,0.3,1)' }}
              onMouseEnter={e=>(e.currentTarget.style.transform='translateY(-2px)')}
              onMouseLeave={e=>(e.currentTarget.style.transform='translateY(0)')}>
              <div>
                <div style={{ fontSize:'1.65rem', marginBottom:7 }}>✨</div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:'clamp(1.05rem,2.5vw,1.4rem)', color:'#ffffff', marginBottom:4 }}>Ask Scholar AI</h3>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, color:'rgba(255,255,255,0.4)', fontSize:'0.85rem', maxWidth:340, lineHeight:1.75 }}>Islamic questions answered from Quran and Sunnah — in your language.</p>
              </div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'#D4AF37', color:'#0a2540', padding:'10px 19px', borderRadius:9, fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.74rem', textTransform:'uppercase', letterSpacing:'0.09em', whiteSpace:'nowrap', flexShrink:0 }}>
                Ask a Question <ArrowRight size={13}/>
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* ══ WHY SECTION ════════════════════════════════════ */}
      <section style={{ background:'#f7f8fa', borderTop:'1px solid rgba(10,37,64,0.06)', padding:'clamp(52px,7vw,84px) clamp(16px,5vw,48px)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:48, alignItems:'start' }}>
              <div>
                <Badge t="✦ What We Offer" />
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.5rem,3.2vw,2.2rem)', color:'#0a2540', marginBottom:14, lineHeight:1.15 }}>Your Complete Islamic Companion</h2>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, color:'rgba(10,37,64,0.58)', lineHeight:1.85, fontSize:'0.94rem', marginBottom:14 }}>Al Ummah AI brings together the essential Islamic tools every Muslim needs — prayer times by GPS, Qibla direction, full Quran, Zakat calculator, Ramadan guides and Scholar AI — all free, in 5 languages.</p>
                <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:7 }}>
                  {['GPS prayer times for 150+ countries','Real-time Qibla compass','Complete Quran with translations','Zakat calculator — 2026 Nisab rates','Ramadan 2026 full timetable','Daily duas — morning & evening','Islamic articles & knowledge','Scholar AI in your language'].map(it=>(
                    <li key={it} style={{ display:'flex', alignItems:'flex-start', gap:8 }}>
                      <span style={{ color:'#D4AF37', fontSize:'0.76rem', marginTop:3, flexShrink:0 }}>✦</span>
                      <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.85rem', color:'rgba(10,37,64,0.62)', lineHeight:1.6 }}>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Badge t="✦ Why Al Ummah AI" />
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.5rem,3.2vw,2.2rem)', color:'#0a2540', marginBottom:14, lineHeight:1.15 }}>Built for the Global Ummah</h2>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, color:'rgba(10,37,64,0.58)', lineHeight:1.85, fontSize:'0.94rem', marginBottom:22 }}>Combining modern technology with verified Islamic knowledge — free for every Muslim, forever.</p>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:11 }}>
                  {[
                    { i:<Shield size={17}/>, t:'Scholar Verified',  d:'Content reviewed by qualified scholars.' },
                    { i:<MapPin  size={17}/>, t:'GPS Precision',    d:'Exact prayer times for your location.' },
                    { i:<Globe   size={17}/>, t:'5 Languages',      d:'EN, AR, FR, ES and Indonesian.' },
                    { i:<Zap     size={17}/>, t:'Always Free',      d:'Every tool, 100% free. No signup.' },
                  ].map(item=>(
                    <div key={item.t} style={{ background:'#ffffff', border:'1px solid rgba(10,37,64,0.08)', borderRadius:13, padding:'15px 13px', transition:'all 0.22s' }}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(212,175,55,0.3)';e.currentTarget.style.boxShadow='0 5px 18px rgba(212,175,55,0.07)';}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(10,37,64,0.08)';e.currentTarget.style.boxShadow='none';}}>
                      <div style={{ color:'#D4AF37', marginBottom:7 }}>{item.i}</div>
                      <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:'0.9rem', color:'#0a2540', marginBottom:4 }}>{item.t}</h3>
                      <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.74rem', color:'rgba(10,37,64,0.48)', lineHeight:1.65 }}>{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FINAL CTA ══════════════════════════════════════ */}
      <section style={{ background:'linear-gradient(160deg,#0a2540 0%,#071a2e 100%)', padding:'clamp(52px,7vw,84px) clamp(16px,5vw,48px)', textAlign:'center' }}>
        <Reveal>
          <div style={{ maxWidth:500, margin:'0 auto' }}>
            <div style={{ fontSize:'2.2rem', marginBottom:14 }}>🌙</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.7rem,5vw,2.9rem)', color:'#ffffff', lineHeight:1.1, letterSpacing:'-0.02em', marginBottom:11 }}>
              Start your journey <span style={{ color:'#D4AF37' }}>today</span>
            </h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, color:'rgba(255,255,255,0.42)', fontSize:'0.97rem', maxWidth:340, margin:'0 auto 28px', lineHeight:1.8 }}>Prayer times, Quran, Qibla, Zakat — everything free, forever.</p>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center' }}>
              <Link to="/quran" style={{ display:'inline-flex', alignItems:'center', gap:7, background:'#D4AF37', color:'#0a2540', padding:'11px 22px', borderRadius:9, fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.76rem', textTransform:'uppercase', letterSpacing:'0.1em', textDecoration:'none', boxShadow:'0 5px 22px rgba(212,175,55,0.28)', transition:'transform 0.2s' }}
                onMouseEnter={e=>(e.currentTarget.style.transform='translateY(-2px)')}
                onMouseLeave={e=>(e.currentTarget.style.transform='translateY(0)')}>
                <BookOpen size={13}/> Read Quran
              </Link>
              <Link to="/blog" style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.13)', color:'#ffffff', padding:'11px 22px', borderRadius:9, fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.76rem', textTransform:'uppercase', letterSpacing:'0.1em', textDecoration:'none', transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(212,175,55,0.35)';e.currentTarget.style.color='#D4AF37';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.13)';e.currentTarget.style.color='#ffffff';}}>
                Explore Blog
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
