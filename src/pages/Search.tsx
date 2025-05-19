import React, { useState, useEffect, type ChangeEvent } from "react";
import useBlogStore from "../stores/blogStore";
import { Link, useParams } from "react-router-dom";
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

const Search: React.FC = () => {
  const { blogs, setBlogs, searchBlogs, resetSearch } = useBlogStore();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { name } = useParams();

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch(
        "https://6826c619397e48c9131736e8.mockapi.io/api/v1/blog"
      );
      const data: Blog[] = await res.json();
      setBlogs(data);
      if (name) {
        setSearchTerm(name);
        searchBlogs(name);
      } else {
        resetSearch();
        setSearchTerm("");
      }
    };

    fetchBlogs();
  }, [setBlogs, name]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      resetSearch();
    } else {
      searchBlogs(value);
    }
  };

  return (
    <>
      <input
        type="text"
        className="w-full p-4 border border-gray-300 rounded-md"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by title or tag..."
      />
      <ul>
        {blogs.map((blog) => (
          <Link to={`/blog/${blog.id}`} key={blog.id}>
            <li className="p-2 shadow m-2 rounded">
              {blog.id}.{blog.title}
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default Search;
