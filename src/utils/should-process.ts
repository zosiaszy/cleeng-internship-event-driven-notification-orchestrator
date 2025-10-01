import { Event } from "../controllers/events.controller";
import { isInDndWindow } from "./dnd-check";

export type NotificationDecision =
  | { decision: "PROCESS_NOTIFICATION" }
  | {
      decision: "DO_NOT_NOTIFY";
      reason: "DND_ACTIVE" | "USER_UNSUBSCRIBED_FROM_EVENT";
    };

export function shouldProcessNotification(
  event: Event,
  preferences: any,
): NotificationDecision {
  const eventSetting = preferences.eventSettings[event.eventType];

  if (!eventSetting || !eventSetting.enabled) {
    return {
      decision: "DO_NOT_NOTIFY",
      reason: "USER_UNSUBSCRIBED_FROM_EVENT",
    };
  }

  const eventDate = new Date(event.timestamp);
  const isDnd = isInDndWindow(
    eventDate,
    preferences.dnd.start,
    preferences.dnd.end,
  );

  if (isDnd) {
    return {
      decision: "DO_NOT_NOTIFY",
      reason: "DND_ACTIVE",
    };
  }

  return {
    decision: "PROCESS_NOTIFICATION",
  };
}
