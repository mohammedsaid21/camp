import { describe, expect, it } from "vitest";
import { calculateZakat } from "./engine";
import { MoneyError, formatAmount, fromNumber, parseAmount } from "./money";
import type { ZakatInput } from "./types";

function base(overrides: Partial<ZakatInput> = {}): ZakatInput {
  return {
    currency: "USD",
    cashOnHand: 0n,
    bankBalances: 0n,
    otherCurrenciesConverted: 0n,
    goldMode: "value",
    goldValue: 0n,
    goldGrams: 0n,
    goldKarat: 21,
    silverMode: "value",
    silverValue: 0n,
    silverGrams: 0n,
    stockPurpose: "trade",
    stockMarketValue: 0n,
    stockReturns: 0n,
    receivableQuality: "expected",
    receivables: 0n,
    immediateDebts: 0n,
    hawl: "yes",
    goldKarat21PricePerGram: fromNumber(1),
    silverPricePerGram: fromNumber(1),
    ...overrides,
  };
}

describe("money parsing", () => {
  it("parses integers and decimals", () => {
    expect(parseAmount("1000")).toBe(fromNumber(1000));
    expect(parseAmount("10.5")).toBe(fromNumber(10.5));
    expect(parseAmount("٠١٢٣")).toBe(fromNumber(123));
  });

  it("rejects negatives and invalid input", () => {
    expect(() => parseAmount("-1")).toThrow(MoneyError);
    expect(() => parseAmount("abc")).toThrow(MoneyError);
  });

  it("treats empty as zero", () => {
    expect(parseAmount("")).toBe(0n);
  });
});

describe("zakat rate", () => {
  it("1000 × 2.5% = 25", () => {
    const result = calculateZakat(base({ cashOnHand: fromNumber(1000) }));
    expect(formatAmount(result.zakatAmount ?? 0n)).toBe("25.00");
  });

  it("10000 × 2.5% = 250", () => {
    const result = calculateZakat(base({ cashOnHand: fromNumber(10000) }));
    expect(formatAmount(result.zakatAmount ?? 0n)).toBe("250.00");
  });

  it("12500 × 2.5% = 312.50", () => {
    const result = calculateZakat(base({ cashOnHand: fromNumber(12500) }));
    expect(formatAmount(result.zakatAmount ?? 0n)).toBe("312.50");
  });
});

describe("nisab", () => {
  const priced = { goldKarat21PricePerGram: fromNumber(100) };

  it("is below nisab when wealth is less than 85g × 21k price", () => {
    const result = calculateZakat(base({ cashOnHand: fromNumber(1000), ...priced }));
    expect(result.nisabValue).toBe(fromNumber(8500));
    expect(result.nisabReached).toBe(false);
    expect(result.obligation).toBe("below_nisab");
    expect(result.zakatAmount).toBe(0n);
  });

  it("equals nisab exactly", () => {
    const result = calculateZakat(base({ cashOnHand: fromNumber(8500), ...priced }));
    expect(result.nisabReached).toBe(true);
    expect(result.obligation).toBe("due");
    expect(formatAmount(result.zakatAmount ?? 0n)).toBe("212.50");
  });

  it("is above nisab", () => {
    const result = calculateZakat(base({ cashOnHand: fromNumber(10000), ...priced }));
    expect(result.nisabReached).toBe(true);
    expect(result.obligation).toBe("due");
  });

  it("cannot compute nisab without a gold price", () => {
    const result = calculateZakat(base({ goldKarat21PricePerGram: null, cashOnHand: fromNumber(10000) }));
    expect(result.obligation).toBe("missing_gold_price");
    expect(result.zakatAmount).toBeNull();
    expect(result.nisabValue).toBeNull();
  });
});

describe("hawl", () => {
  it("does not declare zakat due when hawl is no", () => {
    const result = calculateZakat(base({ cashOnHand: fromNumber(10000), hawl: "no" }));
    expect(result.obligation).toBe("hawl_not_met");
    expect(result.zakatAmount).toBeNull();
  });

  it("does not declare a definitive amount when hawl is unsure", () => {
    const result = calculateZakat(base({ cashOnHand: fromNumber(10000), hawl: "unsure" }));
    expect(result.obligation).toBe("hawl_unresolved");
    expect(result.zakatAmount).toBeNull();
    expect(formatAmount(result.estimatedAmount ?? 0n)).toBe("250.00");
  });
});

