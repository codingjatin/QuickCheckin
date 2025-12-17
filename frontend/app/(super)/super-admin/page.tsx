'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockSuperAdminRestaurants } from '@/lib/mock-data';
import {
  Building,
  Users,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

export default function SuperAdminOverview() {
  const totalRestaurants = mockSuperAdminRestaurants.length;
  const activeRestaurants = mockSuperAdminRestaurants.filter((r) => r.status === 'active').length;
  const totalWaiting = 47; // Mock data
  const totalSeated = 156; // Mock data

  return (
    <div className="space-y-8 text-ink">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Platform Overview</h1>
        <p className="text-muted">Monitor system performance and restaurant activity</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-panel border border-border shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Restaurants</CardTitle>
            <Building className="h-4 w-4 text-ink/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRestaurants}</div>
            <p className="text-xs text-muted">{activeRestaurants} active</p>
          </CardContent>
        </Card>

        <Card className="bg-panel border border-border shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers Waiting</CardTitle>
            <Clock className="h-4 w-4 text-ink/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWaiting}</div>
            <p className="text-xs text-muted">Across all locations</p>
          </CardContent>
        </Card>

        <Card className="bg-panel border border-border shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Seated Today</CardTitle>
            <Users className="h-4 w-4 text-ink/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSeated}</div>
            <p className="text-xs text-success">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-panel border border-border shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SMS Sent</CardTitle>
            <MessageSquare className="h-4 w-4 text-ink/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324</div>
            <p className="text-xs text-muted">Today's notifications</p>
          </CardContent>
        </Card>
      </div>

      {/* System Health + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-panel border border-border shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-success/5 ring-1 ring-success/20">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="font-medium">API Status</span>
                </div>
                <Badge className="bg-success/10 text-success border-0">Operational</Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-success/5 ring-1 ring-success/20">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="font-medium">SMS Service</span>
                </div>
                <Badge className="bg-success/10 text-success border-0">Operational</Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-ink/5 ring-1 ring-ink/15">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-ink/70" />
                  <span className="font-medium">Database</span>
                </div>
                <Badge className="bg-ink/10 text-ink border-0">Slow Queries</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-panel border border-border shadow-soft">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription className="text-muted">Latest platform events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  restaurant: 'Italian Bistro',
                  action: 'Customer seated',
                  customer: 'Sarah Johnson',
                  time: '2 min ago',
                  tone: 'success',
                },
                {
                  restaurant: 'Ocean Breeze',
                  action: 'New customer added',
                  customer: 'Mike Chen',
                  time: '5 min ago',
                  tone: 'info',
                },
                {
                  restaurant: 'Mountain View Bistro',
                  action: 'SMS delivery failed',
                  customer: 'Emma Davis',
                  time: '12 min ago',
                  tone: 'warning',
                },
                {
                  restaurant: 'Italian Bistro',
                  action: 'Table cleaned',
                  customer: 'Table 4',
                  time: '15 min ago',
                  tone: 'success',
                },
              ].map((activity, index) => {
                const toneClass =
                  activity.tone === 'success'
                    ? 'border-l-success bg-success/5'
                    : activity.tone === 'info'
                    ? 'border-l-info bg-info/5'
                    : 'border-l-secondary bg-secondary/5';
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 border-l-4 rounded-r-lg ${toneClass}`}
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.restaurant}</p>
                      <p className="text-sm text-muted">
                        {activity.action}: {activity.customer}
                      </p>
                    </div>
                    <span className="text-xs text-muted">{activity.time}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Restaurant Performance */}
      <Card className="bg-panel border border-border shadow-soft">
        <CardHeader>
          <CardTitle>Top Performing Restaurants</CardTitle>
          <CardDescription className="text-muted">
            Based on customer satisfaction and efficiency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSuperAdminRestaurants
              .filter((r) => r.status === 'active')
              .map((restaurant, index) => (
                <div
                  key={restaurant.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-off transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{restaurant.name}</h3>
                      <p className="text-sm text-muted">{restaurant.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="font-medium">23</p>
                      <p className="text-muted">Avg Wait</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">94%</p>
                      <p className="text-muted">Show Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">4.8</p>
                      <p className="text-muted">Rating</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}