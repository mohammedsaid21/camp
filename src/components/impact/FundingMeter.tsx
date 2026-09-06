import { motion } from "framer-motion";
import { isFunded, projectProgress, remainingAmount } from "@/lib/impact/progress";
import type { ImpactProject } from "@/lib/impact/types";
import { Money } from "./Money";

export function FundingMeter({
  project,
  size = "card",
}: {
  project: ImpactProject;
  size?: "card" | "detail";
}) {
  const progress = projectProgress(project.amountRaised, project.targetAmount);
  const remaining = remainingAmount(project.amountRaised, project.targetAmount);
  const funded = isFunded(project.amountRaised, project.targetAmount, project.status);

  if (progress === null || project.amountRaised === null || project.targetAmount === null) {
    if (funded) {
      return (
        <p className={size === "detail" ? "mt-6 text-base font-medium text-primary" : "text-sm font-medium text-primary"}>
          اكتمل هذا الأثر
        </p>
      );
    }
    return (
      <p className={size === "detail" ? "mt-6 text-sm text-muted-foreground" : "text-sm text-muted-foreground"}>
        مساهمة مفتوحة — ما في عدّاد جمع منشور لهالمشروع بعد.
      </p>
    );
  }

  const rounded = Math.round(progress);
  const barHeight = size === "detail" ? "h-2" : "h-1.5";

  return (
    <div className={size === "detail" ? "mt-6" : undefined}>
      <div className={`mb-1.5 flex justify-between ${size === "detail" ? "text-lg font-semibold" : "text-sm"}`}>
        <span>
          <Money amount={project.amountRaised} />
        </span>
        <span className="text-muted-foreground">
          <Money amount={project.targetAmount} />
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={rounded}
        aria-label="نسبة إنجاز المشروع"
        className={`overflow-hidden rounded-full bg-ivory ${barHeight}`}
      >
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {funded ? "اكتمل المشروع" : remaining !== null ? <>المتبقي <Money amount={remaining} /></> : null}
        {size === "detail" ? ` · ${rounded}%` : null}
        {project.donorCount !== null ? ` · ${project.donorCount} مساهمًا` : ""}
      </p>
    </div>
  );
}
