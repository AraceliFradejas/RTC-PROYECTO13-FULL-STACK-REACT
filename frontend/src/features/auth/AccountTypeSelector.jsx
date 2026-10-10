import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';

const ACCOUNT_TYPES = [
  { value: 'client', label: 'Soy cliente' },
  { value: 'workshop', label: 'Soy un taller' },
  { value: 'team', label: 'KelseTS Cars Team' },
];

export function AccountTypeSelector({ value, busy, onChange }) {
  const { t } = useLanguage();
  return (
    <div className="catalog-modes registration-types" role="group" aria-label={t('Tipo de cuenta')}>
      {ACCOUNT_TYPES.map((type) => (
        <button
          key={type.value}
          type="button"
          disabled={busy}
          aria-pressed={value === type.value}
          onClick={() => onChange(type.value)}
        >
          {type.value === 'team' ? type.label : t(type.label)}
        </button>
      ))}
    </div>
  );
}
