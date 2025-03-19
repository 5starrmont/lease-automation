
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { users } from '@/lib/data';
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  role: UserRole | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for saved user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('rentalUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call with a timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would be an API call to validate credentials
        const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (foundUser && password === '123456') { // Simple password for demo
          setUser(foundUser);
          localStorage.setItem('rentalUser', JSON.stringify(foundUser));
          toast.success(`Welcome back, ${foundUser.name}!`);
          resolve(true);
        } else {
          toast.error('Invalid email or password');
          resolve(false);
        }
        
        setIsLoading(false);
      }, 800);
    });
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('rentalUser');
    toast.info('You have been logged out');
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    role: user?.role || null,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
