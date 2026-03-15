import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles, ShieldCheck, RotateCcw } from 'lucide-react';
import { askScholar } from '@/src/services/geminiService';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

const NAVY  = '#0a2540';
const NAVY2 = '#0d2e4d';
const GOLD  = '#D4AF37';

interface Message { role: 'user' | 'assistant'; content: string; }

const SUGGESTIONS: Record<string, string[]> = {
  en: [
    'What are the 5 pillars of Islam?',
    'How do I calculate Zakat on my savings?',
    'What time should I pray Fajr today?',
    'What is the significance of Laylatul Qadr?',
    'Is cryptocurrency halal in Islam?',
    'How many rakats are in each prayer?',
  ],
  ar: [
    'ما هي أركان الإسلام الخمسة؟',
    'كيف أحسب زكاة مدخراتي؟',
    'ما الوقت الصحيح لصلاة الفجر؟',
    'ما أهمية ليلة القدر؟',
    'هل العملة المشفرة حلال في الإسلام؟',
    'كم عدد ركعات كل صلاة؟',
  ],
  fr: [
    'Quels sont les 5 piliers de l\'Islam ?',
    'Comment calculer ma Zakat sur mes économies ?',
    'À quelle heure prier Fajr aujourd\'hui ?',
    'Quelle est la signification de Laylatul Qadr ?',
    'La cryptomonnaie est-elle halal ?',
    'Combien de raka\'at dans chaque prière ?',
  ],
  es: [
    '¿Cuáles son los 5 pilares del Islam?',
    '¿Cómo calculo el Zakat sobre mis ahorros?',
    '¿A qué hora rezo Fajr hoy?',
    '¿Cuál es el significado de Laylatul Qadr?',
    '¿Es la criptomoneda halal en el Islam?',
    '¿Cuántos rakats tiene cada oración?',
  ],
};

const UI: Record<string, any> = {
  en: { title: 'Scholar AI', subtitle: 'Islamic Knowledge Assistant', online: 'Online', greeting: 'Assalamu Alaikum wa Rahmatullahi wa Barakatuh 🌙\n\nI am your Islamic Scholar AI. Ask me anything about Islam, Quran, Hadith, Fiqh, prayer times, Zakat, Hajj or any spiritual matter — I will do my best to give you authentic, sourced guidance.\n\nHow can I help you today?', placeholder: 'Ask about Islam, Quran, Sunnah...', consulting: 'Consulting sources...', suggestLabel: 'Suggested questions', clearBtn: 'New conversation', disclaimer: 'This AI provides general Islamic guidance. For legal rulings (fatwa), always consult a qualified Islamic scholar.' },
  ar: { title: 'عالم الذكاء الاصطناعي', subtitle: 'مساعد المعرفة الإسلامية', online: 'متصل', greeting: 'السلام عليكم ورحمة الله وبركاته 🌙\n\nأنا مساعدك الإسلامي بالذكاء الاصطناعي. اسألني عن أي شيء يتعلق بالإسلام والقرآن والحديث والفقه وأوقات الصلاة والزكاة والحج أو أي أمر روحي — وسأبذل قصارى جهدي لتقديم إرشادات أصيلة ومستندة.\n\nكيف يمكنني مساعدتك اليوم؟', placeholder: 'اسأل عن الإسلام والقرآن والسنة...', consulting: 'استشارة المصادر...', suggestLabel: 'أسئلة مقترحة', clearBtn: 'محادثة جديدة', disclaimer: 'يقدم هذا الذكاء الاصطناعي إرشادات إسلامية عامة. للفتاوى الشرعية، استشر دائماً عالماً مؤهلاً.' },
  fr: { title: 'Scholar AI', subtitle: 'Assistant de Connaissance Islamique', online: 'En ligne', greeting: 'Assalamu Alaikum wa Rahmatullahi wa Barakatuh 🌙\n\nJe suis votre assistant IA islamique. Posez-moi toutes vos questions sur l\'Islam, le Coran, le Hadith, le Fiqh, les horaires de prière, la Zakat, le Hajj ou tout sujet spirituel.\n\nComment puis-je vous aider aujourd\'hui ?', placeholder: 'Posez une question sur l\'Islam...', consulting: 'Consultation des sources...', suggestLabel: 'Questions suggérées', clearBtn: 'Nouvelle conversation', disclaimer: 'Cette IA fournit des conseils islamiques généraux. Pour les avis juridiques (fatwa), consultez toujours un savant qualifié.' },
  es: { title: 'Scholar AI', subtitle: 'Asistente de Conocimiento Islámico', online: 'En línea', greeting: 'Assalamu Alaikum wa Rahmatullahi wa Barakatuh 🌙\n\nSoy tu asistente islámico de IA. Pregúntame sobre Islam, Corán, Hadith, Fiqh, horarios de oración, Zakat, Hajj o cualquier asunto espiritual — haré mi mejor esfuerzo para darte orientación auténtica.\n\n¿En qué puedo ayudarte hoy?', placeholder: 'Pregunta sobre el Islam, Corán, Sunnah...', consulting: 'Consultando fuentes...', suggestLabel: 'Preguntas sugeridas', clearBtn: 'Nueva conversación', disclaimer: 'Esta IA proporciona orientación islámica general. Para dictámenes legales (fatwa), consulta siempre a un estudioso islámico calificado.' },
};

