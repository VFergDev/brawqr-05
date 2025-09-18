"use server";

import { generateSlug } from "@/utils/slug";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";
import { EventFormValues } from "../validations/event-validation";

export async function createEvent(formData: EventFormValues, userId: string) {
  const supabase = createClient();

  const slug = generateSlug(formData.name);

  const { error } = await (await supabase).from("events").insert([
    {
      ...formData,
      slug,
      created_by: userId,
    },
  ]);

  if (error) {
    console.error("Error creating event:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/e");
  return { success: true, slug };
}
