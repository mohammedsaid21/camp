/**
 * حساب مالي بكسور عشرية ثابتة (6 منازل) لتفادي أخطاء IEEE-754.
 * التقريب للعرض فقط، وليس أثناء الجمع والضرب.
 */

export const MONEY_SCALE = 1_000_000n;
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

export class MoneyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MoneyError";
  }
}

function normalizeDigits(raw: string) {
  return raw
    .trim()
    .replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)))
    .replace(/,/g, "")
    .replace(/٫/g, ".")
    .replace(/\s/g, "");
}

/** يحوّل إدخال المستخدم إلى وحدات داخلية. يرفض السالب وغير الرقمي. */
export function parseAmount(raw: string): bigint {
  const text = normalizeDigits(raw);
  if (text === "" || text === ".") return 0n;
  if (text.startsWith("-")) throw new MoneyError("negative");
  if (!/^\d+(\.\d+)?$/.test(text)) throw new MoneyError("invalid");

  const [wholePart = "0", fracPart = ""] = text.split(".");
  const frac = (fracPart + "000000").slice(0, 6);
  const extra = fracPart.slice(6);
  if (/[^0-9]/.test(wholePart) || (extra && /[^0]/.test(extra))) {
    throw new MoneyError("invalid");
  }

  const whole = BigInt(wholePart === "" ? "0" : wholePart);
  return whole * MONEY_SCALE + BigInt(frac);
}

export function fromNumber(value: number): bigint {
  if (!Number.isFinite(value) || value < 0) throw new MoneyError("invalid");
  return parseAmount(value.toFixed(6));
}

export function add(a: bigint, b: bigint) {
  return a + b;
}

export function sum(values: readonly bigint[]) {
  return values.reduce((acc, n) => acc + n, 0n);
}

export function sub(a: bigint, b: bigint) {
  return a - b;
}

export function max0(value: bigint) {
  return value < 0n ? 0n : value;
}

/** a * numerator / denominator مع تقريب إلى أقرب وحدة داخلية (نصف لأعلى). */
export function mulDiv(amount: bigint, numerator: bigint, denominator: bigint) {
  if (denominator === 0n) throw new MoneyError("division_by_zero");
  const product = amount * numerator;
  const half = denominator / 2n;
  return (product + half) / denominator;
}

export function goldValueFromWeight(params: {
  grams: bigint;
  karat: number;
  pricePerGramAtNisabKarat: bigint;
  nisabKarat: number;
}) {
  if (params.karat <= 0 || params.karat > 24) throw new MoneyError("invalid_karat");
  if (params.nisabKarat <= 0) throw new MoneyError("invalid_karat");
  return mulDiv(
    mulDiv(params.grams, BigInt(params.karat), BigInt(params.nisabKarat)),
    params.pricePerGramAtNisabKarat,
    MONEY_SCALE,
  );
}

export function formatAmount(amount: bigint, fractionDigits = 2) {
  const negative = amount < 0n;
  const abs = negative ? -amount : amount;
  const whole = abs / MONEY_SCALE;
  const frac = abs % MONEY_SCALE;
  const fracText = frac.toString().padStart(6, "0").slice(0, fractionDigits);
  const wholeText = whole.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const sign = negative ? "-" : "";
  if (fractionDigits === 0) return `${sign}${wholeText}`;
  return `${sign}${wholeText}.${fracText}`;
}

export function toNumberForDisplay(amount: bigint) {
  return Number(amount) / Number(MONEY_SCALE);
}
