import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const faqs = [
  {
    q_en: "Is Culinary Bridge completely free to use?",
    q_ar: "هل استخدام Culinary Bridge مجاني بالكامل؟",
    a_en: "Yes! All recipes, translations, and features are completely free. We believe everyone deserves access to the world's best recipes in their own language.",
    a_ar: "نعم! جميع الوصفات والترجمات والميزات مجانية تماماً. نؤمن بأن الجميع يستحق الوصول لأفضل وصفات العالم بلغته."
  },
  {
    q_en: "How accurate are the recipe translations?",
    q_ar: "ما مدى دقة ترجمات الوصفات؟",
    a_en: "Our translations are crafted by bilingual food experts who understand culinary terminology in both Arabic and English, ensuring accuracy in ingredients, measurements, and techniques.",
    a_ar: "ترجماتنا يقوم بها خبراء طعام ثنائيو اللغة يفهمون المصطلحات الطهوية بالعربية والإنجليزية، مما يضمن دقة المكونات والمقاييس والتقنيات."
  },
  {
    q_en: "Can I save my favorite recipes?",
    q_ar: "هل يمكنني حفظ وصفاتي المفضلة؟",
    a_en: "Absolutely! Use the heart icon on any recipe to add it to your favorites. You can access all your saved recipes from the Favorites page anytime.",
    a_ar: "بالتأكيد! استخدم أيقونة القلب على أي وصفة لإضافتها للمفضلة. يمكنك الوصول لجميع وصفاتك المحفوظة من صفحة المفضلة في أي وقت."
  },
  {
    q_en: "How many cuisines and countries are covered?",
    q_ar: "كم عدد المطابخ والدول المتاحة؟",
    a_en: "We currently feature recipes from over 20 countries across the Middle East, Mediterranean, Asia, Europe, and the Americas — and we're always adding more!",
    a_ar: "نقدم حالياً وصفات من أكثر من 20 دولة عبر الشرق الأوسط والبحر المتوسط وآسيا وأوروبا والأمريكتين — ونضيف المزيد باستمرار!"
  },
  {
    q_en: "Can I suggest a recipe or cuisine to add?",
    q_ar: "هل يمكنني اقتراح وصفة أو مطبخ لإضافته؟",
    a_en: "We'd love to hear from you! Visit our Contact page to send us your suggestions. Community input helps us grow and improve.",
    a_ar: "يسعدنا سماع رأيك! قم بزيارة صفحة التواصل لإرسال اقتراحاتك. مشاركات المجتمع تساعدنا على النمو والتطور."
  },
  {
    q_en: "Do you provide nutritional information for recipes?",
    q_ar: "هل تقدمون معلومات غذائية للوصفات؟",
    a_en: "Yes, most of our recipes include estimated nutritional information such as calories, protein, and key nutrients to help you make informed dietary choices.",
    a_ar: "نعم، معظم وصفاتنا تتضمن معلومات غذائية تقديرية مثل السعرات الحرارية والبروتين والعناصر الغذائية الرئيسية لمساعدتك في اتخاذ خيارات غذائية مدروسة."
  },
];

export default function FAQSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i));

  const leftFaqs = faqs.slice(0, 3);
  const rightFaqs = faqs.slice(3, 6);

  const renderFaq = (faq: typeof faqs[0], i: number) => {
    const isOpen = openIndex === i;
    return (
      <div
        key={i}
        className="rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
      >
        <button
          onClick={() => toggle(i)}
          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        >
          <span className="font-semibold text-foreground text-sm md:text-base">
            {t(faq.q_en, faq.q_ar)}
          </span>
          <ChevronDown
            className={`w-5 h-5 shrink-0 text-primary transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-60 pb-4' : 'max-h-0'
          }`}
        >
          <p className="px-5 text-muted-foreground text-sm leading-relaxed">
            {t(faq.a_en, faq.a_ar)}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-muted/40">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t('FAQ', 'الأسئلة الشائعة')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-display">
            {t('Frequently Asked Questions', 'الأسئلة الشائعة')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t(
              'Everything you need to know about Culinary Bridge',
              'كل ما تحتاج معرفته عن Culinary Bridge'
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            {leftFaqs.map((faq, i) => renderFaq(faq, i))}
          </div>
          <div className="space-y-3">
            {rightFaqs.map((faq, i) => renderFaq(faq, i + 3))}
          </div>
        </div>
      </div>
    </section>
  );
}
