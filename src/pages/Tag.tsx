import CategoryManager from "../components/common/CategoryManager";
import Error from "../components/common/Error";
import Loading from "../components/common/Loading";
import useBlogStore from "../stores/blogStore";

const Tag = () => {
  const { tags, loading, error } = useBlogStore();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Tag</h1>
      <div className="rounded-lg border  p-6 shadow-sm">
        <p>All Tags and Categories uses in the blog</p>
      </div>

      {loading && <Loading />}
      {error && <Error error={error} />}
      <div className="mt-6   p-4 shadow-sm">
        <p className="text-2xl font-bold py-2">Tags:</p>

        <div className="grid    grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-4 ">
          {tags.map((tag) => (
            <span key={tag.id}>
              {tag.id}.{tag.title}
            </span>
          ))}
        </div>
      </div>

      <CategoryManager />
    </div>
  );
};

export default Tag;
