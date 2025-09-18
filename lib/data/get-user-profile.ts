import { createClient } from "../supabase/client";
import { UserProfile } from "../database/types";

export async function getUserProfile(
  userId: string
): Promise<UserProfile | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }

  return data;
}
