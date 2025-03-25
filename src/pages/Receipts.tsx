
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Receipt, 
  Download, 
  Mail, 
  Search, 
  Filter,
  FileText,
  Calendar,
  AlertCircle
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
import { useToast } from '@/hooks/use-toast';
import { Receipt as ReceiptType } from '@/types';
import { useAuth } from '@/context/AuthContext';
import Footer from '@/components/layout/Footer';

const Receipts = () => {
  const { role } = useAuth();
  const { toast } = useToast();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for demonstration
  const [receipts, setReceipts] = useState<ReceiptType[]>([
    {
      id: '1',
      payment_id: 'p1',
      file_url: '#',
      generated_date: '2023-08-15',
      sent_to_email: true,
      download_count: 2
    },
    {
      id: '2',
      payment_id: 'p2',
      file_url: '#',
      generated_date: '2023-07-30',
      sent_to_email: true,
      download_count: 1
    },
    {
      id: '3',
      payment_id: 'p3',
      file_url: '#',
      generated_date: '2023-07-15',
      sent_to_email: false,
      download_count: 0
    },
    {
      id: '4',
      payment_id: 'p4',
      file_url: '#',
      generated_date: '2023-06-30',
      sent_to_email: true,
      download_count: 3
    }
  ]);
  
  // Mock payment types
  const paymentTypes = {
    'p1': { type: 'Rent', amount: 15000, house: 'A208' },
    'p2': { type: 'Water', amount: 2500, house: 'A208' },
    'p3': { type: 'Rent', amount: 15000, house: 'A208' },
    'p4': { type: 'Rent', amount: 15000, house: 'A208' }
  };
  
  const filteredReceipts = receipts.filter(receipt => {
    // Filter by payment type
    const paymentInfo = paymentTypes[receipt.payment_id as keyof typeof paymentTypes];
    
    if (filter !== 'all' && paymentInfo.type !== filter) {
      return false;
    }
    
    // Filter by search (searching by month in this example)
    if (searchQuery) {
      const months = ["january", "february", "march", "april", "may", "june", 
                       "july", "august", "september", "october", "november", "december"];
      
      const receiptDate = new Date(receipt.generated_date);
      const monthName = months[receiptDate.getMonth()];
      
      if (!monthName.includes(searchQuery.toLowerCase())) {
        return false;
      }
    }
    
    return true;
  });
  
  const handleDownload = (receiptId: string) => {
    // In a real app, this would trigger a download
    const updatedReceipts = receipts.map(receipt => {
      if (receipt.id === receiptId) {
        return {
          ...receipt,
          download_count: receipt.download_count + 1
        };
      }
      return receipt;
    });
    
    setReceipts(updatedReceipts);
    
    toast({
      title: "Success",
      description: "Receipt downloaded successfully",
    });
  };
  
  const handleSendEmail = (receiptId: string) => {
    // In a real app, this would send an email
    const updatedReceipts = receipts.map(receipt => {
      if (receipt.id === receiptId) {
        return {
          ...receipt,
          sent_to_email: true
        };
      }
      return receipt;
    });
    
    setReceipts(updatedReceipts);
    
    toast({
      title: "Success",
      description: "Receipt sent to your email",
    });
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
              <h1 className="text-3xl font-bold">Receipts & Invoices</h1>
              <p className="text-muted-foreground">
                {role === 'tenant' 
                  ? 'Your payment receipts and invoices' 
                  : 'Payment receipts for all your properties'}
              </p>
            </div>
          </div>
          
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by month..."
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
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Receipts</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                  <SelectItem value="Water">Water</SelectItem>
                  <SelectItem value="Penalty">Penalty</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredReceipts.length === 0 ? (
            <div className="text-center py-12 bg-muted rounded-lg">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No receipts found</h3>
              <p className="text-muted-foreground mt-2">
                {searchQuery 
                  ? "Try adjusting your search terms" 
                  : "You don't have any receipts yet"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReceipts.map((receipt) => {
                const paymentInfo = paymentTypes[receipt.payment_id as keyof typeof paymentTypes];
                
                return (
                  <Card key={receipt.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {paymentInfo.type} Payment
                          </CardTitle>
                          <CardDescription>Receipt #{receipt.id}</CardDescription>
                        </div>
                        <Badge>
                          KES {paymentInfo.amount.toLocaleString()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">House:</span>
                          <span className="text-sm font-medium">{paymentInfo.house}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Date:</span>
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <span className="text-sm">{receipt.generated_date}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Email Sent:</span>
                          <span className="text-sm">
                            {receipt.sent_to_email ? 'Yes' : 'No'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/50 px-6 py-3 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 flex-1"
                        onClick={() => handleDownload(receipt.id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      
                      {!receipt.sent_to_email && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 flex-1"
                          onClick={() => handleSendEmail(receipt.id)}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Receipts;
