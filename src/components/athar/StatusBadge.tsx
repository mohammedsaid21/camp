import { cn } from "@/lib/utils";

export const STATUS_TONES = {
  documented: "موثقة",
  complete: "مكتملة",
  active: "نشطة",
  running: "قيد التنفيذ",
  waiting: "بانتظار التوثيق",
  urgent: "عاجل",
  closing: "تقترب من الاكتمال",
} as const;

export type StatusTone = keyof typeof STATUS_TONES;

const TONE_CLASS: Record<StatusTone, string> = {
  documented: "bg-ivory text-primary",
  complete: "bg-ivory text-primary",
  active: "bg-secondary text-foreground",
  running: "bg-secondary text-foreground",
  waiting: "bg-muted text-muted-foreground",
  urgent: "bg-destructive/10 text-destructive",
  closing: "bg-accent/15 text-ember",
};

export function StatusBadge({
  tone,
  label,
  className,
}: {
  tone: StatusTone;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-full px-2.5 type-caption font-medium",
        TONE_CLASS[tone],
        className,
      )}
    >
      {label ?? STATUS_TONES[tone]}
    </span>
  );
}
