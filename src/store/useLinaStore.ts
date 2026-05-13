import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PurchaseMode } from "../types";

export type CartLine = {
  key: string;
  productId: string;
  slug: string;
  nombre: string;
  imagen: string;
  precio: number;
  talla: string;
  colorNombre: string;
  cantidad: number;
};

type ToastState = { message: string; visible: boolean };

type LinaState = {
  purchaseMode: PurchaseMode;
  setPurchaseMode: (mode: PurchaseMode) => void;
  cart: CartLine[];
  addToCart: (line: Omit<CartLine, "key"> & { key?: string }) => void;
  removeFromCart: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  clearCart: () => void;
  toast: ToastState;
  showToast: (message: string) => void;
  hideToast: () => void;
};

function lineKey(slug: string, talla: string, colorNombre: string) {
  return `${slug}__${talla}__${colorNombre}`;
}

export const WHATSAPP_NUMBER = "5233123456789";

export function buildWhatsAppUrl(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export const useLinaStore = create<LinaState>()(
  persist(
    (set, get) => ({
      purchaseMode: "whatsapp",
      setPurchaseMode: (purchaseMode) => set({ purchaseMode }),
      cart: [],
      addToCart: (line) => {
        const key = line.key ?? lineKey(line.slug, line.talla, line.colorNombre);
        const prev = get().cart;
        const existing = prev.find((l) => l.key === key);
        if (existing) {
          set({
            cart: prev.map((l) =>
              l.key === key ? { ...l, cantidad: l.cantidad + line.cantidad } : l,
            ),
          });
        } else {
          set({ cart: [...prev, { ...line, key }] });
        }
        get().showToast("Agregado al carrito");
      },
      removeFromCart: (key) =>
        set({ cart: get().cart.filter((l) => l.key !== key) }),
      updateQty: (key, qty) => {
        if (qty < 1) {
          get().removeFromCart(key);
          return;
        }
        set({
          cart: get().cart.map((l) => (l.key === key ? { ...l, cantidad: qty } : l)),
        });
      },
      clearCart: () => set({ cart: [] }),
      toast: { message: "", visible: false },
      showToast: (message) => {
        set({ toast: { message, visible: true } });
        window.setTimeout(() => get().hideToast(), 2800);
      },
      hideToast: () => set({ toast: { message: "", visible: false } }),
    }),
    {
      name: "lina-roma-store",
      partialize: (s) => ({
        purchaseMode: s.purchaseMode,
        cart: s.cart,
      }),
    },
  ),
);
