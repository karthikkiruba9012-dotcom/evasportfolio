import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { NAV_LINKS } from "./data";

const SECTIONS = [{ label: "Intro", href: "#top" }, ...NAV_LINKS];

export function SectionTracker() {
  const [active, setActive] = useState(SECTIONS[0].href);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, restDelta: 0.001 });

  useEffect(() => {
    const ids = SECTIONS.map((s) => s.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Section progress"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div className="relative flex flex-col items-end gap-3 pr-4">
        <div className="absolute right-[3px] top-1 bottom-1 w-px bg-border" aria-hidden="true">
          <motion.div
            style={{ scaleY: progress }}
            className="h-full w-full origin-top"
            aria-hidden="true"
          >
            <div className="h-full w-full" style={{ background: "var(--gradient-gold)" }} />
          </motion.div>
        </div>
        {SECTIONS.map((section) => {
          const isActive = active === section.href;
          return (
            <a
              key={section.href}
              href={section.href}
              className="group flex items-center gap-2.5"
              aria-current={isActive ? "true" : undefined}
            >
              <span
                className={`text-[0.62rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive
                    ? "text-foreground opacity-100"
                    : "text-muted-foreground opacity-0 group-hover:opacity-100"
                }`}
              >
                {section.label}
              </span>
              <span
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  isActive ? "scale-[1.9]" : "bg-border group-hover:bg-muted-foreground"
                }`}
                style={isActive ? { background: "var(--gradient-gold)" } : undefined}
              />
            </a>
          );
        })}
      </div>
    </motion.aside>
  );
}
