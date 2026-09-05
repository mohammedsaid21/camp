/**
 * قواعد حاسبة الزكاة — قابلة للمراجعة بدون تعديل الواجهة.
 *
 * الإصدار الأول يعتمد منهجًا واحدًا معلنًا للمستخدم.
 * لا تُعرض أي قاعدة هنا على أنها إجماع إذا ورد فيها خلاف.
 */

export const ZAKAT_RATE = 0.025;
/** ربع العشر = 1/40. المصدر: دار الإفتاء المصرية، فتوى نصاب زكاة المال. */
export const ZAKAT_RATE_NUMERATOR = 1n;
export const ZAKAT_RATE_DENOMINATOR = 40n;

export const CURRENCIES = ["USD", "ILS", "JOD", "EUR", "GBP"] as const;
export type CurrencyCode = (typeof CURRENCIES)[number];

export const CURRENCY_LABELS: Record<CurrencyCode, string> = {
  USD: "دولار أمريكي",
  ILS: "شيكل",
  JOD: "دينار أردني",
  EUR: "يورو",
  GBP: "جنيه إسترليني",
};

/**
 * مناهج تحديد النصاب المعرّفة في الحاسبة.
 * الإصدار الأول يفعّل منهجًا واحدًا فقط.
 */
export const NISAB_METHODS = {
  /**
   * دار الإفتاء المصرية: نصاب المال = قيمة 85 جرامًا من الذهب عيار 21.
   * المصدر: https://www.dar-alifta.org/ar/fatwa/details/16827
   * الفتوى رقم 6203، 4 ديسمبر 1991م، فضيلة الدكتور محمد سيد طنطاوي.
   */
  dar_alifta_gold_21k: {
    id: "dar_alifta_gold_21k",
    metal: "gold" as const,
    grams: 85,
    karat: 21,
    labelAr: "نصاب الذهب عيار 21",
  },
  /**
   * مؤسسة الزكاة الأمريكية: نصاب النقد/الذهب = 85 جرامًا من الذهب الخالص (عيار 24)،
   * يعادل 20 دينارًا / نحو 3 أونصات أمريكية من الذهب الخالص.
   * المصدر: https://www.zakat.org/resource-center/conditions-and-calculations
   * هذا المنهج معرّف في المعمارية وغير مفعّل في الإصدار الأول.
   */
  zfa_pure_gold: {
    id: "zfa_pure_gold",
    metal: "gold" as const,
    grams: 85,
    karat: 24,
    labelAr: "نصاب الذهب الخالص",
  },
} as const;

export type NisabMethodId = keyof typeof NISAB_METHODS;

/**
 * المنهج المفعّل في هذه الحاسبة. لا تخلط بين المنهجين في الحساب.
 * الفرق بين عيار 21 وعيار 24 خلاف معتبر في تقدير النصاب النقدي.
 */
export const ACTIVE_NISAB_METHOD_ID: NisabMethodId = "dar_alifta_gold_21k";

export const ACTIVE_NISAB_METHOD = NISAB_METHODS[ACTIVE_NISAB_METHOD_ID];

export const GOLD_KARATS = [24, 22, 21, 18] as const;

/**
 * خصم الديون:
 * - دار الإفتاء: من شروط الوجوب أن يكون المال فارغًا من الدين، مع وجود خلاف مذهبي في التفصيل.
 * - مؤسسة الزكاة الأمريكية: تُخصم الديون الضرورية الحالة فقط (إيجار، طعام، خدمات…)، لا الديون طويلة الأجل.
 *   المصدر: https://www.zakat.org/resource-center/zakat-calculator
 * الإصدار الأول يخصم فقط الديون الحالّة واجبة الأداء الفوري، ولا يخصم الأقساط المستقبلية تلقائيًا.
 */
export const DEBT_DEDUCTION = {
  kind: "immediate_due_only" as const,
  includeLongTerm: false,
};

