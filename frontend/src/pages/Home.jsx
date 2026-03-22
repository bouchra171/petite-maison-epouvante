import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-white/20" />
        <div className="relative max-w-7xl mx-auto px-4 text-center py-20">
          <h1 className="text-5xl md:text-6xl font-bold text-primary drop-shadow-sm mb-4 fade-in">
            🏢 Petite Maison Épouvante
          </h1>
          <p className="text-xl md:text-2xl text-muted mb-8 max-w-3xl mx-auto slide-in">
            Découvrez notre catalogue de produits uniques et d'accessoires de qualité dans un environnement professionnel et sécurisé.
          </p>
          <Link
            to="/catalogue"
            className="inline-block professional-btn text-white px-8 py-3 rounded-lg font-semibold shadow-lg"
          >
            Explorer le Catalogue
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 space-y-8 md:space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="professional-card p-6 rounded-xl fade-in">
            <h3 className="text-xl font-bold mb-3 text-primary">🔒 Sécurité</h3>
            <p className="text-muted">Plateforme sécurisée avec authentification avancée et protection des données.</p>
          </article>
          <article className="professional-card p-6 rounded-xl slide-in">
            <h3 className="text-xl font-bold mb-3 text-primary">📱 Responsive</h3>
            <p className="text-muted">Navigation fluide sur tous les appareils avec menu burger optimisé.</p>
          </article>
          <article className="professional-card p-6 rounded-xl fade-in">
            <h3 className="text-xl font-bold mb-3 text-primary">⚡ Performance</h3>
            <p className="text-muted">Interface rapide et moderne développée avec les dernières technologies.</p>
          </article>
        </div>

        <div className="professional-card rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-primary mb-3">Bienvenue dans notre plateforme</h2>
          <p className="text-muted mb-6">Créez votre compte pour accéder à notre catalogue complet et bénéficier de fonctionnalités exclusives.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link className="professional-btn text-white px-6 py-3 rounded-lg font-bold" to="/register">
              Créer un compte
            </Link>
            <Link className="border-2 border-secondary text-secondary px-6 py-3 rounded-lg font-bold hover:bg-secondary hover:text-white transition duration-300" to="/login">
              Se connecter
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
