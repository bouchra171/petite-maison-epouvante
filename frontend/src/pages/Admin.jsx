import { useState, useEffect } from 'react';
import { productsAPI } from '../api';
import { useAuthStore } from '../store';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  useEffect(() => {
    if (user?.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data);
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await productsAPI.update(editingId, formData);
        alert('Produit modifié');
      } else {
        await productsAPI.create(formData);
        alert('Produit créé');
      }
      setFormData({ name: '', description: '', price: '', category: '' });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      alert('Erreur: ' + err.response?.data || err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData(product);
  };

  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr?')) {
      try {
        await productsAPI.delete(id);
        fetchProducts();
      } catch (err) {
        alert('Erreur: ' + err.message);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-light min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-primary">Dashboard Admin</h1>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-primary">
          {editingId ? 'Modifier le produit' : 'Ajouter un produit'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nom"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <input
              type="text"
              placeholder="Catégorie"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <input
              type="number"
              placeholder="Prix"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              required
              step="0.01"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button
              type="submit"
              className="bg-secondary text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600"
            >
              {editingId ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            rows="3"
          />
        </form>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-2xl font-bold p-8 border-b text-primary">Produits ({products.length})</h2>
        {loading ? (
          <p className="p-8">Chargement...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left">Nom</th>
                  <th className="px-6 py-3 text-left">Catégorie</th>
                  <th className="px-6 py-3 text-left">Prix</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{product.name}</td>
                    <td className="px-6 py-3">{product.category}</td>
                    <td className="px-6 py-3 font-bold text-secondary">{product.price.toFixed(2)}€</td>
                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-accent text-white px-4 py-1 rounded mr-2 hover:bg-blue-700"
                      >
                        Éditer
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
