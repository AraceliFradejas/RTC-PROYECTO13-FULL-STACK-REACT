import photos from '../../../../data/media/vehicles.json';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from '../../shared/hooks/useReducedMotion.js';
import { heroMedia } from './heroMedia.js';
const scenes = [
  { key: 'kelsets-drive', title: 'El camino\nes tuyo.', label: '01 / ELÉCTRICO', name: 'KelseTS Cars', image: heroMedia.poster },
  { key: 'ferrari-roma', title: 'Siente cada\ninstante.', label: '02 / DEPORTIVO', name: 'Ferrari Roma', image: '/images/vehicles/ferrari-roma.jpg' },
  { key: 'porsche-taycan', title: 'Otra forma\nde avanzar.', label: '03 / INNOVACIÓN', name: 'Porsche Taycan', image: '/images/vehicles/porsche-taycan.jpg' },
];
export function CinematicHero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const reduced = useReducedMotion();
  const video = useRef(null);
  const scene = scenes[index];
  const showVideo = Boolean(heroMedia.videoSrc) && index === 0 && !videoFailed;
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
  return <section className={`cinematic-hero ${paused || reduced ? 'motion-paused' : ''}`} aria-label="Descubre KelseTS Cars">
    <div className="cinematic-media" aria-hidden="true">{scenes.map((item, position) => <img key={item.key} src={item.image} srcSet={photos.find(photo => photo.src === item.image)?.srcSet} sizes="100vw" alt="" className={`cinematic-frame ${position === index ? 'active' : ''}`} loading={position === 0 ? 'eager' : 'lazy'} />)}
      {showVideo && <video ref={video} className="cinematic-video" src={heroMedia.videoSrc} poster={heroMedia.poster} muted loop playsInline preload={reduced ? 'none' : 'metadata'} onError={() => setVideoFailed(true)} />}
    </div>
    <div className="cinematic-shade" />
    <div className="cinematic-copy" key={scene.key}><p className="eyebrow">{scene.name}</p><h1>{scene.title.split('\n').map((line, i) => <span key={line}>{line}{i === 0 && <br />}</span>)}</h1><Link className="cinematic-cta" to="/catalogo">Explorar la colección <span aria-hidden="true">↗</span></Link></div>
    <div className="cinematic-bottom"><a className="scroll-cue" href="#seleccion"><span aria-hidden="true">↓</span> Sigue el camino</a><div className="scene-controls" aria-label="Elegir imagen del hero">{scenes.map((item, position) => <button key={item.key} aria-label={`Mostrar ${item.name}`} aria-pressed={index === position} onClick={() => setIndex(position)}><span>{String(position + 1).padStart(2, '0')}</span><i /></button>)}</div><button className="motion-control" onClick={() => setPaused(value => !value)} disabled={reduced} aria-label={paused || reduced ? 'Reanudar movimiento' : 'Pausar movimiento'}>{paused || reduced ? '▷' : 'Ⅱ'}<span>{reduced ? 'Movimiento reducido' : paused ? 'Reanudar' : 'Pausar'}</span></button></div>
    <span className="scene-caption">{index === 0 ? 'Película de marca · Escena conceptual' : `${scene.name} · Imagen ilustrativa`}</span>
  </section>;
}
