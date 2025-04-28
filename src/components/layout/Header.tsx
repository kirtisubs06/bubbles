
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-bubbles-deep/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/724300ba-d5f7-4b73-859a-1498a8a6ec55.png"
              alt="Bubbles Logo"
              className="h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/features" className="text-gray-600 hover:text-bubbles-blue dark:text-gray-300 dark:hover:text-white transition-colors">
              Features
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-bubbles-blue dark:text-gray-300 dark:hover:text-white transition-colors">
              Login
            </Link>
            <Button variant="blue" asChild>
              <Link to="/order">Buy Now</Link>
            </Button>
          </nav>

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                <Link 
                  to="/features" 
                  className="text-lg font-medium hover:text-bubbles-blue transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  to="/login" 
                  className="text-lg font-medium hover:text-bubbles-blue transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
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
