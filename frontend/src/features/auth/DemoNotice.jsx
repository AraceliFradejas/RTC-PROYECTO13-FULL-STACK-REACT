import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';

export function DemoNotice({ readOnly }) {
  const { t } = useLanguage();
  if (!readOnly) return null;
  return (
    <p className="notice" role="status">
      <strong>{t('Cuenta DEMO · Solo lectura')}</strong><br />
      {t('Puedes consultar los ejemplos y las comunicaciones. Las citas, solicitudes y fotografías no se pueden modificar con este acceso.')}
    </p>
  );
}
