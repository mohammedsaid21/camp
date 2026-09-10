import { describe, expect, it } from "vitest";
import { formatAddedAt } from "./dates";

describe("formatAddedAt", () => {
  it("formats an ISO timestamp in Arabic with a visible calendar date", () => {
    const text = formatAddedAt("2026-09-10T08:00:00.000Z");
    expect(text).toMatch(/2026/);
    expect(text).toMatch(/10|١١|١٠/);
  });
});
