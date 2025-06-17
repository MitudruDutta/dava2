"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Bell, Shield, LogOut, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
// import Avatar from '@/app/account/avatar'


interface UserProfile {
  full_name: string;
  username: string | null;
  bio: string;
  avatar_url: string;
}

interface NotificationSettings {
  email_notifications: boolean;
  task_reminders: boolean;
  exam_alerts: boolean;
  study_suggestions: boolean;
}

export function AccountSettings({ user }: { user: User | null }) {
  const [activeTab, setActiveTab] = useState("profile");
  
  // Profile states
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState("Anonymous");
  const [username, setUsername] = useState<string | null>(null);
  const [bio, setBio] = useState("Hi There from V4");
  const [avatar, setAvatarUrl] = useState("/placeholder.svg");
  
  // Notification states
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email_notifications: true,
    task_reminders: true,
    exam_alerts: true,
    study_suggestions: false,
  });
  
  // Error and success states
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const supabase = createClient();
  const router = useRouter();

  const showMessage = (message: string, isError: boolean = false) => {
    if (isError) {
      setError(message);
      setSuccess(null);
    } else {
      setSuccess(message);
      setError(null);
    }
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 3000);
  };

  const getProfile = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, bio, avatar_url`)
        .eq("id", user.id)
        .single();
        
      if (error && status !== 406) {
        console.log(error);
        throw error;
      }
      
      if (data) {
        setFullname(data.full_name || "Anonymous");
        setUsername(data.username);
        setBio(data.bio || "Hi There from V4");
        setAvatarUrl(data.avatar_url || "/placeholder.svg");
      }
    } catch (error) {
      showMessage("Error loading user data!", true);
      console.error("Profile fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: profileData.full_name || fullname,
        username: profileData.username || username,
        bio: profileData.bio || bio,
        avatar_url: profileData.avatar_url || avatar,
        updated_at: new Date().toISOString(),
      });
      
      if (error) throw error;
      showMessage("Profile updated successfully!");
    } catch (error: any) {
      showMessage(error.message || "Error updating profile!", true);
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user?.id) return;

    try {
      setLoading(true);
      
      // Upload file to Supabase storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      setAvatarUrl(publicUrl);
      await updateProfile({ avatar_url: publicUrl });
      
    } catch (error: any) {
      showMessage(error.message || "Error uploading avatar!", true);
      console.error("Avatar upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const userData = {
    name: fullname,
    email: user?.email || "No email provided",
    avatar: avatar,
    joinDate: user?.created_at 
      ? new Date(user.created_at).toLocaleDateString()
      : "N/A",
    bio: bio,
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and settings
        </p>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
        >
          {error}
        </motion.div>
      )}
      
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
        >
          {success}
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-64 flex-shrink-0"
        >
          <div className="glassmorphism rounded-2xl p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={userData.avatar || "/placeholder.svg"}
                    
                  />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <label className="absolute -bottom-2 -right-2 cursor-pointer">
                  <div className="bg-primary text-primary-foreground rounded-full p-1.5 hover:bg-primary/90 transition-colors">
                    <Upload className="h-3 w-3" />
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                  />
                </label>

                {/* Only Works for Non SSO users */}

                {/* <Avatar
        uid={user?.id ?? null}
        url={userData.avatar}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ avatar_url: url })
        }}
      /> */}
              </div>
              <h2 className="text-xl font-semibold">{userData.name}</h2>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Member since {userData.joinDate}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {userData.bio}
              </p>
            </div>

            <Separator className="my-4" />

            <div className="space-y-1">
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("profile")}
              >
                <Users className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button
                variant={activeTab === "notifications" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              {/* <ConnectButton /> */}
            </div>

            <Separator className="my-4" />

            <Button onClick={logout} variant="outline" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1"
        >
          <div className="glassmorphism rounded-2xl p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <h2 className="text-xl font-semibold">Profile Information</h2>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={username || ""}
                      onChange={(e) => setUsername(e.target.value || null)}
                      placeholder="Enter a unique username"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      disabled
                      className="opacity-50"
                    />
                    <p className="text-xs text-muted-foreground">
                      Email cannot be changed here. Please contact support.
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <Button
                    className="w-fit"
                    onClick={() => updateProfile({
                      full_name: fullname,
                      username,
                      bio,
                      avatar_url: avatar,
                    })}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </TabsContent>

              {/* <TabsContent value="notifications" className="space-y-6">
                <h2 className="text-xl font-semibold">Notification Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email_notifications}
                      onCheckedChange={(checked) =>
                        setNotifications(prev => ({ ...prev, email_notifications: checked }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="task-reminders">Task Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Get reminders for upcoming tasks
                      </p>
                    </div>
                    <Switch
                      id="task-reminders"
                      checked={notifications.task_reminders}
                      onCheckedChange={(checked) =>
                        setNotifications(prev => ({ ...prev, task_reminders: checked }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="exam-alerts">Exam Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive alerts for upcoming exams
                      </p>
                    </div>
                    <Switch
                      id="exam-alerts"
                      checked={notifications.exam_alerts}
                      onCheckedChange={(checked) =>
                        setNotifications(prev => ({ ...prev, exam_alerts: checked }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="study-suggestions">Study Suggestions</Label>
                      <p className="text-sm text-muted-foreground">
                        Get AI-powered study suggestions
                      </p>
                    </div>
                    <Switch
                      id="study-suggestions"
                      checked={notifications.study_suggestions}
                      onCheckedChange={(checked) =>
                        setNotifications(prev => ({ ...prev, study_suggestions: checked }))
                      }
                    />
                  </div>

                  <Button className="w-fit" onClick={saveNotificationSettings}>
                    Save Preferences
                  </Button>
                </div>
              </TabsContent> */}
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  );
}