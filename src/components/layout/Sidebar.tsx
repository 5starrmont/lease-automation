
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Users, 
  User, 
  DollarSign, 
  Settings, 
  AlertCircle, 
  Bell, 
  ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  badge?: number;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, children, badge, onClick }) => {
  return (
    <NavLink
      to={href}
      onClick={onClick}
      className={({ isActive }) => cn(
        "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      {icon}
      <span>{children}</span>
      {badge ? (
        <Badge variant="secondary" className="ml-auto">
          {badge}
        </Badge>
      ) : null}
    </NavLink>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { role } = useAuth();
  
  const sidebarVariants = {
    open: { 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      } 
    },
    closed: { 
      x: "-100%",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      } 
    }
  };
  
  // Define links based on role
  const getNavLinks = () => {
    const commonLinks = [
      { href: "/dashboard", icon: <Home size={20} />, label: "Dashboard" },
    ];
    
    switch (role) {
      case 'admin':
        return [
          ...commonLinks,
          { href: "/users", icon: <Users size={20} />, label: "Users" },
          { href: "/houses", icon: <Home size={20} />, label: "Houses" },
          { href: "/settings", icon: <Settings size={20} />, label: "Settings" },
        ];
      case 'landlord':
        return [
          ...commonLinks,
          { href: "/houses", icon: <Home size={20} />, label: "Houses", badge: 3 },
          { href: "/tenants", icon: <Users size={20} />, label: "Tenants" },
          { href: "/payments", icon: <DollarSign size={20} />, label: "Payments" },
          { href: "/maintenance", icon: <AlertCircle size={20} />, label: "Maintenance", badge: 2 },
          { href: "/reminders", icon: <Bell size={20} />, label: "Reminders" },
        ];
      case 'tenant':
        return [
          ...commonLinks,
          { href: "/payments", icon: <DollarSign size={20} />, label: "Payments" },
          { href: "/maintenance", icon: <AlertCircle size={20} />, label: "Maintenance" },
        ];
      case 'caretaker':
        return [
          ...commonLinks,
          { href: "/houses", icon: <Home size={20} />, label: "Houses" },
          { href: "/tenants", icon: <Users size={20} />, label: "Tenants" },
          { href: "/maintenance", icon: <AlertCircle size={20} />, label: "Maintenance", badge: 2 },
        ];
      default:
        return commonLinks;
    }
  };
  
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black md:hidden"
          />
        )}
      </AnimatePresence>
      
      <motion.aside
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 flex flex-col border-r bg-white shadow-sm",
          "md:relative md:z-0 md:translate-x-0 md:shadow-none"
        )}
      >
        <div className="sticky top-0 flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-white font-semibold">RM</span>
            </div>
            <h2 className="text-lg font-semibold">Rental Manager</h2>
          </div>
          <button 
            onClick={onClose} 
            className="rounded-md p-1 text-muted-foreground hover:bg-secondary md:hidden"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        
        <nav className="flex-1 overflow-auto p-4">
          <div className="flex flex-col gap-1">
            {getNavLinks().map((link) => (
              <NavItem 
                key={link.href} 
                href={link.href} 
                icon={link.icon} 
                badge={link.badge}
                onClick={onClose}
              >
                {link.label}
              </NavItem>
            ))}
          </div>
        </nav>
        
        <div className="p-4 border-t">
          <NavItem 
            href="/profile" 
            icon={<User size={20} />}
            onClick={onClose}
          >
            Profile
          </NavItem>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
