"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Search, Check, X, FileText, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const RoleVerification = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('pending');

  // TODO: Fetch role requests from Supabase
  const roleRequests = [
    {
      id: 'RR001',
      userId: 'USR123',
      name: 'Dr. Michael Chen',
      email: 'michael.chen@email.com',
      currentRole: 'patient',
      requestedRole: 'doctor',
      specialty: 'Neurology',
      licenseNumber: 'MD-789012',
      hospital: 'Metro Medical Center',
      requestDate: '2024-01-18',
      status: 'pending',
      documents: ['license.pdf', 'degree.pdf']
    },
    {
      id: 'RR002',
      userId: 'USR124',
      name: 'City General Hospital',
      email: 'admin@citygeneral.com',
      currentRole: 'patient',
      requestedRole: 'hospital',
      registrationNumber: 'HOSP-456789',
      address: '123 Medical Center Dr, City, State',
      requestDate: '2024-01-17',
      status: 'pending',
      documents: ['registration.pdf', 'accreditation.pdf']
    },
    {
      id: 'RR003',
      userId: 'USR125',
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      currentRole: 'patient',
      requestedRole: 'doctor',
      specialty: 'Dermatology',
      licenseNumber: 'MD-345678',
      hospital: 'Sunshine Clinic',
      requestDate: '2024-01-16',
      status: 'approved',
      approvedDate: '2024-01-19',
      documents: ['license.pdf', 'certification.pdf']
    }
  ];

  const handleApprove = async (requestId: string, userId: string, requestedRole: string) => {
    // TODO: Update user role in Supabase and blockchain
    // 1. Update user role in database
    // const { error: dbError } = await supabase
    //   .from('users')
    //   .update({ role: requestedRole })
    //   .eq('id', userId);

    // 2. Update role request status
    // const { error: requestError } = await supabase
    //   .from('role_requests')
    //   .update({ 
    //     status: 'approved',
    //     approved_date: new Date().toISOString(),
    //     approved_by: admin.id
    //   })
    //   .eq('id', requestId);

    // 3. Trigger blockchain role update if needed
    // await updateRoleOnChain(userId, requestedRole);

    toast({
      title: "Role Approved",
      description: `User role has been updated to ${requestedRole}.`,
    });
  };

  const handleReject = async (requestId: string, reason = '') => {
    // TODO: Update role request status in Supabase
    // const { error } = await supabase
    //   .from('role_requests')
    //   .update({ 
    //     status: 'rejected',
    //     rejected_date: new Date().toISOString(),
    //     rejection_reason: reason,
    //     rejected_by: admin.id
    //   })
    //   .eq('id', requestId);

    toast({
      title: "Role Request Rejected",
      description: "The role request has been rejected.",
      variant: "destructive"
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { label: 'Pending Review', variant: 'destructive' },
      'approved': { label: 'Approved', variant: 'default' },
      'rejected': { label: 'Rejected', variant: 'secondary' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: 'secondary' };
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      'doctor': { label: 'Doctor', variant: 'default' },
      'hospital': { label: 'Hospital', variant: 'secondary' }
    };
    
    const config = roleConfig[role as keyof typeof roleConfig] || { label: role, variant: 'outline' };
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  const filteredRequests = roleRequests.filter(request => {
    const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || request.requestedRole === roleFilter;
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Role Verification Panel</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="hospital">Hospital</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredRequests.map(request => (
          <Card key={request.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold">{request.name}</h3>
                    {getRoleBadge(request.requestedRole)}
                    {getStatusBadge(request.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2 text-sm">
                      <p><strong>Email:</strong> {request.email}</p>
                      <p><strong>Current Role:</strong> {request.currentRole}</p>
                      <p><strong>Request Date:</strong> {request.requestDate}</p>
                      {request.approvedDate && (
                        <p><strong>Approved:</strong> {request.approvedDate}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      {request.requestedRole === 'doctor' && (
                        <>
                          <p><strong>Specialty:</strong> {request.specialty}</p>
                          <p><strong>License:</strong> {request.licenseNumber}</p>
                          <p><strong>Hospital:</strong> {request.hospital}</p>
                        </>
                      )}
                      {request.requestedRole === 'hospital' && (
                        <>
                          <p><strong>Registration:</strong> {request.registrationNumber}</p>
                          <p><strong>Address:</strong> {request.address}</p>
                        </>
                      )}
                      <div>
                        <strong>Documents:</strong>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {request.documents.map((doc, index) => (
                            <Badge key={index} variant="outline" className="flex items-center space-x-1">
                              <FileText className="h-3 w-3" />
                              <span>{doc}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {request.status === 'pending' && (
                  <div className="ml-6 space-y-2">
                    <Button 
                      onClick={() => handleApprove(request.id, request.userId, request.requestedRole)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handleReject(request.id)}
                      className="w-full"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Review Docs
                    </Button>
                  </div>
                )}
                
                {request.status !== 'pending' && (
                  <div className="ml-6">
                    <Button 
                      variant="outline" 
                      size="sm"
                    >
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No role requests found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RoleVerification;