/**
 * زكاة الأسهم — دار الإفتاء المصرية، فتوى 22181:
 * https://dar-alifta.org/ar/fatwa/details/22181
 * - أسهم للتجارة / التربص بالسعر: زكاة عروض تجارة على القيمة السوقية (+ الأرباح إن وُجدت).
 * - أسهم غير تجارية (خدمية/إنتاجية/صناعية) بغير قصد التجارة: الزكاة في الربح فقط بعد النصاب والحول من يوم القبض.
 * لا تُعامل كل الأسهم بنفس الحكم تلقائيًا.
 */
export const STOCK_RULE = {
  tradeUsesMarketValue: true,
  longTermUsesReturnsOnly: true,
  unsureExcluded: true,
};

/**
 * الديون لك (الذمم):
 * مؤسسة الزكاة الأمريكية تُدخل "القروض الجيدة المرجو سدادها" و"المستحقات المتوقعة" في الأصول.
 * المصدر: حاسبة Zakat Foundation.
 * الديون المشكوك في تحصيلها لا تُدخل تلقائيًا في الإصدار الأول.
 */
export const RECEIVABLE_RULE = {
  includeExpectedRepayment: true,
  includeUncertain: false,
};

export const HAWL = {
  /** الحول المعتبر هنا حول هجري/قمري، لا سنة شمسية. المصدران المذكوران يتفقان على ذلك. */
  calendar: "hijri_lunar" as const,
  /** لا تُحسب الزكاة واجبة إن لم يتحقق الحول. إذا كان المستخدم غير متأكد لا يُعرض رقم قطعي. */
  requireUserConfirmation: true,
};

export const SOURCES = [
  {
    id: "dar-nisab",
    title: "نصاب زكاة المال بالعملة المصرية — دار الإفتاء المصرية",
    href: "https://www.dar-alifta.org/ar/fatwa/details/16827/%D9%86%D8%B5%D8%A7%D8%A8-%D8%B2%D9%83%D8%A7%D8%A9-%D8%A7%D9%84%D9%85%D8%A7%D9%84-%D8%A8%D8%A7%D9%84%D8%B9%D9%85%D9%84%D8%A9-%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A%D8%A9",
  },
  {
    id: "dar-savings",
    title: "زكاة المال في دفتر التوفير — دار الإفتاء المصرية",
    href: "https://dar-alifta.org/ar/fatwa/details/17620/%D8%A8%D9%8A%D8%A7%D9%86-%D9%83%D9%8A%D9%81%D9%8A%D8%A9-%D8%B2%D9%83%D8%A7%D8%A9-%D8%A7%D9%84%D9%85%D8%A7%D9%84-%D8%A7%D9%84%D9%85%D9%88%D8%AC%D9%88%D8%AF-%D9%81%D9%8A-%D8%AF%D9%81%D8%AA%D8%B1-%D8%A7%D9%84%D8%AA%D9%88%D9%81%D9%8A%D8%B1",
  },
  {
    id: "dar-stocks",
    title: "كيفية حساب الزكاة على المال المستثمر في الأسهم — دار الإفتاء المصرية",
    href: "https://dar-alifta.org/ar/fatwa/details/22181/%D9%83%D9%8A%D9%81%D9%8A%D8%A9-%D8%AD%D8%B3%D8%A7%D8%A8-%D8%A7%D9%84%D8%B2%D9%83%D8%A7%D8%A9-%D8%B9%D9%84%D9%89-%D8%A7%D9%84%D9%85%D8%A7%D9%84-%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D8%AB%D9%85%D8%B1-%D9%81%D9%8A-%D8%A7%D9%84%D8%A3%D8%B3%D9%87%D9%85",
  },
  {
    id: "zfa-calc",
    title: "Zakat Calculator — Zakat Foundation of America",
    href: "https://www.zakat.org/resource-center/zakat-calculator",
  },
  {
    id: "zfa-conditions",
    title: "Zakat Conditions & Calculations — Zakat Foundation of America",
    href: "https://www.zakat.org/resource-center/conditions-and-calculations",
  },
] as const;
