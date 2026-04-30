import { useLanguage } from '@/context/LanguageContext';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    nameEn: "Sarah M.",
    nameAr: "سارة م.",
    locationEn: "Dubai, UAE",
    locationAr: "دبي، الإمارات",
    ratingCount: 5,
    textEn: "Culinary Bridge helped me discover authentic recipes from around the world. The bilingual support is amazing — I can follow recipes in Arabic effortlessly!",
    textAr: "ساعدني Culinary Bridge في اكتشاف وصفات أصلية من جميع أنحاء العالم. الدعم ثنائي اللغة مذهل — يمكنني متابعة الوصفات بالعربية بسهولة!",
    emoji: "🍜",
  },
  {
    nameEn: "Ahmed K.",
    nameAr: "أحمد ك.",
    locationEn: "Cairo, Egypt",
    locationAr: "القاهرة، مصر",
    ratingCount: 5,
    textEn: "I've been looking for a platform that respects Arabic cuisine and presents it properly. This is it! The recipes are accurate and beautifully presented.",
    textAr: "كنت أبحث عن منصة تحترم المطبخ العربي وتقدمه بشكل صحيح. هذا هو! الوصفات دقيقة ومقدمة بشكل جميل.",
    emoji: "🥘",
  },
  {
    nameEn: "Maria L.",
    nameAr: "ماريا ل.",
    locationEn: "Madrid, Spain",
    locationAr: "مدريد، إسبانيا",
    ratingCount: 5,
    textEn: "The step-by-step instructions are so clear. I made Turkish baklava for the first time and my family loved it! The favorites feature keeps me organized.",
    textAr: "التعليمات خطوة بخطوة واضحة جداً. صنعت البقلاوة التركية لأول مرة وعائلتي أحبتها! ميزة المفضلة تبقيني منظمة.",
    emoji: "🧁",
  },
  {
    nameEn: "Omar H.",
    nameAr: "عمر ح.",
    locationEn: "Amman, Jordan",
    locationAr: "عمّان، الأردن",
    ratingCount: 4,
    textEn: "Finally a food platform that speaks my language! I love exploring cuisines from different countries. The search feature makes finding recipes super easy.",
    textAr: "أخيراً منصة طعام تتحدث لغتي! أحب استكشاف المطابخ من دول مختلفة. ميزة البحث تجعل العثور على الوصفات سهلاً جداً.",
    emoji: "🍲",
  },
  {
    nameEn: "Fatima R.",
    nameAr: "فاطمة ر.",
    locationEn: "Riyadh, KSA",
    locationAr: "الرياض، السعودية",
    ratingCount: 5,
    textEn: "The variety of cuisines is incredible. From Japanese sushi to Moroccan tagine — everything is explained in a way that makes cooking feel like an adventure!",
    textAr: "تنوع المطابخ مذهل. من السوشي الياباني إلى الطاجين المغربي — كل شيء مشروح بطريقة تجعل الطبخ يبدو كمغامرة!",
    emoji: "🍣",
  },
  {
    nameEn: "John D.",
    nameAr: "جون د.",
    locationEn: "London, UK",
    locationAr: "لندن، بريطانيا",
    ratingCount: 5,
    textEn: "As someone learning Arabic, this platform is a goldmine. I practice the language while learning to cook Middle Eastern dishes. Two birds, one stone!",
    textAr: "كشخص يتعلم العربية، هذه المنصة كنز. أمارس اللغة بينما أتعلم طبخ الأطباق الشرق أوسطية. عصفوران بحجر واحد!",
    emoji: "🫓",
  },
];

export default function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            {t('Testimonials', 'آراء المستخدمين')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-display">
            {t('What Our Community Says', 'ماذا يقول مجتمعنا')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t(
              'Real feedback from food lovers around the world',
              'آراء حقيقية من عشاق الطعام حول العالم'
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="relative bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s < item.ratingCount ? 'text-accent fill-accent' : 'text-muted-foreground/30'}`}
                  />
                ))}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                "{t(item.textEn, item.textAr)}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                  {item.emoji}
                </span>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t(item.nameEn, item.nameAr)}</p>
                  <p className="text-xs text-muted-foreground">{t(item.locationEn, item.locationAr)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
