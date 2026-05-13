import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ProductCard } from "../components/ProductCard";
import { NewsletterCTA } from "../components/NewsletterCTA";
import { IconArrowRight, IconEarth, IconHands, IconHeart, IconPlant } from "../components/icons";
import { blogPosts, formatPrice, getCollectionBySlug, getProductBySlug, products, testimonials } from "../lib/data";
import {
  clipReveal,
  fadeIn,
  fadeUp,
  italicWord,
  scaleIn,
  whileInViewOnce,
  wordChild,
  easePremium,
} from "../lib/animations";
import type { Variants } from "framer-motion";

const heroStagger: Variants = {
  initial: {},
  animate: {
    transition: { delayChildren: 0.35, staggerChildren: 0.08 },
  },
};
const heroImg = "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=80";
const heroCardProduct = () => getProductBySlug("vestido-mara-crema");

function Words({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.span variants={heroStagger} initial="initial" animate="animate" className={`inline-flex flex-wrap gap-x-2 ${className}`}>
      {words.map((w, i) => (
        <motion.span key={`${w}-${i}`} variants={wordChild} className="inline-block">
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}

function FloralSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 200" fill="none" aria-hidden>
      <path d="M60 10c8 18 22 28 22 48s-10 34-22 44c-12-10-22-24-22-44s14-30 22-48Z" stroke="#D4A5A0" strokeWidth="1.2" opacity="0.55" />
      <path d="M60 90c10 24 30 40 18 64-12-8-28-28-18-64Z" stroke="#C97F5F" strokeWidth="1" opacity="0.45" />
      <circle cx="42" cy="52" r="3" fill="#C4A574" opacity="0.5" />
      <circle cx="78" cy="60" r="2.5" fill="#8B9D7E" opacity="0.5" />
    </svg>
  );
}

export default function HomePage() {
  const featured = useMemo(() => products.slice(0, 8), []);
  const jardin = getCollectionBySlug("jardin");
  const diario = blogPosts.slice(0, 3);
  const ig = useMemo(
    () =>
      [
        "1595777457583-95e059d581b8",
        "1515372039744-b8f02a3ae446",
        "1509631179647-0177331693ae",
        "1539533018447-63fcce2678e3",
        "1581044777550-3a55d2e127cd",
        "1469334031218-e382a71b716b",
      ].map(
        (id) =>
          `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=75`,
      ),
    [],
  );
  const cats = [
    { slug: "vestidos", label: "Vestidos", span: "md:col-span-2 md:row-span-2", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80" },
    { slug: "blusas", label: "Blusas", span: "", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80" },
    { slug: "pantalones", label: "Pantalones", span: "", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80" },
    { slug: "accesorios", label: "Accesorios", span: "md:col-span-2", img: "https://images.unsplash.com/photo-1434389677669-e08b4cac310f?auto=format&fit=crop&w=1200&q=80" },
  ];
  const card = heroCardProduct();

  return (
    <div>
      {/* Hero */}
      <section className="lr-container relative pb-16 pt-6 lg:pb-24 lg:pt-10">
        <div className="grid items-center gap-10 lg:grid-cols-[35%_1fr] lg:gap-6">
          <div className="relative z-10 max-w-xl">
            <motion.p
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2, duration: 0.7, ease: easePremium }}
              className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-terracotta"
            >
              Otoño / Invierno 2024 — Colección Jardín
            </motion.p>
            <h1 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight text-lr-text sm:text-7xl lg:text-8xl">
              <Words text="Donde cada prenda" />
            </h1>
            <motion.p
              variants={italicWord}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.7 }}
              className="mt-2 font-display text-5xl italic leading-[1.02] tracking-tight text-lr-terracotta sm:text-7xl lg:text-8xl"
            >
              cuenta una historia.
            </motion.p>
            <motion.p
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 1.1, duration: 0.7, ease: easePremium }}
              className="mt-6 max-w-md font-body text-base leading-relaxed text-lr-textSecondary"
            >
              Piezas pensadas para tardes largas, jardines silenciosos y ciudades que también merecen calma. Materiales naturales, siluetas honestas.
            </motion.p>
            <motion.div variants={fadeUp} initial="initial" animate="animate" transition={{ delay: 1.3, duration: 0.7, ease: easePremium }} className="mt-8">
              <Link
                to="/coleccion/jardin"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-sm bg-lr-rose px-6 font-sans text-xs font-medium uppercase tracking-[0.22em] text-lr-text shadow-soft transition-colors hover:bg-lr-roseDeep hover:text-lr-surface"
              >
                Descubre la colección <IconArrowRight />
              </Link>
            </motion.div>
          </div>
          <div className="relative">
            <FloralSvg className="pointer-events-none absolute -left-6 top-10 hidden w-16 opacity-80 lg:block xl:w-24" />
            <motion.div variants={clipReveal} initial="initial" animate="animate" className="relative overflow-hidden rounded-sm shadow-medium">
              <img src={heroImg} alt="" className="aspect-[4/5] w-full object-cover lg:aspect-[5/6]" />
            </motion.div>
            {card ? (
              <motion.div
                variants={scaleIn}
                initial="initial"
                animate="animate"
                transition={{ delay: 1.5 }}
                className="absolute -bottom-6 left-4 right-4 max-w-xs rounded-sm border border-lr-border bg-lr-surface p-4 shadow-soft sm:left-8 lg:-bottom-8 lg:left-10"
              >
                <div className="flex gap-3">
                  <img src={card.imagenes[0]} alt="" className="h-20 w-16 rounded-sm object-cover" />
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg tracking-tight">{card.nombre}</p>
                    <p className="font-body text-sm text-lr-textSecondary">{formatPrice(card.precio)}</p>
                    <Link to={`/producto/${card.slug}`} className="mt-2 inline-flex items-center gap-1 font-sans text-xs uppercase tracking-widest text-lr-terracotta hover:underline">
                      Ver <IconArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </div>
        </div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 lg:left-10 lg:translate-x-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-lr-muted">Desliza</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} className="text-lr-terracotta">
            ↓
          </motion.span>
        </motion.div>
      </section>

      {/* Valores */}
      <section className="bg-lr-surfaceAlt py-16 sm:py-20">
        <div className="lr-container grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: IconPlant, t: "Materiales naturales", d: "Algodón, lino, seda. Solo fibras que respiran." },
            { Icon: IconHands, t: "Hecho a mano", d: "Cada prenda confeccionada en talleres familiares." },
            { Icon: IconHeart, t: "Slow fashion", d: "Pocas piezas, mucha intención. Sin temporadas express." },
            { Icon: IconEarth, t: "Ético", d: "Salarios justos, producción local." },
          ].map(({ Icon, t, d }) => (
            <motion.div key={t} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={whileInViewOnce} transition={{ duration: 0.7, ease: easePremium }} className="text-center lg:text-left">
              <Icon className="mx-auto h-8 w-8 text-lr-sageDeep lg:mx-0" />
              <h3 className="mt-4 font-display text-2xl tracking-tight text-lr-text">{t}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-lr-textSecondary">{d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categorías */}
      <section className="lr-container py-16 sm:py-24">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-sage">Explora</p>
        <h2 className="mt-3 font-display text-5xl tracking-tight text-lr-text sm:text-6xl">
          Piezas para <span className="italic text-lr-terracotta">cada momento.</span>
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-4 md:grid-rows-2 md:gap-5">
          {cats.map((c) => (
            <Link
              key={c.slug}
              to={`/tienda/${c.slug}`}
              className={`group relative overflow-hidden rounded-sm bg-lr-surfaceAlt shadow-soft ring-1 ring-lr-border/50 ${c.span}`}
            >
              <div className="aspect-[3/4] w-full md:aspect-auto md:h-full md:min-h-[220px]">
                <img src={c.img} alt="" className="h-full w-full object-cover transition-transform duration-[700ms] ease-premium group-hover:scale-[1.04]" />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-lr-text/55 via-lr-text/10 to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-lr-onDark">
                <p className="font-display text-3xl tracking-tight">{c.label}</p>
                <p className="mt-2 font-sans text-xs uppercase tracking-[0.25em] text-lr-onDark/90">Explorar →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Colección destacada */}
      <section className="lr-container grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={whileInViewOnce} transition={{ duration: 0.75, ease: easePremium }} className="overflow-hidden rounded-sm shadow-medium">
          <img src={jardin?.heroImage ?? heroImg} alt="" className="aspect-[3/4] w-full object-cover" />
        </motion.div>
        <div>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-terracotta">Colección destacada</p>
          <h2 className="mt-4 font-display text-5xl tracking-tight sm:text-6xl">
            Jardín, <span className="italic text-lr-terracotta">una colección que florece.</span>
          </h2>
          <p className="mt-6 font-body text-base leading-relaxed text-lr-textSecondary">{jardin?.descripcion}</p>
          <div className="mt-8 flex gap-3">
            {jardin?.productSlugs.slice(0, 3).map((slug) => {
              const p = getProductBySlug(slug);
              if (!p) return null;
              return (
                <Link key={slug} to={`/producto/${slug}`} className="group block w-24 shrink-0">
                  <div className="overflow-hidden rounded-sm ring-1 ring-lr-border">
                    <img src={p.imagenes[0]} alt="" className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </Link>
              );
            })}
          </div>
          <Link
            to="/coleccion/jardin"
            className="mt-10 inline-flex min-h-[48px] items-center gap-2 font-sans text-xs font-medium uppercase tracking-[0.22em] text-lr-sageDeep underline-offset-4 hover:text-lr-terracotta hover:underline"
          >
            Ver colección completa <IconArrowRight />
          </Link>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="bg-lr-surfaceAlt/60 py-16 sm:py-24">
        <div className="lr-container">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-roseDeep">Favoritas de la temporada</p>
          <h2 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
            Las que <span className="italic text-lr-terracotta">no te debes perder.</span>
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/tienda" className="inline-flex min-h-[48px] items-center justify-center font-sans text-xs font-medium uppercase tracking-[0.22em] text-lr-terracotta hover:underline">
              Ver todos los productos →
            </Link>
          </div>
        </div>
      </section>

      {/* Historia preview */}
      <section className="lr-container grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div className="order-2 lg:order-1">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-sage">Nuestra historia</p>
          <h2 className="mt-4 font-display text-5xl tracking-tight sm:text-6xl">
            Dos hermanas, <span className="italic text-lr-terracotta">un atelier.</span>
          </h2>
          <p className="mt-6 font-body text-base leading-relaxed text-lr-textSecondary">
            Lina y Roma crecieron entre máquinas de coser y macetas de geranio. Hoy, su taller en Guadalajara es un refugio de tela cruda, café recién hecho y decisiones lentas pero firmes.
          </p>
          <Link to="/historia" className="mt-8 inline-flex min-h-[48px] items-center font-sans text-xs font-medium uppercase tracking-[0.22em] text-lr-text hover:text-lr-terracotta">
            Conoce nuestra historia →
          </Link>
        </div>
        <div className="order-1 grid grid-cols-2 gap-4 lg:order-2">
          <motion.img initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={whileInViewOnce} transition={{ duration: 0.7 }} src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80" alt="" className="col-span-2 max-h-72 w-full rounded-sm object-cover object-center shadow-soft" />
          <img src="https://images.unsplash.com/photo-1490367532201-b9bc1d076d6b?auto=format&fit=crop&w=500&q=80" alt="" className="h-44 rounded-sm object-cover shadow-soft" />
          <img src="https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=500&q=80" alt="" className="h-44 -translate-y-6 rounded-sm object-cover shadow-soft" />
        </div>
      </section>

      {/* Diario */}
      <section className="bg-lr-surface py-16 sm:py-24">
        <div className="lr-container">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-terracotta">Del diario</p>
          <h2 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
            Historias, <span className="italic text-lr-terracotta">guías y cuidados.</span>
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {diario.map((post) => (
              <Link key={post.slug} to={`/diario/${post.slug}`} className="group block">
                <div className="overflow-hidden rounded-sm ring-1 ring-lr-border">
                  <img src={post.imagen} alt="" className="aspect-[4/5] w-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.02]" />
                </div>
                <p className="mt-3 font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-lr-sage">{post.categoria}</p>
                <h3 className="mt-1 font-display text-2xl tracking-tight group-hover:text-lr-terracotta">{post.titulo}</h3>
                <p className="mt-2 font-sans text-xs text-lr-muted">{post.fecha}</p>
                <span className="mt-3 inline-block font-sans text-xs uppercase tracking-widest text-lr-terracotta">Leer →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="lr-container py-16 sm:py-24">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-sage">@linayroma</p>
        <h2 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
          Síguenos en <span className="italic text-lr-terracotta">Instagram.</span>
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {ig.map((src, i) => (
            <a key={i} href="https://instagram.com" target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden rounded-sm bg-lr-surfaceAlt">
              <img src={src} alt="" className="h-full w-full object-cover transition-transform duration-[700ms] group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center gap-4 bg-lr-text/35 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="text-sm text-lr-onDark">♥</span>
                <span className="text-sm text-lr-onDark">💬</span>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="https://instagram.com" className="inline-flex min-h-[48px] items-center font-sans text-xs uppercase tracking-[0.22em] text-lr-terracotta hover:underline" target="_blank" rel="noreferrer">
            Ver Instagram →
          </a>
        </div>
      </section>

      {/* Testimonios */}
      <section className="bg-lr-surfaceAlt/70 py-16 sm:py-24">
        <div className="lr-container">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-roseDeep">Amantes de Lina & Roma</p>
          <h2 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
            Lo que dicen <span className="italic text-lr-terracotta">nuestras clientas.</span>
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <motion.figure
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={whileInViewOnce}
                transition={{ duration: 0.7, ease: easePremium }}
                className="rounded-sm border border-lr-border bg-lr-surface p-6 shadow-soft"
              >
                <motion.span initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.35 }} viewport={whileInViewOnce} className="font-display text-5xl italic text-lr-rose">
                  “
                </motion.span>
                <blockquote className="-mt-4 font-display text-xl italic leading-snug text-lr-text">{t.quote}</blockquote>
                <figcaption className="mt-4 font-sans text-xs uppercase tracking-widest text-lr-muted">
                  {t.nombre} · {t.ciudad}
                </figcaption>
                <div className="mt-3 flex gap-1 text-lr-rose">
                  {Array.from({ length: t.estrellas }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <NewsletterCTA />
    </div>
  );
}
