export const SURVEY_URL = "https://trksy.org/aff_c?offer_id=1727&aff_id=152053";
export const COUNTRIES = ["U.S.", "U.K.", "AU.", "CA."] as const;
export type Age = "over" | "under" | null;
export function claimAmount(age: Age, country: string) {
  if (age !== "over") return 0;
  return COUNTRIES.some((option) => option === country) ? 150 : 50;
}
export function canClaim(age: Age, country: string, surveyOpened: boolean) {
  return age === "over" && COUNTRIES.some((option) => option === country) && surveyOpened;
}
export function isSolAddress(value: string) {
  const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  const text = value.trim();
  if (text.length < 32 || text.length > 44) return false;
  let number = 0n;
  for (const character of text) {
    const digit = alphabet.indexOf(character);
    if (digit < 0) return false;
    number = number * 58n + BigInt(digit);
  }
  let bytes = 0;
  while (number > 0n) { bytes++; number >>= 8n; }
  return bytes + (text.match(/^1*/)?.[0].length ?? 0) === 32;
}