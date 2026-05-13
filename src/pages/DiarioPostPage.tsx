import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ScrollProgressBar } from "../components/ScrollProgressBar";
import { NewsletterCTA } from "../components/NewsletterCTA";
import { getBlogBySlug, blogPosts } from "../lib/data";
import { easePremium, fadeUp, whileInViewOnce } from "../lib/animations";

function slugifyHeading(text: string, i: number) {
  return `${text.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 24)}-${i}`;
}

export default function DiarioPostPage() {
  const { slug } = useParams();
  const post = slug ? getBlogBySlug(slug) : undefined;

  const toc = useMemo(() => {
    if (!post) return [];
    return post.contenido
      .map((b, i) => {
        if (b.type === "h2" || b.type === "h3") {
          const id = b.id ?? slugifyHeading(b.text ?? "seccion", i);
          return { id, label: b.text ?? "", level: b.type };
        }
        return null;
      })
      .filter(Boolean) as { id: string; label: string; level: string }[];
  }, [post]);

  const related = useMemo(() => blogPosts.filter((b) => b.slug !== post?.slug).slice(0, 3), [post]);

  if (!post) return <Navigate to="/diario" replace />;

  return (
    <div>
      <ScrollProgressBar />
      <header className="relative">
        <div className="relative h-[min(70vh,640px)] w-full overflow-hidden">
          <img src={post.imagen} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-lr-bg via-lr-bg/55 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 lr-container pb-12 text-center">
            <span className="inline-flex rounded-full bg-lr-sage/30 px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-lr-sageDeep">
              {post.categoria}
            </span>
            <h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl tracking-tight sm:text-7xl">{post.titulo}</h1>
            <p className="mt-4 font-sans text-xs uppercase tracking-[0.25em] text-lr-muted">
              {post.autor} · {post.fecha} · {post.tiempoLectura}
            </p>
          </div>
        </div>
      </header>

      <div className="lr-container grid gap-12 py-12 lg:grid-cols-[1fr_3fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-32 space-y-8">
            <div>
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-lr-terracotta">En esta página</p>
              <ul className="mt-3 space-y-2 font-sans text-xs uppercase tracking-widest text-lr-muted">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="hover:text-lr-terracotta">
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2 font-sans text-[10px] uppercase tracking-widest">
              <a href="https://instagram.com" className="underline">
                Instagram
              </a>
              <span className="text-lr-border">/</span>
              <button type="button" className="underline" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                Copiar enlace
              </button>
            </div>
            <div className="rounded-sm border border-lr-border p-4">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" alt="" className="h-16 w-16 rounded-full object-cover" />
              <p className="mt-3 font-display text-xl">{post.autor}</p>
              <p className="mt-2 font-body text-sm leading-relaxed text-lr-textSecondary">{post.bioAutora ?? "Equipo editorial Lina & Roma."}</p>
            </div>
          </div>
        </aside>

        <article className="max-w-[720px] font-body text-base leading-loose text-lr-textSecondary">
          {post.contenido.map((block, i) => {
            if (block.type === "p") {
              const isFirst = post.contenido.findIndex((b) => b.type === "p") === i;
              if (isFirst && block.text) {
                const first = block.text.charAt(0);
                const rest = block.text.slice(1);
                return (
                  <p key={i} className="mt-6 first:mt-0">
                    <span className="float-left mr-3 mt-1 font-display text-6xl italic leading-none text-lr-terracotta">{first}</span>
                    {rest}
                  </p>
                );
              }
              return (
                <p key={i} className="mt-6">
                  {block.text}
                </p>
              );
            }
            if (block.type === "h2")
              return (
                <h2 key={i} id={block.id ?? slugifyHeading(block.text ?? "h2", i)} className="mt-12 font-display text-4xl tracking-tight text-lr-text">
                  {block.text}
                </h2>
              );
            if (block.type === "h3")
              return (
                <h3 key={i} id={block.id ?? slugifyHeading(block.text ?? "h3", i)} className="mt-10 font-display text-3xl tracking-tight text-lr-text">
                  {block.text}
                </h3>
              );
            if (block.type === "quote")
              return (
                <blockquote key={i} className="mt-8 border-l-2 border-lr-rose pl-6 font-display text-2xl italic leading-snug text-lr-text">
                  {block.text}
                </blockquote>
              );
            if (block.type === "ul")
              return (
                <ul key={i} className="mt-6 list-disc space-y-2 pl-6 marker:text-lr-terracotta">
                  {block.items?.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              );
            if (block.type === "img")
              return (
                <figure key={i} className="mt-10">
                  <img src={block.src} alt="" className="w-full rounded-sm object-cover" />
                  {block.caption ? <figcaption className="mt-2 font-sans text-[10px] uppercase tracking-widest text-lr-muted">{block.caption}</figcaption> : null}
                </figure>
              );
            return null;
          })}
        </article>
      </div>

      <section className="lr-container py-12">
        <h2 className="font-display text-3xl tracking-tight">Artículos relacionados</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {related.map((r) => (
            <Link key={r.slug} to={`/diario/${r.slug}`} className="group block">
              <img src={r.imagen} alt="" className="aspect-[4/5] w-full rounded-sm object-cover shadow-soft transition-transform duration-700 group-hover:scale-[1.02]" />
              <h3 className="mt-3 font-display text-2xl tracking-tight group-hover:text-lr-terracotta">{r.titulo}</h3>
            </Link>
          ))}
        </div>
      </section>

      <motion.section variants={fadeUp} initial="initial" whileInView="animate" viewport={whileInViewOnce} transition={{ duration: 0.7, ease: easePremium }} className="lr-container pb-20 text-center">
        <p className="font-display text-4xl italic text-lr-terracotta">Suscríbete al diario</p>
        <p className="mx-auto mt-3 max-w-lg font-body text-lr-textSecondary">Historias y cuidados en tu bandeja, sin ruido.</p>
      </motion.section>

      <NewsletterCTA />
    </div>
  );
}
