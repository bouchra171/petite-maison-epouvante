import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsAPI } from '../api';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productsAPI.getById(id);
      setProduct(response.data);
    } catch (err) {
      console.error('Erreur:', err);
      navigate('/catalogue');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Chargement...</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    alert(`${quantity} x ${product.name} ajouté au panier!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/catalogue')}
        className="mb-8 text-secondary hover:underline flex items-center gap-2"
      >
        ← Retour au catalogue
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg h-96 flex items-center justify-center">
          <span className="text-9xl">🎭</span>
        </div>

        {/* Détails */}
        <div>
          <h1 className="text-4xl font-bold mb-4 text-primary">{product.name}</h1>
          
          <div className="mb-6">
            <span className="inline-block bg-accent text-white px-4 py-1 rounded mb-4">
              {product.category}
            </span>
          </div>

          <p className="text-xl text-secondary font-bold mb-6">{product.price.toFixed(2)}€</p>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-8">
            <label className="block text-sm font-medium text-primary mb-2">Quantité</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-300 text-primary px-4 py-2 rounded hover:bg-gray-400"
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center border rounded px-3 py-2"
                min="1"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-300 text-primary px-4 py-2 rounded hover:bg-gray-400"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-secondary text-white py-3 rounded-lg font-bold text-lg hover:bg-orange-600 transition"
          >
            Ajouter au panier
          </button>

          {/* Caractéristiques */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-bold mb-4 text-primary">Caractéristiques</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex justify-between">
                <span>Produit ID:</span>
                <span className="font-mono text-primary">#{product.id}</span>
              </li>
              <li className="flex justify-between">
                <span>Catégorie:</span>
                <span className="font-medium text-primary">{product.category}</span>
              </li>
              <li className="flex justify-between">
                <span>Disponibilité:</span>
                <span className="text-green-600 font-medium">En stock</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
