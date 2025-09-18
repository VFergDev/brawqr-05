import { createClient } from "../supabase/client";
import { RSVP } from "../database/types";

// Create a new RSVP
export async function createRSVP(
  eventId: string,
  userId: string,
  status: RSVP["status"] = "attending",
  notes?: string
) {
  const supabase = createClient();

  const { error } = await supabase.from("rsvps").insert([
    {
      event_id: eventId,
      user_id: userId,
      status,
      notes,
    },
  ]);

  if (error) {
    console.error("Error creating RSVP:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// Get a user's RSVP for a specific event
export async function getUserRSVP(eventId: string, userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("rsvps")
    .select("*")
    .eq("event_id", eventId)
    .eq("user_id", userId)
    .single();

  if (error?.code === "PGRST116") {
    // No rows found - this is normal
    return null;
  }

  if (error) {
    console.error("Error fetching RSVP:", error);
    return null;
  }

  return data as RSVP;
}

// Update an existing RSVP
export async function updateRSVP(
  eventId: string,
  userId: string,
  updates: Partial<RSVP>
) {
  const supabase = createClient();

  const { error } = await supabase
    .from("rsvps")
    .update(updates)
    .eq("event_id", eventId)
    .eq("user_id", userId);

  if (error) {
    console.error("Error updating RSVP:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// Get all RSVPs for a specific event with user information
export async function getEventRSVPs(eventId: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('rsvps')
    .select(`
      status,
      user:user_profiles(
        username,
        display_name,
        avatar_url
      )
    `)
    .eq('event_id', eventId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching event RSVPs:', error);
    return [];
  }

  return data;
}