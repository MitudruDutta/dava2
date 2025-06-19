import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import { useRouter } from "next/navigation";

const AppointmentsTile = ({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) => {
  const router = useRouter();
  // TODO: Fetch most recent appointment from Supabase
  const recentAppointment = {
    id: "APT001",
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    date: "2024-01-20",
    time: "10:00 AM",
    status: "booked",
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      booked: { label: "Booked", variant: "secondary" },
      awaiting_diagnosis: { label: "Awaiting", variant: "default" },
      payment_requested: { label: "Payment Required", variant: "destructive" },
      completed: { label: "Completed", variant: "outline" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      label: status,
      variant: "secondary",
    };
    return (
      <Badge variant={config.variant as any} className="text-xs">
        {config.label}
      </Badge>
    );
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-2">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Calendar className="h-5 w-5 text-green-600" />
          <span>Appointments</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-sm">
                {recentAppointment.doctor}
              </h4>
              {getStatusBadge(recentAppointment.status)}
            </div>

            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex items-center space-x-2">
                <User className="h-3 w-3" />
                <span>{recentAppointment.specialty}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-3 w-3" />
                <span>{recentAppointment.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-3 w-3" />
                <span>{recentAppointment.time}</span>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500">
            Next appointment in 2 days
          </div>
        </div>

        <div className="pt-2 border-t">
          <Button
            variant="outline"
            className="w-full"
            size="sm"
            onClick={() => router.push("?tab=appointments")}
          >
            View All Appointments
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentsTile;
