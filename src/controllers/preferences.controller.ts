import { Express, Request, Response } from "express";
import { z } from "zod";

const PreferencesSchema = z.object({
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

export type UserPreferences = z.infer<typeof PreferencesSchema>;
const preferencesStore = new Map<string, UserPreferences>();

export const preferencesControllerFactory = (app: Express) => {
  app.get("/preferences/:userId", (req: Request, res: Response) => {
    const { userId } = req.params;

    const preferences = preferencesStore.get(userId);

    if (!preferences) {
      return res.status(404).json({
        error: "Preferences not found",
        message: `No preferences found for user ${userId}`,
      });
    }
    res.status(200).json(preferences);
  });

  app.post("/preferences/:userId", (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const preferences = PreferencesSchema.parse(req.body);

      preferencesStore.set(userId, preferences);
      res.status(200).json({
        message: "Preferences saved successfully",
        preferences,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Validation error",
          details: error.issues,
        });
      }
      res.status(500).json({
        error: "Internal server error",
      });
    }
  });
};

export { preferencesStore };
