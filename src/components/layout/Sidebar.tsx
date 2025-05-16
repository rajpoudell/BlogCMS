import type React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHome, FaSearch   } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { PiNotePencilFill, PiReadCvLogo, PiTagDuotone } from "react-icons/pi";


interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}
const Sidebar:React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <FaHome className="h-5 w-5" /> },
    { name: 'Blogs', path: '/blog', icon: <PiReadCvLogo  className="h-5 w-5" /> },
    { name: 'Tags', path: '/tag', icon: <PiTagDuotone className="h-5 w-5" /> },
    { name: 'Draft', path: '/Draft', icon: <PiNotePencilFill  className="h-5 w-5" /> },
    { name: 'Search', path: '/Search', icon: <FaSearch  className="h-5 w-5" /> },
    { name: 'Settings', path: '/settings', icon: <FiSettings className="h-5 w-5" /> },
  ];

  return (
    <aside className={`fixed top-0 z-20 h-screen w-64 bg-white shadow-lg transition-all duration-300 lg:left-0 
      ${isOpen ? 'left-0' : '-left-64'}`}>
      <div className="flex h-full flex-col shadow-2xl">
        <div className="flex h-18 items-center justify-center  px-4 border-b">
            <Link to={"/"}>
          <h1 className="text-xl font-bold text-shadow-lg/20   " onClick={toggleSidebar}>MyApp</h1>
            </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={toggleSidebar}
                  className={({ isActive }) => 
                    `flex items-center rounded-lg px-4 py-3 transition-colors
                    ${isActive ? 'bg-blue-50 text-slate-900' : 'text-slate-800 hover:bg-gray-100'}`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;