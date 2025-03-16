
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-teddy-cream dark:bg-teddy-charcoal py-12 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-teddy-charcoal dark:text-white text-xl font-heading font-bold tracking-tight">
                Teddy<span className="text-teddy-coral">AI</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Your child's AI-powered teddy companion, fostering growth, curiosity, and imagination.
            </p>
            <div className="flex items-center space-x-4">
              {/* Social media icons would go here */}
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-gray-600 dark:text-gray-300 hover:text-teddy-coral dark:hover:text-teddy-coral transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-teddy-coral dark:hover:text-teddy-coral transition-colors">Pricing</Link></li>
              <li><Link to="/faq" className="text-gray-600 dark:text-gray-300 hover:text-teddy-coral dark:hover:text-teddy-coral transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-teddy-coral dark:hover:text-teddy-coral transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-teddy-coral dark:hover:text-teddy-coral transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="text-gray-600 dark:text-gray-300 hover:text-teddy-coral dark:hover:text-teddy-coral transition-colors">Careers</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-teddy-coral dark:hover:text-teddy-coral transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 dark:text-gray-300 hover:text-teddy-coral dark:hover:text-teddy-coral transition-colors">Terms of Service</Link></li>
              <li><Link to="/safety" className="text-gray-600 dark:text-gray-300 hover:text-teddy-coral dark:hover:text-teddy-coral transition-colors">Child Safety</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} TeddyAI. All rights reserved. Made with <Heart className="inline-block h-4 w-4 text-teddy-coral" /> for curious little minds.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
