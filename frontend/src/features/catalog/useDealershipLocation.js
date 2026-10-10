import { useCallback, useEffect, useRef, useState } from 'react';

const LOCATION_TIMEOUT_MS = 30_000;
const LOCATION_MAX_AGE_MS = 300_000;
const LOCATION_ERRORS = {
  1: 'El acceso a tu ubicación está bloqueado. En Safari, revisa Ajustes → Sitios web → Ubicación y, en macOS, Ajustes del Sistema → Privacidad y seguridad → Localización → Safari. Después vuelve a intentarlo, o elige tu punto en el mapa.',
  2: 'El dispositivo no ha podido determinar tu ubicación. Comprueba que la localización está activada en el sistema, o elige tu punto en el mapa.',
  3: 'El dispositivo ha tardado demasiado en obtener tu ubicación. Puedes volver a intentarlo o elegir tu punto en el mapa.',
};

export function useDealershipLocation() {
  const [position, setPosition] = useState(null);
  const [selected, setSelected] = useState(null);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState('');
  const [picking, setPicking] = useState(false);
  const active = useRef(true);
  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
    };
  }, []);

  const choosePosition = useCallback((point) => {
    setPosition(point);
    setSelected(null);
    setPicking(false);
    setError('');
  }, []);

  function clearPosition() {
    setPosition(null);
    setSelected(null);
    setPicking(false);
  }

  function locate() {
    if (!navigator.geolocation) {
      setError(
        'Tu navegador no permite geolocalización. Puedes explorar las cuatro sedes en el mapa.',
      );
      return;
    }
    if (!window.isSecureContext) {
      setError(
        'La ubicación automática necesita HTTPS o localhost. Abre la vista previa en http://localhost:5173/sedes o elige tu punto en el mapa.',
      );
      return;
    }
    setLocating(true);
    setPicking(false);
    setError('');
    navigator.geolocation.getCurrentPosition(
      (result) => {
        if (!active.current) return;
        choosePosition({ latitude: result.coords.latitude, longitude: result.coords.longitude });
        setLocating(false);
      },
      (failure) => {
        if (!active.current) return;
        setLocating(false);
        setError(
          LOCATION_ERRORS[failure.code] ||
            'No se ha podido obtener tu ubicación. Elige tu punto en el mapa.',
        );
      },
      { enableHighAccuracy: false, timeout: LOCATION_TIMEOUT_MS, maximumAge: LOCATION_MAX_AGE_MS },
    );
  }

  return {
    position,
    selected,
    setSelected,
    locating,
    error,
    picking,
    setPicking,
    choosePosition,
    locate,
    clearPosition,
  };
}
