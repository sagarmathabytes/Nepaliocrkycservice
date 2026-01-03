import { Language } from './OnboardingFlow';

interface LanguageToggleProps {
  language: Language;
  onToggle: (lang: Language) => void;
}

export function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 flex overflow-hidden">
        <button
          onClick={() => onToggle('en')}
          className={`px-4 py-2 text-sm transition-colors ${
            language === 'en'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          English
        </button>
        <button
          onClick={() => onToggle('ne')}
          className={`px-4 py-2 text-sm transition-colors ${
            language === 'ne'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          नेपाली
        </button>
      </div>
    </div>
  );
}
