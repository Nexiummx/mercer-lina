import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { CartToast } from "./CartToast";
import { pageFade } from "../lib/animations";

export function SiteLayout() {
  const loc = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [loc.pathname, loc.search]);

  return (
    <div className="min-h-screen bg-lr-bg">
      <Header />
      <main className="pt-[112px] sm:pt-[104px] lg:pt-[88px]">
        <AnimatePresence mode="wait">
          <motion.div key={loc.pathname} variants={pageFade} initial="initial" animate="animate" exit="exit">
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CartToast />
    </div>
  );
}
