import { LanguageSwitch } from '../i18n/LanguageSwitch.jsx';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { BrandLogo } from './BrandLogo.jsx';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../features/auth/AuthProvider.jsx';
export function Layout() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isHome = location.pathname === '/';
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [isHome]);
  const main = useRef(null);
  const previousPath = useRef(location.pathname);
  useEffect(() => {
    const pathChanged = previousPath.current !== location.pathname;
    previousPath.current = location.pathname;
    if (location.hash) {
      const frame = requestAnimationFrame(() => {
        const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (target) { target.focus({ preventScroll: true }); target.scrollIntoView({ block: 'start' }); }
      });
      return () => cancelAnimationFrame(frame);
    }
    if (pathChanged) {
      main.current?.focus(); window.scrollTo({ top: 0 });
    }
  }, [location.pathname, location.hash]);
  return <>
    <a className="skip-link" href="#contenido">{t("Saltar al contenido")}</a>
    <header className={`site-header ${isHome ? 'cinematic-header' : ''} ${isHome && scrolled ? 'is-scrolled' : ''}`}>
      <Link className="wordmark" to="/" aria-label={t("KelseTS Cars, inicio")}><BrandLogo /></Link>
      <nav aria-label={t("Navegación principal")}><NavLink to="/catalogo">{t("Colección")}</NavLink><NavLink to="/servicios">{t("Servicios")}</NavLink><NavLink to="/experiencia">{t("Nuestra esencia")}</NavLink><NavLink to="/sedes">{t("Sedes")}</NavLink></nav>
      <LanguageSwitch /><Link className="account-link" to={user ? '/mi-cuenta' : '/acceso'}>{user ? t("Mi cuenta") : t("Acceder")} <span aria-hidden="true">↗</span></Link>
    </header>
    <main id="contenido" ref={main} tabIndex={-1}><Outlet /></main>
    <footer className="site-footer"><div><Link className="wordmark footer-wordmark" to="/" aria-label={t("KelseTS Cars, inicio")}><BrandLogo /></Link><p>{t("El carácter se lleva dentro.")}<br />{t("El camino lo eliges tú.")}</p></div><div><p>Madrid · Barcelona<br />San Sebastián · Málaga</p><Link to="/creditos">{t("Fotografías y créditos")}</Link></div><p className="legal">{t("Marca ficticia · Proyecto académico de Araceli Fradejas Muñoz.")}<br />{t("Sin vinculación con los fabricantes. Las fotografías ilustran modelos, no unidades a la venta.")}</p></footer>
  </>;
}
