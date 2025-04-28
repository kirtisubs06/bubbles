
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Home, ShoppingBag, Settings, Layers } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = "relative group px-2.5 py-2 rounded-xl font-heading text-base font-medium transition-all duration-300 tracking-normal capitalize";
  const linkActiveClasses = "text-white bg-gradient-to-r from-bubbles-teal to-bubbles-skyblue shadow-bubbly";
  const linkDefaultClasses = "text-bubbles-blue hover:text-white hover:bg-gradient-to-r hover:from-bubbles-purple hover:to-bubbles-teal dark:text-gray-300 dark:hover:text-white";
  const linkBackgroundClasses = "absolute inset-0 bg-gradient-to-r from-bubbles-teal/10 to-bubbles-skyblue/10 dark:from-bubbles-teal/20 dark:to-bubbles-skyblue/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300";

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

          <nav className="hidden md:flex items-center gap-2">
            <Link to="/" className={`${linkClasses} ${linkDefaultClasses}`}>
              <span className={linkBackgroundClasses}></span>
              <span>Home</span>
            </Link>
            <Link to="/shop" className={`${linkClasses} ${linkDefaultClasses}`}>
              <span className={linkBackgroundClasses}></span>
              <span>Shop</span>
            </Link>
            <Link to="/customize" className={`${linkClasses} ${linkDefaultClasses}`}>
              <span className={linkBackgroundClasses}></span>
              <span>Customize</span>
            </Link>
            <Link to="/features" className={`${linkClasses} ${linkDefaultClasses}`}>
              <span className={linkBackgroundClasses}></span>
              <span>Features</span>
            </Link>
            <Button variant="navy" asChild className="font-heading ml-2 shadow-bubbly font-medium">
              <Link to="/pre-order">Join Waitlist</Link>
            </Button>
          </nav>

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
                  <Link to="/pre-order">Join Waitlist</Link>
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
