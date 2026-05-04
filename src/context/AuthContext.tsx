import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api } from '../api/client';

export type AuthUser = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<{ data: AuthUser }>('/api/auth/profile')
      .then(({ data }) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post<{ data: AuthUser }>('/api/auth/login', { email, password });
    setUser(res.data);
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await api.post<{ data: AuthUser }>('/api/auth/register', { name, email, password });
    setUser(res.data);
  };

  const logout = async () => {
    await api.post('/api/auth/logout', {}).catch(() => null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
