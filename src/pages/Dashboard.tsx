
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  DollarSign, 
  AlertCircle,
  BarChart3
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

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role } = useAuth();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
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
              <p className="text-muted-foreground">Welcome to your Rental Management System dashboard</p>
            </div>
            
            {/* Stats Cards */}
            <motion.div 
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={itemVariants}>
                <StatsCard
                  title="Total Houses"
                  value={houses.length}
                  icon={<Home size={20} />}
                  description={`${getHouseCountByStatus('Occupied')} occupied, ${getHouseCountByStatus('Vacant')} vacant`}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <StatsCard
                  title="Active Tenants"
                  value={getActiveTenantCount()}
                  icon={<Users size={20} />}
                  description="People currently renting"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <StatsCard
                  title="Rent Collected"
                  value={`KSh ${getTotalRentCollected().toLocaleString()}`}
                  icon={<DollarSign size={20} />}
                  description="Total payments received"
                  trend={{ value: 12, isPositive: true }}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <StatsCard
                  title="Pending Maintenance"
                  value={getPendingMaintenanceCount()}
                  icon={<AlertCircle size={20} />}
                  description="Issues to be resolved"
                />
              </motion.div>
            </motion.div>
            
            {/* Content Section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Recent Properties */}
              <motion.div 
                className="lg:col-span-2 space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <h2 className="heading-3">Properties</h2>
                  <button className="text-sm text-primary hover:underline">View all</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {houses.map((house) => (
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
              </motion.div>
              
              {/* Recent Activity */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <h2 className="heading-3">Recent Activity</h2>
                  <button className="text-sm text-primary hover:underline">View all</button>
                </div>
                
                <div className="space-y-3">
                  {recentActivities.map((activity, idx) => (
                    <ActivityCard
                      key={idx}
                      avatar={activity.avatar}
                      name={activity.name}
                      action={activity.action}
                      time={activity.time}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
