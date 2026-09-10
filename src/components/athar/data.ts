export const NAV = [
  { label: "الفيديوهات", href: "/videos" },
  { label: "احسب زكاتك", href: "/zakat" },
] as const;

export const HADITH_UMMAH = {
  text: "مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ، وَتَرَاحُمِهِمْ، كَمَثَلِ الْجَسَدِ الْوَاحِدِ",
  source: "حديث نبوي — رواه البخاري ومسلم",
} as const;

/** أرقام واتساب بصيغة دولية بدون +. */
export const WHATSAPP_OUTSIDE_NUMBER = "963940644953";
export const WHATSAPP_GAZA_NUMBER = "972595572743";

export const DONATE_MESSAGE =
  "السلام عليكم، حابب أتبرع عبر أثر لمخيم نسائم الرحمة.";

export const MASJID_DONATE_MESSAGE =
  "السلام عليكم، حابب أساهم في مشروع تجهيز جهاز صوت لمصلى نسائم الرحمة.";

export function whatsappHref(message = DONATE_MESSAGE, number = WHATSAPP_OUTSIDE_NUMBER) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const DONATE_ORIGINS = [
  {
    id: "outside",
    label: "برا غزة",
    kicker: "من خارج القطاع",
    d: "تواصل على واتساب، وبتختار نوع المساعدة والمبلغ.",
    number: WHATSAPP_OUTSIDE_NUMBER,
    code: "+963",
  },
  {
    id: "gaza",
    label: "من غزة",
    kicker: "من داخل القطاع",
    d: "تواصل على واتساب غزة، وبتختار نوع المساعدة والمبلغ.",
    number: WHATSAPP_GAZA_NUMBER,
    code: "+972",
  },
] as const;

export type DonateOriginId = (typeof DONATE_ORIGINS)[number]["id"];

export function originWhatsapp(originId: DonateOriginId, message = DONATE_MESSAGE) {
  const origin = DONATE_ORIGINS.find((item) => item.id === originId);
  if (!origin) throw new Error(`Unknown donate origin: ${originId}`);
  return whatsappHref(message, origin.number);
}

export const BRAND_FLOW = [
  { label: "تبرع", key: "give" },
  { label: "تنفيذ", key: "execute" },
  { label: "توثيق", key: "document" },
  { label: "أثر", key: "impact" },
] as const;

export const STATS = [
  { value: 2, label: "مشاريع موثّقة من المخيم" },
  { value: 80, label: "عائلة وصلها خبز" },
  { value: 200, prefix: "+", label: "صائم تفطّروا" },
] as const;

export const STATS_NOTE =
  "الأرقام من تنفيذ المشاريع المعروضة أدناه، داخل مخيم نسائم الرحمة. مو تقدير لعدد سكان المخيم كامل.";

export const DONATE_PATH = [
  { n: "01", t: "التواصل", d: "رقم واتساب حسب مكانك." },
  { n: "02", t: "التنفيذ", d: "نتجهّز ونشتري اللي اتفق عليه." },
  { n: "03", t: "التوزيع", d: "بتوصل للمستفيدين بالمخيم." },
  { n: "04", t: "التوثيق", d: "منصوّر الشغل من الأرض." },
  { n: "05", t: "النشر", d: "الفيديو بيضل بأرشيف الموقع." },
] as const;

export const TRUST = [
  { n: "01", t: "فيديو من الأرض", d: "كل شغل إله تصوير من المخيم، مش صور جاهزة." },
  { n: "02", t: "وين صار الشغل", d: "المكان واضح: مخيم نسائم الرحمة." },
  { n: "03", t: "كم شخص استفاد", d: "الأرقام من التنفيذ: عائلات وصائمين وصلهم الدعم." },
  { n: "04", t: "سجل مفتوح", d: "المشروع ما بيختفي بعد ما يخلص. بيضل بالتوثيق." },
  { n: "05", t: "كرامة الناس", d: "ما منستغل الوجع. التوثيق للشغل، مش للمعاناة." },
] as const;

