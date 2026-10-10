import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { loginInput, accountRegistration, WORKSHOP_SPECIALTIES } from '@kelsets-cars/contracts';
import { useAuth } from './AuthProvider.jsx';
export function AccessForm() {
  const { t } = useLanguage();
  const { user, access } = useAuth();
  const [mode, setMode] = useState('login');
  const [accountType, setAccountType] = useState('client');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate(); const location = useLocation();
  const destination = accountType === 'workshop' ? '/mi-cuenta' : location.state?.from || '/mi-cuenta';
  if (user) return <Navigate to={user.accountType === 'workshop' ? '/mi-cuenta' : destination} replace />;
  async function submit(event) {
    event.preventDefault(); setError(''); setBusy(true);
    const form = new FormData(event.currentTarget);
    const input = Object.fromEntries(form);
    if (mode === 'login') input.portal = accountType;
    if (mode === 'register') {
      input.accountType = accountType;
      if (accountType === 'workshop') input.specialties = form.getAll('specialties');
    }
    const parsed = (mode === 'login' ? loginInput : accountRegistration).safeParse(input);
    if (!parsed.success) { setError(parsed.error.issues.map(issue => issue.message)); setBusy(false); return; }
    try { const current = await access(mode, parsed.data); navigate(current.accountType === 'workshop' ? '/mi-cuenta' : destination, { replace: true }); }
    catch (error) { setError(error.message); }
    finally { setBusy(false); }
  }
  return <div className="form-panel access-panel"><p className="eyebrow">{t("ÁREA PRIVADA")}</p><h2 id="access-form-title">{mode === 'login' ? t("Bienvenida de nuevo") : t("Crea tu cuenta")}</h2>
      {<div className="catalog-modes registration-types" aria-label={t("Tipo de cuenta")}><button type="button" disabled={busy} aria-pressed={accountType === 'client'} onClick={() => { setAccountType('client'); setError(''); }}>{t("Soy cliente")}</button><button type="button" disabled={busy} aria-pressed={accountType === 'workshop'} onClick={() => { setAccountType('workshop'); setError(''); }}>{t("Soy un taller")}</button><button type="button" disabled={busy} aria-pressed={accountType === 'team'} onClick={() => { setAccountType('team'); setMode('login'); setError(''); }}>KelseTS Cars Team</button></div>}
      {accountType === 'team' && <p className="small">{t("Acceso interno para cuentas autorizadas. Las cuentas de administración se crean de forma privada; no hay registro público.")}</p>}
      <form onSubmit={submit} aria-busy={busy}>
        {mode === 'register' && <label>{accountType === 'workshop' ? t("Persona de contacto") : t("Nombre")}<input name="name" autoComplete="name" required minLength={2} maxLength={80} /></label>}
        <label>{t("Correo electrónico")}<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
        <label>{t("Contraseña")}<input name="password" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required minLength={10} maxLength={72} /></label>
        {mode === 'register' && <p className="small">{t("Al menos 10 caracteres. Utiliza una contraseña exclusiva para este proyecto académico.")}</p>}
        {mode === 'register' && accountType === 'workshop' && <fieldset className="workshop-fields"><legend>{t("Tu taller")}</legend>
          <label>{t("Nombre del taller")}<input name="workshopName" autoComplete="organization" required minLength={2} maxLength={120} /></label>
          <label>{t("Ciudad")}<input name="city" autoComplete="address-level2" required minLength={2} maxLength={80} /></label>
          <label>{t("Dirección")}<input name="address" autoComplete="street-address" required minLength={5} maxLength={180} /></label>
          <label>{t("Teléfono")}<input name="phone" type="tel" autoComplete="tel" required maxLength={20} /></label>
          <fieldset className="specialties"><legend>{t("Especialidades · elige al menos una")}</legend>{WORKSHOP_SPECIALTIES.map(value => <label key={value}><input type="checkbox" name="specialties" value={value} />{t(value)}</label>)}</fieldset>
          <p className="small">{t("Revisaremos tu solicitud antes de activar el perfil profesional. Registrarse no da acceso a información de clientes ni confirma la incorporación a la red.")}</p>
        </fieldset>}
        {error && <p role="alert" className="form-error">{Array.isArray(error) ? error.map(t).join(' ') : t(error)}</p>}<button className="button" disabled={busy}>{busy ? t("Un momento…") : mode === 'login' ? t("Entrar") : accountType === 'workshop' ? t("Enviar solicitud de colaboración") : t("Crear cuenta")}</button>
      </form>
      {accountType !== 'team' && <button className="text-button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }} disabled={busy}>{mode === 'login' ? t("¿Es tu primera visita? Regístrate") : t("Ya tengo una cuenta")}</button>}
    </div>;
}
