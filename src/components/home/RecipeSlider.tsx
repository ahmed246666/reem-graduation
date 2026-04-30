import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronLeft, ChevronRight, Clock, Star, Play, Pause } from 'lucide-react';
import { recipes, type Recipe } from '@/data/recipes';
import { getRecipeImage } from '@/data/recipeImages';

const sliderRecipes: Recipe[] = [
  'egyptian-koshari', 'doner-kebab', 'kabsa-chicken', 'fish-and-chips-002', 'sy-chicken-shawarma-009',
  'paella-de-mariscos', 'german-apple-strudel', 'greek-moussaka-001', 'pad-thai',
].map(id => recipes.find(r => r.id === id)!).filter(Boolean);

export default function RecipeSlider() {
  const { t, isRTL } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [prev2, setPrev2] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const progressRef = useRef<number>(0);
  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const SLIDE_DURATION = 6000;

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPrev2(current);
    setCurrent(index);
    setProgress(0);
    progressRef.current = 0;
    lastTimeRef.current = 0;
    setTimeout(() => {
      setPrev2(null);
      setIsTransitioning(false);
    }, 800);
  }, [isTransitioning, current]);

  const next = useCallback(() => goTo((current + 1) % sliderRecipes.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + sliderRecipes.length) % sliderRecipes.length), [current, goTo]);

  // Progress bar + auto-advance
  useEffect(() => {
    if (!isPlaying) return;
    const tick = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      progressRef.current += delta;
      const pct = Math.min(progressRef.current / SLIDE_DURATION, 1);
      setProgress(pct);
      if (pct >= 1) {
        next();
        return;
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying, current, next]);

  const recipe = sliderRecipes[current];
  const imgSrc = getRecipeImage(recipe.id, recipe.image);
  const prevRecipe = prev2 !== null ? sliderRecipes[prev2] : null;
  const prevImgSrc = prevRecipe ? getRecipeImage(prevRecipe.id, prevRecipe.image) : '';

  return (
    <section className="py-20 bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-3 tracking-wide uppercase">
            {t('Trending Now', 'رائج الآن')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">
            {t('Recipe Showcase', 'معرض الوصفات')}
          </h2>
        </div>

        {/* Slider */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-card border border-border group">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-muted/30">
            <div
              className="h-full bg-primary transition-none"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <div className="flex flex-col md:flex-row min-h-[420px] md:min-h-[520px]">
            {/* Image with slow zoom / parallax */}
            <div className="relative md:w-3/5 h-72 md:h-auto overflow-hidden bg-muted">
              {/* Previous image (fading out) */}
              {prevRecipe && (
                <img
                  key={`prev-${prevRecipe.id}`}
                  src={prevImgSrc}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    animation: 'sliderFadeOut 0.8s ease-out forwards',
                    transform: 'scale(1.08)',
                  }}
                />
              )}

              {/* Current image with slow zoom (Ken Burns) */}
              <img
                key={recipe.id}
                src={imgSrc}
                alt={t(recipe.nameEn, recipe.nameAr)}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  animation: `sliderZoomIn ${SLIDE_DURATION}ms ease-out forwards, sliderFadeIn 0.8s ease-out forwards`,
                }}
              />

              {/* Cinematic gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-card/10 md:to-card" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

              {/* Slide counter badge */}
              <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-md text-foreground text-xs font-bold px-3 py-1.5 rounded-full border border-border/50 shadow-lg">
                {current + 1} / {sliderRecipes.length}
              </div>
            </div>

            {/* Content */}
            <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center relative">
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

              <span
                key={`cat-${recipe.id}`}
                className="inline-block w-fit bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-primary/20"
                style={{ animation: 'sliderSlideUp 0.6s ease-out 0.1s both' }}
              >
                {t(recipe.categoryEn, recipe.categoryAr)}
              </span>

              <h3
                key={`title-${recipe.id}`}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground font-display mb-4 leading-tight"
                style={{ animation: 'sliderSlideUp 0.6s ease-out 0.2s both' }}
              >
                {t(recipe.nameEn, recipe.nameAr)}
              </h3>

              <p
                key={`desc-${recipe.id}`}
                className="text-muted-foreground text-sm md:text-base mb-7 line-clamp-3 leading-relaxed"
                style={{ animation: 'sliderSlideUp 0.6s ease-out 0.3s both' }}
              >
                {t(recipe.descriptionEn, recipe.descriptionAr)}
              </p>

              <div
                className="flex items-center gap-6 mb-8 text-sm text-muted-foreground"
                style={{ animation: 'sliderSlideUp 0.6s ease-out 0.4s both' }}
              >
                <span className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                  <Clock className="w-4 h-4 text-primary" />
                  {t(recipe.time, recipe.timeAr)}
                </span>
                <span className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  {recipe.rating}
                </span>
              </div>

              <Link
                to={`/recipe/${recipe.id}`}
                className="inline-flex items-center justify-center w-fit bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 active:scale-95 hover:-translate-y-0.5"
                style={{ animation: 'sliderSlideUp 0.6s ease-out 0.5s both' }}
              >
                {t('View Recipe', 'عرض الوصفة')}
              </Link>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 rounded-full bg-card/70 backdrop-blur-md text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground shadow-xl border border-border/30 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 rounded-full bg-card/70 backdrop-blur-md text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground shadow-xl border border-border/30 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Controls: dots + play/pause */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="flex items-center gap-2">
            {sliderRecipes.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-500 ${
                  i === current
                    ? 'w-10 h-2.5 bg-primary shadow-md shadow-primary/30'
                    : 'w-2.5 h-2.5 bg-muted-foreground/25 hover:bg-muted-foreground/50 hover:scale-125'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
        </div>
      </div>
    </section>
  );
}
