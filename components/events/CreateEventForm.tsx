"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { createEvent } from "../../lib/actions/create-event";
import { useRouter } from "next/navigation";
import { eventFormSchema, EventFormValues } from "@/lib/validations/event-validation";

interface CreateEventFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  userId: string;
}

export default function CreateEventForm({
  onSuccess,
  onCancel,
  userId,
}: CreateEventFormProps) {
  const router = useRouter();
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: "",
      description: "",
      start_time: "",
      end_time: "",
      image_url: "",
      event_link: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: EventFormValues) => {
    const result = await createEvent(data, userId);

    if (result.success) {
      onSuccess();
      router.push(`/e/${result.slug}`);
    } else {
      alert("Failed to create event: " + result.error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Event Name *</Label>
          <Input
            id="name"
            {...register("name")}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            rows={3}
            {...register("description")}
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="start_time">Start Time *</Label>
            <Input
              id="start_time"
              type="datetime-local"
              {...register("start_time")}
              className={errors.start_time ? "border-red-500" : ""}
            />
            {errors.start_time && (
              <p className="text-red-500 text-sm">
                {errors.start_time.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="end_time">End Time *</Label>
            <Input
              id="end_time"
              type="datetime-local"
              {...register("end_time")}
              className={errors.end_time ? "border-red-500" : ""}
            />
            {errors.end_time && (
              <p className="text-red-500 text-sm">{errors.end_time.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            id="image_url"
            type="url"
            {...register("image_url")}
            className={errors.image_url ? "border-red-500" : ""}
            placeholder="https://example.com/image.jpg"
          />
          {errors.image_url && (
            <p className="text-red-500 text-sm">{errors.image_url.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="event_link">Event Link</Label>
          <Input
            id="event_link"
            type="url"
            {...register("event_link")}
            className={errors.event_link ? "border-red-500" : ""}
            placeholder="https://example.com/event"
          />
          {errors.event_link && (
            <p className="text-red-500 text-sm">{errors.event_link.message}</p>
          )}
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Event"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
