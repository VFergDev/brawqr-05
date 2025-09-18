import { UserProfile } from "../database/types";
import { createClient } from "../supabase/client";

// This function gets user profiles from your database
export async function getUserProfiles(): Promise<UserProfile[]> {
  // Create a Supabase client instance
  const supabase = createClient();

  try {
    console.log("Fetching user profiles from database...");

    // Query the database
    const { data, error } = await supabase
      .from("user_profiles") // Table name
      .select("*") // Select all columns
      .order("created_at", { ascending: false }); // Newest first

    // Handle errors
    if (error) {
      console.error("Database error:", error);
      return []; // Return empty array on error
    }

    console.log(`Successfully fetched ${data?.length || 0} profiles`);

    // Return the data or empty array if null
    return data || [];
  } catch (error) {
    console.error("Unexpected error:", error);
    return []; // Return empty array on unexpected errors
  }
}
