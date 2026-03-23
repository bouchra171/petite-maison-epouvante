import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api';

const inputClassName =
  'h-11 w-full border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#d1a11d]';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);

    try {
      await authAPI.register({
        email: formData.email,
        password: formData.password,
      });

      navigate('/login', {
        state: {
          message: 'Compte cree avec succes. Vous pouvez maintenant vous connecter.',
        },
      });
    } catch (err) {
      const apiMessage = err.response?.data?.message || err.response?.data || '';

      if (typeof apiMessage === 'string' && apiMessage.toLowerCase().includes('already exists')) {
        setError('Cet email est deja utilise.');
      } else {
        setError('Inscription impossible pour le moment.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#efefef] px-4 py-12">
      <section className="w-full max-w-md bg-white px-8 py-10 shadow-sm">
        <h1 className="mb-8 text-center text-3xl font-semibold text-slate-900">
          Creer un compte
        </h1>

        {error && (
          <div className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-800">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((current) => ({ ...current, email: e.target.value }))}
              placeholder="Entrez votre email"
              className={inputClassName}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-800">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData((current) => ({ ...current, password: e.target.value }))}
              placeholder="Entrez votre mot de passe"
              className={inputClassName}
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-800">
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData((current) => ({ ...current, confirmPassword: e.target.value }))
              }
              placeholder="Confirmez votre mot de passe"
              className={inputClassName}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-[#f1c40f] px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-[#e1b80c] disabled:opacity-60"
          >
            {loading ? 'Creation...' : 'Valider'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Deja un compte ?{' '}
          <Link to="/login" className="font-medium text-[#a88008] hover:underline">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}
