import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { easePremium } from "../lib/animations";

const faqs = [
  { q: "¿Hacen envíos internacionales?", a: "Por ahora enviamos solo en México. Pronto Canadá y EE.UU." },
  { q: "¿Puedo cambiar talla?", a: "Sí, 15 días para cambio sin costo en Guadalajara y envío gratis en primera talla." },
  { q: "¿Cómo lavar mis piezas?", a: "Consulta nuestra guía en /cuidados — regla de oro: agua fría y sombra." },
  { q: "¿Aceptan visitas al atelier?", a: "Sí, con cita previa los martes y jueves por la tarde." },
  { q: "¿Trabajan a medida?", a: "Ajustes menores sin costo en compras recientes; diseños a medida en lista de espera." },
];

export default function ContactoPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="pb-20">
      <section className="lr-container py-12 text-center">
        <h1 className="font-display text-6xl tracking-tight sm:text-8xl">Hablemos.</h1>
      </section>

      <section className="lr-container grid gap-12 pb-16 lg:grid-cols-2">
        <div>
          <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80" alt="" className="aspect-[4/3] w-full rounded-sm object-cover shadow-soft" />
          <div className="mt-8 space-y-4 font-body text-lr-textSecondary">
            <p>
              <strong className="text-lr-text">Atelier Lina & Roma</strong>
              <br />
              Av. La Paz 1450, Col. Americana, Guadalajara, Jalisco.
            </p>
            <p>Lun–Sáb 11:00 – 19:00</p>
            <p>
              Tel: +52 33 1234 5678
              <br />
              WhatsApp: +52 33 1234 5678
              <br />
              hola@linayroma.mx
            </p>
          </div>
        </div>
        <div>
          <form
            className="space-y-6 rounded-sm border border-lr-border bg-lr-surface p-6 shadow-soft"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label className="block font-sans text-xs uppercase tracking-widest text-lr-muted">
              Nombre
              <input className="mt-2 w-full min-h-[48px] border-0 border-b border-lr-rose bg-transparent font-body outline-none" />
            </label>
            <label className="block font-sans text-xs uppercase tracking-widest text-lr-muted">
              Email
              <input type="email" className="mt-2 w-full min-h-[48px] border-0 border-b border-lr-rose bg-transparent font-body outline-none" />
            </label>
            <label className="block font-sans text-xs uppercase tracking-widest text-lr-muted">
              Asunto
              <select className="mt-2 w-full min-h-[48px] border-0 border-b border-lr-rose bg-transparent font-body outline-none">
                <option>Compra y tallas</option>
                <option>Colaboraciones</option>
                <option>Prensa</option>
                <option>Otro</option>
              </select>
            </label>
            <label className="block font-sans text-xs uppercase tracking-widest text-lr-muted">
              Mensaje
              <textarea rows={4} className="mt-2 w-full resize-none border-0 border-b border-lr-rose bg-transparent font-body outline-none" />
            </label>
            <button type="submit" className="w-full min-h-[52px] rounded-sm bg-lr-terracotta font-sans text-xs font-medium uppercase tracking-[0.22em] text-lr-surface hover:bg-lr-roseDeep">
              Enviar
            </button>
          </form>
        </div>
      </section>

      <section className="lr-container py-12">
        <h2 className="font-display text-3xl tracking-tight">Tiendas físicas</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {[
            {
              t: "Guadalajara Centro",
              d: "Mercado Baratillo, local 12 (demo)",
              img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=80",
            },
            {
              t: "Zapopan",
              d: "Av. Acueducto 450, planta baja (demo)",
              img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
            },
          ].map((s) => (
            <article key={s.t} className="overflow-hidden rounded-sm border border-lr-border bg-lr-surface shadow-soft">
              <img src={s.img} alt="" className="h-48 w-full object-cover" />
              <div className="p-6">
                <h3 className="font-display text-2xl">{s.t}</h3>
                <p className="mt-2 font-body text-sm text-lr-textSecondary">{s.d}</p>
                <p className="mt-2 font-sans text-xs uppercase tracking-widest text-lr-muted">Mar–Dom 10:00 – 20:00</p>
                <div className="mt-4 h-28 rounded-sm bg-lr-surfaceAlt ring-1 ring-lr-border/60" aria-label="Mapa ilustrativo" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="lr-container max-w-3xl py-12">
        <h2 className="font-display text-3xl tracking-tight">Preguntas frecuentes</h2>
        <div className="mt-6 divide-y divide-lr-border rounded-sm border border-lr-border bg-lr-surface">
          {faqs.map((f, i) => (
            <div key={f.q}>
              <button type="button" className="flex min-h-[52px] w-full items-center justify-between px-4 py-3 text-left font-sans text-sm uppercase tracking-widest text-lr-text" onClick={() => setOpen((k) => (k === i ? null : i))}>
                {f.q}
                <span className="text-lr-muted">{open === i ? "−" : "+"}</span>
              </button>
              <AnimatePresence initial={false}>
                {open === i ? (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: easePremium }} className="overflow-hidden">
                    <p className="px-4 pb-4 font-body text-sm leading-relaxed text-lr-textSecondary">{f.a}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
