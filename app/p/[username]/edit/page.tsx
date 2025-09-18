import { EditProfileForm } from "@/components/profiles";
import { getCurrentUser } from "@/lib/auth/server-auth";
import { getUserByUsername } from "@/lib/data/get-user-by-username";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    username: string;
  };
}

export default async function EditProfilePage({ params }: PageProps) {
  const userProfile = await getUserByUsername(params.username);
  const currentUser = await getCurrentUser();

  // If user doesn't have permission, redirect them
  const canEdit =
    currentUser &&
    userProfile &&
    (currentUser.id === userProfile.id ||
      currentUser.email === "admin@example.com");

  if (!canEdit) {
    redirect(`/p/${params.username}`); // Redirect to profile page
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
      }}
    >
      <h1>Edit Profile</h1>
      <p>Editing profile for: {userProfile?.display_name || params.username}</p>

      <EditProfileForm profile={userProfile!} username={params.username} />
    </div>
  );
}
