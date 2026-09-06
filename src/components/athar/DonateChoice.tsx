import { Heart } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DONATE_MESSAGE, DONATE_ORIGINS, originWhatsapp } from "./data";
import { Button, buttonBase, buttonSizes, buttonVariants } from "./ui/Button";
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
        <DialogContent className="max-w-md gap-4 rounded-lg border-border p-5 sm:p-6 [&>button]:start-4 [&>button]:end-auto">
          <DialogHeader className="space-y-1 pe-8 text-start">
            <p className="type-kicker">قصة التبرع</p>
            <DialogTitle className="type-h2">وين بدك تتواصل من؟</DialogTitle>
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

  return (
    <button
      type="button"
      onClick={() => openDonate(message)}
      className={cn(buttonBase, buttonSizes[size], buttonVariants.donate, className)}
    >
      <Heart className="relative z-[1] size-4 fill-current" aria-hidden="true" />
      <span className="relative z-[1]">{children}</span>
    </button>
  );
}
