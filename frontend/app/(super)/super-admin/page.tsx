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
  AlertTriangle
} from 'lucide-react';

export default function SuperAdminOverview() {
  const totalRestaurants = mockSuperAdminRestaurants.length;
  const activeRestaurants = mockSuperAdminRestaurants.filter(r => r.status === 'active').length;
  const totalWaiting = 47; // Mock data
  const totalSeated = 156; // Mock data

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-charcoal mb-2">Platform Overview</h1>
        <p className="text-charcoal/70">Monitor system performance and restaurant activity</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-off-white border-sage/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-charcoal">Total Restaurants</CardTitle>
            <Building className="h-4 w-4 text-charcoal/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-charcoal">{totalRestaurants}</div>
            <p className="text-xs text-charcoal/60">
              {activeRestaurants} active
            </p>
          </CardContent>
        </Card>

        <Card className="bg-off-white border-sage/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-charcoal">Customers Waiting</CardTitle>
            <Clock className="h-4 w-4 text-charcoal/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-charcoal">{totalWaiting}</div>
            <p className="text-xs text-charcoal/60">
              Across all locations
            </p>
          </CardContent>
        </Card>

        <Card className="bg-off-white border-sage/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-charcoal">Seated Today</CardTitle>
            <Users className="h-4 w-4 text-charcoal/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-charcoal">{totalSeated}</div>
            <p className="text-xs text-charcoal/60">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-off-white border-sage/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-charcoal">SMS Sent</CardTitle>
            <MessageSquare className="h-4 w-4 text-charcoal/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-charcoal">324</div>
            <p className="text-xs text-charcoal/60">
              Today's notifications
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-off-white border-sage/20">
          <CardHeader>
            <CardTitle className="flex items-center text-charcoal">
              <TrendingUp className="h-5 w-5 mr-2" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-sage/10 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-deep-brown" />
                  <span className="font-medium text-charcoal">API Status</span>
                </div>
                <Badge className="bg-sage/20 text-charcoal">Operational</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-sage/10 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-deep-brown" />
                  <span className="font-medium text-charcoal">SMS Service</span>
                </div>
                <Badge className="bg-sage/20 text-charcoal">Operational</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-sage/5 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-charcoal/70" />
                  <span className="font-medium text-charcoal">Database</span>
                </div>
                <Badge className="bg-charcoal/10 text-charcoal">Slow Queries</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-off-white border-sage/20">
          <CardHeader>
            <CardTitle className="text-charcoal">Recent Activity</CardTitle>
            <CardDescription className="text-charcoal/70">Latest platform events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  restaurant: 'Bella Vista',
                  action: 'Customer seated',
                  customer: 'Sarah Johnson',
                  time: '2 min ago',
                  type: 'success'
                },
                {
                  restaurant: 'Ocean Breeze',
                  action: 'New customer added',
                  customer: 'Mike Chen',
                  time: '5 min ago',
                  type: 'info'
                },
                {
                  restaurant: 'Mountain View Bistro',
                  action: 'SMS delivery failed',
                  customer: 'Emma Davis',
                  time: '12 min ago',
                  type: 'warning'
                },
                {
                  restaurant: 'Bella Vista',
                  action: 'Table cleaned',
                  customer: 'Table 4',
                  time: '15 min ago',
                  type: 'success'
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border-l-4 border-l-sage bg-sage/5 rounded-r-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-charcoal">{activity.restaurant}</p>
                    <p className="text-sm text-charcoal/70">
                      {activity.action}: {activity.customer}
                    </p>
                  </div>
                  <span className="text-xs text-charcoal/60">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Restaurant Performance */}
      <Card className="bg-off-white border-sage/20">
        <CardHeader>
          <CardTitle className="text-charcoal">Top Performing Restaurants</CardTitle>
          <CardDescription className="text-charcoal/70">Based on customer satisfaction and efficiency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSuperAdminRestaurants
              .filter(r => r.status === 'active')
              .map((restaurant, index) => (
              <div key={restaurant.id} className="flex items-center justify-between p-4 border border-sage/20 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-sage/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-deep-brown">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal">{restaurant.name}</h3>
                    <p className="text-sm text-charcoal/60">{restaurant.city}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-charcoal">23</p>
                    <p className="text-charcoal/60">Avg Wait</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-charcoal">94%</p>
                    <p className="text-charcoal/60">Show Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-charcoal">4.8</p>
                    <p className="text-charcoal/60">Rating</p>
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