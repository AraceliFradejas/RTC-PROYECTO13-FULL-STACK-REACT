import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from '../../shared/hooks/useReducedMotion.js';
import { heroMedia } from './heroMedia.js';
export function CinematicHero() {
  const { t } = useLanguage();
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);
  const reduced = useReducedMotion();
  const video = useRef(null);
  const showVideo = Boolean(heroMedia.videoSrc) && !videoFailed;
  const toggleSound = () => {
    const element = video.current;
    if (!element) return;
    element.muted = !muted;
    setMuted(!muted);
    if (muted && !reduced) {
      setPaused(false);
      element.play().catch(() => setPaused(true));
    }
  };
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const update = () => {
      if (paused || reduced || document.hidden) element.pause();
      else element.play().catch(() => setPaused(true));
    };
    update(); document.addEventListener('visibilitychange', update);
    return () => { element.pause(); document.removeEventListener('visibilitychange', update); };
  }, [paused, reduced, showVideo]);
  return <section className={`cinematic-hero ${paused || reduced ? 'motion-paused' : ''}`} aria-label={t("Descubre KelseTS Cars")}>
    <div className="cinematic-media" aria-hidden="true"><img src={heroMedia.poster} alt="" className="cinematic-frame active" fetchPriority="high" />
      {showVideo && <video ref={video} className="cinematic-video" src={heroMedia.videoSrc} poster={heroMedia.poster} muted={muted} loop playsInline preload={reduced ? 'none' : 'metadata'} onError={() => setVideoFailed(true)} />}
    </div>
    <div className="cinematic-shade" />
    <div className="cinematic-copy"><p className="eyebrow">KelseTS Cars</p><h1>{t("El camino")}<br />{t("es tuyo.")}</h1><Link className="cinematic-cta" to="/catalogo">{t("Explorar la colección")} <span aria-hidden="true">↗</span></Link></div>
    <div className="cinematic-bottom"><a className="scroll-cue" href="#seleccion"><span aria-hidden="true">↓</span> {t("Sigue el camino")}</a><div className="hero-playback-controls">{showVideo && <button className="motion-control sound-control" onClick={toggleSound} aria-label={muted ? t("Activar sonido") : t("Desactivar sonido")} aria-pressed={!muted}><span aria-hidden="true">{muted ? "♪ ×" : "♪"}</span><span>{muted ? t("Activar sonido") : t("Silenciar")}</span></button>}{showVideo && <button className="motion-control" onClick={() => setPaused(value => !value)} disabled={reduced} aria-label={paused || reduced ? t("Reanudar movimiento") : t("Pausar movimiento")}>{paused || reduced ? '▷' : 'Ⅱ'}<span>{reduced ? t("Movimiento reducido") : paused ? t("Reanudar") : t("Pausar")}</span></button>}</div></div>
    <span className="scene-caption">{t("Película de marca · Escena conceptual")}</span>
  </section>;
}
