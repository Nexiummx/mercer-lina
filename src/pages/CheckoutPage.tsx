import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "../lib/data";
import { useLinaStore } from "../store/useLinaStore";
import { easePremium } from "../lib/animations";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const purchaseMode = useLinaStore((s) => s.purchaseMode);
  const cart = useLinaStore((s) => s.cart);
  const clearCart = useLinaStore((s) => s.clearCart);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [cp, setCp] = useState("");
  const [estado, setEstado] = useState("");
  const [envio, setEnvio] = useState("std");
  const [pago, setPago] = useState("card");
  const [card, setCard] = useState({ n: "", e: "", c: "" });
  const [doneAnim, setDoneAnim] = useState(false);

  if (purchaseMode !== "cart") return <Navigate to="/tienda" replace />;
  if (cart.length === 0) return <Navigate to="/carrito" replace />;

  const subtotal = cart.reduce((a, l) => a + l.precio * l.cantidad, 0);
  const envioCost = envio === "std" ? 99 : envio === "exp" ? 199 : 0;
  const total = subtotal + envioCost;

  const pay = () => {
    console.log("Checkout demo — pago simulado", { email, cart, total });
    setDoneAnim(true);
    window.setTimeout(() => {
      clearCart();
      navigate("/checkout/confirmacion");
    }, 900);
  };

  return (
    <div className="lr-container py-10">
      <h1 className="font-display text-4xl tracking-tight sm:text-6xl">Finaliza tu compra</h1>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-10">
          <section className="rounded-sm border border-lr-border bg-lr-surface p-6 shadow-soft">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-terracotta">1. Contacto</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block font-sans text-xs uppercase tracking-widest text-lr-muted">
                Email
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full min-h-[48px] border-0 border-b border-lr-rose bg-transparent font-body outline-none" />
              </label>
              <label className="block font-sans text-xs uppercase tracking-widest text-lr-muted">
                Teléfono
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2 w-full min-h-[48px] border-0 border-b border-lr-rose bg-transparent font-body outline-none" />
              </label>
            </div>
          </section>

          <section className="rounded-sm border border-lr-border bg-lr-surface p-6 shadow-soft">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-terracotta">2. Envío</p>
            <div className="mt-4 grid gap-4">
              <label className="block font-sans text-xs uppercase tracking-widest text-lr-muted">
                Nombre completo
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} className="mt-2 w-full min-h-[48px] border-0 border-b border-lr-rose bg-transparent font-body outline-none" />
              </label>
              <label className="block font-sans text-xs uppercase tracking-widest text-lr-muted">
                Dirección
                <input value={direccion} onChange={(e) => setDireccion(e.target.value)} className="mt-2 w-full min-h-[48px] border-0 border-b border-lr-rose bg-transparent font-body outline-none" />
              </label>
              <div className="grid gap-4 sm:grid-cols-3">
                <label className="block font-sans text-xs uppercase tracking-widest text-lr-muted">
                  Ciudad
                  <input value={ciudad} onChange={(e) => setCiudad(e.target.value)} className="mt-2 w-full min-h-[48px] border-0 border-b border-lr-rose bg-transparent font-body outline-none" />
                </label>
                <label className="block font-sans text-xs uppercase tracking-widest text-lr-muted">
                  C.P.
                  <input value={cp} onChange={(e) => setCp(e.target.value)} className="mt-2 w-full min-h-[48px] border-0 border-b border-lr-rose bg-transparent font-body outline-none" />
                </label>
                <label className="block font-sans text-xs uppercase tracking-widest text-lr-muted">
                  Estado
                  <input value={estado} onChange={(e) => setEstado(e.target.value)} className="mt-2 w-full min-h-[48px] border-0 border-b border-lr-rose bg-transparent font-body outline-none" />
                </label>
              </div>
            </div>
          </section>

          <section className="rounded-sm border border-lr-border bg-lr-surface p-6 shadow-soft">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-terracotta">3. Método de envío</p>
            <div className="mt-4 space-y-3 font-body text-sm">
              <label className="flex min-h-[48px] cursor-pointer items-start gap-3 rounded-sm border border-lr-border p-3 hover:border-lr-terracotta">
                <input type="radio" name="env" checked={envio === "std"} onChange={() => setEnvio("std")} className="mt-1 accent-lr-terracotta" />
                <span>Estándar 5–7 días · {formatPrice(99)}</span>
              </label>
              <label className="flex min-h-[48px] cursor-pointer items-start gap-3 rounded-sm border border-lr-border p-3 hover:border-lr-terracotta">
                <input type="radio" name="env" checked={envio === "exp"} onChange={() => setEnvio("exp")} className="mt-1 accent-lr-terracotta" />
                <span>Express 2–3 días · {formatPrice(199)}</span>
              </label>
              <label className="flex min-h-[48px] cursor-pointer items-start gap-3 rounded-sm border border-lr-border p-3 hover:border-lr-terracotta">
                <input type="radio" name="env" checked={envio === "pick"} onChange={() => setEnvio("pick")} className="mt-1 accent-lr-terracotta" />
                <span>Recoger en tienda · Gratis</span>
              </label>
            </div>
          </section>

          <section className="rounded-sm border border-lr-border bg-lr-surface p-6 shadow-soft">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-terracotta">4. Método de pago (simulado)</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { id: "card", l: "Tarjeta" },
                { id: "oxxo", l: "OXXO" },
                { id: "transfer", l: "Transferencia" },
                { id: "paypal", l: "PayPal" },
              ].map((x) => (
                <label key={x.id} className="flex min-h-[48px] cursor-pointer items-center gap-3 rounded-sm border border-lr-border px-3 hover:border-lr-terracotta">
                  <input type="radio" name="pay" checked={pago === x.id} onChange={() => setPago(x.id)} className="accent-lr-terracotta" />
                  <span className="font-sans text-xs uppercase tracking-widest">{x.l}</span>
                </label>
              ))}
            </div>
            {pago === "card" ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <label className="sm:col-span-3 font-sans text-xs uppercase tracking-widest text-lr-muted">
                  Número
                  <input value={card.n} onChange={(e) => setCard({ ...card, n: e.target.value })} className="mt-2 w-full min-h-[48px] border-0 border-b border-lr-rose bg-transparent font-body outline-none" />
                </label>
                <label className="font-sans text-xs uppercase tracking-widest text-lr-muted">
                  MM/AA
                  <input value={card.e} onChange={(e) => setCard({ ...card, e: e.target.value })} className="mt-2 w-full min-h-[48px] border-0 border-b border-lr-rose bg-transparent font-body outline-none" />
                </label>
                <label className="font-sans text-xs uppercase tracking-widest text-lr-muted">
                  CVV
                  <input value={card.c} onChange={(e) => setCard({ ...card, c: e.target.value })} className="mt-2 w-full min-h-[48px] border-0 border-b border-lr-rose bg-transparent font-body outline-none" />
                </label>
              </div>
            ) : null}
          </section>

          <div className="flex flex-wrap gap-6 border-t border-lr-border pt-6 font-sans text-xs uppercase tracking-widest text-lr-muted">
            <span>Pago seguro</span>
            <span>Devoluciones gratis</span>
            <span>Envío rastreable</span>
          </div>
        </div>

        <div>
          <div className="sticky top-28 rounded-sm border border-lr-border bg-lr-surface p-6 shadow-soft">
            <p className="font-sans text-xs uppercase tracking-widest text-lr-muted">Tu pedido</p>
            <ul className="mt-4 space-y-3">
              {cart.map((l) => (
                <li key={l.key} className="flex gap-3">
                  <img src={l.imagen} alt="" className="h-16 w-12 rounded-sm object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-lg">{l.nombre}</p>
                    <p className="font-sans text-[10px] uppercase tracking-widest text-lr-muted">
                      x{l.cantidad} · {l.talla}
                    </p>
                    <p className="font-body text-sm">{formatPrice(l.precio * l.cantidad)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2 border-t border-lr-border pt-4 font-body text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span>{formatPrice(envioCost)}</span>
              </div>
              <div className="flex justify-between font-display text-2xl">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <button type="button" onClick={pay} className="relative mt-6 flex min-h-[52px] w-full items-center justify-center overflow-hidden rounded-sm bg-lr-terracotta font-sans text-xs font-medium uppercase tracking-[0.22em] text-lr-surface hover:bg-lr-roseDeep">
              Pagar {formatPrice(total)}
              <AnimatePresence>
                {doneAnim ? (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-0 flex items-center justify-center bg-lr-sageDeep text-2xl" transition={{ duration: 0.45, ease: easePremium }}>
                    ✓
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
