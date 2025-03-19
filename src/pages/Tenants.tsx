
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, MoreVertical } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FloatingActionButton } from '@/components/ui-custom/Button';
import { StatusBadge } from '@/components/ui-custom/Badge';
import { users, tenants, houses, getUserById, getHouseById } from '@/lib/data';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Tenants = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Get tenants with user and house data
  const tenantsWithDetails = tenants.map(tenant => {
    const user = getUserById(tenant.user_id);
    const house = getHouseById(tenant.house_id);
    
    return {
      ...tenant,
      user,
      house
    };
  });
  
  // Filter tenants based on search term
  const filteredTenants = tenantsWithDetails.filter(tenant => 
    tenant.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.house?.house_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.house?.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Status filter
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Moving Out' | 'Past'>('All');
  
  const getFilteredTenants = () => {
    if (statusFilter === 'All') {
      return filteredTenants;
    }
    return filteredTenants.filter(tenant => tenant.status === statusFilter);
  };
  
  // Calculate status counts
  const activeCount = tenants.filter(tenant => tenant.status === 'Active').length;
  const movingOutCount = tenants.filter(tenant => tenant.status === 'Moving Out').length;
  const pastCount = tenants.filter(tenant => tenant.status === 'Past').length;
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
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
              <h1 className="heading-1">Tenants</h1>
              <p className="text-muted-foreground">Manage your rental tenants</p>
            </div>
            
            <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant={statusFilter === 'All' ? 'default' : 'outline'} 
                  onClick={() => setStatusFilter('All')}
                >
                  All Tenants ({tenants.length})
                </Button>
                <Button 
                  variant={statusFilter === 'Active' ? 'default' : 'outline'} 
                  onClick={() => setStatusFilter('Active')}
                >
                  Active ({activeCount})
                </Button>
                <Button 
                  variant={statusFilter === 'Moving Out' ? 'default' : 'outline'} 
                  onClick={() => setStatusFilter('Moving Out')}
                >
                  Moving Out ({movingOutCount})
                </Button>
                <Button 
                  variant={statusFilter === 'Past' ? 'default' : 'outline'} 
                  onClick={() => setStatusFilter('Past')}
                >
                  Past ({pastCount})
                </Button>
              </div>
              
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search tenants..."
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
              className="rounded-lg border shadow-sm overflow-hidden"
            >
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant</TableHead>
                      <TableHead>House</TableHead>
                      <TableHead>Move In Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredTenants().length > 0 ? (
                      getFilteredTenants().map((tenant) => (
                        <motion.tr
                          key={tenant.id}
                          variants={itemVariants}
                          className="bg-white hover:bg-secondary/50 transition-colors"
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={tenant.user?.avatar} alt={tenant.user?.name} />
                                <AvatarFallback>{tenant.user && getInitials(tenant.user.name)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{tenant.user?.name}</p>
                                <p className="text-xs text-muted-foreground">{tenant.user?.phone_number}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="font-medium">House {tenant.house?.house_number}</p>
                            <p className="text-xs text-muted-foreground">{tenant.house?.location}</p>
                          </TableCell>
                          <TableCell>
                            <p>{new Date(tenant.move_in_date).toLocaleDateString()}</p>
                            {tenant.move_out_date && (
                              <p className="text-xs text-muted-foreground">
                                Moving out: {new Date(tenant.move_out_date).toLocaleDateString()}
                              </p>
                            )}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={tenant.status} />
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
                                <DropdownMenuItem>Edit Tenant</DropdownMenuItem>
                                {tenant.status === 'Active' && (
                                  <DropdownMenuItem>Mark as Moving Out</DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="text-red-500">Remove Tenant</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </motion.tr>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                            <Search className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <p className="text-lg font-medium">No tenants found</p>
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

export default Tenants;
