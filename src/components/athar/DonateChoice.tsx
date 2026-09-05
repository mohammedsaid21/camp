import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DONATE_MESSAGE, DONATE_ORIGINS, originWhatsapp } from "./data";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";

type DonateChoiceContextValue = {
  openDonate: (message?: string) => void;
};

const DonateChoiceContext = createContext<DonateChoiceContextValue | null>(null);

export function useDonateChoice() {
  const ctx = useContext(DonateChoiceContext);
  if (!ctx) throw new Error("useDonateChoice must be used inside DonateChoiceProvider");
  return ctx;
}

export function DonateChoiceProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(DONATE_MESSAGE);

  const openDonate = useCallback((nextMessage?: string) => {
    setMessage(nextMessage ?? DONATE_MESSAGE);
    setOpen(true);
  }, []);

  return (
    <DonateChoiceContext.Provider value={{ openDonate }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md gap-4 rounded-3xl border-border p-5 sm:p-6 [&>button]:start-4 [&>button]:end-auto">
          <DialogHeader className="space-y-1 pe-8 text-start">
            <p className="text-sm font-semibold text-primary">قصة التبرع</p>
            <DialogTitle className="text-xl sm:text-2xl">وين بدك تتواصل من؟</DialogTitle>
            <DialogDescription>
              نفس الشغل بالمخيم. الفرق بس برقم الواتساب، عشان الرسالة توصلك أسهل.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            {DONATE_ORIGINS.map((origin) => (
              <Button
                key={origin.id}
                href={originWhatsapp(origin.id, message)}
                variant={origin.id === "outside" ? "donate" : "primary"}
                className="w-full"
                onClick={() => setOpen(false)}
              >
                {origin.label}
                <span className="text-xs font-medium opacity-80">{origin.code}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </DonateChoiceContext.Provider>
  );
}

type DonateButtonProps = {
  children?: ReactNode;
  className?: string;
  size?: "default" | "sm";
  message?: string;
};

export function DonateButton({
  children = "تبرع الآن",
  className,
  size = "default",
  message,
}: DonateButtonProps) {
  const { openDonate } = useDonateChoice();
  const sizes = {
    default: "rounded-full px-7 py-3 text-sm",
    sm: "rounded-full px-5 py-2.5 text-sm",
  };

  return (
    <button
      type="button"
      onClick={() => openDonate(message)}
      className={cn(
        "btn-shine btn-donate inline-flex min-h-11 items-center justify-center gap-2 bg-accent font-semibold text-accent-foreground shadow-[0_10px_24px_#f26b214d] transition-[transform,box-shadow,background] hover:bg-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        sizes[size],
        className,
      )}
    >
      <Heart className="relative z-[1] h-4 w-4 fill-current" aria-hidden="true" />
      <span className="relative z-[1]">{children}</span>
    </button>
  );
}
