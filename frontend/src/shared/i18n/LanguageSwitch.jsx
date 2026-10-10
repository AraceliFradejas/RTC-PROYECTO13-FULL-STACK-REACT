import { useLanguage } from './LanguageProvider.jsx';

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  return (
    <div
      className="language-switch"
      role="group"
      aria-label={language === 'es' ? 'Idioma' : 'Language'}
    >
      <button
        type="button"
        lang="es"
        aria-label="Castellano"
        aria-pressed={language === 'es'}
        onClick={() => setLanguage('es')}
      >
        ES
      </button>
      <button
        type="button"
        lang="en"
        aria-label="English"
        aria-pressed={language === 'en'}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </div>
  );
}
