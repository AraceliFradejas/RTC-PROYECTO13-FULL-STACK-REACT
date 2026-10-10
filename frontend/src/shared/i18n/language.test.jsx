import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from './LanguageProvider.jsx';
import { LanguageSwitch } from './LanguageSwitch.jsx';
import { readLanguage, translate } from './locale.js';
import { CatalogPage } from '../../features/catalog/CatalogPage.jsx';

afterEach(() => vi.unstubAllGlobals());
describe('language preferences and catalogue contract', () => {
  it('falls back to Spanish when storage is unavailable or has an unknown value', () => {
    expect(readLanguage({ getItem() { throw new Error('blocked'); } })).toBe('es');
    expect(readLanguage({ getItem: () => 'fr' })).toBe('es');
  });
  it('keeps brand names and untranslated data intact', () => {
    expect(translate('en', 'Porsche')).toBe('Porsche');
    expect(translate('en', 'constructor')).toBe('constructor');
    expect(translate('es', 'Eléctrico')).toBe('Eléctrico');
    expect(translate('en', 'Eléctrico')).toBe('Electric');
  });
  it('offers both languages and marks the stored choice', () => {
    vi.stubGlobal('window', { localStorage: { getItem: () => 'en' } });
    const html = renderToStaticMarkup(<LanguageProvider><LanguageSwitch /></LanguageProvider>);
    expect(html).toContain('aria-label="English" aria-pressed="true"');
    expect(html).toContain('aria-label="Castellano" aria-pressed="false"');
  });
  it('renders translated fuel labels while retaining the API value and selected filter', () => {
    vi.stubGlobal('window', { localStorage: { getItem: () => 'en' } });
    const html = renderToStaticMarkup(<MemoryRouter initialEntries={['/catalogo?mode=filters&fuel=El%C3%A9ctrico']}><LanguageProvider><CatalogPage /></LanguageProvider></MemoryRouter>);
    expect(html).toContain('value="Eléctrico" selected="">Electric</option>');
    expect(html).toContain('Apply filters');
    expect(html).not.toContain('value="Electric"');
  });
  it('renders safely when accessing localStorage itself throws', () => {
    vi.stubGlobal('window', { get localStorage() { throw new Error('blocked'); } });
    expect(() => renderToStaticMarkup(<LanguageProvider><LanguageSwitch /></LanguageProvider>)).not.toThrow();
  });
});
