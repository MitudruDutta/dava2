import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Clock } from "lucide-react";

const RecordsTile = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  // TODO: Fetch most recent medical record from Supabase
  const latestRecord = {
    id: 1,
    title: "Blood Test Results",
    fileType: "PDF",
    uploadDate: "2024-01-15",
    size: "2.4 MB",
  };

  const getFileTypeColor = (fileType: string) => {
    const colors = {
      PDF: "bg-red-100 text-red-800",
      DICOM: "bg-blue-100 text-blue-800",
      JPG: "bg-green-100 text-green-800",
      PNG: "bg-green-100 text-green-800",
    };
    return colors[fileType as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-2">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <FileText className="h-5 w-5 text-purple-600" />
          <span>Records</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-sm">{latestRecord.title}</h4>
              <Badge
                className={`text-xs ${getFileTypeColor(latestRecord.fileType)}`}
              >
                {latestRecord.fileType}
              </Badge>
            </div>

            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <Clock className="h-3 w-3" />
              <span>Uploaded: {latestRecord.uploadDate}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Size: {latestRecord.size}
            </div>
          </div>

          <div className="text-center text-xs text-gray-500">
            5 total records stored on IPFS
          </div>
        </div>

        <div className="pt-2 border-t space-y-2">
          <Button
            variant="outline"
            className="w-full"
            size="sm"
            onClick={() => setActiveTab("records")}
          >
            <FileText className="h-3 w-3 mr-2" />
            View All Records
          </Button>
          <Button variant="default" className="w-full" size="sm">
            <Upload className="h-3 w-3 mr-2" />
            Upload New
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecordsTile;
