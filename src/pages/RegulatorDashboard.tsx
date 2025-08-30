import React from 'react';
import Layout from '@/components/Layout';
import TransactionsTable from '@/components/TransactionsTable';
import RetiredCredits from '@/components/RetiredCredits';

const RegulatorDashboard: React.FC = () => {
  return (
    <Layout title="Regulator Dashboard">
      <div className="space-y-8">
        <TransactionsTable />
        <RetiredCredits />
      </div>
    </Layout>
  );
};

export default RegulatorDashboard;