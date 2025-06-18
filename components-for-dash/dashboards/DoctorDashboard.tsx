
import React, { useState } from 'react';
import { User, Calendar, FileText, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DoctorProfile from '../doctor/DoctorProfile';
import AppointmentQueue from '../doctor/AppointmentQueue';
import DiagnosisSubmission from '../doctor/DiagnosisSubmission';
import TreatmentHistory from '../doctor/TreatmentHistory';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // TODO: Fetch doctor data from Supabase
  const doctorData = {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    hospital: "City General Hospital",
    pendingAppointments: 8,
    completedToday: 5,
    awaitingDiagnosis: 3
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {doctorData.name}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">{doctorData.pendingAppointments} Pending</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">{doctorData.awaitingDiagnosis} Awaiting Diagnosis</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="queue" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Appointment Queue</span>
          </TabsTrigger>
          <TabsTrigger value="diagnosis" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Submit Diagnosis</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center space-x-2">
            <History className="h-4 w-4" />
            <span>Treatment History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <DoctorProfile />
        </TabsContent>

        <TabsContent value="queue">
          <AppointmentQueue />
        </TabsContent>

        <TabsContent value="diagnosis">
          <DiagnosisSubmission />
        </TabsContent>

        <TabsContent value="history">
          <TreatmentHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorDashboard;
