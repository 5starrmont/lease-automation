
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Tool, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { MaintenanceRequest } from '@/types';
import { useAuth } from '@/context/AuthContext';
import Footer from '@/components/layout/Footer';

const Maintenance = () => {
  const navigate = useNavigate();
  const { role } = useAuth();
  const { toast } = useToast();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Mock data for demonstration
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([
    {
      id: '1',
      house_id: 'h1',
      tenant_id: 't1',
      description: 'Water leak in the kitchen sink',
      date_reported: '2023-08-15',
      status: 'Pending',
      priority: 'High',
      assigned_to: 'c1',
      images: [],
      notes: 'Tenant reported water damage to cabinet'
    },
    {
      id: '2',
      house_id: 'h2',
      tenant_id: 't2',
      description: 'Broken window in the living room',
      date_reported: '2023-08-10',
      status: 'In Progress',
      priority: 'Medium',
      assigned_to: 'c2',
      images: [],
      notes: 'Scheduled for repair on 08/17'
    },
    {
      id: '3',
      house_id: 'h1',
      tenant_id: 't1',
      description: 'Light fixture not working in bathroom',
      date_reported: '2023-08-05',
      status: 'Completed',
      priority: 'Low',
      completion_date: '2023-08-12',
      cost: 45,
      images: [],
      notes: 'Replaced bulb and fixed wiring issue'
    }
  ]);
  
  const [newRequest, setNewRequest] = useState({
    description: '',
    priority: 'Medium' as 'Low' | 'Medium' | 'High',
    notes: ''
  });
  
  const filteredRequests = maintenanceRequests.filter(request => {
    // Filter by status
    if (filter !== 'all' && request.status !== filter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !request.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  const handleCreateRequest = () => {
    if (!newRequest.description) {
      toast({
        title: "Error",
        description: "Please provide a description of the issue",
        variant: "destructive"
      });
      return;
    }
    
    // Mock adding a new request (in a real app, this would be an API call)
    const newMaintenanceRequest: MaintenanceRequest = {
      id: `m${maintenanceRequests.length + 1}`,
      house_id: 'h1', // This would come from the logged-in user's assigned house
      tenant_id: 't1', // This would be the logged-in user's ID
      description: newRequest.description,
      priority: newRequest.priority,
      date_reported: new Date().toISOString().split('T')[0],
      status: 'Pending',
      notes: newRequest.notes,
      images: []
    };
    
    setMaintenanceRequests([...maintenanceRequests, newMaintenanceRequest]);
    setNewRequest({
      description: '',
      priority: 'Medium',
      notes: ''
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Maintenance request submitted successfully",
    });
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Badge variant="destructive">High</Badge>;
      case 'Medium':
        return <Badge variant="warning" className="bg-amber-500">Medium</Badge>;
      case 'Low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="outline" className="flex items-center gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
      case 'In Progress':
        return <Badge variant="secondary" className="flex items-center gap-1"><Tool className="h-3 w-3" /> In Progress</Badge>;
      case 'Completed':
        return <Badge variant="success" className="bg-green-500 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Maintenance Requests</h1>
              <p className="text-muted-foreground">
                {role === 'tenant' ? 'Submit and track maintenance requests for your rental' : 
                 role === 'caretaker' ? 'Manage and respond to tenant maintenance requests' :
                 'Overview of all maintenance requests across properties'}
              </p>
            </div>
            
            {(role === 'tenant' || role === 'caretaker') && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {role === 'tenant' ? 'New Request' : 'Create Request'}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Maintenance Request</DialogTitle>
                    <DialogDescription>
                      Provide details about the maintenance issue. We'll process your request as soon as possible.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the issue in detail"
                        value={newRequest.description}
                        onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select 
                        value={newRequest.priority} 
                        onValueChange={(value) => setNewRequest({...newRequest, priority: value as 'Low' | 'Medium' | 'High'})}
                      >
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any additional information"
                        value={newRequest.notes}
                        onChange={(e) => setNewRequest({...newRequest, notes: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateRequest}>Submit Request</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
          
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select 
                value={filter} 
                onValueChange={setFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Requests</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12 bg-muted rounded-lg">
              <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No maintenance requests found</h3>
              <p className="text-muted-foreground mt-2">
                {searchQuery 
                  ? "Try adjusting your search terms" 
                  : role === 'tenant' 
                    ? "You haven't submitted any maintenance requests yet" 
                    : "There are no maintenance requests to display"}
              </p>
              {role === 'tenant' && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Submit Your First Request
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequests.map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{`Request #${request.id}`}</CardTitle>
                        <CardDescription>{request.date_reported}</CardDescription>
                      </div>
                      {getPriorityBadge(request.priority)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{request.description}</p>
                    <div className="flex items-center justify-between">
                      <div>{getStatusBadge(request.status)}</div>
                      {request.completion_date && (
                        <span className="text-xs text-muted-foreground">
                          Completed: {request.completion_date}
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 px-6 py-3">
                    <Button variant="ghost" size="sm" className="h-8 w-full flex justify-center">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Maintenance;
