
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (name: string, email: string) => void;
  updateUser: (userData: { name: string; email: string }) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('blog_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('blog_users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('blog_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('blog_users') || '[]');
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      return false;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password
    };
    
    users.push(newUser);
    localStorage.setItem('blog_users', JSON.stringify(users));
    
    // Auto-login after registration
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('blog_user', JSON.stringify(userWithoutPassword));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('blog_user');
  };

  const updateProfile = (name: string, email: string) => {
    if (user) {
      const updatedUser = { ...user, name, email };
      setUser(updatedUser);
      localStorage.setItem('blog_user', JSON.stringify(updatedUser));
      
      // Update in users array too
      const users = JSON.parse(localStorage.getItem('blog_users') || '[]');
      const updatedUsers = users.map((u: any) => 
        u.id === user.id ? { ...u, name, email } : u
      );
      localStorage.setItem('blog_users', JSON.stringify(updatedUsers));
    }
  };

  const updateUser = (userData: { name: string; email: string }) => {
    updateProfile(userData.name, userData.email);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      updateUser,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
