import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  role: 'producer' | 'buyer' | 'regulator';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Simple role-based authentication
    let role: 'producer' | 'buyer' | 'regulator';
    
    if (username.toLowerCase().includes('producer')) {
      role = 'producer';
    } else if (username.toLowerCase().includes('buyer')) {
      role = 'buyer';
    } else if (username.toLowerCase().includes('regulator')) {
      role = 'regulator';
    } else {
      return false;
    }

    const newUser = { username, role };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};