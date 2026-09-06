import { ZakatCalculator } from "./ZakatCalculator";
import { ZakatMethod } from "./ZakatMethod";

export function ZakatPage() {
  return (
    <div id="zakat-calc" className="bg-surface pt-28 pb-28 md:pb-16">
      <div className="athar-wrap">
        <header className="mb-8 max-w-2xl">
          <p className="type-kicker">عبادة مالية، مش مجرد رقم</p>
          <h1 className="type-h1 mt-2">احسب زكاتك</h1>
          <p className="mt-3 type-body text-muted-foreground">
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
