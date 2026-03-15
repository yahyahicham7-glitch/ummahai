import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RelatedTools } from '@/src/components/RelatedTools';
import { motion } from 'motion/react';
import { SEO } from '@/src/components/SEO';
import { Calendar, ArrowLeft, Clock, Share2 } from 'lucide-react';
import { AdSense } from '@/src/components/AdSense';
import { useTranslation } from 'react-i18next';
import { translateContent } from '@/src/services/geminiService';

interface Post {
  id: string;
  title: string;
  titles?: Record<string, string>;
  excerpt: string;
  excerpts?: Record<string, string>;
  author: string;
  date: string;
  modified: string;
  image: string;
  category: string;
  readTime: string;
  keywords: string;
  content: React.ReactNode;
}

const Ayah = ({ ar, ref: ref_ }: { ar: string; ref: string }) => (
  <div className="bg-gold/10 border border-gold/30 rounded-2xl p-8 my-8 text-center">
    <p className="text-gold font-arabic text-2xl leading-loose direction-rtl" style={{ direction: 'rtl' }}>{ar}</p>
    <p className="text-cream/50 italic mt-3 text-sm">{ref_}</p>
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <>
    <h2 className="text-3xl font-display font-black text-cream mt-14 mb-4">{title}</h2>
    {children}
  </>
);

const TipCard = ({ num, title, desc }: { num: string; title: string; desc: string }) => (
  <div className="glass-card p-8 flex gap-6 items-start hover:border-gold transition-all">
    <span className="text-4xl font-display font-black text-gold/20 shrink-0 w-12">{num}</span>
    <div>
      <h3 className="text-xl font-display font-black text-cream mb-2">{title}</h3>
      <p className="text-cream/60 font-light leading-relaxed">{desc}</p>
    </div>
  </div>
);

