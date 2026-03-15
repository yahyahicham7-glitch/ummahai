import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, RotateCcw } from 'lucide-react';
import { askScholar } from '@/src/services/geminiService';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

const NAVY  = '#0a2540';
const GOLD  = '#D4AF37';

interface Message { role: 'user' | 'assistant'; content: string; }

const SUGGESTIONS: Record<string, string[]> = {
  en: ['What are the 5 pillars of Islam?','How do I calculate Zakat?','How many rakats in each prayer?','What is Laylatul Qadr?','Is cryptocurrency halal?','How to perform Wudu?'],
  ar: ['ما هي أركان الإسلام الخمسة؟','كيف أحسب زكاة مدخراتي؟','كم عدد ركعات كل صلاة؟','ما أهمية ليلة القدر؟','هل العملة المشفرة حلال؟','كيف أتوضأ؟'],
  fr: ["Quels sont les 5 piliers de l'Islam ?","Comment calculer ma Zakat ?","Combien de raka'at dans chaque prière ?","Quelle est la signification de Laylatul Qadr ?","La cryptomonnaie est-elle halal ?","Comment faire les ablutions ?"],
  es: ['¿Cuáles son los 5 pilares del Islam?','¿Cómo calculo el Zakat?','¿Cuántos rakats tiene cada oración?','¿Cuál es el significado de Laylatul Qadr?','¿Es la criptomoneda halal?','¿Cómo hacer el Wudu?'],
};

const UI: Record<string, any> = {
  en: { title:'Scholar AI', online:'Online', greeting:'Assalamu Alaikum 🌙\n\nI am your Islamic Scholar AI. Ask me anything about Islam, Quran, Hadith, Fiqh, prayer, Zakat or Hajj.\n\nHow can I help you today?', placeholder:'Ask about Islam, Quran, Sunnah...', consulting:'Consulting sources...', suggestLabel:'Suggested', clearBtn:'New chat', disclaimer:'General guidance only. For fatwas, consult a qualified scholar.' },
  ar: { title:'عالم الذكاء الاصطناعي', online:'متصل', greeting:'السلام عليكم 🌙\n\nأنا مساعدك الإسلامي. اسألني عن الإسلام والقرآن والحديث والفقه والصلاة والزكاة والحج.\n\nكيف يمكنني مساعدتك؟', placeholder:'اسأل عن الإسلام والقرآن...', consulting:'استشارة المصادر...', suggestLabel:'مقترحة', clearBtn:'محادثة جديدة', disclaimer:'إرشادات عامة فقط. للفتاوى استشر عالماً مؤهلاً.' },
  fr: { title:'Scholar AI', online:'En ligne', greeting:"Assalamu Alaikum 🌙\n\nJe suis votre assistant islamique. Posez-moi vos questions sur l'Islam, le Coran, le Hadith, la prière, la Zakat ou le Hajj.\n\nComment puis-je vous aider ?", placeholder:"Posez une question sur l'Islam...", consulting:'Consultation...', suggestLabel:'Suggérées', clearBtn:'Nouveau chat', disclaimer:'Conseils généraux uniquement. Pour les fatwas, consultez un savant qualifié.' },
  es: { title:'Scholar AI', online:'En línea', greeting:'Assalamu Alaikum 🌙\n\nSoy tu asistente islámico. Pregúntame sobre Islam, Corán, Hadith, Fiqh, oración, Zakat o Hajj.\n\n¿En qué puedo ayudarte?', placeholder:'Pregunta sobre el Islam...', consulting:'Consultando...', suggestLabel:'Sugeridas', clearBtn:'Nuevo chat', disclaimer:'Orientación general. Para fatwas, consulta a un erudito calificado.' },
};

