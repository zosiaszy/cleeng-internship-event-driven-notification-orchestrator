import { describe, it, expect } from "@jest/globals";
import { isInDndWindow } from "../utils/dnd-check";

describe("isInDndWindow", () => {
  it("returns true when the event is inside DND window crossing midnight", () => {
    const result = isInDndWindow(
      new Date("2025-07-28T23:30:00Z"),
      "22:00",
      "07:00",
    );
    expect(result).toBe(true);
  });

  it("returns false when the event is outside of the DND window", () => {
    const result = isInDndWindow(
      new Date("2025-07-28T08:00:00Z"),
      "22:00",
      "07:00",
    );
    expect(result).toBe(false);
  });
});
