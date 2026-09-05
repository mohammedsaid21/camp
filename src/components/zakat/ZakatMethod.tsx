import { ACTIVE_NISAB_METHOD, DEBT_DEDUCTION, HAWL, SOURCES, STOCK_RULE, ZAKAT_RATE } from "@/lib/zakat/rules";

const METHOD_STEPS = [
  {
    n: "1",
    t: "تحديد مال الزكاة",
    d: "يشمل الذهب والفضة والأموال النقدية والأسهم المُعدَّة للتجارة، وكذلك عروض التجارة.",
  },
  {
    n: "2",
    t: "التحقُّق من بلوغ النصاب",
    d: `هذه الحاسبة تقارن صافي مالك بنصاب الذهب المعتمد فيها: ${ACTIVE_NISAB_METHOD.grams} غرامًا عيار ${ACTIVE_NISAB_METHOD.karat}. يوجد منهج آخر يعتمد الفضة، وهو غير مفعّل هنا.`,
  },
  {
    n: "3",
    t: "مرور الحَوْل",
    d: "الحول المعتبر سنة قمرية كاملة على المال بعد بلوغه النصاب. الحاسبة لا تفترض مرور الحول؛ تسألك.",
  },
  {
    n: "4",
    t: "المقدار",
    d: "إذا وجبت الزكاة: 2.5% من صافي المال الزكوي، أو قسمة المبلغ على 40.",
  },
  {
    n: "5",
    t: "خصم الديون المستحقة",
    d: "تُخصم الديون الحالّة واجبة الأداء الفوري قبل إخراج الزكاة، وفق المنهج المختار. لا تُخصم كل الالتزامات المستقبلية تلقائيًا.",
  },
  {
    n: "6",
    t: "توجيه الزكاة لمستحقيها",
    d: null,
  },
] as const;

export function ZakatMethod() {
  return (
    <section className="mt-12 space-y-10">
      <div>
        <p className="text-sm font-semibold text-primary">طريقة حساب الزكاة</p>
        <h2 className="mt-1 text-2xl font-semibold">من المال إلى المستحق، بست خطوات.</h2>
        <ol className="mt-6 grid gap-3 md:grid-cols-2">
          {METHOD_STEPS.map((step) => (
            <li key={step.n} className="rounded-2xl border border-border bg-card p-4">
              <p className="font-display text-sm text-accent">{step.n}</p>
              <h3 className="mt-1 font-semibold">{step.t}</h3>
              {step.d ? (
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.d}</p>
              ) : (
                <blockquote className="font-verse mt-2 text-sm leading-loose md:text-base">
                  ﴿إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا
                  وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ
                  وَابْنِ السَّبِيلِ فَرِيضَةً مِنَ اللَّهِ وَاللَّهُ عَلِيمٌ حَكِيمٌ﴾
                  <footer className="mt-1 font-sans text-xs text-muted-foreground">سورة التوبة — ٦٠</footer>
                </blockquote>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div id="methodology" className="rounded-3xl border border-border bg-card p-5 md:p-6">
        <h2 className="text-xl font-semibold">منهجية الحساب</h2>
        <dl className="mt-4 space-y-3 text-sm leading-relaxed">
          <div>
            <dt className="font-medium">نسبة الزكاة</dt>
            <dd className="text-muted-foreground">
              {ZAKAT_RATE * 100}% (ربع العشر / قسمة 40). مصدر الوجوب بهذا المقدار: دار الإفتاء المصرية.
            </dd>
          </div>
          <div>
            <dt className="font-medium">طريقة تحديد النصاب</dt>
            <dd className="text-muted-foreground">
              نصاب الذهب: {ACTIVE_NISAB_METHOD.grams} جرامًا عيار {ACTIVE_NISAB_METHOD.karat}، تُضرب في سعر الجرام الذي
              يدخله المستخدم. لا يوجد سعر ذهب وهمي في الموقع.
            </dd>
          </div>
          <div>
            <dt className="font-medium">الحول</dt>
            <dd className="text-muted-foreground">
              حول قمري. الحاسبة تسأل ولا تفترض. إن كانت الإجابة «لا» لا يُعرض مبلغ واجب. إن كانت «لست متأكدًا» لا يُحسم
              الحكم. التقويم: {HAWL.calendar}.
            </dd>
          </div>
          <div>
            <dt className="font-medium">الديون</dt>
            <dd className="text-muted-foreground">
              تُخصم الديون الحالّة فقط ({DEBT_DEDUCTION.kind}). الديون طويلة الأجل لا تُخصم تلقائيًا.
            </dd>
          </div>
          <div>
            <dt className="font-medium">الذهب</dt>
            <dd className="text-muted-foreground">
              إن أدخلت القيمة تُستخدم كما هي. إن أدخلت الوزن والعيار تُحسب القيمة نسبة إلى عيار النصاب وسعر الجرام عيار{" "}
              {ACTIVE_NISAB_METHOD.karat}. حُليّ الزينة فيه خلاف، ولم تُستثنَ تلقائيًا.
            </dd>
          </div>
          <div>
            <dt className="font-medium">الأسهم</dt>
            <dd className="text-muted-foreground">
              للتجارة: القيمة السوقية. للاستثمار الطويل: العوائد فقط وفق فتوى دار الإفتاء في الأسهم. إن لم تتأكد لا
              تُحسب. استبعاد غير المصنّف: {STOCK_RULE.unsureExcluded ? "نعم" : "لا"}.
            </dd>
          </div>
        </dl>

        <h3 className="mt-6 font-semibold">المصادر الشرعية</h3>
        <ul className="mt-2 space-y-1.5 text-sm">
          {SOURCES.map((source) => (
            <li key={source.id}>
              <a href={source.href} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                {source.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        هذه الحاسبة أداة مساعدة وليست فتوى شرعية. قد تختلف بعض تفاصيل حساب الزكاة باختلاف نوع المال والحالة الشخصية
        والمنهج الفقهي المتبع. إذا كانت حالتك معقدة، مثل الشركات أو الاستثمارات أو الديون الكبيرة، فاستشر جهة شرعية
        موثوقة.
      </p>
    </section>
  );
}