const posts: Record<string, Post> = {

  'last-10-nights-ramadan': {
    id: 'last-10-nights-ramadan',
    title: 'The Last 10 Nights of Ramadan: Complete Guide to Laylatul Qadr',
    titles:{en:"Last 10 Nights of Ramadan",ar:"العشر الأواخر من رمضان",fr:"Les 10 Dernières Nuits du Ramadan",es:"Últimas 10 Noches de Ramadán"},
    excerpt: 'The most sacred nights in Islam. Learn how to find Laylatul Qadr, perform Itikaf, and transform your worship during Ramadan 2026.',
    author: 'Al Ummah AI', date: '2026-03-09', modified: '2026-03-09',
    image: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=1200&q=80',
    category: 'Ramadan', readTime: '8 min',
    keywords: 'last 10 nights ramadan, laylatul qadr, night of power, ramadan 2026, itikaf',
    content: (
      <div className="space-y-6 text-cream/80 font-serif leading-relaxed text-lg">
        <p>The last 10 nights of Ramadan are the most spiritually charged period of the Islamic year. Among them lies <strong className="text-gold">Laylatul Qadr</strong> — the Night of Power — described in the Quran as better than a thousand months of worship.</p>
        <Ayah ar="إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ" ref_='"Indeed, We revealed it during the Night of Decree." — Surah Al-Qadr 97:1' />
        <Section title="When Do the Last 10 Nights Start in 2026?">
          <p>They begin on the evening of <strong className="text-gold">February 26, 2026</strong> (21st night of Ramadan). Laylatul Qadr most likely falls on one of the odd nights: 21st, 23rd, 25th, 27th or 29th — with the 27th traditionally considered most probable.</p>
          <div className="grid grid-cols-5 gap-3 my-6">
            {[{n:'21st',d:'Feb 26'},{n:'23rd',d:'Feb 28'},{n:'25th',d:'Mar 2'},{n:'27th ⭐',d:'Mar 4'},{n:'29th',d:'Mar 6'}].map((x,i)=>(
              <div key={i} className={`glass-card p-4 text-center ${i===3?'border-gold':''}`}>
                <div className="text-xl font-display font-black text-gold">{x.n}</div>
                <div className="text-xs text-cream/40 mt-1">{x.d}</div>
              </div>
            ))}
          </div>
        </Section>
        <Section title="5 Essential Acts of Worship">
          <div className="space-y-4 mt-4">
            <TipCard num="01" title="Qiyam al-Layl" desc="Stand in prayer during the night. Even 2 extra rakats of Tahajjud make a huge difference. The last third of the night is most blessed." />
            <TipCard num="02" title="The Special Dua" desc="The Prophet ﷺ taught Aisha (RA): Allahumma innaka afuwwun tuhibbul afwa fa'fu anni — O Allah, You love forgiveness, so forgive me." />
            <TipCard num="03" title="Itikaf" desc="Secluding yourself in the masjid for the last 10 nights is a Sunnah of the Prophet ﷺ. Even a few hours of Itikaf is immensely rewarding." />
            <TipCard num="04" title="Quran Recitation" desc="Set a goal to complete at least one Juz per night. Focus on understanding the meaning, not just speed of recitation." />
            <TipCard num="05" title="Sadaqah Every Night" desc="Give charity every single night of the last 10 — so you don't miss Laylatul Qadr. Even a small amount given on that night equals 83 years of charity." />
          </div>
        </Section>
        <Section title="Night-by-Night Schedule">
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gold/20">
                <th className="text-left py-3 text-gold font-black uppercase tracking-widest text-[10px]">Night</th>
                <th className="text-left py-3 text-gold font-black uppercase tracking-widest text-[10px]">Focus</th>
                <th className="text-left py-3 text-gold font-black uppercase tracking-widest text-[10px]">Acts</th>
              </tr></thead>
              <tbody className="divide-y divide-gold/10">
                {[['21st','Tawbah','Istighfar, Tahajjud, Charity'],['23rd','Quran','Full Juz, Reflection'],['25th','Self-improvement','Muhasabah, Zikr'],['27th ⭐','LAYLATUL QADR','All night worship, Max Charity'],['29th','Last chance','Quran completion, Dua']].map((r,i)=>(
                  <tr key={i} className={r[0].includes('27')?'bg-gold/5':''}>
                    <td className={`py-3 font-black ${r[0].includes('27')?'text-gold':'text-cream'}`}>{r[0]}</td>
                    <td className="py-3 text-cream/70">{r[1]}</td>
                    <td className="py-3 text-cream/50 text-sm">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
        <div className="bg-glamour-blue-light border border-gold/20 rounded-3xl p-10 mt-12 text-center space-y-4">
          <h3 className="text-2xl font-display font-black text-cream">Get Accurate Prayer Times for Ramadan 2026</h3>
          <Link to="/" className="inline-flex items-center bg-gold text-glamour-blue px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">Check Prayer Times →</Link>
        </div>
      </div>
    ),
  },

  'ramadan-2026-prayer-timetable': {
    id: 'ramadan-2026-prayer-timetable',
    title: 'Ramadan 2026 Prayer Timetable: Suhoor & Iftar Times by City',
    titles:{en:"Ramadan 2026 Prayer Timetable",ar:"جدول صلاة رمضان 2026",fr:"Calendrier Prière Ramadan 2026",es:"Calendario Oración Ramadán 2026"},
    excerpt: 'Accurate Suhoor and Iftar times for 50+ cities worldwide during Ramadan 2026.',
    author: 'Al Ummah AI', date: '2026-03-08', modified: '2026-03-08',
    image: 'https://images.unsplash.com/photo-1542816052-e1b0b5c1c4b9?w=1200&q=80',
    category: 'Ramadan', readTime: '5 min',
    keywords: 'ramadan 2026 timetable, suhoor time, iftar time, ramadan prayer times by city',
    content: (
      <div className="space-y-6 text-cream/80 font-serif leading-relaxed text-lg">
        <p>Ramadan 2026 is expected to begin around <strong className="text-gold">February 17, 2026</strong>. Getting accurate Suhoor and Iftar times for your city is essential for a valid fast. Al Ummah AI uses GPS-based astronomical calculations for maximum precision.</p>
        <Section title="Key Ramadan 2026 Dates">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {[['First Day','~Feb 17, 2026','Subject to moon sighting'],['Laylatul Qadr','~Mar 14, 2026','27th night'],['Eid al-Fitr','~Mar 18, 2026','End of Ramadan']].map((x,i)=>(
              <div key={i} className="glass-card p-6 text-center hover:border-gold transition-all">
                <div className="text-xs text-gold/50 font-black uppercase tracking-widest">{x[0]}</div>
                <div className="text-2xl font-display font-black text-cream mt-2">{x[1]}</div>
                <div className="text-xs text-cream/40 mt-1">{x[2]}</div>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Sample Suhoor & Iftar Times — First Day of Ramadan 2026">
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gold/20">
                {['City','Suhoor','Fajr','Iftar/Maghrib'].map(h=><th key={h} className="text-left py-3 text-gold font-black uppercase tracking-widest text-[10px]">{h}</th>)}
              </tr></thead>
              <tbody className="divide-y divide-gold/10">
                {[['London 🇬🇧','05:42','05:52','17:48'],['Paris 🇫🇷','06:01','06:11','18:05'],['Madrid 🇪🇸','06:18','06:28','18:32'],['Dubai 🇦🇪','05:19','05:29','17:58'],['New York 🇺🇸','05:28','05:38','17:42'],['Cairo 🇪🇬','04:51','05:01','17:32'],['Istanbul 🇹🇷','05:38','05:48','17:52'],['Kuala Lumpur 🇲🇾','05:47','05:57','19:22'],['Jakarta 🇮🇩','04:22','04:32','18:01'],['Karachi 🇵🇰','05:12','05:22','18:05']].map((r,i)=>(
                  <tr key={i}><td className="py-3 font-black text-cream">{r[0]}</td><td className="py-3 text-cream/70">{r[1]}</td><td className="py-3 text-gold">{r[2]}</td><td className="py-3 text-cream/70">{r[3]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-cream/40 text-xs mt-3 italic">* Times are approximate. Use Al Ummah AI for GPS-accurate times for your exact location.</p>
        </Section>
        <Section title="Tips for Suhoor & Iftar">
          <div className="space-y-3 mt-4">
            {['Eat a balanced Suhoor with complex carbs, protein and water — avoid salty foods that cause thirst','Break your fast with dates and water, following the Sunnah of the Prophet ﷺ','Do not overeat at Iftar — this defeats the spiritual and physical benefits of fasting','Set multiple alarms for Suhoor — waking up is the hardest part','Use the Al Ummah AI prayer times widget to get real-time Fajr notifications'].map((tip,i)=>(
              <div key={i} className="flex gap-3 items-start glass-card p-4">
                <span className="text-gold shrink-0">✦</span><span className="text-cream/70">{tip}</span>
              </div>
            ))}
          </div>
        </Section>
        <div className="bg-glamour-blue-light border border-gold/20 rounded-3xl p-10 mt-8 text-center space-y-4">
          <h3 className="text-2xl font-display font-black text-cream">Get Your City's Exact Times</h3>
          <Link to="/" className="inline-flex items-center bg-gold text-glamour-blue px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">Check Prayer Times →</Link>
        </div>
      </div>
    ),
  },

  'fajr-time-today': {
    id: 'fajr-time-today',
    title: 'What Time is Fajr Today? Complete Guide to Dawn Prayer',
    titles:{en:"What Time is Fajr Today?",ar:"ما وقت صلاة الفجر اليوم؟",fr:"Heure du Fajr Aujourd hui",es:"Hora del Fajr Hoy"},
    excerpt: 'How to find exact Fajr time, why it is the most rewarded prayer, and tips for waking up consistently.',
    author: 'Al Ummah AI', date: '2026-03-07', modified: '2026-03-07',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    category: 'Prayer', readTime: '5 min',
    keywords: 'fajr time today, fajr prayer, salat al fajr, dawn prayer, what time is fajr',
    content: (
      <div className="space-y-6 text-cream/80 font-serif leading-relaxed text-lg">
        <p>Fajr is the first of the five daily prayers — performed at dawn before sunrise. It is considered the most spiritually rewarding prayer due to the effort required to wake before sunrise.</p>
        <Section title="When Does Fajr Start?">
          <p>Fajr begins at <strong className="text-gold">true dawn (Fajr al-Sadiq)</strong> — when a horizontal white light appears on the eastern horizon. It ends at sunrise. This window typically lasts 60–90 minutes depending on your location and season.</p>
        </Section>
        <Section title="Why Fajr is So Important">
          <div className="space-y-4 mt-4">
            {[['Protected by Allah','The Prophet ﷺ said: "Whoever prays Fajr is under the protection of Allah for the entire day."'],['Angels Witness It','The angels of night and day both witness the Fajr prayer — it is the only prayer witnessed by both groups.'],['Opens the Day with Barakah','Starting the day with prayer sets a spiritual foundation that influences all your actions.'],['Equivalent to All-Night Prayer','Praying Fajr in congregation is equivalent to praying all night, according to hadith.']].map(([t,d],i)=>(
              <TipCard key={i} num={String(i+1).padStart(2,'0')} title={t} desc={d} />
            ))}
          </div>
        </Section>
        <Section title="Tips to Wake Up for Fajr">
          <div className="space-y-3 mt-4">
            {['Sleep early — aim to be in bed by 10-11pm during weekdays','Set 2 alarms: one 15 mins before Fajr, one at Fajr time','Make dua before sleeping: ask Allah to wake you for Fajr','Keep wudu before sleeping — you are already prepared','Pray 2 rakats of Tahajjud before Fajr for extra reward'].map((t,i)=>(
              <div key={i} className="flex gap-3 items-start glass-card p-4"><span className="text-gold shrink-0">✦</span><span className="text-cream/70">{t}</span></div>
            ))}
          </div>
        </Section>
        <div className="bg-glamour-blue-light border border-gold/20 rounded-3xl p-10 mt-8 text-center space-y-4">
          <h3 className="text-2xl font-display font-black text-cream">Find Today's Fajr Time for Your City</h3>
          <Link to="/" className="inline-flex items-center bg-gold text-glamour-blue px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">Get Fajr Time →</Link>
        </div>
      </div>
    ),
  },

  'calculate-zakat-2026': {
    id: 'calculate-zakat-2026',
    title: 'How to Calculate Zakat 2026: Complete Step-by-Step Guide',
    titles:{en:"How to Calculate Zakat 2026",ar:"كيفية حساب الزكاة 2026",fr:"Calculer la Zakat 2026",es:"Calcular Zakat 2026"},
    excerpt: 'Nisab, rates, gold, silver, cash, stocks — everything to calculate your Zakat correctly in 2026.',
    author: 'Al Ummah AI', date: '2026-03-06', modified: '2026-03-06',
    image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=1200&q=80',
    category: 'Finance', readTime: '6 min',
    keywords: 'how to calculate zakat, zakat 2026, nisab 2026, zakat on gold, zakat calculator',
    content: (
      <div className="space-y-6 text-cream/80 font-serif leading-relaxed text-lg">
        <p>Zakat is the third pillar of Islam — a mandatory annual purification of wealth. Calculating it correctly ensures your religious obligation is fulfilled and your wealth receives Allah's blessing.</p>
        <Section title="What is Nisab?">
          <p>The Nisab is the minimum wealth threshold. If your wealth exceeds it after one lunar year (Hawl), Zakat becomes obligatory:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="glass-card p-6 text-center hover:border-gold transition-all">
              <div className="text-xs text-gold/50 font-black uppercase tracking-widest">Gold Nisab</div>
              <div className="text-3xl font-display font-black text-gold mt-2">87.48g</div>
              <div className="text-cream/40 text-sm mt-1">of pure gold</div>
            </div>
            <div className="glass-card p-6 text-center hover:border-gold transition-all">
              <div className="text-xs text-gold/50 font-black uppercase tracking-widest">Silver Nisab</div>
              <div className="text-3xl font-display font-black text-gold mt-2">612.36g</div>
              <div className="text-cream/40 text-sm mt-1">of pure silver</div>
            </div>
          </div>
        </Section>
        <Section title="Zakat Rate">
          <p>Zakat is <strong className="text-gold">2.5%</strong> of all zakatable assets held for one full lunar year above the Nisab.</p>
        </Section>
        <Section title="What is Zakatable?">
          <div className="space-y-3 mt-4">
            {[['Cash & Bank Savings','All money in bank accounts, cash at home, money owed to you'],['Gold & Silver','Jewellery, coins, bars — calculate at current market price'],['Business Inventory','Stock in trade, raw materials, finished goods'],['Investments','Stocks, shares, crypto held for investment purposes'],['Rental Income','Profits from rental properties above Nisab']].map(([t,d],i)=>(
              <div key={i} className="glass-card p-5 flex gap-4 items-start">
                <span className="text-gold font-black shrink-0">✦</span>
                <div><div className="font-black text-cream">{t}</div><div className="text-cream/50 text-sm mt-1">{d}</div></div>
              </div>
            ))}
          </div>
        </Section>
        <div className="bg-glamour-blue-light border border-gold/20 rounded-3xl p-10 mt-8 text-center space-y-4">
          <h3 className="text-2xl font-display font-black text-cream">Calculate Your Zakat Instantly</h3>
          <Link to="/zakat" className="inline-flex items-center bg-gold text-glamour-blue px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">Open Zakat Calculator →</Link>
        </div>
      </div>
    ),
  },

  'hajj-packages-uk-2026': {
    id: 'hajj-packages-uk-2026',
    title: 'Hajj 2026 Complete Guide: Rituals, Dates & Tips',
    titles:{en:"Hajj 2026 Complete Guide",ar:"الدليل الشامل للحج 2026",fr:"Guide Complet Hajj 2026",es:"Guía Completa Hajj 2026"},
    excerpt: 'Everything you need to know about Hajj 2026 — from Ihram to Tawaf, Arafat to Muzdalifah.',
    author: 'Al Ummah AI', date: '2026-03-05', modified: '2026-03-05',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1200&q=80',
    category: 'Hajj', readTime: '10 min',
    keywords: 'hajj 2026, hajj guide, hajj rituals, hajj dates 2026, pilgrimage mecca',
    content: (
      <div className="space-y-6 text-cream/80 font-serif leading-relaxed text-lg">
        <p>Hajj is the fifth pillar of Islam — a once-in-a-lifetime pilgrimage to Mecca obligatory for every Muslim who is physically and financially able. Hajj 2026 falls in late May/early June.</p>
        <Section title="Hajj 2026 Key Dates">
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gold/20"><th className="text-left py-3 text-gold font-black uppercase tracking-widest text-[10px]">Day</th><th className="text-left py-3 text-gold font-black uppercase tracking-widest text-[10px]">Date (approx)</th><th className="text-left py-3 text-gold font-black uppercase tracking-widest text-[10px]">Ritual</th></tr></thead>
              <tbody className="divide-y divide-gold/10">
                {[['8 Dhul Hijjah','~Jun 3, 2026','Day of Tarwiyah — travel to Mina'],['9 Dhul Hijjah','~Jun 4, 2026','Day of Arafat — standing at Arafat (most important)'],['10 Dhul Hijjah','~Jun 5, 2026','Eid al-Adha — sacrifice, stone-throwing, Tawaf al-Ifadah'],['11-12 Dhul Hijjah','Jun 6-7, 2026','Days of Tashreeq — staying in Mina, stoning'],['13 Dhul Hijjah','~Jun 8, 2026','Final stoning, farewell Tawaf']].map((r,i)=>(
                  <tr key={i} className={i===1?'bg-gold/5':''}><td className={`py-3 font-black ${i===1?'text-gold':'text-cream'}`}>{r[0]}</td><td className="py-3 text-cream/60">{r[1]}</td><td className="py-3 text-cream/80">{r[2]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
        <Section title="The 5 Main Rituals of Hajj">
          <div className="space-y-4 mt-4">
            {[['Ihram','Enter a state of purity and intention. Wear the white garments, recite the Talbiyah, and avoid all prohibitions of Ihram.'],['Tawaf','Circumambulate the Kaaba 7 times counterclockwise, starting from the Black Stone.'],['Sa\'i','Walk 7 times between the hills of Safa and Marwa, commemorating Hajar\'s search for water.'],['Wuquf at Arafat','Stand in prayer and supplication at the plain of Arafat on the 9th of Dhul Hijjah — the most important pillar of Hajj.'],['Rami al-Jamarat','Stone the three pillars in Mina, symbolizing the rejection of Shaytan.']].map(([t,d],i)=>(
              <TipCard key={i} num={String(i+1).padStart(2,'0')} title={t} desc={d} />
            ))}
          </div>
        </Section>
      </div>
    ),
  },

  'best-halal-investment-apps-2026': {
    id: 'best-halal-investment-apps-2026',
    title: 'Best Halal Investment Apps 2026: Grow Your Wealth the Sharia Way',
    titles:{en:"Best Halal Investment Apps 2026",ar:"أفضل تطبيقات الاستثمار الحلال",fr:"Meilleures Apps Investissement Halal",es:"Mejores Apps Inversión Halal"},
    excerpt: 'Top Sharia-compliant platforms: Wahed Invest, Zoya, Aghaz and more compared.',
    author: 'Al Ummah AI', date: '2026-03-04', modified: '2026-03-04',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
    category: 'Finance', readTime: '7 min',
    keywords: 'halal investment apps, sharia compliant investing, wahed invest, zoya app, halal stocks 2026',
    content: (
      <div className="space-y-6 text-cream/80 font-serif leading-relaxed text-lg">
        <p>Growing your wealth in a Sharia-compliant way is now easier than ever. These apps screen investments to ensure they comply with Islamic finance principles — no interest (riba), no haram industries.</p>
        <Section title="Top Halal Investment Apps 2026">
          <div className="space-y-4 mt-4">
            {[['Wahed Invest','Global leader in halal investing. Offers diversified portfolios of halal ETFs, sukuk and gold. Available in US, UK and many other countries. Low minimum investment.','⭐ Best Overall'],['Zoya','A stock screening app that tells you whether a specific stock is halal or haram according to Sharia. Perfect for self-directed investors.','⭐ Best Screener'],['Aghaz','UK-based halal robo-advisor. Beginner-friendly with automatic portfolio rebalancing. Excellent for UK Muslims.','⭐ Best for UK'],['Saturna Capital','One of the oldest halal funds in the US. Offers Amana Growth and Amana Income funds with long track records.','⭐ Best US Fund'],['HSBC Amanah','Offered by a major bank — Sharia-compliant savings and investment products. Good for those who prefer a traditional bank.','⭐ Best Bank Option']].map(([t,d,badge],i)=>(
              <div key={i} className="glass-card p-8 hover:border-gold transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-display font-black text-cream">{t}</h3>
                  <span className="text-[10px] text-gold font-black bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">{badge}</span>
                </div>
                <p className="text-cream/60 font-light">{d}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="What Makes an Investment Halal?">
          <div className="space-y-3 mt-4">
            {['No interest (riba) — bonds and conventional bank products are not allowed','No haram industries: alcohol, tobacco, weapons, gambling, adult content, pork','Debt ratio must be below a certain threshold (varies by school)','Revenue from haram sources must be negligible (typically under 5%)'].map((t,i)=>(
              <div key={i} className="flex gap-3 items-start glass-card p-4"><span className="text-gold shrink-0">✦</span><span className="text-cream/70">{t}</span></div>
            ))}
          </div>
        </Section>
      </div>
    ),
  },

  'surah-al-kahf-friday': {
    id: 'surah-al-kahf-friday',
    title: 'Why Muslims Read Surah Al-Kahf Every Friday: Full Guide',
    titles:{en:"Why Read Surah Al-Kahf on Friday",ar:"لماذا نقرأ سورة الكهف الجمعة",fr:"Pourquoi Lire Al-Kahf le Vendredi",es:"Por Qué Leer Al-Kahf los Viernes"},
    excerpt: 'The 4 stories of Surah Al-Kahf, their lessons, and the protection this Surah provides.',
    author: 'Al Ummah AI', date: '2026-03-03', modified: '2026-03-03',
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&q=80',
    category: 'Quran', readTime: '6 min',
    keywords: 'surah al kahf friday, surah kahf benefits, read surah kahf, friday surah',
    content: (
      <div className="space-y-6 text-cream/80 font-serif leading-relaxed text-lg">
        <p>The Prophet Muhammad ﷺ said: <em className="text-gold">"Whoever reads Surah Al-Kahf on Friday, a light will shine for him between the two Fridays."</em> This practice is one of the most recommended weekly acts of worship in Islam.</p>
        <Section title="The 4 Stories of Surah Al-Kahf">
          <div className="space-y-4 mt-4">
            {[['The People of the Cave','A group of young believers fled persecution and took refuge in a cave, where Allah caused them to sleep for 309 years. Lesson: faith protects you from Fitnah (trial).','Protection from Fitnah of Religion'],['The Man with Two Gardens','A wealthy man became arrogant about his riches and forgot Allah. His garden was destroyed. Lesson: wealth is a test, not a sign of divine favor.','Protection from Fitnah of Wealth'],['Musa and Al-Khidr','Prophet Musa traveled with Al-Khidr and witnessed actions he didn\'t understand — which later revealed divine wisdom. Lesson: trust in Allah\'s plan even when you don\'t see the full picture.','Protection from Fitnah of Knowledge'],['Dhul-Qarnayn','A powerful righteous king who traveled the world and built a barrier against Yajuj and Majuj. Lesson: power used for justice is a blessing.','Protection from Fitnah of Power']].map(([t,d,badge],i)=>(
              <div key={i} className="glass-card p-8 hover:border-gold transition-all">
                <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
                  <h3 className="text-xl font-display font-black text-cream">Story {i+1}: {t}</h3>
                  <span className="text-[10px] text-gold font-black bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">{badge}</span>
                </div>
                <p className="text-cream/60 font-light">{d}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="How and When to Read It">
          <div className="space-y-3 mt-4">
            {['Read from Friday sunset (Thursday night) to Friday sunset','Can be read in one sitting or split throughout the day','Reading the first and last 10 verses also protects from Dajjal','The light it provides will illuminate your path until the following Friday'].map((t,i)=>(
              <div key={i} className="flex gap-3 items-start glass-card p-4"><span className="text-gold shrink-0">✦</span><span className="text-cream/70">{t}</span></div>
            ))}
          </div>
        </Section>
      </div>
    ),
  },

  'morning-evening-adhkar': {
    id: 'morning-evening-adhkar',
    title: 'Morning & Evening Adhkar: The Complete Daily Dhikr Guide',
    titles:{en:"Morning and Evening Adhkar",ar:"أذكار الصباح والمساء",fr:"Adhkar du Matin et du Soir",es:"Adhkar de Mañana y Tarde"},
    excerpt: 'Authentic Adhkar from Quran and Sunnah to protect and bless every day.',
    author: 'Al Ummah AI', date: '2026-03-02', modified: '2026-03-02',
    image: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=1200&q=80',
    category: 'Lifestyle', readTime: '7 min',
    keywords: 'morning adhkar, evening adhkar, daily dhikr, azkar sabah, azkar masaa',
    content: (
      <div className="space-y-6 text-cream/80 font-serif leading-relaxed text-lg">
        <p>The Prophet ﷺ said: <em className="text-gold">"There are two phrases that are light on the tongue, heavy on the scales, and beloved to the Most Merciful: Subhanallah wa bihamdihi, Subhanallah al-Azeem."</em></p>
        <Section title="Morning Adhkar (After Fajr)">
          <div className="space-y-4 mt-4">
            {[['Ayat al-Kursi','أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ...','Recite once — protects you all day until evening'],['Surah Al-Ikhlas, Al-Falaq, An-Nas','قُلْ هُوَ اللَّهُ أَحَدٌ...','Recite 3 times each — sufficient protection for morning and evening'],['Sayyid al-Istighfar','اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ...','The master supplication for forgiveness — if said with conviction in morning and you die that day, you enter Jannah'],['Subhanallah','سُبْحَانَ اللَّهِ وَبِحَمْدِهِ','Recite 100 times — sins forgiven even if like the foam of the sea']].map(([t,ar,d],i)=>(
              <div key={i} className="glass-card p-8 hover:border-gold transition-all">
                <h3 className="text-lg font-display font-black text-cream mb-2">{t}</h3>
                <p className="text-gold font-arabic text-xl text-right leading-loose mb-3" style={{direction:'rtl'}}>{ar}</p>
                <p className="text-cream/50 text-sm font-light">{d}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Evening Adhkar (After Asr/Maghrib)">
          <p className="mt-2">The evening Adhkar mirror the morning ones. Key additions include:</p>
          <div className="space-y-3 mt-4">
            {['"Asbahna wa asbahal mulku lillah..." — We have entered the evening and the dominion belongs to Allah','Dua for protection from the evil of what you have done during the day','Dua for forgiveness before sleeping'].map((t,i)=>(
              <div key={i} className="flex gap-3 items-start glass-card p-4"><span className="text-gold shrink-0">✦</span><span className="text-cream/70">{t}</span></div>
            ))}
          </div>
        </Section>
      </div>
    ),
  },

  'islamic-history-golden-age': {
    id: 'islamic-history-golden-age',
    title: 'The Islamic Golden Age: When Muslims Led the World in Science',
    titles:{en:"The Islamic Golden Age",ar:"العصر الذهبي الإسلامي",fr:"Age d Or Islamique",es:"Edad de Oro Islámica"},
    excerpt: 'How Muslim scholars in Baghdad, Cordoba and Cairo shaped modern science between 800–1300 CE.',
    author: 'Al Ummah AI', date: '2026-03-01', modified: '2026-03-01',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80',
    category: 'History', readTime: '9 min',
    keywords: 'islamic golden age, muslim scientists, house of wisdom baghdad, islamic history, al khawarizmi',
    content: (
      <div className="space-y-6 text-cream/80 font-serif leading-relaxed text-lg">
        <p>Between the 8th and 13th centuries, the Islamic world experienced an extraordinary flourishing of science, philosophy, medicine and art. The <strong className="text-gold">Islamic Golden Age</strong> produced knowledge that directly enabled the European Renaissance.</p>
        <Section title="The House of Wisdom (Bayt al-Hikmah)">
          <p>Founded in Baghdad under Caliph Harun al-Rashid and expanded by al-Ma'mun, the House of Wisdom was the world's greatest library and intellectual center. Scholars from across the world translated Greek, Persian and Indian texts into Arabic — then expanded on them dramatically.</p>
        </Section>
        <Section title="5 Muslim Scholars Who Changed the World">
          <div className="space-y-4 mt-4">
            {[['Al-Khawarizmi (780–850)','The father of algebra. His book Al-Kitab al-Mukhtasar fi Hisab al-Jabr gave us the word "algebra." He also developed algorithms — the word itself derives from his name.','Mathematics & Computer Science'],['Ibn Sina (980–1037)','Known as Avicenna in the West. His Canon of Medicine was the standard medical textbook in Europe for 600 years. He described the contagious nature of disease centuries before Germ Theory.','Medicine'],['Al-Biruni (973–1048)','Calculated the circumference of the Earth with remarkable accuracy. Wrote extensively on geology, anthropology, astronomy and pharmacy. He was 900 years ahead of his time.','Earth Sciences'],['Ibn al-Haytham (965–1040)','The father of optics. His Book of Optics explained how vision works and how light travels — directly influencing Leonardo da Vinci and Kepler centuries later.','Physics & Optics'],['Ibn Rushd (1126–1198)','Known as Averroes. His commentaries on Aristotle reintroduced Greek philosophy to Europe and sparked the Scholastic movement that preceded the Renaissance.','Philosophy']].map(([t,d,field],i)=>(
              <div key={i} className="glass-card p-8 hover:border-gold transition-all">
                <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
                  <h3 className="text-xl font-display font-black text-cream">{t}</h3>
                  <span className="text-[10px] text-gold font-black bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">{field}</span>
                </div>
                <p className="text-cream/60 font-light">{d}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    ),
  },

  'how-to-pray-salah-beginners': {
    id: 'how-to-pray-salah-beginners',
    title: 'How to Pray Salah: Complete Step-by-Step Guide for Beginners',
    titles:{en:"How to Pray Salah",ar:"كيفية أداء الصلاة",fr:"Comment Prier la Salah",es:"Cómo Rezar la Salah"},
    excerpt: 'From Wudu to Tashahhud — every step of Islamic prayer explained with Arabic and transliteration.',
    author: 'Al Ummah AI', date: '2026-02-28', modified: '2026-02-28',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&q=80',
    category: 'Prayer', readTime: '8 min',
    keywords: 'how to pray salah, how to pray islam, salah steps, wudu, prayer for beginners',
    content: (
      <div className="space-y-6 text-cream/80 font-serif leading-relaxed text-lg">
        <p>Salah is the second pillar of Islam and the most important daily act of worship. Here is a complete, step-by-step guide to performing the 5 daily prayers correctly.</p>
        <Section title="Step 1: Perform Wudu (Ablution)">
          <div className="space-y-3 mt-4">
            {['Make niyyah (intention) for Wudu','Say Bismillah','Wash both hands 3 times up to the wrists','Rinse the mouth 3 times','Sniff water into the nose and blow out 3 times','Wash the face 3 times from forehead to chin','Wash right arm then left arm up to the elbow 3 times','Wipe the head with wet hands once','Wipe the ears with wet fingers once','Wash right foot then left foot up to the ankle 3 times'].map((t,i)=>(
              <div key={i} className="flex gap-3 items-start glass-card p-4">
                <span className="text-gold font-black w-6 shrink-0">{i+1}.</span><span className="text-cream/70">{t}</span>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Step 2: The 5 Daily Prayers">
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gold/20">{['Prayer','Rakats','Time'].map(h=><th key={h} className="text-left py-3 text-gold font-black uppercase tracking-widest text-[10px]">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-gold/10">
                {[['Fajr','2','Dawn to sunrise'],['Dhuhr','4','Midday to mid-afternoon'],['Asr','4','Mid-afternoon to sunset'],['Maghrib','3','After sunset to dusk'],['Isha','4','Night until midnight']].map((r,i)=>(
                  <tr key={i}><td className="py-3 font-black text-cream">{r[0]}</td><td className="py-3 text-gold">{r[1]}</td><td className="py-3 text-cream/60">{r[2]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
        <Section title="Step 3: The Positions of Salah">
          <div className="space-y-4 mt-4">
            {[['Niyyah & Takbir','Stand facing Qibla. Make intention in your heart. Say "Allahu Akbar" and raise hands to earlobes.'],['Qiyam (Standing)','Recite Al-Fatiha followed by any Surah. Keep eyes focused on the place of prostration.'],['Ruku (Bowing)','Say "Allahu Akbar" and bow with back straight, hands on knees. Say "Subhana Rabbiyal Azeem" 3 times.'],['Sujud (Prostration)','Say "Allahu Akbar" and prostrate with forehead, nose, both palms, knees and toes touching the ground.'],['Tashahhud (Sitting)','In the final rakat, sit and recite At-Tashahhud followed by Salawat on the Prophet ﷺ.'],['Tasleem (Salam)','Turn head right and say "Assalamu alaykum wa rahmatullah", then left. Prayer complete.']].map(([t,d],i)=>(
              <TipCard key={i} num={String(i+1).padStart(2,'0')} title={t} desc={d} />
            ))}
          </div>
        </Section>
      </div>
    ),
  },

  'quran-memorization-tips': {
    id: 'quran-memorization-tips',
    title: '10 Proven Tips to Memorize the Quran Faster',
    titles:{en:"10 Tips to Memorise the Quran",ar:"10 نصائح لحفظ القرآن",fr:"10 Conseils Memoriser le Coran",es:"10 Consejos Memorizar el Corán"},
    excerpt: 'Science-backed and traditional Hifz techniques for faster, lasting Quran memorization.',
    author: 'Al Ummah AI', date: '2026-02-27', modified: '2026-02-27',
    image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=1200&q=80',
    category: 'Quran', readTime: '7 min',
    keywords: 'quran memorization tips, how to memorize quran, hifz tips, quran memorization techniques',
    content: (
      <div className="space-y-6 text-cream/80 font-serif leading-relaxed text-lg">
        <p>Memorizing the Quran (Hifz) is one of the greatest achievements a Muslim can attain. The Prophet ﷺ said the one who memorizes the Quran will be honored in Jannah. These 10 tips combine traditional methods with modern science.</p>
        <div className="space-y-4 mt-6">
          {[['Consistency Over Volume','Memorize a small amount daily (5-10 ayahs) rather than large amounts irregularly. Consistency is the key to lasting memory.'],['Morning is Best','The mind is clearest after Fajr. Most huffaz memorize new material after Fajr prayer.'],['Repetition is Everything','Repeat each new verse 20-30 times before moving on. Then revise previous pages daily.'],['Listen Before Memorizing','Listen to a reciter (like Mishary or Sudais) recite the verses you plan to memorize. Your brain learns patterns through hearing.'],['Use One Mushaf Only','Always use the same physical Quran. Your memory associates verses with their visual position on the page.'],['Understand the Meaning','Read the tafsir of each passage. Verses with understood meaning are 3x easier to memorize and retain.'],['Teach What You Learn','Reciting to a friend, family member or Quran teacher accelerates memorization significantly.'],['Link New to Old','Always revise the previous 2-3 pages before memorizing new material to build strong chains of memory.'],['Track Your Progress','Use a Hifz journal or app. Seeing your progress is motivating and helps identify weak areas.'],['Make Dua','Ask Allah to open your heart to the Quran. The Prophet ﷺ made dua for a strong memory. Allah is the one who makes it possible.']].map(([t,d],i)=>(
            <TipCard key={i} num={String(i+1).padStart(2,'0')} title={t} desc={d} />
          ))}
        </div>
      </div>
    ),
  },

  'halal-food-guide-europe': {
    id: 'halal-food-guide-europe',
    title: 'Halal Food Guide for Muslims Living in Europe 2026',
    titles:{en:"Halal Food Guide Europe",ar:"دليل الطعام الحلال أوروبا",fr:"Guide Nourriture Halal Europe",es:"Guía Alimentación Halal Europa"},
    excerpt: 'Trusted halal certifications, apps and tips for Muslims in UK, France, Spain and Germany.',
    author: 'Al Ummah AI', date: '2026-02-26', modified: '2026-02-26',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
    category: 'Lifestyle', readTime: '6 min',
    keywords: 'halal food europe, halal certification uk, halal food france, halal food spain, halal apps',
    content: (
      <div className="space-y-6 text-cream/80 font-serif leading-relaxed text-lg">
        <p>Finding halal food in Europe is easier than ever in 2026 — but knowing which certifications to trust and how to identify halal products is essential for every Muslim living in or visiting Europe.</p>
        <Section title="Trusted Halal Certifications by Country">
          <div className="space-y-4 mt-4">
            {[['🇬🇧 United Kingdom','HMC (Halal Monitoring Committee) and HFA (Halal Food Authority) are the main bodies. HMC is stricter — they require hand-slaughter. Most major supermarkets now carry HMC or HFA certified products.'],['🇫🇷 France','Grande Mosquée de Paris, EVS-INFIANS and Mosquée de Lyon are the main certifiers. Look for their logos on packaging. France has one of the largest halal food markets in Europe.'],['🇪🇸 Spain','CIIM (Islamic Committee of Spain) is the main certification body. Spain\'s Muslim population is growing — major supermarkets like Mercadona now carry halal sections.'],['🇩🇪 Germany','IGMG and Zentralrat der Muslime are main certifiers. Germany has the largest Muslim population in Western Europe — halal food is widely available in major cities.']].map(([t,d],i)=>(
              <div key={i} className="glass-card p-8 hover:border-gold transition-all">
                <h3 className="text-xl font-display font-black text-cream mb-3">{t}</h3>
                <p className="text-cream/60 font-light">{d}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Best Halal Apps for Europe 2026">
          <div className="space-y-3 mt-4">
            {[['Zabihah','The original halal restaurant finder. Covers thousands of restaurants worldwide.'],['HalalTrip','Restaurant finder + halal travel guide. Great for visiting new cities.'],['Scan Halal','Scan any product barcode to check if it\'s halal. Crowdsourced database.'],['Muslim Pro','All-in-one app with halal food finder, prayer times and Quran.']].map(([t,d],i)=>(
              <div key={i} className="glass-card p-5 flex gap-4 items-start hover:border-gold transition-all">
                <span className="text-gold font-black text-lg shrink-0">📱</span>
                <div><div className="font-black text-cream">{t}</div><div className="text-cream/50 text-sm mt-1">{d}</div></div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    ),
  },

  'zakat-al-fitr-2026': {
    id: 'zakat-al-fitr-2026',
    title: 'Zakat al-Fitr 2026: Amount, Rules and When to Pay',
    titles:{en:"Zakat al-Fitr 2026",ar:"زكاة الفطر 2026",fr:"Zakat al-Fitr 2026",es:"Zakat al-Fitr 2026"},
    excerpt: 'How much, when and to whom to pay Zakat al-Fitr before Eid al-Fitr 2026.',
    author: 'Al Ummah AI', date: '2026-02-25', modified: '2026-02-25',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&q=80',
    category: 'Finance', readTime: '5 min',
    keywords: 'zakat al fitr 2026, fitrana 2026, zakat fitr amount, when to pay zakat fitr',
    content: (
      <div className="space-y-6 text-cream/80 font-serif leading-relaxed text-lg">
        <p>Zakat al-Fitr (Fitrana) is a mandatory charity paid by every Muslim at the end of Ramadan. It must be paid before the Eid al-Fitr prayer. It purifies the fasting person from any shortcomings and provides food for the poor on Eid day.</p>
        <Section title="How Much is Zakat al-Fitr 2026?">
          <p>The amount is equivalent to <strong className="text-gold">one Sa' (approximately 2.5-3 kg)</strong> of the staple food of your region. In practice, most scholars accept a monetary equivalent:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {[['🇬🇧 UK','£5–£10'],['🇺🇸 USA','$10–$15'],['🇪🇺 EU','€7–€12'],['🇸🇦 Saudi','20–25 SAR']].map(([c,a],i)=>(
              <div key={i} className="glass-card p-4 text-center hover:border-gold transition-all">
                <div className="text-lg font-black text-cream">{c}</div>
                <div className="text-gold font-display font-black text-xl mt-1">{a}</div>
                <div className="text-cream/30 text-xs mt-1">per person</div>
              </div>
            ))}
          </div>
          <p className="text-cream/40 text-xs mt-3 italic">* Check with your local mosque for the official amount in your area.</p>
        </Section>
        <Section title="Rules of Zakat al-Fitr">
          <div className="space-y-3 mt-4">
            {['Obligatory on every Muslim who has food beyond their needs on Eid day','Must be paid on behalf of yourself AND every dependent (children, spouse, etc.)','Must be paid BEFORE the Eid prayer — paying after is still valid but becomes Sadaqah, not Zakat al-Fitr','Best time: last few days of Ramadan, or the morning of Eid before the prayer','Recipients: the 8 categories of Zakat — primarily the poor and needy'].map((t,i)=>(
              <div key={i} className="flex gap-3 items-start glass-card p-4"><span className="text-gold shrink-0">✦</span><span className="text-cream/70">{t}</span></div>
            ))}
          </div>
        </Section>
      </div>
    ),
  },

  'islamic-parenting-guide': {
    id: 'islamic-parenting-guide',
    title: 'Raising Muslim Children in the West: A Practical Guide',
    titles:{en:"Raising Muslim Children in the West",ar:"تربية الأطفال المسلمين في الغرب",fr:"Elever des Enfants Musulmans en Occident",es:"Criar Hijos Musulmanes en Occidente"},
    excerpt: 'How to build Islamic identity, values and practice in children growing up in non-Muslim countries.',
    author: 'Al Ummah AI', date: '2026-02-24', modified: '2026-02-24',
    image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1200&q=80',
    category: 'Lifestyle', readTime: '8 min',
    keywords: 'raising muslim children, islamic parenting, muslim kids west, muslim identity children',
    content: (
      <div className="space-y-6 text-cream/80 font-serif leading-relaxed text-lg">
        <p>One of the greatest responsibilities a Muslim parent carries is raising children with a strong Islamic identity in environments that may not reflect their values. This guide offers practical, evidence-based advice for Muslim families in the West.</p>
        <Section title="Building Islamic Identity from Day One">
          <div className="space-y-4 mt-4">
            {[['The Home Environment','Make your home an Islamic space: Quran recitation in the morning, bismillah before meals, salawat and duas as routine. Children absorb what they live.'],['Positive Islamic Associations','Ensure Islam is associated with love, beauty and family joy — not just restrictions. Eid, Ramadan, and community events should be the highlights of the year.'],['Islamic Education','Enroll children in weekend Islamic school or Quran classes. The combination of home learning and structured education is most effective.'],['Role Models','Children need Muslim role models they admire. Teach them about Muslim scientists, athletes, artists and leaders — not just historical figures.'],['Open Conversations','When your child encounters anti-Islamic narratives at school, create a safe space to discuss them without defensiveness. Honest, confident answers build resilience.']].map(([t,d],i)=>(
              <TipCard key={i} num={String(i+1).padStart(2,'0')} title={t} desc={d} />
            ))}
          </div>
        </Section>
        <Section title="Age-Appropriate Islamic Milestones">
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gold/20">{['Age','Milestone'].map(h=><th key={h} className="text-left py-3 text-gold font-black uppercase tracking-widest text-[10px]">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-gold/10">
                {[['3–5','Learn Bismillah, Al-Fatiha, basic duas'],['6–7','Begin prayer — encourage but don\'t force'],['7+','Formal prayer teaching begins (Prophet\'s guidance)'],['10+','Stronger encouragement for prayer'],['Puberty','Full Islamic obligations begin']].map((r,i)=>(
                  <tr key={i}><td className="py-3 font-black text-gold">{r[0]}</td><td className="py-3 text-cream/70">{r[1]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    ),
  },

  'prophet-muhammad-life': {
    id: 'prophet-muhammad-life',
    title: 'The Life of Prophet Muhammad ﷺ: A Complete Biography',
    titles:{en:"Life of Prophet Muhammad",ar:"سيرة النبي محمد ﷺ",fr:"Vie du Prophete Muhammad",es:"Vida del Profeta Muhammad"},
    excerpt: 'From his birth in Mecca to the final sermon — the life and legacy of the Prophet of Islam.',
    author: 'Al Ummah AI', date: '2026-02-23', modified: '2026-02-23',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1200&q=80',
    category: 'History', readTime: '12 min',
    keywords: 'prophet muhammad biography, life of prophet muhammad, seerah, prophet islam',
    content: (
      <div className="space-y-6 text-cream/80 font-serif leading-relaxed text-lg">
        <p>Prophet Muhammad ﷺ (570–632 CE) is considered by over 1.8 billion Muslims to be the final messenger of Allah. His life — known as the Seerah — is the most documented biography of any person in the ancient world.</p>
        <Section title="Early Life in Mecca (570–610 CE)">
          <p>Born in Mecca around 570 CE into the noble Quraysh tribe, Muhammad ﷺ was orphaned early — his father Abdullah died before his birth, and his mother Amina when he was 6. He was raised first by his grandfather Abd al-Muttalib, then his uncle Abu Talib. Known as Al-Amin (The Trustworthy) throughout Mecca, he was renowned for his honesty and noble character long before Prophethood.</p>
        </Section>
        <Section title="Prophethood and the First Revelation (610 CE)">
          <p>At age 40, while meditating in the Cave of Hira, the Angel Jibreel appeared and delivered the first revelation: <em className="text-gold">"Read! In the name of your Lord who created..."</em> (Surah Al-Alaq). This marked the beginning of 23 years of Quranic revelation.</p>
          <Ayah ar="اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ" ref_='"Read in the name of your Lord who created." — First words of Quran revealed, Surah Al-Alaq 96:1' />
        </Section>
        <Section title="Key Events of the Seerah">
          <div className="space-y-4 mt-4">
            {[['613 CE','Public preaching begins in Mecca. Intense persecution by Quraysh follows.'],['615 CE','First migration (Hijra) to Abyssinia — the Prophet ﷺ sent companions to the Christian king Negus for protection.'],['620 CE','The Night Journey (Isra wal Miraj) — the Prophet ﷺ traveled to Jerusalem and ascended to the heavens, where the 5 daily prayers were prescribed.'],['622 CE','The Hijra to Madinah — marks Year 1 of the Islamic calendar. The Prophet ﷺ established the first Islamic state.'],['624–627 CE','The Battles of Badr, Uhud and the Trench — defining moments in early Islamic history.'],['630 CE','The Conquest of Mecca — the Prophet ﷺ entered Mecca peacefully, granting amnesty to all.'],['632 CE','The Farewell Sermon at Arafat — a final comprehensive message of Islam. The Prophet ﷺ passed away months later at age 63.']].map(([y,d],i)=>(
              <div key={i} className="glass-card p-6 flex gap-4 hover:border-gold transition-all">
                <div className="text-gold font-display font-black text-lg shrink-0 w-16">{y}</div>
                <p className="text-cream/70">{d}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="His Character">
          <p>The Prophet ﷺ was described by his wife Aisha (RA) as: <em className="text-gold">"His character was the Quran."</em> He was known for his gentleness, generosity, mercy to all creatures, sense of humor, and profound wisdom. Non-Muslim historians rank him among the most influential humans in history.</p>
        </Section>
      </div>
    ),
  },

};

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language?.slice(0,2) || 'en') as string;
  const post = slug ? posts[slug] : null;
  const contentRef = useRef<HTMLDivElement>(null);
  const [translated, setTranslated] = useState(false);

  // Auto-translate content when language is not English
  useEffect(() => {
    if (lang === 'en' || !contentRef.current || translated) return;
    const el = contentRef.current;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const textNodes: Text[] = [];
    let node;
    while ((node = walker.nextNode())) {
      if (node.textContent && node.textContent.trim().length > 10) textNodes.push(node as Text);
    }
    // Translate in batches
    const batch = textNodes.map(n => n.textContent || '').join('|||SPLIT|||');
    if (batch.trim()) {
      translateContent(batch, lang).then(result => {
        const parts = result.split('|||SPLIT|||');
        textNodes.forEach((n, i) => { if (parts[i]) n.textContent = parts[i]; });
        setTranslated(true);
      }).catch(() => {});
    }
  }, [lang, post, translated]);

  // Reset translation when slug changes
  useEffect(() => { setTranslated(false); }, [slug, lang]);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <SEO title="Article" description="Islamic knowledge article on Al Ummah AI." />
        <div className="text-6xl">📖</div>
        <h2 className="text-3xl font-display font-black text-cream">{lang==='ar'?'المقال قريباً':lang==='fr'?'Article à Venir':lang==='es'?'Artículo Próximamente':'Article Coming Soon'}</h2>
        <p className="text-cream/50">Our scholars are working on this article. Check back soon.</p>
        <Link to="/blog" className="inline-flex items-center bg-gold text-glamour-blue px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
          {lang==='ar'?'العودة للمدونة ←':lang==='fr'?'← Retour au Blog':lang==='es'?'← Volver al Blog':'← Back to Blog'}
        </Link>
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": { "@type": "Organization", "name": "Al Ummah AI", "url": "https://www.alummahai.com" },
    "publisher": { "@type": "Organization", "name": "Al Ummah AI", "logo": { "@type": "ImageObject", "url": "https://www.alummahai.com/icons/icon-192.png" } },
    "datePublished": post.date,
    "dateModified": post.modified,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.alummahai.com/blog/${post.id}` }
  };

  const related = Object.values(posts).filter(p => p.id !== post.id && p.category === post.category).slice(0, 2);
  const others = Object.values(posts).filter(p => p.id !== post.id && p.category !== post.category).slice(0, 2);
  const relatedPosts = [...related, ...others].slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={post.keywords}
        canonical={`https://www.alummahai.com/blog/${post.id}`}
        ogImage={post.image}
        schema={articleSchema}
        type="article"
        publishedAt={post.date}
        modifiedAt={post.modified}
      />

      <Link to="/blog" className="inline-flex items-center gap-2 text-gold/60 hover:text-gold text-xs font-black uppercase tracking-widest mb-12 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 mb-12">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-4 py-1 bg-gold/10 border border-gold/30 rounded-full text-gold text-[10px] font-black uppercase tracking-widest">{post.category}</span>
          <span className="flex items-center gap-1 text-cream/30 text-xs"><Clock className="w-3 h-3" />{post.readTime} {lang==='ar'?'قراءة':lang==='fr'?'lecture':lang==='es'?'lectura':'read'}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-black text-cream leading-tight">{post.titles?.[lang] || post.title}</h1>
        <p className="text-xl text-cream/60 font-light leading-relaxed">{post.excerpts?.[lang] || post.excerpt}</p>
        <div className="flex items-center justify-between pt-4 border-t border-gold/10">
          <div className="flex items-center gap-4 text-xs text-cream/40">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
            <span className="text-cream/30">{lang==='ar'?'بواسطة':lang==='fr'?'Par':lang==='es'?'Por':'By'} {post.author}</span>
          </div>
          <button onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
            className="flex items-center gap-2 text-gold/50 hover:text-gold text-xs transition-colors">
            <Share2 className="w-4 h-4" /> {lang==='ar'?'مشاركة':lang==='fr'?'Partager':lang==='es'?'Compartir':'Share'}
          </button>
        </div>
      </motion.div>

      <div className="rounded-3xl overflow-hidden mb-16 h-64 md:h-96">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      <AdSense slot="3002505678" format="rectangle" className="mb-12" />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div ref={contentRef}>
            {lang !== 'en' && !translated && (
              <div style={{ textAlign:'center', padding:'12px', background:'rgba(212,175,55,0.06)', borderRadius:12, marginBottom:16, fontFamily:"'DM Sans',sans-serif", fontSize:'0.75rem', color:'rgba(212,175,55,0.5)' }}>
                {lang==='ar'?'جارٍ الترجمة...':lang==='fr'?'Traduction en cours...':lang==='es'?'Traduciendo...':'Translating...'}
              </div>
            )}
            {post.content}
          </div>
      </motion.div>

      <AdSense slot="3002505678" format="rectangle" className="mt-16" />

      {relatedPosts.length > 0 && (
        <div className="mt-20 pt-12 border-t border-gold/10">
          <h3 className="text-2xl font-display font-black text-cream mb-8">More Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(r => (
              <Link key={r.id} to={`/blog/${r.id}`} className="glass-card overflow-hidden hover:border-gold transition-all group">
                <img src={r.image} alt={r.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="p-5">
                  <span className="text-[10px] text-gold/50 font-black uppercase tracking-widest">{r.category}</span>
                  <h4 className="text-base font-display font-black text-cream mt-1 group-hover:text-gold transition-colors leading-snug">{r.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    

      {/* Related Tools */}
      <RelatedTools exclude={["blog"]} max={6} />

    </div>
  );
}
