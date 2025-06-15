import React from 'react';
import { Languages } from 'lucide-react';
import { Language } from '../types/language';

interface LanguageToggleProps {
  language: Language;
  onToggle: () => void;
  t: any;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, onToggle, t }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white hover:bg-gray-700/50 transition-all duration-300 group"
      title={t.language}
    >
      <Languages className="h-4 w-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
      <span className="text-sm font-medium">
        {language === 'id' ? t.indonesian : t.english}
      </span>
    </button>
  );
};

export default LanguageToggle;