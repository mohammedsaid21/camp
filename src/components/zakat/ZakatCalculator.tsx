import { useMemo, useState, type ReactNode } from "react";
import { Info } from "lucide-react";
import { calculateZakat } from "@/lib/zakat/engine";
import { formatAmount, MoneyError, parseAmount } from "@/lib/zakat/money";
import { MARKET_PRICES } from "@/lib/zakat/market";
import {
  ACTIVE_NISAB_METHOD,
  CURRENCIES,
  CURRENCY_LABELS,
  GOLD_KARATS,
  SOURCES,
  type CurrencyCode,
} from "@/lib/zakat/rules";
import type { HawlAnswer, ReceivableQuality, StockPurpose, ZakatInput } from "@/lib/zakat/types";
import { Button } from "@/components/athar/ui/Button";
import { DonateButton } from "@/components/athar/DonateChoice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const STEPS = ["أموالك", "الالتزامات", "النصاب والحول", "النتيجة"] as const;

type FormState = {
  currency: CurrencyCode;
  cashOnHand: string;
  bankBalances: string;
  otherCurrenciesConverted: string;
  goldKnowsValue: "yes" | "no";
  goldValue: string;
  goldGrams: string;
  goldKarat: string;
  silverKnowsValue: "yes" | "no";
  silverValue: string;
  silverGrams: string;
  silverPrice: string;
  stockPurpose: StockPurpose;
  stockMarketValue: string;
  stockReturns: string;
  receivableQuality: ReceivableQuality;
  receivables: string;
  immediateDebts: string;
  hawl: HawlAnswer;
  goldKarat21Price: string;
};

const INITIAL: FormState = {
  currency: "USD",
  cashOnHand: "",
  bankBalances: "",
  otherCurrenciesConverted: "",
  goldKnowsValue: "no",
  goldValue: "",
  goldGrams: "",
  goldKarat: "21",
  silverKnowsValue: "no",
  silverValue: "",
  silverGrams: "",
  silverPrice: "",
  stockPurpose: "trade",
  stockMarketValue: "",
  stockReturns: "",
  receivableQuality: "expected",
  receivables: "",
  immediateDebts: "",
  hawl: "unsure",
  goldKarat21Price: MARKET_PRICES.goldKarat21PerGram ? String(MARKET_PRICES.goldKarat21PerGram) : "",
};

function readAmount(raw: string): bigint {
  try {
    return parseAmount(raw);
  } catch (error) {
    if (error instanceof MoneyError) return 0n;
    throw error;
  }
}

function toInput(form: FormState): ZakatInput {
  const goldPriceRaw = form.goldKarat21Price.trim();
  let goldPrice: bigint | null = null;
  if (goldPriceRaw) {
    try {
      goldPrice = parseAmount(goldPriceRaw);
    } catch {
      goldPrice = null;
    }
  }

  const silverPriceRaw = form.silverPrice.trim();
  let silverPrice: bigint | null = null;
  if (silverPriceRaw) {
    try {
      silverPrice = parseAmount(silverPriceRaw);
    } catch {
      silverPrice = null;
    }
  }

  const karat = Number(form.goldKarat);
  return {
    currency: form.currency,
    cashOnHand: readAmount(form.cashOnHand),
    bankBalances: readAmount(form.bankBalances),
    otherCurrenciesConverted: readAmount(form.otherCurrenciesConverted),
    goldMode: form.goldKnowsValue === "yes" ? "value" : "weight",
    goldValue: readAmount(form.goldValue),
    goldGrams: readAmount(form.goldGrams),
    goldKarat: Number.isFinite(karat) && karat > 0 && karat <= 24 ? karat : 21,
    silverMode: form.silverKnowsValue === "yes" ? "value" : "weight",
    silverValue: readAmount(form.silverValue),
    silverGrams: readAmount(form.silverGrams),
    stockPurpose: form.stockPurpose,
    stockMarketValue: readAmount(form.stockMarketValue),
    stockReturns: readAmount(form.stockReturns),
    receivableQuality: form.receivableQuality,
    receivables: readAmount(form.receivables),
    immediateDebts: readAmount(form.immediateDebts),
    hawl: form.hawl,
    goldKarat21PricePerGram: goldPrice,
    silverPricePerGram: silverPrice,
  };
}

function isPresetKarat(value: string) {
  return GOLD_KARATS.some((karat) => String(karat) === value);
}

