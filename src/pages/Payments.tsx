
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, MoreVertical, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FloatingActionButton } from '@/components/ui-custom/Button';
import { StatusBadge, TypeBadge } from '@/components/ui-custom/Badge';
import { payments, users, tenants, getUserById, getTenantByUserId } from '@/lib/data';
import { containerVariants, itemVariants } from '@/lib/animations';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Payments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Get payments with user data
  const paymentsWithDetails = payments.map(payment => {
    const tenant = tenants.find(t => t.id === payment.tenant_id);
    const user = tenant ? getUserById(tenant.user_id) : undefined;
    
    return {
      ...payment,
      tenant,
      user
    };
  });
  
  // Filter payments based on search term
  const filteredPayments = paymentsWithDetails.filter(payment => 
    payment.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Type filter
  const [typeFilter, setTypeFilter] = useState<'All' | 'Rent' | 'Water' | 'Penalty' | 'Other'>('All');
  
  const getFilteredPayments = () => {
    if (typeFilter === 'All') {
      return filteredPayments;
    }
    return filteredPayments.filter(payment => payment.type === typeFilter);
  };
  
  // Calculate type counts
  const rentCount = payments.filter(payment => payment.type === 'Rent').length;
  const waterCount = payments.filter(payment => payment.type === 'Water').length;
  const penaltyCount = payments.filter(payment => payment.type === 'Penalty').length;
  const otherCount = payments.filter(payment => payment.type === 'Other').length;
  
  // Calculate total amount
  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  
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
              <h1 className="heading-1">Payments</h1>
              <p className="text-muted-foreground">Track and manage all payment transactions</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg border p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ArrowDownRight className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Collected</p>
                    <p className="text-2xl font-bold">KSh {totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border p-4 shadow-sm">
                <p className="text-sm text-muted-foreground mb-1">Recent Activity</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowDownRight className="h-4 w-4 text-green-500" />
                      <p className="text-sm">Rent Payment</p>
                    </div>
                    <p className="text-sm font-medium">+15,000</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowDownRight className="h-4 w-4 text-green-500" />
                      <p className="text-sm">Water Bill</p>
                    </div>
                    <p className="text-sm font-medium">+800</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border p-4 shadow-sm md:col-span-2">
                <p className="text-sm text-muted-foreground mb-2">Payment Distribution</p>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full border-8 border-primary flex items-center justify-center">
                    <span className="text-sm font-medium">{Math.round((rentCount / payments.length) * 100)}%</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs">Rent</p>
                      <p className="text-xs font-medium">{rentCount}</p>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${(rentCount / payments.length) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-xs">Water</p>
                      <p className="text-xs font-medium">{waterCount}</p>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-400" 
                        style={{ width: `${(waterCount / payments.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant={typeFilter === 'All' ? 'default' : 'outline'} 
                  onClick={() => setTypeFilter('All')}
                >
                  All Payments ({payments.length})
                </Button>
                <Button 
                  variant={typeFilter === 'Rent' ? 'default' : 'outline'} 
                  onClick={() => setTypeFilter('Rent')}
                >
                  Rent ({rentCount})
                </Button>
                <Button 
                  variant={typeFilter === 'Water' ? 'default' : 'outline'} 
                  onClick={() => setTypeFilter('Water')}
                >
                  Water ({waterCount})
                </Button>
                <Button 
                  variant={typeFilter === 'Penalty' ? 'default' : 'outline'} 
                  onClick={() => setTypeFilter('Penalty')}
                >
                  Penalties ({penaltyCount})
                </Button>
              </div>
              
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search payments..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="rounded-lg border shadow-sm overflow-hidden mb-8"
            >
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredPayments().length > 0 ? (
                      getFilteredPayments().map((payment) => (
                        <motion.tr
                          key={payment.id}
                          variants={itemVariants}
                          className="bg-white hover:bg-secondary/50 transition-colors"
                        >
                          <TableCell>
                            {new Date(payment.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="font-medium">
                            {payment.user?.name || 'Unknown'}
                          </TableCell>
                          <TableCell>
                            {payment.description || '-'}
                          </TableCell>
                          <TableCell>
                            <TypeBadge type={payment.type} />
                          </TableCell>
                          <TableCell className="font-medium">
                            KSh {payment.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={payment.status === 'Completed' ? 'Paid' : payment.status === 'Pending' ? 'Pending' : 'Failed'} />
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                                <DropdownMenuItem>Send Receipt</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </motion.tr>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                            <Search className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <p className="text-lg font-medium">No payments found</p>
                          <p className="text-muted-foreground">
                            Try adjusting your search or filters
                          </p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          </motion.div>
        </main>
        
        <FloatingActionButton
          icon={<Plus className="h-6 w-6" />}
          position="bottom-right"
        />
        
        <Footer />
      </div>
    </div>
  );
};

export default Payments;
