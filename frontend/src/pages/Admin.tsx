import React, { useState } from 'react';
import { 
  Users, 
  Table as TableIcon, 
  MessageSquare, 
  Settings,
  Clock,
  TrendingUp,
  UserPlus,
  Bell,
  Search,
  Filter,
  Download,
  RefreshCw,
  CheckCircle 
} from 'lucide-react';
import { useWaitlistStore } from '../store/waitlistStore';
import { useToast } from '../hooks/useToast';
import { useSSE } from '../hooks/useSSE';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { WaitlistCard } from '../components/WaitlistCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { TableGrid } from '../components/TableGrid';
import { MessageHistory } from '../components/MessageHistory';
import { formatTime } from '../lib/utils';

export const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'waitlist' | 'tables' | 'messages' | 'settings'>('waitlist');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [showTableModal, setShowTableModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const {
    customers,
    tables,
    messages,
    notifyCustomer,
    seatCustomer,
    cancelCustomer,
    releaseTable,
  } = useWaitlistStore();

  const { addToast } = useToast();

  // Simulate SSE updates
  useSSE({
    onEvent: (event) => {
      addToast({
        message: 'Waitlist updated in real-time',
        type: 'info',
      });
    },
    enabled: true,
  });

  const waitingCustomers = customers.filter(c => c.status === 'waiting');
  const notifiedCustomers = customers.filter(c => c.status === 'notified');
  const seatedCustomers = customers.filter(c => c.status === 'seated');
  const availableTables = tables.filter(t => t.status === 'available');
  const occupiedTables = tables.filter(t => t.status === 'occupied');

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  const handleNotifyCustomer = (id: string) => {
    notifyCustomer(id);
    addToast({
      message: 'Customer notified successfully',
      type: 'success',
    });
  };

  const handleSeatCustomer = (customerId: string) => {
    setSelectedCustomer(customerId);
    setShowTableModal(true);
  };

  const handleTableAssignment = (tableId: string) => {
    if (selectedCustomer) {
      seatCustomer(selectedCustomer, tableId);
      setShowTableModal(false);
      setSelectedCustomer(null);
      addToast({
        message: 'Customer seated successfully',
        type: 'success',
      });
    }
  };

  const handleCancelCustomer = (id: string) => {
    cancelCustomer(id);
    addToast({
      message: 'Customer removed from waitlist',
      type: 'info',
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      addToast({
        message: 'Data refreshed successfully',
        type: 'success',
      });
    }, 1000);
  };

  const tabs = [
    { id: 'waitlist', label: 'Waitlist', icon: Users, count: waitingCustomers.length },
    { id: 'tables', label: 'Tables', icon: TableIcon, count: availableTables.length },
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: messages.length },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-soft border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-primary rounded-xl p-3">
                <CheckCircle className="h-8 w-8 text-background" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-muted font-display">The Garden Bistro</h1>
                <p className="text-muted/70">Restaurant Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted/70">Current Wait Time</p>
                <p className="text-xl font-bold text-primary">22 minutes</p>
              </div>
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                disabled={isRefreshing}
                className="border-primary/20 hover:bg-primary/5"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button size="sm" className="shadow-medium">
                <Bell className="h-4 w-4 mr-2" />
                Alerts
                <span className="bg-error text-white text-xs px-2 py-1 rounded-full ml-2">3</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Dashboard */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-medium transition-shadow duration-300">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="bg-warning/10 rounded-2xl p-4">
                <Users className="h-8 w-8 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted/70 font-medium">Currently Waiting</p>
                <p className="text-3xl font-bold text-muted">{waitingCustomers.length}</p>
                <p className="text-xs text-success">+2 from last hour</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-medium transition-shadow duration-300">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="bg-success/10 rounded-2xl p-4">
                <TableIcon className="h-8 w-8 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted/70 font-medium">Available Tables</p>
                <p className="text-3xl font-bold text-muted">{availableTables.length}</p>
                <p className="text-xs text-muted/60">of {tables.length} total</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-medium transition-shadow duration-300">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="bg-accent/10 rounded-2xl p-4">
                <Clock className="h-8 w-8 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted/70 font-medium">Average Wait</p>
                <p className="text-3xl font-bold text-muted">22 min</p>
                <p className="text-xs text-error">+3 min from yesterday</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-medium transition-shadow duration-300">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="bg-primary/10 rounded-2xl p-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted/70 font-medium">Today's Guests</p>
                <p className="text-3xl font-bold text-muted">47</p>
                <p className="text-xs text-success">+12% vs yesterday</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-soft p-2 mb-8">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-200 flex-1 justify-center relative ${
                  activeTab === tab.id
                    ? 'bg-primary text-background shadow-medium'
                    : 'text-muted/70 hover:text-muted hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                    activeTab === tab.id
                      ? 'bg-background/20 text-background'
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'waitlist' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div>
                <h2 className="text-2xl font-bold text-muted font-display mb-2">Current Waitlist</h2>
                <p className="text-muted/70">Manage your restaurant's queue efficiently</p>
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="h-5 w-5 text-muted/50 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Input
                    placeholder="Search customers..."
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
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Walk-in
                </Button>
              </div>
            </div>

            {/* Waitlist Sections */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Waiting */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <h3 className="font-semibold text-muted">Waiting ({waitingCustomers.length})</h3>
                </div>
                <div className="space-y-4">
                  {waitingCustomers.map((customer, index) => (
                    <WaitlistCard
                      key={customer.id}
                      customer={customer}
                      position={index + 1}
                      onNotify={handleNotifyCustomer}
                      onSeat={handleSeatCustomer}
                      onCancel={handleCancelCustomer}
                    />
                  ))}
                  {waitingCustomers.length === 0 && (
                    <Card className="text-center py-8 border-dashed border-2 border-gray-200">
                      <Users className="h-8 w-8 text-muted/30 mx-auto mb-3" />
                      <p className="text-muted/60">No customers waiting</p>
                    </Card>
                  )}
                </div>
              </div>

              {/* Notified */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <h3 className="font-semibold text-muted">Notified ({notifiedCustomers.length})</h3>
                </div>
                <div className="space-y-4">
                  {notifiedCustomers.map((customer, index) => (
                    <WaitlistCard
                      key={customer.id}
                      customer={customer}
                      position={index + 1}
                      onNotify={handleNotifyCustomer}
                      onSeat={handleSeatCustomer}
                      onCancel={handleCancelCustomer}
                    />
                  ))}
                  {notifiedCustomers.length === 0 && (
                    <Card className="text-center py-8 border-dashed border-2 border-gray-200">
                      <Bell className="h-8 w-8 text-muted/30 mx-auto mb-3" />
                      <p className="text-muted/60">No pending notifications</p>
                    </Card>
                  )}
                </div>
              </div>

              {/* Recently Seated */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <h3 className="font-semibold text-muted">Recently Seated ({seatedCustomers.length})</h3>
                </div>
                <div className="space-y-4">
                  {seatedCustomers.slice(0, 5).map((customer, index) => (
                    <Card key={customer.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-muted">{customer.name}</p>
                          <p className="text-sm text-muted/60">Party of {customer.partySize}</p>
                        </div>
                        <div className="text-right">
                          <StatusBadge status={customer.status} />
                          <p className="text-xs text-muted/60 mt-1">
                            {customer.seatedTime && formatTime(customer.seatedTime)}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                  {seatedCustomers.length === 0 && (
                    <Card className="text-center py-8 border-dashed border-2 border-gray-200">
                      <CheckCircle className="h-8 w-8 text-muted/30 mx-auto mb-3" />
                      <p className="text-muted/60">No recent seatings</p>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tables' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-muted font-display mb-2">Table Management</h2>
                <p className="text-muted/70">Monitor and manage your restaurant's seating</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button size="sm" className="shadow-medium">
                  <Settings className="h-4 w-4 mr-2" />
                  Table Settings
                </Button>
              </div>
            </div>
            <TableGrid
              tables={tables}
              onReleaseTable={releaseTable}
            />
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-muted font-display mb-2">Message History</h2>
                <p className="text-muted/70">SMS communication log with customers</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Messages
                </Button>
                <Button size="sm" className="shadow-medium">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Broadcast
                </Button>
              </div>
            </div>
            <MessageHistory messages={messages} />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-muted font-display mb-2">Restaurant Settings</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle>Restaurant Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Input
                    label="Restaurant Name"
                    defaultValue="The Garden Bistro"
                  />
                  <Input
                    label="Phone Number"
                    defaultValue="(555) 001-2345"
                  />
                  <Input
                    label="Address"
                    defaultValue="123 Main Street, Downtown"
                  />
                  <Button className="w-full">Save Changes</Button>
                </CardContent>
              </Card>
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle>Waitlist Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-muted mb-2">Default Wait Time Buffer</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent">
                      <option>5 minutes</option>
                      <option>10 minutes</option>
                      <option>15 minutes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted mb-2">Maximum Party Size</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent">
                      <option>8 people</option>
                      <option>10 people</option>
                      <option>12 people</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted font-medium">SMS Notifications</span>
                      <input type="checkbox" defaultChecked className="rounded focus:ring-accent" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted font-medium">Email Alerts</span>
                      <input type="checkbox" defaultChecked className="rounded focus:ring-accent" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted font-medium">Auto-assign Tables</span>
                      <input type="checkbox" className="rounded focus:ring-accent" />
                    </div>
                  </div>
                  <Button className="w-full">Update Settings</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Table Assignment Modal */}
      <Modal
        isOpen={showTableModal}
        onClose={() => setShowTableModal(false)}
        title="Assign Table"
        className="max-w-2xl"
      >
        <div className="space-y-6">
          <p className="text-muted/70 text-center">
            Select an available table for {customers.find(c => c.id === selectedCustomer)?.name}
          </p>
          <TableGrid
            tables={availableTables}
            onTableSelect={handleTableAssignment}
            selectable={true}
          />
          {availableTables.length === 0 && (
            <div className="text-center py-12">
              <TableIcon className="h-12 w-12 text-muted/30 mx-auto mb-4" />
              <p className="text-muted/70 text-lg">No tables currently available</p>
              <p className="text-muted/50 text-sm">Please wait for a table to become free</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};