import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useCategoryStore } from '../../store/useCategoryStore.js';

const CategoryTable = ({ categories, onEdit }) => {
  const { deleteCategory } = useCategoryStore();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await deleteCategory(id);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title text-2xl">Categories</h3>
        <div className="overflow-x-auto mt-4">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>{category.type}</td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-ghost btn-sm" onClick={() => onEdit(category)}>
                          <Edit size={16} />
                        </button>
                        <button className="btn btn-ghost btn-sm text-error" onClick={() => handleDelete(category._id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">No categories found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;