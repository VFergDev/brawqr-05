import { CanEdit, EditButton } from '@/components/auth';
import { getUserByUsername } from '../../../lib/data/get-user-by-username';
import {
  ProfileHeader,
  ProfileBio,
  SocialLinks,
  NotFoundMessage,
  ProfileDetails // ← Import new component
} from '@/components/profiles';
import { getCurrentUser } from '@/lib/auth/server-auth';

interface PageProps {
  params: {
    username: string;
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const userProfile = await getUserByUsername(params.username);
  const currentUser = await getCurrentUser();

  return (
    <div style={{ padding: "15px", fontFamily: "Arial, sans-serif" }}>
      <h1>User Profile</h1>

      <CanEdit currentUser={currentUser} profile={userProfile}>
        <div style={{ marginBottom: "5px" }}>
          <EditButton username={params.username} />
        </div>
      </CanEdit>

      {!userProfile ? (
        <NotFoundMessage username={params.username} />
      ) : (
        <div>
          <ProfileHeader profile={userProfile} />
          <ProfileBio bio={userProfile.bio} />
          <SocialLinks profile={userProfile} />

          {/* Use the new ProfileDetails component */}
          <ProfileDetails profile={userProfile} />
        </div>
      )}
    </div>
  );
}