import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { WORKSHOP_SPECIALTIES } from '@kelsets-cars/contracts';

export function WorkshopRegistrationFields() {
  const { t } = useLanguage();
  return (
    <fieldset className="workshop-fields">
      <legend>{t('Tu taller')}</legend>
      <label>
        {t('Nombre del taller')}
        <input
          name="workshopName"
          autoComplete="organization"
          required
          minLength={2}
          maxLength={120}
        />
      </label>
      <label>
        {t('Ciudad')}
        <input name="city" autoComplete="address-level2" required minLength={2} maxLength={80} />
      </label>
      <label>
        {t('Dirección')}
        <input
          name="address"
          autoComplete="street-address"
          required
          minLength={5}
          maxLength={180}
        />
      </label>
      <label>
        {t('Teléfono')}
        <input name="phone" type="tel" autoComplete="tel" required maxLength={20} />
      </label>
      <fieldset className="specialties">
        <legend>{t('Especialidades · elige al menos una')}</legend>
        {WORKSHOP_SPECIALTIES.map((value) => (
          <label key={value}>
            <input type="checkbox" name="specialties" value={value} />
            {t(value)}
          </label>
        ))}
      </fieldset>
      <p className="small">
        {t(
          'Revisaremos tu solicitud antes de activar el perfil profesional. Registrarse no da acceso a información de clientes ni confirma la incorporación a la red.',
        )}
      </p>
    </fieldset>
  );
}
