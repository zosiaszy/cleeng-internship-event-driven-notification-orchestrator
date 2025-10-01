import { describe, it, expect } from "@jest/globals";
import { shouldProcessNotification } from "../utils/should-process";
import { Event } from "../types/index";

describe("shouldProcessNotification", () => {
  it("returns DO_NOT_NOTIFY when event is disabled", () => {
    const event: Event = {
      eventId: "evt_1",
      userId: "user123",
      eventType: "item_shipped",
      timestamp: "2025-09-30T10:00:00Z",
    };

    const preferences = {
      dnd: { start: "22:00", end: "07:00" },
      eventSettings: {
        item_shipped: { enabled: false },
      },
    };

    const result = shouldProcessNotification(event, preferences);

    expect(result).toEqual({
      decision: "DO_NOT_NOTIFY",
      reason: "USER_UNSUBSCRIBED_FROM_EVENT",
    });
  });

  it("returns DO_NOT_NOTIFY when event is inside DND", () => {
    const event: Event = {
      eventId: "evt_2",
      userId: "user123",
      eventType: "item_shipped",
      timestamp: "2025-09-30T23:30:00Z",
    };

    const preferences = {
      dnd: { start: "22:00", end: "07:00" },
      eventSettings: {
        item_shipped: { enabled: true },
      },
    };

    const result = shouldProcessNotification(event, preferences);

    expect(result).toEqual({
      decision: "DO_NOT_NOTIFY",
      reason: "DND_ACTIVE",
    });
  });

  it("returns PROCESS_NOTIFICATION when event is enabled and outside DND", () => {
    const event: Event = {
      eventId: "evt_3",
      userId: "user123",
      eventType: "item_shipped",
      timestamp: "2025-09-30T08:30:00Z",
    };

    const preferences = {
      dnd: { start: "22:00", end: "07:00" },
      eventSettings: {
        item_shipped: { enabled: true },
      },
    };

    const result = shouldProcessNotification(event, preferences);

    expect(result).toEqual({
      decision: "PROCESS_NOTIFICATION",
    });
  });
});
