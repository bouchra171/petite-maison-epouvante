import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { useState } from 'react';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpen(false);
  };

  const toogle = () => setOpen((prev) => !prev);

  return (
    <nav className="professional-nav fixed w-full z-20">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-primary hover:text-secondary transition duration-300"
          onClick={() => setOpen(false)}
        >
          🏢 Petite Maison Épouvante
        </Link>

        <button
          onClick={toogle}
          className="md:hidden text-2xl p-2 rounded hover:bg-gray-100 transition duration-300"
          aria-label="Ouvrir le menu"
        >
          {open ? '✕' : '☰'}
        </button>

        <div className="hidden md:flex gap-6 items-center">
          <Link to="/catalogue" className="text-primary hover:text-secondary transition duration-300 font-medium" onClick={() => setOpen(false)}>
            📚 Catalogue
          </Link>
          {isAuthenticated && user?.role === 'ADMIN' && (
            <Link to="/admin" className="text-primary hover:text-secondary transition duration-300 font-medium" onClick={() => setOpen(false)}>
              ⚙️ Admin
            </Link>
          )}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300 font-semibold"
            >
              🚪 Déconnexion
            </button>
          ) : (
            <>
              <Link to="/login" className="text-primary hover:text-secondary transition duration-300 font-medium" onClick={() => setOpen(false)}>
                🔐 Connexion
              </Link>
              <Link
                to="/register"
                className="professional-btn text-white px-6 py-2 rounded-lg"
                onClick={() => setOpen(false)}
              >
                ✨ Inscription
              </Link>
            </>
          )}
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white/95 border-t border-gray-200 backdrop-blur-md shadow-lg">
          <div className="flex flex-col px-6 py-4 gap-3">
            <Link to="/catalogue" className="text-lg text-primary hover:text-secondary transition duration-300 font-medium" onClick={() => setOpen(false)}>
              📚 Catalogue
            </Link>
            {isAuthenticated && user?.role === 'ADMIN' && (
              <Link to="/admin" className="text-lg text-primary hover:text-secondary transition duration-300 font-medium" onClick={() => setOpen(false)}>
                ⚙️ Admin
              </Link>
            )}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-left text-lg text-red-500 hover:text-red-600 transition duration-300 font-semibold"
              >
                🚪 Déconnexion
              </button>
            ) : (
              <>
                <Link to="/login" className="text-lg text-primary hover:text-secondary transition duration-300 font-medium" onClick={() => setOpen(false)}>
                  🔐 Connexion
                </Link>
                <Link
                  to="/register"
                  className="text-lg text-secondary hover:text-blue-600 transition duration-300 font-semibold"
                  onClick={() => setOpen(false)}
                >
                  ✨ Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
