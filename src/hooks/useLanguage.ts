import { useState, useEffect } from 'react';
import { Language, translations } from '../types/language';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('vederix-language');
    return (saved as Language) || 'id'; // Default to Indonesian
  });

  useEffect(() => {
    localStorage.setItem('vederix-language', language);
  }, [language]);

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'id' ? 'en' : 'id');
  };

  return {
    language,
    setLanguage,
    toggleLanguage,
    t
  };
};