import React, { useState } from 'react';
import { useCategoryStore } from '../../store/useCategoryStore.js';
import { Trash2 } from 'lucide-react';

const CategoryForm = ({ category, onClose }) => {
  const { addCategory, updateCategory, deleteCategory } = useCategoryStore();
  const [form, setForm] = useState({
    name: category?.name || '',
    type: category?.type || 'expense',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success = false;
    if (category) {
      success = await updateCategory(category._id, form);
    } else {
      success = await addCategory(form);
    }
    
    if (success) {
      onClose();
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const success = await deleteCategory(category._id);
      if (success) {
        onClose();
      }
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <h2 className="card-title text-2xl mb-4">
        {category ? 'Edit Category' : 'Add New Category'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Category Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g., Food, Salary"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control mb-6">
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

        <div className="modal-action">
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          {category && (
            <button
              type="button"
              className="btn btn-error"
              onClick={handleDelete}
            >
              <Trash2 size={16} /> Delete
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {category ? 'Save Changes' : 'Add Category'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;