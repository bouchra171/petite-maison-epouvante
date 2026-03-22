import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);

    try {
      await authAPI.register(email, password);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-professional">
      <div className="professional-card rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-primary">👤 Inscription</h1>
          <p className="text-muted">Créez votre compte</p>
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

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">🔐 Confirmer</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? '🔄 Inscription...' : 'Créer un compte'}
          </button>
        </form>

        <p className="text-center mt-6 text-muted">
          Déjà inscrit? <Link to="/login" className="text-secondary font-semibold hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
