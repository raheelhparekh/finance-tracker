import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useTransactionStore } from '../../store/useTransactionStore.js';

const TransactionHistory = ({ transactions, onEdit }) => {
  const { deleteTransaction } = useTransactionStore();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await deleteTransaction(id);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title text-2xl">Recent Transactions</h3>
        <div className="overflow-x-auto mt-4">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.category?.name}</td>
                    <td className={transaction.type === 'income' ? 'text-success' : 'text-error'}>
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td>{transaction.type}</td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-ghost btn-sm" onClick={() => onEdit(transaction)}>
                          <Edit size={16} />
                        </button>
                        <button className="btn btn-ghost btn-sm text-error" onClick={() => handleDelete(transaction._id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;