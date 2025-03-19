
import React from 'react';
import { Badge as ShadcnBadge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'Active' | 'Moving Out' | 'Past' | 'Occupied' | 'Vacant' | 'Pending' | 'In Progress' | 'Completed' | 'Sent' | 'Failed' | 'Approved' | 'Rejected' | 'Paid' | 'Unpaid' | 'Overdue';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Active':
      case 'Completed':
      case 'Sent':
      case 'Approved':
      case 'Paid':
        return 'bg-green-100 text-green-700 border-green-200';
      
      case 'Pending':
      case 'In Progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      
      case 'Moving Out':
      case 'Vacant':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      
      case 'Past':
      case 'Failed':
      case 'Rejected':
      case 'Unpaid':
        return 'bg-red-100 text-red-700 border-red-200';
      
      case 'Occupied':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      
      case 'Overdue':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  return (
    <ShadcnBadge 
      variant="outline" 
      className={cn(
        "font-medium border rounded-full px-2 py-0.5 text-xs",
        getStatusStyles(),
        className
      )}
    >
      {status}
    </ShadcnBadge>
  );
};

interface PriorityBadgeProps {
  priority: 'Low' | 'Medium' | 'High';
  className?: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, className }) => {
  const getPriorityStyles = () => {
    switch (priority) {
      case 'Low':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'High':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  return (
    <ShadcnBadge 
      variant="outline" 
      className={cn(
        "font-medium border rounded-full px-2 py-0.5 text-xs",
        getPriorityStyles(),
        className
      )}
    >
      {priority}
    </ShadcnBadge>
  );
};

interface TypeBadgeProps {
  type: 'Rent' | 'Water' | 'Penalty' | 'Other' | 'Late Payment' | 'Move Out';
  className?: string;
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type, className }) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'Rent':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Water':
        return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      case 'Penalty':
      case 'Late Payment':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Move Out':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Other':
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  return (
    <ShadcnBadge 
      variant="outline" 
      className={cn(
        "font-medium border rounded-full px-2 py-0.5 text-xs",
        getTypeStyles(),
        className
      )}
    >
      {type}
    </ShadcnBadge>
  );
};
