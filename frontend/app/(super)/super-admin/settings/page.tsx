'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Settings,
  Server,
  MessageSquare,
  Shield,
  Save,
  Database,
  Globe
} from 'lucide-react';

export default function SystemSettingsPage() {
  const [systemSettings, setSystemSettings] = useState({
    platformName: 'QuickCheck',
    supportEmail: 'support@quickcheck.com',
    maxRestaurants: 100,
    maintenanceMode: false,
    allowRegistrations: true,
    requireEmailVerification: true,
    sessionTimeoutMinutes: 480,
  });

  const [smsSettings, setSmsSettings] = useState({
    provider: 'Twilio',
    dailySmsLimit: 10000,
    rateLimitPerMinute: 100,
    enableDeliveryTracking: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    enableTwoFactor: true,
    passwordMinLength: 8,
    sessionTimeout: 8,
    auditLogs: true,
    ipRestrictions: false,
  });

  const handleSave = () => {
    alert('System settings saved successfully!');
  };

  return (
    <div className="space-y-8 text-ink">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">System Settings</h1>
          <p className="text-muted">Configure platform-wide settings and preferences</p>
        </div>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary-600 text-white">
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      {/* Platform Configuration */}
      {/* <Card className="bg-panel border border-border shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2 text-primary" />
            Platform Configuration
          </CardTitle>
          <CardDescription className="text-muted">Core platform settings and limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="platformName">Platform Name</Label>
              <Input
                id="platformName"
                value={systemSettings.platformName}
                onChange={(e) =>
                  setSystemSettings({ ...systemSettings, platformName: e.target.value })
                }
                className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div>
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={systemSettings.supportEmail}
                onChange={(e) =>
                  setSystemSettings({ ...systemSettings, supportEmail: e.target.value })
                }
                className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="maxRestaurants">Maximum Restaurants</Label>
              <Input
                id="maxRestaurants"
                type="number"
                value={systemSettings.maxRestaurants}
                onChange={(e) =>
                  setSystemSettings({
                    ...systemSettings,
                    maxRestaurants: parseInt(e.target.value || '0'),
                  })
                }
                className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={systemSettings.sessionTimeoutMinutes}
                onChange={(e) =>
                  setSystemSettings({
                    ...systemSettings,
                    sessionTimeoutMinutes: parseInt(e.target.value || '0'),
                  })
                }
                className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          </div>

          <Separator className="bg-border" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted">Disable platform access for maintenance</p>
              </div>
              <Switch
                checked={systemSettings.maintenanceMode}
                onCheckedChange={(checked) =>
                  setSystemSettings({ ...systemSettings, maintenanceMode: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Allow New Registrations</Label>
                <p className="text-sm text-muted">Enable new restaurant sign-ups</p>
              </div>
              <Switch
                checked={systemSettings.allowRegistrations}
                onCheckedChange={(checked) =>
                  setSystemSettings({ ...systemSettings, allowRegistrations: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Require Email Verification</Label>
                <p className="text-sm text-muted">Users must verify email before access</p>
              </div>
              <Switch
                checked={systemSettings.requireEmailVerification}
                onCheckedChange={(checked) =>
                  setSystemSettings({ ...systemSettings, requireEmailVerification: checked })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* SMS Configuration */}
      {/* <Card className="bg-panel border border-border shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-primary" />
            SMS Service Configuration
          </CardTitle>
          <CardDescription className="text-muted">Configure SMS provider and limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="smsProvider">SMS Provider</Label>
              <Input
                id="smsProvider"
                value={smsSettings.provider}
                onChange={(e) => setSmsSettings({ ...smsSettings, provider: e.target.value })}
                className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div>
              <Label htmlFor="dailyLimit">Daily SMS Limit</Label>
              <Input
                id="dailyLimit"
                type="number"
                value={smsSettings.dailySmsLimit}
                onChange={(e) =>
                  setSmsSettings({
                    ...smsSettings,
                    dailySmsLimit: parseInt(e.target.value || '0'),
                  })
                }
                className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="rateLimit">Rate Limit (per minute)</Label>
              <Input
                id="rateLimit"
                type="number"
                value={smsSettings.rateLimitPerMinute}
                onChange={(e) =>
                  setSmsSettings({
                    ...smsSettings,
                    rateLimitPerMinute: parseInt(e.target.value || '0'),
                  })
                }
                className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Delivery Tracking</Label>
              <p className="text-sm text-muted">Track message delivery status</p>
            </div>
            <Switch
              checked={smsSettings.enableDeliveryTracking}
              onCheckedChange={(checked) =>
                setSmsSettings({ ...smsSettings, enableDeliveryTracking: checked })
              }
            />
          </div>
        </CardContent>
      </Card> */}

      {/* Security Configuration */}
      {/* <Card className="bg-panel border border-border shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            Security Settings
          </CardTitle>
          <CardDescription className="text-muted">Platform security and access controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="passwordMin">Minimum Password Length</Label>
              <Input
                id="passwordMin"
                type="number"
                value={securitySettings.passwordMinLength}
                onChange={(e) =>
                  setSecuritySettings({
                    ...securitySettings,
                    passwordMinLength: parseInt(e.target.value || '0'),
                  })
                }
                className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div>
              <Label htmlFor="sessionHours">Session Timeout (hours)</Label>
              <Input
                id="sessionHours"
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) =>
                  setSecuritySettings({
                    ...securitySettings,
                    sessionTimeout: parseInt(e.target.value || '0'),
                  })
                }
                className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          </div>

          <Separator className="bg-border" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted">Require 2FA for all admin accounts</p>
              </div>
              <Switch
                checked={securitySettings.enableTwoFactor}
                onCheckedChange={(checked) =>
                  setSecuritySettings({ ...securitySettings, enableTwoFactor: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Audit Logging</Label>
                <p className="text-sm text-muted">Log all administrative actions</p>
              </div>
              <Switch
                checked={securitySettings.auditLogs}
                onCheckedChange={(checked) =>
                  setSecuritySettings({ ...securitySettings, auditLogs: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>IP Restrictions</Label>
                <p className="text-sm text-muted">Restrict admin access to specific IP ranges</p>
              </div>
              <Switch
                checked={securitySettings.ipRestrictions}
                onCheckedChange={(checked) =>
                  setSecuritySettings({ ...securitySettings, ipRestrictions: checked })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* System Status */}
      <Card className="bg-panel border border-border shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2 text-primary" />
            System Status
          </CardTitle>
          <CardDescription className="text-muted">Monitor system health and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-success/10 rounded-lg ring-1 ring-success/30">
              <div className="w-3 h-3 bg-success rounded-full mx-auto mb-2"></div>
              <p className="font-medium text-success">Database</p>
              <p className="text-sm text-success/80">Online</p>
            </div>

            <div className="text-center p-4 bg-success/10 rounded-lg ring-1 ring-success/30">
              <div className="w-3 h-3 bg-success rounded-full mx-auto mb-2"></div>
              <p className="font-medium text-success">SMS Service</p>
              <p className="text-sm text-success/80">Operational</p>
            </div>

            <div className="text-center p-4 bg-success/10 rounded-lg ring-1 ring-success/30">
              <div className="w-3 h-3 bg-success rounded-full mx-auto mb-2"></div>
              <p className="font-medium text-success">API</p>
              <p className="text-sm text-success/80">99.9% uptime</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
