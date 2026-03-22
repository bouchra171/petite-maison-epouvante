import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),

  login: (token, role) => {
    localStorage.setItem('token', token);
    set({ token, isAuthenticated: true, user: { role } });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, isAuthenticated: false, user: null });
  },

  setUser: (user) => set({ user }),
}));
