/**
 * أسعار السوق المستخدمة في الحاسبة.
 *
 * لا يوجد في المشروع API موثوق للذهب أو لأسعار الصرف.
 * لذلك لا تُعرض أسعار على أنها مباشرة/حية، ولا تُخترع أرقام.
 *
 * إذا أُدخلت قيمة لاحقًا من لوحة إدارة، عبّئ الحقول مع وقت التحديث والمصدر.
 * حتى ذلك الحين: المستخدم يدخل سعر جرام الذهب عيار 21 بنفسه.
 */
import type { CurrencyCode } from "./rules";

export type MarketPrices = {
  goldKarat21PerGram: number | null;
  silverPerGram: number | null;
  currency: CurrencyCode;
  updatedAt: string | null;
  source: string | null;
  /** أسعار تحويل إلى عملة الأساس. null = التحويل غير متاح داخل الحاسبة. */
  fxToBase: Partial<Record<CurrencyCode, number>> | null;
};

export const MARKET_PRICES: MarketPrices = {
  goldKarat21PerGram: null,
  silverPerGram: null,
  currency: "USD",
  updatedAt: null,
  source: null,
  fxToBase: null,
};

export function hasConfiguredGoldPrice(market: MarketPrices = MARKET_PRICES) {
  return market.goldKarat21PerGram !== null && market.goldKarat21PerGram > 0;
}