export const FIELD_REPORTS = [
  {
    id: "khubz",
    title: "توزيع الخبز",
    place: "مخيم نسائم الرحمة",
    kind: "خبز",
    status: "مكتمل",
    image: "/athar/videos/khubz-2.jpg",
    clipTitleIncludes: "80",
    figure: "80",
    figureLabel: "عائلة",
    scope: "80 عائلة داخل المخيم، من تنفيذ التوزيع نفسه.",
    date: null,
    quantity: null,
    cost: null,
    lead: "عشان اللقمة الكريمة أصل كل خير.. قدرنا بفضل الله نوصل ربطات الخبز لـ 80 عائلة بمخيم نسائم الرحمة.",
    record:
      "العدد 80 هو عدد العائلات اللي وصلها الخبز بهالمشروع، مو عدد سكان المخيم. تاريخ التنفيذ، عدد الربطات، وتكلفة الشراء بتظهر هون لما ينرفق سجل التنفيذ.",
  },
  {
    id: "iftar",
    title: "إفطار صائم",
    place: "مخيم نسائم الرحمة",
    kind: "إفطار",
    status: "مكتمل",
    image: "/athar/videos/helw.jpg",
    figure: "+200",
    figureLabel: "صائم",
    scope: "أكثر من 200 صائم على سفرة واحدة في المخيم.",
    date: null,
    quantity: null,
    cost: null,
    lead: "فرحة الإفطار أثرها ما بروح.. جمعنا أكثر من 200 صائم على سفرة واحدة في مخيم نسائم الرحمة.",
    record:
      "العدد من تنفيذ الإفطار بالمخيم. فيديو التوثيق، التاريخ، والكمية بتظهر مع سجل التنفيذ لما يكتمل رفعه.",
  },
] as const;

export const GIVE_PACKS = [
  {
    id: "khubz",
    title: "إطعام عائلات",
    kicker: "لقمة كريمة",
    action: "إطعام",
    unit: "عائلة",
    unitPlural: "عائلات",
    min: 5,
    max: 80,
    step: 5,
    defaultQty: 10,
    presets: [10, 20, 40, 80],
    kinds: [
      { id: "bread", label: "خبز", desc: "ربطة للبيت", perUsd: 2, perLabel: "ربطة" },
      { id: "chicken", label: "جاجة", desc: "جاجة كاملة", perUsd: 20, perLabel: "جاجة" },
      { id: "meal", label: "طبخة", desc: "سفرة ساخنة", perUsd: 15, perLabel: "طبخة" },
    ],
    estimate: "الأسعار تقدير حسب تكلفة التنفيذ الحالية، وبتتأكد وقت الشراء.",
    includes: ["المادة الغذائية", "تجهيزها", "توزيعها بالمخيم"],
    excludes: ["أي بند ما اتفق عليه قبل التنفيذ."],
  },
  {
    id: "maa",
    title: "شاحنة الماء",
    kicker: "سقيا",
    action: "سقاية",
    unit: "شخص",
    unitPlural: "شخص",
    min: 20,
    max: 200,
    step: 10,
    defaultQty: 100,
    presets: [50, 100, 150, 200],
    kinds: [{ id: "water", label: "ماء", desc: "سقيا من الشاحنة", perUsd: 2, perLabel: "شخص" }],
    estimate:
      "200$ تكلفة تقديرية لتوفير الماء لـ100 شخص حسب تكلفة التنفيذ الحالية. مو سعر ثابت لكل يوم.",
    includes: ["شراء الماء", "نقله للمخيم", "توزيعه"],
    excludes: ["شراء شاحنة. الشاحنة وسيلة توزيع، مش بند شراء."],
  },
] as const;

export type GivePackId = (typeof GIVE_PACKS)[number]["id"];

export const STORIES = [
  {
    q: "عشان اللقمة الكريمة أصل كل خير.. قدرنا بفضل الله نوصل ربطات الخبز لـ 80 عائلة بمخيم نسائم الرحمة.",
    c: "توثيق ميداني — توزيع الخبز",
    image: "/athar/packs.jpg",
  },
  {
    q: "فرحة الإفطار أثرها ما بروح.. جمعنا أكثر من 200 صائم على سفرة واحدة في مخيم نسائم الرحمة.",
    c: "توثيق ميداني — إفطار صائم",
    // image: "/athar/food.jpg",
  },
] as const;

export const DONOR_FAQS = [
  {
    id: "proof",
    q: "كيف بعرف إن تبرعي بيحدث فرق حقيقي؟",
    a: "لأن الأثر عندنا مش وعد، توثيق. نقيس الشغل من الأرض: فيديو من المخيم، مكان واضح، ورقم من التنفيذ. القصص والعدّادات بتضل مفتوحة عالصفحة بعد ما يخلص المشروع، حتى تشوف بعينك وين راح عطاؤك.",
    notes: [
      { t: "فيديو من الأرض", d: "كل شغل إله تصوير من مخيم نسائم الرحمة." },
      { t: "رقم من التنفيذ", d: "80 عائلة خبز، وأكثر من 200 صائم تفطّروا." },
      { t: "سجل مفتوح", d: "المشروع ما بيختفي. بيضل ظاهر للمتبرّع." },
    ],
  },
  {
    id: "share",
    q: "هل تبرعي الفردي مؤثر قدام المبلغ المطلوب؟",
    a: "مو الكل بيقدر يغطّي مشروع كامل لحاله. منشان هيك، مساهمتك بتنجمع مع مساهمات غيرك لحتى يكتمل الشغل: ربطات خبز، سفرة إفطار، أو شاحنة ماء. كل مبلغ، مهما كان صغير، بيدخل بالتنفيذ وبتتشاف نتيجته بالتوثيق.",
    notes: [
      { t: "مساهمة جزئية", d: "ما في حد أدنى يخليك برّا الشغل." },
      { t: "بتتجمّع", d: "تبرعك بيتوحّد مع تبرعات ثانية لنفس المشروع." },
      { t: "بتتشاف", d: "لما يكتمل الشغل، الدليل بيرجع يظهر هون." },
    ],
  },
] as const;

