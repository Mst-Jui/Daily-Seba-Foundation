// lib/numberFormat.js
const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBnDigits(input) {
  return String(input).replace(/[0-9]/g, (d) => bnDigits[Number(d)]);
}

// number + optional suffix (e.g. "+") কে lang অনুযায়ী ফরম্যাট করে
export function formatLocalizedNumber(value, lang) {
  const str = String(value);
  return lang === "bn" ? toBnDigits(str) : str;
}