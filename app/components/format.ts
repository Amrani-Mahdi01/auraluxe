// Algerian Dinar formatting, e.g. 14900 -> "14 900 DA".
// Manual grouping keeps it deterministic (no locale differences server/client).
export const formatPrice = (n: number) =>
  `${Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} DA`;
