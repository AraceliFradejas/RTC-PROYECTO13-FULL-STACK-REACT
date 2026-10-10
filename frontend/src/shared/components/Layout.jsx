import { SiteFooter } from './SiteFooter.jsx';
import { LanguageSwitch } from '../i18n/LanguageSwitch.jsx';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { BrandLogo } from './BrandLogo.jsx';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../features/auth/AuthProvider.jsx';
const HEADER_SCROLL_THRESHOLD_PX = 80;

export function Layout() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);
  const [scrolled, setScrolled] = useState(false);
  const isHome = location.pathname === '/';
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > HEADER_SCROLL_THRESHOLD_PX);
    update();
    window.addEventListener('scroll', update, { passive: true });
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
        if (target) {
          target.focus({ preventScroll: true });
          target.scrollIntoView({ block: 'start' });
        }
      });
      return () => cancelAnimationFrame(frame);
    }
    if (pathChanged) {
      main.current?.focus();
      window.scrollTo({ top: 0 });
    }
  }, [location.pathname, location.hash]);
  return (
    <>
      <a className="skip-link" href="#contenido">
        {t('Saltar al contenido')}
      </a>
      <header
        onClick={(event) => {
          if (event.target.closest('a')) setMenuOpen(false);
        }}
        className={`site-header ${isHome ? 'cinematic-header' : ''} ${isHome && scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}
      >
        <Link className="wordmark" to="/" aria-label={t('KelseTS Cars, inicio')}>
          <BrandLogo />
        </Link>
        <button
          ref={menuButton}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-navigation header-tools"
          aria-label={t(menuOpen ? 'Cerrar menú' : 'Abrir menú')}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>{t(menuOpen ? 'Cerrar' : 'Menú')}</span>
        </button>
        <nav id="site-navigation" aria-label={t('Navegación principal')}>
          <NavLink to="/catalogo">{t('Colección')}</NavLink>
          <NavLink to="/servicios">{t('Servicios')}</NavLink>
          <NavLink to="/experiencia">{t('Nuestra esencia')}</NavLink>
          <NavLink to="/sedes">{t('Sedes')}</NavLink>
        </nav>
        <div id="header-tools" className="header-tools">
          <LanguageSwitch />
          <Link className="account-link" to={user ? '/mi-cuenta' : '/acceso'}>
            {user ? t('Mi cuenta') : t('Acceder')} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </header>
      <main id="contenido" ref={main} tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
