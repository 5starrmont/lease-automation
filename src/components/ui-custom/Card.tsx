
import React from 'react';
import { motion } from 'framer-motion';
import { Card as ShadcnCard, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { cardHoverVariants } from '@/lib/animations';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  className,
}) => {
  return (
    <motion.div
      whileHover="hover"
      variants={cardHoverVariants}
    >
      <ShadcnCard className={cn("overflow-hidden", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">{title}</h3>
          <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
          
          {trend && (
            <div className={cn(
              "flex items-center text-xs mt-2",
              trend.isPositive ? "text-green-500" : "text-red-500"
            )}>
              <span>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          )}
        </CardContent>
      </ShadcnCard>
    </motion.div>
  );
};

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: number;
  status: 'Occupied' | 'Vacant';
  onClick?: () => void;
  className?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  image,
  title,
  location,
  price,
  status,
  onClick,
  className,
}) => {
  return (
    <motion.div
      whileHover="hover"
      variants={cardHoverVariants}
      onClick={onClick}
      className={cn("cursor-pointer", className)}
    >
      <ShadcnCard className="overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className={cn(
            "absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full",
            status === 'Occupied' 
              ? "bg-blue-500 text-white" 
              : "bg-green-500 text-white"
          )}>
            {status}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{location}</p>
          <div className="mt-2 flex justify-between items-center">
            <p className="font-bold">KSh {price.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">per month</p>
          </div>
        </CardContent>
      </ShadcnCard>
    </motion.div>
  );
};

interface ActivityCardProps {
  avatar?: string;
  name: string;
  action: string;
  time: string;
  className?: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  avatar,
  name,
  action,
  time,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ShadcnCard className={cn("flex p-3", className)}>
        <div className="h-10 w-10 rounded-full bg-muted flex-shrink-0 overflow-hidden">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm">
            <span className="font-medium">{name}</span> {action}
          </p>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
      </ShadcnCard>
    </motion.div>
  );
};
