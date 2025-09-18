import { User } from "@supabase/supabase-js";
import { UserProfile } from "../../lib/database/types";

interface CanEditProps {
  currentUser: User | null;
  profile: UserProfile | null;
  children: React.ReactNode;
}

export default function CanEdit({
  currentUser,
  profile,
  children,
}: CanEditProps) {
  // Check if user can edit this profile
  const canEdit =
    currentUser &&
    profile &&
    (currentUser.id === profile.id || // Use user.id instead of claims.sub
      currentUser.email === "admin@example.com"); // Or admin

  if (!canEdit) return null;

  return <>{children}</>;
}
