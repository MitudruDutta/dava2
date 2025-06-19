import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Clock, CheckCircle } from "lucide-react";

const PaymentsTile = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  // TODO: Fetch latest payment from Supabase
  const latestPayment = {
    id: "PAY001",
    treatment: "Dermatology Consultation",
    amount: 150,
    status: "pending",
  };

  // TODO: Fetch payment statistics from Supabase
  const paymentStats = {
    pending: 2,
    completed: 3,
  };

  const getStatusBadge = (status: string) => {
    if (status === "pending") {
      return (
        <Badge
          variant="destructive"
          className="flex items-center space-x-1 text-xs"
        >
          <Clock className="h-3 w-3" />
          <span>Payment Required</span>
        </Badge>
      );
    }
    return (
      <Badge
        variant="default"
        className="flex items-center space-x-1 bg-green-600 text-xs"
      >
        <CheckCircle className="h-3 w-3" />
        <span>Paid</span>
      </Badge>
    );
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-2">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <CreditCard className="h-5 w-5 text-orange-600" />
          <span>Payments</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-sm">
                {latestPayment.treatment}
              </h4>
              {getStatusBadge(latestPayment.status)}
            </div>

            <div className="text-lg font-bold text-green-600">
              ${latestPayment.amount}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-center">
            <div className="p-2 bg-red-50 rounded">
              <div className="font-semibold text-red-600">
                {paymentStats.pending}
              </div>
              <div className="text-gray-600">Pending</div>
            </div>
            <div className="p-2 bg-green-50 rounded">
              <div className="font-semibold text-green-600">
                {paymentStats.completed}
              </div>
              <div className="text-gray-600">Completed</div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t space-y-2">
          {latestPayment.status === "pending" && (
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              size="sm"
            >
              Pay ${latestPayment.amount}
            </Button>
          )}
          <Button
            variant="outline"
            className="w-full"
            size="sm"
            onClick={() => setActiveTab("payments")}
          >
            View All Payments
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentsTile;
