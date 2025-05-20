import useAuthStore from "../../stores/authStore";
import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import DarkModeToggle from "../../utils/DarkModeToggle";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { logout } = useAuthStore();
  const { isLoggedIn } = useAuthStore();
  return (
    <header className=" dark:bg-slate-900 text-slate-900 bg-white fixed left-0 right-0 top-0 z-10 flex  h-18 items-center lg:justify-end justify-between shadow-xl/15 rounded  px-4 lg:left-64">
      <button
        onClick={toggleSidebar}
        className="rounded p-2 dark:hover:bg-slate-600 hover:bg-slate-200 lg:hidden"
      >
        <FaBars className="h-6 w-6" />
      </button>
      <div className="flex  items-center  space-x-4 gap-3">
        <DarkModeToggle  />

        {isLoggedIn ? (
          <>
            <h2 className="cursor-default">
              <span className="font-bold gap-1">Hi !</span>
              <span className=" px-2.5">
                {localStorage.getItem("name")?.split(" ")[0]}
              </span>
            </h2>

            <Link to={"/"}>
              <CgProfile className="h-8 w-8" />
            </Link>
            <Link to={"/login"}>
              <Button clickout={() => logout()} name="Logout" />
            </Link>
          </>
        ) : (
          <Link to="/login">
            <Button name="Login" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
