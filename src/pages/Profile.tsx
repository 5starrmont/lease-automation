
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Shield, Building, LogOut, Edit, ChevronRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AnimatedButton } from '@/components/ui-custom/Button';
import { containerVariants, itemVariants } from '@/lib/animations';

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
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
            className="container py-6 max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h1 className="heading-1">Profile</h1>
              <p className="text-muted-foreground">Manage your account settings and preferences</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-[240px_1fr]">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-6"
              >
                <motion.div variants={itemVariants} className="bg-white rounded-xl border shadow-sm p-6 flex flex-col items-center justify-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="text-xl">{user && getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{user?.name}</h2>
                  <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Change Photo
                  </Button>
                </motion.div>
                
                <motion.div variants={itemVariants} className="bg-white rounded-xl border shadow-sm">
                  <div className="p-2">
                    <nav className="space-y-1">
                      <Button variant="ghost" className="w-full justify-start font-normal">
                        <User className="mr-2 h-4 w-4" />
                        Account
                      </Button>
                      <Button variant="ghost" className="w-full justify-start font-normal">
                        <Shield className="mr-2 h-4 w-4" />
                        Security
                      </Button>
                      <Button variant="ghost" className="w-full justify-start font-normal">
                        <Building className="mr-2 h-4 w-4" />
                        Properties
                      </Button>
                      <Button variant="ghost" className="w-full justify-start font-normal text-red-500" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </nav>
                  </div>
                </motion.div>
              </motion.div>
              
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-xl border shadow-sm p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm text-muted-foreground">Full Name</span>
                      <span className="font-medium">{user?.name}</span>
                    </div>
                    
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm text-muted-foreground">Email Address</span>
                      <span className="font-medium">{user?.email}</span>
                    </div>
                    
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm text-muted-foreground">Phone Number</span>
                      <span className="font-medium">{user?.phone_number}</span>
                    </div>
                    
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm text-muted-foreground">Role</span>
                      <span className="font-medium capitalize">{user?.role}</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white rounded-xl border shadow-sm p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Security Settings</h3>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">Password</h4>
                        <p className="text-sm text-muted-foreground">Change your password</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Change Password
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">Login Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive notifications when someone logs into your account</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white rounded-xl border shadow-sm p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Notification Preferences</h3>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">SMS Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive updates via SMS</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex justify-between p-6 bg-primary/5 rounded-xl border border-primary/20"
                >
                  <div>
                    <h3 className="font-medium">Delete Account</h3>
                    <p className="text-sm text-muted-foreground">Once deleted, your account cannot be recovered</p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
