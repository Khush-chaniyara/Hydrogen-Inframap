import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { Activity, ExternalLink, TrendingUp } from 'lucide-react';

const TransactionsTable: React.FC = () => {
  const { transactions, credits } = useData();

  const getTotalTransactionValue = () => {
    return transactions.reduce((total, tx) => total + tx.price, 0);
  };

  const getTotalCreditsTraded = () => {
    return transactions.reduce((total, tx) => total + tx.units, 0);
  };

  const getSuccessRate = () => {
    const completed = transactions.filter(tx => tx.status === 'completed').length;
    return transactions.length > 0 ? (completed / transactions.length) * 100 : 0;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary" />
            <CardTitle>All Transactions</CardTitle>
          </div>
          <div className="flex space-x-6 text-sm">
            <div className="text-center">
              <div className="font-bold text-lg text-primary">{transactions.length}</div>
              <div className="text-muted-foreground">Total Transactions</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-blue-500">{getTotalCreditsTraded()}</div>
              <div className="text-muted-foreground">Credits Traded</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-green-500">${getTotalTransactionValue().toFixed(2)}</div>
              <div className="text-muted-foreground">Total Volume</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-success">{getSuccessRate().toFixed(0)}%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
        <CardDescription>
          Monitor all carbon credit transactions on the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No transactions recorded yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Transaction ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Producer → Buyer</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Credit ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Units</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Value</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date/Time</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Transaction Hash</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {transaction.id}
                      </code>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="font-medium">{transaction.producer}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">↓</div>
                        <div className="text-sm">
                          <span className="font-medium">{transaction.buyer}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {transaction.creditId}
                      </code>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">{transaction.units}</span>
                        <span className="text-sm text-muted-foreground">kg CO₂</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-primary">
                        ${transaction.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm">{transaction.date}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                        className={transaction.status === 'completed' ? 'bg-success text-success-foreground' : ''}
                      >
                        {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <code className="text-xs bg-background px-2 py-1 rounded border">
                          {transaction.transactionHash.slice(0, 10)}...
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`https://polygonscan.com/tx/${transaction.transactionHash}`, '_blank')}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
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

export default TransactionsTable;