/* ── Animated bot avatar ───────────────────────────────────── */
function BotAvatar({ thinking }: { thinking?: boolean }) {
  return (
    <div style={{ position: 'relative', width: 44, height: 44, flexShrink: 0 }}>
      {/* Outer pulse ring */}
      <motion.div animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0, 0.4] }} transition={{ duration: 2.2, repeat: Infinity }}
        style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: 'rgba(212,175,55,0.2)' }} />
      {/* Bot circle */}
      <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${GOLD}, #f1d279)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 4px 20px rgba(212,175,55,0.4)' }}>
        {/* Crescent moon face */}
        <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>☽</span>
      </div>
      {/* Online green dot */}
      {!thinking && (
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
          style={{ position: 'absolute', bottom: 1, right: 1, width: 11, height: 11, borderRadius: '50%', background: '#22c55e', border: `2px solid ${NAVY}`, boxShadow: '0 0 6px rgba(34,197,94,0.6)' }} />
      )}
      {thinking && (
        <div style={{ position: 'absolute', bottom: 1, right: 1, width: 11, height: 11, borderRadius: '50%', background: GOLD, border: `2px solid ${NAVY}` }}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            style={{ width: '100%', height: '100%', borderRadius: '50%', borderTop: '2px solid transparent', borderRight: '2px solid rgba(10,37,64,0.8)' }} />
        </div>
      )}
    </div>
  );
}

/* ── Typing dots ───────────────────────────────────────────── */
function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '4px 0' }}>
      {[0,1,2].map(i => (
        <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD }} />
      ))}
    </div>
  );
}

