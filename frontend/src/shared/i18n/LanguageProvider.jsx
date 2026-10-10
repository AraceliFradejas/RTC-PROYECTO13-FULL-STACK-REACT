import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LANGUAGE_STORAGE_KEY, readLanguage, resolveLanguage, translate } from './locale.js';

const LanguageContext = createContext(null);
export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return readLanguage(window.localStorage);
    } catch {
      return 'es';
    }
  });
  const setLanguage = useCallback((value) => {
    const next = resolveLanguage(value);
    setLanguageState(next);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    } catch {
      /* Preference is kept for this session. */
    }
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    document.title =
      language === 'en' ? 'KelseTS Cars · Your next road' : 'KelseTS Cars · Tu próximo camino';
    const sync = (event) => {
      if (event.key === LANGUAGE_STORAGE_KEY) setLanguageState(resolveLanguage(event.newValue));
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, [language]);
  const t = useCallback((text) => translate(language, text), [language]);
  const value = useMemo(
    () => ({ language, locale: language === 'en' ? 'en-GB' : 'es-ES', setLanguage, t }),
    [language, setLanguage, t],
  );
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage requires LanguageProvider');
  return context;
}
