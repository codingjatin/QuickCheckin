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

  const filteredMessages = messages.filter((message) => {
    const customer = customers.find((c) => c.id === message.customerId);
    return (
      customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer?.phone.includes(searchTerm) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getCustomerMessages = (customerId: string) =>
    messages
      .filter((m) => m.customerId === customerId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  const getCustomerForMessage = (customerId: string) =>
    customers.find((c) => c.id === customerId);

  const handleSendMessage = () => {
    if (selectedCustomerId && newMessage.trim()) {
      sendSMS(selectedCustomerId, newMessage, 'notification');
      setNewMessage('');
    }
  };

  // Token-based badge colors
  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'notification':
        return 'bg-info/10 text-info';
      case 'reminder':
        return 'bg-secondary/10 text-secondary-600';
      case 'response':
        return 'bg-success/10 text-success';
      case 'cancelled':
        return 'bg-error/10 text-error';
      default:
        return 'bg-ink/10 text-ink';
    }
  };

  return (
    <div className="space-y-8 text-ink">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Message Center</h1>
        <p className="text-muted">View and manage SMS communications with customers</p>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted" />
          <Input
            placeholder="Search messages, names, or phone numbers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-border focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
        <div className="flex gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold">{messages.filter((m) => m.direction === 'outgoing').length}</p>
            <p className="text-xs text-muted">Sent Today</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{messages.filter((m) => m.direction === 'incoming').length}</p>
            <p className="text-xs text-muted">Responses</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Conversation List */}
        <div className="lg:col-span-1">
          <Card className="bg-panel border border-border shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Recent Conversations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {customers
                  .filter((c) => messages.some((m) => m.customerId === c.id))
                  .map((customer) => {
                    const customerMessages = getCustomerMessages(customer.id);
                    const lastMessage = customerMessages[customerMessages.length - 1];
                    const isSelected = selectedCustomerId === customer.id;

                    return (
                      <div
                        key={customer.id}
                        className={`p-4 cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-primary/5 border-l-4 border-l-primary'
                            : 'hover:bg-off'
                        }`}
                        onClick={() => setSelectedCustomerId(customer.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{customer.name}</h3>
                          <Badge className={`${getMessageTypeColor(lastMessage.type)} border-0`}>
                            {lastMessage.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted truncate mb-1">{lastMessage.message}</p>
                        <div className="flex items-center justify-between text-xs text-muted">
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
          <Card className="h-[600px] flex flex-col bg-panel border border-border shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                {selectedCustomerId
                  ? `Conversation with ${getCustomerForMessage(selectedCustomerId)?.name}`
                  : 'Select a conversation'}
              </CardTitle>
              {selectedCustomerId && (
                <CardDescription className="text-muted">
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
                              ? 'bg-primary text-white'
                              : 'bg-off ring-1 ring-border text-ink'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                message.direction === 'outgoing'
                                  ? 'border-white/30 text-white/90'
                                  : 'border-border text-muted'
                              }`}
                            >
                              {message.type}
                            </Badge>
                            <span
                              className={`text-xs ${
                                message.direction === 'outgoing' ? 'text-white/70' : 'text-muted'
                              }`}
                            >
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
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 border-border focus-visible:ring-2 focus-visible:ring-primary"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-primary hover:bg-primary-600 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-muted mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                    <p className="text-muted">Select a customer from the list to view their message history</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* All Messages List */}
      <Card className="bg-panel border border-border shadow-soft">
        <CardHeader>
          <CardTitle>All Messages</CardTitle>
          <CardDescription className="text-muted">Complete SMS activity log</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-muted mx-auto mb-4" />
                <p className="text-muted">No messages found</p>
              </div>
            ) : (
              filteredMessages.map((message) => {
                const customer = getCustomerForMessage(message.customerId);
                return (
                  <div key={message.id} className="flex items-start space-x-4 p-4 border border-border rounded-lg bg-off">
                    <div
                      className={`w-3 h-3 rounded-full mt-2 ${
                        message.direction === 'outgoing' ? 'bg-primary' : 'bg-success'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-1">
                        <p className="font-medium">{customer?.name || 'Unknown'}</p>
                        <Badge className={`${getMessageTypeColor(message.type)} border-0`}>
                          {message.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-border text-muted">
                          {message.direction === 'outgoing' ? 'Sent' : 'Received'}
                        </Badge>
                      </div>

                      <p className="mb-2">{message.message}</p>

                      <div className="flex items-center gap-4 text-sm text-muted">
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
