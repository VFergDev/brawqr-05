import { z } from "zod";

export const eventFormSchema = z.object({
  name: z.string().min(2, "Event name must be at least 2 characters"),
  description: z.string().optional(),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
  image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  event_link: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