export function ScholarAI() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.slice(0,2) || 'en') as string;
  const L = UI[lang] || UI.en;
  const suggs = SUGGESTIONS[lang] || SUGGESTIONS.en;
  const isRTL = lang === 'ar';

  const initMsg: Message = { role: 'assistant', content: L.greeting };
  const [messages, setMessages] = useState<Message[]>([initMsg]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // Reset when language changes
  useEffect(() => {
    setMessages([{ role: 'assistant', content: UI[lang]?.greeting || UI.en.greeting }]);
  }, [lang]);

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setIsLoading(true);
    const response = await askScholar(text);
    setMessages(prev => [...prev, { role: 'assistant', content: response || "I'm sorry, I couldn't process that request. Please try again." }]);
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); send(input); };
  const clear = () => setMessages([{ role: 'assistant', content: L.greeting }]);

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background: NAVY, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Page header */}
      <div style={{ background: `linear-gradient(160deg,#071a2e 0%,${NAVY} 60%,${NAVY2} 100%)`, borderBottom: '1px solid rgba(212,175,55,0.14)', padding: 'clamp(70px,10vw,100px) 20px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(212,175,55,0.06) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 10 }}>
            <BotAvatar />
            <div style={{ textAlign: 'left' }}>
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.4rem,4vw,2.2rem)', color: '#fff', lineHeight: 1 }}>{L.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <ShieldCheck size={11} style={{ color: GOLD }} />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.52rem', fontWeight: 900, color: 'rgba(212,175,55,0.6)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{L.subtitle}</span>
                <motion.div animate={{ opacity: [1,0.4,1] }} transition={{ duration: 1.8, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.6)' }} />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.5rem', fontWeight: 700, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.16em' }}>{L.online}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: 820, width: '100%', margin: '0 auto', padding: '0 16px 16px', gap: 0 }}>

        {/* Messages */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '20px 0', display: 'flex', flexDirection: 'column', gap: 16, minHeight: 'calc(100vh - 380px)', maxHeight: 'calc(100vh - 320px)' }}>
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', gap: 10, alignItems: 'flex-end' }}>
                {m.role === 'assistant' && <BotAvatar />}
                <div style={{
                  maxWidth: '82%',
                  padding: '10px 14px',
                  borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
                  background: m.role === 'user' ? GOLD : 'rgba(255,255,255,0.05)',
                  border: m.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: '0.82rem',
                  lineHeight: 1.75,
                  color: m.role === 'user' ? NAVY : 'rgba(255,255,255,0.82)',
                  fontWeight: m.role === 'user' ? 700 : 300,
                  direction: isRTL ? 'rtl' : 'ltr',
                  boxShadow: m.role === 'user' ? '0 4px 16px rgba(212,175,55,0.3)' : 'none',
                }}>
                  <div className="prose prose-sm max-w-none" style={{ color: 'inherit' }}>
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </div>
                {m.role === 'user' && (
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '0.9rem' }}>👤</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
              <BotAvatar thinking />
              <div style={{ padding: '10px 14px', borderRadius: '4px 18px 18px 18px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <TypingDots />
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.62rem', fontWeight: 700, color: 'rgba(212,175,55,0.5)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>{L.consulting}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Suggestions (show only when 1 message) */}
        {messages.length === 1 && !isLoading && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.54rem', fontWeight: 900, color: 'rgba(212,175,55,0.45)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 10 }}>
              {L.suggestLabel}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {suggs.map(s => (
                <button key={s} onClick={() => send(s)}
                  style={{ padding: '7px 13px', background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.18)', borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontSize: '0.68rem', fontWeight: 600, color: 'rgba(255,255,255,0.65)', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}
                  onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(212,175,55,0.45)'; el.style.color='#fff'; el.style.background='rgba(212,175,55,0.12)'; }}
                  onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(212,175,55,0.18)'; el.style.color='rgba(255,255,255,0.65)'; el.style.background='rgba(212,175,55,0.07)'; }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '10px 10px 10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)}
              placeholder={L.placeholder}
              dir={isRTL ? 'rtl' : 'ltr'}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontFamily: "'DM Sans',sans-serif", fontSize: '0.88rem', fontWeight: 300, color: '#ffffff', padding: '6px 0' }} />
            <button type="submit" disabled={isLoading || !input.trim()}
              style={{ width: 40, height: 40, borderRadius: 12, background: input.trim() ? GOLD : 'rgba(212,175,55,0.2)', border: 'none', cursor: input.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.18s', boxShadow: input.trim() ? '0 4px 14px rgba(212,175,55,0.35)' : 'none' }}>
              {isLoading ? <Loader2 size={16} style={{ color: NAVY, animation: 'spin 1s linear infinite' }} /> : <Send size={16} style={{ color: NAVY }} />}
            </button>
          </form>
          <button onClick={clear} title={L.clearBtn}
            style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor='rgba(212,175,55,0.4)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor='rgba(255,255,255,0.1)')}>
            <RotateCcw size={13} style={{ color: 'rgba(255,255,255,0.35)' }} />
          </button>
        </div>

        {/* Disclaimer */}
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.58rem', color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 10, lineHeight: 1.6, padding: '0 8px' }}>
          {L.disclaimer}
        </p>
      </div>
    </div>
  );
}
