import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Drumstick, Droplets, Minus, Plus, Soup, Wheat } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GIVE_PACKS, type GivePackId, originWhatsapp } from "./data";
import { Button } from "./ui/Button";

type GiveMeterContextValue = {
  openMeter: (id: GivePackId) => void;
};

const GiveMeterContext = createContext<GiveMeterContextValue | null>(null);

export function useGiveMeter() {
  const ctx = useContext(GiveMeterContext);
  if (!ctx) throw new Error("useGiveMeter must be used inside GiveMeterProvider");
  return ctx;
}

export function GiveMeterProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<GivePackId | null>(null);
  const openMeter = useCallback((id: GivePackId) => setActiveId(id), []);

  return (
    <GiveMeterContext.Provider value={{ openMeter }}>
      {children}
      <GiveMeterDialog activeId={activeId} onOpenChange={(open) => !open && setActiveId(null)} />
    </GiveMeterContext.Provider>
  );
}

function packById(id: GivePackId) {
  const pack = GIVE_PACKS.find((item) => item.id === id);
  if (!pack) throw new Error(`Unknown give pack: ${id}`);
  return pack;
}

function unitLabel(unit: string, plural: string, qty: number) {
  return qty === 1 ? unit : plural;
}

function kindIcon(id: string) {
  if (id === "chicken") return Drumstick;
  if (id === "meal") return Soup;
  if (id === "water") return Droplets;
  return Wheat;
}

function GiveMeterDialog({
  activeId,
  onOpenChange,
}: {
  activeId: GivePackId | null;
  onOpenChange: (open: boolean) => void;
}) {
  const pack = activeId ? packById(activeId) : GIVE_PACKS[0];
  const [qty, setQty] = useState<number>(pack.defaultQty);
  const [kindId, setKindId] = useState<string>(pack.kinds[0].id);

  useEffect(() => {
    if (!activeId) return;
    const next = packById(activeId);
    setQty(next.defaultQty);
    setKindId(next.kinds[0].id);
  }, [activeId]);

  const kind = pack.kinds.find((item) => item.id === kindId) ?? pack.kinds[0];
  const perUsd = kind.perUsd;
  const total = qty * perUsd;
  const showKinds = pack.kinds.length > 1;
  const Icon = kindIcon(kind.id);
  const percent = ((qty - pack.min) / (pack.max - pack.min)) * 100;
  const units = unitLabel(pack.unit, pack.unitPlural, qty);
  const hint = `كل ${pack.unit} = ${perUsd} دولار. ${pack.defaultQty} ${unitLabel(pack.unit, pack.unitPlural, pack.defaultQty)} = ${pack.defaultQty * perUsd}$.`;

  const sentence = useMemo(
    () => `${pack.action} ${qty} ${units} — ${kind.label} مقابل ${total}$`,
    [pack.action, qty, units, kind.label, total],
  );

  const nudge = (dir: -1 | 1) => {
    setQty((current) => Math.min(pack.max, Math.max(pack.min, current + dir * pack.step)));
  };

  return (
    <Dialog open={activeId !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(92dvh,760px)] w-[calc(100%-1.25rem)] max-w-md gap-3 overflow-y-auto rounded-lg border-border p-4 sm:gap-4 sm:p-8 [&>button]:start-4 [&>button]:end-auto [&>button]:right-auto [&>button]:left-4">
        <DialogHeader className="space-y-1 pe-8 text-start sm:text-start">
          <p className="text-sm font-semibold text-primary">{pack.kicker}</p>
          <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory text-primary sm:h-10 sm:w-10">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            {pack.title}
          </DialogTitle>
          <DialogDescription>{hint}</DialogDescription>
        </DialogHeader>

        {showKinds && (
          <div>
            <p className="mb-2 text-sm font-medium">شو بدك تبعت؟</p>
            <div className="grid grid-cols-3 gap-2">
              {pack.kinds.map((item) => {
                const selected = item.id === kind.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setKindId(item.id)}
                    className={`rounded-2xl border px-2 py-2.5 text-center transition-colors ${
                      selected
                        ? "border-primary bg-ivory text-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <span className="block text-sm font-semibold">{item.label}</span>
                    <span className="mt-0.5 block text-[11px]">{item.desc}</span>
                    <span className={`mt-1 block text-xs font-bold ${selected ? "text-accent" : ""}`}>
                      {item.perUsd}$
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="rounded-lg bg-forest px-4 py-5 text-center text-forest-foreground sm:px-5 sm:py-6">
          <p className="text-sm text-white/70">
            {pack.action} · {kind.label}
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={`${kind.id}-${qty}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="mt-1 font-display text-[clamp(2.2rem,8vw,3.4rem)] leading-none tracking-tight"
            >
              {qty}
            </motion.p>
          </AnimatePresence>
          <p className="mt-1 text-sm text-white/70">{units}</p>
          <p className="mt-3 text-xs text-white/50">المبلغ</p>
          <p className="font-display text-4xl text-accent">${total}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="أقل"
            onClick={() => nudge(-1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground"
          >
            <Minus className="h-4 w-4" />
          </button>
          <input
            dir="ltr"
            type="range"
            min={pack.min}
            max={pack.max}
            step={pack.step}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="give-slider h-2 w-full cursor-pointer appearance-none rounded-full"
            style={{
              background: `linear-gradient(to right, var(--color-primary) ${percent}%, var(--color-surface-2) ${percent}%)`,
            }}
            aria-valuemin={pack.min}
            aria-valuemax={pack.max}
            aria-valuenow={qty}
            aria-label={pack.title}
          />
          <button
            type="button"
            aria-label="أكثر"
            onClick={() => nudge(1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {pack.presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setQty(preset)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                qty === preset
                  ? "bg-primary text-primary-foreground"
                  : "bg-ivory text-foreground hover:bg-surface-2"
              }`}
            >
              {preset} {unitLabel(pack.unit, pack.unitPlural, preset)}
            </button>
          ))}
        </div>

        <p className="text-center text-sm font-medium text-foreground">{sentence}</p>
        {pack.estimate && (
          <div className="rounded-2xl bg-ivory px-3 py-3 text-start text-xs leading-relaxed text-muted-foreground">
            <p className="font-semibold text-foreground">تفاصيل التكلفة</p>
            <p className="mt-1">{pack.estimate}</p>
            <p className="mt-1">يشمل: {pack.includes.join("، ")}.</p>
            <p>ما يشمل: {pack.excludes.join("، ")}</p>
          </div>
        )}
        <p className="text-center text-xs text-muted-foreground">وين بدك تتواصل من؟</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <Button
            href={originWhatsapp(
              "outside",
              `السلام عليكم، حابب أتبرع عبر أثر لمخيم نسائم الرحمة:\n${sentence}`,
            )}
            variant="donate"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            برا غزة
          </Button>
          <Button
            href={originWhatsapp(
              "gaza",
              `السلام عليكم، حابب أتبرع عبر أثر لمخيم نسائم الرحمة:\n${sentence}`,
            )}
            variant="primary"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            من غزة
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
