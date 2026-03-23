import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authAPI } from '../api';
import { useAuthStore } from '../store';
import heroHauntedHouse from '../assets/hero-haunted-house.jpg';

const inputClassName =
  'h-11 w-full border border-slate-400 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#d1a11d]';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const successMessage = useMemo(() => location.state?.message ?? '', [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      login({
        token: response.data.token,
        user: {
          email: formData.email,
          role: response.data.role,
        },
      });

      const destination =
        location.state?.from || (response.data.role === 'ADMIN' ? '/admin' : '/catalogue');
      navigate(destination, { replace: true });
    } catch (err) {
      const apiMessage = err.response?.data?.message || err.response?.data || '';

      if (typeof apiMessage === 'string' && apiMessage.toLowerCase().includes('invalid credentials')) {
        setError('Email ou mot de passe incorrect.');
      } else {
        setError('Connexion impossible pour le moment.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-12"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${heroHauntedHouse})` }}
    >
      <section className="w-full max-w-sm bg-white px-6 py-6 shadow-lg">
        {successMessage && (
          <div className="mb-4 border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-4 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-800">
              Username *
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((current) => ({ ...current, email: e.target.value }))}
              placeholder="Enter your Username"
              className={inputClassName}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-800">
              Password *
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData((current) => ({ ...current, password: e.target.value }))}
              placeholder="Enter your Password"
              className={inputClassName}
              required
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-3.5 w-3.5 border-slate-300"
            />
            Remember me
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f1c40f] px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-[#e1b80c] disabled:opacity-60"
          >
            {loading ? 'Connexion...' : 'Connexion'}
          </button>
        </form>

        <div className="mt-8 space-y-2 text-center text-sm">
          <p className="text-white/0">.</p>
          <p className="text-slate-600">Mot de passe oublie ?</p>
          <p className="text-[#a88008]">
            Vous n'avez pas de compte ?{' '}
            <Link to="/register" className="font-medium hover:underline">
              Creer un compte
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
