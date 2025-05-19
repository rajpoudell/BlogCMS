import { useState, type ReactNode } from 'react';

import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Header toggleSidebar={toggleSidebar} />
      
      <main className="pt-16 lg:pl-64 dark:text-white dark:bg-slate-800 text-slate-900 bg-white">
        <div className="p-6 ">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;