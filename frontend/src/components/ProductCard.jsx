import { Link } from 'react-router-dom';
import { useCartStore } from '../store';
import ProductVisual from './ProductVisual';

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  const isAvailable = product.stock == null || product.stock > 0;

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <article className="overflow-hidden bg-white shadow-sm transition hover:shadow-md">
      <Link to={`/product/${product.id}`} className="block">
        <ProductVisual product={product} className="m-6 h-52" />

        <div className="space-y-3 px-6 pb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            {product.category || 'Produit'}
          </p>

          <h2 className="line-clamp-2 text-xl font-semibold text-slate-900">{product.name}</h2>

          <p className="line-clamp-2 text-sm leading-6 text-slate-600">{product.description}</p>

          <div className="flex items-center justify-between gap-3 pt-2">
            <span className="text-xl font-semibold text-slate-900">
              {Number(product.price).toFixed(2)} EUR
            </span>
            <span className={`text-xs ${isAvailable ? 'text-green-700' : 'text-red-600'}`}>
              {isAvailable ? 'Disponible' : 'Rupture'}
            </span>
          </div>
        </div>
      </Link>

      <div className="px-6 pb-6">
        <button
          type="button"
          onClick={addToCart}
          disabled={!isAvailable}
          className="w-full bg-[#f1c40f] px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-[#e1b80c] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isAvailable ? 'Ajouter au panier' : 'Indisponible'}
        </button>
      </div>
    </article>
  );
}
