import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-[#121b2f] border border-secondary/50 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.45)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition transform hover:-translate-y-1 overflow-hidden">
        <div className="bg-gradient-to-r from-[#2a2f52] via-[#36254d] to-[#2a2f52] h-48 flex items-center justify-center">
          <span className="text-6xl">🕯️</span>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 text-white">{product.name}</h3>
          <p className="text-gray-300 text-sm mb-2 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-secondary font-bold text-lg">{product.price.toFixed(2)}€</span>
            <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-xs">{product.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
