import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore, useCartStore } from '../store';

export default function Navbar() {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const { user, isAuthenticated, logout } = useAuthStore();

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-semibold text-slate-950 sm:text-2xl">
          La Petite Maison
        </Link>

        <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-700 sm:gap-6">
          <Link to="/catalogue" className="transition hover:text-slate-950">
            Catalogue
          </Link>
          <Link to="/cart" className="transition hover:text-slate-950">
            Panier{cartCount > 0 ? ` (${cartCount})` : ''}
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile" className="transition hover:text-slate-950">
                Mon compte
              </Link>
              {user?.role === 'ADMIN' && (
                <Link to="/admin" className="transition hover:text-slate-950">
                  Administration
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="border border-slate-300 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                Deconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="transition hover:text-slate-950">
                Inscription
              </Link>
              <Link to="/login" className="transition hover:text-slate-950">
                Connexion
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
