'use client';

import { useEffect, useMemo, useState } from 'react';
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
import {
  Building,
  Plus,
  Search,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Hash,
  Power,
  Trash2,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// ----------------- API + Types -----------------

const API_BASE = (process.env.NEXT_PUBLIC_API_ENDPOINT_PREFTECH || '').replace(/\/$/, '');

type GetRestaurantsResponse = {
  count: number;
  restaurants: Array<{
    _id: string;
    name: string;
    city: string;
    email?: string;
    phone?: string;
    businessNumber?: string;
    logo?: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt?: string;
    createdBy?: { _id: string; email: string };
    __v?: number;
  }>;
};

type CreateRestaurantPayload = {
  name: string;
  city: string;
  email: string;
  phone: string;
  businessNumber: string;
};

type CreatedRestaurant = {
  _id: string;
  name: string;
  city: string;
  email?: string;
  phone?: string;
  businessNumber?: string;
  logo?: string | null;
  isActive: boolean;
  createdAt: string;
};

// unified UI type
type RestaurantUI = {
  id: string;
  name: string;
  city: string;
  email?: string;
  phone?: string;
  businessNumber?: string;
  isActive: boolean;
  createdAt?: string;
};

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const token =
    (typeof window !== 'undefined' && (localStorage.getItem('token') || localStorage.getItem('preftech_token'))) ||
    null;
  if (!token) throw new Error('Missing auth token. Please sign in first.');

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
    credentials: 'include',
    cache: 'no-store',
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    // non-JSON; leave as null
  }

  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data as T;
}

