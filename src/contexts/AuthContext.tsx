import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, Artist } from '@/types';

interface AuthContextType {
  user: User | null;
  artist: Artist | null;
  isAuthenticated: boolean;
  isArtist: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  updateArtistProfile: (data: Partial<Artist>) => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  isArtist?: boolean;
  bio?: string;
  portfolio?: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'client@example.com',
    name: 'Marie Dupont',
    role: 'client',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    createdAt: new Date(),
  },
  {
    id: '2',
    email: 'artist@example.com',
    name: 'Jean-Pierre Martin',
    role: 'artist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    createdAt: new Date(),
  },
];

const mockArtist: Artist = {
  id: 'a1',
  userId: '2',
  bio: 'Artiste peintre passionné par les paysages impressionnistes. Plus de 15 ans d\'expérience.',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  phone: '+33 6 12 34 56 78',
  website: 'www.jeanpierre-art.com',
  portfolio: [],
  documents: [],
  status: 'approved',
  createdAt: new Date(),
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [artist, setArtist] = useState<Artist | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const foundUser = mockUsers.find((u) => u.email === email);
    if (!foundUser) {
      throw new Error('Email ou mot de passe incorrect');
    }
    
    setUser(foundUser);
    if (foundUser.role === 'artist') {
      setArtist(mockArtist);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: data.email,
      name: data.name,
      role: data.isArtist ? 'artist' : 'client',
      createdAt: new Date(),
    };
    
    setUser(newUser);
    
    if (data.isArtist) {
      const newArtist: Artist = {
        id: Math.random().toString(36).substr(2, 9),
        userId: newUser.id,
        bio: data.bio,
        portfolio: data.portfolio || [],
        documents: [],
        status: 'pending',
        createdAt: new Date(),
      };
      setArtist(newArtist);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setArtist(null);
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  }, [user]);

  const updateArtistProfile = useCallback((data: Partial<Artist>) => {
    if (artist) {
      setArtist({ ...artist, ...data });
    }
  }, [artist]);

  return (
    <AuthContext.Provider
      value={{
        user,
        artist,
        isAuthenticated: !!user,
        isArtist: user?.role === 'artist',
        login,
        register,
        logout,
        updateProfile,
        updateArtistProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
