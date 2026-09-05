import { describe, expect, it } from "vitest";
import { formatUsd, parseContributeAmount } from "./format";

describe("parseContributeAmount", () => {
  it("rejects empty and non-positive values", () => {
    expect(parseContributeAmount(undefined)).toBeNull();
    expect(parseContributeAmount("")).toBeNull();
    expect(parseContributeAmount("0")).toBeNull();
    expect(parseContributeAmount("-5")).toBeNull();
  });

  it("parses a real amount", () => {
    expect(parseContributeAmount("50")).toBe(50);
  });
});

describe("formatUsd", () => {
  it("formats with a dollar sign", () => {
    expect(formatUsd(1200)).toBe("$1,200");
  });
});
