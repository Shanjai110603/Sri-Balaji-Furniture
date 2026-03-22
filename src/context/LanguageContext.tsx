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
    // General
    'scroll': 'Scroll',
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
