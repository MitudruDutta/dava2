import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, ExternalLink, Calendar } from "lucide-react";

const MedicalNFTsTile = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  // TODO: Fetch most recent medical NFT from Supabase and blockchain
  const latestNFT = {
    id: "NFT001",
    tokenId: "1001",
    title: "Cardiology Treatment Record",
    doctor: "Dr. Sarah Johnson",
    treatmentDate: "2024-01-10",
    diagnosis: "Hypertension management and lifestyle counseling",
    ipfsMetadata: "QmXxYzAbc123...",
    imageUrl: "/api/placeholder/100/60",
  };

  // TODO: Fetch NFT statistics from Supabase
  const nftStats = {
    total: 3,
    recent: 1,
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-2">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Award className="h-5 w-5 text-yellow-600" />
          <span>Medical NFTs</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <img
                src={latestNFT.imageUrl}
                alt={latestNFT.title}
                className="w-16 h-10 rounded object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-sm">{latestNFT.title}</h4>
                  <Badge className="bg-purple-600 text-xs">
                    #{latestNFT.tokenId}
                  </Badge>
                </div>

                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-3 w-3" />
                    <span>{latestNFT.treatmentDate}</span>
                  </div>
                  <p>
                    <strong>Doctor:</strong> {latestNFT.doctor}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    <strong>Diagnosis:</strong> {latestNFT.diagnosis}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500">
            {nftStats.total} treatment certificates minted
          </div>
        </div>

        <div className="pt-2 border-t space-y-2">
          <Button
            variant="outline"
            className="w-full"
            size="sm"
            onClick={() => setActiveTab("nfts")}
          >
            <Award className="h-3 w-3 mr-2" />
            View All NFTs
          </Button>
          <Button variant="outline" className="w-full" size="sm">
            <ExternalLink className="h-3 w-3 mr-2" />
            View on Blockchain
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalNFTsTile;
