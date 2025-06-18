
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

const PatientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-15',
    address: '123 Main St, City, State 12345',
    emergencyContact: 'Jane Doe - +1 (555) 987-6543',
    role: 'patient'
  });

  const handleSave = async () => {
    // TODO: Update profile data in Supabase
    // const { data, error } = await supabase
    //   .from('users')
    //   .update(profileData)
    //   .eq('id', user.id)
    
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleRoleUpgrade = async () => {
    // TODO: Submit role upgrade request to Supabase
    // const { error } = await supabase
    //   .from('role_requests')
    //   .insert({ user_id: user.id, requested_role: 'doctor', status: 'pending' })
    
    toast({
      title: "Role Upgrade Requested",
      description: "Your request to upgrade to doctor role has been submitted for review.",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Personal Information
            <Button 
              variant={isEditing ? "default" : "outline"} 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name"
                value={profileData.name} 
                disabled={!isEditing}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email"
                value={profileData.email} 
                disabled={!isEditing}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone"
                value={profileData.phone} 
                disabled={!isEditing}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input 
                id="dob"
                type="date"
                value={profileData.dateOfBirth} 
                disabled={!isEditing}
                onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input 
              id="address"
              value={profileData.address} 
              disabled={!isEditing}
              onChange={(e) => setProfileData({...profileData, address: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="emergency">Emergency Contact</Label>
            <Input 
              id="emergency"
              value={profileData.emergencyContact} 
              disabled={!isEditing}
              onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Current Role:</span>
            <Badge variant="secondary">{profileData.role}</Badge>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Role Upgrade</h4>
            <p className="text-sm text-gray-600 mb-4">
              Request to upgrade your account to a doctor or hospital role to provide medical services.
            </p>
            <Button onClick={handleRoleUpgrade} className="w-full">
              Request Doctor Role Upgrade
            </Button>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Account Statistics</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Total Appointments:</span>
                <p className="font-semibold">12</p>
              </div>
              <div>
                <span className="text-gray-600">Medical Records:</span>
                <p className="font-semibold">8</p>
              </div>
              <div>
                <span className="text-gray-600">Medical NFTs:</span>
                <p className="font-semibold">3</p>
              </div>
              <div>
                <span className="text-gray-600">Member Since:</span>
                <p className="font-semibold">Jan 2024</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientProfile;
