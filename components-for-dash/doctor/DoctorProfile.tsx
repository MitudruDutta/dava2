
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const DoctorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@hospital.com',
    phone: '+1 (555) 123-4567',
    specialty: 'Cardiology',
    hospital: 'City General Hospital',
    licenseNumber: 'MD-123456',
    yearsExperience: '15',
    education: 'Harvard Medical School, MD',
    specializations: ['Interventional Cardiology', 'Heart Failure', 'Preventive Cardiology'],
    bio: 'Board-certified cardiologist with over 15 years of experience in treating heart conditions.',
    role: 'doctor',
    verificationStatus: 'verified'
  });

  const handleSave = async () => {
    // TODO: Update doctor profile in Supabase
    // const { data, error } = await supabase
    //   .from('doctors')
    //   .update(profileData)
    //   .eq('id', user.id)
    
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Professional Information
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
              <Label htmlFor="license">License Number</Label>
              <Input 
                id="license"
                value={profileData.licenseNumber} 
                disabled={!isEditing}
                onChange={(e) => setProfileData({...profileData, licenseNumber: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="specialty">Primary Specialty</Label>
              <Input 
                id="specialty"
                value={profileData.specialty} 
                disabled={!isEditing}
                onChange={(e) => setProfileData({...profileData, specialty: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input 
                id="experience"
                value={profileData.yearsExperience} 
                disabled={!isEditing}
                onChange={(e) => setProfileData({...profileData, yearsExperience: e.target.value})}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="hospital">Hospital/Clinic</Label>
            <Input 
              id="hospital"
              value={profileData.hospital} 
              disabled={!isEditing}
              onChange={(e) => setProfileData({...profileData, hospital: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="education">Education</Label>
            <Input 
              id="education"
              value={profileData.education} 
              disabled={!isEditing}
              onChange={(e) => setProfileData({...profileData, education: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="bio">Professional Bio</Label>
            <Textarea 
              id="bio"
              value={profileData.bio} 
              disabled={!isEditing}
              onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Professional Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Verification Status:</span>
            <Badge variant={profileData.verificationStatus === 'verified' ? 'default' : 'secondary'}>
              {profileData.verificationStatus}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Current Role:</span>
            <Badge variant="secondary">{profileData.role}</Badge>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Specializations</h4>
            <div className="flex flex-wrap gap-2">
              {profileData.specializations.map((spec, index) => (
                <Badge key={index} variant="outline">{spec}</Badge>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Practice Statistics</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Total Patients Treated:</span>
                <p className="font-semibold">1,247</p>
              </div>
              <div>
                <span className="text-gray-600">Appointments This Month:</span>
                <p className="font-semibold">89</p>
              </div>
              <div>
                <span className="text-gray-600">Average Rating:</span>
                <p className="font-semibold">4.8/5.0</p>
              </div>
              <div>
                <span className="text-gray-600">Years of Practice:</span>
                <p className="font-semibold">{profileData.yearsExperience}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Hospital Information</h4>
            <div className="text-sm space-y-1">
              <p><strong>Hospital:</strong> {profileData.hospital}</p>
              <p><strong>Department:</strong> Cardiology</p>
              <p><strong>Status:</strong> Active Staff</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorProfile;
