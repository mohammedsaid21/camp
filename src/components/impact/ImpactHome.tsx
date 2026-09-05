import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { loadImpactProjects } from "@/lib/impact/catalog";
import { projectProgress } from "@/lib/impact/progress";
import { IMPACT_CATEGORIES, IMPACT_INTENTS, type ImpactCategoryId } from "@/lib/impact/types";
import type { ImpactProject } from "@/lib/impact/types";
import { Button } from "@/components/athar/ui/Button";
import { VerseBand } from "@/components/athar/VerseBand";
import { PathSteps } from "@/components/athar/PathSteps";
import { HADITH_UMMAH, HERO_IMAGE } from "@/components/athar/data";
import { stagger, viewport } from "@/components/athar/motion";
import { ProjectCard } from "./ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type SortId = "newest" | "closest" | "supported";

function sortProjects(projects: ImpactProject[], sort: SortId) {
  const copy = [...projects];
  if (sort === "closest") {
    copy.sort((a, b) => {
      const pa = projectProgress(a.amountRaised, a.targetAmount);
      const pb = projectProgress(b.amountRaised, b.targetAmount);
      if (pa === null && pb === null) return 0;
      if (pa === null) return 1;
      if (pb === null) return -1;
      return pb - pa;
    });
  } else if (sort === "supported") {
    copy.sort((a, b) => (b.donorCount ?? -1) - (a.donorCount ?? -1));
  }
  return copy;
}

