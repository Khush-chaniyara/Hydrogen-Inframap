import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingCart, Leaf } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AvailableCredits: React.FC = () => {
  const { credits, buyCredit } = useData();
  const { user } = useAuth();
  const { toast } = useToast();

  const availableCredits = credits.filter(credit => credit.status === 'available');

  const handleBuy = async (creditId: string, units: number, price: number) => {
    if (!user) return;

    try {
      const transactionHash = buyCredit(creditId, user.username);
      
      toast({
        title: "Purchase Successful",
        description: `Successfully purchased ${units} carbon credits for $${(price * units).toFixed(2)}`,
      });
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Failed to complete purchase. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Leaf className="w-5 h-5 text-primary" />
          <CardTitle>Available Carbon Credits</CardTitle>
        </div>
        <CardDescription>
          Browse and purchase carbon credits from verified producers
        </CardDescription>
      </CardHeader>
      <CardContent>
        {availableCredits.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No carbon credits available at the moment</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Credit ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Producer</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Units</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Price/Unit</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Total Value</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Production Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {availableCredits.map((credit) => (
                  <tr key={credit.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {credit.id}
                      </code>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{credit.producer}</div>
                      <div className="text-sm text-muted-foreground">Batch: {credit.batchId}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">{credit.units}</span>
                        <span className="text-sm text-muted-foreground">kg CO₂</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium">${credit.price.toFixed(2)}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-primary">
                        ${(credit.price * credit.units).toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm">{credit.productionDate}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary" className="mr-2">Available</Badge>
                      <Button
                        size="sm"
                        onClick={() => handleBuy(credit.id, credit.units, credit.price)}
                        className="h-8"
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Buy
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AvailableCredits;