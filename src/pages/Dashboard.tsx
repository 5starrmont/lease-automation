
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  DollarSign, 
  AlertCircle,
  BarChart3,
  Calendar,
  Clock,
  Zap,
  ArrowLeftRight,
  CheckCircle2,
  BellRing
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { StatsCard, PropertyCard, ActivityCard } from '@/components/ui-custom/Card';
import { 
  getHouseCountByStatus, 
  getActiveTenantCount,
  getTotalRentCollected,
  getPendingMaintenanceCount,
  houses,
  users
} from '@/lib/data';
import { useAuth } from '@/context/AuthContext';
import { containerVariants, itemVariants } from '@/lib/animations';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role, user } = useAuth();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Sample data for upcoming events
  const upcomingEvents = [
    { 
      title: "Rent Due", 
      date: "2023-06-01", 
      type: "payment",
      description: "Monthly rent payment"
    },
    { 
      title: "New Tenant Move-in", 
      date: "2023-06-05", 
      type: "move-in",
      description: "House #103, Jane Doe"
    },
    { 
      title: "Maintenance Visit", 
      date: "2023-06-08", 
      type: "maintenance",
      description: "Plumbing check at House #204"
    },
  ];
  
  // Sample data for payments
  const recentPayments = [
    {
      tenant: "Sarah Tenant",
      house: "House #101",
      amount: 15000,
      date: "2023-05-28",
      status: "Completed"
    },
    {
      tenant: "Jane Tenant",
      house: "House #202",
      amount: 18000,
      date: "2023-05-27",
      status: "Completed"
    },
    {
      tenant: "Mark Tenant",
      house: "House #305",
      amount: 12000,
      date: "2023-05-25",
      status: "Completed"
    }
  ];
  
  // Sample data for maintenance requests
  const maintenanceRequests = [
    {
      house: "House #101",
      issue: "Leaking roof",
      reportedBy: "Sarah Tenant",
      date: "2023-05-20",
      status: "In Progress",
      priority: "High"
    },
    {
      house: "House #204",
      issue: "Broken window",
      reportedBy: "John Tenant",
      date: "2023-05-22",
      status: "Pending",
      priority: "Medium"
    },
    {
      house: "House #305",
      issue: "Faulty electrical socket",
      reportedBy: "Mark Tenant",
      date: "2023-05-24",
      status: "Pending",
      priority: "Low"
    }
  ];
  
  // Randomize recent activities with timestamps in recent days
  const recentActivities = [
    { 
      name: "Sarah Tenant", 
      action: "made a rent payment of KSh 15,000", 
      time: "2 hours ago",
      avatar: users.find(u => u.name === "Sarah Tenant")?.avatar
    },
    { 
      name: "John Landlord", 
      action: "added a new house in Westlands", 
      time: "Yesterday",
      avatar: users.find(u => u.name === "John Landlord")?.avatar
    },
    { 
      name: "Mike Caretaker", 
      action: "marked a maintenance request as completed", 
      time: "3 days ago",
      avatar: users.find(u => u.name === "Mike Caretaker")?.avatar
    },
    { 
      name: "Jane Tenant", 
      action: "requested maintenance for plumbing issues", 
      time: "4 days ago",
      avatar: users.find(u => u.name === "Jane Tenant")?.avatar
    },
  ];
  
  // KPLC token purchase history (for tenants)
  const tokenHistory = [
    {
      tokenNumber: "1234-5678-9012-3456",
      amount: 1000,
      units: 62.5,
      date: "2023-05-28",
      status: "Valid"
    },
    {
      tokenNumber: "8765-4321-0987-6543",
      amount: 500,
      units: 31.25,
      date: "2023-05-15",
      status: "Used"
    },
    {
      tokenNumber: "2468-1357-9080-7060",
      amount: 2000,
      units: 125,
      date: "2023-05-01",
      status: "Used"
    }
  ];
  
  const renderRoleBasedContent = () => {
    switch (role) {
      case 'admin':
        return (
          <Tabs defaultValue="overview" className="w-full mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">System Overview</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="activity">Activity Log</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>System Health</CardTitle>
                    <CardDescription>Overview of system performance</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500" />
                      <div>
                        <p className="text-sm font-medium">API Status</p>
                        <p className="text-xs text-muted-foreground">100% Uptime</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500" />
                      <div>
                        <p className="text-sm font-medium">Database</p>
                        <p className="text-xs text-muted-foreground">Connected</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500" />
                      <div>
                        <p className="text-sm font-medium">SMS Gateway</p>
                        <p className="text-xs text-muted-foreground">Operational</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500" />
                      <div>
                        <p className="text-sm font-medium">Payment Processing</p>
                        <p className="text-xs text-muted-foreground">Active</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">View System Logs</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Usage</CardTitle>
                    <CardDescription>User activity in the last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Total Login Events</span>
                        <span className="font-medium">1,248</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Active Users</span>
                        <span className="font-medium">{users.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>New Registrations</span>
                        <span className="font-medium">8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Password Resets</span>
                        <span className="font-medium">3</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">Generate Report</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Handle user accounts and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.slice(0, 5).map((user, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-2">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                              {user.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.role}</p>
                          </div>
                        </div>
                        <Badge variant={user.is_active ? "default" : "outline"}>
                          {user.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">Add User</Button>
                  <Button variant="outline" size="sm">View All</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>System Activity</CardTitle>
                  <CardDescription>Recent events across the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <ActivityCard
                        key={index}
                        avatar={activity.avatar}
                        name={activity.name}
                        action={activity.action}
                        time={activity.time}
                      />
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">Export Activity Log</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        );
        
      case 'landlord':
        return (
          <Tabs defaultValue="overview" className="w-full mt-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Financial Overview</CardTitle>
                      <CardDescription>Monthly rent collection</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 size={64} className="mx-auto text-muted-foreground mb-4" />
                        <p className="text-sm text-muted-foreground">Chart visualization would appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Scheduled activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingEvents.map((event, index) => (
                        <div key={index} className="flex items-start gap-2 border-b pb-3">
                          {event.type === 'payment' && <DollarSign className="h-5 w-5 text-blue-500 mt-0.5" />}
                          {event.type === 'move-in' && <ArrowLeftRight className="h-5 w-5 text-green-500 mt-0.5" />}
                          {event.type === 'maintenance' && <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />}
                          <div>
                            <p className="text-sm font-medium">{event.title}</p>
                            <p className="text-xs text-muted-foreground">{event.date}</p>
                            <p className="text-xs">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">View Calendar</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="properties">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {houses.slice(0, 6).map((house) => (
                  <PropertyCard
                    key={house.id}
                    image={house.image || ''}
                    title={`House ${house.house_number}`}
                    location={house.location}
                    price={house.rent_amount}
                    status={house.status}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Payments</CardTitle>
                      <CardDescription>Rent collection history</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">Export</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPayments.map((payment, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center gap-3">
                          <DollarSign className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="text-sm font-medium">{payment.tenant}</p>
                            <p className="text-xs text-muted-foreground">{payment.house}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">KSh {payment.amount.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{payment.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">View All Payments</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="maintenance">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Maintenance Requests</CardTitle>
                      <CardDescription>Issues reported by tenants</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">Filter</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {maintenanceRequests.map((request, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-start gap-3">
                          <AlertCircle className={`h-5 w-5 mt-0.5 ${
                            request.priority === 'High' ? 'text-red-500' : 
                            request.priority === 'Medium' ? 'text-orange-500' : 'text-blue-500'
                          }`} />
                          <div>
                            <p className="text-sm font-medium">{request.house}</p>
                            <p className="text-xs">{request.issue}</p>
                            <p className="text-xs text-muted-foreground">Reported by: {request.reportedBy}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={
                            request.status === 'Pending' ? 'outline' : 
                            request.status === 'In Progress' ? 'secondary' : 'default'
                          }>
                            {request.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{request.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">View All Requests</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        );
        
      case 'tenant':
        return (
          <Tabs defaultValue="overview" className="w-full mt-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="kplc">KPLC Tokens</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Rental Summary</CardTitle>
                    <CardDescription>Your current housing details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">House Number</span>
                        <span className="font-medium">House #101</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Monthly Rent</span>
                        <span className="font-medium">KSh 15,000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Next Due Date</span>
                        <span className="font-medium">June 1, 2023</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">KPLC Meter Number</span>
                        <span className="font-medium">12345678</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Lease Term</span>
                        <span className="font-medium">Jan 1, 2023 - Dec 31, 2023</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">View Lease Details</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Payments</CardTitle>
                    <CardDescription>Stay on top of your financial obligations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="rounded-lg border p-4 bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">June Rent</span>
                          <Badge>Due in 3 days</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Amount:</span>
                          <span>KSh 15,000</span>
                        </div>
                        <div className="mt-4">
                          <Button className="w-full">Pay Now</Button>
                        </div>
                      </div>
                      
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Water Bill</span>
                          <Badge variant="outline">Due in 7 days</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Amount:</span>
                          <span>KSh 1,200</span>
                        </div>
                        <div className="mt-4">
                          <Button variant="outline" className="w-full">Pay Now</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Payment History</CardTitle>
                      <CardDescription>Record of your rent payments</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPayments.slice(0, 3).map((payment, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center gap-3">
                          <DollarSign className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="text-sm font-medium">Rent Payment</p>
                            <p className="text-xs text-muted-foreground">{payment.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">KSh {payment.amount.toLocaleString()}</p>
                          <Button variant="link" size="sm" className="h-auto p-0">View Receipt</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">View All Payments</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="kplc">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Purchase Token</CardTitle>
                      <CardDescription>Buy electricity for your meter</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Meter Number</span>
                          <span className="font-medium">12345678</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Last Purchase</span>
                          <span className="font-medium">May 28, 2023</span>
                        </div>
                        <div className="pt-2">
                          <Button className="w-full">Purchase New Token</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Token History</CardTitle>
                      <CardDescription>Your KPLC token purchase history</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {tokenHistory.map((token, index) => (
                          <div key={index} className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center gap-3">
                              <Zap className={`h-5 w-5 ${token.status === 'Valid' ? 'text-green-500' : 'text-blue-500'}`} />
                              <div>
                                <p className="text-sm font-medium">{token.tokenNumber}</p>
                                <p className="text-xs text-muted-foreground">{token.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">KSh {token.amount.toLocaleString()} ({token.units} units)</p>
                              <Badge variant={token.status === 'Valid' ? 'default' : 'outline'}>
                                {token.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">View All Tokens</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="maintenance">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Maintenance Requests</CardTitle>
                    <CardDescription>Track your reported issues</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {maintenanceRequests.slice(0, 2).map((request, index) => (
                        <div key={index} className="flex items-start gap-3 border-b pb-3">
                          <AlertCircle className={`h-5 w-5 mt-0.5 ${
                            request.priority === 'High' ? 'text-red-500' : 
                            request.priority === 'Medium' ? 'text-orange-500' : 'text-blue-500'
                          }`} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{request.issue}</p>
                              <Badge variant={
                                request.status === 'Pending' ? 'outline' : 
                                request.status === 'In Progress' ? 'secondary' : 'default'
                              }>
                                {request.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">Reported on: {request.date}</p>
                            <p className="text-xs text-muted-foreground">Priority: {request.priority}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">View All</Button>
                    <Button size="sm">Report New Issue</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Submit Maintenance Request</CardTitle>
                    <CardDescription>Report an issue with your rental</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid w-full items-center gap-1.5">
                        <label htmlFor="issue" className="text-sm font-medium">Issue Type</label>
                        <select id="issue" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                          <option value="">Select an issue type</option>
                          <option value="plumbing">Plumbing</option>
                          <option value="electrical">Electrical</option>
                          <option value="structural">Structural</option>
                          <option value="appliance">Appliance</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div className="grid w-full items-center gap-1.5">
                        <label htmlFor="priority" className="text-sm font-medium">Priority</label>
                        <select id="priority" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                          <option value="">Select priority</option>
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                      
                      <div className="grid w-full gap-1.5">
                        <label htmlFor="description" className="text-sm font-medium">Description</label>
                        <textarea
                          id="description"
                          placeholder="Describe the issue in detail"
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Submit Request</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        );
        
      case 'caretaker':
        return (
          <Tabs defaultValue="overview" className="w-full mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="moves">Move In/Out</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Houses Overview</CardTitle>
                      <CardDescription>Properties under your management</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {houses.slice(0, 4).map((house) => (
                          <div key={house.id} className="flex items-start gap-3 border rounded-md p-3">
                            <Home className={`h-5 w-5 mt-0.5 ${house.status === 'Occupied' ? 'text-green-500' : 'text-blue-500'}`} />
                            <div>
                              <p className="text-sm font-medium">House #{house.house_number}</p>
                              <p className="text-xs">{house.location}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant={house.status === 'Occupied' ? 'default' : 'outline'}>
                                  {house.status}
                                </Badge>
                                {house.status === 'Occupied' && (
                                  <span className="text-xs text-muted-foreground">Since: Jan 15, 2023</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">View All Houses</Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Scheduled Events</CardTitle>
                    <CardDescription>Upcoming activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 border-b pb-3">
                        <ArrowLeftRight className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">New Tenant Move-in</p>
                          <p className="text-xs">House #103, Jane Doe</p>
                          <p className="text-xs text-muted-foreground">June 5, 2023</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 border-b pb-3">
                        <ArrowLeftRight className="h-5 w-5 text-red-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Tenant Move-out</p>
                          <p className="text-xs">House #205, Mark Smith</p>
                          <p className="text-xs text-muted-foreground">June 15, 2023</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 pb-3">
                        <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Maintenance Visit</p>
                          <p className="text-xs">House #204, Plumbing check</p>
                          <p className="text-xs text-muted-foreground">June 8, 2023</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">View Calendar</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="maintenance">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Maintenance Requests</CardTitle>
                      <CardDescription>Issues requiring your attention</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">Filter</Button>
                      <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background">
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {maintenanceRequests.map((request, index) => (
                      <div key={index} className="flex items-start gap-3 border rounded-md p-3">
                        <AlertCircle className={`h-5 w-5 mt-0.5 ${
                          request.priority === 'High' ? 'text-red-500' : 
                          request.priority === 'Medium' ? 'text-orange-500' : 'text-blue-500'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{request.house}</p>
                            <Badge variant={
                              request.status === 'Pending' ? 'outline' : 
                              request.status === 'In Progress' ? 'secondary' : 'default'
                            }>
                              {request.status}
                            </Badge>
                          </div>
                          <p className="text-xs">{request.issue}</p>
                          <p className="text-xs text-muted-foreground">Reported by: {request.reportedBy}</p>
                          <p className="text-xs text-muted-foreground">Date: {request.date}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button variant="outline" size="sm">Update Status</Button>
                            <Button variant="outline" size="sm">Schedule Visit</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">Generate Report</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="moves">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Move-ins</CardTitle>
                    <CardDescription>New tenants scheduled to move in</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 border-b pb-3">
                        <ArrowLeftRight className="h-5 w-5 text-green-500 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Jane Doe</p>
                            <Badge>Scheduled</Badge>
                          </div>
                          <p className="text-xs">House #103</p>
                          <p className="text-xs text-muted-foreground">Move-in Date: June 5, 2023</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button variant="outline" size="sm">Prepare Checklist</Button>
                            <Button size="sm">Complete Move-in</Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <ArrowLeftRight className="h-5 w-5 text-green-500 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">John Smith</p>
                            <Badge>Scheduled</Badge>
                          </div>
                          <p className="text-xs">House #301</p>
                          <p className="text-xs text-muted-foreground">Move-in Date: June 12, 2023</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button variant="outline" size="sm">Prepare Checklist</Button>
                            <Button size="sm">Complete Move-in</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Move-outs</CardTitle>
                    <CardDescription>Tenants scheduled to vacate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 border-b pb-3">
                        <ArrowLeftRight className="h-5 w-5 text-red-500 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Mark Smith</p>
                            <Badge variant="destructive">Moving Out</Badge>
                          </div>
                          <p className="text-xs">House #205</p>
                          <p className="text-xs text-muted-foreground">Move-out Date: June 15, 2023</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button variant="outline" size="sm">Inspection Checklist</Button>
                            <Button size="sm">Process Move-out</Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <ArrowLeftRight className="h-5 w-5 text-red-500 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Sarah Johnson</p>
                            <Badge variant="destructive">Moving Out</Badge>
                          </div>
                          <p className="text-xs">House #408</p>
                          <p className="text-xs text-muted-foreground">Move-out Date: June 30, 2023</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button variant="outline" size="sm">Inspection Checklist</Button>
                            <Button size="sm">Process Move-out</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        );
        
      default:
        return (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatsCard
              title="Total Houses"
              value={houses.length}
              icon={<Home size={20} />}
              description={`${getHouseCountByStatus('Occupied')} occupied, ${getHouseCountByStatus('Vacant')} vacant`}
            />
            
            <StatsCard
              title="Active Tenants"
              value={getActiveTenantCount()}
              icon={<Users size={20} />}
              description="People currently renting"
            />
            
            <StatsCard
              title="Rent Collected"
              value={`KSh ${getTotalRentCollected().toLocaleString()}`}
              icon={<DollarSign size={20} />}
              description="Total payments received"
              trend={{ value: 12, isPositive: true }}
            />
            
            <StatsCard
              title="Pending Maintenance"
              value={getPendingMaintenanceCount()}
              icon={<AlertCircle size={20} />}
              description="Issues to be resolved"
            />
          </div>
        );
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-auto">
          <motion.div 
            className="container py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 space-y-2">
              <h1 className="heading-1">Dashboard</h1>
              <p className="text-muted-foreground">Welcome{user ? `, ${user.name}` : ''} to your Rental Management System dashboard</p>
            </div>
            
            {/* Stats Cards */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {renderRoleBasedContent()}
            </motion.div>
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
