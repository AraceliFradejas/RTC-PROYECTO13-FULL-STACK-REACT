import { useEffect, useReducer, useState } from 'react';
import { initialResource, resourceReducer } from './resourceState.js';
export function useResource(load) {
  const [state, dispatch] = useReducer(resourceReducer, initialResource);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    dispatch({ type: 'start' });
    Promise.resolve().then(() => load(controller.signal)).then(data => {
      if (!controller.signal.aborted) dispatch({ type: 'success', data });
    }).catch(error => {
      if (!controller.signal.aborted) dispatch({ type: 'error', error });
    });
    return () => controller.abort();
  }, [load, attempt]);
  return { ...state, retry: () => setAttempt(value => value + 1), setData: data => dispatch({ type: 'success', data }) };
}
