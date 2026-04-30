import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useFavorites } from '@/context/FavoritesContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getCountryById } from '@/data/countries';
import { getRecipesByCountry } from '@/data/recipes';
import { getRecipeImage } from '@/data/recipeImages';
import { getCountryImage } from '@/data/countryImages';
import { Clock, ChefHat, Star, Heart } from 'lucide-react';

export default function CountryPage() {
  const { id } = useParams<{ id: string }>();
  const { t, isRTL } = useLanguage();
  const { toggleFavorite, isFavorite } = useFavorites();
  const country = getCountryById(id || '');
  const recipes = getRecipesByCountry(id || '');

  if (!country) return <div className="min-h-screen flex items-center justify-center text-foreground">Country not found</div>;

  const mains = recipes.filter(r => r.type === 'main');
  const desserts = recipes.filter(r => r.type === 'dessert');
  const drinks = recipes.filter(r => r.type === 'drink');
  const appetizers = recipes.filter(r => r.type === 'appetizer');

  const Section = ({ title, titleAr, items }: { title: string; titleAr: string; items: typeof recipes }) => (
    items.length > 0 ? (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 font-display">{t(title, titleAr)}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((recipe) => (
            <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border">
              <div className="relative h-44 overflow-hidden">
                <img src={getRecipeImage(recipe.id, recipe.image)} alt={t(recipe.nameEn, recipe.nameAr)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <button onClick={(e) => { e.preventDefault(); toggleFavorite(recipe.id); }} className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isFavorite(recipe.id) ? 'bg-primary text-primary-foreground' : 'bg-card/90 text-muted-foreground hover:bg-primary hover:text-primary-foreground'}`}>
                  <Heart className={`w-4 h-4 ${isFavorite(recipe.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors font-display">{t(recipe.nameEn, recipe.nameAr)}</h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{t(recipe.time, recipe.timeAr)}</span>
                  <span className="flex items-center gap-1"><ChefHat className="w-3 h-3" />{t(recipe.difficultyEn, recipe.difficultyAr)}</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-accent fill-accent" />{recipe.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    ) : null
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={getCountryImage(country.id, country.image)} alt={t(country.nameEn, country.nameAr)} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
          <h1 className="text-4xl font-bold text-foreground font-display">{t(country.nameEn, country.nameAr)}</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm">{t(country.cuisineIntroEn, country.cuisineIntroAr)}</p>
        </div>
      </div>
      <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={isRTL ? 'rtl' : 'ltr'}>
        <Section title="Appetizers" titleAr="مقبلات" items={appetizers} />
        <Section title="Main Dishes" titleAr="أطباق رئيسية" items={mains} />
        <Section title="Desserts" titleAr="حلويات" items={desserts} />
        <Section title="Drinks" titleAr="مشروبات" items={drinks} />
      </main>
      <Footer />
    </div>
  );
}