function moneyField(
  id: string,
  label: string,
  value: string,
  onChange: (value: string) => void,
  hint?: string,
) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        inputMode="decimal"
        dir="ltr"
        className="h-11 rounded-xl text-start"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^\d.,٠-٩٫]/g, ""))}
        aria-describedby={hint ? `${id}-hint` : undefined}
      />
      {hint ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function Choice<T extends string>({
  legend,
  value,
  onChange,
  options,
  name,
}: {
  legend: string;
  name: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium">{legend}</legend>
      <RadioGroup
        name={name}
        value={value}
        onValueChange={(next) => onChange(next as T)}
        className="grid gap-2 sm:grid-cols-3"
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm",
              value === option.value ? "border-primary bg-ivory" : "border-border bg-card",
            )}
          >
            <RadioGroupItem value={option.value} />
            {option.label}
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  );
}

function InfoDialog({
  trigger,
  title,
  children,
}: {
  trigger: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-primary"
        >
          <Info className="h-4 w-4" aria-hidden="true" />
          {trigger}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg rounded-3xl text-start">
        <DialogHeader className="text-start">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export function ZakatCalculator() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL);
  const result = useMemo(() => calculateZakat(toInput(form)), [form]);
  const currency = form.currency;
  const money = (amount: bigint | null) =>
    amount === null ? "—" : `${formatAmount(amount)} ${currency}`;

  const patch = (next: Partial<FormState>) => setForm((current) => ({ ...current, ...next }));
  const dueLabel =
    result.obligation === "due"
      ? money(result.zakatAmount)
      : result.obligation === "hawl_unresolved"
        ? "غير محسومة"
        : result.obligation === "hawl_not_met" || result.obligation === "below_nisab"
          ? money(0n)
          : "يلزم سعر الذهب";

  return (
    <TooltipProvider delayDuration={200}>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_20rem]">
        <section className="rounded-3xl border border-border bg-card p-4 shadow-[0_12px_32px_#1435280f] md:p-6">
          <div className="mb-5">
            <p className="text-xs font-medium text-muted-foreground">
              الخطوة {step + 1} من {STEPS.length}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ivory" aria-hidden="true">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              />
            </div>
            <h2 className="mt-3 text-xl font-semibold">{STEPS[step]}</h2>
          </div>

          {step === 0 && (
            <div className="space-y-6">
              <div className="space-y-1.5">
                <Label htmlFor="currency">عملة الحساب</Label>
                <select
                  id="currency"
                  className="flex h-11 w-full rounded-xl border border-input bg-transparent px-3 text-sm"
                  value={form.currency}
                  onChange={(e) => patch({ currency: e.target.value as CurrencyCode })}
                >
                  {CURRENCIES.map((code) => (
                    <option key={code} value={code}>
                      {CURRENCY_LABELS[code]} ({code})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground">
                  أدخل كل المبالغ بهذه العملة. التحويل التلقائي غير مفعّل لأنه لا يوجد سعر صرف محفوظ في الموقع.
                </p>
              </div>

              {moneyField(
                "gold-price",
                "سعر جرام الذهب عيار 21",
                form.goldKarat21Price,
                (goldKarat21Price) => patch({ goldKarat21Price }),
                MARKET_PRICES.updatedAt
                  ? `آخر تحديث محفوظ: ${MARKET_PRICES.updatedAt}${MARKET_PRICES.source ? ` — ${MARKET_PRICES.source}` : ""}`
                  : "لا يوجد سعر ذهب محفوظ في الموقع. أدخل السعر من مصدر موثوق عندك. الحاسبة لا تدّعي أن السعر مباشر.",
              )}

              <div>
                <h3 className="mb-3 text-sm font-semibold">النقد والأرصدة</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {moneyField("cash", "النقد الموجود معك", form.cashOnHand, (cashOnHand) => patch({ cashOnHand }))}
                  {moneyField("bank", "الأموال في الحسابات البنكية", form.bankBalances, (bankBalances) =>
                    patch({ bankBalances }),
                  )}
                  {moneyField(
                    "fx",
                    "عملات أخرى",
                    form.otherCurrenciesConverted,
                    (otherCurrenciesConverted) => patch({ otherCurrenciesConverted }),
                    "أدخل قيمتها بعد تحويلها بنفسك إلى العملة المختارة.",
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold">الذهب</h3>
                <Choice
                  name="gold-knows"
                  legend="هل تعرف قيمة الذهب؟"
                  value={form.goldKnowsValue}
                  onChange={(goldKnowsValue) => patch({ goldKnowsValue })}
                  options={[
                    { value: "yes", label: "نعم" },
                    { value: "no", label: "لا" },
                  ]}
                />
                {form.goldKnowsValue === "yes" ? (
                  moneyField("gold-value", "قيمة الذهب", form.goldValue, (goldValue) => patch({ goldValue }))
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {moneyField("gold-grams", "الوزن بالغرام", form.goldGrams, (goldGrams) => patch({ goldGrams }))}
                    <div className="space-y-1.5">
                      <Label htmlFor="gold-karat">العيار</Label>
                      <select
                        id="gold-karat"
                        className="flex h-11 w-full rounded-xl border border-input bg-transparent px-3 text-sm"
                        value={isPresetKarat(form.goldKarat) ? form.goldKarat : "other"}
                        onChange={(e) => {
                          if (e.target.value === "other") patch({ goldKarat: "" });
                          else patch({ goldKarat: e.target.value });
                        }}
                      >
                        {GOLD_KARATS.map((karat) => (
                          <option key={karat} value={String(karat)}>
                            {karat}
                          </option>
                        ))}
                        <option value="other">غير ذلك</option>
                      </select>
                      {!isPresetKarat(form.goldKarat) && (
                        <Input
                          inputMode="numeric"
                          dir="ltr"
                          className="h-11 rounded-xl text-start"
                          placeholder="عيار من 1 إلى 24"
                          value={form.goldKarat}
                          onChange={(e) => patch({ goldKarat: e.target.value })}
                          aria-label="عيار الذهب المخصص"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold">الفضة</h3>
                <Choice
                  name="silver-knows"
                  legend="هل تعرف قيمة الفضة؟"
                  value={form.silverKnowsValue}
                  onChange={(silverKnowsValue) => patch({ silverKnowsValue })}
                  options={[
                    { value: "yes", label: "نعم" },
                    { value: "no", label: "لا" },
                  ]}
                />
                {form.silverKnowsValue === "yes" ? (
                  moneyField("silver-value", "قيمة الفضة", form.silverValue, (silverValue) => patch({ silverValue }))
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {moneyField("silver-grams", "الوزن بالغرام", form.silverGrams, (silverGrams) =>
                      patch({ silverGrams }),
                    )}
                    {moneyField(
                      "silver-price",
                      "سعر جرام الفضة",
                      form.silverPrice,
                      (silverPrice) => patch({ silverPrice }),
                      "يلزم إذا أدخلت الوزن لا القيمة.",
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold">الأسهم والاستثمارات</h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex min-h-11 items-center text-primary"
                        aria-label="طريقة زكاة الأسهم"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-start leading-relaxed">
                      طريقة زكاة الأسهم تختلف بحسب الغرض من امتلاكها وطبيعة الاستثمار.
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Choice
                  name="stocks"
                  legend="الغرض من الأسهم"
                  value={form.stockPurpose}
                  onChange={(stockPurpose) => patch({ stockPurpose })}
                  options={[
                    { value: "trade", label: "للتجارة" },
                    { value: "long_term", label: "استثمار طويل" },
                    { value: "unsure", label: "لست متأكدًا" },
                  ]}
                />
                {moneyField(
                  "stock-value",
                  "القيمة السوقية الحالية",
                  form.stockMarketValue,
                  (stockMarketValue) => patch({ stockMarketValue }),
                )}
                {moneyField(
                  "stock-returns",
                  "الأرباح أو العوائد",
                  form.stockReturns,
                  (stockReturns) => patch({ stockReturns }),
                  form.stockPurpose === "long_term"
                    ? "في منهج هذه الحاسبة، الاستثمار الطويل يُحسب من العوائد لا من أصل السهم."
                    : "لا تُدخل الأرباح مرتين إذا كانت داخلة في القيمة السوقية.",
                )}
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold">أموال مستحقة لك</h3>
                <Choice
                  name="recv"
                  legend="هل يُرجى سدادها؟"
                  value={form.receivableQuality}
                  onChange={(receivableQuality) => patch({ receivableQuality })}
                  options={[
                    { value: "expected", label: "مرجوة السداد" },
                    { value: "unsure", label: "غير متأكد" },
                  ]}
                />
                {moneyField(
                  "recv-amount",
                  "القروض والذمم والمستحقات",
                  form.receivables,
                  (receivables) => patch({ receivables }),
                  "لا تُحسب تلقائيًا الديون المشكوك في تحصيلها.",
                )}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                أدخل فقط الديون التي تنطبق عليها شروط الخصم وفق طريقة الحساب المستخدمة.
              </p>
              {moneyField(
                "debts",
                "ديون مستحقة عليك تدخل في الحساب",
                form.immediateDebts,
                (immediateDebts) => patch({ immediateDebts }),
                "الديون الحالّة واجبة الأداء الفوري. لا تُدخل أقساطًا مستقبلية طويلة الأجل.",
              )}
              <InfoDialog trigger="ما الذي يمكن خصمه؟" title="الديون التي تدخل في الخصم">
                <p>
                  هذه الحاسبة تخصم الديون الحالّة واجبة الأداء الآن، مثل إيجار أو فواتير أو التزامات فورية. هذا يوافق
                  طريقة حاسبة مؤسسة الزكاة الأمريكية التي تستثني الديون طويلة الأجل.
                </p>
                <p>
                  خصم كل الديون أو أقساط المستقبل كلها فيه خلاف فقهي. لذلك لا تخصم الحاسبة الرهون أو الأقساط المؤجلة
                  تلقائيًا.
                </p>
                <p>إذا كانت ديونك كبيرة أو مختلطة، راجع جهة شرعية موثوقة.</p>
              </InfoDialog>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-ivory p-4 text-sm leading-relaxed">
                <p className="font-semibold text-foreground">طريقة حساب النصاب المستخدمة في هذه الحاسبة</p>
                <p className="mt-1 text-muted-foreground">
                  تعتمد هذه الحاسبة على نصاب الذهب وفق المنهج المحدد في إعدادات الحاسبة: {ACTIVE_NISAB_METHOD.grams}{" "}
                  جرامًا من الذهب عيار {ACTIVE_NISAB_METHOD.karat}.
                </p>
                <InfoDialog trigger="لماذا؟" title="لماذا نصاب الذهب عيار 21؟">
                  <p>
                    دار الإفتاء المصرية قدّرت نصاب زكاة المال بقيمة 85 جرامًا من الذهب عيار 21، ثم تُحسب الزكاة بنسبة
                    2.5% إذا حال الحول وكان المال فارغًا من الدين وفاضلًا عن الحاجة الأصلية.
                  </p>
                  <p>
                    مؤسسة الزكاة الأمريكية تذكر 85 جرامًا من الذهب الخالص. هذا فرق معتبر، لذلك لم تُعرض القاعدة على أنها
                    إجماع، والمنهج المفعّل هنا هو منهج دار الإفتاء فقط.
                  </p>
                  <a className="inline-block text-primary" href={SOURCES[0].href} target="_blank" rel="noreferrer">
                    {SOURCES[0].title}
                  </a>
                </InfoDialog>
                <dl className="mt-3 space-y-1">
                  <div className="flex justify-between gap-3">
                    <dt>النصاب</dt>
                    <dd>{ACTIVE_NISAB_METHOD.grams} غ · عيار {ACTIVE_NISAB_METHOD.karat}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>قيمة النصاب</dt>
                    <dd>{money(result.nisabValue)}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>حالة النصاب</dt>
                    <dd>
                      {result.nisabReached === null
                        ? "يلزم سعر الذهب"
                        : result.nisabReached
                          ? "بلغ النصاب"
                          : "لم يبلغ النصاب"}
                    </dd>
                  </div>
                </dl>
              </div>

              <Choice
                name="hawl"
                legend="هل بلغ مالك النصاب وحال عليه حول هجري كامل؟"
                value={form.hawl}
                onChange={(hawl) => patch({ hawl })}
                options={[
                  { value: "yes", label: "نعم" },
                  { value: "no", label: "لا" },
                  { value: "unsure", label: "لست متأكدًا" },
                ]}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              {result.obligation === "hawl_not_met" && (
                <p className="rounded-2xl bg-ivory p-4 text-sm leading-relaxed">
                  بحسب طريقة الحساب المستخدمة، لا تظهر زكاة مال واجبة حاليًا ما لم تتحقق شروط الوجوب.
                </p>
              )}
              {result.obligation === "hawl_unresolved" && (
                <p className="rounded-2xl bg-ivory p-4 text-sm leading-relaxed">
                  مسألة الحول وبعض تفاصيل زكاة المال تختلف باختلاف الحالة والمنهج الفقهي. ننصح بمراجعة جهة شرعية موثوقة.
                </p>
              )}
              {result.obligation === "missing_gold_price" && (
                <p className="rounded-2xl bg-ivory p-4 text-sm leading-relaxed">
                  لا يمكن تحديد النصاب بدون سعر جرام الذهب عيار 21. ارجع للخطوة الأولى وأدخل السعر من مصدر تعتمده.
                </p>
              )}

              <dl className="space-y-2 rounded-2xl border border-border p-4 text-sm">
                {[
                  ["إجمالي الأموال الداخلة في الحساب", money(result.assetTotal)],
                  ["الخصومات المؤهلة", money(result.liabilities)],
                  ["صافي الأموال الزكوية", money(result.zakatableWealth)],
                  ["النصاب", money(result.nisabValue)],
                  [
                    "حالة النصاب",
                    result.nisabReached === null ? "غير محسوب" : result.nisabReached ? "بلغ النصاب" : "لم يبلغ النصاب",
                  ],
                  ["نسبة الزكاة", "2.5%"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3 border-b border-border/70 py-1.5 last:border-0">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="rounded-2xl bg-forest p-5 text-forest-foreground">
                <p className="text-sm text-white/70">
                  {result.obligation === "due" ? "الزكاة المستحقة" : "لا يُعرض مبلغ واجب قطعي"}
                </p>
                <p className="mt-1 font-display text-3xl">
                  {result.obligation === "due" ? money(result.zakatAmount) : dueLabel}
                </p>
                {result.obligation === "hawl_unresolved" && result.estimatedAmount !== null && (
                  <p className="mt-2 text-sm text-white/70">
                    تقدير حسابي إن تحققت الشروط: {money(result.estimatedAmount)} — ليس فتوى.
                  </p>
                )}
              </div>

              {result.flags.includes("stocks_unresolved") && (
                <p className="text-sm text-muted-foreground">أسهمك غير المصنّفة لم تدخل في المبلغ.</p>
              )}
              {result.flags.includes("receivables_unresolved") && (
                <p className="text-sm text-muted-foreground">المستحقات غير المؤكدة لم تدخل في المبلغ.</p>
              )}

              {result.obligation === "due" && result.zakatAmount !== null && result.zakatAmount > 0n && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">يمكنك إخراج زكاتك الآن</p>
                  <DonateButton
                    className="w-full sm:w-auto"
                    message={`السلام عليكم، حابب أخرج زكاة مالي عبر أثر لمخيم نسائم الرحمة. المبلغ حسب الحاسبة: ${formatAmount(result.zakatAmount)} ${currency}.`}
                  >
                    أخرج زكاتك
                  </DonateButton>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {step > 0 && (
              <Button href="#zakat-calc" variant="ghost" className="min-w-28" arrow={false} onClick={() => setStep((s) => s - 1)}>
                السابق
              </Button>
            )}
            {step < STEPS.length - 1 && (
              <Button href="#zakat-calc" className="min-w-28" onClick={() => setStep((s) => s + 1)} arrow={false}>
                متابعة
              </Button>
            )}
          </div>
        </section>

        <aside className="hidden lg:sticky lg:top-28 lg:block">
          <div className="rounded-3xl border border-border bg-card p-5 shadow-[0_12px_32px_#1435280f]">
            <p className="text-sm font-semibold text-primary">ملخص الحساب</p>
            <p className="mt-3 text-sm text-muted-foreground">صافي الزكوي</p>
            <p className="font-display text-2xl">{money(result.zakatableWealth)}</p>
            <p className="mt-3 text-sm text-muted-foreground">الزكاة</p>
            <p className="text-lg font-semibold">{dueLabel}</p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              أسعار الذهب والعملات المستخدمة في الحساب آخر تحديث لها: {MARKET_PRICES.updatedAt ?? "يُدخلها المستخدم، لا يوجد تحديث محفوظ."}
            </p>
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-5 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">الزكاة المستحقة</p>
            <p className="text-sm font-semibold">{dueLabel}</p>
          </div>
          {step < STEPS.length - 1 ? (
            <Button href="#zakat-calc" size="sm" onClick={() => setStep((s) => s + 1)} arrow={false}>
              متابعة
            </Button>
          ) : result.obligation === "due" && result.zakatAmount !== null ? (
            <DonateButton
              size="sm"
              message={`السلام عليكم، حابب أخرج زكاة مالي عبر أثر لمخيم نسائم الرحمة. المبلغ حسب الحاسبة: ${formatAmount(result.zakatAmount)} ${currency}.`}
            >
              أخرج زكاتك
            </DonateButton>
          ) : (
            <span className="text-xs text-muted-foreground">راجِع النتيجة</span>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
