import { EventSchema } from "src/schemas/event.schema";
import { PreferencesSchema } from "src/schemas/preferences.schema";
import { z } from "zod";

export type Event = z.infer<typeof EventSchema>;

type NotificationDecision =
  | { decision: "PROCESS_NOTIFICATION" }
  | {
      decision: "DO_NOT_NOTIFY";
      reason: "DND_ACTIVE" | "USER_UNSUBSCRIBED_FROM_EVENT";
    };

export type UserPreferences = z.infer<typeof PreferencesSchema>;
