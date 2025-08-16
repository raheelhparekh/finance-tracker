import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { useTransactionStore } from '../store/useTransactionStore.js';
import { useCategoryStore } from '../store/useCategoryStore.js';
import { Loader } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Download } from 'lucide-react';

// Refactored components
import MonthlySummary from '../components/dashboard/MonthlySummary.jsx';
import SpendingBreakdown from '../components/dashboard/SpendingBreakdown.jsx';
import TransactionHistory from '../components/dashboard/TransactionHistory.jsx';
import CategoryTable from '../components/dashboard/CategoryTable.jsx';
import TransactionForm from '../components/forms/TransactionForm.jsx';
import CategoryForm from '../components/forms/CategoryForm.jsx';
import IncomeExpenseChart from '../components/dashboard/IncomeExpenseChart.jsx';

import { exportToPDF, exportToCSV } from '../utils/export.js';
import toast from 'react-hot-toast';

// Register the necessary Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { authUser } = useAuthStore();
  const { transactions, fetchTransactions, isLoading: transactionsLoading } = useTransactionStore();
  const { categories, fetchCategories, isLoading: categoriesLoading } = useCategoryStore();

  const [modalState, setModalState] = useState({
    type: null, // 'transaction' or 'category'
    data: null, // the data to edit, or null for a new entry
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [filterDate, setFilterDate] = useState(new Date().toISOString().slice(0, 7)); // 'YYYY-MM'

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, [fetchTransactions, fetchCategories]);

  // Filter transactions based on the selected date
  const filteredTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date).toISOString().slice(0, 7);
    return transactionDate === filterDate;
  });

  // Data processing for charts and summary
  const totalIncome = filteredTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netSavings = totalIncome - totalExpenses;

  const expensesByCategory = filteredTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, transaction) => {
      const categoryName = transaction.category?.name || 'Uncategorized';
      if (!acc[categoryName]) {
        acc[categoryName] = 0;
      }
      acc[categoryName] += transaction.amount;
      return acc;
    }, {});
  
  const closeModal = async () => {
    setModalState({ type: null, data: null });
  };

  const handleExportPDF = () => {
    const success = exportToPDF(filteredTransactions, null);
    if (success) {
      toast.success('PDF exported successfully!');
    }
  };

  const handleExportCSV = () => {
    const success = exportToCSV(filteredTransactions);
    if (success) {
      toast.success('CSV exported successfully!');
    }
  };
  
  if (transactionsLoading || categoriesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold">Welcome back, {authUser?.name}!</h2>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={() => setModalState({ type: 'transaction', data: null })}>
            Add Transaction
          </button>
          <button className="btn btn-secondary" onClick={() => setModalState({ type: 'category', data: null })}>
            Add Category
          </button>
        </div>

        <input 
          type="month"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="input input-bordered"
        />

        <div className="dropdown dropdown-end ml-auto">
          <label tabIndex={0} className="btn btn-ghost">
            <Download size={20} />
            Export
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a onClick={handleExportPDF}>Export as PDF</a></li>
            <li><a onClick={handleExportCSV}>Export as CSV</a></li>
          </ul>
        </div>
      </div>

      <div role="tablist" className="tabs tabs-bordered">
        <a role="tab" className={`tab ${activeTab === 'overview' ? 'tab-active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</a>
        <a role="tab" className={`tab ${activeTab === 'transactions' ? 'tab-active' : ''}`} onClick={() => setActiveTab('transactions')}>Transactions</a>
        <a role="tab" className={`tab ${activeTab === 'categories' ? 'tab-active' : ''}`} onClick={() => setActiveTab('categories')}>Categories</a>
      </div>

      {activeTab === 'overview' && (
        <div className="flex flex-col gap-6">
          <MonthlySummary 
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            netSavings={netSavings}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpendingBreakdown expensesByCategory={expensesByCategory} />
            <IncomeExpenseChart transactions={filteredTransactions} />
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <TransactionHistory 
          transactions={filteredTransactions}
          categories={categories}
          onEdit={(t) => setModalState({ type: 'transaction', data: t })}
        />
      )}

      {activeTab === 'categories' && (
        <CategoryTable 
          categories={categories}
          onEdit={(c) => setModalState({ type: 'category', data: c })}
        />
      )}

      {modalState.type === 'transaction' && (
        <dialog id="transaction_modal" className="modal modal-open">
          <div className="modal-box">
            <TransactionForm
              transaction={modalState.data}
              onClose={closeModal}
            />
          </div>
        </dialog>
      )}

      {modalState.type === 'category' && (
        <dialog id="category_modal" className="modal modal-open">
          <div className="modal-box">
            <CategoryForm
              category={modalState.data}
              onClose={closeModal}
            />
          </div>
        </dialog>
      )}

    </div>
  );
};

export default Dashboard;