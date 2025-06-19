import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Star, MapPin, Calendar } from "lucide-react";
import BookAppointmentModal from "../BookAppointmentModal";

const FindDoctorsTile = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // TODO: Fetch suggested doctors from Supabase based on patient history or location
  const suggestedDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      hospital: "City General Hospital",
      rating: 4.8,
      image: "/api/placeholder/48/48",
      availability: "Available today",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      hospital: "Metro Medical Center",
      rating: 4.9,
      image: "/api/placeholder/48/48",
      availability: "Next available: Tomorrow",
    },
  ];

  const handleBookAppointment = (doctor: any) => {
    setSelectedDoctor(doctor);
    setIsBookingModalOpen(true);
  };

  return (
    <>
      <Card className="h-full hover:shadow-lg transition-all duration-300 border-2">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Search className="h-5 w-5 text-blue-600" />
            <span>Find Doctors</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {suggestedDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{doctor.name}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {doctor.specialty}
                  </Badge>
                  <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{doctor.rating}</span>
                    <span>•</span>
                    <span className="text-green-600">
                      {doctor.availability}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleBookAppointment(doctor)}
                  className="text-xs"
                >
                  <Calendar className="h-3 w-3 mr-1" />
                  Book
                </Button>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t">
            <Button
              variant="outline"
              className="w-full"
              size="sm"
              onClick={() => setActiveTab("search")}
            >
              <Search className="h-4 w-4 mr-2" />
              View All Doctors
            </Button>
          </div>
        </CardContent>
      </Card>

      <BookAppointmentModal
        doctor={selectedDoctor}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
};

export default FindDoctorsTile;
