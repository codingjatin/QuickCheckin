'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Settings, ListRestart as Restaurant, MessageSquare, Clock, Save, Plus, Trash2 } from 'lucide-react';

export default function SettingsPage() {
  const [restaurantSettings, setRestaurantSettings] = useState({
    name: 'Bella Vista',
    phone: '(555) 123-4567',
    address: '123 Main Street, San Francisco, CA 94102',
    gracePeriodMinutes: 15,
    reminderDelayMinutes: 7,
    autoReminders: true,
    emailNotifications: true,
  });

  const [smsTemplates, setSmsTemplates] = useState({
    tableReady: 'Hi {name}! Your table for {partySize} at {restaurant} is ready. Please arrive within 15 minutes.',
    reminder: 'Please reply quickly with Y (Yes) or N (No) so we can continue further.',
    cancelled: 'Hi {name}, your reservation at {restaurant} has been cancelled due to no response.',
  });

  const [tableConfig, setTableConfig] = useState([
    { id: '1', number: 1, capacity: 2 },
    { id: '2', number: 2, capacity: 4 },
    { id: '3', number: 3, capacity: 4 },
    { id: '4', number: 4, capacity: 6 },
    { id: '5', number: 5, capacity: 2 },
    { id: '6', number: 6, capacity: 8 },
  ]);

  const handleSave = () => {
    // In a real app, this would save to the backend
    alert('Settings saved successfully!');
  };

  const addTable = () => {
    const newTable = {
      id: Date.now().toString(),
      number: Math.max(...tableConfig.map(t => t.number), 0) + 1,
      capacity: 4,
    };
    setTableConfig([...tableConfig, newTable]);
  };

  const removeTable = (id: string) => {
    setTableConfig(tableConfig.filter(t => t.id !== id));
  };

  const updateTable = (id: string, field: string, value: number) => {
    setTableConfig(tableConfig.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Restaurant Settings</h1>
          <p className="text-gray-600">Manage your restaurant's configuration and preferences</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Restaurant Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Restaurant className="h-5 w-5 mr-2" />
            Restaurant Profile
          </CardTitle>
          <CardDescription>Basic information about your restaurant</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Restaurant Name</Label>
              <Input
                id="name"
                value={restaurantSettings.name}
                onChange={(e) => setRestaurantSettings({
                  ...restaurantSettings,
                  name: e.target.value
                })}
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={restaurantSettings.phone}
                onChange={(e) => setRestaurantSettings({
                  ...restaurantSettings,
                  phone: e.target.value
                })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={restaurantSettings.address}
              onChange={(e) => setRestaurantSettings({
                ...restaurantSettings,
                address: e.target.value
              })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Waitlist Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Waitlist Configuration
          </CardTitle>
          <CardDescription>Configure timing and automation settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="gracePeriod">Grace Period (minutes)</Label>
              <Input
                id="gracePeriod"
                type="number"
                value={restaurantSettings.gracePeriodMinutes}
                onChange={(e) => setRestaurantSettings({
                  ...restaurantSettings,
                  gracePeriodMinutes: parseInt(e.target.value)
                })}
              />
              <p className="text-sm text-gray-500 mt-1">
                Time customers have to arrive after being notified
              </p>
            </div>
            
            <div>
              <Label htmlFor="reminderDelay">Reminder Delay (minutes)</Label>
              <Input
                id="reminderDelay"
                type="number"
                value={restaurantSettings.reminderDelayMinutes}
                onChange={(e) => setRestaurantSettings({
                  ...restaurantSettings,
                  reminderDelayMinutes: parseInt(e.target.value)
                })}
              />
              <p className="text-sm text-gray-500 mt-1">
                How long to wait before sending reminder if no response
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Automatic Reminders</Label>
                <p className="text-sm text-gray-500">Send follow-up messages if customers don't respond</p>
              </div>
              <Switch
                checked={restaurantSettings.autoReminders}
                onCheckedChange={(checked) => setRestaurantSettings({
                  ...restaurantSettings,
                  autoReminders: checked
                })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">Get email alerts for important events</p>
              </div>
              <Switch
                checked={restaurantSettings.emailNotifications}
                onCheckedChange={(checked) => setRestaurantSettings({
                  ...restaurantSettings,
                  emailNotifications: checked
                })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SMS Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            SMS Templates
          </CardTitle>
          <CardDescription>
            Customize your automated messages. Use {'{name}'}, {'{partySize}'}, {'{restaurant}'} as variables
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="tableReady">Table Ready Notification</Label>
            <Textarea
              id="tableReady"
              value={smsTemplates.tableReady}
              onChange={(e) => setSmsTemplates({
                ...smsTemplates,
                tableReady: e.target.value
              })}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="reminder">Reminder Message</Label>
            <Textarea
              id="reminder"
              value={smsTemplates.reminder}
              onChange={(e) => setSmsTemplates({
                ...smsTemplates,
                reminder: e.target.value
              })}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="cancelled">Cancellation Message</Label>
            <Textarea
              id="cancelled"
              value={smsTemplates.cancelled}
              onChange={(e) => setSmsTemplates({
                ...smsTemplates,
                cancelled: e.target.value
              })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Table Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Restaurant className="h-5 w-5 mr-2" />
              Table Configuration
            </div>
            <Button onClick={addTable} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Table
            </Button>
          </CardTitle>
          <CardDescription>Manage your restaurant's seating layout</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tableConfig.map((table) => (
              <div key={table.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Table Number</Label>
                    <Input
                      type="number"
                      value={table.number}
                      onChange={(e) => updateTable(table.id, 'number', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Capacity</Label>
                    <Input
                      type="number"
                      value={table.capacity}
                      onChange={(e) => updateTable(table.id, 'capacity', parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeTable(table.id)}
                  disabled={tableConfig.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}