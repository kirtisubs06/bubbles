
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, LogIn } from 'lucide-react';

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
          <span className="text-teddy-charcoal dark:text-white text-xl sm:text-2xl font-heading font-bold tracking-tight">
            TeddyTech <span className="text-teddy-coral">Tales</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className={cn("nav-link", isActive('/') && "active")}>
            Home
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
          <Link to="/login" className="ml-4 btn-primary">
            <LogIn className="mr-1 h-4 w-4" />
            Sign In
          </Link>
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
        <div className={cn(
          "fixed inset-0 bg-white dark:bg-teddy-charcoal z-40 flex flex-col items-center justify-center md:hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}>
          <nav className="flex flex-col items-center space-y-6 text-lg">
            <Link to="/" className={cn("nav-link", isActive('/') && "active")}>
              Home
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
        </div>
      </div>
    </header>
  );
};

export default Header;
