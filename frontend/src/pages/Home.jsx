import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="w-full bg-background">
      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-6xl lg:text-7xl font-light text-foreground mb-8 leading-tight">
                La Petite Maison
                <br />
                <span className="font-medium text-secondary">de l'Épouvante</span>
              </h1>

              <p className="text-xl text-gray-400 mb-12 max-w-lg mx-auto lg:mx-0">
                Découvrez une sélection exclusive de produits uniques dans une atmosphère mystérieuse et captivante.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/catalogue"
                  className="px-10 py-4 bg-secondary text-white rounded-lg font-medium text-lg hover:bg-secondary/80 transition-all duration-300"
                >
                  Explorer
                </Link>
                <Link
                  to="/register"
                  className="px-10 py-4 border border-gray-600 text-gray-300 rounded-lg font-medium text-lg hover:bg-gray-800 transition-all duration-300"
                >
                  S'inscrire
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="w-96 h-96 bg-gray-800 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-9xl">🏠</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-foreground mb-4">
              Pourquoi nous choisir
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-secondary/10 rounded-full shadow-lg flex items-center justify-center mx-auto mb-8 border border-secondary/20">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-4">Sécurité</h3>
              <p className="text-gray-400 leading-relaxed">
                Paiements sécurisés et protection de vos données.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-secondary/10 rounded-full shadow-lg flex items-center justify-center mx-auto mb-8 border border-secondary/20">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-4">Livraison</h3>
              <p className="text-gray-400 leading-relaxed">
                Expédition rapide avec suivi en temps réel.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-secondary/10 rounded-full shadow-lg flex items-center justify-center mx-auto mb-8 border border-secondary/20">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-4">Support</h3>
              <p className="text-gray-400 leading-relaxed">
                Équipe disponible 24/7 pour vous accompagner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-foreground mb-6">
            Prêt à découvrir ?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Rejoignez notre communauté exclusive.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/register"
              className="px-10 py-4 bg-secondary text-white rounded-lg font-medium text-lg hover:bg-secondary/80 transition-all duration-300"
            >
              Créer un compte
            </Link>
            <Link
              to="/catalogue"
              className="px-10 py-4 border border-gray-600 text-gray-300 rounded-lg font-medium text-lg hover:bg-gray-800 transition-all duration-300"
            >
              Voir les produits
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-32 bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-foreground mb-4">
            Restez informé
          </h2>
          <p className="text-gray-400 mb-12">
            Recevez nos nouveautés par email.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 px-6 py-4 border border-gray-600 rounded-lg bg-gray-800 text-foreground focus:outline-none focus:ring-1 focus:ring-secondary transition"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/80 transition-all duration-300"
            >
              S'abonner
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
