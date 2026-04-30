import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { countries } from '@/data/countries';
import { getCountryImage } from '@/data/countryImages';

export default function ExploreByCuisine() {
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    ref.current?.querySelectorAll('.country-card').forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const displayCountries = countries.slice(0, 6);

  return (
    <section ref={ref} className="py-24 bg-muted/50 relative" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-secondary/10 text-secondary text-xs font-medium px-3 py-1 rounded-full mb-3">
            {t('Explore', 'استكشف')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-display">
            {t('Explore by Country', 'استكشف حسب الدولة')}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t('Discover the unique flavors of each country', 'اكتشف النكهات الفريدة لكل دولة')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {displayCountries.map((country, index) => (
            <Link
              key={country.id}
              to={`/country/${country.id}`}
              data-index={index}
              className={`country-card group relative rounded-2xl overflow-hidden h-48 md:h-56 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl ${
                visible.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <img
                src={getCountryImage(country.id, country.image)}
                alt={t(country.nameEn, country.nameAr)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-card text-lg font-bold font-display mb-0.5">
                  {t(country.nameEn, country.nameAr)}
                </h3>
                <p className="text-card/80 text-xs line-clamp-1">
                  {t(country.descriptionEn, country.descriptionAr)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/countries"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97]"
          >
            {t('View All Countries', 'عرض جميع الدول')}
          </Link>
        </div>
      </div>
    </section>
  );
}
