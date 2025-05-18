import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center pz-4">
      <h1 className="text-6xl font-bold ">401</h1>
      <p className="text-xl mt-4 ">Page Not Found</p>
      <p className="text-md mt-2 ">Sorry,the page you are looking for doesn't exit.</p>
      <Link to={"/" } className="mt-6 inline-block px-6 py-2 rounded-md transition">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
