
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Clock } from 'lucide-react';

const DoctorAppointmentsTile = () => {
  // TODO: Fetch appointments from Supabase
  const appointments = [
    {
      id: 'APT001',
      patientName: 'John Smith',
      bookingId: 'BK-2024-001',
      date: '2024-01-20',
      status: 'confirmed'
    },
    {
      id: 'APT002',
      patientName: 'Sarah Wilson',
      bookingId: 'BK-2024-002',
      date: '2024-01-20',
      status: 'pending'
    },
    {
      id: 'APT003',
      patientName: 'Mike Johnson',
      bookingId: 'BK-2024-003',
      date: '2024-01-21',
      status: 'completed'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'confirmed': { label: 'Confirmed', variant: 'default' as const },
      'pending': { label: 'Pending', variant: 'secondary' as const },
      'completed': { label: 'Completed', variant: 'outline' as const },
      'cancelled': { label: 'Cancelled', variant: 'destructive' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: 'secondary' as const };
    return <Badge variant={config.variant} className="text-xs">{config.label}</Badge>;
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-2">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Calendar className="h-5 w-5 text-blue-600" />
          <span>Appointments</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {appointments.slice(0, 3).map((appointment) => (
            <div key={appointment.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-sm">{appointment.patientName}</h4>
                {getStatusBadge(appointment.status)}
              </div>
              
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <User className="h-3 w-3" />
                  <span>ID: {appointment.bookingId}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-3 w-3" />
                  <span>{appointment.date}</span>
                </div>
              </div>
            </div>
          ))}
          
          <div className="text-center text-xs text-gray-500">
            {appointments.length > 3 && `+${appointments.length - 3} more appointments`}
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <Button variant="outline" className="w-full" size="sm">
            View All Appointments
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorAppointmentsTile;
