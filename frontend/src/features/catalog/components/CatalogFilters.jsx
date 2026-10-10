import { useLanguage } from '../../../shared/i18n/LanguageProvider.jsx';

const DEFAULT_BRANDS = ['Tesla', 'Mercedes-Benz', 'Audi', 'Ferrari', 'Porsche'];
const DEFAULT_FUELS = ['Eléctrico', 'Por verificar'];

export function CatalogFilters({
  params,
  brands = DEFAULT_BRANDS,
  fuels = DEFAULT_FUELS,
  onSubmit,
  onClear,
}) {
  const { t } = useLanguage();
  return (
    <form
      className="filters catalog-filters"
      aria-label={t('Filtrar vehículos')}
      onSubmit={onSubmit}
    >
      <label>
        {t('Marca')}
        <select name="brand" defaultValue={params.get('brand') || ''}>
          <option value="">{t('Todas las marcas')}</option>
          {brands.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <label>
        {t('Motorización')}
        <select name="fuel" defaultValue={params.get('fuel') || ''}>
          <option value="">{t('Todas')}</option>
          {fuels.map((value) => (
            <option key={value} value={value}>
              {t(value)}
            </option>
          ))}
        </select>
      </label>
      <label>
        {t('Ordenar')}
        <select name="sort" defaultValue={params.get('sort') || 'brand'}>
          <option value="brand">{t('Marca y modelo')}</option>
          <option value="price-asc">{t('Precio: menor a mayor')}</option>
          <option value="price-desc">{t('Precio: mayor a menor')}</option>
        </select>
      </label>
      <div className="catalog-filter-actions">
        <button className="button" type="submit">
          {t('Aplicar filtros')}
        </button>
        <button className="button button-outline" type="button" onClick={onClear}>
          {t('Limpiar filtros')}
        </button>
      </div>
    </form>
  );
}
