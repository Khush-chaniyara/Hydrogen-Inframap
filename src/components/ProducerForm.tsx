import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart3, Calendar, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProducerFormProps {
  onSuccess: (transactionHash: string) => void;
}

const ProducerForm: React.FC<ProducerFormProps> = ({ onSuccess }) => {
  const [batchId, setBatchId] = useState('');
  const [units, setUnits] = useState('');
  const [date, setDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addProduction } = useData();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchId || !units || !date || !user) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const transactionHash = addProduction(batchId, parseInt(units), date, user.username);
      
      toast({
        title: "Production Recorded",
        description: `Successfully recorded ${units} kg of hydrogen production`,
      });
      
      onSuccess(transactionHash);
      
      // Reset form
      setBatchId('');
      setUnits('');
      setDate('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record production. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-6 h-6 text-primary" />
        </div>
        <CardTitle>Record Hydrogen Production</CardTitle>
        <CardDescription>
          Submit your hydrogen production data to generate carbon credits
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="batchId" className="text-sm font-medium">
              Hydrogen Batch ID *
            </Label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="batchId"
                placeholder="e.g., H2-2024-001"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="units" className="text-sm font-medium">
              Units Produced (kg) *
            </Label>
            <div className="relative">
              <BarChart3 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="units"
                type="number"
                placeholder="Enter production quantity"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="pl-10"
                min="1"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium">
              Production Date *
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-10"
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || !batchId || !units || !date}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Recording Production...
              </>
            ) : (
              <>
                <BarChart3 className="w-4 h-4 mr-2" />
                Submit Production
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProducerForm;