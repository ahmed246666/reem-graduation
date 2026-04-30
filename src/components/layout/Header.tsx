import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { Menu, X, Globe, Sun, Moon, Search, Heart } from 'lucide-react';
import logoImg from '@/assets/logo.png';

export default function Header() {
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { en: 'Home', ar: 'الرئيسية', href: '/' },
    { en: 'Countries', ar: 'الدول', href: '/countries' },
    { en: 'Favorites', ar: 'المفضلة', href: '/favorites' },
    { en: 'About', ar: 'عن الموقع', href: '/about' },
    { en: 'Contact', ar: 'تواصل', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-xl shadow-lg shadow-foreground/5 border-b border-border/50'
          : 'bg-background/70 backdrop-blur-md'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logoImg}
              alt="Culinary Bridge"
              className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-lg font-bold text-foreground hidden sm:block font-display">
              Culinary Bridge
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.en}
                to={item.href}
                className={`text-sm font-medium transition-colors relative py-2 group ${
                  location.pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {t(item.en, item.ar)}
                <span className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} h-0.5 bg-primary rounded-full transition-all duration-300 ${
                  location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/search"
              className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </Link>

            <Link
              to="/favorites"
              className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              aria-label="Favorites"
            >
              <Heart className="w-4 h-4" />
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'العربية' : 'EN'}</span>
            </button>

            <button
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={t('Toggle menu', 'تبديل القائمة')}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.en}
                  to={item.href}
                  className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === item.href
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {t(item.en, item.ar)}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
