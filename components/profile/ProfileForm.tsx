// components/profile/ProfileForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";

interface ProfileFormProps {
  onCancel: () => void;
}

export const ProfileForm = ({ onCancel }: ProfileFormProps) => {
  const { profile, updateProfile } = useProfile();
  const [formData, setFormData] = useState({
    username: "",
    display_name: "",
    avatar_url: "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || "",
        display_name: profile.display_name || "",
        avatar_url: profile.avatar_url || "",
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const result = await updateProfile(formData);

    if (result.error) {
      setMessage({
        type: "error",
        text: "Error updating profile. Please try again.",
      });
    } else {
      setMessage({ type: "success", text: "Profile updated successfully!" });
      // Return to display view after a short delay
      setTimeout(() => onCancel(), 1500);
    }

    setSaving(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {message && (
          <div
            className={`p-3 rounded-md mb-4 ${
              message.type === "success"
                ? "bg-green-100 border border-green-400 text-green-700"
                : "bg-red-100 border border-red-400 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username *</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              minLength={3}
              maxLength={20}
            />
            <p className="text-sm text-muted-foreground">
              3-20 characters, letters, numbers, and underscores only
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="display_name">Display Name *</Label>
            <Input
              id="display_name"
              name="display_name"
              value={formData.display_name}
              onChange={handleInputChange}
              required
              minLength={2}
              maxLength={50}
            />
            <p className="text-sm text-muted-foreground">
              This is how others will see you
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar_url">Avatar URL</Label>
            <Input
              id="avatar_url"
              name="avatar_url"
              type="url"
              placeholder="https://example.com/avatar.jpg"
              value={formData.avatar_url}
              onChange={handleInputChange}
            />
            <p className="text-sm text-muted-foreground">
              Link to your profile picture
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
