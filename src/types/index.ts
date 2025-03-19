
export type UserRole = 'admin' | 'landlord' | 'tenant' | 'caretaker';

export interface User {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  role: UserRole;
  avatar?: string;
}

export interface House {
  id: string;
  landlord_id: string;
  house_number: string;
  kplc_meter_number: string;
  status: 'Occupied' | 'Vacant';
  rent_amount: number;
  location: string;
  description?: string;
  image?: string;
}

export interface Tenant {
  id: string;
  house_id: string;
  user_id: string;
  move_in_date: string;
  move_out_date?: string;
  status: 'Active' | 'Moving Out' | 'Past';
  rent_share?: number; // Percentage of rent this tenant pays (for shared houses)
}

export interface Payment {
  id: string;
  tenant_id: string;
  amount: number;
  date: string;
  type: 'Rent' | 'Water' | 'Penalty' | 'Other';
  status: 'Completed' | 'Pending' | 'Failed';
  receipt_url?: string;
  description?: string;
}

export interface Reminder {
  id: string;
  tenant_id: string;
  reminder_date: string;
  message: string;
  status: 'Pending' | 'Sent';
  type: 'Rent' | 'Late Payment' | 'Move Out' | 'Other';
}

export interface MaintenanceRequest {
  id: string;
  house_id: string;
  tenant_id: string;
  description: string;
  date_reported: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
}
