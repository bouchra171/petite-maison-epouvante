import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store';
import ProductVisual from '../components/ProductVisual';

export default function Cart() {
  const cartItems = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 4.9;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#efefef] px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-4xl bg-white px-6 py-12 text-center shadow-sm sm:px-10">
          <h1 className="text-3xl font-semibold text-slate-900">Votre panier est vide</h1>
          <p className="mt-4 text-sm text-slate-600">
            Ajoutez des produits depuis le catalogue.
          </p>
          <Link
            to="/catalogue"
            className="mt-8 inline-block bg-[#f1c40f] px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-[#e1b80c]"
          >
            Voir le catalogue
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#efefef] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="bg-white px-6 py-8 shadow-sm sm:px-10">
          <h1 className="text-center text-3xl font-semibold text-slate-900 sm:text-4xl">
            Mon panier
          </h1>
          <p className="mt-3 text-center text-sm text-slate-600">
            Verifiez vos produits avant validation.
          </p>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <section className="space-y-4">
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="bg-white px-6 py-6 shadow-sm sm:px-8"
              >
                <div className="flex flex-col gap-5 sm:flex-row">
                  <ProductVisual product={item} className="h-24 w-24" />

                  <div className="flex-1">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">{item.name}</h2>
                        <p className="mt-1 text-sm text-slate-500">{item.category}</p>
                        <p className="mt-3 text-base font-medium text-slate-900">
                          {Number(item.price).toFixed(2)} EUR
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center border border-slate-300">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                          >
                            -
                          </button>
                          <span className="min-w-12 border-x border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-red-700 transition hover:underline"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>

                    <div className="mt-5 border-t border-slate-200 pt-4 text-right text-sm text-slate-700">
                      Sous-total : {(item.price * item.quantity).toFixed(2)} EUR
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={clearCart}
                className="border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                Vider le panier
              </button>

              <Link
                to="/catalogue"
                className="border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                Continuer mes achats
              </Link>
            </div>
          </section>

          <aside className="h-fit bg-white px-6 py-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Recapitulatif</h2>

            <div className="mt-6 space-y-4 text-sm text-slate-700">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{subtotal.toFixed(2)} EUR</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison</span>
                <span>{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} EUR`}</span>
              </div>
              <div className="border-t border-slate-200 pt-4 text-base font-semibold text-slate-900">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>{total.toFixed(2)} EUR</span>
                </div>
              </div>
            </div>

            {subtotal < 50 && (
              <p className="mt-5 text-sm text-slate-600">
                Plus que {(50 - subtotal).toFixed(2)} EUR pour la livraison gratuite.
              </p>
            )}

            <button
              type="button"
              className="mt-6 w-full bg-[#f1c40f] px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-[#e1b80c]"
            >
              Proceder au paiement
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