describe("debts", () => {
  it("deducts only the immediate debts entered", () => {
    const result = calculateZakat(
      base({
        cashOnHand: fromNumber(10000),
        immediateDebts: fromNumber(2000),
        goldKarat21PricePerGram: fromNumber(100),
      }),
    );
    expect(result.zakatableWealth).toBe(fromNumber(8000));
    expect(result.obligation).toBe("below_nisab");
  });
});

describe("gold", () => {
  it("values 21k gold by weight at the 21k price", () => {
    const result = calculateZakat(
      base({
        goldMode: "weight",
        goldGrams: fromNumber(85),
        goldKarat: 21,
        goldKarat21PricePerGram: fromNumber(100),
      }),
    );
    expect(result.assets.gold).toBe(fromNumber(8500));
    expect(result.nisabReached).toBe(true);
  });

  it("values 24k gold higher than the same weight of 21k", () => {
    const k24 = calculateZakat(
      base({
        goldMode: "weight",
        goldGrams: fromNumber(10),
        goldKarat: 24,
        cashOnHand: fromNumber(10000),
        goldKarat21PricePerGram: fromNumber(100),
      }),
    );
    const k21 = calculateZakat(
      base({
        goldMode: "weight",
        goldGrams: fromNumber(10),
        goldKarat: 21,
        cashOnHand: fromNumber(10000),
        goldKarat21PricePerGram: fromNumber(100),
      }),
    );
    expect(k24.assets.gold > k21.assets.gold).toBe(true);
  });

  it("uses entered gold value without mixing it with weight", () => {
    const result = calculateZakat(
      base({
        goldMode: "value",
        goldValue: fromNumber(500),
        goldGrams: fromNumber(85),
        cashOnHand: fromNumber(10000),
      }),
    );
    expect(result.assets.gold).toBe(fromNumber(500));
  });
});

describe("stocks and receivables", () => {
  it("includes market value for trade stocks", () => {
    const result = calculateZakat(
      base({ cashOnHand: fromNumber(10000), stockPurpose: "trade", stockMarketValue: fromNumber(1000) }),
    );
    expect(result.assets.investments).toBe(fromNumber(1000));
  });

  it("includes returns only for long-term stocks", () => {
    const result = calculateZakat(
      base({
        cashOnHand: fromNumber(10000),
        stockPurpose: "long_term",
        stockMarketValue: fromNumber(5000),
        stockReturns: fromNumber(200),
      }),
    );
    expect(result.assets.investments).toBe(fromNumber(200));
    expect(result.flags).toContain("stocks_returns_only");
  });

  it("excludes unresolved stocks from the amount", () => {
    const result = calculateZakat(
      base({
        cashOnHand: fromNumber(10000),
        stockPurpose: "unsure",
        stockMarketValue: fromNumber(5000),
      }),
    );
    expect(result.assets.investments).toBe(0n);
    expect(result.flags).toContain("stocks_unresolved");
  });

  it("excludes uncertain receivables", () => {
    const result = calculateZakat(
      base({
        cashOnHand: fromNumber(10000),
        receivableQuality: "unsure",
        receivables: fromNumber(3000),
      }),
    );
    expect(result.assets.receivables).toBe(0n);
    expect(result.flags).toContain("receivables_unresolved");
  });
});

describe("zero and large values", () => {
  it("handles zero wealth", () => {
    const result = calculateZakat(base());
    expect(result.zakatableWealth).toBe(0n);
    expect(result.obligation).toBe("below_nisab");
  });

  it("handles very large values", () => {
    const result = calculateZakat(base({ cashOnHand: fromNumber(1_000_000_000) }));
    expect(formatAmount(result.zakatAmount ?? 0n)).toBe("25,000,000.00");
  });
});
