import { ZakatCalculator } from "./ZakatCalculator";
import { ZakatMethod } from "./ZakatMethod";

export function ZakatPage() {
  return (
    <div id="zakat-calc" className="bg-surface pt-28 pb-28 md:pb-16">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <header className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold text-primary">عبادة مالية، مش مجرد رقم</p>
          <h1 className="mt-1 text-[clamp(1.7rem,4vw,2.4rem)] font-semibold leading-snug">احسب زكاتك</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            أدخل أموالك، تُحسب قيمة النصاب من سعر الذهب الذي تعتمده، ويُسأل عن الحول، ثم تظهر النتيجة بالتفصيل. المنهج
            المستخدم معلن، والحاسبة لا تخترع سعرًا ولا فتوى.
          </p>
        </header>
        <ZakatCalculator />
        <ZakatMethod />
      </div>
    </div>
  );
}
