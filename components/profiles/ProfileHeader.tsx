import { UserProfile } from "../../lib/database/types";

interface ProfileHeaderProps {
  profile: UserProfile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div>
      <h2>{profile.display_name || "Unnamed User"}</h2>
      <p>Username: {profile.username}</p>
      <p>User Type: {profile.user_type}</p>
    </div>
  );
}
