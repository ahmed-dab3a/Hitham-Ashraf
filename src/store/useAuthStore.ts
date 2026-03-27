import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  subscription: {
    status: string;
    trialExpires: string;
    expiresAt?: string;
  };
  profile: any;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      updateUser: (updatedUser) => 
        set((state) => ({ 
          user: state.user ? { ...state.user, ...updatedUser } : null 
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);
