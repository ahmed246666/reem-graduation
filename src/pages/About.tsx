import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import logoImg from '@/assets/logo.png';
import { Globe, BookOpen, Heart, Languages } from 'lucide-react';

const highlights = [
  {
    icon: Globe,
    en: 'Global Variety',
    ar: 'تنوع عالمي',
    descEn: '10 countries and over 500 authentic recipes from every corner of the world.',
    descAr: '١٠ دول وأكثر من ٥٠٠ وصفة أصيلة من كل أنحاء العالم.',
  },
  {
    icon: BookOpen,
    en: 'Authentic Recipes',
    ar: 'وصفات أصيلة',
    descEn: 'Every recipe is carefully curated with real ingredients and step-by-step instructions.',
    descAr: 'كل وصفة مختارة بعناية مع مكونات حقيقية وخطوات مفصلة.',
  },
  {
    icon: Languages,
    en: 'Bilingual Content',
    ar: 'محتوى ثنائي اللغة',
    descEn: 'All recipes available in both Arabic and English for everyone to enjoy.',
    descAr: 'جميع الوصفات متاحة بالعربية والإنجليزية ليستمتع بها الجميع.',
  },
];

export default function About() {
  const { t, isRTL } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Hero split layout */}
        <section
          ref={ref}
          className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left: Story */}
            <div>
              <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">
                {t('Our Story', 'قصتنا')}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-5 font-display leading-tight">
                {t('About Culinary Bridge', 'عن جسر الطهي')}
              </h1>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  {t(
                    'Culinary Bridge was born from a simple yet powerful idea: food connects us all. Across every culture, language, and border, the act of cooking and sharing a meal is a universal language of love and hospitality.',
                    'وُلد جسر الطهي من فكرة بسيطة لكنها قوية: الطعام يربطنا جميعاً. عبر كل ثقافة ولغة وحدود، فإن فعل الطبخ ومشاركة الوجبة هو لغة عالمية للحب والضيافة.'
                  )}
                </p>
                <p>
                  {t(
                    'Our mission is to make the world\'s best recipes accessible to Arabic and English speakers alike. We believe that understanding a recipe in your own language transforms cooking from a challenge into a joy.',
                    'مهمتنا هي جعل أفضل وصفات العالم متاحة للناطقين بالعربية والإنجليزية على حد سواء. نؤمن أن فهم الوصفة بلغتك يحوّل الطبخ من تحدٍّ إلى متعة.'
                  )}
                </p>
              </div>
            </div>

            {/* Right: Logo + accent card */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-center">
                  <img src={logoImg} alt="Culinary Bridge" className="w-32 h-32 sm:w-40 sm:h-40" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-2xl shadow-lg px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary fill-primary" />
                    <span className="text-sm font-semibold text-foreground">
                      {t('Made for food lovers', 'صُنع لعشاق الطعام')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights grid */}
          <div className="grid sm:grid-cols-3 gap-6">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.en}
                  className="bg-card border border-border rounded-2xl p-6 transition-all duration-500 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2 font-display">
                    {t(item.en, item.ar)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(item.descEn, item.descAr)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