// ----------------- Component -----------------

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<RestaurantUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState<CreateRestaurantPayload>({
    name: '',
    city: '',
    email: '',
    phone: '',
    businessNumber: '',
  });

  // Row action states
  const [workingToggle, setWorkingToggle] = useState<Record<string, boolean>>({});
  const [workingDelete, setWorkingDelete] = useState<Record<string, boolean>>({});
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Fetch (GET /api/super-admin/restaurants)
  async function loadRestaurants() {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await api<GetRestaurantsResponse>('/api/super-admin/restaurants/');
      const mapped: RestaurantUI[] = (data.restaurants || []).map((r) => ({
        id: r._id,
        name: r.name,
        city: r.city,
        email: r.email,
        phone: r.phone,
        businessNumber: r.businessNumber,
        isActive: !!r.isActive,
        createdAt: r.createdAt,
      }));
      setRestaurants(mapped);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to load restaurants');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRestaurants();
  }, []);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return restaurants;
    return restaurants.filter(
      (r) => r.name.toLowerCase().includes(q) || r.city.toLowerCase().includes(q)
    );
  }, [restaurants, searchTerm]);

  // Create (POST /api/super-admin/restaurants)
  const addRestaurant = async () => {
    if (creating) return;
    setCreating(true);
    setErrorMsg(null);
    try {
      const created = await api<CreatedRestaurant>('/api/super-admin/restaurants/', {
        method: 'POST',
        body: JSON.stringify(newRestaurant),
      });

      // optimistic merge
      setRestaurants((prev) => [
        {
          id: created._id,
          name: created.name,
          city: created.city,
          email: created.email,
          phone: created.phone,
          businessNumber: created.businessNumber,
          isActive: !!created.isActive,
          createdAt: created.createdAt,
        },
        ...prev,
      ]);

      // reset form
      setNewRestaurant({ name: '', city: '', email: '', phone: '', businessNumber: '' });
      setIsAddDialogOpen(false);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to create restaurant');
    } finally {
      setCreating(false);
    }
  };

  // Toggle status (PATCH /api/super-admin/restaurants/:id/toggle-status)
  const toggleStatus = async (id: string) => {
    if (workingToggle[id]) return;
    setWorkingToggle((s) => ({ ...s, [id]: true }));
    const prev = restaurants.find((r) => r.id === id);
    if (!prev) return;

    // optimistic UI
    setRestaurants((list) => list.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)));

    try {
      await api(`/api/super-admin/restaurants/${id}/toggle-status`, {
        method: 'PATCH',
      });
      // No-op; optimistic already applied
    } catch (err: any) {
      // rollback
      setRestaurants((list) => list.map((r) => (r.id === id ? { ...r, isActive: prev.isActive } : r)));
      setErrorMsg(err?.message || 'Failed to toggle status');
    } finally {
      setWorkingToggle((s) => ({ ...s, [id]: false }));
    }
  };

  // Delete (DELETE /api/super-admin/restaurants/:id)
  const deleteRestaurant = async (id: string) => {
    if (workingDelete[id]) return;
    setWorkingDelete((s) => ({ ...s, [id]: true }));

    // optimistic remove
    const prevList = restaurants;
    setRestaurants((list) => list.filter((r) => r.id !== id));

    try {
      await api(`/api/super-admin/restaurants/${id}`, {
        method: 'DELETE',
      });
      setConfirmDeleteId(null);
    } catch (err: any) {
      // rollback
      setRestaurants(prevList);
      setErrorMsg(err?.message || 'Failed to delete restaurant');
    } finally {
      setWorkingDelete((s) => ({ ...s, [id]: false }));
    }
  };

  return (
    <div className="space-y-8 text-ink">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-1">Restaurant Management</h1>
          <p className="text-muted">Add, activate/deactivate, and remove restaurants.</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-600 text-white shadow">
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
                <Label htmlFor="name" className="text-ink">Restaurant Name</Label>
                <Input
                  id="name"
                  value={newRestaurant.name}
                  onChange={(e) => setNewRestaurant((s) => ({ ...s, name: e.target.value }))}
                  placeholder="Enter restaurant name"
                  className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>

              <div>
                <Label htmlFor="city" className="text-ink">City</Label>
                <Input
                  id="city"
                  value={newRestaurant.city}
                  onChange={(e) => setNewRestaurant((s) => ({ ...s, city: e.target.value }))}
                  placeholder="Enter city"
                  className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-ink">Contact Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newRestaurant.email}
                    onChange={(e) => setNewRestaurant((s) => ({ ...s, email: e.target.value }))}
                    placeholder="manager@restaurant.com"
                    className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-ink">Contact Phone</Label>
                  <Input
                    id="phone"
                    value={newRestaurant.phone}
                    onChange={(e) => setNewRestaurant((s) => ({ ...s, phone: e.target.value }))}
                    placeholder="+91 00000 00000"
                    className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="businessNumber" className="text-ink">Business Number</Label>
                <Input
                  id="businessNumber"
                  value={newRestaurant.businessNumber}
                  onChange={(e) => setNewRestaurant((s) => ({ ...s, businessNumber: e.target.value }))}
                  placeholder="BN-XXXXX"
                  className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>

              <Button
                onClick={addRestaurant}
                disabled={
                  creating ||
                  !newRestaurant.name ||
                  !newRestaurant.city ||
                  !newRestaurant.email ||
                  !newRestaurant.phone ||
                  !newRestaurant.businessNumber
                }
                className="w-full bg-primary hover:bg-primary-600 text-white"
              >
                {creating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Adding…
                  </>
                ) : (
                  <>Add Restaurant</>
                )}
              </Button>

              {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
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

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-44 rounded-xl border border-border bg-off/60 animate-pulse" />
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && errorMsg && (
        <div className="text-red-600 text-sm">{errorMsg}</div>
      )}

      {/* Grid */}
      {!loading && !errorMsg && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((r) => {
            const created = r.createdAt ? new Date(r.createdAt) : null;
            const toggling = !!workingToggle[r.id];
            const deleting = !!workingDelete[r.id];

            return (
              <Card
                key={r.id}
                className="overflow-hidden bg-panel border border-border shadow-soft hover:shadow-lg transition-shadow rounded-xl"
              >
                <CardHeader className="bg-gradient-to-r from-off to-transparent">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-ink/70" />
                        <span>{r.name}</span>
                      </CardTitle>
                      <CardDescription className="flex flex-wrap items-center gap-4 mt-2 text-muted">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {r.city || '—'}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {created ? formatDistanceToNow(created, { addSuffix: true }) : '—'}
                        </span>
                      </CardDescription>
                    </div>

                    <Badge
                      className={`relative pl-6 ${
                        r.isActive ? 'bg-success/10 text-success border-0' : 'bg-ink/10 text-ink border-0'
                      }`}
                    >
                      {/* live dot */}
                      <span
                        className={`absolute left-2 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full ${
                          r.isActive ? 'bg-emerald-500' : 'bg-zinc-400'
                        }`}
                      />
                      {r.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-4">
                  {/* Contacts row */}
                  <div className="text-sm text-muted grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {r.email && (
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {r.email}
                      </div>
                    )}
                    {r.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {r.phone}
                      </div>
                    )}
                    {r.businessNumber && (
                      <div className="flex items-center">
                        <Hash className="h-4 w-4 mr-2" />
                        {r.businessNumber}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex gap-2">
                    <Button
                      variant={r.isActive ? 'outline' : 'default'}
                      onClick={() => toggleStatus(r.id)}
                      disabled={toggling || deleting}
                      className={
                        r.isActive
                          ? 'border-border text-ink hover:bg-off'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }
                      size="sm"
                    >
                      {toggling ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Updating…
                        </>
                      ) : (
                        <>
                          <Power className="h-4 w-4 mr-2" />
                          {r.isActive ? 'Deactivate' : 'Activate'}
                        </>
                      )}
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() => setConfirmDeleteId(r.id)}
                      disabled={toggling || deleting}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      {deleting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Deleting…
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {!loading && !errorMsg && filtered.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-12 w-12 text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No restaurants found</h3>
          <p className="text-muted">
            {searchTerm ? 'Try adjusting your search term' : 'Add your first restaurant to get started'}
          </p>
        </div>
      )}

      {/* Confirm Delete Dialog */}
      <Dialog open={!!confirmDeleteId} onOpenChange={(open) => !open && setConfirmDeleteId(null)}>
        <DialogContent className="bg-panel border border-border">
          <DialogHeader>
            <DialogTitle>Delete Restaurant</DialogTitle>
            <DialogDescription className="text-muted">
              This action cannot be undone. This will permanently remove the restaurant from the platform.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setConfirmDeleteId(null)}
              className="border-border text-ink hover:bg-off"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => confirmDeleteId && deleteRestaurant(confirmDeleteId)}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
