"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
import { ProfileFormValues } from "../validations/profile-validations";

export async function updateProfile(userId: string, data: ProfileFormValues) {
  // Create Supabase client for server-side operations
  const supabase = await createClient();

  try {
    // Update the user profile in the database
    const { error } = await supabase
      .from("user_profiles")
      .update({
        display_name: data.display_name,
        bio: data.bio,
        website_url: data.website_url || null,
        twitter_url: data.twitter_url || null,
        instagram_url: data.instagram_url || null,
        facebook_url: data.facebook_url || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) {
      console.error("Supabase error:", error);
      return {
        success: false,
        error: `Database error: ${error.message}`,
      };
    }

    // Revalidate the profile page to show updated data
    revalidatePath(`/p/[username]`, "page");

    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new Error("Failed to update profile");
  }
}
