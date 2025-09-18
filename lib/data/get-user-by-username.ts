import { createClient } from "../supabase/client";
import { UserProfile } from "../database/types";

// Function to get a single user profile by username
export async function getUserByUsername(
  username: string
): Promise<UserProfile | null> {
  const supabase = createClient();

  try {
    console.log(`Fetching profile for username: ${username}`);

    // Query the database for a user with this exact username
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("username", username) // WHERE username = provided username
      .single(); // Expect only one result

    if (error) {
      console.error("Database error:", error);
      return null; // Return null if user not found or error
    }

    console.log("Profile found:", data ? "Yes" : "No");
    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
}
