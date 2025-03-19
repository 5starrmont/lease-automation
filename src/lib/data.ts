
import { User, House, Tenant, Payment, Reminder, MaintenanceRequest } from '@/types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@rentalmanager.com',
    phone_number: '+254700000000',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=65',
  },
  {
    id: '2',
    name: 'John Landlord',
    email: 'john@example.com',
    phone_number: '+254711222333',
    role: 'landlord',
    avatar: 'https://i.pravatar.cc/150?img=68',
  },
  {
    id: '3',
    name: 'Sarah Tenant',
    email: 'sarah@example.com',
    phone_number: '+254722333444',
    role: 'tenant',
    avatar: 'https://i.pravatar.cc/150?img=47',
  },
  {
    id: '4',
    name: 'Mike Caretaker',
    email: 'mike@example.com',
    phone_number: '+254733444555',
    role: 'caretaker',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '5',
    name: 'Jane Tenant',
    email: 'jane@example.com',
    phone_number: '+254744555666',
    role: 'tenant',
    avatar: 'https://i.pravatar.cc/150?img=23',
  }
];

// Mock Houses
export const houses: House[] = [
  {
    id: '1',
    landlord_id: '2',
    house_number: 'A1',
    kplc_meter_number: 'KP123456789',
    status: 'Occupied',
    rent_amount: 15000,
    location: 'Parklands, Nairobi',
    description: 'Modern 2 bedroom apartment with balcony',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '2',
    landlord_id: '2',
    house_number: 'A2',
    kplc_meter_number: 'KP234567890',
    status: 'Occupied',
    rent_amount: 12000,
    location: 'Parklands, Nairobi',
    description: '1 bedroom apartment with parking',
    image: 'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '3',
    landlord_id: '2',
    house_number: 'B1',
    kplc_meter_number: 'KP345678901',
    status: 'Vacant',
    rent_amount: 18000,
    location: 'Westlands, Nairobi',
    description: 'Spacious 3 bedroom house with garden',
    image: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vZGVybiUyMGhvdXNlfGVufDB8fDB8fHww',
  }
];

// Mock Tenants
export const tenants: Tenant[] = [
  {
    id: '1',
    house_id: '1',
    user_id: '3',
    move_in_date: '2023-01-15',
    status: 'Active',
  },
  {
    id: '2',
    house_id: '2',
    user_id: '5',
    move_in_date: '2023-03-10',
    status: 'Active',
  }
];

// Mock Payments
export const payments: Payment[] = [
  {
    id: '1',
    tenant_id: '1',
    amount: 15000,
    date: '2023-05-02',
    type: 'Rent',
    status: 'Completed',
    receipt_url: '#',
    description: 'May 2023 Rent',
  },
  {
    id: '2',
    tenant_id: '1',
    amount: 800,
    date: '2023-05-02',
    type: 'Water',
    status: 'Completed',
    receipt_url: '#',
    description: 'May 2023 Water Bill',
  },
  {
    id: '3',
    tenant_id: '2',
    amount: 12000,
    date: '2023-05-01',
    type: 'Rent',
    status: 'Completed',
    receipt_url: '#',
    description: 'May 2023 Rent',
  },
  {
    id: '4',
    tenant_id: '2',
    amount: 600,
    date: '2023-05-01',
    type: 'Water',
    status: 'Completed',
    receipt_url: '#',
    description: 'May 2023 Water Bill',
  },
  {
    id: '5',
    tenant_id: '1',
    amount: 15000,
    date: '2023-06-03',
    type: 'Rent',
    status: 'Completed',
    receipt_url: '#',
    description: 'June 2023 Rent',
  }
];

// Mock Reminders
export const reminders: Reminder[] = [
  {
    id: '1',
    tenant_id: '1',
    reminder_date: '2023-07-01',
    message: 'Your rent of KSh 15,000 and water bill of KSh 800 is due on 3rd July.',
    status: 'Pending',
    type: 'Rent',
  },
  {
    id: '2',
    tenant_id: '2',
    reminder_date: '2023-07-01',
    message: 'Your rent of KSh 12,000 and water bill of KSh 600 is due on 3rd July.',
    status: 'Pending',
    type: 'Rent',
  }
];

// Mock Maintenance Requests
export const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: '1',
    house_id: '1',
    tenant_id: '1',
    description: 'Kitchen sink is leaking',
    date_reported: '2023-06-15',
    status: 'In Progress',
    priority: 'Medium',
  },
  {
    id: '2',
    house_id: '2',
    tenant_id: '2',
    description: 'Light bulb in bathroom needs replacement',
    date_reported: '2023-06-20',
    status: 'Pending',
    priority: 'Low',
  }
];

// Helper function to find user by ID
export function getUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}

// Helper function to find house by ID
export function getHouseById(id: string): House | undefined {
  return houses.find(house => house.id === id);
}

// Helper function to find tenant by user ID
export function getTenantByUserId(userId: string): Tenant | undefined {
  return tenants.find(tenant => tenant.user_id === userId);
}

// Helper to get house count by status
export function getHouseCountByStatus(status: 'Occupied' | 'Vacant'): number {
  return houses.filter(house => house.status === status).length;
}

// Helper to get total rent collected
export function getTotalRentCollected(): number {
  return payments
    .filter(payment => payment.type === 'Rent' && payment.status === 'Completed')
    .reduce((sum, payment) => sum + payment.amount, 0);
}

// Helper to get active tenant count
export function getActiveTenantCount(): number {
  return tenants.filter(tenant => tenant.status === 'Active').length;
}

// Helper to get pending maintenance count
export function getPendingMaintenanceCount(): number {
  return maintenanceRequests.filter(req => req.status !== 'Completed').length;
}
