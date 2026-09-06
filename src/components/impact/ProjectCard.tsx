import { Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { isFunded } from "@/lib/impact/progress";
import type { ImpactProject } from "@/lib/impact/types";
import { FundingMeter } from "./FundingMeter";

const cardEnter: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function ProjectCard({ project }: { project: ImpactProject }) {
  const funded = isFunded(project.amountRaised, project.targetAmount, project.status);

  return (
    <motion.article variants={cardEnter} className="athar-card group">
      <Link
        to="/impact/$slug"
        params={{ slug: project.slug }}
        className="block transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-ivory">
          <img
            src={project.image}
            alt={project.imageAlt}
            className={
              "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            }
          />
          <span className="absolute top-3 start-3 rounded-full bg-background/92 px-3 py-1 text-xs font-medium backdrop-blur-sm">
            {project.kicker}
          </span>
        </div>
        <div className="space-y-3 p-5">
          <div>
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
            <p className="mt-2 text-xs text-muted-foreground">{project.place}</p>
          </div>
          <FundingMeter project={project} />
          <span className="inline-flex min-h-11 items-center text-sm font-semibold text-primary">
            {funded ? "شوف هالأثر" : "ابدأ هذا الأثر"}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
