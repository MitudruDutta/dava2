"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Upload, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const DiagnosisSubmission = () => {
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [diagnosisData, setDiagnosisData] = useState({
    symptoms: '',
    diagnosis: '',
    treatmentPlan: '',
    medications: '',
    followUpInstructions: '',
    severity: '',
    notes: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // TODO: Fetch appointments requiring diagnosis from Supabase
  const pendingAppointments = [
    {
      id: 'APT003',
      bookingId: 'BK-2024-003',
      patient: 'Michael Johnson',
      date: '2024-01-20',
      time: '2:00 PM',
      reason: 'Chest pain evaluation'
    },
    {
      id: 'APT005',
      bookingId: 'BK-2024-005',
      patient: 'Sarah Davis',
      date: '2024-01-19',
      time: '3:30 PM',
      reason: 'Heart palpitations'
    }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmitDiagnosis = async () => {
    if (!selectedAppointment || !diagnosisData.diagnosis) {
      toast({
        title: "Missing Information",
        description: "Please select an appointment and provide a diagnosis.",
        variant: "destructive"
      });
      return;
    }

    try {
      let ipfsHash = null;
      
      // TODO: Upload PDF report to IPFS if file is selected
      if (selectedFile) {
        // ipfsHash = await uploadToIPFS(selectedFile);
        console.log('Uploading file to IPFS:', selectedFile.name);
      }

      // TODO: Save diagnosis to Supabase
      // const { error } = await supabase
      //   .from('diagnoses')
      //   .insert({
      //     appointment_id: selectedAppointment,
      //     doctor_id: user.id,
      //     symptoms: diagnosisData.symptoms,
      //     diagnosis: diagnosisData.diagnosis,
      //     treatment_plan: diagnosisData.treatmentPlan,
      //     medications: diagnosisData.medications,
      //     follow_up_instructions: diagnosisData.followUpInstructions,
      //     severity: diagnosisData.severity,
      //     notes: diagnosisData.notes,
      //     report_ipfs_hash: ipfsHash,
      //     created_at: new Date().toISOString()
      //   });

      // TODO: Update appointment status
      // await supabase
      //   .from('appointments')
      //   .update({ status: 'diagnosis_completed' })
      //   .eq('id', selectedAppointment);

      toast({
        title: "Diagnosis Submitted",
        description: "Diagnosis has been submitted and patient has been notified.",
      });

      // Reset form
      setSelectedAppointment('');
      setDiagnosisData({
        symptoms: '',
        diagnosis: '',
        treatmentPlan: '',
        medications: '',
        followUpInstructions: '',
        severity: '',
        notes: ''
      });
      setSelectedFile(null);

    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting the diagnosis. Please try again.",
        variant: "destructive"
      });
    }
  };

  const selectedAppointmentData = pendingAppointments.find(apt => apt.id === selectedAppointment);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Submit Diagnosis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="appointment">Select Appointment</Label>
            <Select value={selectedAppointment} onValueChange={setSelectedAppointment}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an appointment requiring diagnosis" />
              </SelectTrigger>
              <SelectContent>
                {pendingAppointments.map(appointment => (
                  <SelectItem key={appointment.id} value={appointment.id}>
                    {appointment.patient} - {appointment.date} at {appointment.time} ({appointment.bookingId})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedAppointmentData && (
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Appointment Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Patient:</strong> {selectedAppointmentData.patient}</p>
                    <p><strong>Date:</strong> {selectedAppointmentData.date}</p>
                    <p><strong>Time:</strong> {selectedAppointmentData.time}</p>
                  </div>
                  <div>
                    <p><strong>Booking ID:</strong> {selectedAppointmentData.bookingId}</p>
                    <p><strong>Reason:</strong> {selectedAppointmentData.reason}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="symptoms">Patient Symptoms</Label>
                <Textarea
                  id="symptoms"
                  value={diagnosisData.symptoms}
                  onChange={(e) => setDiagnosisData({...diagnosisData, symptoms: e.target.value})}
                  placeholder="Document the symptoms observed during examination..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="diagnosis">Primary Diagnosis *</Label>
                <Textarea
                  id="diagnosis"
                  value={diagnosisData.diagnosis}
                  onChange={(e) => setDiagnosisData({...diagnosisData, diagnosis: e.target.value})}
                  placeholder="Primary diagnosis and any secondary conditions..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="severity">Severity Level</Label>
                <Select 
                  value={diagnosisData.severity} 
                  onValueChange={(value) => setDiagnosisData({...diagnosisData, severity: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mild">Mild</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="severe">Severe</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="treatment">Treatment Plan</Label>
                <Textarea
                  id="treatment"
                  value={diagnosisData.treatmentPlan}
                  onChange={(e) => setDiagnosisData({...diagnosisData, treatmentPlan: e.target.value})}
                  placeholder="Detailed treatment plan and recommended procedures..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="medications">Medications</Label>
                <Textarea
                  id="medications"
                  value={diagnosisData.medications}
                  onChange={(e) => setDiagnosisData({...diagnosisData, medications: e.target.value})}
                  placeholder="Prescribed medications with dosage and frequency..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="followup">Follow-up Instructions</Label>
                <Textarea
                  id="followup"
                  value={diagnosisData.followUpInstructions}
                  onChange={(e) => setDiagnosisData({...diagnosisData, followUpInstructions: e.target.value})}
                  placeholder="Next appointment schedule and care instructions..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={diagnosisData.notes}
              onChange={(e) => setDiagnosisData({...diagnosisData, notes: e.target.value})}
              placeholder="Any additional observations or recommendations..."
              rows={2}
            />
          </div>

          <div className="border-t pt-4">
            <Label htmlFor="report">Upload Diagnosis Report (PDF)</Label>
            <Input
              id="report"
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="mt-2"
            />
            {selectedFile && (
              <p className="text-sm text-gray-600 mt-2 flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>{selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB) asd</span>
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Report will be uploaded to IPFS for secure, decentralized storage
            </p>
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={handleSubmitDiagnosis} className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Submit Diagnosis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosisSubmission;
