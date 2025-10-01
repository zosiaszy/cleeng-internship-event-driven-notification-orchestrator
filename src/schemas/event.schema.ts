import { z } from "zod";

export const EventSchema = z.object({
  eventId: z.string(),
  userId: z.string(),
  eventType: z.string(),
  timestamp: z.string().datetime(),
});

export type Event = z.infer<typeof EventSchema>;
