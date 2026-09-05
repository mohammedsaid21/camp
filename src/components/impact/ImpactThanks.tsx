import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/athar/ui/Button";
import { DONATE_ORIGINS, originWhatsapp } from "@/components/athar/data";
import { contributeMessage } from "@/lib/impact/format";
import type { ImpactProject } from "@/lib/impact/types";
import { fadeUp } from "@/components/athar/motion";
import { Money } from "./Money";

export function ImpactThanks({ project, amount }: { project: ImpactProject; amount: number | null }) {
  const message = contributeMessage(project.title, amount);

  return (
    <div className="bg-background px-5 pb-20 pt-28 md:px-10">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mx-auto max-w-lg rounded-3xl bg-card p-6 text-center shadow-[0_8px_28px_#1435280c] md:p-10"
      >
        <Heart className="mx-auto h-8 w-8 fill-accent text-accent" aria-hidden="true" />
        <h1 className="mt-4 text-[clamp(1.8rem,5vw,2.4rem)] font-semibold">لقد صنعت أثرًا</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {amount !== null ? (
            <>
              اخترت تساهم بـ <Money amount={amount} /> في مشروع {project.title}.
            </>
          ) : (
            <>اخترت تساهم في مشروع {project.title}.</>
          )}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          ما في دفع إلكتروني على الموقع. كمّل عبر واتساب، وبعد التنفيذ منشارك التحديثات هنا لما تتوفر.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          {DONATE_ORIGINS.map((origin) => (
            <Button
              key={origin.id}
              href={originWhatsapp(origin.id, message)}
              variant={origin.id === "outside" ? "donate" : "primary"}
              className="w-full"
              arrow={false}
            >
              {origin.label}
              <span className="text-xs font-medium opacity-80">{origin.code}</span>
            </Button>
          ))}
        </div>
        <Button href="/impact" variant="ghost" className="mt-4 w-full" arrow={false}>
          اكتشف أثرًا آخر
        </Button>
      </motion.div>
    </div>
  );
}
