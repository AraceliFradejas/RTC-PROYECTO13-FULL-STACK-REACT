import { useLanguage } from '../../../shared/i18n/LanguageProvider.jsx';

export function CatalogPagination({ page, pages, onChange }) {
  const { t } = useLanguage();
  return (
    <div className="pagination">
      <button
        className="button button-outline"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        {t('Anterior')}
      </button>
      <span>
        {t('Página')} {page} {t('de')} {Math.max(pages, 1)}
      </span>
      <button
        className="button button-outline"
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
      >
        {t('Siguiente')}
      </button>
    </div>
  );
}
