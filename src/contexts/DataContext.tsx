import React, { createContext, useContext, useState } from 'react';

export interface CarbonCredit {
  id: string;
  batchId: string;
  units: number;
  producer: string;
  price: number;
  productionDate: string;
  status: 'available' | 'sold' | 'retired';
  buyer?: string;
  transactionHash?: string;
  purchaseDate?: string;
  retirementDate?: string;
}

export interface Transaction {
  id: string;
  creditId: string;
  producer: string;
  buyer: string;
  units: number;
  price: number;
  date: string;
  transactionHash: string;
  status: 'pending' | 'completed';
}

interface DataContextType {
  credits: CarbonCredit[];
  transactions: Transaction[];
  addProduction: (batchId: string, units: number, date: string, producer: string) => string;
  buyCredit: (creditId: string, buyer: string) => string;
  retireCredit: (creditId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const initialCredits: CarbonCredit[] = [
  {
    id: 'CC-2024-001',
    batchId: 'H2-2024-001',
    units: 250,
    producer: 'GreenTech Hydrogen Ltd.',
    price: 15.50,
    productionDate: '2024-01-15',
    status: 'available'
  },
  {
    id: 'CC-2024-002',
    batchId: 'H2-2024-005',
    units: 180,
    producer: 'EcoHydro Solutions',
    price: 14.25,
    productionDate: '2024-01-20',
    status: 'available'
  },
  {
    id: 'CC-2024-003',
    batchId: 'H2-2024-008',
    units: 420,
    producer: 'Renewable Energy Corp',
    price: 16.75,
    productionDate: '2024-01-18',
    status: 'available'
  }
];

const initialTransactions: Transaction[] = [
  {
    id: 'TXN-001',
    creditId: 'CC-2024-001',
    producer: 'GreenTech Hydrogen Ltd.',
    buyer: 'EcoTech Solutions Inc.',
    units: 100,
    price: 1550.00,
    date: '2024-01-25',
    transactionHash: '0x1234567890abcdef...',
    status: 'completed'
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [credits, setCredits] = useState<CarbonCredit[]>(initialCredits);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const generateTxHash = () => {
    return '0x' + Math.random().toString(16).substring(2, 42);
  };

  const addProduction = (batchId: string, units: number, date: string, producer: string): string => {
    const creditId = `CC-2024-${String(credits.length + 1).padStart(3, '0')}`;
    const newCredit: CarbonCredit = {
      id: creditId,
      batchId,
      units,
      producer,
      price: 15.00 + Math.random() * 5, // Random price between 15-20
      productionDate: date,
      status: 'available'
    };
    
    setCredits(prev => [...prev, newCredit]);
    return generateTxHash();
  };

  const buyCredit = (creditId: string, buyer: string): string => {
    const txHash = generateTxHash();
    const purchaseDate = new Date().toISOString().split('T')[0];
    
    setCredits(prev => prev.map(credit => 
      credit.id === creditId 
        ? { ...credit, status: 'sold' as const, buyer, transactionHash: txHash, purchaseDate }
        : credit
    ));

    const credit = credits.find(c => c.id === creditId);
    if (credit) {
      const newTransaction: Transaction = {
        id: `TXN-${transactions.length + 1}`,
        creditId,
        producer: credit.producer,
        buyer,
        units: credit.units,
        price: credit.price * credit.units,
        date: purchaseDate,
        transactionHash: txHash,
        status: 'completed'
      };
      setTransactions(prev => [...prev, newTransaction]);
    }

    return txHash;
  };

  const retireCredit = (creditId: string) => {
    const retirementDate = new Date().toISOString().split('T')[0];
    setCredits(prev => prev.map(credit => 
      credit.id === creditId 
        ? { ...credit, status: 'retired' as const, retirementDate }
        : credit
    ));
  };

  const value = {
    credits,
    transactions,
    addProduction,
    buyCredit,
    retireCredit
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};