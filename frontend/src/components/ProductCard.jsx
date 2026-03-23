import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link to={`/product/${product.id}`}>
      <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
        
        {/* Image Container */}
        <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 h-56 flex items-center justify-center overflow-hidden">
          {imageError || !product.imageUrl ? (
            <span className="text-6xl">👻</span>
          ) : (
            <img 
              src={product.imageUrl} 
              alt={product.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          )}
          
          {/* Badge */}
          {product.discount && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{product.discount}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category */}
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-2">
            {product.category || 'Produit'}
          </p>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(product.rating) ? '⭐' : '☆'}
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500">({product.reviews || 0})</span>
            </div>
          )}

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {product.price?.toFixed(2)}€
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {product.originalPrice?.toFixed(2)}€
                </span>
              )}
            </div>
            
            {/* Stock Status */}
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              product.stock > 0 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {product.stock > 0 ? 'En stock' : 'Rupture'}
            </span>
          </div>
        </div>

        {/* Hover CTA */}
        <div className="px-5 pb-5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition">
            Voir les détails
          </button>
        </div>
      </div>
    </Link>
  );
}
