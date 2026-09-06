import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV } from "./data";
import { DonateButton } from "./DonateChoice";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-forest text-forest-foreground transition-[padding,box-shadow] duration-300",
        scrolled ? "py-2.5 shadow-card" : "py-3.5",
      )}
    >
      <div className="athar-wrap flex items-center justify-between gap-4">
        <a href="/" className="font-display text-[1.65rem] leading-none tracking-tight text-white">
          أثر<span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="التنقل الرئيسي">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="type-small text-white/75 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <DonateButton size="sm">تبرع الآن</DonateButton>
          <button
            type="button"
            aria-label="القائمة"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 flex-col items-center justify-center gap-1.5 rounded-full border border-white/25 md:hidden"
          >
            <span className={cn("h-px w-4 bg-white transition-transform", open && "translate-y-[5px] rotate-45")} />
            <span className={cn("h-px w-4 bg-white transition-opacity", open && "opacity-0")} />
            <span className={cn("h-px w-4 bg-white transition-transform", open && "-translate-y-[5px] -rotate-45")} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-white/15 bg-forest md:hidden"
          >
            <ul className="flex flex-col px-5 py-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-3.5 type-small text-white/80"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
