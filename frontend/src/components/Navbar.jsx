import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Load cart count from localStorage
    const updateCartCount = () => {
      const cart = localStorage.getItem('cart');
      if (cart) {
        const items = JSON.parse(cart);
        const count = items.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();
    // Listen for storage changes
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed w-full top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo / Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="bg-primary p-2 rounded-lg shadow-sm">
              <span className="text-xl font-bold text-white">👻</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-gray-900">
                La Petite Maison
              </h1>
              <p className="text-xs text-gray-600">de l'Épouvante</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/catalogue" 
              className="text-gray-700 hover:text-primary font-medium transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Catalogue
            </Link>
            {isAuthenticated && user?.role === 'ADMIN' && (
              <Link 
                to="/admin" 
                className="text-gray-700 hover:text-primary font-medium transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
          </div>

          {/* Auth Buttons / Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-primary transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13h10m0 0v8a2 2 0 002-2v-3a2 2 0 00-2-2H9a2 2 0 00-2 2v3a2 2 0 002 2z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">{user?.name || 'Utilisateur'}</p>
                  <p className="text-gray-600 text-xs">{user?.role === 'ADMIN' ? 'Admin' : 'Client'}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-primary hover:bg-orange-50 rounded-lg font-medium transition"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-primary font-medium transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link 
                  to="/register"
                  className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-accent transition shadow-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Inscription
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition text-gray-700"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
            
            {/* Cart Link Mobile */}
            <Link 
              to="/cart" 
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13h10m0 0v8a2 2 0 002-2v-3a2 2 0 00-2-2H9a2 2 0 00-2 2v3a2 2 0 002 2z" />
              </svg>
              Panier {cartCount > 0 && `(${cartCount})`}
            </Link>

            <Link 
              to="/catalogue" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Catalogue
            </Link>
            {isAuthenticated && user?.role === 'ADMIN' && (
              <Link 
                to="/admin" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            <div className="border-t border-gray-200 pt-3">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 mb-2">
                    <p className="font-semibold text-gray-900">{user?.name || 'Utilisateur'}</p>
                    <p className="text-gray-600 text-xs">{user?.role === 'ADMIN' ? 'Admin' : 'Client'}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-primary hover:bg-orange-50 rounded-lg font-medium transition text-left"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link 
                    to="/register"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Inscription
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