export const FOOTER_COLUMNS = [
  {
    h: "المهمة",
    items: [
      { label: "اصنع أثرًا", href: "/impact" },
      { label: "من نحن", href: "/#about" },
      { label: "كيف نوثّق", href: "/#path" },
      { label: "أسئلة المتبرّع", href: "/#faq" },
      { label: "الصدقة", href: "/#donate" },
    ],
  },
  {
    h: "التوثيق",
    items: [
      { label: "أرشيف المشاريع", href: "/#archive" },
      { label: "جهاز صوت المصلى", href: "/#masjid" },
      { label: "كل الفيديوهات", href: "/videos" },
      { label: "احسب زكاتك", href: "/zakat" },
      { label: "معلومات التبرع", href: "/#donate" },
      { label: "سياسة التوثيق", href: "/#about" },
    ],
  },
] as const;

export const ABOUT = {
  kicker: "من نحن",
  title: "من المخيم، مو من المكتب.",
  paragraphs: [
    "نحن فريق بيشتغل على تنفيذ وتوثيق المساعدات الإنسانية في مخيم نسائم الرحمة.",
    "هدفنا بسيط: المتبرّع يعرف وين راح عطاؤه، وشو نتج عنه.",
    "لذلك ما منكتفي بنشر طلب تبرع. منوثّق التنفيذ من الميدان، ومننشر نتيجة كل مشروع وأرقامه بعد ما يخلص.",
    "منلتزم قدر الإمكان بالوضوح بتفاصيل المشاريع، ومنحافظ على كرامة المستفيدين وقت التوثيق.",
  ],
  blocks: [
    {
      id: "method",
      h: "طريقة العمل",
      d: "تبرع، تنفيذ، توزيع، تصوير، نشر. كل مشروع بيعدي بهالمسار، وبيضل ظاهر بالأرشيف.",
    },
    {
      id: "give",
      h: "معلومات التبرع",
      d: "التبرع عبر واتساب: رقم لأهل غزة، ورقم للي برا القطاع. بعد التواصل، بتتجمّع المساهمات لحتى يكتمل التنفيذ.",
    },
    {
      id: "document",
      h: "سياسة التوثيق",
      d: "منصوّر الشغل من الأرض بعد التنفيذ. الأرقام من العدّ الميداني، مش من وعود مسبقة.",
    },
    {
      id: "privacy",
      h: "سياسة الخصوصية",
      d: "ما بيننشر اسم أو وجه أو تفاصيل شخصية بدون موافقة. التوثيق للشغل، مش للمعاناة.",
    },
  ],
} as const;

export const HERO_IMAGE = "/athar/غزة.jpeg";
export const CTA_IMAGE = "/athar/hands.jpg";

export const FIELD_VIDEOS = [
  {
    id: "khubz-1",
    title: "توزيع الخبز — 1",
    place: "مخيم نسائم الرحمة",
    video: "/athar/videos/khubz.mp4",
    image: "/athar/videos/khubz.jpg",
  },
  {
    id: "khubz-2",
    title: "توزيع الخبز — 2",
    place: "مخيم نسائم الرحمة",
    video: "/athar/videos/khubz-2.mp4",
    image: "/athar/videos/khubz-2.jpg",
  },
  {
    id: "helw",
    title: "توزيع الحلو",
    place: "مخيم نسائم الرحمة",
    video: "/athar/videos/helw.mp4",
    image: "/athar/videos/helw.jpg",
  },
  {
    id: "bard",
    title: "توزيع البرد",
    place: "مخيم نسائم الرحمة",
    video: "/athar/videos/bard.mp4",
    image: "/athar/videos/bard.jpg",
  },
  {
    id: "masjid",
    title: "مناشدة المسجد",
    place: "مخيم نسائم الرحمة",
    video: "/athar/videos/masjid.mp4",
    image: "/athar/videos/masjid.jpg",
  },
] as const;
