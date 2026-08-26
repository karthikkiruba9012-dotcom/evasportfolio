import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ *
 * 1. PARALLAX — background layers drift slower than the foreground.
 * ------------------------------------------------------------------ */

export function ParallaxScene({
  children,
  className,
  id,
}: {
  children: (progress: MotionValue<number>) => ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.0005 });
  return (
    <div ref={ref} id={id} className={className}>
      {children(smooth)}
    </div>
  );
}

export function ParallaxLayer({
  progress,
  distance = 120,
  className,
  children,
}: {
  progress: MotionValue<number>;
  distance?: number;
  className?: string;
  children?: ReactNode;
}) {
  const reduced = useReducedMotion();
  const y = useTransform(progress, [0, 1], [distance, -distance]);
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div style={{ y, willChange: "transform" }} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * 2. STICKY CARD STACK — the section lifts over the previous one.
 * ------------------------------------------------------------------ */

export function StickyStack({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.93, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [64, 34]);
  const shadow = useTransform(
    scrollYProgress,
    [0, 1],
    ["0 -10px 40px rgba(10,18,32,0.10)", "0 -34px 90px rgba(10,18,32,0.30)"],
  );

  if (reduced)
    return (
      <div ref={ref} id={id} className={className}>
        {children}
      </div>
    );

  return (
    <div ref={ref} className="relative">
      <motion.div
        id={id}
        style={{
          scale,
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
          boxShadow: shadow,
          transformOrigin: "top center",
          willChange: "transform",
        }}
        className={`relative z-10 overflow-hidden ${className ?? ""}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 3. STAGGERED MICRO-INTERACTIONS — text + cards cascade upward.
 * ------------------------------------------------------------------ */

export function Cascade({
  children,
  className,
  stagger = 0.1,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function CascadeItem({
  children,
  className,
  distance = 34,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: distance, filter: "blur(6px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{ duration: 0.75, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * 4. BLUR-TO-FOCUS + SCALE-UP — scroll-linked, frame-perfect.
 * ------------------------------------------------------------------ */

export function BlurFocus({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "center 0.62"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 22, restDelta: 0.001 });
  const scale = useTransform(smooth, [0, 1], [0.94, 1]);
  const opacity = useTransform(smooth, [0, 0.6, 1], [0.25, 0.9, 1]);
  const filter = useTransform(smooth, [0, 1], ["blur(12px)", "blur(0px)"]);

  if (reduced)
    return (
      <div ref={ref} id={id} className={className}>
        {children}
      </div>
    );

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      style={{ scale, opacity, filter, willChange: "transform, filter, opacity" }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * 5. PERSPECTIVE TILT — cards swing up from a 3D plane.
 * ------------------------------------------------------------------ */

export function TiltIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={{ perspective: 1100 }}
      initial={{ opacity: 0, rotateX: 14, y: 46, transformOrigin: "bottom center" }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.95, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * 6. CURTAIN WIPE — clip-path reveal for the closing sections.
 * ------------------------------------------------------------------ */

export function CurtainReveal({
  children,
  className,
  from = "bottom",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  from?: "bottom" | "left";
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  const hiddenClip =
    from === "left" ? "inset(0% 100% 0% 0%)" : "inset(100% 0% 0% 0%)";
  return (
    <motion.div
      className={className}
      initial={{ clipPath: hiddenClip, opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.05, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
