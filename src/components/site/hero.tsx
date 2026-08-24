import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, CalendarCheck, Sparkles } from "lucide-react";
import portrait from "@/assets/portrait-cutout.png";
import { LOGOS, STATS } from "./data";
import { Reveal } from "./reveal";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setN(value);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1400, 1);
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, reduced]);

  return (
    <span ref={ref} className="font-display text-4xl font-semibold sm:text-5xl">
      {n}
      {suffix}
    </span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "14%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-22%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-40"
      style={{ background: "var(--gradient-hero)" }}
    >
      <motion.div
        aria-hidden="true"
        style={{ y: glowY }}
        className="pointer-events-none absolute -right-24 top-10 h-[28rem] w-[28rem] rounded-full blur-3xl"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: "color-mix(in oklab, var(--clay) 22%, transparent)" }}
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-[22rem] w-[22rem] rounded-full blur-3xl"
        style={{ background: "color-mix(in oklab, var(--gold) 12%, transparent)" }}
      />

      <div className="section-shell relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10 lg:pr-6">
          <Reveal kind="fade" duration={0.7}>
            <p className="eyebrow">
              <span className="rule-accent" />
              Marketing &amp; HR Strategy · MBA '27, SJIM · Bengaluru
            </p>
          </Reveal>

          <Reveal kind="mask" delay={0.1} duration={1}>
            <h1 className="mt-6 max-w-[15ch] text-[2.7rem] font-semibold leading-[1.03] sm:text-6xl lg:text-[4.2rem]">
              Driving Brand Growth through Digital &amp; Content Strategy.
            </h1>
          </Reveal>

          <Reveal kind="up" delay={0.25}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground">
              MBA '27 candidate at St Joseph's Institute of Management specialising in Marketing &amp;
              HR. I blend analytical data, hands-on domain experience and people-first empathy to build
              brand systems that create measurable business impact.
            </p>
          </Reveal>

          <Reveal kind="up" delay={0.38}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="btn-shape btn-primary inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold"
              >
                <CalendarCheck className="h-4 w-4" />
                Schedule a Strategy Call
              </a>
              <a
                href="#experience"
                className="btn-shape btn-ghost inline-flex items-center gap-2 bg-card px-7 py-4 text-sm font-semibold"
              >
                View My Work
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>

        <motion.div style={{ y: portraitY }} className="relative lg:-mr-10">
          <Reveal kind="scale" duration={1.1}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-x-8 bottom-8 top-12 rounded-[3rem] blur-2xl"
                style={{
                  background:
                    "radial-gradient(62% 55% at 50% 42%, color-mix(in oklab, var(--clay) 34%, transparent), transparent 72%)",
                }}
              />
              <motion.img
                src={portrait}
                alt="Evangelin Priyadarshini, marketing and HR strategist"
                loading="eager"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 mx-auto w-full max-w-[30rem] select-none drop-shadow-[0_38px_50px_color-mix(in_oklab,var(--ink)_28%,transparent)] [mask-image:linear-gradient(to_bottom,black_82%,transparent_99%)]"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-2 top-10 z-20 sm:left-6"
              >
                <div className="float-soft card-lux flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold">
                  <Sparkles className="h-4 w-4 text-accent" />
                  Hello! 👋
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-4 left-0 z-20 max-w-[16rem] sm:-left-6"
              >
                <div className="card-lux p-6">
                  <p className="font-display text-2xl font-semibold">MBA '27</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    SJIM — Marketing &amp; HR, applied to real brand growth work.
                  </p>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </motion.div>
      </div>

      <div className="section-shell relative mt-20">
        <Reveal kind="fade">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Experience &amp; study across
          </p>
        </Reveal>
        <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee-track flex w-max items-center gap-12">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <span
                key={`${logo}-${i}`}
                className="whitespace-nowrap font-display text-lg text-muted-foreground/80 transition-colors duration-300 hover:text-foreground"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="section-shell relative mt-20 grid gap-8 border-t border-border pt-12 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} kind="up" delay={i * 0.1}>
            <div>
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
