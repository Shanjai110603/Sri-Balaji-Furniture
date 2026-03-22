import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'ta';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.story': 'Story',
    'nav.bespoke': 'Bespoke',
    'nav.materials': 'Materials',
    'nav.gallery': 'Gallery',
    'nav.shop': 'Shop Online',
    'nav.visit': 'Visit Us',
    'nav.consultation': 'Consultation',
    // Hero
    'hero.subtitle': "Udumalaipettai's Finest",
    'hero.h1': 'Custom Furniture\nCrafted with Precision',
    'hero.desc': 'Premium teak, rosewood, and durable handcrafted furniture that transforms houses into extraordinary homes.',
    'hero.explore': 'Explore Collection',
    'hero.consult': 'Consult Our Artisans',
    // About
    'about.subtitle': 'Our Legacy',
    'about.h2': 'Crafting Wood into Masterpieces for Decades',
    'about.p1': 'At Sri Balaji Wood Works in Udumalaipettai, we don\'t just build furniture; we craft heirlooms. Using only the highest grade of materials, our master carpenters pour generations of skill into every bespoke piece.',
    'about.p2': 'We partner with interior designers, bulk buyers, and homeowners who refuse to compromise on quality and aesthetics.',
    'about.check1': '100% Custom Designs to specific requirements',
    'about.check2': 'Guaranteed premium quality timber',
    'about.check3': 'Direct from Manufacturer pricing',
    'about.stat1': 'Years Experience',
    'about.stat2': 'Happy Clients',
    'about.stat3': 'Custom Designs',
    // Store
    'store.subtitle': 'Curated Collection',
    'store.h1': 'Online Store',
    'store.desc': 'Browse our ready-to-ship premium furniture directly from our Udumalaipettai workshop.',
    'store.order': 'Order Now',
    // Products
    'products.subtitle': 'Masterpieces',
    'products.h2': 'Bespoke Furniture Collections',
    'products.desc': 'Explore our diverse range of custom-built furniture, designed to suit your unique taste and spatial requirements.',
    'products.request': 'Request Design',
    'products.quote': 'Quote This Design',
    // WhyChooseUs
    'why.subtitle': 'The Balaji Difference',
    'why.h2': 'Why Choose Us',
    'why.cta': 'Call Now for Free Consultation',
    'why.f1.title': 'Custom Design Support',
    'why.f1.text': 'Work directly with our artisans to bring your exact vision to life.',
    'why.f2.title': 'Affordable Pricing',
    'why.f2.text': 'Premium quality without the middleman markup. Direct from our workshop.',
    'why.f3.title': 'Fast Delivery',
    'why.f3.text': 'Efficient production timelines ensuring you get your furniture on schedule.',
    'why.f4.title': 'Strong & Durable',
    'why.f4.text': 'Built with structural integrity guaranteeing decades of reliable use.',
    // Materials
    'mat.subtitle': 'Superior Quality',
    'mat.h2': 'The Soul of Our Furniture',
    'mat.desc': 'We source only the finest, matured timber to ensure your furniture looks magnificent and lasts for generations.',
    'mat.m1.title': 'First Grade Teak Wood',
    'mat.m1.desc': 'Known for its incredible durability and natural weather resistance, teak is the gold standard for enduring furniture.',
    'mat.m2.title': 'Authentic Rosewood',
    'mat.m2.desc': 'Famous for its deep, rich hues and distinct grain patterns, perfect for creating exquisite, statement pieces.',
    'mat.m3.title': 'Premium BTC Wood',
    'mat.m3.desc': 'Burma Teak Wood offers unmatched stability, minimal shrinkage, and a gorgeous finish that appreciates over time.',
    // General
    'scroll': 'Scroll',
    // Reviews
    'reviews.subtitle': 'Testimonials',
    'reviews.h2': 'Client Experiences',
    'reviews.r1': 'The custom teak wood wardrobe they built for my master bedroom is simply stunning. The craftsmanship is evident in every joint.',
    'reviews.r2': 'We ordered complete office furniture. Not only was the delivery fast, but the premium feel of the wood transformed our workspace.',
    'reviews.r3': "Sri Balaji Wood Works designed a beautiful rosewood dining table for us. It's the centerpiece of our home now!",
    'reviews.r4': 'Exceptional quality and genuine materials. The detailing on the sofa set matches exactly what was shown in the catalog.',
    // Locations
    'loc.subtitle': 'Find Us',
    'loc.h2': 'Our Branches',
    'loc.directions': 'Get Directions',
    // OrderForm
    "form.subtitle": "Let's Build It",
    'form.h2': 'Request a Custom Quote',
    'form.desc': 'Have a specific design in mind? Share your details and our master artisans will get back to you with a free consultation and estimate.',
    'form.name': 'Full Name',
    'form.phone': 'Phone Number',
    'form.req': 'Your Furniture Requirement',
    'form.reqPlaceholder': 'E.g., I need a king size teak wood bed with carving...',
    'form.submit': 'Send via WhatsApp',
    'form.errPhone': 'Please enter a valid 10-digit phone number.',
    'form.sending': 'Redirecting to our Master Artisans on WhatsApp...',
    // Footer
    'footer.tagline': 'Crafting premium custom furniture in Udumalaipettai for over 30 years. Quality that speaks for itself.',
    'footer.links': 'Quick Links',
    'footer.contact': 'Contact Us',
    'footer.copy': 'Sri Balaji Wood Works. All Rights Reserved.',
  },

  ta: {
    // Navbar
    'nav.story': 'கதை',
    'nav.bespoke': 'சிறப்பு தயாரிப்பு',
    'nav.materials': 'மூலப்பொருட்கள்',
    'nav.gallery': 'கேலரி',
    'nav.shop': 'ஆன்லைன் கடை',
    'nav.visit': 'எங்களை சந்தியுங்கள்',
    'nav.consultation': 'ஆலோசனை',
    // Hero
    'hero.subtitle': 'உடுமலை பேட்டையின் சிறந்த தளபாடம்',
    'hero.h1': 'தனிப்பட்ட தளபாடம்\nதச்சுகலையில் வடிவமைக்கப்பட்டது',
    'hero.desc': 'தேக்கு, சந்தன மரம் மற்றும் திடமான கைவினைஞர் தளபாடங்கள் வீடுகளை தனித்துவமான இல்லங்களாக மாற்றுகின்றன.',
    'hero.explore': 'தொகுப்பை காண்க',
    'hero.consult': 'எங்கள் கலைஞர்களை கலந்தாலோசிக்க',
    // About
    'about.subtitle': 'எங்கள் பாரம்பரியம்',
    'about.h2': 'தசாப்தங்களாக மரத்தை மாஸ்டர்பீஸாக மாற்றுகிறோம்',
    'about.p1': 'உடுமலை பேட்டையில் உள்ள ஸ்ரீ பாலாஜி வுட் வொர்க்ஸில், நாங்கள் தளபாடங்களை மட்டுமல்ல, கலைப்பொருட்களை உருவாக்குகிறோம். உயர் தரமான மூலப்பொருட்களை மட்டுமே பயன்படுத்தி, எங்கள் திறமையான தச்சர்கள் ஒவ்வொரு வேலையிலும் தலைமுறை திறமையை செலுத்துகின்றனர்.',
    'about.p2': 'தரம் மற்றும் அழகியலில் சமரசம் செய்துகொள்ள மறுக்கும் உள்துறை வடிவமைப்பாளர்கள், மொத்த வாங்குவோர் மற்றும் வீட்டு உரிமையாளர்களுடன் நாங்கள் இணைகிறோம்.',
    'about.check1': '100% குறிப்பிட்ட தேவைகளுக்கு தனிப்பட்ட வடிவமைப்புகள்',
    'about.check2': 'உறுதியான பிரீமியம் மரம்',
    'about.check3': 'உற்பத்தியாளரிடமிருந்து நேரடி விலை',
    'about.stat1': 'ஆண்டுகள் அனுபவம்',
    'about.stat2': 'மகிழ்ச்சியான வாடிக்கையாளர்கள்',
    'about.stat3': 'தனிப்பட்ட வடிவமைப்புகள்',
    // Store
    'store.subtitle': 'தேர்ந்தெடுக்கப்பட்ட தொகுப்பு',
    'store.h1': 'ஆன்லைன் கடை',
    'store.desc': 'எங்கள் உடுமலை பட்டறையிலிருந்து நேரடியாக பிரீமியம் தளபாடங்களை உலாவுங்கள்.',
    'store.order': 'இப்போது ஆர்டர் செய்யுங்கள்',
    // Products
    'products.subtitle': 'தலைசிறந்த படைப்புகள்',
    'products.h2': 'சிறப்பு தளபாட தொகுப்புகள்',
    'products.desc': 'உங்கள் தனிப்பட்ட சுவை மற்றும் இட தேவைகளுக்கு ஏற்ப வடிவமைக்கப்பட்ட எங்கள் தொகுப்பை காண்க.',
    'products.request': 'வடிவமைப்பு கோரிக்கை',
    'products.quote': 'விலை பெறுக',
    // WhyChooseUs
    'why.subtitle': 'பாலாஜி வித்தியாசம்',
    'why.h2': 'ஏன் எங்களை தேர்வு செய்ய வேண்டும்',
    'why.cta': 'இலவச ஆலோசனைக்கு இப்போது அழைக்கவும்',
    'why.f1.title': 'தனிப்பட்ட வடிவமைப்பு ஆதரவு',
    'why.f1.text': 'உங்கள் கனவை நனவாக்க எங்கள் கலைஞர்களுடன் நேரடியாக பணியாற்றுங்கள்.',
    'why.f2.title': 'சிக்கனமான விலை',
    'why.f2.text': 'இடைத்தரகர் இல்லாமல் பிரீமியம் தரம். நேரடியாக எங்கள் பட்டறையிலிருந்து.',
    'why.f3.title': 'விரைவான டெலிவரி',
    'why.f3.text': 'உங்கள் தளபாடங்கள் சரியான நேரத்தில் கிடைக்க திறமையான உற்பத்தி காலவரிசை.',
    'why.f4.title': 'வலிமையான மற்றும் நீடித்த',
    'why.f4.text': 'கட்டமைப்பு ஒருமைப்பாட்டுடன் கட்டப்பட்டது, தசாப்தங்களாக நம்பகமான பயன்பாட்டை உறுதிப்படுத்துகிறது.',
    // Materials
    'mat.subtitle': 'உயர்தர தரம்',
    'mat.h2': 'எங்கள் தளபாடங்களின் ஆன்மா',
    'mat.desc': 'உங்கள் தளபாடங்கள் அழகாக காணப்படவும் தலைமுறைகளாக நீடிக்கவும் சிறந்த மரத்தை மட்டுமே பயன்படுத்துகிறோம்.',
    'mat.m1.title': 'முதல் தர தேக்கு மரம்',
    'mat.m1.desc': 'அபாரமான நோக்குமிடம் மற்றும் இயற்கை வெதுவெதுப்பு எதிர்ப்பிற்காக அறியப்பட்ட தேக்கு, நீடித்த தளபாடங்களுக்கான தரத்தின் அடையாளம்.',
    'mat.m2.title': 'அசல் ரோஸ்வுட்',
    'mat.m2.desc': 'ஆழமான, செழுமையான நிறங்கள் மற்றும் தனித்துவமான மரத்தின் அமைப்புகளுக்கு புகழ்பெற்றது, விலையுயர்ந்த படைப்புகளை உருவாக்க சிறந்தது.',
    'mat.m3.title': 'பிரீமியம் BTC மரம்',
    'mat.m3.desc': 'பர்மா தேக்கு மரம் ஒப்பற்ற நிலைத்தன்மை, குறைந்த சுருக்கம் மற்றும் காலப்போக்கில் மேம்படும் அழகான மேற்பரப்பை வழங்குகிறது.',
    // Reviews
    'reviews.subtitle': 'சாட்சியங்கள்',
    'reviews.h2': 'வாடிக்கையாளர் அனுபவங்கள்',
    'reviews.r1': 'அவர்கள் என் தலைப்படுக்கை அறைக்காக உருவாக்கிய தனிப்பட்ட தேக்கு மர அலமாரி மிகவும் அழகானது. கைவினைத்திறன் ஒவ்வொரு இணைப்பிலும் தெரிகிறது.',
    'reviews.r2': 'நாங்கள் முழு அலுவலக தளபாடங்களை ஆர்டர் செய்தோம். விநியோகம் வேகமாக இருந்தது மட்டுமல்ல, மரத்தின் பிரீமியம் தரம் எங்கள் பணியிடத்தை மாற்றியது.',
    'reviews.r3': 'ஸ்ரீ பாலாஜி வுட் வொர்க்ஸ் எங்களுக்கு ஒரு அழகான ரோஸ்வுட் டைனிங் டேபிளை வடிவமைத்தது. இப்போது இது எங்கள் வீட்டின் மையப்புள்ளி!',
    'reviews.r4': 'சிறந்த தரம் மற்றும் உண்மையான பொருட்கள். சோபா செட்டின் விவரங்கள் கேட்டலாக்கில் காட்டப்பட்டதற்கு சரியாக பொருந்துகின்றன.',
    // Locations
    'loc.subtitle': 'எங்களை கண்டுபிடியுங்கள்',
    'loc.h2': 'எங்கள் கிளைகள்',
    'loc.directions': 'வழிகாட்டி பெறுக',
    // OrderForm
    'form.subtitle': 'இப்போது கட்டமைப்போம்',
    'form.h2': 'தனிப்பட்ட மேற்கோள் கோருங்கள்',
    'form.desc': 'குறிப்பிட்ட வடிவமைப்பு மனதில் இருக்கிறதா? உங்கள் விவரங்களை பகிர்ந்துகொள்ளுங்கள், எங்கள் கலைஞர்கள் இலவச ஆலோசனையுடன் தொடர்பு கொள்வர்.',
    'form.name': 'முழு பெயர்',
    'form.phone': 'தொலைபேசி எண்',
    'form.req': 'உங்கள் தளபாட தேவை',
    'form.reqPlaceholder': 'எ.கா., எனக்கு கொறிக்கை நகரங்களுடன் கூடிய கிங் சைஸ் தேக்கு மர படுக்கை தேவை...',
    'form.submit': 'WhatsApp வழியாக அனுப்பவும்',
    'form.errPhone': 'சரியான 10 இலக்க தொலைபேசி எண்ணை உள்ளிடுக.',
    'form.sending': 'WhatsApp-ல் எங்கள் கலைஞர்களிடம் திருப்பி அனுப்புகிறோம்...',
    // Footer
    'footer.tagline': '30 ஆண்டுகளுக்கும் மேலாக உடுமலைபேட்டையில் பிரீமியம் தனிப்பட்ட தளபாடங்களை உருவாக்குகிறோம். தரம் என்பதே நமது அடையாளம்.',
    'footer.links': 'விரைவு இணைப்புகள்',
    'footer.contact': 'எங்களை தொடர்பு கொள்ளுங்கள்',
    'footer.copy': 'ஸ்ரீ பாலாஜி வுட் வொர்க்ஸ். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    // General
    'scroll': 'உருட்டவும்',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');

  const toggleLang = () => setLang(prev => prev === 'en' ? 'ta' : 'en');

  const t = (key: string): string => translations[lang][key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLang must be used within a LanguageProvider');
  return context;
};
