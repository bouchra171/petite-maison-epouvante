import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  const addToCart = (e) => {
    e.preventDefault(); // Prevent navigation to product detail
    e.stopPropagation();

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Dispatch custom event to update cart count
    window.dispatchEvent(new Event('storage'));
    
    // Show success message
    alert('Produit ajouté au panier !');
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      
      <Link to={`/product/${product.id}`}>
        {/* Image Container */}
        <div className="relative bg-gray-50 h-56 flex items-center justify-center overflow-hidden">
          {imageError || !product.imageUrl ? (
            <span className="text-6xl">👻</span>
          ) : (
            <img 
              src={product.imageUrl} 
              alt={product.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          
          {/* Badge */}
          {product.discount && (
            <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
              -{product.discount}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category */}
          <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">
            {product.category || 'Produit'}
          </p>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {product.price?.toFixed(2)}€
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {product.originalPrice?.toFixed(2)}€
                </span>
              )}
            </div>
            
            {/* Stock Status */}
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              product.stock > 0 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {product.stock > 0 ? 'En stock' : 'Rupture'}
            </span>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="px-6 pb-6">
        <button 
          onClick={addToCart}
          disabled={!product.stock || product.stock <= 0}
          className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {product.stock > 0 ? 'Ajouter au panier' : 'Indisponible'}
        </button>
      </div>
    </div>
  );
}
