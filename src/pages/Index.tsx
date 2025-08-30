import { useAuth } from '@/contexts/AuthContext';
import Login from './Login';
import ProducerDashboard from './ProducerDashboard';
import BuyerDashboard from './BuyerDashboard';
import RegulatorDashboard from './RegulatorDashboard';

const Index = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  // Route to appropriate dashboard based on user role
  switch (user?.role) {
    case 'producer':
      return <ProducerDashboard />;
    case 'buyer':
      return <BuyerDashboard />;
    case 'regulator':
      return <RegulatorDashboard />;
    default:
      return <Login />;
  }
};

export default Index;
