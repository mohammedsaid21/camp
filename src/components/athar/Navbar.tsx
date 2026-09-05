import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV } from "./data";
import { Button } from "./ui/Button";
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
        "fixed inset-x-0 top-0 z-50 bg-forest text-forest-foreground transition-all duration-300",
        scrolled ? "py-3 shadow-[0_10px_30px_#0f3d2e40]" : "py-4",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 md:px-10">
        <a
          href="/"
          className="font-display text-[1.75rem] leading-none tracking-tight text-white"
        >
          أثر<span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/#archive" variant="ghostOnDark" size="sm" className="hidden sm:inline-flex">
            شوف التوثيق
          </Button>
          <DonateButton size="sm" className="hidden sm:inline-flex">
            تبرع الآن
          </DonateButton>
          <button
            type="button"
            aria-label="القائمة"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/25 lg:hidden"
          >
            <span
              className={cn(
                "h-px w-4 bg-white transition-transform",
                open && "translate-y-[5px] rotate-45",
              )}
            />
            <span className={cn("h-px w-4 bg-white transition-opacity", open && "opacity-0")} />
            <span
              className={cn(
                "h-px w-4 bg-white transition-transform",
                open && "-translate-y-[5px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/15 bg-forest lg:hidden"
          >
            <ul className="flex flex-col px-5 py-4">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-3.5 text-sm text-white/80"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="flex flex-col gap-2 pt-4">
                <Button href="/#archive" variant="ghostOnDark" className="w-full">
                  شوف التوثيق
                </Button>
                <DonateButton className="w-full">تبرع الآن</DonateButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
