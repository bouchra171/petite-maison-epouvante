import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsAPI, usersAPI } from '../api';
import { useAuthStore } from '../store';

const emptyForm = {
  name: '',
  description: '',
  price: '',
  category: '',
  imageUrl: '',
};

const inputClassName =
  'h-11 w-full border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#d1a11d]';

const textAreaClassName =
  'min-h-[120px] w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#d1a11d]';

export default function Admin() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState('');
  const [productsError, setProductsError] = useState('');
  const [usersError, setUsersError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadProducts();
    loadUsers();
  }, []);

  const loadProducts = async () => {
    try {
      setLoadingProducts(true);
      setProductsError('');
      const response = await productsAPI.getAll();
      setProducts(response.data);
    } catch {
      setProductsError('Impossible de charger les produits.');
    } finally {
      setLoadingProducts(false);
    }
  };

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      setUsersError('');
      const response = await usersAPI.getAll();
      setUsers(response.data);
    } catch {
      setUsersError("Impossible de charger les utilisateurs.");
    } finally {
      setLoadingUsers(false);
    }
  };

  const refreshData = async () => {
    await Promise.all([loadProducts(), loadUsers()]);
  };

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const payload = {
      ...formData,
      price: Number(formData.price),
    };

    try {
      if (editingId) {
        await productsAPI.update(editingId, payload);
        setSuccessMessage('Produit modifie avec succes.');
      } else {
        await productsAPI.create(payload);
        setSuccessMessage('Produit cree avec succes.');
      }

      resetForm();
      await refreshData();
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || 'Une erreur est survenue.');
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price ?? '',
      category: product.category || '',
      imageUrl: product.imageUrl || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce produit ?')) {
      return;
    }

    setError('');
    setSuccessMessage('');

    try {
      await productsAPI.delete(id);
      setSuccessMessage('Produit supprime.');
      if (editingId === id) {
        resetForm();
      }
      await loadProducts();
    } catch {
      setError('Impossible de supprimer ce produit.');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Supprimer cet utilisateur ?')) {
      return;
    }

    setError('');
    setSuccessMessage('');

    try {
      await usersAPI.delete(id);
      setSuccessMessage('Utilisateur supprime.');
      await loadUsers();
    } catch {
      setError("Impossible de supprimer cet utilisateur.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <main className="min-h-screen bg-[#efefef] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="bg-white px-6 py-8 shadow-sm sm:px-10">
          <div className="mb-6 flex justify-end">
            <button
              type="button"
              onClick={handleLogout}
              className="border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
            >
              Deconnexion
            </button>
          </div>

          <h1 className="text-center text-3xl font-semibold text-slate-900 sm:text-4xl">
            Administration
          </h1>
          <p className="mt-3 text-center text-sm text-slate-600">
            Gerer les produits et consulter les comptes.
          </p>

          <div className="mt-6 border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
            <p className="font-medium text-slate-900">Connecte en tant que</p>
            <p className="mt-1">{user?.email}</p>
          </div>

          {error && (
            <div className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mt-4 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {successMessage}
            </div>
          )}
        </section>

        <section className="bg-white px-6 py-8 shadow-sm sm:px-10">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                {editingId ? 'Modifier le produit' : 'Nouveau produit'}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Remplissez les champs puis validez.
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                Annuler
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-800">
                Nom
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className={inputClassName}
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="mb-2 block text-sm font-medium text-slate-800">
                Categorie
              </label>
              <input
                id="category"
                type="text"
                value={formData.category}
                onChange={(e) => updateField('category', e.target.value)}
                className={inputClassName}
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="mb-2 block text-sm font-medium text-slate-800">
                Prix
              </label>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => updateField('price', e.target.value)}
                className={inputClassName}
                required
              />
            </div>

            <div>
              <label htmlFor="imageUrl" className="mb-2 block text-sm font-medium text-slate-800">
                Image URL
              </label>
              <input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={(e) => updateField('imageUrl', e.target.value)}
                className={inputClassName}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="mb-2 block text-sm font-medium text-slate-800">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                className={textAreaClassName}
                required
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-[#f1c40f] px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-[#e1b80c]"
              >
                {editingId ? 'Enregistrer' : 'Creer le produit'}
              </button>
            </div>
          </form>
        </section>

        <section className="bg-white px-6 py-8 shadow-sm sm:px-10">
          <h2 className="mb-6 text-2xl font-semibold text-slate-900">Produits</h2>

          {productsError && (
            <div className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {productsError}
            </div>
          )}

          {loadingProducts ? (
            <p className="text-sm text-slate-500">Chargement...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] border border-slate-200">
                <thead className="bg-slate-50">
                  <tr className="text-left text-sm text-slate-700">
                    <th className="border-b border-slate-200 px-4 py-3 font-medium">Produit</th>
                    <th className="border-b border-slate-200 px-4 py-3 font-medium">Categorie</th>
                    <th className="border-b border-slate-200 px-4 py-3 font-medium">Prix</th>
                    <th className="border-b border-slate-200 px-4 py-3 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="text-sm text-slate-700">
                      <td className="border-b border-slate-200 px-4 py-3">
                        <div className="font-medium text-slate-900">{product.name}</div>
                        <div className="mt-1 text-xs text-slate-500">{product.description}</div>
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">{product.category}</td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        {Number(product.price).toFixed(2)} EUR
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(product)}
                            className="border border-slate-300 px-3 py-2 text-xs text-slate-700 transition hover:bg-slate-50"
                          >
                            Modifier
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(product.id)}
                            className="border border-red-300 px-3 py-2 text-xs text-red-700 transition hover:bg-red-50"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="bg-white px-6 py-8 shadow-sm sm:px-10">
          <h2 className="mb-6 text-2xl font-semibold text-slate-900">Utilisateurs</h2>

          {usersError && (
            <div className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {usersError}
            </div>
          )}

          {loadingUsers ? (
            <p className="text-sm text-slate-500">Chargement...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] border border-slate-200">
                <thead className="bg-slate-50">
                  <tr className="text-left text-sm text-slate-700">
                    <th className="border-b border-slate-200 px-4 py-3 font-medium">Email</th>
                    <th className="border-b border-slate-200 px-4 py-3 font-medium">Role</th>
                    <th className="border-b border-slate-200 px-4 py-3 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item) => (
                    <tr key={item.id} className="text-sm text-slate-700">
                      <td className="border-b border-slate-200 px-4 py-3">{item.email}</td>
                      <td className="border-b border-slate-200 px-4 py-3">{item.role}</td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(item.id)}
                            disabled={item.email === user?.email}
                            className="border border-red-300 px-3 py-2 text-xs text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
