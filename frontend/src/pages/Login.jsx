import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { authAPI } from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(email, password);
      login(response.data.token, response.data.role);
      navigate(response.data.role === 'ADMIN' ? '/admin' : '/catalogue');
    } catch (err) {
      setError(err.response?.data || 'Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-professional">
      <div className="professional-card rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-primary">🔐 Connexion</h1>
          <p className="text-muted">Accédez à votre compte</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">📧 Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 professional-input rounded-lg"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">🔑 Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 professional-input rounded-lg"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full professional-btn text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? '🔄 Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center mt-6 text-muted">
          Pas de compte? <a href="/register" className="text-secondary font-semibold hover:underline">S'inscrire</a>
        </p>
      </div>
    </div>
  );
}
