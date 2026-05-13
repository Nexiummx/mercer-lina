import type { Transition, Variants } from "framer-motion";

/** Easing premium — sensación slow fashion */
export const easePremium: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const durationBase = 0.7;
export const durationHover = 0.4;
export const durationPage = 0.4;

const transitionIn: Transition = {
  duration: durationBase,
  ease: easePremium,
};

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 32 },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitionIn,
  },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: transitionIn,
  },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const wordChild: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: durationBase, ease: easePremium },
  },
};

export const italicWord: Variants = {
  initial: { opacity: 0, skewX: -6 },
  animate: {
    opacity: 1,
    skewX: 0,
    transition: { duration: durationBase * 1.1, ease: easePremium, delay: 0.05 },
  },
};

export const clipReveal: Variants = {
  initial: { clipPath: "inset(100% 0 0 0)" },
  animate: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 1.2, ease: easePremium },
  },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.92 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: durationBase, ease: easePremium, delay: 0.2 },
  },
};

export const whileInViewOnce = {
  once: true,
  margin: "-100px",
  amount: 0.2,
} as const;

export const pageFade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: durationPage, ease: easePremium } },
  exit: { opacity: 0, transition: { duration: durationPage * 0.75, ease: easePremium } },
};
