
import React from 'react';
import { motion } from 'framer-motion';
import { Button as ShadcnButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { buttonHoverVariants } from '@/lib/animations';

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  onClick,
  disabled,
  className,
  icon,
  type = 'button',
}) => {
  return (
    <motion.div
      whileHover="hover"
      whileTap="tap"
      variants={buttonHoverVariants}
    >
      <ShadcnButton
        variant={variant}
        size={size}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "transition-all duration-200",
          className
        )}
        type={type}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </ShadcnButton>
    </motion.div>
  );
};

interface FloatingActionButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  disabled,
  icon,
  className,
  position = 'bottom-right',
}) => {
  const getPositionClass = () => {
    switch (position) {
      case 'bottom-right':
        return 'bottom-6 right-6';
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      default:
        return 'bottom-6 right-6';
    }
  };
  
  return (
    <motion.div
      className={cn(
        "fixed z-20",
        getPositionClass()
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 15
      }}
    >
      <ShadcnButton
        size="icon"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "h-14 w-14 rounded-full shadow-lg",
          className
        )}
      >
        {icon}
      </ShadcnButton>
    </motion.div>
  );
};
