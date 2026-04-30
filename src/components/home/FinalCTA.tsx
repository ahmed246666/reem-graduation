import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  const { t, isRTL } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-primary relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div
        ref={ref}
        className={`max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 font-display leading-tight">
          {t('Ready to Explore New Flavors?', 'مستعد لاكتشاف نكهات جديدة؟')}
        </h2>
        <p className="text-primary-foreground/80 text-base md:text-lg mb-8 max-w-xl mx-auto">
          {t(
            'Join thousands of food lovers discovering authentic recipes from around the world.',
            'انضم لآلاف عشاق الطعام الذين يكتشفون وصفات أصيلة من حول العالم.'
          )}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/countries"
            className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-xl active:scale-[0.97] group"
          >
            {t('Explore Recipes', 'استكشف الوصفات')}
            <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
          </Link>
          <Link
            to="/search"
            className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-primary-foreground/10 active:scale-[0.97]"
          >
            {t('Search Recipes', 'ابحث عن وصفات')}
          </Link>
        </div>
      </div>
    </section>
  );
}
