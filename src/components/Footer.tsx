import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-glamour-blue-light text-cream/60 pt-20 pb-10 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-8">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-glamour-blue rounded-full flex items-center justify-center border border-gold/30 shadow-lg">
                <Moon className="text-gold w-7 h-7" />
              </div>
              <span className="text-2xl font-display font-black text-cream tracking-tighter">UMMAH AI</span>
            </Link>
            <p className="text-sm leading-relaxed font-light">
              The world's most advanced Islamic ecosystem. Empowering the global Ummah with premium digital tools and authentic knowledge.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="hover:text-gold transition-all hover:scale-110"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-gold transition-all hover:scale-110"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-gold transition-all hover:scale-110"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-gold transition-all hover:scale-110"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-gold font-display font-black mb-8 tracking-[0.2em] text-[10px] uppercase">Sacred Tools</h3>
            <ul className="space-y-5 text-xs font-bold tracking-widest uppercase">
              <li><Link to="/quran" className="hover:text-gold transition-colors">Holy Quran</Link></li>
              <li><Link to="/prayer-times" className="hover:text-gold transition-colors">Prayer Times</Link></li>
              <li><Link to="/qibla" className="hover:text-gold transition-colors">Qibla Finder</Link></li>
              <li><Link to="/zakat" className="hover:text-gold transition-colors">Zakat Calculator</Link></li>
              <li><Link to="/scholar" className="hover:text-gold transition-colors">Scholar AI</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gold font-display font-black mb-8 tracking-[0.2em] text-[10px] uppercase">Community</h3>
            <ul className="space-y-5 text-xs font-bold tracking-widest uppercase">
              <li><Link to="/hajj" className="hover:text-gold transition-colors">Hajj & Umrah</Link></li>
              <li><Link to="/store" className="hover:text-gold transition-colors">Islamic Store</Link></li>
              <li><Link to="/news" className="hover:text-gold transition-colors">Islamic News</Link></li>
              <li><Link to="/duas" className="hover:text-gold transition-colors">Daily Duas</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gold font-display font-black mb-8 tracking-[0.2em] text-[10px] uppercase">Newsletter</h3>
            <p className="text-xs mb-6 font-light leading-relaxed">Join 50,000+ Muslims receiving weekly spiritual insights and platform updates.</p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-glamour-blue/50 border border-gold/20 rounded-xl px-5 py-3 text-xs focus:outline-none focus:border-gold transition-colors placeholder:text-cream/20"
              />
              <button className="bg-gold text-glamour-blue px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gold-light transition-all shadow-lg">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-gold/5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-[10px] font-bold tracking-[0.2em] uppercase text-cream/30">
          <p>© 2026 UMMAH AI. Spiritual Excellence Guaranteed.</p>
          <div className="flex space-x-8">
            <Link to="/privacy" className="hover:text-gold transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-gold transition-colors">Terms</Link>
            <Link to="/contact" className="hover:text-gold transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
