"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { RSVP } from "../../lib/database/types";
import { createRSVP, getUserRSVP, updateRSVP } from "@/lib/data/rsvps";

interface EventRSVPProps {
  eventId: string;
  userId: string;
}

export default function EventRSVP({ eventId, userId }: EventRSVPProps) {
  const [userRSVP, setUserRSVP] = useState<RSVP | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user's current RSVP status
  useEffect(() => {
    const fetchUserRSVP = async () => {
      const rsvp = await getUserRSVP(eventId, userId);
      setUserRSVP(rsvp);
      setIsLoading(false);
    };
    fetchUserRSVP();
  }, [eventId, userId]);

  const handleRSVP = async (status: RSVP["status"]) => {
    setIsLoading(true);

    try {
      if (userRSVP) {
        // Update existing RSVP - we don't need the result for UI feedback
        await updateRSVP(eventId, userId, { status });
      } else {
        // Create new RSVP - we don't need the result for UI feedback
        await createRSVP(eventId, userId, status);
      }

      // Refresh RSVP data to update the UI
      const updatedRSVP = await getUserRSVP(eventId, userId);
      setUserRSVP(updatedRSVP);
    } catch (error) {
      console.error("Error updating RSVP:", error);
      // You could add toast notifications here later
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-2">
      <h3 className="font-semibold">RSVP to this event</h3>
      <div className="flex gap-2">
        <Button
          onClick={() => handleRSVP("attending")}
          variant={userRSVP?.status === "attending" ? "default" : "outline"}
          disabled={isLoading}
        >
          👍 Attending
        </Button>
        <Button
          onClick={() => handleRSVP("maybe")}
          variant={userRSVP?.status === "maybe" ? "default" : "outline"}
          disabled={isLoading}
        >
          🤔 Maybe
        </Button>
        <Button
          onClick={() => handleRSVP("not_attending")}
          variant={userRSVP?.status === "not_attending" ? "default" : "outline"}
          disabled={isLoading}
        >
          ❌ Can&apos;t Make It
        </Button>
      </div>
      {userRSVP && (
        <p className="text-sm text-gray-600">
          Your current status: <strong>{userRSVP.status}</strong>
        </p>
      )}
    </div>
  );
}
