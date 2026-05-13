import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Product } from "../types";
import { formatPrice, collectionLabel } from "../lib/data";
import { buildWhatsAppUrl, useLinaStore } from "../store/useLinaStore";
import { fadeUp, whileInViewOnce } from "../lib/animations";
import { IconWhatsApp } from "./icons";

type Props = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className = "" }: Props) {
  const purchaseMode = useLinaStore((s) => s.purchaseMode);
  const [main, second] = product.imagenes;
  const waMsg = `Hola Lina & Roma, me interesa el ${product.nombre} - Talla M - Color ${product.colores[0]?.nombre ?? ""}. ¿Está disponible?`;

  return (
    <motion.article
      variants={fadeUp}
      initial="initial"
      whileInView="animate"
      viewport={whileInViewOnce}
      className={`group relative ${className}`}
    >
      <Link to={`/producto/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-lr-surfaceAlt shadow-soft ring-1 ring-lr-border/60">
          <img
            src={main}
            alt=""
            className="h-full w-full object-cover transition-transform duration-[700ms] ease-premium group-hover:scale-[1.02]"
            loading="lazy"
          />
          {second ? (
            <img
              src={second}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[700ms] ease-premium group-hover:opacity-100"
              loading="lazy"
            />
          ) : null}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(61,46,38,0.04)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-lr-text/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-lr-surface/90 px-3 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-lr-text opacity-0 transition-all duration-500 group-hover:opacity-100 min-h-[44px] min-w-[44px] flex items-center justify-center">
            Ver detalle
          </span>
        </div>
      </Link>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-lr-roseDeep">
            {collectionLabel(product.coleccionSlug)}
          </p>
          <Link to={`/producto/${product.slug}`} className="block truncate font-display text-lg text-lr-text tracking-tight hover:text-lr-terracotta">
            {product.nombre}
          </Link>
          <p className="font-body text-base text-lr-textSecondary">{formatPrice(product.precio)}</p>
        </div>
        {purchaseMode === "whatsapp" ? (
          <a
            href={buildWhatsAppUrl(waMsg)}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-flex h-11 min-w-[44px] shrink-0 items-center justify-center rounded-full border border-lr-border bg-lr-surface px-3 font-sans text-[10px] font-medium uppercase tracking-widest text-lr-sageDeep transition-colors hover:border-lr-sage hover:bg-lr-surfaceAlt"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="flex items-center gap-1">
              <IconWhatsApp className="h-4 w-4" />
              <span className="hidden sm:inline">WA</span>
            </span>
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] rounded-sm bg-lr-surfaceAlt" />
      <div className="mt-3 h-4 w-2/3 rounded bg-lr-surfaceAlt" />
      <div className="mt-2 h-4 w-1/3 rounded bg-lr-surfaceAlt" />
    </div>
  );
}
