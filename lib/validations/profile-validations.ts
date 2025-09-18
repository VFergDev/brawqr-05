import { z } from "zod";

export const profileFormSchema = z.object({
  display_name: z
    .string()
    .min(2, {
      message: "Display name must be at least 2 characters.",
    })
    .max(50, {
      message: "Display name must not exceed 50 characters.",
    })
    .optional(),

  bio: z
    .string()
    .max(500, {
      message: "Bio must not exceed 500 characters.",
    })
    .optional(),

  website_url: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),

  twitter_url: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),

  instagram_url: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),

  facebook_url: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
