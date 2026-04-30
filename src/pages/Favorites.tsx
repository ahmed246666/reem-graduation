import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useFavorites } from '@/context/FavoritesContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getRecipeById } from '@/data/recipes';
import { getRecipeImage } from '@/data/recipeImages';
import { Heart, Clock, Star } from 'lucide-react';

export default function Favorites() {
  const { t, isRTL } = useLanguage();
  const { favorites, toggleFavorite } = useFavorites();
  const favRecipes = favorites.map(id => getRecipeById(id)).filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={isRTL ? 'rtl' : 'ltr'}>
        <h1 className="text-4xl font-bold text-foreground mb-3 font-display">{t('My Favorites', 'المفضلة')}</h1>
        <p className="text-muted-foreground mb-10">{t('Your saved recipes', 'وصفاتك المحفوظة')}</p>

        {favRecipes.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">{t('No favorites yet', 'لا توجد مفضلات بعد')}</p>
            <Link to="/countries" className="inline-flex items-center bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium">
              {t('Explore Recipes', 'استكشف الوصفات')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {favRecipes.map((recipe) => recipe && (
              <div key={recipe.id} className="group bg-card rounded-2xl overflow-hidden shadow-md border border-border">
                <Link to={`/recipe/${recipe.id}`}>
                  <div className="relative h-44 overflow-hidden">
                    <img src={getRecipeImage(recipe.id, recipe.image)} alt={t(recipe.nameEn, recipe.nameAr)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/recipe/${recipe.id}`}>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors font-display">{t(recipe.nameEn, recipe.nameAr)}</h3>
                  </Link>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{t(recipe.time, recipe.timeAr)}</span>
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 text-accent fill-accent" />{recipe.rating}</span>
                    </div>
                    <button onClick={() => toggleFavorite(recipe.id)} className="text-primary hover:text-destructive transition-colors">
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
