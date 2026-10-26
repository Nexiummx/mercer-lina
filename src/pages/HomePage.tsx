import { useEffect, useRef } from "react";
import {
  CloseCta,
  CostPerWear,
  EditorialShop,
  FounderQuote,
  LinaHero,
  PieceTour,
} from "../components/home/HomeApple";

export default function HomePage() {
  const root = useRef<HTMLDivElement>(null);

  // Marca con `is-in` cada [data-reveal] la primera vez que entra en vista.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    el.querySelectorAll("[data-reveal]").forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={root}>
      <LinaHero />
      <PieceTour />
      <CostPerWear />
      <EditorialShop />
      <FounderQuote />
      <CloseCta />
    </div>
  );
}
