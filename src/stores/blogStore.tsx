import axios from "axios";
import { create } from "zustand";
import useAuthStore from "./authStore";

const apiUrl = import.meta.env.VITE_BLOG_API_BASE_URL;

interface Tag {
  id: string;
  title: string;
}
interface Category {
  id: string;
  title: string;
}
interface Author {
  id: string;
  name: string;
}

interface Blog {
  id?: string;
  title: string;
  description: string;
  author: string;
  category: string;
  tags: string[];
  status: "publish" | "draft" | string;
  coverImg: File | null;
  createdDate: string;
}

interface BlogState {
  blogs: Blog[];
  currentBlog: Blog | null;
  allBlogs: Blog[];

  tags: Tag[];
  categories: Category[];
  authors: Author[];

  draftBlogsList: Blog[];

  length: number;
  loading: boolean;
  error: string | null;
  fetchBlogs: () => Promise<void>;
  addBlog: (newBlog: Omit<Blog, "id">) => Promise<void>;
  getaBlog: (id: string) => Promise<Blog | void>;
  updateBlog: (id: string, updatedBlog: Partial<Blog>) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  searchBlogs: (keyword: string) => void;
  setBlogs: (data: Blog[]) => void;
  resetSearch: () => void;
  draftBlogs: () => Promise<void>;
}

const useBlogStore = create<BlogState>((set, get) => ({
  blogs: [],
  tags: [],
  allBlogs: [],

  setBlogs: (data) => set({ blogs: data, allBlogs: data }),
  categories: [],
  currentBlog: null,
  authors: [],
  draftBlogsList: [],
  length: 0,
  loading: false,
  error: null,

  fetchBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${apiUrl}/blog`);

      const length = res.data.length;

      const blogs: Blog[] = res.data;

      // tag filter
      const allTags = blogs.flatMap((blog) => blog.tags);
      const uniqueTags = Array.from(new Set(allTags));
      const tagObjects = uniqueTags.map((tag, index) => ({
        id: String(index + 1),
        title: tag,
      }));

      //cat filter to dropdown
      const allCategories = blogs.map((blog) => blog.category);
      const uniqueCategories = Array.from(new Set(allCategories));
      const categoryObjects = uniqueCategories.map((cat, index) => ({
        id: String(index + 1),
        title: cat,
      }));

      // all author to dropdwon

      const allAuthors = blogs.map((blog) => blog.author);
      const uniqueAuthors = Array.from(new Set(allAuthors));
      const authorObjects = uniqueAuthors.map((author, index) => ({
        id: String(index + 1),
        name: author,
      }));
      set({
        blogs,
        tags: tagObjects,
        categories: categoryObjects,
        authors: authorObjects,
        length: length,
        loading: false,
        error: null,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch blogs";
      set({ error: message, loading: false });
    }
  },
  getaBlog: async (id) => {
    try {
      const res = await axios.get(`${apiUrl}/blog/${id}`);
      set({ currentBlog: res.data, loading: false });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch blogs";
      set({ error: message, loading: false });
    }
  },

  addBlog: async (newBlog) => {
    set({ loading: true, error: null });
    const { user, isLoggedIn } = useAuthStore.getState();

    try {
      if (!user || !isLoggedIn) {
        set({ error: "Unauthorized: You can only edit your own blogs" });
        return;
      } else {
        const res = await axios.post<Blog>(`${apiUrl}/blog`, newBlog);

        set({ blogs: [...get().blogs, res.data], loading: false });
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch blogs";
      set({ error: message, loading: false });
    }
  },

  updateBlog: async (id, updatedBlog) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.put<Blog>(`${apiUrl}/blog/${id}`, updatedBlog);
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
  deleteBlog: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${apiUrl}/blog/${id}`);
      set({ blogs: get().blogs.filter((b) => b.id !== id), loading: false });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch blogs";
      set({ error: message, loading: false });
    }
  },
  searchBlogs: (keyword) => {
    const filteredBlogs = get().allBlogs.filter((blog) =>
      blog.title.toLowerCase().includes(keyword.toLowerCase()) || blog.tags.some((tag) => tag.toLowerCase().includes(keyword.toLowerCase()))  
    );
    set({ blogs: filteredBlogs });
  },
  resetSearch: () => {
    set({ blogs: get().allBlogs });
  },
  draftBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${apiUrl}/blog`);
      const blogs: Blog[] = res.data;
      const drafts = blogs.filter((blog) => blog.status === "draft");

      set({
        draftBlogsList: drafts,
        loading: false,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch blogs";
      set({ error: message, loading: false });
    }
  },
}));

export default useBlogStore;