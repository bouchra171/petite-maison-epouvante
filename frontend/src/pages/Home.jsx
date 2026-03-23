import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Récupérer les produits en vedette depuis le backend
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products');
      if (response.ok) {
        const data = await response.json();
        setFeaturedProducts(data.slice(0, 3)); // Top 3 produits
      }
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
    }
  };

  return (
    <main className="w-full">
      {/* HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Background avec gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

        {/* Contenu Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <div className="mb-8 animate-bounce">
            <span className="text-7xl md:text-8xl">👻</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Bienvenue à la
            <span className="block bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
              Petite Maison Épouvante
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Découvrez une sélection exclusive de produits uniques dans une atmosphère captivante et mystérieuse. 
            Qualité premium, sécurité garantie, expérience inoubliable.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link 
              to="/catalogue"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-orange-500/50 transition transform hover:scale-105"
            >
              Explorer le Catalogue
            </Link>
            <Link 
              to="/register"
              className="px-8 py-4 border-2 border-orange-500 text-orange-600 rounded-lg font-bold text-lg hover:bg-orange-50 transition"
            >
              S'inscrire Gratuitement
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-orange-600">+500</p>
              <p className="text-gray-600">Produits Uniques</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-orange-600">+10K</p>
              <p className="text-gray-600">Clients Satisfaits</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-orange-600">24/7</p>
              <p className="text-gray-600">Support Client</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      {featuredProducts.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Produits en Vedette
              </h2>
              <p className="text-lg text-gray-600">
                Nos sélections premium pour cette saison
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                to="/catalogue"
                className="inline-flex items-center gap-2 px-6 py-3 text-orange-600 font-semibold hover:text-orange-700 transition"
              >
                Voir tous les produits
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FEATURES SECTION */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Sécurité Absolue</h3>
              <p className="text-gray-600">
                Paiements sécurisés, authentification avancée et protection complète de vos données personnelles.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Livraison Rapide</h3>
              <p className="text-gray-600">
                Expédition rapide dans toute la France. Suivi en temps réel et garantie de satisfaction.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Support Premium</h3>
              <p className="text-gray-600">
                Equipe disponible 24/7 pour répondre à toutes vos questions. Chat, email, téléphone.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à explorer ?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Rejoignez notre communauté de passionnés et accédez à des offres exclusives.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register"
              className="px-8 py-4 bg-white text-orange-600 rounded-lg font-bold text-lg hover:shadow-xl transition transform hover:scale-105"
            >
              Créer mon compte
            </Link>
            <Link 
              to="/catalogue"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition"
            >
              Parcourir le Catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Restez Informé
          </h2>
          <p className="text-gray-600 mb-8">
            Recevez nos dernières nouveautés et offres exclusives directement dans votre boîte mail.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Votre email"
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition"
              required
            />
            <button 
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold hover:shadow-lg transition"
            >
              S'abonner
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            Nous ne partageons jamais vos données. Désinscription rapide possible.
          </p>
        </div>
      </section>
    </main>
  );
}
