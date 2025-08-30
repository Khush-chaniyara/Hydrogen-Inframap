import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { History, ExternalLink, ShoppingBag } from 'lucide-react';

const BuyerHistory: React.FC = () => {
  const { credits, transactions } = useData();
  const { user } = useAuth();

  const userPurchases = credits.filter(credit => 
    credit.buyer === user?.username && credit.status === 'sold'
  );

  const userTransactions = transactions.filter(tx => tx.buyer === user?.username);

  const getTotalSpent = () => {
    return userTransactions.reduce((total, tx) => total + tx.price, 0);
  };

  const getTotalCredits = () => {
    return userPurchases.reduce((total, credit) => total + credit.units, 0);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-primary" />
            <CardTitle>Purchase History</CardTitle>
          </div>
          <div className="flex space-x-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-lg text-primary">{getTotalCredits()}</div>
              <div className="text-muted-foreground">Credits Owned</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-blue-500">${getTotalSpent().toFixed(2)}</div>
              <div className="text-muted-foreground">Total Spent</div>
            </div>
          </div>
        </div>
        <CardDescription>
          Your carbon credit purchase transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {userPurchases.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No purchases yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Browse available credits above to make your first purchase
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Credit ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Producer</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Units</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount Paid</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Purchase Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Transaction</th>
                </tr>
              </thead>
              <tbody>
                {userPurchases.map((credit) => (
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
                      <span className="font-medium text-primary">
                        ${(credit.price * credit.units).toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm">{credit.purchaseDate}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="default" className="bg-success text-success-foreground">
                        Completed
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {credit.transactionHash && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`https://polygonscan.com/tx/${credit.transactionHash}`, '_blank')}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      )}
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

export default BuyerHistory;