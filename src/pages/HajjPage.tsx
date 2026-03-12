import React, { useState } from 'react';
import { SEO } from '@/src/components/SEO';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, ChevronDown, ChevronUp, MapPin, Calendar, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NAVY  = '#0a2540';
const NAVY2 = '#0d2e4d';
const GOLD  = '#D4AF37';

const T: Record<string, any> = {
  en: {
    badge: 'Hajj 2026 · Complete Guide',
    title: 'Hajj Guide 2026',
    quranVerse: '"And proclaim to the people the Hajj [pilgrimage]; they will come to you on foot and on every lean camel; they will come from every distant pass." — Quran 22:27',
    sub: 'The complete guide to Hajj 2026 — dates, rituals, spiritual preparation, practical tips and what to expect at every step of the holiest journey in Islam.',
    datesH: 'Hajj 2026 Dates',
    dates: [
      { d:'~Jun 4, 2026', e:'8 Dhul Hijjah', t:'Day of Tarwiyah — Enter Ihram, travel to Mina' },
      { d:'~Jun 5, 2026', e:'9 Dhul Hijjah', t:'Day of Arafat — The pillar of Hajj. Stand at Arafat from midday to sunset. Move to Muzdalifah at night.' },
      { d:'~Jun 6, 2026', e:'10 Dhul Hijjah — Eid al-Adha', t:'Stoning of Jamarat (Aqabah), sacrifice, shave/cut hair, Tawaf al-Ifadah, Sa\'i.' },
      { d:'Jun 7–9, 2026', e:'11–13 Dhul Hijjah (Tashreeq Days)', t:'Stoning the three Jamarat daily. Final Tawaf al-Wada before leaving.' },
    ],
    ritualH: 'The 10 Steps of Hajj',
    rituals: [
      { n:'1. Ihram',         d:'Enter the state of Ihram at the Miqat. Wear the two white garments (men), make intention (Niyyah) for Hajj and recite Talbiyah: "Labbayk Allahumma Labbayk."' },
      { n:'2. Arrival Tawaf', d:'Upon arriving in Makkah, perform Tawaf al-Qudum — 7 counterclockwise circuits around the Kaaba, starting and ending at the Black Stone.' },
      { n:'3. Sa\'i',         d:'Walk 7 times between the hills of Safa and Marwa, commemorating Hajar\'s search for water for her son Ismail.' },
      { n:'4. Travel to Mina', d:'On 8 Dhul Hijjah (Tarwiyah Day), travel to Mina and spend the night there in preparation for the Day of Arafat.' },
      { n:'5. Wuquf at Arafat', d:'The essential pillar of Hajj. Stand at the plain of Arafat from midday to sunset on 9 Dhul Hijjah. Pray, make dua and seek forgiveness. Without this, Hajj is invalid.' },
      { n:'6. Muzdalifah',    d:'After sunset at Arafat, travel to Muzdalifah. Pray Maghrib and Isha combined. Collect 49–70 pebbles for stoning. Sleep under the open sky.' },
      { n:'7. Stoning the Jamarat', d:'On Eid day (10 Dhul Hijjah), stone the large pillar (Jamarat al-Aqabah) with 7 pebbles, saying "Allahu Akbar" with each throw. Repeat on 11, 12 (and 13) Dhul Hijjah for all three pillars.' },
      { n:'8. Sacrifice (Qurbani)', d:'After stoning, sacrifice an animal (or arrange for one to be done). This commemorates Ibrahim\'s ﷺ willingness to sacrifice his son.' },
      { n:'9. Shave or Cut Hair', d:'Men shave their heads (Halq) or shorten the hair (Taqsir). Women cut a fingertip length. This marks partial release from Ihram.' },
      { n:'10. Tawaf al-Ifadah', d:'Perform the Tawaf of Hajj (7 circuits), followed by Sa\'i again if not done after Qudum Tawaf. Then full release from Ihram. Before leaving: Tawaf al-Wada (farewell Tawaf).' },
    ],
    talbiyahH: 'Talbiyah — The Pilgrim\'s Call',
    talbiyah: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
    talbiyahTrans: 'Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise, grace and sovereignty belong to You. You have no partner.',
    prepH: 'Preparing for Hajj',
    prep: [
      { e:'📋', t:'Apply for Hajj Visa Early', d:'Hajj visas are managed by each country\'s Ministry of Hajj quota. Register with an officially approved travel agent 6–12 months in advance. Many countries have waiting lists.' },
      { e:'💉', t:'Health & Vaccinations', d:'Saudi Arabia requires meningococcal meningitis vaccination. Check for polio and seasonal flu requirements. Consult a travel medicine doctor 6–8 weeks before departure.' },
      { e:'👗', t:'Prepare Ihram Clothing', d:'Men: two seamless white garments. Women: modest modest covering of full body (any colour). Both: comfortable sandals that don\'t cover the ankle bones. Practice wearing Ihram before you go.' },
      { e:'📖', t:'Learn the Rituals Thoroughly', d:'Attend a Hajj preparation course or read a certified Hajj guide. Knowing what to do, when and why reduces stress and spiritual distraction during the journey.' },
      { e:'🤲', t:'Spiritual Preparation', d:'Perform sincere Tawbah (repentance), repay all debts, seek forgiveness from people you may have wronged, make a will and ensure your affairs are in order before departure.' },
      { e:'🎒', t:'Pack Smart', d:'Essentials: Ihram, prayer beads (Masbaha), unscented soap and products, comfortable shoes, light modest clothing, small backpack, portable phone charger, copies of passport/visa, cash in SAR.' },
    ],
    essentialsH: 'Key Rules While in Ihram',
    essentials: [
      'Do not cut hair or nails', 'Do not use perfume or scented products', 'Do not engage in marital relations', 'Do not hunt or harm animals', 'Men: do not cover the head', 'Do not argue or use foul language — stay in state of peace and dhikr',
    ],
    statsH: 'Hajj in Numbers',
    stats: [
      { n:'2.5M+', t:'Pilgrims per year' }, { n:'1,400+', t:'Years of history' }, { n:'5th', t:'Pillar of Islam' }, { n:'88km', t:'Total walking distance' },
    ],
    ctaDuas: 'Daily Duas',
    ctaZakat: 'Zakat Calculator',
    ctaPrayer: 'Prayer Times',
    faqH: 'Frequently Asked Questions',
    faqs: [
      { q:'Is Hajj obligatory for every Muslim?', a:'Hajj is obligatory once in a lifetime for every adult Muslim who is physically and financially able to perform it. This is one of the Five Pillars of Islam.' },
      { q:'How much does Hajj cost in 2026?', a:'Costs vary significantly by country. From the UK, typical packages range from £7,000–£14,000+. From the US: $7,000–$15,000+. From South Asia: lower, but include flight costs. Budget accommodation is now mandatory under Saudi crowd management rules.' },
      { q:'Can women perform Hajj without a Mahram?', a:'According to the majority of scholars, women under 45 require a Mahram (close male relative). Women 45+ may travel in an organised group without one in some scholarly opinions. Always consult a local scholar.' },
      { q:'What is the difference between Hajj and Umrah?', a:'Hajj is the annual pilgrimage performed in Dhul Hijjah with fixed rituals including Wuquf at Arafat. It is obligatory once in a lifetime. Umrah can be performed at any time of year and is a Sunnah (recommended) worship. Both involve Ihram, Tawaf and Sa\'i.' },
      { q:'What happens if I make a mistake during Hajj?', a:'Most ritual errors are covered by Kaffarah (expiation) — usually fasting, feeding the poor or sacrificing an animal. Major errors may require repeating the Hajj. Always consult your Hajj guide or a scholar on site.' },
    ],
  },
  ar: {
    badge: 'الحج 2026 · الدليل الشامل',
    title: 'دليل الحج 2026',
    quranVerse: '«وَأَذِّن فِي النَّاسِ بِالْحَجِّ يَأْتُوكَ رِجَالًا وَعَلَىٰ كُلِّ ضَامِرٍ يَأْتِينَ مِن كُلِّ فَجٍّ عَمِيقٍ» — سورة الحج 22:27',
    sub: 'الدليل الشامل لحج 2026 — المواعيد والمناسك والتحضير الروحي والنصائح العملية وما يمكن توقعه في كل خطوة من خطوات أقدس رحلة في الإسلام.',
    datesH: 'مواعيد الحج 2026',
    dates: [
      { d:'~4 يونيو 2026', e:'8 ذو الحجة', t:'يوم التروية — الإحرام والتوجه إلى منى' },
      { d:'~5 يونيو 2026', e:'9 ذو الحجة', t:'يوم عرفة — ركن الحج. الوقوف بعرفات من الظهر إلى الغروب. التحرك إلى مزدلفة ليلاً.' },
      { d:'~6 يونيو 2026', e:'10 ذو الحجة — عيد الأضحى', t:'رمي جمرة العقبة، الذبح، الحلق أو التقصير، طواف الإفاضة، السعي.' },
      { d:'7–9 يونيو 2026', e:'11–13 ذو الحجة (أيام التشريق)', t:'رمي الجمرات الثلاث يومياً. طواف الوداع قبل المغادرة.' },
    ],
    ritualH: 'خطوات الحج العشر',
    rituals: [
      { n:'1. الإحرام',        d:'أدخل حالة الإحرام عند الميقات. البس الثوبين الأبيضين (للرجال)، نوِّ الحج وردّد التلبية: "لبيك اللهم لبيك."' },
      { n:'2. طواف القدوم',   d:'عند وصولك إلى مكة، أدِّ طواف القدوم — 7 أشواط عكس عقارب الساعة حول الكعبة، بدءاً وانتهاءً بالحجر الأسود.' },
      { n:'3. السعي',         d:'اسعَ 7 مرات بين الصفا والمروة، إحياءً لذكرى هاجر في بحثها عن الماء لابنها إسماعيل.' },
      { n:'4. التوجه إلى منى', d:'في 8 ذو الحجة (يوم التروية)، توجَّه إلى منى وابتِ فيها تهيؤاً ليوم عرفة.' },
      { n:'5. الوقوف بعرفات', d:'ركن الحج الأساسي. قف بسهل عرفات من الظهر إلى الغروب في 9 ذو الحجة. صلِّ وادعُ واستغفر. بدونه يبطل الحج.' },
      { n:'6. مزدلفة',        d:'بعد غروب شمس عرفة، انتقل إلى مزدلفة. صلِّ المغرب والعشاء جمعاً. اجمع 49–70 حصاة للرمي. ابتِ تحت السماء المفتوحة.' },
      { n:'7. رمي الجمرات',   d:'في يوم العيد (10 ذو الحجة) ارمِ الجمرة الكبرى (العقبة) بـ7 حصيات قائلاً "الله أكبر" مع كل رمية. كرر ذلك في 11 و12 (و13) ذو الحجة للجمرات الثلاث.' },
      { n:'8. الأضحية',       d:'بعد الرمي، اذبح أضحية (أو رتّب لذلك). هذا إحياء لاستعداد إبراهيم ﷺ للتضحية بابنه.' },
      { n:'9. الحلق أو التقصير', d:'يحلق الرجال رؤوسهم (حلق) أو يقصّرون الشعر (تقصير). تقصّر المرأة مقدار أنملة. هذا يُعلم التحلل الجزئي من الإحرام.' },
      { n:'10. طواف الإفاضة', d:'أدِّ طواف الحج (7 أشواط)، ثم السعي إن لم تؤدّه بعد طواف القدوم. ثم التحلل الكامل من الإحرام. قبل المغادرة: طواف الوداع.' },
    ],
    talbiyahH: 'التلبية — نداء الحاج',
    talbiyah: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
    talbiyahTrans: 'لبيك اللهم لبيك، لبيك لا شريك لك لبيك، إن الحمد والنعمة لك والملك، لا شريك لك.',
    prepH: 'الاستعداد للحج',
    prep: [
      { e:'📋', t:'تقدّم للحصول على تأشيرة الحج مبكراً', d:'تُدار تأشيرات الحج من خلال حصة وزارة الحج في كل دولة. سجّل مع وكيل سفر معتمد رسمياً قبل 6–12 شهراً. لدى كثير من الدول قوائم انتظار.' },
      { e:'💉', t:'الصحة والتطعيمات', d:'تشترط المملكة العربية السعودية تطعيم التهاب السحايا الدماغي. تحقق من متطلبات شلل الأطفال والإنفلونزا الموسمية. استشر طبيب طب السفر قبل 6–8 أسابيع من المغادرة.' },
      { e:'👗', t:'أعدّ ملابس الإحرام', d:'الرجال: ثوبان أبيضان غير مخيطين. النساء: تغطية محتشمة للجسم كله (أي لون). كلاهما: صنادل مريحة لا تغطي الكعبين. تدرّب على ارتداء الإحرام قبل السفر.' },
      { e:'📖', t:'تعلّم المناسك جيداً', d:'احضر دورة تحضيرية للحج أو اقرأ دليلاً معتمداً. معرفة ما تفعله ومتى ولماذا يقلل من التوتر ويحافظ على التركيز الروحي خلال الرحلة.' },
      { e:'🤲', t:'التحضير الروحي', d:'تُب توبة صادقة، اقضِ ديونك، اطلب العفو ممن قد تكون أسأت إليهم، اكتب وصيتك وتأكد من ترتيب شؤونك قبل المغادرة.' },
      { e:'🎒', t:'احزم بذكاء', d:'الأساسيات: الإحرام، مسبحة، صابون وملحقات غير مُعطَّرة، حذاء مريح، ملابس محتشمة خفيفة، حقيبة ظهر صغيرة، شاحن محمول، نسخ من جواز السفر والتأشيرة، نقود بالريال السعودي.' },
    ],
    essentialsH: 'أحكام الإحرام',
    essentials: [
      'لا تقص شعراً أو أظافر', 'لا تستخدم العطور أو المنتجات المعطرة', 'لا تجامع', 'لا تصطد ولا تؤذِ الحيوانات', 'الرجال: لا تغطِ الرأس', 'لا تجادل ولا تتكلم بفحش — ابقَ في حال سلام وذكر',
    ],
    statsH: 'الحج بالأرقام',
    stats: [
      { n:'+2.5M', t:'حاج سنوياً' }, { n:'+1400', t:'عام من التاريخ' }, { n:'الركن الخامس', t:'من أركان الإسلام' }, { n:'88km', t:'إجمالي مسافة المشي' },
    ],
    ctaDuas: 'الأدعية اليومية',
    ctaZakat: 'حاسبة الزكاة',
    ctaPrayer: 'أوقات الصلاة',
    faqH: 'الأسئلة الشائعة',
    faqs: [
      { q:'هل الحج واجب على كل مسلم؟', a:'الحج فريضة مرة في العمر على كل مسلم بالغ قادر جسدياً ومادياً على أدائه. وهو أحد أركان الإسلام الخمسة.' },
      { q:'كم تكلفة الحج في 2026؟', a:'تتفاوت التكاليف بحسب الدولة. من المملكة المتحدة: 7,000–14,000 جنيه إسترليني أو أكثر. من الولايات المتحدة: 7,000–15,000 دولار أو أكثر.' },
      { q:'هل تستطيع المرأة أداء الحج دون محرم؟', a:'وفقاً لجمهور العلماء، تحتاج المرأة دون 45 عاماً إلى محرم. المرأة التي تجاوزت الـ45 قد تسافر مع مجموعة منظمة في بعض الآراء الفقهية. استشر عالماً محلياً.' },
      { q:'ما الفرق بين الحج والعمرة؟', a:'الحج هو الحج السنوي الذي يُؤدى في ذي الحجة بمناسك ثابتة تشمل الوقوف بعرفات. وهو فريضة مرة في العمر. العمرة تُؤدَّى في أي وقت من العام وهي سنة. كلاهما يشمل الإحرام والطواف والسعي.' },
      { q:'ماذا يحدث إذا ارتكبت خطأً في الحج؟', a:'معظم الأخطاء في المناسك لها كفارة — عادةً صيام أو إطعام المساكين أو ذبح حيوان. الأخطاء الجسيمة قد تستوجب إعادة الحج. استشر مرشدك أو عالماً في الموقع.' },
    ],
  },
  fr: {
    badge: 'Hajj 2026 · Guide Complet',
    title: 'Guide du Hajj 2026',
    quranVerse: '"Et proclame aux gens le pèlerinage ; ils viendront à toi à pied et sur toute monture efflanquée ; ils viendront de tout profond défilé." — Coran 22:27',
    sub: 'Le guide complet du Hajj 2026 — dates, rituels, préparation spirituelle, conseils pratiques et ce qu\'il faut savoir à chaque étape du voyage le plus sacré de l\'Islam.',
    datesH: 'Dates du Hajj 2026',
    dates: [
      { d:'~4 juin 2026', e:'8 Dhul Hijjah', t:'Jour de Tarwiyah — Entrer en Ihram, voyager vers Mina' },
      { d:'~5 juin 2026', e:'9 Dhul Hijjah', t:'Jour d\'Arafat — Le pilier du Hajj. Se tenir à Arafat de midi au coucher du soleil. Départ pour Muzdalifah la nuit.' },
      { d:'~6 juin 2026', e:'10 Dhul Hijjah — Aïd al-Adha', t:'Lapidation de Jamarat (Aqabah), sacrifice, rasage/coupe des cheveux, Tawaf al-Ifadah, Sa\'i.' },
      { d:'7–9 juin 2026', e:'11–13 Dhul Hijjah (Jours de Tashreeq)', t:'Lapidation des trois Jamarat quotidiennement. Tawaf al-Wada final avant le départ.' },
    ],
    ritualH: 'Les 10 Étapes du Hajj',
    rituals: [
      { n:'1. Ihram',              d:'Entrez en état d\'Ihram au Miqat. Portez les deux vêtements blancs (hommes), formulez l\'intention (Niyyah) du Hajj et récitez la Talbiyah.' },
      { n:'2. Tawaf d\'Arrivée',   d:'À l\'arrivée à La Mecque, effectuez le Tawaf al-Qudum — 7 circuits dans le sens antihoraire autour de la Kaaba.' },
      { n:'3. Sa\'i',              d:'Marchez 7 fois entre les collines de Safa et Marwa, commémorant la recherche d\'eau de Hajar pour son fils Ismail.' },
      { n:'4. Voyage à Mina',      d:'Le 8 Dhul Hijjah (Jour Tarwiyah), voyagez à Mina et passez-y la nuit en préparation du Jour d\'Arafat.' },
      { n:'5. Wuquf à Arafat',     d:'Le pilier essentiel du Hajj. Se tenir dans la plaine d\'Arafat de midi au coucher du soleil le 9 Dhul Hijjah. Priez, faites des dua et demandez pardon. Sans cela, le Hajj est invalide.' },
      { n:'6. Muzdalifah',         d:'Après le coucher du soleil à Arafat, voyagez à Muzdalifah. Priez Maghrib et Isha combinés. Collectez 49–70 cailloux pour la lapidation.' },
      { n:'7. Lapidation des Jamarat', d:'Le jour de l\'Aïd, lapidez le grand pilier (Jamarat al-Aqabah) avec 7 cailloux en disant "Allahu Akbar" à chaque lancer.' },
      { n:'8. Sacrifice (Qurbani)', d:'Après la lapidation, sacrifiez un animal. Cela commémore la volonté d\'Ibrahim ﷺ de sacrifier son fils.' },
      { n:'9. Rasage ou Coupe des Cheveux', d:'Les hommes rasent leur tête (Halq) ou raccourcissent les cheveux (Taqsir). Les femmes coupent un bout de doigt de longueur. Cela marque la libération partielle de l\'Ihram.' },
      { n:'10. Tawaf al-Ifadah',   d:'Effectuez le Tawaf du Hajj (7 circuits), suivi du Sa\'i. Puis libération totale de l\'Ihram. Avant de partir : Tawaf al-Wada (Tawaf d\'adieu).' },
    ],
    talbiyahH: 'La Talbiyah — L\'Appel du Pèlerin',
    talbiyah: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
    talbiyahTrans: 'Me voici, ô Allah, me voici. Me voici, Tu n\'as pas d\'associé, me voici. Toute la louange, la grâce et la souveraineté T\'appartiennent. Tu n\'as pas d\'associé.',
    prepH: 'Se Préparer pour le Hajj',
    prep: [
      { e:'📋', t:'Demandez le Visa Hajj tôt', d:'Les visas Hajj sont gérés par le quota du Ministère du Hajj de chaque pays. Inscrivez-vous auprès d\'un agent de voyage officiellement agréé 6 à 12 mois à l\'avance.' },
      { e:'💉', t:'Santé & Vaccinations', d:'L\'Arabie Saoudite exige une vaccination contre la méningite à méningocoques. Consultez un médecin spécialisé 6 à 8 semaines avant le départ.' },
      { e:'👗', t:'Préparez les Vêtements d\'Ihram', d:'Hommes : deux vêtements blancs sans coutures. Femmes : couverture modeste du corps entier. Les deux : sandales confortables ne couvrant pas les malléoles.' },
      { e:'📖', t:'Apprenez les Rituels Thoroughly', d:'Assistez à un cours de préparation au Hajj. Connaître quoi faire, quand et pourquoi réduit le stress et la distraction spirituelle pendant le voyage.' },
      { e:'🤲', t:'Préparation Spirituelle', d:'Effectuez une sincère Tawbah (repentance), remboursez toutes vos dettes, demandez pardon aux personnes que vous auriez pu blesser, rédigez un testament.' },
      { e:'🎒', t:'Préparez votre Sac Intelligemment', d:'Essentiels : Ihram, chapelet (Masbaha), savon et produits non parfumés, chaussures confortables, vêtements modestes légers, petite sacoche, chargeur portable, photocopies passeport/visa, espèces en SAR.' },
    ],
    essentialsH: 'Règles Pendant l\'Ihram',
    essentials: [
      'Ne pas couper les cheveux ou les ongles', 'Ne pas utiliser de parfum ou produits parfumés', 'S\'abstenir de relations conjugales', 'Ne pas chasser ou nuire aux animaux', 'Hommes : ne pas couvrir la tête', 'Ne pas se disputer — rester en paix et faire le dhikr',
    ],
    statsH: 'Le Hajj en Chiffres',
    stats: [
      { n:'2,5M+', t:'Pèlerins par an' }, { n:'1 400+', t:'Ans d\'histoire' }, { n:'5ème', t:'Pilier de l\'Islam' }, { n:'88km', t:'Distance totale à pied' },
    ],
    ctaDuas: 'Douas Quotidiennes',
    ctaZakat: 'Calculateur Zakat',
    ctaPrayer: 'Horaires de Prière',
    faqH: 'Questions Fréquemment Posées',
    faqs: [
      { q:'Le Hajj est-il obligatoire pour chaque musulman ?', a:'Le Hajj est obligatoire une fois dans la vie pour tout musulman adulte physiquement et financièrement capable de l\'accomplir. C\'est l\'un des cinq piliers de l\'Islam.' },
      { q:'Combien coûte le Hajj en 2026 ?', a:'Les coûts varient considérablement selon le pays. Du Royaume-Uni : généralement entre 7 000 et 14 000 £ ou plus. Des États-Unis : 7 000–15 000 $ ou plus.' },
      { q:'Les femmes peuvent-elles faire le Hajj sans Mahram ?', a:'Selon la majorité des savants, les femmes de moins de 45 ans ont besoin d\'un Mahram. Les femmes de 45 ans et plus peuvent voyager dans un groupe organisé selon certaines opinions savantes.' },
      { q:'Quelle est la différence entre Hajj et Umrah ?', a:'Le Hajj est le pèlerinage annuel effectué en Dhul Hijjah avec des rituels fixes incluant le Wuquf à Arafat. Il est obligatoire une fois dans la vie. L\'Umrah peut être effectuée à tout moment de l\'année et est une Sunnah (recommandée).' },
      { q:'Que se passe-t-il si je fais une erreur pendant le Hajj ?', a:'La plupart des erreurs rituelles sont couvertes par Kaffarah (expiation) — généralement jeûner, nourrir les pauvres ou sacrifier un animal. Les erreurs majeures peuvent nécessiter de reprendre le Hajj.' },
    ],
  },
  es: {
    badge: 'Hajj 2026 · Guía Completa',
    title: 'Guía del Hajj 2026',
    quranVerse: '"Y proclama a la gente el Hajj [peregrinación]; vendrán a ti a pie y sobre cada camello delgado; vendrán desde cada paso distante." — Corán 22:27',
    sub: 'La guía completa del Hajj 2026 — fechas, rituales, preparación espiritual, consejos prácticos y qué esperar en cada paso del viaje más sagrado del Islam.',
    datesH: 'Fechas del Hajj 2026',
    dates: [
      { d:'~4 Jun 2026', e:'8 Dhul Hijjah', t:'Día de Tarwiyah — Entrar en Ihram, viajar a Mina' },
      { d:'~5 Jun 2026', e:'9 Dhul Hijjah', t:'Día de Arafat — El pilar del Hajj. Estar en Arafat desde el mediodía hasta el atardecer. Moverse a Muzdalifah por la noche.' },
      { d:'~6 Jun 2026', e:'10 Dhul Hijjah — Eid al-Adha', t:'Lapidación de Jamarat (Aqabah), sacrificio, afeitado/corte de cabello, Tawaf al-Ifadah, Sa\'i.' },
      { d:'7–9 Jun 2026', e:'11–13 Dhul Hijjah (Días de Tashreeq)', t:'Lapidación de los tres Jamarat diariamente. Tawaf al-Wada final antes de salir.' },
    ],
    ritualH: 'Los 10 Pasos del Hajj',
    rituals: [
      { n:'1. Ihram',            d:'Entra en estado de Ihram en el Miqat. Usa las dos prendas blancas (hombres), formula la intención (Niyyah) del Hajj y recita la Talbiyah.' },
      { n:'2. Tawaf de Llegada', d:'Al llegar a La Meca, realiza el Tawaf al-Qudum — 7 circuitos en sentido antihorario alrededor de la Kaaba.' },
      { n:'3. Sa\'i',           d:'Camina 7 veces entre las colinas de Safa y Marwa, conmemorando la búsqueda de agua de Hajar para su hijo Ismail.' },
      { n:'4. Viaje a Mina',    d:'El 8 Dhul Hijjah (Día Tarwiyah), viaja a Mina y pasa la noche allí en preparación para el Día de Arafat.' },
      { n:'5. Wuquf en Arafat', d:'El pilar esencial del Hajj. Estar en la llanura de Arafat desde el mediodía hasta el atardecer el 9 Dhul Hijjah. Reza, haz dua y pide perdón. Sin esto, el Hajj es inválido.' },
      { n:'6. Muzdalifah',      d:'Después del atardecer en Arafat, viaja a Muzdalifah. Reza Maghrib e Isha juntos. Recoge 49–70 piedras para la lapidación.' },
      { n:'7. Lapidación de los Jamarat', d:'El día del Eid, lapida el pilar grande (Jamarat al-Aqabah) con 7 piedras diciendo "Allahu Akbar" con cada lanzamiento.' },
      { n:'8. Sacrificio (Qurbani)', d:'Después de la lapidación, sacrifica un animal. Esto conmemora la disposición de Ibrahim ﷺ a sacrificar a su hijo.' },
      { n:'9. Afeitado o Corte de Pelo', d:'Los hombres se afeitan la cabeza (Halq) o acortan el cabello (Taqsir). Las mujeres cortan el largo de un dedo. Esto marca la liberación parcial del Ihram.' },
      { n:'10. Tawaf al-Ifadah', d:'Realiza el Tawaf del Hajj (7 circuitos), seguido del Sa\'i. Luego liberación total del Ihram. Antes de partir: Tawaf al-Wada (Tawaf de despedida).' },
    ],
    talbiyahH: 'La Talbiyah — El Llamado del Peregrino',
    talbiyah: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
    talbiyahTrans: 'Aquí estoy, oh Allah, aquí estoy. Aquí estoy, no tienes asociado, aquí estoy. Ciertamente toda la alabanza, la gracia y la soberanía son Tuyas. No tienes asociado.',
    prepH: 'Prepararse para el Hajj',
    prep: [
      { e:'📋', t:'Solicita el Visado de Hajj Pronto', d:'Los visados de Hajj se gestionan a través de la cuota del Ministerio de Hajj de cada país. Regístrate con un agente de viajes oficialmente aprobado con 6–12 meses de antelación.' },
      { e:'💉', t:'Salud y Vacunas', d:'Arabia Saudí requiere vacunación contra la meningitis meningocócica. Consulta a un médico de medicina de viajes 6–8 semanas antes de la partida.' },
      { e:'👗', t:'Prepara la Ropa de Ihram', d:'Hombres: dos prendas blancas sin costuras. Mujeres: cobertura modesta del cuerpo entero. Ambos: sandalias cómodas que no cubran los tobillos.' },
      { e:'📖', t:'Aprende los Rituales a Fondo', d:'Asiste a un curso de preparación para el Hajj. Saber qué hacer, cuándo y por qué reduce el estrés y la distracción espiritual durante el viaje.' },
      { e:'🤲', t:'Preparación Espiritual', d:'Realiza una sincera Tawbah (arrepentimiento), paga todas tus deudas, pide perdón a quienes hayas podido herir, haz un testamento y asegúrate de tener tus asuntos en orden.' },
      { e:'🎒', t:'Empaca con Inteligencia', d:'Esenciales: Ihram, cuentas de oración (Masbaha), jabón y productos sin perfume, zapatos cómodos, ropa modesta ligera, mochila pequeña, cargador portátil, copias de pasaporte/visa, efectivo en SAR.' },
    ],
    essentialsH: 'Reglas Durante el Ihram',
    essentials: [
      'No cortarse el pelo ni las uñas', 'No usar perfume ni productos perfumados', 'Abstenerse de relaciones conyugales', 'No cazar ni dañar animales', 'Hombres: no cubrir la cabeza', 'No discutir — permanecer en paz y hacer dhikr',
    ],
    statsH: 'El Hajj en Números',
    stats: [
      { n:'2.5M+', t:'Peregrinos por año' }, { n:'1.400+', t:'Años de historia' }, { n:'5.º', t:'Pilar del Islam' }, { n:'88km', t:'Distancia total caminando' },
    ],
    ctaDuas: 'Duas Diarias',
    ctaZakat: 'Calculadora Zakat',
    ctaPrayer: 'Horarios de Oración',
    faqH: 'Preguntas Frecuentes',
    faqs: [
      { q:'¿Es el Hajj obligatorio para todos los musulmanes?', a:'El Hajj es obligatorio una vez en la vida para todo musulmán adulto que tenga la capacidad física y económica para realizarlo. Es uno de los Cinco Pilares del Islam.' },
      { q:'¿Cuánto cuesta el Hajj en 2026?', a:'Los costos varían significativamente según el país. Desde el Reino Unido: típicamente entre £7,000–£14,000+. Desde EE.UU.: $7,000–$15,000+.' },
      { q:'¿Pueden las mujeres realizar el Hajj sin Mahram?', a:'Según la mayoría de los estudiosos, las mujeres menores de 45 años necesitan un Mahram. Las mujeres de 45+ pueden viajar en un grupo organizado según algunas opiniones académicas.' },
      { q:'¿Cuál es la diferencia entre Hajj y Umrah?', a:'El Hajj es la peregrinación anual realizada en Dhul Hijjah con rituales fijos que incluyen el Wuquf en Arafat. Es obligatorio una vez en la vida. La Umrah puede realizarse en cualquier época del año y es Sunnah.' },
      { q:'¿Qué sucede si cometo un error durante el Hajj?', a:'La mayoría de los errores rituales están cubiertos por Kaffarah (expiación) — generalmente ayunar, alimentar a los pobres o sacrificar un animal. Los errores graves pueden requerir repetir el Hajj.' },
    ],
  },
};

