// src/components/CategoryManager.tsx
import React, { useEffect, useState } from "react";
import useCategoryStore from "../../stores/useCategoryStore";
import Button from "./Button";
import toast from "react-hot-toast";

interface Category {
     id: string;
  name: string;
}
const CategoryManager: React.FC = () => {
  const {
    categories,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    loading,
    error,
  } = useCategoryStore();

  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCategory = { name };

    if (editingId) {
      updateCategory(editingId, newCategory);
    }

    if (name.length > 0) {
        toast.success("Added Successfully!");
        addCategory(newCategory);
        
    }else{
        
        toast.error("Please enters the category!");
      }

      setEditingId(null);
      setName("");
  };

  const handleEdit = (category: Category) => {
    setName(category.name);
    setEditingId(category.id);
  };

  return (
    <div className="m-2">
      <h1 className="mb-6 text-2xl font-bold">Categories:</h1>

      <form onSubmit={handleSubmit} className="m-2">
        <div className="mb-4">
          <label className="block  text-sm mb-2" htmlFor="category name">
            Add category
          </label>
          <input
            type="text"
            placeholder="Category name"
            value={name}
            className={`w-full px-3 py-2 border rounded `}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <Button
          name={`${editingId ? "Update" : "Add"}`}
          clickout={handleSubmit}
        />
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Category Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td className="px-4 py-2 text-sm text-gray-800">{cat.name}</td>
              <td className="px-4 py-2 space-x-2">
                <div className="flex gap-2 ">
                  <Button name="Edit" clickout={() => handleEdit(cat)} />
                  <div className="rounded hover:shadow hover:shadow-red-500 border-2    outline-none border-red-500">
                    <Button
                      clickout={() => deleteCategory(cat.id)}
                      name="Delete"
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManager;
