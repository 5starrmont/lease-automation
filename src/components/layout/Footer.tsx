
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-auto py-4 px-4 border-t text-center text-sm text-muted-foreground"
    >
      <p>&copy; {new Date().getFullYear()} Rental Management System. All rights reserved.</p>
    </motion.footer>
  );
};

export default Footer;
