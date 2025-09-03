'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Search, 
  MoreHorizontal, 
  Shield, 
  Mail,
  Calendar,
  Building,
  Plus
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'restaurant_admin' | 'staff';
  restaurant?: string;
  lastActive: Date;
  status: 'active' | 'inactive' | 'pending';
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Hermann Sein',
    email: 'hermann@quickcheck.com',
    role: 'super_admin',
    lastActive: new Date(Date.now() - 30 * 60 * 1000),
    status: 'active',
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    email: 'maria@bellavista.com',
    role: 'restaurant_admin',
    restaurant: 'Bella Vista',
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'active',
  },
  {
    id: '3',
    name: 'James Park',
    email: 'james@oceanbreeze.com',
    role: 'restaurant_admin',
    restaurant: 'Ocean Breeze',
    lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: 'active',
  },
  {
    id: '4',
    name: 'Sarah Chen',
    email: 'sarah@mountainview.com',
    role: 'restaurant_admin',
    restaurant: 'Mountain View Bistro',
    lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: 'inactive',
  },
  {
    id: '5',
    name: 'Alex Thompson',
    email: 'alex@bellavista.com',
    role: 'staff',
    restaurant: 'Bella Vista',
    lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000),
    status: 'active',
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.restaurant?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'super_admin':
        return 'bg-red-100 text-red-800';
      case 'restaurant_admin':
        return 'bg-blue-100 text-blue-800';
      case 'staff':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(u => 
      u.id === id 
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
        : u
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage platform users and permissions</p>
        </div>
        
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Invite User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              Platform-wide
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Super Admins</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.role === 'super_admin').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Full access
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Restaurant Admins</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.role === 'restaurant_admin').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Location managers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Users</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {user.email}
                      </span>
                      {user.restaurant && (
                        <span className="flex items-center">
                          <Building className="h-3 w-3 mr-1" />
                          {user.restaurant}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Last active: {formatDistanceToNow(user.lastActive, { addSuffix: true })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge className={getRoleColor(user.role)}>
                    {user.role.replace('_', ' ')}
                  </Badge>
                  
                  <Badge className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleUserStatus(user.id)}
                  >
                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search term' : 'No users match your criteria'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}