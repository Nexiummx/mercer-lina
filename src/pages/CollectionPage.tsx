import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Product } from "../types";
import { getCollectionBySlug, getProductBySlug } from "../lib/data";
import { ProductCard } from "../components/ProductCard";
import { easePremium, fadeUp, whileInViewOnce } from "../lib/animations";

export default function CollectionPage() {
  const { slug } = useParams();
  const col = slug ? getCollectionBySlug(slug) : undefined;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const [desktop, setDesktop] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const fn = () => setDesktop(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    if (!desktop || !col) return;
    const onMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [desktop, col]);

  if (!col) return <Navigate to="/" replace />;

  const pieces = col.productSlugs.map((s) => getProductBySlug(s)).filter((p): p is Product => Boolean(p));

  const order = ["jardin", "primavera-eterna", "manifiesto"];
  const idx = order.indexOf(col.slug);
  const prev = order[(idx - 1 + order.length) % order.length];
  const next = order[(idx + 1) % order.length];
  const prevCol = getCollectionBySlug(prev);
  const nextCol = getCollectionBySlug(next);

  return (
    <div ref={ref} className="relative">
      {desktop ? (
        <motion.div
          className="pointer-events-none fixed z-40 flex h-10 w-10 items-center justify-center rounded-full border border-lr-terracotta/90 bg-lr-terracotta/30 mix-blend-difference"
          animate={{ x: cursor.x - 20, y: cursor.y - 20 }}
          transition={{ duration: 0.35, ease: easePremium }}
          style={{ left: 0, top: 0 }}
        >
          <span className="font-sans text-[9px] uppercase tracking-widest text-lr-onDark">Ver +</span>
        </motion.div>
      ) : null}

      <section className="relative h-[min(92vh,900px)] overflow-hidden">
        <motion.img style={{ y }} src={col.heroImage} alt="" className="absolute inset-0 h-[120%] w-full object-cover" />
        <div className="absolute inset-0 bg-lr-text/35" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-lr-onDark">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-lr-onDark/90">{col.temporada}</p>
          <h1 className="mt-6 font-display text-7xl italic tracking-tight sm:text-8xl lg:text-9xl">{col.nombre}.</h1>
          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-lr-onDark/90">{col.descripcion}</p>
          <motion.span aria-hidden className="mt-16 text-xs uppercase tracking-[0.35em]" animate={{ y: [0, 6, 0] }} transition={{ duration: 2.2, repeat: Infinity }}>
            ↓
          </motion.span>
        </div>
      </section>

      <section className="lr-container grid gap-10 py-20 lg:grid-cols-[40%_1fr] lg:items-start">
        <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={whileInViewOnce} transition={{ duration: 0.8, ease: easePremium }}>
          <p className="font-body text-lg leading-loose text-lr-textSecondary">
            <span className="float-left mr-3 mt-1 font-display text-7xl italic leading-none text-lr-terracotta">{col.manifiesto.charAt(0)}</span>
            {col.manifiesto.slice(1)}
          </p>
        </motion.div>
        <motion.img variants={fadeUp} initial="initial" whileInView="animate" viewport={whileInViewOnce} src={col.galeria[1]?.src ?? col.heroImage} alt="" className="w-full rounded-sm object-cover shadow-medium lg:max-h-[720px]" />
      </section>

      <section className="lr-container py-10">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {col.galeria.map((g, i) => (
            <motion.figure
              key={`${g.src}-${i}`}
              initial={{ opacity: 0, clipPath: "inset(10% 0 10% 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }}
              viewport={whileInViewOnce}
              transition={{ duration: 1, ease: easePremium }}
              className="mb-4 break-inside-avoid overflow-hidden rounded-sm"
            >
              <Link to={g.productSlug ? `/producto/${g.productSlug}` : "#"} className="group block">
                <div className="relative overflow-hidden">
                  <img src={g.src} alt="" className="w-full object-cover transition-transform duration-[800ms] group-hover:scale-[1.02]" />
                  <div className="pointer-events-none absolute inset-0 bg-lr-text/0 transition-colors duration-500 group-hover:bg-lr-text/15" />
                </div>
                {g.caption ? (
                  <figcaption className="mt-2 font-sans text-[10px] uppercase tracking-[0.2em] text-lr-muted">{g.caption}</figcaption>
                ) : null}
              </Link>
            </motion.figure>
          ))}
        </div>
      </section>

      <section className="bg-lr-surfaceAlt/70 py-20">
        <div className="lr-container">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-terracotta">Piezas</p>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">{pieces.map((p) => (p ? <ProductCard key={p.slug} product={p} /> : null))}</div>
        </div>
      </section>

      <section className="lr-container py-16">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-sage">Behind the scenes</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {col.bts.map((b) => (
            <figure key={b.caption} className="rotate-1 rounded-sm bg-lr-surface p-3 pb-5 shadow-soft ring-1 ring-lr-border">
              <img src={b.src} alt="" className="aspect-square w-full object-cover" />
              <figcaption className="mt-3 font-body text-sm italic text-lr-textSecondary">{b.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-t border-lr-border bg-lr-surface py-16">
        <div className="lr-container grid gap-8 md:grid-cols-2">
          <Link to={`/coleccion/${prev}`} className="group block overflow-hidden rounded-sm border border-lr-border">
            <img src={prevCol?.heroImage ?? col.heroImage} alt="" className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <p className="p-4 font-display text-3xl italic">Anterior</p>
          </Link>
          <Link to={`/coleccion/${next}`} className="group block overflow-hidden rounded-sm border border-lr-border">
            <img src={nextCol?.heroImage ?? col.heroImage} alt="" className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <p className="p-4 text-right font-display text-3xl italic">Siguiente</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
