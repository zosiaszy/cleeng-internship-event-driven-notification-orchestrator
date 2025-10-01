import { z } from "zod";

export const PreferencesSchema = z.object({
  dnd: z.object({
    start: z
      .string()
      .regex(
        /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
        "INVALID TIME FORMAT. USE HH:MM",
      ),
    end: z
      .string()
      .regex(
        /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
        "INVALID TIME FORMAT. USE HH:MM",
      ),
  }),
  eventSettings: z.record(
    z.string(),
    z.object({
      enabled: z.boolean(),
    }),
  ),
});
