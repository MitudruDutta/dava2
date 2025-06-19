"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { History, Search, FileText, ExternalLink, Calendar } from 'lucide-react';

const TreatmentHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // TODO: Fetch treatment history from Supabase
  const treatmentHistory = [
    {
      id: 'TRT001',
      bookingId: 'BK-2024-001',
      patient: 'John Doe',
      date: '2024-01-15',
      diagnosis: 'Hypertension',
      treatment: 'Lifestyle counseling and medication adjustment',
      status: 'completed',
      nftMinted: true,
      followUpRequired: false,
      severity: 'moderate'
    },
    {
      id: 'TRT002',
      bookingId: 'BK-2024-002',
      patient: 'Jane Smith',
      date: '2024-01-12',
      diagnosis: 'Anxiety-related palpitations',
      treatment: 'Stress management therapy and monitoring',
      status: 'completed',
      nftMinted: true,
      followUpRequired: true,
      severity: 'mild'
    },
    {
      id: 'TRT003',
      bookingId: 'BK-2023-089',
      patient: 'Robert Wilson',
      date: '2023-12-20',
      diagnosis: 'Atrial fibrillation',
      treatment: 'Medication therapy and lifestyle modifications',
      status: 'completed',
      nftMinted: true,
      followUpRequired: true,
      severity: 'severe'
    },
    {
      id: 'TRT004',
      bookingId: 'BK-2023-076',
      patient: 'Mary Johnson',
      date: '2023-12-10',
      diagnosis: 'Chest pain - non-cardiac',
      treatment: 'Reassurance and follow-up care',
      status: 'completed',
      nftMinted: false,
      followUpRequired: false,
      severity: 'mild'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'completed': { label: 'Completed', variant: 'default' },
      'ongoing': { label: 'Ongoing', variant: 'secondary' },
      'follow_up': { label: 'Follow-up Required', variant: 'destructive' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: 'secondary' };
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  const getSeverityBadge = (severity: string) => {
    const severityConfig = {
      'mild': { label: 'Mild', variant: 'outline' },
      'moderate': { label: 'Moderate', variant: 'secondary' },
      'severe': { label: 'Severe', variant: 'destructive' }
    };
    
    const config = severityConfig[severity as keyof typeof severityConfig] || { label: severity, variant: 'outline' };
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  const handleViewReport = (treatmentId: string) => {
    // TODO: Open treatment report from IPFS
    console.log(`Viewing report for treatment ${treatmentId}`);
  };

  const handleViewNFT = (bookingId: string) => {
    // TODO: View NFT on blockchain explorer
    console.log(`Viewing NFT for booking ${bookingId}`);
  };

  const filteredHistory = treatmentHistory.filter(treatment => {
    const matchesSearch = treatment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || treatment.status === statusFilter;
    const matchesDate = dateFilter === 'all' || treatment.date.includes(dateFilter);
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="h-5 w-5" />
            <span>Treatment History</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search patients or diagnosis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="follow_up">Follow-up Required</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="2024-01">January 2024</SelectItem>
                  <SelectItem value="2023-12">December 2023</SelectItem>
                  <SelectItem value="2023-11">November 2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredHistory.map(treatment => (
          <Card key={treatment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold">{treatment.patient}</h3>
                    {getStatusBadge(treatment.status)}
                    {getSeverityBadge(treatment.severity)}
                    {treatment.nftMinted && (
                      <Badge variant="outline" className="bg-purple-50 text-purple-700">
                        NFT Minted
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Treatment Date: {treatment.date}</span>
                      </div>
                      <p><strong>Booking ID:</strong> {treatment.bookingId}</p>
                      <p><strong>Diagnosis:</strong> {treatment.diagnosis}</p>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <p><strong>Treatment:</strong> {treatment.treatment}</p>
                      {treatment.followUpRequired && (
                        <p className="text-orange-600"><strong>Follow-up Required</strong></p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="ml-6 space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewReport(treatment.id)}
                    className="w-full"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Report
                  </Button>
                  
                  {treatment.nftMinted && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewNFT(treatment.bookingId)}
                      className="w-full"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View NFT
                    </Button>
                  )}
                  
                  {treatment.followUpRequired && (
                    <Button 
                      size="sm"
                      variant="secondary"
                      className="w-full"
                    >
                      Schedule Follow-up
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <History className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No treatment history found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TreatmentHistory;
