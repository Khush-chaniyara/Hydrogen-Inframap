import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { Trash2, ExternalLink, Archive } from 'lucide-react';

const RetiredCredits: React.FC = () => {
  const { credits } = useData();

  const retiredCredits = credits.filter(credit => credit.status === 'retired');

  const getTotalRetiredUnits = () => {
    return retiredCredits.reduce((total, credit) => total + credit.units, 0);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Archive className="w-5 h-5 text-purple-500" />
            <CardTitle>Retired Credits</CardTitle>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-purple-500">{getTotalRetiredUnits()}</div>
            <div className="text-muted-foreground text-sm">Total Retired Units</div>
          </div>
        </div>
        <CardDescription>
          Track carbon credits that have been permanently retired/burned
        </CardDescription>
      </CardHeader>
      <CardContent>
        {retiredCredits.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No credits have been retired yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Retired credits will appear here when they are permanently removed from circulation
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Credit ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Original Producer</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Units Retired</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Retirement Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Transaction Hash</th>
                </tr>
              </thead>
              <tbody>
                {retiredCredits.map((credit) => (
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
                      <span className="text-sm">{credit.retirementDate}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        <Archive className="w-3 h-3 mr-1" />
                        Retired
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {credit.transactionHash && (
                        <div className="flex items-center space-x-2">
                          <code className="text-xs bg-background px-2 py-1 rounded border">
                            {credit.transactionHash.slice(0, 10)}...
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(`https://polygonscan.com/tx/${credit.transactionHash}`, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
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

export default RetiredCredits;