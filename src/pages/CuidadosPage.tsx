import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { careGuides } from "../lib/data";
import { fadeUp, whileInViewOnce } from "../lib/animations";

export default function CuidadosPage() {
  return (
    <div className="pb-20">
      <section className="lr-container py-16 text-center">
        <h1 className="font-display text-5xl tracking-tight sm:text-7xl">
          Cuidados, <span className="italic text-lr-terracotta">amor a tus prendas.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-body text-lg leading-relaxed text-lr-textSecondary">Una prenda bien cuidada dura una vida.</p>
      </section>

      <section className="lr-container grid gap-8 md:grid-cols-2">
        {careGuides.map((g) => (
          <motion.article key={g.id} variants={fadeUp} initial="initial" whileInView="animate" viewport={whileInViewOnce}>
            <Link to={`/diario/${g.slug}`} className="group block overflow-hidden rounded-sm border border-lr-border bg-lr-surface shadow-soft">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={g.imagen} alt="" className="h-full w-full object-cover transition-transform duration-[800ms] group-hover:scale-[1.02]" />
              </div>
              <div className="p-6">
                <h2 className="font-display text-3xl tracking-tight group-hover:text-lr-terracotta">{g.titulo}</h2>
                <p className="mt-3 line-clamp-2 font-body text-sm leading-relaxed text-lr-textSecondary">{g.extracto}</p>
                <span className="mt-4 inline-block font-sans text-xs uppercase tracking-widest text-lr-terracotta">Leer →</span>
              </div>
            </Link>
          </motion.article>
        ))}
      </section>

      <section className="lr-container py-16">
        <div className="rounded-sm border border-lr-sage/30 bg-lr-sage/15 px-8 py-10 text-center">
          <h2 className="font-display text-3xl tracking-tight">Servicio de reparación</h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-lr-textSecondary">
            Si tu pieza Lina & Roma necesita reparación, lo hacemos gratis durante los primeros 12 meses. Escríbenos con fotos.
          </p>
          <Link to="/contacto" className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-sm bg-lr-sageDeep px-8 font-sans text-xs font-medium uppercase tracking-[0.22em] text-lr-onDark hover:bg-lr-text">
            Agendar cita
          </Link>
        </div>
      </section>
    </div>
  );
}
