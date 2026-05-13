import { Link, Navigate } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { formatPrice } from "../lib/data";
import { useLinaStore } from "../store/useLinaStore";
import { products } from "../lib/data";

export default function CartPage() {
  const purchaseMode = useLinaStore((s) => s.purchaseMode);
  const cart = useLinaStore((s) => s.cart);
  const updateQty = useLinaStore((s) => s.updateQty);
  const removeFromCart = useLinaStore((s) => s.removeFromCart);

  if (purchaseMode !== "cart") return <Navigate to="/tienda" replace />;

  const subtotal = cart.reduce((a, l) => a + l.precio * l.cantidad, 0);
  const suggest = products.filter((p) => !cart.some((c) => c.slug === p.slug)).slice(0, 4);

  return (
    <div className="lr-container py-10">
      <h1 className="font-display text-5xl tracking-tight sm:text-7xl">Tu carrito</h1>
      {cart.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="font-body text-lg text-lr-textSecondary">Aún no has agregado piezas.</p>
          <Link to="/tienda" className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-sm bg-lr-terracotta px-8 font-sans text-xs font-medium uppercase tracking-[0.22em] text-lr-surface">
            Explorar tienda
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <ul className="divide-y divide-lr-border">
                {cart.map((line) => (
                  <li key={line.key} className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center">
                    <img src={line.imagen} alt="" className="h-28 w-24 rounded-sm object-cover" />
                    <div className="min-w-0 flex-1">
                      <Link to={`/producto/${line.slug}`} className="font-display text-2xl tracking-tight hover:text-lr-terracotta">
                        {line.nombre}
                      </Link>
                      <p className="mt-1 font-sans text-xs uppercase tracking-widest text-lr-muted">
                        {line.colorNombre} · {line.talla}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-4">
                        <div className="inline-flex items-center rounded-full border border-lr-border">
                          <button type="button" className="min-h-[44px] min-w-[44px]" onClick={() => updateQty(line.key, line.cantidad - 1)}>
                            −
                          </button>
                          <span className="min-w-[2rem] text-center font-body">{line.cantidad}</span>
                          <button type="button" className="min-h-[44px] min-w-[44px]" onClick={() => updateQty(line.key, line.cantidad + 1)}>
                            +
                          </button>
                        </div>
                        <p className="font-body text-lg">{formatPrice(line.precio * line.cantidad)}</p>
                        <button type="button" className="font-sans text-xs uppercase tracking-widest text-lr-terracotta" onClick={() => removeFromCart(line.key)}>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="sticky top-28 rounded-sm border border-lr-border bg-lr-surface p-6 shadow-soft">
                <p className="font-sans text-xs uppercase tracking-widest text-lr-muted">Resumen</p>
                <div className="mt-4 flex justify-between font-body text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <p className="mt-2 font-sans text-xs text-lr-muted">Envío calculado en checkout</p>
                <p className="mt-6 font-display text-3xl tracking-tight">{formatPrice(subtotal)}</p>
                <Link to="/checkout" className="mt-6 flex min-h-[52px] w-full items-center justify-center rounded-sm bg-lr-terracotta font-sans text-xs font-medium uppercase tracking-[0.22em] text-lr-surface hover:bg-lr-roseDeep">
                  Proceder al checkout
                </Link>
                <div className="mt-6 rounded-sm border border-lr-sage/30 bg-lr-sage/15 p-4 font-body text-sm text-lr-textSecondary">Código AMIGA10 aplicable en checkout (demo).</div>
                <p className="mt-4 font-sans text-xs text-lr-muted">
                  <Link to="/cuidados" className="underline">
                    Política de devoluciones
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <section className="mt-20">
            <h2 className="font-display text-3xl tracking-tight">También te puede interesar</h2>
            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {suggest.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
