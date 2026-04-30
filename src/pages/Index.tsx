import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedRecipes from '@/components/home/FeaturedRecipes';
import ExploreByCuisine from '@/components/home/ExploreByCuisine';
import HowItWorks from '@/components/home/HowItWorks';
import FinalCTA from '@/components/home/FinalCTA';
import RecipeSlider from '@/components/home/RecipeSlider';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <RecipeSlider />
        <FeaturedRecipes />
        <ExploreByCuisine />
        <HowItWorks />
        <TestimonialsSection />
        <FAQSection/>
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
