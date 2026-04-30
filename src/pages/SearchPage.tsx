import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { searchRecipes } from '@/data/recipes';
import { getRecipeImage } from '@/data/recipeImages';
import { Search as SearchIcon, Clock, Star } from 'lucide-react';

export default function SearchPage() {
  const { t, isRTL } = useLanguage();
  const [query, setQuery] = useState('');
  const results = query.length > 1 ? searchRecipes(query) : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" dir={isRTL ? 'rtl' : 'ltr'}>
        <h1 className="text-4xl font-bold text-foreground mb-6 font-display">{t('Search Recipes', 'ابحث عن وصفات')}</h1>
        <div className="relative mb-10">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('Search by name, cuisine, or ingredient...', 'ابحث بالاسم أو المطبخ أو المكون...')}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            autoFocus
          />
        </div>

        {query.length > 1 && (
          <p className="text-sm text-muted-foreground mb-6">{results.length} {t('results found', 'نتيجة')}</p>
        )}

        <div className="space-y-3">
          {results.map((recipe) => (
            <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="flex items-center gap-4 bg-card rounded-xl p-3 border border-border hover:shadow-md transition-all group">
              <img src={getRecipeImage(recipe.id, recipe.image)} alt={t(recipe.nameEn, recipe.nameAr)} className="w-16 h-16 rounded-lg object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors font-display">{t(recipe.nameEn, recipe.nameAr)}</h3>
                <p className="text-xs text-muted-foreground">{t(recipe.categoryEn, recipe.categoryAr)}</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{t(recipe.time, recipe.timeAr)}</span>
                <span className="flex items-center gap-1"><Star className="w-3 h-3 text-accent fill-accent" />{recipe.rating}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
