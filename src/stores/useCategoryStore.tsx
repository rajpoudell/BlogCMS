// src/store/useCategoryStore.ts
import { create } from 'zustand';
import axios from 'axios';

export interface Category {
  id: string;
  name: string;
}

interface CategoryStore {
  categories: Category[];
  loading: boolean;
  error: string | null;

  fetchCategories: () => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, data: Omit<Category, 'id'>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

const API_URL = 'https://68286b656b7628c5291342ab.mockapi.io/categories';

const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const res = await axios.get<Category[]>(API_URL);
      set({ categories: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  addCategory: async (category) => {
    try {
      const res = await axios.post<Category>(API_URL, category);
      set((state) => ({
        categories: [...state.categories, res.data],
      }));
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  updateCategory: async (id, data) => {
    try {
      const res = await axios.put<Category>(`${API_URL}/${id}`, data);
      set((state) => ({
        categories: state.categories.map((cat) =>
          cat.id === id ? res.data : cat
        ),
      }));
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  deleteCategory: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== id),
      }));
    } catch (err: any) {
      set({ error: err.message });
    }
  },
}));

export default useCategoryStore;
