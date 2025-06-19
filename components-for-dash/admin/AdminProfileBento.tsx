import React from "react";
import { Shield, FileText, Award } from "lucide-react";
import RoleRequestsTile from "../admin/tiles/RoleRequestsTile";
import MintManageAppointmentsTile from "../admin/tiles/MintManageAppointmentsTile";
import NFTHistoryTile from "../admin/tiles/NFTHistoryTile";

const AdminDashboard = () => {
  // TODO: Fetch admin statistics from Supabase
  const adminStats = {
    pendingRoleRequests: 5,
    totalAppointments: 24,
    mintedNFTs: 18,
    completedAppointments: 15,
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Role Requests Tile */}
        <div>
          <RoleRequestsTile />
        </div>

        {/* Mint & Manage Appointments Tile - Spans 2 columns */}
        <div className="md:col-span-2 lg:col-span-2">
          <MintManageAppointmentsTile />
        </div>

        {/* NFT History Tile - Spans full width on mobile, 1 column on larger screens */}
        <div className="md:col-span-2 lg:col-span-1">
          <NFTHistoryTile />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
