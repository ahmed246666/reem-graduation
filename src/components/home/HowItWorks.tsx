import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Search, Languages, ChefHat } from 'lucide-react';

const steps = [
  { icon: Search, en: 'Choose Recipe', ar: 'اختر وصفة', descEn: 'Browse hundreds of international recipes', descAr: 'تصفح مئات الوصفات العالمية' },
  { icon: Languages, en: 'Read in Your Language', ar: 'اقرأ بلغتك', descEn: 'All recipes in Arabic and English', descAr: 'جميع الوصفات بالعربية والإنجليزية' },
  { icon: ChefHat, en: 'Cook & Enjoy', ar: 'اطبخ واستمتع', descEn: 'Follow easy steps and enjoy', descAr: 'اتبع الخطوات السهلة واستمتع' },
];

export default function HowItWorks() {
  const { t, isRTL } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) setVisible(prev => new Set([...prev, idx]));
        });
      },
      { threshold: 0.2 }
    );
    ref.current?.querySelectorAll('.step-card').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/10 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-200/20 dark:bg-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-orange-300/15 dark:bg-orange-400/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-500/15 text-orange-700 dark:text-orange-400 text-xs font-medium px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            {t('How It Works', 'كيف يعمل')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-display">
            {t('3 Simple Steps', '٣ خطوات بسيطة')}
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            {t('Start your culinary journey in just three easy steps', 'ابدأ رحلتك الطهوية في ثلاث خطوات سهلة فقط')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-20 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 opacity-30 dark:opacity-20" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.en}
                data-index={index}
                className={`step-card text-center relative z-10 transition-all duration-700 ease-out ${
                  visible.has(index)
                    ? 'opacity-100 translate-y-0 blur-0'
                    : 'opacity-0 translate-y-6 blur-[2px]'
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="relative inline-block mb-6 group">
                  <div className="w-20 h-20 rounded-2xl rotate-3 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mx-auto shadow-lg shadow-orange-500/25 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105">
                    <Icon className="w-8 h-8 text-white -rotate-3 group-hover:-rotate-6 transition-transform duration-500" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white dark:bg-card shadow-md flex items-center justify-center text-xs font-bold text-orange-600 border-2 border-orange-200 dark:border-orange-800">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 font-display">{t(step.en, step.ar)}</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">{t(step.descEn, step.descAr)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
