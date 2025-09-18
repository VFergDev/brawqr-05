// This defines the possible user types
export type UserType = "fan" | "artist" | "brand" | "admin";

// This interface describes what a user profile object looks like
export interface UserProfile {
  id: string; // UUID from your database
  username: string | null; // Can be string or null
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  website_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  location: string | null;
  user_type: UserType; // Must be one of: 'fan', 'artist', or 'brand'

  // Artist-specific fields (will be null for other types)
  artist_name: string | null;
  genre: string | null;

  // Brand-specific fields (will be null for other types)
  brand_name: string | null;
  industry: string | null;

  // Timestamps from your database
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  name: string;
  description: string | null;
  start_time: string;
  end_time: string;
  image_url: string | null;
  event_link: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  slug: string;
}

export interface RSVP {
  user_id: string;
  event_id: string;
  status: "attending" | "maybe" | "not_attending";
  notes: string | null;
  checked_in_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface EventWithRSVP extends Event {
  rsvp_count: number;
  user_rsvp_status: RSVP["status"] | null;
}