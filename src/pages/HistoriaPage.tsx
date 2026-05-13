import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { founders } from "../lib/data";
import { NewsletterCTA } from "../components/NewsletterCTA";
import { fadeUp, whileInViewOnce } from "../lib/animations";

const milestones = [
  {
    year: "2018",
    t: "Lina y Roma comienzan a coser en su casa",
    d: "Entre tazas de té y retazos heredados, nació la promesa de hacer menos, pero mejor.",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    year: "2020",
    t: "Abre el primer atelier en Guadalajara",
    d: "Un espacio pequeño con luz cálida, perchas de madera y clientas que buscaban lo mismo: calma.",
    img: "https://images.unsplash.com/photo-1490367532201-b9bc1d076d6b?auto=format&fit=crop&w=900&q=80",
  },
  {
    year: "2022",
    t: "Primera colección con materiales 100% naturales",
    d: "Lino, algodón orgánico y seda certificada. Sin mezclas opacas.",
    img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80",
  },
  {
    year: "2024",
    t: "Colaboraciones con talleres familiares en Oaxaca",
    d: "Tejido, bordado y tintes naturales: manos que firman cada pieza.",
    img: "https://images.unsplash.com/photo-1434389677669-e08b4cac310f?auto=format&fit=crop&w=900&q=80",
  },
];

export default function HistoriaPage() {
  return (
    <div>
      <section className="lr-container py-16 text-center">
        <h1 className="font-display text-5xl tracking-tight sm:text-7xl lg:text-8xl">
          Dos hermanas, <span className="italic text-lr-terracotta">un atelier.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-3xl font-body text-lg leading-relaxed text-lr-textSecondary">
          Lina & Roma es una carta de amor al tiempo lento: a la ropa que acompaña años, a las manos que la hacen posible y a las mujeres que eligen vestir con conciencia sin perder romance.
        </p>
      </section>

      <section className="lr-container space-y-16 py-12">
        {milestones.map((m, i) => (
          <motion.div
            key={m.year}
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={whileInViewOnce}
            className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
          >
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <img src={m.img} alt="" className="aspect-[4/5] w-full rounded-sm object-cover shadow-soft" />
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <p className="font-display text-7xl italic text-lr-rose/80">{m.year}</p>
              <h2 className="mt-4 font-display text-4xl tracking-tight">{m.t}</h2>
              <p className="mt-4 font-body text-base leading-relaxed text-lr-textSecondary">{m.d}</p>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="bg-lr-surfaceAlt/70 py-20">
        <div className="lr-container">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-terracotta">Las fundadoras</p>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {founders.map((f) => (
              <article key={f.id} className="rounded-sm border border-lr-border bg-lr-surface p-6 shadow-soft">
                <img src={f.imagen} alt="" className="aspect-[3/4] w-full rounded-sm object-cover" />
                <h3 className="mt-6 font-display text-3xl tracking-tight">{f.nombre}</h3>
                <p className="mt-1 font-sans text-xs uppercase tracking-widest text-lr-muted">{f.rol}</p>
                <p className="mt-4 font-body text-sm leading-relaxed text-lr-textSecondary">{f.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lr-container py-20">
        <h2 className="text-center font-display text-4xl tracking-tight">Nuestros valores</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {["Transparencia", "Materiales vivos", "Comunidad", "Belleza lenta"].map((v) => (
            <div key={v} className="text-center">
              <p className="font-display text-2xl italic text-lr-terracotta">✦</p>
              <h3 className="mt-3 font-display text-2xl tracking-tight">{v}</h3>
              <p className="mt-2 font-body text-sm text-lr-textSecondary">Parte de nuestro ADN, no de nuestro marketing.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-lr-surfaceDeep py-20 text-lr-onDark">
        <div className="lr-container">
          <h2 className="font-display text-4xl tracking-tight">Nuestros talleres</h2>
          <p className="mt-4 max-w-2xl font-body leading-relaxed text-lr-onDark/85">
            Visitamos cada espacio donde cosemos: tomamos té, revisamos iluminación y escuchamos sugerencias. La moda justa empieza por salarios claros y respeto mutuo.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {["1521572163474-6864f9cf17ab", "1544966503-7cc5ac882d5f", "1503341450023-01fd367fbdaa"].map((id) => (
              <img key={id} src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`} alt="" className="h-56 w-full rounded-sm object-cover" />
            ))}
          </div>
        </div>
      </section>

      <section className="lr-container py-20 text-center">
        <Link to="/coleccion/jardin" className="inline-flex min-h-[52px] items-center justify-center rounded-sm bg-lr-terracotta px-10 font-sans text-xs font-medium uppercase tracking-[0.22em] text-lr-surface hover:bg-lr-roseDeep">
          Conoce la colección actual
        </Link>
      </section>

      <NewsletterCTA />
    </div>
  );
}
