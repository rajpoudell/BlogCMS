import { Helmet } from "react-helmet-async";
import { LuNotebookPen } from "react-icons/lu";

const Dashboard = () => {

  return (
    <div className="">
      <Helmet>
        <title>Dashboard - BlogCMS</title>
        <meta
          name="description"
          content="This is the dashboard of My BlogCMS. Discover amazing features and Blogs."
        />
      </Helmet>
      <h1 className="mb-6 text-2xl font-bold   ">Dashboard</h1>
      <div className=" rounded-lg   p-6 shadow-sm">
        <p>Welcome to your dashboard!</p>
        <div className="p-4 flex flex-wrap justify-between gap-4   rounded-lg">
          <div className="flex items-center gap-3 p-4 rounded flex-1 min-w-[250px]">
            <div>
              <p className="text-sm ">Total Blogs:</p>
              <p className="text-lg font-semibold ">20</p>
              <LuNotebookPen className="h-6 w-6 text-blue-500" />
            </div>
          </div>

          <div className="p-4  rounded flex-1 min-w-[250px]">
            <p className="text-sm ">Total Published Blogs:</p>
            <p className="text-lg font-semibold ">12</p>
            <LuNotebookPen className="h-6 w-6 text-green-600" />
          </div>

          <div className="p-4  rounded flex-1 min-w-[250px]">
            <p className="text-sm ">Total Draft Blogs:</p>
            <p className="text-lg font-semibold ">08</p>
            <LuNotebookPen className="h-6 w-6 text-red-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
