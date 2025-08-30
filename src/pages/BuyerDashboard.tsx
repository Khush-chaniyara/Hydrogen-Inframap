import React from 'react';
import Layout from '@/components/Layout';
import AvailableCredits from '@/components/AvailableCredits';
import BuyerHistory from '@/components/BuyerHistory';

const BuyerDashboard: React.FC = () => {
  return (
    <Layout title="Buyer Dashboard">
      <div className="space-y-8">
        <AvailableCredits />
        <BuyerHistory />
      </div>
    </Layout>
  );
};

export default BuyerDashboard;