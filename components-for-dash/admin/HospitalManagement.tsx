
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, Search, MapPin, Phone, Mail, Shield } from 'lucide-react';

const HospitalManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // TODO: Fetch hospitals and their doctors from Supabase
  const hospitals = [
    {
      id: 'HOSP001',
      name: 'City General Hospital',
      email: 'admin@citygeneral.com',
      phone: '+1 (555) 123-4567',
      address: '123 Medical Center Dr, City, State 12345',
      registrationNumber: 'HOSP-456789',
      status: 'verified',
      doctorsCount: 45,
      specialties: ['Cardiology', 'Neurology', 'Emergency Medicine'],
      assignedDoctors: [
        { id: 'DOC001', name: 'Dr. Sarah Johnson', specialty: 'Cardiology' },
        { id: 'DOC002', name: 'Dr. James Wilson', specialty: 'Orthopedics' },
        { id: 'DOC003', name: 'Dr. Lisa Chen', specialty: 'Emergency Medicine' }
      ]
    },
    {
      id: 'HOSP002',
      name: 'Metro Medical Center',
      email: 'info@metromedical.com',
      phone: '+1 (555) 987-6543',
      address: '456 Healthcare Ave, Metro City, State 67890',
      registrationNumber: 'HOSP-789012',
      status: 'verified',
      doctorsCount: 32,
      specialties: ['Neurology', 'Psychiatry', 'Radiology'],
      assignedDoctors: [
        { id: 'DOC004', name: 'Dr. Michael Chen', specialty: 'Neurology' },
        { id: 'DOC005', name: 'Dr. Amanda Rodriguez', specialty: 'Psychiatry' }
      ]
    },
    {
      id: 'HOSP003',
      name: 'Sunshine Clinic',
      email: 'contact@sunshineclinic.com',
      phone: '+1 (555) 555-0123',
      address: '789 Health St, Sunshine, State 13579',
      registrationNumber: 'HOSP-345678',
      status: 'pending',
      doctorsCount: 8,
      specialties: ['Dermatology', 'Family Medicine'],
      assignedDoctors: [
        { id: 'DOC006', name: 'Dr. Emily Rodriguez', specialty: 'Dermatology' }
      ]
    }
  ];

  const handleGrantAdminPrivileges = async (hospitalId) => {
    // TODO: Update hospital admin privileges in Supabase
    // const { error } = await supabase
    //   .from('hospitals')
    //   .update({ admin_privileges: true })
    //   .eq('id', hospitalId);

    console.log(`Granting admin privileges to hospital ${hospitalId}`);
  };

  const handleRevokeAdminPrivileges = async (hospitalId) => {
    // TODO: Revoke hospital admin privileges in Supabase
    // const { error } = await supabase
    //   .from('hospitals')
    //   .update({ admin_privileges: false })
    //   .eq('id', hospitalId);

    console.log(`Revoking admin privileges from hospital ${hospitalId}`);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'verified': { label: 'Verified', variant: 'default' },
      'pending': { label: 'Pending Verification', variant: 'destructive' },
      'suspended': { label: 'Suspended', variant: 'secondary' }
    };
    
    const config = statusConfig[status] || { label: status, variant: 'secondary' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Hospital & Doctor Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search hospitals by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {filteredHospitals.map(hospital => (
          <Card key={hospital.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-semibold">{hospital.name}</h3>
                    {getStatusBadge(hospital.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{hospital.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{hospital.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{hospital.address}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <p><strong>Registration:</strong> {hospital.registrationNumber}</p>
                      <p><strong>Total Doctors:</strong> {hospital.doctorsCount}</p>
                      <div>
                        <strong>Specialties:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {hospital.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="ml-6 space-y-2">
                  <Button 
                    onClick={() => handleGrantAdminPrivileges(hospital.id)}
                    size="sm"
                    className="w-full"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Grant Admin
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleRevokeAdminPrivileges(hospital.id)}
                    size="sm"
                    className="w-full"
                  >
                    Revoke Admin
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Assigned Doctors ({hospital.assignedDoctors.length})</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {hospital.assignedDoctors.map(doctor => (
                    <div key={doctor.id} className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{doctor.name}</p>
                          <p className="text-xs text-gray-600">{doctor.specialty}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {hospital.assignedDoctors.length === 0 && (
                  <p className="text-gray-500 text-sm">No doctors assigned to this hospital yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHospitals.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hospitals found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HospitalManagement;
