import { create } from 'zustand';
import { getUserFromToken, isTokenExpired } from './utils/auth';

const TOKEN_STORAGE_KEY = 'token';
const USER_STORAGE_KEY = 'user';
const CART_STORAGE_KEY = 'cart';

function readStoredAuth() {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  const storedUser = localStorage.getItem(USER_STORAGE_KEY);

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    return { token: null, user: null };
  }

  const parsedStoredUser = storedUser ? JSON.parse(storedUser) : null;
  const decodedUser = getUserFromToken(token);
  const user = parsedStoredUser ?? decodedUser;

  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }

  return { token, user };
}

function readStoredCart() {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!storedCart) {
    return [];
  }

  try {
    const cart = JSON.parse(storedCart);
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
}

function persistCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

const initialAuth = readStoredAuth();
const initialCart = readStoredCart();

export const useAuthStore = create((set) => ({
  token: initialAuth.token,
  user: initialAuth.user,
  isAuthenticated: Boolean(initialAuth.token && initialAuth.user),

  login: ({ token, user }) => {
    const nextUser = user ?? getUserFromToken(token);

    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    if (nextUser) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    }

    set({
      token,
      user: nextUser,
      isAuthenticated: Boolean(token && nextUser),
    });
  },

  hydrate: () => {
    const auth = readStoredAuth();
    set({
      token: auth.token,
      user: auth.user,
      isAuthenticated: Boolean(auth.token && auth.user),
    });
  },

  logout: () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    set({ token: null, user: null, isAuthenticated: false });
  },

  setUser: (user) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    set({ user });
  },
}));

export const useCartStore = create((set, get) => ({
  items: initialCart,

  hydrate: () => {
    set({ items: readStoredCart() });
  },

  addItem: (product, quantity = 1) => {
    const normalizedQuantity = Math.max(1, Number(quantity) || 1);
    const currentItems = get().items;
    const existingItem = currentItems.find((item) => item.id === product.id);
    const nextItems = existingItem
      ? currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + normalizedQuantity }
            : item
        )
      : [
          ...currentItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl ?? null,
            category: product.category ?? 'Produit',
            quantity: normalizedQuantity,
          },
        ];

    persistCart(nextItems);
    set({ items: nextItems });
  },

  updateQuantity: (productId, quantity) => {
    const normalizedQuantity = Math.max(0, Number(quantity) || 0);
    const nextItems =
      normalizedQuantity <= 0
        ? get().items.filter((item) => item.id !== productId)
        : get().items.map((item) =>
            item.id === productId ? { ...item, quantity: normalizedQuantity } : item
          );

    persistCart(nextItems);
    set({ items: nextItems });
  },

  removeItem: (productId) => {
    const nextItems = get().items.filter((item) => item.id !== productId);
    persistCart(nextItems);
    set({ items: nextItems });
  },

  clearCart: () => {
    localStorage.removeItem(CART_STORAGE_KEY);
    set({ items: [] });
  },
}));
