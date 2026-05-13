import { AnimatePresence, motion } from "framer-motion";
import { useLinaStore } from "../store/useLinaStore";
import { easePremium } from "../lib/animations";

export function CartToast() {
  /** Selectores separados: un objeto nuevo en cada getSnapshot rompe useSyncExternalStore (bucle infinito). */
  const toast = useLinaStore((s) => s.toast);
  const hideToast = useLinaStore((s) => s.hideToast);
  return (
    <AnimatePresence>
      {toast.visible ? (
        <motion.div
          initial={{ opacity: 0, y: -12, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -8, x: 12 }}
          transition={{ duration: 0.45, ease: easePremium }}
          className="fixed right-4 top-24 z-[60] max-w-sm rounded-sm border border-lr-border bg-lr-surface px-4 py-3 font-sans text-sm text-lr-text shadow-medium"
        >
          <div className="flex items-center justify-between gap-4">
            <span>{toast.message}</span>
            <button type="button" className="min-h-[44px] min-w-[44px] text-lr-muted hover:text-lr-terracotta" onClick={hideToast}>
              ×
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
