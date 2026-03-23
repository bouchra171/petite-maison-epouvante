import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { productsAPI } from '../api';
import ProductCard from '../components/ProductCard';
import { useCartStore } from '../store';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ProductVisual from '../components/ProductVisual';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(id);
      setProduct(response.data);

      const allProducts = await productsAPI.getAll();
      setRelatedProducts(
        allProducts.data
          .filter((item) => item.category === response.data.category && item.id !== response.data.id)
          .slice(0, 3)
      );
    } catch (err) {
      navigate('/catalogue');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Card className="p-12 text-center text-slate-500">Chargement du produit...</Card>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const isAvailable = product.stock == null || product.stock > 0;

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-orange-100 bg-orange-50/60">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-accent">Accueil</Link>
            <span>/</span>
            <Link to="/catalogue" className="hover:text-accent">Catalogue</Link>
            <span>/</span>
            <span className="text-slate-950">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <Card className="p-8">
            <ProductVisual product={product} className="aspect-square" />
          </Card>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-accent">
                {product.category || 'Produit'}
              </span>
              <span className={`rounded-full px-4 py-2 text-sm font-medium ${isAvailable ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                {isAvailable ? 'Disponible' : 'Rupture'}
              </span>
            </div>

            <div>
              <h1 className="text-4xl font-semibold text-slate-950">{product.name}</h1>
              <p className="mt-4 max-w-xl leading-8 text-slate-600">{product.description}</p>
            </div>

            <p className="text-4xl font-semibold text-slate-950">{product.price?.toFixed(2)}€</p>

            <Card className="p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Quantité</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {product.stock == null
                      ? 'Ajout immédiat au panier'
                      : `${product.stock} disponible${product.stock !== 1 ? 's' : ''}`}
                  </p>
                </div>
                <div className="flex items-center rounded-full border border-orange-200 bg-orange-50">
                  <button
                    onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                    className="px-4 py-3 text-slate-600"
                  >
                    -
                  </button>
                  <span className="min-w-12 border-x border-orange-200 px-4 py-3 text-center font-medium text-slate-950">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((current) => current + 1)}
                    className="px-4 py-3 text-slate-600"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                onClick={() => addItem(product, quantity)}
                disabled={!isAvailable}
                className="mt-6 w-full"
                size="lg"
              >
                Ajouter au panier
              </Button>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-slate-950">À propos de ce produit</h2>
              <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                <p>Référence #{product.id}</p>
                <p>Catégorie {product.category}</p>
                <p>Livraison rapide</p>
                <p>Retours sous 30 jours</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="border-t border-orange-100 bg-orange-50/40">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold text-slate-950">Produits similaires</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
