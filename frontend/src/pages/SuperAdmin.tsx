import React, { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Clock,
  MapPin,
  Phone,
  Plus,
  BarChart3,
  Search,
  Filter,
  Download,
  Settings,
  Crown,
  Globe,
  DollarSign,
  Activity
} from 'lucide-react';
import { mockRestaurants } from '../lib/mockData';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Input } from '../components/ui/Input';

export const SuperAdmin: React.FC = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const systemStats = {
    totalRestaurants: mockRestaurants.length,
    totalGuests: 1247,
    averageWait: 24,
    todayRevenue: 284500,
    monthlyGrowth: 12.5,
    activeUsers: 89,
  };

  const filteredRestaurants = mockRestaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/90 text-background shadow-strong">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-background/20 rounded-2xl p-3">
                <Crown className="h-10 w-10 text-background" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-display">QuickCheck Super Admin</h1>
                <p className="text-background/90">System Overview & Restaurant Management</p>
                <p className="text-background/70 text-sm">Logged in as: Harman Singh</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" size="sm" className="border-background/30 text-background hover:bg-background hover:text-primary">
                <Settings className="h-4 w-4 mr-2" />
                System Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* System Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
          <Card className="hover:shadow-medium transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 rounded-2xl p-4 mb-4">
                <Building2 className="h-8 w-8 text-primary mx-auto" />
              </div>
              <p className="text-sm text-muted/70 mb-1">Total Restaurants</p>
              <p className="text-3xl font-bold text-muted">{systemStats.totalRestaurants}</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-medium transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div className="bg-warning/10 rounded-2xl p-4 mb-4">
                <Users className="h-8 w-8 text-warning mx-auto" />
              </div>
              <p className="text-sm text-muted/70 mb-1">Active Guests</p>
              <p className="text-3xl font-bold text-muted">{systemStats.totalGuests.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-medium transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div className="bg-accent/10 rounded-2xl p-4 mb-4">
                <Clock className="h-8 w-8 text-accent mx-auto" />
              </div>
              <p className="text-sm text-muted/70 mb-1">Avg Wait Time</p>
              <p className="text-3xl font-bold text-muted">{systemStats.averageWait}m</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-medium transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div className="bg-success/10 rounded-2xl p-4 mb-4">
                <DollarSign className="h-8 w-8 text-success mx-auto" />
              </div>
              <p className="text-sm text-muted/70 mb-1">Today's Revenue</p>
              <p className="text-3xl font-bold text-muted">${(systemStats.todayRevenue / 1000).toFixed(0)}K</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-medium transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-500/10 rounded-2xl p-4 mb-4">
                <TrendingUp className="h-8 w-8 text-blue-500 mx-auto" />
              </div>
              <p className="text-sm text-muted/70 mb-1">Monthly Growth</p>
              <p className="text-3xl font-bold text-muted">+{systemStats.monthlyGrowth}%</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-medium transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div className="bg-purple-500/10 rounded-2xl p-4 mb-4">
                <Activity className="h-8 w-8 text-purple-500 mx-auto" />
              </div>
              <p className="text-sm text-muted/70 mb-1">Active Now</p>
              <p className="text-3xl font-bold text-muted">{systemStats.activeUsers}</p>
            </CardContent>
          </Card>
        </div>

        {/* Restaurant Management */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-muted font-display mb-2">Restaurant Network</h2>
              <p className="text-muted/70">Manage all restaurant locations and their performance</p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="h-5 w-5 text-muted/50 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  placeholder="Search restaurants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" className="shadow-medium">
                <Plus className="h-4 w-4 mr-2" />
                Add Restaurant
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="hover:shadow-strong transition-all duration-300 transform hover:-translate-y-1 group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                        {restaurant.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted/70 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{restaurant.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted/70">
                        <Phone className="h-4 w-4" />
                        <span>{restaurant.phone}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-xs text-success font-medium">Online</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-muted/70 mb-1">Tables</p>
                      <p className="text-2xl font-bold text-muted">{restaurant.totalTables}</p>
                    </div>
                    <div className="bg-warning/10 rounded-xl p-4 text-center">
                      <p className="text-sm text-muted/70 mb-1">Waitlist</p>
                      <p className="text-2xl font-bold text-warning">{restaurant.activeWaitlist}</p>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted/70">Average Wait:</span>
                      <span className="font-semibold text-muted">{restaurant.averageWait} minutes</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted/70">Today's Revenue:</span>
                      <span className="font-semibold text-success">$12,450</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted/70">Customer Rating:</span>
                      <span className="font-semibold text-muted">4.8 ⭐</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setSelectedRestaurant(restaurant.id)}
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* System Performance Analytics */}
        <Card className="shadow-strong">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">System Performance Analytics</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-success/10 rounded-2xl p-6 mb-4">
                  <TrendingUp className="h-12 w-12 text-success mx-auto" />
                </div>
                <h4 className="font-semibold text-muted mb-2 text-lg">Guest Satisfaction</h4>
                <p className="text-4xl font-bold text-success mb-2">94.2%</p>
                <p className="text-sm text-muted/70">+2.1% from last month</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div className="bg-success h-2 rounded-full" style={{ width: '94.2%' }}></div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-2xl p-6 mb-4">
                  <Clock className="h-12 w-12 text-primary mx-auto" />
                </div>
                <h4 className="font-semibold text-muted mb-2 text-lg">Table Turnover</h4>
                <p className="text-4xl font-bold text-primary">1.8x</p>
                <p className="text-sm text-muted/70">per hour average</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 rounded-2xl p-6 mb-4">
                  <Users className="h-12 w-12 text-accent mx-auto" />
                </div>
                <h4 className="font-semibold text-muted mb-2 text-lg">No-Show Rate</h4>
                <p className="text-4xl font-bold text-accent">3.1%</p>
                <p className="text-sm text-muted/70">-1.2% from last month</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '31%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};