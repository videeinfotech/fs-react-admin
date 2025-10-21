import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface AuthContextType {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  login: (token: string, role: string) => void;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for a token and role in local storage on initial load.
    const storedToken = localStorage.getItem('jwt');
    const storedRole = localStorage.getItem('role');
    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((newToken: string, newRole: string) => {
    setToken(newToken);
    setRole(newRole);
    localStorage.setItem('jwt', newToken);
    localStorage.setItem('role', newRole);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
  }, []);

  const value = {
    token,
    role,
    isAuthenticated: !!token,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