export function ImpactHome({ initialProjects }: { initialProjects: ImpactProject[] }) {
  const [category, setCategory] = useState<ImpactCategoryId>("all");
  const [sort, setSort] = useState<SortId>("newest");
  const query = useQuery({
    queryKey: ["impact-projects"],
    queryFn: loadImpactProjects,
    initialData: initialProjects,
    staleTime: Infinity,
  });

  const visible = useMemo(() => {
    const list = query.data ?? [];
    const filtered = category === "all" ? list : list.filter((item) => item.category === category);
    return sortProjects(filtered, sort);
  }, [category, query.data, sort]);

  const sorts = useMemo(() => {
    const list = query.data ?? [];
    const items: { id: SortId; label: string }[] = [{ id: "newest", label: "الأحدث" }];
    if (list.some((item) => projectProgress(item.amountRaised, item.targetAmount) !== null)) {
      items.push({ id: "closest", label: "الأقرب للاكتمال" });
    }
    if (list.some((item) => item.donorCount !== null)) {
      items.push({ id: "supported", label: "الأكثر دعمًا" });
    }
    return items;
  }, [query.data]);

  function chooseCategory(next: ImpactCategoryId) {
    setCategory(next);
    document.getElementById("project-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-background pb-16 pt-24 md:pt-28">
      <section className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.1fr)_0.9fr]">
          <div>
            <p className="text-sm font-semibold text-primary">أثر تصنعه بإيدك</p>
            <h1 className="mt-2 text-[clamp(2.2rem,8vw,4.2rem)] font-semibold leading-[1.1]">اصنع أثرًا</h1>
            <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-muted-foreground md:text-lg">
              اختر أثرًا تريد أن تتركه، وساهم في تحويل تبرعك إلى شيء ملموس في حياة إنسان.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <Button href="#projects" arrow={false} className="w-full sm:w-auto">
                اختر مشروعك
              </Button>
              <Button href="#how" variant="ghost" className="w-full sm:w-auto" arrow={false}>
                كيف يعمل؟
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl">
            <img
              src={HERO_IMAGE}
              alt="توثيق ميداني من مخيم نسائم الرحمة"
              className="aspect-[5/4] w-full object-cover sm:aspect-[16/10] lg:aspect-[5/4]"
            />
          </div>
        </div>
      </section>

      <div className="mt-10">
        <VerseBand ayah={HADITH_UMMAH.text} surah={HADITH_UMMAH.source} />
      </div>

      <section id="projects" className="scroll-mt-28 mx-auto mt-12 max-w-7xl px-5 md:px-10">
        <h2 className="text-2xl font-semibold md:text-[1.85rem]">ماذا تريد أن تصنع اليوم؟</h2>
        <p className="mt-2 max-w-[48ch] text-sm text-muted-foreground md:text-base">
          اختر المشروع الأقرب إلى قلبك، وساهم بالمبلغ الذي تستطيع.
        </p>

        <p className="mt-3 text-xs text-muted-foreground">
          البطاقات أنواع أثر. المشاريع الظاهرة تحت هي اللي عندنا تنفيذ أو مساهمة مفتوحة إلها.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {IMPACT_INTENTS.map((intent) => (
            <button
              key={intent.id}
              type="button"
              onClick={() => chooseCategory(intent.id)}
              aria-pressed={category === intent.id}
              className={cn(
                "rounded-3xl bg-card p-4 text-start shadow-[0_8px_28px_#1435280c] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/50 md:p-5",
                category === intent.id && "ring-2 ring-primary/40",
              )}
            >
              <h3 className="text-base font-semibold md:text-lg">{intent.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground md:text-sm">{intent.description}</p>
            </button>
          ))}
        </div>

        <div
          className="mt-8 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="تصفية المشاريع"
        >
          {IMPACT_CATEGORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={category === item.id}
              onClick={() => setCategory(item.id)}
              className={cn(
                "min-h-11 shrink-0 rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/50",
                category === item.id ? "bg-forest text-forest-foreground" : "bg-ivory text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {sorts.length > 1 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">ترتيب</span>
            {sorts.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSort(item.id)}
                className={cn(
                  "min-h-11 rounded-full px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/50",
                  sort === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        <div id="project-grid" className="scroll-mt-28">
          {query.isPending && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-3xl" />
              ))}
            </div>
          )}

          {query.isError && (
            <div className="mt-10 rounded-3xl bg-ivory p-8 text-center">
              <p className="font-semibold">تعذر تحميل المشاريع.</p>
              <button
                type="button"
                onClick={() => void query.refetch()}
                className="mt-4 min-h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/50"
              >
                حاول مرة أخرى
              </button>
            </div>
          )}

          {query.isSuccess && visible.length === 0 && (
            <div className="mt-10 rounded-3xl bg-ivory p-8 text-center">
              <p className="font-semibold">لا توجد مشاريع متاحة حاليًا.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                نعمل على إضافة مشاريع جديدة قريبًا. ما منعرض مشاريع وهمية بهالتصنيف.
              </p>
            </div>
          )}

          {query.isSuccess && visible.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger(0.08)}
              className="mt-8 grid gap-6 sm:grid-cols-2"
            >
              {visible.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <section id="how" className="scroll-mt-28 mx-auto mt-16 max-w-7xl px-5 md:px-10">
        <h2 className="text-2xl font-semibold">كيف يعمل؟</h2>
        <p className="mt-2 text-sm text-muted-foreground">بعد الرسالة، نفس المسار من المخيم للأرشيف.</p>
        <div className="mt-6 rounded-3xl bg-ivory px-5 py-6 md:px-8 md:py-7">
          <PathSteps />
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-5 md:px-10">
        <div className="rounded-3xl bg-forest px-5 py-8 text-forest-foreground md:px-10">
          <h2 className="text-2xl font-semibold">تبرعك لا ينتهي عند الدفع.</h2>
          <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-white/75">
            نتابع المشاريع ونشارك تحديثاتها على الموقع لما يصير تنفيذ وتوثيق. ما منوعد ببريد تلقائي ما دام مش موجود
            بالنظام.
          </p>
          <dl className="mt-6 grid gap-4 md:grid-cols-3">
            <div>
              <dt className="text-sm font-semibold">وين يروح التبرع؟</dt>
              <dd className="mt-1 text-sm text-white/70">
                عبر واتساب للفريق، وبعدها تنفيذ بالمخيم حسب النوع المتفق عليه.
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold">كيف نتابع؟</dt>
              <dd className="mt-1 text-sm text-white/70">تصوير من الأرض بعد التوزيع، والأرقام من العدّ الميداني.</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold">كيف توصلك التحديثات؟</dt>
              <dd className="mt-1 text-sm text-white/70">بتظهر على صفحات التوثيق والفيديو بالموقع بعد التنفيذ.</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
