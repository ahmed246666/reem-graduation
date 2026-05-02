import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Search, ChefHat, Globe, BookOpen } from 'lucide-react';
import heroCollage from '@/assets/hero-collage-v2.jpg';
import { getTotalRecipes, getTotalCountries, getTopCountries } from '@/data/stats';

export default function HeroSection() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Get dynamic stats
  const totalRecipes = getTotalRecipes();
  const totalCountries = getTotalCountries();
  const topCountries = getTopCountries(3);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const els = section.querySelectorAll('[data-animate]');
    els.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(20px)';
      htmlEl.style.filter = 'blur(4px)';
      setTimeout(() => {
        htmlEl.style.transition = 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
        htmlEl.style.opacity = '1';
        htmlEl.style.transform = 'translateY(0)';
        htmlEl.style.filter = 'blur(0)';
      }, 200 + i * 120);
    });
  }, []);

  return (
    <section className="relative min-h-[100vh] flex items-center" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Full background image */}
      <div className="absolute inset-0">
        <img src={heroCollage} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/65 dark:bg-background/80" />
      </div>

      <div ref={sectionRef} className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <div data-animate className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-white border border-white/10 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
          <Globe className="w-3.5 h-3.5" />
          {t(`${totalRecipes} Authentic Global Recipes`, `${totalRecipes} وصفة عالمية أصيلة`)}
        </div>

        {/* Title */}
        <h1 data-animate className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-[1.1] font-display text-balance max-w-3xl mx-auto">
          {t(
            'Explore Recipes From Around the World',
            'اكتشف وصفات من حول العالم'
          )}
        </h1>

        <p data-animate className="text-base sm:text-lg text-white/80 mb-10 max-w-xl mx-auto leading-relaxed text-pretty">
          {t(
            `Discover authentic recipes from ${totalCountries} countries, carefully translated into Arabic and English. Your kitchen, no borders.`,
            `اكتشف وصفات أصيلة من ${totalCountries} دولة، مترجمة بعناية إلى العربية والإنجليزية. مطبخك بلا حدود.`
          )}
        </p>

        {/* CTA Buttons */}
        <div data-animate className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            to="/countries"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] group"
          >
            {t('Start Exploring', 'ابدأ الاستكشاف')}
            <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
          </Link>
          <Link
            to="/countries"
            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-white/20 active:scale-[0.97]"
          >
            {t('Browse Countries', 'تصفح الدول')}
          </Link>
        </div>

        {/* Search bar */}
        <div data-animate className="max-w-lg mx-auto mb-14">
          <Link to="/search" className="group flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-5 py-3.5 shadow-lg hover:bg-white/15 hover:border-white/25 transition-all duration-300">
            <Search className="w-5 h-5 text-primary shrink-0" />
            <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
              {t('Search recipes, countries, ingredients...', 'ابحث عن وصفات، دول، مكونات...')}
            </span>
          </Link>
        </div>

        {/* Stats */}
        <div data-animate className="flex justify-center gap-8 sm:gap-14">
          {[
            { value: totalRecipes.toString(), en: 'Recipes', ar: 'وصفة', icon: BookOpen },
            { value: totalCountries.toString(), en: 'Countries', ar: 'دولة', icon: Globe },
            { value: '2', en: 'Languages', ar: 'لغتان', icon: ChefHat },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.en} className="text-center">
                <Icon className="w-5 h-5 text-primary mx-auto mb-1.5" />
                <div className="text-2xl font-bold text-white tabular-nums">{stat.value}</div>
                <div className="text-xs text-white/50 mt-0.5">{t(stat.en, stat.ar)}</div>
              </div>
            );
          })}
        </div>

        {/* Top Countries */}
        <div data-animate className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-white mb-4">{t('Featured Countries', 'الدول المميزة')}</h3>
          <div className="flex justify-center gap-6 flex-wrap">
            {topCountries.map((country) => (
              <div key={country.countryId} className="text-center">
                <div className="text-sm font-medium text-white/80">{country.countryName}</div>
                <div className="text-xs text-white/60">{country.recipeCount} recipes</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
