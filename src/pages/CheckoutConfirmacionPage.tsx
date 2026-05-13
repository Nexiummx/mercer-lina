import { Link } from "react-router-dom";

export default function CheckoutConfirmacionPage() {
  return (
    <div className="lr-container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-5xl italic text-lr-sageDeep">Gracias</p>
      <p className="mt-4 max-w-md font-body text-lg leading-relaxed text-lr-textSecondary">Tu compra demo fue registrada. En un entorno real, aquí verías número de pedido y seguimiento.</p>
      <Link to="/tienda" className="mt-10 inline-flex min-h-[48px] items-center rounded-sm bg-lr-terracotta px-8 font-sans text-xs font-medium uppercase tracking-[0.22em] text-lr-surface">
        Seguir explorando
      </Link>
    </div>
  );
}
