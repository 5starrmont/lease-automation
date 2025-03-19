
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Code, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-auto py-4 px-4 border-t"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Rental Management System. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Version 1.0.0 (Phase 3: Frontend Development)
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Shield size={14} />
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Code size={14} />
            <span>API Docs</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Heart size={14} />
            <span>Support</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
