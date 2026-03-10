import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  MapPin, Search, Moon, BookOpen, Compass, Calculator,
  Star, MessageSquare, ShoppingBag, ArrowRight, ChevronDown,
  Sparkles, Globe,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

/* ══════════════════════════════════════════════════════════════
   DESIGN TOKENS
══════════════════════════════════════════════════════════════ */
const G = {
  navy:    '#060f1e',
  navyMid: '#0a2540',
  navySec: '#0d1b38',
  gold:    '#D4AF37',
  goldLt:  '#F1D279',
  white:   '#ffffff',
  w55:     'rgba(255,255,255,0.55)',
  w38:     'rgba(255,255,255,0.38)',
  w22:     'rgba(255,255,255,0.22)',
  w08:     'rgba(255,255,255,0.08)',
  w05:     'rgba(255,255,255,0.05)',
  g20:     'rgba(212,175,55,0.20)',
  g12:     'rgba(212,175,55,0.12)',
  g08:     'rgba(212,175,55,0.08)',
  g04:     'rgba(212,175,55,0.04)',
  border:  'rgba(255,255,255,0.07)',
  bGold:   'rgba(212,175,55,0.18)',
};

const PRAYERS   = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;
const P_EMOJI: Record<string, string> = { Fajr:'🌙', Dhuhr:'☀️', Asr:'🌤', Maghrib:'🌅', Isha:'🌃' };

const VERSES = [
  { ar:'إِنَّ مَعَ الْعُسْرِ يُسْرًا',                          en:'Indeed, with hardship comes ease.',            ref:'Ash-Sharh 94:6'   },
  { ar:'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ',  en:'When My servants ask about Me — I am near.',   ref:'Al-Baqarah 2:186' },
  { ar:'فَاذْكُرُونِي أَذْكُرْكُمْ',                           en:'Remember Me and I will remember you.',         ref:'Al-Baqarah 2:152' },
  { ar:'وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ',                  en:'He is with you wherever you are.',             ref:'Al-Hadid 57:4'    },
];

const LANGS = [
  { code:'en', label:'EN', native:'English' },
  { code:'ar', label:'AR', native:'العربية', dir:'rtl' },
  { code:'fr', label:'FR', native:'Français' },
  { code:'es', label:'ES', native:'Español' },
];

/* ══════════════════════════════════════════════════════════════
   HIJRI DATE
══════════════════════════════════════════════════════════════ */
function HijriDate() {
  const h = useMemo(() => {
    const now = new Date();
    const jd = Math.floor(now.getTime()/86400000)+2440588;
    const l=jd-1948440+10632, n=Math.floor((l-1)/10631), l2=l-10631*n+354;
    const j=Math.floor((10985-l2)/5316)*Math.floor(50*l2/17719)+Math.floor(l2/5670)*Math.floor(43*l2/15238);
    const l3=l2-Math.floor((30-j)/15)*Math.floor(17719*j/50)-Math.floor(j/16)*Math.floor(15238*j/43)+29;
    const month=Math.floor(24*l3/709), day=l3-Math.floor(709*month/24), year=30*n+j-30;
    const ms=["Muharram","Safar","Rabi' al-Awwal","Rabi' al-Thani","Jumada al-Awwal","Jumada al-Thani","Rajab","Sha'ban","Ramadan","Shawwal","Dhul Qi'dah","Dhul Hijjah"];
    return { day, month: ms[Math.max(0,month-1)]||'', year };
  }, []);
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[9px] font-black tracking-[0.3em] uppercase"
      style={{ background:G.g08, border:`1px solid ${G.bGold}`, color:G.gold, opacity:0.85 }}>
      {h.day} {h.month} {h.year} AH
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════
   WORLD MAP CANVAS  — decorative globe dots
══════════════════════════════════════════════════════════════ */
function WorldMapBg() {
  const ref = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ctx = el.getContext('2d')!;
    const dpr = window.devicePixelRatio || 1;
    const setSize = () => {
      el.width = el.offsetWidth * dpr;
      el.height = el.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Muslim-majority city coordinates [lat, lon]
    const cities = [
      [21.4,39.8], [51.5,-0.1], [41.0,29.0], [25.2,55.3], [30.0,31.2],
      [-6.2,106.8], [48.9,2.3], [40.7,-74.0], [3.1,101.7], [24.9,67.0],
      [40.4,-3.7], [6.5,3.4], [34.0,-5.0], [33.9,35.5], [36.7,3.2],
      [15.6,32.5], [23.7,90.4], [13.5,-2.1], [12.4,-1.5], [9.0,38.7],
      [60.2,24.9], [52.4,4.9], [50.1,8.7], [45.5,-73.6], [43.7,-79.4],
    ];

    const toXY = (lat: number, lon: number, W: number, H: number) => ({
      x: ((lon + 180) / 360) * W,
      y: ((90 - lat) / 180) * H,
    });

    let frame = 0;
    const render = () => {
      frame++;
      const t = frame * 0.008;
      const W = el.offsetWidth, H = el.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      // Draw subtle connection lines between nearby cities
      ctx.strokeStyle = 'rgba(212,175,55,0.04)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < cities.length; i++) {
        for (let j = i + 1; j < cities.length; j++) {
          const a = toXY(cities[i][0], cities[i][1], W, H);
          const b = toXY(cities[j][0], cities[j][1], W, H);
          const dist = Math.sqrt((a.x-b.x)**2 + (a.y-b.y)**2);
          if (dist < W * 0.18) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }

      // Draw city dots
      cities.forEach(([lat, lon], i) => {
        const { x, y } = toXY(lat, lon, W, H);
        const pulse = 0.4 + 0.6 * Math.sin(t * 0.9 + i * 0.7);
        const r = 1.8 + 1.2 * pulse;
        ctx.save();
        ctx.globalAlpha = 0.25 + 0.35 * pulse;
        // Glow
        const grd = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
        grd.addColorStop(0, 'rgba(212,175,55,0.35)'); grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(x, y, r*3, 0, Math.PI*2); ctx.fill();
        // Dot
        ctx.globalAlpha = 0.55 + 0.45 * pulse;
        ctx.fillStyle = G.gold; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
        ctx.restore();
      });

      animRef.current = requestAnimationFrame(render);
    };
    render();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', setSize); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.7 }} />;
}

/* ══════════════════════════════════════════════════════════════
   ISLAMIC GEOMETRY BG — star grid
══════════════════════════════════════════════════════════════ */
function GeoBg() {
  const ref = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ctx = el.getContext('2d')!;
    const resize = () => { el.width = window.innerWidth; el.height = window.innerHeight; };
    resize(); window.addEventListener('resize', resize);
    const onMouse = (e: MouseEvent) => { mouse.current = { x: e.clientX/el.width, y: e.clientY/el.height }; };
    window.addEventListener('mousemove', onMouse);

    const star8 = (x:number,y:number,r:number,rot:number,a:number) => {
      ctx.save(); ctx.translate(x,y); ctx.rotate(rot); ctx.globalAlpha=a;
      ctx.strokeStyle=G.gold; ctx.lineWidth=0.45;
      ctx.beginPath();
      for(let i=0;i<16;i++){const ang=(i*Math.PI)/8,rad=i%2===0?r:r*0.42;i===0?ctx.moveTo(rad*Math.cos(ang),rad*Math.sin(ang)):ctx.lineTo(rad*Math.cos(ang),rad*Math.sin(ang));}
      ctx.closePath(); ctx.stroke();
      ctx.restore();
    };

    let frame = 0;
    const render = () => {
      frame++;
      const t = frame * 0.0014;
      const W = el.width, H = el.height;
      ctx.clearRect(0,0,W,H);
      const mx=mouse.current.x, my=mouse.current.y;
      const grd=ctx.createRadialGradient(W*mx,H*my,0,W*mx,H*my,W*0.55);
      grd.addColorStop(0,'rgba(212,175,55,0.03)'); grd.addColorStop(1,'transparent');
      ctx.fillStyle=grd; ctx.fillRect(0,0,W,H);
      const sp=150, cols=Math.ceil(W/sp)+2, rows=Math.ceil(H/sp)+2;
      for(let row=-1;row<=rows;row++){
        for(let col=-1;col<=cols;col++){
          const cx=col*sp+(row%2===0?0:sp*0.5), cy=row*sp*0.866;
          const dist=Math.sqrt(((cx/W)-0.5)**2+((cy/H)-0.5)**2);
          const pulse=0.4+0.6*Math.sin(t*1.1+col*0.5+row*0.4);
          const alpha=(0.008+0.018*(1-Math.min(dist*1.7,1)))*pulse;
          star8(cx,cy,17+3*Math.sin(t*0.4+col+row),t*0.045+col*0.008,alpha);
        }
      }
      animRef.current = requestAnimationFrame(render);
    };
    render();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMouse); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{ mixBlendMode:'screen', opacity:0.8 }} />;
}

