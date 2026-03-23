import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productsAPI } from '../api';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(id);
      setProduct(response.data);

      // Fetch related products
      const allProducts = await productsAPI.getAll();
      const related = allProducts.data
        .filter(p => p.category === response.data.category && p.id !== response.data.id)
        .slice(0, 4);
      setRelatedProducts(related);
    } catch (err) {
      console.error('Erreur:', err);
      navigate('/catalogue');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    // Get current cart from localStorage
    const currentCart = localStorage.getItem('cart');
    const cartItems = currentCart ? JSON.parse(currentCart) : [];

    // Check if product already in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

    if (existingItemIndex >= 0) {
      // Update quantity if already exists
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        category: product.category,
        quantity: quantity
      });
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Dispatch custom event to update navbar cart count
    window.dispatchEvent(new Event('storage'));

    // Show success message
    alert(`${quantity} x ${product.name} ajouté${quantity > 1 ? 's' : ''} au panier !`);
  };

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin mb-4">
            <span className="text-5xl">⏳</span>
          </div>
          <p className="text-gray-600 font-medium">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  // Mock images array (replace with actual product images)
  const productImages = [
    product.imageUrl || null,
    // Add more image URLs if available
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-orange-600 transition">Accueil</Link>
            <span>/</span>
            <Link to="/catalogue" className="hover:text-orange-600 transition">Catalogue</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          {/* PRODUCT IMAGES */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg">
              {productImages[selectedImage] ? (
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-8xl">👻</span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="flex gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === index
                        ? 'border-orange-500 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PRODUCT INFO */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                {product.category || 'Produit'}
              </span>
              {product.stock > 0 ? (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  ✓ En stock
                </span>
              ) : (
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                  ✗ Rupture de stock
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl">
                    {i < (product.rating || 4) ? '⭐' : '☆'}
                  </span>
                ))}
              </div>
              <span className="text-gray-600">
                {(product.rating || 4.2).toFixed(1)} ({product.reviews || 24} avis)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">
                {product.price?.toFixed(2)}€
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  {product.originalPrice?.toFixed(2)}€
                </span>
              )}
              {product.discount && (
                <span className="px-2 py-1 bg-red-500 text-white rounded text-sm font-bold">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-900">
                Quantité
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-x-2 border-gray-200 py-3 focus:outline-none"
                    min="1"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.stock} disponible{product.stock !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                🛒 Ajouter au panier - {(product.price * quantity)?.toFixed(2)}€
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-orange-500 hover:text-orange-600 transition">
                  <span>❤️</span>
                  Favoris
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-orange-500 hover:text-orange-600 transition">
                  <span>📤</span>
                  Partager
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Caractéristiques</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Référence:</span>
                  <span className="font-mono text-gray-900">#{product.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Catégorie:</span>
                  <span className="text-gray-900">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison:</span>
                  <span className="text-green-600">24-48h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Retours:</span>
                  <span className="text-green-600">30 jours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT DETAILS TABS */}
        <div className="border-t border-gray-200 pt-12">
          <div className="mb-8">
            <nav className="flex gap-8">
              {[
                { id: 'description', label: 'Description', icon: '📝' },
                { id: 'specifications', label: 'Spécifications', icon: '⚙️' },
                { id: 'reviews', label: 'Avis', icon: '⭐' },
                { id: 'shipping', label: 'Livraison', icon: '🚚' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === tab.id
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-orange-600'
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Description détaillée</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {product.description}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Découvrez ce produit unique dans notre collection exclusive. Chaque pièce est sélectionnée
                  avec soin pour offrir une expérience exceptionnelle à nos clients passionnés.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Spécifications techniques</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-900">Dimensions</span>
                      <span className="text-gray-600">30 x 20 x 15 cm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-900">Poids</span>
                      <span className="text-gray-600">500g</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-900">Matériau</span>
                      <span className="text-gray-600">Premium</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-900">Origine</span>
                      <span className="text-gray-600">France</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-900">Garantie</span>
                      <span className="text-gray-600">2 ans</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-900">Certification</span>
                      <span className="text-gray-600">CE</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Avis clients</h3>
                <div className="space-y-6">
                  {[
                    { name: 'Marie L.', rating: 5, comment: 'Produit exceptionnel, livraison rapide !', date: '2024-01-15' },
                    { name: 'Pierre D.', rating: 4, comment: 'Très satisfait de mon achat.', date: '2024-01-10' },
                    { name: 'Sophie M.', rating: 5, comment: 'Au-delà de mes attentes !', date: '2024-01-08' }
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{review.name}</span>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>{i < review.rating ? '⭐' : '☆'}</span>
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations de livraison</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Délais de livraison</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• France métropolitaine : 24-48h</li>
                      <li>• Europe : 3-5 jours</li>
                      <li>• International : 5-7 jours</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Frais de port</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Gratuit dès 50€ d'achat</li>
                      <li>• France : 4.90€</li>
                      <li>• Europe : 9.90€</li>
                      <li>• International : 14.90€</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Produits similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
