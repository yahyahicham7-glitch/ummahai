import React from 'react';
import { SEO } from '@/src/components/SEO';
import { useTranslation } from 'react-i18next';

const NAVY = '#0a2540';
const GOLD = '#D4AF37';

const T: Record<string, any> = {
  en: {
    title: 'Privacy Policy',
    updated: 'Last Updated: March 2026',
    sections: [
      { h:'1. Information We Collect', t:'We collect the following to provide our services:\n• Location data (IP or GPS, with your permission) for prayer times and Qibla direction.\n• Usage data via Google Analytics to improve the platform.\n• Device information for compatibility.' },
      { h:'2. How We Use Your Data', t:'We use data solely to provide and improve our services. We do not sell personal information to third parties. Location data is never stored on our servers.' },
      { h:'3. Cookies & Analytics', t:'We use cookies and Google Analytics to understand how users interact with Al Ummah AI. You can disable cookies in your browser at any time.' },
      { h:'4. Advertising', t:'We use Google AdSense to display relevant ads. Google may use cookies to serve ads based on your prior visits. You can opt out at google.com/settings/ads.' },
      { h:'5. Data Security', t:'We use industry-standard security measures. However, no method of transmission over the Internet is 100% secure. We do not store sensitive personal data.' },
      { h:'6. Children\'s Privacy', t:'Al Ummah AI is not directed at children under 13. We do not knowingly collect data from children under 13.' },
      { h:'7. Your Rights', t:'You have the right to access, correct or delete your data. Contact us at support@alummahai.com for any privacy-related requests.' },
      { h:'8. Contact', t:'Privacy questions: support@alummahai.com\nWebsite: alummahai.com' },
    ],
  },
  ar: {
    title: 'سياسة الخصوصية',
    updated: 'آخر تحديث: مارس 2026',
    sections: [
      { h:'1. المعلومات التي نجمعها', t:'نجمع ما يلي لتقديم خدماتنا:\n• بيانات الموقع (IP أو GPS، بإذنك) لأوقات الصلاة واتجاه القبلة.\n• بيانات الاستخدام عبر Google Analytics لتحسين المنصة.\n• معلومات الجهاز للتوافق.' },
      { h:'2. كيف نستخدم بياناتك', t:'نستخدم البيانات فقط لتقديم خدماتنا وتحسينها. لا نبيع المعلومات الشخصية لأطراف ثالثة. لا يتم تخزين بيانات الموقع على خوادمنا.' },
      { h:'3. ملفات تعريف الارتباط والتحليلات', t:'نستخدم ملفات تعريف الارتباط وGoogle Analytics لفهم كيفية تفاعل المستخدمين مع الأمة AI. يمكنك تعطيل ملفات تعريف الارتباط في متصفحك في أي وقت.' },
      { h:'4. الإعلانات', t:'نستخدم Google AdSense لعرض إعلانات ذات صلة. قد يستخدم Google ملفات تعريف الارتباط. يمكنك إلغاء الاشتراك على google.com/settings/ads.' },
      { h:'5. أمان البيانات', t:'نستخدم تدابير أمنية قياسية في الصناعة. لا نخزن بيانات شخصية حساسة.' },
      { h:'6. خصوصية الأطفال', t:'الأمة AI غير موجه للأطفال دون 13 عاماً. لا نجمع بيانات من الأطفال دون 13 عاماً.' },
      { h:'7. حقوقك', t:'لديك الحق في الوصول إلى بياناتك أو تصحيحها أو حذفها. تواصل معنا على support@alummahai.com.' },
      { h:'8. التواصل', t:'استفسارات الخصوصية: support@alummahai.com\nالموقع: alummahai.com' },
    ],
  },
  fr: {
    title: 'Politique de Confidentialité',
    updated: 'Dernière mise à jour : Mars 2026',
    sections: [
      { h:'1. Informations Collectées', t:'Nous collectons les éléments suivants pour fournir nos services :\n• Données de localisation (IP ou GPS, avec votre permission) pour les horaires de prière et la Qibla.\n• Données d\'utilisation via Google Analytics.\n• Informations sur l\'appareil pour la compatibilité.' },
      { h:'2. Utilisation de Vos Données', t:'Nous utilisons les données uniquement pour fournir et améliorer nos services. Nous ne vendons pas d\'informations personnelles à des tiers. Les données de localisation ne sont jamais stockées sur nos serveurs.' },
      { h:'3. Cookies & Analytiques', t:'Nous utilisons des cookies et Google Analytics pour comprendre comment les utilisateurs interagissent avec Al Ummah AI. Vous pouvez désactiver les cookies dans votre navigateur à tout moment.' },
      { h:'4. Publicité', t:'Nous utilisons Google AdSense pour afficher des annonces pertinentes. Vous pouvez vous désabonner sur google.com/settings/ads.' },
      { h:'5. Sécurité des Données', t:'Nous utilisons des mesures de sécurité standard. Nous ne stockons pas de données personnelles sensibles.' },
      { h:'6. Confidentialité des Enfants', t:'Al Ummah AI ne s\'adresse pas aux enfants de moins de 13 ans. Nous ne collectons pas sciemment de données auprès d\'enfants de moins de 13 ans.' },
      { h:'7. Vos Droits', t:'Vous avez le droit d\'accéder, de corriger ou de supprimer vos données. Contactez-nous à support@alummahai.com.' },
      { h:'8. Contact', t:'Questions de confidentialité : support@alummahai.com\nSite Web : alummahai.com' },
    ],
  },
  es: {
    title: 'Política de Privacidad',
    updated: 'Última actualización: Marzo 2026',
    sections: [
      { h:'1. Información que Recopilamos', t:'Recopilamos lo siguiente para proporcionar nuestros servicios:\n• Datos de ubicación (IP o GPS, con tu permiso) para horarios de oración y Qibla.\n• Datos de uso a través de Google Analytics.\n• Información del dispositivo para compatibilidad.' },
      { h:'2. Cómo Usamos Tus Datos', t:'Usamos los datos únicamente para proporcionar y mejorar nuestros servicios. No vendemos información personal a terceros. Los datos de ubicación nunca se almacenan en nuestros servidores.' },
      { h:'3. Cookies y Análisis', t:'Usamos cookies y Google Analytics para comprender cómo los usuarios interactúan con Al Ummah AI. Puedes deshabilitar las cookies en tu navegador en cualquier momento.' },
      { h:'4. Publicidad', t:'Usamos Google AdSense para mostrar anuncios relevantes. Puedes cancelar la suscripción en google.com/settings/ads.' },
      { h:'5. Seguridad de Datos', t:'Usamos medidas de seguridad estándar de la industria. No almacenamos datos personales sensibles.' },
      { h:'6. Privacidad de Menores', t:'Al Ummah AI no está dirigido a niños menores de 13 años. No recopilamos datos de niños menores de 13 años.' },
      { h:'7. Tus Derechos', t:'Tienes derecho a acceder, corregir o eliminar tus datos. Contáctanos en support@alummahai.com.' },
      { h:'8. Contacto', t:'Preguntas de privacidad: support@alummahai.com\nSitio web: alummahai.com' },
    ],
  },
};

