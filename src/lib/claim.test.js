import { describe, expect, test } from "bun:test";
import { claimAmount, canClaim, COUNTRIES, isSolAddress, SURVEY_URL } from "./claim";

describe("claim rules", () => {
  test("starts at $0", () => expect(claimAmount(null, "")).toBe(0));
  test("over 18 raises amount to $50", () => expect(claimAmount("over", "")).toBe(50));
  test("country selection raises amount to $150", () => {
    for (const country of COUNTRIES) expect(claimAmount("over", country)).toBe(150);
  });
  test("only the four specified countries are available", () => expect([...COUNTRIES]).toEqual(["U.S.", "U.K.", "AU.", "CA."]));
  test("under 18 cannot claim", () => expect(canClaim("under", "U.S.", true)).toBe(false));
  test("claim is blocked before survey is opened", () => expect(canClaim("over", "U.S.", false)).toBe(false));
  test("claim is available after all steps without an address", () => expect(canClaim("over", "U.S.", true)).toBe(true));
  test("survey uses the supplied destination", () => expect(SURVEY_URL).toBe("https://trksy.org/aff_c?offer_id=1727&aff_id=152053"));
  test("address check accepts 32-byte base58 addresses only", () => {
    expect(isSolAddress("11111111111111111111111111111111")).toBe(true);
    expect(isSolAddress("not-an-address")).toBe(false);
    expect(isSolAddress("1".repeat(33))).toBe(false);
  });
});