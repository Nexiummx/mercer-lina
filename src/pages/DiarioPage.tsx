import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { blogPosts } from "../lib/data";
import { fadeUp, whileInViewOnce } from "../lib/animations";

const tabs = ["Todos", "Cuidados", "Estilo", "Historias", "Recetas", "Sostenibilidad"];

export default function DiarioPage() {
  const [tab, setTab] = useState("Todos");
  const featured = blogPosts.find((b) => b.destacado) ?? blogPosts[0];
  const list = useMemo(() => {
    if (tab === "Todos") return blogPosts.filter((b) => b.slug !== featured.slug);
    return blogPosts.filter((b) => b.categoria === tab && b.slug !== featured.slug);
  }, [tab, featured.slug]);

  return (
    <div className="pb-20">
      <section className="lr-container py-12 text-center">
        <h1 className="font-display text-5xl tracking-tight sm:text-7xl">
          El diario de <span className="italic text-lr-terracotta">Lina & Roma</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-body text-lg leading-relaxed text-lr-textSecondary">Historias, guías y cuidados desde nuestro atelier.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`min-h-[44px] rounded-full border px-4 font-sans text-xs uppercase tracking-widest ${
                tab === t ? "border-lr-terracotta bg-lr-rose/30" : "border-lr-border hover:border-lr-terracotta"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="lr-container py-6">
        <div className="grid overflow-hidden rounded-sm border border-lr-border bg-lr-surface shadow-soft lg:grid-cols-2">
          <Link to={`/diario/${featured.slug}`} className="group block">
            <div className="aspect-[4/5] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
              <img src={featured.imagen} alt="" className="h-full w-full object-cover transition-transform duration-[800ms] group-hover:scale-[1.02]" />
            </div>
          </Link>
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <span className="inline-flex max-w-max rounded-full bg-lr-sage/25 px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-lr-sageDeep">
              {featured.categoria}
            </span>
            <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
              <Link to={`/diario/${featured.slug}`} className="hover:text-lr-terracotta">
                {featured.titulo}
              </Link>
            </h2>
            <p className="mt-4 line-clamp-3 font-body text-base leading-relaxed text-lr-textSecondary">{featured.extracto}</p>
            <p className="mt-6 font-sans text-xs uppercase tracking-widest text-lr-muted">
              {featured.autor} · {featured.fecha}
            </p>
            <Link to={`/diario/${featured.slug}`} className="mt-8 inline-flex min-h-[48px] items-center font-sans text-xs uppercase tracking-[0.22em] text-lr-terracotta hover:underline">
              Leer artículo →
            </Link>
          </div>
        </div>
      </section>

      <section className="lr-container py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {list.map((post) => (
            <motion.article key={post.slug} variants={fadeUp} initial="initial" whileInView="animate" viewport={whileInViewOnce}>
              <Link to={`/diario/${post.slug}`} className="group block">
                <div className="overflow-hidden rounded-sm ring-1 ring-lr-border">
                  <img src={post.imagen} alt="" className="aspect-[4/5] w-full object-cover transition-transform duration-[800ms] group-hover:scale-[1.02]" />
                </div>
                <span className="mt-3 inline-block rounded-full bg-lr-sage/20 px-2 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-lr-sageDeep">
                  {post.categoria}
                </span>
                <h3 className="mt-2 font-display text-2xl tracking-tight group-hover:text-lr-terracotta">{post.titulo}</h3>
                <p className="mt-2 line-clamp-2 font-body text-sm leading-relaxed text-lr-textSecondary">{post.extracto}</p>
                <p className="mt-3 font-sans text-[10px] uppercase tracking-widest text-lr-muted">
                  {post.autor} · {post.fecha}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>
        <div className="mt-10 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-3 w-3 rounded-full ${i === 0 ? "bg-lr-terracotta" : "bg-lr-border"}`} />
          ))}
        </div>
      </section>
    </div>
  );
}
