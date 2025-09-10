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
  Eye,
  Pause,
  Play,
  Trash2,
  MapPin,
  Calendar,
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

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleRestaurantStatus = (id: string) => {
    setRestaurants(
      restaurants.map((r) =>
        r.id === id ? { ...r, status: r.status === 'active' ? 'inactive' : 'active' } : r
      )
    );
  };

  const removeRestaurant = (id: string) => {
    setRestaurants(restaurants.filter((r) => r.id !== id));
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
          tableReady:
            'Hi {name}! Your table for {partySize} at {restaurant} is ready. Please arrive within 15 minutes.',
          reminder: 'Please reply quickly with Y (Yes) or N (No) so we can continue further.',
          cancelled:
            'Hi {name}, your reservation at {restaurant} has been cancelled due to no response.',
        },
      },
    };

    setRestaurants([...restaurants, restaurant]);
    setNewRestaurant({ name: '', city: '', contactEmail: '', contactPhone: '' });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-8 text-ink">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Restaurant Management</h1>
          <p className="text-muted">Manage all restaurants on the platform</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Restaurant
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-panel border border-border">
            <DialogHeader>
              <DialogTitle className="font-display">Add New Restaurant</DialogTitle>
              <DialogDescription className="text-muted">
                Create a new restaurant profile on the platform
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-ink">
                  Restaurant Name
                </Label>
                <Input
                  id="name"
                  value={newRestaurant.name}
                  onChange={(e) =>
                    setNewRestaurant({
                      ...newRestaurant,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter restaurant name"
                  className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>

              <div>
                <Label htmlFor="city" className="text-ink">
                  City
                </Label>
                <Input
                  id="city"
                  value={newRestaurant.city}
                  onChange={(e) =>
                    setNewRestaurant({
                      ...newRestaurant,
                      city: e.target.value,
                    })
                  }
                  placeholder="Enter city"
                  className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-ink">
                  Contact Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newRestaurant.contactEmail}
                  onChange={(e) =>
                    setNewRestaurant({
                      ...newRestaurant,
                      contactEmail: e.target.value,
                    })
                  }
                  placeholder="manager@restaurant.com"
                  className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-ink">
                  Contact Phone
                </Label>
                <Input
                  id="phone"
                  value={newRestaurant.contactPhone}
                  onChange={(e) =>
                    setNewRestaurant({
                      ...newRestaurant,
                      contactPhone: e.target.value,
                    })
                  }
                  placeholder="(555) 123-4567"
                  className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>

              <Button
                onClick={addRestaurant}
                disabled={!newRestaurant.name || !newRestaurant.city}
                className="w-full bg-primary hover:bg-primary-600 text-white"
              >
                Add Restaurant
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted" />
        <Input
          placeholder="Search restaurants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-border focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>

      {/* Restaurants Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <Card key={restaurant.id} className="overflow-hidden bg-panel border border-border shadow-soft">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-ink/70" />
                    <span>{restaurant.name}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2 text-muted">
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
                <Badge
                  className={
                    restaurant.status === 'active'
                      ? 'bg-success/10 text-success border-0'
                      : 'bg-ink/10 text-ink border-0'
                  }
                >
                  {restaurant.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{restaurant.tables?.length || 0}</p>
                  <p className="text-xs text-muted">Tables</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-info">12</p>
                  <p className="text-xs text-muted">Waiting</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">28</p>
                  <p className="text-xs text-muted">Seated Today</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href="/admin" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full border-border text-ink hover:bg-off">
                    <Eye className="h-4 w-4 mr-2" />
                    View Dashboard
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleRestaurantStatus(restaurant.id)}
                  className="border-border text-ink hover:bg-off"
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

                <Button variant="destructive" size="sm" onClick={() => removeRestaurant(restaurant.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-12 w-12 text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No restaurants found</h3>
          <p className="text-muted">
            {searchTerm ? 'Try adjusting your search term' : 'Add your first restaurant to get started'}
          </p>
        </div>
      )}
    </div>
  );
}
