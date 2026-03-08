import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, MessageSquare, Sparkles, ShieldCheck } from 'lucide-react';
import { askScholar } from '@/src/services/geminiService';
import { cn } from '@/src/utils/cn';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ScholarAI() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Assalamu Alaikum! I am your Scholar AI assistant. How can I help you today with questions about Islam, Quran, or Sunnah?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const response = await askScholar(userMessage);
    setMessages(prev => [...prev, { role: 'assistant', content: response || "I'm sorry, I couldn't process that." }]);
    setIsLoading(false);
  };

  return (
    <div className="glass-card flex flex-col h-[700px] overflow-hidden border-gold/30 shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative">
      <div className="absolute inset-0 bg-glamour-blue/20 pointer-events-none"></div>
      
      {/* Header */}
      <div className="bg-glamour-blue-light/80 backdrop-blur-md p-8 border-b border-gold/20 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-5">
          <div className="relative">
            <div className="absolute -inset-1 bg-gold rounded-full blur opacity-30 animate-pulse"></div>
            <div className="relative w-14 h-14 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center shadow-2xl border border-white/20">
              <Sparkles className="text-glamour-blue w-8 h-8" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-display font-black text-cream tracking-tight">Scholar AI</h2>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <p className="text-[10px] text-gold font-black tracking-[0.2em] uppercase">Verified Knowledge Base</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-cream/40">Real-time Guidance</span>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 bg-glamour-blue/40 no-scrollbar relative z-10"
      >
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i} 
              className={cn(
                "flex w-full",
                m.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "max-w-[80%] p-6 rounded-3xl text-sm leading-relaxed shadow-2xl border transition-all duration-500",
                m.role === 'user' 
                  ? "bg-gold text-glamour-blue rounded-tr-none border-white/20 font-bold" 
                  : "bg-glamour-blue-light/80 backdrop-blur-md border-gold/20 text-cream rounded-tl-none"
              )}>
                <div className={cn(
                  "prose prose-sm max-w-none",
                  m.role === 'user' ? "prose-invert" : "prose-gold text-cream/90 font-light"
                )}>
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-glamour-blue-light/50 border border-gold/20 p-5 rounded-3xl rounded-tl-none flex items-center space-x-4">
              <Loader2 className="w-5 h-5 text-gold animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gold/60">Consulting Sources...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-6 bg-glamour-blue-light/90 backdrop-blur-md border-t border-gold/20 flex items-center space-x-4 relative z-10">
        <div className="relative flex-1 group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about Islam, Quran, or Sunnah..."
            className="w-full bg-glamour-blue/50 border border-gold/10 rounded-2xl py-5 px-8 text-sm focus:outline-none focus:border-gold transition-all text-cream placeholder:text-cream/20 font-light"
          />
          <div className="absolute right-4 top-4 text-gold/20 group-focus-within:text-gold/60 transition-colors">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>
        <button 
          type="submit"
          disabled={isLoading}
          className="bg-gold text-glamour-blue p-5 rounded-2xl hover:bg-gold-light transition-all disabled:opacity-50 shadow-2xl border border-white/20 group"
        >
          <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </form>
    </div>
  );
}
