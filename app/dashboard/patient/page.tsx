"use client";
import React, { useState } from "react";
import {
  Calendar,
  FileText,
  User,
  Search,
  CreditCard,
  Award,
  Link,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatientProfile from "../../../components-for-dash/patient/PatientProfile";
import DoctorSearch from "../../../components-for-dash/patient/DoctorSearch";
import { useRouter, usePathname } from "next/navigation";

const PatientDashboard = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Determine the active tab from the path
  let activeTab = "profile";
  if (pathname.endsWith("/appointment")) activeTab = "appointments";
  else if (pathname.endsWith("/records")) activeTab = "records";
  else if (pathname.endsWith("/payments")) activeTab = "payments";
  else if (pathname.endsWith("/nfts")) activeTab = "nfts";
  // Add more if you want to support other tabs as routes

  // Handle tab change
  const handleTabChange = (value: string) => {
    if (value === "appointments") {
      router.push("/dashboard/patient/appointment");
    } else if (value === "records") {
      router.push("/dashboard/patient/records");
    } else if (value === "payments") {
      router.push("/dashboard/patient/payments");
    } else if (value === "nfts") {
      router.push("/dashboard/patient/nfts");
    } else {
      router.push("/dashboard/patient");
    }
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Patient Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {patientData.name}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">
                  {patientData.appointments} Appointments
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>Find Doctors</span>
          </TabsTrigger>
          <TabsTrigger
            value="appointments"
            className="flex items-center space-x-2"
          >
            <Calendar className="h-4 w-4" />
            <span>Appointments</span>
          </TabsTrigger>
          <TabsTrigger value="records" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Records</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center space-x-2">
            <CreditCard className="h-4 w-4" />
            <span>Payments</span>
          </TabsTrigger>
          <TabsTrigger value="nfts" className="flex items-center space-x-2">
            <Award className="h-4 w-4" />
            <span>Medical NFTs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <PatientProfile setActiveTab={() => {}} />
        </TabsContent>

        <TabsContent value="search">
          <DoctorSearch />
        </TabsContent>

        <TabsContent value="appointments">
          {/* handled by /appointment */}
        </TabsContent>

        <TabsContent value="records">{/* handled by /records */}</TabsContent>

        <TabsContent value="payments">{/* handled by /payments */}</TabsContent>

        <TabsContent value="nfts">{/* handled by /nfts */}</TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDashboard;