export function HajjPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.slice(0,2) || 'en') as keyof typeof T;
  const L = T[lang] || T.en;
  const isRTL = lang === 'ar';
  const [openFaq, setOpenFaq] = useState<number|null>(null);
  const [openRitual, setOpenRitual] = useState<number|null>(null);

  const schema = {
    '@context':'https://schema.org', '@type':'Article',
    headline: `Hajj 2026 Complete Guide — Dates, Rituals and Preparation`,
    description: L.sub,
    datePublished: '2026-03-01',
    author: { '@type':'Organization', name:'Al Ummah AI' },
    publisher: { '@type':'Organization', name:'Al Ummah AI', url:'https://www.alummahai.com' },
  };

  return (
    <div dir={isRTL?'rtl':'ltr'} style={{ background:NAVY, minHeight:'100vh', color:'#fff' }}>
      <SEO title={`${L.title} — Dates, Rituals & Preparation | Al Ummah AI`} description={L.sub} keywords="hajj 2026, hajj guide, hajj dates 2026, hajj rituals, ihram, arafat, mina, makkah, how to perform hajj, hajj cost 2026" canonical="https://www.alummahai.com/hajj" schema={schema} lang={lang as string} />

      {/* Hero with Makkah photo */}
      <div style={{ position:'relative', height:'clamp(280px,45vw,520px)', overflow:'hidden' }}>
        <img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1600&q=80" alt="Masjid al-Haram Makkah"
          style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 30%' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,rgba(10,37,64,0.3) 0%,rgba(10,37,64,0.85) 70%,#0a2540 100%)' }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'clamp(24px,5vw,52px)', textAlign:'center' }}>
          <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }}
            style={{ display:'inline-block', padding:'4px 14px', background:'rgba(212,175,55,0.15)', border:'1px solid rgba(212,175,55,0.3)', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.52rem', fontWeight:900, color:GOLD, textTransform:'uppercase', letterSpacing:'0.24em', marginBottom:14 }}>
            🕋 {L.badge}
          </motion.div>
          <motion.h1 initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.08 }}
            style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(2rem,7vw,4.5rem)', color:'#fff', letterSpacing:'-0.03em', lineHeight:1, marginBottom:12 }}>{L.title}</motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.18 }}
            style={{ fontFamily:"'Amiri',serif", fontSize:'clamp(0.88rem,1.8vw,1.05rem)', color:GOLD, fontStyle:'italic', maxWidth:700, margin:'0 auto', lineHeight:1.85, direction:isRTL?'rtl':'ltr' }}>{L.quranVerse}</motion.p>
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:'0 auto', padding:'clamp(28px,4vw,52px) 20px' }}>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:48 }}>
          {L.stats.map(({ n, t }: any) => (
            <div key={t} style={{ textAlign:'center', padding:'16px 10px', background:'rgba(212,175,55,0.07)', border:'1px solid rgba(212,175,55,0.18)', borderRadius:14 }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.1rem,3vw,1.8rem)', color:GOLD, lineHeight:1 }}>{n}</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:'0.6rem', color:'rgba(255,255,255,0.42)', textTransform:'uppercase', letterSpacing:'0.12em', marginTop:6, lineHeight:1.4 }}>{t}</div>
            </div>
          ))}
        </div>

        {/* Sub desc */}
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.88rem', color:'rgba(255,255,255,0.5)', lineHeight:1.9, maxWidth:720, margin:'0 auto 48px', textAlign:'center' }}>{L.sub}</p>

        {/* Dates */}
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.3rem,3vw,1.9rem)', color:'#fff', marginBottom:16, display:'flex', alignItems:'center', gap:10 }}>
          <Calendar size={20} style={{ color:GOLD }} /> {L.datesH}
        </h2>
        <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:52 }}>
          {L.dates.map(({ d, e, t }: any) => (
            <div key={d} style={{ display:'flex', gap:16, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'16px 20px', alignItems:'flex-start' }}>
              <div style={{ textAlign:'center', flexShrink:0, minWidth:90 }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'0.84rem', color:GOLD, lineHeight:1.3 }}>{d}</div>
                <div style={{ fontFamily:"'Amiri',serif", fontSize:'0.7rem', color:'rgba(255,255,255,0.35)', marginTop:3, lineHeight:1.3 }}>{e}</div>
              </div>
              <div style={{ width:'1px', background:'rgba(212,175,55,0.2)', flexShrink:0, alignSelf:'stretch' }} />
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.8rem', color:'rgba(255,255,255,0.6)', lineHeight:1.75 }}>{t}</p>
            </div>
          ))}
        </div>

        {/* Talbiyah */}
        <div style={{ background:'linear-gradient(120deg,rgba(212,175,55,0.1),rgba(212,175,55,0.04))', border:'1px solid rgba(212,175,55,0.22)', borderRadius:20, padding:'clamp(20px,4vw,36px)', textAlign:'center', marginBottom:52 }}>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.52rem', fontWeight:900, color:'rgba(212,175,55,0.5)', textTransform:'uppercase', letterSpacing:'0.24em', marginBottom:16 }}>🤲 {L.talbiyahH}</div>
          <p style={{ fontFamily:"'Amiri',serif", fontSize:'clamp(1.1rem,2.8vw,1.6rem)', color:GOLD, direction:'rtl', lineHeight:1.9, marginBottom:14 }}>{L.talbiyah}</p>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.82rem', color:'rgba(255,255,255,0.5)', lineHeight:1.8, maxWidth:560, margin:'0 auto', fontStyle:'italic' }}>{L.talbiyahTrans}</p>
        </div>

        {/* Rituals */}
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.3rem,3vw,1.9rem)', color:'#fff', marginBottom:16 }}>{L.ritualH}</h2>
        <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:52 }}>
          {L.rituals.map(({ n, d }: any, i: number) => (
            <div key={n} style={{ background:'rgba(255,255,255,0.03)', border:`1px solid ${openRitual===i ? 'rgba(212,175,55,0.35)' : 'rgba(255,255,255,0.07)'}`, borderRadius:14, overflow:'hidden', transition:'border-color 0.2s' }}>
              <button onClick={() => setOpenRitual(openRitual===i ? null : i)}
                style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 18px', background:'transparent', border:'none', cursor:'pointer', gap:12 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:28, height:28, borderRadius:8, background:'rgba(212,175,55,0.12)', border:'1px solid rgba(212,175,55,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <CheckCircle size={13} style={{ color:GOLD }} />
                  </div>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.86rem', color:'#fff' }}>{n}</span>
                </div>
                {openRitual===i ? <ChevronUp size={14} style={{ color:GOLD, flexShrink:0 }} /> : <ChevronDown size={14} style={{ color:'rgba(255,255,255,0.3)', flexShrink:0 }} />}
              </button>
              {openRitual===i && (
                <div style={{ padding:'0 18px 16px 58px' }}>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.8rem', color:'rgba(255,255,255,0.55)', lineHeight:1.85 }}>{d}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Preparation */}
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.3rem,3vw,1.9rem)', color:'#fff', marginBottom:16 }}>{L.prepH}</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:12, marginBottom:52 }}>
          {L.prep.map(({ e, t, d }: any) => (
            <div key={t} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'18px', display:'flex', gap:14, transition:'all 0.2s' }}
              onMouseEnter={el => { const c=el.currentTarget as HTMLElement; c.style.borderColor='rgba(212,175,55,0.3)'; c.style.background='rgba(212,175,55,0.04)'; }}
              onMouseLeave={el => { const c=el.currentTarget as HTMLElement; c.style.borderColor='rgba(255,255,255,0.07)'; c.style.background='rgba(255,255,255,0.03)'; }}>
              <span style={{ fontSize:'1.4rem', flexShrink:0, marginTop:2 }}>{e}</span>
              <div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.86rem', color:'#fff', marginBottom:6 }}>{t}</div>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.74rem', color:'rgba(255,255,255,0.42)', lineHeight:1.75 }}>{d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Ihram rules */}
        <div style={{ background:'rgba(239,68,68,0.05)', border:'1px solid rgba(239,68,68,0.15)', borderRadius:14, padding:'20px', marginBottom:52 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
            <AlertCircle size={15} style={{ color:'#f87171', flexShrink:0 }} />
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:900, fontSize:'0.76rem', color:'#f87171', textTransform:'uppercase', letterSpacing:'0.14em' }}>{L.essentialsH}</span>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {L.essentials.map((r: string) => (
              <span key={r} style={{ padding:'5px 12px', background:'rgba(248,113,113,0.07)', border:'1px solid rgba(248,113,113,0.15)', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.68rem', fontWeight:600, color:'rgba(255,255,255,0.55)' }}>{r}</span>
            ))}
          </div>
        </div>

        {/* CTA links */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:10, marginBottom:52 }}>
          {[
            { href:'/duas',    t:L.ctaDuas,   e:'🤲' },
            { href:'/zakat',   t:L.ctaZakat,  e:'🌙' },
            { href:'/prayer-times', t:L.ctaPrayer, e:'🕌' },
          ].map(({ href, t, e }) => (
            <Link key={href} to={href} style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:10, padding:'14px 18px', background:'rgba(212,175,55,0.07)', border:'1px solid rgba(212,175,55,0.18)', borderRadius:14, fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.8rem', color:'#fff', transition:'all 0.15s' }}
              onMouseEnter={el => { const c=el.currentTarget as HTMLElement; c.style.borderColor='rgba(212,175,55,0.45)'; c.style.background='rgba(212,175,55,0.13)'; }}
              onMouseLeave={el => { const c=el.currentTarget as HTMLElement; c.style.borderColor='rgba(212,175,55,0.18)'; c.style.background='rgba(212,175,55,0.07)'; }}>
              <span style={{ fontSize:'1.1rem' }}>{e}</span> {t} <ArrowRight size={12} style={{ marginLeft:'auto', color:GOLD }} />
            </Link>
          ))}
        </div>

        {/* FAQ */}
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.3rem,3vw,1.9rem)', color:'#fff', marginBottom:16 }}>{L.faqH}</h2>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {L.faqs.map(({ q, a }: any, i: number) => (
            <div key={i} style={{ background:'rgba(255,255,255,0.03)', border:`1px solid ${openFaq===i ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.07)'}`, borderRadius:14, overflow:'hidden', transition:'border-color 0.2s' }}>
              <button onClick={() => setOpenFaq(openFaq===i ? null : i)}
                style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'15px 18px', background:'transparent', border:'none', cursor:'pointer', gap:12, textAlign:'left' }}>
                <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.86rem', color:'#fff', lineHeight:1.4 }}>{q}</span>
                {openFaq===i ? <ChevronUp size={14} style={{ color:GOLD, flexShrink:0 }} /> : <ChevronDown size={14} style={{ color:'rgba(255,255,255,0.3)', flexShrink:0 }} />}
              </button>
              {openFaq===i && (
                <div style={{ padding:'0 18px 16px' }}>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.8rem', color:'rgba(255,255,255,0.5)', lineHeight:1.85 }}>{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
