"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, User, FileText, Search } from 'lucide-react';

const AppointmentQueue = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // TODO: Fetch appointments from Supabase
  const appointments = [
    {
      id: 'APT001',
      bookingId: 'BK-2024-001',
      patient: 'John Doe',
      patientAge: 45,
      date: '2024-01-20',
      time: '10:00 AM',
      status: 'booked',
      reason: 'Regular checkup',
      symptoms: 'Chest discomfort, shortness of breath',
      lastVisit: '2023-12-15'
    },
    {
      id: 'APT002',
      bookingId: 'BK-2024-002',
      patient: 'Jane Smith',
      patientAge: 32,
      date: '2024-01-20',
      time: '11:00 AM',
      status: 'booked',
      reason: 'Follow-up consultation',
      symptoms: 'Palpitations, anxiety',
      lastVisit: '2024-01-05'
    },
    {
      id: 'APT003',
      bookingId: 'BK-2024-003',
      patient: 'Michael Johnson',
      patientAge: 58,
      date: '2024-01-20',
      time: '2:00 PM',
      status: 'awaiting_diagnosis',
      reason: 'Chest pain evaluation',
      symptoms: 'Severe chest pain, radiating to left arm',
      lastVisit: 'First visit'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'booked': { label: 'Scheduled', variant: 'secondary' },
      'awaiting_diagnosis': { label: 'Needs Diagnosis', variant: 'destructive' },
      'completed': { label: 'Completed', variant: 'outline' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: 'secondary' };
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  const handleViewRecords = async (patientId: string, bookingId: string) => {
    // TODO: Fetch patient records from Supabase and IPFS
    // const { data: records } = await supabase
    //   .from('medical_records')
    //   .select('*')
    //   .eq('patient_id', patientId);
    
    console.log(`Viewing records for patient ${patientId}, booking ${bookingId}`);
  };

  const handleStartConsultation = async (appointmentId: string) => {
    // TODO: Update appointment status in Supabase
    // const { error } = await supabase
    //   .from('appointments')
    //   .update({ status: 'in_progress' })
    //   .eq('id', appointmentId);
    
    console.log(`Starting consultation for appointment ${appointmentId}`);
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    const matchesDate = dateFilter === 'all' || appointment.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-6">

      <div className="space-y-4">
        {filteredAppointments.map(appointment => (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold">{appointment.patient}</h3>
                    <Badge variant="outline">Age {appointment.patientAge}</Badge>
                    {getStatusBadge(appointment.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>Booking ID: {appointment.bookingId}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <p><strong>Reason:</strong> {appointment.reason}</p>
                      <p><strong>Symptoms:</strong> {appointment.symptoms}</p>
                      <p><strong>Last Visit:</strong> {appointment.lastVisit}</p>
                    </div>
                  </div>
                </div>
                
                <div className="ml-6 space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewRecords(appointment.patient, appointment.bookingId)}
                    className="w-full"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Records
                  </Button>
                  
                  {appointment.status === 'booked' && (
                    <Button 
                      size="sm"
                      onClick={() => handleStartConsultation(appointment.id)}
                      className="w-full"
                    >
                      Start Consultation
                    </Button>
                  )}
                  
                  {appointment.status === 'awaiting_diagnosis' && (
                    <Button 
                      size="sm"
                      variant="destructive"
                      className="w-full"
                    >
                      Submit Diagnosis
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No appointments found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AppointmentQueue;
