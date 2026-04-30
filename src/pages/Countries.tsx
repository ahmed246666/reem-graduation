import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { countries } from '@/data/countries';
import { getCountryImage } from '@/data/countryImages';

export default function Countries() {
  const { t, isRTL } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-foreground mb-3 font-display">{t('Explore Countries', 'استكشف الدول')}</h1>
            <p className="text-muted-foreground">{t('Discover cuisines from around the world', 'اكتشف المطابخ من حول العالم')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((country) => (
              <Link key={country.id} to={`/country/${country.id}`} className="group relative rounded-2xl overflow-hidden h-56 shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
                <img src={getCountryImage(country.id, country.image)} alt={t(country.nameEn, country.nameAr)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h2 className="text-card text-xl font-bold font-display mb-1">{t(country.nameEn, country.nameAr)}</h2>
                  <p className="text-card/80 text-sm">{t(country.descriptionEn, country.descriptionAr)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
