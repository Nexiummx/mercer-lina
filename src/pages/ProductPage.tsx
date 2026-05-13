import { useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ProductCard } from "../components/ProductCard";
import { IconHeart, IconWhatsApp } from "../components/icons";
import { formatPrice, getCategoryBySlug, getProductBySlug, products, collectionLabel } from "../lib/data";
import { buildWhatsAppUrl, useLinaStore } from "../store/useLinaStore";
import { easePremium, fadeUp, whileInViewOnce } from "../lib/animations";

const swatchesExtra = [
  { nombre: "Crema", hex: "#F5EBDD" },
  { nombre: "Terracota", hex: "#C97F5F" },
  { nombre: "Salvia", hex: "#8B9D7E" },
];

function AccordionSection({
  title,
  children,
  open,
  onToggle,
}: {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-lr-border">
      <button type="button" className="flex min-h-[48px] w-full items-center justify-between py-4 text-left font-sans text-xs font-medium uppercase tracking-[0.2em] text-lr-text" onClick={onToggle}>
        {title}
        <span className="text-lr-muted">{open ? "−" : "+"}</span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: easePremium }} className="overflow-hidden">
            <div className="pb-5 font-body text-sm leading-relaxed text-lr-textSecondary">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function ProductPage() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [imgIdx, setImgIdx] = useState(0);
  const [color, setColor] = useState(product?.colores[0]?.nombre ?? "");
  const [talla, setTalla] = useState("M");
  const [qty, setQty] = useState(1);
  const [acc, setAcc] = useState<string | null>("detalles");
  const [fav, setFav] = useState(false);
  const purchaseMode = useLinaStore((s) => s.purchaseMode);
  const addToCart = useLinaStore((s) => s.addToCart);

  useEffect(() => {
    if (!product) return;
    setImgIdx(0);
    setColor(product.colores[0]?.nombre ?? "");
    setTalla(product.tallas.find((t) => (product.stockPorTalla[t] ?? 0) > 0) ?? "M");
    setQty(1);
  }, [product]);

  const related = useMemo(() => {
    if (!product) return [];
    return products.filter((p) => p.coleccionSlug === product.coleccionSlug && p.slug !== product.slug).slice(0, 4);
  }, [product]);

  const similar = useMemo(() => {
    if (!product) return [];
    return products.filter((p) => p.categoriaSlug === product.categoriaSlug && p.slug !== product.slug).slice(0, 4);
  }, [product]);

  if (!product) return <Navigate to="/tienda" replace />;

  const mainImg = product.imagenes[imgIdx] ?? product.imagenes[0];
  const stock = product.stockPorTalla[talla] ?? 0;
  const installments = Math.ceil(product.precio / 3);

  const wa = buildWhatsAppUrl(
    `Hola Lina & Roma, me interesa el ${product.nombre} - Talla ${talla} - Color ${color}. ¿Está disponible?`,
  );

  return (
    <div className="pb-20">
      <div className="lr-container grid gap-12 py-8 lg:grid-cols-2 lg:gap-16 lg:py-12">
        <div>
          <div className="relative overflow-hidden rounded-sm bg-lr-surfaceAlt shadow-soft ring-1 ring-lr-border/60">
            <AnimatePresence mode="wait">
              <motion.img
                key={mainImg}
                src={mainImg}
                alt=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: easePremium }}
                className="aspect-[4/5] w-full object-cover"
              />
            </AnimatePresence>
            <button type="button" className="absolute right-3 top-3 rounded-full bg-lr-surface/90 px-3 py-2 font-sans text-[10px] uppercase tracking-widest text-lr-text shadow-soft min-h-[44px]" onClick={() => window.open(mainImg, "_blank")}>
              Zoom
            </button>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {product.imagenes.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setImgIdx(i)}
                className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-sm ring-2 ${imgIdx === i ? "ring-lr-terracotta" : "ring-transparent"}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <Breadcrumbs items={[{ label: "Tienda", to: "/tienda" }, { label: getCategoryBySlug(product.categoriaSlug)?.nombre ?? "Tienda", to: `/tienda/${product.categoriaSlug}` }, { label: product.nombre }]} />
          <p className="mt-6 font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-terracotta">{collectionLabel(product.coleccionSlug)}</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">{product.nombre}</h1>
          <p className="mt-4 font-body text-2xl text-lr-text">{formatPrice(product.precio)}</p>
          <p className="mt-1 font-sans text-xs text-lr-muted">ó 3 pagos de {formatPrice(installments)} sin intereses</p>
          <div className="my-6 h-px w-full bg-lr-border" />
          <p className="font-body text-base leading-relaxed text-lr-textSecondary">{product.descripcionCorta}</p>

          <div className="mt-6">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-lr-muted">Color</p>
            <div className="mt-2 flex flex-wrap gap-3">
              {swatchesExtra.map((c) => (
                <button
                  key={c.nombre}
                  type="button"
                  onClick={() => setColor(c.nombre)}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border-2 ${color === c.nombre ? "border-lr-terracotta" : "border-lr-border"}`}
                  aria-label={c.nombre}
                >
                  <span className="h-7 w-7 rounded-full" style={{ backgroundColor: c.hex }} />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-lr-muted">Talla</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.tallas.map((t) => {
                const out = (product.stockPorTalla[t] ?? 0) <= 0;
                return (
                  <button
                    key={t}
                    type="button"
                    disabled={out}
                    onClick={() => setTalla(t)}
                    className={`relative min-h-[44px] min-w-[44px] rounded-full border px-3 font-sans text-xs uppercase tracking-widest ${
                      talla === t ? "border-lr-terracotta bg-lr-rose/30" : "border-lr-border"
                    } ${out ? "cursor-not-allowed opacity-40 line-through" : "hover:border-lr-terracotta"}`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-lr-muted">Cantidad</p>
            <div className="inline-flex items-center rounded-full border border-lr-border">
              <button type="button" className="min-h-[44px] min-w-[44px] font-sans text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span className="min-w-[2rem] text-center font-body">{qty}</span>
              <button type="button" className="min-h-[44px] min-w-[44px] font-sans text-lg" onClick={() => setQty((q) => q + 1)}>
                +
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            {purchaseMode === "whatsapp" ? (
              <a href={wa} target="_blank" rel="noreferrer" className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-sm bg-lr-sageDeep px-6 font-sans text-xs font-medium uppercase tracking-[0.22em] text-lr-onDark transition-colors hover:bg-lr-text">
                <IconWhatsApp className="h-5 w-5" />
                Pedir por WhatsApp
              </a>
            ) : (
              <button
                type="button"
                disabled={stock <= 0}
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-sm bg-lr-terracotta px-6 font-sans text-xs font-medium uppercase tracking-[0.22em] text-lr-surface transition-colors hover:bg-lr-roseDeep disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() =>
                  addToCart({
                    productId: product.id,
                    slug: product.slug,
                    nombre: product.nombre,
                    imagen: product.imagenes[0],
                    precio: product.precio,
                    talla,
                    colorNombre: color,
                    cantidad: qty,
                  })
                }
              >
                Agregar al carrito
              </button>
            )}
            <button type="button" onClick={() => setFav((v) => !v)} className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-sm border border-lr-border bg-transparent px-6 font-sans text-xs font-medium uppercase tracking-[0.22em] text-lr-text hover:border-lr-terracotta">
              <IconHeart filled={fav} />
              Guardar en favoritos
            </button>
          </div>

          <div className="mt-10">
            <AccordionSection title="Detalles del producto" open={acc === "detalles"} onToggle={() => setAcc((k) => (k === "detalles" ? "" : "detalles"))}>
              <p>{product.materiales}</p>
              <p className="mt-3">{product.medidas}</p>
            </AccordionSection>
            <AccordionSection title="Cuidados" open={acc === "cuidados"} onToggle={() => setAcc((k) => (k === "cuidados" ? "" : "cuidados"))}>
              {product.cuidados}
            </AccordionSection>
            <AccordionSection title="Envíos" open={acc === "envios"} onToggle={() => setAcc((k) => (k === "envios" ? "" : "envios"))}>
              Envíos a todo México en 3–5 días hábiles. Empaque con papel reciclado y cinta de algodón.
            </AccordionSection>
            <AccordionSection title="Devoluciones" open={acc === "dev"} onToggle={() => setAcc((k) => (k === "dev" ? "" : "dev"))}>
              15 días para devolución en prenda sin uso, con etiquetas. Cambios sin costo en Guadalajara.
            </AccordionSection>
          </div>
        </div>
      </div>

      <section className="lr-container py-16">
        <div className="grid gap-10 lg:grid-cols-[42%_1fr] lg:items-center">
          <motion.img variants={fadeUp} initial="initial" whileInView="animate" viewport={whileInViewOnce} src={product.imagenes[1] ?? product.imagenes[0]} alt="" className="aspect-[4/5] w-full rounded-sm object-cover shadow-soft" />
          <div>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-sage">{product.storyTitulo}</p>
            <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
              Historia de <span className="italic text-lr-terracotta">esta pieza</span>
            </h2>
            <p className="mt-6 font-body text-base leading-relaxed text-lr-textSecondary">{product.storyTexto}</p>
            {product.quoteDisenadora ? (
              <blockquote className="mt-8 border-l-2 border-lr-rose pl-6 font-display text-2xl italic leading-snug text-lr-text">“{product.quoteDisenadora}”</blockquote>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-lr-surfaceAlt/60 py-16">
        <div className="lr-container grid gap-8 md:grid-cols-3">
          {[
            { t: "Material principal", d: product.materiales, emoji: "🌿" },
            { t: "Proceso", d: "Corte y confección en atelier familiar con control de calidad por pieza.", emoji: "✋" },
            { t: "Origen", d: "Jalisco y colaboraciones con talleres en Oaxaca.", emoji: "📍" },
          ].map((x) => (
            <div key={x.t} className="rounded-sm border border-lr-border bg-lr-surface p-6 shadow-soft">
              <span className="text-2xl">{x.emoji}</span>
              <h3 className="mt-3 font-display text-2xl tracking-tight">{x.t}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-lr-textSecondary">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="lr-container py-16">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-terracotta">Combínalo con</p>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">{related.map((p) => (p ? <ProductCard key={p.slug} product={p} /> : null))}</div>
      </section>

      <section className="bg-lr-surface py-16">
        <div className="lr-container">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-sage">También te puede gustar</p>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">{similar.map((p) => (p ? <ProductCard key={p.slug} product={p} /> : null))}</div>
        </div>
      </section>

      <section className="lr-container py-16">
        <div className="flex flex-col gap-4 border-b border-lr-border pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-3xl tracking-tight">4.9 ★</p>
            <p className="mt-1 font-sans text-xs uppercase tracking-widest text-lr-muted">basado en 23 reseñas</p>
          </div>
          <div className="max-w-sm flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((n) => (
              <div key={n} className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-lr-muted">
                <span className="w-6">{n}★</span>
                <span className="h-1.5 flex-1 rounded-full bg-lr-border">
                  <span className="block h-full rounded-full bg-lr-rose" style={{ width: `${n === 5 ? 78 : n === 4 ? 14 : 8}%` }} />
                </span>
              </div>
            ))}
          </div>
        </div>
        <ul className="mt-8 space-y-8">
          {[
            { n: "Laura M.", t: "La tela es un sueño. Llegó empaquetada con amor.", stars: 5 },
            { n: "Ivanna P.", t: "Talla fiel a la guía. El color crema es exacto a las fotos.", stars: 5 },
            { n: "Regina S.", t: "Mi primera compra slow fashion y no será la última.", stars: 5 },
            { n: "Natalia G.", t: "El envío fue rápido y el servicio por WhatsApp excelente.", stars: 5 },
          ].map((r) => (
            <li key={r.n} className="border-b border-lr-border pb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-lr-rose">{"★".repeat(r.stars)}</span>
                <span className="font-sans text-xs uppercase tracking-widest text-lr-muted">{r.n} · hace 2 semanas</span>
              </div>
              <p className="mt-3 font-body text-sm leading-relaxed text-lr-textSecondary">{r.t}</p>
              <button type="button" className="mt-3 font-sans text-xs text-lr-terracotta hover:underline">
                ¿Te fue útil? 👍
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
