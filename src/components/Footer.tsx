import { Link } from "react-router-dom";
import { categories } from "../lib/data";
import { useLinaStore } from "../store/useLinaStore";
import { IconHeart } from "./icons";

const ig = "https://instagram.com";

export function Footer() {
  const purchaseMode = useLinaStore((s) => s.purchaseMode);
  return (
    <footer className="mt-20 bg-lr-surfaceDeep text-lr-onDark">
      <div className="lr-container py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-4xl italic tracking-tight">Lina & Roma</p>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-lr-onDark/85">
              Slow fashion femenino desde Guadalajara. Piezas con materiales naturales y producción consciente.
            </p>
            <p className="mt-6 font-sans text-xs uppercase tracking-[0.2em] text-lr-gold">Atelier · Col. Americana</p>
            <div className="mt-6 flex gap-4">
              <a href={ig} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-lr-onDark/20 hover:border-lr-gold" aria-label="Instagram">
                <span className="text-xs tracking-widest">IG</span>
              </a>
              <a href={ig} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-lr-onDark/20 hover:border-lr-gold" aria-label="Pinterest">
                <span className="text-xs tracking-widest">PI</span>
              </a>
            </div>
          </div>
          <div>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-gold">Tienda</p>
            <ul className="mt-4 space-y-3 font-body text-sm">
              <li>
                <Link className="hover:text-lr-rose" to="/tienda">
                  Toda la colección
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link className="hover:text-lr-rose" to={`/tienda/${c.slug}`}>
                    {c.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-gold">Información</p>
            <ul className="mt-4 space-y-3 font-body text-sm">
              <li>
                <Link className="hover:text-lr-rose" to="/historia">
                  Historia
                </Link>
              </li>
              <li>
                <Link className="hover:text-lr-rose" to="/cuidados">
                  Cuidados
                </Link>
              </li>
              <li>
                <span className="text-lr-onDark/70">Envíos</span>
              </li>
              <li>
                <span className="text-lr-onDark/70">Devoluciones</span>
              </li>
              <li>
                <Link className="hover:text-lr-rose" to="/contacto">
                  Contacto
                </Link>
              </li>
              {purchaseMode === "cart" ? (
                <>
                  <li>
                    <Link className="hover:text-lr-rose" to="/carrito">
                      Carrito
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-lr-rose" to="/checkout">
                      Checkout
                    </Link>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
          <div>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-gold">Newsletter</p>
            <p className="mt-3 font-body text-sm leading-relaxed text-lr-onDark/85">Recibe nuestras nuevas colecciones primero.</p>
            <form
              className="mt-4 flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="email"
                placeholder="tu@correo.com"
                className="min-h-[48px] border-0 border-b border-lr-rose/50 bg-transparent font-body text-sm outline-none placeholder:text-lr-onDark/40"
              />
              <button
                type="submit"
                className="min-h-[48px] rounded-sm bg-lr-rose/90 font-sans text-xs font-medium uppercase tracking-[0.2em] text-lr-text hover:bg-lr-rose"
              >
                Suscribirme
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-lr-gold/40">
        <div className="lr-container flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-lr-onDark/70">© {new Date().getFullYear()} Lina & Roma · Demo Nexium</p>
          <p className="flex items-center gap-2 font-sans text-xs text-lr-onDark/60">
            <IconHeart className="h-3.5 w-3.5" /> Términos · Privacidad · Nexium
          </p>
        </div>
      </div>
    </footer>
  );
}
