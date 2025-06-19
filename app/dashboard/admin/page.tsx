"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Shield, Users, Calendar, CreditCard, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoleVerification from "../../../components-for-dash/admin/RoleVerification";
import AppointmentManagement from "../../../components-for-dash/admin/AppointmentManagement";
import PaymentTracking from "../../../components-for-dash/admin/PaymentTracking";
import AdminProfileBento from "../../../components-for-dash/admin/AdminProfileBento";

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Determine the active tab from the path
  let activeTab = "profile";
  if (pathname.endsWith("/roles")) activeTab = "roles";
  else if (pathname.endsWith("/appointments")) activeTab = "appointments";
  else if (pathname.endsWith("/payments")) activeTab = "payments";

  // Handle tab change
  const handleTabChange = (value: string) => {
    if (value === "roles") {
      router.push("/dashboard/admin/roles");
    } else if (value === "appointments") {
      router.push("/dashboard/admin/appointments");
    } else if (value === "payments") {
      router.push("/dashboard/admin/payments");
    } else {
      router.push("/dashboard/admin");
    }
  };

  // TODO: Fetch admin statistics from Supabase
  const adminStats = {
    pendingVerifications: 12,
    totalDoctors: 145,
    totalHospitals: 23,
    pendingPayments: 8,
    totalTransactions: 1247,
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">System management and oversight</p>
        </div>
        <div className="flex items-center space-x-4">
          <Card className="bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium">
                  {adminStats.pendingVerifications} Pending
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">
                  {adminStats.totalDoctors} Doctors
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Role Verification</span>
          </TabsTrigger>
          <TabsTrigger
            value="appointments"
            className="flex items-center space-x-2"
          >
            <Calendar className="h-4 w-4" />
            <span>Appointments</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center space-x-2">
            <CreditCard className="h-4 w-4" />
            <span>Payments</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <AdminProfileBento />
        </TabsContent>
        <TabsContent value="roles">{/* handled by /roles */}</TabsContent>
        <TabsContent value="appointments">
          {/* handled by /appointments */}
        </TabsContent>
        <TabsContent value="payments">{/* handled by /payments */}</TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
