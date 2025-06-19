import React from "react";
import { Calendar, FileText, FolderOpen } from "lucide-react";
import DoctorAppointmentsTile from "../doctor/tiles/DoctorAppointmentsTile";
import DiagnosisSubmissionTile from "../doctor/tiles/DiagnosisSubmissionTile";
import MedicalRecordAccessTile from "../doctor/tiles/MedicalRecordAccessTile";

const DoctorDashboard = () => {
  // TODO: Fetch doctor data from Supabase
  const doctorData = {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    pendingAppointments: 8,
    completedToday: 5,
    awaitingDiagnosis: 3,
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[1fr]">
        {/* Appointments Tile - Spans 2 columns on large screens */}
        <div className="lg:col-span-2 h-full">
          <DoctorAppointmentsTile />
        </div>

        {/* Diagnosis Submission Tile */}
        <div className="h-full">
          <DiagnosisSubmissionTile />
        </div>

        {/* Medical Record Access Tile - Spans 2 columns on medium screens */}
        <div className="md:col-span-2 lg:col-span-1 h-full">
          <MedicalRecordAccessTile />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
