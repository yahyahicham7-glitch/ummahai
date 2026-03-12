import React from 'react';
import { SEO } from '@/src/components/SEO';
import { useTranslation } from 'react-i18next';

const NAVY = '#0a2540';
const GOLD = '#D4AF37';

const T: Record<string, any> = {
  en: {
    title: 'Terms of Service',
    updated: 'Last Updated: March 2026',
    sections: [
      { h:'1. Acceptance', t:'By using Al Ummah AI, you agree to these Terms. If you disagree, please discontinue use.' },
      { h:'2. Use of Services', t:'You may use Al Ummah AI for personal, non-commercial purposes. You agree not to misuse, disrupt or attempt to access services in unauthorized ways.' },
      { h:'3. Content Accuracy', t:'Prayer times are sourced from the Aladhan API and are as accurate as possible. Always verify critical timings locally. Quranic text is from the standard Uthmani script.' },
      { h:'4. Intellectual Property', t:'All content, design and code belongs to Al Ummah AI unless otherwise stated. You may not reproduce or redistribute content without permission.' },
      { h:'5. Third-Party Links', t:'We link to external sites (affiliate partners, Islamic finance providers). We are not responsible for external content or privacy practices.' },
      { h:'6. Limitation of Liability', t:'Al Ummah AI is provided "as is." We are not liable for inaccuracies in prayer times, religious guidance, or any damages from use of the platform.' },
      { h:'7. Changes', t:'We may update these Terms at any time. Continued use after changes constitutes acceptance.' },
      { h:'8. Contact', t:'Questions: support@alummahai.com' },
    ],
  },
  ar: {
    title: 'شروط الخدمة',
    updated: 'آخر تحديث: مارس 2026',
    sections: [
      { h:'1. القبول', t:'باستخدامك الأمة AI، فأنت توافق على هذه الشروط. إذا كنت لا توافق، يرجى التوقف عن الاستخدام.' },
      { h:'2. استخدام الخدمات', t:'يجوز لك استخدام الأمة AI لأغراض شخصية غير تجارية. توافق على عدم إساءة الاستخدام أو الوصول غير المصرح به.' },
      { h:'3. دقة المحتوى', t:'أوقات الصلاة مأخوذة من Aladhan API وهي بأكبر قدر من الدقة الممكنة. تحقق دائماً من التوقيتات الحرجة محلياً.' },
      { h:'4. الملكية الفكرية', t:'جميع المحتوى والتصميم والكود ملك للأمة AI. لا يجوز استنساخ المحتوى أو إعادة توزيعه دون إذن.' },
      { h:'5. روابط الطرف الثالث', t:'نرتبط بمواقع خارجية (شركاء تابعون). نحن غير مسؤولين عن المحتوى الخارجي أو ممارسات الخصوصية.' },
      { h:'6. تحديد المسؤولية', t:'الأمة AI مقدم "كما هو". لسنا مسؤولين عن أي أضرار ناجمة عن استخدام المنصة.' },
      { h:'7. التغييرات', t:'قد نحدّث هذه الشروط في أي وقت. الاستمرار في الاستخدام بعد التغييرات يعني القبول.' },
      { h:'8. التواصل', t:'للاستفسارات: support@alummahai.com' },
    ],
  },
  fr: {
    title: 'Conditions d\'Utilisation',
    updated: 'Dernière mise à jour : Mars 2026',
    sections: [
      { h:'1. Acceptation', t:'En utilisant Al Ummah AI, vous acceptez ces Conditions. Si vous n\'êtes pas d\'accord, veuillez cesser d\'utiliser le service.' },
      { h:'2. Utilisation des Services', t:'Vous pouvez utiliser Al Ummah AI à des fins personnelles et non commerciales. Vous acceptez de ne pas utiliser les services de manière abusive.' },
      { h:'3. Exactitude du Contenu', t:'Les horaires de prière proviennent de l\'API Aladhan. Vérifiez toujours les horaires critiques localement.' },
      { h:'4. Propriété Intellectuelle', t:'Tout le contenu appartient à Al Ummah AI sauf indication contraire. Vous ne pouvez pas reproduire le contenu sans permission.' },
      { h:'5. Liens Tiers', t:'Nous relions à des sites externes. Nous ne sommes pas responsables du contenu externe.' },
      { h:'6. Limitation de Responsabilité', t:'Al Ummah AI est fourni "tel quel." Nous ne sommes pas responsables des inexactitudes ou dommages.' },
      { h:'7. Modifications', t:'Nous pouvons mettre à jour ces Conditions à tout moment. L\'utilisation continue constitue une acceptation.' },
      { h:'8. Contact', t:'Questions : support@alummahai.com' },
    ],
  },
  es: {
    title: 'Términos de Servicio',
    updated: 'Última actualización: Marzo 2026',
    sections: [
      { h:'1. Aceptación', t:'Al usar Al Ummah AI, aceptas estos Términos. Si no estás de acuerdo, por favor deja de usar el servicio.' },
      { h:'2. Uso de Servicios', t:'Puedes usar Al Ummah AI para fines personales y no comerciales. Aceptas no hacer un uso indebido del servicio.' },
      { h:'3. Precisión del Contenido', t:'Los horarios de oración provienen de la API Aladhan. Siempre verifica los horarios críticos localmente.' },
      { h:'4. Propiedad Intelectual', t:'Todo el contenido pertenece a Al Ummah AI a menos que se indique lo contrario. No puedes reproducir el contenido sin permiso.' },
      { h:'5. Enlaces de Terceros', t:'Enlazamos a sitios externos. No somos responsables del contenido externo.' },
      { h:'6. Limitación de Responsabilidad', t:'Al Ummah AI se proporciona "tal cual." No somos responsables de inexactitudes ni daños.' },
      { h:'7. Cambios', t:'Podemos actualizar estos Términos en cualquier momento. El uso continuado constituye aceptación.' },
      { h:'8. Contacto', t:'Preguntas: support@alummahai.com' },
    ],
  },
};

export function TermsPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.slice(0,2) || 'en') as keyof typeof T;
  const L = T[lang] || T.en;
  const isRTL = lang === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background: NAVY, minHeight:'100vh', color:'#fff' }}>
      <SEO title={`${L.title} — Al Ummah AI`} description="Terms of Service for Al Ummah AI." canonical="https://www.alummahai.com/terms" lang={lang} />
      <div style={{ maxWidth:760, margin:'0 auto', padding:'clamp(80px,10vw,110px) 24px clamp(48px,6vw,64px)' }}>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.8rem,5vw,3rem)', color:'#fff', marginBottom:8 }}>{L.title}</h1>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:'0.62rem', color:'rgba(212,175,55,0.5)', textTransform:'uppercase', letterSpacing:'0.22em', marginBottom:40 }}>{L.updated}</p>
        {L.sections.map(({ h, t }: any) => (
          <div key={h} style={{ marginBottom:32 }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:'clamp(0.95rem,2vw,1.15rem)', color:GOLD, marginBottom:10 }}>{h}</h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.84rem', color:'rgba(255,255,255,0.5)', lineHeight:1.85 }}>{t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
