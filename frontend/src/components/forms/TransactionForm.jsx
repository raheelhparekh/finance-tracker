import React, { useState, useEffect } from 'react';
import { useTransactionStore } from '../../store/useTransactionStore.js';
import { useCategoryStore } from '../../store/useCategoryStore.js';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

const TransactionForm = ({ transaction, onClose }) => {
  const { addTransaction, updateTransaction, deleteTransaction } = useTransactionStore();
  const { categories, fetchCategories, isLoading: categoriesLoading } = useCategoryStore();

  const [form, setForm] = useState({
    type: transaction?.type || 'expense',
    amount: transaction?.amount || '',
    category: transaction?.category?._id || '',
    description: transaction?.description || '',
    date: transaction?.date ? new Date(transaction.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [fetchCategories, categories.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category) {
      toast.error('Please select a category.');
      return;
    }

    let success = false;
    if (transaction) {
      success = await updateTransaction(transaction._id, form);
    } else {
      success = await addTransaction(form);
    }
    
    if (success) {
      onClose();
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      const success = await deleteTransaction(transaction._id);
      if (success) {
        onClose();
      }
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <h2 className="card-title text-2xl mb-4">{transaction ? 'Edit Transaction' : 'Add New Transaction'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Type</span>
          </label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Amount ($)</span>
          </label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="e.g., 50.00"
            className="input input-bordered w-full"
            step="0.01"
            required
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          {categoriesLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name} ({category.type})
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="e.g., Lunch with a friend"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="modal-action">
          <button type="button" className="btn" onClick={onClose}>Cancel</button>
          {transaction && (
            <button type="button" className="btn btn-error" onClick={handleDelete}>
              <Trash2 size={16} /> Delete
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {transaction ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;