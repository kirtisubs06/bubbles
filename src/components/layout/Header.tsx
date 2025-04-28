
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Home, ShoppingBag, Settings, Layers } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-bubbles-deep/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/4a112ccb-3c0c-4dea-8462-f0fd5ad90188.png"
                alt="Bubbles Dolphin Logo"
                className="h-10 w-auto"
              />
              <img 
                src="/lovable-uploads/19fb3034-f7de-4558-ad00-3211567fa8ac.png"
                alt="Bubbles Text Logo"
                className="h-8 w-auto ml-2"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-bubbles-blue dark:text-gray-300 dark:hover:text-white transition-colors flex items-center gap-1">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/shop" className="text-gray-600 hover:text-bubbles-blue dark:text-gray-300 dark:hover:text-white transition-colors flex items-center gap-1">
              <ShoppingBag size={18} />
              <span>Shop</span>
            </Link>
            <Link to="/customize" className="text-gray-600 hover:text-bubbles-blue dark:text-gray-300 dark:hover:text-white transition-colors flex items-center gap-1">
              <Settings size={18} />
              <span>Customize</span>
            </Link>
            <Link to="/features" className="text-gray-600 hover:text-bubbles-blue dark:text-gray-300 dark:hover:text-white transition-colors flex items-center gap-1">
              <Layers size={18} />
              <span>Features</span>
            </Link>
            <Button variant="blue" asChild>
              <Link to="/order">Buy Now</Link>
            </Button>
          </nav>

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                <Link 
                  to="/" 
                  className="text-lg font-medium hover:text-bubbles-blue transition-colors flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Home size={18} />
                  <span>Home</span>
                </Link>
                <Link 
                  to="/shop" 
                  className="text-lg font-medium hover:text-bubbles-blue transition-colors flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingBag size={18} />
                  <span>Shop</span>
                </Link>
                <Link 
                  to="/customize" 
                  className="text-lg font-medium hover:text-bubbles-blue transition-colors flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings size={18} />
                  <span>Customize</span>
                </Link>
                <Link 
                  to="/features" 
                  className="text-lg font-medium hover:text-bubbles-blue transition-colors flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Layers size={18} />
                  <span>Features</span>
                </Link>
                <Button variant="blue" asChild onClick={() => setIsOpen(false)}>
                  <Link to="/order">Buy Now</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
