import { useState, useEffect } from 'react';
import { productsAPI } from '../api';
import ProductCard from '../components/ProductCard';

export default function Catalogue() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll();
      setProducts(response.data);
    } catch (err) {
      setError('Impossible de charger les produits');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = filter
    ? products.filter(p => p.category.toLowerCase().includes(filter.toLowerCase()))
    : products;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-primary">Catalogue Produits</h1>

      {/* Filter */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Filtrer par catégorie..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Chargement des produits...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun produit trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
