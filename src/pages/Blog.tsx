import React, { useEffect } from "react";
import useBlogStore from "../stores/blogStore";
import Loading from "../components/common/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAuthStore from "../stores/authStore";

const Error = React.lazy(() => import("../components/common/Error"));
const Card = React.lazy(() => import("../components/common/Card"));
const Button = React.lazy(() => import("../components/common/Button"));

const Blog = () => {
  const { blogs, fetchBlogs, loading, error } = useBlogStore();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div>
      <Helmet>
        <title>All Blog - BlogCMS</title>
        <meta
          name="description"
          content="This is the blog list page of My Website. All list of the blog"
        />
      </Helmet>
      <div className="flex justify-between  items-center">
        <h1 className="mb-6 text-2xl font-bold">Blogs</h1>
        {isLoggedIn && (
          <Link to="/blog/addblog">
            <Button name="Create+" />
          </Link>
        )}
      </div>

      <div className="rounded-lg border dark:border-slate-800 bg-white dark:bg-slate-800  p-6 shadow-sm">
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
