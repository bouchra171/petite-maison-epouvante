import { useEffect, useMemo, useState } from 'react';
import { productsAPI } from '../api';
import ProductCard from '../components/ProductCard';

const categories = ['Decoration', 'Costumes', 'Accessoires', 'Lumieres', 'Sons'];

export default function Catalogue() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    let nextProducts = [...products];

    if (normalizedQuery) {
      nextProducts = nextProducts.filter((product) =>
        [product.name, product.description, product.category]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedQuery))
      );
    }

    if (selectedCategory) {
      nextProducts = nextProducts.filter((product) => product.category === selectedCategory);
    }

    if (sortBy === 'price-asc') {
      nextProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      nextProducts.sort((a, b) => b.price - a.price);
    } else {
      nextProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    return nextProducts;
  }, [products, searchQuery, selectedCategory, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await productsAPI.getAll();
      setProducts(response.data);
    } catch {
      setError('Impossible de charger les produits.');
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSortBy('name');
  };

  return (
    <main className="min-h-screen bg-[#efefef] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="bg-white px-6 py-8 shadow-sm sm:px-10">
          <h1 className="text-center text-3xl font-semibold text-slate-900 sm:text-4xl">
            Catalogue
          </h1>
          <p className="mt-3 text-center text-sm text-slate-600">
            Trouvez rapidement vos produits.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-[1fr_220px_160px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un produit"
              className="h-11 w-full border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#d1a11d]"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-11 w-full border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#d1a11d]"
            >
              <option value="">Toutes les categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 w-full border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#d1a11d]"
            >
              <option value="name">Nom</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix decroissant</option>
            </select>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
            >
              Reinitialiser
            </button>
          </div>
        </section>

        <section>
          {loading ? (
            <div className="bg-white px-6 py-10 text-center text-sm text-slate-500 shadow-sm">
              Chargement...
            </div>
          ) : error ? (
            <div className="bg-white px-6 py-10 shadow-sm">
              <p className="text-sm text-red-700">{error}</p>
              <button
                type="button"
                onClick={fetchProducts}
                className="mt-4 border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                Reessayer
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white px-6 py-10 text-center shadow-sm">
              <p className="text-lg font-medium text-slate-900">Aucun produit trouve</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
