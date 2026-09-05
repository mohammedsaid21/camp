export function formatUsd(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

export function parseContributeAmount(raw: string | undefined): number | null {
  if (!raw) return null;
  const amount = Number(raw);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return amount;
}

export function contributeMessage(title: string, amount: number | null) {
  if (amount !== null) {
    return `السلام عليكم، حابب أساهم بـ $${amount} في مشروع «${title}» عبر أثر لمخيم نسائم الرحمة.`;
  }
  return `السلام عليكم، حابب أساهم في مشروع «${title}» عبر أثر لمخيم نسائم الرحمة.`;
}
