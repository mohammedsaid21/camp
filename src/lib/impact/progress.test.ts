import { describe, expect, it } from "vitest";
import { isFunded, projectProgress, remainingAmount } from "./progress";

describe("projectProgress", () => {
  it("returns null when amounts are missing", () => {
    expect(projectProgress(null, 1200)).toBeNull();
    expect(projectProgress(840, null)).toBeNull();
  });

  it("caps at 100", () => {
    expect(projectProgress(1500, 1200)).toBe(100);
  });

  it("computes a real ratio", () => {
    expect(projectProgress(840, 1200)).toBe(70);
  });
});

describe("remainingAmount", () => {
  it("does not go below zero", () => {
    expect(remainingAmount(1300, 1200)).toBe(0);
  });
});

describe("isFunded", () => {
  it("treats completed status as funded", () => {
    expect(isFunded(null, null, "completed")).toBe(true);
  });
});
