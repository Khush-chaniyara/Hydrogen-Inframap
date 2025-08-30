import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ExternalLink, ArrowLeft } from 'lucide-react';

interface ProducerConfirmationProps {
  transactionHash: string;
  onBack: () => void;
}

const ProducerConfirmation: React.FC<ProducerConfirmationProps> = ({ 
  transactionHash, 
  onBack 
}) => {
  const getEtherscanUrl = (hash: string) => {
    return `https://polygonscan.com/tx/${hash}`;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <CardTitle className="text-success">Production Successfully Recorded!</CardTitle>
        <CardDescription>
          Your hydrogen production has been verified and carbon credits have been generated
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Status:</span>
            <span className="text-sm font-medium text-success">Confirmed</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-muted-foreground">Transaction Hash:</span>
            <div className="text-right">
              <code className="text-xs bg-background px-2 py-1 rounded border">
                {transactionHash.slice(0, 20)}...
              </code>
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 h-6 px-2"
                onClick={() => window.open(getEtherscanUrl(transactionHash), '_blank')}
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">What happens next?</h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
              <span>Your carbon credits are now available for purchase in the marketplace</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
              <span>Buyers can view and purchase your verified credits</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
              <span>All transactions are recorded on the blockchain for transparency</span>
            </li>
          </ul>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="flex-1">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Record Another Production
          </Button>
          <Button 
            onClick={() => window.open(getEtherscanUrl(transactionHash), '_blank')}
            className="flex-1"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View on Blockchain
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProducerConfirmation;