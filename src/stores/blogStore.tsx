import { create } from 'zustand';

interface Blog {
  id: string;
  title: string;
  description:string;
  author: string;
  category: string;
  tags: string;
  status: boolean;
  CoverImg: string;
}

interface BlogState {
  

}

const blogStore = create<BlogState>((set) => ({

});
