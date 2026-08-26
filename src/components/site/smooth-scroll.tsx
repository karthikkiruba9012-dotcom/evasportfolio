import { useEffect } from "react";

/**
 * Global buttery-smooth scrolling (Lenis) — mounted once at the page root.
 * Respects prefers-reduced-motion and stays passive for touch devices
 * so mobile keeps its native momentum feel.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void; scrollTo: (t: unknown, o?: unknown) => void } | null =
      null;
    let cancelled = false;

    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]') as
        | HTMLAnchorElement
        | null;
      if (!anchor || !lenis) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -88, duration: 1.35 });
    };

    void (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      const instance = new Lenis({
        duration: 1.15,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.6,
      });
      lenis = instance as unknown as typeof lenis;

      const loop = (time: number) => {
        instance.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      document.addEventListener("click", onAnchorClick);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onAnchorClick);
      lenis?.destroy();
    };
  }, []);

  return null;
}
