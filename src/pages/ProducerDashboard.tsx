import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ProducerForm from '@/components/ProducerForm';
import ProducerConfirmation from '@/components/ProducerConfirmation';

const ProducerDashboard: React.FC = () => {
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handleSuccess = (hash: string) => {
    setTransactionHash(hash);
  };

  const handleBack = () => {
    setTransactionHash(null);
  };

  return (
    <Layout title="Producer Dashboard">
      <div className="max-w-4xl mx-auto">
        {transactionHash ? (
          <ProducerConfirmation 
            transactionHash={transactionHash} 
            onBack={handleBack}
          />
        ) : (
          <ProducerForm onSuccess={handleSuccess} />
        )}
      </div>
    </Layout>
  );
};

export default ProducerDashboard;