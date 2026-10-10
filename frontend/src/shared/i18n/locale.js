import english from './en.json';

export const LANGUAGE_STORAGE_KEY = 'kelsets-cars-language';
export function resolveLanguage(value) { return value === 'en' ? 'en' : 'es'; }
export function translate(language, text) { return language === 'en' && Object.hasOwn(english, text) ? english[text] : text; }
export function readLanguage(storage) {
  try { return resolveLanguage(storage.getItem(LANGUAGE_STORAGE_KEY)); }
  catch { return 'es'; }
}
