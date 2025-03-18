
import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

const PreOrderSignup: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the loading state after a reasonable time
    // in case the iframe load event doesn't trigger properly
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  // Handle iframe load event
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

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
            Pre-order Your <span className="text-teddy-coral">TeddyPal</span> Companion
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Be among the first to bring home this interactive learning companion for your child.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto bg-white dark:bg-teddy-charcoal/30 shadow-medium rounded-2xl p-6 md:p-8 mb-16">
          {/* JotForm iframe container with Loading State */}
          <div className="relative min-h-[800px] md:min-h-[900px]">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-teddy-charcoal/30 z-10">
                <Loader2 className="h-12 w-12 animate-spin text-teddy-coral mb-4" />
                <p className="text-teddy-charcoal dark:text-white text-lg">Loading pre-order form...</p>
              </div>
            )}
            
            <iframe 
              id="JotFormIFrame-250751107337048"
              title="Pre-order TeddyPal Form"
              onLoad={handleIframeLoad}
              allowTransparency={true} 
              allowFullScreen={true}
              allow="geolocation; microphone; camera"
              src="https://form.jotform.com/250751107337048"
              frameBorder="0"
              className="w-full h-full min-h-[800px] md:min-h-[900px] absolute inset-0"
              style={{
                background: 'transparent'
              }}
            />
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
