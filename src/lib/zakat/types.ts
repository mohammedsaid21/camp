import type { CurrencyCode } from "./rules";

export type HawlAnswer = "yes" | "no" | "unsure";
export type StockPurpose = "trade" | "long_term" | "unsure";
export type ReceivableQuality = "expected" | "unsure";
export type MetalEntryMode = "value" | "weight";

export type ObligationStatus =
  | "due"
  | "below_nisab"
  | "hawl_not_met"
  | "hawl_unresolved"
  | "missing_gold_price";

export type ZakatInput = {
  currency: CurrencyCode;
  cashOnHand: bigint;
  bankBalances: bigint;
  otherCurrenciesConverted: bigint;
  goldMode: MetalEntryMode;
  goldValue: bigint;
  goldGrams: bigint;
  goldKarat: number;
  silverMode: MetalEntryMode;
  silverValue: bigint;
  silverGrams: bigint;
  stockPurpose: StockPurpose;
  stockMarketValue: bigint;
  stockReturns: bigint;
  receivableQuality: ReceivableQuality;
  receivables: bigint;
  immediateDebts: bigint;
  hawl: HawlAnswer;
  goldKarat21PricePerGram: bigint | null;
  silverPricePerGram: bigint | null;
};

export type ZakatBreakdown = {
  cash: bigint;
  gold: bigint;
  silver: bigint;
  investments: bigint;
  receivables: bigint;
  liabilities: bigint;
};

export type ZakatResult = {
  currency: CurrencyCode;
  assets: ZakatBreakdown;
  assetTotal: bigint;
  liabilities: bigint;
  zakatableWealth: bigint;
  nisabGrams: number;
  nisabKarat: number;
  nisabValue: bigint | null;
  nisabReached: boolean | null;
  rate: number;
  zakatAmount: bigint | null;
  estimatedAmount: bigint | null;
  obligation: ObligationStatus;
  flags: string[];
};
