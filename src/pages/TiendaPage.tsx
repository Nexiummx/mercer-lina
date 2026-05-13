import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ProductCard } from "../components/ProductCard";
import { categories, collections, getCategoryBySlug, products, formatPrice } from "../lib/data";
import type { Product } from "../types";
import { easePremium } from "../lib/animations";
import { useLinaStore } from "../store/useLinaStore";

const tallasAll = ["XS", "S", "M", "L", "XL"];
const mats = ["Lino", "Algodón", "Seda"];

function inPrice(p: Product, min: number, max: number) {
  return p.precio >= min && p.precio <= max;
}

export default function TiendaPage() {
  const { categoria } = useParams();
  const cat = categoria ? getCategoryBySlug(categoria) : undefined;
  const [catFilters, setCatFilters] = useState<string[]>(cat ? [cat.slug] : []);
  const [tallaFilters, setTallaFilters] = useState<string[]>([]);
  const [colFilters, setColFilters] = useState<string[]>([]);
  const [matFilters, setMatFilters] = useState<string[]>([]);
  const [colSlug, setColSlug] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>([800, 5000]);
  const [sort, setSort] = useState<"recientes" | "precio-asc" | "precio-desc" | "popular">("recientes");
  const [page, setPage] = useState(0);
  const [mobileFilters, setMobileFilters] = useState(false);
  const purchaseMode = useLinaStore((s) => s.purchaseMode);
  const perPage = 9;

  const baseList = useMemo(() => {
    let list = [...products];
    if (categoria) list = list.filter((p) => p.categoriaSlug === categoria);
    if (catFilters.length)
      list = list.filter((p) => catFilters.includes(p.categoriaSlug));
    if (tallaFilters.length)
      list = list.filter((p) => tallaFilters.some((t) => (p.stockPorTalla[t] ?? 0) > 0));
    if (colSlug.length) list = list.filter((p) => colSlug.includes(p.coleccionSlug));
    if (colFilters.length) list = list.filter((p) => p.colores.some((c) => colFilters.includes(c.id)));
    if (matFilters.length)
      list = list.filter((p) => matFilters.some((m) => p.materiales.toLowerCase().includes(m.toLowerCase())));
    list = list.filter((p) => inPrice(p, price[0], price[1]));
    if (sort === "precio-asc") list.sort((a, b) => a.precio - b.precio);
    if (sort === "precio-desc") list.sort((a, b) => b.precio - a.precio);
    if (sort === "popular") list.sort((a, b) => a.nombre.localeCompare(b.nombre));
    return list;
  }, [categoria, catFilters, tallaFilters, colFilters, colSlug, matFilters, price, sort]);

  const pages = Math.max(1, Math.ceil(baseList.length / perPage));
  const slice = baseList.slice(page * perPage, page * perPage + perPage);

  const toggle = (arr: string[], v: string, set: (x: string[]) => void) => {
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
    setPage(0);
  };

  const clear = () => {
    setCatFilters([]);
    setTallaFilters([]);
    setColFilters([]);
    setMatFilters([]);
    setColSlug([]);
    setPrice([800, 5000]);
    setPage(0);
  };

  const hero = cat?.heroImage ?? "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=2000&q=80";

  const FilterBody = (
    <div className="space-y-8">
      <div>
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-lr-muted">Categoría</p>
        <div className="mt-3 space-y-2">
          {categories.map((c) => (
            <label key={c.slug} className="flex min-h-[44px] cursor-pointer items-center gap-3 font-body text-sm">
              <input
                type="checkbox"
                checked={catFilters.includes(c.slug)}
                onChange={() => toggle(catFilters, c.slug, setCatFilters)}
                className="h-4 w-4 accent-lr-terracotta"
              />
              {c.nombre}
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-lr-muted">Talla</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tallasAll.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggle(tallaFilters, t, setTallaFilters)}
              className={`min-h-[44px] min-w-[44px] rounded-full border px-3 font-sans text-xs uppercase tracking-widest ${
                tallaFilters.includes(t) ? "border-lr-terracotta bg-lr-rose/30" : "border-lr-border"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-lr-muted">Color</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {[
            { id: "crema", hex: "#F5EBDD" },
            { id: "terracota", hex: "#C97F5F" },
            { id: "salvia", hex: "#8B9D7E" },
          ].map((c) => (
            <button
              key={c.id}
              type="button"
              aria-label={c.id}
              onClick={() => toggle(colFilters, c.id, setColFilters)}
              className={`h-11 w-11 rounded-full border-2 ${colFilters.includes(c.id) ? "border-lr-terracotta" : "border-lr-border"}`}
              style={{ background: c.hex }}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-lr-muted">
          Precio {formatPrice(price[0])} — {formatPrice(price[1])}
        </p>
        <div className="mt-4 flex flex-col gap-3">
          <input type="range" min={800} max={5000} step={50} value={price[0]} onChange={(e) => setPrice([+e.target.value, Math.max(+e.target.value, price[1])])} className="accent-lr-terracotta" />
          <input type="range" min={800} max={5000} step={50} value={price[1]} onChange={(e) => setPrice([Math.min(price[0], +e.target.value), +e.target.value])} className="accent-lr-terracotta" />
        </div>
      </div>
      <div>
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-lr-muted">Material</p>
        <div className="mt-3 space-y-2">
          {mats.map((m) => (
            <label key={m} className="flex min-h-[44px] cursor-pointer items-center gap-3 font-body text-sm">
              <input type="checkbox" checked={matFilters.includes(m)} onChange={() => toggle(matFilters, m, setMatFilters)} className="h-4 w-4 accent-lr-terracotta" />
              {m}
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-lr-muted">Colección</p>
        <div className="mt-3 space-y-2">
          {collections.map((c) => (
            <label key={c.slug} className="flex min-h-[44px] cursor-pointer items-center gap-3 font-body text-sm">
              <input type="checkbox" checked={colSlug.includes(c.slug)} onChange={() => toggle(colSlug, c.slug, setColSlug)} className="h-4 w-4 accent-lr-terracotta" />
              {c.nombre}
            </label>
          ))}
        </div>
      </div>
      <button type="button" className="font-sans text-xs uppercase tracking-widest text-lr-terracotta underline" onClick={clear}>
        Limpiar filtros
      </button>
    </div>
  );

  return (
    <div>
      {categoria ? (
        <div className="lr-container py-6">
          <Breadcrumbs items={[{ label: "Tienda", to: "/tienda" }, { label: cat?.nombre ?? categoria }]} />
        </div>
      ) : null}

      <section className="relative min-h-[40vh] overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-lr-bg/80" />
        <div className="relative lr-container flex min-h-[40vh] flex-col justify-center py-16">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-terracotta">{cat ? cat.nombre.toUpperCase() : "Toda la colección"}</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl tracking-tight sm:text-6xl lg:text-7xl">
            {cat ? (
              <>
                {cat.nombre} para <span className="italic text-lr-terracotta">vivirlos despacio.</span>
              </>
            ) : (
              <>
                Encuentra tu <span className="italic text-lr-terracotta">pieza favorita.</span>
              </>
            )}
          </h1>
        </div>
      </section>

      {cat?.subcategorias ? (
        <div className="border-b border-lr-border bg-lr-surface">
          <div className="lr-container flex gap-2 overflow-x-auto py-3">
            <Link to={`/tienda/${cat.slug}`} className="min-h-[44px] shrink-0 rounded-full border border-lr-border px-4 py-2 font-sans text-xs uppercase tracking-widest hover:border-lr-terracotta">
              Todos
            </Link>
            {cat.subcategorias.map((s) => (
              <span key={s.id} className="min-h-[44px] shrink-0 cursor-default rounded-full border border-transparent px-4 py-2 font-sans text-xs uppercase tracking-widest text-lr-muted">
                {s.nombre}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className="lr-container flex flex-col gap-10 py-10 lg:flex-row">
        <aside className="hidden w-full shrink-0 lg:block lg:w-[25%]">
          <div className="sticky top-28 rounded-sm border border-lr-border bg-lr-surface p-6 shadow-soft">{FilterBody}</div>
        </aside>

        <div className="flex-1">
          <div className="flex flex-col gap-4 border-b border-lr-border pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-lr-border px-4 font-sans text-xs uppercase tracking-widest lg:hidden" onClick={() => setMobileFilters(true)}>
                Filtros
              </button>
              <p className="font-body text-sm text-lr-textSecondary">{baseList.length} productos</p>
            </div>
            <label className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-lr-muted">
              Orden
              <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="min-h-[44px] rounded-sm border border-lr-border bg-lr-surface px-3 text-lr-text">
                <option value="recientes">Recientes</option>
                <option value="precio-asc">Precio ↑</option>
                <option value="precio-desc">Precio ↓</option>
                <option value="popular">Popularidad</option>
              </select>
            </label>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {slice.map((p) => (
              <div key={p.slug} className="group/card relative">
                <ProductCard product={p} />
                {purchaseMode === "cart" ? (
                  <div className="pointer-events-none absolute inset-0 bottom-auto flex justify-center pt-[58%] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100">
                    <span className="rounded-full bg-lr-surface/95 px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-lr-text shadow-soft">
                      Tallas: {p.tallas.filter((t) => (p.stockPorTalla[t] ?? 0) > 0).join(", ")}
                    </span>
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Página ${i + 1}`}
                onClick={() => setPage(i)}
                className={`h-3 w-3 rounded-full ${page === i ? "bg-lr-terracotta" : "bg-lr-border"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileFilters ? (
          <>
            <motion.button type="button" className="fixed inset-0 z-[55] bg-lr-text/40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileFilters(false)} />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: easePremium }}
              className="fixed inset-x-0 bottom-0 z-[60] max-h-[85vh] overflow-y-auto rounded-t-2xl border border-lr-border bg-lr-bg p-6 shadow-medium lg:hidden"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-display text-2xl italic">Filtros</span>
                <button type="button" className="min-h-[44px] min-w-[44px] font-sans text-xs uppercase tracking-widest" onClick={() => setMobileFilters(false)}>
                  Listo
                </button>
              </div>
              {FilterBody}
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
