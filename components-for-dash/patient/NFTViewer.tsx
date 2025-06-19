"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, ExternalLink, Download, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const NFTViewer = () => {
  // TODO: Fetch medical NFTs from Supabase and blockchain
  const medicalNFTs = [
    {
      id: 'NFT001',
      tokenId: '1001',
      bookingId: 'BK-2024-001',
      title: 'Cardiology Treatment Record',
      doctor: 'Dr. Sarah Johnson',
      hospital: 'City General Hospital',
      treatmentDate: '2024-01-10',
      mintDate: '2024-01-12',
      diagnosis: 'Hypertension management and lifestyle counseling',
      transactionHash: '0x9f8e7d6c5b4a3928171615...',
      ipfsMetadata: 'QmXxYzAbc123...',
      imageUrl: '/api/placeholder/300/200'
    },
    {
      id: 'NFT002',
      tokenId: '1002',
      bookingId: 'BK-2023-045',
      title: 'Orthopedic Surgery Record',
      doctor: 'Dr. James Wilson',
      hospital: 'Sports Medicine Center',
      treatmentDate: '2023-12-15',
      mintDate: '2023-12-18',
      diagnosis: 'Successful ACL reconstruction surgery',
      transactionHash: '0x8e7d6c5b4a3928171615...',
      ipfsMetadata: 'QmYyZBcd456...',
      imageUrl: '/api/placeholder/300/200'
    },
    {
      id: 'NFT003',
      tokenId: '1003',
      bookingId: 'BK-2023-032',
      title: 'Dermatology Treatment Record',
      doctor: 'Dr. Emily Rodriguez',
      hospital: 'Sunshine Clinic',
      treatmentDate: '2023-11-20',
      mintDate: '2023-11-22',
      diagnosis: 'Successful treatment of chronic eczema',
      transactionHash: '0x7d6c5b4a3928171615...',
      ipfsMetadata: 'QmZzXDef789...',
      imageUrl: '/api/placeholder/300/200'
    }
  ];

  const viewOnBlockchain = (transactionHash: string) => {
    // TODO: Open blockchain explorer
    toast({
      title: "Opening Blockchain Explorer",
      description: "Viewing NFT transaction on blockchain...",
    });
  };

  const viewMetadata = (ipfsHash: string) => {
    // TODO: Open IPFS metadata
    toast({
      title: "Opening IPFS Metadata",
      description: "Viewing NFT metadata from IPFS...",
    });
  };

  const downloadCertificate = (nft: any) => {
    // TODO: Generate and download PDF certificate
    toast({
      title: "Generating Certificate",
      description: "Your medical treatment certificate is being generated...",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Medical Treatment NFTs</span>
          </CardTitle>
          <p className="text-gray-600">
            Your completed medical treatments as verified blockchain certificates
          </p>
        </CardHeader>
        <CardContent>
          {medicalNFTs.length === 0 ? (
            <div className="text-center py-12">
              <Award className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Medical NFTs Yet</h3>
              <p className="text-gray-600">
                Complete your medical treatments to receive verified NFT certificates
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {medicalNFTs.map(nft => (
                <Card key={nft.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={nft.imageUrl} 
                      alt={nft.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-purple-600">
                      #{nft.tokenId}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{nft.title}</h3>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Treatment: {nft.treatmentDate}</span>
                      </div>
                      <p><strong>Doctor:</strong> {nft.doctor}</p>
                      <p><strong>Hospital:</strong> {nft.hospital}</p>
                      <p><strong>Booking ID:</strong> {nft.bookingId}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <p className="text-sm"><strong>Diagnosis:</strong></p>
                      <p className="text-sm text-gray-700">{nft.diagnosis}</p>
                    </div>
                    
                    <div className="text-xs text-gray-500 mb-4">
                      <p><strong>Minted:</strong> {nft.mintDate}</p>
                      <p><strong>Transaction:</strong> {nft.transactionHash.substring(0, 20)}...</p>
                      <p><strong>Metadata:</strong> {nft.ipfsMetadata.substring(0, 15)}...</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => viewOnBlockchain(nft.transactionHash)}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View on Blockchain
                      </Button>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => viewMetadata(nft.ipfsMetadata)}
                        >
                          Metadata
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => downloadCertificate(nft)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NFTViewer;
