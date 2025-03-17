
import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const PreOrderSignup: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Create a container for the iframe
    const container = document.getElementById('jotform-container');
    if (!container) return;

    // Create an iframe element to properly contain the JotForm
    const iframe = document.createElement('iframe');
    iframe.setAttribute('id', 'JotFormIFrame-250751107337048');
    iframe.setAttribute('title', 'TeddyAI Pre-Order Form');
    iframe.setAttribute('onload', 'window.parent.scrollTo(0,0)');
    iframe.setAttribute('allowtransparency', 'true');
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('allow', 'geolocation; microphone; camera');
    iframe.setAttribute('src', 'https://form.jotform.com/250751107337048');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.backgroundColor = 'transparent';
    
    // Clear the container and add the iframe
    container.innerHTML = '';
    container.appendChild(iframe);

    // Set loading state
    const handleIframeLoad = () => {
      setIsLoading(false);
    };
    
    iframe.addEventListener('load', handleIframeLoad);
    
    return () => {
      iframe.removeEventListener('load', handleIframeLoad);
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
          {/* JotForm Container with Loading State */}
          <div 
            id="jotform-container" 
            className="h-[800px] md:h-[900px] relative"
          >
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-teddy-charcoal/30">
                <Loader2 className="h-12 w-12 animate-spin text-teddy-coral mb-4" />
                <p className="text-teddy-charcoal dark:text-white text-lg">Loading pre-order form...</p>
              </div>
            )}
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
