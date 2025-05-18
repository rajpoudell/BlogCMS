import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import useAuthStore from "../stores/authStore";
import useBlogStore from "../stores/blogStore";
import toast from "react-hot-toast";

const BlogDetails = () => {
  const { id } = useParams<{ id: any }>();
  const { isLoggedIn } = useAuthStore();

  const navigate = useNavigate();
  const { getaBlog, currentBlog, deleteBlog } = useBlogStore();
  useEffect(() => {
    getaBlog(id);
  }, [id]);

  const handleClick = (id: any) => {
    console.log(id);
    navigate(`/blog/edit/${id}`);
  };
  const handleDelete = (id: any) => {
    deleteBlog(id);
    toast.success("Blog Deleted!");
    navigate(`/blog`);
  };

  // at last
  return (
    <>
      <Button name="<-Back" clickout={() => navigate("/blog")} />
      {isLoggedIn && (
        <>
          <button
            onClick={() => handleClick(currentBlog?.id)}
            className="text-sm mx-1.5   float-right text-black font-medium cursor-pointer px-4 rounded p-2 bg-slate-500  hover:bg-slate-600 hover:text-white "
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(currentBlog?.id)}
            className="text-sm float-right text-black font-medium cursor-pointer px-4 rounded p-2 bg-red-500  hover:bg-red-600 hover:text-white "
          >
            Delete
          </button>
        </>
      )}

      <div className="p-6  rounded shadow mt-2 ">
        <div className="flex flex-col gap-4">
          <span className="text-sm tracking-wider font-medium ">
            Category:{currentBlog?.category}{" "}
          </span>

          <h1 className="text-3xl font-bold mb-4 text-center">
            {currentBlog?.title}
          </h1>

          <div className="w-full h-[150px] bg-slate-400 rounded-xl    shadow-2xl p-6 ">
            <img src={`${currentBlog?.coverImg}`} alt="coverImg" className="" />
          </div>
          <div className="flex justify-between items-center ">
            <p>
              <span className="font-bold">Author:</span> {currentBlog?.author}
            </p>
            <p className="text-sm font-medium text-slate-600">
              Created:{currentBlog?.createdDate}{" "}
            </p>
          </div>
          <p>{currentBlog?.description}</p>
        </div>

      </div>
      <span className="text-sm tracking-wider font-medium opacity-50 cursor-pointer">
        Tags:{" "}
        {currentBlog?.tags?.length
          ? "#" + currentBlog.tags.join("#")
          : "No tags"}{" "}
      </span>
    </>
  );
};

export default BlogDetails;
