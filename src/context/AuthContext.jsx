import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState({ user: null, membership: null, loading: true });
  const refresh = async () => {
    try {
      const result = await api('/auth/me');
      setSession({ ...result.data, loading: false });
      return result.data;
    } catch { setSession({ user: null, membership: null, loading: false }); return null; }
  };
  useEffect(() => { refresh(); }, []);
  const logout = async () => { await api('/auth/logout', { method: 'POST' }); setSession({ user: null, membership: null, loading: false }); };
  return <AuthContext.Provider value={{ ...session, refresh, logout, setSession }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
