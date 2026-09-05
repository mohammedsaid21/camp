import { useEffect } from "react";

/** Adds .is-visible to every .reveal element as it scrolls into view. */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 5, 4) * 70}ms`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}
