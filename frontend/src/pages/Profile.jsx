import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersAPI } from '../api';
import { useAuthStore } from '../store';

export default function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    const loadProfile = async () => {
      try {
        setError('');
        const response = await usersAPI.getProfile();
        setUser(response.data);
      } catch {
        setError('Impossible de charger le profil.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [isAuthenticated, navigate, setUser]);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <main className="min-h-screen bg-[#efefef] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <section className="bg-white px-6 py-8 shadow-sm sm:px-10">
          <h1 className="text-center text-3xl font-semibold text-slate-900 sm:text-4xl">
            Mon compte
          </h1>

          {loading ? (
            <p className="mt-8 text-center text-sm text-slate-500">Chargement...</p>
          ) : error ? (
            <div className="mt-8 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              <div className="border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-sm text-slate-500">Email</p>
                <p className="mt-1 text-lg font-medium text-slate-900">{user?.email}</p>
              </div>

              <div className="border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-sm text-slate-500">Role</p>
                <p className="mt-1 text-lg font-medium text-slate-900">{user?.role}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/catalogue')}
                  className="border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  Retour au catalogue
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="bg-[#f1c40f] px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-[#e1b80c]"
                >
                  Deconnexion
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
