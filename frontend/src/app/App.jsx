import { ServicesPage } from '../features/brand/ServicesPage.jsx';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from '../shared/components/Layout.jsx';
import { HomePage } from '../features/brand/HomePage.jsx';
import { ExperiencePage } from '../features/brand/ExperiencePage.jsx';
import { ModelPage } from '../features/brand/ModelPage.jsx';
import { CreditsPage } from '../features/brand/CreditsPage.jsx';
import { CatalogPage } from '../features/catalog/CatalogPage.jsx';
import { VehiclePage } from '../features/catalog/VehiclePage.jsx';
import { DealershipsPage } from '../features/catalog/DealershipsPage.jsx';
import { AccessPage } from '../features/auth/AccessPage.jsx';
import { useAuth } from '../features/auth/AuthProvider.jsx';
import { AccountPage } from '../features/appointments/AccountPage.jsx';
import { NewAppointmentPage } from '../features/appointments/NewAppointmentPage.jsx';
function Protected({ children }) {
  const { user, ready, sessionError } = useAuth(); const location = useLocation();
  if (!ready) return <p className="notice" role="status">Comprobando sesión…</p>;
  if (sessionError && !user) return <p className="notice" role="alert">{sessionError} Vuelve a cargar la página para intentarlo de nuevo.</p>;
  return user ? children : <Navigate to="/acceso" state={{ from: location.pathname + location.search }} replace />;
}
export function App() {
  return <Routes><Route element={<Layout />}>
    <Route index element={<HomePage />} /><Route path="experiencia" element={<ExperiencePage />} />
    <Route path="modelos/:key" element={<ModelPage />} /><Route path="creditos" element={<CreditsPage />} />
    <Route path="catalogo" element={<CatalogPage />} /><Route path="vehiculos/:id" element={<VehiclePage />} />
    <Route path="servicios" element={<ServicesPage />} /><Route path="sedes" element={<DealershipsPage />} /><Route path="acceso" element={<AccessPage />} />
    <Route path="mi-cuenta" element={<Protected><AccountPage /></Protected>} />
    <Route path="citas/nueva" element={<Protected><NewAppointmentPage /></Protected>} />
    <Route path="*" element={<section className="page-shell"><h1>Ese camino no existe.</h1><a href="/">Volver al inicio</a></section>} />
  </Route></Routes>;
}
