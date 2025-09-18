import { UserProfile } from "../../lib/database/types";

interface SocialLinksProps {
  profile: UserProfile;
}

export default function SocialLinks({ profile }: SocialLinksProps) {
  // Only render if at least one social link exists
  const hasSocialLinks =
    profile.website_url ||
    profile.twitter_url ||
    profile.instagram_url ||
    profile.facebook_url;

  if (!hasSocialLinks) return null;

  return (
    <div style={{ marginTop: "15px" }}>
      <h3>Connect</h3>
      <div style={{ display: "flex", gap: "15px" }}>
        {profile.website_url && (
          <a
            href={profile.website_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue" }}
          >
            Website
          </a>
        )}
        {profile.twitter_url && (
          <a
            href={profile.twitter_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue" }}
          >
            Twitter
          </a>
        )}
        {profile.instagram_url && (
          <a
            href={profile.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue" }}
          >
            Instagram
          </a>
        )}
        {profile.facebook_url && (
          <a
            href={profile.facebook_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue" }}
          >
            Facebook
          </a>
        )}
      </div>
    </div>
  );
}
