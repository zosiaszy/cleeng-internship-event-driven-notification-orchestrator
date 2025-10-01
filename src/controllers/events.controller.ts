import { Express, Request, Response } from "express";
import { z } from "zod";
import { preferencesStore } from "./preferences.controller";
import { shouldProcessNotification } from "../utils/should-process";

export const EventSchema = z.object({
  eventId: z.string(),
  userId: z.string(),
  eventType: z.string(),
  timestamp: z.string().datetime(),
});

export type Event = z.infer<typeof EventSchema>;

type NotificationDecision =
  | { decision: "PROCESS_NOTIFICATION" }
  | {
      decision: "DO_NOT_NOTIFY";
      reason: "DND_ACTIVE" | "USER_UNSUBSCRIBED_FROM_EVENT";
    };

export const eventsControllerFactory = (app: Express) => {
  app.post("/events", (req: Request, res: Response) => {
    try {
      const event = EventSchema.parse(req.body);

      const preferences = preferencesStore.get(event.userId);

      if (!preferences) {
        return res.status(200).json({
          decision: "DO_NOT_NOTIFY",
          reason: "USER_UNSUBSCRIBED_FROM_EVENT",
        });
      }

      const decision = shouldProcessNotification(event, preferences);

      if (decision.decision === "PROCESS_NOTIFICATION") {
        return res.status(202).json(decision);
      } else {
        return res.status(200).json(decision);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Validation error",
          details: error.issues,
        });
      }

      return res.status(500).json({
        error: "Internal server error",
      });
    }
  });
};
