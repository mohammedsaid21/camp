/** نسبة الإنجاز من أرقام حقيقية فقط. لا تُخترع. */
export function projectProgress(amountRaised: number | null, targetAmount: number | null): number | null {
  if (amountRaised === null || targetAmount === null || targetAmount <= 0) return null;
  if (amountRaised < 0) return 0;
  return Math.min((amountRaised / targetAmount) * 100, 100);
}

export function remainingAmount(amountRaised: number | null, targetAmount: number | null): number | null {
  if (amountRaised === null || targetAmount === null) return null;
  return Math.max(targetAmount - amountRaised, 0);
}

export function isFunded(amountRaised: number | null, targetAmount: number | null, status: string) {
  if (status === "completed") return true;
  const progress = projectProgress(amountRaised, targetAmount);
  return progress !== null && progress >= 100;
}
