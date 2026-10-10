import { useLanguage } from '../../../shared/i18n/LanguageProvider.jsx';
import { CatalogSearch } from '../CatalogSearch.jsx';
import { CatalogFilters } from './CatalogFilters.jsx';

export function CatalogToolbar({
  mode,
  params,
  query,
  data,
  onModeChange,
  onSearch,
  onFilter,
  onClear,
}) {
  const { t } = useLanguage();
  return (
    <div className="catalog-toolbar">
      <div className="catalog-search-intro">
        <p className="eyebrow">{t('TU COLECCIÓN, A TU MANERA')}</p>
        <h2>{t('¿Cómo quieres encontrar tu próximo coche?')}</h2>
        <p>
          <strong>{t('Búsqueda libre:')}</strong>{' '}
          {t(
            'escribe una marca o modelo y elige entre las sugerencias. Ideal si ya tienes algo en mente.',
          )}
        </p>
        <p>
          <strong>{t('Filtros:')}</strong>{' '}
          {t(
            'combina marca y motorización para comparar opciones y ordenar los resultados. Ideal si todavía estás explorando.',
          )}
        </p>
      </div>
      <div className="catalog-modes" role="group" aria-label={t('Modo de búsqueda')}>
        <button
          type="button"
          aria-pressed={mode === 'search'}
          onClick={() => onModeChange('search')}
        >
          {t('Búsqueda libre')}
        </button>
        <button
          type="button"
          aria-pressed={mode === 'filters'}
          onClick={() => onModeChange('filters')}
        >
          {t('Filtros')}
        </button>
      </div>
      {mode === 'search' ? (
        <CatalogSearch initialValue={params.get('q') || ''} onSearch={onSearch} />
      ) : (
        <CatalogFilters
          key={`filters-${query}`}
          params={params}
          brands={data?.brands}
          fuels={data?.fuels}
          onSubmit={onFilter}
          onClear={onClear}
        />
      )}
    </div>
  );
}