/* ══════════════════════════════════════════════════════════════
   PRAYER PANEL
══════════════════════════════════════════════════════════════ */
function PrayerPanel() {
  const [loading, setLoading]       = useState(false);
  const [searchInput, setInput]     = useState('');
  const [error, setError]           = useState('');
  const [city, setCity]             = useState('');
  const [prayers, setPrayers]       = useState<{name:string;time:string;isNext:boolean}[]>([]);
  const [countdown, setCountdown]   = useState('');
  const [nextName, setNextName]     = useState('');

  const applyData = useCallback((data: any) => {
    const timings = data?.data?.timings; if (!timings) return;
    const meta = data?.data?.meta;
    setCity(meta?.timezone?.split('/').pop()?.replace(/_/g,' ')||'');
    const now = new Date(), nowM = now.getHours()*60+now.getMinutes();
    let nextM=24*60, nextN='Fajr';
    PRAYERS.forEach(p => {
      const t=timings[p]; if(!t) return;
      const [h,m]=t.split(':').map(Number), total=h*60+m;
      if(total>nowM && total<nextM){nextM=total; nextN=p;}
    });
    setNextName(nextN);
    setPrayers(PRAYERS.map(p=>({name:p, time:(timings[p]||'--:--').slice(0,5), isNext:p===nextN})));
  }, []);

  useEffect(() => {
    const raw=localStorage.getItem('prayerTimes');
    if(raw) try { applyData(JSON.parse(raw)); } catch{}
    const id=setInterval(()=>{const r=localStorage.getItem('prayerTimes'); if(r) try{applyData(JSON.parse(r));}catch{}},30000);
    return ()=>clearInterval(id);
  }, [applyData]);

  useEffect(() => {
    const tick = () => {
      try {
        const raw=localStorage.getItem('prayerTimes'); if(!raw) return;
        const timings=JSON.parse(raw)?.data?.timings; if(!timings) return;
        const now=new Date(), nowS=now.getHours()*3600+now.getMinutes()*60+now.getSeconds();
        let nextS=24*3600;
        PRAYERS.forEach(p=>{const t=timings[p]; if(!t) return; const [h,m]=t.split(':').map(Number),s=h*3600+m*60; if(s>nowS&&s<nextS) nextS=s;});
        if(nextS===24*3600){const f=timings['Fajr']; if(f){const [h,m]=f.split(':').map(Number); nextS=h*3600+m*60+24*3600;}}
        const diff=Math.max(0,nextS-nowS), h=Math.floor(diff/3600), min=Math.floor((diff%3600)/60), sec=diff%60;
        setCountdown(`${String(h).padStart(2,'0')}:${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`);
      } catch{}
    };
    tick(); const id=setInterval(tick,1000); return ()=>clearInterval(id);
  }, []);

  const fetchGPS = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const pos=await new Promise<GeolocationPosition>((res,rej)=>navigator.geolocation.getCurrentPosition(res,rej,{timeout:9000}));
      const {latitude:lat,longitude:lon}=pos.coords, d=new Date();
      const r=await fetch(`https://api.aladhan.com/v1/timings/${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}?latitude=${lat}&longitude=${lon}&method=2`);
      const data=await r.json(); if(data.code!==200) throw new Error();
      localStorage.setItem('prayerTimes',JSON.stringify(data)); applyData(data);
    } catch { setError('Location access denied. Search your city below.'); }
    finally { setLoading(false); }
  }, [applyData]);

  const fetchCity = useCallback(async (q=searchInput) => {
    if(!q.trim()) return; setLoading(true); setError('');
    try {
      const d=new Date();
      const r=await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(q.trim())}&country=&method=2&date=${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`);
      const data=await r.json(); if(data.code!==200) throw new Error();
      localStorage.setItem('prayerTimes',JSON.stringify(data)); applyData(data); setCity(q.trim());
    } catch { setError('City not found. Try "London", "Dubai" or "Cairo".'); }
    finally { setLoading(false); }
  }, [searchInput, applyData]);

  const hasTimes = prayers.length > 0;

  return (
    <div className="rounded-2xl p-5 relative overflow-hidden"
      style={{ background:'rgba(6,15,30,0.72)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)', border:`1px solid ${G.bGold}`, boxShadow:'0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.09)' }}>
      {/* Corner accents */}
      {[['top-2.5 left-2.5','rotate-0'],['top-2.5 right-2.5','rotate-90'],['bottom-2.5 right-2.5','rotate-180'],['bottom-2.5 left-2.5','-rotate-90']].map(([pos,rot],i)=>(
        <svg key={i} className={`absolute ${pos} ${rot}`} width="9" height="9" viewBox="0 0 9 9" style={{opacity:0.28}}>
          <path d="M1 7 L1 1 L7 1" stroke={G.gold} strokeWidth="1.1" fill="none"/>
        </svg>
      ))}
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1.5">
          <MapPin style={{width:'0.7rem',height:'0.7rem',color:G.gold}}/>
          <span className="text-[11px] font-black" style={{color:G.w55}}>{city||'Prayer Times'}</span>
        </div>
        {countdown&&nextName&&(
          <div className="text-right">
            <div className="text-[7.5px] font-black uppercase tracking-wider" style={{color:G.gold,opacity:0.55}}>Until {nextName}</div>
            <div className="text-sm font-black tabular-nums" style={{color:G.white}}>{countdown}</div>
          </div>
        )}
      </div>
      {/* Prayer rows */}
      {hasTimes ? (
        <div className="grid grid-cols-5 gap-1.5 mb-4">
          {prayers.map(p=>(
            <div key={p.name} className="text-center py-2.5 px-1 rounded-xl"
              style={{ background:p.isNext?'rgba(212,175,55,0.13)':G.w05, border:`1px solid ${p.isNext?'rgba(212,175,55,0.38)':G.border}` }}>
              <div className="text-sm mb-0.5">{P_EMOJI[p.name]}</div>
              <div className="text-[7px] font-black uppercase tracking-wide" style={{color:p.isNext?G.gold:G.w38}}>{p.name}</div>
              <div className="text-[10px] font-black tabular-nums mt-0.5" style={{color:p.isNext?G.white:G.w55}}>{p.time}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-center mb-4" style={{color:G.w38}}>Get accurate prayer times for your city</p>
      )}
      {/* CTA */}
      <div className="space-y-2">
        <button onClick={fetchGPS} disabled={loading}
          className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl font-black text-[10.5px] uppercase tracking-widest transition-all hover:scale-[1.01]"
          style={{ background:loading?G.g12:`linear-gradient(135deg,${G.gold},${G.goldLt})`, color:loading?G.gold:'#060f1e', border:loading?`1px solid ${G.g20}`:'none', opacity:loading?0.7:1 }}>
          <MapPin style={{width:'0.78rem',height:'0.78rem'}}/>
          <span>{loading?'Detecting…':'Use My Location'}</span>
        </button>
        <div className="flex space-x-2">
          <input value={searchInput} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&fetchCity()}
            placeholder="Search city (e.g. London)"
            className="flex-1 px-3 py-2.5 rounded-xl text-xs font-medium outline-none transition-all"
            style={{ background:G.w05, border:`1px solid ${G.border}`, color:G.white }}
            onFocus={e=>{e.currentTarget.style.borderColor=G.g20;}} onBlur={e=>{e.currentTarget.style.borderColor=G.border;}}/>
          <button onClick={()=>fetchCity()} disabled={loading}
            className="px-3 rounded-xl transition-all hover:scale-105"
            style={{ background:G.w05, border:`1px solid rgba(212,175,55,0.22)` }}>
            <Search style={{width:'0.85rem',height:'0.85rem',color:G.gold}}/>
          </button>
        </div>
        {error&&<p className="text-[9.5px] text-center" style={{color:'#ff6b6b'}}>{error}</p>}
      </div>
      {/* Quick tools */}
      <div className="grid grid-cols-3 gap-1.5 mt-3">
        {([{icon:Compass,label:'Qibla',href:'/qibla'},{icon:BookOpen,label:'Quran',href:'/quran'},{icon:Calculator,label:'Zakat',href:'/zakat'}] as const).map(item=>(
          <Link key={item.href} to={item.href}
            className="flex flex-col items-center py-2.5 rounded-xl font-black text-[8.5px] uppercase tracking-wide transition-all hover:scale-[1.03]"
            style={{ background:G.w05, border:`1px solid ${G.border}`, color:G.w38 }}
            onMouseEnter={e=>{e.currentTarget.style.background=G.g08;e.currentTarget.style.color=G.gold;e.currentTarget.style.borderColor=G.bGold;}}
            onMouseLeave={e=>{e.currentTarget.style.background=G.w05;e.currentTarget.style.color=G.w38;e.currentTarget.style.borderColor=G.border;}}>
            <item.icon style={{width:'0.85rem',height:'0.85rem',marginBottom:'0.22rem'}}/>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   TRUST BAR
══════════════════════════════════════════════════════════════ */
function TrustBar() {
  const items=['Accurate prayer times by location','Real-time Qibla direction','Quran with audio & translations','Clean Islamic experience','Always free · No account needed','190+ countries · 6M+ cities'];
  const doubled=[...items,...items];
  return (
    <div className="relative overflow-hidden py-3" style={{ background:'rgba(255,255,255,0.018)', borderTop:`1px solid ${G.border}`, borderBottom:`1px solid ${G.border}` }}>
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10" style={{background:`linear-gradient(to right,${G.navy},transparent)`}}/>
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10" style={{background:`linear-gradient(to left,${G.navy},transparent)`}}/>
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item,i)=>(
          <span key={i} className="mx-12 flex items-center space-x-2 text-[9.5px] font-black tracking-widest uppercase" style={{color:G.w22}}>
            <span style={{color:G.gold,opacity:0.4}}>✦</span>
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION WRAPPER (color-evolution per section)
══════════════════════════════════════════════════════════════ */
function Section({ bg='transparent', children, className='' }: { bg?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative ${className}`} style={{ background: bg }}>
      {children}
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION HEADER
══════════════════════════════════════════════════════════════ */
function SH({ sup, title, accent }: { sup:string; title:string; accent:string }) {
  return (
    <div className="mb-12">
      <p className="text-[9px] font-black tracking-[0.45em] uppercase mb-3" style={{color:G.gold,opacity:0.55}}>{sup}</p>
      <h2 className="text-3xl md:text-4xl font-black leading-tight" style={{color:G.white,letterSpacing:'-0.02em'}}>
        {title}<br/>
        <span style={{background:`linear-gradient(135deg,${G.gold},${G.goldLt})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>{accent}</span>
      </h2>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CARD
══════════════════════════════════════════════════════════════ */
function Card({ to, Icon, title, desc, tag, delay=0, inView }: { to:string; Icon:React.ElementType; title:string; desc:string; tag?:string; delay?:number; inView:boolean }) {
  return (
    <motion.div initial={{opacity:0,y:22}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.5,delay}}>
      <Link to={to} className="group flex flex-col h-full p-6 rounded-2xl transition-all duration-200"
        style={{ background:G.w05, border:`1px solid ${G.border}` }}
        onMouseEnter={e=>{e.currentTarget.style.background=G.g08;e.currentTarget.style.borderColor=G.bGold;e.currentTarget.style.transform='translateY(-3px)';}}
        onMouseLeave={e=>{e.currentTarget.style.background=G.w05;e.currentTarget.style.borderColor=G.border;e.currentTarget.style.transform='translateY(0)';}}>
        <div className="flex items-start justify-between mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:G.g08,border:`1px solid ${G.g20}`}}>
            <Icon style={{width:'1rem',height:'1rem',color:G.gold}}/>
          </div>
          {tag&&<span className="text-[7.5px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full ml-2 flex-shrink-0" style={{background:G.g08,color:G.gold,opacity:0.75,border:`1px solid ${G.g12}`}}>{tag}</span>}
        </div>
        <h3 className="font-black text-sm mb-2 leading-snug" style={{color:G.white}}>{title}</h3>
        <p className="text-xs leading-relaxed flex-grow" style={{color:G.w38}}>{desc}</p>
        <div className="mt-4 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[8px] font-black tracking-widest uppercase" style={{color:G.gold}}>Open</span>
          <ArrowRight style={{width:'0.7rem',height:'0.7rem',color:G.gold}}/>
        </div>
      </Link>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CORE TOOLS
══════════════════════════════════════════════════════════════ */
function CoreTools() {
  const ref=useRef<HTMLDivElement>(null);
  const inView=useInView(ref,{once:true,margin:'-60px'});
  const tools=[
    {Icon:Moon,title:'Prayer Times',desc:'GPS-precise Fajr, Dhuhr, Asr, Maghrib & Isha. Accurate to the minute for 6M+ cities.',href:'/',tag:'Most Used'},
    {Icon:Compass,title:'Qibla Finder',desc:'Real-time compass direction toward the Kaaba from anywhere on Earth.',href:'/qibla'},
    {Icon:BookOpen,title:'Holy Quran',desc:'Complete Quran with 15 translations, transliteration and audio recitation.',href:'/quran',tag:'15 Languages'},
    {Icon:Calculator,title:'Zakat Calculator',desc:'Calculate your exact annual Zakat obligation for 2026 in under 2 minutes.',href:'/zakat',tag:'2026'},
  ];
  return (
    <Section bg={G.navy} className="py-24 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6}}>
          <SH sup="Core Tools" title="Everything a Muslim needs." accent="Always free."/>
        </motion.div>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((t,i)=><Card key={t.href} to={t.href} Icon={t.Icon} title={t.title} desc={t.desc} tag={t.tag} delay={i*0.07} inView={inView}/>)}
        </div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   DAILY VERSE
══════════════════════════════════════════════════════════════ */
function DailyVerse() {
  const [idx,setIdx]=useState(0);
  const ref=useRef<HTMLDivElement>(null);
  const inView=useInView(ref,{once:true});
  useEffect(()=>{const id=setInterval(()=>setIdx(i=>(i+1)%VERSES.length),9000);return()=>clearInterval(id);},[]);
  return (
    <Section bg={G.navySec} className="px-5 py-16">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.8}}
          className="rounded-3xl p-10 md:p-14 relative overflow-hidden"
          style={{ background:'linear-gradient(135deg,rgba(13,31,60,0.95) 0%,rgba(6,15,30,0.98) 100%)', border:`1px solid ${G.bGold}` }}>
          <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none opacity-40" style={{background:'radial-gradient(circle at 75% 25%,rgba(212,175,55,0.07),transparent 65%)'}}/>
          <div className="relative text-center max-w-2xl mx-auto">
            <p className="text-[8.5px] font-black tracking-[0.5em] uppercase mb-8" style={{color:G.gold,opacity:0.45}}>Daily Verse</p>
            <AnimatePresence mode="wait">
              <motion.div key={idx} initial={{opacity:0,y:12,filter:'blur(6px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} exit={{opacity:0,y:-12,filter:'blur(6px)'}} transition={{duration:0.6}} className="space-y-5">
                <p className="text-2xl md:text-3xl leading-loose" style={{fontFamily:'Amiri,serif',color:G.gold,direction:'rtl',textShadow:'0 0 30px rgba(212,175,55,0.2)'}}>{VERSES[idx].ar}</p>
                <p className="text-base md:text-lg italic leading-relaxed" style={{fontFamily:'Cormorant Garamond,serif',color:'rgba(255,255,255,0.62)'}}>&ldquo;{VERSES[idx].en}&rdquo;</p>
                <p className="text-[8.5px] font-black tracking-widest uppercase" style={{color:G.gold,opacity:0.38}}>{VERSES[idx].ref}</p>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center space-x-1.5 mt-8">
              {VERSES.map((_,i)=>(
                <button key={i} onClick={()=>setIdx(i)} style={{width:i===idx?'1.5rem':'0.35rem',height:'0.35rem',borderRadius:'9999px',background:i===idx?G.gold:'rgba(255,255,255,0.14)',transition:'all 0.3s'}}/>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   DAILY GUIDANCE
══════════════════════════════════════════════════════════════ */
function DailyGuidance() {
  const ref=useRef<HTMLDivElement>(null);
  const inView=useInView(ref,{once:true,margin:'-60px'});
  const items=[
    {Icon:Star,title:'Ramadan 2026',desc:'Suhoor & Iftar times, duas, and a complete guide for the last 10 nights.',href:'/ramadan',tag:'Guide'},
    {Icon:BookOpen,title:'Islamic Articles',desc:'In-depth guides on prayer, finance, Hajj, spirituality and more.',href:'/blog',tag:'Knowledge'},
    {Icon:MessageSquare,title:'Scholar AI',desc:'Ask any Islamic question. Answers grounded in Quran & authentic Hadith.',href:'/scholar',tag:'AI'},
    {Icon:Sparkles,title:'Halal Finance',desc:'Wahed Invest, Islamic ETFs, halal banking and Zakat made simple.',href:'/halal-money',tag:'Finance'},
  ];
  return (
    <Section bg={G.navy} className="py-20 px-5">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6}}>
          <SH sup="Daily Guidance" title="Grow in knowledge" accent="and faith."/>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((t,i)=><Card key={t.href} to={t.href} Icon={t.Icon} title={t.title} desc={t.desc} tag={t.tag} delay={i*0.07} inView={inView}/>)}
        </div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   WORLD MAP SECTION — global reach visual
══════════════════════════════════════════════════════════════ */
function GlobalReach() {
  const ref=useRef<HTMLDivElement>(null);
  const inView=useInView(ref,{once:true});
  return (
    <Section bg={G.navySec} className="py-20 px-5">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7}} className="text-center mb-10">
          <p className="text-[9px] font-black tracking-[0.45em] uppercase mb-3" style={{color:G.gold,opacity:0.55}}>Global Platform</p>
          <h2 className="text-3xl md:text-4xl font-black" style={{color:G.white,letterSpacing:'-0.02em'}}>
            1.8 billion Muslims.<br/>
            <span style={{background:`linear-gradient(135deg,${G.gold},${G.goldLt})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>One platform.</span>
          </h2>
        </motion.div>

        {/* Map container */}
        <motion.div initial={{opacity:0,scale:0.97}} animate={inView?{opacity:1,scale:1}:{}} transition={{duration:1,delay:0.15}}
          className="relative rounded-3xl overflow-hidden"
          style={{ height:'320px', background:'rgba(6,15,30,0.8)', border:`1px solid ${G.border}` }}>
          <WorldMapBg/>
          {/* overlay text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <Globe style={{width:'2.5rem',height:'2.5rem',color:G.gold,opacity:0.18,marginBottom:'0.75rem'}}/>
            <p className="text-[9px] font-black tracking-[0.45em] uppercase" style={{color:G.gold,opacity:0.35}}>190+ Countries · 6M+ Cities</p>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7,delay:0.3}}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[['1.8B+','Muslims worldwide'],['6M+','Cities covered'],['190+','Countries'],['5','Daily prayers']].map(([n,l])=>(
            <div key={l} className="text-center py-5 rounded-2xl" style={{background:G.w05,border:`1px solid ${G.border}`}}>
              <p className="text-2xl md:text-3xl font-black mb-1" style={{background:`linear-gradient(135deg,${G.gold},${G.goldLt})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>{n}</p>
              <p className="text-[9px] font-black tracking-widest uppercase" style={{color:G.w38}}>{l}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SHOP — discrete, premium, emotional
══════════════════════════════════════════════════════════════ */
function IslamicStore() {
  const ref=useRef<HTMLDivElement>(null);
  const inView=useInView(ref,{once:true});
  const products=[
    {emoji:'🕌',name:'Prayer Mats',sub:'Premium quality designs'},
    {emoji:'📿',name:'Tasbih',sub:'Traditional dhikr beads'},
    {emoji:'📖',name:'Qurans',sub:'Beautiful editions'},
    {emoji:'🌙',name:'Ramadan Essentials',sub:'Blessed Ramadan'},
  ];
  return (
    <Section bg={G.navySec} className="py-16 px-5">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7}}
          className="rounded-3xl px-8 md:px-12 py-10 relative overflow-hidden"
          style={{ background:'linear-gradient(135deg,rgba(13,27,56,0.9) 0%,rgba(6,15,30,0.95) 100%)', border:`1px solid rgba(212,175,55,0.12)` }}>
          <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none" style={{background:'radial-gradient(circle at 80% 20%,rgba(212,175,55,0.05),transparent 65%)'}}/>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
            <div className="max-w-xs">
              <p className="text-[9px] font-black tracking-[0.45em] uppercase mb-2" style={{color:G.gold,opacity:0.5}}>Islamic Essentials</p>
              <h2 className="text-2xl font-black mb-2" style={{color:G.white}}>Islamic Store</h2>
              <p className="text-sm leading-relaxed" style={{color:G.w38}}>Curated halal products to enrich your spiritual journey.</p>
            </div>
            <div className="flex items-center space-x-3">
              {products.map(p=>(
                <div key={p.name} className="text-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-1.5" style={{background:G.g08,border:`1px solid ${G.g12}`}}>{p.emoji}</div>
                  <p className="text-[7.5px] font-black" style={{color:G.w38}}>{p.name}</p>
                </div>
              ))}
            </div>
            <Link to="/store"
              className="flex-shrink-0 inline-flex items-center space-x-2 px-6 py-3 rounded-full font-black text-[10.5px] uppercase tracking-widest transition-all hover:scale-[1.03]"
              style={{ border:`1px solid ${G.g20}`, color:G.gold }}
              onMouseEnter={e=>{e.currentTarget.style.background=G.g08;}} onMouseLeave={e=>{e.currentTarget.style.background='transparent';}}>
              <ShoppingBag style={{width:'0.85rem',height:'0.85rem'}}/><span>Visit Shop</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   TASBEEH
══════════════════════════════════════════════════════════════ */
function Tasbeeh() {
  const [count,setCount]=useState(()=>{try{return parseInt(localStorage.getItem('tasbeeh_count')||'0');}catch{return 0;}});
  const [flash,setFlash]=useState(false);
  const [msText,setMsText]=useState('');
  const [ripples,setRipples]=useState<number[]>([]);
  const ref=useRef<HTMLDivElement>(null);
  const inView=useInView(ref,{once:true});
  const MS:Record<number,string>={33:'سُبْحَانَ اللَّهِ',66:'الْحَمْدُ لِلَّهِ',99:'اللَّهُ أَكْبَرُ'};
  const tap=useCallback(()=>{
    const n=(count+1)%100; setCount(n); try{localStorage.setItem('tasbeeh_count',String(n));}catch{}
    if(MS[n]){setFlash(true);setMsText(MS[n]);setTimeout(()=>setFlash(false),900);}
    setRipples(r=>[...r,Date.now()]); setTimeout(()=>setRipples(r=>r.slice(1)),650);
    if(navigator.vibrate) navigator.vibrate(35);
  },[count]);
  const R=48, circ=2*Math.PI*R, dash=circ*(count/99);
  const col=count<33?G.gold:count<66?G.goldLt:'#fff7ae';
  return (
    <Section bg={G.navy} className="py-20 px-5">
      <div ref={ref} className="max-w-xs mx-auto text-center">
        <motion.div initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7}}>
          <p className="text-[9px] font-black tracking-[0.45em] uppercase mb-2" style={{color:G.gold,opacity:0.5}}>Digital</p>
          <h2 className="text-2xl font-black mb-8" style={{color:G.white}}>Tasbeeh Counter</h2>
          <div className="relative inline-flex items-center justify-center" onClick={tap}>
            <svg width="148" height="148" className="absolute" style={{transform:'rotate(-90deg)'}}>
              <circle cx="74" cy="74" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5"/>
              <circle cx="74" cy="74" r={R} fill="none" stroke={col} strokeWidth="2.5" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
                style={{transition:'stroke-dasharray .25s ease,stroke .4s ease',filter:`drop-shadow(0 0 6px ${col}65)`}}/>
            </svg>
            {ripples.map(r=>(
              <motion.div key={r} className="absolute rounded-full pointer-events-none" style={{border:`1px solid ${col}40`}}
                initial={{width:74,height:74,opacity:0.5}} animate={{width:195,height:195,opacity:0}} transition={{duration:0.65}}/>
            ))}
            <motion.button whileTap={{scale:0.92}} className="relative w-32 h-32 rounded-full cursor-pointer select-none"
              style={{ background:`radial-gradient(circle at 35% 35%,rgba(212,175,55,0.18),rgba(6,15,30,0.96))`, border:`1px solid ${G.g20}`, boxShadow:flash?`0 0 50px rgba(212,175,55,0.55)`:`0 0 18px rgba(212,175,55,0.07)`, transition:'box-shadow .3s' }}>
              <AnimatePresence mode="wait">
                {flash?(
                  <motion.div key="f" initial={{scale:0.6,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:1.4,opacity:0}} className="absolute inset-0 flex items-center justify-center p-2">
                    <span style={{fontFamily:'Amiri,serif',color:G.gold,fontSize:'0.85rem',textAlign:'center',lineHeight:1.4}}>{msText}</span>
                  </motion.div>
                ):(
                  <motion.div key="c" initial={{scale:0.85,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:1.1,opacity:0}} className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black tabular-nums" style={{color:G.white}}>{count}</span>
                    <span className="text-[7.5px] font-black tracking-widest uppercase mt-0.5" style={{color:G.gold,opacity:0.45}}>tap</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
          <div className="flex justify-center space-x-8 mt-6 mb-5">
            {[33,66,99].map(m=>(
              <div key={m} className="text-center transition-all duration-300" style={{opacity:count>=m?1:0.22}}>
                <div className="w-1.5 h-1.5 rounded-full mx-auto mb-1" style={{background:count>=m?col:'rgba(255,255,255,0.18)',boxShadow:count>=m?`0 0 6px ${col}85`:'none'}}/>
                <span className="text-[8px] font-black" style={{color:G.gold}}>{m}</span>
              </div>
            ))}
          </div>
          <button onClick={()=>{setCount(0);try{localStorage.setItem('tasbeeh_count','0');}catch{}}}
            className="text-[9px] font-black tracking-widest uppercase transition-colors"
            style={{color:'rgba(255,255,255,0.18)'}}
            onMouseEnter={e=>(e.currentTarget.style.color=`${G.gold}99`)} onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.18)')}>
            ↺ Reset
          </button>
        </motion.div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   CITY SEO GRID
══════════════════════════════════════════════════════════════ */
function CityGrid() {
  const ref=useRef<HTMLDivElement>(null);
  const inView=useInView(ref,{once:true});
  const cities=[['🇸🇦','Makkah'],['🇬🇧','London'],['🇹🇷','Istanbul'],['🇦🇪','Dubai'],['🇪🇬','Cairo'],['🇮🇩','Jakarta'],['🇫🇷','Paris'],['🇺🇸','New York'],['🇲🇾','Kuala Lumpur'],['🇵🇰','Karachi'],['🇪🇸','Madrid'],['🇳🇬','Lagos']];
  return (
    <Section bg={G.navySec} className="pb-16 px-5">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6}}>
          <h2 className="text-xl font-black mb-6 text-center" style={{color:G.white}}>Prayer Times by City</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {cities.map(([flag,name])=>(
              <div key={name} className="flex flex-col items-center p-3 rounded-xl" style={{background:G.w05,border:`1px solid ${G.border}`}}>
                <span className="text-xl">{flag}</span>
                <span className="text-[8.5px] font-black mt-1.5 text-center leading-tight" style={{color:G.w38}}>{name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SEO TEXT
══════════════════════════════════════════════════════════════ */
function SEOText() {
  const ref=useRef<HTMLDivElement>(null);
  const inView=useInView(ref,{once:true});
  return (
    <Section bg={G.navy} className="pb-16 px-5">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6}}
          className="rounded-2xl p-8" style={{background:'rgba(255,255,255,0.018)',border:`1px solid ${G.border}`}}>
          <h2 className="text-xl font-black mb-4" style={{color:G.white}}>Accurate Prayer Times Worldwide</h2>
          <p className="text-sm leading-relaxed mb-3" style={{color:G.w38}}>
            Al Ummah AI provides precise <strong style={{color:G.w55}}>prayer times near me today</strong> for over 6 million cities worldwide using high-precision astronomical calculations and your GPS location. Whether you need <strong style={{color:G.w55}}>Fajr time</strong>, <strong style={{color:G.w55}}>Dhuhr time</strong>, <strong style={{color:G.w55}}>Asr time</strong>, <strong style={{color:G.w55}}>Maghrib time</strong>, or <strong style={{color:G.w55}}>Isha time</strong>, we deliver times accurate to the minute.
          </p>
          <p className="text-sm leading-relaxed" style={{color:G.w38}}>
            Beyond prayer times, Al Ummah AI is your complete Islamic companion — read the <strong style={{color:G.w55}}>Holy Quran online</strong>, find the <strong style={{color:G.w55}}>Qibla direction</strong>, calculate your <strong style={{color:G.w55}}>Zakat 2026</strong>, follow our <strong style={{color:G.w55}}>Ramadan 2026 guide</strong>, and ask our <strong style={{color:G.w55}}>Scholar AI</strong> — all completely free.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════ */
function SiteFooter() {
  const cols=[
    {label:'Platform',links:[{name:'Prayer Times',href:'/'},{name:'Qibla Finder',href:'/qibla'},{name:'Holy Quran',href:'/quran'},{name:'Zakat',href:'/zakat'}]},
    {label:'Learn',links:[{name:'Ramadan 2026',href:'/ramadan'},{name:'Articles',href:'/blog'},{name:'Scholar AI',href:'/scholar'},{name:'Halal Finance',href:'/halal-money'}]},
    {label:'Company',links:[{name:'About',href:'/about'},{name:'Shop',href:'/store'},{name:'Privacy',href:'/privacy'},{name:'Terms',href:'/terms'}]},
  ];
  return (
    <footer className="border-t px-5 py-14" style={{borderColor:'rgba(255,255,255,0.055)',background:'rgba(4,10,22,0.98)'}}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
          <div className="max-w-xs">
            <div className="flex items-center space-x-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{background:G.g12,border:`1px solid ${G.g20}`}}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1L7.8 4.7L11.7 4.7L8.7 7.1L9.9 10.8L6.5 8.8L3.1 10.8L4.3 7.1L1.3 4.7L5.2 4.7Z" stroke={G.gold} strokeWidth="0.9" fill="none"/></svg>
              </div>
              <span className="font-black text-sm" style={{color:G.white}}>Al Ummah <span style={{color:G.gold}}>AI</span></span>
            </div>
            <p className="text-xs leading-relaxed" style={{color:'rgba(255,255,255,0.27)'}}>A global Islamic platform for Prayer Times, Qibla, Quran and daily guidance. Free for 1.8 billion Muslims.</p>
            {/* Language selector */}
            <div className="flex flex-wrap gap-2 mt-4">
              {LANGS.map(l=>(
                <span key={l.code} className="text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full cursor-pointer transition-all"
                  style={{background:G.w05,border:`1px solid ${G.border}`,color:G.w38}}
                  onMouseEnter={e=>{e.currentTarget.style.color=G.gold;e.currentTarget.style.borderColor=G.bGold;}}
                  onMouseLeave={e=>{e.currentTarget.style.color=G.w38;e.currentTarget.style.borderColor=G.border;}}>
                  {l.label}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-14 gap-y-2">
            {cols.map(col=>(
              <div key={col.label}>
                <p className="text-[8px] font-black tracking-widest uppercase mb-3" style={{color:G.gold,opacity:0.45}}>{col.label}</p>
                <div className="space-y-2">
                  {col.links.map(l=>(
                    <Link key={l.href} to={l.href} className="block text-xs transition-colors" style={{color:'rgba(255,255,255,0.28)'}}
                      onMouseEnter={e=>(e.currentTarget.style.color=G.gold)} onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.28)')}>
                      {l.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{borderTop:'1px solid rgba(255,255,255,0.05)'}}>
          <p className="text-[8.5px] font-black tracking-widest uppercase" style={{color:'rgba(255,255,255,0.15)'}}>© 2026 Al Ummah AI · All rights reserved</p>
          <div className="flex items-center space-x-4">
            {[{n:'Sitemap',h:'/sitemap.xml'},{n:'Privacy',h:'/privacy'},{n:'Terms',h:'/terms'}].map(l=>(
              <Link key={l.h} to={l.h} className="text-[8.5px] font-black tracking-widest uppercase transition-colors" style={{color:'rgba(255,255,255,0.15)'}}
                onMouseEnter={e=>(e.currentTarget.style.color=G.gold)} onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.15)')}>
                {l.n}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════
   SCHEMA
══════════════════════════════════════════════════════════════ */
const APP_SCHEMA={
  '@context':'https://schema.org','@type':'WebApplication',name:'Al Ummah AI',url:'https://www.alummahai.com',
  applicationCategory:'LifestyleApplication',operatingSystem:'All',
  description:'Al Ummah AI is a global Islamic platform providing accurate prayer times by location, Qibla finder, Holy Quran in 15 languages, Zakat calculator and daily Islamic guidance.',
  offers:{'@type':'Offer',price:'0',priceCurrency:'USD'},
};
const FAQ_SCHEMA={
  '@context':'https://schema.org','@type':'FAQPage',mainEntity:[
    {'@type':'Question',name:'How do I find prayer times near me?',acceptedAnswer:{'@type':'Answer',text:'Al Ummah AI uses your GPS to show precise Fajr, Dhuhr, Asr, Maghrib and Isha prayer times for your exact location.'}},
    {'@type':'Question',name:'Is Al Ummah AI free?',acceptedAnswer:{'@type':'Answer',text:'Yes, completely free. Prayer times, Quran, Qibla, Zakat calculator and Scholar AI are all free forever with no account needed.'}},
    {'@type':'Question',name:'How accurate are the prayer times?',acceptedAnswer:{'@type':'Answer',text:'We use high-precision astronomical calculations via the Aladhan API, accurate to the minute for 6 million+ cities.'}},
  ],
};

/* ══════════════════════════════════════════════════════════════
   MAIN HOME
══════════════════════════════════════════════════════════════ */
export default function Home() {
  const heroRef=useRef<HTMLElement>(null);
  const { scrollYProgress }=useScroll({target:heroRef,offset:['start start','end start']});
  const heroOpacity=useTransform(scrollYProgress,[0,0.85],[1,0]);
  const heroY=useTransform(scrollYProgress,[0,1],[0,55]);

  return (
    <div style={{background:G.navy,minHeight:'100vh',color:G.white}}>
      <Helmet>
        <title>Al Ummah AI — Prayer Times Near Me, Qibla, Quran & Islamic Platform</title>
        <meta name="description" content="Accurate prayer times by GPS for your city. Qibla finder, Holy Quran in 15 languages, Zakat calculator 2026, Ramadan guide and Scholar AI. Free for 1.8 billion Muslims worldwide."/>
        <meta name="keywords" content="prayer times near me, prayer times today, fajr time, islamic prayer times, salah times, namaz time, qibla direction, quran online, zakat calculator 2026, ramadan 2026, أوقات الصلاة, waktu sholat, horario oracion"/>
        <link rel="canonical" href="https://www.alummahai.com/"/>
        <meta property="og:title" content="Al Ummah AI — Prayer Times Near Me, Qibla, Quran & Islamic Platform"/>
        <meta property="og:description" content="Accurate prayer times by GPS. Qibla finder, Holy Quran, Zakat calculator and Scholar AI. Free for 1.8 billion Muslims."/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://www.alummahai.com/"/>
        <script type="application/ld+json">{JSON.stringify(APP_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      {/* ════════════ HERO ════════════ */}
      <motion.section ref={heroRef} style={{opacity:heroOpacity}}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Backgrounds */}
        <GeoBg/>
        <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse 75% 65% at 50% 38%,rgba(212,175,55,0.04),transparent)'}}/>
        <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse 100% 100% at 50% 50%,transparent 38%,rgba(6,15,30,0.7))'}}/>
        <div className="absolute bottom-0 left-0 right-0 h-52 pointer-events-none" style={{background:`linear-gradient(to bottom,transparent,${G.navy})`}}/>

        <motion.div style={{y:heroY}} className="relative z-10 max-w-6xl mx-auto px-5 w-full pt-[60px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center min-h-[calc(100vh-60px)] py-16">

            {/* LEFT */}
            <div className="space-y-7 order-2 lg:order-1">
              <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{duration:0.7}}>
                <HijriDate/>
              </motion.div>

              <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.08}} className="space-y-4">
                <h1 className="font-black leading-[1.07] tracking-tight" style={{fontSize:'clamp(2.4rem,5.5vw,4.2rem)',color:G.white}}>
                  Prayer Times, Qibla,<br/>Quran —<br/>
                  <span style={{background:`linear-gradient(135deg,${G.gold} 0%,${G.goldLt} 55%,${G.gold} 100%)`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',backgroundSize:'200% 100%'}}>
                    one intelligent platform.
                  </span>
                </h1>
                <p className="text-base md:text-lg leading-relaxed max-w-md font-normal" style={{color:G.w55}}>
                  Accurate Islamic guidance for 1.8 billion Muslims worldwide. GPS prayer times, Qibla direction, Quran in 15 languages — all free, no account needed.
                </p>
              </motion.div>

              <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.2}} className="flex flex-col sm:flex-row gap-3">
                <Link to="/quran"
                  className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full font-black text-[10.5px] uppercase tracking-widest transition-all duration-200 hover:scale-[1.03] hover:-translate-y-0.5"
                  style={{background:`linear-gradient(135deg,${G.gold},${G.goldLt})`,color:G.navy,boxShadow:'0 0 28px rgba(212,175,55,0.25)'}}>
                  <BookOpen style={{width:'0.85rem',height:'0.85rem'}}/><span>Read Quran</span>
                </Link>
                <Link to="/scholar"
                  className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full font-black text-[10.5px] uppercase tracking-widest transition-all duration-200 hover:scale-[1.03] hover:-translate-y-0.5"
                  style={{border:`1px solid ${G.bGold}`,color:G.gold}}
                  onMouseEnter={e=>{e.currentTarget.style.background=G.g08;}} onMouseLeave={e=>{e.currentTarget.style.background='transparent';}}>
                  <MessageSquare style={{width:'0.85rem',height:'0.85rem'}}/><span>Ask Scholar AI</span>
                </Link>
              </motion.div>

              {/* Language selector + trust badges */}
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.45}} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Globe style={{width:'0.75rem',height:'0.75rem',color:G.gold,opacity:0.45}}/>
                  <span className="text-[8.5px] font-black tracking-widest uppercase" style={{color:G.w22}}>Available in</span>
                  {LANGS.map(l=>(
                    <span key={l.code}
                      className="text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full cursor-pointer transition-all"
                      style={{background:G.w05,border:`1px solid ${G.border}`,color:G.w38}}
                      onMouseEnter={e=>{e.currentTarget.style.color=G.gold;e.currentTarget.style.borderColor=G.bGold;e.currentTarget.style.background=G.g08;}}
                      onMouseLeave={e=>{e.currentTarget.style.color=G.w38;e.currentTarget.style.borderColor=G.border;e.currentTarget.style.background=G.w05;}}>
                      {l.native}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {['GPS Accurate','Free Forever','190+ Countries','No Account'].map(tag=>(
                    <span key={tag} className="text-[8.5px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full"
                      style={{background:G.w05,border:`1px solid ${G.border}`,color:G.w22}}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT — Prayer panel */}
            <motion.div initial={{opacity:0,x:24,y:10}} animate={{opacity:1,x:0,y:0}} transition={{duration:0.9,delay:0.18,type:'spring',damping:18}} className="order-1 lg:order-2 w-full">
              <PrayerPanel/>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1.5"
          animate={{y:[0,6,0]}} transition={{repeat:Infinity,duration:2.2,ease:'easeInOut'}}>
          <div className="w-px h-6" style={{background:`linear-gradient(to bottom,transparent,${G.bGold})`}}/>
          <ChevronDown style={{color:'rgba(212,175,55,0.2)',width:'1.1rem',height:'1.1rem'}}/>
        </motion.div>
      </motion.section>

      {/* ════ TRUST BAR ════ */}
      <TrustBar/>
      {/* ════ CORE TOOLS — navy bg ════ */}
      <CoreTools/>
      {/* ════ VERSE — navy-sec bg ════ */}
      <DailyVerse/>
      {/* ════ GUIDANCE — navy bg ════ */}
      <DailyGuidance/>
      {/* ════ GLOBAL REACH — navy-sec bg + world map ════ */}
      <GlobalReach/>
      {/* ════ SHOP — navy-sec bg ════ */}
      <IslamicStore/>
      {/* ════ TASBEEH — navy bg ════ */}
      <Tasbeeh/>
      {/* ════ CITY GRID — navy-sec bg ════ */}
      <CityGrid/>
      {/* ════ SEO TEXT — navy bg ════ */}
      <SEOText/>
      {/* ════ FOOTER ════ */}
      <SiteFooter/>
    </div>
  );
}
