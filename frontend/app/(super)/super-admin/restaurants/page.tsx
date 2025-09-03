'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { mockSuperAdminRestaurants } from '@/lib/mock-data';
import { Restaurant } from '@/lib/types';
import { 
  Building, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Eye, 
  Pause, 
  Play,
  Trash2,
  MapPin,
  Calendar
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState(mockSuperAdminRestaurants);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    city: '',
    contactEmail: '',
    contactPhone: '',
  });

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleRestaurantStatus = (id: string) => {
    setRestaurants(restaurants.map(r => 
      r.id === id 
        ? { ...r, status: r.status === 'active' ? 'inactive' : 'active' }
        : r
    ));
  };

  const removeRestaurant = (id: string) => {
    setRestaurants(restaurants.filter(r => r.id !== id));
  };

  const addRestaurant = () => {
    const restaurant: Restaurant = {
      id: `restaurant-${Date.now()}`,
      name: newRestaurant.name,
      city: newRestaurant.city,
      status: 'active',
      createdAt: new Date(),
      tables: [],
      settings: {
        gracePeriodMinutes: 15,
        reminderDelayMinutes: 7,
        smsTemplates: {
          tableReady: 'Hi {name}! Your table for {partySize} at {restaurant} is ready. Please arrive within 15 minutes.',
          reminder: 'Please reply quickly with Y (Yes) or N (No) so we can continue further.',
          cancelled: 'Hi {name}, your reservation at {restaurant} has been cancelled due to no response.',
        },
      },
    };

    setRestaurants([...restaurants, restaurant]);
    setNewRestaurant({ name: '', city: '', contactEmail: '', contactPhone: '' });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Restaurant Management</h1>
          <p className="text-gray-600">Manage all restaurants on the platform</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Restaurant
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Restaurant</DialogTitle>
              <DialogDescription>
                Create a new restaurant profile on the platform
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Restaurant Name</Label>
                <Input
                  id="name"
                  value={newRestaurant.name}
                  onChange={(e) => setNewRestaurant({
                    ...newRestaurant,
                    name: e.target.value
                  })}
                  placeholder="Enter restaurant name"
                />
              </div>
              
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={newRestaurant.city}
                  onChange={(e) => setNewRestaurant({
                    ...newRestaurant,
                    city: e.target.value
                  })}
                  placeholder="Enter city"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newRestaurant.contactEmail}
                  onChange={(e) => setNewRestaurant({
                    ...newRestaurant,
                    contactEmail: e.target.value
                  })}
                  placeholder="manager@restaurant.com"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Contact Phone</Label>
                <Input
                  id="phone"
                  value={newRestaurant.contactPhone}
                  onChange={(e) => setNewRestaurant({
                    ...newRestaurant,
                    contactPhone: e.target.value
                  })}
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <Button 
                onClick={addRestaurant}
                disabled={!newRestaurant.name || !newRestaurant.city}
                className="w-full"
              >
                Add Restaurant
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search restaurants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Restaurants Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <Card key={restaurant.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-gray-600" />
                    <span>{restaurant.name}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-4 mt-2">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {restaurant.city}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDistanceToNow(restaurant.createdAt, { addSuffix: true })}
                    </span>
                  </CardDescription>
                </div>
                <Badge className={
                  restaurant.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }>
                  {restaurant.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {restaurant.tables?.length || 0}
                  </p>
                  <p className="text-xs text-gray-500">Tables</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">12</p>
                  <p className="text-xs text-gray-500">Waiting</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">28</p>
                  <p className="text-xs text-gray-500">Seated Today</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href="/admin" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View Dashboard
                  </Button>
                </Link>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleRestaurantStatus(restaurant.id)}
                >
                  {restaurant.status === 'active' ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Activate
                    </>
                  )}
                </Button>
                
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeRestaurant(restaurant.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No restaurants found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search term' : 'Add your first restaurant to get started'}
          </p>
        </div>
      )}
    </div>
  );
}