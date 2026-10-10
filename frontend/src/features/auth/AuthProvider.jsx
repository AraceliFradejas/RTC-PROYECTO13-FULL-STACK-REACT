import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../../shared/services/api.js';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [sessionError, setSessionError] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    api.auth
      .me({ signal: controller.signal })
      .then((value) => {
        if (!controller.signal.aborted) setUser(value);
      })
      .catch((error) => {
        if (!controller.signal.aborted && error.status !== 401)
          setSessionError('No se ha podido comprobar tu sesión.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setReady(true);
      });
    return () => controller.abort();
  }, []);
  async function access(mode, input) {
    const value = await api.auth[mode](input);
    setUser(value);
    setSessionError(null);
    return value;
  }
  async function logout() {
    await api.auth.logout();
    setUser(null);
  }
  async function refresh() {
    const value = await api.auth.me();
    setUser(value);
    setSessionError(null);
    return value;
  }
  return (
    <AuthContext.Provider value={{ user, ready, sessionError, access, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
