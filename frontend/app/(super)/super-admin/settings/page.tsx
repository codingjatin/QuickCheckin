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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
          <p className="text-gray-600">Configure platform-wide settings and preferences</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      {/* Platform Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Platform Configuration
          </CardTitle>
          <CardDescription>Core platform settings and limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="platformName">Platform Name</Label>
              <Input
                id="platformName"
                value={systemSettings.platformName}
                onChange={(e) => setSystemSettings({
                  ...systemSettings,
                  platformName: e.target.value
                })}
              />
            </div>
            
            <div>
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={systemSettings.supportEmail}
                onChange={(e) => setSystemSettings({
                  ...systemSettings,
                  supportEmail: e.target.value
                })}
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
                onChange={(e) => setSystemSettings({
                  ...systemSettings,
                  maxRestaurants: parseInt(e.target.value)
                })}
              />
            </div>
            
            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={systemSettings.sessionTimeoutMinutes}
                onChange={(e) => setSystemSettings({
                  ...systemSettings,
                  sessionTimeoutMinutes: parseInt(e.target.value)
                })}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-gray-500">Disable platform access for maintenance</p>
              </div>
              <Switch
                checked={systemSettings.maintenanceMode}
                onCheckedChange={(checked) => setSystemSettings({
                  ...systemSettings,
                  maintenanceMode: checked
                })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Allow New Registrations</Label>
                <p className="text-sm text-gray-500">Enable new restaurant sign-ups</p>
              </div>
              <Switch
                checked={systemSettings.allowRegistrations}
                onCheckedChange={(checked) => setSystemSettings({
                  ...systemSettings,
                  allowRegistrations: checked
                })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Require Email Verification</Label>
                <p className="text-sm text-gray-500">Users must verify email before access</p>
              </div>
              <Switch
                checked={systemSettings.requireEmailVerification}
                onCheckedChange={(checked) => setSystemSettings({
                  ...systemSettings,
                  requireEmailVerification: checked
                })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SMS Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            SMS Service Configuration
          </CardTitle>
          <CardDescription>Configure SMS provider and limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="smsProvider">SMS Provider</Label>
              <Input
                id="smsProvider"
                value={smsSettings.provider}
                onChange={(e) => setSmsSettings({
                  ...smsSettings,
                  provider: e.target.value
                })}
              />
            </div>
            
            <div>
              <Label htmlFor="dailyLimit">Daily SMS Limit</Label>
              <Input
                id="dailyLimit"
                type="number"
                value={smsSettings.dailySmsLimit}
                onChange={(e) => setSmsSettings({
                  ...smsSettings,
                  dailySmsLimit: parseInt(e.target.value)
                })}
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
                onChange={(e) => setSmsSettings({
                  ...smsSettings,
                  rateLimitPerMinute: parseInt(e.target.value)
                })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Delivery Tracking</Label>
              <p className="text-sm text-gray-500">Track message delivery status</p>
            </div>
            <Switch
              checked={smsSettings.enableDeliveryTracking}
              onCheckedChange={(checked) => setSmsSettings({
                ...smsSettings,
                enableDeliveryTracking: checked
              })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Security Settings
          </CardTitle>
          <CardDescription>Platform security and access controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="passwordMin">Minimum Password Length</Label>
              <Input
                id="passwordMin"
                type="number"
                value={securitySettings.passwordMinLength}
                onChange={(e) => setSecuritySettings({
                  ...securitySettings,
                  passwordMinLength: parseInt(e.target.value)
                })}
              />
            </div>
            
            <div>
              <Label htmlFor="sessionHours">Session Timeout (hours)</Label>
              <Input
                id="sessionHours"
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => setSecuritySettings({
                  ...securitySettings,
                  sessionTimeout: parseInt(e.target.value)
                })}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
              </div>
              <Switch
                checked={securitySettings.enableTwoFactor}
                onCheckedChange={(checked) => setSecuritySettings({
                  ...securitySettings,
                  enableTwoFactor: checked
                })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Audit Logging</Label>
                <p className="text-sm text-gray-500">Log all administrative actions</p>
              </div>
              <Switch
                checked={securitySettings.auditLogs}
                onCheckedChange={(checked) => setSecuritySettings({
                  ...securitySettings,
                  auditLogs: checked
                })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>IP Restrictions</Label>
                <p className="text-sm text-gray-500">Restrict admin access to specific IP ranges</p>
              </div>
              <Switch
                checked={securitySettings.ipRestrictions}
                onCheckedChange={(checked) => setSecuritySettings({
                  ...securitySettings,
                  ipRestrictions: checked
                })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2" />
            System Status
          </CardTitle>
          <CardDescription>Monitor system health and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
              <p className="font-medium text-green-900">Database</p>
              <p className="text-sm text-green-700">Online</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
              <p className="font-medium text-green-900">SMS Service</p>
              <p className="text-sm text-green-700">Operational</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
              <p className="font-medium text-green-900">API</p>
              <p className="text-sm text-green-700">99.9% uptime</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}