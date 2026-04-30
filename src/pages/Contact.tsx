import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Send, CheckCircle, Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  const { t, isRTL } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const infoCards = [
    { icon: Mail, en: 'Email Us', ar: 'راسلنا', detail: 'hello@culinarybridge.com' },
    { icon: MapPin, en: 'Location', ar: 'الموقع', detail: t('Worldwide', 'حول العالم') },
    { icon: Phone, en: 'Call Us', ar: 'اتصل بنا', detail: '+1 (555) 123-4567' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full mb-3">
              {t('Get in Touch', 'تواصل معنا')}
            </span>
            <h1 className="text-4xl font-bold text-foreground mb-3 font-display">{t('Contact Us', 'تواصل معنا')}</h1>
            <p className="text-muted-foreground max-w-md mx-auto">{t("We'd love to hear from you. Send us a message and we'll respond as soon as possible.", 'نحب أن نسمع منك. أرسل لنا رسالة وسنرد في أقرب وقت ممكن.')}</p>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
            {infoCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.en} className="bg-card border border-border rounded-2xl p-5 text-center hover:shadow-md hover:border-primary/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{t(card.en, card.ar)}</h3>
                  <p className="text-xs text-muted-foreground">{card.detail}</p>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-xl font-bold text-foreground font-display">{t('Message Sent!', 'تم الإرسال!')}</p>
                  <p className="text-muted-foreground mt-2 text-sm">{t("We'll get back to you soon.", 'سنتواصل معك قريباً.')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">{t('Name', 'الاسم')}</label>
                      <input required className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all text-sm" placeholder={t('Your name', 'اسمك')} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">{t('Email', 'البريد الإلكتروني')}</label>
                      <input type="email" required className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all text-sm" placeholder={t('your@email.com', 'بريدك@مثال.com')} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t('Subject', 'الموضوع')}</label>
                    <input required className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all text-sm" placeholder={t('How can we help?', 'كيف يمكننا مساعدتك؟')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t('Message', 'الرسالة')}</label>
                    <textarea required rows={5} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all resize-none text-sm" placeholder={t('Tell us more...', 'أخبرنا المزيد...')} />
                  </div>
                  <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97]">
                    {t('Send Message', 'إرسال الرسالة')}
                    <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
