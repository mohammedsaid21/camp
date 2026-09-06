/**
 * كتالوج مشاريع الأثر.
 *
 * ما فيش جدول campaigns/projects ولا Supabase في المشروع.
 * المصدر الوحيد الموثّق: محتوى أثر الحالي (FIELD_REPORTS + GIVE_PACKS + بيان المصلى).
 *
 * ممنوع إضافة كفالة يتيم / مأوى / مصدر دخل / تعليم هنا ما لم يُوثَّق مشروع حقيقي.
 * الحقول المالية (target/raised/donors) تبقى null إلى أن يتوفر سجل جمع حقيقي.
 */
import type { ImpactProject } from "./types";
import { MASJID_DONATE_MESSAGE } from "@/components/athar/data";

export const IMPACT_PROJECTS: ImpactProject[] = [
  {
    id: "masjid-sound",
    slug: "masjid-sound",
    title: "جهاز صوت لمصلى نسائم الرحمة",
    kicker: "حملة مفتوحة",
    category: "mosque",
    summary:
      "تجهيز جهاز صوت متكامل للمصلى: أذان، صلاة، دروس، وحلقات قرآن لأكثر من 300 طالب وطالبة. التقدير المعلن من 25,000 إلى 30,000 شيكل، حسب السعر وقت الشراء.",
    problem:
      "المصلى يحتاج جهاز صوت يوصل الأذان والصلاة والدروس بوضوح للمصلين جوا وبرّا، مع مصدر طاقة احتياطي وقت انقطاع الكهرباء.",
    beneficiary:
      "المصلون في مصلى نسائم الرحمة بالنصيرات، وطلبة حلقات القرآن (أكثر من 300 طالب وطالبة).",
    goal: "تركيب كيبل، سماعات داخلية وخارجية، جهاز صوت متكامل، مايك، ومحوّل وبطارية حسب الحاجة.",
    useOfFunds:
      "حسب بيان المشروع: كيبل صوت ≈ 400 شيكل، سماعات خارجية 5,000، سماعات داخلية 5,000، جهاز صوت متكامل 5,000، ومايك ومحوّل وبطارية 100 أمبير حسب السعر. الأسعار تقديرية وبتتأكد وقت الشراء.",
    image: "/athar/videos/masjid.jpg",
    imageAlt: "مصلى نسائم الرحمة في النصيرات",
    documentUrl: "/athar/masjid-campaign.jpg",
    donateMessage: MASJID_DONATE_MESSAGE,
    place: "النصيرات — غرب مقبرة السوارحة",
    status: "open",
    targetAmount: null,
    amountRaised: null,
    donorCount: null,
    priority: 1,
    currency: "USD",
    contributionPresets: [],
    impactTiers: [],
    updates: [
      { id: "open", label: "باب المساهمة مفتوح", done: true, at: null },
      { id: "run", label: "الشراء والتركيب بعد تجميع المساهمات", done: false, at: null },
      { id: "doc", label: "التوثيق يُنشر بعد التجهيز", done: false, at: null },
    ],
    createdAt: null,
    completedAt: null,
  },
  {
    id: "feed-families",
    slug: "feed-families",
    title: "أطعم عائلة",
    kicker: "غذاء",
    category: "food",
    summary: "ساهم في توفير الغذاء لعائلة في مخيم نسائم الرحمة: خبز، جاجة، أو طبخة.",
    problem: "العائلات بالمخيم تحتاج لقمة كريمة تصل للبيت، مو وعد عام.",
    beneficiary: "عائلات داخل مخيم نسائم الرحمة. ما مننشر أسماء أو وجوه بدون موافقة.",
    goal: "تجميع مساهمات تتحوّل لربطات خبز أو طبخة أو جاجة، حسب الاتفاق وقت التنفيذ.",
    useOfFunds: "شراء المادة الغذائية، تجهيزها، وتوزيعها بالمخيم. الأسعار تقدير حسب تكلفة التنفيذ الحالية، وبتتأكد وقت الشراء.",
    image: "/athar/packs.jpg",
    imageAlt: "تجهيز ربطات غذائية للتوزيع",
    place: "مخيم نسائم الرحمة",
    status: "open",
    targetAmount: null,
    amountRaised: null,
    donorCount: null,
    priority: null,
    currency: "USD",
    contributionPresets: [10, 25, 50, 100],
    impactTiers: [
      { amountUsd: 2, what: "ربطة خبز لعائلة، حسب تقدير التنفيذ الحالي." },
      { amountUsd: 10, what: "خبز لخمس عائلات (5 × 2$)." },
      { amountUsd: 15, what: "طبخة لعائلة." },
      { amountUsd: 20, what: "جاجة لعائلة." },
    ],
    updates: [
      { id: "open", label: "المساهمة مفتوحة عبر واتساب", done: true, at: null },
      { id: "run", label: "التنفيذ بعد تجميع المساهمات", done: false, at: null },
      { id: "doc", label: "التوثيق يُنشر بعد التوزيع", done: false, at: null },
    ],
    createdAt: null,
    completedAt: null,
  },
  {
    id: "water-truck",
    slug: "water-truck",
    title: "مياه لناس عطشى",
    kicker: "سقيا",
    category: "essentials",
    summary: "ساهم في سقيا من شاحنة الماء بالمخيم. التقدير معلن: 100 شخص ≈ 200$.",
    problem: "الماء بالمخيم بند تنفيذ، مش شراء شاحنة.",
    beneficiary: "أسر وأفراد داخل مخيم نسائم الرحمة يستفيدون من توزيع الماء.",
    goal: "توفير ماء منقول للمخيم وتوزيعه.",
    useOfFunds: "شراء الماء، نقله للمخيم، وتوزيعه. ما يشمل شراء شاحنة. اللتر والأيام بتننشر مع كل تنفيذ.",
    image: "/athar/water.jpg",
    imageAlt: "توزيع ماء في المخيم",
    place: "مخيم نسائم الرحمة",
    status: "open",
    targetAmount: null,
    amountRaised: null,
    donorCount: null,
    priority: null,
    currency: "USD",
    contributionPresets: [20, 50, 100, 200],
    impactTiers: [
      { amountUsd: 2, what: "سقيا لشخص واحد، حسب التقدير الحالي." },
      { amountUsd: 50, what: "سقيا لنحو 25 شخصًا (50$ ÷ 2$)." },
      { amountUsd: 200, what: "تقدير توفير الماء لـ100 شخص." },
    ],
    updates: [
      { id: "open", label: "المساهمة مفتوحة عبر واتساب", done: true, at: null },
      { id: "run", label: "التنفيذ بعد الاتفاق على الكمية", done: false, at: null },
      { id: "doc", label: "التوثيق يُنشر بعد التوزيع", done: false, at: null },
    ],
    createdAt: null,
    completedAt: null,
  },
  {
    id: "khubz-done",
    slug: "khubz-done",
    title: "توزيع الخبز",
    kicker: "مكتمل",
    category: "food",
    summary: "أثر موثّق: ربطات خبز وصلت لـ80 عائلة داخل مخيم نسائم الرحمة.",
    problem: "حاجة العائلات للخبز في المخيم.",
    beneficiary: "80 عائلة داخل المخيم، من عدّ التوزيع نفسه، مو تقدير لسكان المخيم كامل.",
    goal: "وصل الخبز للعائلات المستفيدة. المشروع مكتمل.",
    useOfFunds: "تم التنفيذ. تاريخ الشراء وعدد الربطات والتكلفة تُضاف من سجل التنفيذ لما ينرفق، وما منختراعها.",
    image: "/athar/videos/khubz.jpg",
    imageAlt: "توثيق توزيع الخبز في المخيم",
    place: "مخيم نسائم الرحمة",
    status: "completed",
    targetAmount: null,
    amountRaised: null,
    donorCount: null,
    priority: null,
    currency: "USD",
    contributionPresets: [],
    impactTiers: [],
    updates: [
      { id: "done", label: "اكتمل التنفيذ", done: true, at: null },
      { id: "doc", label: "التوثيق بالفيديو منشور على الموقع", done: true, at: null },
    ],
    createdAt: null,
    completedAt: null,
  },
  {
    id: "iftar-done",
    slug: "iftar-done",
    title: "إفطار صائم",
    kicker: "مكتمل",
    category: "food",
    summary: "أثر موثّق: أكثر من 200 صائم على سفرة واحدة في مخيم نسائم الرحمة.",
    problem: "حاجة الإفطار الجماعي في المخيم.",
    beneficiary: "أكثر من 200 صائم على سفرة واحدة في المخيم.",
    goal: "جمع الصائمين على سفرة. المشروع مكتمل.",
    useOfFunds: "تم التنفيذ. فيديو الإفطار، التاريخ، والكمية تُضاف مع سجل التنفيذ لما يكتمل رفعه.",
    image: "/athar/food.jpg",
    imageAlt: "توثيق سفرة إفطار في المخيم",
    place: "مخيم نسائم الرحمة",
    status: "completed",
    targetAmount: null,
    amountRaised: null,
    donorCount: null,
    priority: null,
    currency: "USD",
    contributionPresets: [],
    impactTiers: [],
    updates: [
      { id: "done", label: "اكتمل التنفيذ", done: true, at: null },
      { id: "doc", label: "الرقم من عدّ الإفطار بالمخيم", done: true, at: null },
    ],
    createdAt: null,
    completedAt: null,
  },
];

export function getImpactProject(slug: string) {
  return IMPACT_PROJECTS.find((project) => project.slug === slug) ?? null;
}

export async function loadImpactProjects() {
  return IMPACT_PROJECTS;
}
