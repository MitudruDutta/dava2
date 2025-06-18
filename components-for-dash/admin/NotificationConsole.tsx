
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Search, CheckCircle, Clock, CreditCard, Award, User } from 'lucide-react';

const NotificationConsole = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // TODO: Fetch notifications/activity log from Supabase
  const notifications = [
    {
      id: 'NOT001',
      type: 'diagnosis_submitted',
      title: 'New Diagnosis Submitted',
      description: 'Dr. Sarah Johnson submitted diagnosis for patient John Doe (BK-2024-001)',
      timestamp: '2024-01-20T10:30:00Z',
      status: 'unread',
      userId: 'DOC001',
      bookingId: 'BK-2024-001',
      icon: CheckCircle,
      iconColor: 'text-green-600'
    },
    {
      id: 'NOT002',
      type: 'payment_confirmed',
      title: 'Payment Confirmed',
      description: 'Payment of $150 confirmed on blockchain for booking BK-2024-003',
      timestamp: '2024-01-19T15:45:00Z',
      status: 'read',
      transactionHash: '0x1a2b3c4d5e6f7g8h9i0j...',
      bookingId: 'BK-2024-003',
      icon: CreditCard,
      iconColor: 'text-blue-600'
    },
    {
      id: 'NOT003',
      type: 'nft_minted',
      title: 'Medical NFT Minted',
      description: 'Medical treatment NFT minted for completed case BK-2024-004',
      timestamp: '2024-01-18T14:20:00Z',
      status: 'read',
      tokenId: '1001',
      bookingId: 'BK-2024-004',
      icon: Award,
      iconColor: 'text-purple-600'
    },
    {
      id: 'NOT004',
      type: 'role_approved',
      title: 'Doctor Role Approved',
      description: 'Dr. Emily Rodriguez role verification approved and granted doctor privileges',
      timestamp: '2024-01-17T11:15:00Z',
      status: 'read',
      userId: 'DOC006',
      icon: User,
      iconColor: 'text-green-600'
    },
    {
      id: 'NOT005',
      type: 'appointment_booked',
      title: 'New Appointment Booked',
      description: 'Patient Jane Smith booked appointment with Dr. Michael Chen',
      timestamp: '2024-01-16T09:30:00Z',
      status: 'read',
      bookingId: 'BK-2024-005',
      icon: Clock,
      iconColor: 'text-blue-600'
    }
  ];

  const getStatusBadge = (status) => {
    if (status === 'unread') {
      return <Badge variant="destructive">New</Badge>;
    }
    return <Badge variant="outline">Read</Badge>;
  };

  const getTypeLabel = (type) => {
    const typeLabels = {
      'diagnosis_submitted': 'Diagnosis',
      'payment_confirmed': 'Payment',
      'nft_minted': 'NFT',
      'role_approved': 'Role',
      'appointment_booked': 'Appointment'
    };
    return typeLabels[type] || type;
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const markAsRead = async (notificationId) => {
    // TODO: Update notification status in Supabase
    // const { error } = await supabase
    //   .from('notifications')
    //   .update({ status: 'read' })
    //   .eq('id', notificationId);

    console.log(`Marking notification ${notificationId} as read`);
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || notification.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>System Notifications</span>
            </div>
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount} unread</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="diagnosis_submitted">Diagnosis</SelectItem>
                  <SelectItem value="payment_confirmed">Payment</SelectItem>
                  <SelectItem value="nft_minted">NFT Minted</SelectItem>
                  <SelectItem value="role_approved">Role Changes</SelectItem>
                  <SelectItem value="appointment_booked">Appointments</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {filteredNotifications.map(notification => {
          const IconComponent = notification.icon;
          return (
            <Card 
              key={notification.id} 
              className={`hover:shadow-md transition-shadow ${
                notification.status === 'unread' ? 'border-l-4 border-l-blue-500 bg-blue-50' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <IconComponent className={`h-5 w-5 ${notification.iconColor}`} />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-semibold">{notification.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {getTypeLabel(notification.type)}
                        </Badge>
                        {getStatusBadge(notification.status)}
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2">{notification.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        {notification.bookingId && (
                          <span>Booking: {notification.bookingId}</span>
                        )}
                        {notification.tokenId && (
                          <span>Token: #{notification.tokenId}</span>
                        )}
                        {notification.transactionHash && (
                          <span>Tx: {notification.transactionHash.substring(0, 12)}...</span>
                        )}
                      </div>
                      
                      {notification.status === 'unread' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredNotifications.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notifications found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationConsole;
