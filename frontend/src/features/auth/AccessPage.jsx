import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { AccessForm } from './AccessForm.jsx';
import { PrivateHero } from './PrivateHero.jsx';
export function AccessPage() {
  const { t } = useLanguage();
  return (
    <div className="access-page">
      <PrivateHero
        eyebrow={t('TU ESPACIO KelseTS')}
        title={
          <>
            {t('Cada detalle.')}
            <br />
            <em>{t('También aquí.')}</em>
          </>
        }
        description={t('Tus visitas, el cuidado de tu coche y las personas que lo hacen posible.')}
        action
      />
      <section className="access-content" id="acceso" aria-labelledby="access-form-title">
        <AccessForm />
        <p className="small access-demo-note">
          {t('Las comunicaciones de esta demostración aparecen en tu cuenta. No enviamos correos.')}
        </p>
      </section>
    </div>
  );
}
