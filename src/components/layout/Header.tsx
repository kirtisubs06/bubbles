
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, LogIn, Sparkles, Package, Waves, Activity, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const headerClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
    isScrolled ? 'bg-white/80 dark:bg-bubbles-deep/80 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-6'
  );
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 z-50">
          <motion.div 
            className="w-10 h-10 bg-bubbles-blue rounded-full flex items-center justify-center text-white shadow-bubbly"
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1, transition: { duration: 0.5 } }}
          >
            <span className="text-xl">🐬</span>
          </motion.div>
          <motion.span 
            className="text-bubbles-deep dark:text-white text-xl sm:text-2xl font-heading font-bold tracking-tight"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="text-bubbles-blue">Bubbles</span>
          </motion.span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className={cn("nav-link group", isActive('/') && "active")}>
            <span>Home</span>
            <motion.span 
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-bubbles-blue group-hover:w-full transition-all duration-300"
              initial={false}
              animate={isActive('/') ? { width: "100%" } : { width: "0%" }}
            />
          </Link>
          <Link to="/dolphin-demo" className={cn("nav-link group", isActive('/dolphin-demo') && "active")}>
            <span>Dolphin Demo</span>
            <Waves className="ml-1 h-3 w-3 text-bubbles-teal inline-block" />
            <motion.span 
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-bubbles-blue group-hover:w-full transition-all duration-300"
              initial={false}
              animate={isActive('/dolphin-demo') ? { width: "100%" } : { width: "0%" }}
            />
          </Link>
          <Link to="/parent-dashboard-demo" className={cn("nav-link group", isActive('/parent-dashboard-demo') && "active")}>
            <span>Parent Dashboard</span>
            <Activity className="ml-1 h-3 w-3 text-bubbles-teal inline-block" />
            <motion.span 
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-bubbles-blue group-hover:w-full transition-all duration-300"
              initial={false}
              animate={isActive('/parent-dashboard-demo') ? { width: "100%" } : { width: "0%" }}
            />
          </Link>
          <Link to="/pre-order" className={cn("nav-link group", isActive('/pre-order') && "active")}>
            <span>Pre-order</span>
            <Package className="ml-1 h-3 w-3 text-bubbles-teal inline-block" />
            <motion.span 
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-bubbles-blue group-hover:w-full transition-all duration-300"
              initial={false}
              animate={isActive('/pre-order') ? { width: "100%" } : { width: "0%" }}
            />
          </Link>
          <Link to="/features" className={cn("nav-link group", isActive('/features') && "active")}>
            <span>Features</span>
            <Sparkles className="ml-1 h-3 w-3 text-bubbles-teal inline-block" />
            <motion.span 
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-bubbles-blue group-hover:w-full transition-all duration-300"
              initial={false}
              animate={isActive('/features') ? { width: "100%" } : { width: "0%" }}
            />
          </Link>
          <Link to="/pricing" className={cn("nav-link group", isActive('/pricing') && "active")}>
            <span>Pricing</span>
            <motion.span 
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-bubbles-blue group-hover:w-full transition-all duration-300"
              initial={false}
              animate={isActive('/pricing') ? { width: "100%" } : { width: "0%" }}
            />
          </Link>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="fun" asChild className="ml-4">
              <Link to="/login">
                <LogIn className="mr-1 h-4 w-4" />
                Sign In
              </Link>
            </Button>
          </motion.div>
        </nav>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden z-50 p-2 text-bubbles-deep dark:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
        
        {/* Mobile Navigation */}
        <motion.div 
          className={cn(
            "fixed inset-0 bg-white dark:bg-bubbles-deep z-40 flex flex-col items-center justify-center md:hidden",
          )}
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0,
            y: isMobileMenuOpen ? 0 : "-100%"
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-bubbles-teal/30 blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-20 h-20 rounded-full bg-[#9b87f5]/30 blur-xl"></div>
          
          <nav className="flex flex-col items-center space-y-6 text-lg">
            <Link to="/" className={cn("nav-link", isActive('/') && "active")}>
              Home
            </Link>
            <Link to="/dolphin-demo" className={cn("nav-link flex items-center", isActive('/dolphin-demo') && "active")}>
              Dolphin Demo
              <Waves className="ml-1 h-4 w-4 text-bubbles-teal" />
            </Link>
            <Link to="/parent-dashboard-demo" className={cn("nav-link flex items-center", isActive('/parent-dashboard-demo') && "active")}>
              Parent Dashboard
              <Activity className="ml-1 h-4 w-4 text-bubbles-teal" />
            </Link>
            <Link to="/pre-order" className={cn("nav-link flex items-center", isActive('/pre-order') && "active")}>
              Pre-order
              <Package className="ml-1 h-4 w-4 text-bubbles-teal" />
            </Link>
            <Link to="/features" className={cn("nav-link flex items-center", isActive('/features') && "active")}>
              Features
              <Sparkles className="ml-1 h-4 w-4 text-bubbles-teal" />
            </Link>
            <Link to="/pricing" className={cn("nav-link", isActive('/pricing') && "active")}>
              Pricing
            </Link>
            <Button variant="fun" asChild className="mt-4">
              <Link to="/login">
                <LogIn className="mr-1 h-4 w-4" />
                Sign In
              </Link>
            </Button>
          </nav>
          
          {/* Decorative elements */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3">
            <div className="w-2 h-2 rounded-full bg-bubbles-teal animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 rounded-full bg-bubbles-blue animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 rounded-full bg-[#9b87f5] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
