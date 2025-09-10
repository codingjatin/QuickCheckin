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
    tableReady:
      'Hi {name}! Your table for {partySize} at {restaurant} is ready. Please arrive within 15 minutes.',
    reminder:
      "Please reply quickly with Y (Yes) or N (No) so we can continue further.",
    cancelled:
      'Hi {name}, your reservation at {restaurant} has been cancelled due to no response.',
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
      number: Math.max(...tableConfig.map((t) => t.number), 0) + 1,
      capacity: 4,
    };
    setTableConfig([...tableConfig, newTable]);
  };

  const removeTable = (id: string) => {
    setTableConfig(tableConfig.filter((t) => t.id !== id));
  };

  const updateTable = (id: string, field: string, value: number) => {
    setTableConfig(tableConfig.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };

  return (
    <div className="space-y-8 text-ink">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Restaurant Settings</h1>
          <p className="text-muted">
            Manage your restaurant&apos;s configuration and preferences
          </p>
        </div>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary-600 text-white">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Restaurant Profile */}
      <Card className="bg-panel border border-border shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Restaurant className="h-5 w-5 mr-2 text-primary" />
            Restaurant Profile
          </CardTitle>
          <CardDescription className="text-muted">
            Basic information about your restaurant
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-ink">Restaurant Name</Label>
              <Input
                id="name"
                value={restaurantSettings.name}
                onChange={(e) =>
                  setRestaurantSettings({
                    ...restaurantSettings,
                    name: e.target.value,
                  })
                }
                className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-ink">Phone Number</Label>
              <Input
                id="phone"
                value={restaurantSettings.phone}
                onChange={(e) =>
                  setRestaurantSettings({
                    ...restaurantSettings,
                    phone: e.target.value,
                  })
                }
                className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address" className="text-ink">Address</Label>
            <Input
              id="address"
              value={restaurantSettings.address}
              onChange={(e) =>
                setRestaurantSettings({
                  ...restaurantSettings,
                  address: e.target.value,
                })
              }
              className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Waitlist Settings */}
      <Card className="bg-panel border border-border shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" />
            Waitlist Configuration
          </CardTitle>
          <CardDescription className="text-muted">
            Configure timing and automation settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="gracePeriod" className="text-ink">Grace Period (minutes)</Label>
              <Input
                id="gracePeriod"
                type="number"
                value={restaurantSettings.gracePeriodMinutes}
                onChange={(e) =>
                  setRestaurantSettings({
                    ...restaurantSettings,
                    gracePeriodMinutes: parseInt(e.target.value || '0'),
                  })
                }
                className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
              />
              <p className="text-sm text-muted mt-1">
                Time customers have to arrive after being notified
              </p>
            </div>

            <div>
              <Label htmlFor="reminderDelay" className="text-ink">Reminder Delay (minutes)</Label>
              <Input
                id="reminderDelay"
                type="number"
                value={restaurantSettings.reminderDelayMinutes}
                onChange={(e) =>
                  setRestaurantSettings({
                    ...restaurantSettings,
                    reminderDelayMinutes: parseInt(e.target.value || '0'),
                  })
                }
                className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
              />
              <p className="text-sm text-muted mt-1">
                How long to wait before sending reminder if no response
              </p>
            </div>
          </div>

          <Separator className="bg-border" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-ink">Automatic Reminders</Label>
                <p className="text-sm text-muted">
                  Send follow-up messages if customers don&apos;t respond
                </p>
              </div>
              <Switch
                checked={restaurantSettings.autoReminders}
                onCheckedChange={(checked) =>
                  setRestaurantSettings({
                    ...restaurantSettings,
                    autoReminders: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-ink">Email Notifications</Label>
                <p className="text-sm text-muted">Get email alerts for important events</p>
              </div>
              <Switch
                checked={restaurantSettings.emailNotifications}
                onCheckedChange={(checked) =>
                  setRestaurantSettings({
                    ...restaurantSettings,
                    emailNotifications: checked,
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SMS Templates */}
      <Card className="bg-panel border border-border shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-primary" />
            SMS Templates
          </CardTitle>
          <CardDescription className="text-muted">
            Customize your automated messages. Use {'{name}'}, {'{partySize}'}, {'{restaurant}'} as variables
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="tableReady" className="text-ink">Table Ready Notification</Label>
            <Textarea
              id="tableReady"
              value={smsTemplates.tableReady}
              onChange={(e) =>
                setSmsTemplates({
                  ...smsTemplates,
                  tableReady: e.target.value,
                })
              }
              rows={3}
              className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div>
            <Label htmlFor="reminder" className="text-ink">Reminder Message</Label>
            <Textarea
              id="reminder"
              value={smsTemplates.reminder}
              onChange={(e) =>
                setSmsTemplates({
                  ...smsTemplates,
                  reminder: e.target.value,
                })
              }
              rows={3}
              className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div>
            <Label htmlFor="cancelled" className="text-ink">Cancellation Message</Label>
            <Textarea
              id="cancelled"
              value={smsTemplates.cancelled}
              onChange={(e) =>
                setSmsTemplates({
                  ...smsTemplates,
                  cancelled: e.target.value,
                })
              }
              rows={3}
              className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table Configuration */}
      <Card className="bg-panel border border-border shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Restaurant className="h-5 w-5 mr-2 text-primary" />
              Table Configuration
            </div>
            <Button onClick={addTable} size="sm" className="bg-primary hover:bg-primary-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Table
            </Button>
          </CardTitle>
          <CardDescription className="text-muted">
            Manage your restaurant&apos;s seating layout
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tableConfig.map((table) => (
              <div
                key={table.id}
                className="flex items-center gap-4 p-4 border border-border rounded-lg bg-off"
              >
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-ink">Table Number</Label>
                    <Input
                      type="number"
                      value={table.number}
                      onChange={(e) =>
                        updateTable(table.id, 'number', parseInt(e.target.value || '0'))
                      }
                      className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>
                  <div>
                    <Label className="text-ink">Capacity</Label>
                    <Input
                      type="number"
                      value={table.capacity}
                      onChange={(e) =>
                        updateTable(table.id, 'capacity', parseInt(e.target.value || '0'))
                      }
                      className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
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
