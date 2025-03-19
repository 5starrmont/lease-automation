
export type UserRole = 'admin' | 'landlord' | 'tenant' | 'caretaker';

export interface User {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  role: UserRole;
  avatar?: string;
  is_active?: boolean;
  created_at?: string;
  last_login?: string;
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
  floor_plan?: string;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Tenant {
  id: string;
  house_id: string;
  user_id: string;
  move_in_date: string;
  move_out_date?: string;
  status: 'Active' | 'Moving Out' | 'Past';
  rent_share?: number; // Percentage of rent this tenant pays (for shared houses)
  security_deposit?: number;
  lease_start_date?: string;
  lease_end_date?: string;
  is_primary_tenant?: boolean;
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
  payment_method?: 'M-Pesa' | 'Bank Transfer' | 'Cash' | 'PayPal' | 'Card' | 'Other';
  transaction_id?: string;
  payment_date?: string;
  due_date?: string;
  is_late?: boolean;
}

export interface Reminder {
  id: string;
  tenant_id: string;
  reminder_date: string;
  message: string;
  status: 'Pending' | 'Sent';
  type: 'Rent' | 'Late Payment' | 'Move Out' | 'Other';
  delivery_method?: 'SMS' | 'Email' | 'Both';
  repeat?: 'Once' | 'Daily' | 'Weekly' | 'Monthly';
  created_at?: string;
  updated_at?: string;
}

export interface MaintenanceRequest {
  id: string;
  house_id: string;
  tenant_id: string;
  description: string;
  date_reported: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  assigned_to?: string; // caretaker ID or external service provider
  completion_date?: string;
  cost?: number;
  images?: string[];
  notes?: string;
}

export interface KplcToken {
  id: string;
  house_id: string;
  tenant_id: string;
  token_number: string;
  amount: number;
  purchase_date: string;
  units: number;
  status: 'Valid' | 'Used' | 'Expired';
}

export interface MoveEvent {
  id: string;
  house_id: string;
  tenant_id: string;
  event_type: 'Move In' | 'Move Out';
  scheduled_date: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  caretaker_id?: string;
  inspection_date?: string;
  inspection_notes?: string;
  is_deposit_returned?: boolean;
}

export interface Receipt {
  id: string;
  payment_id: string;
  file_url: string;
  generated_date: string;
  sent_to_email: boolean;
  download_count: number;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'Info' | 'Success' | 'Warning' | 'Error';
  is_read: boolean;
  created_at: string;
  action_url?: string;
  action_text?: string;
}
