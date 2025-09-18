import { UserProfile } from "../../lib/database/types";

interface ProfileDetailsProps {
  profile: UserProfile;
}

export default function ProfileDetails({ profile }: ProfileDetailsProps) {
  return (
    <div
      style={{
        marginTop: "20px",
        padding: "15px",
        border: "1px solid #eee",
        borderRadius: "5px",
      }}
    >
      <h3>Profile Details</h3>
      <p>Member since: {new Date(profile.created_at).toLocaleDateString()}</p>

      {/* New location field */}
      {profile.location && <p>Location: {profile.location}</p>}

      {/* Conditional fields based on user type */}
      {profile.user_type === "artist" && profile.artist_name && (
        <p>Artist Name: {profile.artist_name}</p>
      )}
      {profile.user_type === "brand" && profile.brand_name && (
        <p>Brand Name: {profile.brand_name}</p>
      )}
    </div>
  );
}
