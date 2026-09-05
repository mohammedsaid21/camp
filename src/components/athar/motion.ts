import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 56 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export const imageReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", scale: 1.08, opacity: 0.4 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    scale: 1,
    opacity: 1,
    transition: { duration: 1.15, ease: [0.16, 1, 0.3, 1] },
  },
};

export const pop3d: Variants = {
  hidden: { opacity: 0, rotateX: 28, y: 40, scale: 0.92 },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const stagger = (delay = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: delay, delayChildren: 0.08 },
  },
});

export const viewport = {
  once: true,
  amount: 0.18,
  margin: "0px 0px -80px 0px",
} as const;
