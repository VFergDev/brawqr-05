import CreateEventButton from "@/components/events/CreateEventButton";
import { getEvents } from "../../lib/data/get-events";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/server-auth";

export default async function EventsPage() {
  const events = await getEvents();
  const user = await getCurrentUser();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Events</h1>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="grid gap-4">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/e/${event.slug}`}
              className="border p-4 rounded-lg hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <p>{new Date(event.start_time).toLocaleDateString()}</p>
            </Link>
          ))}
        </div>
      )}

      <CreateEventButton user={user} />
    </div>
  );
}
