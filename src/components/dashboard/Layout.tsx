
import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  MessageCircle, 
  BarChart2, 
  Settings,
  Shield,
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const Sidebar: React.FC<{ isMobileOpen: boolean; setIsMobileOpen: (open: boolean) => void }> = ({ 
  isMobileOpen, 
  setIsMobileOpen 
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path: string) => {
    return currentPath === path || currentPath.startsWith(path);
  };
  
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Overview", path: "/dashboard" },
    { icon: <MessageCircle size={20} />, label: "Conversations", path: "/dashboard/conversations" },
    { icon: <BarChart2 size={20} />, label: "Analytics", path: "/dashboard/analytics" },
    { icon: <Shield size={20} />, label: "Parental Controls", path: "/dashboard/controls" },
    { icon: <Bell size={20} />, label: "Notifications", path: "/dashboard/notifications" },
    { icon: <Settings size={20} />, label: "Settings", path: "/dashboard/settings" },
  ];
  
  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-teddy-charcoal border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-teddy-coral rounded-full flex items-center justify-center text-white">
                <span className="text-xl">🧸</span>
              </div>
              <span className="text-teddy-charcoal dark:text-white text-xl font-heading font-bold tracking-tight">
                Teddy<span className="text-teddy-coral">AI</span>
              </span>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="flex-grow py-6 px-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.path)
                    ? "bg-teddy-blue/10 text-teddy-blue"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                onClick={() => setIsMobileOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* User section */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-teddy-purple/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-teddy-purple">SA</span>
              </div>
              <div className="flex-grow">
                <div className="text-sm font-medium">Sarah Anderson</div>
                <div className="text-xs text-gray-500">Parent Account</div>
              </div>
              <Link to="/" className="text-gray-500 hover:text-teddy-blue">
                <LogOut size={18} />
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const DashboardLayout: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      
      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-teddy-charcoal border-b border-gray-200 dark:border-gray-800">
          <div className="px-4 h-16 flex items-center justify-between">
            <button
              className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <h1 className="text-lg font-semibold lg:hidden">TeddyAI Dashboard</h1>
            
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-teddy-coral rounded-full"></span>
              </button>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
