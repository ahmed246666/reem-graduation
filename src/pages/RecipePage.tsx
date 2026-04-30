import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useFavorites } from '@/context/FavoritesContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getRecipeById } from '@/data/recipes';
import { getRecipeImage } from '@/data/recipeImages';
import { Heart, Clock, ChefHat, Star, ArrowLeft } from 'lucide-react';

export default function RecipePage() {
  const { id } = useParams<{ id: string }>();
  const { t, isRTL } = useLanguage();
  const { toggleFavorite, isFavorite } = useFavorites();
  const recipe = getRecipeById(id || '');

  if (!recipe) return <div className="min-h-screen flex items-center justify-center">Recipe not found</div>;

  const fav = isFavorite(recipe.id);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" dir={isRTL ? 'rtl' : 'ltr'}>
        <Link to={`/country/${recipe.country}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          {t('Back to country', 'العودة للدولة')}
        </Link>

        <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
          <img src={getRecipeImage(recipe.id, recipe.image)} alt={t(recipe.nameEn, recipe.nameAr)} className="w-full h-64 md:h-80 object-cover" />
        </div>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-display mb-2">{t(recipe.nameEn, recipe.nameAr)}</h1>
            <p className="text-muted-foreground">{t(recipe.descriptionEn, recipe.descriptionAr)}</p>
          </div>
          <button onClick={() => toggleFavorite(recipe.id)} className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 ${fav ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:border-primary hover:text-primary'}`}>
            <Heart className={`w-5 h-5 ${fav ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="flex items-center gap-6 mb-8 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" />{t(recipe.time, recipe.timeAr)}</span>
          <span className="flex items-center gap-1.5"><ChefHat className="w-4 h-4 text-secondary" />{t(recipe.difficultyEn, recipe.difficultyAr)}</span>
          <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-accent fill-accent" />{recipe.rating}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="text-xl font-bold text-foreground mb-4 font-display">{t('Ingredients', 'المكونات')}</h2>
            <ul className="space-y-2">
              {(isRTL ? recipe.ingredientsAr : recipe.ingredientsEn).map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="text-xl font-bold text-foreground mb-4 font-display">{t('Instructions', 'التعليمات')}</h2>
            <ol className="space-y-3">
              {(isRTL ? recipe.stepsAr : recipe.stepsEn).map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {recipe.videoUrl && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-4 font-display">{t('Cooking Video', 'فيديو الطبخ')}</h2>
            <div className="rounded-2xl overflow-hidden aspect-video">
              <iframe src={recipe.videoUrl} className="w-full h-full" allowFullScreen title="Cooking video" />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
