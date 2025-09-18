
"use client"

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CreateEventForm from "./CreateEventForm";
import { User } from "@supabase/supabase-js";
import { getUserProfile } from "../../lib/data/get-user-profile";
import { UserProfile } from "@/lib/database/types";

interface CreateEventButtonProps {
  user: User | null;
}

export default function CreateEventButton({ user }: CreateEventButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Explicitly set the type for the userProfile state
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      const fetchUserProfile = async () => {
        try {
          const profile = await getUserProfile(user.id);
          // The setUserProfile now accepts a UserProfile or null
          setUserProfile(profile);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          setUserProfile(null);
        } finally {
          setLoading(false);
        }
      };
      fetchUserProfile();
    } else {
      setUserProfile(null);
      setLoading(false);
    }
  }, [user]);

  // The 'userProfile' is now correctly typed, so the property check is valid.
  const canCreateEvent =
    userProfile &&
    (userProfile.user_type === "artist" ||
      userProfile.user_type === "brand" ||
      userProfile.user_type === "admin");

  if (loading) return null; // Or a loading spinner
  if (!canCreateEvent) return null;

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create Event</Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create An Event</DialogTitle>
            </DialogHeader>
          <CreateEventForm
            onSuccess={() => setIsOpen(false)}
            onCancel={() => setIsOpen(false)}
            userId={user!.id} // Use the non-null assertion operator
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
