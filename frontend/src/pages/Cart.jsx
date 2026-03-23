import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load cart from localStorage or API
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }

    const updatedItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const removeItem = (productId) => {
    const updatedItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // TODO: Implement checkout process
    alert('Fonctionnalité de paiement à implémenter');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="mb-8">
              <span className="text-8xl">🛒</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Votre panier est vide
            </h1>
            <p className="text-gray-600 mb-8">
              Découvrez nos produits et commencez vos achats !
            </p>
            <Link
              to="/catalogue"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-orange-500/50 transition"
            >
              Explorer le catalogue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mon Panier
          </h1>
          <p className="text-gray-600">
            {getTotalItems()} article{getTotalItems() !== 1 ? 's' : ''} dans votre panier
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👻</span>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {item.category}
                    </p>
                    <p className="text-gray-900 font-bold">
                      {item.price?.toFixed(2)}€
                    </p>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex flex-col items-end gap-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center border-2 border-gray-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 border-x-2 border-gray-200 font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium transition"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-gray-600">Sous-total:</span>
                  <span className="font-bold text-gray-900">
                    {(item.price * item.quantity)?.toFixed(2)}€
                  </span>
                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-between items-center">
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 font-medium transition"
              >
                Vider le panier
              </button>
              <Link
                to="/catalogue"
                className="text-orange-600 hover:text-orange-700 font-medium transition"
              >
                Continuer mes achats
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Récapitulatif
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Sous-total ({getTotalItems()} article{getTotalItems() !== 1 ? 's' : ''})
                  </span>
                  <span className="font-medium">{getTotalPrice()?.toFixed(2)}€</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison</span>
                  <span className="font-medium">
                    {getTotalPrice() >= 50 ? 'Gratuite' : '4.90€'}
                  </span>
                </div>

                {getTotalPrice() < 50 && (
                  <p className="text-sm text-gray-500">
                    Plus que {(50 - getTotalPrice())?.toFixed(2)}€ pour la livraison gratuite
                  </p>
                )}

                <hr className="border-gray-200" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-orange-600">
                    {(getTotalPrice() + (getTotalPrice() >= 50 ? 0 : 4.90))?.toFixed(2)}€
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-orange-500/50 transition-all transform hover:scale-105 disabled:opacity-50"
              >
                {loading ? 'Traitement...' : 'Procéder au paiement'}
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Paiement sécurisé SSL
                </p>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-900 mb-3">
                  Moyens de paiement acceptés
                </p>
                <div className="flex justify-center gap-2">
                  <div className="w-8 h-6 bg-blue-600 rounded text-xs text-white flex items-center justify-center font-bold">V</div>
                  <div className="w-8 h-6 bg-red-600 rounded text-xs text-white flex items-center justify-center font-bold">M</div>
                  <div className="w-8 h-6 bg-blue-800 rounded text-xs text-white flex items-center justify-center font-bold">P</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}