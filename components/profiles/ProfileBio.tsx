// import { UserProfile } from "../../lib/database/types";

interface ProfileBioProps {
  bio: string | null;
}

export default function ProfileBio({ bio }: ProfileBioProps) {
  if (!bio) return null; // Don't render anything if no bio

  return (
    <div
      style={{
        marginTop: "15px",
        padding: "10px",
        backgroundColor: "#f5f5f5",
        borderRadius: "5px",
      }}
    >
      <h3>About</h3>
      <p>{bio}</p>
    </div>
  );
}
