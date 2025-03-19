
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { PropertyCard } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { houses } from '@/lib/data';
import { FloatingActionButton } from '@/components/ui-custom/Button';
import { StatusBadge } from '@/components/ui-custom/Badge';
import { containerVariants, itemVariants } from '@/lib/animations';

const Houses = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const filteredHouses = houses.filter(house => 
    house.house_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    house.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (house.description && house.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Calculate occupied and vacant counts
  const occupiedCount = houses.filter(house => house.status === 'Occupied').length;
  const vacantCount = houses.filter(house => house.status === 'Vacant').length;
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<'All' | 'Occupied' | 'Vacant'>('All');
  
  const getFilteredHouses = () => {
    if (statusFilter === 'All') {
      return filteredHouses;
    }
    return filteredHouses.filter(house => house.status === statusFilter);
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
              <h1 className="heading-1">Houses</h1>
              <p className="text-muted-foreground">Manage all your rental properties</p>
            </div>
            
            <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant={statusFilter === 'All' ? 'default' : 'outline'} 
                  onClick={() => setStatusFilter('All')}
                >
                  All Properties ({houses.length})
                </Button>
                <Button 
                  variant={statusFilter === 'Occupied' ? 'default' : 'outline'} 
                  onClick={() => setStatusFilter('Occupied')}
                >
                  Occupied ({occupiedCount})
                </Button>
                <Button 
                  variant={statusFilter === 'Vacant' ? 'default' : 'outline'} 
                  onClick={() => setStatusFilter('Vacant')}
                >
                  Vacant ({vacantCount})
                </Button>
              </div>
              
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search properties..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {getFilteredHouses().length > 0 ? (
                getFilteredHouses().map((house) => (
                  <motion.div key={house.id} variants={itemVariants}>
                    <PropertyCard
                      image={house.image || ''}
                      title={`House ${house.house_number}`}
                      location={house.location}
                      price={house.rent_amount}
                      status={house.status}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No properties found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              )}
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

export default Houses;
