export const terms = [12, 24, 60, 72] as const;
export type Term = (typeof terms)[number];

export const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export function monthlyPayment(principal: number, aprPercent: number, months: number) {
  if (principal <= 0) return 0;
  const r = aprPercent / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

export function loanSummary(price: number, down: number, aprPercent: number, months: number) {
  const principal = Math.max(0, price - down);
  const monthly = monthlyPayment(principal, aprPercent, months);
  const totalCost = monthly * months;
  return { principal, monthly, totalCost, interest: Math.max(0, totalCost - principal) };
}
