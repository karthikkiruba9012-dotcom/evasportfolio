import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { CalendarCheck, Menu, X } from "lucide-react";
import { NAV_LINKS } from "./data";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-border/70 bg-background/80 backdrop-blur-xl shadow-[var(--shadow-soft)]"
            : "bg-transparent"
        }`}
      >
        <nav className="section-shell flex items-center justify-between py-4">
          <a href="#top" className="group flex items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full ring-1 ring-border transition-shadow duration-500 group-hover:shadow-[var(--shadow-glow)]"
              style={{ background: "color-mix(in oklab, var(--gold) 12%, var(--card))" }}
            >
              <img
                src="/Screenshot 2026-08-25 115046.png"
                alt="Eva's Portfolio logo"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="font-display text-base font-semibold tracking-tight">
              Evangelin Priyadarshini
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-[var(--gradient-gold)] after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-shape btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em]"
            >
              <CalendarCheck className="h-3.5 w-3.5" />
              Strategy Call
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="btn-shape btn-ghost flex h-10 w-10 items-center justify-center lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>

        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="section-shell flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-2 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          style={{ scaleX: progress }}
          className="h-[2px] origin-left"
          aria-hidden="true"
        >
          <div className="h-full w-full" style={{ background: "var(--gradient-gold)" }} />
        </motion.div>
      </motion.div>
    </header>
  );
}
