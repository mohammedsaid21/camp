export const IMPACT_CATEGORIES = [
  { id: "all", label: "كل المشاريع" },
  { id: "orphans", label: "الأيتام" },
  { id: "families", label: "الأسر" },
  { id: "food", label: "الغذاء" },
  { id: "shelter", label: "المأوى" },
  { id: "income", label: "مصدر دخل" },
  { id: "education", label: "التعليم" },
  { id: "essentials", label: "الاحتياجات الأساسية" },
  { id: "mosque", label: "المسجد" },
] as const;

export type ImpactCategoryId = (typeof IMPACT_CATEGORIES)[number]["id"];

export const IMPACT_INTENTS = [
  {
    id: "orphans",
    title: "كفالة يتيم",
    description: "ساعد في توفير احتياجات يتيم الأساسية والتعليمية والمعيشية.",
  },
  {
    id: "shelter",
    title: "مأوى لعائلة",
    description: "ساهم في توفير خيمة أو مأوى وتجهيزات أساسية لعائلة فقدت منزلها.",
  },
  {
    id: "food",
    title: "أطعم عائلة",
    description: "ساهم في توفير الغذاء والاحتياجات الأساسية لعائلة محتاجة.",
  },
  {
    id: "income",
    title: "مصدر دخل لعائلة",
    description: "ساهم في إنشاء أو دعم مشروع صغير يساعد عائلة على بناء مصدر دخل مستدام.",
  },
  {
    id: "education",
    title: "دعم تعليم طفل",
    description: "ساهم في توفير احتياجات تعليمية لطفل.",
  },
  {
    id: "essentials",
    title: "مياه واحتياجات أساسية",
    description: "ساهم في توفير المياه والاحتياجات الأساسية للأسر المحتاجة.",
  },
  {
    id: "mosque",
    title: "جهّز المصلى",
    description: "ساهم في تجهيز جهاز صوت لمصلى نسائم الرحمة: أذان، صلاة، وحلقات قرآن.",
  },
] as const satisfies ReadonlyArray<{
  id: Exclude<ImpactCategoryId, "all" | "families">;
  title: string;
  description: string;
}>;

export type ImpactStatus = "open" | "completed";

export type ImpactTier = {
  amountUsd: number;
  /** وصف مربوط بسعر معلن في الموقع، مش ادّعاء جديد. */
  what: string;
};

export type ImpactUpdate = {
  id: string;
  label: string;
  done: boolean;
  at: string | null;
};

export type ImpactProject = {
  id: string;
  slug: string;
  title: string;
  kicker: string;
  category: Exclude<ImpactCategoryId, "all">;
  summary: string;
  problem: string;
  beneficiary: string;
  goal: string;
  useOfFunds: string;
  image: string;
  imageAlt: string;
  documentUrl?: string;
  donateMessage?: string;
  place: string;
  status: ImpactStatus;
  targetAmount: number | null;
  amountRaised: number | null;
  donorCount: number | null;
  priority: number | null;
  currency: "USD";
  contributionPresets: number[];
  impactTiers: ImpactTier[];
  updates: ImpactUpdate[];
  createdAt: string | null;
  completedAt: string | null;
};
