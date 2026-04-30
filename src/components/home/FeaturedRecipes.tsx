import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useFavorites } from '@/context/FavoritesContext';
import { Clock, ChefHat, Star, Heart } from 'lucide-react';
import { recipes, type Recipe } from '@/data/recipes';
import { getRecipeImage } from '@/data/recipeImages';

// Pick one iconic dish per country
const featuredIds = [
  'egyptian-koshari',      // Egypt
  'doner-kebab',            // Turkey
  'kabsa-chicken',          // Saudi
  'fish-and-chips-002',     // UK
  'sy-chicken-shawarma-009',// Syria
  'paella-de-mariscos',     // Spain
];
const featured = featuredIds
  .map(id => recipes.find(r => r.id === id))
  .filter(Boolean) as Recipe[];

export default function FeaturedRecipes() {
  const { t, isRTL } = useLanguage();
  const { toggleFavorite, isFavorite } = useFavorites();
  const sectionRef = useRef<HTMLDivElement>(null);
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
    sectionRef.current?.querySelectorAll('.recipe-card').forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-card relative" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full mb-3">
            {t('Featured', 'مميز')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-display">
            {t('Popular Recipes', 'وصفات شهيرة')}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t('Handpicked favorites from around the world', 'مفضلات مختارة من حول العالم')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              index={index}
              isVisible={visible.has(index)}
              t={t}
              isRTL={isRTL}
              isFav={isFavorite(recipe.id)}
              onToggleFav={() => toggleFavorite(recipe.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function RecipeCard({ recipe, index, isVisible, t, isRTL, isFav, onToggleFav }: {
  recipe: Recipe; index: number; isVisible: boolean;
  t: (en: string, ar: string) => string; isRTL: boolean;
  isFav: boolean; onToggleFav: () => void;
}) {
  const imgSrc = getRecipeImage(recipe.id, recipe.image);

  return (
    <div
      data-index={index}
      className={`recipe-card group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-border ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <Link to={`/recipe/${recipe.id}`} className="block">
        <div className="relative h-52 overflow-hidden">
          <img
            src={imgSrc}
            alt={t(recipe.nameEn, recipe.nameAr)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-card/90 backdrop-blur-sm text-primary text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
              {t(recipe.categoryEn, recipe.categoryAr)}
            </span>
          </div>
          <button
            onClick={(e) => { e.preventDefault(); onToggleFav(); }}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 shadow-sm ${
              isFav ? 'bg-primary text-primary-foreground' : 'bg-card/90 backdrop-blur-sm text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>
        </div>
      </Link>

      <div className="p-5">
        <Link to={`/recipe/${recipe.id}`}>
          <h3 className="text-base font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors font-display">
            {t(recipe.nameEn, recipe.nameAr)}
          </h3>
        </Link>
        <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
          {t(recipe.descriptionEn, recipe.descriptionAr)}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>{t(recipe.time, recipe.timeAr)}</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="w-3.5 h-3.5 text-secondary" />
            <span>{t(recipe.difficultyEn, recipe.difficultyAr)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-accent fill-accent" />
            <span className="font-semibold text-sm text-foreground tabular-nums">{recipe.rating}</span>
          </div>
          <Link to={`/recipe/${recipe.id}`} className="text-primary text-xs font-medium hover:underline">
            {t('View Recipe →', 'عرض الوصفة ←')}
          </Link>
        </div>
      </div>
    </div>
  );
}
