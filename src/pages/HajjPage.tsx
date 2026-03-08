import React from 'react';
import { Ship, Plane, Hotel, ShieldCheck, ArrowRight, Star } from 'lucide-react';
import { cn } from '@/src/utils/cn';
import { SEO } from '@/src/components/SEO';
import { motion } from 'motion/react';

export function HajjPage() {
  return (
    <div className="space-y-24 pb-24">
      <SEO 
        title="Hajj & Umrah Packages" 
        description="Premium Hajj and Umrah travel packages for 2026. Experience a spiritually fulfilling journey with expert guidance and premium lodging."
        keywords="hajj packages 2026, umrah packages, islamic travel, makkah travel"
      />

      <section className="relative h-[70vh] flex items-center justify-center bg-glamour-blue overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-glamour-blue/20 via-glamour-blue/60 to-glamour-blue"></div>
        <div className="relative z-10 text-center space-y-8 max-w-4xl px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-display font-black text-cream tracking-tighter"
          >
            Sacred Journeys
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gold font-black tracking-[0.4em] uppercase"
          >
            Hajj & Umrah 2026
          </motion.p>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="w-32 h-1 bg-gold mx-auto"
          ></motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        <PackageCard 
          title="Economy Umrah"
          price="From $1,299"
          duration="10 Days"
          features={["3 Star Hotels", "Group Transport", "Visa Processing", "Ziyarat Tours"]}
        />
        <PackageCard 
          title="Premium Hajj"
          price="From $8,500"
          duration="21 Days"
          features={["5 Star Hotels", "Private Transport", "Full Board Meals", "VIP Tents in Mina"]}
          featured
        />
        <PackageCard 
          title="Ramadan Umrah"
          price="From $2,499"
          duration="15 Days"
          features={["Close to Haram", "Iftar & Suhoor", "Spiritual Guide", "Visa Included"]}
        />
      </section>

      <section className="max-w-7xl mx-auto px-4">
        <div className="glass-card p-12 md:p-20 border-gold/20 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-display font-black text-cream">Why Ummah AI Travel?</h2>
                <p className="text-cream/60 text-lg font-light leading-relaxed">We provide a seamless spiritual experience, handling every detail so you can focus on your worship.</p>
              </div>
              <div className="space-y-10">
                <BenefitItem icon={ShieldCheck} title="Verified Operators" description="We only partner with Ministry-approved travel agencies with proven track records." />
                <BenefitItem icon={Star} title="Spiritual Guidance" description="Every group is accompanied by a qualified scholar to ensure correct rituals." />
                <BenefitItem icon={Hotel} title="Premium Lodging" description="We guarantee the hotels promised in your package, no last-minute changes." />
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gold/10 rounded-[2rem] blur-2xl group-hover:bg-gold/20 transition-all duration-1000"></div>
              <img 
                src="https://images.unsplash.com/photo-1565031491910-e57fac031c41?q=80&w=1935&auto=format&fit=crop" 
                alt="Makkah" 
                className="relative rounded-[2rem] shadow-2xl border border-gold/20 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PackageCard({ title, price, duration, features, featured }: { title: string, price: string, duration: string, features: string[], featured?: boolean }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={cn(
        "glass-card p-10 space-y-10 relative overflow-hidden flex flex-col border-gold/10 transition-all",
        featured ? "border-gold shadow-[0_0_50px_rgba(212,175,55,0.2)] scale-105 z-10 bg-glamour-blue-light" : "bg-glamour-blue/40"
      )}
    >
      {featured && <div className="absolute top-0 right-0 bg-gold text-glamour-blue px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">Best Value</div>}
      <div className="space-y-3">
        <h3 className="text-3xl font-display font-black text-cream">{title}</h3>
        <p className={cn("text-[10px] font-black uppercase tracking-[0.3em]", featured ? "text-gold" : "text-gold/40")}>{duration}</p>
      </div>
      <div className="text-5xl font-display font-black text-cream">{price}</div>
      <ul className="space-y-5 flex-grow">
        {features.map((f, i) => (
          <li key={i} className="flex items-center text-sm font-light text-cream/70">
            <Star className={cn("w-4 h-4 mr-4", featured ? "text-gold" : "text-gold/20")} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button className={cn(
        "w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center shadow-xl",
        featured ? "bg-gold text-glamour-blue hover:bg-gold-light" : "bg-white/5 text-gold border border-gold/20 hover:bg-white/10"
      )}>
        View Details <ArrowRight className="ml-3 w-4 h-4" />
      </button>
    </motion.div>
  );
}

function BenefitItem({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="flex items-start space-x-6 group">
      <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-gold/10 group-hover:border-gold transition-all">
        <Icon className="w-7 h-7 text-gold" />
      </div>
      <div className="space-y-2">
        <h4 className="text-xl font-display font-black text-cream group-hover:text-gold transition-colors">{title}</h4>
        <p className="text-sm text-cream/60 leading-relaxed font-light">{description}</p>
      </div>
    </div>
  );
}
