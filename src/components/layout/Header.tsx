
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, LogIn, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

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
    isScrolled ? 'bg-white/80 dark:bg-teddy-charcoal/80 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-6'
  );
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 z-50">
          <motion.div 
            className="w-10 h-10 bg-teddy-coral rounded-full flex items-center justify-center text-white"
            whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
          >
            <span className="text-xl">🧸</span>
          </motion.div>
          <motion.span 
            className="text-teddy-charcoal dark:text-white text-xl sm:text-2xl font-heading font-bold tracking-tight"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Teddy<span className="text-teddy-coral">AI</span>
          </motion.span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className={cn("nav-link group", isActive('/') && "active")}>
            <span>Home</span>
            <motion.span 
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teddy-coral group-hover:w-full transition-all duration-300"
              initial={false}
              animate={isActive('/') ? { width: "100%" } : { width: "0%" }}
            />
          </Link>
          <Link to="/teddy-demo" className={cn("nav-link group", isActive('/teddy-demo') && "active")}>
            <span>Teddy Demo</span>
            <Sparkles className="ml-1 h-3 w-3 text-teddy-pink inline-block" />
            <motion.span 
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teddy-coral group-hover:w-full transition-all duration-300"
              initial={false}
              animate={isActive('/teddy-demo') ? { width: "100%" } : { width: "0%" }}
            />
          </Link>
          <Link to="/about" className={cn("nav-link group", isActive('/about') && "active")}>
            <span>About</span>
            <motion.span 
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teddy-coral group-hover:w-full transition-all duration-300"
              initial={false}
              animate={isActive('/about') ? { width: "100%" } : { width: "0%" }}
            />
          </Link>
          <Link to="/features" className={cn("nav-link group", isActive('/features') && "active")}>
            <span>Features</span>
            <motion.span 
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teddy-coral group-hover:w-full transition-all duration-300"
              initial={false}
              animate={isActive('/features') ? { width: "100%" } : { width: "0%" }}
            />
          </Link>
          <Link to="/dashboard" className={cn("nav-link group", isActive('/dashboard') && "active")}>
            <span>Dashboard</span>
            <motion.span 
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teddy-coral group-hover:w-full transition-all duration-300"
              initial={false}
              animate={isActive('/dashboard') ? { width: "100%" } : { width: "0%" }}
            />
          </Link>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/login" className="ml-4 btn-primary">
              <LogIn className="mr-1 h-4 w-4" />
              Sign In
            </Link>
          </motion.div>
        </nav>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden z-50 p-2 text-teddy-charcoal dark:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
        
        {/* Mobile Navigation */}
        <motion.div 
          className={cn(
            "fixed inset-0 bg-white dark:bg-teddy-charcoal z-40 flex flex-col items-center justify-center md:hidden",
          )}
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0,
            y: isMobileMenuOpen ? 0 : "-100%"
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <nav className="flex flex-col items-center space-y-6 text-lg">
            <Link to="/" className={cn("nav-link", isActive('/') && "active")}>
              Home
            </Link>
            <Link to="/teddy-demo" className={cn("nav-link flex items-center", isActive('/teddy-demo') && "active")}>
              Teddy Demo
              <Sparkles className="ml-1 h-4 w-4 text-teddy-pink" />
            </Link>
            <Link to="/about" className={cn("nav-link", isActive('/about') && "active")}>
              About
            </Link>
            <Link to="/features" className={cn("nav-link", isActive('/features') && "active")}>
              Features
            </Link>
            <Link to="/dashboard" className={cn("nav-link", isActive('/dashboard') && "active")}>
              Dashboard
            </Link>
            <Link to="/login" className="mt-4 btn-primary">
              <LogIn className="mr-1 h-4 w-4" />
              Sign In
            </Link>
          </nav>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
