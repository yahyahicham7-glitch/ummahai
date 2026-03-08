import React from 'react';
import { ShoppingBag, Star, Heart, ArrowRight, Filter, Search } from 'lucide-react';
import { SEO } from '@/src/components/SEO';
import { motion } from 'motion/react';

const products = [
  { id: 1, name: "Premium Velvet Prayer Mat", price: 45.00, rating: 5, image: "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?q=80&w=1935&auto=format&fit=crop", category: "Prayer" },
  { id: 2, name: "Digital Tasbih Counter", price: 15.00, rating: 4, image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1964&auto=format&fit=crop", category: "Accessories" },
  { id: 3, name: "The Holy Quran - English/Arabic", price: 35.00, rating: 5, image: "https://images.unsplash.com/photo-1584281722571-086f56470876?q=80&w=1974&auto=format&fit=crop", category: "Books" },
  { id: 4, name: "Natural Oud Perfume Oil", price: 65.00, rating: 5, image: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=1935&auto=format&fit=crop", category: "Fragrance" },
  { id: 5, name: "Islamic Geometric Wall Art", price: 85.00, rating: 4, image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2080&auto=format&fit=crop", category: "Home" },
  { id: 6, name: "Handcrafted Miswak Set", price: 12.00, rating: 5, image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1964&auto=format&fit=crop", category: "Wellness" },
];

export function StorePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 space-y-16">
      <SEO 
        title="Islamic Store" 
        description="Shop premium Islamic products including prayer mats, Quran, Oud, and home decor. Support the Ummah with every purchase."
        keywords="islamic store, prayer mats, quran online, oud perfume, islamic art"
      />

      <div className="flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-display font-black text-cream">Islamic Store</h1>
          <p className="text-gold/60 text-sm font-bold uppercase tracking-[0.3em]">Curated Excellence for the Modern Believer</p>
        </div>
        <div className="flex space-x-6 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-glamour-blue-light/50 border border-gold/20 rounded-2xl py-4 px-14 text-sm focus:outline-none focus:border-gold transition-all placeholder:text-cream/20" 
            />
            <Search className="absolute left-5 top-4 w-5 h-5 text-gold/40 group-focus-within:text-gold transition-colors" />
          </div>
          <button className="bg-glamour-blue-light border border-gold/20 p-4 rounded-2xl text-gold hover:bg-gold hover:text-glamour-blue transition-all">
            <Filter className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map((p) => (
          <motion.div 
            key={p.id} 
            whileHover={{ y: -10 }}
            className="glass-card group overflow-hidden flex flex-col border-gold/10 hover:border-gold transition-all"
          >
            <div className="relative h-80 overflow-hidden">
              <img 
                src={p.image} 
                alt={p.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 right-6 space-y-3">
                <button className="bg-glamour-blue/80 backdrop-blur-md p-3 rounded-full text-gold hover:bg-gold hover:text-glamour-blue transition-all shadow-xl border border-gold/20">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute bottom-6 left-6">
                <span className="bg-glamour-blue/90 backdrop-blur-md text-gold text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-gold/30">
                  {p.category}
                </span>
              </div>
            </div>
            <div className="p-8 space-y-6 flex-grow flex flex-col">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-display font-black text-cream group-hover:text-gold transition-colors">{p.name}</h3>
                <div className="flex items-center text-gold">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs font-black ml-1.5">{p.rating}.0</span>
                </div>
              </div>
              <p className="text-3xl font-display font-black text-gold">${p.price.toFixed(2)}</p>
              <button className="w-full bg-gold text-glamour-blue py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gold-light transition-all flex items-center justify-center mt-auto shadow-xl">
                Add to Cart <ShoppingBag className="ml-3 w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-glamour-blue-light/50 rounded-[3rem] p-12 md:p-20 flex flex-col lg:flex-row items-center justify-between border border-gold/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-gold/10 transition-all duration-1000"></div>
        <div className="space-y-6 text-center lg:text-left mb-10 lg:mb-0 relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-black text-cream">Become an Affiliate</h2>
          <p className="text-cream/60 max-w-xl text-lg font-light leading-relaxed">Earn 15% commission on every sale by sharing Ummah AI products with your community. Join our mission to empower the Ummah.</p>
        </div>
        <button className="bg-gold text-glamour-blue px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gold-light hover:scale-105 transition-all shadow-2xl relative z-10">
          Join Partner Program
        </button>
      </div>
    </div>
  );
}
