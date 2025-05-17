import { useEffect } from "react";
import useBlogStore from "../stores/blogStore";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";

const Blog = () => {
  const { blogs, fetchBlogs, loading, error } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
    console.log(blogs);
  }, []);
  return (
    <div>
      <div className="flex justify-between  items-center">
        <h1 className="mb-6 text-2xl font-bold">Blogs</h1>
        <Link to="/blog/addblog">
        <Button  name="Create+" />
        </Link>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <p>Welcome to your Blogs !</p>
      </div>

      {loading && <Loading />}
      {error && <Error error={error} />}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-6 ">
        {blogs.map((blog) => (
          <Card key={blog.id} data={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
