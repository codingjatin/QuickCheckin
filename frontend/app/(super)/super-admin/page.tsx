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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Platform Overview</h1>
        <p className="text-gray-600">Monitor system performance and restaurant activity</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Restaurants</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRestaurants}</div>
            <p className="text-xs text-muted-foreground">
              {activeRestaurants} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers Waiting</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWaiting}</div>
            <p className="text-xs text-muted-foreground">
              Across all locations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Seated Today</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSeated}</div>
            <p className="text-xs text-muted-foreground">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SMS Sent</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324</div>
            <p className="text-xs text-muted-foreground">
              Today's notifications
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">API Status</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Operational</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">SMS Service</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Operational</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium">Database</span>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Slow Queries</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform events</CardDescription>
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
                <div key={index} className="flex items-center space-x-3 p-3 border-l-4 border-l-gray-200 bg-gray-50 rounded-r-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.restaurant}</p>
                    <p className="text-sm text-gray-600">
                      {activity.action}: {activity.customer}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Restaurant Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Restaurants</CardTitle>
          <CardDescription>Based on customer satisfaction and efficiency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSuperAdminRestaurants
              .filter(r => r.status === 'active')
              .map((restaurant, index) => (
              <div key={restaurant.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-indigo-600">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{restaurant.name}</h3>
                    <p className="text-sm text-gray-500">{restaurant.city}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-gray-900">23</p>
                    <p className="text-gray-500">Avg Wait</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900">94%</p>
                    <p className="text-gray-500">Show Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900">4.8</p>
                    <p className="text-gray-500">Rating</p>
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