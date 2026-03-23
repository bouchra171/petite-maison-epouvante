import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import heroHauntedHouse from '../assets/hero-haunted-house.jpg';

export default function Home() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <button className="flex items-center gap-3 rounded-2xl bg-primary px-5 py-4 text-sm font-semibold text-white shadow-sm">
            <span className="flex flex-col gap-1">
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
            </span>
            Tous les produits
          </button>

          <Link
            to="/catalogue"
            className="hidden rounded-2xl border border-slate-200 px-5 py-4 text-sm font-medium text-slate-600 md:block"
          >
            Voir le catalogue
          </Link>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_-36px_rgba(15,23,42,0.22)]">
          <div
            className="relative min-h-[500px] bg-cover bg-center"
            style={{ backgroundImage: `linear-gradient(90deg, rgba(2, 6, 23, 0.6), rgba(2, 6, 23, 0.15)), url(${heroHauntedHouse})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/30 to-slate-950/10" />

            <div className="relative flex min-h-[500px] items-center justify-center px-8 py-10 text-center sm:px-12 lg:px-16">
              <div className="max-w-3xl">
                <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
                  Entrez dans
                  <br />
                  la Petite Maison
                  <br />
                  de l'Épouvante
                </h1>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button as={Link} to="/catalogue" size="lg">
                    Explorer
                  </Button>
                  <Button as={Link} to="/register" variant="secondary" size="lg" className="bg-white text-slate-900 border-white hover:bg-slate-100">
                    Créer un compte
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
