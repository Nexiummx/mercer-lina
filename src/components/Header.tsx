import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { categories, products } from "../lib/data";
import { useLinaStore } from "../store/useLinaStore";
import { IconCart, IconSearch } from "./icons";

const nav = [
  { to: "/tienda", label: "Tienda" },
  { to: "/coleccion/jardin", label: "Jardín" },
  { to: "/historia", label: "Historia" },
  { to: "/cuidados", label: "Cuidados" },
  { to: "/diario", label: "Diario" },
  { to: "/contacto", label: "Contacto" },
];

function SearchPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    if (!q.trim()) return [];
    const t = q.toLowerCase();
    return products.filter((p) => p.nombre.toLowerCase().includes(t)).slice(0, 8);
  }, [q]);

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/30 px-4 pt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", bounce: 0, duration: 0.35 }}
            style={{ transformOrigin: "top center" }}
            className="w-full max-w-xl rounded-[22px] bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 pb-2">
              <IconSearch className="h-5 w-5 text-lr-textSecondary" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar una pieza…"
                aria-label="Buscar en la tienda"
                className="min-h-[44px] flex-1 border-0 bg-transparent text-lg outline-none placeholder:text-lr-textSecondary"
              />
              <button type="button" className="ap-more min-h-[44px] px-2" onClick={onClose}>
                Cerrar
              </button>
            </div>
            <ul className="max-h-72 overflow-auto">
              {list.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/producto/${p.slug}`}
                    className="flex min-h-[52px] items-center gap-3 rounded-xl px-2 py-2 hover:bg-lr-surfaceAlt"
                    onClick={onClose}
                  >
                    <img src={p.imagenes[0]} alt="" className="h-12 w-10 rounded-lg object-cover" />
                    <span className="font-medium">{p.nombre}</span>
                  </Link>
                </li>
              ))}
              {q && list.length === 0 ? (
                <li className="px-2 py-6 text-lr-textSecondary">No encontramos “{q}”. Prueba con vestido, blusa o lino.</li>
              ) : null}
            </ul>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const purchaseMode = useLinaStore((s) => s.purchaseMode);
  const setPurchaseMode = useLinaStore((s) => s.setPurchaseMode);
  const cartCount = useLinaStore((s) => s.cart.reduce((a, l) => a + l.cantidad, 0));
  const otherMode = purchaseMode === "whatsapp" ? "cart" : "whatsapp";
  const modeLabel = purchaseMode === "whatsapp" ? "Pedido por WhatsApp" : "Compra con carrito";

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="ap-nav">
        <div className="ap-nav__bar">
          <Link to="/" className="ap-nav__logo" aria-label="Lina & Roma, inicio">
            Lina &amp; Roma
          </Link>

          <nav className="ap-nav__links" aria-label="Principal">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ap-nav__tools">
            <button
              type="button"
              className="ap-mode"
              onClick={() => setPurchaseMode(otherMode)}
              title="Cambiar el modo de compra"
            >
              {modeLabel}
            </button>
            <button type="button" className="ap-icon" aria-label="Buscar" onClick={() => setSearchOpen(true)}>
              <IconSearch />
            </button>
            {purchaseMode === "cart" ? (
              <Link to="/carrito" className="ap-icon" aria-label={`Bolsa, ${cartCount} piezas`}>
                <IconCart />
                {cartCount > 0 ? <span className="ap-icon__count">{cartCount > 9 ? "9+" : cartCount}</span> : null}
              </Link>
            ) : null}
            <button
              type="button"
              className="ap-nav__menu"
              aria-expanded={open}
              aria-controls="ap-sheet"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="ap-burger" data-open={open} aria-hidden>
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />

      <AnimatePresence>
        {open ? (
          <motion.div
            id="ap-sheet"
            className="ap-sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.24 } }}
            exit={{ opacity: 0, transition: { duration: 0.16 } }}
          >
            <nav aria-label="Móvil">
              {[{ to: "/", label: "Inicio" }, ...nav].map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.4, delay: 0.03 * i }}
                >
                  <Link to={item.to}>{item.label}</Link>
                </motion.div>
              ))}
              {categories.map((c) => (
                <Link key={c.slug} to={`/tienda/${c.slug}`} style={{ fontSize: "1.0625rem", fontWeight: 400 }}>
                  {c.nombre}
                </Link>
              ))}
            </nav>
            <p style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between", gap: "1rem" }}>
              <span>{modeLabel}</span>
              <button type="button" className="ap-more" onClick={() => setPurchaseMode(otherMode)}>
                Cambiar a {otherMode === "cart" ? "carrito" : "WhatsApp"}
              </button>
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
