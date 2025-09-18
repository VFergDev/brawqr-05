"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { eventFormSchema } from "@/lib/validations/profile-validations";

export function EventForm() {
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: "",
      description: "", // Initialize with empty string for Textarea
      start_time: "", // We will use a datetime-local input
      end_time: "", // We will use a datetime-local input
      image_url: "",
      event_link: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    // This is where you would typically send data to your API.
    console.log("Form submitted with values:", values);

    // Example of a data object to send:
    const newEventData = {
      ...values,
      // You can add fields handled by the backend here
      // e.g., created_by: "user-id-123",
      // created_at: new Date().toISOString()
    };

    // Example API call:
    // try {
    //   const response = await fetch('/api/events', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(newEventData),
    //   });
    //   if (response.ok) {
    //     console.log('Event created successfully!');
    //     form.reset(); // Reset form after successful submission
    //   } else {
    //     console.error('Failed to create event.');
    //   }
    // } catch (error) {
    //   console.error('An error occurred:', error);
    // }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
        {/* Event Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="Tech Conference 2025" {...field} />
              </FormControl>
              <FormDescription>
                This is the public name of your event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                {/* Textarea is used for multi-line text input */}
                <Textarea
                  placeholder="Tell us a little about the event"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A brief description to inform attendees.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Start and End Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="start_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  {/* We use type="datetime-local" for browser-native date/time picker */}
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Image URL */}
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                {/* type="url" provides basic browser-level validation and appropriate keyboard on mobile */}
                <Input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A direct link to the event's banner image.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Event Link */}
        <FormField
          control={form.control}
          name="event_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Link</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://your-event-website.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A URL where attendees can find more information.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create Event</Button>
      </form>
    </Form>
  );
}
