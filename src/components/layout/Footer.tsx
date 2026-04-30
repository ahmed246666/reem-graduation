import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Heart } from 'lucide-react';
import logoImg from '@/assets/logo.png';

export default function Footer() {
  const { t, isRTL } = useLanguage();

  const quickLinks = [
    { en: 'Home', ar: 'الرئيسية', href: '/' },
    { en: 'Countries', ar: 'الدول', href: '/countries' },
    { en: 'Favorites', ar: 'المفضلة', href: '/favorites' },
    { en: 'About', ar: 'عن الموقع', href: '/about' },
    { en: 'Contact', ar: 'تواصل', href: '/contact' },
  ];

  return (
    <footer className="bg-[hsl(220,15%,8%)] text-white/90 py-16" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <img src={logoImg} alt="Culinary Bridge" className="w-10 h-10 group-hover:scale-110 transition-transform brightness-0 invert" />
              <span className="text-xl font-bold font-display text-white">Culinary Bridge</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              {t(
                'Bridging cultures through the universal language of food. Discover authentic recipes from around the world.',
                'ربط الثقافات من خلال لغة الطعام العالمية. اكتشف وصفات أصيلة من حول العالم.'
              )}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-white/40">
              {t('Quick Links', 'روابط سريعة')}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.en}>
                  <Link
                    to={link.href}
                    className="text-white/50 hover:text-primary transition-colors text-sm"
                  >
                    {t(link.en, link.ar)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-white/40">
              {t('Popular Cuisines', 'المطابخ الشهيرة')}
            </h4>
            <ul className="space-y-2.5">
              {['Egyptian', 'Turkish', 'Italian', 'Moroccan', 'Korean'].map((c, i) => (
                <li key={c}>
                  <Link to="/countries" className="text-white/50 hover:text-primary transition-colors text-sm">
                    {t(c, ['مصري', 'تركي', 'إيطالي', 'مغربي', 'كوري'][i])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()} Culinary Bridge. {t('All rights reserved.', 'جميع الحقوق محفوظة.')}
            </p>
            <p className="text-white/30 text-xs flex items-center gap-1">
              {t('Made with', 'صُنع بـ')}
              <Heart className="w-3 h-3 text-primary fill-primary" />
              {t('for food lovers', 'لعشاق الطعام')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
