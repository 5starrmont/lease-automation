
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Receipt, 
  Plus, 
  CheckCircle2, 
  AlertTriangle,
  Loader2,
  Clock,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
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
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { KplcToken } from '@/types';
import { useAuth } from '@/context/AuthContext';
import Footer from '@/components/layout/Footer';

const KplcTokens = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Mock data for demonstration
  const [meterNumber, setMeterNumber] = useState('45678901');
  const [amount, setAmount] = useState('');
  
  // Mock token history
  const [tokens, setTokens] = useState<KplcToken[]>([
    {
      id: '1',
      house_id: 'h1',
      tenant_id: 't1',
      token_number: '1234-5678-9012-3456',
      amount: 500,
      purchase_date: '2023-08-10',
      units: 22.5,
      status: 'Valid'
    },
    {
      id: '2',
      house_id: 'h1',
      tenant_id: 't1',
      token_number: '2345-6789-0123-4567',
      amount: 1000,
      purchase_date: '2023-07-25',
      units: 47.2,
      status: 'Used'
    },
    {
      id: '3',
      house_id: 'h1',
      tenant_id: 't1',
      token_number: '3456-7890-1234-5678',
      amount: 300,
      purchase_date: '2023-07-15',
      units: 13.8,
      status: 'Used'
    }
  ]);
  
  const handlePurchaseToken = () => {
    if (!amount || Number(amount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Generate a random token number
      const generateTokenNumber = () => {
        const segments = [];
        for (let i = 0; i < 4; i++) {
          segments.push(Math.floor(1000 + Math.random() * 9000));
        }
        return segments.join('-');
      };
      
      // Calculate units (simulated conversion rate: 1 KES = 0.046 units)
      const units = Number(amount) * 0.046;
      
      const newToken: KplcToken = {
        id: `t${tokens.length + 1}`,
        house_id: 'h1',
        tenant_id: 't1',
        token_number: generateTokenNumber(),
        amount: Number(amount),
        purchase_date: new Date().toISOString().split('T')[0],
        units: parseFloat(units.toFixed(1)),
        status: 'Valid'
      };
      
      setTokens([newToken, ...tokens]);
      setAmount('');
      setIsLoading(false);
      setIsDialogOpen(false);
      
      toast({
        title: "Success",
        description: `KPLC token purchased successfully: ${newToken.token_number}`,
      });
    }, 2000);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Valid':
        return <Badge variant="success" className="bg-green-500 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Valid</Badge>;
      case 'Used':
        return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" /> Used</Badge>;
      case 'Expired':
        return <Badge variant="destructive" className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Expired</Badge>;
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
              <h1 className="text-3xl font-bold">KPLC Tokens</h1>
              <p className="text-muted-foreground">Purchase and manage electricity tokens for your rental</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Buy Token
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Purchase KPLC Token</DialogTitle>
                  <DialogDescription>
                    Enter the amount to purchase electricity for meter number {meterNumber}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="meter">Meter Number</Label>
                    <Input 
                      id="meter"
                      value={meterNumber}
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">This is the meter number linked to your rental</p>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount (KES)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  
                  <div className="mt-2 rounded-md bg-muted p-3">
                    <div className="text-sm">Estimated units: <span className="font-medium">{amount ? (Number(amount) * 0.046).toFixed(1) : '0'} units</span></div>
                    <div className="text-xs text-muted-foreground mt-1">Based on current KPLC rates</div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button 
                    onClick={handlePurchaseToken} 
                    disabled={isLoading || !amount}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing
                      </>
                    ) : (
                      'Purchase Token'
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle>Your Meter Information</CardTitle>
              <CardDescription>Details of the electricity meter linked to your rental</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Meter Number</p>
                  <p className="text-xl font-bold">{meterNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">House Number</p>
                  <p className="text-xl font-bold">A208</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Last Token Purchase</p>
                  <p className="text-xl font-bold">{tokens[0]?.purchase_date || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-bold mb-4">Token History</h2>
          
          {tokens.length === 0 ? (
            <div className="text-center py-12 bg-muted rounded-lg">
              <Zap className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No token history</h3>
              <p className="text-muted-foreground mt-2">
                You haven't purchased any KPLC tokens yet
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setIsDialogOpen(true)}
              >
                Purchase Your First Token
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tokens.map((token) => (
                <Card key={token.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">KES {token.amount.toLocaleString()}</CardTitle>
                        <CardDescription>{token.purchase_date}</CardDescription>
                      </div>
                      {getStatusBadge(token.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-3">
                      <Zap className="h-5 w-5 text-primary mr-2" />
                      <span className="font-medium">{token.units} Units</span>
                    </div>
                    <div className="bg-muted p-3 rounded-md text-center">
                      <p className="text-sm font-mono mb-1">{token.token_number}</p>
                      <p className="text-xs text-muted-foreground">Token Number</p>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 px-6 py-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-full flex items-center justify-center gap-2"
                    >
                      <Receipt className="h-4 w-4" />
                      <span>View Receipt</span>
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

export default KplcTokens;
