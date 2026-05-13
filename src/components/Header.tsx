import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { categories, products } from "../lib/data";
import { useLinaStore } from "../store/useLinaStore";
import { easePremium } from "../lib/animations";
import { IconCart, IconChevronDown, IconClose, IconHeart, IconMenu, IconSearch } from "./icons";

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
          className="fixed inset-0 z-[70] flex items-start justify-center bg-lr-text/30 px-4 pt-24 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: easePremium }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.45, ease: easePremium }}
            className="w-full max-w-xl rounded-sm border border-lr-border bg-lr-surface p-4 shadow-medium"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-lr-rose/40 pb-3">
              <IconSearch className="text-lr-muted" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar en la tienda..."
                className="min-h-[44px] flex-1 border-0 bg-transparent font-body text-base outline-none placeholder:text-lr-muted"
              />
              <button type="button" className="min-h-[44px] min-w-[44px] font-sans text-xs uppercase tracking-widest text-lr-muted hover:text-lr-terracotta" onClick={onClose}>
                Cerrar
              </button>
            </div>
            <ul className="max-h-72 overflow-auto py-2">
              {list.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/producto/${p.slug}`}
                    className="flex min-h-[44px] items-center gap-3 px-2 py-2 font-display text-lg tracking-tight hover:bg-lr-surfaceAlt"
                    onClick={onClose}
                  >
                    <img src={p.imagenes[0]} alt="" className="h-10 w-8 rounded-sm object-cover" />
                    <span>{p.nombre}</span>
                  </Link>
                </li>
              ))}
              {q && list.length === 0 ? (
                <li className="px-2 py-6 text-center font-body text-sm text-lr-muted">Sin resultados</li>
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [favOn, setFavOn] = useState(false);
  const purchaseMode = useLinaStore((s) => s.purchaseMode);
  const setPurchaseMode = useLinaStore((s) => s.setPurchaseMode);
  const cartCount = useLinaStore((s) => s.cart.reduce((a, l) => a + l.cantidad, 0));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setShopOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLink =
    "relative font-sans text-sm font-medium uppercase tracking-[0.18em] text-lr-textSecondary transition-colors hover:text-lr-terracotta after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-lr-terracotta after:transition-all after:duration-300 hover:after:w-full";

  const activeNav = ({ isActive }: { isActive: boolean }) =>
    `${navLink} ${isActive ? "text-lr-terracotta after:w-full" : ""}`;

  const barBg = scrolled ? "bg-lr-bg shadow-soft" : "bg-lr-bg/85 backdrop-blur-[2px]";

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b border-lr-border transition-shadow duration-500 ${barBg}`}>
        <div className="lr-container flex min-h-[72px] items-center gap-4 py-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div className="flex items-center gap-3 lg:gap-4">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-transparent text-lr-text hover:border-lr-border lg:hidden"
              aria-label="Abrir menú"
              onClick={() => setMobileOpen(true)}
            >
              <IconMenu />
            </button>
            <Link to="/" className="group block">
              <span className="font-display text-2xl italic tracking-tight text-lr-text">Lina & Roma</span>
              <span className="mt-0.5 block font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-lr-muted">
                Slow Fashion · Guadalajara
              </span>
            </Link>
          </div>

          <nav className="hidden items-center justify-center gap-8 lg:flex" aria-label="Principal">
            <NavLink to="/" className={activeNav} end>
              Inicio
            </NavLink>
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button type="button" className={`${navLink} inline-flex items-center gap-1`}>
                Tienda
                <IconChevronDown className={`transition-transform ${shopOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {shopOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.35, ease: easePremium }}
                    className="absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 rounded-sm border border-lr-border bg-lr-surface py-2 shadow-medium"
                  >
                    <Link to="/tienda" className="block px-4 py-3 font-sans text-xs uppercase tracking-widest text-lr-text hover:bg-lr-surfaceAlt">
                      Toda la colección
                    </Link>
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        to={`/tienda/${c.slug}`}
                        className="block px-4 py-2.5 font-display text-lg tracking-tight text-lr-text hover:bg-lr-surfaceAlt"
                      >
                        {c.nombre}
                      </Link>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
            <NavLink to="/coleccion/jardin" className={activeNav}>
              Colecciones
            </NavLink>
            <NavLink to="/diario" className={activeNav}>
              Diario
            </NavLink>
            <NavLink to="/historia" className={activeNav}>
              Historia
            </NavLink>
          </nav>

          <div className="ml-auto flex items-center justify-end gap-1 sm:gap-2">
            <button
              type="button"
              className="hidden max-w-[200px] flex-col items-end text-right lg:flex"
              onClick={() => setPurchaseMode(purchaseMode === "whatsapp" ? "cart" : "whatsapp")}
              title="Cambiar modo de compra"
            >
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-lr-muted">Modo compra</span>
              <span className="font-sans text-[11px] text-lr-textSecondary transition-colors hover:text-lr-terracotta">
                {purchaseMode === "whatsapp" ? "Pedido WhatsApp" : "Tienda con carrito"} <span className="text-lr-terracotta">⇄</span>
              </span>
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-lr-text hover:bg-lr-surfaceAlt"
              aria-label="Buscar"
              onClick={() => setSearchOpen(true)}
            >
              <IconSearch />
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-lr-text hover:bg-lr-surfaceAlt"
              aria-label="Favoritos"
              onClick={() => setFavOn((v) => !v)}
            >
              <IconHeart filled={favOn} />
            </button>
            {purchaseMode === "cart" ? (
              <Link
                to="/carrito"
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-sm text-lr-text hover:bg-lr-surfaceAlt"
                aria-label="Carrito"
              >
                <IconCart />
                {cartCount > 0 ? (
                  <span className="absolute right-1 top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-lr-terracotta px-1 font-sans text-[10px] font-medium text-lr-surface">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                ) : null}
              </Link>
            ) : null}
          </div>
        </div>
        <div className="border-t border-lr-border/60 px-5 py-2 lg:hidden">
          <button
            type="button"
            className="flex w-full min-h-[44px] items-center justify-between rounded-sm px-1 font-sans text-xs text-lr-muted"
            onClick={() => setPurchaseMode(purchaseMode === "whatsapp" ? "cart" : "whatsapp")}
          >
            <span className="uppercase tracking-[0.2em]">Modo</span>
            <span className="text-lr-textSecondary">
              {purchaseMode === "whatsapp" ? "Pedido WhatsApp" : "Tienda con carrito"}{" "}
              <span className="text-lr-terracotta">⇄</span>
            </span>
          </button>
        </div>
      </header>

      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar"
              className="fixed inset-0 z-[60] bg-lr-text/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.55, ease: easePremium }}
              className="fixed inset-y-0 left-0 z-[65] w-[min(100%,380px)] overflow-y-auto border-r border-lr-border bg-lr-bg shadow-medium lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-lr-border px-5 py-4">
                <span className="font-display text-xl italic">Menú</span>
                <button type="button" className="inline-flex h-11 w-11 items-center justify-center" onClick={() => setMobileOpen(false)}>
                  <IconClose />
                </button>
              </div>
              <div className="flex flex-col px-2 py-4 font-sans text-sm uppercase tracking-[0.2em] text-lr-textSecondary">
                <NavLink to="/" className="min-h-[48px] px-4 py-3 hover:bg-lr-surfaceAlt" onClick={() => setMobileOpen(false)}>
                  Inicio
                </NavLink>
                <NavLink to="/tienda" className="min-h-[48px] px-4 py-3 hover:bg-lr-surfaceAlt" onClick={() => setMobileOpen(false)}>
                  Tienda
                </NavLink>
                {categories.map((c) => (
                  <NavLink key={c.slug} to={`/tienda/${c.slug}`} className="min-h-[48px] px-6 py-2.5 pl-8 font-display normal-case tracking-normal text-lg text-lr-text hover:bg-lr-surfaceAlt" onClick={() => setMobileOpen(false)}>
                    {c.nombre}
                  </NavLink>
                ))}
                <NavLink to="/coleccion/jardin" className="min-h-[48px] px-4 py-3 hover:bg-lr-surfaceAlt" onClick={() => setMobileOpen(false)}>
                  Colecciones
                </NavLink>
                <NavLink to="/diario" className="min-h-[48px] px-4 py-3 hover:bg-lr-surfaceAlt" onClick={() => setMobileOpen(false)}>
                  Diario
                </NavLink>
                <NavLink to="/historia" className="min-h-[48px] px-4 py-3 hover:bg-lr-surfaceAlt" onClick={() => setMobileOpen(false)}>
                  Historia
                </NavLink>
                <NavLink to="/cuidados" className="min-h-[48px] px-4 py-3 hover:bg-lr-surfaceAlt" onClick={() => setMobileOpen(false)}>
                  Cuidados
                </NavLink>
                <NavLink to="/contacto" className="min-h-[48px] px-4 py-3 hover:bg-lr-surfaceAlt" onClick={() => setMobileOpen(false)}>
                  Contacto
                </NavLink>
                {purchaseMode === "cart" ? (
                  <>
                    <NavLink to="/carrito" className="min-h-[48px] px-4 py-3 hover:bg-lr-surfaceAlt" onClick={() => setMobileOpen(false)}>
                      Carrito
                    </NavLink>
                    <NavLink to="/checkout" className="min-h-[48px] px-4 py-3 hover:bg-lr-surfaceAlt" onClick={() => setMobileOpen(false)}>
                      Checkout
                    </NavLink>
                  </>
                ) : null}
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
