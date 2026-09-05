import { formatUsd } from "@/lib/impact/format";
import { cn } from "@/lib/utils";

export function Money({ amount, className }: { amount: number; className?: string }) {
  return (
    <span dir="ltr" className={cn("inline-block", className)}>
      {formatUsd(amount)}
    </span>
  );
}
