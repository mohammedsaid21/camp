import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import type { ImpactProject } from "@/lib/impact/types";
import { Money } from "./Money";
import { cn } from "@/lib/utils";
import { DONATE_ORIGINS, originWhatsapp } from "@/components/athar/data";
import { Button } from "@/components/athar/ui/Button";

export function ContributePanel({ project }: { project: ImpactProject }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | "custom">(project.contributionPresets[0] ?? 10);
  const [custom, setCustom] = useState("");
  const amount = selected === "custom" ? Number(custom) : selected;
  const valid = Number.isFinite(amount) && amount > 0;
  const tier = useMemo(
    () => (valid ? project.impactTiers.find((item) => item.amountUsd === amount) : undefined),
    [amount, project.impactTiers, valid],
  );

  if (project.contributionPresets.length === 0) {
    return (
      <section className="athar-card p-5 md:p-6">
        <h2 className="text-lg font-semibold">باب المساهمة مفتوح</h2>
        <p className="mt-2 type-small leading-relaxed text-muted-foreground">{project.summary}</p>
        <div className="mt-5 grid gap-2">
          {DONATE_ORIGINS.map((origin) => (
            <Button
              key={origin.id}
              href={
                project.donateMessage
                  ? originWhatsapp(origin.id, project.donateMessage)
                  : originWhatsapp(origin.id)
              }
              variant={origin.id === "outside" ? "donate" : "primary"}
              className="w-full"
            >
              {origin.label}
              <span className="text-xs font-medium opacity-80">{origin.code}</span>
            </Button>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="athar-card p-5 md:p-6">
      <h2 className="text-lg font-semibold">اختر مساهمتك</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.contributionPresets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setSelected(preset)}
            className={cn(
              "min-h-11 rounded-full px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected === preset ? "bg-accent text-accent-foreground" : "bg-ivory text-foreground",
            )}
          >
            <Money amount={preset} />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setSelected("custom")}
          className={cn(
            "min-h-11 rounded-full px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/50",
            selected === "custom" ? "bg-accent text-accent-foreground" : "bg-ivory text-foreground",
          )}
        >
          مبلغ آخر
        </button>
      </div>
      {selected === "custom" && (
        <input
          className="mt-3 h-11 w-full rounded-xl border border-input bg-transparent px-3 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/50"
          dir="ltr"
          inputMode="decimal"
          aria-label="مبلغ آخر"
          value={custom}
          onChange={(e) => setCustom(e.target.value.replace(/[^\d.]/g, ""))}
        />
      )}
      {valid && (
        <p className="mt-4 text-sm leading-relaxed">
          ستساهم بـ <Money amount={amount} className="font-semibold" /> في مشروع: {project.title}
        </p>
      )}
      {tier ? <p className="mt-1 text-sm text-muted-foreground">{tier.what}</p> : null}
      <button
        type="button"
        disabled={!valid}
        onClick={() => {
          if (!valid) return;
          void navigate({
            to: "/impact/$slug/thanks",
            params: { slug: project.slug },
            search: { amount: String(amount) },
          });
        }}
        className="btn-shine btn-donate mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-accent-foreground transition-[transform,background] hover:bg-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/50 disabled:opacity-50"
      >
        <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
        أريد أن أساهم بـ {valid ? <Money amount={amount} /> : "…"}
      </button>
    </section>
  );
}
