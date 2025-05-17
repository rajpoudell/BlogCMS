import axios from "axios";
import { create } from "zustand";

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



interface TagState {
  tags: Tag[];
  categories: Category[];
  author: Author[];
  loading: boolean;
  error: string | null;
  fetchTags: () => Promise<void>;
  fetchCategory: () => Promise<void>;
  fetchAuthor:() => Promise<void>;
}
const useTagStore = create<TagState>((set) => ({
  tags: [],
  categories: [],
  author: [],
  loading: false,
  error: null,
  fetchTags: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${apiUrl}/blog`);
      const allTags: string[] = res.data.flatMap((blog: any) => blog.tags);
      const uniqueTags: string[] = Array.from(new Set(allTags));
      const tagObjects = uniqueTags.map((tag, index) => ({
        id: String(index + 1),
        title: tag,
      }));
      set({ tags: tagObjects, loading: false });
            localStorage.setItem("tags", JSON.stringify(tagObjects));

    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch blogs";
      set({ error: message, loading: false });
    }
  },
  fetchCategory: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${apiUrl}/blog`);
      const allCategorys: string[] = res.data.flatMap(
        (blog: any) => blog.category
      );
      const uniqueCategorys: string[] = Array.from(new Set(allCategorys));
      const categoryObjects = uniqueCategorys.map((category, index) => ({
        id: String(index + 1),
        title: category,
      }));
      set({ categories: categoryObjects, loading: false });
      localStorage.setItem("categories", JSON.stringify(categoryObjects));
      
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch blogs";
      set({ error: message, loading: false });
    }
  },
  fetchAuthor: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${apiUrl}/blog`);
      const allAuthor: string[] = res.data.flatMap(
        (blog: any) => blog.author
      );
      const uniqueCategorys: string[] = Array.from(new Set(allAuthor));
      const aurthorObjects = uniqueCategorys.map((author, index) => ({
        id: String(index + 1),
        name: author,
      }));
      set({ author: aurthorObjects, loading: false });      
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch blogs";
      set({ error: message, loading: false });
    }
  },
}));

export default useTagStore;
