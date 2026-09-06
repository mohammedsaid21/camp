import { isFunded } from "@/lib/impact/progress";
import type { ImpactProject } from "@/lib/impact/types";
import { Button } from "@/components/athar/ui/Button";
import { ShareBar } from "@/components/athar/ShareBar";
import { StatusBadge } from "@/components/athar/StatusBadge";
import { ContributePanel } from "./ContributePanel";
import { FundingMeter } from "./FundingMeter";
import { Money } from "./Money";

export function ProjectDetail({ project }: { project: ImpactProject }) {
  const funded = isFunded(project.amountRaised, project.targetAmount, project.status);

  return (
    <article className="bg-background pb-20 pt-24 md:pt-28">
      <div className="mx-auto max-w-5xl px-5 md:px-10">
        <div className="flex flex-wrap gap-1.5">
          <StatusBadge tone={funded ? "complete" : "active"} />
          {funded ? <StatusBadge tone="documented" /> : <StatusBadge tone="waiting" />}
        </div>
        <p className="type-kicker mt-3">{project.kicker}</p>
        <h1 className="type-h1 mt-2">{project.title}</h1>
        <p className="mt-3 max-w-[52ch] type-body text-muted-foreground">{project.summary}</p>
        <p className="mt-1 type-small text-muted-foreground">{project.place}</p>
        <ShareBar title={`${project.title} — أثر`} path={`/impact/${project.slug}`} className="mt-4" />

        <div className="mt-6 overflow-hidden rounded-lg bg-ivory">
          <img src={project.image} alt={project.imageAlt} className="aspect-[16/9] w-full object-cover" />
        </div>
        {project.documentUrl ? (
          <a
            href={project.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="athar-card mt-4 flex items-center gap-3 p-3 transition-colors hover:bg-ivory"
          >
            <img
              src={project.documentUrl}
              alt=""
              className="h-[4.5rem] w-12 shrink-0 rounded-md object-cover object-top"
            />
            <span>
              <span className="block font-medium">بيان المشروع</span>
              <span className="type-caption text-muted-foreground">المكونات والتكلفة التقديرية — يفتح كما هو</span>
            </span>
          </a>
        ) : null}

        <FundingMeter project={project} size="detail" />

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold">عن المشروع</h2>
              <dl className="mt-4 space-y-4 text-sm leading-relaxed">
                <div>
                  <dt className="font-medium">ما المشكلة؟</dt>
                  <dd className="mt-1 text-muted-foreground">{project.problem}</dd>
                </div>
                <div>
                  <dt className="font-medium">من المستفيد؟</dt>
                  <dd className="mt-1 text-muted-foreground">{project.beneficiary}</dd>
                </div>
                <div>
                  <dt className="font-medium">ماذا نريد أن نحقق؟</dt>
                  <dd className="mt-1 text-muted-foreground">{project.goal}</dd>
                </div>
                <div>
                  <dt className="font-medium">كيف تُستخدم المساهمة؟</dt>
                  <dd className="mt-1 text-muted-foreground">{project.useOfFunds}</dd>
                </div>
              </dl>
            </section>

            {project.impactTiers.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold">أثر تبرعك</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.impactTiers.map((tier) => (
                    <li key={tier.amountUsd} className="rounded-md bg-ivory p-4">
                      <p className="font-display text-xl text-accent">
                        <Money amount={tier.amountUsd} />
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tier.what}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.updates.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold">رحلة الأثر</h2>
                <ol className="mt-4 space-y-3">
                  {project.updates.map((item) => (
                    <li key={item.id} className="flex gap-3 text-sm">
                      <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.done ? "bg-primary" : "bg-border"}`}
                        aria-hidden="true"
                      />
                      <span>
                        <span className={item.done ? "font-medium" : "text-muted-foreground"}>{item.label}</span>
                        {item.at ? <span className="block text-xs text-muted-foreground">{item.at}</span> : null}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>

          <aside className="order-first lg:order-none lg:sticky lg:top-28 lg:self-start">
            {funded ? (
              <div className="rounded-lg bg-forest p-5 text-forest-foreground">
                <p className="type-h3">اكتمل هذا الأثر</p>
                <p className="mt-2 type-small leading-relaxed text-white/75">
                  {project.donorCount !== null
                    ? `بفضل مساهمات ${project.donorCount} متبرعًا، وصل المشروع إلى هدفه.`
                    : "هالمشروع موثّق كمكتمل على الموقع. ما في عدّاد جمع منشور له."}
                </p>
                <Button href="/videos" variant="ghostOnDark" className="mt-5 w-full" arrow={false}>
                  شاهد التوثيق
                </Button>
                <Button href="/impact" variant="ghostOnDark" className="mt-2 w-full" arrow={false}>
                  شاهد مشاريع أخرى
                </Button>
              </div>
            ) : (
              <ContributePanel project={project} />
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
