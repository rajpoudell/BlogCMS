import useAuthStore from "../../stores/authStore";
import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { logout } = useAuthStore();
  const { isLoggedIn } = useAuthStore();
  return (
    <header className="fixed left-0 right-0 top-0 z-10 flex  h-18 items-center lg:justify-end justify-between shadow-xl/15 rounded bg-white px-4 lg:left-64">
      <button
        onClick={toggleSidebar}
        className="rounded p-2 hover:bg-gray-100 lg:hidden"
      >
        <FaBars className="h-6 w-6" />
      </button>
      <div className="flex  items-center  space-x-4 gap-3">
        {isLoggedIn ? (
          <>
            <h2>hi</h2>
            {localStorage.getItem("name")?.trim()}
            <Link to={"/profile"}>
              <CgProfile className="h-8 w-8" />
            </Link>
            <Link to={"/logout"}>
              <button
                onClick={logout}
                className=" w-full py-2 px-4 rounded hover:bg-slate-700 transition btn bg-slate-900   text-white cursor-pointer"
              >
                Logout
              </button>
            </Link>
          </>
        ) : (
          <Link to="/login">
            <button className=" w-full py-2 px-4 rounded hover:bg-slate-700 transition btn bg-slate-900   text-white cursor-pointer">
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
