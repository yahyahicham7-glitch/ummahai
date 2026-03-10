import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { SEO } from '@/src/components/SEO';
import { Calendar, ArrowLeft, Clock, Share2 } from 'lucide-react';

/* ─── Types ───────────────────────────────────────────────── */
interface Post {
  id: string; title: string; excerpt: string;
  author: string; date: string; modified: string;
  image: string; category: string; readTime: string;
  keywords: string; content: React.ReactNode;
}

/* ─── Post content helper components ─────────────────────── */
const Q = ({ ar, trans }: { ar: string; trans: string }) => (
  <div style={{ background:'rgba(10,37,64,0.04)', border:'1px solid rgba(212,175,55,0.2)', borderRadius:14, padding:'20px 22px', margin:'24px 0' }}>
    <p style={{ fontFamily:"'Amiri',serif", fontSize:'1.3rem', color:'#0a2540', direction:'rtl', lineHeight:1.8, marginBottom:10 }}>{ar}</p>
    <p style={{ fontFamily:"'DM Sans',sans-serif", fontStyle:'italic', color:'rgba(10,37,64,0.55)', fontSize:'0.9rem' }}>{trans}</p>
  </div>
);

const Tip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background:'rgba(212,175,55,0.06)', border:'1px solid rgba(212,175,55,0.2)', borderRadius:12, padding:'16px 18px', margin:'20px 0' }}>
    <p style={{ fontFamily:"'DM Sans',sans-serif", color:'rgba(10,37,64,0.7)', fontSize:'0.9rem', lineHeight:1.75 }}>{children}</p>
  </div>
);

