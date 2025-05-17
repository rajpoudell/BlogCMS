import { Helmet } from "react-helmet-async";
import useBlogStore from "../stores/blogStore";

const Dashboard = () => {
    const { length } = useBlogStore();

  return (
    <div className="">
      <Helmet>
        <title>Dashboard - BlogCMS</title>
        <meta name="description" content="This is the dashboard of My BlogCMS. Discover amazing features and Blogs." />
      </Helmet>
      <h1 className="mb-6 text-2xl font-bold  ">Dashboard</h1>
      <div className=" rounded-lg border  p-6 shadow-sm">
        <p>Welcome to your dashboard!</p>
                {length}

      </div>
    </div>
  );
};

export default Dashboard;
