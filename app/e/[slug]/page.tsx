import { getEventBySlug } from "../../../lib/data/get-events";
import { getCurrentUser } from "../../../lib/auth/server-auth";
import { getEventRSVPs } from "../../../lib/data/rsvps"; // Add this import
import EventRSVP from "../../../components/events/EventRSVP";
import { notFound } from "next/navigation";
import EventCreator from "@/components/events/EventCreator";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function EventPage({ params }: PageProps) {
  const event = await getEventBySlug(params.slug);
  const user = await getCurrentUser();
  const rsvps = await getEventRSVPs(event?.id || ""); // Fetch RSVPs for this event

  if (!event) {
    notFound();
  }

  // Count RSVPs by status
  const attendingCount = rsvps.filter((r) => r.status === "attending").length;
  const maybeCount = rsvps.filter((r) => r.status === "maybe").length;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
      <p className="text-gray-600 mb-4">
        {new Date(event.start_time).toLocaleDateString()} •
        {new Date(event.start_time).toLocaleTimeString()}
      </p>

      {event.description && <p className="mb-6">{event.description}</p>}

      {event.creator && <EventCreator creator={event.creator} />}

      {/* RSVP Count Display */}
      <div className="mb-6 p-4 bg-purple-700 rounded-lg">
        <h3 className="font-semibold mb-2">Attendance</h3>
        <div className="flex gap-4">
          <span>👍 {attendingCount} attending</span>
          <span>🤔 {maybeCount} maybe</span>
        </div>
      </div>

      {/* Add RSVP Component */}
      {user && (
        <div className="mt-6 p-6 border rounded-lg">
          <EventRSVP eventId={event.id} userId={user.id} />
        </div>
      )}

      {!user && (
        <div className="mt-6 p-6 border rounded-lg bg-gray-50">
          <p className="text-gray-600">Please sign in to RSVP to this event.</p>
        </div>
      )}
    </div>
  );
}
