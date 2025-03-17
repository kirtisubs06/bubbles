
import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

const PreOrderSignup: React.FC = () => {
  useEffect(() => {
    // Load the JotForm script
    const script = document.createElement('script');
    script.src = 'https://form.jotform.com/jsform/250751107337048';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-teddy-cream/20 dark:from-teddy-charcoal dark:to-teddy-charcoal/80">
      <Header />
      
      <main className="flex-grow pt-32 container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-teddy-charcoal dark:text-white mb-4">
            Pre-order Your <span className="text-teddy-coral">TeddyAI</span> Companion
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Be among the first to bring home this interactive learning companion for your child.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto bg-white dark:bg-teddy-charcoal/30 shadow-medium rounded-2xl p-6 md:p-8 mb-16">
          {/* JotForm Embed */}
          <div id="jotform-embed" className="h-[800px] md:h-[900px]">
            <form id="250751107337048" style={{ marginBottom: 0 }} />
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Root element for the support chatbot */}
      <div id="JotformAgent-0195a2c1184f722d8a7b63d968f9fd1371d4"></div>
    </div>
  );
};

export default PreOrderSignup;