/* ─── All posts ───────────────────────────────────────────── */
const posts: Record<string, Post> = {
  'last-10-nights-ramadan': {
    id:'last-10-nights-ramadan', title:'The Last 10 Nights of Ramadan: Complete Guide to Laylatul Qadr',
    excerpt:'The last 10 nights of Ramadan are the most sacred days of the Islamic year.',
    author:'Al Ummah AI Team', date:'2026-03-09', modified:'2026-03-09',
    image:'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=1200&q=80',
    category:'Ramadan', readTime:'8 min read',
    keywords:'last 10 nights of ramadan, laylatul qadr, night of power, ramadan 2026, itikaf',
    content: (
      <div>
        <p>The last 10 nights of Ramadan represent the most spiritually charged period in the Islamic calendar. Among these blessed nights lies <strong>Laylatul Qadr</strong> — the Night of Power — described in the Quran as better than a thousand months of worship.</p>
        <h2>Why Are the Last 10 Nights So Special?</h2>
        <p>The Prophet Muhammad ﷺ used to exert himself in worship during the last ten nights more than at any other time. He would wake his family, tighten his waistcloth, and dedicate himself entirely to Allah.</p>
        <Q ar="إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ" trans='"Indeed, We revealed it during the Night of Decree." — Surah Al-Qadr, 97:1' />
        <h2>When Are the Last 10 Nights in Ramadan 2026?</h2>
        <p>The last 10 nights begin on the evening of <strong>February 26, 2026</strong> (the 21st night). The odd nights — 21st, 23rd, 25th, 27th, and 29th — are when Laylatul Qadr is most likely to occur.</p>
        <h2>5 Essential Acts of Worship</h2>
        {[{n:'01',t:'Qiyam al-Layl',d:'Stand in prayer during the night. Pray Tahajjud, recite long portions of Quran.'},
          {n:'02',t:'Recite the Special Dua',d:'Allahumma innaka afuwwun tuhibbul afwa fa\'fu anni — O Allah, You love forgiveness so forgive me.'},
          {n:'03',t:'Itikaf',d:'Secluding yourself in the masjid to focus entirely on worship is a powerful Sunnah.'},
          {n:'04',t:'Increase Quran Recitation',d:'Set a goal to complete at least one recitation of the Quran during these nights.'},
          {n:'05',t:'Give Sadaqah',d:'Charity on Laylatul Qadr equals 83+ years of charity. Donate every night.'}
        ].map(x => <Tip key={x.n}><strong>{x.n}. {x.t}:</strong> {x.d}</Tip>)}
      </div>
    ),
  },
  'ramadan-2026-prayer-timetable': {
    id:'ramadan-2026-prayer-timetable', title:'Ramadan 2026 Prayer Timetable: Suhoor & Iftar Times',
    excerpt:'Accurate Suhoor and Iftar times for every city worldwide during Ramadan 2026.',
    author:'Al Ummah AI Team', date:'2026-03-08', modified:'2026-03-08',
    image:'https://images.unsplash.com/photo-1542816052-e1b0b5c1c4b9?w=1200&q=80',
    category:'Ramadan', readTime:'5 min read',
    keywords:'ramadan 2026 timetable, suhoor time, iftar time, ramadan prayer times',
    content: (
      <div>
        <p>Ramadan 2026 is expected to begin on the evening of <strong>February 17, 2026</strong>. Accurate Suhoor and Iftar times are essential for every fasting Muslim.</p>
        <h2>How to Use This Timetable</h2>
        <p>Use our <Link to="/" style={{color:'#D4AF37'}}>Prayer Times tool</Link> to get GPS-accurate prayer times for your city. The Suhoor time is before Fajr, and Iftar is at Maghrib.</p>
        <Tip>Suhoor should be eaten as close to Fajr as possible. The Prophet ﷺ said: "Take Suhoor, for in Suhoor there is blessing." (Bukhari)</Tip>
        <h2>Approximate Iftar Times — Major Cities</h2>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontFamily:"'DM Sans',sans-serif",fontSize:'0.9rem'}}>
            <thead><tr style={{borderBottom:'2px solid rgba(10,37,64,0.1)'}}>
              {['City','Suhoor (approx)','Iftar (approx)'].map(h=><th key={h} style={{padding:'10px 12px',textAlign:'left',color:'#0a2540',fontWeight:700}}>{h}</th>)}
            </tr></thead>
            <tbody>
              {[['London','5:10 AM','6:05 PM'],['Paris','5:20 AM','6:30 PM'],['Madrid','5:50 AM','7:00 PM'],['Dubai','5:15 AM','6:25 PM'],['New York','5:00 AM','6:10 PM']].map(r=>(
                <tr key={r[0]} style={{borderBottom:'1px solid rgba(10,37,64,0.06)'}}>
                  {r.map((c,i)=><td key={i} style={{padding:'10px 12px',color:'rgba(10,37,64,0.7)'}}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  'fajr-time-today': {
    id:'fajr-time-today', title:'What Time is Fajr Today? Complete Guide to Dawn Prayer',
    excerpt:'How to find the exact Fajr time for your location and tips for waking up.',
    author:'Al Ummah AI Team', date:'2026-03-07', modified:'2026-03-07',
    image:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    category:'Prayer', readTime:'5 min read', keywords:'fajr time today, dawn prayer, fajr prayer time',
    content: (
      <div>
        <p>Fajr is the first of the five daily prayers in Islam, performed at dawn before sunrise. It is one of the most spiritually significant prayers — and one of the most challenging to wake up for.</p>
        <h2>When is Fajr?</h2>
        <p>Fajr begins at <strong>true dawn</strong> (al-fajr al-sadiq) and ends at sunrise. The exact time changes every day based on your location. Use our <Link to="/" style={{color:'#D4AF37'}}>Prayer Times tool</Link> for accurate times.</p>
        <Tip>The Prophet ﷺ said: "The two Rak'ahs of Fajr are better than the world and all it contains." (Muslim)</Tip>
        <h2>Tips for Waking Up for Fajr</h2>
        {['Sleep early — after Isha if possible','Set multiple alarms 15 minutes apart','Make dua before sleeping to wake for Fajr','Pray Witr before sleeping so you are not in a state of heedlessness','Ask a family member or friend to wake you'].map(t=>(
          <Tip key={t}>{t}</Tip>
        ))}
      </div>
    ),
  },
  'calculate-zakat-2026': {
    id:'calculate-zakat-2026', title:'How to Calculate Zakat 2026: Step-by-Step Guide',
    excerpt:'Nisab threshold, Zakat on gold, silver, cash, stocks. Your exact obligation.',
    author:'Al Ummah AI Team', date:'2026-03-06', modified:'2026-03-06',
    image:'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=1200&q=80',
    category:'Finance', readTime:'6 min read', keywords:'how to calculate zakat 2026, nisab, zakat gold silver',
    content: (
      <div>
        <p>Zakat is one of the Five Pillars of Islam — an obligation on every Muslim who possesses wealth above the Nisab threshold for one lunar year.</p>
        <h2>Nisab Threshold 2026</h2>
        <p>The Nisab is the minimum amount of wealth a Muslim must have before Zakat becomes obligatory. In 2026:</p>
        <Tip><strong>Gold Nisab:</strong> 87.48 grams of gold — approximately £5,200 / $6,600 USD<br/><strong>Silver Nisab:</strong> 612.36 grams of silver — approximately £380 / $480 USD</Tip>
        <h2>How to Calculate Your Zakat</h2>
        <p>Once your wealth exceeds the Nisab and you have held it for one lunar year (Hawl), you pay <strong>2.5%</strong> of your total zakatable wealth.</p>
        <Tip>Zakatable wealth includes: cash, gold, silver, trade goods, investments, debts owed to you. Use our <Link to="/zakat" style={{color:'#D4AF37'}}>Zakat Calculator</Link> for an accurate calculation.</Tip>
      </div>
    ),
  },
  'hajj-packages-uk-2026': {
    id:'hajj-packages-uk-2026', title:'Hajj 2026 Complete Guide: Everything You Need to Know',
    excerpt:'Dates, rituals, costs and tips for Hajj 2026. From Ihram to Tawaf.',
    author:'Al Ummah AI Team', date:'2026-03-05', modified:'2026-03-05',
    image:'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1200&q=80',
    category:'Hajj', readTime:'10 min read', keywords:'hajj 2026, hajj guide, hajj rituals',
    content: (
      <div>
        <p>Hajj 2026 is expected to take place from <strong>June 22 to June 27, 2026</strong>. It is one of the Five Pillars of Islam and obligatory once in a lifetime for every Muslim who is physically and financially able.</p>
        <h2>The 5 Key Rituals of Hajj</h2>
        {[{t:'Ihram',d:'Enter the sacred state by wearing white garments and making the intention at the Miqat.'},
          {t:'Tawaf',d:'Circumambulate the Kaaba seven times counter-clockwise at Al-Masjid Al-Haram.'},
          {t:'Sa\'i',d:'Walk seven times between the hills of Safa and Marwa, commemorating Hajar\'s search for water.'},
          {t:'Arafat',d:'Stand on the plain of Arafat on the 9th of Dhul Hijjah — the most important pillar of Hajj.'},
          {t:'Muzdalifah & Mina',d:'Collect pebbles for stoning the Jamarat, and perform the sacrifice (Udhiya).'}
        ].map(r=><Tip key={r.t}><strong>{r.t}:</strong> {r.d}</Tip>)}
        <Q ar="وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ" trans='"And Hajj to the House is a duty that mankind owes to Allah." — Surah Al-Imran, 3:97' />
      </div>
    ),
  },
  'best-halal-investment-apps-2026': {
    id:'best-halal-investment-apps-2026', title:'Best Halal Investment Apps 2026',
    excerpt:'Top Sharia-compliant platforms: Wahed, Zoya, Aghaz. Compare features and returns.',
    author:'Al Ummah AI Team', date:'2026-03-04', modified:'2026-03-04',
    image:'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
    category:'Finance', readTime:'7 min read', keywords:'halal investment, sharia compliant stocks 2026',
    content: (
      <div>
        <p>Halal investing means avoiding companies involved in alcohol, pork, gambling, interest-based finance, and weapons. In 2026, several excellent Sharia-compliant platforms exist.</p>
        <h2>Top Halal Investment Platforms</h2>
        {[{n:'Wahed Invest',d:'Automated halal portfolio management. Available in UK, US and 100+ countries.'},
          {n:'Zoya',d:'Stock screening app that tells you if a company is Sharia-compliant.'},
          {n:'Aghaz',d:'UK-based halal investment app for beginners with ethical portfolios.'},
          {n:'HSBC Amanah',d:'Islamic banking products including halal mortgages and current accounts.'}
        ].map(x=><Tip key={x.n}><strong>{x.n}:</strong> {x.d}</Tip>)}
        <Tip>Always consult a qualified Islamic finance scholar before making major investment decisions. Interest (riba) is strictly forbidden in Islam.</Tip>
      </div>
    ),
  },
  'surah-al-kahf-friday': {
    id:'surah-al-kahf-friday', title:'Why Muslims Read Surah Al-Kahf Every Friday',
    excerpt:'The Prophet recommended Surah Al-Kahf every Friday. The 4 stories and their lessons.',
    author:'Al Ummah AI Team', date:'2026-03-03', modified:'2026-03-03',
    image:'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&q=80',
    category:'Quran', readTime:'6 min read', keywords:'surah al kahf friday, surah kahf benefits',
    content: (
      <div>
        <p>The Prophet Muhammad ﷺ said: "Whoever reads Surah Al-Kahf on Friday, a light will shine for him from one Friday to the next." (Al-Hakim)</p>
        <h2>The 4 Stories of Surah Al-Kahf</h2>
        {[{t:'The People of the Cave',d:'Youth who fled persecution and were kept asleep by Allah for 309 years. A test of faith.'},
          {t:'The Two Gardens',d:'A wealthy man who forgot to thank Allah for his blessings. A test of wealth.'},
          {t:'Moses and Al-Khidr',d:'Prophet Musa follows Al-Khidr to learn that divine wisdom is beyond human understanding. A test of knowledge.'},
          {t:'Dhul-Qarnayn',d:'A righteous king who built a wall against Yajuj and Majuj. A test of power.'}
        ].map(x=><Tip key={x.t}><strong>{x.t}:</strong> {x.d}</Tip>)}
        <Q ar="مَن قَرَأَ سُورَةَ الْكَهْفِ يَوْمَ الْجُمُعَةِ أَضَاءَ لَهُ مِنَ النُّورِ" trans='"Whoever reads Surah Al-Kahf on Friday, a light will shine for him from one Friday to the next." — Hadith' />
      </div>
    ),
  },
  'morning-evening-adhkar': {
    id:'morning-evening-adhkar', title:'Morning & Evening Adhkar: The Complete Daily Dhikr Guide',
    excerpt:'Authentic Adhkar for morning and evening from Quran and Sunnah.',
    author:'Al Ummah AI Team', date:'2026-03-02', modified:'2026-03-02',
    image:'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=1200&q=80',
    category:'Lifestyle', readTime:'7 min read', keywords:'morning adhkar, evening adhkar, daily dhikr',
    content: (
      <div>
        <p>The morning and evening Adhkar are a daily spiritual shield — recited to protect yourself, thank Allah, and begin and end the day with His remembrance.</p>
        <h2>Morning Adhkar (After Fajr)</h2>
        {[{ar:'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ',tr:'We have reached morning, and the whole kingdom belongs to Allah.',n:'1x'},
          {ar:'اللَّهُمَّ بِكَ أَصْبَحْنَا',tr:'O Allah, by Your grace we have reached the morning.',n:'1x'},
          {ar:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',tr:'Glory and praise be to Allah.',n:'100x'}
        ].map(x=><Q key={x.ar} ar={`${x.ar} (${x.n})`} trans={x.tr}/>)}
        <h2>Evening Adhkar (After Asr)</h2>
        {[{ar:'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ',tr:'We have reached evening, and the whole kingdom belongs to Allah.',n:'1x'},
          {ar:'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ',tr:'I seek refuge in the perfect words of Allah from all evil.',n:'3x'}
        ].map(x=><Q key={x.ar} ar={`${x.ar} (${x.n})`} trans={x.tr}/>)}
      </div>
    ),
  },
  'islamic-history-golden-age': {
    id:'islamic-history-golden-age', title:'The Islamic Golden Age: When Muslims Led the World in Science',
    excerpt:'From algebra to astronomy — how Muslim scholars shaped the modern world.',
    author:'Al Ummah AI Team', date:'2026-03-01', modified:'2026-03-01',
    image:'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80',
    category:'History', readTime:'9 min read', keywords:'islamic golden age, muslim scientists, al-khawarizmi',
    content: (
      <div>
        <p>Between approximately 800 and 1300 CE, the Islamic world experienced an extraordinary flourishing of science, philosophy, medicine and culture known as the Golden Age.</p>
        <h2>Key Contributions</h2>
        {[{n:'Al-Khawarizmi',d:'Father of algebra. His book "Al-Kitab al-mukhtasar fi hisab al-jabr" gave us the word algebra.'},
          {n:'Ibn Sina (Avicenna)',d:'The Canon of Medicine was used as a medical textbook in Europe until the 17th century.'},
          {n:'Al-Biruni',d:'Calculated the circumference of the Earth with remarkable accuracy in 1030 CE.'},
          {n:'Ibn al-Haytham',d:'Pioneer of optics and the scientific method, 500 years before the European Renaissance.'},
          {n:'Al-Zahrawi',d:'Father of modern surgery. Invented over 200 surgical instruments still used today.'}
        ].map(x=><Tip key={x.n}><strong>{x.n}:</strong> {x.d}</Tip>)}
        <Tip>The word "algebra" comes from the Arabic al-jabr. "Algorithm" comes from al-Khawarizmi's name. "Chemistry" from al-kimiya. Islamic scholars literally shaped the vocabulary of modern science.</Tip>
      </div>
    ),
  },
  'how-to-pray-salah-beginners': {
    id:'how-to-pray-salah-beginners', title:'How to Pray Salah: Complete Step-by-Step Guide',
    excerpt:'Every step of Islamic prayer with Arabic text and meaning.',
    author:'Al Ummah AI Team', date:'2026-02-28', modified:'2026-02-28',
    image:'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&q=80',
    category:'Prayer', readTime:'8 min read', keywords:'how to pray salah, salah steps, islamic prayer guide',
    content: (
      <div>
        <p>Salah (prayer) is the second pillar of Islam, performed five times daily. It is the direct connection between the Muslim and Allah.</p>
        <h2>Before You Pray: Wudu (Ablution)</h2>
        <p>You must be in a state of ritual purity. Perform Wudu by washing: hands (3x), mouth, nose, face, arms to elbows, wipe head, ears, and feet (3x each).</p>
        <h2>The Steps of Prayer</h2>
        {[{n:'1. Niyyah (Intention)','d':'Make the intention in your heart to pray. No need to say it aloud.'},
          {n:'2. Takbir','d':'Raise hands to ears and say Allahu Akbar (Allah is the Greatest). This begins the prayer.'},
          {n:'3. Qiyam (Standing)','d':'Recite Surah Al-Fatiha, then any other Surah.'},
          {n:'4. Ruku (Bowing)','d':'Bow with hands on knees, saying Subhana Rabbiyal Adheem (3x).'},
          {n:'5. Sujud (Prostration)','d':'Prostrate with forehead, nose, palms, knees and toes on the ground. Say Subhana Rabbiyal A\'la (3x).'}
        ].map(x=><Tip key={x.n}><strong>{x.n}:</strong> {x.d}</Tip>)}
        <Q ar="وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ" trans='"Establish prayer and give Zakat." — Surah Al-Baqarah, 2:43' />
      </div>
    ),
  },
  'quran-memorization-tips': {
    id:'quran-memorization-tips', title:'10 Proven Tips to Memorize the Quran Faster',
    excerpt:'Science-backed + traditional Hifz methods. How top huffaz memorize efficiently.',
    author:'Al Ummah AI Team', date:'2026-02-27', modified:'2026-02-27',
    image:'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=1200&q=80',
    category:'Quran', readTime:'7 min read', keywords:'quran memorization, hifz tips, how to memorize quran',
    content: (
      <div>
        <p>Memorizing the Quran (Hifz) is one of the greatest acts of worship in Islam. Here are the most effective methods used by hafiz worldwide.</p>
        {['Start with short Surahs from Juz Amma (30th Juz)','Memorize in small chunks: 3-5 ayahs per day','Repeat each verse 20+ times before moving on','Recite what you have memorized in every Salah','Review old verses daily before learning new ones','Listen to audio recitation of your target verses while sleeping','Find a Quran teacher or memorization partner','Use the same Mushaf (physical copy) consistently','Fast and make dua for ease in memorization','Never miss a day — consistency beats intensity'
        ].map((t,i)=><Tip key={i}><strong>{i+1}.</strong> {t}</Tip>)}
      </div>
    ),
  },
  'halal-food-guide-europe': {
    id:'halal-food-guide-europe', title:'Halal Food Guide for Muslims in Europe 2026',
    excerpt:'Trusted certifications in UK, France, Spain and Germany.',
    author:'Al Ummah AI Team', date:'2026-02-26', modified:'2026-02-26',
    image:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
    category:'Lifestyle', readTime:'6 min read', keywords:'halal food europe, halal certification uk, halal spain',
    content: (
      <div>
        <p>Finding halal food across Europe is easier than ever in 2026, but knowing which certifications to trust is essential.</p>
        <h2>Trusted Halal Certifications by Country</h2>
        {[{c:'United Kingdom',b:'HFA (Halal Food Authority), HMC (Halal Monitoring Committee)'},
          {c:'France',b:'AVS, SFCVH — look for the logo on packaging'},
          {c:'Spain',b:'CIHAI (Islamic Community of Spain) and Halal Institute Spain'},
          {c:'Germany',b:'DITIB and ZMD — check for EU-registered certification'},
          {c:'All Europe',b:'Avoid E120 (cochineal), E441 (gelatin) and E904 (shellac) — these may be non-halal'}
        ].map(x=><Tip key={x.c}><strong>{x.c}:</strong> {x.b}</Tip>)}
        <Tip>The Zabihah.com app and HalalTrip are excellent for finding halal restaurants across Europe.</Tip>
      </div>
    ),
  },
  'zakat-al-fitr-2026': {
    id:'zakat-al-fitr-2026', title:'Zakat al-Fitr 2026: Amount, Rules and When to Pay',
    excerpt:'How much is Zakat al-Fitr in 2026? Who must pay and the deadline.',
    author:'Al Ummah AI Team', date:'2026-02-25', modified:'2026-02-25',
    image:'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&q=80',
    category:'Finance', readTime:'5 min read', keywords:'zakat al fitr 2026, fitrana amount, sadaqah al fitr',
    content: (
      <div>
        <p>Zakat al-Fitr (Fitrana) is a mandatory charity given by every Muslim at the end of Ramadan, before the Eid al-Fitr prayer.</p>
        <h2>Amount in 2026</h2>
        <Tip><strong>UK:</strong> Approximately £7–£10 per person<br/><strong>USA:</strong> Approximately $12–$15 per person<br/><strong>EU:</strong> Approximately €9–€12 per person</Tip>
        <h2>Rules</h2>
        <Tip>Zakat al-Fitr is obligatory on every Muslim — man, woman, child, free or slave. It must be paid before the Eid prayer. The head of household pays on behalf of all dependents.</Tip>
        <h2>Who Can Receive It?</h2>
        <p>The same 8 categories as regular Zakat: the poor, needy, those in debt, travellers in need, those working to collect it, new Muslims, slaves, and in the path of Allah.</p>
      </div>
    ),
  },
  'islamic-parenting-guide': {
    id:'islamic-parenting-guide', title:'Raising Muslim Children in the West: A Practical Guide',
    excerpt:'Nurturing Islamic identity and values in non-Muslim majority countries.',
    author:'Al Ummah AI Team', date:'2026-02-24', modified:'2026-02-24',
    image:'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1200&q=80',
    category:'Lifestyle', readTime:'8 min read', keywords:'raising muslim children, islamic parenting, muslim family west',
    content: (
      <div>
        <p>Raising Muslim children in the West presents unique challenges — but also unique opportunities to build strong, confident Muslim identities.</p>
        {['Start with love for Allah and the Prophet ﷺ before rules','Make salah a joyful family routine from age 7','Teach Islamic history — the Golden Age, Companions, scholars','Create halal alternatives for non-Islamic celebrations','Find a strong Muslim community and maintain it','Address Islamophobia openly and confidently','Use Islamic apps, books and media as positive exposure','Role model what you want them to practise — children copy, not obey'
        ].map((t,i)=><Tip key={i}><strong>{i+1}.</strong> {t}</Tip>)}
        <Q ar="يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا" trans='"O believers, protect yourselves and your families from a Fire..." — Surah At-Tahrim, 66:6' />
      </div>
    ),
  },
  'prophet-muhammad-life': {
    id:'prophet-muhammad-life', title:'The Life of Prophet Muhammad ﷺ: A Complete Biography',
    excerpt:'From Mecca to the final sermon. The life, character and legacy of the Prophet ﷺ.',
    author:'Al Ummah AI Team', date:'2026-02-23', modified:'2026-02-23',
    image:'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1200&q=80',
    category:'History', readTime:'12 min read', keywords:'prophet muhammad biography, seerah, life of prophet',
    content: (
      <div>
        <p>Muhammad ibn Abdullah ﷺ was born in Mecca in 570 CE and is regarded as the final prophet of Islam. His life is the most documented in human history.</p>
        <h2>Key Milestones</h2>
        {[{y:'570 CE',e:'Born in Mecca to Aminah and Abdullah. His father died before his birth.'},
          {y:'610 CE',e:'First revelation in the Cave of Hira. "Iqra" — Read, in the name of your Lord.'},
          {y:'622 CE',e:'The Hijra — migration from Mecca to Medina. The Islamic calendar begins here.'},
          {y:'630 CE',e:'Conquest of Mecca. The Prophet ﷺ forgave his enemies.'},
          {y:'632 CE',e:'The Farewell Hajj and Final Sermon. Passed away aged 63.'}
        ].map(x=><Tip key={x.y}><strong>{x.y}:</strong> {x.e}</Tip>)}
        <Q ar="وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ" trans='"And We have not sent you except as a mercy to the worlds." — Surah Al-Anbiya, 21:107' />
      </div>
    ),
  },
};

/* ─── Page component ─────────────────────────────────────── */
export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? posts[slug] : null;

  if (!post) return (
    <div style={{ minHeight:'60vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20, background:'#ffffff' }}>
      <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'4rem', color:'#D4AF37' }}>404</div>
      <p style={{ fontFamily:"'DM Sans',sans-serif", color:'rgba(10,37,64,0.5)' }}>Article not found.</p>
      <Link to="/blog" style={{ background:'#0a2540', color:'#ffffff', padding:'10px 22px', borderRadius:9, fontFamily:"'DM Sans',sans-serif", fontWeight:700, textDecoration:'none' }}>← Back to Blog</Link>
    </div>
  );

  return (
    <div style={{ background:'#ffffff', color:'#0a2540', minHeight:'100vh' }}>
      <SEO title={`${post.title} | Al Ummah AI`} description={post.excerpt} keywords={post.keywords} canonical={`https://www.alummahai.com/blog/${post.id}`} />

      {/* Hero image */}
      <div style={{ position:'relative', height:'clamp(220px,40vw,420px)', overflow:'hidden' }}>
        <img src={post.image} alt={post.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,rgba(10,37,64,0.35),rgba(10,37,64,0.7))' }} />
        <div style={{ position:'absolute', top:0, left:0, right:0, padding:'clamp(70px,10vw,100px) clamp(16px,5vw,48px) 32px' }}>
          <Link to="/blog" style={{ display:'inline-flex', alignItems:'center', gap:6, color:'rgba(255,255,255,0.7)', fontFamily:"'DM Sans',sans-serif", fontSize:'0.76rem', fontWeight:700, textDecoration:'none', transition:'color 0.18s' }}
            onMouseEnter={e=>(e.currentTarget.style.color='#D4AF37')}
            onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.7)')}>
            <ArrowLeft size={13}/> Back to Blog
          </Link>
        </div>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'clamp(16px,3vw,32px) clamp(16px,5vw,48px)' }}>
          <span style={{ display:'inline-block', padding:'3px 12px', background:'rgba(212,175,55,0.2)', border:'1px solid rgba(212,175,55,0.4)', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.6rem', fontWeight:800, color:'#D4AF37', textTransform:'uppercase', letterSpacing:'0.18em', marginBottom:10 }}>{post.category}</span>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.4rem,4vw,2.5rem)', color:'#ffffff', lineHeight:1.2, maxWidth:780 }}>{post.title}</h1>
        </div>
      </div>

      {/* Meta bar */}
      <div style={{ background:'#f7f8fa', borderBottom:'1px solid rgba(10,37,64,0.07)', padding:'12px clamp(16px,5vw,48px)' }}>
        <div style={{ maxWidth:780, margin:'0 auto', display:'flex', gap:20, flexWrap:'wrap', fontFamily:"'DM Sans',sans-serif", fontSize:'0.72rem', fontWeight:600, color:'rgba(10,37,64,0.45)', alignItems:'center' }}>
          <span style={{ display:'flex', alignItems:'center', gap:5 }}><Calendar size={12}/>{post.date}</span>
          <span style={{ display:'flex', alignItems:'center', gap:5 }}><Clock size={12}/>{post.readTime}</span>
          <span>By {post.author}</span>
          <button onClick={() => navigator.share?.({ title:post.title, url:window.location.href })}
            style={{ display:'flex', alignItems:'center', gap:5, marginLeft:'auto', background:'transparent', border:'none', cursor:'pointer', color:'rgba(10,37,64,0.45)', fontFamily:"'DM Sans',sans-serif", fontSize:'0.72rem', fontWeight:600 }}>
            <Share2 size={12}/> Share
          </button>
        </div>
      </div>

      {/* Article body */}
      <div style={{ maxWidth:780, margin:'0 auto', padding:'clamp(32px,5vw,56px) clamp(16px,5vw,48px) clamp(48px,7vw,72px)' }}>
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
          {/* Excerpt */}
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:400, fontSize:'1.08rem', color:'rgba(10,37,64,0.65)', lineHeight:1.85, marginBottom:32, paddingBottom:32, borderBottom:'1px solid rgba(10,37,64,0.08)' }}>{post.excerpt}</p>

          {/* Content — reset all styling via wrapper */}
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'1rem', color:'rgba(10,37,64,0.75)', lineHeight:1.85 }}
            className="post-body">
            {post.content}
          </div>
        </motion.div>

        {/* Back */}
        <div style={{ marginTop:56, paddingTop:32, borderTop:'1px solid rgba(10,37,64,0.08)', display:'flex', gap:12, flexWrap:'wrap', alignItems:'center', justifyContent:'space-between' }}>
          <Link to="/blog" style={{ display:'inline-flex', alignItems:'center', gap:7, background:'#f7f8fa', border:'1px solid rgba(10,37,64,0.1)', color:'#0a2540', padding:'10px 18px', borderRadius:9, fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:'0.8rem', textDecoration:'none' }}>
            <ArrowLeft size={13}/> All Articles
          </Link>
          <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:7, background:'#D4AF37', color:'#0a2540', padding:'10px 18px', borderRadius:9, fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.8rem', textDecoration:'none' }}>
            🕐 Prayer Times
          </Link>
        </div>
      </div>

      {/* Post body styles */}
      <style>{`
        .post-body h2 {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: clamp(1.2rem, 3vw, 1.6rem);
          color: #0a2540;
          margin: 36px 0 14px;
          letter-spacing: -0.015em;
        }
        .post-body h3 {
          font-family: 'Playfair Display', serif;
          font-weight: 800;
          font-size: 1.1rem;
          color: #0a2540;
          margin: 24px 0 10px;
        }
        .post-body p {
          color: rgba(10,37,64,0.72);
          margin-bottom: 16px;
          line-height: 1.85;
        }
        .post-body strong { color: #0a2540; font-weight: 700; }
        .post-body a { color: #D4AF37; text-decoration: underline; }
        .post-body ul { padding-left: 20px; margin-bottom: 16px; }
        .post-body li { color: rgba(10,37,64,0.7); margin-bottom: 8px; line-height: 1.7; }
        .post-body table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
        .post-body th,td { padding: 10px 12px; border-bottom: 1px solid rgba(10,37,64,0.07); text-align: left; color: rgba(10,37,64,0.7); }
        .post-body th { font-weight: 700; color: #0a2540; }
      `}</style>
    </div>
  );
}
