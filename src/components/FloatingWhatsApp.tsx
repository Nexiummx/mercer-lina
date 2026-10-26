import { useLocation } from "react-router-dom";
import { buildWhatsAppUrl, useLinaStore } from "../store/useLinaStore";
import { IconWhatsApp } from "./icons";

const DEFAULT_MSG =
  "Hola Lina & Roma, me gustaría recibir asesoría sobre tallas y disponibilidad. ¡Gracias!";

export function FloatingWhatsApp() {
  const mode = useLinaStore((s) => s.purchaseMode);
  const { pathname } = useLocation();
  if (mode !== "whatsapp" || pathname === "/") return null;
  return (
    <a
      href={buildWhatsAppUrl(DEFAULT_MSG)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 min-h-[56px] min-w-[56px] items-center justify-center rounded-full bg-lr-wa text-white shadow-warm transition-transform duration-300 ease-premium hover:scale-105"
      aria-label="WhatsApp"
    >
      <IconWhatsApp className="h-7 w-7 text-white" />
    </a>
  );
}
