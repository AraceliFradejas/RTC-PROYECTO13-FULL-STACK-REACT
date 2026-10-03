import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { credentials, registration } from '@kelsets-cars/contracts';
import { useAuth } from './AuthProvider.jsx';
export function AccessPage() {
  const { user, access } = useAuth();
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate(); const location = useLocation();
  const destination = location.state?.from || '/mi-cuenta';
  if (user) return <Navigate to={destination} replace />;
  async function submit(event) {
    event.preventDefault(); setError(''); setBusy(true);
    const input = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = (mode === 'login' ? credentials : registration).safeParse(input);
    if (!parsed.success) { setError(parsed.error.issues.map(issue => issue.message).join(' ')); setBusy(false); return; }
    try { await access(mode, parsed.data); navigate(destination, { replace: true }); }
    catch (error) { setError(error.message); }
    finally { setBusy(false); }
  }
  return <section className="page-shell access-shell"><div><p className="eyebrow">TU ESPACIO KelseTS</p><h1>El comienzo<br />de tu próximo camino.</h1><p>Consulta tus citas y organiza tu visita desde un mismo lugar.</p></div><div className="form-panel"><h2>{mode === 'login' ? 'Bienvenida de nuevo' : 'Crea tu cuenta'}</h2><form onSubmit={submit} aria-busy={busy}>
    {mode === 'register' && <label>Nombre<input name="name" autoComplete="name" required minLength={2} maxLength={80} /></label>}
    <label>Correo electrónico<input name="email" type="email" autoComplete="email" required /></label>
    <label>Contraseña<input name="password" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required minLength={10} maxLength={72} /></label>
    {mode === 'register' && <p className="small">Al menos 10 caracteres. Utiliza una contraseña exclusiva para este proyecto académico.</p>}
    {error && <p role="alert" className="form-error">{error}</p>}<button className="button" disabled={busy}>{busy ? 'Un momento…' : mode === 'login' ? 'Entrar' : 'Crear cuenta'}</button>
  </form><button className="text-button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }} disabled={busy}>{mode === 'login' ? '¿Es tu primera visita? Regístrate' : 'Ya tengo una cuenta'}</button></div></section>;
}
