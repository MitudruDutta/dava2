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
import { useAccount } from 'wagmi'


interface UserProfile {
  walletAddress?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  role: string;
}


export function AccountSettings({ user }: { user: User | null }) {
  const [activeTab, setActiveTab] = useState("profile");
  


  //wallet profile
  const account = useAccount()
  const walletAddress = account?.address || "";

  // Profile states
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState("Anonymous");
  const [bio, setBio] = useState("Hi There from V4");
  const [avatar, setAvatarUrl] = useState("/placeholder.svg");
  const [wallet, setWallet] = useState("");
  const [role, setRole] = useState<string>("patient");
  
  
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
        .select(`full_name, walletAddress, bio, avatar_url, updated_at, role`)
        .eq("id", user.id)
        .single();
        
      if (error && status !== 406) {
        console.log(error);
        throw error;
      }
      
      if (data) {
        setFullname(data.full_name || "Anonymous");
        setWallet(data.walletAddress || "");
        setBio(data.bio || "Hi There from V4");
        setAvatarUrl(data.avatar_url || user?.user_metadata?.avatar_url || "/placeholder.svg");
        setRole(data.role || "patient");
      } else {
        // If no data, use Google avatar if available
        setAvatarUrl(user?.user_metadata?.avatar_url || "/placeholder.svg");
        setRole("patient");
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
      const payload = {
        id: user.id,
        walletAddress: profileData.walletAddress ?? wallet,
        full_name: profileData.full_name ?? fullname,
        avatar_url: profileData.avatar_url ?? user?.user_metadata?.avatar_url ?? avatar,
        bio: profileData.bio ?? bio,
        role: profileData.role ?? role,
        updated_at: new Date().toISOString(),
      };
      const { error } = await supabase.from("profiles").upsert([payload], { onConflict: 'id' });
      if (error) throw error;
      showMessage("Profile updated successfully!");
      // Optionally, refresh profile after update
      await getProfile();
    } catch (error: any) {
      showMessage(error.message || "Error updating profile!", true);
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const userData = {
    name: fullname,
    email: user?.email || "No email provided",
    avatar: user?.user_metadata?.avatar_url || avatar,
    joinDate: user?.created_at 
      ? new Date(user.created_at).toLocaleDateString()
      : "N/A",
    bio: bio,
    wallet: wallet,
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
              </div>
              <h2 className="text-xl font-semibold">{userData.name}</h2>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Member since {userData.joinDate}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {userData.bio}
              </p>
              {/* <p className="text-xs text-muted-foreground mt-1">
                Wallet: {userData.wallet || "Not set"}
              </p> */}
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
                    <Label htmlFor="wallet">Wallet Address</Label>
                    <Input
                      id="wallet"
                      type="text"
                      value={walletAddress}
                      disabled
                      className="opacity-50"
                    />
                    <Button
                      className="w-fit mt-2"
                      variant="secondary"
                      onClick={() => setWallet(walletAddress)}
                      disabled={walletAddress === wallet}
                    >
                      {walletAddress === wallet ? "Wallet Saved" : "Use This Wallet"}
                    </Button>
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

                  {/* Role dropdown */}
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <select
                      id="role"
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={role}
                      onChange={e => setRole(e.target.value)}
                    >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <Button
                    className="w-fit"
                    onClick={() => updateProfile({
                      full_name: fullname,
                      walletAddress: wallet,
                      bio,
                      avatar_url: user?.user_metadata?.avatar_url || avatar,
                      role,
                    })}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  );
}