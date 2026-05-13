import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, whileInViewOnce } from "../lib/animations";

export function NewsletterCTA() {
  const [v, setV] = useState("");
  return (
    <motion.section
      variants={fadeUp}
      initial="initial"
      whileInView="animate"
      viewport={whileInViewOnce}
      className="lr-container py-16 sm:py-20"
    >
      <div
        className="relative overflow-hidden rounded-sm border border-lr-sage/25 bg-lr-sage/15 px-6 py-10 sm:px-10 sm:py-12"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(212,165,160,0.12), transparent 40%), radial-gradient(circle at 80% 0%, rgba(196,165,116,0.12), transparent 35%)",
        }}
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-lr-sageDeep">
              Newsletter
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-lr-text sm:text-5xl">
              Únete al <span className="italic text-lr-terracotta">jardín.</span>
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-lr-textSecondary">
              Recibe nuestras colecciones, historias y cuidados — sin prisa, con intención.
            </p>
          </div>
          <form
            className="flex w-full flex-col gap-4 sm:flex-row sm:items-center lg:max-w-md"
            onSubmit={(e) => {
              e.preventDefault();
              setV("");
            }}
          >
            <label className="sr-only" htmlFor="nl-email">
              Correo
            </label>
            <input
              id="nl-email"
              type="email"
              value={v}
              onChange={(e) => setV(e.target.value)}
              placeholder="tu@correo.com"
              className="min-h-[48px] flex-1 border-0 border-b border-lr-rose bg-transparent font-body text-base text-lr-text outline-none ring-0 placeholder:text-lr-muted focus:border-lr-roseDeep"
            />
            <button
              type="submit"
              className="min-h-[48px] min-w-[44px] rounded-sm bg-lr-sageDeep px-6 font-sans text-xs font-medium uppercase tracking-[0.2em] text-lr-onDark transition-colors hover:bg-lr-text"
            >
              Suscribirme
            </button>
          </form>
        </div>
      </div>
    </motion.section>
  );
}
