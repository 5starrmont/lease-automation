
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LogIn, 
  LogOut, 
  CalendarDays, 
  CheckCircle2,
  Clock, 
  AlertCircle,
  X,
  Search,
  Filter,
  Plus,
  ClipboardList
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
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from '@/hooks/use-toast';
import { MoveEvent } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Footer from '@/components/layout/Footer';

const MoveEvents = () => {
  const { role } = useAuth();
  const { toast } = useToast();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  
  // Mock data for demonstration
  const [moveEvents, setMoveEvents] = useState<MoveEvent[]>([
    {
      id: '1',
      house_id: 'h1',
      tenant_id: 't1',
      event_type: 'Move In',
      scheduled_date: '2023-09-01',
      status: 'Scheduled',
      caretaker_id: 'c1'
    },
    {
      id: '2',
      house_id: 'h2',
      tenant_id: 't2',
      event_type: 'Move Out',
      scheduled_date: '2023-08-15',
      status: 'In Progress',
      caretaker_id: 'c1',
      inspection_date: '2023-08-15',
      inspection_notes: 'Checking for damages and cleanliness'
    },
    {
      id: '3',
      house_id: 'h3',
      tenant_id: 't3',
      event_type: 'Move Out',
      scheduled_date: '2023-07-30',
      status: 'Completed',
      caretaker_id: 'c2',
      inspection_date: '2023-07-30',
      inspection_notes: 'No damages found, deposit will be returned',
      is_deposit_returned: true
    },
    {
      id: '4',
      house_id: 'h4',
      tenant_id: 't4',
      event_type: 'Move In',
      scheduled_date: '2023-08-10',
      status: 'Cancelled',
      caretaker_id: 'c1'
    }
  ]);
  
  const [newEvent, setNewEvent] = useState({
    house_id: '',
    tenant_id: '',
    event_type: 'Move In' as 'Move In' | 'Move Out',
    scheduled_date: '',
    notes: ''
  });
  
  const filteredEvents = moveEvents.filter(event => {
    // Filter by status
    if (filter !== 'all' && event.status !== filter) {
      return false;
    }
    
    // Filter by search query (using house_id as an example)
    if (searchQuery && !event.house_id.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  const handleCreateEvent = () => {
    if (!newEvent.house_id || !newEvent.tenant_id || !newEvent.scheduled_date) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Mock adding a new event (in a real app, this would be an API call)
    const newMoveEvent: MoveEvent = {
      id: `e${moveEvents.length + 1}`,
      house_id: newEvent.house_id,
      tenant_id: newEvent.tenant_id,
      event_type: newEvent.event_type,
      scheduled_date: newEvent.scheduled_date,
      status: 'Scheduled',
      caretaker_id: 'c1' // This would be the logged-in caretaker's ID
    };
    
    setMoveEvents([...moveEvents, newMoveEvent]);
    setNewEvent({
      house_id: '',
      tenant_id: '',
      event_type: 'Move In',
      scheduled_date: '',
      notes: ''
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Success",
      description: `${newEvent.event_type} event scheduled successfully`,
    });
  };
  
  const getEventTypeBadge = (type: string) => {
    if (type === 'Move In') {
      return <Badge className="flex items-center gap-1 bg-green-500"><LogIn className="h-3 w-3" /> Move In</Badge>;
    } else {
      return <Badge variant="destructive" className="flex items-center gap-1"><LogOut className="h-3 w-3" /> Move Out</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return <Badge variant="outline" className="flex items-center gap-1"><CalendarDays className="h-3 w-3" /> Scheduled</Badge>;
      case 'In Progress':
        return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" /> In Progress</Badge>;
      case 'Completed':
        return <Badge variant="success" className="bg-green-500 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Completed</Badge>;
      case 'Cancelled':
        return <Badge variant="destructive" className="flex items-center gap-1"><X className="h-3 w-3" /> Cancelled</Badge>;
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
              <h1 className="text-3xl font-bold">Move In/Out Management</h1>
              <p className="text-muted-foreground">
                {role === 'caretaker' 
                  ? 'Schedule and manage tenant move-ins and move-outs' 
                  : 'Overview of tenant moves across your properties'}
              </p>
            </div>
            
            {(role === 'caretaker' || role === 'landlord') && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Schedule Move
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Schedule Move Event</DialogTitle>
                    <DialogDescription>
                      Set up a move-in or move-out for a tenant.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="event_type">Event Type</Label>
                      <Select 
                        value={newEvent.event_type} 
                        onValueChange={(value) => setNewEvent({...newEvent, event_type: value as 'Move In' | 'Move Out'})}
                      >
                        <SelectTrigger id="event_type">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Move In">Move In</SelectItem>
                          <SelectItem value="Move Out">Move Out</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="house_id">House Number</Label>
                      <Input
                        id="house_id"
                        placeholder="Enter house number"
                        value={newEvent.house_id}
                        onChange={(e) => setNewEvent({...newEvent, house_id: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="tenant_id">Tenant Name</Label>
                      <Input
                        id="tenant_id"
                        placeholder="Enter tenant name"
                        value={newEvent.tenant_id}
                        onChange={(e) => setNewEvent({...newEvent, tenant_id: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="date">Scheduled Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(newDate) => {
                              setDate(newDate);
                              if (newDate) {
                                setNewEvent({
                                  ...newEvent, 
                                  scheduled_date: format(newDate, "yyyy-MM-dd")
                                });
                              }
                            }}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any additional information"
                        value={newEvent.notes}
                        onChange={(e) => setNewEvent({...newEvent, notes: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateEvent}>Schedule Event</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
          
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by house number..."
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
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 bg-muted rounded-lg">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No move events found</h3>
              <p className="text-muted-foreground mt-2">
                {searchQuery 
                  ? "Try adjusting your search terms" 
                  : "There are no move events to display"}
              </p>
              {(role === 'caretaker' || role === 'landlord') && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Schedule Your First Move
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">House #{event.house_id}</CardTitle>
                        <CardDescription>{event.scheduled_date}</CardDescription>
                      </div>
                      {getEventTypeBadge(event.event_type)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <span>{getStatusBadge(event.status)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Tenant ID:</span>
                        <span className="text-sm font-medium">{event.tenant_id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Caretaker:</span>
                        <span className="text-sm font-medium">{event.caretaker_id}</span>
                      </div>
                      
                      {event.inspection_notes && (
                        <div className="mt-2 p-2 bg-muted rounded-md text-xs">
                          <p className="font-medium text-sm mb-1">Inspection Notes:</p>
                          <p>{event.inspection_notes}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 px-6 py-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-full flex justify-center items-center gap-2"
                    >
                      <ClipboardList className="h-4 w-4" />
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

export default MoveEvents;
