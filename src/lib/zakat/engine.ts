import { ACTIVE_NISAB_METHOD, RECEIVABLE_RULE, STOCK_RULE, ZAKAT_RATE, ZAKAT_RATE_DENOMINATOR, ZAKAT_RATE_NUMERATOR } from "./rules";
import { add, goldValueFromWeight, max0, mulDiv, sub, sum, MONEY_SCALE } from "./money";
import type { ZakatInput, ZakatResult } from "./types";

function applyZakatRate(wealth: bigint) {
  return mulDiv(wealth, ZAKAT_RATE_NUMERATOR, ZAKAT_RATE_DENOMINATOR);
}

export function calculateZakat(input: ZakatInput): ZakatResult {
  const flags: string[] = [];
  const nisab = ACTIVE_NISAB_METHOD;

  const cash = sum([input.cashOnHand, input.bankBalances, input.otherCurrenciesConverted]);

  let gold = 0n;
  if (input.goldMode === "value") {
    gold = input.goldValue;
  } else if (input.goldGrams > 0n) {
    if (input.goldKarat21PricePerGram === null) {
      flags.push("gold_weight_needs_price");
    } else {
      gold = goldValueFromWeight({
        grams: input.goldGrams,
        karat: input.goldKarat,
        pricePerGramAtNisabKarat: input.goldKarat21PricePerGram,
        nisabKarat: nisab.karat,
      });
    }
  }

  let silver = 0n;
  if (input.silverMode === "value") {
    silver = input.silverValue;
  } else if (input.silverGrams > 0n) {
    if (input.silverPricePerGram === null) {
      flags.push("silver_weight_needs_price");
    } else {
      silver = goldValueFromWeight({
        grams: input.silverGrams,
        karat: 24,
        pricePerGramAtNisabKarat: input.silverPricePerGram,
        nisabKarat: 24,
      });
    }
  }

  let investments = 0n;
  if (input.stockPurpose === "trade") {
    investments = add(input.stockMarketValue, input.stockReturns);
  } else if (input.stockPurpose === "long_term") {
    investments = input.stockReturns;
    flags.push("stocks_returns_only");
  } else if (input.stockMarketValue > 0n || input.stockReturns > 0n) {
    flags.push("stocks_unresolved");
  }

  let receivables = 0n;
  if (input.receivableQuality === "expected" && RECEIVABLE_RULE.includeExpectedRepayment) {
    receivables = input.receivables;
  } else if (input.receivableQuality === "unsure" && input.receivables > 0n) {
    flags.push("receivables_unresolved");
  }

  const assetTotal = sum([cash, gold, silver, investments, receivables]);
  const liabilities = max0(input.immediateDebts);
  const zakatableWealth = max0(sub(assetTotal, liabilities));

  const nisabValue =
    input.goldKarat21PricePerGram === null
      ? null
      : goldValueFromWeight({
          grams: BigInt(nisab.grams) * MONEY_SCALE,
          karat: nisab.karat,
          pricePerGramAtNisabKarat: input.goldKarat21PricePerGram,
          nisabKarat: nisab.karat,
        });

  const nisabReached = nisabValue === null ? null : zakatableWealth >= nisabValue;
  const computed = applyZakatRate(zakatableWealth);

  let obligation: ZakatResult["obligation"] = "due";
  let zakatAmount: bigint | null = computed;
  let estimatedAmount: bigint | null = null;

  if (nisabValue === null) {
    obligation = "missing_gold_price";
    zakatAmount = null;
    flags.push("nisab_needs_gold_price");
  } else if (!nisabReached) {
    obligation = "below_nisab";
    zakatAmount = 0n;
  } else if (input.hawl === "no") {
    obligation = "hawl_not_met";
    zakatAmount = null;
  } else if (input.hawl === "unsure") {
    obligation = "hawl_unresolved";
    zakatAmount = null;
    estimatedAmount = computed;
  }

  if (STOCK_RULE.unsureExcluded && flags.includes("stocks_unresolved")) {
    flags.push("result_excludes_unresolved_stocks");
  }

  return {
    currency: input.currency,
    assets: { cash, gold, silver, investments, receivables, liabilities },
    assetTotal,
    liabilities,
    zakatableWealth,
    nisabGrams: nisab.grams,
    nisabKarat: nisab.karat,
    nisabValue,
    nisabReached,
    rate: ZAKAT_RATE,
    zakatAmount,
    estimatedAmount,
    obligation,
    flags,
  };
}
