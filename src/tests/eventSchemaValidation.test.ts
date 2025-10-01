import { EventSchema } from "../controllers/events.controller";
import { ZodError } from "zod";

describe("EventSchema validation", () => {
  it("fails when timestamp is not ISO", () => {
    expect(() =>
      EventSchema.parse({
        eventId: "1",
        userId: "abc",
        eventType: "test",
        timestamp: "30-09-2025",
      }),
    ).toThrow(ZodError);
  });
});
