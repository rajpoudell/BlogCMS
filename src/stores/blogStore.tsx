import axios from "axios";
import { create } from "zustand";

const apiUrl = import.meta.env.VITE_BLOG_API_BASE_URL;

interface Blog {
  id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  tags: string[];
  status: "publish" | "draft" | string;
  coverImg: File |null ;
  createdDate: string;
}

interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  fetchBlogs: () => Promise<void>;
  addBlog: (newBlog: Omit<Blog, "id">) => Promise<void>;
  updateBlog: (id: string, updatedBlog: Partial<Blog>) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  searchBlogs: (keyword: string) => void;
  resetSearch: () => void;
}

const useBlogStore = create<BlogState>((set, get) => ({
  blogs: [],
  loading: false,
  error: null,
  fetchBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${apiUrl}/blog`);

      console.log(res);
      set({ blogs: res.data, loading: false, error: null });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch blogs";
      set({ error: message, loading: false });
    }
  },
  addBlog: async (newBlog) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post<Blog>(`${apiUrl}/blog`, newBlog);

      set({ blogs: [...get().blogs, res.data], loading: false });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch blogs";
      set({ error: message, loading: false });
    }
  },

  updateBlog: async (id, updatedBlog) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.put<Blog>(`/blog/${id}`, updatedBlog);
      set({
        blogs: get().blogs.map((b) => (b.id === id ? res.data : b)),
        loading: false,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch blogs";
      set({ error: message, loading: false });
    }
  },
  deleteBlog: async (id) => {},
  searchBlogs: (keyword) => {},
  resetSearch: () => {},
}));

export default useBlogStore;