export function ScholarAI() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.slice(0,2) || 'en') as string;
  const L = UI[lang] || UI.en;
  const suggs = SUGGESTIONS[lang] || SUGGESTIONS.en;
  const isRTL = lang === 'ar';

  const [messages, setMessages] = useState<Message[]>([{ role:'assistant', content:L.greeting }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth', block:'end' }); }, [messages, isLoading]);
  useEffect(() => { setMessages([{ role:'assistant', content: UI[lang]?.greeting || UI.en.greeting }]); }, [lang]);

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setInput('');
    setMessages(prev => [...prev, { role:'user', content:text }]);
    setIsLoading(true);
    const response = await askScholar(text);
    setMessages(prev => [...prev, { role:'assistant', content: response || "Sorry, please try again." }]);
    setIsLoading(false);
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background:NAVY, height:'100dvh', display:'flex', flexDirection:'column', overflow:'hidden' }}>

      {/* Header */}
      <div style={{ background:'rgba(0,0,0,0.25)', borderBottom:'1px solid rgba(212,175,55,0.1)', padding:'10px 16px', display:'flex', alignItems:'center', gap:10, flexShrink:0, marginTop:0 }}>
        <div style={{ width:30, height:30, borderRadius:'50%', background:`linear-gradient(135deg,${GOLD},#f1d279)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 2px 10px rgba(212,175,55,0.3)' }}>
          <span style={{ fontSize:'0.85rem' }}>☽</span>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'0.85rem', color:'#fff' }}>{L.title}</div>
          <div style={{ display:'flex', alignItems:'center', gap:4 }}>
            <div style={{ width:5, height:5, borderRadius:'50%', background:'#22c55e' }} />
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.48rem', fontWeight:700, color:'#22c55e', textTransform:'uppercase', letterSpacing:'0.1em' }}>{L.online}</span>
          </div>
        </div>
        <button onClick={() => setMessages([{ role:'assistant', content:L.greeting }])} style={{ width:28, height:28, borderRadius:7, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <RotateCcw size={11} style={{ color:'rgba(255,255,255,0.25)' }} />
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'14px 12px', display:'flex', flexDirection:'column', gap:10, WebkitOverflowScrolling:'touch' }}>

        {messages.length === 1 && !isLoading && (
          <div style={{ marginBottom:6 }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.48rem', fontWeight:900, color:'rgba(212,175,55,0.35)', textTransform:'uppercase', letterSpacing:'0.16em', marginBottom:6 }}>{L.suggestLabel}</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
              {suggs.map(s => (
                <button key={s} onClick={() => send(s)} style={{ padding:'4px 9px', background:'rgba(212,175,55,0.05)', border:'1px solid rgba(212,175,55,0.12)', borderRadius:16, fontFamily:"'DM Sans',sans-serif", fontSize:'0.58rem', fontWeight:600, color:'rgba(255,255,255,0.5)', cursor:'pointer', textAlign:'left' }}>{s}</button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div key={i} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
              style={{ display:'flex', justifyContent: m.role==='user' ? 'flex-end' : 'flex-start', gap:6, alignItems:'flex-start' }}>
              {m.role==='assistant' && <div style={{ width:24, height:24, borderRadius:'50%', background:`linear-gradient(135deg,${GOLD},#f1d279)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2 }}><span style={{ fontSize:'0.65rem' }}>☽</span></div>}
              <div style={{
                maxWidth:'82%', padding:'9px 12px',
                borderRadius: m.role==='user' ? '14px 14px 3px 14px' : '3px 14px 14px 14px',
                background: m.role==='user' ? GOLD : 'rgba(255,255,255,0.04)',
                border: m.role==='user' ? 'none' : '1px solid rgba(255,255,255,0.07)',
                fontFamily:"'DM Sans',sans-serif", fontSize:'0.78rem', lineHeight:1.65,
                color: m.role==='user' ? NAVY : 'rgba(255,255,255,0.78)',
                fontWeight: m.role==='user' ? 700 : 300,
              }}>
                <div style={{ color:'inherit' }}><ReactMarkdown>{m.content}</ReactMarkdown></div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ display:'flex', gap:6, alignItems:'flex-start' }}>
            <div style={{ width:24, height:24, borderRadius:'50%', background:`linear-gradient(135deg,${GOLD},#f1d279)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><span style={{ fontSize:'0.65rem' }}>☽</span></div>
            <div style={{ padding:'9px 12px', borderRadius:'3px 14px 14px 14px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display:'flex', gap:3, alignItems:'center' }}>
                {[0,1,2].map(i => <motion.div key={i} animate={{ y:[0,-3,0] }} transition={{ duration:0.45, repeat:Infinity, delay:i*0.1 }} style={{ width:5, height:5, borderRadius:'50%', background:GOLD }} />)}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={endRef} />
      </div>

      {/* Input — always visible at bottom */}
      <div style={{ flexShrink:0, background:NAVY, borderTop:'1px solid rgba(255,255,255,0.06)', padding:'8px 10px', paddingBottom:'max(8px, env(safe-area-inset-bottom))' }}>
        <form onSubmit={(e) => { e.preventDefault(); send(input); }} style={{ display:'flex', gap:6, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, padding:'5px 6px 5px 12px', alignItems:'center' }}>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder={L.placeholder} dir={isRTL ? 'rtl' : 'ltr'}
            style={{ flex:1, background:'transparent', border:'none', outline:'none', fontFamily:"'DM Sans',sans-serif", fontSize:'0.82rem', fontWeight:300, color:'#fff', padding:'5px 0', minWidth:0 }} />
          <button type="submit" disabled={isLoading || !input.trim()}
            style={{ width:34, height:34, borderRadius:9, background: input.trim() ? GOLD : 'rgba(212,175,55,0.12)', border:'none', cursor: input.trim() ? 'pointer' : 'default', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            {isLoading ? <Loader2 size={14} style={{ color:NAVY, animation:'spin 1s linear infinite' }} /> : <Send size={14} style={{ color:NAVY }} />}
          </button>
        </form>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.45rem', color:'rgba(255,255,255,0.12)', textAlign:'center', marginTop:4 }}>{L.disclaimer}</p>
      </div>
    </div>
  );
}
