import {  useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import useBlogStore from "../stores/blogStore";

import Loading from "../components/common/Loading";
import Button from "../components/common/Button";
import Error from "../components/common/Error";

import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface AddFormInput {
  title: string;
  description: string;
  author: string;
  category: string;
  tags: string[];
  status: string;
  coverImg: File | null;
  createdDate: string;
}
const schema = Yup.object().shape({
  title: Yup.string()
    .min(6, "title must be at least 6 characters")
    .required("title is required"),
  description: Yup.string()
    .min(20, "description must be at least 20 characters")
    .required("description is required"),
  author: Yup.string().required("author is required"),
  category: Yup.string().required("category is required"),
  tags: Yup.array().of(Yup.string().required()).required("tags is required"),
  status: Yup.string().required("status is required"),
  coverImg: Yup.mixed<File>().nullable(),
  createdDate: Yup.string().required("createdDate is required"),
});

const EditBlog: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {  getaBlog,currentBlog, updateBlog,categories, authors, loading, error } =
    useBlogStore();
  const [preview, setPreview] = useState<string | null>(null);
  const { id } = useParams<{ id?: string }>();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddFormInput>({
    resolver: yupResolver(schema) as Resolver<AddFormInput>,
    defaultValues: {
      tags: [],
      status: "draft",
      createdDate: new Date().toISOString(),
      coverImg: null,
    },
  });
useEffect(() => {
  if (id) {
    getaBlog(id); 
  }
}, [id, getaBlog]);

useEffect(() => {
  if (currentBlog) {
    setValue("title", currentBlog.title);
    setValue("description", currentBlog.description);
    setValue("author", currentBlog.author);
    setValue("category", currentBlog.category);
    setValue("tags", currentBlog.tags);
    setValue("status", currentBlog.status);
    setValue("coverImg", currentBlog.coverImg);
    setValue("createdDate", currentBlog.createdDate);

    if (currentBlog.coverImg && typeof currentBlog.coverImg === "string") {
      setPreview(currentBlog.coverImg);
    }
  }
}, [currentBlog, setValue]);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: AddFormInput) => {
    try {
      setErrorMessage("");
      console.log(data);
      
      await updateBlog(id!, data);
      toast.success("Blog updated!");
      navigate("/blog");
    } catch (error: unknown) {
      if (error instanceof Error) {
        // setErrorMessage(error:any);
      } else {
        toast.error("Something went wrong");
        setErrorMessage("Something went wrong");
      }
    }
  };
  return (
    <div>
      <div className="flex justify-between  items-center">
        <Link to="/blog">
          <Button name="<-Back" />
        </Link>
        <h1 className="mb-6 text-2xl font-bold">Edit-Blogs</h1>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <p>Edit your Blogs !</p>
      </div>

      {loading && <Loading />}
      {error && <Error error={error} />}
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-lg mt-4 "
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {errorMessage && (
          <p className="text-red-500 text-center text-sm mb-4">
            {errorMessage}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-slate-700 text-sm mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            className={`w-full px-3 py-2 border rounded ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-slate-700 text-sm mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            className={`w-full px-3 py-2 border rounded ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-slate-700 text-sm mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            {...register("category")}
            className={`w-full px-3 py-2 border rounded ${
              errors.category ? "border-red-500" : "border-slate-300"
            }`}
          >
            <option value="">select categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-slate-700 text-sm mb-2" htmlFor="author">
            Author
          </label>
          <select
            id="author"
            {...register("author")}
            className={`w-full px-3 py-2 border rounded${
              errors.author ? "border-red-500" : "border-slate-300"
            }`}
          >
            <option value=""> select author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
          {errors.author && (
            <p className="text-red-500 text-xs mt-1">{errors.author.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-slate-700 text-sm mb-2" htmlFor="tags">
            Tags (comma separated)
          </label>
          <input
            id="tags"
            type="text"
            {...register("tags", {
              setValueAs: (v) =>
                typeof v === "string"
                  ? v
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean)
                  : [],
            })}
            className={`w-full px-3 py-2 border rounded ${
              errors.tags ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.tags && (
            <p className="text-red-500 text-xs mt-1">{errors.tags.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-slate-700 text-sm mb-2" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            {...register("status")}
            className={`w-full px-3 py-2 border rounded ${
              errors.status ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select status</option>
            <option value="draft">Draft</option>
            <option value="publish">Publish</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-slate-700 text-sm mb-2"
            htmlFor="coverImg"
          >
            Cover Image URL
          </label>
          {preview && (
            <img
              src={preview}
              alt="Cover preview"
              className="my-2 max-w-full h-auto rounded"
            />
          )}{" "}
          <input
            id="coverImg"
            type="file"
            {...register("coverImg")}
            accept="image/*"
            onChange={handleImageChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.coverImg ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.coverImg && (
            <p className="text-red-500 text-xs mt-1">
              {errors.coverImg.message}
            </p>
          )}
        </div>
        <Button name="submit" />
      </form>
    </div>
  );
};

export default EditBlog;
