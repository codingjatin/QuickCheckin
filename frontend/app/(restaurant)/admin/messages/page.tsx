'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWaitlistStore } from '@/lib/store';
import { MessageSquare, Send, Phone, Clock, Search } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function MessagesPage() {
  const { messages, customers, sendSMS } = useWaitlistStore();
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessages = messages.filter(message => {
    const customer = customers.find(c => c.id === message.customerId);
    return customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           customer?.phone.includes(searchTerm) ||
           message.message.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getCustomerMessages = (customerId: string) => {
    return messages.filter(m => m.customerId === customerId)
                  .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };

  const getCustomerForMessage = (customerId: string) => {
    return customers.find(c => c.id === customerId);
  };

  const handleSendMessage = () => {
    if (selectedCustomerId && newMessage.trim()) {
      sendSMS(selectedCustomerId, newMessage, 'notification');
      setNewMessage('');
    }
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'notification':
        return 'bg-blue-100 text-blue-800';
      case 'reminder':
        return 'bg-yellow-100 text-yellow-800';
      case 'response':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Message Center</h1>
        <p className="text-gray-600">View and manage SMS communications with customers</p>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search messages, names, or phone numbers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{messages.filter(m => m.direction === 'outgoing').length}</p>
            <p className="text-xs text-gray-500">Sent Today</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{messages.filter(m => m.direction === 'incoming').length}</p>
            <p className="text-xs text-gray-500">Responses</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Conversation List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Conversations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {customers
                  .filter(c => messages.some(m => m.customerId === c.id))
                  .map((customer) => {
                    const customerMessages = getCustomerMessages(customer.id);
                    const lastMessage = customerMessages[customerMessages.length - 1];
                    const isSelected = selectedCustomerId === customer.id;
                    
                    return (
                      <div
                        key={customer.id}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                          isSelected ? 'bg-indigo-50 border-l-4 border-l-indigo-500' : ''
                        }`}
                        onClick={() => setSelectedCustomerId(customer.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{customer.name}</h3>
                          <Badge className={getMessageTypeColor(lastMessage.type)}>
                            {lastMessage.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 truncate mb-1">
                          {lastMessage.message}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {customer.phone}
                          </span>
                          <span>
                            {formatDistanceToNow(lastMessage.timestamp, { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Thread */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                {selectedCustomerId ? 
                  `Conversation with ${getCustomerForMessage(selectedCustomerId)?.name}` : 
                  'Select a conversation'
                }
              </CardTitle>
              {selectedCustomerId && (
                <CardDescription>
                  {getCustomerForMessage(selectedCustomerId)?.phone}
                </CardDescription>
              )}
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              {selectedCustomerId ? (
                <>
                  {/* Message History */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {getCustomerMessages(selectedCustomerId).map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.direction === 'outgoing' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.direction === 'outgoing'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-200 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                message.direction === 'outgoing' 
                                  ? 'border-indigo-300 text-indigo-100' 
                                  : 'border-gray-300 text-gray-600'
                              }`}
                            >
                              {message.type}
                            </Badge>
                            <span className={`text-xs ${
                              message.direction === 'outgoing' ? 'text-indigo-200' : 'text-gray-500'
                            }`}>
                              {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Send Message */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
                    <p className="text-gray-500">Select a customer from the list to view their message history</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* All Messages List */}
      <Card>
        <CardHeader>
          <CardTitle>All Messages</CardTitle>
          <CardDescription>Complete SMS activity log</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No messages found</p>
              </div>
            ) : (
              filteredMessages.map((message) => {
                const customer = getCustomerForMessage(message.customerId);
                
                return (
                  <div key={message.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      message.direction === 'outgoing' ? 'bg-indigo-600' : 'bg-green-600'
                    }`} />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium">{customer?.name || 'Unknown'}</p>
                        <Badge className={getMessageTypeColor(message.type)}>
                          {message.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {message.direction === 'outgoing' ? 'Sent' : 'Received'}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-900 mb-2">{message.message}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {customer?.phone}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}