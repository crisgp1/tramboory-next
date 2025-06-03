export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  reservationId?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  reservationId: string;
  amount: number;
  method: 'cash' | 'card' | 'transfer';
  status: 'pending' | 'completed' | 'failed';
  date: string;
  notes?: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  profit: number;
  pendingPayments: number;
  period: {
    start: string;
    end: string;
  };
}
