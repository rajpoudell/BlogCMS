import { useEffect } from "react";
import Card from "../components/common/Card";
import useBlogStore from "../stores/blogStore";

const Draft = () => {
  const { draftBlogsList, draftBlogs } = useBlogStore();

  useEffect(() => {
    draftBlogs();
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Draft</h1>
      <div className="rounded-lg  p-6 shadow-sm">
        <p>Welcome to your Draft page!</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-6 ">
        {draftBlogsList.map((blog) => (
          <Card key={blog.title} data={blog} />
        ))}
      </div>
    </div>
  );
};

export default Draft;
