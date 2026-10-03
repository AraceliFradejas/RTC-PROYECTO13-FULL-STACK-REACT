import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
export function Reveal({ children, className = '', as: Element = 'div', id }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (reduced || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: .08 });
    setReady(true);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reduced]);
  return <Element ref={ref} id={id} className={`${className} reveal ${ready && !reduced ? 'reveal-ready' : ''} ${visible ? 'is-visible' : ''}`}>{children}</Element>;
}
