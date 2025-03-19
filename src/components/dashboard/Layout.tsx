
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
  X,
  Waves,
  Heart,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

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
        "fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-bubbles-deep border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <Link to="/" className="flex items-center gap-2">
              <motion.div 
                className="w-10 h-10 bg-bubbles-blue rounded-full flex items-center justify-center text-white shadow-bubbly"
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1, transition: { duration: 0.5 } }}
              >
                <span className="text-xl">🐬</span>
              </motion.div>
              <span className="text-bubbles-deep dark:text-white text-xl font-heading font-bold tracking-tight">
                <span className="text-bubbles-blue">Bubbles</span>
              </span>
            </Link>
          </div>
          
          {/* Decoration */}
          <div className="absolute top-20 right-5 w-20 h-20">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-10">
              <path d="M50,10 Q80,40 50,70 Q20,40 50,10 Z" fill="#5DB0C7" className="animate-float" />
            </svg>
          </div>
          
          {/* Navigation */}
          <nav className="flex-grow py-6 px-4 space-y-1 overflow-y-auto">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                    isActive(item.path)
                      ? "bg-bubbles-blue/10 text-bubbles-blue shadow-soft"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:translate-x-1"
                  )}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.icon}
                  {item.label}
                  {isActive(item.path) && (
                    <motion.span 
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-bubbles-blue"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>
          
          {/* User section */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all duration-300">
              <div className="w-9 h-9 rounded-full bg-[#9b87f5]/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-[#9b87f5]">SA</span>
              </div>
              <div className="flex-grow">
                <div className="text-sm font-medium">Sarah Anderson</div>
                <div className="text-xs text-gray-500">Parent Account</div>
              </div>
              <Link to="/" className="text-gray-500 hover:text-bubbles-blue transition-colors">
                <LogOut size={18} />
              </Link>
            </div>
          </div>
          
          {/* Decoration */}
          <div className="absolute bottom-20 left-5 w-10 h-10">
            <div className="w-full h-full rounded-full bg-[#9b87f5]/30 animate-pulse-soft"></div>
          </div>
        </div>
      </aside>
    </>
  );
};

const DashboardLayout: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-bubbles-cream/50 dark:bg-gray-900">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      
      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-bubbles-deep border-b border-gray-200 dark:border-gray-800 shadow-soft">
          <div className="px-4 h-16 flex items-center justify-between">
            <button
              className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="flex items-center gap-2 lg:hidden">
              <h1 className="text-lg font-semibold">Parent Dashboard</h1>
              <Heart className="h-4 w-4 text-[#9b87f5]" />
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full bg-bubbles-blue/10 text-bubbles-blue hover:bg-bubbles-blue/20 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#9b87f5] rounded-full"></span>
              </button>
              
              <button className="p-2 rounded-full bg-bubbles-teal/10 text-bubbles-teal hover:bg-bubbles-teal/20 transition-colors">
                <Sparkles size={20} />
              </button>
            </div>
          </div>
        </header>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-40 h-40 bg-bubbles-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-[#9b87f5]/5 rounded-full blur-3xl"></div>
        
        {/* Page content */}
        <main className="p-4 md:p-6 lg:p-8 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
