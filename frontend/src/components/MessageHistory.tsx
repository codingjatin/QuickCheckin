import React from 'react';
import { MessageSquare, Clock } from 'lucide-react';
import { Message } from '../lib/types';
import { Card, CardContent } from './ui/Card';
import { StatusBadge } from './ui/StatusBadge';
import { formatTime } from '../lib/utils';

interface MessageHistoryProps {
  messages: Message[];
}

export const MessageHistory: React.FC<MessageHistoryProps> = ({ messages }) => {
  if (messages.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <MessageSquare className="h-12 w-12 text-muted/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-muted mb-2">No messages yet</h3>
          <p className="text-muted/70">Customer notifications will appear here</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <Card key={message.id} className="hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-full p-2 flex-shrink-0">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-muted truncate">{message.customerName}</h4>
                  <span className="text-sm text-muted/70 flex-shrink-0">{message.phone}</span>
                  <StatusBadge status={message.type as any} />
                </div>
                <p className="text-muted/80 mb-3 leading-relaxed">{message.message}</p>
                <div className="flex items-center gap-1 text-xs text-muted/60">
                  <Clock className="h-3 w-3" />
                  <span>{formatTime(message.timestamp)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};