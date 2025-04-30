
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Customize: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-bubbles-blue via-bubbles-teal to-bubbles-skyblue bg-clip-text text-transparent">
            Customize Your Smart Plush
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Create a personalized companion that's perfect for your child. Choose from different animals and voices to make it special.
          </p>
          <Button 
            variant="navy" 
            size="lg" 
            onClick={() => navigate('/product/conversational-dolphin')}
            className="font-heading"
          >
            Customize Bubbles Now
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Customize;
