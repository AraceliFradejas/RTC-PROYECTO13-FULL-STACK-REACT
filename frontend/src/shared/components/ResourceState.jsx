import { useLanguage } from '../i18n/LanguageProvider.jsx';
export function ResourceState({ resource, children }) {
  const { t } = useLanguage();
  if (resource.status === 'loading')
    return (
      <p className="notice" role="status">
        {t('Cargando…')}
      </p>
    );
  if (resource.status === 'error')
    return (
      <div className="notice">
        <p role="alert">{t(resource.error.message) || t('No se ha podido cargar el contenido.')}</p>
        <button className="button" onClick={resource.retry}>
          {t('Volver a intentar')}
        </button>
      </div>
    );
  return children(resource.data);
}
