import React from "react";
import { Calendar, FileText, CreditCard, Award, Search } from "lucide-react";
import FindDoctorsTile from "../patient/tiles/FindDoctorsTile";
import AppointmentsTile from "../patient/tiles/AppointmentsTile";
import RecordsTile from "../patient/tiles/RecordsTile";
import PaymentsTile from "../patient/tiles/PaymentsTile";
import MedicalNFTsTile from "../patient/tiles/MedicalNFTsTile";

const PatientProfile = ({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) => {
  // TODO: Fetch patient data from Supabase
  const patientData = {
    name: "John Doe",
    email: "john.doe@email.com",
    appointments: 3,
    records: 5,
    pendingPayments: 2,
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[1fr]">
        {/* Row 1 */}
        <div className="lg:col-span-2 h-full">
          <FindDoctorsTile setActiveTab={setActiveTab} />
        </div>
        <div className="h-full">
          <AppointmentsTile setActiveTab={setActiveTab} />
        </div>
        {/* Row 2 */}
        <div className="h-full">
          <RecordsTile setActiveTab={setActiveTab} />
        </div>
        <div className="h-full">
          <PaymentsTile setActiveTab={setActiveTab} />
        </div>
        <div className="h-full">
          <MedicalNFTsTile setActiveTab={setActiveTab} />
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
