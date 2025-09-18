// app/profile/[username]/page.tsx
import { createClient } from "@/lib/supabase/server";
// import { redirect } from "next/navigation";
import ProfileDisplay from "@/components/profile/ProfileDisplay";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProfilePageProps {
  params: { username: string };
}

export default async function PublicProfilePage({ params }: ProfilePageProps) {
  const supabase = await createClient();
  const username = params.username;

  // Fetch profile data by username
  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (profileError || !profile) {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <Button variant="outline" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>

        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-muted-foreground">
            The user @{username} does not exist or has not set up their profile
            yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Button variant="outline" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </Button>

      <ProfileDisplay profile={profile} />
    </div>
  );
}
