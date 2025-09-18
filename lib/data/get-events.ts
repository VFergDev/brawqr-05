import { createClient } from "../supabase/client";
import { Event } from "../database/types";

export async function getEvents() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("start_time", { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }

  return data as Event[];
}

// Update getEventBySlug function to include creator info
export async function getEventBySlug(slug: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('events')
    .select(`
      *,
      creator:user_profiles(
        username,
        display_name,
        avatar_url,
        user_type
      )
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching event:', error);
    return null;
  }

  return data;
}
