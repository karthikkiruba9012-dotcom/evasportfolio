import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type RevealKind = "fade" | "up" | "left" | "right" | "scale" | "blur" | "mask";

const EASE = [0.22, 1, 0.36, 1] as const;

const variantsFor = (kind: RevealKind): Variants => {
  switch (kind) {
    case "up":
      return { hidden: { opacity: 0, y: 42 }, show: { opacity: 1, y: 0 } };
    case "left":
      return { hidden: { opacity: 0, x: -48 }, show: { opacity: 1, x: 0 } };
    case "right":
      return { hidden: { opacity: 0, x: 48 }, show: { opacity: 1, x: 0 } };
    case "scale":
      return { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } };
    case "blur":
      return { hidden: { opacity: 0, filter: "blur(14px)", y: 18 }, show: { opacity: 1, filter: "blur(0px)", y: 0 } };
    case "mask":
      return {
        hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      };
    default:
      return { hidden: { opacity: 0 }, show: { opacity: 1 } };
  }
};

export function Reveal({
  children,
  kind = "up",
  delay = 0,
  duration = 0.85,
  className,
}: {
  children: ReactNode;
  kind?: RevealKind;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={variantsFor(kind)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -8% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.12,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  kind = "up",
}: {
  children: ReactNode;
  className?: string;
  kind?: RevealKind;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={variantsFor(kind)}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
