"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfile } from "@/lib/database/types";
import {
  profileFormSchema,
  ProfileFormValues,
} from "@/lib/validations/profile-validations";
import { Form } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { updateProfile } from "@/lib/actions/update-profile";
import { useRouter } from "next/navigation";

interface EditProfileFormProps {
  profile: UserProfile;
  username: string;
}

export default function EditProfileForm({
  profile,
  username,
}: EditProfileFormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      display_name: profile.display_name || "",
      bio: profile.bio || "",
      website_url: profile.website_url || "",
      twitter_url: profile.twitter_url || "",
      instagram_url: profile.instagram_url || "",
      facebook_url: profile.facebook_url || "",
    },
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const result = await updateProfile(profile.id, data);

      if (result.success) {
        router.push(`/p/${username}`);
      } else {
        alert(result.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="display_name">Display Name</Label>
          <Input
            id="display_name"
            {...register("display_name")}
            className={errors.display_name ? "border-red-500" : ""}
          />
          {errors.display_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.display_name.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            rows={4}
            {...register("bio")}
            className={errors.bio ? "border-red-500" : ""}
          />
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Social Links</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="website_url">Website URL</Label>
              <Input
                id="website_url"
                type="url"
                {...register("website_url")}
                className={errors.website_url ? "border-red-500" : ""}
              />
              {errors.website_url && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.website_url.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="twitter_url">Twitter URL</Label>
              <Input
                id="twitter_url"
                type="url"
                {...register("twitter_url")}
                className={errors.twitter_url ? "border-red-500" : ""}
              />
              {errors.twitter_url && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.twitter_url.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="instagram_url">Instagram URL</Label>
              <Input
                id="instagram_url"
                type="url"
                {...register("instagram_url")}
                className={errors.instagram_url ? "border-red-500" : ""}
              />
              {errors.instagram_url && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.instagram_url.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="facebook_url">Facebook URL</Label>
              <Input
                id="facebook_url"
                type="url"
                {...register("facebook_url")}
                className={errors.facebook_url ? "border-red-500" : ""}
              />
              {errors.facebook_url && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.facebook_url.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/p/${username}`)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