export function PrivacyPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.slice(0,2) || 'en') as keyof typeof T;
  const L = T[lang] || T.en;
  const isRTL = lang === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background: NAVY, minHeight:'100vh', color:'#fff' }}>
      <SEO title={`${L.title} — Al Ummah AI`} description="Privacy Policy for Al Ummah AI. How we collect, use and protect your data." canonical="https://www.alummahai.com/privacy" lang={lang} />
      <div style={{ maxWidth:760, margin:'0 auto', padding:'clamp(80px,10vw,110px) 24px clamp(48px,6vw,64px)' }}>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.8rem,5vw,3rem)', color:'#fff', marginBottom:8 }}>{L.title}</h1>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:'0.62rem', color:'rgba(212,175,55,0.5)', textTransform:'uppercase', letterSpacing:'0.22em', marginBottom:40 }}>{L.updated}</p>
        {L.sections.map(({ h, t }: any) => (
          <div key={h} style={{ marginBottom:32 }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:'clamp(0.95rem,2vw,1.15rem)', color:GOLD, marginBottom:10 }}>{h}</h2>
            {t.split('\n').map((line: string, i: number) => (
              <p key={i} style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.84rem', color:'rgba(255,255,255,0.5)', lineHeight:1.85, marginBottom:4 }}>{line}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
